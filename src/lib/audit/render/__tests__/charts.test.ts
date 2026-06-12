import { describe, it, expect } from 'vitest';
import {
  svgRadar,
  svgFunnel,
  svgScoreTargetBars,
  svgHeatmap,
  radarAxesFromMeasurements,
  type RadarAxis,
  type FunnelStage,
  type ScoreTargetRow,
  type HeatCell,
} from '../charts';
import type { Measurement } from '../../types';

describe('svgRadar', () => {
  const axes: RadarAxis[] = [
    { label: 'Performance', score: 4 },
    { label: 'SEO on-page', score: 7 },
    { label: 'Images', score: 9.5 },
  ];

  it('retourne un SVG complet avec polygone, labels et score global', () => {
    const svg = svgRadar(axes, 55);
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg.endsWith('</svg>')).toBe(true);
    expect(svg).toContain('<polygon');
    expect(svg).toContain('Performance');
    expect(svg).toContain('SEO on-page');
    expect(svg).toContain('Images');
    expect(svg).toContain('>55<');
    expect(svg).toContain('Score global du site');
  });

  it('color-code le score global (rouge <50, orange 50-69, vert >=70)', () => {
    expect(svgRadar(axes, 30)).toContain('#C62828');
    expect(svgRadar(axes, 55)).toContain('#E8710A');
    expect(svgRadar(axes, 80)).toContain('#2E7D32');
  });

  it('échappe les labels (& et < jamais bruts)', () => {
    const svg = svgRadar(
      [
        { label: 'A & B <script>', score: 5 },
        { label: 'Deux', score: 6 },
        { label: 'Trois', score: 7 },
      ],
      50,
    );
    expect(svg).toContain('A &amp; B &lt;script&gt;');
    expect(svg).not.toContain('<script>');
  });

  it('refuse moins de 3 axes', () => {
    expect(() => svgRadar(axes.slice(0, 2), 50)).toThrow();
  });
});

describe('svgFunnel', () => {
  const stages: FunnelStage[] = [
    { label: 'Visiteurs mensuels', value: 12000 },
    { label: 'Cliquent un CTA', value: 1760, lossNote: '10 240 perdus (CTA peu clair)' },
    { label: 'Convertissent', value: 80, lossNote: '1 680 abandonnent' },
  ];

  it('retourne un SVG avec une barre par étage, valeurs et lossNotes', () => {
    const svg = svgFunnel(stages);
    expect(svg.startsWith('<svg')).toBe(true);
    expect((svg.match(/<rect/g) ?? []).length).toBeGreaterThanOrEqual(stages.length);
    expect(svg).toContain('Visiteurs mensuels');
    expect(svg).toContain('12 000');
    expect(svg).toContain('1 760');
    expect(svg).toContain('80');
    expect(svg).toContain('10 240 perdus (CTA peu clair)');
    expect(svg).toContain('1 680 abandonnent');
    expect(svg).toContain('Funnel de perte');
  });

  it('échappe les labels', () => {
    const svg = svgFunnel([
      { label: 'Achats & <promo>', value: 100 },
      { label: 'Fin', value: 10 },
    ]);
    expect(svg).toContain('Achats &amp; &lt;promo&gt;');
    expect(svg).not.toContain('<promo>');
  });
});

describe('svgScoreTargetBars', () => {
  const rows: ScoreTargetRow[] = [
    { label: 'Performance', current: 3.5, target: 9 },
    { label: 'SEO technique', current: 9.5, target: 10 },
  ];

  it('retourne un SVG avec valeurs actuelles, cibles et légende', () => {
    const svg = svgScoreTargetBars(rows);
    expect(svg.startsWith('<svg')).toBe(true);
    expect(svg).toContain('Performance');
    expect(svg).toContain('SEO technique');
    expect(svg).toContain('3,5');
    expect(svg).toContain('9,5');
    expect(svg).toContain('cible 9');
    expect(svg).toContain('cible 10');
    expect(svg).toContain('Actuel');
    expect(svg).toContain('Objectif');
    expect(svg).toContain('État actuel vs objectif post-refonte');
  });

  it('échappe les labels', () => {
    const svg = svgScoreTargetBars([{ label: 'Vitesse & <cache>', current: 5, target: 9 }]);
    expect(svg).toContain('Vitesse &amp; &lt;cache&gt;');
    expect(svg).not.toContain('<cache>');
  });
});

describe('svgHeatmap', () => {
  const pages = ['Accueil', 'Contact'];
  const criteria = ['LCP', 'CLS', 'Formulaires'];
  const cells: HeatCell[][] = [
    ['ok', 'warn', 'fail'],
    ['fail', 'na', 'ok'],
  ];

  it('retourne un SVG avec lignes x colonnes cellules et marqueurs OK/X', () => {
    const svg = svgHeatmap(pages, criteria, cells);
    expect(svg.startsWith('<svg')).toBe(true);
    expect((svg.match(/<rect class="cell"/g) ?? []).length).toBe(pages.length * criteria.length);
    expect(svg).toContain('Accueil');
    expect(svg).toContain('Formulaires');
    expect(svg).toContain('>OK<');
    expect(svg).toContain('>X<');
    expect(svg).toContain('>!<');
    expect(svg).toContain('>n/a<');
    expect(svg).toContain('Performance par page');
  });

  it('échappe les labels', () => {
    const svg = svgHeatmap(['P & <b>'], ['C1'], [['ok']]);
    expect(svg).toContain('P &amp; &lt;b&gt;');
    expect(svg).not.toContain('<b>');
  });
});

describe('radarAxesFromMeasurements', () => {
  const m = (module: Measurement['module'], status: Measurement['status'], id: string): Measurement => ({
    id,
    module,
    label: id,
    status,
    value: 1,
  });

  it('calcule la note /10 par module présent (pass-rate), labels FR, info exclu', () => {
    const measurements: Measurement[] = [
      m('perf', 'pass', 'p1'),
      m('perf', 'fail', 'p2'),
      m('seo-onpage', 'pass', 's1'),
      m('images', 'fail', 'i1'),
      m('images', 'info', 'i2'), // exclu du calcul
      m('competitors', 'pass', 'c1'), // module non scoré, ignoré
    ];
    const axes = radarAxesFromMeasurements(measurements);
    expect(axes).toEqual([
      { label: 'Performance', score: 5 },
      { label: 'SEO on-page', score: 10 },
      { label: 'Images', score: 0 },
    ]);
  });

  it('retourne [] sans mesure scorable', () => {
    expect(radarAxesFromMeasurements([])).toEqual([]);
  });

  it("le module ai-readiness apparaît sous le label 'AI Readiness'", () => {
    const axes = radarAxesFromMeasurements([
      m('ai-readiness', 'pass', 'ai.llms-txt'),
      m('ai-readiness', 'fail', 'ai.citability'),
    ]);
    expect(axes).toEqual([{ label: 'AI Readiness', score: 5 }]);
  });
});
