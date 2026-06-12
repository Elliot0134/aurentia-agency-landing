import { NextResponse, type NextRequest } from 'next/server';
import { requireWebhookToken } from '@/lib/prospection/api-auth';
import { listLeadsChangedSince } from '@/lib/prospection/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * WF4 descendant (Supabase → Notion) : leads modifiés depuis `since` (ISO),
 * pour que n8n upsert les pages miroir Notion. Limite 100, tri updated_at
 * croissant ; la réponse inclut `serverTime`, à réutiliser comme curseur
 * `since` de l'appel suivant (jamais d'horloge n8n : seule l'horloge serveur
 * fait foi, aucun lead raté entre deux runs).
 */

const MAX_LEADS = 100;

export async function GET(req: NextRequest) {
  const denied = requireWebhookToken(req);
  if (denied) return denied;

  const since = req.nextUrl.searchParams.get('since');
  if (!since || Number.isNaN(Date.parse(since))) {
    return NextResponse.json({ error: 'invalid_since', message: 'paramètre since requis (date ISO 8601)' }, { status: 400 });
  }

  // serverTime capturé AVANT la lecture : un lead modifié pendant la requête
  // sera revu au run suivant (doublon possible, perte impossible).
  const serverTime = new Date().toISOString();

  try {
    const leads = await listLeadsChangedSince(new Date(since).toISOString(), undefined, MAX_LEADS);
    return NextResponse.json({ leads, serverTime }, { status: 200 });
  } catch (err) {
    console.error('[api/prospection/leads/changed] GET failed', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
