import { describe, it, expect } from 'vitest';
import { analyzeHero } from '../hero-analysis';
import type { HeroAnalysis, HeroGenerateFn } from '../hero-analysis';

const valid: HeroAnalysis = {
  points: [
    { element: 'accroche', sentiment: 'positif', comment: 'Accroche claire et lisible des le premier coup d oeil.', position: 'haut-centre' },
    { element: 'cta', sentiment: 'negatif', comment: 'Le bouton d action manque de contraste avec le fond.', position: 'centre' },
  ],
};

describe('analyzeHero', () => {
  it('retourne les points fournis par le generateFn injecte (aucun appel reseau)', async () => {
    const stub: HeroGenerateFn = async () => valid;
    const result = await analyzeHero(Buffer.from('fake'), { generateFn: stub });
    expect(result.points).toHaveLength(2);
    expect(result.points[0].comment).toContain('Accroche');
  });

  it('leve si un commentaire contient un tiret long', async () => {
    const stub: HeroGenerateFn = async () => ({
      points: [
        valid.points[0],
        { element: 'cta', sentiment: 'negatif', comment: 'Le bouton — trop discret — passe inapercu.', position: 'centre' },
      ],
    });
    await expect(analyzeHero(Buffer.from('fake'), { generateFn: stub })).rejects.toThrow('Tiret long');
  });
});
