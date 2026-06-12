import { withBrowserlessRetry } from '../browserless-retry';
import type { BrowserlessConfig } from '../screenshot';

const base = (c: BrowserlessConfig) => c.baseUrl ?? 'https://production-sfo.browserless.io';

/**
 * Footer natif Chromium (les margin boxes CSS @page sont ignorées par Chromium) :
 * mention confidentialité à gauche, "Page X / Y" à droite. Le header vide masque
 * le titre/date par défaut de Chromium.
 */
const FOOTER_TEMPLATE = `
  <div style="width:100%;font-family:Arial,sans-serif;font-size:8px;color:#94908a;
              padding:0 14mm;display:flex;justify-content:space-between;">
    <span>Aurentia Agency &middot; Audit confidentiel</span>
    <span>Page <span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;

/** Rend un HTML en PDF A4 via Browserless /pdf. Retry x5 (free tier). */
export async function renderPdf(html: string, config: BrowserlessConfig, fetchFn: typeof fetch = fetch): Promise<Buffer> {
  return withBrowserlessRetry('pdf', async () => {
    const res = await fetchFn(`${base(config)}/pdf?token=${config.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html,
        options: {
          format: 'A4',
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: '<span></span>',
          footerTemplate: FOOTER_TEMPLATE,
          margin: { top: '14mm', bottom: '16mm', left: '0', right: '0' },
        },
      }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) throw new Error(`Browserless /pdf → ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  });
}
