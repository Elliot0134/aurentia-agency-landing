import { describe, it, expect, vi, afterEach } from 'vitest';
import sharp from 'sharp';
import { buildVisualFindings, type VisualAnalyzeFn } from '../visual-findings';
import type { BrowserlessConfig } from '../../screenshot';

const browserless: BrowserlessConfig = { token: 'T', baseUrl: 'https://bl.test' };

/** PNG uni généré en mémoire (aucune fixture disque). */
async function makePng(width: number, height: number): Promise<Buffer> {
  return sharp({
    create: { width, height, channels: 3, background: { r: 230, g: 230, b: 230 } },
  })
    .png()
    .toBuffer();
}

/** Stub analyse vision : 2 points (1 positif, 1 négatif). */
const stubAnalyze: VisualAnalyzeFn = async () => ({
  points: [
    { sentiment: 'positif', comment: 'Accroche claire et lisible' },
    { sentiment: 'negatif', comment: 'Bouton d action peu visible' },
  ],
});

/** Attend la fin de la promesse en avançant les fake timers (retries Browserless). */
async function settleWithFakeTimers<T>(promise: Promise<T>): Promise<T> {
  let settled = false;
  void promise.then(
    () => {
      settled = true;
    },
    () => {
      settled = true;
    },
  );
  while (!settled) {
    await vi.advanceTimersByTimeAsync(1000);
    // laisse le threadpool (sharp) terminer : setImmediate reste réel (toFake: ['setTimeout'])
    await new Promise<void>((resolve) => setImmediate(resolve));
  }
  return promise;
}

describe('buildVisualFindings', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('desktop + mobile OK → 2 findings (data URI jpeg, legend, titres, viewports)', async () => {
    const desktopPng = await makePng(1440, 1400);
    const mobilePng = await makePng(390, 2000);
    const bodies: { viewport: { width: number; height: number; isMobile?: boolean; hasTouch?: boolean } }[] = [];

    const fetchFn: typeof fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body)) as (typeof bodies)[number];
      bodies.push(body);
      const png = body.viewport.width === 390 ? mobilePng : desktopPng;
      return new Response(new Uint8Array(png), { status: 200 });
    }) as typeof fetch;

    const contexts: string[] = [];
    const analyzeFn: VisualAnalyzeFn = async (png, context) => {
      contexts.push(context);
      return stubAnalyze(png, context);
    };

    const findings = await buildVisualFindings({
      homepageUrl: 'https://exemple.fr',
      pageTitle: 'Exemple',
      browserless,
      fetchFn,
      analyzeFn,
    });

    expect(findings).toHaveLength(2);
    expect(findings[0].title).toBe('Accueil sur ordinateur');
    expect(findings[1].title).toBe('Accueil sur smartphone');

    for (const f of findings) {
      expect(f.imageDataUri.startsWith('data:image/jpeg;base64,')).toBe(true);
      const jpeg = Buffer.from(f.imageDataUri.slice('data:image/jpeg;base64,'.length), 'base64');
      expect(jpeg[0]).toBe(0xff); // magic JPEG
      expect(jpeg[1]).toBe(0xd8);
      expect(f.legend).toEqual(['Accroche claire et lisible', 'Bouton d action peu visible']);
      expect(f.analysis).toContain('1 point fort');
      expect(f.analysis).toContain("1 point d'amélioration");
    }

    // tailles : crop premier écran puis resize (900 desktop, 420 mobile)
    const meta0 = await sharp(Buffer.from(findings[0].imageDataUri.split(',')[1], 'base64')).metadata();
    const meta1 = await sharp(Buffer.from(findings[1].imageDataUri.split(',')[1], 'base64')).metadata();
    expect(meta0.width).toBe(900);
    expect(meta1.width).toBe(420);

    // payloads Browserless : desktop par défaut puis viewport mobile avec hasTouch
    expect(bodies[0].viewport).toMatchObject({ width: 1440, height: 1200 });
    expect(bodies[1].viewport).toMatchObject({ width: 390, height: 844, isMobile: true, hasTouch: true });

    // contextes vision : desktop puis mobile
    expect(contexts[0]).toContain('ordinateur');
    expect(contexts[1]).toContain('smartphone');
  });

  it('échec de la capture mobile (après retries) → 1 seul finding desktop', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout'] });
    const desktopPng = await makePng(1440, 1400);
    let calls = 0;
    const fetchFn: typeof fetch = (async () => {
      calls++;
      if (calls === 1) return new Response(new Uint8Array(desktopPng), { status: 200 });
      throw new Error('network down');
    }) as typeof fetch;

    const findings = await settleWithFakeTimers(
      buildVisualFindings({ homepageUrl: 'https://exemple.fr', browserless, fetchFn, analyzeFn: stubAnalyze }),
    );

    expect(findings).toHaveLength(1);
    expect(findings[0].title).toBe('Accueil sur ordinateur');
    expect(calls).toBe(1 + 5); // desktop OK + 5 tentatives mobile
  });

  it('échec de l analyse desktop → le finding desktop est sauté, mobile conservé', async () => {
    const desktopPng = await makePng(1440, 1400);
    const mobilePng = await makePng(390, 2000);
    const fetchFn: typeof fetch = (async (_input: RequestInfo | URL, init?: RequestInit) => {
      const body = JSON.parse(String(init?.body)) as { viewport: { width: number } };
      const png = body.viewport.width === 390 ? mobilePng : desktopPng;
      return new Response(new Uint8Array(png), { status: 200 });
    }) as typeof fetch;

    let analyzeCalls = 0;
    const analyzeFn: VisualAnalyzeFn = async (png, context) => {
      analyzeCalls++;
      if (analyzeCalls === 1) throw new Error('vision indisponible');
      return stubAnalyze(png, context);
    };

    const findings = await buildVisualFindings({ homepageUrl: 'https://exemple.fr', browserless, fetchFn, analyzeFn });
    expect(findings).toHaveLength(1);
    expect(findings[0].title).toBe('Accueil sur smartphone');
  });

  it('tout échoue → [] (ne throw jamais)', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout'] });
    const fetchFn: typeof fetch = (async () => {
      throw new Error('network down');
    }) as typeof fetch;

    const findings = await settleWithFakeTimers(
      buildVisualFindings({ homepageUrl: 'https://exemple.fr', browserless, fetchFn, analyzeFn: stubAnalyze }),
    );
    expect(findings).toEqual([]);
  });
});
