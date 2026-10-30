import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseAnonKey, supabaseUrl } from "../env";

/** Cookie-free client for public reads. Returns null when Supabase is not configured. */
export function publicClient(): SupabaseClient | null {
  const url = supabaseUrl();
  const key = supabaseAnonKey();
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export const supabaseConfigured = () =>
  Boolean(supabaseUrl() && supabaseAnonKey());
