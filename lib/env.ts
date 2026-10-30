/**
 * Server-side settings. The plain names (SUPABASE_URL, SUPABASE_ANON_KEY, SITE_URL) are preferred because
 * nothing here is needed in the browser, so they never need the NEXT_PUBLIC_ prefix. The prefixed names still work.
 */
export const supabaseUrl = () => process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = () => process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const serviceRoleKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;
export const siteUrl = () => (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://eportal.pk").replace(/\/$/, "");
