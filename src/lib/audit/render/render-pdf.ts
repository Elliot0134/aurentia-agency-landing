import { withBrowserlessRetry } from '../browserless-retry';
import type { BrowserlessConfig } from '../screenshot';

const base = (c: BrowserlessConfig) => c.baseUrl ?? 'https://production-sfo.browserless.io';

/** Rend un HTML en PDF A4 via Browserless /pdf. Retry x5 (free tier). */
export async function renderPdf(html: string, config: BrowserlessConfig, fetchFn: typeof fetch = fetch): Promise<Buffer> {
  return withBrowserlessRetry('pdf', async () => {
    const res = await fetchFn(`${base(config)}/pdf?token=${config.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html,
        options: { format: 'A4', printBackground: true, margin: { top: '0', bottom: '0', left: '0', right: '0' } },
      }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) throw new Error(`Browserless /pdf → ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  });
}
