import { notFound } from "next/navigation";
import { SolutionTemplate } from "@/components/solutionPage";
import { solutions } from "@/lib/content";
import { isLang, locales, Tm } from "@/lib/i18n";
import { stories } from "@/lib/stories";

// eSchool has its own page at /solutions/eschool
const others = solutions.filter((s) => s.slug !== "eschool");

export const generateStaticParams = () => locales.flatMap((lang) => others.map((s) => ({ lang, slug: s.slug })));

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  return { title: s ? Tm(lang, s.name.en, s.name.ur) : "Solution" };
}

export default async function SolutionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const s = others.find((x) => x.slug === slug);
  if (!isLang(lang) || !s || !stories[s.slug]) notFound();

  return <SolutionTemplate s={s} lang={lang} />;
}
