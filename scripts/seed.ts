/**
 * One-time setup: copies the built-in solutions (with all five languages) into Supabase
 * and creates the first admin login. Safe to re-run: existing solutions are never overwritten.
 *
 *   npm run seed
 */
import { solutions } from "../lib/content";
import { stories } from "../lib/stories";
import { catalogs } from "../lib/translations";
import { adminClient } from "../lib/supabase/admin";

type Json = unknown;

/** Turns every { en, ur } pair into { en, ur, es, nl, ar } using the built-in translations. */
function expand(value: Json): Json {
  if (Array.isArray(value)) return value.map(expand);
  if (value && typeof value === "object") {
    const o = value as Record<string, Json>;
    if (typeof o.en === "string" && typeof o.ur === "string") {
      return {
        en: o.en,
        ur: o.ur,
        es: catalogs.es.get(o.en) ?? "",
        nl: catalogs.nl.get(o.en) ?? "",
        ar: catalogs.ar.get(o.en) ?? "",
      };
    }
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, expand(v)]));
  }
  return value;
}

async function main() {
  if (process.argv.includes("--dry")) {
    // Prints what would be stored and flags any text still missing a Spanish, Dutch or Arabic version.
    let missing = 0;
    for (const s of solutions) {
      const { slug, ...rest } = s;
      const text = JSON.stringify(expand({ ...rest, story: s.story ?? stories[slug] }));
      const gaps = (text.match(/"(es|nl|ar)":""/g) ?? []).length;
      missing += gaps;
      console.log(`${slug}: ${text.length} bytes, ${gaps} missing translations`);
    }
    console.log(missing ? `${missing} gaps` : "all text translated");
    return;
  }
  const sb = adminClient();

  for (const [i, s] of solutions.entries()) {
    const { slug, ...rest } = s;
    const content = expand({ ...rest, story: s.story ?? stories[slug], hidden: [], seo: { langs: {} } }) as Record<string, Json>;

    const { data: existing } = await sb.from("solutions").select("id").eq("slug", slug).maybeSingle();
    if (existing) {
      console.log(`skip   ${slug} (already exists)`);
      continue;
    }
    const { data, error } = await sb
      .from("solutions")
      .insert({ slug, status: "published", sort: (i + 1) * 10, published: content, published_at: new Date().toISOString() })
      .select("id")
      .single();
    if (error || !data) throw new Error(`insert ${slug}: ${error?.message}`);
    const { error: e2 } = await sb.from("solution_drafts").insert({ solution_id: data.id, content });
    if (e2) throw new Error(`draft ${slug}: ${e2.message}`);
    console.log(`added  ${slug}`);
  }

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log("ADMIN_EMAIL / ADMIN_PASSWORD not set: skipped creating the first admin.");
    return;
  }
  let userId: string | undefined;
  const created = await sb.auth.admin.createUser({ email, password, email_confirm: true });
  if (created.data.user) {
    userId = created.data.user.id;
    console.log(`admin  created ${email}`);
  } else {
    const list = await sb.auth.admin.listUsers({ page: 1, perPage: 1000 });
    userId = list.data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase())?.id;
    if (!userId) throw new Error(`create admin: ${created.error?.message}`);
    console.log(`admin  ${email} already exists`);
  }
  const { error } = await sb.from("profiles").upsert({ id: userId, email, role: "admin" });
  if (error) throw new Error(`profile: ${error.message}`);
  console.log("done. Sign in at /admin");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
