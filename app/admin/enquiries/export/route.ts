import { getStaff, serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Spreadsheet programs run text that starts with = + - @ as a formula, so those cells get a leading apostrophe. */
const cell = (v: unknown) => {
  let s = v == null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(req: Request) {
  const staff = await getStaff();
  const sb = await serverClient();
  if (!staff || !sb) return new Response("Sign in first", { status: 401 });

  const status = new URL(req.url).searchParams.get("status") ?? "all";
  let q = sb.from("enquiries").select("*").order("created_at", { ascending: false }).limit(5000);
  if (["new", "contacted", "won", "lost"].includes(status)) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) return new Response(error.message, { status: 500 });

  const cols = ["created_at", "source", "status", "name", "organisation", "email", "phone", "solution", "students", "message", "lang", "page", "notes"];
  const csv = [cols.join(","), ...(data ?? []).map((r) => cols.map((c) => cell((r as Record<string, unknown>)[c])).join(","))].join("\r\n");
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
