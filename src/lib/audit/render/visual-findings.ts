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
  viewport?: ScreenshotViewport; // absent → desktop 1440x1200 (défaut captureScreenshot)
  cropHeight: number; // hauteur du premier écran conservée (px de la capture)
  resizeWidth: number; // largeur finale du JPEG embarqué dans le PDF
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

/**
 * Construit les constats visuels de la homepage : desktop puis mobile,
 * séquentiel (free tier Browserless mono-session). Chaque étape est robuste :
 * si la capture OU l'analyse échoue (après les retries internes), le constat
 * est sauté ; si tout échoue, retourne []. Ne throw jamais.
 */
export async function buildVisualFindings(args: {
  homepageUrl: string;
  pageTitle?: string | null;
  browserless: BrowserlessConfig;
  fetchFn?: typeof fetch;
  analyzeFn?: VisualAnalyzeFn;
}): Promise<VisualFinding[]> {
  const fetchFn = args.fetchFn ?? fetch;
  const analyzeFn = args.analyzeFn ?? defaultAnalyze;
  const site = args.pageTitle ? ` du site « ${args.pageTitle} »` : '';

  const specs: ShotSpec[] = [
    {
      title: 'Accueil sur ordinateur',
      context: `premier écran de la page d'accueil${site} sur ordinateur (desktop)`,
      cropHeight: 1000,
      resizeWidth: 900,
    },
    {
      title: 'Accueil sur smartphone',
      context: `premier écran de la page d'accueil${site} sur smartphone (mobile)`,
      viewport: { width: 390, height: 844, isMobile: true },
      cropHeight: 1700,
      resizeWidth: 420,
    },
  ];

  const findings: VisualFinding[] = [];
  for (const spec of specs) {
    try {
      const png = await captureScreenshot(args.homepageUrl, args.browserless, fetchFn, spec.viewport);
      const jpeg = await cropResizeJpeg(png, spec.cropHeight, spec.resizeWidth);
      const analysis = await analyzeFn(jpeg, spec.context);
      findings.push({
        title: spec.title,
        imageDataUri: `data:image/jpeg;base64,${jpeg.toString('base64')}`,
        legend: analysis.points.map((p) => p.comment),
        analysis: buildAnalysisSentence(analysis.points),
      });
    } catch {
      // Capture ou analyse en échec après retries : on saute ce constat.
    }
  }
  return findings;
}
