import { NextResponse, type NextRequest } from 'next/server';

/**
 * Auth machine-to-machine des routes /api/prospection/* : header
 * `x-webhook-token` comparé à l'env PROSPECTION_API_SECRET (cohérent avec le
 * pattern X-Webhook-Token des webhooks n8n existants).
 *
 * Env absente → 503 : l'endpoint est FERMÉ, jamais ouvert par oubli de config
 * (et le 503 distingue "mal configuré" de "mauvais token" dans les logs n8n).
 */
export function requireWebhookToken(req: NextRequest): NextResponse | null {
  const secret = process.env.PROSPECTION_API_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'endpoint_disabled' }, { status: 503 });
  }
  if (req.headers.get('x-webhook-token') !== secret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  return null;
}

/**
 * Notification Slack best-effort (même pattern que le webhook Stripe) : ne
 * throw jamais, un échec Slack ne doit jamais faire échouer la route.
 */
export async function postSlack(text: string): Promise<void> {
  const webhookUrl = process.env.SLACK_AUDIT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log(`[prospection] SLACK_AUDIT_WEBHOOK_URL absente, notification non envoyée : ${text}`);
    return;
  }
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) console.error(`[prospection] Slack a répondu ${res.status} : ${text}`);
  } catch (err) {
    console.error('[prospection] notification Slack échouée', err);
  }
}
