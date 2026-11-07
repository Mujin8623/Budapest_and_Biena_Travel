/* Personal timetable overrides.
   Baseline dates, times, notes, and costs stay in data/trip.js.
   Edits live only in this browser (localStorage key trip-schedule-v1).
   Clock values are minutes from local midnight at the trip place.
   Nothing here converts those minutes into the browser's timezone. */
(function (root) {
  var KEY = "trip-schedule-v1";
  var BACKUP_KEY = "trip-schedule-v1-backup";
  var VERSION = 1;
  var SNAP_MINUTES = 15;
  var PLACEHOLDER_MINUTES = 12;
  var MAX_UNDO = 30;

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function formatClock(min) {
    var day = Math.floor(min / 1440);
    var m = ((min % 1440) + 1440) % 1440;
    return { clock: pad(Math.floor(m / 60)) + ":" + pad(m % 60), nextDay: day > 0 };
  }

  function formatSpan(start, duration) {
    var a = formatClock(start);
    var b = formatClock(start + duration);
    if (b.nextDay) return a.clock + "–다음날 " + b.clock;
    return a.clock + "–" + b.clock;
  }

  function formatBooking(start, end) {
    if (!isMin(start)) return "";
    if (!isMin(end)) return formatClock(start).clock;
    return formatSpan(start, end - start);
  }

  function isMin(value) {
    return typeof value === "number" && value === Math.floor(value) && value >= 0 && value <= 1439;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function errName(err) {
    if (!err) return "error";
    return err.name || err.message || "error";
  }

  /* time field only — notes are not parsed into durations. */
  function parseTime(value) {
    var text = value == null ? "" : String(value).trim();
    if (!text) return { kind: "none", text: "" };
    var range = text.match(/^(\d{1,2}):(\d{2})\s*[–—-]\s*(\d{1,2}):(\d{2})$/);
    if (range) {
      var start = Number(range[1]) * 60 + Number(range[2]);
      var end = Number(range[3]) * 60 + Number(range[4]);
      if (start > 1439 || end > 1439 || Number(range[2]) > 59 || Number(range[4]) > 59) {
        return { kind: "unknown", text: text };
      }
      var duration = end - start;
      if (duration <= 0) duration += 1440;
      return { kind: "range", text: text, start: start, duration: duration };
    }
    var approx = text.match(/^(\d{1,2}):(\d{2})\s*전후$/);
    if (approx) {
      var aMin = Number(approx[1]) * 60 + Number(approx[2]);
      if (aMin > 1439 || Number(approx[2]) > 59) return { kind: "unknown", text: text };
      return { kind: "approx", text: text, start: aMin };
    }
    var clock = text.match(/^(\d{1,2}):(\d{2})$/);
    if (clock) {
      var cMin = Number(clock[1]) * 60 + Number(clock[2]);
      if (cMin > 1439 || Number(clock[2]) > 59) return { kind: "unknown", text: text };
      return { kind: "clock", text: text, start: cMin };
    }
    if (/^\d{1,2}\/\d{1,2}$/.test(text)) return { kind: "datemark", text: text };
    return { kind: "unknown", text: text };
  }

  function snapMinutes(min) {
    var snapped = Math.round(min / SNAP_MINUTES) * SNAP_MINUTES;
    if (snapped < 0) snapped = 0;
    if (snapped > 1439) snapped = Math.floor(1439 / SNAP_MINUTES) * SNAP_MINUTES;
    return snapped;
  }

  var FLIGHT_PLACES = { icn: 1, xiy: 1, vie: 1, bud: 1, pvg: 1 };

  function flightEvent(ev) {
    return !!(ev.item.leg && FLIGHT_PLACES[ev.placeId]);
  }

  /* Known reservation instants are safety context. They do not rewrite trip.js. */
  function bookingRules() {
    return [
      {
        id: "belvedere-1129",
        kind: "admission",
        title: "벨베데레 상궁 입장",
        bookingStart: 14 * 60,
        bookingEnd: null,
        knownText: "14:00",
        detail: "알려진 예약 입장 시각은 11/29 14:00입니다. 기본 일정 카드는 14:15–16:00이라 예약 시각과 다릅니다. 그 차이는 여기서 고치지 않습니다. 옮겨도 실제 티켓은 바뀌지 않습니다.",
        test: function (ev) {
          return ev.baselineDate === "2026-11-29" && ev.placeId === "belvedere" && !!ev.item.booked;
        },
        expectStart: function (ev) { return ev.startMin; }
      },
      {
        id: "train-vie-sbg-out",
        kind: "train",
        title: "잘츠부르크행 기차 RJX 262",
        bookingStart: 8 * 60 + 28,
        bookingEnd: 10 * 60 + 53,
        knownText: "08:28–10:53",
        detail: "예매된 가는 편은 08:28–10:53입니다. 일정에는 출발과 도착이 두 줄로 나뉘어 있고, 두 줄 모두 확인 없이 움직이지 않습니다. 실제 기차표는 바뀌지 않습니다.",
        test: function (ev) {
          return ev.baselineDate === "2026-11-30" && ev.placeId === "wien-hbf" && !!ev.item.booked && ev.startMin === 8 * 60 + 28;
        }
      },
      {
        id: "train-vie-sbg-out-arrive",
        kind: "train",
        title: "잘츠부르크행 기차 도착",
        bookingStart: 8 * 60 + 28,
        bookingEnd: 10 * 60 + 53,
        knownText: "08:28–10:53",
        detail: "RJX 262 도착 10:53은 예매된 가는 편의 끝입니다. 출발 줄과 함께 잠가 둡니다. 실제 기차표는 바뀌지 않습니다.",
        test: function (ev) {
          return ev.baselineDate === "2026-11-30" && ev.placeId === "salzburg-hbf" && ev.startMin === 10 * 60 + 53;
        }
      },
      {
        id: "train-vie-sbg-back",
        kind: "train",
        title: "빈행 기차 RJX 13483",
        bookingStart: 21 * 60 + 7,
        bookingEnd: 23 * 60 + 32,
        knownText: "21:07–23:32",
        detail: "예매된 오는 편은 21:07–23:32입니다. 실제 기차표는 바뀌지 않습니다.",
        test: function (ev) {
          return ev.baselineDate === "2026-11-30" && ev.placeId === "salzburg-hbf" && !!ev.item.booked && ev.startMin === 21 * 60 + 7;
        }
      },
      {
        id: "train-vie-sbg-back-arrive",
        kind: "train",
        title: "빈행 기차 도착",
        bookingStart: 21 * 60 + 7,
        bookingEnd: 23 * 60 + 32,
        knownText: "21:07–23:32",
        detail: "RJX 13483 도착 23:32는 예매된 오는 편의 끝입니다. 실제 기차표는 바뀌지 않습니다.",
        test: function (ev) {
          return ev.baselineDate === "2026-11-30" && ev.placeId === "wien-hbf" && ev.startMin === 23 * 60 + 32;
        }
      },
      {
        id: "train-vie-bud",
        kind: "train",
        title: "부다페스트행 기차 RJX 65",
        bookingStart: 15 * 60 + 40,
        bookingEnd: 18 * 60 + 29,
        knownText: "15:40–18:29",
        detail: "예매된 구간은 15:40–18:29입니다. 일정에는 출발과 도착이 두 줄입니다. 실제 기차표는 바뀌지 않습니다.",
        test: function (ev) {
          return ev.baselineDate === "2026-12-01" && ev.placeId === "wien-hbf" && !!ev.item.booked && ev.startMin === 15 * 60 + 40;
        }
      },
      {
        id: "train-vie-bud-arrive",
        kind: "train",
        title: "부다페스트행 기차 도착",
        bookingStart: 15 * 60 + 40,
        bookingEnd: 18 * 60 + 29,
        knownText: "15:40–18:29",
        detail: "Keleti 18:29는 예매된 RJX 65의 도착입니다. 실제 기차표는 바뀌지 않습니다.",
        test: function (ev) {
          return ev.baselineDate === "2026-12-01" && ev.placeId === "keleti" && ev.startMin === 18 * 60 + 29;
        }
      },
      {
        id: "restaurant-stand25",
        kind: "restaurant",
        title: "Stand25 점심",
        bookingStart: 13 * 60,
        bookingEnd: null,
        knownText: "13:00",
        detail: "예약 시각은 12/2 13:00입니다. 노트에 테이블 2시간이 있어도 일정 시각 필드에는 끝나는 시각이 없어, 막대 길이를 예약 종료로 만들지 않습니다. 실제 예약은 바뀌지 않습니다.",
        test: function (ev) {
          return ev.baselineDate === "2026-12-02" && ev.placeId === "stand25" && !!ev.item.booked;
        }
      }
    ];
  }

  function protectFromRule(rule) {
    return {
      ruleId: rule.id,
      kind: rule.kind,
      title: rule.title,
      bookingStart: rule.bookingStart,
      bookingEnd: rule.bookingEnd,
      knownText: rule.knownText,
      detail: rule.detail
    };
  }

  function indexTrip(trip) {
    var events = [];
    var dates = [];
    (trip.days || []).forEach(function (day) {
      dates.push(day.date);
      (day.items || []).forEach(function (item, index) {
        if (!item._eventId) item._eventId = day.date + "." + index;
        var parsed = parseTime(item.time);
        events.push({
          id: item._eventId,
          placeId: item.placeId,
          baselineDate: day.date,
          baselineIndex: index,
          baselineTime: item.time || "",
          startMin: parsed.start == null ? null : parsed.start,
          duration: parsed.duration == null ? null : parsed.duration,
          approx: parsed.kind === "approx",
          untimed: parsed.start == null,
          item: item,
          protection: null
        });
      });
    });
    var rules = bookingRules();
    var report = [];
    rules.forEach(function (rule) {
      var ev = null;
      for (var i = 0; i < events.length; i += 1) {
        if (rule.test(events[i])) { ev = events[i]; break; }
      }
      if (!ev) {
        report.push({
          id: rule.id,
          title: rule.title,
          known: rule.knownText,
          missing: true,
          match: false,
          message: rule.title + " 예약(" + rule.knownText + ")에 해당하는 기본 일정을 찾지 못했습니다. 기본 데이터는 바꾸지 않았습니다."
        });
        return;
      }
      ev.protection = protectFromRule(rule);
      var itinerary = ev.baselineTime || "(시각 없음)";
      var compared = rule.id === "belvedere-1129" ? (ev.startMin !== rule.bookingStart) : false;
      if (rule.id === "restaurant-stand25") compared = ev.startMin !== rule.bookingStart;
      report.push({
        id: rule.id,
        eventId: ev.id,
        title: rule.title,
        date: ev.baselineDate,
        placeId: ev.placeId,
        itineraryTime: itinerary,
        known: rule.knownText,
        missing: false,
        match: !compared,
        message: compared
          ? rule.title + " 기본 일정 시각은 " + itinerary + "이고, 알려진 예약 시각은 " + rule.knownText + "입니다. 기본 데이터는 바꾸지 않았습니다."
          : rule.title + " 기본 일정 시각(" + itinerary + ")은 알려진 예약 " + rule.knownText + "과 어긋나지 않습니다."
      });
    });
    events.forEach(function (ev) {
      if (ev.protection) return;
      if (flightEvent(ev)) {
        ev.protection = {
          ruleId: "flight:" + ev.id,
          kind: "flight",
          title: "항공 구간",
          bookingStart: ev.startMin,
          bookingEnd: ev.duration != null && ev.startMin != null ? ev.startMin + ev.duration : null,
          knownText: ev.baselineTime || ev.item.text,
          detail: "고정된 항공 구간입니다. 개인 계획만 바꿀 수 있고, 실제 항공권은 바뀌지 않습니다."
        };
        return;
      }
      if (ev.item.booked) {
        ev.protection = {
          ruleId: "booked:" + ev.id,
          kind: "booked",
          title: "예약된 일정",
          bookingStart: ev.startMin,
          bookingEnd: ev.duration != null && ev.startMin != null ? ev.startMin + ev.duration : null,
          knownText: ev.baselineTime || "",
          detail: "예약으로 표시된 일정입니다. 확인 없이 옮기지 않으며, 실제 예약은 바뀌지 않습니다."
        };
      }
    });
    return { events: events, dates: dates, report: report, days: trip.days };
  }

  function endOfDayMarker(ev, appliedStart, timeChanged) {
    return !timeChanged && ev.approx && ev.baselineTime === "00:00 전후" && appliedStart === 0;
  }

  function createSchedule(trip, storage) {
    if (!trip || !trip.days) throw new Error("trip");
    var indexed = indexTrip(trip);
    var dateSet = {};
    indexed.dates.forEach(function (date) { dateSet[date] = true; });
    var byId = {};
    indexed.events.forEach(function (ev) { byId[ev.id] = ev; });

    var bag = {};
    var undoStack = [];
    var revision = 0;
    var cacheRev = -1;
    var cacheDays = null;
    var loadIssue = null;
    var saveError = null;
    var writeBlocked = false;
    var backupKept = false;
    var skipped = [];
    var staleIds = [];
    var preservedRaw = null;
    var listeners = [];

    function readStorage() {
      bag = {};
      undoStack = [];
      skipped = [];
      staleIds = [];
      loadIssue = null;
      writeBlocked = false;
      backupKept = false;
      preservedRaw = null;
      if (!storage) return;
      var raw;
      try {
        raw = storage.getItem(KEY);
      } catch (err) {
        loadIssue = "read";
        saveError = errName(err);
        writeBlocked = true;
        return;
      }
      if (raw == null || raw === "") return;
      var data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        loadIssue = "malformed";
        preservedRaw = raw;
        keepBackup(raw);
        return;
      }
      if (!data || typeof data !== "object" || data.v !== VERSION || !data.overrides || typeof data.overrides !== "object" || Array.isArray(data.overrides)) {
        loadIssue = "version";
        preservedRaw = raw;
        keepBackup(raw);
        return;
      }
      bag = data.overrides;
      if (Array.isArray(data.undo)) {
        data.undo.forEach(function (entry) {
          if (entry && entry.overrides && typeof entry.overrides === "object" && !Array.isArray(entry.overrides)) {
            undoStack.push({ overrides: entry.overrides });
          }
        });
        if (undoStack.length > MAX_UNDO) undoStack = undoStack.slice(-MAX_UNDO);
      }
    }

    function keepBackup(raw) {
      if (!storage) {
        writeBlocked = true;
        return;
      }
      try {
        var existing = storage.getItem(BACKUP_KEY);
        if (existing == null) storage.setItem(BACKUP_KEY, raw);
        backupKept = true;
        writeBlocked = false;
      } catch (err) {
        backupKept = false;
        writeBlocked = true;
        saveError = errName(err);
      }
    }

    function persist() {
      if (!storage) return true;
      if (writeBlocked) {
        saveError = saveError || "preserve";
        return false;
      }
      try {
        storage.setItem(KEY, JSON.stringify({ v: VERSION, overrides: bag, undo: undoStack }));
        saveError = null;
        return true;
      } catch (err) {
        saveError = errName(err);
        return false;
      }
    }

    function emit() {
      listeners.forEach(function (fn) {
        try { fn(); } catch (err) { /* a view error must not roll back the edit */ }
      });
    }

    function bump() {
      revision += 1;
      cacheRev = -1;
      cacheDays = null;
    }

    function normalize(raw, ev) {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { bad: "shape" };
      var out = {};
      if (raw.date != null) {
        if (typeof raw.date !== "string" || !dateSet[raw.date]) return { bad: "date" };
        if (raw.date !== ev.baselineDate) out.date = raw.date;
      }
      if (raw.startMin != null) {
        if (!isMin(raw.startMin)) return { bad: "time" };
        if (raw.startMin !== ev.startMin) out.startMin = raw.startMin;
      }
      var changed = !!(out.date || isMin(out.startMin));
      if (changed && ev.protection && raw.allow !== true) return { bad: "protected" };
      if (changed && ev.protection) out.allow = true;
      if (!changed) return { empty: true };
      return { value: out };
    }

    function appliedMap() {
      var map = {};
      skipped = [];
      staleIds = [];
      Object.keys(bag).forEach(function (id) {
        var ev = byId[id];
        if (!ev) {
          staleIds.push(id);
          return;
        }
        var norm = normalize(bag[id], ev);
        if (norm.bad) {
          skipped.push({ id: id, reason: norm.bad });
          return;
        }
        if (norm.value) map[id] = norm.value;
      });
      return map;
    }

    function layoutStart(ev, appliedStart, timeChanged) {
      if (!isMin(appliedStart) && appliedStart !== 0) {
        if (appliedStart == null) return null;
      }
      if (!isMin(appliedStart)) return null;
      if (endOfDayMarker(ev, appliedStart, timeChanged)) return 1440;
      return appliedStart;
    }

    function displayTime(ev, appliedStart, personal) {
      if (!personal) return ev.baselineTime || "";
      if (!isMin(appliedStart)) return ev.baselineTime || "";
      if (ev.approx) return formatClock(appliedStart).clock + " 전후";
      if (ev.duration != null) return formatSpan(appliedStart, ev.duration);
      return formatClock(appliedStart).clock;
    }

    function viewOf(ev, ov) {
      var appliedStart = ov && isMin(ov.startMin) ? ov.startMin : ev.startMin;
      var timeChanged = !!(ov && isMin(ov.startMin));
      var date = ov && ov.date ? ov.date : ev.baselineDate;
      var personal = !!(ov && (ov.date || timeChanged));
      var endMin = ev.duration != null && isMin(appliedStart) ? appliedStart + ev.duration : null;
      var bookingText = ev.protection ? ev.protection.knownText : "";
      var copy = {};
      Object.keys(ev.item).forEach(function (key) { copy[key] = ev.item[key]; });
      copy.time = displayTime(ev, appliedStart, personal);
      copy._eventId = ev.id;
      copy._personal = personal;
      copy._protected = !!ev.protection;
      copy._bookingText = bookingText;
      copy._protection = ev.protection ? {
        kind: ev.protection.kind,
        title: ev.protection.title,
        knownText: ev.protection.knownText,
        detail: ev.protection.detail,
        overridden: personal
      } : null;
      copy._durationKnown = ev.duration != null;
      copy._approx = ev.approx;
      copy._untimed = !isMin(appliedStart);
      copy._startMin = isMin(appliedStart) ? appliedStart : null;
      copy._endMin = endMin;
      copy._layoutStart = layoutStart(ev, appliedStart, timeChanged);
      copy._baselineDate = ev.baselineDate;
      copy._baselineIndex = ev.baselineIndex;
      copy._baselineTime = ev.baselineTime;
      copy._date = date;
      return copy;
    }

    function insertionKey(item) {
      if (item._layoutStart == null) return null;
      return item._layoutStart;
    }

    function orderDay(items) {
      var fixed = items.filter(function (item) { return !item._personal; });
      fixed.sort(function (a, b) {
        if (a._baselineDate !== b._baselineDate) return a._baselineDate < b._baselineDate ? -1 : 1;
        return a._baselineIndex - b._baselineIndex;
      });
      var moved = items.filter(function (item) { return item._personal; });
      moved.sort(function (a, b) {
        var ak = insertionKey(a);
        var bk = insertionKey(b);
        if (ak == null && bk == null) return a._baselineIndex - b._baselineIndex;
        if (ak == null) return 1;
        if (bk == null) return -1;
        if (ak !== bk) return ak - bk;
        return a._baselineIndex - b._baselineIndex;
      });
      var result = fixed.slice();
      moved.forEach(function (item) {
        var key = insertionKey(item);
        var idx = result.length;
        if (key != null) {
          for (var i = 0; i < result.length; i += 1) {
            var other = insertionKey(result[i]);
            if (other != null && other > key) { idx = i; break; }
          }
        }
        result.splice(idx, 0, item);
      });
      return result;
    }

    function overlapInterval(item) {
      if (item._layoutStart === 1440 && item._approx && !item._personal) return null;
      if (!isMin(item._startMin)) return null;
      if (item._durationKnown && typeof item._endMin === "number") return [item._startMin, item._endMin];
      return [item._startMin, item._startMin];
    }

    function overlapMessages(items) {
      var found = [];
      for (var i = 0; i < items.length; i += 1) {
        for (var j = i + 1; j < items.length; j += 1) {
          var a = items[i];
          var b = items[j];
          var ia = overlapInterval(a);
          var ib = overlapInterval(b);
          if (!ia || !ib) continue;
          var aPoint = ia[0] === ia[1];
          var bPoint = ib[0] === ib[1];
          var message = "";
          var type = "";
          if (!aPoint && !bPoint && ia[0] < ib[1] && ib[0] < ia[1]) {
            type = "range";
            message = "「" + a.text + "」 " + a.time + "과 「" + b.text + "」 " + b.time + "이 겹칩니다. 다른 일정은 밀지 않았습니다.";
          } else if (!aPoint && bPoint && ib[0] >= ia[0] && ib[0] < ia[1]) {
            type = "point";
            message = "「" + b.text + "」 시작(" + b.time + ")이 「" + a.text + "」 " + a.time + " 안에 있습니다. 끝나는 시각이 없는 쪽은 겹치는 길이를 정하지 않았습니다.";
          } else if (!bPoint && aPoint && ia[0] >= ib[0] && ia[0] < ib[1]) {
            type = "point";
            message = "「" + a.text + "」 시작(" + a.time + ")이 「" + b.text + "」 " + b.time + " 안에 있습니다. 끝나는 시각이 없는 쪽은 겹치는 길이를 정하지 않았습니다.";
          } else if (aPoint && bPoint && ia[0] === ib[0]) {
            type = "same";
            message = "「" + a.text + "」와 「" + b.text + "」가 같은 시각(" + a.time + ")에 시작합니다. 다른 일정은 밀지 않았습니다.";
          }
          if (type) found.push({ type: type, message: message, aId: a._eventId, bId: b._eventId });
        }
      }
      return found;
    }

    function buildDays() {
      if (cacheDays && cacheRev === revision) return cacheDays;
      var applied = appliedMap();
      var groups = {};
      indexed.days.forEach(function (day) {
        groups[day.date] = {
          date: day.date,
          title: day.title,
          city: day.city,
          blurb: day.blurb,
          notes: day.notes,
          items: []
        };
      });
      indexed.events.forEach(function (ev) {
        var ov = applied[ev.id] || null;
        var view = viewOf(ev, ov);
        var bucket = groups[view._date] || groups[ev.baselineDate];
        bucket.items.push(view);
      });
      var days = indexed.days.map(function (day) {
        var group = groups[day.date];
        group.items = orderDay(group.items);
        group.overlaps = overlapMessages(group.items);
        return group;
      });
      cacheDays = days;
      cacheRev = revision;
      return days;
    }

    function commit(nextBag) {
      undoStack.push({ overrides: clone(bag) });
      if (undoStack.length > MAX_UNDO) undoStack.shift();
      bag = nextBag;
      bump();
      persist();
      emit();
    }

    var api;

    function plan(id, patch, opts) {
      var ev = byId[id];
      if (!ev) return { ok: false, reason: "missing" };
      opts = opts || {};
      patch = patch || {};
      var current = appliedMap()[id] || null;
      var date = patch.date != null ? patch.date : (current && current.date ? current.date : ev.baselineDate);
      if (!dateSet[date]) return { ok: false, reason: "date" };
      var startMin = patch.startMin != null ? patch.startMin : (current && isMin(current.startMin) ? current.startMin : ev.startMin);
      if (patch.startMin != null) {
        if (typeof startMin !== "number" || startMin !== Math.floor(startMin)) return { ok: false, reason: "time" };
        if (opts.snap) startMin = snapMinutes(startMin);
        if (!isMin(startMin)) return { ok: false, reason: "time" };
      }
      var next = clone(bag);
      var entry = {};
      if (date !== ev.baselineDate) entry.date = date;
      if (isMin(startMin) && startMin !== ev.startMin) entry.startMin = startMin;
      else if (patch.startMin != null && ev.startMin == null && isMin(startMin)) entry.startMin = startMin;
      var changed = !!(entry.date || isMin(entry.startMin));
      if (!changed) {
        if (next[id]) delete next[id];
        var same = JSON.stringify(next) === JSON.stringify(bag);
        return { ok: true, noop: same, id: id, date: ev.baselineDate, startMin: ev.startMin, nextBag: next };
      }
      if (ev.protection && !opts.confirmProtected) {
        return {
          ok: false,
          reason: "protected",
          id: id,
          date: date,
          startMin: isMin(startMin) ? startMin : null,
          protection: {
            title: ev.protection.title,
            knownText: ev.protection.knownText,
            detail: ev.protection.detail,
            kind: ev.protection.kind
          }
        };
      }
      if (ev.protection) entry.allow = true;
      next[id] = entry;
      return {
        ok: true,
        noop: false,
        id: id,
        date: date,
        startMin: isMin(entry.startMin) ? entry.startMin : ev.startMin,
        nextBag: next,
        protectedMove: !!ev.protection
      };
    }

    readStorage();

    api = {
      SNAP_MINUTES: SNAP_MINUTES,
      PLACEHOLDER_MINUTES: PLACEHOLDER_MINUTES,
      KEY: KEY,
      parseTime: parseTime,
      snap: snapMinutes,
      formatMinutes: function (min) { return formatClock(min).clock; },
      revision: function () { return revision; },
      dates: function () { return indexed.dates.slice(); },
      days: buildDays,
      overlaps: function (date) {
        var day = null;
        buildDays().forEach(function (item) { if (item.date === date) day = item; });
        return day ? day.overlaps.slice() : [];
      },
      display: function (id) {
        var found = null;
        buildDays().forEach(function (day) {
          day.items.forEach(function (item) {
            if (item._eventId === id) found = item;
          });
        });
        return found;
      },
      discrepancies: function () {
        return indexed.report.filter(function (row) { return !row.match; }).map(function (row) { return clone(row); });
      },
      bookingReport: function () {
        return indexed.report.map(function (row) { return clone(row); });
      },
      status: function () {
        appliedMap();
        return {
          v: VERSION,
          localOnly: true,
          saveError: saveError,
          loadIssue: loadIssue,
          backupKept: backupKept,
          writeBlocked: writeBlocked,
          staleIds: staleIds.slice(),
          skipped: skipped.map(function (row) { return { id: row.id, reason: row.reason }; }),
          undoCount: undoStack.length,
          overrideCount: Object.keys(bag).length
        };
      },
      canUndo: function () { return undoStack.length > 0; },
      plan: plan,
      move: function (id, patch, opts) {
        var planned = plan(id, patch, opts);
        if (!planned.ok || planned.noop) return planned;
        commit(planned.nextBag);
        var placed = api.display(id);
        var day = placed ? placed._date : planned.date;
        return {
          ok: true,
          noop: false,
          id: id,
          date: day,
          startMin: placed ? placed._startMin : planned.startMin,
          time: placed ? placed.time : "",
          overlaps: api.overlaps(day),
          saveError: saveError,
          protectedMove: planned.protectedMove
        };
      },
      undo: function () {
        if (!undoStack.length) return { ok: false, reason: "empty" };
        var prev = undoStack.pop();
        bag = clone(prev.overrides || {});
        bump();
        persist();
        emit();
        return { ok: true, saveError: saveError };
      },
      reset: function () {
        if (!Object.keys(bag).length) return { ok: true, noop: true };
        undoStack.push({ overrides: clone(bag) });
        if (undoStack.length > MAX_UNDO) undoStack.shift();
        bag = {};
        bump();
        persist();
        emit();
        return { ok: true, saveError: saveError };
      },
      subscribe: function (fn) {
        listeners.push(fn);
        return function () {
          listeners = listeners.filter(function (item) { return item !== fn; });
        };
      }
    };
    return api;
  }

  var exported = {
    create: createSchedule,
    SNAP_MINUTES: SNAP_MINUTES,
    PLACEHOLDER_MINUTES: PLACEHOLDER_MINUTES,
    KEY: KEY,
    parseTime: parseTime,
    snap: snapMinutes
  };

  if (typeof module === "object" && module.exports) module.exports = exported;

  if (typeof window !== "undefined" && window.TRIP) {
    var storage = null;
    try {
      if (window.localStorage) storage = window.localStorage;
    } catch (err) { storage = null; }
    var live = createSchedule(window.TRIP, storage);
    Object.keys(live).forEach(function (key) { exported[key] = live[key]; });
  }

  root.TripSchedule = exported;
})(typeof globalThis !== "undefined" ? globalThis : this);
