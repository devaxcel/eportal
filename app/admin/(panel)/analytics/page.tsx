import Link from "next/link";
import { notFound } from "next/navigation";
import { langNames, isLang } from "@/lib/i18n";
import { getSolutions } from "@/lib/solutions-data";
import { getStaff, serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Item = { label: string; n: number };
type Overview = {
  visitors: number; views: number; enquiries: number; bookings: number; whatsapp: number;
  daily: { d: string; views: number; visitors: number; leads: number }[];
  pages: Item[]; languages: Item[]; countries: Item[]; referrers: Item[]; devices: Item[];
  solutions: { label: string; views: number; leads: number }[];
};

const PERIODS = [7, 30, 90];

/** Bars for visitors per day, with a dot on days that produced a lead. Drawn on the server, no chart library. */
function DailyChart({ daily, days }: { daily: Overview["daily"]; days: number }) {
  const map = new Map(daily.map((r) => [r.d, r]));
  const rows = Array.from({ length: days }, (_, i) => {
    const d = new Date(Date.now() - (days - 1 - i) * 86400_000).toISOString().slice(0, 10);
    return map.get(d) ?? { d, views: 0, visitors: 0, leads: 0 };
  });
  const max = Math.max(1, ...rows.map((r) => r.visitors));
  const W = 720, H = 190, pad = 24, bw = (W - pad * 2) / rows.length;
  return (
    <svg viewBox={`0 0 ${W} ${H + 24}`} role="img" aria-label="Visitors per day" className="w-full">
      {[0, 0.5, 1].map((t) => <line key={t} x1={pad} x2={W - pad} y1={H - t * (H - 20)} y2={H - t * (H - 20)} stroke="var(--color-line)" />)}
      <text x={pad} y="12" fontSize="11" fill="var(--color-ink-soft)">{max} visitors</text>
      {rows.map((r, i) => {
        const h = (r.visitors / max) * (H - 20);
        return (
          <g key={r.d}>
            <title>{`${r.d}: ${r.visitors} visitors, ${r.views} views, ${r.leads} leads`}</title>
            <rect x={pad + i * bw + 1} y={H - h} width={Math.max(1, bw - 2)} height={h} rx="2" fill="var(--color-brand-500)" opacity="0.85" />
            {r.leads > 0 && <circle cx={pad + i * bw + bw / 2} cy={H - h - 8} r="4" fill="#f5a524" />}
          </g>
        );
      })}
      <text x={pad} y={H + 18} fontSize="11" fill="var(--color-ink-soft)">{rows[0].d}</text>
      <text x={W - pad} y={H + 18} fontSize="11" textAnchor="end" fill="var(--color-ink-soft)">{rows[rows.length - 1].d}</text>
    </svg>
  );
}

function List({ title, items, fmt = (s: string) => s }: { title: string; items: Item[]; fmt?: (s: string) => string }) {
  const max = Math.max(1, ...items.map((i) => i.n));
  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="font-bold">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i.label} className="text-sm">
            <span className="flex justify-between gap-3"><span className="truncate" dir="auto">{fmt(i.label)}</span><b>{i.n}</b></span>
            <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-mist"><span className="block h-full rounded-full bg-brand-500" style={{ width: `${(i.n / max) * 100}%` }} /></span>
          </li>
        ))}
        {items.length === 0 && <li className="text-sm text-ink-soft">No data yet.</li>}
      </ul>
    </section>
  );
}

export default async function Analytics({ searchParams }: { searchParams: Promise<{ days?: string }> }) {
  const staff = await getStaff();
  const sb = await serverClient();
  if (!staff || !sb) notFound();
  const { days: raw } = await searchParams;
  const days = PERIODS.includes(Number(raw)) ? Number(raw) : 30;

  const { data, error } = await sb.rpc("analytics_overview", { days });
  const o = data as Overview | null;
  const solutions = await getSolutions();
  const solName = (slug: string) => solutions.find((s) => s.slug === slug)?.name.en ?? slug;
  const country = (c: string) => { try { return new Intl.DisplayNames("en", { type: "region" }).of(c) ?? c; } catch { return c; } };

  const leads = (o?.enquiries ?? 0) + (o?.bookings ?? 0);
  const rate = o && o.visitors > 0 ? ((leads / o.visitors) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Analytics</h1>
          <p className="mt-1 text-sm text-ink-soft">First-party and cookie-free. A visitor is counted once per day; no one is tracked across days.</p>
        </div>
        <div className="inline-flex rounded-lg border border-line bg-white p-1">
          {PERIODS.map((p) => <Link key={p} href={`/admin/analytics?days=${p}`} className={`rounded-md px-3 py-1.5 text-sm font-semibold ${days === p ? "bg-black text-white" : "text-ink-soft"}`}>{p} days</Link>)}
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">Could not load: {error.message}. Did you run supabase/002_leads_analytics_booking.sql?</p>}

      {o && (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[["Visitors", o.visitors], ["Page views", o.views], ["Leads", leads], ["Lead rate", `${rate}%`], ["WhatsApp clicks", o.whatsapp]].map(([k, v]) => (
              <div key={k as string} className="rounded-2xl border border-line bg-white p-4"><p className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{k}</p><p className="mt-1 text-3xl font-extrabold">{v}</p></div>
            ))}
          </div>
          <p className="-mt-3 text-xs text-ink-soft">Leads are message requests ({o.enquiries}) plus booked calls ({o.bookings}). Lead rate is leads divided by visitors. Visitors are summed per day.</p>

          <section className="rounded-2xl border border-line bg-white p-5">
            <h2 className="font-bold">Visitors per day <span className="text-sm font-normal text-ink-soft">(orange dot = a lead that day)</span></h2>
            <DailyChart daily={o.daily} days={days} />
          </section>

          <section className="overflow-x-auto rounded-2xl border border-line bg-white p-5">
            <h2 className="font-bold">Solutions</h2>
            <table className="mt-3 w-full min-w-[24rem] text-sm">
              <thead className="text-left text-xs uppercase tracking-wide text-ink-soft"><tr><th className="py-2">Solution</th><th>Page views</th><th>Leads</th></tr></thead>
              <tbody>{o.solutions.map((s) => <tr key={s.label} className="border-t border-line"><td className="py-2 font-semibold">{solName(s.label)}</td><td>{s.views}</td><td>{s.leads}</td></tr>)}</tbody>
            </table>
          </section>

          <div className="grid gap-4 lg:grid-cols-2">
            <List title="Top pages" items={o.pages} />
            <List title="Where visitors come from" items={o.referrers} />
            <List title="Languages" items={o.languages} fmt={(l) => (isLang(l) ? langNames[l] : l)} />
            <List title="Countries" items={o.countries} fmt={country} />
            <List title="Devices" items={o.devices} fmt={(d) => d[0].toUpperCase() + d.slice(1)} />
          </div>
        </>
      )}
    </div>
  );
}
