import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { start } from 'workflow/api';
import { flashAuditWorkflow } from '@/workflows/audit-workflows';
import { createJob, findActiveFlashJobByLeadId, updateJob } from '@/lib/audit/jobs';
import { assertSafeUrl, UnsafeUrlError } from '@/lib/audit/url-safety';
import { requireWebhookToken } from '@/lib/prospection/api-auth';
import { getConfig, listLeadsByStatus, updateLead } from '@/lib/prospection/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * WF0 (intake) : lance les audits Flash des leads `nouveau` du CRM.
 *
 * Traitement SÉQUENTIEL (Browserless mono-session : lancer N workflows en
 * parallèle ferait s'entre-tuer les captures), limit par défaut 5.
 *
 * Transition de statut, asymétrique par canal (VOULU) :
 * - inbound : le workflow envoie lui-même le Flash via Resend → le lead passe
 *   en `flash_envoye` dès le lancement du job.
 * - cold (outbound) : le workflow s'arrête à `ready_to_send` (JAMAIS d'envoi
 *   automatique en cold) ; c'est n8n qui dépose le brouillon Gmail, un humain
 *   qui envoie, puis n8n qui confirme via /touches/confirm (type `flash`),
 *   et C'EST CETTE CONFIRMATION qui fait passer le lead en `flash_envoye`.
 *   Ici le lead cold reste donc en `nouveau`.
 *
 * Garde anti-doublon : un lead cold restant `nouveau` jusqu'à la confirmation,
 * il serait re-sélectionné par le cron suivant → avant de créer un job, on
 * vérifie qu'aucun job `flash` actif (statut hors failed/refunded) n'existe
 * déjà pour ce lead, sinon skip `flash_job_exists`. Un job failed/refunded ne
 * bloque pas : retry légitime.
 *
 * Kill switch : sequences_paused (fail-closed : clé absente = pause) → 200
 * `{ started: [], paused: true }`, aucun job lancé.
 */

const bodySchema = z.object({
  limit: z.number().int().min(1).max(50).default(5),
});

interface StartedLead {
  leadId: string;
  jobId: string;
}

interface SkippedLead {
  leadId: string;
  reason: string;
}

export async function POST(req: NextRequest) {
  const denied = requireWebhookToken(req);
  if (denied) return denied;

  // n8n peut appeler sans body : un body vide vaut `{}` (limit par défaut).
  let raw: unknown;
  try {
    const text = await req.text();
    raw = text.trim() === '' ? {} : JSON.parse(text);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_body', details: parsed.error.issues }, { status: 400 });
  }

  try {
    // Kill switch global, fail-closed comme dans le moteur de séquences.
    const paused = (await getConfig('sequences_paused')) !== false;
    if (paused) {
      return NextResponse.json({ started: [], skipped: [], paused: true }, { status: 200 });
    }

    const leads = await listLeadsByStatus(['nouveau']);
    const started: StartedLead[] = [];
    const skipped: SkippedLead[] = [];

    const eligible = leads.filter((lead) => {
      if (lead.optOut) {
        skipped.push({ leadId: lead.id, reason: 'opt_out' });
        return false;
      }
      if (!lead.siteUrl) {
        skipped.push({ leadId: lead.id, reason: 'missing_site_url' });
        return false;
      }
      if (!lead.email) {
        skipped.push({ leadId: lead.id, reason: 'missing_email' });
        return false;
      }
      return true;
    });

    // SÉQUENTIEL volontaire (pas de Promise.all) : Browserless mono-session.
    for (const lead of eligible.slice(0, parsed.data.limit)) {
      const siteUrl = lead.siteUrl;
      if (!siteUrl) continue; // impossible (filtré ci-dessus), narrowing TS
      try {
        // Anti-doublon : un Flash actif (ou déjà livré) existe → on ne relance
        // rien, sinon double génération puis double envoi au prospect.
        const existingFlash = await findActiveFlashJobByLeadId(lead.id);
        if (existingFlash) {
          skipped.push({ leadId: lead.id, reason: 'flash_job_exists' });
          continue;
        }
        const safeUrl = await assertSafeUrl(siteUrl);
        const channel = lead.source === 'outbound' ? 'cold' : 'inbound';
        const job = await createJob({
          email: lead.email.trim().toLowerCase(),
          url: safeUrl.toString(),
          tier: 'flash',
          channel,
          leadId: lead.id,
        });
        const run = await start(flashAuditWorkflow, [job.id]);
        await updateJob(job.id, { workflowRunId: run.runId });
        if (channel === 'inbound') {
          // Envoi automatique par le workflow : statut à jour immédiatement.
          // Cold : reste `nouveau`, /touches/confirm fera la transition.
          await updateLead(lead.id, { statutFunnel: 'flash_envoye' });
        }
        started.push({ leadId: lead.id, jobId: job.id });
      } catch (err) {
        // Un lead en échec ne bloque pas les suivants.
        const reason =
          err instanceof UnsafeUrlError
            ? `unsafe_url:${err.message}`
            : `error:${err instanceof Error ? err.message : String(err)}`;
        skipped.push({ leadId: lead.id, reason });
      }
    }

    return NextResponse.json({ started, skipped }, { status: 200 });
  } catch (err) {
    console.error('[api/prospection/intake/run] POST failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
