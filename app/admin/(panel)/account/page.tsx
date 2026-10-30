import { notFound } from "next/navigation";
import { AccountForm } from "@/components/admin/AccountForm";
import { getStaff } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Account() {
  const staff = await getStaff();
  if (!staff) notFound();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Your account</h1>
        <p className="mt-1 text-sm text-ink-soft">Signed in as <b>{staff.email}</b> ({staff.role}).</p>
      </div>
      <AccountForm />
    </div>
  );
}
