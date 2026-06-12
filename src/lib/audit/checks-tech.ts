import type { CheerioAPI } from 'cheerio';
import type { Measurement } from './types';
import { extractJsonLd, jsonLdTypes } from './jsonld';

const M = (m: Omit<Measurement, 'module'>): Measurement => ({ ...m, module: 'seo-tech' });

export async function checkTech(
  $: CheerioAPI,
  pageUrl: string,
  fetchFn: typeof fetch = fetch
): Promise<Measurement[]> {
  const ms: Measurement[] = [];
  const origin = new URL(pageUrl).origin;

  // HTTPS
  ms.push(
    M({
      id: 'tech.https',
      label: 'Site servi en HTTPS',
      status: pageUrl.startsWith('https://') ? 'pass' : 'fail',
      value: pageUrl.startsWith('https://'),
      proof: `URL finale : ${pageUrl}`,
    })
  );

  // robots.txt
  let robotsBody = '';
  let robotsStatus = 0;
  try {
    const res = await fetchFn(`${origin}/robots.txt`, { signal: AbortSignal.timeout(10_000) });
    robotsStatus = res.status;
    if (res.ok) robotsBody = await res.text();
  } catch {
    robotsStatus = 0;
  }
  ms.push(
    M({
      id: 'tech.robots.present',
      label: 'Fichier robots.txt accessible',
      status: robotsStatus === 200 ? 'pass' : 'fail',
      value: robotsStatus,
      unit: 'HTTP',
      proof: `GET ${origin}/robots.txt → ${robotsStatus || 'erreur réseau'}`,
    })
  );

  // sitemap : URL déclarée dans robots, sinon /sitemap.xml
  const declared = robotsBody.match(/^sitemap:\s*(\S+)/im)?.[1];
  const sitemapUrl = declared ?? `${origin}/sitemap.xml`;
  let sitemapStatus = 0;
  try {
    const res = await fetchFn(sitemapUrl, { signal: AbortSignal.timeout(10_000) });
    sitemapStatus = res.status;
  } catch {
    sitemapStatus = 0;
  }
  ms.push(
    M({
      id: 'tech.sitemap.present',
      label: 'Sitemap XML accessible',
      status: sitemapStatus === 200 ? 'pass' : 'fail',
      value: sitemapStatus,
      unit: 'HTTP',
      proof: `GET ${sitemapUrl} → ${sitemapStatus || 'erreur réseau'}`,
    })
  );

  // Schema.org (JSON-LD)
  const types = jsonLdTypes(extractJsonLd($));
  ms.push(
    M({
      id: 'tech.schema.present',
      label: 'Données structurées Schema.org (JSON-LD)',
      status: types.length > 0 ? 'pass' : 'fail',
      value: types.length > 0 ? types.join(', ') : null,
      proof: `${types.length} type(s) JSON-LD trouvés dans le HTML`,
    })
  );

  // Open Graph
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  const ogOk = Boolean(ogTitle && ogImage);
  ms.push(
    M({
      id: 'tech.og.present',
      label: 'Balises Open Graph (partage réseaux sociaux)',
      status: ogOk ? 'pass' : 'fail',
      value: ogOk,
      proof: `og:title ${ogTitle ? 'présent' : 'absent'}, og:image ${ogImage ? 'présent' : 'absent'}`,
    })
  );

  // Viewport mobile
  const viewport = $('meta[name="viewport"]').attr('content');
  ms.push(
    M({
      id: 'tech.viewport.present',
      label: 'Meta viewport (compatibilité mobile)',
      status: viewport ? 'pass' : 'fail',
      value: viewport ?? null,
      proof: 'présence de <meta name="viewport"> dans le <head>',
    })
  );

  return ms;
}
