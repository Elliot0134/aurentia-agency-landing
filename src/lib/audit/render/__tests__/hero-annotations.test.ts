import { describe, it, expect } from 'vitest';
import { buildHeroAnnotations } from '../hero-annotations';
import type { HeroAnalysis } from '../hero-analysis';

const MIN_DIST_1440 = Math.max(90, Math.round(1440 / 14)); // 103

describe('buildHeroAnnotations', () => {
  it('place un point centre au milieu de l image (600x400 -> 300,200)', () => {
    const analysis: HeroAnalysis = {
      points: [
        { element: 'visuel', sentiment: 'positif', comment: 'Visuel centre fort et engageant.', position: 'centre' },
      ],
    };
    const anns = buildHeroAnnotations(analysis, 600, 400);
    expect(anns).toHaveLength(1);
    expect(anns[0]).toMatchObject({ x: 300, y: 200, width: 0, height: 0, note: 'Visuel centre fort et engageant.' });
  });

  it('produit autant d annotations que de points', () => {
    const analysis: HeroAnalysis = {
      points: [
        { element: 'accroche', sentiment: 'positif', comment: 'Accroche lisible et directe.', position: 'haut-gauche' },
        { element: 'cta', sentiment: 'negatif', comment: 'CTA peu visible a droite.', position: 'centre-droite' },
        { element: 'visuel', sentiment: 'positif', comment: 'Imagerie de qualite en fond.', position: 'haut-droite' },
      ],
    };
    const anns = buildHeroAnnotations(analysis, 1000, 800);
    expect(anns).toHaveLength(3);
    expect(anns[1]).toMatchObject({ x: 800, y: 400 });
  });

  it('anti-collision : deux points sur haut-centre (1440x1000) sont separes d au moins MIN_DIST', () => {
    const analysis: HeroAnalysis = {
      points: [
        { element: 'accroche', sentiment: 'negatif', comment: 'Titre peu lisible.', position: 'haut-centre' },
        { element: 'visuel', sentiment: 'negatif', comment: 'Visuel surcharge.', position: 'haut-centre' },
      ],
    };
    const anns = buildHeroAnnotations(analysis, 1440, 1000);
    expect(anns).toHaveLength(2);
    const dist = Math.hypot(anns[1].x - anns[0].x, anns[1].y - anns[0].y);
    expect(dist).toBeGreaterThanOrEqual(MIN_DIST_1440);
  });

  it('anti-collision : 3 points dont 2 sur la meme position sont tous separes et dans les bornes', () => {
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
    const anns = buildHeroAnnotations(analysis, W, H);
    expect(anns).toHaveLength(3);

    // Toutes les paires doivent etre separees d au moins MIN_DIST
    for (let i = 0; i < anns.length; i++) {
      for (let j = i + 1; j < anns.length; j++) {
        const dist = Math.hypot(anns[i].x - anns[j].x, anns[i].y - anns[j].y);
        expect(dist).toBeGreaterThanOrEqual(MIN_DIST);
      }
    }

    // Chaque point doit rester dans [0, W] x [0, H]
    for (const ann of anns) {
      expect(ann.x).toBeGreaterThanOrEqual(0);
      expect(ann.x).toBeLessThanOrEqual(W);
      expect(ann.y).toBeGreaterThanOrEqual(0);
      expect(ann.y).toBeLessThanOrEqual(H);
    }
  });
});
