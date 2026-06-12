-- APPLIQUÉE le 2026-06-12 via MCP Supabase (migration "audit_jobs_drive_url").
-- Archivage Drive des PDF Pro livrés (n8n) : URL du fichier Google Drive
-- une fois le PDF archivé. NULL = pas encore archivé (critère de la liste
-- GET /api/audit/jobs?status=delivered&tier=pro&archived=false).
alter table public.audit_jobs add column if not exists drive_url text;
comment on column public.audit_jobs.drive_url is 'URL Google Drive du PDF Pro archivé par n8n. NULL tant que non archivé.';
