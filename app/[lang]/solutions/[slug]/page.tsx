import { notFound } from "next/navigation";
import { SolutionTemplate } from "@/components/solutionPage";
import { isLang, locales } from "@/lib/i18n";
import { solutionMetadata } from "@/lib/seo";
import { getSolution, getSolutions } from "@/lib/solutions-data";

// New solutions published from the dashboard after the build are rendered on first request.
export const dynamicParams = true;

export async function generateStaticParams() {
  // eSchool has its own page at /solutions/eschool
  const list = (await getSolutions()).filter((s) => s.slug !== "eschool");
  return locales.flatMap((lang) => list.map((s) => ({ lang, slug: s.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const s = await getSolution(slug);
  if (!s || !isLang(lang)) return { title: "Not found", robots: { index: false } };
  return solutionMetadata(s, lang);
}

export default async function SolutionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const s = await getSolution(slug);
  if (!isLang(lang) || !s || s.slug === "eschool") notFound();

  return <SolutionTemplate s={s} lang={lang} />;
}
