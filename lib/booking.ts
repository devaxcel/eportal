import { zonedDate, zonedToUtc } from "./tz";

export type Weekly = Record<"mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun", [string, string][]>;

export type BookingSettings = {
  enabled: boolean;
  timezone: string;
  slot_minutes: number;
  min_notice_hours: number;
  max_days_ahead: number;
  weekly: Weekly;
  blackout_dates: string[];
  meeting_info: string;
};

export const DEFAULT_SETTINGS: BookingSettings = {
  enabled: false, // off until the tables exist and an admin has checked the hours
  timezone: "Asia/Karachi",
  slot_minutes: 30,
  min_notice_hours: 4,
  max_days_ahead: 21,
  weekly: {
    mon: [["10:00", "17:00"]], tue: [["10:00", "17:00"]], wed: [["10:00", "17:00"]], thu: [["10:00", "17:00"]],
    fri: [["10:00", "13:00"], ["14:30", "17:00"]], sat: [], sun: [],
  },
  blackout_dates: [],
  meeting_info: "We will call you on the phone number you give us.",
};

export const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const; // matches Date#getUTCDay

const minutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + (m || 0);
};

export type Busy = { start: number; end: number }; // UTC ms of existing confirmed bookings

/**
 * Open appointment starts (UTC ms) for the next days, in the business time zone.
 * Skips blackout dates, times before the minimum notice, and anything overlapping an existing booking.
 */
export function generateSlots(s: BookingSettings, busy: Busy[], now = Date.now()): number[] {
  if (!s.enabled) return [];
  const out: number[] = [];
  const today = zonedDate(now, s.timezone);
  const earliest = now + s.min_notice_hours * 3600_000;
  const slotMs = s.slot_minutes * 60_000;

  for (let i = 0; i <= s.max_days_ahead; i++) {
    const day = new Date(Date.UTC(today.y, today.m - 1, today.d + i)); // a calendar date, read back in UTC
    const y = day.getUTCFullYear(), m = day.getUTCMonth() + 1, d = day.getUTCDate();
    const key = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    if (s.blackout_dates.includes(key)) continue;
    for (const [from, to] of s.weekly[DAY_KEYS[day.getUTCDay()]] ?? []) {
      for (let t = minutes(from); t + s.slot_minutes <= minutes(to); t += s.slot_minutes) {
        const start = zonedToUtc(y, m, d, Math.floor(t / 60), t % 60, s.timezone);
        const end = start + slotMs;
        if (start < earliest) continue;
        if (busy.some((b) => start < b.end && end > b.start)) continue;
        out.push(start);
      }
    }
  }
  return out;
}

/** Is `start` one of the currently open slots? Used to re-check just before saving a booking. */
export const isOpenSlot = (s: BookingSettings, busy: Busy[], start: number, now = Date.now()) =>
  generateSlots(s, busy, now).includes(start);

const icsTime = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const icsText = (t: string) => t.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");

/** A calendar invitation the visitor can add to any calendar. */
export function buildIcs(o: { uid: string; start: number; end: number; title: string; description: string }): string {
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//ePortal//Demo booking//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT", `UID:${o.uid}@eportal`, `DTSTAMP:${icsTime(Date.now())}`, `DTSTART:${icsTime(o.start)}`, `DTEND:${icsTime(o.end)}`,
    `SUMMARY:${icsText(o.title)}`, `DESCRIPTION:${icsText(o.description)}`, "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
}
