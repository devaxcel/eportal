# ePortal dashboard: setup and use

The public website works without any setup, using the built-in content. The dashboard lets your team edit every section of every solution page, control SEO, and publish.

## One-time setup

1. **Create a Supabase project** at supabase.com (the free plan is enough).
2. **Create the tables.** Open **SQL Editor**, paste the contents of `supabase/schema.sql` and run it.
3. **Add the keys.** Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings, API)
   - `SUPABASE_SERVICE_ROLE_KEY` (same page, keep it secret)
   - `NEXT_PUBLIC_SITE_URL` (for example `https://eportal.pk`)
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD` (your first login)
4. **Load today's content.** Run `npm run seed`. It copies the eight solutions (in all five languages) into the database and creates your admin login. It never overwrites a solution that already exists, so it is safe to run again.
5. **Add the same variables in Vercel** (Settings, Environment Variables) and redeploy. Do not add `ADMIN_EMAIL` or `ADMIN_PASSWORD` there; they are only for the seed.
6. Sign in at `/admin`.

## Using it

| Role | Can do |
|---|---|
| **Editor** | Edit content and SEO, save drafts, preview drafts |
| **Admin** | Everything an editor can, plus publish, unpublish, create and delete solutions, reorder, manage users |

- **Content tab:** name, tagline, description, icon, colour, dashboard picture, features, audiences.
- **Sections tab:** show or hide each section of the page, and edit the statement, before and after points and FAQs.
- **SEO tab:** per language SEO title, meta description, keywords and schema (JSON-LD), plus a share image. Leave schema empty to use the automatic one (software, breadcrumbs and FAQ). A Google preview and validation are built in.
- **Language buttons** switch which language you are editing. A blank Spanish, Dutch or Arabic field falls back to the built-in translation, then to English.
- **Save draft** stores your work privately. **Preview** shows the saved draft exactly as visitors will see it. **Publish** (admins) makes it live within seconds. **Unpublish** hides the solution from the whole site.

## Good to know

- Visitors can only read published solutions. Drafts, users and roles are protected by row-level security in the database.
- The sitemap (`/sitemap.xml`) and `robots.txt` update automatically and list only published solutions.
- If the database cannot be reached, the site shows the built-in content instead of an error.
- eSchool's long page (portals, apps, AI chat and so on) is still written in code. Its name, tagline, description, card and SEO come from the dashboard.
