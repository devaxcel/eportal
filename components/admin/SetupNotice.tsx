export function SetupNotice() {
  return (
    <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-line bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-extrabold">Connect Supabase to use the dashboard</h1>
      <p className="mt-3 text-ink-soft">The public website works without it, using the built-in content. The dashboard needs a Supabase project:</p>
      <ol className="mt-5 list-decimal space-y-2 ps-5 text-sm">
        <li>Create a project at supabase.com, then open <b>SQL Editor</b> and run <code className="rounded bg-mist px-1.5 py-0.5">supabase/schema.sql</code>.</li>
        <li>Copy <code className="rounded bg-mist px-1.5 py-0.5">.env.example</code> to <code className="rounded bg-mist px-1.5 py-0.5">.env.local</code> and fill in the three Supabase values, your site address and the first admin email and password.</li>
        <li>Run <code className="rounded bg-mist px-1.5 py-0.5">npm run seed</code> once. It copies today&apos;s content into the database and creates your admin login.</li>
        <li>Add the same variables in Vercel (Settings, Environment Variables) and redeploy.</li>
      </ol>
      <p className="mt-5 text-sm text-ink-soft">Full steps are in <code className="rounded bg-mist px-1.5 py-0.5">DASHBOARD.md</code>.</p>
    </div>
  );
}
