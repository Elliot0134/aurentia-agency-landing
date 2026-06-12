import {
  isSequenceStopped,
  nextDueStep,
  sequenceKindForLead,
  type SequenceKind,
  type StatutFunnel,
} from './sequences';
import { DEFAULT_AUDIT_URL, DEFAULT_CAL_URL, renderTemplate } from './templates';
import { lintEmail } from './linter';
import {
  getConfig,
  listLeadsByStatus,
  listTouches,
  type ProspectionLead,
  type ProspectionTouch,
} from './db';

/**
 * Calcul des envois dus du jour (spec 2026-06-12-sequences-relances-n8n-design.md
 * §5 WF2 et §7). Le moteur est PUR : il lit le CRM (Airtable depuis le
 * 2026-06-12) et retourne des payloads, il n'envoie rien et n'écrit rien.
 * n8n (WF2) envoie puis confirme via /touches/confirm ; rejouer
 * computeDueSends est donc toujours sans risque.
 *
 * L'accès données passe par une interface étroite de fonctions (EngineDb,
 * les helpers de db.ts par défaut) : les tests stubent les fonctions,
 * zéro réseau.
 *
 * Garde-fous implémentés ici :
 * - kill switch global `sequences_paused` (fail-closed : la valeur Config est
 *   une string ; tout sauf 'false' — y compris clé absente ou illisible —
 *   vaut pause) ;
 * - idempotence : un lead déjà touché aujourd'hui (jour civil Europe/Paris)
 *   ne reçoit rien de plus ;
 * - cap cold quotidien `cold_daily_cap` : pré-audits ET relances Gmail
 *   confondus (les touches gmail déjà parties aujourd'hui consomment le cap) ;
 * - linter d'envoi bloquant : toute violation met le lead en skipped.
 */

/** Interface étroite consommée par le moteur (helpers de db.ts, stubables). */
export interface EngineDb {
  getConfig(key: string): Promise<string | null>;
  listLeadsByStatus(statuts: readonly StatutFunnel[]): Promise<ProspectionLead[]>;
  listTouches(): Promise<ProspectionTouch[]>;
}

const defaultEngineDb: EngineDb = {
  getConfig: (key) => getConfig(key),
  listLeadsByStatus: (statuts) => listLeadsByStatus(statuts),
  listTouches: () => listTouches(),
};

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

/**
 * Statuts funnel candidats à une relance automatique.
 *
 * `pro_envoye` ajouté lors du pivot Airtable (2026-06-12) : la phase n'est
 * plus une colonne indépendante, elle est dérivée du statut
 * (db.phaseFromStatutFunnel). Un client en séquence refonte EST un lead
 * `pro_envoye` ; sans lui ici, la séquence refonte serait inatteignable.
 */
const CANDIDATE_STATUTS: readonly StatutFunnel[] = ['flash_envoye', 'en_sequence', 'pro_envoye'];

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

async function loadConfig(db: EngineDb): Promise<{ paused: boolean; coldDailyCap: number }> {
  const pausedRaw = await db.getConfig('sequences_paused');
  // Fail-closed : seule la string exacte 'false' autorise les envois. Clé
  // absente, 'true' ou valeur illisible => pause.
  const paused = pausedRaw !== 'false';
  const capRaw = await db.getConfig('cold_daily_cap');
  const capParsed = capRaw === null || capRaw.trim() === '' ? Number.NaN : Number(capRaw);
  const coldDailyCap = Number.isFinite(capParsed) ? capParsed : 0;
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
 *   contemporaine de l'envoi du PDF Pro), sinon `Dernier contact` du lead
 *   (mis à jour à chaque confirmation d'envoi), sinon sa date de création.
 *   Conséquence assumée : l'ancre étant glissante, les intervalles effectifs
 *   entre touches refonte deviennent 2, 3, 7 puis 15 jours (offsets de la
 *   touche suivante depuis la touche précédente), une cadence légèrement plus
 *   espacée que J+1/2/3/7/15 fixes, donc plus conservatrice : jamais de
 *   sur-pression, et robuste à l'absence d'évènement `pro_envoye` horodaté.
 */
function anchorFor(kind: SequenceKind, touches: ProspectionTouch[], lead: ProspectionLead): Date | null {
  const latest = (candidates: ProspectionTouch[]): ProspectionTouch | null =>
    candidates.reduce<ProspectionTouch | null>(
      (best, t) => (best === null || t.sentAt > best.sentAt ? t : best),
      null,
    );

  if (kind === 'refonte') {
    const lastRefonte = latest(touches.filter((t) => t.type.startsWith('refonte_')));
    if (lastRefonte) return new Date(lastRefonte.sentAt);
    const lastAny = latest(touches);
    if (lastAny) return new Date(lastAny.sentAt);
    return new Date(lead.dernierContact ?? lead.createdAt);
  }

  const lastFlash = latest(touches.filter((t) => t.type === 'flash'));
  return lastFlash ? new Date(lastFlash.sentAt) : null;
}

/**
 * Calcule les payloads d'emails à envoyer maintenant et la liste des leads
 * écartés avec leur raison (`paused`, `stopped`, `no_sequence`, `no_anchor`,
 * `already_touched_today`, `not_due`, `missing_site_url`, `lint:...`,
 * `cold_cap`). Déterministe : leads traités par createdAt croissant (puis id),
 * `now` injectable pour les tests.
 */
export async function computeDueSends(
  db: EngineDb = defaultEngineDb,
  now: Date = new Date(),
): Promise<{ due: DuePayload[]; skipped: SkippedLead[] }> {
  const config = await loadConfig(db);
  if (config.paused) {
    return { due: [], skipped: [{ leadId: '*', reason: 'paused' }] };
  }

  // opt_out / bounce sont écartés silencieusement (comme l'ancienne requête
  // SQL qui les excluait dès le WHERE) ; isSequenceStopped reste en défense.
  const leads = (await db.listLeadsByStatus(CANDIDATE_STATUTS))
    .filter((lead) => !lead.optOut && !lead.bounce)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt) || a.id.localeCompare(b.id));

  const todayKey = parisDayKey(now);

  const allTouches = await db.listTouches();
  const touchesByLead = new Map<string, ProspectionTouch[]>();
  for (const t of allTouches) {
    const list = touchesByLead.get(t.leadId);
    if (list) list.push(t);
    else touchesByLead.set(t.leadId, [t]);
  }

  // Cap cold : compte TOUTES les touches gmail du jour civil Paris (y compris
  // les pré-audits flash vers des leads hors candidats).
  const gmailSentToday = allTouches.filter(
    (t) => t.channel === 'gmail' && parisDayKey(new Date(t.sentAt)) === todayKey,
  ).length;
  let coldRemaining = Math.max(0, config.coldDailyCap - gmailSentToday);

  const due: DuePayload[] = [];
  const skipped: SkippedLead[] = [];
  const skip = (leadId: string, reason: string): void => {
    skipped.push({ leadId, reason });
  };

  for (const lead of leads) {
    // Défensif : les candidats sont déjà filtrés, on revérifie.
    if (isSequenceStopped({ opt_out: lead.optOut, bounce: lead.bounce, statut_funnel: lead.statutFunnel })) {
      skip(lead.id, 'stopped');
      continue;
    }
    const kind = sequenceKindForLead(lead);
    if (!kind) {
      skip(lead.id, 'no_sequence'); // phase audit : gate humain en cours
      continue;
    }
    const touches = touchesByLead.get(lead.id) ?? [];
    if (touches.some((t) => parisDayKey(new Date(t.sentAt)) === todayKey)) {
      skip(lead.id, 'already_touched_today'); // idempotence : 1 touche max/jour
      continue;
    }
    const anchor = anchorFor(kind, touches, lead);
    if (!anchor) {
      skip(lead.id, 'no_anchor'); // cold/inbound sans flash tracé : on ne devine pas
      continue;
    }
    const step = nextDueStep(
      kind,
      anchor,
      touches.map((t) => ({ type: t.type, sent_at: t.sentAt })),
      now,
    );
    if (!step) {
      skip(lead.id, 'not_due'); // séquence finie ou prochaine étape pas encore due
      continue;
    }
    if (!lead.siteUrl) {
      skip(lead.id, 'missing_site_url'); // tous les templates citent le site
      continue;
    }
    const email = renderTemplate(step.type, {
      contactName: lead.contactName,
      entreprise: lead.entreprise,
      siteUrl: lead.siteUrl,
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
      gmailThreadId: channel === 'gmail' ? lead.gmailThreadId : null,
      subject: email.subject,
      html: email.html,
      text: email.text,
      templateVersion: email.templateVersion,
    });
  }

  return { due, skipped };
}
