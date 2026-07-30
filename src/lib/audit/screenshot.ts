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

/**
 * Verdict de validité d'une capture. Une capture peut réussir techniquement et
 * ne rien montrer : un préchargeur plein écran suffit à produire un PNG blanc.
 */
export interface CaptureValidity {
  /** false → ne JAMAIS soumettre cette capture à une analyse visuelle. */
  usable: boolean;
  /** Longueur du texte visible dans le DOM au moment du shot. */
  bodyTextLength: number;
  /** Nombre d'overlays plein écran neutralisés avant le shot. */
  overlaysRemoved: number;
  /** Pourquoi la capture est inexploitable (absent si utilisable). */
  reason?: string;
}

export interface Screenshot {
  png: Buffer;
  validity: CaptureValidity;
}

/** Sous ce seuil de texte visible, il n'y a rien de sérieux à commenter. */
const MIN_BODY_TEXT = 200;

/**
 * Capture full-page PNG + verdict de validité.
 *
 * Passe par `/function` plutôt que `/screenshot` pour deux raisons qui viennent
 * d'incidents réels :
 *
 * 1. Neutraliser les préchargeurs. Beaucoup de thèmes WordPress posent un overlay
 *    plein écran opaque retiré par JS au `load`. En headless ce retrait n'arrive
 *    parfois JAMAIS (incident pieces-chariot.com, `DIV.spinner-wrapper` z-index
 *    999999 encore présent à 20 s) : attendre plus longtemps ne règle rien, il
 *    faut retirer l'élément.
 * 2. Rapporter ce que le navigateur voyait vraiment. Sans ça, une capture blanche
 *    est indiscernable d'une page vraiment vide, et l'analyse vision décrit
 *    l'artefact comme un défaut du site.
 */
export async function captureScreenshot(
  url: string,
  config: BrowserlessConfig,
  fetchFn: typeof fetch = fetch,
  viewport?: ScreenshotViewport
): Promise<Screenshot> {
  const vp = viewport ?? { width: 1440, height: 1200 };
  // JS pur exécuté dans la page : pas de TS ici.
  const code = `
export default async function ({ page, context }) {
  const vp = context.viewport;
  await page.setViewport(vp);
  // networkidle2 : attendre que le réseau se calme (images/hero lazy chargés),
  // sinon sur un site lent on capture une page à moitié vide (hero invisible).
  await page.goto(context.url, { waitUntil: 'networkidle2', timeout: 30000 });
  // Laisser le rendu + les animations d'apparition se finir. 5s couvre les
  // sites lents et le lazy-loading tardif.
  await new Promise((r) => setTimeout(r, 5000));

  const verdict = await page.evaluate(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const opaque = (bg) => bg && bg !== 'transparent' && !/rgba\\(\\s*0\\s*,\\s*0\\s*,\\s*0\\s*,\\s*0\\s*\\)/.test(bg);

    // Un overlay bloquant : positionné, couvrant le viewport, fond opaque et
    // empilé au-dessus du contenu. On le retire au lieu de l'attendre.
    const isBlocking = (el) => {
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed' && cs.position !== 'absolute') return false;
      if (cs.visibility === 'hidden' || cs.display === 'none' || Number(cs.opacity) === 0) return false;
      const r = el.getBoundingClientRect();
      if (r.width < vw * 0.9 || r.height < vh * 0.9) return false;
      if (r.top > 1 || r.left > 1) return false;
      if (!opaque(cs.backgroundColor)) return false;
      return Number(cs.zIndex) >= 1000;
    };

    let removed = 0;
    for (const el of Array.from(document.querySelectorAll('body *'))) {
      if (isBlocking(el)) {
        el.remove();
        removed++;
      }
    }

    // Reste-t-il quelque chose au centre qui masque la page ?
    const center = document.elementFromPoint(Math.round(vw / 2), Math.round(vh / 2));
    let blockedBy = null;
    let el = center;
    while (el && el !== document.body) {
      if (isBlocking(el)) {
        blockedBy = el.tagName + (el.className ? '.' + String(el.className).trim().split(/\\s+/).join('.') : '');
        break;
      }
      el = el.parentElement;
    }

    return {
      overlaysRemoved: removed,
      blockedBy,
      bodyTextLength: (document.body.innerText || '').trim().length,
    };
  });

  const png = await page.screenshot({ fullPage: true, type: 'png', encoding: 'base64' });
  return { data: { ...verdict, png }, type: 'application/json' };
}`;

  return withBrowserlessRetry('screenshot', async () => {
    const res = await fetchFn(`${base(config)}/function?token=${config.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        context: {
          url,
          viewport: {
            width: vp.width,
            height: vp.height,
            ...(vp.isMobile !== undefined && { isMobile: vp.isMobile, hasTouch: vp.isMobile }),
          },
        },
      }),
      signal: AbortSignal.timeout(90_000),
    });
    if (!res.ok) throw new Error(`Browserless /function screenshot → ${res.status} pour ${url}`);
    const json = (await res.json()) as {
      data?: { png?: string; bodyTextLength?: number; overlaysRemoved?: number; blockedBy?: string | null };
    };
    const b64 = json.data?.png;
    if (typeof b64 !== 'string' || b64.length === 0) {
      throw new Error(`Capture inexploitable (data.png absent) pour ${url}`);
    }

    const bodyTextLength = json.data?.bodyTextLength ?? 0;
    const overlaysRemoved = json.data?.overlaysRemoved ?? 0;
    const blockedBy = json.data?.blockedBy ?? null;

    // Le PNG est retourné quand même : il sert au débogage et aux annotations
    // mesurées. Seul `usable` décide de ce qui atteint une analyse visuelle.
    let reason: string | undefined;
    if (blockedBy) reason = `un overlay masque encore la page au moment du shot (${blockedBy})`;
    else if (bodyTextLength < MIN_BODY_TEXT) reason = `page quasi sans texte visible (${bodyTextLength} caractères)`;

    return {
      png: Buffer.from(b64, 'base64'),
      validity: { usable: reason === undefined, bodyTextLength, overlaysRemoved, ...(reason && { reason }) },
    };
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
