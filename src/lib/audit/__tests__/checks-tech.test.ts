import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import { checkTech } from '../checks-tech';
import type { Measurement } from '../types';

/** fetch stub : route → Response */
const router = (routes: Record<string, { body?: string; status?: number; headers?: Record<string, string> }>): typeof fetch =>
  (async (input: RequestInfo | URL) => {
    const u = String(input);
    const hit = Object.entries(routes).find(([path]) => u.endsWith(path));
    if (!hit) return new Response('not found', { status: 404 });
    return new Response(hit[1].body ?? '', { status: hit[1].status ?? 200, headers: hit[1].headers });
  }) as typeof fetch;

/**
 * Routes minimales d'un site sain, pour les tests qui ne portent pas dessus.
 * La sonde 404 tape une URL aléatoire : le routeur renvoie 404 par défaut.
 */
const HEALTHY = {
  '/robots.txt': { body: 'User-agent: *\nSitemap: https://exemple.fr/sitemap.xml' },
  '/sitemap.xml': { body: '<?xml version="1.0"?><urlset></urlset>' },
};

const byId = (ms: Measurement[], id: string): Measurement | undefined => ms.find((m) => m.id === id);

describe('checkTech', () => {
  it('valide un site bien configuré', async () => {
    const $ = cheerio.load(`<html><head>
      <meta property="og:title" content="X"><meta property="og:image" content="/og.png">
      <script type="application/ld+json">{"@type":"LocalBusiness"}</script>
    </head></html>`);
    const ms = await checkTech(
      $,
      'https://exemple.fr',
      router({
        '/robots.txt': { body: 'User-agent: *\nSitemap: https://exemple.fr/sitemap.xml' },
        '/sitemap.xml': { body: '<?xml version="1.0"?><urlset></urlset>' },
      })
    );
    expect(byId(ms, 'tech.robots.present')?.status).toBe('pass');
    expect(byId(ms, 'tech.sitemap.present')?.status).toBe('pass');
    expect(byId(ms, 'tech.schema.present')?.status).toBe('pass');
    expect(byId(ms, 'tech.og.present')?.status).toBe('pass');
    expect(byId(ms, 'tech.https')?.status).toBe('pass');
  });

  it('détecte robots et sitemap absents, pas de schema, pas d\'OG, pas de https', async () => {
    const $ = cheerio.load('<html><head></head></html>');
    const ms = await checkTech($, 'http://exemple.fr', router({}));
    expect(byId(ms, 'tech.robots.present')?.status).toBe('fail');
    expect(byId(ms, 'tech.sitemap.present')?.status).toBe('fail');
    expect(byId(ms, 'tech.schema.present')?.status).toBe('fail');
    expect(byId(ms, 'tech.og.present')?.status).toBe('fail');
    expect(byId(ms, 'tech.https')?.status).toBe('fail');
  });
});

/**
 * Contrôles ajoutés le 2026-07-30. Motif : l'axe SEO technique reposait sur six
 * tests de PRESENCE (https, robots, sitemap, schema, OG, viewport) que tout
 * WordPress + Yoast passe le jour de son installation. Six sur six, donc 10/10
 * mécaniquement, quel que soit l'état réel du site. Ces contrôles-ci mesurent
 * des choses qui discriminent, et restent tous vérifiables par le prospect.
 */
describe('checkTech : contrôles discriminants', () => {
  const head = (inner: string) => cheerio.load(`<html lang="fr"><head>${inner}</head></html>`);

  it('canonical auto-référente : pass quand elle pointe sur l’URL finale', async () => {
    const $ = head('<link rel="canonical" href="https://exemple.fr/">');
    const ms = await checkTech($, 'https://exemple.fr/', router(HEALTHY));
    expect(byId(ms, 'tech.canonical.self')?.status).toBe('pass');
  });

  it('canonical qui pointe ailleurs : fail (la page se désindexe au profit d’une autre)', async () => {
    const $ = head('<link rel="canonical" href="https://autre-site.fr/">');
    const ms = await checkTech($, 'https://exemple.fr/', router(HEALTHY));
    const m = byId(ms, 'tech.canonical.self');
    expect(m?.status).toBe('fail');
    expect(m?.proof).toContain('autre-site.fr');
  });

  it('meta robots noindex : fail (le site se retire de Google)', async () => {
    const $ = head('<meta name="robots" content="noindex, follow">');
    const ms = await checkTech($, 'https://exemple.fr/', router(HEALTHY));
    expect(byId(ms, 'tech.indexable')?.status).toBe('fail');
  });

  it('sans noindex : indexable pass', async () => {
    const ms = await checkTech(head(''), 'https://exemple.fr/', router(HEALTHY));
    expect(byId(ms, 'tech.indexable')?.status).toBe('pass');
  });

  it('attribut lang absent sur <html> : fail', async () => {
    const $ = cheerio.load('<html><head></head></html>');
    const ms = await checkTech($, 'https://exemple.fr/', router(HEALTHY));
    expect(byId(ms, 'tech.html.lang')?.status).toBe('fail');
  });

  it('sitemap déclaré dans robots.txt : pass', async () => {
    const ms = await checkTech(head(''), 'https://exemple.fr/', router(HEALTHY));
    expect(byId(ms, 'tech.robots.sitemap-declared')?.status).toBe('pass');
  });

  it('robots.txt sans ligne Sitemap : fail', async () => {
    const ms = await checkTech(
      head(''),
      'https://exemple.fr/',
      router({ '/robots.txt': { body: 'User-agent: *\nDisallow:' }, '/sitemap.xml': { body: '<urlset/>' } }),
    );
    expect(byId(ms, 'tech.robots.sitemap-declared')?.status).toBe('fail');
  });

  it('URL inexistante qui répond 404 : pass', async () => {
    const ms = await checkTech(head(''), 'https://exemple.fr/', router(HEALTHY));
    expect(byId(ms, 'tech.404.real')?.status).toBe('pass');
  });

  it('soft-404 (une URL inexistante répond 200) : fail', async () => {
    // Tout chemin répond 200 : le serveur ne distingue pas l'inexistant.
    const always200: typeof fetch = (async (input: RequestInfo | URL) => {
      const u = String(input);
      if (u.endsWith('/robots.txt')) return new Response('User-agent: *\nSitemap: https://exemple.fr/sitemap.xml', { status: 200 });
      return new Response('<html>page d accueil</html>', { status: 200 });
    }) as typeof fetch;
    const ms = await checkTech(head(''), 'https://exemple.fr/', always200);
    const m = byId(ms, 'tech.404.real');
    expect(m?.status).toBe('fail');
    expect(m?.proof).toContain('200');
  });

  it('HSTS présent dans les en-têtes : pass', async () => {
    const ms = await checkTech(
      head(''),
      'https://exemple.fr/',
      router({ ...HEALTHY, 'exemple.fr/': { headers: { 'strict-transport-security': 'max-age=63072000' } } }),
    );
    expect(byId(ms, 'tech.hsts')?.status).toBe('pass');
  });

  it('HSTS absent : fail', async () => {
    const ms = await checkTech(head(''), 'https://exemple.fr/', router(HEALTHY));
    expect(byId(ms, 'tech.hsts')?.status).toBe('fail');
  });

  it('page 404 anormalement lourde : warn chiffré', async () => {
    const gros = 'x'.repeat(300_000);
    const ms = await checkTech(
      head(''),
      'https://exemple.fr/',
      router({ ...HEALTHY, '404-probe': { body: gros, status: 404 } }),
    );
    const m = byId(ms, 'tech.404.weight');
    expect(m?.status).toBe('warn');
    expect(typeof m?.value).toBe('number');
  });

  it('tous les contrôles sont rattachés au module seo-tech (sinon ils ne pèsent pas sur l’axe)', async () => {
    const ms = await checkTech(head(''), 'https://exemple.fr/', router(HEALTHY));
    expect(ms.every((m) => m.module === 'seo-tech')).toBe(true);
    // 6 contrôles historiques + 7 nouveaux
    expect(ms.length).toBeGreaterThanOrEqual(13);
  });
});
