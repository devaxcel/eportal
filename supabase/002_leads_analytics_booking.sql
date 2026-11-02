-- Run once in the Supabase SQL editor, after schema.sql.
-- Adds: saved enquiries (Leads), demo bookings with availability, and first-party analytics events.
-- All of these are written by the website's server (service role) and readable only by signed-in staff.

-- ---------------------------------------------------------------- enquiries
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  source text not null default 'form' check (source in ('form', 'booking')),
  solution text,
  name text not null,
  organisation text,
  phone text,
  email text,
  students text,
  message text,
  lang text,
  page text,
  status text not null default 'new' check (status in ('new', 'contacted', 'won', 'lost')),
  notes text,
  ip_hash text
);
create index if not exists enquiries_created_idx on public.enquiries (created_at desc);
create index if not exists enquiries_iphash_idx on public.enquiries (ip_hash, created_at desc);

-- ----------------------------------------------------------------- bookings
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  start_at timestamptz not null,
  end_at timestamptz not null,
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  name text not null,
  email text not null,
  phone text,
  organisation text,
  solution text,
  notes text,
  lang text,
  visitor_tz text,
  cancel_token text not null default replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
  enquiry_id uuid references public.enquiries (id) on delete set null
);
-- two confirmed bookings can never start at the same moment (blocks double booking)
create unique index if not exists bookings_one_per_slot on public.bookings (start_at) where status = 'confirmed';
create index if not exists bookings_start_idx on public.bookings (start_at);

create table if not exists public.booking_settings (
  id integer primary key default 1 check (id = 1),
  enabled boolean not null default true,
  timezone text not null default 'Asia/Karachi',
  slot_minutes integer not null default 30 check (slot_minutes between 10 and 240),
  min_notice_hours integer not null default 4 check (min_notice_hours between 0 and 336),
  max_days_ahead integer not null default 21 check (max_days_ahead between 1 and 120),
  weekly jsonb not null default '{"mon":[["10:00","17:00"]],"tue":[["10:00","17:00"]],"wed":[["10:00","17:00"]],"thu":[["10:00","17:00"]],"fri":[["10:00","13:00"],["14:30","17:00"]],"sat":[],"sun":[]}',
  blackout_dates text[] not null default '{}',
  meeting_info text not null default 'We will call you on the phone number you give us.',
  updated_at timestamptz not null default now()
);
insert into public.booking_settings (id) values (1) on conflict (id) do nothing;

-- ------------------------------------------------------------------- events
create table if not exists public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('view', 'whatsapp', 'enquiry', 'booking')),
  path text,
  lang text,
  solution text,
  referrer text,
  country text,
  device text,
  visitor text
);
create index if not exists events_created_idx on public.events (created_at desc);
create index if not exists events_kind_idx on public.events (kind, created_at desc);

-- ----------------------------------------------------------------- security
alter table public.enquiries enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_settings enable row level security;
alter table public.events enable row level security;

-- Staff read; the website server writes with the service role (which bypasses these policies).
drop policy if exists "enquiries staff read" on public.enquiries;
create policy "enquiries staff read" on public.enquiries for select to authenticated
  using (public.staff_role() in ('admin', 'editor'));
drop policy if exists "enquiries staff update" on public.enquiries;
create policy "enquiries staff update" on public.enquiries for update to authenticated
  using (public.staff_role() in ('admin', 'editor')) with check (public.staff_role() in ('admin', 'editor'));
drop policy if exists "enquiries admin delete" on public.enquiries;
create policy "enquiries admin delete" on public.enquiries for delete to authenticated
  using (public.staff_role() = 'admin');

drop policy if exists "bookings staff read" on public.bookings;
create policy "bookings staff read" on public.bookings for select to authenticated
  using (public.staff_role() in ('admin', 'editor'));
drop policy if exists "bookings admin update" on public.bookings;
create policy "bookings admin update" on public.bookings for update to authenticated
  using (public.staff_role() = 'admin') with check (public.staff_role() = 'admin');

drop policy if exists "settings staff read" on public.booking_settings;
create policy "settings staff read" on public.booking_settings for select to authenticated
  using (public.staff_role() in ('admin', 'editor'));
drop policy if exists "settings admin write" on public.booking_settings;
create policy "settings admin write" on public.booking_settings for update to authenticated
  using (public.staff_role() = 'admin') with check (public.staff_role() = 'admin');

drop policy if exists "events staff read" on public.events;
create policy "events staff read" on public.events for select to authenticated
  using (public.staff_role() in ('admin', 'editor'));
drop policy if exists "events admin delete" on public.events;
create policy "events admin delete" on public.events for delete to authenticated
  using (public.staff_role() = 'admin');

-- --------------------------------------------------------------- analytics
-- One call returns everything the Analytics page shows. Runs as the signed-in user, so staff-only.
create or replace function public.analytics_overview(days integer default 30)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  with e as (
    select * from public.events where created_at >= now() - make_interval(days => greatest(1, least(days, 365)))
  ),
  daily as (
    select (created_at at time zone 'UTC')::date as d,
           count(*) filter (where kind = 'view') as views,
           count(distinct visitor) filter (where kind = 'view') as visitors,
           count(*) filter (where kind in ('enquiry', 'booking')) as leads
    from e group by 1 order by 1
  )
  select jsonb_build_object(
    'visitors', (select count(distinct visitor) from e where kind = 'view'),
    'views', (select count(*) from e where kind = 'view'),
    'enquiries', (select count(*) from e where kind = 'enquiry'),
    'bookings', (select count(*) from e where kind = 'booking'),
    'whatsapp', (select count(*) from e where kind = 'whatsapp'),
    'daily', (select coalesce(jsonb_agg(to_jsonb(daily)), '[]'::jsonb) from daily),
    'pages', (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from (
        select path as label, count(*) as n from e where kind = 'view' group by 1 order by 2 desc limit 10) t),
    'solutions', (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from (
        select solution as label,
               count(*) filter (where kind = 'view') as views,
               count(*) filter (where kind in ('enquiry', 'booking')) as leads
        from e where solution is not null group by 1 order by 2 desc) t),
    'languages', (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from (
        select lang as label, count(distinct visitor) as n from e where kind = 'view' and lang is not null group by 1 order by 2 desc) t),
    'countries', (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from (
        select country as label, count(distinct visitor) as n from e where kind = 'view' and country is not null group by 1 order by 2 desc limit 10) t),
    'referrers', (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from (
        select referrer as label, count(distinct visitor) as n from e where kind = 'view' and referrer is not null group by 1 order by 2 desc limit 10) t),
    'devices', (select coalesce(jsonb_agg(to_jsonb(t)), '[]'::jsonb) from (
        select device as label, count(distinct visitor) as n from e where kind = 'view' and device is not null group by 1 order by 2 desc) t)
  )
$$;

-- Optional housekeeping: run now and then to keep the events table small.
create or replace function public.purge_old_events(keep_days integer default 400)
returns integer
language sql
security invoker
set search_path = public
as $$
  with gone as (delete from public.events where created_at < now() - make_interval(days => keep_days) returning 1)
  select count(*)::integer from gone
$$;
