/**
 * Applies the product rename (lib/rename-map.ts) to the content already stored in Supabase:
 * the published copy and the draft of every solution. Page addresses are not touched.
 * A JSON backup of every row is written to ./backups first.
 *
 *   npm run rename-products -- --dry     show what would change
 *   npm run rename-products              apply it
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { applyRenames } from "../lib/rename-map";
import { adminClient } from "../lib/supabase/admin";

type Row = { id: string; slug: string; published: unknown };
type Draft = { solution_id: string; content: unknown };

const swap = (value: unknown) => {
  const before = JSON.stringify(value);
  const after = applyRenames(before);
  return { changed: after !== before, value: after === before ? value : JSON.parse(after) };
};

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

  let touched = 0;
  for (const r of (rows ?? []) as Row[]) {
    if (!r.published) continue;
    const { changed, value } = swap(r.published);
    if (!changed) continue;
    touched++;
    console.log(`${dry ? "would update" : "updating"} published copy of ${r.slug}`);
    if (!dry) {
      const { error: e } = await sb.from("solutions").update({ published: value, updated_at: new Date().toISOString() }).eq("id", r.id);
      if (e) throw new Error(`${r.slug}: ${e.message}`);
    }
  }
  for (const d of (drafts ?? []) as Draft[]) {
    const { changed, value } = swap(d.content);
    if (!changed) continue;
    touched++;
    const slug = ((rows ?? []) as Row[]).find((r) => r.id === d.solution_id)?.slug ?? d.solution_id;
    console.log(`${dry ? "would update" : "updating"} draft of ${slug}`);
    if (!dry) {
      const { error: e } = await sb.from("solution_drafts").update({ content: value, updated_at: new Date().toISOString() }).eq("solution_id", d.solution_id);
      if (e) throw new Error(`${slug} draft: ${e.message}`);
    }
  }
  console.log(touched ? `${dry ? "would change" : "changed"} ${touched} item(s)` : "nothing to change");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
