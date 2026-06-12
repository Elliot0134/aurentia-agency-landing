import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { requireWebhookToken } from '@/lib/prospection/api-auth';
import {
  TOUCH_TYPES,
  findTouchByMessageId,
  getLeadById,
  insertTouch,
  updateLead,
  type LeadPatch,
} from '@/lib/prospection/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Confirmation d'envoi par n8n (WF0 cold, WF2 relances) : insère la touche
 * dans la table Touches (Airtable) et fait avancer le statut funnel :
 * - type `flash` → lead en `flash_envoye` (+ Gmail Thread si fourni) :
 *   c'est LA transition du cold, après envoi réel par un humain ;
 * - type relance (cold_* / inbound_* / refonte_*) → `en_sequence` si le lead
 *   est encore en `flash_envoye` (un statut plus avancé, ex `repondu`, n'est
 *   jamais écrasé par une confirmation d'envoi).
 * Dans tous les cas, `Dernier contact` du lead est mis à maintenant.
 *
 * Idempotence : si messageId est fourni et déjà présent dans les touches,
 * 200 sans doublon (n8n peut rejouer une confirmation). Pas de contrainte
 * unique côté Airtable : le check AVANT insertion est la seule garde.
 */

const bodySchema = z.object({
  /** Record id Airtable du lead (recXXXX). */
  leadId: z.string().min(1),
  type: z.enum(TOUCH_TYPES),
  channel: z.enum(['gmail', 'resend']),
  messageId: z.string().min(1).optional(),
  gmailThreadId: z.string().min(1).optional(),
  templateVersion: z.string().min(1).optional(),
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
  const { leadId, type, channel, messageId, gmailThreadId, templateVersion } = parsed.data;

  try {
    const lead = await getLeadById(leadId);
    if (!lead) {
      return NextResponse.json({ error: 'lead_not_found' }, { status: 404 });
    }

    if (messageId !== undefined) {
      const existing = await findTouchByMessageId(messageId);
      if (existing) {
        return NextResponse.json({ confirmed: true, duplicate: true }, { status: 200 });
      }
    }

    await insertTouch({
      leadId,
      leadLabel: lead.entreprise ?? lead.email,
      type,
      channel,
      ...(messageId !== undefined ? { messageId } : {}),
      ...(templateVersion !== undefined ? { templateVersion } : {}),
    });

    const patch: LeadPatch = { dernierContact: new Date().toISOString() };
    if (type === 'flash') {
      patch.statutFunnel = 'flash_envoye';
      if (gmailThreadId !== undefined) patch.gmailThreadId = gmailThreadId;
    } else if (lead.statutFunnel === 'flash_envoye') {
      patch.statutFunnel = 'en_sequence';
    }
    await updateLead(leadId, patch);

    return NextResponse.json({ confirmed: true, duplicate: false }, { status: 200 });
  } catch (err) {
    console.error('[api/prospection/touches/confirm] POST failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
