-- Slash — cancellations ledger.
-- Run in the Supabase Dashboard → SQL Editor (after 0003).
--
-- One row per cancelled subscription: the audit trail of what the user cut and
-- how much it saves them. This creates the second relationship in the data
-- model:  auth.users 1──∞ subscriptions 1──∞ cancellations.

create table if not exists public.cancellations (
  id              uuid primary key default gen_random_uuid(),
  subscription_id text references public.subscriptions (id) on delete cascade,
  user_id         uuid not null references auth.users (id) on delete cascade,
  monthly_amount  numeric not null default 0,
  yearly_saving   numeric not null default 0,
  reason          text,
  letter_text     text,
  created_at      timestamptz not null default now()
);

create index if not exists cancellations_user_id_idx on public.cancellations (user_id);

alter table public.cancellations enable row level security;

drop policy if exists "Own cancellations select" on public.cancellations;
drop policy if exists "Own cancellations insert" on public.cancellations;
drop policy if exists "Own cancellations delete" on public.cancellations;

create policy "Own cancellations select"
  on public.cancellations for select
  to authenticated using (auth.uid() = user_id);

create policy "Own cancellations insert"
  on public.cancellations for insert
  to authenticated with check (auth.uid() = user_id);

create policy "Own cancellations delete"
  on public.cancellations for delete
  to authenticated using (auth.uid() = user_id);
