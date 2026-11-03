/**
 * Writes the search text from lib/seo-content.ts into solutions already stored in Supabase
 * (published copy and draft). Only blank fields are filled, so anything an editor wrote is kept.
 * A JSON backup of every row is written to ./backups first. New solutions are added by `npm run seed`.
 *
 *   npm run apply-seo -- --dry     show what would change
 *   npm run apply-seo              apply it
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { seoBySlug } from "../lib/seo-content";
import { adminClient } from "../lib/supabase/admin";

type Row = { id: string; slug: string; published: Record<string, any> | null };
type Draft = { solution_id: string; content: Record<string, any> };
type Fields = Record<string, string | undefined>;

/** Fills blank SEO fields; returns how many it filled. */
function fill(content: Record<string, any>, slug: string): number {
  const want = seoBySlug[slug];
  if (!want?.langs) return 0;
  content.seo = content.seo ?? {};
  content.seo.langs = content.seo.langs ?? {};
  let n = 0;
  for (const [lang, fields] of Object.entries(want.langs)) {
    const have: Fields = (content.seo.langs[lang] = content.seo.langs[lang] ?? {});
    for (const [k, v] of Object.entries(fields as Fields)) {
      if (v && !have[k]?.trim()) {
        have[k] = v;
        n++;
      }
    }
  }
  return n;
}

async function main() {
  const dry = process.argv.includes("--dry");
  const sb = adminClient();
  const { data: rows, error } = await sb.from("solutions").select("id, slug, published");
  if (error) throw new Error(error.message);
  const { data: drafts, error: e2 } = await sb.from("solution_drafts").select("solution_id, content");
  if (e2) throw new Error(e2.message);

  if (!dry) {
    mkdirSync("backups", { recursive: true });
    const file = `backups/solutions-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    writeFileSync(file, JSON.stringify({ solutions: rows, drafts }, null, 2));
    console.log(`backup written: ${file}`);
  }

  const now = new Date().toISOString();
  let total = 0;
  for (const r of (rows ?? []) as Row[]) {
    if (!r.published) continue;
    const n = fill(r.published, r.slug);
    if (!n) continue;
    total += n;
    console.log(`${dry ? "would fill" : "filling"} ${n} field(s) in the published copy of ${r.slug}`);
    if (!dry) {
      const { error: e } = await sb.from("solutions").update({ published: r.published, updated_at: now }).eq("id", r.id);
      if (e) throw new Error(`${r.slug}: ${e.message}`);
    }
  }
  for (const d of (drafts ?? []) as Draft[]) {
    const slug = ((rows ?? []) as Row[]).find((r) => r.id === d.solution_id)?.slug;
    if (!slug) continue;
    const n = fill(d.content, slug);
    if (!n) continue;
    total += n;
    console.log(`${dry ? "would fill" : "filling"} ${n} field(s) in the draft of ${slug}`);
    if (!dry) {
      const { error: e } = await sb.from("solution_drafts").update({ content: d.content, updated_at: now }).eq("solution_id", d.solution_id);
      if (e) throw new Error(`${slug} draft: ${e.message}`);
    }
  }
  console.log(total ? `${dry ? "would fill" : "filled"} ${total} field(s)` : "nothing to fill");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
