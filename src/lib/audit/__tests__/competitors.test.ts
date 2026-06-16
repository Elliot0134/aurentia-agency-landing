import { describe, it, expect } from 'vitest';
import {
  buildCompetitorQuery,
  selectCompetitorUrls,
  describeSite,
  findSimilarCompetitors,
  searchCompetitorsByQuery,
  classifyBusinessScope,
  auditCompetitors,
  type ScopeClassifyFn,
} from '../competitors';

function jsonFetch(payload: unknown, status = 200): typeof fetch {
  return (async () => new Response(JSON.stringify(payload), { status })) as typeof fetch;
}

describe('buildCompetitorQuery', () => {
  it('local : secteur + ville', () => {
    expect(
      buildCompetitorQuery({ type: 'local', city: 'marseille', sector: 'conciergerie', scoreLocal: 5, scoreNational: 0 }, 'maconciergerie.fr')
    ).toBe('conciergerie marseille');
  });
  it('national : alternatives à la marque', () => {
    expect(
      buildCompetitorQuery({ type: 'national', city: null, sector: 'saas-b2b', scoreLocal: 0, scoreNational: 5 }, 'notory.fr')
    ).toBe('alternatives à notory');
  });
});

describe('selectCompetitorUrls', () => {
  it('exclut les annuaires, le domaine audité, et déduplique par domaine', () => {
    const results = [
      'https://www.pagesjaunes.fr/conciergerie',
      'https://maconciergerie.fr/services',
      'https://concurrent-a.fr/',
      'https://concurrent-a.fr/tarifs',
      'https://www.tripadvisor.fr/x',
      'https://concurrent-b.fr/',
      'https://concurrent-c.fr/',
      'https://concurrent-d.fr/',
    ];
    const selected = selectCompetitorUrls(results, 'maconciergerie.fr', 3);
    expect(selected).toEqual(['https://concurrent-a.fr/', 'https://concurrent-b.fr/', 'https://concurrent-c.fr/']);
  });
});

describe('describeSite', () => {
  it('retourne le summary du premier résultat', async () => {
    const fetchFn = jsonFetch({ results: [{ summary: 'Conciergerie Airbnb à Marseille.' }] });
    expect(await describeSite('https://x.fr', 'KEY', fetchFn)).toBe('Conciergerie Airbnb à Marseille.');
  });
  it('retourne null si pas de résultat', async () => {
    const fetchFn = jsonFetch({ results: [] });
    expect(await describeSite('https://x.fr', 'KEY', fetchFn)).toBeNull();
  });
  it('retourne null (ne throw pas) sur HTTP non-ok', async () => {
    const fetchFn = jsonFetch({}, 500);
    expect(await describeSite('https://x.fr', 'KEY', fetchFn)).toBeNull();
  });
  it('retourne null (ne throw pas) sur erreur réseau', async () => {
    const fetchFn = (async () => {
      throw new Error('network down');
    }) as typeof fetch;
    expect(await describeSite('https://x.fr', 'KEY', fetchFn)).toBeNull();
  });
});

describe('findSimilarCompetitors', () => {
  it('filtre via selectCompetitorUrls et retourne jusqu’à 3 URLs', async () => {
    const fetchFn = jsonFetch({
      results: [
        { url: 'https://www.pagesjaunes.fr/x' },
        { url: 'https://maconciergerie.fr/a' },
        { url: 'https://concurrent-a.fr/' },
        { url: 'https://concurrent-a.fr/dup' },
        { url: 'https://concurrent-b.fr/' },
        { url: 'https://concurrent-c.fr/' },
        { url: 'https://concurrent-d.fr/' },
      ],
    });
    expect(await findSimilarCompetitors('https://maconciergerie.fr', 'maconciergerie.fr', 'KEY', fetchFn)).toEqual([
      'https://concurrent-a.fr/',
      'https://concurrent-b.fr/',
      'https://concurrent-c.fr/',
    ]);
  });
  it('retourne [] sur erreur', async () => {
    const fetchFn = jsonFetch({}, 500);
    expect(await findSimilarCompetitors('https://x.fr', 'x.fr', 'KEY', fetchFn)).toEqual([]);
  });
});

describe('searchCompetitorsByQuery', () => {
  it('cherche via la requête fournie, filtre et déduplique', async () => {
    let sentBody: unknown;
    const fetchFn = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      sentBody = JSON.parse(String(init?.body));
      return new Response(
        JSON.stringify({
          results: [
            { url: 'https://www.pagesjaunes.fr/x' },
            { url: 'https://maconciergerie.fr/a' },
            { url: 'https://concurrent-a.fr/' },
            { url: 'https://concurrent-a.fr/dup' },
            { url: 'https://concurrent-b.fr/' },
            { url: 'https://concurrent-c.fr/' },
            { url: 'https://concurrent-d.fr/' },
          ],
        }),
        { status: 200 }
      );
    }) as typeof fetch;
    const out = await searchCompetitorsByQuery('agence web Avignon', 'maconciergerie.fr', 'KEY', fetchFn);
    expect(out).toEqual(['https://concurrent-a.fr/', 'https://concurrent-b.fr/', 'https://concurrent-c.fr/']);
    expect(sentBody).toMatchObject({ query: 'agence web Avignon', numResults: 10, type: 'keyword' });
  });
  it('retourne [] sur erreur', async () => {
    const fetchFn = jsonFetch({}, 500);
    expect(await searchCompetitorsByQuery('q', 'x.fr', 'KEY', fetchFn)).toEqual([]);
  });
});

describe('classifyBusinessScope', () => {
  it('description null → fallback national (findSimilar)', async () => {
    expect(await classifyBusinessScope(null, 'Lyon')).toEqual({ isLocal: false, geoQuery: null });
  });
  it('description vide → fallback national', async () => {
    expect(await classifyBusinessScope('   ', 'Lyon')).toEqual({ isLocal: false, geoQuery: null });
  });
  it('passe description + ville au classifyFn et retourne son verdict', async () => {
    let seen: { description: string; city: string | null } | null = null;
    const classifyFn: ScopeClassifyFn = async (description, city) => {
      seen = { description, city };
      return { isLocal: true, geoQuery: 'restaurant italien Lyon' };
    };
    const out = await classifyBusinessScope('Un restaurant italien à Lyon', 'Lyon', { classifyFn });
    expect(out).toEqual({ isLocal: true, geoQuery: 'restaurant italien Lyon' });
    expect(seen).toEqual({ description: 'Un restaurant italien à Lyon', city: 'Lyon' });
  });
  it('ne throw pas si classifyFn échoue → fallback national', async () => {
    const classifyFn: ScopeClassifyFn = async () => {
      throw new Error('LLM down');
    };
    expect(await classifyBusinessScope('Un SaaS', null, { classifyFn })).toEqual({ isLocal: false, geoQuery: null });
  });
});

describe('auditCompetitors', () => {
  const PSI_OK = {
    lighthouseResult: { categories: { performance: { score: 0.8 }, seo: { score: 0.9 } }, audits: {} },
  };

  it('aucun retry : un concurrent en 500 ne déclenche qu\'UN appel PSI (best-effort)', async () => {
    const calls = new Map<string, number>();
    const fetchFn = (async (input: RequestInfo | URL) => {
      const u = String(input);
      calls.set(u, (calls.get(u) ?? 0) + 1);
      // a.fr OK, b.fr toujours 500 (doit être sauté sans s'acharner)
      return u.includes('strategy=mobile') && u.includes('b.fr')
        ? new Response('{}', { status: 500 })
        : new Response(JSON.stringify(PSI_OK), { status: 200 });
    }) as typeof fetch;

    const out = await auditCompetitors(['https://a.fr/', 'https://b.fr/'], 'KEY', fetchFn);
    expect(out.map((c) => c.domain)).toEqual(['a.fr']); // b.fr sauté
    // b.fr ne doit avoir été appelé qu'une fois (aucun retry)
    const bCalls = [...calls.entries()].filter(([u]) => u.includes('b.fr')).reduce((n, [, c]) => n + c, 0);
    expect(bCalls).toBe(1);
  });
});
