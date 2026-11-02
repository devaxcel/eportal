import { adminClient } from "./supabase/admin";
import { serviceRoleKey, supabaseUrl } from "./env";

export type EventRow = {
  kind: "view" | "whatsapp" | "enquiry" | "booking";
  path?: string | null;
  lang?: string | null;
  solution?: string | null;
  referrer?: string | null;
  country?: string | null;
  device?: string | null;
  visitor?: string | null;
};

/** Writes one analytics event. Never throws: analytics must not break a page or a form. */
export async function recordEvent(e: EventRow): Promise<void> {
  if (!supabaseUrl() || !serviceRoleKey()) return;
  try {
    await adminClient().from("events").insert(e);
  } catch {
    // ignore
  }
}

/** /es/solutions/trainerbook -> trainerbook */
export const solutionOfPath = (path: string | null | undefined) => path?.match(/^\/[a-z]{2}\/solutions\/([a-z0-9-]+)/)?.[1] ?? null;
