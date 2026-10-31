/**
 * Moves the stored page addresses to the new ones (lib/slugs.ts) in Supabase.
 * The site understands both, so this can run before or after the deploy. Safe to run again.
 *
 *   npm run rename-slugs -- --dry
 *   npm run rename-slugs
 */
import { SLUG_RENAMES } from "../lib/slugs";
import { adminClient } from "../lib/supabase/admin";

async function main() {
  const dry = process.argv.includes("--dry");
  const sb = adminClient();
  const { data: rows, error } = await sb.from("solutions").select("id, slug");
  if (error) throw new Error(error.message);
  const taken = new Set((rows ?? []).map((r) => r.slug as string));

  let moved = 0;
  for (const r of rows ?? []) {
    const to = SLUG_RENAMES[r.slug as string];
    if (!to) continue;
    if (taken.has(to)) {
      console.log(`skip   ${r.slug}: ${to} already exists`);
      continue;
    }
    console.log(`${dry ? "would move" : "moving"} /solutions/${r.slug} -> /solutions/${to}`);
    if (!dry) {
      const { error: e } = await sb.from("solutions").update({ slug: to, updated_at: new Date().toISOString() }).eq("id", r.id);
      if (e) throw new Error(`${r.slug}: ${e.message}`);
    }
    moved++;
  }
  console.log(moved ? `${dry ? "would move" : "moved"} ${moved} address(es)` : "nothing to move");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
