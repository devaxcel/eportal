import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { nav, solutions, ui } from "@/lib/content";
import { href, T, tx, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            {T(lang, "Smart platforms for schools, fitness, healthcare, sales and retail, built in Lahore by AXCEL.", "اسکولوں، فٹنس، صحت، سیلز اور ریٹیل کے لیے سمارٹ پلیٹ فارمز، لاہور میں ایکسل کے تیار کردہ۔")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{tx(ui.quickLinks, lang)}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.key}>
                <Link href={href(lang, n.path)} className="hover:text-white">
                  {tx(n.label, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{T(lang, "Solutions", "حل")}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {solutions.map((s) => (
              <li key={s.slug}>
                <Link href={href(lang, `/solutions/${s.slug}`)} className="hover:text-white">
                  {tx(s.name, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">{tx(ui.contactUs, lang)}</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-1 shrink-0 text-brand-300" />
              <span>{tx(site.address, lang)}</span>
            </li>
            <li className="flex gap-2">
              <Phone size={16} className="mt-1 shrink-0 text-brand-300" />
              <a href={site.phoneHref} dir="ltr" className="hover:text-white">{site.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail size={16} className="mt-1 shrink-0 text-brand-300" />
              <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {tx(ui.rights, lang)}
          </p>
          <p>
            {tx(ui.poweredBy, lang)}{" "}
            <a href={site.companyUrl} className="font-semibold text-white/80 hover:text-white" target="_blank" rel="noopener noreferrer">
              {site.company}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
