import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { requireWebhookToken } from '@/lib/prospection/api-auth';
import {
  getLeadByAirtableRecordId,
  getLeadByNotionPageId,
  updateLead,
  type LeadPatch,
} from '@/lib/prospection/db';
import { statutFunnelFromStatutHumain } from '@/lib/prospection/statut-humain';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * WF4 remontant (miroir → Supabase) : n8n pousse les modifications humaines
 * faites dans le miroir CRM (statut après call, notes). Miroir = Airtable
 * depuis le 2026-06-12 (décision Elliot) ; chaque changement est identifié
 * par `airtableRecordId` OU `notionPageId` (compat ascendante, déprécié).
 * Lead retrouvé par le champ fourni (Airtable prioritaire), mise à jour de
 * statut_humain / notes, et si le statut humain est reconnu ('Gagné',
 * 'Perdu', 'À appeler', insensible accents/casse) le statut funnel machine
 * suit (gagne / perdu / a_appeler). Un statut humain non reconnu est conservé
 * tel quel SANS toucher le funnel.
 *
 * Les changements sans lead correspondant sont comptés `ignored` (jamais
 * d'erreur globale : un record miroir orphelin ne bloque pas le batch).
 */

const changeSchema = z
  .object({
    airtableRecordId: z.string().min(1).optional(),
    notionPageId: z.string().min(1).optional(),
    statutHumain: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine((change) => change.airtableRecordId !== undefined || change.notionPageId !== undefined, {
    message: 'airtableRecordId ou notionPageId requis',
  });

const bodySchema = z.object({
  changes: z.array(changeSchema),
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
    let applied = 0;
    let ignored = 0;

    for (const change of parsed.data.changes) {
      // Airtable prioritaire ; la branche null est impossible (refine zod :
      // au moins un id) mais garde TS strict sans cast et finit en `ignored`.
      const lead =
        change.airtableRecordId !== undefined
          ? await getLeadByAirtableRecordId(change.airtableRecordId)
          : change.notionPageId !== undefined
            ? await getLeadByNotionPageId(change.notionPageId)
            : null;
      if (!lead) {
        ignored += 1;
        continue;
      }
      const patch: LeadPatch = {};
      if (change.statutHumain !== undefined) {
        patch.statutHumain = change.statutHumain;
        const statutFunnel = statutFunnelFromStatutHumain(change.statutHumain);
        if (statutFunnel) patch.statutFunnel = statutFunnel;
      }
      if (change.notes !== undefined) patch.notes = change.notes;
      if (Object.keys(patch).length === 0) {
        ignored += 1;
        continue;
      }
      await updateLead(lead.id, patch);
      applied += 1;
    }

    return NextResponse.json({ applied, ignored }, { status: 200 });
  } catch (err) {
    console.error('[api/prospection/leads/sync] POST failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
