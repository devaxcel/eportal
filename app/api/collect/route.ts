import { recordEvent, solutionOfPath } from "@/lib/events";
import { BOT_PATTERN, clientIp, dailyVisitor, deviceOf } from "@/lib/privacy";
import { isLang } from "@/lib/i18n";

export const runtime = "nodejs";

const done = () => new Response(null, { status: 204 });

/**
 * First-party, cookie-free page view counter. Stores the page, language, country, device and the referring site.
 * The visitor is a daily hash, so nobody can be followed across days and no address is kept.
 */
export async function POST(req: Request) {
  const ua = req.headers.get("user-agent") ?? "";
  if (!ua || BOT_PATTERN.test(ua)) return done();
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "same-site") return done();

  let body: { kind?: string; path?: string; ref?: string };
  try {
    body = JSON.parse(await req.text());
  } catch {
    return done();
  }

  const path = String(body.path ?? "").slice(0, 200);
  const lang = path.split("/")[1] ?? "";
  if (!isLang(lang) || path.startsWith("/admin")) return done();

  let referrer: string | null = null;
  try {
    const host = new URL(String(body.ref ?? "")).hostname.replace(/^www\./, "");
    if (host && host !== new URL(req.url).hostname.replace(/^www\./, "")) referrer = host.slice(0, 80);
  } catch {
    // no usable referrer
  }

  await recordEvent({
    kind: body.kind === "whatsapp" ? "whatsapp" : "view",
    path,
    lang,
    solution: solutionOfPath(path),
    referrer,
    country: req.headers.get("x-vercel-ip-country")?.slice(0, 2) ?? null,
    device: deviceOf(ua),
    visitor: dailyVisitor(clientIp(req.headers), ua),
  });
  return done();
}
