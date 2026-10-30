import { LoginForm } from "@/components/admin/LoginForm";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { Logo } from "@/components/Logo";
import { supabaseConfigured } from "@/lib/supabase/public";

export default function LoginPage() {
  if (!supabaseConfigured()) return <SetupNotice />;
  return (
    <main className="mx-auto mt-24 w-full max-w-sm px-4">
      <div className="mb-6 flex justify-center"><Logo /></div>
      <div className="rounded-2xl border border-line bg-white p-7 shadow-sm">
        <h1 className="text-xl font-extrabold">Dashboard sign in</h1>
        <p className="mb-5 mt-1 text-sm text-ink-soft">For ePortal editors and admins.</p>
        <LoginForm />
      </div>
    </main>
  );
}
