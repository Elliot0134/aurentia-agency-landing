import type { Measurement, ModuleId } from '../types';
import { COLORS } from './theme';

/* ----------------------------------------------------------------------------
 * Charts SVG inline du rapport Pro (tâche A2).
 *
 * Reproduit l'allure des 4 charts matplotlib du générateur de référence
 * (aurentia-prospection/skills/audit-site/scripts/generate_charts.py) en SVG
 * pur, déterministe, zéro dépendance. Chaque fonction retourne un string
 * `<svg ...>...</svg>` complet, prêt à être injecté dans le HTML du PDF.
 * ------------------------------------------------------------------------- */

export interface RadarAxis {
  label: string;
  score: number; // /10
}

export interface FunnelStage {
  label: string;
  value: number;
  lossNote?: string;
}

export interface ScoreTargetRow {
  label: string;
  current: number; // /10
  target: number; // /10
}

export type HeatCell = 'ok' | 'warn' | 'fail' | 'na';

const FONT = 'Arial, sans-serif';
const W = 700;

/* ----------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------- */

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Rouge <50, orange 50-69, vert >=70 (score /100). */
function scoreColor100(score: number): string {
  if (score < 50) return COLORS.bad;
  if (score < 70) return COLORS.mid;
  return COLORS.good;
}

/** Note /10 : rouge <5, orange 5-6.9, vert >=7. */
function noteColor10(note: number): string {
  return scoreColor100(note * 10);
}

/** 12000 → "12 000" (séparateur de milliers, espace simple). */
function groupFr(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** 3.5 → "3,5" ; 9 → "9". */
function fmtFr(n: number): string {
  const rounded = Math.round(n * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace('.', ',');
}

function r2(n: number): string {
  return (Math.round(n * 100) / 100).toString();
}

/**
 * Coupe un texte en lignes de `maxChars` max (coupure aux espaces).
 * Plafonné à 2 lignes : l'éventuel surplus est fusionné dans la seconde.
 */
function wrap2(s: string, maxChars: number): string[] {
  if (s.length <= maxChars) return [s];
  const words = s.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current === '' ? word : `${current} ${word}`;
    if (candidate.length > maxChars && current !== '') {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current !== '') lines.push(current);
  return lines.length <= 2 ? lines : [lines[0], lines.slice(1).join(' ')];
}

/** Un <text> mono ou bi-ligne, centré verticalement sur midY. */
function multilineText(lines: string[], x: number, midY: number, attrs: string, lineGap = 13): string {
  if (lines.length === 1) {
    return `<text x="${r2(x)}" y="${r2(midY)}" ${attrs}>${escapeXml(lines[0])}</text>`;
  }
  return lines
    .map(
      (line, i) =>
        `<text x="${r2(x)}" y="${r2(midY + (i === 0 ? -lineGap / 2 : lineGap / 2))}" ${attrs}>${escapeXml(line)}</text>`,
    )
    .join('');
}

function svgOpen(height: number, width: number = W): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" font-family="${FONT}">`;
}

function title(text: string): string {
  return `<text x="16" y="26" font-size="15" font-weight="700" fill="${COLORS.text}">${escapeXml(text)}</text>`;
}

/* ----------------------------------------------------------------------------
 * 1. Radar : score par axe /10, score global /100 au centre
 * ------------------------------------------------------------------------- */

export function svgRadar(axes: RadarAxis[], globalScore: number): string {
  if (axes.length < 3) {
    throw new Error(`svgRadar: minimum 3 axes (reçu ${axes.length})`);
  }

  const H = 560;
  const cx = W / 2;
  const cy = 310;
  const R = 190;
  const n = axes.length;

  const angle = (i: number): number => ((-90 + (i * 360) / n) * Math.PI) / 180;
  const point = (i: number, score: number): [number, number] => {
    const s = Math.max(0, Math.min(10, score));
    return [cx + ((R * s) / 10) * Math.cos(angle(i)), cy + ((R * s) / 10) * Math.sin(angle(i))];
  };

  // Grille : cercles concentriques aux notes 2/4/6/8/10. Graduations limitées
  // aux 2 cercles extérieurs (8 et 10), placées en haut : les labels des cercles
  // intérieurs chevauchaient le score central.
  const grid = [1, 2, 3, 4, 5]
    .map((k) => {
      const r = (R * k) / 5;
      const tick =
        k >= 4
          ? `<text x="${r2(cx + 6)}" y="${r2(cy - r + 4)}" font-size="9" fill="${COLORS.dim}">${k * 2}</text>`
          : '';
      return `<circle cx="${cx}" cy="${cy}" r="${r2(r)}" fill="none" stroke="${COLORS.border}" stroke-width="1"/>${tick}`;
    })
    .join('\n  ');

  // Rayons + labels d'axes
  const spokes = axes
    .map((a, i) => {
      const [ox, oy] = point(i, 10);
      const cos = Math.cos(angle(i));
      const sin = Math.sin(angle(i));
      const lx = cx + (R + 22) * cos;
      const ly = cy + (R + 22) * sin + (sin > 0.5 ? 10 : sin < -0.5 ? -2 : 4);
      const anchor = cos > 0.25 ? 'start' : cos < -0.25 ? 'end' : 'middle';
      return (
        `<line x1="${cx}" y1="${cy}" x2="${r2(ox)}" y2="${r2(oy)}" stroke="${COLORS.border}" stroke-width="1"/>` +
        `<text x="${r2(lx)}" y="${r2(ly)}" font-size="12" font-weight="700" fill="${COLORS.text}" text-anchor="${anchor}">${escapeXml(a.label)}</text>`
      );
    })
    .join('\n  ');

  const polyPoints = axes.map((a, i) => point(i, a.score).map(r2).join(',')).join(' ');
  const score = Math.round(Math.max(0, Math.min(100, globalScore)));

  return `${svgOpen(H)}
  ${title('Score global du site')}
  ${grid}
  ${spokes}
  <circle cx="${cx}" cy="${cy}" r="${r2(R * 0.7)}" fill="none" stroke="${COLORS.good}" stroke-width="1" stroke-dasharray="5 4" opacity="0.5"/>
  <polygon points="${polyPoints}" fill="${COLORS.accent}" fill-opacity="0.2" stroke="${COLORS.accent}" stroke-width="2.5" stroke-linejoin="round"/>
  <text x="${cx}" y="${cy + 12}" font-size="42" font-weight="700" fill="${scoreColor100(score)}" text-anchor="middle">${score}</text>
</svg>`;
}

/* ----------------------------------------------------------------------------
 * 2. Funnel de perte : barres horizontales centrées, lossNote en rouge
 * ------------------------------------------------------------------------- */

export function svgFunnel(stages: FunnelStage[]): string {
  const FUNNEL_W = 760; // plus large que les autres charts : labels + lossNotes lisibles
  const rowH = 52;
  const barH = 30;
  const headerH = 48;
  const H = headerH + stages.length * rowH + 16;

  const labelRight = 240; // colonne labels élargie (wrap 2 lignes au-delà de 38 chars)
  const barCx = 372; // centre des barres
  const maxBarW = 240;
  const lossX = 504; // lossNotes : wrap 2 lignes au-delà de 48 chars
  const maxV = Math.max(...stages.map((s) => s.value), 1);

  const first = stages[0];
  const last = stages[stages.length - 1];
  const titleText =
    stages.length >= 2 && first !== undefined && last !== undefined && first.value > 0
      ? `Funnel de perte : sur 100 visiteurs, ${Math.round((last.value / first.value) * 100)} restent en capacité d'agir (est.)`
      : 'Funnel de perte';

  const rows = stages
    .map((stage, i) => {
      const y = headerH + i * rowH + (rowH - barH) / 2;
      const midY = y + barH / 2 + 4;
      // Racine carrée pour rester lisible quand le 1er étage écrase les autres
      const width = Math.max(maxBarW * Math.sqrt(stage.value / maxV), 14);
      const x0 = barCx - width / 2;

      const valueText = groupFr(stage.value);
      const valueInside = width >= 70;
      const value = valueInside
        ? `<text x="${barCx}" y="${r2(midY)}" font-size="12" font-weight="700" fill="#ffffff" text-anchor="middle">${valueText}</text>`
        : `<text x="${r2(barCx + width / 2 + 6)}" y="${r2(midY)}" font-size="12" font-weight="700" fill="${COLORS.accent}">${valueText}</text>`;

      const loss = stage.lossNote
        ? multilineText(
            wrap2(`- ${stage.lossNote}`, 48),
            lossX,
            midY,
            `font-size="9.5" font-style="italic" fill="${COLORS.bad}"`,
            12,
          )
        : '';

      const label = multilineText(
        wrap2(stage.label, 38),
        labelRight,
        midY,
        `font-size="11" font-weight="700" fill="${COLORS.text}" text-anchor="end"`,
      );

      return (
        label +
        `<rect x="${r2(x0)}" y="${r2(y)}" width="${r2(width)}" height="${barH}" rx="2" fill="${COLORS.accent}" fill-opacity="0.9"/>` +
        value +
        loss
      );
    })
    .join('\n  ');

  return `${svgOpen(H, FUNNEL_W)}
  ${title(titleText)}
  ${rows}
</svg>`;
}

/* ----------------------------------------------------------------------------
 * 3. État actuel vs objectif : barres cible pâles + barres actuelles colorées
 * ------------------------------------------------------------------------- */

export function svgScoreTargetBars(rows: ScoreTargetRow[]): string {
  const rowH = 40;
  const barH = 20;
  const top = 44;
  const x0 = 180;
  const span = 460;
  const axisY = top + rows.length * rowH + 10;
  const legendY = axisY + 28;
  const H = legendY + 14;

  const xAt = (note: number): number => x0 + (Math.max(0, Math.min(10, note)) / 10) * span;

  // Axe X gradué 0..10
  const axis = Array.from({ length: 11 }, (_, t) => {
    const x = xAt(t);
    return (
      `<line x1="${r2(x)}" y1="${top - 6}" x2="${r2(x)}" y2="${axisY - 8}" stroke="${COLORS.border}" stroke-width="1" opacity="0.6"/>` +
      `<text x="${r2(x)}" y="${axisY + 6}" font-size="9" fill="${COLORS.muted}" text-anchor="middle">${t}</text>`
    );
  }).join('\n  ');

  const bars = rows
    .map((row, i) => {
      const y = top + i * rowH + (rowH - barH) / 2 - 8;
      const midY = y + barH / 2 + 4;
      // La cible ne descend jamais sous l'actuel (axe déjà au niveau → cible = actuel arrondi sup)
      const target = row.current >= row.target ? Math.max(row.target, Math.ceil(row.current)) : row.target;
      const wTarget = xAt(target) - x0;
      const wCurrent = xAt(row.current) - x0;
      const color = noteColor10(row.current);

      const valueInside = wCurrent >= 34;
      const value = valueInside
        ? `<text x="${r2(x0 + wCurrent - 6)}" y="${r2(midY)}" font-size="11" font-weight="700" fill="#ffffff" text-anchor="end">${fmtFr(row.current)}</text>`
        : `<text x="${r2(x0 + wCurrent + 6)}" y="${r2(midY)}" font-size="11" font-weight="700" fill="${color}">${fmtFr(row.current)}</text>`;

      return (
        `<text x="${x0 - 10}" y="${r2(midY)}" font-size="11" font-weight="700" fill="${COLORS.text}" text-anchor="end">${escapeXml(row.label)}</text>` +
        `<rect x="${x0}" y="${r2(y)}" width="${r2(wTarget)}" height="${barH}" rx="2" fill="${COLORS.good}" fill-opacity="0.18"/>` +
        `<rect x="${x0}" y="${r2(y)}" width="${r2(Math.max(wCurrent, 2))}" height="${barH}" rx="2" fill="${color}"/>` +
        value +
        `<text x="${r2(x0 + wTarget + 8)}" y="${r2(midY)}" font-size="10" font-weight="700" fill="${COLORS.good}">cible ${fmtFr(target)}</text>`
      );
    })
    .join('\n  ');

  const legend =
    `<rect x="${x0}" y="${legendY - 9}" width="14" height="10" rx="2" fill="${COLORS.bad}"/>` +
    `<text x="${x0 + 20}" y="${legendY}" font-size="10" fill="${COLORS.muted}">Actuel</text>` +
    `<rect x="${x0 + 80}" y="${legendY - 9}" width="14" height="10" rx="2" fill="${COLORS.good}" fill-opacity="0.18" stroke="${COLORS.good}" stroke-width="1"/>` +
    `<text x="${x0 + 100}" y="${legendY}" font-size="10" fill="${COLORS.muted}">Objectif</text>`;

  return `${svgOpen(H)}
  ${title('État actuel vs objectif post-refonte')}
  ${axis}
  ${bars}
  ${legend}
</svg>`;
}

/* ----------------------------------------------------------------------------
 * 4. Heatmap pages × critères : cellules vert/orange/rouge/gris
 * ------------------------------------------------------------------------- */

const HEAT_STYLE: Record<HeatCell, { fill: string; mark: string }> = {
  ok: { fill: COLORS.good, mark: 'OK' },
  warn: { fill: COLORS.mid, mark: '!' },
  fail: { fill: COLORS.bad, mark: 'X' },
  na: { fill: COLORS.dim, mark: 'n/a' },
};

export function svgHeatmap(pageLabels: string[], criteriaLabels: string[], cells: HeatCell[][]): string {
  const leftW = 150;
  const gap = 3;
  const cols = Math.max(criteriaLabels.length, 1);
  const cellW = Math.max(48, Math.min(110, Math.floor((W - leftW - 24) / cols) - gap));
  const cellH = 34;
  const top = 44;
  const gridBottom = top + pageLabels.length * (cellH + gap);
  const H = gridBottom + 64;

  const rowLabels = pageLabels
    .map((label, r) => {
      const y = top + r * (cellH + gap) + cellH / 2 + 4;
      return `<text x="${leftW - 10}" y="${y}" font-size="11" font-weight="700" fill="${COLORS.text}" text-anchor="end">${escapeXml(label)}</text>`;
    })
    .join('\n  ');

  const grid = pageLabels
    .map((_, r) =>
      criteriaLabels
        .map((__, c) => {
          const status: HeatCell = cells[r]?.[c] ?? 'na';
          const { fill, mark } = HEAT_STYLE[status];
          const x = leftW + c * (cellW + gap);
          const y = top + r * (cellH + gap);
          return (
            `<rect class="cell" x="${x}" y="${y}" width="${cellW}" height="${cellH}" rx="3" fill="${fill}"/>` +
            `<text x="${x + cellW / 2}" y="${y + cellH / 2 + 4}" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">${mark}</text>`
          );
        })
        .join('\n  '),
    )
    .join('\n  ');

  // Labels colonnes inclinés en bas
  const colLabels = criteriaLabels
    .map((label, c) => {
      const x = leftW + c * (cellW + gap) + cellW / 2;
      const y = gridBottom + 16;
      return `<text x="${x}" y="${y}" font-size="10" fill="${COLORS.text}" text-anchor="end" transform="rotate(-25 ${x} ${y})">${escapeXml(label)}</text>`;
    })
    .join('\n  ');

  return `${svgOpen(H)}
  ${title('Performance par page × critère')}
  ${rowLabels}
  ${grid}
  ${colLabels}
</svg>`;
}

/* ----------------------------------------------------------------------------
 * Axes radar depuis les mesures (branchement render.ts)
 * ------------------------------------------------------------------------- */

/** Modules scorables et leur label FR sur le radar, dans l'ordre d'affichage. */
const RADAR_MODULES: ReadonlyArray<readonly [ModuleId, string]> = [
  ['perf', 'Performance'],
  ['seo-onpage', 'SEO on-page'],
  ['seo-tech', 'SEO technique'],
  ['images', 'Images'],
  ['mobile', 'Mobile'],
  ['local-seo', 'Local SEO'],
  ['a11y', 'Accessibilité'],
  ['ai-readiness', 'AI Readiness'],
];

/**
 * Note /10 par module présent = taux de réussite des mesures (hors `info`).
 * Les modules sans mesure scorable sont omis.
 */
export function radarAxesFromMeasurements(measurements: Measurement[]): RadarAxis[] {
  return RADAR_MODULES.flatMap(([moduleId, label]) => {
    const ms = measurements.filter((m) => m.module === moduleId && m.status !== 'info');
    if (ms.length === 0) return [];
    const passRate = ms.filter((m) => m.status === 'pass').length / ms.length;
    return [{ label, score: Math.round(passRate * 100) / 10 }];
  });
}
