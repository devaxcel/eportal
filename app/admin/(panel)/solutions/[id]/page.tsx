import { notFound } from "next/navigation";
import { SolutionEditor } from "@/components/admin/Editor";
import { getStaff, serverClient } from "@/lib/supabase/server";
import type { SolutionContent } from "@/lib/solution-schema";

export const dynamic = "force-dynamic";

export default async function EditSolution({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const staff = await getStaff();
  const sb = await serverClient();
  if (!staff || !sb) notFound();

  const { data: row } = await sb.from("solutions").select("id, slug, status, published").eq("id", id).maybeSingle();
  if (!row) notFound();
  const { data: draft } = await sb.from("solution_drafts").select("content").eq("solution_id", id).maybeSingle();

  // Editors work on the draft; fall back to what is live if a draft was never saved.
  const content = (draft?.content ?? row.published) as SolutionContent | null;
  if (!content) notFound();

  return <SolutionEditor id={row.id} slug={row.slug} initial={content} initialStatus={row.status} role={staff.role} />;
}
