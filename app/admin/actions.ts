"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { adminClient } from "@/lib/supabase/admin";
import { getStaff, serverClient, type Role } from "@/lib/supabase/server";
import { newContent, validateContent, type SolutionContent } from "@/lib/solution-schema";

export type Result = { ok: true; message?: string } | { ok: false; error: string };

async function requireStaff() {
  const staff = await getStaff();
  if (!staff) throw new Error("Please sign in again.");
  return staff;
}

async function requireAdmin() {
  const staff = await requireStaff();
  if (staff.role !== "admin") throw new Error("Only admins can do this.");
  return staff;
}

/** Make the public site pick up changes straight away. */
function refreshSite() {
  revalidateTag("solutions");
  revalidatePath("/", "layout");
}

const fail = (e: unknown): Result => ({ ok: false, error: e instanceof Error ? e.message : "Something went wrong." });

/* ------------------------------------------------------------ sign in */

export async function signIn(_prev: { error?: string } | undefined, form: FormData) {
  const sb = await serverClient();
  if (!sb) return { error: "Supabase is not configured yet." };
  const { error } = await sb.auth.signInWithPassword({
    email: String(form.get("email") ?? "").trim(),
    password: String(form.get("password") ?? ""),
  });
  if (error) return { error: "Wrong email or password." };
  redirect("/admin");
}

export async function signOut() {
  const sb = await serverClient();
  await sb?.auth.signOut();
  redirect("/admin/login");
}

/* ----------------------------------------------------------- passwords */

const MIN_PASSWORD = 12;

/** Signed-in users change their own password; the current one is asked for again. */
export async function changePassword(_prev: { error?: string; done?: string } | undefined, form: FormData) {
  const staff = await getStaff();
  if (!staff) return { error: "Please sign in again." };
  const current = String(form.get("current") ?? "");
  const next = String(form.get("next") ?? "");
  const confirm = String(form.get("confirm") ?? "");
  if (next.length < MIN_PASSWORD) return { error: `Use at least ${MIN_PASSWORD} characters.` };
  if (next !== confirm) return { error: "The two new passwords do not match." };
  if (next === current) return { error: "Choose a password you have not used just now." };

  const sb = await serverClient();
  if (!sb) return { error: "Supabase is not configured." };
  const check = await sb.auth.signInWithPassword({ email: staff.email, password: current });
  if (check.error) return { error: "The current password is wrong." };
  const { error } = await sb.auth.updateUser({ password: next });
  if (error) return { error: error.message };
  return { done: "Password changed. Use it next time you sign in." };
}

/** Admins can set a new password for a teammate who is locked out. */
export async function resetUserPassword(id: string, password: string): Promise<Result> {
  try {
    await requireAdmin();
    if (password.length < MIN_PASSWORD) return { ok: false, error: `Use at least ${MIN_PASSWORD} characters.` };
    const { error } = await adminClient().auth.admin.updateUserById(id, { password });
    if (error) return { ok: false, error: error.message };
    return { ok: true, message: "Password updated." };
  } catch (e) {
    return fail(e);
  }
}

/* ---------------------------------------------------------- solutions */

export async function saveDraft(id: string, content: SolutionContent): Promise<Result> {
  try {
    const staff = await requireStaff();
    const problems = validateContent(content);
    if (problems.length) return { ok: false, error: problems.join(" ") };
    const sb = (await serverClient())!;
    const { error } = await sb
      .from("solution_drafts")
      .upsert({ solution_id: id, content, updated_by: staff.id, updated_at: new Date().toISOString() });
    if (error) return { ok: false, error: error.message };
    return { ok: true, message: "Draft saved." };
  } catch (e) {
    return fail(e);
  }
}

export async function publish(id: string): Promise<Result> {
  try {
    await requireAdmin();
    const sb = (await serverClient())!;
    const { data: draft, error } = await sb.from("solution_drafts").select("content").eq("solution_id", id).single();
    if (error || !draft) return { ok: false, error: "No draft to publish." };
    const problems = validateContent(draft.content as SolutionContent);
    if (problems.length) return { ok: false, error: problems.join(" ") };
    const now = new Date().toISOString();
    const { error: e2 } = await sb
      .from("solutions")
      .update({ published: draft.content, status: "published", published_at: now, updated_at: now })
      .eq("id", id);
    if (e2) return { ok: false, error: e2.message };
    refreshSite();
    return { ok: true, message: "Published. The live site is updated." };
  } catch (e) {
    return fail(e);
  }
}

export async function unpublish(id: string): Promise<Result> {
  try {
    await requireAdmin();
    const sb = (await serverClient())!;
    const { error } = await sb.from("solutions").update({ status: "draft", updated_at: new Date().toISOString() }).eq("id", id);
    if (error) return { ok: false, error: error.message };
    refreshSite();
    return { ok: true, message: "Unpublished. It is hidden from the live site." };
  } catch (e) {
    return fail(e);
  }
}

export async function createSolution(_prev: { error?: string } | undefined, form: FormData) {
  let id = "";
  try {
    await requireAdmin();
    const name = String(form.get("name") ?? "").trim();
    const slug = String(form.get("slug") ?? "").trim().toLowerCase();
    if (!name) return { error: "Enter a name." };
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return { error: "The address may only use lowercase letters, numbers and single hyphens." };
    if (["schooldesk"].includes(slug)) return { error: "That address is reserved." };
    const sb = (await serverClient())!;
    const { data: last } = await sb.from("solutions").select("sort").order("sort", { ascending: false }).limit(1).maybeSingle();
    const { data, error } = await sb
      .from("solutions")
      .insert({ slug, status: "draft", sort: (last?.sort ?? 0) + 10 })
      .select("id")
      .single();
    if (error || !data) return { error: error?.message.includes("duplicate") ? "That address is already used." : (error?.message ?? "Could not create.") };
    id = data.id;
    const { error: e2 } = await sb.from("solution_drafts").insert({ solution_id: id, content: newContent(name) });
    if (e2) return { error: e2.message };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Something went wrong." };
  }
  redirect(`/admin/solutions/${id}`);
}

export async function deleteSolution(id: string): Promise<Result> {
  try {
    await requireAdmin();
    const sb = (await serverClient())!;
    const { error } = await sb.from("solutions").delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    refreshSite();
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function setSort(id: string, sort: number): Promise<Result> {
  try {
    await requireAdmin();
    const sb = (await serverClient())!;
    const { error } = await sb.from("solutions").update({ sort }).eq("id", id);
    if (error) return { ok: false, error: error.message };
    refreshSite();
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

/* -------------------------------------------------------------- users */

export async function createStaff(_prev: { error?: string; done?: string } | undefined, form: FormData) {
  try {
    await requireAdmin();
    const email = String(form.get("email") ?? "").trim().toLowerCase();
    const password = String(form.get("password") ?? "");
    const role = (form.get("role") === "admin" ? "admin" : "editor") as Role;
    if (!/^\S+@\S+\.\S+$/.test(email)) return { error: "Enter a valid email." };
    if (password.length < MIN_PASSWORD) return { error: `Use a password of at least ${MIN_PASSWORD} characters.` };
    const sb = adminClient();
    const { data, error } = await sb.auth.admin.createUser({ email, password, email_confirm: true });
    if (error || !data.user) return { error: error?.message ?? "Could not create the user." };
    const { error: e2 } = await sb.from("profiles").upsert({ id: data.user.id, email, role });
    if (e2) return { error: e2.message };
    revalidatePath("/admin/users");
    return { done: `${email} can now sign in as ${role}.` };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Something went wrong." };
  }
}

export async function setRole(id: string, role: Role): Promise<Result> {
  try {
    const me = await requireAdmin();
    if (id === me.id && role !== "admin") return { ok: false, error: "You cannot remove your own admin role." };
    const sb = (await serverClient())!;
    const { error } = await sb.from("profiles").update({ role }).eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/users");
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}

export async function removeStaff(id: string): Promise<Result> {
  try {
    const me = await requireAdmin();
    if (id === me.id) return { ok: false, error: "You cannot remove yourself." };
    const { error } = await adminClient().auth.admin.deleteUser(id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/users");
    return { ok: true };
  } catch (e) {
    return fail(e);
  }
}
