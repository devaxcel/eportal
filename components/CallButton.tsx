import { Phone } from "lucide-react";
import { TrackedLink } from "./Track";
import { ui } from "@/lib/content";
import { tx, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Floating "Call us" button (the landline has no WhatsApp). Taps are counted in the dashboard. */
export function CallButton({ lang }: { lang: Lang }) {
  return (
    <TrackedLink
      href={site.phoneHref}
      className="fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-brand-700"
      aria-label={`${tx(ui.callUs, lang)} ${site.phone}`}
    >
      <Phone size={20} />
      <span className="hidden sm:inline">{tx(ui.callUs, lang)}</span>
    </TrackedLink>
  );
}
