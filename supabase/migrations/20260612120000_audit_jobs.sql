-- Jobs du moteur d'audit micro-SaaS (Flash gratuit / Pro 99 EUR HT).
-- Service-role uniquement : RLS active sans policy anon.
create table if not exists public.audit_jobs (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid,
  email text not null,
  url text not null,
  tier text not null check (tier in ('flash', 'pro')),
  channel text not null default 'inbound' check (channel in ('inbound', 'cold')),
  status text not null default 'queued' check (status in (
    'queued', 'running', 'ready_to_send', 'ready_for_review',
    'delivered', 'failed', 'refunded'
  )),
  stripe_session_id text unique,
  workflow_run_id text,
  score int,
  impact_percent int,
  writer_model text,
  subject text,
  html text,
  pdf_path text,
  error text,
  review_token text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.audit_jobs enable row level security;
create index if not exists audit_jobs_status_idx on public.audit_jobs (status);
create index if not exists audit_jobs_email_idx on public.audit_jobs (email);

create or replace function public.audit_jobs_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;
drop trigger if exists audit_jobs_touch on public.audit_jobs;
create trigger audit_jobs_touch before update on public.audit_jobs
  for each row execute function public.audit_jobs_touch_updated_at();
