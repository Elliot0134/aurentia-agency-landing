import { supabaseAdmin } from '@/lib/supabase/admin';

/**
 * Helpers typés autour de la table `audit_jobs` (migration
 * 20260612120000_audit_jobs.sql). Service-role uniquement : la table a RLS
 * sans policy anon, seul le client admin injecté peut lire/écrire.
 *
 * Le client est injecté en paramètre (défaut : supabaseAdmin) pour la
 * testabilité : les tests passent un fake structurel sans réseau.
 */

export type AuditTier = 'flash' | 'pro';
export type AuditChannel = 'inbound' | 'cold';
export type AuditJobStatus =
  | 'queued'
  | 'running'
  | 'ready_to_send'
  | 'ready_for_review'
  | 'delivered'
  | 'failed'
  | 'refunded';

export interface AuditJob {
  id: string;
  leadId: string | null;
  email: string;
  url: string;
  tier: AuditTier;
  channel: AuditChannel;
  status: AuditJobStatus;
  stripeSessionId: string | null;
  workflowRunId: string | null;
  score: number | null;
  impactPercent: number | null;
  writerModel: string | null;
  subject: string | null;
  html: string | null;
  pdfPath: string | null;
  error: string | null;
  reviewToken: string | null;
  createdAt: string;
  updatedAt: string;
}

/** Ligne brute de la table (snake_case, telle que renvoyée par PostgREST). */
interface AuditJobRow {
  id: string;
  lead_id: string | null;
  email: string;
  url: string;
  tier: AuditTier;
  channel: AuditChannel;
  status: AuditJobStatus;
  stripe_session_id: string | null;
  workflow_run_id: string | null;
  score: number | null;
  impact_percent: number | null;
  writer_model: string | null;
  subject: string | null;
  html: string | null;
  pdf_path: string | null;
  error: string | null;
  review_token: string | null;
  created_at: string;
  updated_at: string;
}

interface DbError {
  message: string;
}

/**
 * Sous-ensemble structurel du client Supabase utilisé ici (même pattern que
 * AuditStorageClient dans run-flash.ts). Le vrai SupabaseClient service-role
 * y est assignable ; les tests injectent un fake objet sans réseau.
 */
export interface AuditJobsDb {
  from(table: 'audit_jobs'): {
    insert(values: Record<string, unknown>): {
      select(): {
        single(): PromiseLike<{ data: unknown; error: DbError | null }>;
      };
    };
    select(columns?: string): {
      eq(
        column: string,
        value: string,
      ): {
        maybeSingle(): PromiseLike<{ data: unknown; error: DbError | null }>;
        order(
          column: string,
          options: { ascending: boolean },
        ): {
          limit(count: number): PromiseLike<{ data: unknown; error: DbError | null }>;
        };
        eq(
          column: string,
          value: string,
        ): {
          in(
            column: string,
            values: readonly string[],
          ): {
            limit(count: number): PromiseLike<{ data: unknown; error: DbError | null }>;
          };
        };
      };
    };
    update(values: Record<string, unknown>): {
      eq(column: string, value: string): PromiseLike<{ error: DbError | null }>;
    };
  };
}

export interface CreateJobInput {
  email: string;
  url: string;
  tier: AuditTier;
  channel: AuditChannel;
  stripeSessionId?: string;
  /** Lead CRM prospection à l'origine du job (colonne lead_id, intake WF0). */
  leadId?: string;
}

/** Champs modifiables d'un job (camelCase, mappés vers snake_case). */
export type AuditJobPatch = Partial<
  Pick<
    AuditJob,
    | 'status'
    | 'workflowRunId'
    | 'score'
    | 'impactPercent'
    | 'writerModel'
    | 'subject'
    | 'html'
    | 'pdfPath'
    | 'error'
    | 'reviewToken'
  >
>;

function mapRow(row: AuditJobRow): AuditJob {
  return {
    id: row.id,
    leadId: row.lead_id,
    email: row.email,
    url: row.url,
    tier: row.tier,
    channel: row.channel,
    status: row.status,
    stripeSessionId: row.stripe_session_id,
    workflowRunId: row.workflow_run_id,
    score: row.score,
    impactPercent: row.impact_percent,
    writerModel: row.writer_model,
    subject: row.subject,
    html: row.html,
    pdfPath: row.pdf_path,
    error: row.error,
    reviewToken: row.review_token,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Le SupabaseClient complet est structurellement compatible avec AuditJobsDb,
 * mais laisser TS le vérifier fait exploser l'inférence (TS2589 : les builders
 * PostgREST sont des génériques profondément récursifs). On réduit donc
 * explicitement le client admin au sous-ensemble utilisé.
 */
const adminDb: AuditJobsDb = supabaseAdmin as unknown as AuditJobsDb;

const PATCH_COLUMNS: Record<keyof Required<AuditJobPatch>, string> = {
  status: 'status',
  workflowRunId: 'workflow_run_id',
  score: 'score',
  impactPercent: 'impact_percent',
  writerModel: 'writer_model',
  subject: 'subject',
  html: 'html',
  pdfPath: 'pdf_path',
  error: 'error',
  reviewToken: 'review_token',
};

export async function createJob(input: CreateJobInput, db: AuditJobsDb = adminDb): Promise<AuditJob> {
  const values: Record<string, unknown> = {
    email: input.email,
    url: input.url,
    tier: input.tier,
    channel: input.channel,
  };
  if (input.stripeSessionId !== undefined) values.stripe_session_id = input.stripeSessionId;
  if (input.leadId !== undefined) values.lead_id = input.leadId;

  const { data, error } = await db.from('audit_jobs').insert(values).select().single();
  if (error) throw new Error(`Création du job d'audit échouée : ${error.message}`);
  if (!data) throw new Error("Création du job d'audit : insert sans ligne retournée");
  return mapRow(data as AuditJobRow);
}

export async function getJob(id: string, db: AuditJobsDb = adminDb): Promise<AuditJob | null> {
  const { data, error } = await db.from('audit_jobs').select().eq('id', id).maybeSingle();
  if (error) throw new Error(`Lecture du job d'audit ${id} échouée : ${error.message}`);
  if (!data) return null;
  return mapRow(data as AuditJobRow);
}

/**
 * Dernier job (tous tiers) créé pour cet email, ou null. Utilisé par le
 * webhook Stripe : le Payment Link ne porte pas l'URL du site, on la reprend
 * du dernier job de l'acheteur (typiquement son Flash).
 */
export async function findLatestJobByEmail(email: string, db: AuditJobsDb = adminDb): Promise<AuditJob | null> {
  const { data, error } = await db
    .from('audit_jobs')
    .select()
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1);
  if (error) throw new Error(`Recherche du dernier job de ${email} échouée : ${error.message}`);
  const rows = (data ?? []) as AuditJobRow[];
  if (rows.length === 0) return null;
  return mapRow(rows[0]);
}

/**
 * Statuts considérés comme « actifs » pour la garde anti-doublon de l'intake :
 * tout sauf `failed`/`refunded` (échecs terminaux, un retry est légitime).
 * Inclut `delivered` : un Flash déjà livré ne doit JAMAIS être regénéré ni
 * renvoyé au prospect.
 */
const ACTIVE_FLASH_JOB_STATUSES: readonly AuditJobStatus[] = [
  'queued',
  'running',
  'ready_to_send',
  'ready_for_review',
  'delivered',
];

/**
 * Job `flash` actif (statut non terminal-échec) pour ce lead, ou null.
 * Garde anti-doublon de l'intake (WF0) : un lead cold reste `nouveau` jusqu'à
 * /touches/confirm, donc sans cette garde le cron horaire relancerait un
 * deuxième Flash pour le même lead (double envoi au prospect).
 */
export async function findActiveFlashJobByLeadId(leadId: string, db: AuditJobsDb = adminDb): Promise<AuditJob | null> {
  const { data, error } = await db
    .from('audit_jobs')
    .select()
    .eq('lead_id', leadId)
    .eq('tier', 'flash')
    .in('status', ACTIVE_FLASH_JOB_STATUSES)
    .limit(1);
  if (error) throw new Error(`Recherche du job flash actif du lead ${leadId} échouée : ${error.message}`);
  const rows = (data ?? []) as AuditJobRow[];
  if (rows.length === 0) return null;
  return mapRow(rows[0]);
}

/** Job déjà créé pour cette session Checkout, ou null (idempotence webhook). */
export async function findJobByStripeSessionId(sessionId: string, db: AuditJobsDb = adminDb): Promise<AuditJob | null> {
  const { data, error } = await db.from('audit_jobs').select().eq('stripe_session_id', sessionId).maybeSingle();
  if (error) throw new Error(`Recherche du job de la session Stripe ${sessionId} échouée : ${error.message}`);
  if (!data) return null;
  return mapRow(data as AuditJobRow);
}

export async function updateJob(id: string, patch: AuditJobPatch, db: AuditJobsDb = adminDb): Promise<void> {
  const values: Record<string, unknown> = {};
  for (const [key, column] of Object.entries(PATCH_COLUMNS) as Array<[keyof AuditJobPatch, string]>) {
    const value = patch[key];
    if (value !== undefined) values[column] = value;
  }
  if (Object.keys(values).length === 0) return;

  const { error } = await db.from('audit_jobs').update(values).eq('id', id);
  if (error) throw new Error(`Mise à jour du job d'audit ${id} échouée : ${error.message}`);
}
