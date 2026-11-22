import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
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
  "2026-11-30": ["07:40–08:15", "08:28–10:53", "10:53–11:15", "11:15–11:25", "11:25–12:05", "12:05–12:25", "12:25–13:00", "13:00–15:00", "15:00–15:40", "15:40–16:35", "16:35–16:50", "16:50–17:25", "17:25–17:37", "17:37–17:48", "17:48–18:00", "18:00–19:00", "19:00–20:10", "20:10–20:40", "20:40–21:07", "21:07–23:32", "23:32"],
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
assert.equal(concert.booked, true);
assert.equal(concert.docId, "golden-hall-1129");
assert.match(concert.text + concert.note, /입석/);
assert.match(concert.note, /오케스트라/);
assert.match(concert.note, /€12/);
assert.match(concert.note, /18,000/);
assert.match(concert.note, /발권되었고 예약은 확인/);
assert.match(concert.note, /결제 수단과 은행 정산/);
assert.match(concert.note, /A4/);
assert.match(concert.note, /문서함/);
assert.match(concert.note, /21:30/);
assert.match(concert.note, /21:45/);
assert.doesNotMatch(concert.note, /오페라 공연입니다|예약·결제 결과는 미확인|은행 정산이 끝났|실제 결제액은 18,000|암호문이 아직 없습니다/);
const goldenNote = nov29.notes.find((note) => note.docId === "golden-hall-1129");
assert.ok(goldenNote);
assert.match(JSON.stringify(goldenNote), /발권/);
const wheel = nov29.items.find((item) => item.time === "16:15–17:15");
assert.equal(wheel.placeId, "prater-riesenrad");
assert.match(wheel.note, /€29/);
assert.match(wheel.note, /43,500/);
assert.match(wheel.note, /미예매/);
assert.match(nov29.items.map(blob).join("\n"), /플라후타 테이블을 잡아 둔 적이 없고/);
const dinner = nov29.items.find((item) => item.time === "17:50–18:45");
assert.equal(dinner.placeId, "cafe-schwarzenberg");
assert.equal(dinner.booked, undefined);
assert.match(dinner.text, /미예약/);
assert.match(dinner.note, /110,000–195,000원/);
assert.equal(nov29.items.filter((item) => item.time === "19:30–21:45" && item.placeId === "musikverein").length, 1);

const nov30 = day("2026-11-30");
const outTrain = nov30.items.find((item) => item.time === "08:28–10:53");
const backTrain = nov30.items.find((item) => item.time === "21:07–23:32");
assert.equal(outTrain.booked, true);
assert.equal(outTrain.docId, "train-vie-sbg");
assert.equal(backTrain.booked, true);
assert.equal(backTrain.docId, "train-vie-sbg");
const stiegl = nov30.items.find((item) => item.time === "13:00–15:00");
assert.equal(stiegl.placeId, "stiegl-brauwelt");
assert.equal(stiegl.booked, true);
assert.equal(stiegl.docId, "stiegl-1130");
assert.match(stiegl.note, /결제 완료/);
assert.match(stiegl.note, /€22/);
assert.match(stiegl.note, /€11×2/);
assert.doesNotMatch(stiegl.text + "\n" + stiegl.note, /미예매|아직 예매하지|22\.90|45\.80/);
const cardStop = nov30.items.find((item) => item.time === "10:53–11:15");
assert.equal(cardStop.docId, "salzburg-card-1130");
assert.match(cardStop.text, /카드 활성화/);
const residence = nov30.items.find((item) => item.placeId === "mozart-wohnhaus");
assert.equal(residence.time, "11:25–12:05");
assert.match(residence.text, /내부/);
const birthplace = nov30.items.find((item) => item.time === "16:50–17:25");
assert.equal(birthplace.placeId, "mozart-geburtshaus");
assert.match(birthplace.text, /내부/);
assert.match(birthplace.note, /17:00 입장 마감/);
const fortress = nov30.items.find((item) => item.placeId === "hohensalzburg");
assert.match(fortress.note, /올인클루시브/);
assert.match(fortress.note, /17:15/);
assert.doesNotMatch(fortress.note, /베이직만|16:30/);
assert.equal(nov30.items.some((item) => item.placeId === "moenchsberg-aufzug" || item.placeId === "augustiner-muelln" || /Sternbräu/.test(item.text)), false);
assert.match(birthplace.note, /소금 가게/);
const salt = nov30.items.find((item) => item.time === "17:25–17:37");
assert.equal(salt.placeId, "salzburg-salz");
assert.equal(salt.booked, undefined);
assert.match(salt.note, /가격미정/);
assert.match(salt.note, /0원으로 두지 않습니다/);
assert.match(salt.note, /Wiener-Philharmoniker-Gasse 3/);
const laderach = nov30.items.find((item) => item.time === "17:37–17:48");
assert.equal(laderach.placeId, "laderach-salzburg");
assert.match(laderach.note, /20,400–59,000원/);
const fuerst = nov30.items.find((item) => item.time === "17:48–18:00");
assert.equal(fuerst.placeId, "fuerst-salzburg");
assert.equal(fuerst.booked, undefined);
assert.match(fuerst.note, /13,600–35,700원/);
assert.match(fuerst.note, /Brodgasse 13/);
const market = nov30.items.find((item) => item.time === "18:00–19:00");
assert.match(market.text, /크람푸스/);
const supper = nov30.items.find((item) => item.time === "19:00–20:10");
assert.match(supper.text, /미예약/);
assert.equal(supper.booked, undefined);
const nov30Text = JSON.stringify(nov30);
assert.match(nov30Text, /24시간 성인 2장/);
assert.match(nov30Text, /€70/);
assert.match(nov30Text, /103,300/);
assert.match(nov30Text, /48시간권이 아닙니다/);
assert.match(nov30Text, /135,800/);
assert.match(nov30Text, /€154\.20/);
assert.match(nov30Text, /크람푸스를 일찍 보고/);
assert.doesNotMatch(nov30Text, /미예매|아직 예매하지|외관만|1회권 5장|베이직만/);
assert.equal(nov30.notes.some((note) => note.docId === "salzburg-card-1130"), true);
assert.equal(nov30.notes.some((note) => note.docId === "stiegl-1130"), true);
const airport = nov28.items.find((item) => item.time === "06:00–08:00");
assert.match(airport.note, /7 Tage Digital WIEN/);
assert.match(airport.note, /€25\.20/);
assert.match(airport.note, /€2\.30/);
assert.match(airport.note, /CAT/);
assert.match(airport.note, /St\. Marx/);
assert.match(airport.note, /개찰/);
assert.match(JSON.stringify(nov28.notes), /7 Tage Digital WIEN/);
assert.match(JSON.stringify(nov28.notes), /28\.90/);

const dec1 = day("2026-12-01");
const toBud = dec1.items.find((item) => item.time === "15:40–18:29");
assert.equal(toBud.booked, true);
assert.equal(toBud.docId, "train-vie-bud");
const lunch = dec1.items.find((item) => item.time === "12:00–13:15");
assert.equal(lunch.placeId, "gasthaus-reinthaler");
assert.equal(lunch.booked, undefined);
assert.match(lunch.text, /예약 진행 중/);
assert.match(lunch.note, /72,600–99,200원/);
assert.equal(dec1.items.some((item) => item.placeId === "figlmueller"), false);
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
  "2026-11-29": ["belvedere-1129", "golden-hall-1129"],
  "2026-11-30": ["train-vie-sbg", "salzburg-card-1130", "stiegl-1130"],
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
assert.equal(sw.includes('const CACHE_VERSION = "trip-docs-v28"'), true);
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
assert.match(guide.stops.musikverein.paras.map((para) => para.text).join(" "), /발권되었고 예약은 확인/);
assert.match(guide.stops.musikverein.paras.map((para) => para.text).join(" "), /오페라 공연이 아닙니다/);

const vaultWin = load(fileURLToPath(new URL("../data/vault.js", import.meta.url)));
const vault = vaultWin.TRIP_VAULT;
assert.equal(vault.kdf.salt, "1U9SSpTD7nGkZe+3eKUpig==");
assert.equal(vault.check.iv, "JXmx3DGrEPo6vjyO");
assert.equal(vault.check.ct, "5KjWOj78bXSgW+9Qylx1glSbQjB1+XyVb5pZxns=");
assert.equal(JSON.stringify(vault.items.map((item) => item.id)), JSON.stringify([
  "flight-eticket",
  "budapest-hotel",
  "vienna-hotel",
  "train-vie-bud",
  "train-vie-sbg",
  "belvedere-1129",
  "restaurant-stand25",
  "golden-hall-1129",
  "stiegl-1130",
  "salzburg-card-1130"
]));
const expectedVault = {
  "golden-hall-1129": ["골든홀 공연 티켓", "11월 29일 19:30 · 입석 2장"],
  "stiegl-1130": ["슈티글 생산 투어 티켓", "11월 30일 13:00 · 영어 · 카드 추가요금 2장"],
  "salzburg-card-1130": ["잘츠부르크 카드", "11월 30일 · 24시간 · 성인 2장"]
};
for (const item of vault.items) {
  assert.equal(JSON.stringify(Object.keys(item)), JSON.stringify(["id", "title", "subtitle", "type", "iv", "ct"]));
  assert.equal(item.type, "application/pdf");
  assert.ok(item.iv.length > 8 && item.ct.length > 1000);
  if (expectedVault[item.id]) assert.equal(JSON.stringify([item.title, item.subtitle]), JSON.stringify(expectedVault[item.id]));
}

const root = fileURLToPath(new URL("..", import.meta.url));
const diffNames = execFileSync("git", ["diff", "--name-only", "origin/main"], { cwd: root, encoding: "utf8" });
for (const banned of ["assets/css/timetable.css", "assets/js/schedule.js", "assets/js/timetable.js", "tools/schedule.test.mjs", "tools/timetable-browser.mjs"]) {
  assert.equal(diffNames.includes(banned), false, banned);
}
assert.equal(execFileSync("git", ["ls-files", "*.pdf"], { cwd: root, encoding: "utf8" }).trim(), "");
const diffText = execFileSync("git", ["diff", "--unified=0", "origin/main", "--", "data/trip.js", "data/guide.js", "sw.js", "assets/js/app.js", "tools/itinerary.test.mjs"], { cwd: root, encoding: "utf8" });
const added = diffText.split("\n").filter((line) => line.startsWith("+") && !line.startsWith("+++")).join("\n");
assert.doesNotMatch(added, new RegExp("%" + "PDF-"));
assert.doesNotMatch(added, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
assert.doesNotMatch(added, /\b\d{4}-\d{4}-\d{4}-\d{4}\b/);
assert.match(JSON.stringify(TRIP.docs), /golden-hall-1129/);
assert.match(JSON.stringify(TRIP.docs), /stiegl-1130/);
assert.match(JSON.stringify(TRIP.docs), /salzburg-card-1130/);

console.log("itinerary tests passed");
