import { notFound } from "next/navigation";
import { NewUserForm, UserRow } from "@/components/admin/UserParts";
import { getStaff, serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Users() {
  const staff = await getStaff();
  const sb = await serverClient();
  if (!staff || staff.role !== "admin" || !sb) notFound();

  const { data: users } = await sb.from("profiles").select("id, email, role").order("created_at");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Users</h1>
        <p className="mt-1 text-sm text-ink-soft">Editors can edit and save drafts. Admins can also publish, create solutions and manage users.</p>
      </div>
      <NewUserForm />
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[30rem] text-sm">
          <thead className="bg-mist text-left text-xs uppercase tracking-wide text-ink-soft"><tr><th className="p-3">Email</th><th className="p-3">Role</th><th className="p-3" /></tr></thead>
          <tbody>
            {(users ?? []).map((u) => <UserRow key={u.id} id={u.id} email={u.email} role={u.role} isMe={u.id === staff.id} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
