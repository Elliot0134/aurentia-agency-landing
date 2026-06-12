-- APPLIQUÉE le 2026-06-12 via MCP Supabase.
-- Miroir CRM : Airtable remplace Notion (décision Elliot 2026-06-12).
-- Additif uniquement (projet Supabase partagé) : notion_page_id conservé mais déprécié.
alter table public.prospection_leads add column if not exists airtable_record_id text;
create index if not exists prospection_leads_airtable_idx on public.prospection_leads (airtable_record_id);
comment on column public.prospection_leads.airtable_record_id is 'Record id du miroir Airtable (recXXXX). Remplace notion_page_id (déprécié).';
