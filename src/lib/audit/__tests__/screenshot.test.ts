import { describe, it, expect, vi, afterEach } from 'vitest';
import { captureScreenshot, getImageRects, getHeroElementRects, buildAnnotations } from '../screenshot';
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

describe('getImageRects', () => {
  it('extrait le tableau depuis la clé data de la réponse Browserless', async () => {
    const fakeFetch: typeof fetch = (async () =>
      new Response(JSON.stringify({ data: [{ src: 'https://x/a.jpg', x: 1, y: 2, width: 3, height: 4, alt: null, area: 12 }], type: 'application/json' }), { status: 200 })) as typeof fetch;
    const rects = await getImageRects('https://x', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    expect(rects).toHaveLength(1);
    expect(rects[0]).toMatchObject({ src: 'https://x/a.jpg', x: 1, width: 3 });
  });
  it('retourne un tableau vide si data absent', async () => {
    const fakeFetch: typeof fetch = (async () =>
      new Response(JSON.stringify({ type: 'application/json' }), { status: 200 })) as typeof fetch;
    const rects = await getImageRects('https://x', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    expect(rects).toEqual([]);
  });
});

describe('getHeroElementRects', () => {
  it('parse json.data et normalise les champs manquants a null', async () => {
    const fakeFetch: typeof fetch = (async () =>
      new Response(JSON.stringify({ data: { headline: { x: 1, y: 2, width: 3, height: 4 }, cta: null }, type: 'application/json' }), { status: 200 })) as typeof fetch;
    const rects = await getHeroElementRects('https://x', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    expect(rects.headline).toMatchObject({ x: 1, y: 2, width: 3, height: 4 });
    expect(rects.cta).toBeNull();
    expect(rects.nav).toBeNull();
    expect(rects.heroImage).toBeNull();
    expect(rects.logos).toBeNull();
  });

  it('retourne tous les champs a null sur erreur reseau (ne throw pas)', async () => {
    vi.useFakeTimers();
    const fakeFetch: typeof fetch = (async () => {
      throw new Error('network down');
    }) as typeof fetch;
    const promise = getHeroElementRects('https://x', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    await vi.runAllTimersAsync();
    const rects = await promise;
    expect(rects).toEqual({ headline: null, cta: null, nav: null, heroImage: null, logos: null });
    vi.useRealTimers();
  });
});

describe('retry Browserless', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('captureScreenshot réessaie sur 500 puis réussit', async () => {
    vi.useFakeTimers();
    let calls = 0;
    const fakeFetch: typeof fetch = (async () => {
      calls++;
      if (calls < 3) return new Response('boom', { status: 500 });
      return new Response(new Uint8Array([1, 2]), { status: 200 });
    }) as typeof fetch;
    const promise = captureScreenshot('https://x', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    await vi.runAllTimersAsync();
    const buf = await promise;
    expect(calls).toBe(3);
    expect(buf.byteLength).toBe(2);
  });

  it('captureScreenshot abandonne après 5 échecs', async () => {
    vi.useFakeTimers();
    let calls = 0;
    const fakeFetch: typeof fetch = (async () => {
      calls++;
      return new Response('boom', { status: 500 });
    }) as typeof fetch;
    const promise = captureScreenshot('https://x', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    const assertion = expect(promise).rejects.toThrow(/5 tentatives/);
    await vi.runAllTimersAsync();
    await assertion;
    expect(calls).toBe(5);
  });
});

describe('buildAnnotations', () => {
  it('croise les rects avec les measurements images.broken.* uniquement', () => {
    const rects = [
      { src: 'https://exemple.fr/dead.jpg', x: 100, y: 200, width: 300, height: 150, alt: null, area: 45000 },
      { src: 'https://exemple.fr/ok.jpg', x: 0, y: 0, width: 50, height: 50, alt: 'ok', area: 2500 },
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
