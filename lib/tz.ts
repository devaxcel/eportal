/** Time zone helpers built on Intl, so no date library is needed. All instants are UTC milliseconds. */

/** Offset of a time zone from UTC at an instant, in minutes (Asia/Karachi is +300). */
export function tzOffsetMinutes(ms: number, timeZone: string): number {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit",
    }).formatToParts(new Date(ms)).map((x) => [x.type, x.value]),
  ) as Record<string, string>;
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((asUtc - Math.floor(ms / 1000) * 1000) / 60000);
}

/** The UTC instant at which the wall clock in `timeZone` reads y-m-d hh:mm. */
export function zonedToUtc(y: number, m: number, d: number, hh: number, mm: number, timeZone: string): number {
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  let utc = guess - tzOffsetMinutes(guess, timeZone) * 60000;
  utc = guess - tzOffsetMinutes(utc, timeZone) * 60000; // second pass settles daylight-saving edges
  return utc;
}

/** Calendar date (y, m, d) in a time zone at an instant. */
export function zonedDate(ms: number, timeZone: string) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(new Date(ms)).map((x) => [x.type, x.value]),
  ) as Record<string, string>;
  return { y: +p.year, m: +p.month, d: +p.day };
}

export const isValidTimeZone = (tz: string) => {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

/** "Mon 10 Nov 2026, 14:30" in a language and time zone. */
export function formatSlot(ms: number, timeZone: string, locale = "en"): string {
  return new Intl.DateTimeFormat(locale, { timeZone, weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(new Date(ms));
}
