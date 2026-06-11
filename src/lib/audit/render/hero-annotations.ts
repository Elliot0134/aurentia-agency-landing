import type { Annotation } from '../types';
import type { HeroAnalysis } from './hero-analysis';

const GRID: Record<string, { fx: number; fy: number }> = {
  'haut-gauche': { fx: 0.18, fy: 0.20 }, 'haut-centre': { fx: 0.5, fy: 0.18 }, 'haut-droite': { fx: 0.82, fy: 0.20 },
  'centre-gauche': { fx: 0.20, fy: 0.5 }, 'centre': { fx: 0.5, fy: 0.5 }, 'centre-droite': { fx: 0.80, fy: 0.5 },
};

/**
 * Déplace `ann` vers le bas par incréments de `step` jusqu'à être à au moins
 * `minDist` de toutes les annotations déjà placées. Si le bas de l'image est
 * atteint, repart vers le haut depuis la position initiale.
 */
function resolveCollision(
  ann: { x: number; y: number },
  placed: ReadonlyArray<{ x: number; y: number }>,
  minDist: number,
  height: number,
): { x: number; y: number } {
  const initY = ann.y;

  const collides = (cy: number): boolean =>
    placed.some(
      (p) => Math.hypot(ann.x - p.x, cy - p.y) < minDist,
    );

  // Décalage vers le bas
  let y = initY;
  while (collides(y)) {
    y += minDist;
    if (y > height - 20) break;
  }
  if (!collides(y)) return { x: ann.x, y };

  // Décalage vers le haut depuis la position initiale
  y = initY - minDist;
  while (collides(y)) {
    y -= minDist;
    if (y < 0) break;
  }
  // Borne basse pour rester dans l'image
  y = Math.max(0, Math.min(y, height - 20));
  return { x: ann.x, y };
}

/** Place chaque point hero sur la grille de l'image (width x height en px). */
export function buildHeroAnnotations(analysis: HeroAnalysis, width: number, height: number): Annotation[] {
  const MIN_DIST = Math.max(90, Math.round(width / 14));
  const placed: Array<{ x: number; y: number }> = [];

  return analysis.points.map((p) => {
    const g = GRID[p.position] ?? GRID['centre'];
    const raw = { x: Math.round(g.fx * width), y: Math.round(g.fy * height) };
    const resolved = placed.some((q) => Math.hypot(raw.x - q.x, raw.y - q.y) < MIN_DIST)
      ? resolveCollision(raw, placed, MIN_DIST, height)
      : raw;
    placed.push(resolved);
    return { x: resolved.x, y: resolved.y, width: 0, height: 0, note: p.comment };
  });
}
