import { unstable_cache } from "next/cache";
import { solutions as staticSolutions, type Solution } from "./content";
import { stories } from "./stories";
import { publicClient } from "./supabase/public";

/** Built-in content, used until Supabase is set up and whenever the database cannot be reached. */
const fallback = (): Solution[] =>
  staticSolutions.map((s, i) => ({ ...s, story: s.story ?? stories[s.slug], sort: s.sort ?? (i + 1) * 10 }));

async function load(): Promise<Solution[]> {
  const sb = publicClient();
  if (!sb) return fallback();
  try {
    const { data, error } = await sb
      .from("solutions")
      .select("slug, sort, published")
      .eq("status", "published")
      .order("sort", { ascending: true });
    if (error || !data || data.length === 0) return fallback();
    return data
      .filter((r) => r.published)
      .map((r) => ({ ...(r.published as Solution), slug: r.slug, sort: r.sort }));
  } catch {
    return fallback();
  }
}

/** Published solutions in display order. Cached; refreshed when the dashboard publishes. */
export const getSolutions = unstable_cache(load, ["solutions-v1"], { tags: ["solutions"], revalidate: 300 });

export async function getSolution(slug: string): Promise<Solution | null> {
  return (await getSolutions()).find((s) => s.slug === slug) ?? null;
}
