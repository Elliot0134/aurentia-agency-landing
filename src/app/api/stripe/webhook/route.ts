import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { start } from 'workflow/api';
import { proAuditWorkflow } from '@/workflows/audit-workflows';
import { createJob, findJobByStripeSessionId, findLatestJobByEmail, updateJob } from '@/lib/audit/jobs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook Stripe : à la complétion du Payment Link de l'audit Pro (99 EUR HT),
 * crée le job pro et lance le workflow durable.
 *
 * Le Payment Link ne porte pas l'URL du site audité : le client paie
 * typiquement APRÈS avoir reçu un Flash, on reprend donc l'URL de son dernier
 * job (findLatestJobByEmail). Si aucun job connu pour cet email : le job est
 * quand même créé (url vide, status queued) SANS lancer le workflow, et un
 * humain est notifié sur Slack. Jamais perdre un paiement, jamais auditer une
 * URL devinée.
 *
 * Idempotence : Stripe peut livrer un event plusieurs fois ; si un job existe
 * déjà pour ce stripe_session_id, on répond 200 sans rien refaire.
 */

/** Notification Slack best-effort : ne throw jamais (même pattern que les
 * workflows, cf. audit-steps.ts — non exporté car il tire tout le moteur). */
async function postSlack(text: string): Promise<void> {
  const webhookUrl = process.env.SLACK_AUDIT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log(`[stripe-webhook] SLACK_AUDIT_WEBHOOK_URL absente, notification non envoyée : ${text}`);
    return;
  }
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) console.error(`[stripe-webhook] Slack a répondu ${res.status} : ${text}`);
  } catch (err) {
    console.error('[stripe-webhook] notification Slack échouée', err);
  }
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const apiKey = process.env.STRIPE_SECRET_KEY;
  const signature = req.headers.get('stripe-signature');
  if (!webhookSecret || !apiKey || !signature) {
    // Env absente = endpoint fermé (jamais d'event accepté sans vérification).
    return NextResponse.json({ error: 'invalid_signature' }, { status: 400 });
  }

  // Body BRUT obligatoire : la signature Stripe couvre les bytes exacts du
  // payload, toute re-sérialisation JSON la casserait.
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = new Stripe(apiKey);
    event = stripe.webhooks.constructEvent(raw, signature, webhookSecret);
  } catch (err) {
    console.error('[stripe-webhook] signature invalide', err);
    return NextResponse.json({ error: 'invalid_signature' }, { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const session = event.data.object;

  try {
    // Idempotence : event déjà traité → 200 sans rien refaire.
    const existing = await findJobByStripeSessionId(session.id);
    if (existing) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const rawEmail = session.customer_details?.email ?? session.customer_email;
    if (!rawEmail) {
      // Paiement sans email exploitable : on n'invente rien, un humain reprend
      // la main. 200 quand même : Stripe re-livrerait le même event en boucle.
      await postSlack(
        `:rotating_light: Paiement Pro reçu SANS email exploitable (session ${session.id}) : retrouver le client dans le dashboard Stripe et créer le job à la main`,
      );
      return NextResponse.json({ received: true }, { status: 200 });
    }
    const email = rawEmail.trim().toLowerCase();

    const latest = await findLatestJobByEmail(email);
    const url = latest?.url ?? '';

    const job = await createJob({ email, url, tier: 'pro', channel: 'inbound', stripeSessionId: session.id });

    if (url) {
      const run = await start(proAuditWorkflow, [job.id]);
      await updateJob(job.id, { workflowRunId: run.runId });
    } else {
      await postSlack(
        `:rotating_light: Paiement Pro reçu de ${email} sans URL connue (job ${job.id}, session ${session.id}) : compléter l'URL et relancer`,
      );
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    // 500 → Stripe retentera la livraison ; le check d'idempotence ci-dessus
    // évite tout doublon au retry.
    console.error('[stripe-webhook] traitement checkout.session.completed échoué', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
