import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { start } from 'workflow/api';
import { proAuditWorkflow } from '@/workflows/audit-workflows';
import { createJob, findJobByStripeSessionId, findLatestJobByEmail, updateJob } from '@/lib/audit/jobs';
import { getLeadByEmail, createLead, updateLead, type LeadPatch } from '@/lib/prospection/db';
import { assertSafeUrl, UnsafeUrlError } from '@/lib/audit/url-safety';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook Stripe : à la complétion du Payment Link de l'audit Pro (99 EUR HT),
 * crée le job pro et lance le workflow durable.
 *
 * URL du site à auditer, par ordre de priorité :
 *  1. le champ obligatoire « URL à analyser » du Payment Link : c'est le client
 *     qui déclare le site qu'il paie, donc la seule source fiable ;
 *  2. à défaut (champ vide), l'URL de son dernier job (findLatestJobByEmail) :
 *     cas du prospect qui reçoit un Flash cold puis achète dans la foulée.
 *
 * Le repli ne doit JAMAIS primer sur la déclaration : sinon un client qui a eu
 * un Flash sur le site A puis paie pour le site B reçoit un audit du site A,
 * sans que rien ne le signale.
 *
 * Si aucune URL exploitable au bout de la chaîne : le job est quand même créé
 * (url vide, status queued) SANS lancer le workflow, et un humain est notifié
 * sur Slack. Jamais perdre un paiement, jamais auditer une URL devinée.
 *
 * Idempotence : Stripe peut livrer un event plusieurs fois ; si un job existe
 * déjà pour ce stripe_session_id, on répond 200 sans rien refaire.
 */

/**
 * URL déclarée par le client dans le champ « URL à analyser » du Payment Link.
 * Match souple sur la clé (premier champ texte dont la clé contient « url ») :
 * la clé se renomme depuis le dashboard Stripe sans passer par le code, on ne
 * veut pas qu'un renommage re-casse le flux silencieusement.
 */
function declaredUrl(session: Stripe.Checkout.Session): string {
  const field = (session.custom_fields ?? []).find(
    (f) => f.type === 'text' && f.key.toLowerCase().includes('url'),
  );
  return field?.text?.value?.trim() ?? '';
}

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

    // 1. L'URL déclarée au paiement fait foi. Anti-SSRF obligatoire : elle vient
    //    d'un formulaire public et sera fetchée/capturée par le moteur.
    // 2. Champ vide seulement : repli sur le dernier job de cet email.
    const declared = declaredUrl(session);
    let url = '';
    if (declared) {
      try {
        url = (await assertSafeUrl(declared)).toString();
      } catch (err) {
        if (!(err instanceof UnsafeUrlError)) throw err; // DNS transient : 500, Stripe retentera.
        // Le client a déclaré un site : on n'en audite surtout pas un autre à
        // sa place, un humain reprend la main (Slack plus bas).
        console.error(`[stripe-webhook] URL déclarée refusée (${declared})`, err);
      }
    } else {
      const latest = await findLatestJobByEmail(email);
      url = latest?.url ?? '';
    }

    // Trace/maj le lead dans Airtable (CRM maître) : un paiement Pro = lead
    // `pro_paye`. Upsert par email (dédup) : si le lead existe déjà (il a reçu
    // un Flash avant), on le fait passer en `pro_paye` ; sinon on le crée.
    // Best-effort : un échec Airtable ne doit jamais faire perdre le paiement.
    let leadId: string | undefined;
    try {
      const existing = await getLeadByEmail(email);
      if (existing) {
        leadId = existing.id;
        const patch: LeadPatch = { statutFunnel: 'pro_paye' };
        if (url && !existing.siteUrl) patch.siteUrl = url;
        await updateLead(existing.id, patch);
      } else {
        const lead = await createLead({
          source: 'inbound',
          email,
          siteUrl: url || null,
          statutFunnel: 'pro_paye',
          notes: `Paiement audit Pro via Stripe (session ${session.id}).`,
        });
        leadId = lead.id;
      }
    } catch (err) {
      console.error('[stripe-webhook] upsert lead Airtable échoué', err);
    }

    const job = await createJob({ email, url, tier: 'pro', channel: 'inbound', stripeSessionId: session.id, leadId });

    if (url) {
      const run = await start(proAuditWorkflow, [job.id]);
      await updateJob(job.id, { workflowRunId: run.runId });
    } else {
      // La saisie du client est reportée telle quelle : sans elle, impossible de
      // savoir quoi corriger côté humain.
      const saisie = declared ? ` URL saisie mais refusée : ${declared}` : '';
      await postSlack(
        `:rotating_light: Paiement Pro reçu de ${email} sans URL connue (job ${job.id}, session ${session.id}) : compléter l'URL et relancer.${saisie}`,
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
