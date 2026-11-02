"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { cancelBooking } from "@/app/[lang]/demo/actions";
import { T, type Lang } from "@/lib/i18n";

export function CancelForm({ lang, token }: { lang: Lang; token: string }) {
  const [state, action, pending] = useActionState(cancelBooking, undefined);
  if (state?.ok) {
    return (
      <p role="status" className="flex items-center justify-center gap-2 rounded-xl bg-brand-50 px-4 py-4 font-semibold text-brand-800">
        <CheckCircle2 size={20} /> {T(lang, "Your booking is cancelled.", "آپ کی بکنگ منسوخ ہو گئی۔")}
      </p>
    );
  }
  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="token" value={token} />
      {state && !state.ok && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{T(lang, "We could not cancel this booking. It may already be cancelled or in the past.", "ہم یہ بکنگ منسوخ نہیں کر سکے۔ شاید یہ پہلے ہی منسوخ ہو چکی ہے یا گزر چکی ہے۔")}</p>}
      <button disabled={pending} className="w-full rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60">
        {pending ? T(lang, "Cancelling…", "منسوخ ہو رہی ہے…") : T(lang, "Cancel this booking", "یہ بکنگ منسوخ کریں")}
      </button>
    </form>
  );
}
