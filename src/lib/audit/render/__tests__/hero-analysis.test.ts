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

/**
 * Incident bimbo-cosmetique.com (2026-07-30) : le modèle vision a rendu tous ses
 * constats en français désaccentué (« utilisee », « ecrit », « lisibilite »,
 * « separation », « facon ») dans un PDF facturé 99 €, alors que le reste du
 * document est correctement accentué. Le défaut est intermittent : le même
 * modèle avait produit du texte propre vingt minutes plus tôt sur un autre site.
 * On retente une fois avec une consigne renforcée avant d'abandonner.
 */
describe('analyzeHero : accentuation', () => {
  const png = Buffer.from('fake');
  const point = (comment: string): HeroAnalysis['points'][number] => ({
    element: 'accroche',
    sentiment: 'negatif',
    comment,
    position: 'centre',
  });
  const accentue: HeroAnalysis = {
    points: [
      point("La police cursive utilisée au-dessus des titres manque de contraste et nuit à la lisibilité."),
      point("Les boutons noirs tranchent durement avec l'univers pastel de la marque et mériteraient d'être adoucis."),
    ],
  };
  const desaccentue: HeroAnalysis = {
    points: [
      point('La police cursive utilisee au-dessus des titres manque de contraste et nuit a la lisibilite.'),
      point("Les boutons noirs tranchent durement avec l'univers pastel de la marque et meriteraient d'etre adoucis."),
    ],
  };

  it('accepte un texte correctement accentué', async () => {
    const result = await analyzeHero(png, { generateFn: async () => accentue });
    expect(result.points).toHaveLength(2);
  });

  it('retente une fois quand le texte est désaccentué, et garde la 2e sortie si elle est propre', async () => {
    let calls = 0;
    const contexts: (string | undefined)[] = [];
    const stub: HeroGenerateFn = async (_png, context) => {
      calls++;
      contexts.push(context);
      return calls === 1 ? desaccentue : accentue;
    };
    const result = await analyzeHero(png, { generateFn: stub, context: 'premier écran' });
    expect(calls).toBe(2);
    expect(result.points[0].comment).toContain('utilisée');
    // La 2e tentative doit porter une consigne explicite, sinon on retente à l'identique.
    expect(contexts[1]).toMatch(/accent/i);
  });

  it('lève si les deux tentatives sont désaccentuées (jamais de français cassé livré)', async () => {
    const stub: HeroGenerateFn = async () => desaccentue;
    await expect(analyzeHero(png, { generateFn: stub })).rejects.toThrow(/accent/i);
  });

  it('détecte un mot désaccentué même si le reste du commentaire a des accents', async () => {
    const mixte: HeroAnalysis = {
      points: [
        point("Le bandeau présente une très belle image mais la lisibilite du texte reste faible sur ce fond."),
        accentue.points[1],
      ],
    };
    const stub: HeroGenerateFn = async () => mixte;
    await expect(analyzeHero(png, { generateFn: stub })).rejects.toThrow(/accent/i);
  });
});
