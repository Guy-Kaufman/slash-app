-- Slash — allow writes to subscriptions (Module shell has no auth, so anon may
-- update). NOTE: this is intentionally permissive for the course project; a
-- production app would scope this to authenticated users / row ownership.
-- Run in the Supabase Dashboard → SQL Editor.

drop policy if exists "Public update access" on public.subscriptions;
create policy "Public update access"
  on public.subscriptions
  for update
  to anon, authenticated
  using (true)
  with check (true);
