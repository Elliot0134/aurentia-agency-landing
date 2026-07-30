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

export type HeroGenerateFn = (heroPng: Buffer, context?: string) => Promise<HeroAnalysis>;

const SYSTEM = `Tu es un directeur artistique web senior. On te montre le premier écran (section hero) d'une page d'un site. Donne 2 à 3 observations PRÉCISES sur le VISUEL uniquement : accroche, bouton d'action (CTA), imagerie, hiérarchie, lisibilité, espace. Chaque observation est clairement positive ou négative et actionnable. INTERDIT : parler de temps de chargement, de SEO, de technique, de référencement. INTERDIT : le tiret long (— ou –), mentionner l'IA. Français correctement ACCENTUÉ (é, è, ê, à, ç, ù, ô, î) : un texte sans accents est refusé. Pour chaque point, indique aussi la position approximative de l'élément concerné sur l'image (position). Pour le champ element, classe l'élément concerné : accroche (titre/h1), cta (bouton d'action), visuel (image principale), navigation (menu/header), logos (une rangée de logos partenaires ou références), autre (le reste).`;

const defaultGenerate: HeroGenerateFn = async (heroPng, context) => {
  const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  if (!process.env.OPENROUTER_MODEL) throw new Error('OPENROUTER_MODEL manquant dans l environnement');
  const { object } = await generateObject({
    model: openrouter(process.env.OPENROUTER_MODEL),
    schema: HeroAnalysisSchema,
    system: SYSTEM,
    messages: [{ role: 'user', content: [
      { type: 'text', text: context ? `Analyse le visuel de ce premier écran (${context}).` : 'Analyse le visuel de ce premier écran.' },
      { type: 'image', image: heroPng },
    ]}],
  });
  return object;
};

/**
 * Formes désaccentuées dont l'orthographe SANS accent n'existe pas en français :
 * les rencontrer prouve que le modèle a perdu les accents. Volontairement
 * limitée aux cas non ambigus — « cote », « sur », « du », « utilise », « des »
 * sont des mots valides et ne peuvent pas servir de signal.
 */
const MOTS_DESACCENTUES =
  /\b(tres|apres|deja|meme|etre|ecrit|ecran|element|elements|qualite|lisibilite|generale|amelioration|ameliorer|creer|problemes|reussi|equilibre|identite|separation|utilisee|utilisees|preferable|facon|differents|hierarchie|interet|coherent|visibilite|accessibilite|categorie|resultat|necessaire|donnees|precis|entierement|immediatement|arriere|fenetre|defaut|theme|meriteraient|presence)\b/i;

/** Au moins un caractère accentué français. */
const A_UN_ACCENT = /[éèêëàâäùûüôöîïçÉÈÊËÀÂÄÙÛÜÔÖÎÏÇ]/;

/**
 * Le modèle vision rend parfois tout son texte sans accents (incident
 * bimbo-cosmetique.com du 2026-07-30). Deux signaux, l'un précis, l'autre pour
 * les tournures que la liste ne couvre pas : un commentaire long entièrement
 * dépourvu d'accent n'est pas du français correct.
 */
function verifieAccentuation(comment: string): void {
  const mot = comment.match(MOTS_DESACCENTUES);
  if (mot) {
    throw new Error(`Français désaccentué dans un commentaire hero (« ${mot[0]} »), accents attendus`);
  }
  if (comment.length >= 80 && !A_UN_ACCENT.test(comment)) {
    throw new Error('Français désaccentué dans un commentaire hero (aucun accent sur une phrase longue)');
  }
}

/** Garde-fous appliqués à chaque commentaire avant de le livrer. */
function verifieCommentaires(result: HeroAnalysis): void {
  for (const p of result.points) {
    if (/—|–/.test(p.comment)) throw new Error('Tiret long interdit dans un commentaire hero');
    if (/intelligence artificielle|\bia\b/i.test(p.comment)) throw new Error('Mention IA interdite dans un commentaire hero');
    verifieAccentuation(p.comment);
  }
}

const RAPPEL_ACCENTS =
  "RAPPEL IMPORTANT : rédige en français correctement accentué (é, è, ê, à, ç, ù, ô, î). La sortie précédente contenait des mots sans accents, elle a été refusée.";

export async function analyzeHero(heroPng: Buffer, opts: { generateFn?: HeroGenerateFn; context?: string } = {}): Promise<HeroAnalysis> {
  const gen = opts.generateFn ?? defaultGenerate;
  // Le défaut d'accentuation est intermittent : une seconde tentative avec la
  // consigne explicite suffit en général. Sans elle on retenterait à l'identique.
  let derniere: unknown;
  for (let essai = 0; essai < 2; essai++) {
    const context = essai === 0 ? opts.context : [opts.context, RAPPEL_ACCENTS].filter(Boolean).join(' ');
    const result = await gen(heroPng, context);
    try {
      verifieCommentaires(result);
      return result;
    } catch (err) {
      derniere = err;
    }
  }
  throw derniere;
}
