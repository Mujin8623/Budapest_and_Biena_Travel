/* Tour mode: full-screen, one card at a time.
   #/tour/vienna-city  — 11/29 city walk, Karlsplatz → arrival at Belvedere (hand-off to the artwork tour)
   #/tour/belvedere    — Upper Belvedere artwork tour (10 works), ends with the walk to the hotel
   Optional step: #/tour/<id>/<n>. Position is also kept in localStorage per tour.
   Paragraphs carry data-guide-id + data-audio-src (empty) so recorded audio can be attached later. */
(function () {
  "use strict";
  var DATE = "2026-11-29";
  var TRIP = window.TRIP;
  var G = window.TRIP_GUIDE && window.TRIP_GUIDE[DATE];
  var S = (window.TRIP_STORY && window.TRIP_STORY[DATE]) || { stops: {}, artworks: {} };
  if (!TRIP || !G) return;
  var day = TRIP.days.find(function (d) { return d.date === DATE; });
  var all = day.items.map(function (it) { return Object.assign({}, it, { place: Object.assign({ id: it.placeId }, TRIP.places[it.placeId]) }); });
  var bIdx = all.findIndex(function (it) { return it.placeId === G.artworksFor; });
  var BACK = "#/schedule/" + DATE;

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function legBetween(a, b) { return G.legs.find(function (l) { return l.from === a && l.to === b; }) || null; }
  function km(m) { return m >= 1000 ? (m / 1000).toFixed(1) + " km" : Math.round(m / 10) * 10 + " m"; }
  function thumb(src) { return src.replace("assets/img/", "assets/img/thumbs/"); }

  /* ---------- tour definitions ---------- */
  var city = all.slice(0, bIdx); /* stops walked before Belvedere */
  var belvedere = all[bIdx];
  var TOURS = {
    "vienna-city": {
      title: "비엔나 구시가지 걷기",
      stops: city,
      deck: (function () {
        var d = [{ t: "start" }];
        city.forEach(function (it, i) { d.push({ t: "stop", i: i }); d.push({ t: "leg", i: i }); });
        d.push({ t: "end" });
        return d;
      })(),
      walk: city.reduce(function (s, it, i) {
        var to = i + 1 < city.length ? city[i + 1] : belvedere, l = legBetween(it.placeId, to.placeId);
        return s + (l && l.m ? l.m : 0);
      }, 0)
    },
    belvedere: {
      title: "벨베데레 상궁 작품 투어",
      deck: [{ t: "bstart" }].concat(G.artworks.map(function (_, j) { return { t: "art", j: j }; }), [{ t: "bend" }])
    }
  };

  var el = null, tourId = null, tour = null, pos = 0, auto = false, autoTimer = null, io = null, listOpen = false;

  function key() { return "tourMode:" + tourId; }
  function load() { try { return JSON.parse(localStorage.getItem(key()) || "{}"); } catch (e) { return {}; } }
  function save() {
    try { localStorage.setItem(key(), JSON.stringify({ pos: pos })); } catch (e) {}
    var h = "#/tour/" + tourId + (pos ? "/" + pos : "");
    if (location.hash !== h) history.replaceState(null, "", h);
  }

  /* ---------- shared pieces ---------- */
  function top(segCount, at, label, light) {
    var segs = "";
    for (var k = 0; k < segCount; k += 1) segs += '<i class="' + (k < at ? "done" : k === at ? "now" : "") + '"></i>';
    return '<div class="tm-top' + (light ? " tm-top-light" : "") + '">'
      + '<a class="tm-close" href="' + BACK + '" aria-label="투어 닫고 일정으로">✕</a>'
      + '<button type="button" class="tm-prog" data-tm="list" aria-label="전체 순서 보기 (' + esc(label) + ')"><span class="tm-prog-bar">' + segs + '</span><span class="tm-prog-num">' + esc(label) + "</span></button></div>";
  }
  function audioSlot(firstId) {
    return '<div class="tm-audio" data-audio-for="' + esc(firstId) + '">'
      + '<button type="button" class="tm-audio-play" disabled aria-disabled="true" aria-label="음성 해설 재생 (준비 중)"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></button>'
      + '<span class="tm-audio-label">음성 준비 중</span>'
      + '<button type="button" class="tm-chip" data-tm="auto" aria-pressed="' + auto + '">글 자동 넘김</button></div>';
  }
  function story(paras) {
    return '<div class="tm-story">' + paras.map(function (p, k) {
      return '<p class="tm-para' + (k === 0 ? " on" : "") + '" data-guide-id="' + esc(p.id) + '" data-audio-src="' + esc(p.audio || "") + '">' + esc(p.text) + "</p>";
    }).join("") + "</div>";
  }
  function sources(list) {
    if (!list || !list.length) return "";
    return '<p class="tm-src">출처 · ' + list.map(function (s) { return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.title) + "</a>"; }).join(" · ") + "</p>";
  }
  function heroImg(place) {
    return place.photo ? '<img class="tm-hero-img" src="' + esc(place.photo) + '" alt="" decoding="async">' : '<div class="tm-hero-img tm-ph" aria-hidden="true"></div>';
  }
  function bar(primary, opts) {
    opts = opts || {};
    return '<footer class="tm-bar">'
      + (pos > 0 ? '<button type="button" class="tm-btn tm-ghost tm-prev" data-tm="prev" aria-label="이전">‹</button>' : "")
      + (opts.secondary || "")
      + (opts.href ? '<a class="tm-btn tm-primary" href="' + esc(opts.href) + '">' + primary + "</a>"
        : '<button type="button" class="tm-btn tm-primary" data-tm="' + (opts.act || "next") + '">' + primary + "</button>")
      + "</footer>";
  }
  function legCard(l, from, to, opts) {
    opts = opts || {};
    var mode = l ? l.mode : "walk", icon = mode === "walk" ? "🚶" : mode === "tram" ? "🚋" : "🚇";
    var meta = l ? l.min + "분" + (mode === "walk" && l.m ? " · " + km(l.m) : "") : "";
    var sub = l && l.tramM ? "트램 D " + km(l.tramM) + " + 걷기 " + km(l.m) : mode === "transit" ? "지하철 + 걷기" : "";
    var gm = "https://www.google.com/maps/dir/?api=1&destination=" + to.place.lat + "," + to.place.lng + "&travelmode=" + (mode === "walk" ? "walking" : "transit");
    return '<p class="tm-leg-meta"><span aria-hidden="true">' + icon + "</span>" + esc(meta) + "</p>"
      + (sub ? '<p class="tm-leg-sub">' + esc(sub) + "</p>" : "")
      + (l && (l.path || l.tram) ? miniMap(l, opts.context) : "")
      + '<p class="tm-leg-text"' + (l ? ' data-guide-id="' + esc(l.id) + '"' : "") + ">" + esc(l ? l.text : to.note || "") + "</p>"
      + '<a class="tm-maplink" href="' + gm + '" target="_blank" rel="noopener noreferrer">지도 앱으로 길 찾기 ↗</a>';
  }

  /* Mini-map: plain SVG (no tiles, works offline). Faint context = other legs of this tour, bold = this leg. */
  function miniMap(l, context) {
    var pts = (l.tram || []).concat(l.path || []);
    var c = Math.cos(48.2 * Math.PI / 180), W = 358, H = 170, pad = 26;
    var xs = pts.map(function (p) { return p[1] * c; }), ys = pts.map(function (p) { return p[0]; });
    var minX = Math.min.apply(null, xs), maxX = Math.max.apply(null, xs), minY = Math.min.apply(null, ys), maxY = Math.max.apply(null, ys);
    var span = Math.max((maxX - minX) / (W - 2 * pad), (maxY - minY) / (H - 2 * pad), 0.0000025);
    var cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    function P(p) { return [((p[1] * c - cx) / span + W / 2).toFixed(1), (H / 2 - (p[0] - cy) / span).toFixed(1)]; }
    function line(path) { return path.map(function (p) { return P(p).join(","); }).join(" "); }
    var ctx = (context || []).filter(function (x) { return x !== l; }).map(function (x) {
      return (x.path ? '<polyline class="tm-mm-ctx" points="' + line(x.path) + '"/>' : "") + (x.tram ? '<polyline class="tm-mm-ctx" points="' + line(x.tram) + '"/>' : "");
    }).join("");
    var A = P(pts[0]), B = P(pts[pts.length - 1]);
    return '<figure class="tm-mm"><svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="경로 미니맵">' + ctx
      + (l.tram ? '<polyline class="tm-mm-tram" points="' + line(l.tram) + '"/>' : "")
      + (l.path ? '<polyline class="tm-mm-cur" points="' + line(l.path) + '"/>' : "")
      + '<circle class="tm-mm-a" r="6" cx="' + A[0] + '" cy="' + A[1] + '"/><circle class="tm-mm-b" r="8" cx="' + B[0] + '" cy="' + B[1] + '"/></svg>'
      + '<figcaption><span><i class="tm-k-a"></i>지금</span><span><i class="tm-k-b"></i>다음 장소</span>' + (l.tram ? '<span><i class="tm-k-t"></i>트램</span>' : "") + "</figcaption></figure>";
  }
  function cityLegs() {
    return city.map(function (it, i) { return legBetween(it.placeId, (city[i + 1] || belvedere).placeId); }).filter(Boolean);
  }

  /* ---------- city tour screens ---------- */
  function cStart() {
    var st = load(), resume = st.pos > 0 && st.pos < tour.deck.length - 1 ? tour.deck[st.pos] : null;
    return '<section class="tm-screen tm-start">'
      + '<div class="tm-hero tm-hero-tall"><img class="tm-hero-img" src="assets/img/staatsoper.webp" alt="" decoding="async"><div class="tm-shade"></div>'
      + top(0, -1, "투어 모드")
      + '<div class="tm-hero-txt"><p class="tm-kicker">11월 29일 (일) · 투어 모드</p><h1>' + esc(tour.title) + "</h1></div></div>"
      + '<div class="tm-body">'
      + '<ul class="tm-stats"><li><b>' + city.length + '</b><span>곳</span></li><li><b>' + km(tour.walk) + '</b><span>걷기 · 트램</span></li><li><b>' + esc(city[0].time) + '</b><span>출발</span></li><li><b>' + esc(belvedere.time.split("–")[0]) + '</b><span>벨베데레</span></li></ul>'
      + '<p class="tm-lead" data-guide-id="' + esc(G.intro.id) + '">' + esc(G.intro.text) + "</p>"
      + '<p class="tm-hint">카를스플라츠에서 출발해 트램 D로 벨베데레에 도착하면 끝나요. 벨베데레 작품 투어는 따로 시작해요. 옆으로 넘기거나 아래 큰 버튼을 누르면 다음으로 가요.</p>'
      + (resume ? '<button type="button" class="tm-resume" data-tm="go" data-to="' + st.pos + '"><span>이어서 하기</span><b>' + esc(city[resume.i].place.name) + " · " + (resume.i + 1) + "/" + city.length + "</b></button>" : "")
      + "</div>" + bar("투어 시작") + "</section>";
  }
  function cStop(c) {
    var it = city[c.i], p = it.place, st = S.stops[p.id], gs = G.stops[p.id] || { paras: [], sources: [] };
    var paras = st ? st.paras : gs.paras;
    return '<section class="tm-screen">'
      + '<div class="tm-hero">' + heroImg(p) + '<div class="tm-shade"></div>' + top(city.length, c.i, (c.i + 1) + "/" + city.length)
      + '<div class="tm-hero-txt"><p class="tm-kicker"><span class="tm-time">' + esc(it.time) + "</span>" + esc(p.name) + "</p><h1>" + esc(it.text) + "</h1></div></div>"
      + '<div class="tm-body">' + audioSlot(paras[0] ? paras[0].id : "g-" + p.id)
      + (paras.length ? story(paras) : "")
      + (it.note ? '<details class="tm-tip"><summary>현장 메모</summary><p>' + esc(it.note) + "</p></details>" : "")
      + sources(st ? st.sources : gs.sources) + "</div>"
      + bar("다음 장소로 가는 길") + "</section>";
  }
  function cLeg(c) {
    var from = city[c.i], to = city[c.i + 1] || belvedere, l = legBetween(from.placeId, to.placeId);
    return '<section class="tm-screen">'
      + '<div class="tm-legtop">' + top(city.length, c.i, (c.i + 1) + "/" + city.length, true)
      + '<p class="tm-kicker">다음 장소 · ' + esc(to.time) + "</p><h1>" + esc(to.place.name) + "</h1></div>"
      + '<div class="tm-body">' + legCard(l, from, to, { context: cityLegs() })
      + '<div class="tm-peek">' + (to.place.photo ? '<img src="' + esc(thumb(to.place.photo)) + '" alt="" loading="lazy">' : "") + '<div><p class="tm-kicker">도착하면</p><p>' + esc(to.text) + "</p></div></div>"
      + "</div>" + bar("도착했어요") + "</section>";
  }
  function cEnd() {
    return '<section class="tm-screen tm-end">'
      + '<div class="tm-hero">' + heroImg(belvedere.place) + '<div class="tm-shade"></div>' + top(city.length, city.length, "완료")
      + '<div class="tm-hero-txt"><p class="tm-kicker">' + esc(belvedere.time) + " · " + esc(belvedere.place.name) + "</p><h1>벨베데레에 도착했어요</h1></div></div>"
      + '<div class="tm-body"><p class="tm-lead">구시가지 ' + city.length + "곳을 지나 여기까지 왔어요. 시내 걷기는 여기서 끝이에요. 수고했어요!</p>"
      + '<a class="tm-handoff" href="#/tour/belvedere"><span class="tm-kicker">다음 투어</span><strong>벨베데레 작품 투어는 따로 시작</strong><span>상궁 작품 ' + G.artworks.length + "점 · 〈키스〉 · 〈죽음과 소녀〉</span></a>"
      + '<ul class="tm-done">' + city.map(function (it) { return "<li><b>" + esc(it.time.split("–")[0]) + "</b>" + esc(it.place.name) + "</li>"; }).join("") + "</ul></div>"
      + bar("벨베데레 작품 투어 시작", { href: "#/tour/belvedere", secondary: '<a class="tm-btn tm-ghost tm-wide" href="' + BACK + '">일정</a>' }) + "</section>";
  }

  /* ---------- Belvedere tour screens ---------- */
  function bStart() {
    var st = load(), gs = G.stops[belvedere.placeId] || { paras: [], sources: [] };
    var resume = st.pos > 0 && st.pos < tour.deck.length - 1 ? tour.deck[st.pos] : null;
    return '<section class="tm-screen tm-start">'
      + '<div class="tm-hero tm-hero-tall">' + heroImg(belvedere.place) + '<div class="tm-shade"></div>' + top(0, -1, "작품 투어")
      + '<div class="tm-hero-txt"><p class="tm-kicker">11월 29일 (일) · ' + esc(belvedere.time) + "</p><h1>" + esc(tour.title) + "</h1></div></div>"
      + '<div class="tm-body">'
      + '<div class="tm-strip">' + G.artworks.map(function (a, j) { return '<button type="button" data-tm="go" data-to="' + (j + 1) + '" aria-label="' + esc(a.title) + '"><img src="' + esc(thumb(a.photo)) + '" alt="" loading="lazy"></button>'; }).join("") + "</div>"
      + audioSlot(gs.paras[0] ? gs.paras[0].id : "g-belvedere") + story(gs.paras)
      + '<p class="tm-tipline">' + esc(G.artworksNote) + "</p>"
      + (belvedere.note ? '<details class="tm-tip"><summary>현장 메모</summary><p>' + esc(belvedere.note) + "</p></details>" : "")
      + sources(gs.sources)
      + (resume ? '<button type="button" class="tm-resume" data-tm="go" data-to="' + st.pos + '"><span>이어서 하기</span><b>' + esc(G.artworks[resume.j].title) + " · " + (resume.j + 1) + "/" + G.artworks.length + "</b></button>" : "")
      + "</div>" + bar("작품 투어 시작 · " + G.artworks.length + "점") + "</section>";
  }
  function bArt(c) {
    var a = G.artworks[c.j], st = S.artworks[a.id], paras = st ? st.paras : a.paras, n = G.artworks.length;
    return '<section class="tm-screen tm-art">'
      + '<div class="tm-art-hero">' + top(n, c.j, "작품 " + (c.j + 1) + "/" + n)
      + (a.photo ? '<figure class="tm-art-fig"><img src="' + esc(a.photo) + '" alt="' + esc(a.title + " · " + a.artist) + '" decoding="async"></figure>' : "")
      + '<div class="tm-art-cap"><p class="tm-art-where"><span>' + String(c.j + 1).padStart(2, "0") + "</span>" + esc(a.where) + "</p><h1>" + esc(a.title) + "</h1>"
      + '<p class="tm-art-by">' + esc(a.artist) + " · " + esc(a.year) + "</p></div></div>"
      + '<div class="tm-body">' + audioSlot(paras[0].id) + story(paras)
      + sources(st ? st.sources : null)
      + (a.credit ? '<p class="tm-src">사진 · ' + esc(a.credit.author) + " · " + esc(a.credit.license) + ' · <a href="' + esc(a.credit.url) + '" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a></p>' : "")
      + "</div>"
      + bar(c.j === n - 1 ? "작품 투어 마치기" : "다음 작품", { secondary: c.j === n - 1 ? "" : '<button type="button" class="tm-btn tm-ghost tm-wide" data-tm="last">끝내기</button>' }) + "</section>";
  }
  function bEnd() {
    var hotel = all[bIdx + 1], dinner = all[bIdx + 2], l = hotel ? legBetween(belvedere.placeId, hotel.placeId) : null;
    return '<section class="tm-screen tm-end">'
      + '<div class="tm-legtop">' + top(G.artworks.length, G.artworks.length, "완료", true)
      + '<p class="tm-kicker">작품 ' + G.artworks.length + "점 · 완료</p><h1>작품 투어 끝!</h1></div>"
      + '<div class="tm-body">'
      + '<div class="tm-strip tm-strip-done">' + G.artworks.map(function (a) { return '<img src="' + esc(thumb(a.photo)) + '" alt="" loading="lazy">'; }).join("") + "</div>"
      + (hotel ? '<h2 class="tm-h2">숙소까지 · ' + esc(hotel.time) + "</h2>" + legCard(l, belvedere, hotel) : "")
      + (dinner ? '<p class="tm-hint">그다음 ' + esc(dinner.time) + " · " + esc(dinner.text) + "</p>" : "")
      + sources(G.artworkSources) + "</div>"
      + bar("일정으로 돌아가기", { href: BACK }) + "</section>";
  }

  /* ---------- render / nav ---------- */
  function screen() {
    var c = tour.deck[pos];
    if (tourId === "vienna-city") return c.t === "start" ? cStart() : c.t === "stop" ? cStop(c) : c.t === "leg" ? cLeg(c) : cEnd();
    return c.t === "bstart" ? bStart() : c.t === "art" ? bArt(c) : bEnd();
  }
  function draw(dir) {
    stopAuto();
    el.innerHTML = screen() + '<div class="tm-sheet" hidden></div>';
    if (dir) el.firstElementChild.classList.add(dir > 0 ? "tm-in-r" : "tm-in-l");
    window.scrollTo(0, 0);
    watchParas(); save(); listOpen = false;
  }
  function go(to, dir) { if (to < 0 || to >= tour.deck.length) return; pos = to; draw(dir); }
  function next() { go(pos + 1, 1); }

  function setOn(p) { el.querySelectorAll(".tm-para.on").forEach(function (x) { x.classList.remove("on"); }); p.classList.add("on"); }
  function watchParas() {
    if (io) io.disconnect();
    var ps = el.querySelectorAll(".tm-para");
    if (!ps.length || !("IntersectionObserver" in window)) return;
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !auto) setOn(e.target); }); }, { rootMargin: "-40% 0px -55% 0px" });
    ps.forEach(function (p) { io.observe(p); });
  }
  /* Text-only teleprompter until audio exists (~9 chars/s). Audio, when added, should drive the same highlight. */
  function startAuto() {
    auto = true;
    var ps = [].slice.call(el.querySelectorAll(".tm-para"));
    var k = Math.max(0, ps.findIndex(function (p) { return p.classList.contains("on"); }));
    (function step() {
      if (!auto) return;
      var p = ps[k]; if (!p) { stopAuto(); return; }
      setOn(p); p.scrollIntoView({ behavior: "smooth", block: "center" });
      autoTimer = setTimeout(function () { k += 1; step(); }, Math.max(2500, p.textContent.length * 110));
    })();
    syncAuto();
  }
  function stopAuto() { auto = false; clearTimeout(autoTimer); syncAuto(); }
  function syncAuto() { if (!el) return; var b = el.querySelector('[data-tm="auto"]'); if (b) b.setAttribute("aria-pressed", String(auto)); }

  function openList() {
    var sh = el.querySelector(".tm-sheet"), c = tour.deck[pos], rows;
    if (tourId === "vienna-city") {
      var cur = c.i == null ? (c.t === "end" ? city.length : -1) : c.i;
      rows = city.map(function (it, k) {
        var to = tour.deck.findIndex(function (d) { return d.t === "stop" && d.i === k; });
        return '<li><button type="button" data-tm="go" data-to="' + to + '" class="' + (k === cur ? "now" : k < cur ? "done" : "") + '"><b>' + esc(it.time.split("–")[0]) + "</b><span>" + esc(it.place.name) + "</span>" + (S.stops[it.placeId] ? "<em>긴 해설</em>" : "") + "</button></li>";
      }).join("");
    } else {
      var cj = c.j == null ? (c.t === "bend" ? G.artworks.length : -1) : c.j;
      rows = G.artworks.map(function (a, k) {
        return '<li><button type="button" data-tm="go" data-to="' + (k + 1) + '" class="' + (k === cj ? "now" : k < cj ? "done" : "") + '"><img src="' + esc(thumb(a.photo)) + '" alt="" loading="lazy"><span>' + esc(a.title) + "<small>" + esc(a.where) + "</small></span>" + (S.artworks[a.id] ? "<em>긴 해설</em>" : "") + "</button></li>";
      }).join("");
    }
    sh.innerHTML = '<div class="tm-sheet-bg" data-tm="close"></div><div class="tm-sheet-card" role="dialog" aria-modal="true" aria-label="전체 순서"><h2>' + esc(tour.title) + "</h2><ol>" + rows + "</ol></div>";
    sh.hidden = false; listOpen = true;
    var f = sh.querySelector("button.now") || sh.querySelector("button"); if (f) f.focus();
  }
  function closeList() { var sh = el && el.querySelector(".tm-sheet"); if (sh) sh.hidden = true; listOpen = false; }

  function onClick(e) {
    if (!el || el.hidden) return;
    var t = e.target.closest("[data-tm]");
    if (!t || !el.contains(t)) { var p = e.target.closest(".tm-para"); if (p && el.contains(p)) { stopAuto(); setOn(p); } return; }
    var a = t.dataset.tm;
    if (a === "next") next();
    else if (a === "prev") go(pos - 1, -1);
    else if (a === "go") { var to = +t.dataset.to; go(to, to >= pos ? 1 : -1); }
    else if (a === "last") go(tour.deck.length - 1, 1);
    else if (a === "list") openList();
    else if (a === "close") closeList();
    else if (a === "auto") { if (auto) stopAuto(); else startAuto(); }
  }
  var sx = 0, sy = 0;
  function onTouchStart(e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }
  function onTouchEnd(e) {
    if (listOpen || e.target.closest(".tm-strip")) return;
    var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) { if (dx < 0) next(); else go(pos - 1, -1); }
  }
  function onKey(e) {
    if (!el || el.hidden) return;
    if (e.key === "Escape" && listOpen) { closeList(); return; }
    if (listOpen) return;
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") go(pos - 1, -1);
  }

  var bound = false;
  window.TripTour = {
    ids: Object.keys(TOURS),
    /* Called by app.js render() for #/tour/<id>[/<step>]. */
    show: function (container, id, step) {
      el = container;
      if (!bound) {
        document.addEventListener("click", onClick);
        document.addEventListener("keydown", onKey);
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        bound = true;
      }
      var nid = TOURS[id] ? id : "vienna-city";
      var want = step != null && !isNaN(step) ? Math.max(0, Math.min(TOURS[nid].deck.length - 1, step)) : 0;
      if (nid === tourId && want === pos && el.firstElementChild) return;
      tourId = nid; tour = TOURS[nid]; pos = want;
      draw(0);
    },
    hide: function () { stopAuto(); if (io) io.disconnect(); listOpen = false; }
  };
})();
