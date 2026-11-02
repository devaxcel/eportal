"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2 } from "lucide-react";
import { saveAvailability } from "@/app/admin/actions";
import { DAY_KEYS, type BookingSettings } from "@/lib/booking";

const field = "rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
const NAMES: Record<string, string> = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
const ORDER = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

export function AvailabilityForm({ initial }: { initial: BookingSettings }) {
  const [s, setS] = useState<BookingSettings>(initial);
  const [off, setOff] = useState(initial.blackout_dates.join("\n"));
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const num = (k: "slot_minutes" | "min_notice_hours" | "max_days_ahead") => (e: React.ChangeEvent<HTMLInputElement>) => setS({ ...s, [k]: Number(e.target.value) });
  const setDay = (d: (typeof DAY_KEYS)[number], rows: [string, string][]) => setS({ ...s, weekly: { ...s.weekly, [d]: rows } });

  const save = () =>
    start(async () => {
      const r = await saveAvailability({ ...s, blackout_dates: off.split(/\s+/).filter(Boolean) });
      setNote({ ok: r.ok, text: r.ok ? (r.message ?? "Saved.") : r.error });
    });

  return (
    <div className="space-y-6">
      <section className="space-y-4 rounded-2xl border border-line bg-white p-5">
        <label className="flex items-center gap-3 font-semibold"><input type="checkbox" checked={s.enabled} onChange={(e) => setS({ ...s, enabled: e.target.checked })} className="h-5 w-5" /> Let visitors book a demo call</label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Time zone
            <input dir="ltr" className={`${field} mt-1 w-full font-normal normal-case`} value={s.timezone} onChange={(e) => setS({ ...s, timezone: e.target.value })} placeholder="Asia/Karachi" />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Call length (minutes)
            <input type="number" min={10} max={240} step={5} className={`${field} mt-1 w-full font-normal`} value={s.slot_minutes} onChange={num("slot_minutes")} />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Minimum notice (hours)
            <input type="number" min={0} max={336} className={`${field} mt-1 w-full font-normal`} value={s.min_notice_hours} onChange={num("min_notice_hours")} />
          </label>
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Book up to (days ahead)
            <input type="number" min={1} max={120} className={`${field} mt-1 w-full font-normal`} value={s.max_days_ahead} onChange={num("max_days_ahead")} />
          </label>
        </div>
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">How the call happens (shown to the visitor)
          <textarea rows={2} maxLength={500} className={`${field} mt-1 w-full font-normal normal-case`} value={s.meeting_info} onChange={(e) => setS({ ...s, meeting_info: e.target.value })} />
        </label>
      </section>

      <section className="space-y-3 rounded-2xl border border-line bg-white p-5">
        <h2 className="font-bold">Weekly hours <span className="text-sm font-normal text-ink-soft">(in the time zone above, 24-hour clock)</span></h2>
        {ORDER.map((d) => (
          <div key={d} className="flex flex-wrap items-center gap-3 border-t border-line pt-3">
            <span className="w-24 font-semibold">{NAMES[d]}</span>
            {s.weekly[d].length === 0 && <span className="text-sm text-ink-soft">Closed</span>}
            {s.weekly[d].map(([a, b], i) => (
              <span key={i} className="inline-flex items-center gap-2" dir="ltr">
                <input type="time" className={field} value={a} onChange={(e) => setDay(d, s.weekly[d].map((r, k) => (k === i ? [e.target.value, r[1]] : r)))} />
                <span>to</span>
                <input type="time" className={field} value={b} onChange={(e) => setDay(d, s.weekly[d].map((r, k) => (k === i ? [r[0], e.target.value] : r)))} />
                <button type="button" aria-label="Remove period" onClick={() => setDay(d, s.weekly[d].filter((_, k) => k !== i))} className="rounded border border-line p-1.5 text-red-600"><Trash2 size={14} /></button>
              </span>
            ))}
            <button type="button" onClick={() => setDay(d, [...s.weekly[d], ["10:00", "17:00"]])} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600"><Plus size={14} /> Add hours</button>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-line bg-white p-5">
        <label className="block text-xs font-semibold uppercase tracking-wide text-ink-soft">Days off (one per line, like 2026-12-25)
          <textarea rows={4} dir="ltr" className={`${field} mt-1 w-full font-mono font-normal normal-case`} value={off} onChange={(e) => setOff(e.target.value)} />
        </label>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <button disabled={pending} onClick={save} className="rounded-lg bg-brand-600 px-6 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">{pending ? "Saving…" : "Save availability"}</button>
        {note && <p role="status" className={`rounded-lg px-3 py-2 text-sm ${note.ok ? "bg-brand-50 text-brand-800" : "bg-red-50 text-red-700"}`}>{note.text}</p>}
      </div>
    </div>
  );
}
