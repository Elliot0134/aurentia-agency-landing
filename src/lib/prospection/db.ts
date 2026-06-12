import { supabaseAdmin } from '@/lib/supabase/admin';
import type { LeadPhase, LeadSource, StatutFunnel } from './sequences';

/**
 * Helpers CRUD typés autour des tables prospection_* (migration
 * 20260612140000_prospection_crm.sql). Service-role uniquement : RLS active
 * sans policy, seul le client admin injecté peut lire/écrire.
 *
 * Même pattern que src/lib/audit/jobs.ts : le client est injecté en paramètre
 * (défaut supabaseAdmin) pour la testabilité, les tests passent un fake
 * structurel sans réseau.
 */

export type ProspectionTable =
  | 'prospection_leads'
  | 'prospection_touches'
  | 'prospection_replies'
  | 'prospection_config';

/** Les 14 types de touches (check prospection_touches.type). */
export const TOUCH_TYPES = [
  'flash',
  'cold_1',
  'cold_2',
  'cold_3',
  'inbound_1',
  'inbound_2',
  'inbound_3',
  'inbound_4',
  'inbound_5',
  'refonte_1',
  'refonte_2',
  'refonte_3',
  'refonte_4',
  'refonte_5',
] as const;
export type TouchType = (typeof TOUCH_TYPES)[number];

export type TouchChannel = 'gmail' | 'resend';

interface DbError {
  message: string;
  /** Code Postgres (ex '23505' = violation d'unicité), exposé par PostgREST. */
  code?: string;
}

interface QueryResult {
  data: unknown;
  error: DbError | null;
}

/** Chaîne de filtres PostgREST utilisée ici (thenable, comme le vrai builder). */
export interface ProspectionQuery extends PromiseLike<QueryResult> {
  eq(column: string, value: string | boolean): ProspectionQuery;
  in(column: string, values: readonly string[]): ProspectionQuery;
  gte(column: string, value: string): ProspectionQuery;
  order(column: string, options: { ascending: boolean }): ProspectionQuery;
  limit(count: number): ProspectionQuery;
  maybeSingle(): PromiseLike<QueryResult>;
}

/**
 * Sous-ensemble structurel du client Supabase service-role utilisé ici.
 * Le vrai SupabaseClient y est assignable via `as unknown as ProspectionDb`
 * (même raison que AuditJobsDb : laisser TS vérifier les builders PostgREST
 * récursifs fait exploser l'inférence, TS2589).
 */
export interface ProspectionDb {
  from(table: ProspectionTable): {
    select(columns?: string): ProspectionQuery;
    insert(values: Record<string, unknown>): {
      select(): { single(): PromiseLike<QueryResult> };
    };
    update(values: Record<string, unknown>): {
      eq(column: string, value: string): PromiseLike<{ error: DbError | null }>;
    };
    upsert(
      values: Record<string, unknown>,
      options?: { onConflict?: string },
    ): PromiseLike<{ error: DbError | null }>;
  };
}

const adminDb: ProspectionDb = supabaseAdmin as unknown as ProspectionDb;

// ── Leads ──────────────────────────────────────────────────────────────────

export interface ProspectionLead {
  id: string;
  source: LeadSource;
  entreprise: string | null;
  contactName: string | null;
  email: string;
  phone: string | null;
  siteUrl: string | null;
  nicheId: string | null;
  phase: LeadPhase;
  statutFunnel: StatutFunnel;
  gmailThreadId: string | null;
  notionPageId: string | null;
  assignedTo: string | null;
  statutHumain: string | null;
  notes: string | null;
  optOut: boolean;
  bounce: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Ligne brute de prospection_leads (snake_case, telle que renvoyée par PostgREST). */
interface LeadRow {
  id: string;
  source: LeadSource;
  entreprise: string | null;
  contact_name: string | null;
  email: string;
  phone: string | null;
  site_url: string | null;
  niche_id: string | null;
  phase: LeadPhase;
  statut_funnel: StatutFunnel;
  gmail_thread_id: string | null;
  notion_page_id: string | null;
  assigned_to: string | null;
  statut_humain: string | null;
  notes: string | null;
  opt_out: boolean;
  bounce: boolean;
  created_at: string;
  updated_at: string;
}

function mapLead(row: LeadRow): ProspectionLead {
  return {
    id: row.id,
    source: row.source,
    entreprise: row.entreprise,
    contactName: row.contact_name,
    email: row.email,
    phone: row.phone,
    siteUrl: row.site_url,
    nicheId: row.niche_id,
    phase: row.phase,
    statutFunnel: row.statut_funnel,
    gmailThreadId: row.gmail_thread_id,
    notionPageId: row.notion_page_id,
    assignedTo: row.assigned_to,
    statutHumain: row.statut_humain,
    notes: row.notes,
    optOut: row.opt_out,
    bounce: row.bounce,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export interface CreateLeadInput {
  source: LeadSource;
  email: string;
  entreprise?: string | null;
  contactName?: string | null;
  phone?: string | null;
  siteUrl?: string | null;
  nicheId?: string | null;
  phase?: LeadPhase;
  statutFunnel?: StatutFunnel;
  gmailThreadId?: string | null;
  notionPageId?: string | null;
  assignedTo?: string | null;
}

/** Champs modifiables d'un lead (camelCase, mappés vers snake_case). */
export type LeadPatch = Partial<
  Pick<
    ProspectionLead,
    | 'entreprise'
    | 'contactName'
    | 'phone'
    | 'siteUrl'
    | 'phase'
    | 'statutFunnel'
    | 'gmailThreadId'
    | 'notionPageId'
    | 'assignedTo'
    | 'statutHumain'
    | 'notes'
    | 'optOut'
    | 'bounce'
  >
>;

const LEAD_PATCH_COLUMNS: Record<keyof Required<LeadPatch>, string> = {
  entreprise: 'entreprise',
  contactName: 'contact_name',
  phone: 'phone',
  siteUrl: 'site_url',
  phase: 'phase',
  statutFunnel: 'statut_funnel',
  gmailThreadId: 'gmail_thread_id',
  notionPageId: 'notion_page_id',
  assignedTo: 'assigned_to',
  statutHumain: 'statut_humain',
  notes: 'notes',
  optOut: 'opt_out',
  bounce: 'bounce',
};

async function leadByColumn(
  column: string,
  value: string,
  db: ProspectionDb,
): Promise<ProspectionLead | null> {
  const { data, error } = await db
    .from('prospection_leads')
    .select('*')
    .eq(column, value)
    .limit(1);
  if (error) throw new Error(`Lecture du lead (${column}=${value}) échouée : ${error.message}`);
  const rows = (data ?? []) as LeadRow[];
  if (rows.length === 0) return null;
  return mapLead(rows[0]);
}

export async function getLeadByEmail(email: string, db: ProspectionDb = adminDb): Promise<ProspectionLead | null> {
  return leadByColumn('email', email.trim().toLowerCase(), db);
}

export async function getLeadById(id: string, db: ProspectionDb = adminDb): Promise<ProspectionLead | null> {
  return leadByColumn('id', id, db);
}

export async function getLeadByGmailThreadId(
  gmailThreadId: string,
  db: ProspectionDb = adminDb,
): Promise<ProspectionLead | null> {
  return leadByColumn('gmail_thread_id', gmailThreadId, db);
}

export async function getLeadByNotionPageId(
  notionPageId: string,
  db: ProspectionDb = adminDb,
): Promise<ProspectionLead | null> {
  return leadByColumn('notion_page_id', notionPageId, db);
}

export async function createLead(input: CreateLeadInput, db: ProspectionDb = adminDb): Promise<ProspectionLead> {
  const values: Record<string, unknown> = {
    source: input.source,
    email: input.email.trim().toLowerCase(),
  };
  const optional: Array<[keyof CreateLeadInput, string]> = [
    ['entreprise', 'entreprise'],
    ['contactName', 'contact_name'],
    ['phone', 'phone'],
    ['siteUrl', 'site_url'],
    ['nicheId', 'niche_id'],
    ['phase', 'phase'],
    ['statutFunnel', 'statut_funnel'],
    ['gmailThreadId', 'gmail_thread_id'],
    ['notionPageId', 'notion_page_id'],
    ['assignedTo', 'assigned_to'],
  ];
  for (const [key, column] of optional) {
    if (input[key] !== undefined) values[column] = input[key];
  }
  const { data, error } = await db.from('prospection_leads').insert(values).select().single();
  if (error) throw new Error(`Création du lead ${input.email} échouée : ${error.message}`);
  if (!data) throw new Error('Création du lead : insert sans ligne retournée');
  return mapLead(data as LeadRow);
}

export async function updateLead(id: string, patch: LeadPatch, db: ProspectionDb = adminDb): Promise<void> {
  const values: Record<string, unknown> = {};
  for (const [key, column] of Object.entries(LEAD_PATCH_COLUMNS) as Array<[keyof LeadPatch, string]>) {
    const value = patch[key];
    if (value !== undefined) values[column] = value;
  }
  if (Object.keys(values).length === 0) return;
  const { error } = await db.from('prospection_leads').update(values).eq('id', id);
  if (error) throw new Error(`Mise à jour du lead ${id} échouée : ${error.message}`);
}

/** Leads dont le statut funnel est dans `statuts`, triés par created_at croissant. */
export async function listLeadsByStatus(
  statuts: readonly StatutFunnel[],
  db: ProspectionDb = adminDb,
): Promise<ProspectionLead[]> {
  const { data, error } = await db
    .from('prospection_leads')
    .select('*')
    .in('statut_funnel', statuts)
    .order('created_at', { ascending: true });
  if (error) throw new Error(`Lecture des leads par statut échouée : ${error.message}`);
  return ((data ?? []) as LeadRow[]).map(mapLead);
}

/**
 * Leads modifiés depuis `sinceIso` (updated_at >= since, inclusif), triés par
 * updated_at croissant, limités à `limit` (défaut 100) : n8n pagine en
 * réutilisant le serverTime de la réponse comme curseur suivant.
 */
export async function listLeadsChangedSince(
  sinceIso: string,
  db: ProspectionDb = adminDb,
  limit = 100,
): Promise<ProspectionLead[]> {
  const { data, error } = await db
    .from('prospection_leads')
    .select('*')
    .gte('updated_at', sinceIso)
    .order('updated_at', { ascending: true })
    .limit(limit);
  if (error) throw new Error(`Lecture des leads modifiés depuis ${sinceIso} échouée : ${error.message}`);
  return ((data ?? []) as LeadRow[]).map(mapLead);
}

// ── Touches ────────────────────────────────────────────────────────────────

export interface ProspectionTouch {
  id: string;
  leadId: string;
  type: TouchType;
  channel: TouchChannel;
  sentAt: string;
  messageId: string | null;
  templateVersion: string | null;
  createdAt: string;
}

interface TouchRow {
  id: string;
  lead_id: string;
  type: TouchType;
  channel: TouchChannel;
  sent_at: string;
  message_id: string | null;
  template_version: string | null;
  created_at: string;
}

function mapTouch(row: TouchRow): ProspectionTouch {
  return {
    id: row.id,
    leadId: row.lead_id,
    type: row.type,
    channel: row.channel,
    sentAt: row.sent_at,
    messageId: row.message_id,
    templateVersion: row.template_version,
    createdAt: row.created_at,
  };
}

export interface InsertTouchInput {
  leadId: string;
  type: TouchType;
  channel: TouchChannel;
  sentAt?: string;
  messageId?: string | null;
  templateVersion?: string | null;
}

export async function insertTouch(input: InsertTouchInput, db: ProspectionDb = adminDb): Promise<ProspectionTouch> {
  const values: Record<string, unknown> = {
    lead_id: input.leadId,
    type: input.type,
    channel: input.channel,
  };
  if (input.sentAt !== undefined) values.sent_at = input.sentAt;
  if (input.messageId !== undefined) values.message_id = input.messageId;
  if (input.templateVersion !== undefined) values.template_version = input.templateVersion;
  const { data, error } = await db.from('prospection_touches').insert(values).select().single();
  if (error) throw new Error(`Insertion de la touche ${input.type} (lead ${input.leadId}) échouée : ${error.message}`);
  if (!data) throw new Error('Insertion de la touche : insert sans ligne retournée');
  return mapTouch(data as TouchRow);
}

export async function touchesForLead(leadId: string, db: ProspectionDb = adminDb): Promise<ProspectionTouch[]> {
  const { data, error } = await db
    .from('prospection_touches')
    .select('*')
    .eq('lead_id', leadId)
    .order('sent_at', { ascending: true });
  if (error) throw new Error(`Lecture des touches du lead ${leadId} échouée : ${error.message}`);
  return ((data ?? []) as TouchRow[]).map(mapTouch);
}

/**
 * Touche portant ce message_id, ou null. message_id n'a pas de contrainte
 * d'unicité en DB : l'idempotence de /touches/confirm passe par ce check
 * AVANT insertion.
 */
export async function findTouchByMessageId(
  messageId: string,
  db: ProspectionDb = adminDb,
): Promise<ProspectionTouch | null> {
  const { data, error } = await db
    .from('prospection_touches')
    .select('*')
    .eq('message_id', messageId)
    .limit(1);
  if (error) throw new Error(`Recherche de la touche message_id=${messageId} échouée : ${error.message}`);
  const rows = (data ?? []) as TouchRow[];
  if (rows.length === 0) return null;
  return mapTouch(rows[0]);
}

// ── Replies ────────────────────────────────────────────────────────────────

export type ReplyClassification =
  | 'interesse'
  | 'question'
  | 'pas_interesse'
  | 'stop'
  | 'absent'
  | 'bounce';

export interface ProspectionReply {
  id: string;
  leadId: string;
  gmailMessageId: string | null;
  receivedAt: string;
  classification: ReplyClassification;
  confidence: number | null;
  snippet: string | null;
  createdAt: string;
}

interface ReplyRow {
  id: string;
  lead_id: string;
  gmail_message_id: string | null;
  received_at: string;
  classification: ReplyClassification;
  confidence: number | null;
  snippet: string | null;
  created_at: string;
}

export interface InsertReplyInput {
  leadId: string;
  gmailMessageId: string;
  classification: ReplyClassification;
  confidence?: number | null;
  snippet?: string | null;
  receivedAt?: string;
}

export interface InsertReplyResult {
  /** true si gmail_message_id existait déjà (contrainte unique) : rien inséré. */
  duplicate: boolean;
  reply: ProspectionReply | null;
}

/**
 * Insère la réponse classifiée. Idempotence portée par la contrainte UNIQUE
 * sur gmail_message_id : un conflit (code Postgres 23505) n'est PAS une
 * erreur, il signale un event Gmail déjà traité.
 */
export async function insertReply(input: InsertReplyInput, db: ProspectionDb = adminDb): Promise<InsertReplyResult> {
  const values: Record<string, unknown> = {
    lead_id: input.leadId,
    gmail_message_id: input.gmailMessageId,
    classification: input.classification,
  };
  if (input.confidence !== undefined) values.confidence = input.confidence;
  if (input.snippet !== undefined) values.snippet = input.snippet;
  if (input.receivedAt !== undefined) values.received_at = input.receivedAt;
  const { data, error } = await db.from('prospection_replies').insert(values).select().single();
  if (error) {
    if (error.code === '23505' || error.message.includes('duplicate key')) {
      return { duplicate: true, reply: null };
    }
    throw new Error(`Insertion de la réponse ${input.gmailMessageId} échouée : ${error.message}`);
  }
  if (!data) throw new Error('Insertion de la réponse : insert sans ligne retournée');
  const row = data as ReplyRow;
  return {
    duplicate: false,
    reply: {
      id: row.id,
      leadId: row.lead_id,
      gmailMessageId: row.gmail_message_id,
      receivedAt: row.received_at,
      classification: row.classification,
      confidence: row.confidence,
      snippet: row.snippet,
      createdAt: row.created_at,
    },
  };
}

// ── Config ─────────────────────────────────────────────────────────────────

/** Valeur jsonb de la clé de config, ou null si la clé est absente. */
export async function getConfig(key: string, db: ProspectionDb = adminDb): Promise<unknown> {
  const { data, error } = await db.from('prospection_config').select('value').eq('key', key).maybeSingle();
  if (error) throw new Error(`Lecture de la config ${key} échouée : ${error.message}`);
  if (!data) return null;
  return (data as { value: unknown }).value;
}

export async function setConfig(key: string, value: unknown, db: ProspectionDb = adminDb): Promise<void> {
  const { error } = await db
    .from('prospection_config')
    .upsert({ key, value }, { onConflict: 'key' });
  if (error) throw new Error(`Écriture de la config ${key} échouée : ${error.message}`);
}
