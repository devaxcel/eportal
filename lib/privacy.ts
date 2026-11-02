import { createHash } from "node:crypto";
import { hashSalt } from "./env";

type Headers = { get(name: string): string | null };

export const clientIp = (h: Headers) => (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "";

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

/** Stable hash of an address, for rate limiting enquiries. The address itself is never stored. */
export const ipHash = (ip: string) => (ip ? sha(`${hashSalt()}|ip|${ip}`).slice(0, 32) : null);

/**
 * Anonymous visitor id that changes every day: the same person is counted once per day,
 * and nobody can be followed from one day to the next. No cookie is used.
 */
export const dailyVisitor = (ip: string, ua: string, day = new Date().toISOString().slice(0, 10)) =>
  sha(`${hashSalt()}|${day}|${ip}|${ua}`).slice(0, 24);

export const BOT_PATTERN = /bot|crawl|spider|slurp|headless|lighthouse|pingdom|monitor|preview|curl|wget|python|node-fetch|axios|vercel/i;

export function deviceOf(ua: string): "mobile" | "tablet" | "desktop" {
  if (/ipad|tablet|kindle|silk/i.test(ua)) return "tablet";
  if (/mobi|iphone|android/i.test(ua)) return "mobile";
  return "desktop";
}
