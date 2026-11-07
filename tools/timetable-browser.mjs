/* Browser checks for the timetable. Uses the app's own sample trip, never vault data. */
import { chromium } from "/tmp/pwtest/node_modules/playwright-core/index.mjs";
import fs from "fs";

const base = process.env.TRIP_BASE || "http://127.0.0.1:8765/index.html";
const outDir = "/opt/cursor/artifacts";
fs.mkdirSync(outDir, { recursive: true });

const failures = [];
function check(cond, message) {
  if (!cond) failures.push(message);
  else console.log("ok " + message);
}

const browser = await chromium.launch({
  executablePath: "/usr/local/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"]
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  timezoneId: "America/New_York",
  locale: "ko-KR",
  hasTouch: true
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));

async function openTimetable(date) {
  await page.goto(base + "#/timetable/" + date, { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".tt-event");
}

function block(text) {
  return page.locator(".tt-event", { hasText: text }).first();
}

await openTimetable("2026-11-29");
const offset = await page.evaluate(() => new Date().getTimezoneOffset());
check(offset === 300, "browser timezone is New York in November (offset " + offset + ")");
check(await page.locator(".tt-local").innerText().then((text) => text.includes("이 브라우저에만")), "local-only notice is visible");
check(await page.locator(".tt-hour").first().innerText().then((text) => /^\d{2}:\d{2}$/.test(text.trim()) || text.includes("24:00")), "hour labels are 24h");

const belvedere = block("벨베데레 상궁");
check(await belvedere.getAttribute("data-time") === "14:15–16:00", "default Belvedere block keeps 14:15–16:00");
check(await belvedere.getAttribute("data-protected") === "1", "Belvedere is locked");
check((await belvedere.innerText()).includes("예약 14:00"), "known 14:00 ticket stays beside the block");
check(await belvedere.getAttribute("data-duration-known") === "1", "Belvedere duration is a real range");

const tram = block("트램 D");
check(await tram.getAttribute("data-duration-known") === "0", "point event stays an open-ended placeholder");
check(await tram.evaluate((el) => el.classList.contains("is-open")), "placeholder uses the open style");
const heights = await page.evaluate(() => {
  const palace = [...document.querySelectorAll(".tt-event")].find((el) => el.innerText.includes("벨베데레 상궁"));
  const point = [...document.querySelectorAll(".tt-event")].find((el) => el.getAttribute("data-duration-known") === "0");
  return { palace: palace.getBoundingClientRect().height, point: point.getBoundingClientRect().height };
});
check(heights.palace > heights.point + 20, "known long block is taller than a placeholder (" + heights.palace + " > " + heights.point + ")");

await page.locator(".tt-event").first().evaluate((el) => {
  const top = el.getBoundingClientRect().top + window.scrollY - 280;
  window.scrollTo(0, Math.max(0, top));
});
await page.screenshot({ path: outDir + "/timetable-desktop.png" });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
await page.locator(".tt-event").first().evaluate((el) => {
  const top = el.getBoundingClientRect().top + window.scrollY - 180;
  window.scrollTo(0, Math.max(0, top));
});
await page.screenshot({ path: outDir + "/timetable-mobile.png" });
check(await page.locator(".tt-event").count() > 5, "mobile still renders the day");
const overflow = await page.evaluate(() => {
  const grid = document.querySelector(".tt-grid");
  return grid.scrollWidth <= document.documentElement.clientWidth + 2;
});
check(overflow, "mobile grid stays within the viewport width");
await page.setViewportSize({ width: 1280, height: 900 });

await openTimetable("2026-11-28");
const demel = block("데멜");
const demelId = await demel.getAttribute("data-event-id");
check(await demel.getAttribute("data-time") === "16:00", "Demel starts at 16:00 in New York timezone too");
await demel.scrollIntoViewIfNeeded();
const handle = demel.locator("[data-tt='handle']");
const box = await handle.boundingBox();
const hourPx = Number(await page.locator(".tt-canvas").getAttribute("data-px"));
check(!!box, "drag handle has a box");
await page.mouse.move(box.x + box.width / 2, box.y + 16);
await page.mouse.down();
await page.mouse.move(box.x + box.width / 2, box.y + 16 + hourPx, { steps: 12 });
const preview = await page.locator(".tt-preview").innerText();
check(/17:00/.test(preview), "drag preview shows the snapped 17:00 (" + preview + ")");
await page.mouse.up();
await page.waitForTimeout(100);
check(await block("데멜").getAttribute("data-time") === "17:00", "drop updates the grid to 17:00");
const listTime = await page.locator("#view-schedule .stop[data-event-id='" + demelId + "']").getAttribute("data-time");
check(listTime === "17:00", "schedule list updates immediately (" + listTime + ")");
const order = await page.locator("#view-schedule .stop").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-time") + " " + node.innerText.slice(0, 24)));
const demelAt = order.findIndex((line) => line.startsWith("17:00") && line.includes("데멜"));
const ribsAt = order.findIndex((line) => line.includes("Ribs"));
const shopAt = order.findIndex((line) => line.includes("16:45"));
check(demelAt > shopAt && demelAt < ribsAt, "list order follows the new time");
const baseline = await page.evaluate(() => {
  const day = window.TRIP.days.find((item) => item.date === "2026-11-28");
  return day.items.find((item) => item.text.includes("데멜")).time;
});
check(baseline === "16:00", "repository object still says 16:00");
await block("데멜").scrollIntoViewIfNeeded();
await page.screenshot({ path: outDir + "/timetable-moved.png" });

await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForSelector(".tt-event");
check(await block("데멜").getAttribute("data-time") === "17:00", "reload keeps the edit");

await page.locator("[data-tt='undo']").click();
await page.waitForTimeout(50);
check(await block("데멜").getAttribute("data-time") === "16:00", "undo restores 16:00");

const sausage = block("소시지 가판");
await sausage.scrollIntoViewIfNeeded();
await sausage.locator("[data-tt='edit']").click();
await page.waitForSelector("#tt-editor[open]");
await page.locator("#tt-editor-time").fill("12:40");
await page.locator("#tt-editor-save").click();
await page.waitForTimeout(50);
check(await block("소시지 가판").getAttribute("data-time") === "12:40 전후", "editor keeps 전후 and does not invent an end");

await openTimetable("2026-11-29");
const rest = block("숙소까지 걸어서");
await rest.scrollIntoViewIfNeeded();
await rest.locator("[data-tt='edit']").click();
await page.locator("#tt-editor-time").fill("15:00");
await page.locator("#tt-editor-save").click();
await page.waitForTimeout(80);
const warn = await page.locator(".tt-banner-warn").innerText();
check(warn.includes("겹칩니다") || warn.includes("안에 있습니다"), "overlap warning is visible (" + warn.slice(0, 80) + ")");
check(await block("벨베데레 상궁").getAttribute("data-time") === "14:15–16:00", "overlap does not push Belvedere");
const lanes = await page.evaluate(() => {
  const nodes = [...document.querySelectorAll(".tt-event")].filter((el) => {
    return el.innerText.includes("벨베데레 상궁") || el.innerText.includes("숙소까지 걸어서");
  });
  return nodes.map((el) => el.getAttribute("data-lane"));
});
check(lanes.length === 2 && lanes[0] !== lanes[1], "overlapping blocks use different lanes (" + lanes.join(",") + ")");
await page.screenshot({ path: outDir + "/timetable-overlap.png" });

const palace = block("벨베데레 상궁");
await palace.scrollIntoViewIfNeeded();
const palaceBox = await palace.locator("[data-tt='handle']").boundingBox();
await page.mouse.move(palaceBox.x + 10, palaceBox.y + 12);
await page.mouse.down();
await page.mouse.move(palaceBox.x + 10, palaceBox.y + 12 + hourPx, { steps: 8 });
await page.mouse.up();
await page.waitForSelector("#tt-confirm[open]");
check((await page.locator("#tt-confirm-text").innerText()).includes("14:00"), "protected drag explains the real ticket");
await page.locator("[data-tt='confirm-no']").click();
check(await block("벨베데레 상궁").getAttribute("data-time") === "14:15–16:00", "cancelling leaves the booked block");

await palace.locator("[data-tt='handle']").scrollIntoViewIfNeeded();
const palaceBox2 = await palace.locator("[data-tt='handle']").boundingBox();
await page.mouse.move(palaceBox2.x + 10, palaceBox2.y + 12);
await page.mouse.down();
await page.mouse.move(palaceBox2.x + 10, palaceBox2.y + 12 + hourPx, { steps: 8 });
await page.mouse.up();
await page.locator("[data-tt='confirm-yes']").click();
await page.waitForTimeout(80);
const personal = await block("벨베데레 상궁").innerText();
check(await block("벨베데레 상궁").getAttribute("data-time") !== "14:15–16:00", "confirmed override moves the personal plan");
check(personal.includes("예약 14:00"), "booked 14:00 remains after the personal move");
check(personal.includes("실제 예약") || personal.includes("개인 계획"), "copy says the reservation itself did not change");

await page.locator("[data-tt='reset']").click();
await page.waitForSelector("#tt-reset[open]");
await page.locator("[data-tt='reset-no']").click();
check(await block("벨베데레 상궁").getAttribute("data-time") !== "14:15–16:00", "dismissing reset keeps the personal plan");
await page.locator("[data-tt='reset']").click();
await page.locator("[data-tt='reset-yes']").click();
await page.waitForTimeout(80);
check(await block("벨베데레 상궁").getAttribute("data-time") === "14:15–16:00", "confirmed reset restores Belvedere");
check(await block("숙소까지 걸어서").getAttribute("data-time") === "16:00", "reset restores the other edit too");

await openTimetable("2026-11-28");
const touchTarget = block("데멜");
await touchTarget.scrollIntoViewIfNeeded();
const touchBox = await touchTarget.locator("[data-tt='handle']").boundingBox();
const client = await context.newCDPSession(page);
const start = { x: Math.round(touchBox.x + 12), y: Math.round(touchBox.y + 16) };
const end = { x: start.x, y: start.y + hourPx };
await client.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: start.x, y: start.y, id: 1 }] });
await page.waitForTimeout(600);
await client.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: end.x, y: end.y, id: 1 }] });
await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
await page.waitForTimeout(150);
check(await block("데멜").getAttribute("data-time") === "17:00", "touch drag on the handle moves Demel to 17:00");

const stored = await page.evaluate(() => localStorage.getItem("trip-schedule-v1"));
check(stored && stored.includes("1020") === false || stored.includes("\"startMin\":1020") || stored.includes("17"), "stored clock minute is local 17:00, not a timezone shift");
const minute = await page.evaluate(() => {
  const raw = JSON.parse(localStorage.getItem("trip-schedule-v1"));
  const id = Object.keys(raw.overrides)[0];
  return raw.overrides[id].startMin;
});
check(minute === 17 * 60, "stored startMin is 1020 local minutes (" + minute + ")");

await page.goto(base + "#/schedule/2026-11-27", { waitUntil: "domcontentloaded" });
const cost = await page.locator("#view-schedule").innerText();
check(cost.includes("약 1,779,500원"), "default cost text is unchanged");
check(cost.includes("19:55"), "default flight time is unchanged");

await page.goto(base + "#/tour/vienna-city", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(200);
const tourText = await page.locator("#view-tour").innerText();
check(tourText.includes("오페른파사주") || tourText.includes("카를스플라츠") || tourText.includes("국립 오페라"), "tour narration route is still present");

check(errors.length === 0, "no page errors (" + errors.join(" | ") + ")");

await browser.close();
if (failures.length) {
  console.error(failures.map((line) => "FAIL " + line).join("\n"));
  process.exit(1);
}
console.log("browser timetable checks passed");
