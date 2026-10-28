import { MessageCircle } from "lucide-react";
import { ui } from "@/lib/content";
import { tx, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function WhatsAppButton({ lang }: { lang: Lang }) {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 end-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
      aria-label={tx(ui.whatsapp, lang)}
    >
      <MessageCircle size={20} />
      <span className="hidden sm:inline">{tx(ui.whatsapp, lang)}</span>
    </a>
  );
}
