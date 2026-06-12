import sharp from 'sharp';

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

/**
 * Rasterise le gauge SVG en PNG via sharp.
 */
export async function renderScoreGaugePng(score: number): Promise<Buffer> {
  const svg = buildScoreGaugeSvg(score);
  return sharp(Buffer.from(svg)).png().toBuffer();
}
