import { describe, it, expect, vi, afterEach } from 'vitest';
import { captureScreenshot, getImageRects, getHeroElementRects, buildAnnotations } from '../screenshot';
import type { Measurement } from '../types';

const PNG_B64 = Buffer.from([137, 80, 78, 71]).toString('base64');

/** Réponse Browserless /function du code de capture. */
const captureResponse = (over: Partial<{ png: string; bodyTextLength: number; overlaysRemoved: number; blockedBy: string | null }> = {}) =>
  new Response(
    JSON.stringify({
      data: { png: PNG_B64, bodyTextLength: 5091, overlaysRemoved: 0, blockedBy: null, ...over },
      type: 'application/json',
    }),
    { status: 200 },
  );

describe('captureScreenshot', () => {
  it('POST sur /function, décode le PNG et déclare la capture utilisable', async () => {
    let captured: { url: string; body: { code: string; context: { url: string } } } | null = null;
    const fakeFetch: typeof fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      captured = { url: String(input), body: JSON.parse(String(init?.body)) as { code: string; context: { url: string } } };
      return captureResponse();
    }) as typeof fetch;

    const shot = await captureScreenshot('https://exemple.fr', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);

    expect(shot.png.byteLength).toBe(4);
    expect(shot.validity.usable).toBe(true);
    expect(shot.validity.bodyTextLength).toBe(5091);
    expect(captured!.url).toBe('https://bl.test/function?token=T');
    expect(captured!.body.context.url).toBe('https://exemple.fr');
  });

  /**
   * Incident pieces-chariot.com (2026-07-30) : overlay `spinner-wrapper` blanc
   * opaque, z-index 999999, jamais retiré en headless même à 20 s. La page était
   * rendue dessous (5091 caractères) mais la capture ne montrait qu'un spinner,
   * et le rédacteur a décrit « une page totalement vide » à un client payant.
   */
  it('capture inutilisable quand un overlay opaque couvre encore la page', async () => {
    const fakeFetch: typeof fetch = (async () =>
      captureResponse({ blockedBy: 'DIV.spinner-wrapper', overlaysRemoved: 0 })) as typeof fetch;

    const shot = await captureScreenshot('https://exemple.fr', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);

    expect(shot.validity.usable).toBe(false);
    expect(shot.validity.reason).toContain('spinner-wrapper');
  });

  it("retire les overlays bloquants avant le shot et le signale", async () => {
    let code = '';
    const fakeFetch: typeof fetch = (async (_i: RequestInfo | URL, init?: RequestInit) => {
      code = (JSON.parse(String(init?.body)) as { code: string }).code;
      return captureResponse({ overlaysRemoved: 1 });
    }) as typeof fetch;

    const shot = await captureScreenshot('https://exemple.fr', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);

    expect(code).toContain('remove');
    expect(shot.validity.overlaysRemoved).toBe(1);
    expect(shot.validity.usable).toBe(true);
  });

  it("page réellement vide de texte → capture inutilisable (rien à commenter)", async () => {
    const fakeFetch: typeof fetch = (async () => captureResponse({ bodyTextLength: 12 })) as typeof fetch;
    const shot = await captureScreenshot('https://exemple.fr', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    expect(shot.validity.usable).toBe(false);
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
      return captureResponse();
    }) as typeof fetch;
    const promise = captureScreenshot('https://x', { token: 'T', baseUrl: 'https://bl.test' }, fakeFetch);
    await vi.runAllTimersAsync();
    const shot = await promise;
    expect(calls).toBe(3);
    expect(shot.png.byteLength).toBe(4);
    expect(shot.validity.usable).toBe(true);
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
