import Link from "next/link";
import { notFound } from "next/navigation";
import { CancelForm } from "@/components/CancelForm";
import { lookupBooking } from "../../actions";
import { href, isLang, T } from "@/lib/i18n";
import { formatSlot } from "@/lib/tz";

export const metadata = { title: "Cancel booking", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function CancelPage({ params }: { params: Promise<{ lang: string; token: string }> }) {
  const { lang, token } = await params;
  if (!isLang(lang)) notFound();
  const b = await lookupBooking(token);
  if (!b) notFound();

  const past = Date.parse(b.start_at) < Date.now();
  const when = formatSlot(Date.parse(b.start_at), b.visitor_tz || "UTC", lang);

  return (
    <section className="container-x py-20">
      <div className="mx-auto max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-extrabold">{T(lang, "Your demo booking", "آپ کی ڈیمو بکنگ")}</h1>
        <p className="mt-4 text-lg font-semibold" dir="auto">{when}</p>
        <p className="text-sm text-ink-soft">{b.visitor_tz}</p>
        <div className="mt-6">
          {b.status === "cancelled" ? (
            <p className="rounded-xl bg-mist px-4 py-3 font-semibold">{T(lang, "This booking is cancelled.", "یہ بکنگ منسوخ ہو چکی ہے۔")}</p>
          ) : past ? (
            <p className="rounded-xl bg-mist px-4 py-3 font-semibold">{T(lang, "This booking has already taken place.", "یہ بکنگ ہو چکی ہے۔")}</p>
          ) : (
            <CancelForm lang={lang} token={token} />
          )}
        </div>
        <Link href={href(lang, "/demo")} className="mt-6 inline-block text-sm font-semibold text-brand-600 hover:underline">
          {T(lang, "Book a new time", "نیا وقت بک کریں")}
        </Link>
      </div>
    </section>
  );
}
