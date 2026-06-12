import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { postSlack, requireWebhookToken } from '@/lib/prospection/api-auth';
import { classifyReply } from '@/lib/prospection/classify-reply';
import {
  findReplyByGmailMessageId,
  getLeadByEmail,
  getLeadByGmailThreadId,
  insertReply,
  updateLead,
  type LeadPatch,
  type ProspectionLead,
} from '@/lib/prospection/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * WF1 (réponses) : n8n pousse chaque réponse reçue dans le fil d'un cold
 * email ; la route retrouve le lead, classifie le snippet (heuristique bounce
 * sans LLM, sinon LLM OpenRouter), enregistre la réponse et fait avancer le
 * funnel. Elle NOTIFIE Slack pour les réponses chaudes ou ambiguës.
 *
 * JAMAIS de réponse automatique au prospect : cette route classifie et
 * notifie, rien d'autre. C'est un humain qui répond.
 *
 * Statuts appliqués (confidence >= 0.6) :
 * - interesse / question → a_appeler (+ Slack 🔥)
 * - pas_interesse → perdu
 * - stop → stop + opt_out=true (à vie)
 * - absent → aucun changement (le prospect est en congés, la séquence suit)
 * - bounce → bounce=true + perdu
 * Confidence < 0.6 → a_trier (et c'est tout : un humain tranche, + Slack).
 *
 * Idempotence : Airtable n'a pas de contrainte unique → recherche de la
 * réponse par Gmail Message ID AVANT classification ; déjà vue → 200
 * `alreadyProcessed` sans aucun effet de bord (ni appel LLM).
 */

const bodySchema = z.object({
  leadEmail: z.string().min(1).optional(),
  gmailThreadId: z.string().min(1).optional(),
  gmailMessageId: z.string().min(1),
  snippet: z.string(),
  receivedAt: z.iso.datetime({ offset: true }).optional(),
});

const CONFIDENCE_FLOOR = 0.6;

async function findLead(input: {
  gmailThreadId?: string;
  leadEmail?: string;
}): Promise<ProspectionLead | null> {
  if (input.gmailThreadId) {
    const byThread = await getLeadByGmailThreadId(input.gmailThreadId);
    if (byThread) return byThread;
  }
  if (input.leadEmail) {
    return getLeadByEmail(input.leadEmail);
  }
  return null;
}

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
  const { leadEmail, gmailThreadId, gmailMessageId, snippet, receivedAt } = parsed.data;

  try {
    const lead = await findLead({ gmailThreadId, leadEmail });
    if (!lead) {
      return NextResponse.json({ error: 'lead_not_found' }, { status: 404 });
    }

    // Idempotence AVANT classification : un event Gmail déjà traité ne
    // déclenche ni LLM, ni insertion, ni patch, ni Slack.
    const alreadySeen = await findReplyByGmailMessageId(gmailMessageId);
    if (alreadySeen) {
      return NextResponse.json({ alreadyProcessed: true }, { status: 200 });
    }

    // Heuristique bounce AVANT LLM (mailer-daemon, snippet de non-livraison) :
    // classifyReply court-circuite le LLM dans ce cas (confidence 1).
    const verdict = await classifyReply(snippet, leadEmail);

    await insertReply({
      leadId: lead.id,
      leadLabel: lead.entreprise ?? lead.email,
      gmailMessageId,
      classification: verdict.classification,
      confidence: verdict.confidence,
      snippet,
      ...(receivedAt !== undefined ? { receivedAt } : {}),
    });

    const label = lead.entreprise ?? lead.email;
    if (verdict.confidence < CONFIDENCE_FLOOR) {
      await updateLead(lead.id, { statutFunnel: 'a_trier' });
      await postSlack(
        `:thinking_face: Réponse ambiguë de ${label} (classée ${verdict.classification}, confiance ${verdict.confidence.toFixed(2)}) : à trier à la main. "${snippet.slice(0, 200)}"`,
      );
      return NextResponse.json(
        { leadId: lead.id, classification: verdict.classification, confidence: verdict.confidence, statutFunnel: 'a_trier' },
        { status: 200 },
      );
    }

    let patch: LeadPatch | null = null;
    switch (verdict.classification) {
      case 'interesse':
      case 'question':
        patch = { statutFunnel: 'a_appeler' };
        break;
      case 'pas_interesse':
        patch = { statutFunnel: 'perdu' };
        break;
      case 'stop':
        patch = { statutFunnel: 'stop', optOut: true };
        break;
      case 'absent':
        patch = null; // aucun changement, la séquence reprendra d'elle-même
        break;
      case 'bounce':
        patch = { statutFunnel: 'perdu', bounce: true };
        break;
    }
    if (patch) await updateLead(lead.id, patch);

    if (verdict.classification === 'interesse' || verdict.classification === 'question') {
      await postSlack(
        `:fire: ${label} a répondu (${verdict.classification}) : à appeler ! "${snippet.slice(0, 200)}"`,
      );
    }

    return NextResponse.json(
      {
        leadId: lead.id,
        classification: verdict.classification,
        confidence: verdict.confidence,
        statutFunnel: patch?.statutFunnel ?? lead.statutFunnel,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('[api/prospection/replies/classify] POST failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
