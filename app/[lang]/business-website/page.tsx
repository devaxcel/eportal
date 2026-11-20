import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { isLang } from "@/lib/i18n";
import { serviceMetadata } from "@/lib/seo";
import { getService } from "@/lib/services";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const s = getService("business-website")!;
  return isLang(lang) ? serviceMetadata(s, lang) : { title: "Not found", robots: { index: false } };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <ServicePage s={getService("business-website")!} lang={lang} />;
}
