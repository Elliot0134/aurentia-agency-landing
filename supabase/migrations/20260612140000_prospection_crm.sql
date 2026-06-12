-- CRM prospection agency (spec 2026-06-12-sequences-relances-n8n-design.md).
-- APPLIQUEE le 2026-06-12 via MCP Supabase (migration "prospection_crm_core").
-- Supabase = maitre, Notion = miroir. Service-role only : RLS active sans policy.
-- Prefixe prospection_ : ce projet Supabase est partage avec le SaaS Aurentia
-- (aurentia_prospection_* = feature SaaS distincte, ne pas confondre).

create table if not exists public.prospection_leads (
  id uuid primary key default gen_random_uuid(),
  source text not null check (source in ('outbound', 'inbound')),
  entreprise text,
  contact_name text,
  email text not null unique,
  phone text,
  site_url text,
  niche_id text,                -- page id Notion de la niche (config humaine, reste dans Notion)
  phase text not null default 'pre_audit' check (phase in ('pre_audit', 'audit', 'refonte')),
  statut_funnel text not null default 'nouveau' check (statut_funnel in (
    'nouveau', 'flash_envoye', 'en_sequence', 'repondu', 'a_trier', 'a_appeler',
    'nurture', 'stop', 'perdu', 'pro_paye', 'pro_envoye', 'gagne'
  )),
  gmail_thread_id text,         -- fil du pre-audit cold, cle du suivi des reponses
  notion_page_id text,          -- page miroir dans la DB Leads Notion
  assigned_to text,             -- responsable (elliot, olivier, stephane)
  statut_humain text,           -- remonte de Notion (Gagne/Perdu/A appeler apres call)
  notes text,                   -- remonte de Notion
  opt_out boolean not null default false,   -- a vie, jamais reactive
  bounce boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.prospection_leads enable row level security;
create index if not exists prospection_leads_statut_idx on public.prospection_leads (statut_funnel);
create index if not exists prospection_leads_phase_idx on public.prospection_leads (phase);
create index if not exists prospection_leads_updated_idx on public.prospection_leads (updated_at);

create table if not exists public.prospection_touches (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.prospection_leads(id) on delete cascade,
  type text not null check (type in (
    'flash', 'cold_1', 'cold_2', 'cold_3',
    'inbound_1', 'inbound_2', 'inbound_3', 'inbound_4', 'inbound_5',
    'refonte_1', 'refonte_2', 'refonte_3', 'refonte_4', 'refonte_5'
  )),
  channel text not null check (channel in ('gmail', 'resend')),
  sent_at timestamptz not null default now(),
  message_id text,
  template_version text,
  created_at timestamptz not null default now()
);
alter table public.prospection_touches enable row level security;
create index if not exists prospection_touches_lead_idx on public.prospection_touches (lead_id);
create index if not exists prospection_touches_sent_idx on public.prospection_touches (sent_at);

create table if not exists public.prospection_replies (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.prospection_leads(id) on delete cascade,
  gmail_message_id text unique,
  received_at timestamptz not null default now(),
  classification text not null check (classification in (
    'interesse', 'question', 'pas_interesse', 'stop', 'absent', 'bounce'
  )),
  confidence numeric(3,2),
  snippet text,
  created_at timestamptz not null default now()
);
alter table public.prospection_replies enable row level security;
create index if not exists prospection_replies_lead_idx on public.prospection_replies (lead_id);

create table if not exists public.prospection_config (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.prospection_config enable row level security;

insert into public.prospection_config (key, value) values
  ('sequences_paused', 'true'::jsonb),         -- demarre EN PAUSE (rollout palier 4 = activation)
  ('cold_daily_cap', '10'::jsonb),             -- cap initial, montee a 20-30 ensuite
  ('notion_sync_last_run', 'null'::jsonb)
on conflict (key) do nothing;

create or replace function public.prospection_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;
drop trigger if exists prospection_leads_touch on public.prospection_leads;
create trigger prospection_leads_touch before update on public.prospection_leads
  for each row execute function public.prospection_touch_updated_at();
drop trigger if exists prospection_config_touch on public.prospection_config;
create trigger prospection_config_touch before update on public.prospection_config
  for each row execute function public.prospection_touch_updated_at();
