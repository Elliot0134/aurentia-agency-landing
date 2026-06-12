import type { Annotation, ImageRect, Measurement } from './types';

/** Formate un nombre en français (séparateur décimal = virgule). */
function fr(value: string | number | boolean | null): string {
  return String(value).replace('.', ',');
}

/**
 * Construit les annotations du screenshot : des POINTS positionnés sur de vrais
 * éléments du DOM (rects mesurés), dont le texte provient d'une measurement
 * existante. Aucun jugement visuel inventé : la POSITION vient du code, le TEXTE
 * d'une mesure. Max 3 annotations, jamais deux points sur le même rect.
 */
export function buildScreenshotAnnotations(
  measurements: Measurement[],
  rects: ImageRect[]
): Annotation[] {
  const annotations: Annotation[] = [];
  const used = new Set<number>();

  const push = (rect: ImageRect, idx: number, measurementId: string, note: string) => {
    used.add(idx);
    annotations.push({
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      measurementId,
      note,
    });
  };

  /** Plus grand rect visible non encore utilisé qui vérifie `pred`. */
  const largestUnused = (pred: (r: ImageRect) => boolean): { rect: ImageRect; idx: number } | null => {
    let best: { rect: ImageRect; idx: number } | null = null;
    rects.forEach((r, idx) => {
      if (used.has(idx)) return;
      if (!(r.width > 0 && r.height > 0)) return;
      if (!pred(r)) return;
      if (best === null || r.area > best.rect.area) best = { rect: r, idx };
    });
    return best;
  };

  const get = (id: string) => measurements.find((m) => m.id === id);

  // 1. Images cassées (preuve HTTP) — autant que de slots restants.
  for (const m of measurements) {
    if (annotations.length >= 3) break;
    if (!(m.id.startsWith('images.broken.') && m.status === 'fail')) continue;
    const idx = rects.findIndex((r, i) => !used.has(i) && r.src === m.value);
    if (idx === -1) continue;
    push(rects[idx], idx, m.id, 'Cette image ne se charge pas');
  }

  // 2. LCP lent — le plus gros visuel comme proxy du contenu principal.
  const lcp = get('perf.mobile.lcp');
  if (annotations.length < 3 && lcp && lcp.status === 'fail') {
    const hit = largestUnused(() => true);
    if (hit) {
      push(hit.rect, hit.idx, 'perf.mobile.lcp', `Le contenu principal met ${fr(lcp.value)} s à s'afficher`);
    }
  }

  // 3. Image sans alt (référencement).
  const alt = get('seo.images.alt');
  if (annotations.length < 3 && alt && alt.status === 'fail') {
    const hit = largestUnused((r) => !r.alt || r.alt.trim() === '');
    if (hit) {
      push(hit.rect, hit.idx, 'seo.images.alt', 'Image sans description (référencement)');
    }
  }

  // 4. Poids des visuels.
  const weight = get('perf.mobile.weight');
  if (annotations.length < 3 && weight && weight.status === 'fail') {
    const hit = largestUnused(() => true);
    if (hit) {
      push(hit.rect, hit.idx, 'perf.mobile.weight', `Visuels lourds : ${fr(weight.value)} Mo au total`);
    }
  }

  return annotations.slice(0, 3);
}
