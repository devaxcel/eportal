"use client";

import { useActionState } from "react";
import { changePassword } from "@/app/admin/actions";

const field = "mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5 font-normal outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";

export function AccountForm() {
  const [state, action, pending] = useActionState(changePassword, undefined);
  return (
    <form action={action} className="max-w-md space-y-4 rounded-2xl border border-line bg-white p-6">
      <h2 className="text-lg font-extrabold">Change password</h2>
      <label className="block text-sm font-semibold">Current password
        <input name="current" type="password" required autoComplete="current-password" className={field} />
      </label>
      <label className="block text-sm font-semibold">New password (12 characters or more)
        <input name="next" type="password" required minLength={12} autoComplete="new-password" className={field} />
      </label>
      <label className="block text-sm font-semibold">Repeat new password
        <input name="confirm" type="password" required minLength={12} autoComplete="new-password" className={field} />
      </label>
      {state?.error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      {state?.done && <p role="status" className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800">{state.done}</p>}
      <button disabled={pending} className="rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
        {pending ? "Saving…" : "Change password"}
      </button>
    </form>
  );
}
