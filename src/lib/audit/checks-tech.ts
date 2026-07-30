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

  // --------------------------------------------------------------------------
  // Contrôles discriminants.
  //
  // Les six checks ci-dessus testent une PRESENCE : tout WordPress + Yoast les
  // passe le jour de son installation, donc 6/6 et 10/10 sur l'axe SEO technique
  // quel que soit l'état réel du site. Ceux qui suivent distinguent un site
  // correctement configuré d'un site qui ne l'est pas, et restent tous
  // vérifiables par le prospect en quelques secondes.
  // --------------------------------------------------------------------------

  // Canonical auto-référente : une canonical qui pointe ailleurs fait
  // disparaître la page des résultats au profit de l'URL désignée.
  const canonical = $('link[rel="canonical"]').attr('href');
  let canonicalSelf = false;
  if (canonical) {
    try {
      canonicalSelf = new URL(canonical, pageUrl).href.replace(/\/$/, '') === pageUrl.replace(/\/$/, '');
    } catch {
      canonicalSelf = false;
    }
  }
  ms.push(
    M({
      id: 'tech.canonical.self',
      label: 'Balise canonical auto-référente',
      status: canonicalSelf ? 'pass' : 'fail',
      value: canonical ?? null,
      proof: canonical ? `canonical = ${canonical} (URL finale : ${pageUrl})` : 'aucune balise canonical dans le <head>',
    })
  );

  // noindex : la page se retire d'elle-même de Google. Rare mais fatal, et
  // fréquent après une mise en ligne depuis un environnement de préproduction.
  const metaRobots = $('meta[name="robots"]').attr('content') ?? '';
  const noindex = /noindex/i.test(metaRobots);
  ms.push(
    M({
      id: 'tech.indexable',
      label: 'Page indexable (pas de noindex)',
      status: noindex ? 'fail' : 'pass',
      value: metaRobots || 'aucune directive',
      proof: `<meta name="robots"> = ${metaRobots || 'absente'}`,
    })
  );

  // Langue déclarée : sans elle, moteurs et lecteurs d'écran devinent.
  const lang = $('html').attr('lang');
  ms.push(
    M({
      id: 'tech.html.lang',
      label: 'Langue du site déclarée (<html lang>)',
      status: lang ? 'pass' : 'fail',
      value: lang ?? null,
      proof: lang ? `<html lang="${lang}">` : 'attribut lang absent sur <html>',
    })
  );

  // Sitemap déclaré dans robots.txt : c'est là que les moteurs le cherchent.
  ms.push(
    M({
      id: 'tech.robots.sitemap-declared',
      label: 'Sitemap déclaré dans robots.txt',
      status: declared ? 'pass' : 'fail',
      value: declared ?? null,
      proof: declared ? `ligne « Sitemap: ${declared} »` : 'aucune ligne Sitemap dans robots.txt',
    })
  );

  // Soft-404 : une URL inexistante qui répond 200 fait indexer des pages vides
  // et brouille le crawl. Le chemin est fixe pour que le prospect le rejoue.
  const probeUrl = `${origin}/aurentia-404-probe`;
  let probeStatus = 0;
  let probeBytes = 0;
  try {
    const res = await fetchFn(probeUrl, { signal: AbortSignal.timeout(10_000) });
    probeStatus = res.status;
    probeBytes = (await res.text()).length;
  } catch {
    probeStatus = 0;
  }
  ms.push(
    M({
      id: 'tech.404.real',
      label: 'URL inexistante renvoyant une vraie erreur 404',
      status: probeStatus >= 400 && probeStatus < 500 ? 'pass' : 'fail',
      value: probeStatus,
      unit: 'HTTP',
      proof: `GET ${probeUrl} → ${probeStatus || 'erreur réseau'}`,
    })
  );
  // Poids de la page d'erreur : au-delà de 100 Ko, chaque 404 (lien mort,
  // ancienne URL, crawl) coûte une page complète en bande passante.
  if (probeBytes > 0) {
    const ko = Math.round(probeBytes / 1024);
    ms.push(
      M({
        id: 'tech.404.weight',
        label: 'Poids de la page d’erreur 404',
        status: ko > 100 ? 'warn' : 'pass',
        value: ko,
        unit: 'Ko',
        proof: `GET ${probeUrl} → ${ko} Ko de HTML`,
      })
    );
  }

  // HSTS : sans cet en-tête, la toute première visite passe en clair et reste
  // interceptable, même si le site redirige ensuite vers HTTPS.
  let hsts: string | null = null;
  try {
    const res = await fetchFn(pageUrl, { signal: AbortSignal.timeout(10_000) });
    hsts = res.headers.get('strict-transport-security');
  } catch {
    hsts = null;
  }
  ms.push(
    M({
      id: 'tech.hsts',
      label: 'En-tête HSTS (HTTPS forcé dès la première visite)',
      status: hsts ? 'pass' : 'fail',
      value: hsts,
      proof: hsts ? `Strict-Transport-Security: ${hsts}` : 'en-tête Strict-Transport-Security absent de la réponse',
    })
  );

  return ms;
}
