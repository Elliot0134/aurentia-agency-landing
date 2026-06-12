import { describe, it, expect } from 'vitest';
import sharp from 'sharp';
import { buildScoreGaugeSvg, renderScoreGaugePng } from '../score-chart';

describe('buildScoreGaugeSvg', () => {
  it('contient une balise <svg et le score affiché', () => {
    const svg = buildScoreGaugeSvg(76);
    expect(svg).toContain('<svg');
    expect(svg).toContain('76');
  });

  it('couleur verte pour score >= 70', () => {
    const svg = buildScoreGaugeSvg(76);
    expect(svg).toContain('#2E7D32');
  });

  it('couleur rouge pour score < 50', () => {
    const svg = buildScoreGaugeSvg(42);
    expect(svg).toContain('#C62828');
  });

  it('couleur orange pour score 50-69', () => {
    const svg = buildScoreGaugeSvg(60);
    expect(svg).toContain('#E8710A');
  });
});

describe('renderScoreGaugePng', () => {
  it('retourne un Buffer PNG de 220px de large', async () => {
    const buf = await renderScoreGaugePng(76);
    expect(buf).toBeInstanceOf(Buffer);
    const meta = await sharp(buf).metadata();
    expect(meta.format).toBe('png');
    expect(meta.width).toBe(220);
  });
});
