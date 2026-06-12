import { describe, it, expect } from 'vitest';
import { buildFunnelStages, buildHeatmapData } from '../funnel';
import type { AuditData, Measurement } from '../../types';

const audit = (over: Partial<AuditData> = {}): AuditData => ({
  url: 'https://x.fr',
  finalUrl: 'https://x.fr',
  tier: 'pro',
  collectedAt: '2026-06-12T00:00:00Z',
  description: null,
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'avignon', sector: 'conciergerie' },
  measurements: [],
  annotations: [],
  screenshotPath: null,
  competitors: [],
  impact: null,
  crawl: null,
  ...over,
});

const m = (id: string, status: Measurement['status'], module: Measurement['module']): Measurement => ({
  id,
  module,
  label: id,
  status,
  value: null,
});

describe('buildFunnelStages', () => {
  it('impact 25% + mobile fail + 2 fails on-page → 5 étages décroissants arrondis', () => {
    const a = audit({
      impact: {
        items: [{ id: 'impact.lcp', label: 'Lenteur LCP', lossPercent: 25, basis: 'LCP mesuré' }],
        headlinePercent: 25,
        assumptions: [],
      },
      measurements: [
        m('perf.mobile.score', 'fail', 'perf'),
        m('seo.title.present', 'fail', 'seo-onpage'),
        m('seo.h1.unique', 'fail', 'seo-onpage'),
      ],
    });

    const stages = buildFunnelStages(a);
    expect(stages).not.toBeNull();
    expect(stages).toHaveLength(5);
    expect(stages!.map((s) => s.value)).toEqual([100, 75, 60, 51, 51]);

    expect(stages![0]!.label).toBe('Visiteurs qui arrivent sur le site (base)');
    expect(stages![0]!.lossNote).toBeUndefined();
    expect(stages![4]!.label).toBe('Visiteurs qui peuvent devenir contact/client');

    // Chaque perte est libellée comme estimation et tracée à une mesure
    expect(stages![1]!.lossNote).toBe("~25% partent avant l'affichage du contenu (LCP mesuré, est.)");
    expect(stages![2]!.lossNote).toBe('experience mobile degradee (score Lighthouse mesure), est. -20%');
    expect(stages![3]!.lossNote).toBe('parcours et fondamentaux a corriger, est. -15%');
    for (const s of stages!.slice(1, 4)) {
      expect(s.lossNote).toContain('est.');
    }
  });

  it('valeurs entières (Math.round) à chaque étage', () => {
    const a = audit({
      impact: {
        items: [],
        headlinePercent: 33.4,
        assumptions: [],
      },
      measurements: [m('perf.mobile.score', 'fail', 'perf')],
    });
    const stages = buildFunnelStages(a);
    // 100 - 33.4 = 66.6 → 67 ; 67 * 0.8 = 53.6 → 54
    expect(stages!.map((s) => s.value)).toEqual([100, 67, 54, 54]);
    for (const s of stages!) {
      expect(Number.isInteger(s.value)).toBe(true);
    }
  });

  it('site sain (pas d impact, mobile pass, pas de fails) → null, pas de funnel artificiel', () => {
    const a = audit({
      measurements: [
        m('perf.mobile.score', 'pass', 'perf'),
        m('tech.viewport.present', 'pass', 'seo-tech'),
        m('seo.title.present', 'pass', 'seo-onpage'),
      ],
    });
    expect(buildFunnelStages(a)).toBeNull();
  });

  it('impact seul (mobile pass, on-page propre) → 3 étages, pas de remplissage', () => {
    const a = audit({
      impact: { items: [], headlinePercent: 25, assumptions: [] },
      measurements: [m('perf.mobile.score', 'pass', 'perf')],
    });
    const stages = buildFunnelStages(a);
    expect(stages).toHaveLength(3);
    expect(stages!.map((s) => s.value)).toEqual([100, 75, 75]);
  });

  it('viewport fail seul déclenche l étage parcours (même sans 2 fails on-page)', () => {
    const a = audit({
      measurements: [m('tech.viewport.present', 'fail', 'seo-tech')],
    });
    const stages = buildFunnelStages(a);
    expect(stages).toHaveLength(3);
    expect(stages!.map((s) => s.value)).toEqual([100, 85, 85]);
  });

  it('un seul fail on-page (sans viewport fail) ne déclenche pas l étage parcours', () => {
    const a = audit({
      measurements: [m('seo.title.present', 'fail', 'seo-onpage')],
    });
    expect(buildFunnelStages(a)).toBeNull();
  });

  it('les fails on-page des pages crawlées (préfixe page[...]) ne comptent pas pour la homepage', () => {
    const a = audit({
      measurements: [
        m('page[/contact].seo.title.present', 'fail', 'seo-onpage'),
        m('page[/tarifs].seo.h1.unique', 'fail', 'seo-onpage'),
      ],
    });
    expect(buildFunnelStages(a)).toBeNull();
  });

  it('aucun tiret long ni euro dans les libellés', () => {
    const a = audit({
      impact: { items: [], headlinePercent: 25, assumptions: [] },
      measurements: [
        m('perf.mobile.score', 'fail', 'perf'),
        m('tech.viewport.present', 'fail', 'seo-tech'),
      ],
    });
    const all = buildFunnelStages(a)!
      .map((s) => `${s.label} ${s.lossNote ?? ''}`)
      .join(' ');
    expect(all).not.toMatch(/[—–€]/);
  });
});

describe('buildHeatmapData', () => {
  it('2 pages crawlées + homepage → grille pages × critères depuis les mesures préfixées', () => {
    const a = audit({
      crawl: {
        analyzedPages: 3,
        discoveredCount: 5,
        pages: [
          { url: 'https://x.fr/contact', title: 'Contact', status: 200 },
          { url: 'https://x.fr/tarifs', title: 'Tarifs', status: 200 },
        ],
      },
      measurements: [
        // Homepage (ids non préfixés)
        m('seo.title.present', 'pass', 'seo-onpage'),
        m('seo.meta-description.present', 'pass', 'seo-onpage'),
        m('seo.meta-description.length', 'warn', 'seo-onpage'),
        m('seo.h1.unique', 'fail', 'seo-onpage'),
        m('seo.images.alt', 'pass', 'seo-onpage'),
        // /contact
        m('page[/contact].seo.title.present', 'fail', 'seo-onpage'),
        m('page[/contact].seo.h1.unique', 'pass', 'seo-onpage'),
        m('page[/contact].seo.images.alt', 'fail', 'seo-onpage'),
        // /tarifs : aucune mesure (page en erreur) → cellules na
      ],
    });

    const heat = buildHeatmapData(a);
    expect(heat).not.toBeNull();
    expect(heat!.pageLabels).toEqual(['/', '/contact', '/tarifs']);
    expect(heat!.criteriaLabels).toEqual(['Title', 'Meta desc', 'H1', 'Images alt']);
    expect(heat!.cells).toEqual([
      ['ok', 'warn', 'fail', 'ok'], // homepage : meta desc → pire de present(pass)/length(warn)
      ['fail', 'na', 'ok', 'fail'], // /contact : pas de meta desc mesurée → na
      ['na', 'na', 'na', 'na'], // /tarifs : aucune mesure
    ]);
  });

  it('moins de 2 pages crawlées → null', () => {
    expect(buildHeatmapData(audit())).toBeNull();
    expect(
      buildHeatmapData(
        audit({
          crawl: {
            analyzedPages: 2,
            discoveredCount: 1,
            pages: [{ url: 'https://x.fr/contact', title: null, status: 200 }],
          },
        }),
      ),
    ).toBeNull();
  });
});
