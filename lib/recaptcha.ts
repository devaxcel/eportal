/** Google reCAPTCHA v3 (invisible). Without RECAPTCHA_SECRET_KEY the check is skipped, so the forms keep working. */
export const recaptchaEnabled = () => Boolean(process.env.RECAPTCHA_SECRET_KEY && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);

const MIN_SCORE = 0.5;

/** True when Google says the token came from a real visitor for this action. */
export async function verifyRecaptcha(token: string, action: string, ip?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!recaptchaEnabled() || !secret) return true;
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", { method: "POST", body, signal: AbortSignal.timeout(5000), cache: "no-store" });
    const r = (await res.json()) as { success?: boolean; score?: number; action?: string };
    return Boolean(r.success) && (r.score ?? 0) >= MIN_SCORE && r.action === action;
  } catch {
    // Google unreachable: let a real person through. The hidden field, timing check and rate limit still apply.
    return true;
  }
}
