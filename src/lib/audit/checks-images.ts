import type { CheerioAPI } from 'cheerio';
import type { Measurement } from './types';

const MAX_IMAGES = 20;

const M = (m: Omit<Measurement, 'module'>): Measurement => ({ ...m, module: 'images' });

/**
 * RÈGLE D'ACIER : une image n'est un défaut QUE si son src répond en erreur HTTP.
 * Vérifie les MAX_IMAGES premières images de la page (HEAD, fallback GET si 405).
 */
export async function checkImages(
  $: CheerioAPI,
  pageUrl: string,
  fetchFn: typeof fetch = fetch
): Promise<Measurement[]> {
  const srcs = $('img')
    .map((_, el) => $(el).attr('src') ?? '')
    .get()
    .filter((s) => s && !s.startsWith('data:'))
    .map((s) => new URL(s, pageUrl).href)
    .slice(0, MAX_IMAGES);

  const results = await Promise.all(
    srcs.map(async (src) => {
      try {
        let res = await fetchFn(src, { method: 'HEAD', signal: AbortSignal.timeout(10_000) });
        if (res.status === 405) {
          res = await fetchFn(src, { method: 'GET', signal: AbortSignal.timeout(10_000) });
        }
        return { src, status: res.status };
      } catch {
        return { src, status: 0 };
      }
    })
  );

  const broken = results.filter((r) => r.status >= 400 || r.status === 0);
  const ms: Measurement[] = [
    M({
      id: 'images.broken',
      label: 'Images de la page qui répondent correctement',
      status: broken.length === 0 ? 'pass' : 'fail',
      value: broken.length,
      unit: 'images cassées',
      proof: `${results.length} src testés en HTTP (HEAD) sur ${pageUrl}`,
    }),
  ];
  broken.forEach((b, i) => {
    ms.push(
      M({
        id: `images.broken.${i + 1}`,
        label: 'Image cassée (src en erreur HTTP)',
        status: 'fail',
        value: b.src,
        proof: `HEAD ${b.src} → ${b.status || 'erreur réseau'}`,
        details: b.src,
      })
    );
  });
  return ms;
}
