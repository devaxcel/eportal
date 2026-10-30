-- ePortal dashboard schema. Run once in the Supabase SQL editor (Dashboard > SQL Editor > New query).
-- Public visitors can read only PUBLISHED solutions. Drafts, users and roles are staff-only.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'editor' check (role in ('admin', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.solutions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  status text not null default 'draft' check (status in ('draft', 'published')),
  sort integer not null default 100,
  published jsonb,                       -- what the public site shows
  published_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.solution_drafts (
  solution_id uuid primary key references public.solutions (id) on delete cascade,
  content jsonb not null,                -- what editors are working on
  updated_by uuid references auth.users (id),
  updated_at timestamptz not null default now()
);

-- Role lookup used by the policies below (runs with owner rights so it can read profiles).
create or replace function public.staff_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

alter table public.profiles enable row level security;
alter table public.solutions enable row level security;
alter table public.solution_drafts enable row level security;

-- profiles
drop policy if exists "profiles read" on public.profiles;
create policy "profiles read" on public.profiles for select to authenticated
  using (id = auth.uid() or public.staff_role() = 'admin');

drop policy if exists "profiles admin write" on public.profiles;
create policy "profiles admin write" on public.profiles for all to authenticated
  using (public.staff_role() = 'admin') with check (public.staff_role() = 'admin');

-- solutions: everyone sees published rows, staff see all, only admins change them (publish/unpublish)
drop policy if exists "solutions read" on public.solutions;
create policy "solutions read" on public.solutions for select to anon, authenticated
  using (status = 'published' or public.staff_role() in ('admin', 'editor'));

drop policy if exists "solutions admin write" on public.solutions;
create policy "solutions admin write" on public.solutions for all to authenticated
  using (public.staff_role() = 'admin') with check (public.staff_role() = 'admin');

-- drafts: staff only; editors can write drafts, only admins delete
drop policy if exists "drafts read" on public.solution_drafts;
create policy "drafts read" on public.solution_drafts for select to authenticated
  using (public.staff_role() in ('admin', 'editor'));

drop policy if exists "drafts insert" on public.solution_drafts;
create policy "drafts insert" on public.solution_drafts for insert to authenticated
  with check (public.staff_role() in ('admin', 'editor'));

drop policy if exists "drafts update" on public.solution_drafts;
create policy "drafts update" on public.solution_drafts for update to authenticated
  using (public.staff_role() in ('admin', 'editor')) with check (public.staff_role() in ('admin', 'editor'));

drop policy if exists "drafts delete" on public.solution_drafts;
create policy "drafts delete" on public.solution_drafts for delete to authenticated
  using (public.staff_role() = 'admin');
