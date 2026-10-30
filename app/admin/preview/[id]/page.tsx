import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { MotionProvider } from "@/components/motion";
import { SolutionTemplate } from "@/components/solutionPage";
import type { Solution } from "@/lib/content";
import { dirOf, isLang, langNames, locales } from "@/lib/i18n";
import { getStaff, serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Shows the saved DRAFT exactly as the public page will render it. Not indexed, staff only. */
export default async function Preview({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ lang?: string }> }) {
  const { id } = await params;
  const { lang: l } = await searchParams;
  const lang = l && isLang(l) ? l : "en";

  const staff = await getStaff();
  if (!staff) redirect("/admin/login");
  const sb = await serverClient();
  const { data: row } = await sb!.from("solutions").select("slug, sort, published").eq("id", id).maybeSingle();
  if (!row) notFound();
  const { data: draft } = await sb!.from("solution_drafts").select("content").eq("solution_id", id).maybeSingle();
  const content = draft?.content ?? row.published;
  if (!content) notFound();

  const s = { ...(content as Omit<Solution, "slug">), slug: row.slug, sort: row.sort } as Solution;

  return (
    <div lang={lang} dir={dirOf(lang)}>
      <div className="sticky top-0 z-50 flex flex-wrap items-center gap-3 bg-black px-4 py-2 text-sm text-white" dir="ltr">
        <b>Draft preview</b>
        <span className="text-white/60">Saved draft, not live</span>
        <div className="ms-auto flex gap-1">
          {locales.map((x) => (
            <Link key={x} href={`/admin/preview/${id}?lang=${x}`} className={`rounded px-2.5 py-1 ${x === lang ? "bg-brand-600" : "hover:bg-white/15"}`}>{langNames[x]}</Link>
          ))}
        </div>
      </div>
      <MotionProvider>
        <SolutionTemplate s={s} lang={lang} />
      </MotionProvider>
    </div>
  );
}
