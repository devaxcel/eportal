import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { getSolutions } from "@/lib/solutions-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const solutions = await getSolutions();
  const pages = ["", "/solutions", "/pricing", "/about", "/contact", "/demo", "/portals"];
  const paths = [...pages, ...solutions.map((s) => `/solutions/${s.slug}`)];

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path.startsWith("/solutions/") ? 0.8 : 0.6,
      alternates: { languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])) },
    })),
  );
}
