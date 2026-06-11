import { describe, it, expect } from 'vitest';
import sharp from 'sharp';
import { annotateScreenshot } from '../annotate';
import type { Annotation } from '../../types';

async function blankPng(w: number, h: number): Promise<Buffer> {
  return sharp({ create: { width: w, height: h, channels: 3, background: '#ffffff' } }).png().toBuffer();
}

describe('annotateScreenshot', () => {
  it('retourne un PNG valide aux mêmes dimensions', async () => {
    const base = await blankPng(400, 600);
    const annotations: Annotation[] = [
      { x: 50, y: 50, width: 100, height: 80, measurementId: 'images.broken.1', note: 'Image cassée' },
    ];
    const out = await annotateScreenshot(base, annotations);
    const meta = await sharp(out).metadata();
    expect(meta.format).toBe('png');
    expect(meta.width).toBe(400);
    expect(meta.height).toBe(600);
    // le PNG annoté diffère de l'original (overlay ajouté)
    expect(out.equals(base)).toBe(false);
  });
  it('pastille adaptative : annote une grande image (rayon proportionnel)', async () => {
    const base = await blankPng(1440, 900);
    const annotations: Annotation[] = [
      { x: 100, y: 100, width: 0, height: 0, measurementId: 'perf.mobile.lcp', note: 'Zone lente' },
    ];
    const out = await annotateScreenshot(base, annotations);
    const meta = await sharp(out).metadata();
    expect(meta.format).toBe('png');
    expect(meta.width).toBe(1440);
    expect(meta.height).toBe(900);
    expect(out.equals(base)).toBe(false);
  });
  it('sans annotations, retourne un PNG valide (inchangé visuellement)', async () => {
    const base = await blankPng(200, 200);
    const out = await annotateScreenshot(base, []);
    expect((await sharp(out).metadata()).format).toBe('png');
  });
});
