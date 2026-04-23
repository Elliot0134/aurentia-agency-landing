import type { ProjectFrontmatter } from "./schemas";

export interface RelatedOptions {
  limit?: number;
  preferSecteur?: boolean;
}

/** Returns up to `limit` projects ranked by: same secteur > same type > most recent. */
export function pickRelated(
  target: ProjectFrontmatter,
  pool: ProjectFrontmatter[],
  options: RelatedOptions = {},
): ProjectFrontmatter[] {
  const limit = options.limit ?? 3;
  const others = pool.filter((p) => p.slug !== target.slug);
  const scored = others.map((p) => {
    let score = 0;
    if (p.secteur === target.secteur) score += 10;
    if (p.type === target.type) score += 5;
    score += (p.year ?? 0) / 10000;
    if (p.featured) score += 0.5;
    return { p, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}
