# ePortal dashboard: setup and use

The public website works without any setup, using the built-in content. The dashboard lets your team edit every section of every solution page, control SEO, and publish.

## One-time setup

1. **Create a Supabase project** at supabase.com (the free plan is enough).
2. **Create the tables.** Open **SQL Editor**, paste the contents of `supabase/schema.sql` and run it.
3. **Add the keys.** Copy `.env.example` to `.env.local` and fill in:
   - `SUPABASE_URL` and `SUPABASE_ANON_KEY` (Project Settings, API)
   - `SUPABASE_SERVICE_ROLE_KEY` (same page, keep it secret)
   - `SITE_URL` (for example `https://eportal.pk`)
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD` (your first login)
4. **Load today's content.** Run `npm run seed`. It copies the eight solutions (in all five languages) into the database and creates your admin login. It never overwrites a solution that already exists, so it is safe to run again.
5. **Add the same variables in Vercel** (Settings, Environment Variables) and redeploy. Leave them as *Sensitive*: none of them need the `NEXT_PUBLIC_` prefix, because the browser never uses them. Do not add `ADMIN_EMAIL` or `ADMIN_PASSWORD` there; they are only for the seed.
6. Sign in at `/admin`.

## Leads, bookings and analytics (second setup step)

After the first setup, run `supabase/002_leads_analytics_booking.sql` once in the Supabase SQL editor. It adds the tables for saved enquiries, demo bookings, opening hours and analytics. Until you run it the site keeps working; the new dashboard pages just show a setup hint.

1. **Email alerts (optional).** Create a free key at resend.com, then set `RESEND_API_KEY`, `NOTIFY_EMAIL` (who gets alerts) and `MAIL_FROM` in `.env.local` and in Vercel. Without them nothing is emailed, but every enquiry is still saved.
2. **Leads.** Every message and every booking appears under **Leads** with a status (New, Contacted, Won, Lost), private notes, one-click email, call and WhatsApp links, and a CSV download.
3. **Bookings.** Under **Availability** (admins) set the time zone, call length, weekly hours, minimum notice and days off, then tick *Let visitors book a demo call*. The demo page then shows a calendar. Times are shown to each visitor in their own time zone; the visitor and your team get an email with a calendar invitation, and the visitor gets a cancel link. Nobody can book a time that is taken.
4. **Analytics.** Counted by the site itself: page views, daily visitors, languages, countries, referring sites, devices, WhatsApp clicks and leads. It uses no cookies and keeps no IP address; a visitor is an anonymous hash that changes every day, and browsers that send Do Not Track are skipped. Open **Analytics** and pick 7, 30 or 90 days.

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

## Passwords

- **Your own:** open **Account** (top menu), enter the current password and a new one (12 characters or more).
- **A teammate who is locked out:** an admin opens **Users**, clicks **Set password** on that row and shares the new password securely.
- **If the only admin is locked out:** in Supabase open **Authentication, Users**, select the user and use the password recovery option. (Changing `ADMIN_PASSWORD` and re-running the seed does not change an existing user.)

## Good to know

- Visitors can only read published solutions. Drafts, users and roles are protected by row-level security in the database.
- The sitemap (`/sitemap.xml`) and `robots.txt` update automatically and list only published solutions.
- If the database cannot be reached, the site shows the built-in content instead of an error.
- SchoolDesk's long page (portals, apps, AI chat and so on) is still written in code. Its name, tagline, description, card and SEO come from the dashboard.
