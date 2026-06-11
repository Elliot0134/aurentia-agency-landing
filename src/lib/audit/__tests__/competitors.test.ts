import { describe, it, expect } from 'vitest';
import { buildCompetitorQuery, selectCompetitorUrls } from '../competitors';

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
