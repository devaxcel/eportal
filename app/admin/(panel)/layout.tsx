import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "../actions";
import { Logo } from "@/components/Logo";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { getStaff, serverClient } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/supabase/public";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  if (!supabaseConfigured()) return <SetupNotice />;

  const sb = await serverClient();
  const { data } = (await sb?.auth.getUser()) ?? { data: { user: null } };
  if (!data.user) redirect("/admin/login");

  const staff = await getStaff();
  if (!staff) {
    return (
      <div className="mx-auto mt-24 max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-extrabold">No dashboard access</h1>
        <p className="mt-2 text-sm text-ink-soft">{data.user.email} is signed in but has no editor or admin role. Ask an admin to add you.</p>
        <form action={signOut} className="mt-5"><button className="rounded-lg border border-line px-4 py-2 text-sm font-semibold hover:bg-mist">Sign out</button></form>
      </div>
    );
  }

  const nav = "rounded-lg px-3 py-1.5 text-sm font-semibold text-ink-soft hover:bg-mist hover:text-black";
  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/admin" aria-label="Dashboard home"><Logo /></Link>
          <nav className="ms-4 flex gap-1">
            <Link href="/admin" className={nav}>Solutions</Link>
            {staff.role === "admin" && <Link href="/admin/users" className={nav}>Users</Link>}
            <a href="/" target="_blank" rel="noopener noreferrer" className={nav}>View site ↗</a>
          </nav>
          <div className="ms-auto flex items-center gap-3 text-sm">
            <span className="text-ink-soft">{staff.email}</span>
            <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-brand-700">{staff.role}</span>
            <form action={signOut}><button className="rounded-lg border border-line px-3 py-1.5 font-semibold hover:bg-mist">Sign out</button></form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </>
  );
}
