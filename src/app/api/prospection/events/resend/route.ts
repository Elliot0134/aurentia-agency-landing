import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { requireWebhookToken } from '@/lib/prospection/api-auth';
import { getLeadByEmail, updateLead, type LeadPatch } from '@/lib/prospection/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Webhook Resend (séquences inbound/refonte) : marque les leads en bounce ou
 * en plainte spam.
 *
 * Vérification v1 SIMPLE : header `x-webhook-token` (l'endpoint Resend est
 * configuré avec ce header custom). La vérification de signature svix
 * (RESEND_WEBHOOK_SECRET) n'est PAS implémentée en v1 : la dépendance svix
 * n'est ajoutée que le jour où on l'implémente ; l'env reste documentée en
 * commentaire dans .env.example pour la v2.
 *
 * Events traités :
 * - email.bounced → lead (par email) : bounce=true + statut perdu ;
 * - email.complained → idem + opt_out=true (plainte spam = à vie) ;
 * - tout le reste (delivered, opened...) → 200 sans effet.
 *
 * Réponse 200 SYSTÉMATIQUE après auth (y compris payload inattendu ou lead
 * inconnu) : un non-200 déclencherait une tempête de retries Resend.
 */

const bodySchema = z.object({
  type: z.string(),
  data: z
    .object({
      to: z.array(z.string()).optional(),
      email: z.string().optional(),
    })
    .loose(),
});

export async function POST(req: NextRequest) {
  const denied = requireWebhookToken(req);
  if (denied) return denied;

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ received: true, ignored: 'invalid_json' }, { status: 200 });
  }
  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ received: true, ignored: 'invalid_body' }, { status: 200 });
  }
  const { type, data } = parsed.data;

  if (type !== 'email.bounced' && type !== 'email.complained') {
    return NextResponse.json({ received: true }, { status: 200 });
  }

  const email = data.to?.[0] ?? data.email;
  if (!email) {
    return NextResponse.json({ received: true, ignored: 'no_email' }, { status: 200 });
  }

  try {
    const lead = await getLeadByEmail(email.trim().toLowerCase());
    if (!lead) {
      return NextResponse.json({ received: true, ignored: 'lead_not_found' }, { status: 200 });
    }

    const patch: LeadPatch = { bounce: true, statutFunnel: 'perdu' };
    if (type === 'email.complained') patch.optOut = true;
    await updateLead(lead.id, patch);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    // Seule vraie erreur serveur : 500 pour que Resend retente (l'update est
    // idempotente, un retry ne crée aucun doublon).
    console.error('[api/prospection/events/resend] POST failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
