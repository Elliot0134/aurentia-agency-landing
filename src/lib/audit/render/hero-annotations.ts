import type { Annotation } from '../types';
import type { HeroAnalysis, HeroPoint } from './hero-analysis';
import type { HeroElementRects, Rect } from '../screenshot';

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

/** Centre d'un rect en coordonnées document. */
function rectCenter(r: Rect): { x: number; y: number } {
  return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2) };
}

/** Position de repli via la grille approximative (quand aucun rect DOM n'est trouvé). */
function gridPosition(p: HeroPoint, width: number, height: number): { x: number; y: number } {
  const g = GRID[p.position] ?? GRID['centre'];
  return { x: Math.round(g.fx * width), y: Math.round(g.fy * height) };
}

/** Élément DOM cible pour un point donné, selon son champ `element`. */
function pickRect(
  p: HeroPoint,
  rects: HeroElementRects,
  used: Set<keyof HeroElementRects>,
): { key: keyof HeroElementRects; rect: Rect } | null {
  const tryKey = (key: keyof HeroElementRects): { key: keyof HeroElementRects; rect: Rect } | null => {
    const rect = rects[key];
    return rect ? { key, rect } : null;
  };

  switch (p.element) {
    case 'accroche':
      return tryKey('headline');
    case 'cta':
      return tryKey('cta');
    case 'navigation':
      return tryKey('nav');
    case 'logos':
      return tryKey('logos');
    case 'visuel':
      return tryKey('heroImage') ?? tryKey('logos');
    case 'autre':
    default: {
      const order: Array<keyof HeroElementRects> = ['headline', 'heroImage', 'cta', 'nav', 'logos'];
      for (const key of order) {
        if (used.has(key)) continue;
        const hit = tryKey(key);
        if (hit) return hit;
      }
      return null;
    }
  }
}

/**
 * Place chaque point hero sur le vrai élément DOM dont parle son commentaire.
 * Mapping element → rect précis (centre de l'élément) ; repli sur la grille
 * approximative si le rect est introuvable. Anti-collision après placement.
 */
export function buildHeroAnnotations(
  analysis: HeroAnalysis,
  elementRects: HeroElementRects,
  width: number,
  height: number,
): Annotation[] {
  const MIN_DIST = Math.max(90, Math.round(width / 14));
  const placed: Array<{ x: number; y: number }> = [];
  const used = new Set<keyof HeroElementRects>();

  return analysis.points.slice(0, 3).map((p) => {
    const hit = pickRect(p, elementRects, used);
    const raw = hit ? rectCenter(hit.rect) : gridPosition(p, width, height);
    if (hit) used.add(hit.key);

    const resolved = placed.some((q) => Math.hypot(raw.x - q.x, raw.y - q.y) < MIN_DIST)
      ? resolveCollision(raw, placed, MIN_DIST, height)
      : raw;
    // Borne dans [0,width] x [0,height]
    const x = Math.max(0, Math.min(resolved.x, width));
    const y = Math.max(0, Math.min(resolved.y, height));
    placed.push({ x, y });
    return { x, y, width: 0, height: 0, note: p.comment };
  });
}
