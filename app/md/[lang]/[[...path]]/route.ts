import { markdownPage } from "@/lib/agents";
import { isLang } from "@/lib/i18n";

export const revalidate = 300;

/** Markdown twin of a public page: /md/en, /md/en/solutions/schooldesk, and so on. */
export async function GET(_req: Request, { params }: { params: Promise<{ lang: string; path?: string[] }> }) {
  const { lang, path = [] } = await params;
  const body = isLang(lang) ? await markdownPage(lang, path.map((p) => p.replace(/\.md$/, ""))) : null;
  if (body === null) return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(body + "\n", {
    headers: { "Content-Type": "text/markdown; charset=utf-8", "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600", Vary: "Accept" },
  });
}
