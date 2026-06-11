import { describe, it, expect } from 'vitest';
import { buildHeroAnnotations } from '../hero-annotations';
import type { HeroAnalysis } from '../hero-analysis';

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
});
