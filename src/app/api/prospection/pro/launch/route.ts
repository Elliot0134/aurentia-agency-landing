import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { start } from 'workflow/api';
import { proAuditWorkflow } from '@/workflows/audit-workflows';
import { createJob, updateJob } from '@/lib/audit/jobs';
import { getLeadById } from '@/lib/prospection/db';
import { assertSafeUrl, UnsafeUrlError } from '@/lib/audit/url-safety';
import { requireWebhookToken, postSlack } from '@/lib/prospection/api-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Lancement MANUEL d'un audit Pro pour un lead, SANS paiement Stripe.
 *
 * Déclenché par un bouton / une automatisation Airtable (header x-webhook-token,
 * env PROSPECTION_API_SECRET). On lit l'email + le site du lead côté serveur,
 * on crée le job Pro et on lance le workflow durable.
 *
 * Le PDF généré passe par le MÊME gate humain que le flux payant : à la fin du
 * workflow, un lien de relecture Slack est posté. On relit le PDF, puis on
 * clique « Envoyer au client ». Aucun envoi automatique ici.
 */

const bodySchema = z.object({
  /** Record id Airtable du lead (recXXXX). */
  leadId: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const denied = requireWebhookToken(req);
  if (denied) return denied;

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_body', details: parsed.error.issues }, { status: 400 });
  }

  try {
    const lead = await getLeadById(parsed.data.leadId);
    if (!lead) {
      return NextResponse.json({ error: 'lead_not_found' }, { status: 404 });
    }
    if (!lead.siteUrl) {
      return NextResponse.json({ error: 'lead_sans_site' }, { status: 400 });
    }

    // Anti-SSRF : l'URL vient du CRM mais sera fetchée/capturée par le moteur.
    let safeUrl: URL;
    try {
      safeUrl = await assertSafeUrl(lead.siteUrl);
    } catch (err) {
      if (err instanceof UnsafeUrlError) {
        return NextResponse.json({ error: 'unsafe_url', message: err.message }, { status: 400 });
      }
      throw err;
    }

    const job = await createJob({
      email: lead.email,
      url: safeUrl.toString(),
      tier: 'pro',
      channel: 'inbound',
      leadId: lead.id,
    });
    const run = await start(proAuditWorkflow, [job.id]);
    await updateJob(job.id, { workflowRunId: run.runId });

    await postSlack(
      `:hourglass_flowing_sand: Audit Pro lancé manuellement (Airtable) pour ${lead.email} — ${safeUrl.toString()} (job ${job.id}). Le lien de relecture arrivera quand le PDF sera prêt.`,
    );

    return NextResponse.json({ jobId: job.id }, { status: 202 });
  } catch (err) {
    console.error('[api/prospection/pro/launch] échec', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
