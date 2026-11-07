/* Schedule engine tests. Synthetic storage only — no vault, no live user data. */
import fs from "fs";
import vm from "vm";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

const require = createRequire(import.meta.url);
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const engine = require(path.join(root, "assets/js/schedule.js"));
const source = fs.readFileSync(path.join(root, "assets/js/schedule.js"), "utf8");
const tripSource = fs.readFileSync(path.join(root, "data/trip.js"), "utf8");

let failed = 0;
function assert(cond, message) {
  if (!cond) {
    failed += 1;
    console.error("FAIL " + message);
  }
}
function eq(a, b, message) {
  if (a !== b) {
    failed += 1;
    console.error("FAIL " + message + "\n  expected: " + JSON.stringify(b) + "\n  actual:   " + JSON.stringify(a));
  }
}

function loadTrip() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(tripSource, context, { filename: "trip.js" });
  return context.window.TRIP;
}

function memoryStorage(initial) {
  const mem = Object.assign({}, initial || {});
  return {
    mem: mem,
    fail: false,
    getItem(key) {
      if (this.failGet) throw new Error("SecurityError");
      return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : null;
    },
    setItem(key, value) {
      if (this.fail) {
        const err = new Error("quota");
        err.name = "QuotaExceededError";
        throw err;
      }
      mem[key] = String(value);
    }
  };
}

function findItem(schedule, date, includes) {
  const day = schedule.days().find((item) => item.date === date);
  return day.items.find((item) => item.text.includes(includes));
}

function baselineTimes(trip) {
  return trip.days.map((day) => day.items.map((item) => ({
    time: item.time || "",
    text: item.text,
    note: item.note || "",
    placeId: item.placeId,
    booked: !!item.booked,
    docId: item.docId || "",
    leg: !!item.leg
  })));
}

function notesSnapshot(trip) {
  return JSON.stringify(trip.days.map((day) => day.notes || null));
}

const trip = loadTrip();
const originalTimes = JSON.stringify(baselineTimes(trip));
const originalNotes = notesSnapshot(trip);
const originalTripFile = tripSource;

assert(!/new Date|toISOString|getTimezoneOffset|timeZone/.test(source), "schedule engine must not convert timezones");
assert(!source.includes("localStorage") || source.includes("window.localStorage"), "storage stays behind the injected adapter");

const fresh = engine.create(trip, memoryStorage());
eq(JSON.stringify(baselineTimes(trip)), originalTimes, "indexing does not change baseline fields");
eq(notesSnapshot(trip), originalNotes, "indexing does not change costs or notes");

fresh.days().forEach((day, index) => {
  const base = trip.days[index];
  eq(day.date, base.date, "day date " + base.date);
  eq(day.items.length, base.items.length, "item count " + base.date);
  day.items.forEach((item, i) => {
    eq(item.time || "", base.items[i].time || "", "default order/time " + base.date + " #" + i);
    eq(item.text, base.items[i].text, "default text " + base.date + " #" + i);
    eq(item._personal, false, "default is not personal " + item._eventId);
    eq(item._eventId, base.date + "." + i, "stable id " + item._eventId);
  });
});

const midnight = findItem(fresh, "2026-12-03", "숙소 복귀");
eq(midnight.time, "00:00 전후", "midnight label unchanged");
eq(midnight._layoutStart, 1440, "midnight sits at the end of the day grid");
eq(fresh.days().find((day) => day.date === "2026-12-03").items.at(-1).text, midnight.text, "default list keeps midnight last");

const garden = findItem(fresh, "2026-11-28", "벨베데레 정원");
assert(garden._untimed, "garden walk has no clock");
eq(garden._durationKnown, false, "untimed is not a duration");
eq(garden.time || "", "", "untimed time stays empty");

const demel = findItem(fresh, "2026-11-28", "데멜");
assert(!demel._protected, "Demel is a flexible event");
assert(!demel._durationKnown, "Demel has no scheduled end");
eq(demel.time, "16:00", "Demel baseline");

const moved = fresh.move(demel._eventId, { startMin: 17 * 60 + 8 }, { snap: true });
assert(moved.ok, "flexible move ok");
eq(moved.time, "17:15", "15-minute snap from 17:08");
eq(findItem(fresh, "2026-11-28", "데멜")._durationKnown, false, "move does not invent an end");
eq(trip.days.find((day) => day.date === "2026-11-28").items.find((item) => item.text.includes("데멜")).time, "16:00", "baseline object stays 16:00");

const day28 = fresh.days().find((day) => day.date === "2026-11-28").items;
const at = (part) => day28.findIndex((item) => item.text.includes(part));
assert(at("데멜") > at("콜마르크트"), "moved Demel is after 16:45 shopping");
assert(at("데멜") < at("Ribs"), "moved Demel is before 17:45 dinner");
eq(day28.find((item) => item.text.includes("콜마르크트")).time, "16:45", "neighbor time unchanged");
eq(day28.find((item) => item.text.includes("Ribs")).time, "17:45", "later neighbor unchanged");

const sacher = findItem(fresh, "2026-11-29", "카페 자허");
eq(sacher.time, "10:00–10:50", "known duration baseline");
eq(sacher._durationKnown, true, "sacher duration known");
const sacherMove = fresh.move(sacher._eventId, { startMin: 11 * 60 + 8 }, { snap: true });
eq(sacherMove.time, "11:15–12:05", "duration preserved across snap");
eq(findItem(fresh, "2026-11-29", "카페 자허")._endMin - findItem(fresh, "2026-11-29", "카페 자허")._startMin, 50, "50 minute duration");

const approx = findItem(fresh, "2026-11-28", "소시지 가판");
eq(approx.time, "12:00 전후", "approx baseline");
const approxMove = fresh.move(approx._eventId, { startMin: 12 * 60 + 10 }, { snap: false });
eq(approxMove.time, "12:10 전후", "approx marker kept, no invented end");

const cross = fresh.move(demel._eventId, { date: "2026-11-29", startMin: 9 * 60 }, { snap: false });
assert(cross.ok, "cross-day move");
eq(findItem(fresh, "2026-11-29", "데멜").time, "09:00", "demel on the 29th");
assert(!fresh.days().find((day) => day.date === "2026-11-28").items.some((item) => item.text.includes("데멜")), "demel left the 28th");
eq(findItem(fresh, "2026-11-29", "데멜").placeId, "demel", "place id survives");
eq(findItem(fresh, "2026-11-29", "데멜")._eventId, demel._eventId, "event id survives the day change");

const belvedere = findItem(fresh, "2026-11-29", "벨베데레 상궁");
eq(belvedere.time, "14:15–16:00", "belvedere itinerary time unchanged");
assert(belvedere._protected, "belvedere locked");
eq(belvedere._bookingText, "14:00", "known ticket time kept separate");
const blocked = fresh.move(belvedere._eventId, { startMin: 15 * 60 }, { snap: false });
eq(blocked.ok, false, "protected move blocked");
eq(blocked.reason, "protected", "reason is protected");
eq(findItem(fresh, "2026-11-29", "벨베데레 상궁").time, "14:15–16:00", "silent move did not stick");
const override = fresh.move(belvedere._eventId, { startMin: 15 * 60 }, { snap: false, confirmProtected: true });
eq(override.time, "15:00–16:45", "personal plan keeps the visit length");
eq(findItem(fresh, "2026-11-29", "벨베데레 상궁")._bookingText, "14:00", "booked time still 14:00");
eq(findItem(fresh, "2026-11-29", "벨베데레 상궁")._protection.overridden, true, "override flagged");

const train = findItem(fresh, "2026-11-30", "RJX 262");
assert(train._protected, "outbound train locked");
eq(train._bookingText, "08:28–10:53", "train span identified");
eq(fresh.move(train._eventId, { startMin: 9 * 60 }, { snap: true }).reason, "protected", "train cannot silently move");
const arrival = findItem(fresh, "2026-11-30", "Salzburg Hbf 도착");
assert(arrival._protected, "matching arrival is locked with the ticket");
eq(fresh.move(arrival._eventId, { startMin: 11 * 60 }, { snap: false }).reason, "protected", "arrival cannot silently move");

const back = findItem(fresh, "2026-11-30", "RJX 13483");
assert(back._protected && back._bookingText === "21:07–23:32", "return train span");
const bud = findItem(fresh, "2026-12-01", "RJX 65");
assert(bud._protected && bud._bookingText === "15:40–18:29", "vienna-budapest span");
const keleti = findItem(fresh, "2026-12-01", "Keleti");
assert(keleti._protected, "keleti arrival locked");
const stand = findItem(fresh, "2026-12-02", "Stand25");
eq(stand.time, "13:00", "Stand25 actual 13:00");
assert(stand._protected && stand._bookingText === "13:00", "Stand25 booking");
assert(!stand._durationKnown, "Stand25 end is not invented from the note");
eq(fresh.move(stand._eventId, { startMin: 14 * 60 }, { snap: false }).reason, "protected", "Stand25 cannot silently move");

const flight = findItem(fresh, "2026-11-27", "MU854");
assert(flight._protected && flight._protection.kind === "flight", "outbound flight locked");
eq(fresh.move(flight._eventId, { startMin: 20 * 60 }, { snap: false }).reason, "protected", "flight cannot silently move");
const flightMark = findItem(fresh, "2026-11-27", "비엔나(VIE)");
eq(flightMark.time, "11/28", "flight date mark is not turned into 06:00");
assert(flightMark._untimed && flightMark._protected, "undated flight hop stays untimed and locked");

const report = fresh.discrepancies();
assert(report.some((row) => row.id === "belvedere-1129" && row.match === false), "belvedere 14:15 vs 14:00 reported");
assert(!report.some((row) => row.id === "restaurant-stand25"), "Stand25 13:00 is not a discrepancy");
assert(!report.some((row) => row.id === "train-vie-bud"), "15:40–18:29 matches");
assert(!fresh.bookingReport().some((row) => row.missing), "every known booking row was found");

/* overlap: put the flexible 16:00 rest inside Belvedere's personal 15:00–16:45 window. */
const rest = findItem(fresh, "2026-11-29", "숙소까지 걸어서");
const overlapMove = fresh.move(rest._eventId, { startMin: 15 * 60 + 30 }, { snap: false });
assert(overlapMove.overlaps.some((row) => row.type === "point"), "point-inside warning");
eq(findItem(fresh, "2026-11-29", "벨베데레 상궁").time, "15:00–16:45", "overlap does not push the other event");
const rangeA = findItem(fresh, "2026-11-29", "슈테판");
const rangeB = findItem(fresh, "2026-11-29", "카페 자허");
/* Sacher is now 11:15–12:05. Move Stephansdom (13:00–13:35) to 11:30–12:05 so the ranges overlap. */
const stephans = fresh.move(rangeA._eventId, { startMin: 11 * 60 + 30 }, { snap: false });
eq(stephans.time, "11:30–12:05", "stephans duration kept");
assert(stephans.overlaps.some((row) => row.type === "range" && row.message.includes("밀지 않았습니다")), "range overlap warns and does not push");
eq(findItem(fresh, "2026-11-29", "카페 자허").time, rangeB.time, "other range stayed put");

assert(fresh.canUndo(), "undo available");
const beforeUndo = findItem(fresh, "2026-11-29", "슈테판").time;
fresh.undo();
assert(findItem(fresh, "2026-11-29", "슈테판").time !== beforeUndo, "undo restores the previous time");

const store = memoryStorage();
const saved = engine.create(trip, store);
const id = findItem(saved, "2026-11-28", "데멜")._eventId;
saved.move(id, { startMin: 18 * 60 }, { snap: false });
const reloaded = engine.create(trip, store);
eq(findItem(reloaded, "2026-11-28", "데멜").time, "18:00", "reload keeps the edit");
eq(findItem(reloaded, "2026-11-28", "데멜")._eventId, id, "id stable across reload");
reloaded.reset();
eq(findItem(reloaded, "2026-11-28", "데멜").time, "16:00", "reset restores default");
assert(reloaded.canUndo(), "reset itself can be undone");
reloaded.undo();
eq(findItem(reloaded, "2026-11-28", "데멜").time, "18:00", "undo after reset");

const bad = memoryStorage({ "trip-schedule-v1": "{" });
const malformed = engine.create(trip, bad);
eq(malformed.status().loadIssue, "malformed", "malformed storage flagged");
eq(bad.mem["trip-schedule-v1"], "{", "malformed payload not overwritten on load");
eq(bad.mem["trip-schedule-v1-backup"], "{", "backup kept");
eq(findItem(malformed, "2026-11-28", "데멜").time, "16:00", "malformed storage does not apply");
malformed.move(findItem(malformed, "2026-11-28", "데멜")._eventId, { startMin: 19 * 60 }, { snap: false });
assert(bad.mem["trip-schedule-v1"] !== "{", "a later edit can save once the backup exists");
eq(bad.mem["trip-schedule-v1-backup"], "{", "backup still holds the unreadable copy");
eq(findItem(malformed, "2026-11-28", "데멜").time, "19:00", "in-memory edit kept");

const staleStore = memoryStorage({
  "trip-schedule-v1": JSON.stringify({
    v: 1,
    overrides: {
      "1999-01-01.3": { startMin: 600, date: "2026-11-28" },
      [id]: { startMin: 18 * 60 + 30 }
    },
    undo: []
  })
});
const stale = engine.create(trip, staleStore);
eq(stale.status().staleIds[0], "1999-01-01.3", "stale id reported");
eq(findItem(stale, "2026-11-28", "데멜").time, "18:30", "valid override still applies");
stale.move(findItem(stale, "2026-11-28", "나슈마르크트") ? findItem(stale, "2026-11-28", "나슈마르크트")._eventId : id, { startMin: 11 * 60 }, { snap: false });
const kept = JSON.parse(staleStore.mem["trip-schedule-v1"]);
assert(kept.overrides["1999-01-01.3"], "stale override is not dropped on the next save");

const blockedStore = memoryStorage({
  "trip-schedule-v1": JSON.stringify({
    v: 1,
    overrides: { [findItem(fresh, "2026-11-29", "벨베데레 상궁")._eventId]: { startMin: 16 * 60 } },
    undo: []
  })
});
const noAllow = engine.create(trip, blockedStore);
eq(findItem(noAllow, "2026-11-29", "벨베데레 상궁").time, "14:15–16:00", "protected override without confirmation is ignored");
assert(noAllow.status().skipped.some((row) => row.reason === "protected"), "skipped protected payload is visible");

const oldVersion = memoryStorage({ "trip-schedule-v1": JSON.stringify({ v: 99, overrides: { [id]: { startMin: 1 } } }) });
const versioned = engine.create(trip, oldVersion);
eq(versioned.status().loadIssue, "version", "unknown version flagged");
eq(findItem(versioned, "2026-11-28", "데멜").time, "16:00", "unknown version not applied");
eq(oldVersion.mem["trip-schedule-v1-backup"].includes("\"v\":99") || oldVersion.mem["trip-schedule-v1-backup"].includes('"v":99'), true, "version payload backed up");

const failing = memoryStorage();
failing.fail = true;
const memOnly = engine.create(trip, failing);
const memMove = memOnly.move(findItem(memOnly, "2026-11-28", "데멜")._eventId, { startMin: 20 * 60 }, { snap: false });
eq(memMove.saveError, "QuotaExceededError", "storage failure is reported");
eq(findItem(memOnly, "2026-11-28", "데멜").time, "20:00", "failed save still keeps the edit in memory");
assert(!failing.mem["trip-schedule-v1"], "failed save did not write a partial value");

const readFail = memoryStorage({ "trip-schedule-v1": JSON.stringify({ v: 1, overrides: { [id]: { startMin: 18 * 60 } }, undo: [] }) });
readFail.failGet = true;
const unreadable = engine.create(trip, readFail);
eq(unreadable.status().loadIssue, "read", "read failure flagged");
eq(unreadable.status().writeBlocked, true, "do not overwrite storage that could not be read");
eq(findItem(unreadable, "2026-11-28", "데멜").time, "16:00", "read failure starts from baseline in memory");

eq(fresh.move("nope", { startMin: 10 }, { snap: false }).reason, "missing", "unknown id");
eq(fresh.move(id, { date: "1999-01-01", startMin: 10 }, { snap: false }).reason, "date", "date outside the trip");
eq(fresh.move(id, { startMin: 1500 }, { snap: false }).reason, "time", "minute past the local day");

eq(fs.readFileSync(path.join(root, "data/trip.js"), "utf8"), originalTripFile, "trip.js file bytes unchanged");
eq(notesSnapshot(trip), originalNotes, "costs and notes unchanged after moves");
eq(JSON.stringify(baselineTimes(trip)), originalTimes, "baseline times unchanged after moves");

const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
assert(sw.includes("trip-audio-v1"), "audio cache name stays");
assert(sw.includes("trip-docs-v23"), "shell cache bumped");
assert(sw.includes("./assets/js/schedule.js") && sw.includes("./assets/js/timetable.js") && sw.includes("./assets/css/timetable.css"), "new timetable files are precached");
assert(!sw.includes("trip-docs-v22"), "old shell cache name removed");

if (failed) {
  console.error(failed + " assertion(s) failed");
  process.exit(1);
}
console.log("schedule tests passed");
