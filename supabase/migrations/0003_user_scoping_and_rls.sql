-- Slash — make subscriptions private, per-user, and protected by RLS.
-- Run in the Supabase Dashboard → SQL Editor.
--
-- Before this migration the table was a single shared list with fully-open
-- (anon) read/write policies. Here we attach every row to its owner
-- (auth.users) and replace the open policies with owner-only ones.

-- 1. Ownership + a human-readable slug (the old text id, e.g. 'netflix').
alter table public.subscriptions
  add column if not exists user_id uuid references auth.users (id) on delete cascade,
  add column if not exists slug text;

-- 2. Drop the legacy shared seed rows (they have no owner and would be invisible
--    under the new RLS anyway). New users are seeded per-account by the app.
delete from public.subscriptions where user_id is null;

-- 3. Each user only ever sees / mutates their own rows.
create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);

alter table public.subscriptions enable row level security;

drop policy if exists "Public read access" on public.subscriptions;
drop policy if exists "Public update access" on public.subscriptions;
drop policy if exists "Own subscriptions select" on public.subscriptions;
drop policy if exists "Own subscriptions insert" on public.subscriptions;
drop policy if exists "Own subscriptions update" on public.subscriptions;
drop policy if exists "Own subscriptions delete" on public.subscriptions;

create policy "Own subscriptions select"
  on public.subscriptions for select
  to authenticated using (auth.uid() = user_id);

create policy "Own subscriptions insert"
  on public.subscriptions for insert
  to authenticated with check (auth.uid() = user_id);

create policy "Own subscriptions update"
  on public.subscriptions for update
  to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Own subscriptions delete"
  on public.subscriptions for delete
  to authenticated using (auth.uid() = user_id);
