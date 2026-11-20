import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { TrackedLink } from "./Track";
import { ui } from "@/lib/content";
import { href, T, tx, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

const base = "fixed bottom-5 end-5 z-40 items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-brand-700";

/**
 * Floating help button. On phones and tablets (touch screens) it dials the office landline.
 * On laptops and desktops a phone link often does nothing, so it opens the contact form instead.
 */
export function CallButton({ lang }: { lang: Lang }) {
  return (
    <>
      <TrackedLink href={site.phoneHref} className={`${base} hidden [@media(pointer:coarse)]:inline-flex`} aria-label={`${tx(ui.callUs, lang)} ${site.phone}`}>
        <Phone size={20} />
        <span className="hidden sm:inline">{tx(ui.callUs, lang)}</span>
      </TrackedLink>
      <Link href={href(lang, "/contact")} className={`${base} inline-flex [@media(pointer:coarse)]:hidden`} aria-label={T(lang, "Contact us", "ہم سے رابطہ کریں")}>
        <Mail size={20} />
        <span>{T(lang, "Contact us", "ہم سے رابطہ کریں")}</span>
      </Link>
    </>
  );
}
