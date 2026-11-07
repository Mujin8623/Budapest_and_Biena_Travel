import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

function load(file) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(file, "utf8"), context, { filename: file });
  return context.window;
}

const win = load(fileURLToPath(new URL("../data/trip.js", import.meta.url)));
const guideWin = load(fileURLToPath(new URL("../data/guide.js", import.meta.url)));
const TRIP = win.TRIP;
const guide = guideWin.TRIP_GUIDE["2026-11-29"];
const sw = fs.readFileSync(new URL("../sw.js", import.meta.url), "utf8");

function day(date) {
  const found = TRIP.days.find((item) => item.date === date);
  assert.ok(found, date);
  return found;
}

function blob(item) {
  return [item.time, item.text, item.note, item.placeId].filter(Boolean).join("\n");
}

const windows = {
  "2026-11-28": ["06:00–08:00", "08:00–09:00", "09:00–10:15", "10:15–11:00", "11:00–12:00", "12:00–13:00", "13:00–13:30", "13:30–14:15", "14:15–14:50", "15:00–15:20", "15:20–16:00", "16:00–17:15", "17:15–18:00", "18:15–19:30", "19:30–20:00", "20:00–21:00", "21:00–21:30", "21:30–22:15", "22:15–23:15"],
  "2026-11-29": ["09:15–09:50", "10:00–10:50", "11:00–12:00", "12:00–12:45", "13:00–13:15", "13:15–13:50", "14:00–15:30", "15:30–16:15", "16:15–17:15", "17:15–17:50", "17:50–18:45", "18:45–19:00", "19:00–19:30", "19:30–21:45", "21:45–22:30"],
  "2026-11-30": ["07:40–08:15", "08:28–10:53", "10:53–11:15", "11:15–11:45", "11:45–12:20", "12:20–12:50", "13:00–15:00", "15:00–15:45", "15:45–16:50", "17:00–17:40", "17:40–18:10", "18:10–18:40", "18:40–19:00", "19:00–20:05", "20:05–20:40", "20:40–21:07", "21:07–23:32"],
  "2026-12-01": ["08:30–09:00", "09:00–09:40", "09:40–10:00", "10:00–11:30", "11:30–12:00", "12:00–13:15", "13:15–14:00", "14:00–14:40", "14:40–15:15", "15:40–18:29", "18:29–19:15", "19:15–19:45", "19:45–20:45", "20:45–21:30", "21:40–22:20"]
};

for (const [date, times] of Object.entries(windows)) {
  const have = new Set(day(date).items.map((item) => item.time));
  for (const time of times) assert.ok(have.has(time), date + " missing " + time);
}

const nov28 = day("2026-11-28");
assert.equal(nov28.items.find((item) => item.placeId === "ribs-of-vienna" && item.time === "18:15–19:30").booked, undefined);
assert.equal(nov28.items.some((item) => item.placeId === "belvedere"), false);
assert.ok(nov28.items.some((item) => item.placeId === "schonbrunn-market" && item.time === "16:00–17:15"));
assert.match(nov28.items.map(blob).join("\n"), /미예약/);

const nov29 = day("2026-11-29");
const belvedere = nov29.items.find((item) => item.placeId === "belvedere");
assert.equal(belvedere.time, "14:00–15:30");
assert.equal(belvedere.booked, true);
assert.equal(belvedere.docId, "belvedere-1129");
assert.match(belvedere.note, /69,692/);
assert.doesNotMatch(belvedere.note, /68,264|14:15/);
assert.equal(nov29.items.some((item) => item.placeId === "plachutta" || item.placeId === "philosoph" || item.placeId === "bitzinger"), false);
assert.equal(nov29.items.some((item) => /휴식/.test(item.text)), false);
const concert = nov29.items.find((item) => item.time === "19:30–21:45");
assert.equal(concert.placeId, "musikverein");
assert.equal(concert.booked, undefined);
assert.equal(concert.docId, undefined);
assert.match(concert.text + concert.note, /입석/);
assert.match(concert.note, /€12/);
assert.match(concert.note, /18,000/);
assert.match(concert.note, /예약·결제 결과는 미확인입니다/);
assert.match(concert.note, /21:30/);
assert.match(concert.note, /21:45/);
assert.doesNotMatch(concert.note, /결제가 끝났|표를 받았습니다|좌석 [A-Z0-9]/);
const wheel = nov29.items.find((item) => item.time === "16:15–17:15");
assert.equal(wheel.placeId, "prater-riesenrad");
assert.match(wheel.note, /€29/);
assert.match(wheel.note, /43,500/);
assert.match(wheel.note, /미예매/);
assert.match(nov29.items.map(blob).join("\n"), /플라후타 테이블을 잡아 둔 적이 없고/);

const nov30 = day("2026-11-30");
const outTrain = nov30.items.find((item) => item.time === "08:28–10:53");
const backTrain = nov30.items.find((item) => item.time === "21:07–23:32");
assert.equal(outTrain.booked, true);
assert.equal(outTrain.docId, "train-vie-sbg");
assert.equal(backTrain.booked, true);
assert.equal(backTrain.docId, "train-vie-sbg");
const stiegl = nov30.items.find((item) => item.time === "13:00–15:00");
assert.equal(stiegl.placeId, "stiegl-brauwelt");
assert.equal(stiegl.booked, undefined);
assert.match(stiegl.text, /미예매/);
assert.match(stiegl.note, /22\.90/);
assert.match(stiegl.note, /45\.80/);
assert.match(stiegl.note, /68,700/);
assert.match(stiegl.note, /아직 예매하지 않았습니다/);
assert.match(stiegl.note, /추가하는 것이 아닙니다/);

const dec1 = day("2026-12-01");
const toBud = dec1.items.find((item) => item.time === "15:40–18:29");
assert.equal(toBud.booked, true);
assert.equal(toBud.docId, "train-vie-bud");
const figl = dec1.items.find((item) => item.placeId === "figlmueller" && item.time === "12:00–13:15");
assert.equal(figl.booked, undefined);
assert.match(figl.text, /미예약/);
assert.equal(dec1.items.some((item) => /랑고시|굴라시|구야시/.test(item.text)), false);
assert.match(dec1.items.map(blob).join("\n"), /랑고시와 굴라시는 먹지 않습니다/);

for (const date of Object.keys(windows)) {
  const text = day(date).items.map((item) => item.text).join("\n");
  assert.doesNotMatch(text, /굴라시|구야시/);
  assert.doesNotMatch(text, /KST|한국 시각|서울 시간/);
  const all = JSON.stringify(day(date));
  assert.doesNotMatch(all, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(all, /\b(?:\d[ -]?){13,19}\b/);
}

assert.equal(JSON.stringify(TRIP.docs), JSON.stringify({
  "2026-11-27": ["flight-eticket"],
  "2026-11-28": ["vienna-hotel"],
  "2026-11-29": ["belvedere-1129"],
  "2026-11-30": ["train-vie-sbg"],
  "2026-12-01": ["train-vie-bud", "budapest-hotel"],
  "2026-12-02": ["restaurant-stand25"],
  "2026-12-05": ["flight-eticket", "budapest-hotel"]
}));

const dec2 = day("2026-12-02");
assert.equal(JSON.stringify(dec2.items.map((item) => [item.time, item.placeId, !!item.booked])), JSON.stringify([
  ["08:30", "lehel-market", false],
  ["09:15", "adina-bud", false],
  ["10:00", "bastion", false],
  ["11:15", "castle", false],
  ["13:00", "stand25", true],
  ["15:15", "vorosmarty", false],
  ["16:00", "danube", false],
  ["17:00", "lanchid", false],
  ["17:45", "vorosmarty", false],
  ["19:15", "eleszto", false],
  ["21:00", "adina-bud", false]
]));
assert.equal(dec2.items.find((item) => item.placeId === "stand25").docId, "restaurant-stand25");

const budget = day("2026-11-27").notes.find((note) => note.title.startsWith("여행 경비"));
const budgetText = JSON.stringify(budget);
assert.match(budgetText, /1,779,500/);
assert.match(budgetText, /29,650원은 이 앱에 없습니다/);
assert.match(budgetText, /확정 합계/);
assert.match(budgetText, /적지 않습니다/);
assert.match(budgetText, /61,500/);
assert.doesNotMatch(budgetText, /약 1,768,900|새 총액 3,/);
assert.equal(sw.includes('const CACHE_VERSION = "trip-docs-v23"'), true);
assert.equal(sw.includes("trip-audio-v1"), true);

const bIdx = nov29.items.findIndex((item) => item.placeId === guide.artworksFor);
assert.equal(bIdx, 13);
for (let i = 0; i < bIdx; i += 1) {
  const from = nov29.items[i].placeId;
  const to = nov29.items[i + 1].placeId;
  if (from === to) continue;
  assert.ok(guide.legs.some((leg) => leg.from === from && leg.to === to), from + " -> " + to);
}
for (const id of ["g-staatsoper-1", "g-cafe-sacher-1", "g-stephansdom-1", "g-belvedere-1", "a-kiss-1", "g-plachutta-1"]) {
  const paras = JSON.stringify(guide);
  assert.ok(paras.includes(id), id);
}
assert.match(guide.stops.stephansdom.paras.map((para) => para.text).join(" "), /13:15/);

console.log("itinerary tests passed");
