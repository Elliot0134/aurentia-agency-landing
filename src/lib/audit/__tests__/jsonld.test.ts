// src/lib/audit/__tests__/jsonld.test.ts
import { describe, it, expect } from 'vitest';
import * as cheerio from 'cheerio';
import { extractJsonLd, jsonLdTypes } from '../jsonld';

describe('extractJsonLd', () => {
  it('extrait les objets, les tableaux et les @graph', () => {
    const html = `<html><head>
      <script type="application/ld+json">{"@type":"LocalBusiness","name":"A"}</script>
      <script type="application/ld+json">[{"@type":"Service"},{"@type":"FAQPage"}]</script>
      <script type="application/ld+json">{"@graph":[{"@type":"Organization"}]}</script>
      <script type="application/ld+json">pas du json</script>
    </head></html>`;
    const objs = extractJsonLd(cheerio.load(html));
    expect(jsonLdTypes(objs)).toEqual(
      expect.arrayContaining(['LocalBusiness', 'Service', 'FAQPage', 'Organization'])
    );
  });
});
