/** Quick checks for the time zone and slot logic. Run with: npx tsx scripts/test-booking.ts */
import assert from "node:assert/strict";
import { DEFAULT_SETTINGS, buildIcs, generateSlots, type BookingSettings } from "../lib/booking";
import { tzOffsetMinutes, zonedDate, zonedToUtc } from "../lib/tz";

const iso = (ms: number) => new Date(ms).toISOString();

// Time zones
assert.equal(tzOffsetMinutes(Date.UTC(2026, 10, 9), "Asia/Karachi"), 300);
assert.equal(iso(zonedToUtc(2026, 11, 9, 10, 0, "Asia/Karachi")), "2026-11-09T05:00:00.000Z");
assert.equal(iso(zonedToUtc(2026, 7, 1, 10, 0, "America/New_York")), "2026-07-01T14:00:00.000Z"); // summer, UTC-4
assert.equal(iso(zonedToUtc(2026, 12, 1, 10, 0, "America/New_York")), "2026-12-01T15:00:00.000Z"); // winter, UTC-5
assert.equal(iso(zonedToUtc(2026, 3, 8, 12, 0, "America/New_York")), "2026-03-08T16:00:00.000Z"); // day clocks go forward
assert.deepEqual(zonedDate(Date.UTC(2026, 10, 8, 20, 0), "Asia/Karachi"), { y: 2026, m: 11, d: 9 }); // already tomorrow in Karachi

// Slots: Monday 9 Nov 2026, 06:00 in Karachi
const now = Date.UTC(2026, 10, 9, 1, 0);
const s: BookingSettings = { ...DEFAULT_SETTINGS, enabled: true, max_days_ahead: 7 };
const slots = generateSlots(s, [], now);
const day = (ms: number) => new Date(ms + 5 * 3600_000).toISOString().slice(0, 10); // Karachi calendar date

assert.equal(iso(slots[0]), "2026-11-09T05:00:00.000Z", "first slot is Monday 10:00 in Karachi");
assert.equal(slots.filter((x) => day(x) === "2026-11-09").length, 14, "Monday: 10:00 to 17:00 in 30 minute slots");
assert.equal(slots.filter((x) => day(x) === "2026-11-13").length, 11, "Friday has a lunch break: 6 + 5 slots");
assert.equal(slots.filter((x) => ["2026-11-14", "2026-11-15"].includes(day(x))).length, 0, "no weekend slots");

// Minimum notice: at 08:00 Karachi with 4 hours notice nothing opens before 12:00
const late = generateSlots(s, [], Date.UTC(2026, 10, 9, 3, 0));
assert.equal(iso(late[0]), "2026-11-09T07:00:00.000Z");

// Existing booking and blackout dates
const taken = zonedToUtc(2026, 11, 10, 11, 0, "Asia/Karachi");
const withBooking = generateSlots(s, [{ start: taken, end: taken + 1800_000 }], now);
assert.ok(!withBooking.includes(taken), "a booked slot disappears");
assert.ok(withBooking.includes(taken + 1800_000), "the next slot stays open");
assert.equal(generateSlots({ ...s, blackout_dates: ["2026-11-10"] }, [], now).filter((x) => day(x) === "2026-11-10").length, 0);
assert.deepEqual(generateSlots({ ...s, enabled: false }, [], now), []);

// Calendar invitation
const ics = buildIcs({ uid: "abc", start: Date.UTC(2026, 10, 9, 5), end: Date.UTC(2026, 10, 9, 5, 30), title: "Demo, ePortal", description: "Line 1\nLine 2" });
assert.match(ics, /DTSTART:20261109T050000Z/);
assert.match(ics, /SUMMARY:Demo\\, ePortal/);

console.log("all booking checks passed");
