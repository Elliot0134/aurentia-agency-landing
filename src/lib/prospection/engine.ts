import {
  isSequenceStopped,
  nextDueStep,
  sequenceKindForLead,
  type LeadPhase,
  type LeadSource,
  type SequenceKind,
  type StatutFunnel,
} from './sequences';
import { DEFAULT_AUDIT_URL, DEFAULT_CAL_URL, renderTemplate } from './templates';
import { lintEmail } from './linter';

/**
 * Calcul des envois dus du jour (spec 2026-06-12-sequences-relances-n8n-design.md
 * §5 WF2 et §7). Le moteur est PUR : il lit Supabase et retourne des payloads,
 * il n'envoie rien et n'écrit rien. n8n (WF2) envoie puis confirme via
 * /touches/confirm ; rejouer computeDueSends est donc toujours sans risque.
 *
 * Garde-fous implémentés ici :
 * - kill switch global `sequences_paused` (fail-closed : clé absente = pause) ;
 * - idempotence : un lead déjà touché aujourd'hui (jour civil Europe/Paris)
 *   ne reçoit rien de plus ;
 * - cap cold quotidien `cold_daily_cap` : pré-audits ET relances Gmail
 *   confondus (les touches gmail déjà parties aujourd'hui consomment le cap) ;
 * - linter d'envoi bloquant : toute violation met le lead en skipped.
 */

interface DbError {
  message: string;
}

interface QueryResult {
  data: unknown;
  error: DbError | null;
}

/** Chaîne de filtres PostgREST utilisée ici (thenable, comme le vrai builder). */
export interface SequencesQuery extends PromiseLike<QueryResult> {
  in(column: string, values: readonly string[]): SequencesQuery;
  eq(column: string, value: string | boolean): SequencesQuery;
  gte(column: string, value: string): SequencesQuery;
}

/**
 * Sous-ensemble structurel du client Supabase service-role (même pattern que
 * AuditJobsDb dans src/lib/audit/jobs.ts) : le vrai client y est assignable
 * via `as unknown as SequencesDb`, les tests injectent un fake sans réseau.
 */
export interface SequencesDb {
  from(table: 'prospection_leads' | 'prospection_touches' | 'prospection_config'): {
    select(columns?: string): SequencesQuery;
  };
}

interface LeadRow {
  id: string;
  source: LeadSource;
  entreprise: string | null;
  contact_name: string | null;
  email: string;
  site_url: string | null;
  phase: LeadPhase;
  statut_funnel: StatutFunnel;
  gmail_thread_id: string | null;
  opt_out: boolean;
  bounce: boolean;
  created_at: string;
  updated_at: string;
}

interface TouchRow {
  lead_id: string;
  type: string;
  channel: 'gmail' | 'resend';
  sent_at: string;
}

interface ConfigRow {
  key: string;
  value: unknown;
}

export interface DuePayload {
  leadId: string;
  email: string;
  type: string;
  channel: 'gmail' | 'resend';
  gmailThreadId: string | null;
  subject: string;
  html: string;
  text: string;
  templateVersion: string;
}

export interface SkippedLead {
  leadId: string;
  reason: string;
}

const DAY_MS = 86_400_000;

/** Statuts funnel candidats à une relance automatique. */
const CANDIDATE_STATUTS: readonly string[] = ['flash_envoye', 'en_sequence'];

const PARIS_DAY_FORMAT = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Paris',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Jour civil Europe/Paris (`YYYY-MM-DD`) d'un instant. */
function parisDayKey(date: Date): string {
  return PARIS_DAY_FORMAT.format(date);
}

async function loadConfig(db: SequencesDb): Promise<{ paused: boolean; coldDailyCap: number }> {
  const { data, error } = await db.from('prospection_config').select('key, value');
  if (error) throw new Error(`Lecture de prospection_config échouée : ${error.message}`);
  const rows = (data ?? []) as ConfigRow[];
  const byKey = new Map(rows.map((r) => [r.key, r.value]));
  // Fail-closed : clé absente ou valeur non booléenne false => on considère
  // le système en pause plutôt que d'envoyer sans kill switch opérant.
  const paused = byKey.get('sequences_paused') !== false;
  const capValue = byKey.get('cold_daily_cap');
  const coldDailyCap = typeof capValue === 'number' && Number.isFinite(capValue) ? capValue : 0;
  return { paused, coldDailyCap };
}

/**
 * Ancre de séquence (l'instant J+0 dont dérivent les offsets de cadence) :
 * - cold / inbound : la touche `flash` la plus récente (le pré-audit envoyé).
 *   Sans flash tracé, pas d'ancre : on ne devine jamais une date (skipped).
 * - refonte : il n'existe pas de touche `pro_envoye` et la date du passage en
 *   phase refonte n'est pas traçable proprement. Règle retenue (documentée
 *   dans la spec d'exécution) : la touche `refonte_*` la plus récente si elle
 *   existe, sinon la touche la plus récente toutes catégories (en pratique
 *   contemporaine de l'envoi du PDF Pro), sinon `lead.updated_at` (mis à jour
 *   au passage en phase refonte). Conséquence assumée : l'ancre étant
 *   glissante, les intervalles effectifs entre touches refonte deviennent
 *   2, 3, 7 puis 15 jours (offsets de la touche suivante depuis la touche
 *   précédente), une cadence légèrement plus espacée que J+1/2/3/7/15 fixes,
 *   donc plus conservatrice : jamais de sur-pression, et robuste à l'absence
 *   d'évènement `pro_envoye` horodaté.
 */
function anchorFor(kind: SequenceKind, touches: TouchRow[], lead: LeadRow): Date | null {
  const latest = (candidates: TouchRow[]): TouchRow | null =>
    candidates.reduce<TouchRow | null>(
      (best, t) => (best === null || t.sent_at > best.sent_at ? t : best),
      null,
    );

  if (kind === 'refonte') {
    const lastRefonte = latest(touches.filter((t) => t.type.startsWith('refonte_')));
    if (lastRefonte) return new Date(lastRefonte.sent_at);
    const lastAny = latest(touches);
    if (lastAny) return new Date(lastAny.sent_at);
    return new Date(lead.updated_at);
  }

  const lastFlash = latest(touches.filter((t) => t.type === 'flash'));
  return lastFlash ? new Date(lastFlash.sent_at) : null;
}

/**
 * Calcule les payloads d'emails à envoyer maintenant et la liste des leads
 * écartés avec leur raison (`paused`, `stopped`, `no_sequence`, `no_anchor`,
 * `already_touched_today`, `not_due`, `missing_site_url`, `lint:...`,
 * `cold_cap`). Déterministe : leads traités par created_at croissant (puis id),
 * `now` injectable pour les tests.
 */
export async function computeDueSends(
  db: SequencesDb,
  now: Date = new Date(),
): Promise<{ due: DuePayload[]; skipped: SkippedLead[] }> {
  const config = await loadConfig(db);
  if (config.paused) {
    return { due: [], skipped: [{ leadId: '*', reason: 'paused' }] };
  }

  const { data: leadsData, error: leadsError } = await db
    .from('prospection_leads')
    .select('*')
    .in('statut_funnel', CANDIDATE_STATUTS)
    .eq('opt_out', false)
    .eq('bounce', false);
  if (leadsError) throw new Error(`Lecture des leads candidats échouée : ${leadsError.message}`);
  const leads = ((leadsData ?? []) as LeadRow[])
    .slice()
    .sort((a, b) => a.created_at.localeCompare(b.created_at) || a.id.localeCompare(b.id));

  const todayKey = parisDayKey(now);

  const touchesByLead = new Map<string, TouchRow[]>();
  if (leads.length > 0) {
    const { data: touchesData, error: touchesError } = await db
      .from('prospection_touches')
      .select('*')
      .in('lead_id', leads.map((l) => l.id));
    if (touchesError) throw new Error(`Lecture des touches échouée : ${touchesError.message}`);
    for (const t of (touchesData ?? []) as TouchRow[]) {
      const list = touchesByLead.get(t.lead_id);
      if (list) list.push(t);
      else touchesByLead.set(t.lead_id, [t]);
    }
  }

  // Cap cold : compte TOUTES les touches gmail du jour civil Paris (y compris
  // les pré-audits flash vers des leads hors candidats). Borne large de 48 h
  // côté SQL, filtrage exact par jour civil côté code.
  const gmailSince = new Date(now.getTime() - 2 * DAY_MS).toISOString();
  const { data: gmailData, error: gmailError } = await db
    .from('prospection_touches')
    .select('channel, sent_at')
    .eq('channel', 'gmail')
    .gte('sent_at', gmailSince);
  if (gmailError) throw new Error(`Lecture des touches gmail du jour échouée : ${gmailError.message}`);
  const gmailSentToday = ((gmailData ?? []) as TouchRow[]).filter(
    (t) => parisDayKey(new Date(t.sent_at)) === todayKey,
  ).length;
  let coldRemaining = Math.max(0, config.coldDailyCap - gmailSentToday);

  const due: DuePayload[] = [];
  const skipped: SkippedLead[] = [];
  const skip = (leadId: string, reason: string): void => {
    skipped.push({ leadId, reason });
  };

  for (const lead of leads) {
    // Défensif : la requête filtre déjà opt_out/bounce/statuts, on revérifie.
    if (isSequenceStopped(lead)) {
      skip(lead.id, 'stopped');
      continue;
    }
    const kind = sequenceKindForLead(lead);
    if (!kind) {
      skip(lead.id, 'no_sequence'); // phase audit : gate humain en cours
      continue;
    }
    const touches = touchesByLead.get(lead.id) ?? [];
    if (touches.some((t) => parisDayKey(new Date(t.sent_at)) === todayKey)) {
      skip(lead.id, 'already_touched_today'); // idempotence : 1 touche max/jour
      continue;
    }
    const anchor = anchorFor(kind, touches, lead);
    if (!anchor) {
      skip(lead.id, 'no_anchor'); // cold/inbound sans flash tracé : on ne devine pas
      continue;
    }
    const step = nextDueStep(kind, anchor, touches, now);
    if (!step) {
      skip(lead.id, 'not_due'); // séquence finie ou prochaine étape pas encore due
      continue;
    }
    if (!lead.site_url) {
      skip(lead.id, 'missing_site_url'); // tous les templates citent le site
      continue;
    }
    const email = renderTemplate(step.type, {
      contactName: lead.contact_name,
      entreprise: lead.entreprise,
      siteUrl: lead.site_url,
      auditUrl: DEFAULT_AUDIT_URL,
      calUrl: DEFAULT_CAL_URL,
    });
    const violations = lintEmail(email.subject, email.html, email.text);
    if (violations.length > 0) {
      skip(lead.id, `lint:${violations.join(' | ')}`); // BLOQUANT : le mail ne part pas
      continue;
    }
    const channel: 'gmail' | 'resend' = kind === 'cold' ? 'gmail' : 'resend';
    if (channel === 'gmail') {
      if (coldRemaining <= 0) {
        skip(lead.id, 'cold_cap');
        continue;
      }
      coldRemaining -= 1;
    }
    due.push({
      leadId: lead.id,
      email: lead.email,
      type: step.type,
      channel,
      gmailThreadId: channel === 'gmail' ? lead.gmail_thread_id : null,
      subject: email.subject,
      html: email.html,
      text: email.text,
      templateVersion: email.templateVersion,
    });
  }

  return { due, skipped };
}
