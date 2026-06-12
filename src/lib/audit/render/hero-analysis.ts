import { generateObject } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from 'zod';

export const HeroPositionSchema = z.enum(['haut-gauche','haut-centre','haut-droite','centre-gauche','centre','centre-droite']);
export const HeroPointSchema = z.object({
  element: z.enum(['accroche','cta','visuel','navigation','logos','autre']),
  sentiment: z.enum(['positif','negatif']),
  comment: z.string().min(10),
  position: HeroPositionSchema,
});
export const HeroAnalysisSchema = z.object({ points: z.array(HeroPointSchema).min(2).max(3) });
export type HeroPoint = z.infer<typeof HeroPointSchema>;
export type HeroAnalysis = z.infer<typeof HeroAnalysisSchema>;

export type HeroGenerateFn = (heroPng: Buffer) => Promise<HeroAnalysis>;

const SYSTEM = `Tu es un directeur artistique web senior. On te montre la section hero (premier écran) d'un site. Donne 2 à 3 observations PRÉCISES sur le VISUEL uniquement : accroche, bouton d'action (CTA), imagerie, hiérarchie, lisibilité, espace. Chaque observation est clairement positive ou négative et actionnable. INTERDIT : parler de temps de chargement, de SEO, de technique, de référencement. INTERDIT : le tiret long (— ou –), mentionner l'IA. Français. Pour chaque point, indique aussi la position approximative de l'élément concerné sur l'image (position). Pour le champ element, classe l'élément concerné : accroche (titre/h1), cta (bouton d'action), visuel (image principale), navigation (menu/header), logos (une rangée de logos partenaires ou références), autre (le reste).`;

const defaultGenerate: HeroGenerateFn = async (heroPng) => {
  const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  if (!process.env.OPENROUTER_MODEL) throw new Error('OPENROUTER_MODEL manquant dans l environnement');
  const { object } = await generateObject({
    model: openrouter(process.env.OPENROUTER_MODEL),
    schema: HeroAnalysisSchema,
    system: SYSTEM,
    messages: [{ role: 'user', content: [
      { type: 'text', text: 'Analyse le visuel de cette hero section.' },
      { type: 'image', image: heroPng },
    ]}],
  });
  return object;
};

export async function analyzeHero(heroPng: Buffer, opts: { generateFn?: HeroGenerateFn } = {}): Promise<HeroAnalysis> {
  const gen = opts.generateFn ?? defaultGenerate;
  const result = await gen(heroPng);
  // garde-fou véracité léger : pas de tiret long, pas de mention IA dans les commentaires
  for (const p of result.points) {
    if (/—|–/.test(p.comment)) throw new Error('Tiret long interdit dans un commentaire hero');
    if (/intelligence artificielle|\bia\b/i.test(p.comment)) throw new Error('Mention IA interdite dans un commentaire hero');
  }
  return result;
}
