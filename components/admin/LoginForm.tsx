"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined);
  const field = "w-full rounded-lg border border-line bg-white px-3 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200";
  return (
    <form action={action} className="space-y-4">
      <label className="block text-sm font-semibold">Email
        <input name="email" type="email" required autoComplete="email" className={`${field} mt-1 font-normal`} />
      </label>
      <label className="block text-sm font-semibold">Password
        <input name="password" type="password" required autoComplete="current-password" className={`${field} mt-1 font-normal`} />
      </label>
      {state?.error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}
      <button disabled={pending} className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
