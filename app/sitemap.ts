import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getSolutions } from "@/lib/solutions-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const solutions = await getSolutions();
  const pages = ["", "/solutions", "/custom-portal", "/business-website", "/about", "/contact", "/demo", "/portals"];
  const paths = [...pages, ...solutions.map((s) => `/solutions/${s.slug}`)];

  return paths.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path.startsWith("/solutions/") || path === "/custom-portal" || path === "/business-website" ? 0.8 : 0.6,
  }));
}
