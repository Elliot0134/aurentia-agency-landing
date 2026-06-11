import type { Annotation } from '../types';
import type { HeroAnalysis } from './hero-analysis';

const GRID: Record<string, { fx: number; fy: number }> = {
  'haut-gauche': { fx: 0.18, fy: 0.20 }, 'haut-centre': { fx: 0.5, fy: 0.18 }, 'haut-droite': { fx: 0.82, fy: 0.20 },
  'centre-gauche': { fx: 0.20, fy: 0.5 }, 'centre': { fx: 0.5, fy: 0.5 }, 'centre-droite': { fx: 0.80, fy: 0.5 },
};

/** Place chaque point hero sur la grille de l'image (width x height en px). */
export function buildHeroAnnotations(analysis: HeroAnalysis, width: number, height: number): Annotation[] {
  return analysis.points.map((p) => {
    const g = GRID[p.position] ?? GRID['centre'];
    return { x: Math.round(g.fx * width), y: Math.round(g.fy * height), width: 0, height: 0, note: p.comment };
  });
}
