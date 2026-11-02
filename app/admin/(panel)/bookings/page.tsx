import { notFound } from "next/navigation";
import { CancelBookingButton } from "@/components/admin/LeadParts";
import { getBookingSettings } from "@/lib/booking-server";
import { getSolutions } from "@/lib/solutions-data";
import { getStaff, serverClient } from "@/lib/supabase/server";
import { formatSlot } from "@/lib/tz";

export const dynamic = "force-dynamic";

type Row = { id: string; start_at: string; status: string; name: string; email: string; phone: string | null; organisation: string | null; solution: string | null; notes: string | null; visitor_tz: string | null };

export default async function Bookings() {
  const staff = await getStaff();
  const sb = await serverClient();
  if (!staff || !sb) notFound();

  const { data, error } = await sb.from("bookings").select("*").order("start_at", { ascending: true }).limit(500);
  const settings = await getBookingSettings();
  const solutions = await getSolutions();
  const nameOf = (slug: string | null) => solutions.find((s) => s.slug === slug)?.name.en ?? "Not chosen";
  const now = Date.now();
  const rows = (data ?? []) as Row[];
  const upcoming = rows.filter((r) => r.status === "confirmed" && Date.parse(r.start_at) >= now);
  const earlier = rows.filter((r) => !upcoming.includes(r)).reverse();

  const table = (list: Row[], canCancel: boolean) => (
    <div className="overflow-x-auto rounded-2xl border border-line bg-white">
      <table className="w-full min-w-[44rem] text-sm">
        <thead className="bg-mist text-left text-xs uppercase tracking-wide text-ink-soft">
          <tr><th className="p-3">When ({settings.timezone})</th><th className="p-3">Who</th><th className="p-3">Solution</th><th className="p-3">Contact</th><th className="p-3">Status</th><th className="p-3" /></tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id} className="border-t border-line align-top">
              <td className="p-3 font-semibold">{formatSlot(Date.parse(r.start_at), settings.timezone, "en")}<div className="text-xs font-normal text-ink-soft">Visitor: {r.visitor_tz}</div></td>
              <td className="p-3"><b>{r.name}</b><div className="text-xs text-ink-soft">{r.organisation}</div>{r.notes && <div className="mt-1 text-xs text-ink-soft" dir="auto">{r.notes}</div>}</td>
              <td className="p-3">{nameOf(r.solution)}</td>
              <td className="p-3 text-xs" dir="ltr"><a className="text-brand-700 underline" href={`mailto:${r.email}`}>{r.email}</a><div>{r.phone}</div></td>
              <td className="p-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.status === "confirmed" ? "bg-brand-100 text-brand-700" : "bg-stone-200 text-stone-700"}`}>{r.status === "confirmed" ? "Confirmed" : "Cancelled"}</span></td>
              <td className="p-3 text-end">{canCancel && staff.role === "admin" && <CancelBookingButton id={r.id} />}</td>
            </tr>
          ))}
          {list.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-ink-soft">Nothing here.</td></tr>}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Bookings</h1>
        <p className="mt-1 text-sm text-ink-soft">Demo calls booked from the website. Booking is currently <b>{settings.enabled ? "on" : "off"}</b>{staff.role === "admin" && <> (change it under Availability)</>}.</p>
      </div>
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">Could not load: {error.message}. Did you run supabase/002_leads_analytics_booking.sql?</p>}
      <h2 className="text-lg font-bold">Upcoming ({upcoming.length})</h2>
      {table(upcoming, true)}
      <h2 className="text-lg font-bold">Earlier and cancelled</h2>
      {table(earlier, false)}
    </div>
  );
}
