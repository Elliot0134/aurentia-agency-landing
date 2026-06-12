import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import { checkAiReadiness } from '../ai-readiness';
import type { Measurement } from '../types';

/** HTML riche : schemas pertinents (dont FAQPage) + sameAs + 3 paragraphes factuels + 2 titres en question. */
const RICH_HTML = `<html><head>
  <script type="application/ld+json">{"@type":"LocalBusiness","name":"Exemple","sameAs":["https://www.youtube.com/@exemple","https://www.linkedin.com/company/exemple"]}</script>
  <script type="application/ld+json">{"@type":"WebSite","url":"https://exemple.fr"}</script>
  <script type="application/ld+json">{"@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Quels sont vos horaires ?"}]}</script>
  </head><body>
  <p>Notre atelier est situé au 12 rue des Lices, 84000 Avignon, à deux pas du centre.</p>
  <h2>Quels sont nos horaires d'ouverture ?</h2>
  <p>Nous sommes ouverts du lundi au samedi de 9h à 19h, sans interruption.</p>
  <h3>Comment venir jusqu'à l'atelier ?</h3>
  <p>Plus de 250 clients nous font confiance depuis 2018 dans tout le Vaucluse.</p>
  <h2>Nos services</h2>
  <p>Bienvenue sur notre site.</p>
  </body></html>`;

/** HTML pauvre : aucun schema, aucun paragraphe factuel. */
const POOR_HTML = `<html><head></head><body>
  <p>Bienvenue sur notre site, nous serons ravis de vous accueillir très bientôt.</p>
  </body></html>`;

const EXA_FIVE_RESULTS = JSON.stringify({
  results: [
    { url: 'https://exemple.fr/a-propos' },
    { url: 'https://www.exemple.fr/contact' },
    { url: 'https://annuaire-artisans.fr/exemple' },
    { url: 'https://www.lejournal.fr/article-exemple' },
    { url: 'https://avis-locaux.fr/exemple-avignon' },
  ],
});

interface StubOptions {
  llmsStatus?: number;
  llmsBody?: string;
  exaStatus?: number;
  exaBody?: string;
  exaThrows?: boolean;
}

function makeFetch(opts: StubOptions = {}): typeof fetch {
  return (async (input: RequestInfo | URL) => {
    const u = String(input);
    if (u.endsWith('/llms.txt')) {
      return new Response(opts.llmsBody ?? 'not found', { status: opts.llmsStatus ?? 404 });
    }
    if (u.includes('api.exa.ai/search')) {
      if (opts.exaThrows) throw new Error('réseau coupé');
      return new Response(opts.exaBody ?? EXA_FIVE_RESULTS, { status: opts.exaStatus ?? 200 });
    }
    throw new Error(`URL inattendue dans le stub : ${u}`);
  }) as typeof fetch;
}

async function run(html: string, robotsTxt: string | null, opts: StubOptions = {}): Promise<Measurement[]> {
  return checkAiReadiness({
    finalUrl: 'https://exemple.fr/',
    $: cheerio.load(html),
    robotsTxt,
    brand: 'exemple',
    exaApiKey: 'EXA',
    fetchFn: makeFetch(opts),
  });
}

const byId = (ms: Measurement[], id: string): Measurement => {
  const m = ms.find((x) => x.id === id);
  if (!m) throw new Error(`measurement ${id} absente`);
  return m;
};

describe('checkAiReadiness', () => {
  it('tous les measurements portent le module ai-readiness et un id préfixé ai.', async () => {
    const ms = await run(RICH_HTML, null);
    expect(ms.length).toBeGreaterThanOrEqual(8);
    for (const m of ms) {
      expect(m.module).toBe('ai-readiness');
      expect(m.id.startsWith('ai.')).toBe(true);
    }
  });

  describe('ai.llms-txt', () => {
    it('404 → fail avec le code HTTP en preuve', async () => {
      const m = byId(await run(RICH_HTML, null, { llmsStatus: 404 }), 'ai.llms-txt');
      expect(m.status).toBe('fail');
      expect(m.proof).toContain('404');
    });

    it('200 avec contenu texte → pass', async () => {
      const m = byId(
        await run(RICH_HTML, null, { llmsStatus: 200, llmsBody: '# Exemple\n\nSite vitrine artisan.' }),
        'ai.llms-txt',
      );
      expect(m.status).toBe('pass');
      expect(m.proof).toContain('200');
    });

    it("200 mais contenu HTML (page d'erreur soft-404) → fail", async () => {
      const m = byId(
        await run(RICH_HTML, null, { llmsStatus: 200, llmsBody: '<!DOCTYPE html><html><body>404</body></html>' }),
        'ai.llms-txt',
      );
      expect(m.status).toBe('fail');
    });
  });

  describe('ai.robots.ai-agents', () => {
    it('GPTBot bloqué par Disallow: / → fail avec GPTBot listé', async () => {
      const m = byId(await run(RICH_HTML, 'User-agent: GPTBot\nDisallow: /'), 'ai.robots.ai-agents');
      expect(m.status).toBe('fail');
      expect(String(m.value)).toContain('GPTBot');
    });

    it('robots absent → pass, aucun blocage', async () => {
      const m = byId(await run(RICH_HTML, null), 'ai.robots.ai-agents');
      expect(m.status).toBe('pass');
      expect(m.value).toBe('aucun blocage');
    });

    it('robots sans blocage IA (Disallow partiel ou autre agent) → pass', async () => {
      const robots = 'User-agent: *\nDisallow: /admin\n\nUser-agent: GPTBot\nDisallow: /prive';
      const m = byId(await run(RICH_HTML, robots), 'ai.robots.ai-agents');
      expect(m.status).toBe('pass');
      expect(m.value).toBe('aucun blocage');
    });

    it('plusieurs agents IA bloqués dans un même groupe → tous listés', async () => {
      const robots = 'User-agent: GPTBot\nUser-agent: CCBot\nDisallow: /';
      const m = byId(await run(RICH_HTML, robots), 'ai.robots.ai-agents');
      expect(m.status).toBe('fail');
      expect(String(m.value)).toContain('GPTBot');
      expect(String(m.value)).toContain('CCBot');
    });
  });

  describe('ai.schema.richness et ai.schema.sameas', () => {
    it('2 types pertinents + sameAs → pass sur les deux', async () => {
      const ms = await run(RICH_HTML, null);
      const richness = byId(ms, 'ai.schema.richness');
      expect(richness.status).toBe('pass');
      expect(String(richness.value)).toContain('LocalBusiness');
      expect(String(richness.value)).toContain('WebSite');
      const sameas = byId(ms, 'ai.schema.sameas');
      expect(sameas.status).toBe('pass');
      expect(sameas.details).toContain('youtube.com');
    });

    it('1 seul type pertinent → warn', async () => {
      const html = `<html><head><script type="application/ld+json">{"@type":"Organization"}</script></head><body></body></html>`;
      const m = byId(await run(html, null), 'ai.schema.richness');
      expect(m.status).toBe('warn');
    });

    it('aucun schema → fail sur richness et sameas', async () => {
      const ms = await run(POOR_HTML, null);
      expect(byId(ms, 'ai.schema.richness').status).toBe('fail');
      expect(byId(ms, 'ai.schema.sameas').status).toBe('fail');
    });
  });

  describe('ai.faq.schema', () => {
    it('FAQPage présent dans le JSON-LD → pass', async () => {
      const m = byId(await run(RICH_HTML, null), 'ai.faq.schema');
      expect(m.status).toBe('pass');
      expect(m.value).toBe(true);
      expect(m.details).toBeUndefined();
    });

    it('aucun FAQPage → fail avec le détail pédagogique', async () => {
      const m = byId(await run(POOR_HTML, null), 'ai.faq.schema');
      expect(m.status).toBe('fail');
      expect(m.value).toBe(false);
      expect(m.details).toContain('moteurs de réponse');
    });

    it("d'autres schemas sans FAQPage → fail quand même (check dédié)", async () => {
      const html = `<html><head><script type="application/ld+json">{"@type":"Organization"}</script></head><body></body></html>`;
      const m = byId(await run(html, null), 'ai.faq.schema');
      expect(m.status).toBe('fail');
    });
  });

  describe('ai.headings.questions', () => {
    it('2 titres en question ou plus → pass, value = count', async () => {
      const m = byId(await run(RICH_HTML, null), 'ai.headings.questions');
      expect(m.status).toBe('pass');
      expect(m.value).toBe(2);
      expect(m.details).toContain('AEO');
    });

    it('1 seul titre en question → warn, value 1', async () => {
      const html = `<html><body><h2>Combien ça coûte ?</h2><h2>Nos services</h2></body></html>`;
      const m = byId(await run(html, null), 'ai.headings.questions');
      expect(m.status).toBe('warn');
      expect(m.value).toBe(1);
    });

    it('aucun titre en question → fail, value 0', async () => {
      const m = byId(await run(POOR_HTML, null), 'ai.headings.questions');
      expect(m.status).toBe('fail');
      expect(m.value).toBe(0);
    });
  });

  describe('ai.citability', () => {
    it('3 paragraphes factuels (adresse, horaires, chiffres) → pass, value 3', async () => {
      const m = byId(await run(RICH_HTML, null), 'ai.citability');
      expect(m.status).toBe('pass');
      expect(m.value).toBe(3);
    });

    it('aucun paragraphe factuel → fail, value 0', async () => {
      const m = byId(await run(POOR_HTML, null), 'ai.citability');
      expect(m.status).toBe('fail');
      expect(m.value).toBe(0);
    });

    it('1 paragraphe factuel → warn', async () => {
      const html = `<html><body><p>Ouvert du mardi au samedi de 10h à 18h dans notre boutique du centre-ville.</p></body></html>`;
      const m = byId(await run(html, null), 'ai.citability');
      expect(m.status).toBe('warn');
      expect(m.value).toBe(1);
    });
  });

  describe('ai.mentions.external', () => {
    it('5 résultats Exa dont 2 du domaine audité → value 3, pass', async () => {
      const m = byId(await run(RICH_HTML, null), 'ai.mentions.external');
      expect(m.status).toBe('pass');
      expect(m.value).toBe(3);
      expect(m.proof).toContain('annuaire-artisans.fr');
      expect(m.proof).not.toContain('exemple.fr');
    });

    it('aucune mention externe → fail, value 0', async () => {
      const m = byId(
        await run(RICH_HTML, null, { exaBody: JSON.stringify({ results: [{ url: 'https://exemple.fr/x' }] }) }),
        'ai.mentions.external',
      );
      expect(m.status).toBe('fail');
      expect(m.value).toBe(0);
    });

    it('1 à 2 mentions externes → warn', async () => {
      const m = byId(
        await run(RICH_HTML, null, {
          exaBody: JSON.stringify({ results: [{ url: 'https://blog.fr/a' }, { url: 'https://exemple.fr/b' }] }),
        }),
        'ai.mentions.external',
      );
      expect(m.status).toBe('warn');
      expect(m.value).toBe(1);
    });

    it('erreur réseau Exa → info, value null, aucune fausse conclusion', async () => {
      const m = byId(await run(RICH_HTML, null, { exaThrows: true }), 'ai.mentions.external');
      expect(m.status).toBe('info');
      expect(m.value).toBeNull();
      expect(m.details).toContain('indisponible');
    });

    it('Exa répond non-200 → info, value null', async () => {
      const m = byId(await run(RICH_HTML, null, { exaStatus: 500 }), 'ai.mentions.external');
      expect(m.status).toBe('info');
      expect(m.value).toBeNull();
    });
  });
});
