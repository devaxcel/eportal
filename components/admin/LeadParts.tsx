"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { cancelBookingAdmin, deleteEnquiry, saveEnquiryNotes, setEnquiryStatus } from "@/app/admin/actions";

const field = "rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
const badge: Record<string, string> = { new: "bg-amber-100 text-amber-800", contacted: "bg-sky-100 text-sky-800", won: "bg-brand-100 text-brand-700", lost: "bg-stone-200 text-stone-700" };

export type Lead = {
  id: string; created_at: string; source: "form" | "booking"; solution: string | null; name: string; organisation: string | null;
  phone: string | null; email: string | null; students: string | null; message: string | null; lang: string | null; status: string; notes: string | null;
};

export function LeadRow({ lead, solutionName, admin }: { lead: Lead; solutionName: string; admin: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [note, setNote] = useState(lead.notes ?? "");
  const [msg, setMsg] = useState("");
  const run = (fn: () => Promise<{ ok: boolean; error?: string; message?: string }>) =>
    start(async () => {
      const r = await fn();
      setMsg(r.ok ? (r.message ?? "") : (r.error ?? "Failed"));
      router.refresh();
    });
  const when = new Date(lead.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

  return (
    <>
      <tr className="cursor-pointer border-t border-line align-top hover:bg-mist/60" onClick={() => setOpen((v) => !v)}>
        <td className="p-3 text-ink-soft">{when}</td>
        <td className="p-3"><b>{lead.name}</b><div className="text-xs text-ink-soft">{lead.organisation}</div></td>
        <td className="p-3">{solutionName}</td>
        <td className="p-3 text-xs" dir="ltr">{lead.email}<div>{lead.phone}</div></td>
        <td className="p-3"><span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${lead.source === "booking" ? "bg-violet-100 text-violet-800" : "bg-mist text-ink-soft"}`}>{lead.source === "booking" ? "Booking" : "Message"}</span></td>
        <td className="p-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${badge[lead.status]}`}>{lead.status}</span></td>
      </tr>
      {open && (
        <tr className="border-t border-line bg-mist/50">
          <td colSpan={6} className="space-y-3 p-4">
            {lead.message && <p className="whitespace-pre-wrap rounded-lg bg-white p-3 text-sm" dir="auto">{lead.message}</p>}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              {lead.students && <span>Students: <b>{lead.students}</b></span>}
              {lead.lang && <span>Language: <b>{lead.lang}</b></span>}
              {lead.email && <a className="font-semibold text-brand-700 underline" href={`mailto:${lead.email}`}>Email</a>}
              {lead.phone && <a className="font-semibold text-brand-700 underline" href={`tel:${lead.phone}`}>Call</a>}
              {lead.phone && <a className="font-semibold text-brand-700 underline" target="_blank" rel="noopener noreferrer" href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}>WhatsApp</a>}
            </div>
            <div className="flex flex-wrap items-start gap-3">
              <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Status
                <select disabled={pending} value={lead.status} onChange={(e) => run(() => setEnquiryStatus(lead.id, e.target.value))} className={`${field} mt-1 block font-normal normal-case`}>
                  <option value="new">New</option><option value="contacted">Contacted</option><option value="won">Won</option><option value="lost">Lost</option>
                </select>
              </label>
              <label className="min-w-64 flex-1 text-xs font-semibold uppercase tracking-wide text-ink-soft">Internal notes
                <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} className={`${field} mt-1 block w-full font-normal normal-case`} />
              </label>
              <button disabled={pending} onClick={() => run(() => saveEnquiryNotes(lead.id, note))} className="mt-5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">Save notes</button>
              {admin && <button disabled={pending} onClick={() => confirm("Delete this enquiry for good?") && run(() => deleteEnquiry(lead.id))} className="mt-5 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50">Delete</button>}
            </div>
            {msg && <p role="status" className="text-sm text-ink-soft">{msg}</p>}
          </td>
        </tr>
      )}
    </>
  );
}

export function CancelBookingButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  return (
    <>
      <button disabled={pending} onClick={() => confirm("Cancel this booking and email the visitor?") && start(async () => { const r = await cancelBookingAdmin(id); setError(r.ok ? "" : r.error); router.refresh(); })} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50">Cancel</button>
      {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
    </>
  );
}
