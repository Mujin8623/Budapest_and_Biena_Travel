(function () {
  const TRIP = window.TRIP;
  if (!TRIP || !TRIP.days || !TRIP.places) {
    document.body.textContent = "일정 데이터를 불러오지 못했습니다.";
    return;
  }
  Object.keys(TRIP.places).forEach((id) => {
    TRIP.places[id].id = id;
  });

  const $ = (id) => document.getElementById(id);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

  const state = {
    travel: "transit",
    scheduleKey: "",
    lastScheduleDay: "",
    map: null,
    mapPromise: null,
    linesLayer: null,
    stationLayer: null,
    hotelLayer: null,
    tourLayer: null,
    railLayer: null,
    railOn: false,
    tourLines: false,
    lastFocus: "",
    hadFocus: false,
    lastTransit: "",
    tileErrors: 0,
    tilesOk: false
  };

  try {
    const saved = sessionStorage.getItem("trip-travel");
    if (saved === "walking" || saved === "transit") state.travel = saved;
  } catch (err) { /* session storage can be blocked */ }

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  function calendarDate(timeZone) {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date());
  }

  function seoulToday() {
    return calendarDate("Asia/Seoul");
  }

  function tripToday() {
    const seoul = seoulToday();
    const vienna = calendarDate("Europe/Vienna");
    const start = TRIP.days[0].date;
    if (vienna >= start && vienna <= "2026-12-06") return { date: vienna, basis: "비엔나" };
    return { date: seoul, basis: "서울" };
  }

  function daysBetween(from, to) {
    const a = from.split("-").map(Number);
    const b = to.split("-").map(Number);
    return Math.round((Date.UTC(b[0], b[1] - 1, b[2]) - Date.UTC(a[0], a[1] - 1, a[2])) / 86400000);
  }

  function ko(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    const w = WEEK[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
    return { w: w, long: m + "월 " + d + "일", chip: m + "/" + d + " " + w };
  }

  function placeById(id) {
    return id ? TRIP.places[id] : null;
  }

  function dayByDate(iso) {
    return TRIP.days.find((day) => day.date === iso) || null;
  }

  function defaultDay() {
    const today = tripToday().date;
    return (TRIP.days.find((day) => day.date === today)
      || TRIP.days.find((day) => day.date > today)
      || TRIP.days[TRIP.days.length - 1]).date;
  }

  function isDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value || "");
  }

  function parseRoute() {
    const parts = (location.hash || "#/home").replace(/^#/, "").split("/").filter(Boolean);
    const head = parts[0] || "home";
    if (head === "schedule") return { view: "schedule", day: isDate(parts[1]) ? parts[1] : null };
    if (head === "place") {
      if (isDate(parts[1])) return { view: "schedule", day: parts[1], sheet: parts[2] || null };
      return { view: "schedule", sheet: parts[1] || null };
    }
    if (head === "route") return { view: "schedule", day: isDate(parts[1]) ? parts[1] : null, routeSheet: true };
    if (head === "map") {
      if (isDate(parts[1])) return { view: "map", mode: "tour", day: parts[1], placeId: parts[2] || null };
      return { view: "map", mode: "tour", placeId: parts[1] || null };
    }
    if (head === "transit") {
      return { view: "map", mode: "transit", city: parts[1] === "budapest" ? "budapest" : "vienna" };
    }
    if (head === "info") return { view: "info" };
    if (head === "docs") return { view: "docs", docId: parts[1] || null };
    return { view: "home" };
  }

  function go(hash, replace) {
    if (replace) {
      if (location.hash !== hash) history.replaceState(null, "", hash);
      render();
      return;
    }
    if (location.hash !== hash) location.hash = hash;
    else render();
  }

  function coord(place) {
    return place.lat + "," + place.lng;
  }

  function dirUrl(opts) {
    const mode = opts.mode === "walking" ? "walking" : "transit";
    let url = "https://www.google.com/maps/dir/?api=1";
    if (opts.origin) url += "&origin=" + coord(opts.origin);
    url += "&destination=" + coord(opts.destination);
    if (mode !== "transit" && opts.waypoints && opts.waypoints.length) {
      url += "&waypoints=" + opts.waypoints.map(coord).join("%7C");
    }
    url += "&travelmode=" + mode;
    return url;
  }

  function mapUrl(place) {
    return "https://www.google.com/maps/search/?api=1&query=" + coord(place);
  }

  function km(a, b) {
    const r = 6371;
    const dLat = (b.lat - a.lat) * Math.PI / 180;
    const dLng = (b.lng - a.lng) * Math.PI / 180;
    const la1 = a.lat * Math.PI / 180;
    const la2 = b.lat * Math.PI / 180;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
    return 2 * r * Math.asin(Math.min(1, Math.sqrt(h)));
  }

  function dirLabel() {
    return state.travel === "walking" ? "도보 길찾기" : "길찾기";
  }

  function modeSwitch() {
    const transit = state.travel !== "walking";
    return '<div class="seg" role="group" aria-label="길찾기 수단">'
      + '<button type="button" data-action="mode" data-mode="transit" aria-pressed="' + transit + '">대중교통</button>'
      + '<button type="button" data-action="mode" data-mode="walking" aria-pressed="' + !transit + '">도보</button>'
      + "</div>";
  }

  function stationText(place) {
    if (!place || !place.station) return "";
    return place.lines ? place.lines + " · " + place.station : place.station;
  }

  function photoHtml(place, eager) {
    if (!place || !place.photo) {
      return '<span class="ph">' + esc(place && place.city ? place.city : "사진") + "</span>";
    }
    if (eager) {
      return '<img class="sheet-photo" src="' + esc(place.photo) + '" alt="" decoding="async">';
    }
    const thumb = place.photo.replace("assets/img/", "assets/img/thumbs/");
    return '<img class="thumb" src="' + esc(thumb) + '" srcset="' + esc(thumb) + " 240w, " + esc(place.photo)
      + ' 800w" sizes="72px" alt="" loading="lazy" decoding="async">';
  }

  function extLink(url, label, primary) {
    return '<a class="btn' + (primary ? " btn-primary" : "") + '" href="' + esc(url)
      + '" target="_blank" rel="noopener noreferrer">' + esc(label) + "</a>";
  }

  function nextPlace(day, index) {
    const here = placeById(day.items[index].placeId);
    if (!here) return null;
    for (let i = index + 1; i < day.items.length; i += 1) {
      const place = placeById(day.items[i].placeId);
      if (place && place.id !== here.id) return place;
    }
    return null;
  }

  function dayStops(day) {
    const stops = [];
    day.items.forEach((item) => {
      const place = placeById(item.placeId);
      if (!place || place.lat == null) return;
      const prev = stops[stops.length - 1];
      if (prev && prev.place.id === place.id) return;
      stops.push({ item: item, place: place });
    });
    return stops;
  }

  function guideFor(date) {
    const all = window.TRIP_GUIDE;
    return all && date && all[date] ? all[date] : null;
  }

  function guideLeg(guide, fromId, toId) {
    if (!guide || !guide.legs) return null;
    return guide.legs.find((leg) => leg.from === fromId && leg.to === toId) || null;
  }

  function legMeta(leg) {
    const icon = leg.mode === "tram" ? "🚋 트램" : leg.mode === "transit" ? "🚇 대중교통" : "🚶 도보";
    const parts = [icon, "약 " + leg.min + "분"];
    if (leg.mode === "walk" && leg.m) parts.push("약 " + (leg.m >= 1000 ? (leg.m / 1000).toFixed(1) + " km" : Math.round(leg.m / 10) * 10 + " m"));
    if (leg.mode === "tram" && leg.m) parts.push("내려서 도보 약 " + Math.round(leg.m / 10) * 10 + " m");
    return parts.join(" · ");
  }

  function legHtml(leg, cls) {
    return '<div class="' + cls + '" data-leg-id="' + esc(leg.id) + '"><p class="leg-meta">' + esc(legMeta(leg)) + "</p>"
      + '<p class="leg-text">' + esc(leg.text) + "</p></div>";
  }

  function parasHtml(paras) {
    return (paras || []).map((para) => '<p data-guide-id="' + esc(para.id) + '">' + esc(para.text) + "</p>").join("");
  }

  function sourcesHtml(sources) {
    if (!sources || !sources.length) return "";
    return '<p class="fine guide-sources">출처 · ' + sources.map((src) => {
      return '<a href="' + esc(src.url) + '" target="_blank" rel="noopener noreferrer">' + esc(src.title) + "</a>";
    }).join(" · ") + "</p>";
  }

  function artworksHtml(guide) {
    if (!guide.artworks || !guide.artworks.length) return "";
    const list = guide.artworks.map((art, i) => {
      return '<li class="art" data-art-id="' + esc(art.id) + '"><p class="art-head"><span class="art-no">' + (i + 1) + "</span>"
        + "<strong>" + esc(art.title) + "</strong></p>"
        + '<p class="art-sub">' + esc(art.artist) + " · " + esc(art.year) + ' · <span class="art-where">' + esc(art.where) + "</span></p>"
        + parasHtml(art.paras) + "</li>";
    }).join("");
    return '<section class="guide guide-art"><h3>상궁 작품 안내 · ' + guide.artworks.length + "점</h3>"
      + (guide.artworksNote ? '<p class="fine">' + esc(guide.artworksNote) + "</p>" : "")
      + '<ol class="art-list">' + list + "</ol>" + sourcesHtml(guide.artworkSources) + "</section>";
  }

  function canDirect(fromItem, fromPlace, toPlace, mode) {
    if (!fromPlace || !toPlace || fromPlace.lat == null || toPlace.lat == null) return false;
    if (fromItem && fromItem.leg) return false;
    const distance = km(fromPlace, toPlace);
    if (distance > 30) return false;
    if ((mode || state.travel) === "walking" && distance > 5) return false;
    return true;
  }

  function combinedWalking(stops) {
    if (stops.length < 3 || stops.length - 2 > 9) return null;
    for (let i = 1; i < stops.length; i += 1) {
      if (!canDirect(stops[i - 1].item, stops[i - 1].place, stops[i].place, "walking")) return null;
    }
    return dirUrl({
      origin: stops[0].place,
      destination: stops[stops.length - 1].place,
      waypoints: stops.slice(1, -1).map((stop) => stop.place),
      mode: "walking"
    });
  }

  function planFor(today) {
    const start = TRIP.days[0].date;
    const last = TRIP.days[TRIP.days.length - 1].date;
    const until = daysBetween(today, start);
    if (until > 0) return { kind: "before", days: until, day: TRIP.days[0] };
    if (today <= last) {
      const day = dayByDate(today) || TRIP.days[0];
      return { kind: "during", dayIndex: TRIP.days.indexOf(day) + 1, day: day };
    }
    if (today === "2026-12-06") return { kind: "arrive" };
    return { kind: "after" };
  }

  const DOC_LABELS = {
    "vienna-hotel": "문서 · 숙소",
    "budapest-hotel": "문서 · 숙소",
    "train-vie-bud": "문서 · 기차",
    "flight-eticket": "문서 · 항공권"
  };
  const vaultState = {
    booted: false,
    mode: "",
    key: null,
    remembered: false,
    busy: false,
    error: "",
    statusText: "",
    itemError: "",
    docId: "",
    urls: [],
    fileUrl: "",
    prepared: "",
    preparing: "",
    prepareToken: null,
    loading: null
  };

  function docChipLabel(id) {
    return DOC_LABELS[id] || "문서";
  }

  function vaultHas(id) {
    const items = window.TRIP_VAULT && window.TRIP_VAULT.items;
    if (!items) return true;
    return items.some((item) => item.id === id);
  }

  function docLinksHtml(date) {
    const ids = (TRIP.docs && TRIP.docs[date]) || [];
    if (!ids.length) return "";
    const chips = [];
    let missingFlight = false;
    ids.forEach((id) => {
      if (!vaultHas(id)) {
        if (id === "flight-eticket") missingFlight = true;
        return;
      }
      chips.push('<a class="chip doc-chip" href="#/docs/' + esc(id) + '">' + esc(docChipLabel(id)) + "</a>");
    });
    let html = "";
    if (chips.length) html += '<div class="doc-links" aria-label="이 날의 문서">' + chips.join("") + "</div>";
    if (missingFlight) html += '<p class="fine doc-missing">항공권은 아직 추가되지 않았어요</p>';
    return html;
  }

  function b64ToBytes(value) {
    const bin = atob(value);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
    return out;
  }

  function loadVaultData() {
    if (window.TRIP_VAULT) return Promise.resolve(window.TRIP_VAULT);
    if (vaultState.loading) return vaultState.loading;
    vaultState.loading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "data/vault.js";
      script.onload = () => {
        if (window.TRIP_VAULT) resolve(window.TRIP_VAULT);
        else reject(new Error("vault"));
      };
      script.onerror = () => reject(new Error("vault"));
      document.body.appendChild(script);
    });
    return vaultState.loading;
  }

  function vaultDb() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open("trip-vault", 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains("keys")) req.result.createObjectStore("keys");
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveVaultKey(key) {
    const db = await vaultDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction("keys", "readwrite");
      tx.objectStore("keys").put(key, "aes");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }

  async function readVaultKey() {
    const db = await vaultDb();
    const key = await new Promise((resolve, reject) => {
      const tx = db.transaction("keys", "readonly");
      const req = tx.objectStore("keys").get("aes");
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    db.close();
    return key;
  }

  async function deleteVaultKey() {
    const db = await vaultDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction("keys", "readwrite");
      tx.objectStore("keys").delete("aes");
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }

  async function deriveVaultKey(password) {
    const vault = window.TRIP_VAULT;
    const material = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveKey"]
    );
    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: b64ToBytes(vault.kdf.salt),
        iterations: vault.kdf.iterations,
        hash: "SHA-256"
      },
      material,
      { name: "AES-GCM", length: 256 },
      false,
      ["decrypt"]
    );
  }

  async function decryptVaultBytes(key, iv, ct) {
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: b64ToBytes(iv) },
      key,
      b64ToBytes(ct)
    );
    return new Uint8Array(plain);
  }

  async function vaultKeyMatches(key) {
    const check = window.TRIP_VAULT.check;
    const plain = await decryptVaultBytes(key, check.iv, check.ct);
    return new TextDecoder().decode(plain) === "trip-vault-ok";
  }

  function revokeDocUrls() {
    vaultState.urls.forEach((url) => URL.revokeObjectURL(url));
    vaultState.urls = [];
    vaultState.fileUrl = "";
    vaultState.prepared = "";
    vaultState.preparing = "";
    vaultState.prepareToken = null;
  }

  function focusDocs(selector) {
    const root = $("view-docs");
    if (!root) return;
    const target = (selector && root.querySelector(selector)) || root.querySelector("[data-autofocus]");
    if (target && typeof target.focus === "function") target.focus();
  }

  function vaultStatusHtml() {
    const text = vaultState.statusText || "확인하는 중";
    return '<p class="vault-status" role="status"><span class="spinner" aria-hidden="true"></span>' + esc(text) + "</p>";
  }

  function paintDocs() {
    const root = $("view-docs");
    if (!root) return;
    const vault = window.TRIP_VAULT;
    let body = "";
    if (vaultState.mode === "insecure") {
      body = '<div class="vault-panel"><h2 id="docs-title" tabindex="-1" data-autofocus>문서함</h2>'
        + '<p>이 페이지는 보안 연결이 아니라 문서를 열 수 없습니다. 주소가 https로 시작하는 페이지에서 다시 열어 주세요.</p></div>';
    } else if (vaultState.mode === "fail") {
      body = '<div class="vault-panel"><h2 id="docs-title" tabindex="-1" data-autofocus>문서함</h2>'
        + '<p class="vault-error" role="alert">' + esc(vaultState.error || "문서 파일을 불러오지 못했습니다.") + "</p></div>";
    } else if (vaultState.busy || vaultState.mode === "boot" || vaultState.mode === "busy") {
      body = '<div class="vault-panel"><h2 id="docs-title" tabindex="-1">문서함</h2>' + vaultStatusHtml() + "</div>";
    } else if (vaultState.mode === "open" && vault && vaultState.key) {
      const cards = (vault.items || []).map((item) => {
        const on = item.id === vaultState.docId ? ' aria-current="true"' : "";
        return '<a class="vault-card" href="#/docs/' + esc(item.id) + '"' + on + "><strong>"
          + esc(item.title) + "</strong><span>" + esc(item.subtitle || "") + "</span></a>";
      }).join("");
      let detail = "";
      if (vaultState.docId) {
        const item = (vault.items || []).find((entry) => entry.id === vaultState.docId);
        if (!item) {
          const missing = vaultState.docId === "flight-eticket"
            ? "항공권은 아직 추가되지 않았어요"
            : "문서를 찾지 못했습니다.";
          detail = '<div class="vault-panel"><p class="vault-error" role="status">' + missing + '</p>'
            + '<a class="btn" href="#/docs">목록</a></div>';
        } else if (vaultState.preparing === item.id || vaultState.prepared !== item.id) {
          detail = '<div class="vault-panel"><h2 id="docs-title" tabindex="-1">' + esc(item.title) + "</h2>"
            + vaultStatusHtml() + "</div>";
        } else {
          detail = '<div class="vault-panel"><p class="kicker">' + esc(item.subtitle || "") + "</p>"
            + '<h2 id="docs-title" tabindex="-1" data-autofocus>' + esc(item.title) + "</h2>"
            + (vaultState.itemError ? '<p class="vault-error" role="alert">' + esc(vaultState.itemError) + "</p>" : "")
            + '<div class="vault-actions"><a class="btn btn-primary" href="' + esc(vaultState.fileUrl)
            + '" target="_blank" rel="noopener">열기</a><a class="btn" href="' + esc(vaultState.fileUrl)
            + '" download="' + esc(item.id) + '.pdf">저장</a></div>'
            + '<a class="btn btn-block" href="#/docs">목록</a></div>';
        }
      }
      body = '<div class="vault-panel"><h2' + (vaultState.docId ? "" : ' id="docs-title" tabindex="-1" data-autofocus') + ">문서함</h2>"
        + '<p class="fine">이 기기의 메모리에만 열려 있습니다. 비밀번호와 원본 파일은 저장하지 않습니다.</p>'
        + '<div class="vault-actions"><button type="button" class="btn" data-action="vault-lock">잠그기</button>'
        + '<button type="button" class="btn" data-action="vault-forget">이 기기에서 잊기</button></div></div>'
        + (vaultState.docId ? detail : cards);
    } else {
      const alert = vaultState.error
        ? '<p id="vault-error" class="vault-error" role="alert" tabindex="-1">' + esc(vaultState.error) + "</p>"
        : "";
      body = '<form id="vault-form" class="vault-form" autocomplete="off">'
        + '<h2 id="docs-title" tabindex="-1">문서함</h2>'
        + '<p class="fine">숙소 바우처와 기차표를 엽니다.</p>'
        + '<label class="field-label" for="vault-password">비밀번호</label>'
        + '<input id="vault-password" name="password" type="password" autocomplete="current-password" autocapitalize="off" autocorrect="off" spellcheck="false"'
        + (vaultState.error ? ' aria-invalid="true" aria-describedby="vault-error"' : "")
        + (vaultState.error ? "" : ' data-autofocus')
        + ">"
        + '<label class="vault-check"><input id="vault-remember" type="checkbox"><span>이 기기에서 기억</span></label>'
        + '<button id="vault-open" class="btn btn-primary btn-block" type="submit">열기</button>'
        + alert
        + (vaultState.remembered ? '<div class="vault-actions"><button type="button" class="btn btn-block" data-action="vault-forget">이 기기에서 잊기</button></div>' : "")
        + "</form>";
    }
    root.innerHTML = '<div class="pad">' + body + "</div>";
    if (vaultState.error) focusDocs("#vault-error");
    else focusDocs("");
  }

  function maybePrepareDoc() {
    const id = vaultState.docId;
    if (vaultState.mode !== "open" || !vaultState.key || !id || !window.TRIP_VAULT) return;
    const item = (window.TRIP_VAULT.items || []).find((entry) => entry.id === id);
    if (!item) return;
    if (vaultState.prepared === id || vaultState.preparing === id) return;
    prepareDoc(item);
  }

  async function prepareDoc(item) {
    const token = {};
    vaultState.prepareToken = token;
    vaultState.preparing = item.id;
    vaultState.itemError = "";
    revokeDocUrls();
    vaultState.preparing = item.id;
    vaultState.prepareToken = token;
    vaultState.statusText = "여는 중";
    paintDocs();
    try {
      const bytes = await decryptVaultBytes(vaultState.key, item.iv, item.ct);
      if (vaultState.prepareToken !== token) return;
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      vaultState.urls.push(url);
      vaultState.fileUrl = url;
      vaultState.prepared = item.id;
    } catch (err) {
      if (vaultState.prepareToken !== token) return;
      vaultState.itemError = "문서를 열지 못했습니다.";
      vaultState.prepared = "";
      vaultState.fileUrl = "";
    }
    vaultState.preparing = "";
    vaultState.statusText = "";
    paintDocs();
  }

  async function bootDocs() {
    vaultState.mode = "boot";
    vaultState.statusText = "문서를 준비하고 있습니다";
    vaultState.error = "";
    paintDocs();
    if (!window.crypto || !crypto.subtle) {
      vaultState.mode = "insecure";
      paintDocs();
      return;
    }
    try {
      await loadVaultData();
    } catch (err) {
      vaultState.mode = "fail";
      vaultState.error = "문서 파일을 불러오지 못했습니다.";
      paintDocs();
      return;
    }
    let saved = null;
    try { saved = await readVaultKey(); } catch (err) { saved = null; }
    if (saved) {
      vaultState.mode = "busy";
      vaultState.statusText = "확인하는 중";
      paintDocs();
      try {
        if (await vaultKeyMatches(saved)) {
          vaultState.key = saved;
          vaultState.remembered = true;
          vaultState.mode = "open";
        } else {
          await deleteVaultKey().catch(() => {});
          vaultState.mode = "locked";
        }
      } catch (err) {
        await deleteVaultKey().catch(() => {});
        vaultState.mode = "locked";
      }
      paintDocs();
      maybePrepareDoc();
      return;
    }
    vaultState.mode = "locked";
    paintDocs();
  }

  function ensureDocs(route) {
    vaultState.docId = route.docId || "";
    if (!vaultState.booted) {
      vaultState.booted = true;
      bootDocs();
      return;
    }
    if (vaultState.mode === "open" && vaultState.docId && vaultState.prepared && vaultState.prepared !== vaultState.docId) {
      revokeDocUrls();
    }
    paintDocs();
    maybePrepareDoc();
  }

  async function submitVaultPassword(password, remember) {
    if (vaultState.busy) return;
    if (!password) {
      vaultState.error = "비밀번호를 입력해 주세요";
      vaultState.mode = "locked";
      paintDocs();
      return;
    }
    vaultState.busy = true;
    vaultState.error = "";
    vaultState.statusText = "확인하는 중";
    paintDocs();
    try {
      const key = await deriveVaultKey(password);
      const ok = await vaultKeyMatches(key);
      if (!ok) throw new Error("mismatch");
      vaultState.key = key;
      vaultState.mode = "open";
      vaultState.error = "";
      if (remember) {
        try {
          await saveVaultKey(key);
          vaultState.remembered = true;
        } catch (err) {
          vaultState.remembered = false;
        }
      }
    } catch (err) {
      vaultState.key = null;
      vaultState.mode = "locked";
      vaultState.error = "비밀번호가 맞지 않아요";
    } finally {
      vaultState.busy = false;
      vaultState.statusText = "";
    }
    paintDocs();
    if (vaultState.error && password) {
      const input = $("vault-password");
      if (input) input.value = password;
    }
    maybePrepareDoc();
  }

  async function forgetVault() {
    await deleteVaultKey().catch(() => {});
    vaultState.remembered = false;
    vaultState.key = null;
    vaultState.mode = "locked";
    vaultState.error = "";
    revokeDocUrls();
    paintDocs();
  }

  function lockVault() {
    vaultState.key = null;
    vaultState.mode = "locked";
    vaultState.error = "";
    revokeDocUrls();
    paintDocs();
  }

  function renderHome() {
    const clock = tripToday();
    const today = clock.date;
    const plan = planFor(today);
    let num = "다녀왔어요";
    let kicker = "여행";
    let sub = "일정은 11월 27일부터 12월 5일까지입니다. 12월 6일 인천 도착은 출발일에 함께 적혀 있습니다.";
    let day = TRIP.days[TRIP.days.length - 1];
    if (plan.kind === "before") {
      num = "D-" + plan.days;
      kicker = "출국까지";
      sub = "서울 기준 · " + ko(TRIP.days[0].date).long + " " + ko(TRIP.days[0].date).w + "요일 출국";
      day = plan.day;
    } else if (plan.kind === "during") {
      num = plan.dayIndex + "일차";
      kicker = "오늘";
      sub = clock.basis + " 기준 · " + ko(today).long + " · " + dayCity(plan.day);
      day = plan.day;
    } else if (plan.kind === "arrive") {
      num = "도착";
      kicker = "오늘";
      sub = "12월 6일 인천 도착. 일정 카드는 12월 5일 출발에 붙어 있습니다.";
      day = TRIP.days[TRIP.days.length - 1];
    }
    const lead = placeById(day.items[0].placeId);
    const rows = day.items.slice(0, 4).map((item) => {
      return "<li><b>" + esc(item.time || "·") + "</b><span>" + esc(item.text) + "</span></li>";
    }).join("");
    $("view-home").innerHTML = '<div class="pad">'
      + '<section class="dday"><p class="dday-kicker">' + esc(kicker) + '</p><p class="dday-num">' + esc(num) + "</p><p>" + esc(sub) + "</p></section>"
      + '<article class="hero">'
      + (lead && lead.photo ? '<img class="hero-photo" src="' + esc(lead.photo) + '" alt="">' : "")
      + '<div class="hero-body"><p class="kicker">' + (plan.kind === "before" ? "다음 일정" : (plan.kind === "during" ? "오늘 일정" : "귀국")) + "</p>"
      + "<h2>" + esc(ko(day.date).long) + " · " + esc(day.title) + "</h2>"
      + '<ul class="hero-list">' + rows + "</ul>"
      + docLinksHtml(day.date)
      + '<div class="hero-actions"><a class="btn" href="#/schedule/' + day.date + '">일정 보기</a>'
      + (lead ? extLink(dirUrl({ destination: lead, mode: state.travel }), dirLabel(), true) : "")
      + "</div></div></article>"
      + '<nav class="quick" aria-label="바로 가기">'
      + '<a href="#/schedule/' + defaultDay() + '"><strong>일정</strong><span>날짜별 동선</span></a>'
      + '<a href="#/map"><strong>사전답사</strong><span>장소마다 지도 이동</span></a>'
      + '<a href="#/transit"><strong>교통</strong><span>지하철 · 트램</span></a>'
      + '<a href="#/docs"><strong>문서함</strong><span>바우처 · 기차표</span></a>'
      + '<a href="#/info"><strong>정보</strong><span>항공 · 숙소 · 출처</span></a>'
      + "</nav></div>";
  }

  function dayCity(day) {
    return day.city || "";
  }

  function scheduleHtml(day) {
    const chips = TRIP.days.map((item) => {
      const on = item.date === day.date ? " is-on" : "";
      const current = item.date === day.date ? ' aria-current="true"' : "";
      return '<a class="chip' + on + '" href="#/schedule/' + item.date + '"' + current + ">" + esc(ko(item.date).chip) + "</a>";
    }).join("");
    const guide = guideFor(day.date);
    const stops = day.items.map((item, index) => {
      const place = placeById(item.placeId);
      const next = nextPlace(day, index);
      const leg = guide && place && next ? guideLeg(guide, place.id, next.id) : null;
      const hasGuide = guide && place && guide.stops && guide.stops[place.id];
      const href = "#/place/" + day.date + "/" + item.placeId;
      const nextLink = next && canDirect(item, place, next)
        ? extLink(dirUrl({ origin: place, destination: next, mode: state.travel }), "다음 장소", false)
        : "";
      return '<article class="stop"><div class="rail" aria-hidden="true"></div>'
        + '<a class="stop-main" href="' + href + '">' + photoHtml(place, false)
        + "<div>" + (item.time ? '<p class="when">' + esc(item.time) + "</p>" : "")
        + "<h3>" + esc(item.text) + "</h3>"
        + (stationText(place) ? '<p class="station">' + esc(stationText(place)) + "</p>" : "")
        + (item.note ? '<p class="fine">' + esc(item.note) + "</p>" : "")
        + (hasGuide ? '<p class="guide-pill">해설' + (guide.artworksFor === place.id ? " · 작품 " + guide.artworks.length + "점" : "") + "</p>" : "")
        + "</div></a><div class=\"stop-actions\">"
        + (place ? extLink(dirUrl({ destination: place, mode: state.travel }), dirLabel(), true) : "")
        + nextLink
        + "</div></article>"
        + (leg ? legHtml(leg, "leg") : "");
    }).join("");
    const notes = (day.notes || []).map((note) => {
      const rows = note.rows.map((row) => "<div><dt>" + esc(row[0]) + "</dt><dd>" + esc(row[1]) + "</dd></div>").join("");
      return '<section class="note"><h3>' + esc(note.title) + "</h3><dl>" + rows + "</dl>"
        + (note.foot ? '<p class="fine">' + esc(note.foot) + "</p>" : "") + "</section>";
    }).join("");
    const docs = docLinksHtml(day.date);
    return '<div class="sticky-tools">' + modeSwitch() + '<div class="chips">' + chips + "</div></div>"
      + '<div class="day-head"><div><p>' + esc(day.city || "") + "</p><h2>" + esc(ko(day.date).long)
      + " · " + esc(day.title) + '</h2></div><a class="btn" href="#/route/' + day.date + '">오늘 동선</a></div>'
      + (day.blurb ? '<p class="blurb">' + esc(day.blurb) + "</p>" : "")
      + (guide && guide.intro ? '<div class="guide-intro"><p data-guide-id="' + esc(guide.intro.id) + '">' + esc(guide.intro.text) + "</p>"
        + '<a class="btn" href="#/map/' + day.date + "/" + esc((dayStops(day)[0] || { place: { id: "" } }).place.id) + '">지도에서 경로 보기</a></div>' : "")
      + (docs ? '<div class="doc-row">' + docs + "</div>" : "")
      + '<div class="timeline">' + stops + "</div>" + notes;
  }

  function renderSchedule(route) {
    const day = dayByDate(route.day) || dayByDate(defaultDay()) || TRIP.days[0];
    if (!route.day && !route.sheet && !route.routeSheet) {
      history.replaceState(null, "", "#/schedule/" + day.date);
    }
    const key = day.date + "|" + state.travel + "|" + (window.TRIP_VAULT ? "vault" : "");
    if (key === state.scheduleKey) return;
    const y = document.scrollingElement.scrollTop;
    const sameDay = state.lastScheduleDay === day.date;
    state.scheduleKey = key;
    state.lastScheduleDay = day.date;
    $("view-schedule").innerHTML = scheduleHtml(day);
    if (sameDay) document.scrollingElement.scrollTop = y;
    else window.scrollTo(0, 0);
    const chip = document.querySelector("#view-schedule .chip.is-on");
    if (chip && chip.scrollIntoView) chip.scrollIntoView({ inline: "center", block: "nearest" });
  }

  function renderInfo() {
    const flightRows = [
      ["인원", TRIP.flights.party],
      ["가는 편", TRIP.flights.outbound.join("\n")],
      ["오는 편", TRIP.flights.inbound.join("\n")],
      ["수하물", TRIP.flights.baggage]
    ].map((row) => '<div class="row"><dt>' + esc(row[0]) + "</dt><dd>" + esc(row[1]) + "</dd></div>").join("");
    const lodgings = Object.keys(TRIP.places).map((id) => TRIP.places[id]).filter((place) => place.lodging);
    const stay = lodgings.map((place) => {
      return "<div class=\"row\"><dt>숙소</dt><dd>" + esc(place.name)
        + (place.address ? "\n" + esc(place.address) : "")
        + "\n가까운 역 " + esc(stationText(place)) + "</dd></div>";
    }).join("");
    const credits = [];
    const seen = {};
    Object.keys(TRIP.places).forEach((id) => {
      const place = TRIP.places[id];
      if (!place.credit || seen[place.credit.url]) return;
      seen[place.credit.url] = true;
      credits.push(place);
    });
    const creditHtml = credits.map((place) => {
      const credit = place.credit;
      return '<article class="credit"><strong>' + esc(place.name) + "</strong><p>"
        + esc(credit.author) + " · " + esc(credit.license) + "<br>"
        + '<a href="' + esc(credit.url) + '" target="_blank" rel="noopener noreferrer">' + esc(credit.title) + "</a></p></article>";
    }).join("");
    const trainDay = dayByDate("2026-12-01");
    const train = trainDay && (trainDay.notes || []).find((note) => note.title === "기차표");
    const trainRows = train ? train.rows.map((row) => {
      return '<div class="row"><dt>' + esc(row[0]) + "</dt><dd>" + esc(row[1]) + "</dd></div>";
    }).join("") : "";
    $("view-info").innerHTML = ""
      + '<section class="group"><h2>항공</h2><dl>' + flightRows + "</dl><p class=\"fine\">" + esc(TRIP.flights.note) + "</p></section>"
      + '<section class="group"><h2>숙소와 가까운 역</h2><dl>' + stay + "</dl>"
      + '<p class="fine">비엔나 숙소는 Wien Hauptbahnhof 앞 Karl-Popper-Straße 6. 부다페스트 숙소는 Hegedűs Gyula utca 52/b–54, M3 Lehel tér에서 도보 약 5분.</p></section>'
      + (train ? '<section class="group"><h2>기차</h2><dl>' + trainRows + "</dl><p class=\"fine\">" + esc(train.foot || "") + "</p></section>" : "")
      + '<section class="group"><h2>교통</h2>'
      + "<p>비엔나 U1–U4·U6, 트램 1·2·D·O·18·71, S1·S2·S3·S7·S60. U5는 2026년 11월에도 영업 운행 전이라 넣지 않았습니다.</p>"
      + "<p>부다페스트 M1–M4, 트램 2·4·6·19. 지도의 선은 OpenStreetMap을 단순화한 것이고 공식 노선도 이미지는 넣지 않았습니다.</p>"
      + '<p><a href="https://www.wienerlinien.at/web/wl-en/network-maps" target="_blank" rel="noopener noreferrer">Wiener Linien 노선도</a><br>'
      + '<a href="https://bkk.hu/en/journey-planning/maps/" target="_blank" rel="noopener noreferrer">BKK 노선도</a></p>'
      + '<p class="fine">노선 데이터 © OpenStreetMap contributors, ODbL. 가까운 역은 장소 좌표로 고른 안내이며, 실제 경로는 길찾기에서 확인합니다. 시각은 그 장소의 현지 시각입니다. 출국 전 D-day는 서울 날짜이고, 여행 중 오늘은 비엔나(중부유럽) 날짜입니다.</p></section>'
      + '<section class="group"><h2>사진</h2><p class="fine">Wikimedia Commons. 압축해 이 저장소에 두었습니다. 목록 썸네일은 240px입니다.</p>' + creditHtml + "</section>";
  }

  function setPageInert(on) {
    const app = document.querySelector(".app");
    const nav = document.querySelector(".tabbar");
    if (app) app.inert = on;
    if (nav) nav.inert = on;
  }

  function rememberSheetOpener() {
    const el = document.activeElement;
    if (!el || el === document.body || el === document.documentElement) {
      state.sheetOpener = null;
      state.sheetOpenerHref = "";
      return;
    }
    state.sheetOpener = el;
    state.sheetOpenerHref = el.getAttribute ? (el.getAttribute("href") || "") : "";
  }

  function restoreSheetFocus() {
    const el = state.sheetOpener;
    const href = state.sheetOpenerHref;
    state.sheetOpener = null;
    state.sheetOpenerHref = "";
    let target = el && document.contains(el) ? el : null;
    if (!target && href) {
      const links = document.querySelectorAll("a[href]");
      for (let i = 0; i < links.length; i += 1) {
        if (links[i].getAttribute("href") === href) {
          target = links[i];
          break;
        }
      }
    }
    if (target && typeof target.focus === "function") target.focus();
  }

  function refocusSheet(fresh) {
    if (fresh) {
      const title = $("sheet-title");
      if (title) title.focus();
      return;
    }
    const mode = document.querySelector('#sheet [data-action="mode"][aria-pressed="true"]');
    if (mode) mode.focus();
  }

  function sheetTabbables() {
    const panel = document.querySelector(".sheet-panel");
    if (!panel) return [];
    return Array.prototype.filter.call(
      panel.querySelectorAll("a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])"),
      (el) => el.tabIndex !== -1 && el.getClientRects().length > 0
    );
  }

  function renderSheet(route) {
    const sheet = $("sheet");
    const open = !!(route.sheet || route.routeSheet);
    if (!open) {
      const wasOpen = !sheet.hidden;
      sheet.hidden = true;
      document.body.classList.remove("sheet-open");
      setPageInert(false);
      if (wasOpen) restoreSheetFocus();
      return;
    }
    const fresh = sheet.hidden;
    sheet.hidden = false;
    document.body.classList.add("sheet-open");
    setPageInert(true);
    if (route.routeSheet) renderRouteSheet(route);
    else renderPlaceSheet(route);
    refocusSheet(fresh);
  }

  function renderPlaceSheet(route) {
    const day = dayByDate(route.day) || TRIP.days.find((item) => item.items.some((it) => it.placeId === route.sheet)) || TRIP.days[0];
    const index = day.items.findIndex((item) => item.placeId === route.sheet);
    const item = index >= 0 ? day.items[index] : null;
    const place = placeById(route.sheet);
    const body = $("sheet-body");
    if (!place) {
      body.innerHTML = "<h2 id=\"sheet-title\" tabindex=\"-1\">장소를 찾지 못했습니다</h2>";
      $("sheet-photo-slot").innerHTML = "";
      return;
    }
    const next = index >= 0 ? nextPlace(day, index) : null;
    const nextLink = next && item && canDirect(item, place, next)
      ? extLink(dirUrl({ origin: place, destination: next, mode: state.travel }), "다음 장소 · " + next.name, false).replace("class=\"btn\"", "class=\"btn btn-block\"")
      : "";
    $("sheet-photo-slot").innerHTML = place.photo
      ? '<img class="sheet-photo" src="' + esc(place.photo) + '" alt="' + esc(item ? item.text : place.name) + '">'
      : "";
    body.innerHTML = '<p class="kicker">' + esc(ko(day.date).long) + " · " + esc(day.title) + "</p>"
      + "<h2 id=\"sheet-title\" tabindex=\"-1\">" + esc(item ? item.text : place.name) + "</h2>"
      + (stationText(place) ? '<p class="station">' + esc(stationText(place)) + "</p>" : "")
      + (place.address ? '<p class="station">' + esc(place.address) + "</p>" : "")
      + (item && item.note ? '<p class="fine">' + esc(item.note) + "</p>" : "")
      + (place.lines === "100E · 200E" ? '<p class="fine">터미널 안에 지하철역은 없습니다. 100E는 도심, 200E는 M3 Kőbánya-Kispest로 갑니다.</p>' : "")
      + guideSheetHtml(day, place, next)
      + modeSwitch()
      + '<div class="sheet-actions">' + extLink(mapUrl(place), "지도 열기", false)
      + extLink(dirUrl({ destination: place, mode: state.travel }), dirLabel(), true) + "</div>"
      + nextLink;
  }

  function guideSheetHtml(day, place, next) {
    const guide = guideFor(day.date);
    if (!guide) return "";
    const stop = guide.stops && guide.stops[place.id];
    const leg = next ? guideLeg(guide, place.id, next.id) : null;
    let html = "";
    if (stop) {
      html += '<section class="guide guide-stop"><h3>해설</h3>' + parasHtml(stop.paras) + sourcesHtml(stop.sources) + "</section>";
    }
    if (guide.artworksFor === place.id) html += artworksHtml(guide);
    if (leg) {
      html += '<section class="guide guide-next"><h3>다음 장소 · ' + esc(next.name) + "</h3>" + legHtml(leg, "leg leg-sheet")
        + '<a class="btn btn-block" href="#/map/' + day.date + "/" + esc(place.id) + '">지도에서 경로 보기</a></section>';
    }
    return html;
  }

  function renderRouteSheet(route) {
    const day = dayByDate(route.day) || dayByDate(defaultDay());
    const stops = dayStops(day);
    $("sheet-photo-slot").innerHTML = "";
    const legs = [];
    for (let i = 1; i < stops.length; i += 1) {
      const from = stops[i - 1];
      const to = stops[i];
      const names = esc(from.place.name) + " → " + esc(to.place.name);
      if (canDirect(from.item, from.place, to.place)) {
        const url = dirUrl({ origin: from.place, destination: to.place, mode: state.travel });
        const gleg = guideLeg(guideFor(day.date), from.place.id, to.place.id);
        legs.push("<div class=\"row\"><dt>" + i + "</dt><dd>" + names
          + (gleg ? '<br><span class="fine">' + esc(legMeta(gleg)) + " — " + esc(gleg.text) + "</span>" : "")
          + "<br>" + extLink(url, "이 구간", true) + "</dd></div>");
      } else {
        legs.push("<div class=\"row\"><dt>" + i + "</dt><dd>" + names + "<br><span class=\"fine\">항공·기차이거나, 30km(도보는 5km)를 넘는 구간이라 길찾기를 두지 않습니다.</span></dd></div>");
      }
    }
    const walk = combinedWalking(stops);
    $("sheet-body").innerHTML = '<p class="kicker">오늘 동선</p><h2 id="sheet-title" tabindex="-1">'
      + esc(ko(day.date).long) + " · " + esc(day.title) + "</h2>"
      + modeSwitch()
      + (legs.length ? "<p>대중교통은 경유지를 무시하므로 구간마다 엽니다.</p><dl>" + legs.join("") + "</dl>" : "<p>이 날은 이어 열 장소가 하나뿐입니다.</p>")
      + (walk ? extLink(walk, "도보로 한 번에", false).replace("class=\"btn\"", "class=\"btn btn-block\"") + '<p class="fine">경유지를 넣은 도보 경로입니다. 운전이 필요하면 구글 지도에서 바꿀 수 있습니다.</p>' : '<p class="fine">항공·기차이거나, 30km(도보는 5km)를 넘는 구간은 구간 버튼을 만들지 않습니다.</p>');
  }

  function loadLeaflet() {
    if (window.L) return Promise.resolve();
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "vendor/leaflet/leaflet.css";
      document.head.appendChild(link);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "vendor/leaflet/leaflet.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("leaflet"));
      document.body.appendChild(script);
    });
  }

  function ensureMap() {
    $("view-map").hidden = false;
    if (state.mapPromise) return state.mapPromise;
    $("map-skeleton").hidden = false;
    state.mapPromise = loadLeaflet().then(() => {
      const map = L.map("map", { zoomControl: false, attributionControl: true });
      map.attributionControl.setPrefix(false);
      L.control.zoom({ position: "topright" }).addTo(map);
      const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      tiles.on("tileload", () => { state.tilesOk = true; $("map-skeleton").hidden = true; });
      tiles.on("tileerror", () => {
        state.tileErrors += 1;
        if (state.tileErrors > 4 && !state.tilesOk) {
          const status = $("map-status");
          status.hidden = false;
          status.textContent = "배경 지도를 불러오지 못했습니다. 노선은 그대로 볼 수 있습니다.";
        }
      });
      tiles.addTo(map);
      map.setView([48.208, 16.373], 12);
      state.map = map;
      if (!state.cardObserver && window.ResizeObserver) {
        state.cardObserver = new ResizeObserver(() => liftMapChrome());
        state.cardObserver.observe($("map-card"));
      }
      window.setTimeout(() => {
        map.invalidateSize();
        $("map-skeleton").hidden = true;
      }, 700);
    }).catch(() => {
      $("map-skeleton").hidden = true;
      $("map-status").hidden = false;
      $("map-status").textContent = "지도 라이브러리를 불러오지 못했습니다.";
      state.mapPromise = null;
    });
    return state.mapPromise;
  }

  function focusLatLng(lat, lng, zoom, animate) {
    const map = state.map;
    if (!map) return;
    map.invalidateSize();
    if (!animate || reduce) map.setView([lat, lng], zoom);
    else map.flyTo([lat, lng], zoom, { duration: 0.7 });
  }

  function ensureTransitLayers() {
    if (!state.map || !window.TRANSIT || state.linesLayer) return;
    state.linesLayer = L.geoJSON(window.TRANSIT, {
      filter: (feature) => feature.geometry && feature.geometry.type !== "Point",
      interactive: false,
      style: (feature) => ({
        color: feature.properties.color,
        weight: feature.properties.mode === "subway" ? 4 : 3,
        opacity: 0.9,
        lineCap: "round",
        lineJoin: "round"
      })
    });
    state.stationLayer = L.layerGroup();
    window.TRANSIT.features.forEach((feature) => {
      if (!feature.geometry || feature.geometry.type !== "Point") return;
      const lng = feature.geometry.coordinates[0];
      const lat = feature.geometry.coordinates[1];
      const lodging = !!feature.properties.lodging;
      const marker = L.circleMarker([lat, lng], {
        radius: lodging ? 8 : 5,
        color: "#ffffff",
        weight: 2,
        fillColor: lodging ? "#c4373c" : "#1f4e9a",
        fillOpacity: 1
      });
      marker.bindTooltip(feature.properties.name + (lodging ? " · 숙소 역" : ""), {
        permanent: lodging,
        direction: "top",
        offset: [0, -8],
        className: "station-tip"
      });
      marker.addTo(state.stationLayer);
    });
    state.hotelLayer = L.layerGroup();
    Object.keys(TRIP.places).forEach((id) => {
      const place = TRIP.places[id];
      if (!place.lodging) return;
      const marker = L.marker([place.lat, place.lng], {
        icon: L.divIcon({
          className: "hotel-pin",
          html: "<span>Adina</span>",
          iconSize: [64, 28],
          iconAnchor: [32, 28]
        }),
        zIndexOffset: 400
      });
      marker.bindTooltip(place.name, { direction: "bottom" });
      marker.addTo(state.hotelLayer);
    });
  }

  function syncLayers(showLines) {
    if (!state.map || !state.linesLayer) return;
    [state.linesLayer, state.stationLayer, state.hotelLayer].forEach((layer) => {
      if (!layer) return;
      if (showLines && !state.map.hasLayer(layer)) layer.addTo(state.map);
      if (!showLines && state.map.hasLayer(layer)) state.map.removeLayer(layer);
    });
    if (state.railOn && showLines) {
      if (!state.railLayer) {
        state.railLayer = L.tileLayer("https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png", {
          subdomains: "abc",
          maxZoom: 19,
          opacity: 0.75,
          attribution: "Style: CC-BY-SA 2.0 OpenRailwayMap, Data © OpenStreetMap contributors"
        });
      }
      if (!state.map.hasLayer(state.railLayer)) state.railLayer.addTo(state.map);
    } else if (state.railLayer && state.map.hasLayer(state.railLayer)) {
      state.map.removeLayer(state.railLayer);
    }
  }

  function liftMapChrome() {
    const card = $("map-card");
    const height = card ? card.offsetHeight : 0;
    document.querySelectorAll(".view-map .leaflet-bottom").forEach((el) => {
      el.style.marginBottom = (height + 16) + "px";
    });
  }

  function showMap(route) {
    ensureMap().then(() => {
      if (!state.map) return;
      ensureTransitLayers();
      state.map.invalidateSize();
      if (route.mode === "transit") showTransit(route);
      else showTour(route);
      liftMapChrome();
    });
  }

  function showTour(route) {
    const day = dayByDate(route.day)
      || TRIP.days.find((item) => item.items.some((it) => it.placeId === route.placeId))
      || dayByDate(state.tourDay)
      || TRIP.days[0];
    state.tourDay = day.date;
    const stops = dayStops(day);
    let index = stops.findIndex((stop) => stop.place.id === route.placeId);
    if (index < 0) index = 0;
    drawTour(stops, index);
    const place = stops[index] && stops[index].place;
    if (place && state.lastFocus !== place.id) {
      focusLatLng(place.lat, place.lng, 16, state.hadFocus);
      state.hadFocus = true;
      state.lastFocus = place.id;
    }
    syncLayers(state.tourLines);
    $("map-mode").innerHTML = '<div class="seg" role="group" aria-label="지도 모드">'
      + '<button type="button" data-action="go" data-hash="#/map/' + day.date + "/" + (place ? place.id : "") + '" aria-pressed="true">답사</button>'
      + '<button type="button" data-action="go" data-hash="#/transit" aria-pressed="false">교통</button></div>';
    $("map-chips").innerHTML = TRIP.days.map((item) => {
      const first = dayStops(item)[0];
      const id = first ? first.place.id : "";
      return '<button type="button" class="chip' + (item.date === day.date ? " is-on" : "")
        + '" data-action="go" data-hash="#/map/' + item.date + "/" + id + '">' + esc(ko(item.date).chip) + "</button>";
    }).join("");
    const tourNext = stops[index + 1];
    const tourLeg = place && tourNext ? guideLeg(guideFor(day.date), place.id, tourNext.place.id) : null;
    const dots = stops.map((stop, i) => {
      return '<button type="button" class="' + (i === index ? "is-on" : "") + '" data-action="go" data-hash="#/map/'
        + day.date + "/" + stop.place.id + '" aria-label="' + esc(stop.place.name) + '"></button>';
    }).join("");
    $("map-card").innerHTML = place ? '<p class="kicker">' + esc(ko(day.date).chip) + " · 사전답사</p><h2>"
      + esc(stops[index].item.text) + "</h2><p class=\"station\">" + esc(stationText(place)) + "</p>"
      + (tourLeg ? legHtml(tourLeg, "leg leg-map") : "")
      + '<div class="dots">' + dots + "</div>"
      + '<div class="map-nav"><button type="button" class="btn" data-action="step" data-delta="-1">이전</button>'
      + "<span>" + (index + 1) + " / " + stops.length + "</span>"
      + '<button type="button" class="btn" data-action="step" data-delta="1">다음</button></div>'
      + '<div class="hero-actions">' + extLink(dirUrl({ destination: place, mode: state.travel }), dirLabel(), true)
      + '<button type="button" class="btn" data-action="fit-day">이날 전체</button></div>'
      + '<button type="button" class="btn btn-block" data-action="tour-lines" aria-pressed="' + state.tourLines + '">'
      + (state.tourLines ? "노선 숨기기" : "노선 겹치기") + "</button>" : "";
    state.tourStops = stops;
    state.tourDay = day.date;
  }

  function drawTour(stops, index) {
    if (!state.map) return;
    if (state.tourLayer) state.map.removeLayer(state.tourLayer);
    state.tourLayer = L.layerGroup();
    drawGuideRoute(stops);
    stops.forEach((stop, i) => {
      const marker = L.marker([stop.place.lat, stop.place.lng], {
        icon: L.divIcon({
          className: "pin" + (i === index ? " is-on" : ""),
          html: "<i></i>",
          iconSize: [22, 22],
          iconAnchor: [8, 20]
        }),
        zIndexOffset: i === index ? 500 : 0
      });
      marker.on("click", () => go("#/map/" + state.tourDay + "/" + stop.place.id, true));
      marker.addTo(state.tourLayer);
    });
    state.tourLayer.addTo(state.map);
  }

  function drawGuideRoute(stops) {
    const guide = guideFor(state.tourDay);
    if (!guide || !guide.legs) return;
    for (let i = 1; i < stops.length; i += 1) {
      const a = stops[i - 1].place;
      const b = stops[i].place;
      const leg = guideLeg(guide, a.id, b.id);
      if (!leg || leg.mode === "transit") continue;
      if (leg.tram && leg.tram.length > 1) {
        L.polyline(leg.tram, { color: "#D35400", weight: 4, opacity: 0.85, dashArray: "2 8", lineCap: "round", interactive: false, className: "guide-tram" }).addTo(state.tourLayer);
      }
      const path = leg.path && leg.path.length > 1 ? leg.path.slice() : null;
      const line = path || [[a.lat, a.lng], [b.lat, b.lng]];
      if (leg.mode === "walk") {
        line.unshift([a.lat, a.lng]);
        line.push([b.lat, b.lng]);
      }
      L.polyline(line, { color: "#1f5fa8", weight: 4, opacity: path ? 0.8 : 0.5, dashArray: path ? null : "6 8", lineJoin: "round", interactive: false, className: "guide-walk" }).addTo(state.tourLayer);
    }
  }

  function showTransit(route) {
    const city = route.city || "vienna";
    syncLayers(true);
    if (state.tourLayer && state.map.hasLayer(state.tourLayer)) state.map.removeLayer(state.tourLayer);
    const station = (window.TRANSIT.features || []).find((feature) => feature.properties.city === city && feature.properties.lodging);
    if (station && state.lastTransit !== city) {
      focusLatLng(station.geometry.coordinates[1], station.geometry.coordinates[0], 14, !!state.lastTransit);
      state.lastTransit = city;
    }
    const names = [];
    const seen = {};
    (window.TRANSIT.features || []).forEach((feature) => {
      if (feature.properties.city !== city || feature.geometry.type === "Point") return;
      if (seen[feature.properties.name]) return;
      seen[feature.properties.name] = true;
      names.push(feature);
    });
    const legend = names.map((feature) => {
      return "<span><i style=\"background:" + esc(feature.properties.color) + "\"></i>" + esc(feature.properties.name) + "</span>";
    }).join("");
    $("map-mode").innerHTML = '<div class="seg" role="group" aria-label="지도 모드">'
      + '<button type="button" data-action="go" data-hash="#/map" aria-pressed="false">답사</button>'
      + '<button type="button" data-action="go" data-hash="#/transit/' + city + '" aria-pressed="true">교통</button></div>';
    $("map-chips").innerHTML = '<button type="button" class="chip' + (city === "vienna" ? " is-on" : "")
      + '" data-action="go" data-hash="#/transit/vienna">비엔나</button>'
      + '<button type="button" class="chip' + (city === "budapest" ? " is-on" : "")
      + '" data-action="go" data-hash="#/transit/budapest">부다페스트</button>';
    const lodging = station ? station.properties.name + " · " + station.properties.lines : "표시된 숙소 역 없음";
    const official = city === "vienna"
      ? "https://www.wienerlinien.at/web/wl-en/network-maps"
      : "https://bkk.hu/en/journey-planning/maps/";
    $("map-card").innerHTML = '<p class="kicker">숙소 역</p><h2>' + esc(lodging) + "</h2>"
      + '<div class="legend">' + legend + "</div>"
      + '<div class="hero-actions"><button type="button" class="btn" data-action="transit-lodging">숙소 역</button>'
      + '<button type="button" class="btn" data-action="transit-fit">노선 전체</button></div>'
      + '<button type="button" class="btn btn-block" data-action="rail" aria-pressed="' + state.railOn + '">'
      + (state.railOn ? "철도 타일 끄기" : "철도 타일 더하기") + "</button>"
      + '<p class="fine">© OpenStreetMap contributors, ODbL. <a href="' + official + '" target="_blank" rel="noopener noreferrer">공식 노선도</a></p>';
    state.transitCity = city;
  }

  function fitCity(city) {
    if (!state.map || !window.TRANSIT) return;
    const bounds = L.latLngBounds([]);
    window.TRANSIT.features.forEach((feature) => {
      if (feature.properties.city !== city) return;
      const type = feature.geometry.type;
      const coords = feature.geometry.coordinates;
      if (type === "Point") bounds.extend([coords[1], coords[0]]);
      const lines = type === "LineString" ? [coords] : (type === "MultiLineString" ? coords : []);
      lines.forEach((line) => line.forEach((pair) => bounds.extend([pair[1], pair[0]])));
    });
    if (bounds.isValid()) state.map.fitBounds(bounds, { padding: [28, 28] });
  }

  function render() {
    const route = parseRoute();
    const sheet = $("sheet");
    if ((route.sheet || route.routeSheet) && sheet.hidden) rememberSheetOpener();
    document.body.dataset.view = route.view;
    const tab = route.view === "map" ? "map" : route.view;
    document.querySelectorAll(".tabbar a").forEach((link) => {
      if (link.dataset.tab === tab) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (state.view === "docs" && route.view !== "docs") revokeDocUrls();
    state.view = route.view;
    $("view-home").hidden = route.view !== "home";
    $("view-schedule").hidden = route.view !== "schedule";
    $("view-map").hidden = route.view !== "map";
    $("view-info").hidden = route.view !== "info";
    $("view-docs").hidden = route.view !== "docs";
    const titles = { home: "홈", schedule: "일정", map: "지도", info: "정보", docs: "문서함" };
    document.title = (titles[route.view] || "여행") + " · 비엔나 & 부다페스트";
    if (route.view === "home") renderHome();
    if (route.view === "schedule") renderSchedule(route);
    if (route.view === "info") renderInfo();
    if (route.view === "map") showMap(route);
    if (route.view === "docs") ensureDocs(route);
    renderSheet(route);
    const snowBtn = $("snow-btn");
    if (snowBtn) snowBtn.setAttribute("aria-pressed", snow.on ? "true" : "false");
  }

  const snow = { on: false, raf: 0, flakes: [] };
  function resizeSnow() {
    const canvas = $("snow");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function makeFlake(anywhere) {
    const canvas = $("snow");
    return {
      x: Math.random() * canvas.width,
      y: anywhere ? Math.random() * canvas.height : -8,
      r: 1 + Math.random() * 1.6,
      s: 0.35 + Math.random() * 0.8
    };
  }
  function snowFrame() {
    const canvas = $("snow");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    snow.flakes.forEach((flake) => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
      ctx.fill();
      flake.y += flake.s;
      flake.x += Math.sin(flake.y / 40) * 0.3;
      if (flake.y > canvas.height) Object.assign(flake, makeFlake(false));
    });
    snow.raf = requestAnimationFrame(snowFrame);
  }
  function setSnow(on) {
    if (reduce) on = false;
    snow.on = on;
    try { localStorage.setItem("trip-snow", on ? "1" : "0"); } catch (err) { /* ignore */ }
    const canvas = $("snow");
    if (!on) {
      cancelAnimationFrame(snow.raf);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    resizeSnow();
    if (!snow.flakes.length) {
      for (let i = 0; i < 28; i += 1) snow.flakes.push(makeFlake(true));
    }
    cancelAnimationFrame(snow.raf);
    snowFrame();
  }

  document.addEventListener("click", (event) => {
    const el = event.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;
    if (action === "mode") {
      state.travel = el.dataset.mode === "walking" ? "walking" : "transit";
      try { sessionStorage.setItem("trip-travel", state.travel); } catch (err) { /* ignore */ }
      state.scheduleKey = "";
      render();
      return;
    }
    if (action === "close-sheet") {
      const route = parseRoute();
      const day = route.day || defaultDay();
      go("#/schedule/" + day, true);
      return;
    }
    if (action === "snow") {
      setSnow(!snow.on);
      $("snow-btn").setAttribute("aria-pressed", snow.on ? "true" : "false");
      return;
    }
    if (action === "vault-lock") {
      lockVault();
      return;
    }
    if (action === "vault-forget") {
      forgetVault();
      return;
    }
    if (action === "go" && el.dataset.hash) {
      go(el.dataset.hash, el.dataset.hash.indexOf("#/map/") === 0);
      return;
    }
    if (action === "step") {
      const stops = state.tourStops || [];
      if (!stops.length) return;
      const current = stops.findIndex((stop) => stop.place.id === state.lastFocus);
      const next = (current + Number(el.dataset.delta) + stops.length) % stops.length;
      go("#/map/" + state.tourDay + "/" + stops[next].place.id, true);
      return;
    }
    if (action === "fit-day" && state.map && state.tourStops) {
      const bounds = L.latLngBounds(state.tourStops.map((stop) => [stop.place.lat, stop.place.lng]));
      state.map.fitBounds(bounds.pad(0.3));
      return;
    }
    if (action === "tour-lines") {
      state.tourLines = !state.tourLines;
      syncLayers(state.tourLines);
      render();
      return;
    }
    if (action === "transit-fit") {
      fitCity(state.transitCity || "vienna");
      return;
    }
    if (action === "transit-lodging") {
      state.lastTransit = "";
      showTransit({ city: state.transitCity || "vienna" });
      return;
    }
    if (action === "rail") {
      state.railOn = !state.railOn;
      syncLayers(true);
      render();
    }
  });

  document.addEventListener("keydown", (event) => {
    if ($("sheet").hidden) return;
    if (event.key === "Escape") {
      event.preventDefault();
      const route = parseRoute();
      go("#/schedule/" + (route.day || defaultDay()), true);
      return;
    }
    if (event.key !== "Tab") return;
    const nodes = sheetTabbables();
    if (!nodes.length) {
      event.preventDefault();
      return;
    }
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    const active = document.activeElement;
    const panel = document.querySelector(".sheet-panel");
    if (!panel || !panel.contains(active)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
      return;
    }
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (snow.on) resizeSnow();
    if (state.map) {
      state.map.invalidateSize();
      liftMapChrome();
    }
  });

  const snowBtn = $("snow-btn");
  if (reduce && snowBtn) {
    snowBtn.disabled = true;
    snowBtn.title = "움직임 줄이기 설정에서는 눈을 꺼 둡니다";
  } else {
    try {
      if (localStorage.getItem("trip-snow") === "1") setSnow(true);
    } catch (err) { /* ignore */ }
  }

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!form || form.id !== "vault-form") return;
    event.preventDefault();
    const input = $("vault-password");
    const remember = $("vault-remember");
    const password = input ? input.value : "";
    submitVaultPassword(password, !!(remember && remember.checked));
  });

  if (location.protocol === "https:" && navigator.serviceWorker) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }

  window.addEventListener("hashchange", render);
  if (!location.hash || location.hash === "#") location.hash = "#/home";
  else render();
})();
