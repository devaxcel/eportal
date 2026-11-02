import { unstable_cache } from "next/cache";
import { DEFAULT_SETTINGS, type Busy, type BookingSettings } from "./booking";
import { adminClient } from "./supabase/admin";
import { serviceRoleKey, supabaseUrl } from "./env";

const configured = () => Boolean(supabaseUrl() && serviceRoleKey());

async function loadSettings(): Promise<BookingSettings> {
  if (!configured()) return DEFAULT_SETTINGS;
  try {
    const { data, error } = await adminClient().from("booking_settings").select("*").eq("id", 1).maybeSingle();
    if (error || !data) return DEFAULT_SETTINGS; // tables not created yet: booking stays off
    return {
      enabled: data.enabled,
      timezone: data.timezone,
      slot_minutes: data.slot_minutes,
      min_notice_hours: data.min_notice_hours,
      max_days_ahead: data.max_days_ahead,
      weekly: data.weekly,
      blackout_dates: data.blackout_dates ?? [],
      meeting_info: data.meeting_info,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Availability settings. Cached for two minutes; saving them in the dashboard refreshes it at once. */
export const getBookingSettings = unstable_cache(loadSettings, ["booking-settings-v1"], { tags: ["booking"], revalidate: 120 });

/** Confirmed bookings that have not finished yet, as busy intervals. */
export async function getBusy(): Promise<Busy[]> {
  if (!configured()) return [];
  const { data } = await adminClient().from("bookings").select("start_at, end_at").eq("status", "confirmed").gte("end_at", new Date().toISOString());
  return (data ?? []).map((b) => ({ start: Date.parse(b.start_at), end: Date.parse(b.end_at) }));
}
