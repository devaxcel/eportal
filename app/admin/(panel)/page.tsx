import Link from "next/link";
import { notFound } from "next/navigation";
import { NewSolutionForm, RowActions } from "@/components/admin/ListParts";
import { getStaff, serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type Row = { id: string; slug: string; status: "draft" | "published"; sort: number; published_at: string | null; updated_at: string };

export default async function SolutionsList() {
  const staff = await getStaff();
  const sb = await serverClient();
  if (!staff || !sb) notFound();

  const { data: rows, error } = await sb.from("solutions").select("id, slug, status, sort, published_at, updated_at").order("sort");
  const { data: drafts } = await sb.from("solution_drafts").select("solution_id, content, updated_at");
  const draftOf = new Map((drafts ?? []).map((d) => [d.solution_id as string, d]));

  const when = (iso: string | null) => (iso ? new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "—");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Solutions</h1>
        <p className="mt-1 text-sm text-ink-soft">Edit the text, sections and SEO of each solution. Only published solutions appear on the website.</p>
      </div>

      {staff.role === "admin" && <NewSolutionForm />}
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">Could not load: {error.message}. Did you run supabase/schema.sql and npm run seed?</p>}

      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="bg-mist text-left text-xs uppercase tracking-wide text-ink-soft">
            <tr><th className="p-3">Solution</th><th className="p-3">Status</th><th className="p-3">Last edited</th><th className="p-3 text-end">Actions</th></tr>
          </thead>
          <tbody>
            {((rows ?? []) as Row[]).map((r) => {
              const d = draftOf.get(r.id) as { content?: { name?: { en?: string } }; updated_at?: string } | undefined;
              return (
                <tr key={r.id} className="border-t border-line align-middle">
                  <td className="p-3">
                    <Link href={`/admin/solutions/${r.id}`} className="font-bold hover:underline">{d?.content?.name?.en || r.slug}</Link>
                    <div className="text-xs text-ink-soft" dir="ltr">/solutions/{r.slug}</div>
                  </td>
                  <td className="p-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.status === "published" ? "bg-brand-100 text-brand-700" : "bg-amber-100 text-amber-800"}`}>{r.status === "published" ? "Published" : "Draft"}</span>
                    {r.published_at && <div className="mt-1 text-xs text-ink-soft">Live since {when(r.published_at)}</div>}
                  </td>
                  <td className="p-3 text-ink-soft">{when(d?.updated_at ?? r.updated_at)}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Link href={`/admin/solutions/${r.id}`} className="rounded-lg border border-line px-3 py-1.5 font-semibold hover:bg-mist">Edit</Link>
                      <Link href={`/admin/preview/${r.id}`} target="_blank" className="rounded-lg border border-line px-3 py-1.5 font-semibold hover:bg-mist">Preview</Link>
                      <RowActions id={r.id} status={r.status} sort={r.sort} admin={staff.role === "admin"} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {(rows ?? []).length === 0 && <tr><td colSpan={4} className="p-8 text-center text-ink-soft">No solutions yet. Run <code>npm run seed</code> or create one above.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
