import type { Annotation, ImageRect, Measurement } from './types';
import { withBrowserlessRetry } from './browserless-retry';

export interface BrowserlessConfig {
  token: string;
  baseUrl?: string; // défaut : https://production-sfo.browserless.io
}

const base = (c: BrowserlessConfig) => c.baseUrl ?? 'https://production-sfo.browserless.io';

/** Capture full-page PNG (le scroll natif de fullPage déclenche le lazy-loading). */
export async function captureScreenshot(
  url: string,
  config: BrowserlessConfig,
  fetchFn: typeof fetch = fetch
): Promise<Buffer> {
  return withBrowserlessRetry('screenshot', async () => {
    const res = await fetchFn(`${base(config)}/screenshot?token=${config.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        options: { fullPage: true, type: 'png' },
        viewport: { width: 1440, height: 1200 },
        gotoOptions: { waitUntil: 'load', timeout: 30_000 },
      }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) throw new Error(`Browserless /screenshot → ${res.status} pour ${url}`);
    return Buffer.from(await res.arrayBuffer());
  });
}

/** Récupère la position de chaque <img> dans la page (coordonnées document). */
export async function getImageRects(
  url: string,
  config: BrowserlessConfig,
  fetchFn: typeof fetch = fetch
): Promise<ImageRect[]> {
  const code = `
export default async function ({ page, context }) {
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto(context.url, { waitUntil: 'load', timeout: 30000 });
  const rects = await page.evaluate(() =>
    Array.from(document.images).map((img) => {
      const r = img.getBoundingClientRect();
      return {
        src: img.currentSrc || img.src,
        x: Math.round(r.x + window.scrollX),
        y: Math.round(r.y + window.scrollY),
        width: Math.round(r.width),
        height: Math.round(r.height),
      };
    })
  );
  return { data: rects, type: 'application/json' };
}`;
  return withBrowserlessRetry('function', async () => {
    const res = await fetchFn(`${base(config)}/function?token=${config.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, context: { url } }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) throw new Error(`Browserless /function → ${res.status} pour ${url}`);
    const json = (await res.json()) as { data?: ImageRect[] };
    return json.data ?? [];
  });
}

/**
 * Croise les positions d'images avec les measurements en échec.
 * SEULES les measurements images.broken.* (preuve HTTP) produisent une annotation.
 * Aucun jugement visuel ne peut entrer ici : c'est structurel.
 */
export function buildAnnotations(rects: ImageRect[], measurements: Measurement[]): Annotation[] {
  const broken = measurements.filter((m) => m.id.startsWith('images.broken.') && m.status === 'fail');
  const annotations: Annotation[] = [];
  for (const m of broken) {
    const rect = rects.find((r) => r.src === m.value && r.width > 0 && r.height > 0);
    if (rect) {
      annotations.push({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        measurementId: m.id,
        note: `Cette image ne se charge pas (${m.proof ?? 'erreur HTTP'})`,
      });
    }
  }
  return annotations;
}
