import sharp from 'sharp';
import {
  captureScreenshot,
  type BrowserlessConfig,
  type ScreenshotViewport,
} from '../screenshot';
import { analyzeHero } from './hero-analysis';

/**
 * Constat visuel du rapport Pro (tâche B5) : capture PROPRE du premier écran
 * (aucune pastille incrustée, le placement automatique n'est pas fiable),
 * légende numérotée rédigée par l'analyse vision, et une phrase de synthèse.
 * Forme alignée sur ProVisualFinding (pdf-pro-html, tâche A1).
 */
export interface VisualFinding {
  title: string;
  imageDataUri: string;
  legend: string[];
  analysis: string;
  /** Orientation de la capture : pilote la largeur d'affichage dans le PDF. */
  kind: 'desktop' | 'mobile';
}

/** Sortie minimale attendue de l'analyse vision (HeroAnalysis y est assignable). */
export interface VisualAnalysis {
  points: { sentiment: string; comment: string }[];
}

export type VisualAnalyzeFn = (png: Buffer, context: string) => Promise<VisualAnalysis>;

/** Défaut : l'analyse vision hero, contextualisée (desktop ou mobile). */
const defaultAnalyze: VisualAnalyzeFn = (png, context) => analyzeHero(png, { context });

interface ShotSpec {
  title: string;
  context: string;
  url: string; // page capturée (homepage ou page clé du crawl)
  viewport?: ScreenshotViewport; // absent → desktop 1440x1200 (défaut captureScreenshot)
  cropHeight: number; // hauteur du premier écran conservée (px de la capture)
  resizeWidth: number; // largeur finale du JPEG embarqué dans le PDF
  kind: VisualFinding['kind'];
}

/** Crop le premier écran (haut de page) puis resize + JPEG qualité 80. */
async function cropResizeJpeg(png: Buffer, cropHeight: number, resizeWidth: number): Promise<Buffer> {
  const meta = await sharp(png).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;
  if (width <= 0 || height <= 0) throw new Error('Capture illisible (dimensions absentes)');
  return sharp(png)
    .extract({ left: 0, top: 0, width, height: Math.min(cropHeight, height) })
    .resize({ width: resizeWidth })
    .jpeg({ quality: 80 })
    .toBuffer();
}

/** Phrase de synthèse construite depuis les sentiments (aucune invention). */
function buildAnalysisSentence(points: VisualAnalysis['points']): string {
  const positives = points.filter((p) => p.sentiment === 'positif').length;
  const negatives = points.length - positives;
  const fort = `${positives} ${positives > 1 ? 'points forts' : 'point fort'}`;
  const amelioration = `${negatives} ${negatives > 1 ? "points d'amélioration" : "point d'amélioration"}`;
  return `${fort} et ${amelioration} relevés sur ce premier écran.`;
}

/** Pathname d'une URL, fallback sur la chaîne brute si illisible. */
function pathnameOf(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
}

/**
 * Construit les constats visuels : homepage desktop, homepage mobile, puis
 * (si fournie) le premier écran desktop d'une page clé du crawl. Séquentiel
 * (free tier Browserless mono-session). Chaque étape est robuste : si la
 * capture OU l'analyse échoue (après les retries internes), le constat est
 * sauté ; si tout échoue, retourne []. Ne throw jamais.
 */
export async function buildVisualFindings(args: {
  homepageUrl: string;
  pageTitle?: string | null;
  browserless: BrowserlessConfig;
  fetchFn?: typeof fetch;
  analyzeFn?: VisualAnalyzeFn;
  /** Page clé du crawl (pas la homepage) : 3e constat desktop. */
  keyPage?: { url: string; title: string | null };
}): Promise<VisualFinding[]> {
  const fetchFn = args.fetchFn ?? fetch;
  const analyzeFn = args.analyzeFn ?? defaultAnalyze;
  const site = args.pageTitle ? ` du site « ${args.pageTitle} »` : '';

  const specs: ShotSpec[] = [
    {
      title: 'Accueil sur ordinateur',
      context: `premier écran de la page d'accueil${site} sur ordinateur (desktop)`,
      url: args.homepageUrl,
      cropHeight: 1000,
      resizeWidth: 900,
      kind: 'desktop',
    },
    {
      // UN écran de téléphone : crop à la hauteur du viewport (844), pas plus.
      title: 'Accueil sur smartphone',
      context: `premier écran de la page d'accueil${site} sur smartphone (mobile)`,
      url: args.homepageUrl,
      viewport: { width: 390, height: 844, isMobile: true },
      cropHeight: 844,
      resizeWidth: 360,
      kind: 'mobile',
    },
  ];

  if (args.keyPage) {
    const pathname = pathnameOf(args.keyPage.url);
    const titled = args.keyPage.title ? ` « ${args.keyPage.title} »` : '';
    specs.push({
      title: `Page ${pathname} sur ordinateur`,
      context: `premier écran d'une page intérieure${titled} (${pathname})${site} sur ordinateur (desktop)`,
      url: args.keyPage.url,
      cropHeight: 1000,
      resizeWidth: 900,
      kind: 'desktop',
    });
  }

  const findings: VisualFinding[] = [];
  for (const spec of specs) {
    try {
      const shot = await captureScreenshot(spec.url, args.browserless, fetchFn, spec.viewport);
      // Règle d'acier : une capture non validée ne va JAMAIS au rédacteur. Sinon
      // il décrit l'artefact (préchargeur, page blanche) comme un défaut du site,
      // dans un document facturé. Mieux vaut aucun constat visuel qu'un faux.
      if (!shot.validity.usable) {
        console.warn(`[visual-findings] capture écartée pour ${spec.url} : ${shot.validity.reason}`);
        continue;
      }
      const jpeg = await cropResizeJpeg(shot.png, spec.cropHeight, spec.resizeWidth);
      const analysis = await analyzeFn(jpeg, spec.context);
      findings.push({
        title: spec.title,
        imageDataUri: `data:image/jpeg;base64,${jpeg.toString('base64')}`,
        legend: analysis.points.map((p) => p.comment),
        analysis: buildAnalysisSentence(analysis.points),
        kind: spec.kind,
      });
    } catch {
      // Capture ou analyse en échec après retries : on saute ce constat.
    }
  }
  return findings;
}
