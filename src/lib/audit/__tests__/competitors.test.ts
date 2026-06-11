import { describe, it, expect } from 'vitest';
import { buildCompetitorQuery, selectCompetitorUrls, describeSite, findSimilarCompetitors } from '../competitors';

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
