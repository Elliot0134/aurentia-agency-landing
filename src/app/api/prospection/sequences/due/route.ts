import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { computeDueSends, type SequencesDb } from '@/lib/prospection/engine';
import { requireWebhookToken } from '@/lib/prospection/api-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * WF2 (relances) : calcule les envois dus du jour. AUCUN effet de bord, le
 * moteur est PUR (kill switch, idempotence quotidienne, cap cold et linter
 * bloquant inclus dans computeDueSends) : c'est n8n qui envoie chaque payload
 * puis confirme via /touches/confirm. Rejouer ce GET est toujours sans risque.
 */

const sequencesDb = supabaseAdmin as unknown as SequencesDb;

export async function GET(req: NextRequest) {
  const denied = requireWebhookToken(req);
  if (denied) return denied;

  try {
    const { due, skipped } = await computeDueSends(sequencesDb);
    return NextResponse.json({ due, skipped }, { status: 200 });
  } catch (err) {
    console.error('[api/prospection/sequences/due] GET failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
