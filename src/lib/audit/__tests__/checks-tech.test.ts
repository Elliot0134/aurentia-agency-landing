import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import { checkTech } from '../checks-tech';
import type { Measurement } from '../types';

/** fetch stub : route → Response */
const router = (routes: Record<string, { body?: string; status?: number }>): typeof fetch =>
  (async (input: RequestInfo | URL) => {
    const u = String(input);
    const hit = Object.entries(routes).find(([path]) => u.endsWith(path));
    if (!hit) return new Response('not found', { status: 404 });
    return new Response(hit[1].body ?? '', { status: hit[1].status ?? 200 });
  }) as typeof fetch;

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
