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
 * dans prospection_touches et fait avancer le statut funnel :
 * - type `flash` → lead en `flash_envoye` (+ gmail_thread_id si fourni) :
 *   c'est LA transition du cold, après envoi réel par un humain ;
 * - type relance (cold_* / inbound_* / refonte_*) → `en_sequence` si le lead
 *   est encore en `flash_envoye` (un statut plus avancé, ex `repondu`, n'est
 *   jamais écrasé par une confirmation d'envoi).
 *
 * Idempotence : si messageId est fourni et déjà présent dans les touches,
 * 200 sans doublon (n8n peut rejouer une confirmation).
 */

const bodySchema = z.object({
  leadId: z.uuid(),
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
      type,
      channel,
      ...(messageId !== undefined ? { messageId } : {}),
      ...(templateVersion !== undefined ? { templateVersion } : {}),
    });

    if (type === 'flash') {
      const patch: LeadPatch = { statutFunnel: 'flash_envoye' };
      if (gmailThreadId !== undefined) patch.gmailThreadId = gmailThreadId;
      await updateLead(leadId, patch);
    } else if (lead.statutFunnel === 'flash_envoye') {
      await updateLead(leadId, { statutFunnel: 'en_sequence' });
    }

    return NextResponse.json({ confirmed: true, duplicate: false }, { status: 200 });
  } catch (err) {
    console.error('[api/prospection/touches/confirm] POST failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
