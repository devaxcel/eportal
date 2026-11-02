import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadRow, type Lead } from "@/components/admin/LeadParts";
import { getSolutions } from "@/lib/solutions-data";
import { getStaff, serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const STATUSES = ["all", "new", "contacted", "won", "lost"];

export default async function Enquiries({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const staff = await getStaff();
  const sb = await serverClient();
  if (!staff || !sb) notFound();
  const { status = "all" } = await searchParams;

  let q = sb.from("enquiries").select("*").order("created_at", { ascending: false }).limit(300);
  if (STATUSES.includes(status) && status !== "all") q = q.eq("status", status);
  const { data, error } = await q;
  const { data: counts } = await sb.from("enquiries").select("status");
  const solutions = await getSolutions();
  const nameOf = (slug: string | null) => solutions.find((s) => s.slug === slug)?.name.en ?? "Not chosen";
  const total = (s: string) => (s === "all" ? (counts ?? []).length : (counts ?? []).filter((c) => c.status === s).length);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Leads</h1>
          <p className="mt-1 text-sm text-ink-soft">Every request from the demo and contact forms and every booking. Click a row to follow up.</p>
        </div>
        <a href={`/admin/enquiries/export?status=${status}`} className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-semibold hover:bg-mist">Download CSV</a>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUSES.map((s) => (
          <Link key={s} href={`/admin/enquiries?status=${s}`} className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${status === s ? "bg-black text-white" : "border border-line bg-white text-ink-soft hover:bg-mist"}`}>
            {s} <span className="opacity-60">{total(s)}</span>
          </Link>
        ))}
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">Could not load: {error.message}. Did you run supabase/002_leads_analytics_booking.sql?</p>}

      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[46rem] text-sm">
          <thead className="bg-mist text-left text-xs uppercase tracking-wide text-ink-soft">
            <tr><th className="p-3">Received</th><th className="p-3">Name</th><th className="p-3">Solution</th><th className="p-3">Contact</th><th className="p-3">Type</th><th className="p-3">Status</th></tr>
          </thead>
          <tbody>
            {((data ?? []) as Lead[]).map((l) => <LeadRow key={l.id} lead={l} solutionName={nameOf(l.solution)} admin={staff.role === "admin"} />)}
            {(data ?? []).length === 0 && !error && <tr><td colSpan={6} className="p-8 text-center text-ink-soft">No enquiries yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
