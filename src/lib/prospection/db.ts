import { defaultAirtableApi, formulaEscape, type AirtableApi, type AirtableRecord } from './airtable';
import type { LeadPhase, LeadSource, StatutFunnel } from './sequences';

/**
 * Couche données du CRM prospection sur Airtable (base maître depuis le
 * 2026-06-12, décision Elliot : Supabase ne garde que audit_jobs + storage).
 *
 * Principes :
 * - `ProspectionLead.id` EST le record id Airtable (recXXXX) : plus d'uuid,
 *   plus de miroir, l'humain édite Airtable directement.
 * - Les codes internes (nouveau, flash_envoye...) restent la langue du moteur ;
 *   la traduction vers les libellés Airtable (Nouveau, Flash envoyé...) se
 *   fait UNIQUEMENT ici, à la frontière (helpers testés ci-dessous).
 * - Le client AirtableApi est injecté en dernier paramètre (défaut : client
 *   env) — même pattern de testabilité que l'ancienne couche Supabase.
 */

/** Tables de la base Airtable (ids stables, insensibles au renommage). */
export const AIRTABLE_TABLES = {
  leads: 'tblwtKYIVLLl1Yosf',
  niches: 'tblWHeYzoUBRwaxYM',
  touches: 'tblVq7AHFd3dr7ukP',
  replies: 'tblB2mX0IE3Xq7deP',
  config: 'tblp1MhcjAoS79NWr',
} as const;

/** Les 14 types de touches (options du select Type de la table Touches). */
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

export type ReplyClassification =
  | 'interesse'
  | 'question'
  | 'pas_interesse'
  | 'stop'
  | 'absent'
  | 'bounce';

// ── Traduction codes internes ↔ libellés Airtable ──────────────────────────

const STATUT_FUNNEL_LABELS: Record<StatutFunnel, string> = {
  nouveau: 'Nouveau',
  flash_envoye: 'Flash envoyé',
  en_sequence: 'En séquence',
  repondu: 'Répondu',
  a_trier: 'À trier',
  a_appeler: 'À appeler',
  pro_paye: 'Pro payé',
  pro_envoye: 'Pro envoyé',
  gagne: 'Gagné',
  perdu: 'Perdu',
  nurture: 'Nurture',
  stop: 'Stop',
};

const STATUT_FUNNEL_BY_LABEL = new Map<string, StatutFunnel>(
  (Object.entries(STATUT_FUNNEL_LABELS) as Array<[StatutFunnel, string]>).map(([code, label]) => [label, code]),
);

export function statutFunnelToAirtable(statut: StatutFunnel): string {
  return STATUT_FUNNEL_LABELS[statut];
}

/** Libellé Airtable → code interne. Libellé inconnu = erreur (jamais deviné). */
export function statutFunnelFromAirtable(label: string): StatutFunnel {
  const statut = STATUT_FUNNEL_BY_LABEL.get(label);
  if (!statut) {
    throw new Error(
      `Statut funnel Airtable inconnu : "${label}". Options attendues : ${[...STATUT_FUNNEL_BY_LABEL.keys()].join(', ')}.`,
    );
  }
  return statut;
}

const SOURCE_LABELS: Record<LeadSource, string> = {
  outbound: 'Outbound',
  inbound: 'Inbound site',
};

export function sourceToAirtable(source: LeadSource): string {
  return SOURCE_LABELS[source];
}

export function sourceFromAirtable(label: string): LeadSource {
  if (label === SOURCE_LABELS.outbound) return 'outbound';
  if (label === SOURCE_LABELS.inbound) return 'inbound';
  throw new Error(`Source Airtable inconnue : "${label}". Options attendues : Outbound, Inbound site.`);
}

/**
 * Phase dérivée du statut funnel : Airtable n'a pas de champ Phase (l'ancien
 * schéma Supabase en avait un, indépendant). Dérivation actée :
 * - `pro_paye` → `audit` (gate humain en cours, JAMAIS de relance) ;
 * - `pro_envoye` / `gagne` → `refonte` (client : séquence refonte / terminé) ;
 * - tout le reste → `pre_audit`.
 */
export function phaseFromStatutFunnel(statut: StatutFunnel): LeadPhase {
  if (statut === 'pro_paye') return 'audit';
  if (statut === 'pro_envoye' || statut === 'gagne') return 'refonte';
  return 'pre_audit';
}

// ── Helpers de lecture des fields Airtable ──────────────────────────────────

function str(value: unknown): string | null {
  return typeof value === 'string' && value !== '' ? value : null;
}

function num(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function bool(value: unknown): boolean {
  return value === true; // checkbox Airtable décochée = champ absent
}

function firstLink(value: unknown): string | null {
  return Array.isArray(value) && typeof value[0] === 'string' ? value[0] : null;
}

// ── Leads ──────────────────────────────────────────────────────────────────

export interface ProspectionLead {
  /** Record id Airtable (recXXXX) : l'identifiant unique du lead. */
  id: string;
  source: LeadSource;
  entreprise: string | null;
  contactName: string | null;
  email: string;
  phone: string | null;
  siteUrl: string | null;
  nicheId: string | null;
  /** Dérivée du statut funnel (phaseFromStatutFunnel) : pas de champ Airtable. */
  phase: LeadPhase;
  statutFunnel: StatutFunnel;
  gmailThreadId: string | null;
  assignedTo: string | null;
  statutHumain: string | null;
  notes: string | null;
  scoreFlash: number | null;
  optOut: boolean;
  bounce: boolean;
  /** Champ "Dernier contact" (mis à jour par /touches/confirm). */
  dernierContact: string | null;
  createdAt: string;
}

function mapLead(record: AirtableRecord): ProspectionLead {
  const f = record.fields;
  const statutLabel = str(f['Statut funnel']);
  const statutFunnel = statutLabel === null ? 'nouveau' : statutFunnelFromAirtable(statutLabel);
  const sourceLabel = str(f.Source);
  if (sourceLabel === null) {
    throw new Error(`Lead Airtable ${record.id} sans Source : renseigner Outbound ou Inbound site.`);
  }
  return {
    id: record.id,
    source: sourceFromAirtable(sourceLabel),
    entreprise: str(f.Entreprise),
    contactName: str(f.Dirigeant),
    email: str(f.Email) ?? '',
    phone: str(f['Téléphone']),
    siteUrl: str(f.Site),
    nicheId: firstLink(f.Niche),
    phase: phaseFromStatutFunnel(statutFunnel),
    statutFunnel,
    gmailThreadId: str(f['Gmail Thread']),
    assignedTo: str(f['Assigné']),
    statutHumain: str(f['Statut humain']),
    notes: str(f.Notes),
    scoreFlash: num(f['Score Flash']),
    optOut: bool(f['Opt-out']),
    bounce: bool(f.Bounce),
    dernierContact: str(f['Dernier contact']),
    createdAt: record.createdTime,
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
  statutFunnel?: StatutFunnel;
  gmailThreadId?: string | null;
  assignedTo?: string | null;
  notes?: string | null;
  scoreFlash?: number | null;
  importId?: string | null;
}

/** Champs modifiables d'un lead (camelCase, traduits vers les champs FR). */
export type LeadPatch = Partial<
  Pick<
    ProspectionLead,
    | 'entreprise'
    | 'contactName'
    | 'phone'
    | 'siteUrl'
    | 'statutFunnel'
    | 'gmailThreadId'
    | 'assignedTo'
    | 'statutHumain'
    | 'notes'
    | 'scoreFlash'
    | 'optOut'
    | 'bounce'
    | 'dernierContact'
  >
>;

function leadPatchFields(patch: LeadPatch): Record<string, unknown> {
  const fields: Record<string, unknown> = {};
  if (patch.entreprise !== undefined) fields.Entreprise = patch.entreprise;
  if (patch.contactName !== undefined) fields.Dirigeant = patch.contactName;
  if (patch.phone !== undefined) fields['Téléphone'] = patch.phone;
  if (patch.siteUrl !== undefined) fields.Site = patch.siteUrl;
  if (patch.statutFunnel !== undefined) fields['Statut funnel'] = statutFunnelToAirtable(patch.statutFunnel);
  if (patch.gmailThreadId !== undefined) fields['Gmail Thread'] = patch.gmailThreadId;
  if (patch.assignedTo !== undefined) fields['Assigné'] = patch.assignedTo;
  if (patch.statutHumain !== undefined) fields['Statut humain'] = patch.statutHumain;
  if (patch.notes !== undefined) fields.Notes = patch.notes;
  if (patch.scoreFlash !== undefined) fields['Score Flash'] = patch.scoreFlash;
  if (patch.optOut !== undefined) fields['Opt-out'] = patch.optOut;
  if (patch.bounce !== undefined) fields.Bounce = patch.bounce;
  if (patch.dernierContact !== undefined) fields['Dernier contact'] = patch.dernierContact;
  return fields;
}

async function findOneLead(formula: string, at: AirtableApi): Promise<ProspectionLead | null> {
  const records = await at.listRecords(AIRTABLE_TABLES.leads, { filterByFormula: formula, maxRecords: 1 });
  if (records.length === 0) return null;
  return mapLead(records[0]);
}

export async function getLeadByEmail(
  email: string,
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionLead | null> {
  const normalized = email.trim().toLowerCase();
  return findOneLead(`LOWER({Email}) = '${formulaEscape(normalized)}'`, at);
}

export async function getLeadById(
  id: string,
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionLead | null> {
  const record = await at.getRecord(AIRTABLE_TABLES.leads, id);
  return record === null ? null : mapLead(record);
}

export async function getLeadByGmailThreadId(
  gmailThreadId: string,
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionLead | null> {
  return findOneLead(`{Gmail Thread} = '${formulaEscape(gmailThreadId)}'`, at);
}

/** Leads dont le statut funnel est dans `statuts`, triés par createdTime croissant. */
export async function listLeadsByStatus(
  statuts: readonly StatutFunnel[],
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionLead[]> {
  const clauses = statuts.map((s) => `{Statut funnel} = '${formulaEscape(statutFunnelToAirtable(s))}'`);
  const formula = clauses.length === 1 ? clauses[0] : `OR(${clauses.join(', ')})`;
  const records = await at.listRecords(AIRTABLE_TABLES.leads, { filterByFormula: formula });
  return records
    .map(mapLead)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));
}

export async function createLead(
  input: CreateLeadInput,
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionLead> {
  const fields: Record<string, unknown> = {
    Email: input.email.trim().toLowerCase(),
    Source: sourceToAirtable(input.source),
  };
  if (input.entreprise != null) fields.Entreprise = input.entreprise;
  if (input.contactName != null) fields.Dirigeant = input.contactName;
  if (input.phone != null) fields['Téléphone'] = input.phone;
  if (input.siteUrl != null) fields.Site = input.siteUrl;
  if (input.nicheId != null) fields.Niche = [input.nicheId];
  if (input.statutFunnel !== undefined) fields['Statut funnel'] = statutFunnelToAirtable(input.statutFunnel);
  if (input.gmailThreadId != null) fields['Gmail Thread'] = input.gmailThreadId;
  if (input.assignedTo != null) fields['Assigné'] = input.assignedTo;
  if (input.notes != null) fields.Notes = input.notes;
  if (input.scoreFlash != null) fields['Score Flash'] = input.scoreFlash;
  if (input.importId != null) fields['Import ID'] = input.importId;
  const [record] = await at.createRecords(AIRTABLE_TABLES.leads, [fields]);
  if (!record) throw new Error(`Création du lead ${input.email} : Airtable n'a retourné aucun record.`);
  return mapLead(record);
}

export async function updateLead(
  id: string,
  patch: LeadPatch,
  at: AirtableApi = defaultAirtableApi(),
): Promise<void> {
  const fields = leadPatchFields(patch);
  if (Object.keys(fields).length === 0) return;
  await at.updateRecord(AIRTABLE_TABLES.leads, id, fields);
}

// ── Niches ─────────────────────────────────────────────────────────────────

/**
 * Nom de la niche (champ primaire "Niche" de la table Niches), ou null si le
 * record n'existe pas ou n'a pas de nom. Sert au moteur de séquences pour
 * choisir la variante de copy cold (templates/nicheKeyFromName), avec un
 * cache par run côté engine : un fetch par niche, pas par lead.
 */
export async function getNicheName(
  nicheId: string,
  at: AirtableApi = defaultAirtableApi(),
): Promise<string | null> {
  const record = await at.getRecord(AIRTABLE_TABLES.niches, nicheId);
  return record === null ? null : str(record.fields.Niche);
}

// ── Touches ────────────────────────────────────────────────────────────────

export interface ProspectionTouch {
  id: string;
  /** Record id du lead lié. */
  leadId: string;
  type: TouchType;
  channel: TouchChannel;
  sentAt: string;
  messageId: string | null;
  templateVersion: string | null;
}

function assertTouchType(value: string | null, recordId: string): TouchType {
  if (value !== null && (TOUCH_TYPES as readonly string[]).includes(value)) return value as TouchType;
  throw new Error(`Touche Airtable ${recordId} avec un Type inconnu : "${String(value)}".`);
}

function assertTouchChannel(value: string | null, recordId: string): TouchChannel {
  if (value === 'gmail' || value === 'resend') return value;
  throw new Error(`Touche Airtable ${recordId} avec un Canal inconnu : "${String(value)}".`);
}

function mapTouch(record: AirtableRecord): ProspectionTouch {
  const f = record.fields;
  return {
    id: record.id,
    leadId: firstLink(f.Lead) ?? '',
    type: assertTouchType(str(f.Type), record.id),
    channel: assertTouchChannel(str(f.Canal), record.id),
    sentAt: str(f['Envoyé le']) ?? record.createdTime,
    messageId: str(f['Message ID']),
    templateVersion: str(f['Template version']),
  };
}

export interface InsertTouchInput {
  leadId: string;
  /** Libellé lisible du lead (entreprise) pour le champ primaire Touche. */
  leadLabel?: string | null;
  type: TouchType;
  channel: TouchChannel;
  sentAt?: string;
  messageId?: string | null;
  templateVersion?: string | null;
}

export async function insertTouch(
  input: InsertTouchInput,
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionTouch> {
  const fields: Record<string, unknown> = {
    Touche: `${input.type} ${input.leadLabel ?? input.leadId}`,
    Lead: [input.leadId],
    Type: input.type,
    Canal: input.channel,
    'Envoyé le': input.sentAt ?? new Date().toISOString(),
  };
  if (input.messageId != null) fields['Message ID'] = input.messageId;
  if (input.templateVersion != null) fields['Template version'] = input.templateVersion;
  const [record] = await at.createRecords(AIRTABLE_TABLES.touches, [fields]);
  if (!record) {
    throw new Error(`Insertion de la touche ${input.type} (lead ${input.leadId}) : aucun record retourné.`);
  }
  return mapTouch(record);
}

/**
 * Toutes les touches de la base. Le champ Lead est un lien : Airtable ne sait
 * pas filtrer par record id lié dans une formule, le filtrage par lead se
 * fait donc côté code (volumes CRM : quelques centaines de records).
 */
export async function listTouches(at: AirtableApi = defaultAirtableApi()): Promise<ProspectionTouch[]> {
  const records = await at.listRecords(AIRTABLE_TABLES.touches);
  return records.map(mapTouch);
}

/** Touches du lead, triées par sentAt croissant. */
export async function touchesForLead(
  leadId: string,
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionTouch[]> {
  const touches = await listTouches(at);
  return touches.filter((t) => t.leadId === leadId).sort((a, b) => a.sentAt.localeCompare(b.sentAt));
}

/**
 * Touche portant ce Message ID, ou null. Pas de contrainte d'unicité dans
 * Airtable : l'idempotence de /touches/confirm passe par ce check AVANT
 * insertion (comme avant).
 */
export async function findTouchByMessageId(
  messageId: string,
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionTouch | null> {
  const records = await at.listRecords(AIRTABLE_TABLES.touches, {
    filterByFormula: `{Message ID} = '${formulaEscape(messageId)}'`,
    maxRecords: 1,
  });
  if (records.length === 0) return null;
  return mapTouch(records[0]);
}

// ── Replies ────────────────────────────────────────────────────────────────

export interface ProspectionReply {
  id: string;
  leadId: string;
  gmailMessageId: string | null;
  receivedAt: string;
  classification: ReplyClassification;
  confidence: number | null;
  snippet: string | null;
}

const REPLY_CLASSIFICATIONS: readonly ReplyClassification[] = [
  'interesse',
  'question',
  'pas_interesse',
  'stop',
  'absent',
  'bounce',
];

function assertClassification(value: string | null, recordId: string): ReplyClassification {
  if (value !== null && (REPLY_CLASSIFICATIONS as readonly string[]).includes(value)) {
    return value as ReplyClassification;
  }
  throw new Error(`Réponse Airtable ${recordId} avec une Classification inconnue : "${String(value)}".`);
}

function mapReply(record: AirtableRecord): ProspectionReply {
  const f = record.fields;
  return {
    id: record.id,
    leadId: firstLink(f.Lead) ?? '',
    gmailMessageId: str(f['Gmail Message ID']),
    receivedAt: str(f['Reçu le']) ?? record.createdTime,
    classification: assertClassification(str(f.Classification), record.id),
    confidence: num(f.Confiance),
    snippet: str(f.Snippet),
  };
}

export interface InsertReplyInput {
  leadId: string;
  /** Libellé lisible du lead (entreprise) pour le champ primaire Réponse. */
  leadLabel?: string | null;
  gmailMessageId: string;
  classification: ReplyClassification;
  confidence?: number | null;
  snippet?: string | null;
  receivedAt?: string;
}

/**
 * Insère la réponse classifiée. PLUS de détection de doublon ici (Airtable
 * n'a pas de contrainte unique) : l'idempotence de /replies/classify passe
 * par findReplyByGmailMessageId AVANT insertion.
 */
export async function insertReply(
  input: InsertReplyInput,
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionReply> {
  const fields: Record<string, unknown> = {
    'Réponse': `${input.classification} ${input.leadLabel ?? input.leadId}`,
    Lead: [input.leadId],
    Classification: input.classification,
    'Gmail Message ID': input.gmailMessageId,
    'Reçu le': input.receivedAt ?? new Date().toISOString(),
  };
  if (input.confidence != null) fields.Confiance = input.confidence;
  if (input.snippet != null) fields.Snippet = input.snippet;
  const [record] = await at.createRecords(AIRTABLE_TABLES.replies, [fields]);
  if (!record) {
    throw new Error(`Insertion de la réponse ${input.gmailMessageId} : aucun record retourné.`);
  }
  return mapReply(record);
}

/** Réponse portant ce Gmail Message ID, ou null (idempotence de classify). */
export async function findReplyByGmailMessageId(
  gmailMessageId: string,
  at: AirtableApi = defaultAirtableApi(),
): Promise<ProspectionReply | null> {
  const records = await at.listRecords(AIRTABLE_TABLES.replies, {
    filterByFormula: `{Gmail Message ID} = '${formulaEscape(gmailMessageId)}'`,
    maxRecords: 1,
  });
  if (records.length === 0) return null;
  return mapReply(records[0]);
}

// ── Config ─────────────────────────────────────────────────────────────────

/**
 * Valeur (string) de la clé de config, ou null si la clé est absente.
 * Les valeurs Airtable sont du texte : 'true', 'false', '10'... La sémantique
 * (fail-closed du kill switch notamment) est portée par les consommateurs.
 */
export async function getConfig(key: string, at: AirtableApi = defaultAirtableApi()): Promise<string | null> {
  const records = await at.listRecords(AIRTABLE_TABLES.config, {
    filterByFormula: `{Clé} = '${formulaEscape(key)}'`,
    maxRecords: 1,
  });
  if (records.length === 0) return null;
  return str(records[0].fields.Valeur);
}

export async function setConfig(key: string, value: string, at: AirtableApi = defaultAirtableApi()): Promise<void> {
  const records = await at.listRecords(AIRTABLE_TABLES.config, {
    filterByFormula: `{Clé} = '${formulaEscape(key)}'`,
    maxRecords: 1,
  });
  if (records.length > 0) {
    await at.updateRecord(AIRTABLE_TABLES.config, records[0].id, { Valeur: value });
    return;
  }
  await at.createRecords(AIRTABLE_TABLES.config, [{ 'Clé': key, Valeur: value }]);
}
