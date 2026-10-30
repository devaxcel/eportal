import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { serviceRoleKey, supabaseUrl } from "../env";

/** Service-role client. Server only: bypasses row-level security. Use for user management and seeding. */
export function adminClient(): SupabaseClient {
  const url = supabaseUrl();
  const key = serviceRoleKey();
  if (!url || !key) throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
