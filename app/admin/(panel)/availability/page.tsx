import { notFound } from "next/navigation";
import { AvailabilityForm } from "@/components/admin/AvailabilityForm";
import { DEFAULT_SETTINGS, type BookingSettings } from "@/lib/booking";
import { getStaff, serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Availability() {
  const staff = await getStaff();
  const sb = await serverClient();
  if (!staff || staff.role !== "admin" || !sb) notFound();

  const { data, error } = await sb.from("booking_settings").select("*").eq("id", 1).maybeSingle();
  const initial: BookingSettings = data
    ? { enabled: data.enabled, timezone: data.timezone, slot_minutes: data.slot_minutes, min_notice_hours: data.min_notice_hours, max_days_ahead: data.max_days_ahead, weekly: data.weekly, blackout_dates: data.blackout_dates ?? [], meeting_info: data.meeting_info }
    : DEFAULT_SETTINGS;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Availability</h1>
        <p className="mt-1 text-sm text-ink-soft">When visitors can book a demo call on the website. Times shown to visitors are converted to their own time zone.</p>
      </div>
      {(error || !data) && <p className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">Settings were not found{error ? `: ${error.message}` : ""}. Run supabase/002_leads_analytics_booking.sql first.</p>}
      <AvailabilityForm initial={initial} />
    </div>
  );
}
