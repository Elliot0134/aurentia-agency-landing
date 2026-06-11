import type { CheerioAPI } from 'cheerio';

export type JsonLdObject = Record<string, unknown>;

export function extractJsonLd($: CheerioAPI): JsonLdObject[] {
  const out: JsonLdObject[] = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed: unknown = JSON.parse($(el).text());
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (item && typeof item === 'object') {
          const obj = item as JsonLdObject;
          out.push(obj);
          const graph = obj['@graph'];
          if (Array.isArray(graph)) {
            out.push(...graph.filter((g): g is JsonLdObject => !!g && typeof g === 'object'));
          }
        }
      }
    } catch {
      /* JSON invalide : ignoré, sera signalé par checks-tech */
    }
  });
  return out;
}

/** Liste à plat de tous les @type rencontrés. */
export function jsonLdTypes(objs: JsonLdObject[]): string[] {
  return objs.flatMap((o) => {
    const t = o['@type'];
    if (typeof t === 'string') return [t];
    if (Array.isArray(t)) return t.filter((x): x is string => typeof x === 'string');
    return [];
  });
}
