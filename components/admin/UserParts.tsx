"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState, useTransition } from "react";
import { createStaff, removeStaff, resetUserPassword, setRole } from "@/app/admin/actions";

const field = "rounded-lg border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function NewUserForm() {
  const [state, action, pending] = useActionState(createStaff, undefined);
  return (
    <form action={action} className="flex flex-wrap items-end gap-3 rounded-2xl border border-line bg-white p-4">
      <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Email
        <input name="email" type="email" required className={`${field} mt-1 block w-64 font-normal normal-case`} />
      </label>
      <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Temporary password
        <input name="password" type="text" required minLength={12} autoComplete="off" className={`${field} mt-1 block w-56 font-normal normal-case`} />
      </label>
      <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Role
        <select name="role" className={`${field} mt-1 block font-normal normal-case`} defaultValue="editor">
          <option value="editor">Editor (drafts only)</option>
          <option value="admin">Admin (publishes, manages users)</option>
        </select>
      </label>
      <button disabled={pending} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60">{pending ? "Adding…" : "Add user"}</button>
      {state?.error && <p role="alert" className="w-full text-sm text-red-600">{state.error}</p>}
      {state?.done && <p role="status" className="w-full text-sm text-brand-700">{state.done} Share the password with them securely.</p>}
    </form>
  );
}

export function UserRow({ id, email, role, isMe }: { id: string; email: string; role: "admin" | "editor"; isMe: boolean }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState("");
  const [pw, setPw] = useState<string | null>(null);
  const run = (fn: () => Promise<{ ok: boolean; error?: string }>) =>
    start(async () => {
      const r = await fn();
      setError(r.ok ? "" : (r.error ?? "Failed"));
      if (r.ok) setPw(null);
      router.refresh();
    });

  return (
    <tr className="border-t border-line">
      <td className="p-3 font-semibold">{email}{isMe && <span className="ms-2 text-xs font-normal text-ink-soft">(you)</span>}</td>
      <td className="p-3">
        <select
          disabled={pending || isMe}
          value={role}
          onChange={(e) => run(() => setRole(id, e.target.value as "admin" | "editor"))}
          className={field}
          aria-label={`Role for ${email}`}
        >
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </td>
      <td className="p-3 text-end">
        {pw === null ? (
          !isMe && <button disabled={pending} onClick={() => setPw("")} className="me-2 rounded-lg border border-line px-3 py-1.5 text-sm font-semibold hover:bg-mist">Set password</button>
        ) : (
          <span className="me-2 inline-flex items-center gap-2">
            <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password (12+)" autoComplete="off" className={`${field} w-48 px-2 py-1`} />
            <button disabled={pending || pw.length < 12} onClick={() => run(() => resetUserPassword(id, pw))} className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50">Save</button>
            <button onClick={() => setPw(null)} className="text-sm text-ink-soft">Cancel</button>
          </span>
        )}
        {!isMe && (
          <button disabled={pending} onClick={() => confirm(`Remove ${email}? They will no longer be able to sign in.`) && run(() => removeStaff(id))} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50">Remove</button>
        )}
        {error && <p role="alert" className="text-xs text-red-600">{error}</p>}
      </td>
    </tr>
  );
}
