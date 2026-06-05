-- Slash — subscriptions table
-- Run this in the Supabase Dashboard → SQL Editor (it needs elevated privileges
-- that the frontend publishable key does not have).
-- Columns mirror src/data/subscriptions.js (camelCase → snake_case).

create table if not exists public.subscriptions (
  id              text primary key,
  name            text not null,
  plan            text,
  category        text,
  amount          numeric not null default 0,
  billing_cycle   text not null default 'monthly',
  status          text not null default 'active',
  flagged         boolean not null default false,
  tone            text,
  icon            text,
  initials        text,
  last_charge_date date,
  start_date      date,
  last_usage      text,
  next_billing    text,
  total_paid      numeric not null default 0,
  yearly_cost     numeric not null default 0,
  warning_label   text,
  recommendation  text,
  created_at      timestamptz not null default now()
);

-- Row Level Security: lock the table, then explicitly allow public read.
-- (Module is a frontend shell — read-only public access is enough for now.)
alter table public.subscriptions enable row level security;

drop policy if exists "Public read access" on public.subscriptions;
create policy "Public read access"
  on public.subscriptions
  for select
  to anon, authenticated
  using (true);

-- Seed data (mirrors the 14 mock subscriptions).
insert into public.subscriptions
  (id, name, plan, category, amount, billing_cycle, status, flagged, tone, icon, initials,
   last_charge_date, start_date, last_usage, next_billing, total_paid, yearly_cost, warning_label, recommendation)
values
  ('netflix','Netflix','Premium Plan','Entertainment',55,'monthly','active',true,'#E50914','movie','N','2026-04-12','2022-03-15','2 weeks ago','Oct 12',2200,660,'Low usage detected','You have not used Netflix in the last 14 days. Cancelling now would save you ₪660 a year.'),
  ('spotify','Spotify','Family Plan','Music',35,'monthly','active',false,'#1DB954','music_note','S','2026-05-01','2021-11-10','today','Nov 1',1890,420,null,'You use Spotify daily — keep this one.'),
  ('adobe','Adobe','Creative Cloud','Work',120,'monthly','duplicate',false,'#FF0000','brush','A','2026-05-01','2024-06-01','4 weeks ago','Nov 1',2400,1440,'Price Increase','Adobe raised the monthly price last cycle. We detected a duplicate billing — review now.'),
  ('dropbox','Dropbox','Plus 2TB','Storage',40,'monthly','active',false,'#0061FF','cloud','D','2026-04-22','2023-02-01','3 days ago','Nov 22',1480,480,null,'Storage almost full — keep this plan.'),
  ('canva','Canva','Pro','Design',22,'monthly','active',false,'#00C4CC','palette','C','2026-05-03','2023-08-01','1 day ago','Nov 3',528,264,null,'Used regularly — no action needed.'),
  ('chatgpt','ChatGPT','Plus','AI',74,'monthly','active',false,'#10A37F','auto_awesome','C','2026-05-04','2023-02-01','today','Nov 4',2664,888,null,'You use ChatGPT every weekday — keep.'),
  ('icloud','Apple iCloud','200GB','Storage',12,'monthly','active',false,'#A2AAAD','icloud','i','2026-04-29','2020-10-01','today','Oct 29',720,144,null,'Backups are running — keep.'),
  ('google-one','Google One','2TB','Storage',38,'monthly','duplicate',false,'#4285F4','cloud_done','G','2026-05-01','2024-01-01','6 weeks ago','Nov 1',760,456,'Duplicate of iCloud','You also have Apple iCloud. Most of your files live there — drop Google One to save ₪456/year.'),
  ('monday','Monday.com','Pro','Work',85,'monthly','unused',false,'#FFCC00','view_kanban','M','2026-04-10','2023-09-15','3 months ago','Nov 10',1700,1020,'Not used recently','No activity in 90 days — strong candidate to cut.'),
  ('notion','Notion','Plus','Work',32,'monthly','active',false,'#FFFFFF','sticky_note_2','N','2026-05-02','2022-06-01','today','Nov 2',1024,384,null,'Used daily — keep.'),
  ('figma','Figma','Professional','Design',60,'monthly','active',false,'#A259FF','design_services','F','2026-04-28','2022-01-01','2 days ago','Oct 28',2160,720,null,'Active project use — keep.'),
  ('zoom','Zoom','Pro','Work',50,'monthly','unused',false,'#2D8CFF','videocam','Z','2026-04-20','2020-04-01','5 months ago','Nov 20',2400,600,'No calls in 5 months','Free tier covers your usage — consider cancelling.'),
  ('wix','Wix','Premium','Hosting',65,'monthly','active',false,'#FAAD4D','language','W','2026-04-15','2022-11-01','this week','Oct 15',2080,780,null,'Active site — keep.'),
  ('elementor','Elementor','Advanced','Design',28,'monthly','duplicate',false,'#92003B','extension','E','2026-04-30','2024-03-01','8 weeks ago','Oct 30',364,336,'Overlaps with Wix','Wix already covers what you need from Elementor.')
on conflict (id) do nothing;
