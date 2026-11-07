/* Day timetable. Drag and the time form both call TripSchedule.move,
   so the list, map order, and this grid share one effective schedule.
   Clock values are local trip minutes, never the browser timezone. */
(function () {
  var PX = 168;
  var WEEK = ["일", "월", "화", "수", "목", "금", "토"];
  var ui = {
    date: "",
    flash: "",
    pending: null,
    press: null,
    drag: null,
    built: false
  };

  function $(id) { return document.getElementById(id); }
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function koDate(iso) {
    var parts = iso.split("-").map(Number);
    var w = WEEK[new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).getUTCDay()];
    return parts[1] + "/" + parts[2] + " " + w;
  }
  function hourLabel(min) {
    if (min === 1440) return "24:00";
    if (min > 1440) return "다음날 " + window.TripSchedule.formatMinutes(min);
    return window.TripSchedule.formatMinutes(min);
  }
  function showDialog(el) {
    if (!el) return;
    el.hidden = false;
    if (el.showModal) {
      if (!el.open) el.showModal();
    }
  }
  function closeDialog(el) {
    if (!el) return;
    if (el.open && el.close) el.close();
  }
  function announce(text) {
    var live = $("tt-live");
    if (live) live.textContent = text || "";
  }

  function statusNotes(status) {
    var notes = [];
    if (status.loadIssue === "malformed") {
      notes.push("저장된 일정표를 읽지 못했습니다. 잘못된 내용은 적용하지 않았고, 원본은 이 브라우저에 백업으로 남겨 두었습니다.");
    } else if (status.loadIssue === "version") {
      notes.push("저장된 일정표 형식이 달라 적용하지 않았습니다. 그 저장본은 지우지 않았습니다.");
    } else if (status.loadIssue === "read") {
      notes.push("이 브라우저 저장소를 읽지 못했습니다. 기본 일정을 보여 주며, 읽지 못한 저장본을 덮어쓰지 않습니다.");
    }
    if (status.saveError) {
      notes.push("방금 바꾼 내용을 이 브라우저에 저장하지 못했습니다. 화면에는 반영되어 있지만 새로고침하면 사라질 수 있습니다.");
    }
    if (status.writeBlocked && !status.saveError) {
      notes.push("저장소를 안전하게 쓰지 못하는 상태라, 수정은 이 화면에만 잠시 남아 있습니다.");
    }
    if (status.staleIds.length) {
      notes.push("이전에 저장된 항목 " + status.staleIds.length + "개는 지금 기본 일정에 없어 적용하지 않았습니다. 저장본은 유지합니다.");
    }
    if (status.skipped.length) {
      notes.push("저장값 " + status.skipped.length + "개는 시각이 잘못되었거나 예약 확인이 없어 건너뛰었습니다. 그 값은 지우지 않았습니다.");
    }
    return notes;
  }

  function visualSpan(item) {
    if (item._layoutStart == null) return null;
    var start = item._layoutStart;
    var end = item._durationKnown && typeof item._endMin === "number"
      ? item._endMin
      : start + window.TripSchedule.PLACEHOLDER_MINUTES;
    return { start: start, end: end, placeholder: !item._durationKnown };
  }

  function boxPx(block) {
    var logical = ((block.vEnd - block.vStart) / 60) * PX;
    var minPx = block.item._protected ? 72 : 44;
    return Math.max(minPx, logical - 3);
  }

  function paintedEnd(block) {
    return block.vStart + ((boxPx(block) + 4) / PX) * 60;
  }

  function assignLanes(blocks) {
    var items = blocks.slice().sort(function (a, b) {
      return a.vStart - b.vStart || a.vEnd - b.vEnd;
    });
    var ends = [];
    items.forEach(function (block) {
      var paintEnd = paintedEnd(block);
      var lane = 0;
      for (; lane < ends.length; lane += 1) {
        if (ends[lane] <= block.vStart + 0.01) break;
      }
      if (lane === ends.length) ends.push(paintEnd);
      else ends[lane] = paintEnd;
      block.lane = lane;
      block.boxPx = boxPx(block);
    });
    var count = Math.max(1, ends.length);
    items.forEach(function (block) { block.laneCount = count; });
    return count;
  }

  function eventHtml(item, style, loose) {
    var span = visualSpan(item);
    var locked = item._protected ? " is-locked" : "";
    var kind = item._durationKnown ? " is-set" : " is-open";
    var overlap = item._overlap ? " is-overlap" : "";
    var personal = item._personal ? " is-personal" : "";
    var label = (item.time || "시각 없음") + " " + item.text;
    var tags = "";
    if (!item._durationKnown && !item._untimed) tags += '<p class="tt-tag">길이 미정</p>';
    if (item._untimed) tags += '<p class="tt-tag">시각 없음</p>';
    if (item._bookingText) {
      tags += '<p class="tt-book">예약 ' + esc(item._bookingText) + (item._personal ? " · 개인 계획만 변경" : "") + "</p>";
    } else if (item._personal) {
      tags += '<p class="tt-book">이 브라우저에서 변경</p>';
    }
    var href = "#/place/" + item._date + "/" + encodeURIComponent(item.placeId) + "/" + encodeURIComponent(item._eventId);
    return '<article class="tt-event' + kind + locked + overlap + personal + (loose ? " is-loose" : "") + '" data-event-id="'
      + esc(item._eventId) + '" data-start="' + (item._startMin == null ? "" : item._startMin) + '" data-layout-start="'
      + (item._layoutStart == null ? "" : item._layoutStart) + '" data-duration-known="' + (item._durationKnown ? "1" : "0")
      + '" data-protected="' + (item._protected ? "1" : "0") + '" data-lane="' + (item._lane || 0) + '" data-time="'
      + esc(item.time || "") + '" style="' + style + '" tabindex="0" aria-label="' + esc(label) + '">'
      + '<button type="button" class="tt-handle" data-tt="handle" aria-label="끌어 옮기기" title="끌어 옮기기"><span aria-hidden="true"></span></button>'
      + '<div class="tt-body"><div class="tt-line"><span class="tt-when">' + esc(item.time || "시각 없음") + "</span>"
      + '<h3 title="' + esc(item.text) + '">' + esc(item.text) + "</h3>"
      + '<button type="button" class="tt-edit" data-tt="edit" aria-label="시간 수정">수정</button>'
      + '<a class="tt-open" href="' + href + '">자세히</a></div>'
      + tags + "</div></article>";
  }

  function render(route) {
    var root = $("view-timetable");
    var schedule = window.TripSchedule;
    if (!root || !schedule || !schedule.days) return;
    cancelGesture();
    ensureChrome();
    var dates = schedule.dates();
    var date = route && route.day;
    if (!date || dates.indexOf(date) < 0) date = dates[0];
    ui.date = date;
    var day = null;
    schedule.days().forEach(function (item) { if (item.date === date) day = item; });
    if (!day) return;
    var overlapIds = {};
    (day.overlaps || []).forEach(function (row) {
      overlapIds[row.aId] = true;
      overlapIds[row.bId] = true;
    });
    var timed = [];
    var loose = [];
    day.items.forEach(function (item) {
      item._overlap = !!overlapIds[item._eventId];
      var span = visualSpan(item);
      if (!span) loose.push(item);
      else timed.push({ item: item, vStart: span.start, vEnd: span.end, placeholder: span.placeholder });
    });
    var laneCount = assignLanes(timed);
    timed.forEach(function (block) { block.item._lane = block.lane; });
    var gridStart = 8 * 60;
    var gridEnd = 18 * 60;
    if (timed.length) {
      var minStart = timed.reduce(function (min, block) { return Math.min(min, block.vStart); }, 1440);
      var maxEnd = timed.reduce(function (max, block) { return Math.max(max, paintedEnd(block)); }, 0);
      gridStart = Math.max(0, Math.floor(minStart / 60) * 60 - 60);
      gridEnd = Math.ceil(maxEnd / 60) * 60 + 60;
      if (gridEnd < gridStart + 180) gridEnd = gridStart + 180;
    }
    ui.gridStart = gridStart;
    ui.gridEnd = gridEnd;
    var height = ((gridEnd - gridStart) / 60) * PX;
    var hours = "";
    for (var min = gridStart; min < gridEnd; min += 60) {
      hours += '<div class="tt-hour" style="height:' + PX + 'px">' + esc(hourLabel(min)) + "</div>";
    }
    var blocks = timed.map(function (block) {
      var top = ((block.vStart - gridStart) / 60) * PX;
      var h = block.boxPx;
      var width = "calc((100% - " + ((laneCount - 1) * 6) + "px) / " + laneCount + ")";
      var left = "calc(" + block.lane + " * ((100% - " + ((laneCount - 1) * 6) + "px) / " + laneCount + " + 6px))";
      return eventHtml(block.item, "top:" + top + "px;height:" + h + "px;left:" + left + ";width:" + width);
    }).join("");
    var looseHtml = loose.map(function (item) {
      return eventHtml(item, "", true);
    }).join("");
    var chips = dates.map(function (iso) {
      var on = iso === date ? " is-on" : "";
      var current = iso === date ? ' aria-current="true"' : "";
      return '<a class="chip' + on + '" href="#/timetable/' + iso + '"' + current + ">" + esc(koDate(iso)) + "</a>";
    }).join("");
    var options = dates.map(function (iso) {
      return '<option value="' + iso + '"' + (iso === date ? " selected" : "") + ">" + esc(koDate(iso)) + "</option>";
    }).join("");
    var status = schedule.status();
    var notes = statusNotes(status).map(function (text) { return "<p>" + esc(text) + "</p>"; }).join("");
    var overlaps = (day.overlaps || []).map(function (row) { return "<p>" + esc(row.message) + "</p>"; }).join("");
    var flash = ui.flash ? "<p>" + esc(ui.flash) + "</p>" : "";
    ui.flash = "";
    root.innerHTML = '<div class="tt">'
      + '<p class="tt-local">바꾼 시각은 <strong>이 브라우저에만</strong> 저장됩니다. 다른 기기나 다른 사람과 자동으로 동기화되지 않습니다. 시각은 여행지 현지 시각(24시간)이고, 서울이나 미국 시간으로 바꾸지 않습니다. 이동 시간은 다시 계산하지 않습니다.</p>'
      + (notes || flash ? '<div class="tt-banner" role="status">' + notes + flash + "</div>" : "")
      + '<div class="tt-tools"><button type="button" class="btn" data-tt="undo"' + (schedule.canUndo() ? "" : " disabled") + '>실행 취소</button>'
      + '<button type="button" class="btn" data-tt="reset">기본 일정으로</button>'
      + '<a class="btn" href="#/schedule/' + date + '">목록</a></div>'
      + '<div class="tt-pick"><label for="tt-date">날짜</label><select id="tt-date">' + options + "</select></div>"
      + '<div class="chips" aria-label="여행 날짜">' + chips + "</div>"
      + '<div class="tt-day"><p>' + esc(day.city || "") + "</p><h2>" + esc(koDate(date)) + " · " + esc(day.title) + "</h2></div>"
      + '<ul class="tt-legend"><li><i class="is-set"></i>끝나는 시각이 있음</li><li><i class="is-open"></i>길이 미정 · 점선은 자리 표시</li><li><i class="is-locked"></i>예약 · 확인 없이 안 움직임</li></ul>'
      + (overlaps ? '<div class="tt-banner tt-banner-warn" role="status">' + overlaps + "</div>" : "")
      + (looseHtml ? '<section class="tt-loose"><h3>시각이 없는 일정</h3><p class="fine">끝나는 시각을 만들지 않습니다. 시작 시각을 정하면 시간표로 들어갑니다.</p>' + looseHtml + "</section>" : "")
      + (timed.length ? '<div class="tt-grid" style="height:' + height + 'px"><div class="tt-hours" aria-hidden="true">' + hours
        + '</div><div class="tt-canvas" data-grid-start="' + gridStart + '" data-px="' + PX + '" style="--tt-px:' + PX + 'px" role="list" aria-label="' + esc(koDate(date)) + ' 시간표">'
        + blocks + '<div class="tt-preview" hidden></div></div></div>'
        : '<p class="tt-empty">이 날에는 시각이 적힌 일정이 없습니다.</p>')
      + "</div>";
    var chip = root.querySelector(".chip.is-on");
    if (chip && chip.scrollIntoView) chip.scrollIntoView({ inline: "center", block: "nearest" });
    announce(flash ? flash.replace(/<\/?p>/g, "") : "");
  }

  function ensureChrome() {
    if (ui.built) return;
    ui.built = true;
    var host = document.createElement("div");
    host.innerHTML = '<div id="tt-live" class="tt-sr" role="status" aria-live="polite"></div>'
      + '<dialog id="tt-editor" class="tt-dialog" aria-labelledby="tt-editor-title"><form method="dialog" id="tt-editor-form">'
      + '<h2 id="tt-editor-title">시간 수정</h2><p id="tt-editor-event" class="fine"></p>'
      + '<label for="tt-editor-date">날짜</label><select id="tt-editor-date"></select>'
      + '<label for="tt-editor-time">시작 시각</label><input id="tt-editor-time" type="time" step="60" required>'
      + '<p id="tt-editor-end" class="fine"></p><p id="tt-editor-book" class="fine" hidden></p>'
      + '<p id="tt-editor-error" class="tt-error" role="alert"></p>'
      + '<div class="tt-dialog-actions"><button type="submit" class="btn" value="cancel">취소</button>'
      + '<button type="submit" class="btn btn-primary" id="tt-editor-save" value="save">저장</button></div></form></dialog>'
      + '<dialog id="tt-confirm" class="tt-dialog" aria-labelledby="tt-confirm-title"><h2 id="tt-confirm-title">예약된 일정</h2>'
      + '<p id="tt-confirm-text"></p><div class="tt-dialog-actions">'
      + '<button type="button" class="btn" data-tt="confirm-no">취소</button>'
      + '<button type="button" class="btn btn-primary" data-tt="confirm-yes">개인 계획만 옮기기</button></div></dialog>'
      + '<dialog id="tt-reset" class="tt-dialog" aria-labelledby="tt-reset-title"><h2 id="tt-reset-title">기본 일정으로 되돌리기</h2>'
      + '<p>이 브라우저에 저장된 개인 수정만 지웁니다. 앱에 들어 있는 기본 일정과 비용은 그대로이고, 실제 예약도 바뀌지 않습니다. 다른 기기에는 영향이 없습니다.</p>'
      + '<div class="tt-dialog-actions"><button type="button" class="btn" data-tt="reset-no">취소</button>'
      + '<button type="button" class="btn btn-primary" data-tt="reset-yes">되돌리기</button></div></dialog>';
    document.body.appendChild(host);
    $("tt-editor-form").addEventListener("submit", onEditorSubmit);
    $("tt-editor-time").addEventListener("input", refreshEndHint);
    $("tt-editor-date").addEventListener("change", refreshEndHint);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove, { passive: false });
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("click", onClick);
    document.addEventListener("change", onChange);
    document.addEventListener("keydown", onKey);
  }

  function onChange(event) {
    if (!event.target || event.target.id !== "tt-date") return;
    if (location.hash !== "#/timetable/" + event.target.value) location.hash = "#/timetable/" + event.target.value;
  }

  function onClick(event) {
    var el = event.target.closest("[data-tt]");
    if (!el) return;
    var action = el.getAttribute("data-tt");
    if (action === "edit") {
      event.preventDefault();
      var block = el.closest("[data-event-id]");
      if (block) openEditor(block.getAttribute("data-event-id"));
      return;
    }
    if (action === "undo") {
      event.preventDefault();
      if (!window.TripSchedule.canUndo()) return;
      ui.flash = "실행 취소했습니다.";
      window.TripSchedule.undo();
      return;
    }
    if (action === "reset") {
      event.preventDefault();
      showDialog($("tt-reset"));
      return;
    }
    if (action === "reset-no" || action === "confirm-no") {
      event.preventDefault();
      closeDialog(el.closest("dialog"));
      if (action === "confirm-no") {
        ui.pending = null;
        ui.flash = "예약된 일정은 확인 없이 옮기지 않습니다. 실제 예약도 바뀌지 않습니다.";
        render({ day: ui.date });
      }
      return;
    }
    if (action === "reset-yes") {
      event.preventDefault();
      closeDialog($("tt-reset"));
      if (!window.TripSchedule.status().overrideCount) {
        ui.flash = "되돌릴 개인 수정이 없습니다.";
        render({ day: ui.date });
        return;
      }
      ui.flash = "이 브라우저의 개인 수정을 기본 일정으로 되돌렸습니다.";
      window.TripSchedule.reset();
      return;
    }
    if (action === "confirm-yes") {
      event.preventDefault();
      var pending = ui.pending;
      ui.pending = null;
      closeDialog($("tt-confirm"));
      if (!pending) return;
      ui.flash = "개인 계획만 옮겼습니다. 예약 시각은 그대로 표시되며, 실제 예약은 바뀌지 않습니다.";
      var result = window.TripSchedule.move(pending.id, pending.patch, pending.opts);
      follow(result);
    }
  }

  function onKey(event) {
    if (event.key !== "Enter" || event.target.classList == null || !event.target.classList.contains("tt-event")) return;
    event.preventDefault();
    openEditor(event.target.getAttribute("data-event-id"));
  }

  function openEditor(id) {
    var item = window.TripSchedule.display(id);
    if (!item) return;
    ui.editing = id;
    var dates = window.TripSchedule.dates();
    $("tt-editor-event").textContent = item.text;
    $("tt-editor-date").innerHTML = dates.map(function (iso) {
      return '<option value="' + iso + '"' + (iso === item._date ? " selected" : "") + ">" + esc(koDate(iso)) + "</option>";
    }).join("");
    var time = $("tt-editor-time");
    time.value = item._startMin == null ? "" : window.TripSchedule.formatMinutes(item._startMin);
    $("tt-editor-error").textContent = "";
    var book = $("tt-editor-book");
    if (item._protected) {
      book.hidden = false;
      book.textContent = item._protection.title + " 예약 시각은 " + item._bookingText + "입니다. " + item._protection.detail;
      $("tt-editor-save").textContent = "개인 계획으로 저장";
    } else {
      book.hidden = true;
      book.textContent = "";
      $("tt-editor-save").textContent = "저장";
    }
    refreshEndHint();
    showDialog($("tt-editor"));
    time.focus();
  }

  function refreshEndHint() {
    var item = ui.editing ? window.TripSchedule.display(ui.editing) : null;
    var node = $("tt-editor-end");
    if (!item || !node) return;
    var parsed = readTime($("tt-editor-time").value);
    if (!item._durationKnown) {
      node.textContent = "끝나는 시각은 일정에 없습니다. 점선 막대는 자리 표시이며, 끝나는 시각으로 저장되지 않습니다.";
      return;
    }
    var dur = item._endMin - item._startMin;
    if (parsed == null) {
      node.textContent = "알고 있는 길이는 " + dur + "분입니다. 시작을 옮기면 끝도 그만큼 따라갑니다.";
      return;
    }
    node.textContent = "끝나는 시각 " + window.TripSchedule.formatMinutes(parsed + dur) + " · 길이 " + dur + "분을 유지합니다.";
  }

  function readTime(value) {
    var match = /^(\d{2}):(\d{2})/.exec(value || "");
    if (!match) return null;
    var min = Number(match[1]) * 60 + Number(match[2]);
    if (min < 0 || min > 1439) return null;
    return min;
  }

  function onEditorSubmit(event) {
    event.preventDefault();
    var submitter = event.submitter;
    if (!submitter || submitter.value !== "save") {
      closeDialog($("tt-editor"));
      return;
    }
    var startMin = readTime($("tt-editor-time").value);
    var error = $("tt-editor-error");
    if (startMin == null) {
      error.textContent = "시작 시각을 0:00–23:59 사이로 입력해 주세요.";
      return;
    }
    error.textContent = "";
    var id = ui.editing;
    var patch = { date: $("tt-editor-date").value, startMin: startMin };
    closeDialog($("tt-editor"));
    requestMove(id, patch, { snap: false, source: "editor" });
  }

  function requestMove(id, patch, opts) {
    var planned = window.TripSchedule.plan(id, patch, opts);
    if (!planned.ok && planned.reason === "protected") {
      ui.pending = { id: id, patch: patch, opts: { snap: !!opts.snap, source: opts.source, confirmProtected: true } };
      var when = planned.startMin == null ? "다른 날" : window.TripSchedule.formatMinutes(planned.startMin);
      $("tt-confirm-text").textContent = planned.protection.title + "의 예약 시각은 " + planned.protection.knownText
        + "입니다. " + planned.protection.detail + " 개인 계획만 " + when + "으로 옮길까요?";
      showDialog($("tt-confirm"));
      return planned;
    }
    if (!planned.ok) {
      ui.flash = planned.reason === "date" ? "여행 날짜 안에서만 옮길 수 있습니다." : "그 시각으로는 옮길 수 없습니다.";
      render({ day: ui.date });
      return planned;
    }
    if (planned.noop) return planned;
    ui.flash = "시간표와 일정 목록에 반영했습니다.";
    var result = window.TripSchedule.move(id, patch, opts);
    follow(result);
    return result;
  }

  function follow(result) {
    if (result && result.ok && result.date && result.date !== ui.date) {
      if (location.hash !== "#/timetable/" + result.date) location.hash = "#/timetable/" + result.date;
    }
  }

  function eventBlock(target) {
    return target && target.closest ? target.closest(".tt-event") : null;
  }

  function onPointerDown(event) {
    var view = $("view-timetable");
    if (!view || view.hidden) return;
    var handle = event.target.closest("[data-tt='handle']");
    var block = eventBlock(event.target);
    if (!block || !view.contains(block) || block.classList.contains("is-loose")) return;
    if (!handle && event.target.closest("a, button, input, select, textarea")) return;
    if (event.button != null && event.button !== 0) return;
    if (handle) {
      event.preventDefault();
      beginDrag(event, block);
      return;
    }
    if (event.pointerType === "mouse") {
      ui.press = { kind: "mouse", id: event.pointerId, x: event.clientX, y: event.clientY, block: block };
      return;
    }
    ui.press = {
      kind: "touch",
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      block: block,
      timer: setTimeout(function () {
        if (!ui.press || ui.press.block !== block) return;
        beginDrag({ clientX: ui.press.x, clientY: ui.press.y, pointerId: ui.press.id }, block);
      }, 480)
    };
  }

  function onPointerMove(event) {
    if (ui.press && event.pointerId === ui.press.id) {
      var dx = event.clientX - ui.press.x;
      var dy = event.clientY - ui.press.y;
      if (ui.press.kind === "touch" && Math.hypot(dx, dy) > 12) {
        clearTimeout(ui.press.timer);
        ui.press = null;
        return;
      }
      if (ui.press.kind === "mouse" && Math.hypot(dx, dy) > 5) {
        var press = ui.press;
        ui.press = null;
        beginDrag(event, press.block);
      }
    }
    if (!ui.drag || event.pointerId !== ui.drag.pointerId) return;
    event.preventDefault();
    ui.drag.lastY = event.clientY;
    movePreview(event.clientY);
  }

  function onPointerUp(event) {
    if (ui.press && event.pointerId === ui.press.id) {
      clearTimeout(ui.press.timer);
      ui.press = null;
    }
    if (!ui.drag || event.pointerId !== ui.drag.pointerId) return;
    var drag = ui.drag;
    ui.drag = null;
    document.body.classList.remove("tt-dragging");
    if (drag.raf) cancelAnimationFrame(drag.raf);
    var startMin = minuteAt(event.clientY, drag.offset);
    var preview = document.querySelector(".tt-preview");
    if (preview) preview.hidden = true;
    requestMove(drag.id, { date: ui.date, startMin: startMin }, { snap: true, source: "drag" });
  }

  function beginDrag(event, block) {
    if (ui.press) {
      clearTimeout(ui.press.timer);
      ui.press = null;
    }
    var canvas = document.querySelector("#view-timetable .tt-canvas");
    if (!canvas) return;
    var layout = Number(block.getAttribute("data-layout-start"));
    if (!Number.isFinite(layout)) return;
    var pointer = minuteRaw(event.clientY);
    ui.drag = {
      id: block.getAttribute("data-event-id"),
      pointerId: event.pointerId,
      offset: pointer - layout,
      lastY: event.clientY,
      known: block.getAttribute("data-duration-known") === "1",
      label: block.querySelector("h3") ? block.querySelector("h3").textContent : ""
    };
    block.classList.add("is-ghost");
    document.body.classList.add("tt-dragging");
    if (block.setPointerCapture) {
      try { block.setPointerCapture(event.pointerId); } catch (err) { /* pointer already gone */ }
    }
    movePreview(event.clientY);
    ui.drag.raf = requestAnimationFrame(scrollLoop);
  }

  function minuteRaw(clientY) {
    var canvas = document.querySelector("#view-timetable .tt-canvas");
    var rect = canvas.getBoundingClientRect();
    var px = Number(canvas.getAttribute("data-px")) || PX;
    var start = Number(canvas.getAttribute("data-grid-start")) || 0;
    return start + ((clientY - rect.top) / px) * 60;
  }

  function minuteAt(clientY, offset) {
    var raw = minuteRaw(clientY) - offset;
    return window.TripSchedule.snap(raw);
  }

  function movePreview(clientY) {
    var drag = ui.drag;
    var canvas = document.querySelector("#view-timetable .tt-canvas");
    var preview = canvas && canvas.querySelector(".tt-preview");
    var block = document.querySelector('.tt-event[data-event-id="' + drag.id + '"]');
    if (!preview || !block) return;
    var start = minuteAt(clientY, drag.offset);
    var top = ((start - ui.gridStart) / 60) * PX;
    preview.hidden = false;
    preview.style.top = Math.max(0, top) + "px";
    preview.style.height = block.style.height;
    var item = window.TripSchedule.display(drag.id);
    var text = window.TripSchedule.formatMinutes(start);
    if (item && item._durationKnown && item._startMin != null && item._endMin != null) {
      text = text + "–" + window.TripSchedule.formatMinutes(start + (item._endMin - item._startMin));
    } else if (item && item._approx) text += " 전후";
    preview.textContent = text + " · " + drag.label;
    if (clientY < 72) window.scrollBy(0, -14);
    else if (clientY > window.innerHeight - 96) window.scrollBy(0, 14);
  }

  function scrollLoop() {
    if (!ui.drag) return;
    movePreview(ui.drag.lastY);
    ui.drag.raf = requestAnimationFrame(scrollLoop);
  }

  function cancelGesture() {
    if (ui.press) clearTimeout(ui.press.timer);
    ui.press = null;
    if (ui.drag && ui.drag.raf) cancelAnimationFrame(ui.drag.raf);
    ui.drag = null;
    document.body.classList.remove("tt-dragging");
  }

  window.TripTimetable = { render: render, px: PX };
})();
