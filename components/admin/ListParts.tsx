"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState, useTransition } from "react";
import { createSolution, deleteSolution, publish, setSort, unpublish } from "@/app/admin/actions";

const field = "rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function NewSolutionForm() {
  const [state, action, pending] = useActionState(createSolution, undefined);
  const [slug, setSlug] = useState("");
  return (
    <form action={action} className="flex flex-wrap items-end gap-3 rounded-2xl border border-line bg-white p-4">
      <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Name (English)
        <input name="name" required className={`${field} mt-1 block w-56 font-normal normal-case`} onChange={(e) => setSlug((s) => s || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""))} />
      </label>
      <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Address
        <span className="mt-1 flex items-center gap-1 font-normal normal-case"><span className="text-ink-soft">/solutions/</span>
          <input name="slug" required value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} className={`${field} w-48`} dir="ltr" />
        </span>
      </label>
      <button disabled={pending} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">{pending ? "Creating…" : "Create solution"}</button>
      {state?.error && <p role="alert" className="w-full text-sm text-red-600">{state.error}</p>}
    </form>
  );
}

export function RowActions({ id, status, sort, admin }: { id: string; status: "draft" | "published"; sort: number; admin: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const run = (fn: () => Promise<{ ok: boolean; error?: string }>) =>
    start(async () => {
      const r = await fn();
      setError(r.ok ? "" : (r.error ?? "Failed"));
      router.refresh();
    });
  if (!admin) return <span className="text-xs text-ink-soft">Admins publish</span>;

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <input
        type="number"
        defaultValue={sort}
        aria-label="Order"
        title="Order (lower shows first)"
        className={`${field} w-16 px-2 py-1`}
        onBlur={(e) => Number(e.target.value) !== sort && run(() => setSort(id, Number(e.target.value)))}
      />
      {status === "published" ? (
        <button disabled={pending} onClick={() => run(() => unpublish(id))} className="rounded-lg border border-line px-3 py-1.5 text-sm font-semibold hover:bg-mist disabled:opacity-50">Unpublish</button>
      ) : (
        <button disabled={pending} onClick={() => run(() => publish(id))} className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50">Publish draft</button>
      )}
      <button
        disabled={pending}
        onClick={() => confirm("Delete this solution and its draft for good?") && run(() => deleteSolution(id))}
        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50"
      >Delete</button>
      {error && <p role="alert" className="w-full text-end text-xs text-red-600">{error}</p>}
    </div>
  );
}
