import { describe, it, expect } from 'vitest';
import { captureScreenshot, getImageRects, buildAnnotations } from '../screenshot';
import type { Measurement } from '../types';

describe('captureScreenshot', () => {
  it('POST sur /screenshot et retourne le binaire', async () => {
    let captured: { url: string; body: unknown } | null = null;
    const fakeFetch: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      captured = { url: String(input), body: JSON.parse(String(init?.body)) };
      return new Response(new Uint8Array([137, 80, 78, 71]), { status: 200 });
    }) as typeof fetch;
    const buf = await captureScreenshot('https://exemple.fr', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    expect(buf.byteLength).toBe(4);
    expect(captured!.url).toBe('https://bl.test/screenshot?token=T');
    expect((captured!.body as { url: string }).url).toBe('https://exemple.fr');
  });
});

describe('buildAnnotations', () => {
  it('croise les rects avec les measurements images.broken.* uniquement', () => {
    const rects = [
      { src: 'https://exemple.fr/dead.jpg', x: 100, y: 200, width: 300, height: 150 },
      { src: 'https://exemple.fr/ok.jpg', x: 0, y: 0, width: 50, height: 50 },
    ];
    const measurements: Measurement[] = [
      {
        id: 'images.broken.1',
        module: 'images',
        label: 'Image cassée',
        status: 'fail',
        value: 'https://exemple.fr/dead.jpg',
        proof: 'HEAD → 404',
        details: 'https://exemple.fr/dead.jpg',
      },
    ];
    const annotations = buildAnnotations(rects, measurements);
    expect(annotations).toHaveLength(1);
    expect(annotations[0]).toMatchObject({ x: 100, y: 200, measurementId: 'images.broken.1' });
  });
});
