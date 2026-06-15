import sharp from 'sharp';
import { withBrowserlessRetry } from '../browserless-retry';
import type { BrowserlessConfig } from '../screenshot';

const SIZE = 220;
const CX = SIZE / 2;
const CY = SIZE / 2;
const STROKE_WIDTH = 16;
const RADIUS = (SIZE - STROKE_WIDTH) / 2 - 2; // 2px margin
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function scoreColor(score: number): string {
  if (score < 50) return '#C62828';
  if (score < 70) return '#E8710A';
  return '#2E7D32';
}

/**
 * Retourne un SVG (string) d'un donut gauge 220×220px affichant le score /100.
 * Fond transparent, arc coloré selon le seuil, texte centré.
 */
export function buildScoreGaugeSvg(score: number): string {
  const clamped = Math.max(0, Math.min(100, score));
  const color = scoreColor(clamped);
  const dashOffset = CIRCUMFERENCE * (1 - clamped / 100);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <!-- fond gris -->
  <circle
    cx="${CX}"
    cy="${CY}"
    r="${RADIUS}"
    fill="none"
    stroke="#E5E5E5"
    stroke-width="${STROKE_WIDTH}"
  />
  <!-- arc de progression -->
  <circle
    cx="${CX}"
    cy="${CY}"
    r="${RADIUS}"
    fill="none"
    stroke="${color}"
    stroke-width="${STROKE_WIDTH}"
    stroke-linecap="round"
    stroke-dasharray="${CIRCUMFERENCE.toFixed(4)}"
    stroke-dashoffset="${dashOffset.toFixed(4)}"
    transform="rotate(-90 ${CX} ${CY})"
  />
  <!-- score -->
  <text
    x="${CX}"
    y="${CY + 2}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="'Helvetica Neue', Arial, sans-serif"
    font-size="48"
    font-weight="700"
    fill="#0A0A0A"
  >${clamped}</text>
  <!-- /100 -->
  <text
    x="${CX}"
    y="${CY + 34}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="'Helvetica Neue', Arial, sans-serif"
    font-size="16"
    font-weight="400"
    fill="#0A0A0A"
  >/ 100</text>
</svg>`;
}

const browserlessBase = (c: BrowserlessConfig) => c.baseUrl ?? 'https://production-sfo.browserless.io';

/**
 * Rasterise le gauge dans un vrai navigateur (browserless), seul moyen fiable
 * d'avoir le texte rendu en prod : sharp/librsvg ne trouve aucune police sur le
 * runtime Vercel (le nombre sortait en carrés ▢▢) et n'honore pas @font-face.
 * Le navigateur, lui, a ses polices système.
 */
async function renderGaugeViaBrowserless(
  svg: string,
  config: BrowserlessConfig,
  fetchFn: typeof fetch,
): Promise<Buffer> {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;background:transparent;}</style></head><body>${svg}</body></html>`;
  return withBrowserlessRetry('gauge', async () => {
    const res = await fetchFn(`${browserlessBase(config)}/screenshot?token=${config.token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html,
        options: { type: 'png', omitBackground: true },
        viewport: { width: SIZE, height: SIZE, deviceScaleFactor: 2 },
        gotoOptions: { waitUntil: 'networkidle0', timeout: 15_000 },
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`Browserless gauge → ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  });
}

/**
 * Rendu PNG du gauge. En prod, passer `browserless` (rendu navigateur, texte
 * fiable). Sans `browserless` (tests / local), fallback sharp — OK seulement là
 * où des polices système existent.
 */
export async function renderScoreGaugePng(
  score: number,
  browserless?: BrowserlessConfig,
  fetchFn: typeof fetch = fetch,
): Promise<Buffer> {
  const svg = buildScoreGaugeSvg(score);
  if (browserless) return renderGaugeViaBrowserless(svg, browserless, fetchFn);
  return sharp(Buffer.from(svg)).png().toBuffer();
}
