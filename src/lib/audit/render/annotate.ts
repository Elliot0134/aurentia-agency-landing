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

  const shapes = annotations
    .map((a, i) => {
      const n = i + 1;
      const cx = a.x + Math.min(24, a.width / 2);
      const cy = a.y + Math.min(24, a.height / 2);
      return `
        <circle cx="${cx}" cy="${cy}" r="20" fill="${COLORS.bad}"/>
        <text x="${cx}" y="${cy + 7}" font-family="Arial, sans-serif" font-size="20"
              font-weight="bold" fill="#ffffff" text-anchor="middle">${n}</text>`;
    })
    .join('');

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${shapes}</svg>`;
  return sharp(pngBuffer)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer();
}
