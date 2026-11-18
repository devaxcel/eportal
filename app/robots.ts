import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/** AI crawlers named on purpose: ePortal wants to be found and quoted correctly by assistants. */
const AI_CRAWLERS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User", "anthropic-ai",
  "Google-Extended", "PerplexityBot", "Perplexity-User",
  "Applebot-Extended", "CCBot", "Meta-ExternalAgent", "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  const open = { allow: "/", disallow: ["/admin", "/api"] };
  return {
    rules: [{ userAgent: "*", ...open }, ...AI_CRAWLERS.map((userAgent) => ({ userAgent, ...open }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
