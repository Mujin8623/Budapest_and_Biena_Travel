/* Tour mode: full-screen, one card at a time.
   #/tour/vienna-city  — 11/29 city walk, Karlsplatz → arrival at Belvedere (hand-off to the artwork tour)
   #/tour/belvedere    — Upper Belvedere artwork tour (10 works), ends with the walk to the hotel
   Optional step: #/tour/<id>/<n>. Position is also kept in localStorage per tour.
   Audio: six-guide relay (data/relay.js + assets/js/relay.js). Each card's narration is split into short
   segments; every segment is read by one of its 3 assigned stock synthetic voices (xAI TTS, fictional guide
   characters), never the same voice twice in a row, with a short handover line in between. When a stop's
   narration ends, playback stops and the walking-directions card opens; the next stop starts when the user
   taps "도착 · 다음 장소". Clips are fetched on demand into the "trip-audio-v1" cache; the start card has an
   optional "오프라인 저장" button that stores the whole tour. */
(function () {
  "use strict";
  var DATE = "2026-11-29";
  var TRIP = window.TRIP;
  var G = window.TRIP_GUIDE && window.TRIP_GUIDE[DATE];
  var S = (window.TRIP_STORY && window.TRIP_STORY[DATE]) || { stops: {}, artworks: {} };
  if (!TRIP || !G) return;
  var RD = window.TRIP_RELAY, RL = window.TripRelay, HAS_RELAY = !!(RD && RL);
  var AUDIO_CACHE = "trip-audio-v1";
  var day = TRIP.days.find(function (d) { return d.date === DATE; });
  var all = day.items.map(function (it) { return Object.assign({}, it, { place: Object.assign({ id: it.placeId }, TRIP.places[it.placeId]) }); });
  var bIdx = all.findIndex(function (it) { return it.placeId === G.artworksFor; });
  var BACK = "#/schedule/" + DATE;

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function legBetween(a, b) { return G.legs.find(function (l) { return l.from === a && l.to === b; }) || null; }
  function km(m) { return m >= 1000 ? (m / 1000).toFixed(1) + " km" : Math.round(m / 10) * 10 + " m"; }
  /* Line icons (SVG, so they look the same on every OS instead of emoji / text glyphs). */
  function ico(d) { return '<svg class="tm-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + d + "</svg>"; }
  var I = {
    close: ico('<path d="M6 6l12 12M18 6L6 18"/>'),
    back: ico('<path d="M15 5l-7 7 7 7"/>'),
    ext: ico('<path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4"/>'),
    walk: ico('<circle cx="13" cy="4.5" r="1.8"/><path d="M10 21l2.2-6.2M14.5 21l-1.6-4.6-2.3-2.4.9-4.6M8 12.5l1.6-3.4 3-.9 2.2 2.6 2.7 1"/>'),
    tram: ico('<rect x="5" y="6" width="14" height="12" rx="3"/><path d="M5 12h14M9 3h6M12 3v3M8 21l1.5-3M16 21l-1.5-3"/><circle cx="8.5" cy="15" r=".6"/><circle cx="15.5" cy="15" r=".6"/>'),
    metro: ico('<rect x="5" y="3.5" width="14" height="14" rx="4"/><path d="M9 21l1.5-3.5M15 21l-1.5-3.5M5 11h14"/><circle cx="9" cy="14.3" r=".6"/><circle cx="15" cy="14.3" r=".6"/>'),
    save: ico('<path d="M12 4v11M7 10l5 5 5-5M5 19h14"/>'),
    check: ico('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    retry: ico('<path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/>')
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
  function smooth() { return reduceMotion && reduceMotion.matches ? "auto" : "smooth"; }
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
      + '<a class="tm-close" href="' + BACK + '" aria-label="투어 닫고 일정으로">' + I.close + "</a>"
      + '<button type="button" class="tm-prog" data-tm="list" aria-label="전체 순서 보기 (' + esc(label) + ')"><span class="tm-prog-bar">' + segs + '</span><span class="tm-prog-num">' + esc(label) + "</span></button></div>";
  }
  var ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
  /* Text-only fallback for a card without relay audio. */
  function audioSlot(firstId) {
    return '<div class="tm-audio" data-audio-for="' + esc(firstId) + '">'
      + '<button type="button" class="tm-audio-play" disabled aria-disabled="true" aria-label="음성 해설 없음">' + ICON_PLAY + "</button>"
      + '<span class="tm-audio-label">이 화면은 글로만 봐요</span>'
      + '<button type="button" class="tm-chip" data-tm="auto" aria-pressed="' + auto + '">글 자동 넘김</button></div>';
  }
  /* Relay player: play/pause, speaker name chip (initial avatar) + handover line, next segment,
     one-line AI-voice note and (start card) the offline-save chip. */
  function relaySlot(segs, withSave) {
    var sec = segs.reduce(function (t, x) { return t + (x.d || 0) + 6; }, 0), min = Math.max(1, Math.round(sec / 60));
    return '<div class="tm-relay" data-relay>'
      + '<div class="tm-relay-ctrl">'
      + '<button type="button" class="tm-relay-play" data-tm="rplay" aria-label="음성 해설 재생">' + ICON_PLAY + "</button>"
      + '<div class="tm-relay-now"><p class="tm-relay-top"><span class="tm-relay-who">여섯 가이드 릴레이</span><span class="tm-relay-pos">' + segs.length + "구간 · 약 " + min + "분</span>"
      + '<span class="tm-relay-eq" aria-hidden="true"><i></i><i></i><i></i></span></p>'
      + '<p class="tm-relay-hand" aria-live="polite">재생을 누르면 가이드들이 번갈아 읽어 줘요.</p></div>'
      + '<button type="button" class="tm-relay-skip" data-tm="rnext" aria-label="다음 구간"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14l9-7zM16 5h3v14h-3z"/></svg></button>'
      + "</div>"
      + '<div class="tm-relay-foot"><p class="tm-relay-note">AI 합성 음성(xAI) · 가이드 6명은 가상 캐릭터예요</p>'
      + (withSave ? saveBtn() : "") + "</div>"
      + "</div>";
  }
  /* Offline-save chip. data-state: idle | loading (progress fill via --p) | done | failed. */
  function saveMb() { return Math.round(RD.tours[tourId].bytes / 1048576); }
  function saveBtn() {
    return '<button type="button" class="tm-relay-save" data-tm="rsave" data-state="idle" aria-live="polite" aria-busy="false">'
      + I.save + '<span class="tm-relay-save-txt">오프라인 저장 · ' + saveMb() + " MB</span></button>";
  }
  function saveState(btn, state, text, pct) {
    btn.dataset.state = state;
    btn.setAttribute("aria-busy", String(state === "loading"));
    if (pct != null) btn.style.setProperty("--p", pct + "%"); else btn.style.removeProperty("--p");
    var icon = state === "done" ? I.check : state === "failed" ? I.retry : I.save, old = btn.querySelector(".tm-ico");
    if (old && old.getAttribute("data-k") !== state) { old.outerHTML = icon; btn.querySelector(".tm-ico").setAttribute("data-k", state); }
    btn.querySelector(".tm-relay-save-txt").textContent = text;
  }
  function relaySegs(c) {
    if (!HAS_RELAY || !c) return null;
    var t = RD.tours[tourId], list = null;
    if (!t) return null;
    if (c.t === "start" || c.t === "bstart") list = t.start;
    else if (c.t === "end" || c.t === "bend") list = t.end;
    else if (c.t === "stop") list = t.stops[city[c.i].placeId];
    else if (c.t === "art") list = t.stops[G.artworks[c.j].id];
    return list && list.length ? list : null;
  }
  function relayParas(segs) { return segs.map(function (x) { return { id: x.id, text: x.text }; }); }
  function relayBlock(c, withSave) { var rs = relaySegs(c); return rs ? relaySlot(rs, withSave) + story(relayParas(rs)) : ""; }
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
      + (pos > 0 ? '<button type="button" class="tm-btn tm-ghost tm-prev" data-tm="prev" aria-label="이전">' + I.back + "</button>" : "")
      + (opts.secondary || "")
      + (opts.href ? '<a class="tm-btn tm-primary" href="' + esc(opts.href) + '">' + primary + "</a>"
        : '<button type="button" class="tm-btn tm-primary" data-tm="' + (opts.act || "next") + '">' + primary + "</button>")
      + "</footer>";
  }
  function legCard(l, from, to, opts) {
    opts = opts || {};
    var mode = l ? l.mode : "walk", icon = mode === "walk" ? I.walk : mode === "tram" ? I.tram : I.metro;
    var meta = l ? l.min + "분" + (mode === "walk" && l.m ? " · " + km(l.m) : "") : "";
    var sub = l && l.tramM ? "트램 D " + km(l.tramM) + " + 걷기 " + km(l.m) : mode === "transit" ? "지하철 + 걷기" : "";
    var gm = "https://www.google.com/maps/dir/?api=1&destination=" + to.place.lat + "," + to.place.lng + "&travelmode=" + (mode === "walk" ? "walking" : "transit");
    return '<p class="tm-leg-meta">' + icon + esc(meta) + "</p>"
      + (sub ? '<p class="tm-leg-sub">' + esc(sub) + "</p>" : "")
      + (l && (l.path || l.tram) ? miniMap(l, opts.context) : "")
      + '<p class="tm-leg-text"' + (l ? ' data-guide-id="' + esc(l.id) + '"' : "") + ">" + esc(l ? l.text : to.note || "") + "</p>"
      + '<a class="tm-maplink" href="' + gm + '" target="_blank" rel="noopener noreferrer">지도 앱으로 길 찾기' + I.ext + "</a>";
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
      + (relaySegs(tour.deck[pos]) ? relayBlock(tour.deck[pos], true)
        : '<p class="tm-lead" data-guide-id="' + esc(G.intro.id) + '">' + esc(G.intro.text) + "</p>")
      + '<p class="tm-hint">카를스플라츠에서 출발해 트램 D로 벨베데레에 도착하면 끝나요. 벨베데레 작품 투어는 따로 시작해요. 옆으로 넘기거나 아래 큰 버튼을 누르면 다음으로 가요.</p>'
      + (resume ? '<button type="button" class="tm-resume" data-tm="go" data-to="' + st.pos + '"><span>이어서 하기</span><b>' + esc(city[resume.i].place.name) + " · " + (resume.i + 1) + "/" + city.length + "</b></button>" : "")
      + "</div>" + bar("투어 시작") + "</section>";
  }
  function cStop(c) {
    var it = city[c.i], p = it.place, st = S.stops[p.id], gs = G.stops[p.id] || { paras: [], sources: [] };
    var rs = relaySegs(c), paras = rs ? relayParas(rs) : st ? st.paras : gs.paras;
    return '<section class="tm-screen">'
      + '<div class="tm-hero">' + heroImg(p) + '<div class="tm-shade"></div>' + top(city.length, c.i, (c.i + 1) + "/" + city.length)
      + '<div class="tm-hero-txt"><p class="tm-kicker"><span class="tm-time">' + esc(it.time) + "</span>" + esc(p.name) + "</p><h1>" + esc(it.text) + "</h1></div></div>"
      + '<div class="tm-body">' + (rs ? relaySlot(rs) : audioSlot(paras[0] ? paras[0].id : "g-" + p.id))
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
      + '<div class="tm-peek">' + (to.place.photo ? '<img src="' + esc(thumb(to.place.photo)) + '" alt="" loading="lazy">' : "") + '<div><p class="tm-kicker">도착하면</p><p>' + esc(to.text) + "</p>"
      + (HAS_RELAY ? '<p class="tm-peek-hint">아래 버튼을 누르면 다음 장소 해설이 이어서 나와요.</p>' : "") + "</div></div>"
      + "</div>" + bar(HAS_RELAY ? "도착 · 다음 장소" : "도착했어요") + "</section>";
  }
  function cEnd() {
    return '<section class="tm-screen tm-end">'
      + '<div class="tm-hero">' + heroImg(belvedere.place) + '<div class="tm-shade"></div>' + top(city.length, city.length, "완료")
      + '<div class="tm-hero-txt"><p class="tm-kicker">' + esc(belvedere.time) + " · " + esc(belvedere.place.name) + "</p><h1>벨베데레에 도착했어요</h1></div></div>"
      + '<div class="tm-body">' + (relaySegs(tour.deck[pos]) ? relayBlock(tour.deck[pos]) : '<p class="tm-lead">구시가지 ' + city.length + "곳을 지나 여기까지 왔어요. 시내 걷기는 여기서 끝이에요. 수고했어요!</p>")
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
      + (relaySegs(tour.deck[pos]) ? relayBlock(tour.deck[pos], true) : audioSlot(gs.paras[0] ? gs.paras[0].id : "g-belvedere") + story(gs.paras))
      + '<p class="tm-tipline">' + esc(G.artworksNote) + "</p>"
      + (relaySegs(tour.deck[pos]) ? '<div class="tm-relay-done" hidden><p class="tm-kicker">첫 작품</p><p><b>' + esc(G.artworks[0].title) + "</b> · " + esc(G.artworks[0].where) + "</p></div>" : "")
      + (belvedere.note ? '<details class="tm-tip"><summary>현장 메모</summary><p>' + esc(belvedere.note) + "</p></details>" : "")
      + sources(gs.sources)
      + (resume ? '<button type="button" class="tm-resume" data-tm="go" data-to="' + st.pos + '"><span>이어서 하기</span><b>' + esc(G.artworks[resume.j].title) + " · " + (resume.j + 1) + "/" + G.artworks.length + "</b></button>" : "")
      + "</div>" + bar("작품 투어 시작 · " + G.artworks.length + "점") + "</section>";
  }
  function bArt(c) {
    var a = G.artworks[c.j], st = S.artworks[a.id], rs = relaySegs(c), paras = rs ? relayParas(rs) : st ? st.paras : a.paras, n = G.artworks.length;
    return '<section class="tm-screen tm-art">'
      + '<div class="tm-art-hero">' + top(n, c.j, "작품 " + (c.j + 1) + "/" + n)
      + (a.photo ? '<figure class="tm-art-fig"><img src="' + esc(a.photo) + '" alt="' + esc(a.title + " · " + a.artist) + '" decoding="async"></figure>' : "")
      + '<div class="tm-art-cap"><p class="tm-art-where"><span>' + String(c.j + 1).padStart(2, "0") + "</span>" + esc(a.where) + "</p><h1>" + esc(a.title) + "</h1>"
      + '<p class="tm-art-by">' + esc(a.artist) + " · " + esc(a.year) + "</p></div></div>"
      + '<div class="tm-body">' + (rs ? relaySlot(rs) : audioSlot(paras[0].id)) + story(paras)
      + (rs && c.j < n - 1 ? '<div class="tm-relay-done" hidden><p class="tm-kicker">다음 작품</p><p><b>' + esc(G.artworks[c.j + 1].title) + "</b> · " + esc(G.artworks[c.j + 1].where) + "</p></div>" : "")
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
      + '<div class="tm-body">' + relayBlock(tour.deck[pos])
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
    stopAuto(); rStop();
    el.innerHTML = screen() + '<div class="tm-sheet" hidden></div>';
    if (dir) el.firstElementChild.classList.add(dir > 0 ? "tm-in-r" : "tm-in-l");
    window.scrollTo(0, 0);
    watchParas(); save(); listOpen = false;
    var start = P.autostart; P.autostart = false;
    if (start && relaySegs(tour.deck[pos])) rPlayFrom(0);
  }
  function go(to, dir) { if (to < 0 || to >= tour.deck.length) return; pos = to; draw(dir); }
  /* User moved on (button, swipe, arrow key): if the relay was playing or had just finished, keep it going. */
  function next() { P.autostart = P.armed; go(pos + 1, 1); }

  /* ---------- relay audio player ---------- */
  var P = { audio: null, relay: null, relayTour: null, card: -1, plan: [], k: 0, phase: "idle", playing: false, armed: false, autostart: false, timer: null, url: null, token: 0 };
  function rKey() { return "tourRelay:" + tourId; }
  function rRelay() {
    if (!P.relay || P.relayTour !== tourId) {
      var saved = null;
      try { saved = JSON.parse(localStorage.getItem(rKey()) || "null"); } catch (e) {}
      P.relay = new RL.Relay(RD, saved); P.relayTour = tourId;
    }
    return P.relay;
  }
  function rSaveState() { try { localStorage.setItem(rKey(), JSON.stringify(P.relay.state())); } catch (e) {} }
  function rItem(k) {
    var segs = relaySegs(tour.deck[pos]);
    if (!segs || k >= segs.length) return null;
    while (P.plan.length <= k) { P.plan.push(rRelay().next(segs[P.plan.length])); rSaveState(); }
    return P.plan[k];
  }
  var canCache = typeof caches !== "undefined" && /^https?:$/.test(location.protocol);
  function cached(url) {
    if (!canCache) return Promise.resolve(null);
    return caches.open(AUDIO_CACHE).then(function (c) {
      return c.match(url).then(function (hit) {
        if (hit) return hit;
        return fetch(url).then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return c.put(url, res.clone()).then(function () { return res; }, function () { return res; }); });
      });
    });
  }
  function prefetch(item) { if (item && canCache) { cached(item.hand.src).catch(function () {}); cached(item.src).catch(function () {}); } }
  function rSrc(url) {
    if (!canCache) return Promise.resolve(url);
    return cached(url).then(function (res) { return res.blob(); }).then(function (b) {
      if (P.url) URL.revokeObjectURL(P.url);
      P.url = URL.createObjectURL(b); return P.url;
    });
  }
  function rAudio() {
    if (!P.audio) {
      P.audio = new Audio(); P.audio.preload = "auto";
      P.audio.addEventListener("ended", rEnded);
      P.audio.addEventListener("error", function () { if (P.playing) rFail(); });
    }
    return P.audio;
  }
  function rUi() {
    var box = el && el.querySelector("[data-relay]"); if (!box) return;
    var it = P.card === pos ? P.plan[P.k] : null, segs = relaySegs(tour.deck[pos]) || [];
    var btn = box.querySelector(".tm-relay-play");
    btn.innerHTML = P.playing ? ICON_PAUSE : ICON_PLAY;
    btn.setAttribute("aria-label", P.playing ? "일시정지" : "음성 해설 재생");
    box.classList.toggle("is-playing", P.playing);
    box.classList.toggle("is-hand", P.phase === "hand");
    if (it) {
      var who = box.querySelector(".tm-relay-who");
      var vc = RD.voices[it.voice];
      who.textContent = vc.name; who.setAttribute("data-initial", vc.name.charAt(0));
      who.style.setProperty("--c", vc.color); box.style.setProperty("--c", vc.color);
      who.classList.add("is-voice");
      box.querySelector(".tm-relay-pos").textContent = (P.k + 1) + "/" + segs.length;
      box.querySelector(".tm-relay-hand").textContent = it.hand.text;
    }
  }
  function rFocus() {
    var ps = el.querySelectorAll(".tm-para"), p = ps[P.k];
    if (p) { setOn(p); p.scrollIntoView({ behavior: smooth(), block: "center" }); }
  }
  function rStep(phase) {
    var it = rItem(P.k), tok = ++P.token;
    if (!it) { rDone(); return; }
    P.phase = phase; rUi();
    if (phase === "hand") { rFocus(); prefetch(rItem(P.k + 1)); }
    rSrc(phase === "hand" ? it.hand.src : it.src).then(function (src) {
      if (tok !== P.token || !P.playing) return;
      var a = rAudio(); a.src = src;
      var pr = a.play(); if (pr && pr.catch) pr.catch(function () { if (tok === P.token) { P.playing = false; P.armed = false; rUi(); } });
    }, function () { if (tok === P.token) rFail(); });
  }
  function rEnded() {
    if (!P.playing) return;
    var tok = P.token;
    P.timer = setTimeout(function () {
      if (tok !== P.token || !P.playing) return;
      if (P.phase === "hand") rStep("seg");
      else { P.k += 1; rStep("hand"); }
    }, 500);
  }
  function rFail() {
    P.playing = false; P.armed = false; P.token += 1; rUi();
    var h = el && el.querySelector(".tm-relay-hand");
    if (h) h.textContent = navigator.onLine === false ? "오프라인이라 음성을 불러오지 못했어요. 시작 화면에서 오프라인 저장을 해 두면 돼요." : "음성을 불러오지 못했어요. 잠시 뒤 다시 눌러 주세요.";
  }
  /* Narration of this card is over: stop. A stop opens its walking directions; other cards highlight the next step. */
  function rDone() {
    P.playing = false; P.phase = "done"; P.token += 1; rUi();
    var h = el.querySelector(".tm-relay-hand"); if (h) h.textContent = "여기 해설은 끝났어요.";
    var nx = tour.deck[pos + 1];
    if (nx && nx.t === "leg") { var at = pos; setTimeout(function () { if (pos === at && P.phase === "done") go(pos + 1, 1); }, 1200); return; }
    var d = el.querySelector(".tm-relay-done"); if (d) { d.hidden = false; d.scrollIntoView({ behavior: smooth(), block: "center" }); }
    var b = el.querySelector(".tm-bar .tm-primary"); if (b) b.classList.add("tm-pulse");
  }
  function rPlayFrom(k) {
    if (!relaySegs(tour.deck[pos])) return;
    clearTimeout(P.timer);
    if (P.card !== pos) {
      P.card = pos; P.plan = [];
      /* A fresh start of the tour begins with a guide introducing herself/himself again. */
      var t = tour.deck[pos].t; if (k === 0 && (t === "start" || t === "bstart")) rRelay().reset();
    }
    P.k = k; P.playing = true; P.armed = true;
    var a = rAudio(); try { a.pause(); } catch (e) {}
    rStep("hand");
  }
  function rToggle() {
    if (P.playing) { P.playing = false; P.armed = false; P.token += 1; clearTimeout(P.timer); try { P.audio.pause(); } catch (e) {} rUi(); return; }
    if (P.card === pos && P.phase !== "done" && P.phase !== "idle" && P.audio && P.audio.src && !P.audio.ended) {
      P.playing = true; P.armed = true; rUi();
      var pr = P.audio.play(); if (pr && pr.catch) pr.catch(function () { rPlayFrom(P.k); });
      return;
    }
    rPlayFrom(P.card === pos && P.phase !== "done" ? P.k : 0);
  }
  function rSkip() {
    var segs = relaySegs(tour.deck[pos]); if (!segs) return;
    var k = P.card === pos ? P.k + 1 : 1;
    if (P.card === pos && P.phase === "done") return;
    if (k >= segs.length) { P.card = pos; P.armed = true; clearTimeout(P.timer); try { P.audio && P.audio.pause(); } catch (e) {} rDone(); return; }
    rPlayFrom(k);
  }
  function rStop() {
    clearTimeout(P.timer); P.token += 1; P.playing = false; P.phase = "idle"; P.card = -1; P.plan = []; P.k = 0;
    if (P.audio) { try { P.audio.pause(); } catch (e) {} }
  }
  /* Optional: store every clip of this tour for offline use (not part of the app-shell precache). */
  function rSaveOffline(btn) {
    if (!canCache) { saveState(btn, "failed", "이 브라우저에서는 저장할 수 없어요"); return; }
    if (btn.dataset.state === "loading") return;
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});
    var list = RL.files(RD, tourId), done = 0, failed = 0, n = list.length;
    saveState(btn, "loading", "저장 중 0/" + n, 0);
    caches.open(AUDIO_CACHE).then(function (c) {
      var i = 0;
      function worker() {
        if (i >= n) return Promise.resolve();
        var url = list[i++];
        return c.match(url).then(function (hit) { return hit || fetch(url).then(function (r) { if (!r.ok) throw 0; return c.put(url, r); }); })
          .then(function () { done += 1; }, function () { failed += 1; })
          .then(function () { var k = done + failed; saveState(btn, "loading", "저장 중 " + k + "/" + n, Math.round(k / n * 100)); return worker(); });
      }
      return Promise.all([worker(), worker(), worker(), worker()]);
    }).then(function () {
      if (!failed) saveState(btn, "done", "오프라인 저장 완료 · " + saveMb() + " MB");
      else if (!done) saveState(btn, "failed", "저장 실패 · 다시 시도");
      else saveState(btn, "failed", "일부 실패 (" + failed + "개) · 다시 시도");
    }, function () { saveState(btn, "failed", "저장 실패 · 다시 시도"); });
  }

  function setOn(p) { el.querySelectorAll(".tm-para.on").forEach(function (x) { x.classList.remove("on"); }); p.classList.add("on"); }
  function watchParas() {
    if (io) io.disconnect();
    var ps = el.querySelectorAll(".tm-para");
    if (!ps.length || !("IntersectionObserver" in window)) return;
    io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && !auto && !P.playing) setOn(e.target); }); }, { rootMargin: "-40% 0px -55% 0px" });
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
      setOn(p); p.scrollIntoView({ behavior: smooth(), block: "center" });
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
    if (!t || !el.contains(t)) {
      var p = e.target.closest(".tm-para");
      if (p && el.contains(p)) {
        stopAuto(); setOn(p);
        if (P.playing && relaySegs(tour.deck[pos])) rPlayFrom([].indexOf.call(el.querySelectorAll(".tm-para"), p));
      }
      return;
    }
    var a = t.dataset.tm;
    if (a === "next") next();
    else if (a === "prev") go(pos - 1, -1);
    else if (a === "go") { var to = +t.dataset.to; go(to, to >= pos ? 1 : -1); }
    else if (a === "last") go(tour.deck.length - 1, 1);
    else if (a === "list") openList();
    else if (a === "close") closeList();
    else if (a === "auto") { if (auto) stopAuto(); else startAuto(); }
    else if (a === "rplay") rToggle();
    else if (a === "rnext") rSkip();
    else if (a === "rsave") rSaveOffline(t);
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
    hide: function () { stopAuto(); rStop(); if (io) io.disconnect(); listOpen = false; }
  };
})();
