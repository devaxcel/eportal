/**
 * Server-side settings. The plain names (SUPABASE_URL, SUPABASE_ANON_KEY, SITE_URL) are preferred because
 * nothing here is needed in the browser, so they never need the NEXT_PUBLIC_ prefix. The prefixed names still work.
 */
export const supabaseUrl = () => process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = () => process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const serviceRoleKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;
export const siteUrl = () => (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://eportal.pk").replace(/\/$/, "");

/** Email alerts (optional). Without RESEND_API_KEY everything still works; messages are just not emailed. */
export const resendKey = () => process.env.RESEND_API_KEY;
export const mailFrom = () => process.env.MAIL_FROM ?? "ePortal <onboarding@resend.dev>";
/** Comma-separated addresses that receive new enquiries and bookings. */
export const notifyEmails = () =>
  (process.env.NOTIFY_EMAIL ?? "").split(",").map((s) => s.trim()).filter((s) => /^\S+@\S+\.\S+$/.test(s));
/** Secret used to hash visitor addresses. Falls back to the service key so no extra setup is needed. */
export const hashSalt = () => process.env.HASH_SALT ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "eportal";
