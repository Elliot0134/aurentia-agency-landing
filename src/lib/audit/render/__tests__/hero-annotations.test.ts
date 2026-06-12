import { describe, it, expect } from 'vitest';
import { buildHeroAnnotations } from '../hero-annotations';
import type { HeroAnalysis } from '../hero-analysis';
import type { HeroElementRects } from '../../screenshot';

const MIN_DIST_1440 = Math.max(90, Math.round(1440 / 14)); // 103

const EMPTY_RECTS: HeroElementRects = {
  headline: null,
  cta: null,
  nav: null,
  heroImage: null,
  logos: null,
};

describe('buildHeroAnnotations', () => {
  it('place un point centre via la grille quand aucun rect DOM (600x400 -> 300,200)', () => {
    const analysis: HeroAnalysis = {
      points: [
        { element: 'visuel', sentiment: 'positif', comment: 'Visuel centre fort et engageant.', position: 'centre' },
      ],
    };
    const anns = buildHeroAnnotations(analysis, EMPTY_RECTS, 600, 400);
    expect(anns).toHaveLength(1);
    expect(anns[0]).toMatchObject({ x: 300, y: 200, width: 0, height: 0, note: 'Visuel centre fort et engageant.' });
  });

  it('place un point accroche au centre du headline rect fourni', () => {
    const rects: HeroElementRects = {
      ...EMPTY_RECTS,
      headline: { x: 100, y: 50, width: 400, height: 80 },
    };
    const analysis: HeroAnalysis = {
      points: [
        { element: 'accroche', sentiment: 'positif', comment: 'Accroche lisible et directe.', position: 'haut-gauche' },
      ],
    };
    const anns = buildHeroAnnotations(analysis, rects, 1440, 1000);
    expect(anns).toHaveLength(1);
    // centre du headline : x = 100 + 400/2 = 300, y = 50 + 80/2 = 90
    expect(anns[0]).toMatchObject({ x: 300, y: 90, width: 0, height: 0 });
  });

  it('repli sur la grille quand le rect mappe est null (le point existe et reste dans les bornes)', () => {
    const analysis: HeroAnalysis = {
      points: [
        { element: 'cta', sentiment: 'negatif', comment: 'CTA peu visible.', position: 'centre-droite' },
      ],
    };
    const anns = buildHeroAnnotations(analysis, EMPTY_RECTS, 1000, 800);
    expect(anns).toHaveLength(1);
    // grille centre-droite : 0.80*1000 = 800, 0.5*800 = 400
    expect(anns[0]).toMatchObject({ x: 800, y: 400 });
    expect(anns[0].x).toBeGreaterThanOrEqual(0);
    expect(anns[0].x).toBeLessThanOrEqual(1000);
  });

  it('produit autant d annotations que de points (cap 3)', () => {
    const analysis: HeroAnalysis = {
      points: [
        { element: 'accroche', sentiment: 'positif', comment: 'Accroche lisible et directe.', position: 'haut-gauche' },
        { element: 'cta', sentiment: 'negatif', comment: 'CTA peu visible a droite.', position: 'centre-droite' },
        { element: 'visuel', sentiment: 'positif', comment: 'Imagerie de qualite en fond.', position: 'haut-droite' },
      ],
    };
    const anns = buildHeroAnnotations(analysis, EMPTY_RECTS, 1000, 800);
    expect(anns).toHaveLength(3);
  });

  it('anti-collision : deux points sur le meme rect headline sont separes d au moins MIN_DIST', () => {
    const rects: HeroElementRects = {
      ...EMPTY_RECTS,
      headline: { x: 600, y: 100, width: 200, height: 60 },
    };
    const analysis: HeroAnalysis = {
      points: [
        { element: 'accroche', sentiment: 'negatif', comment: 'Titre peu lisible.', position: 'haut-centre' },
        // deux 'accroche' visent le meme rect headline -> collision a resoudre
        { element: 'accroche', sentiment: 'negatif', comment: 'Titre surcharge.', position: 'haut-centre' },
      ],
    };
    const anns = buildHeroAnnotations(analysis, rects, 1440, 1000);
    expect(anns).toHaveLength(2);
    const dist = Math.hypot(anns[1].x - anns[0].x, anns[1].y - anns[0].y);
    expect(dist).toBeGreaterThanOrEqual(MIN_DIST_1440);
  });

  it('anti-collision : 3 points sur la meme position grille sont tous separes et dans les bornes', () => {
    const W = 1440;
    const H = 900;
    const MIN_DIST = Math.max(90, Math.round(W / 14));
    const analysis: HeroAnalysis = {
      points: [
        { element: 'accroche', sentiment: 'negatif', comment: 'Titre illisible.', position: 'centre' },
        { element: 'visuel', sentiment: 'negatif', comment: 'Image floue.', position: 'centre' },
        { element: 'cta', sentiment: 'negatif', comment: 'Bouton invisible.', position: 'centre' },
      ],
    };
    const anns = buildHeroAnnotations(analysis, EMPTY_RECTS, W, H);
    expect(anns).toHaveLength(3);

    for (let i = 0; i < anns.length; i++) {
      for (let j = i + 1; j < anns.length; j++) {
        const dist = Math.hypot(anns[i].x - anns[j].x, anns[i].y - anns[j].y);
        expect(dist).toBeGreaterThanOrEqual(MIN_DIST);
      }
    }

    for (const ann of anns) {
      expect(ann.x).toBeGreaterThanOrEqual(0);
      expect(ann.x).toBeLessThanOrEqual(W);
      expect(ann.y).toBeGreaterThanOrEqual(0);
      expect(ann.y).toBeLessThanOrEqual(H);
    }
  });
});
