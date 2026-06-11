import { describe, it, expect } from 'vitest';
import { buildScreenshotAnnotations } from '../screenshot-annotations';
import type { ImageRect, Measurement } from '../types';

function rect(p: Partial<ImageRect>): ImageRect {
  return {
    src: 'https://exemple.fr/img.jpg',
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    alt: 'desc',
    area: 10000,
    ...p,
  };
}

function meas(p: Partial<Measurement> & Pick<Measurement, 'id'>): Measurement {
  return {
    module: 'images',
    label: p.id,
    status: 'fail',
    value: null,
    ...p,
  };
}

describe('buildScreenshotAnnotations', () => {
  it('image cassée → 1 annotation avec le bon measurementId, positionnée sur le rect au src correspondant', () => {
    const rects = [
      rect({ src: 'https://exemple.fr/dead.jpg', x: 10, y: 20, width: 300, height: 150, area: 45000 }),
      rect({ src: 'https://exemple.fr/ok.jpg', x: 0, y: 0, width: 50, height: 50, area: 2500 }),
    ];
    const measurements = [
      meas({ id: 'images.broken.1', status: 'fail', value: 'https://exemple.fr/dead.jpg', proof: 'HEAD → 404' }),
    ];
    const anns = buildScreenshotAnnotations(measurements, rects);
    expect(anns).toHaveLength(1);
    expect(anns[0]).toMatchObject({
      x: 10,
      y: 20,
      width: 300,
      height: 150,
      measurementId: 'images.broken.1',
      note: 'Cette image ne se charge pas',
    });
  });

  it('LCP fail → point sur le plus grand rect, note avec valeur formatée FR', () => {
    const rects = [
      rect({ src: 'small.jpg', width: 100, height: 100, area: 10000 }),
      rect({ src: 'hero.jpg', x: 5, y: 8, width: 1200, height: 600, area: 720000 }),
    ];
    const measurements = [
      meas({ id: 'perf.mobile.lcp', module: 'perf', status: 'fail', value: 5.7, unit: 's' }),
    ];
    const anns = buildScreenshotAnnotations(measurements, rects);
    expect(anns).toHaveLength(1);
    expect(anns[0].measurementId).toBe('perf.mobile.lcp');
    expect(anns[0].x).toBe(5);
    expect(anns[0].width).toBe(1200);
    expect(anns[0].note).toContain('5,7');
    expect(anns[0].note).not.toContain('5.7');
  });

  it("LCP pass → aucune annotation", () => {
    const rects = [rect({ src: 'hero.jpg', area: 720000, width: 1200, height: 600 })];
    const measurements = [meas({ id: 'perf.mobile.lcp', module: 'perf', status: 'pass', value: 1.2 })];
    expect(buildScreenshotAnnotations(measurements, rects)).toHaveLength(0);
  });

  it('seo.images.alt fail → point sur le plus grand rect SANS alt', () => {
    const rects = [
      rect({ src: 'big-with-alt.jpg', alt: 'présent', width: 1000, height: 800, area: 800000 }),
      rect({ src: 'mid-no-alt.jpg', alt: null, x: 3, y: 4, width: 600, height: 400, area: 240000 }),
      rect({ src: 'small-no-alt.jpg', alt: '   ', width: 100, height: 100, area: 10000 }),
    ];
    const measurements = [meas({ id: 'seo.images.alt', module: 'seo-onpage', status: 'fail', value: 2 })];
    const anns = buildScreenshotAnnotations(measurements, rects);
    expect(anns).toHaveLength(1);
    expect(anns[0]).toMatchObject({ x: 3, width: 600, measurementId: 'seo.images.alt' });
    expect(anns[0].note).toContain('description');
  });

  it('poids fail → note FR avec la valeur en Mo', () => {
    const rects = [rect({ src: 'hero.jpg', width: 800, height: 600, area: 480000 })];
    const measurements = [meas({ id: 'perf.mobile.weight', module: 'perf', status: 'fail', value: 6.3, unit: 'Mo' })];
    const anns = buildScreenshotAnnotations(measurements, rects);
    expect(anns).toHaveLength(1);
    expect(anns[0].measurementId).toBe('perf.mobile.weight');
    expect(anns[0].note).toContain('6,3');
  });

  it('cap à 3 annotations maximum', () => {
    const rects = [
      rect({ src: 'a.jpg', x: 0, width: 900, height: 900, area: 810000 }),
      rect({ src: 'b.jpg', x: 10, width: 800, height: 800, area: 640000 }),
      rect({ src: 'c.jpg', x: 20, width: 700, height: 700, area: 490000 }),
      rect({ src: 'd.jpg', x: 30, alt: null, width: 600, height: 600, area: 360000 }),
    ];
    const measurements = [
      meas({ id: 'images.broken.1', status: 'fail', value: 'a.jpg' }),
      meas({ id: 'images.broken.2', status: 'fail', value: 'b.jpg' }),
      meas({ id: 'perf.mobile.lcp', module: 'perf', status: 'fail', value: 5.0 }),
      meas({ id: 'seo.images.alt', module: 'seo-onpage', status: 'fail', value: 1 }),
      meas({ id: 'perf.mobile.weight', module: 'perf', status: 'fail', value: 7.0 }),
    ];
    expect(buildScreenshotAnnotations(measurements, rects)).toHaveLength(3);
  });

  it('jamais deux points sur le même rect', () => {
    // Un seul rect dispo : broken le prend, LCP/alt/weight ne peuvent pas le réutiliser.
    const rects = [rect({ src: 'only.jpg', alt: null, width: 500, height: 400, area: 200000 })];
    const measurements = [
      meas({ id: 'images.broken.1', status: 'fail', value: 'only.jpg' }),
      meas({ id: 'perf.mobile.lcp', module: 'perf', status: 'fail', value: 5.5 }),
      meas({ id: 'seo.images.alt', module: 'seo-onpage', status: 'fail', value: 1 }),
    ];
    const anns = buildScreenshotAnnotations(measurements, rects);
    expect(anns).toHaveLength(1);
    expect(anns[0].measurementId).toBe('images.broken.1');
    const positions = new Set(anns.map((a) => `${a.x},${a.y}`));
    expect(positions.size).toBe(anns.length);
  });

  it('ignore les rects de taille nulle pour LCP', () => {
    const rects = [
      rect({ src: 'zero.jpg', width: 0, height: 0, area: 0 }),
      rect({ src: 'real.jpg', x: 7, width: 300, height: 200, area: 60000 }),
    ];
    const measurements = [meas({ id: 'perf.mobile.lcp', module: 'perf', status: 'fail', value: 4.5 })];
    const anns = buildScreenshotAnnotations(measurements, rects);
    expect(anns).toHaveLength(1);
    expect(anns[0].x).toBe(7);
  });
});
