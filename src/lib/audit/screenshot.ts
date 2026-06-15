import type { Annotation, ImageRect, Measurement } from './types';
import { withBrowserlessRetry } from './browserless-retry';

export interface BrowserlessConfig {
  token: string;
  baseUrl?: string; // défaut : https://production-sfo.browserless.io
}

const base = (c: BrowserlessConfig) => c.baseUrl ?? 'https://production-sfo.browserless.io';

/** Rectangle d'un élément en coordonnées document (page non scrollée). */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** Position des éléments clés du hero, en coordonnées document. null si introuvable. */
export interface HeroElementRects {
  headline: Rect | null;
  cta: Rect | null;
  nav: Rect | null;
  heroImage: Rect | null;
  logos: Rect | null;
}

/** Viewport de capture. Défaut : desktop 1440x1200. */
export interface ScreenshotViewport {
  width: number;
  height: number;
  isMobile?: boolean;
}

/** Capture full-page PNG (le scroll natif de fullPage déclenche le lazy-loading). */
export async function captureScreenshot(
  url: string,
  config: BrowserlessConfig,
  fetchFn: typeof fetch = fetch,
  viewport?: ScreenshotViewport
): Promise<Buffer> {
  const vp = viewport ?? { width: 1440, height: 1200 };
  return withBrowserlessRetry('screenshot', async () => {
    const res = await fetchFn(`${base(config)}/screenshot?token=${config.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        options: { fullPage: true, type: 'png' },
        viewport: {
          width: vp.width,
          height: vp.height,
          ...(vp.isMobile !== undefined && { isMobile: vp.isMobile, hasTouch: vp.isMobile }),
        },
        // networkidle2 : attendre que le réseau se calme (images/hero lazy chargés),
        // sinon sur un site lent on capture une page à moitié vide (hero invisible).
        gotoOptions: { waitUntil: 'networkidle2', timeout: 30_000 },
        // Règle d'acier : laisser le rendu + les animations d'apparition se finir avant
        // de capturer. 5s couvre les sites lents / lazy-loading tardif.
        waitForTimeout: 5_000,
      }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) throw new Error(`Browserless /screenshot → ${res.status} pour ${url}`);
    return Buffer.from(await res.arrayBuffer());
  });
}

/** Récupère la position de chaque <img> dans la page (coordonnées document). */
export async function getImageRects(
  url: string,
  config: BrowserlessConfig,
  fetchFn: typeof fetch = fetch
): Promise<ImageRect[]> {
  const code = `
export default async function ({ page, context }) {
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto(context.url, { waitUntil: 'load', timeout: 30000 });
  const rects = await page.evaluate(() =>
    Array.from(document.images).map((img) => {
      const r = img.getBoundingClientRect();
      return {
        src: img.currentSrc || img.src,
        x: Math.round(r.x + window.scrollX),
        y: Math.round(r.y + window.scrollY),
        width: Math.round(r.width),
        height: Math.round(r.height),
        alt: img.getAttribute('alt'),
        area: Math.round(r.width * r.height),
      };
    })
  );
  return { data: rects, type: 'application/json' };
}`;
  return withBrowserlessRetry('function', async () => {
    const res = await fetchFn(`${base(config)}/function?token=${config.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, context: { url } }),
      signal: AbortSignal.timeout(60_000),
    });
    if (!res.ok) throw new Error(`Browserless /function → ${res.status} pour ${url}`);
    const json = (await res.json()) as { data?: ImageRect[] };
    return json.data ?? [];
  });
}

/**
 * Localise les éléments clés du hero (titre, CTA, nav, image, logos) via le DOM,
 * en coordonnées document. Sert à poser chaque point d'annotation sur le vrai
 * élément dont parle son commentaire. En cas d'erreur réseau → tous les champs
 * à null (ne throw jamais).
 */
export async function getHeroElementRects(
  url: string,
  config: BrowserlessConfig,
  fetchFn: typeof fetch = fetch
): Promise<HeroElementRects> {
  const code = `
export default async function ({ page, context }) {
  await page.setViewport({ width: 1440, height: 1200 });
  await page.goto(context.url, { waitUntil: 'load', timeout: 30000 });
  const data = await page.evaluate(() => {
    const round = (n) => Math.round(n);
    const toRect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return null;
      return { x: round(r.x + window.scrollX), y: round(r.y + window.scrollY), width: round(r.width), height: round(r.height) };
    };
    const docTop = (el) => el.getBoundingClientRect().top + window.scrollY;

    // headline
    const headline = toRect(document.querySelector('h1'));

    // nav
    const nav = toRect(document.querySelector('nav') || document.querySelector('header'));

    // cta : a/button au-dessus de 1100, fond non transparent, plus grande aire
    let cta = null;
    let ctaArea = -1;
    for (const el of Array.from(document.querySelectorAll('a, button'))) {
      const r = el.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) continue;
      if (docTop(el) >= 1100) continue;
      const bg = getComputedStyle(el).backgroundColor;
      if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') continue;
      const area = r.width * r.height;
      if (area > ctaArea) { ctaArea = area; cta = toRect(el); }
    }

    // heroImage : image au-dessus de 1100, plus grande aire rendue
    let heroImage = null;
    let imgArea = -1;
    for (const img of Array.from(document.images)) {
      const r = img.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) continue;
      if (docTop(img) >= 1100) continue;
      const area = r.width * r.height;
      if (area > imgArea) { imgArea = area; heroImage = toRect(img); }
    }

    // logos : conteneur avec >= 3 <img> en bande horizontale, top < 1400
    let logos = null;
    let bestLogoTop = Infinity;
    for (const el of Array.from(document.querySelectorAll('*'))) {
      const imgs = Array.from(el.querySelectorAll('img'));
      if (imgs.length < 3) continue;
      const top = docTop(el);
      if (top >= 1400) continue;
      // centres des imgs dans une bande horizontale (tops proches)
      const tops = imgs.map((i) => i.getBoundingClientRect().top);
      const minT = Math.min(...tops);
      const maxT = Math.max(...tops);
      if (maxT - minT > 60) continue;
      // prendre le conteneur le plus haut (le plus proche du hero)
      if (top < bestLogoTop) { bestLogoTop = top; logos = toRect(el); }
    }

    return { headline, cta, nav, heroImage, logos };
  });
  return { data, type: 'application/json' };
}`;
  try {
    return await withBrowserlessRetry('function', async () => {
      const res = await fetchFn(`${base(config)}/function?token=${config.token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, context: { url } }),
        signal: AbortSignal.timeout(60_000),
      });
      if (!res.ok) throw new Error(`Browserless /function → ${res.status} pour ${url}`);
      const json = (await res.json()) as { data?: Partial<HeroElementRects> };
      const d = json.data ?? {};
      return {
        headline: d.headline ?? null,
        cta: d.cta ?? null,
        nav: d.nav ?? null,
        heroImage: d.heroImage ?? null,
        logos: d.logos ?? null,
      };
    });
  } catch {
    return { headline: null, cta: null, nav: null, heroImage: null, logos: null };
  }
}

/**
 * Croise les positions d'images avec les measurements en échec.
 * SEULES les measurements images.broken.* (preuve HTTP) produisent une annotation.
 * Aucun jugement visuel ne peut entrer ici : c'est structurel.
 */
export function buildAnnotations(rects: ImageRect[], measurements: Measurement[]): Annotation[] {
  const broken = measurements.filter((m) => m.id.startsWith('images.broken.') && m.status === 'fail');
  const annotations: Annotation[] = [];
  for (const m of broken) {
    const rect = rects.find((r) => r.src === m.value && r.width > 0 && r.height > 0);
    if (rect) {
      annotations.push({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        measurementId: m.id,
        note: `Cette image ne se charge pas (${m.proof ?? 'erreur HTTP'})`,
      });
    }
  }
  return annotations;
}
