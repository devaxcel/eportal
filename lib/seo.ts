import type { Metadata } from "next";
import type { Solution } from "./content";
import { siteUrl } from "./env";
import { locales, tx, type Lang } from "./i18n";

export const SITE_URL = siteUrl();

const trim = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

/** SEO values for one solution in one language, with sensible defaults when the dashboard left them blank. */
export function seoOf(s: Solution, lang: Lang) {
  const f = s.seo?.langs?.[lang] ?? {};
  const title = f.title?.trim();
  return {
    title: title || `${tx(s.name, lang)}: ${tx(s.tagline, lang)}`,
    customTitle: Boolean(title),
    description: f.description?.trim() || trim(tx(s.description, lang), 160),
    keywords: (f.keywords ?? "").split(",").map((k) => k.trim()).filter(Boolean),
    schema: f.schema?.trim() ?? "",
  };
}

/** Next.js metadata for a solution page: title, description, keywords, canonical, hreflang, Open Graph, Twitter. */
export function solutionMetadata(s: Solution, lang: Lang): Metadata {
  const seo = seoOf(s, lang);
  const url = `${SITE_URL}/${lang}/solutions/${s.slug}`;
  const images = s.seo?.ogImage ? [s.seo.ogImage] : undefined;
  return {
    title: seo.customTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: seo.keywords.length ? seo.keywords : undefined,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/solutions/${s.slug}`])),
    },
    openGraph: { type: "website", title: seo.title, description: seo.description, url, siteName: "ePortal", locale: lang, images },
    twitter: { card: images ? "summary_large_image" : "summary", title: seo.title, description: seo.description, images },
  };
}

/** JSON-LD for a solution: the custom schema from the dashboard if it parses, otherwise a generated one. */
export function solutionSchema(s: Solution, lang: Lang, site: string = SITE_URL): unknown {
  const seo = seoOf(s, lang);
  if (seo.schema) {
    try {
      return JSON.parse(seo.schema);
    } catch {
      // fall through to the generated schema
    }
  }
  const name = tx(s.name, lang);
  const url = `${site}/${lang}/solutions/${s.slug}`;
  const graph: unknown[] = [
    {
      "@type": "SoftwareApplication",
      name,
      description: seo.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url,
      inLanguage: lang,
      publisher: { "@type": "Organization", name: "AXCEL", url: "https://axcelworld.com" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ePortal", item: `${site}/${lang}` },
        { "@type": "ListItem", position: 2, name: "Solutions", item: `${site}/${lang}/solutions` },
        { "@type": "ListItem", position: 3, name, item: url },
      ],
    },
  ];
  if (s.story?.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: s.story.faqs.map((f) => ({
        "@type": "Question",
        name: tx(f.q, lang),
        acceptedAnswer: { "@type": "Answer", text: tx(f.a, lang) },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

/** Is this string valid JSON that looks like schema.org structured data? Used by the dashboard. */
export function checkSchema(text: string): string | null {
  if (!text.trim()) return null;
  try {
    const v = JSON.parse(text);
    if (typeof v !== "object" || v === null) return "Schema must be a JSON object or array";
    const first = Array.isArray(v) ? v[0] : v;
    if (!first || typeof first !== "object") return "Schema must contain an object";
    if (!("@context" in first) && !("@graph" in first) && !("@type" in first)) return 'Schema needs "@context" and "@type"';
    return null;
  } catch (e) {
    return "Not valid JSON: " + (e instanceof Error ? e.message : "parse error");
  }
}
