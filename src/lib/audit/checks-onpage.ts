import type { CheerioAPI } from 'cheerio';
import type { Measurement } from './types';

const M = (m: Omit<Measurement, 'module'>): Measurement => ({ ...m, module: 'seo-onpage' });

export function checkOnPage($: CheerioAPI, pageUrl: string): Measurement[] {
  const ms: Measurement[] = [];
  const proof = `mesuré sur ${pageUrl}`;

  // Title
  const title = $('head title').first().text().trim();
  ms.push(
    M({
      id: 'seo.title.present',
      label: 'Balise <title> présente',
      status: title ? 'pass' : 'fail',
      value: title || null,
      proof,
    })
  );
  if (title) {
    const ok = title.length >= 30 && title.length <= 65;
    ms.push(
      M({
        id: 'seo.title.length',
        label: 'Longueur du <title> (30-65 caractères recommandés)',
        status: ok ? 'pass' : 'fail',
        value: title.length,
        unit: 'caractères',
        proof,
        details: `"${title}"`,
      })
    );
  }

  // Meta description
  const desc = ($('head meta[name="description"]').attr('content') ?? '').trim();
  ms.push(
    M({
      id: 'seo.meta-description.present',
      label: 'Meta description présente',
      status: desc ? 'pass' : 'fail',
      value: desc || null,
      proof,
    })
  );
  if (desc) {
    const ok = desc.length >= 70 && desc.length <= 160;
    ms.push(
      M({
        id: 'seo.meta-description.length',
        label: 'Longueur de la meta description (70-160 caractères)',
        status: ok ? 'pass' : 'warn',
        value: desc.length,
        unit: 'caractères',
        proof,
      })
    );
  }

  // H1 unique
  const h1Count = $('h1').length;
  ms.push(
    M({
      id: 'seo.h1.unique',
      label: 'Un seul <h1> sur la page',
      status: h1Count === 1 ? 'pass' : 'fail',
      value: h1Count,
      unit: 'h1',
      proof,
      details: h1Count > 0 ? `Premier h1 : "${$('h1').first().text().trim()}"` : 'Aucun h1',
    })
  );

  // Images sans alt
  const noAlt = $('img').filter((_, el) => {
    const alt = $(el).attr('alt');
    return alt === undefined || alt.trim() === '';
  }).length;
  ms.push(
    M({
      id: 'seo.images.alt',
      label: 'Images avec attribut alt',
      status: noAlt === 0 ? 'pass' : 'fail',
      value: noAlt,
      unit: 'images sans alt',
      proof,
    })
  );

  // Canonical
  const canonical = $('head link[rel="canonical"]').attr('href') ?? null;
  ms.push(
    M({
      id: 'seo.canonical.present',
      label: 'Balise canonical présente',
      status: canonical ? 'pass' : 'warn',
      value: canonical,
      proof,
    })
  );

  return ms;
}
