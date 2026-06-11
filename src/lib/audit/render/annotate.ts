import sharp from 'sharp';
import type { Annotation } from '../types';
import { COLORS } from './theme';

/**
 * Dessine un cadre + une pastille numérotée sur chaque zone annotée.
 * Pas de légende incrustée (elle vit dans le HTML du rapport).
 */
export async function annotateScreenshot(pngBuffer: Buffer, annotations: Annotation[]): Promise<Buffer> {
  const meta = await sharp(pngBuffer).metadata();
  const W = meta.width ?? 1440;
  const H = meta.height ?? 1200;

  const shapes = annotations
    .map((a, i) => {
      const n = i + 1;
      const cx = a.x + Math.min(18, a.width / 2);
      const cy = a.y + Math.min(18, a.height / 2);
      return `
        <rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}"
              fill="none" stroke="${COLORS.bad}" stroke-width="3" rx="4"/>
        <circle cx="${cx}" cy="${cy}" r="14" fill="${COLORS.bad}"/>
        <text x="${cx}" y="${cy + 5}" font-family="Arial, sans-serif" font-size="15"
              font-weight="bold" fill="#ffffff" text-anchor="middle">${n}</text>`;
    })
    .join('');

  const svg = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">${shapes}</svg>`;
  return sharp(pngBuffer)
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .png()
    .toBuffer();
}
