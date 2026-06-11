import sharp from 'sharp';
import type { Annotation } from '../types';
import { COLORS } from './theme';

/**
 * Dessine un gros point numéroté sur chaque zone annotée (pas de cadre).
 * Le point se place près du coin haut-gauche de l'élément DOM ciblé.
 * Pas de légende incrustée (elle vit dans le HTML du rapport).
 */
export async function annotateScreenshot(pngBuffer: Buffer, annotations: Annotation[]): Promise<Buffer> {
  const meta = await sharp(pngBuffer).metadata();
  const W = meta.width ?? 1440;
  const H = meta.height ?? 1200;

  // Rayon adaptatif à la largeur de l'image : ~38px sur une capture 1440px,
  // jamais moins de 22px (lisible même sur une petite image).
  const radius = Math.max(22, Math.round(W / 38));
  const fontSize = Math.round(radius * 0.95);

  const shapes = annotations
    .map((a, i) => {
      const n = i + 1;
      // Point près du coin haut-gauche de la zone ; centré dans la zone si elle
      // a une taille, sinon décalé du rayon depuis (x, y).
      const cx = a.x + Math.min(radius + 4, a.width / 2 || radius);
      const cy = a.y + Math.min(radius + 4, a.height / 2 || radius);
      return `
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="${COLORS.bad}"/>
        <text x="${cx}" y="${cy + Math.round(fontSize / 3)}" font-family="Arial, sans-serif" font-size="${fontSize}"
              font-weight="bold" fill="#ffffff" text-anchor="middle">${n}</text>`;
    })
    .join('');

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${shapes}</svg>`;
  return sharp(pngBuffer)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer();
}
