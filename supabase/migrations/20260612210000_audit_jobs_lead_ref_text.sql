-- APPLIQUÉE le 2026-06-12 via MCP Supabase (migration "audit_jobs_lead_ref_text").
-- Pivot CRM : Airtable devient la base maître des leads (décision Elliot
-- 2026-06-12). audit_jobs.lead_id référence désormais le record id Airtable
-- (recXXXX, text), plus un uuid prospection_leads. Les tables prospection_*
-- ne sont plus consommées par le backend (conservées en lecture historique).
alter table public.audit_jobs alter column lead_id type text using lead_id::text;
comment on column public.audit_jobs.lead_id is 'Record id Airtable du lead CRM (recXXXX). Ex-uuid prospection_leads avant le pivot Airtable du 2026-06-12.';
