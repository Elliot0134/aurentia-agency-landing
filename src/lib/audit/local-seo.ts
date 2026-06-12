import type { CheerioAPI } from 'cheerio';
import type { BusinessDetection, Measurement, MeasurementStatus } from './types';
import { extractJsonLd, type JsonLdObject } from './jsonld';
import { FRENCH_CITIES, FRENCH_PHONE, LOCAL_SCHEMA_TYPES } from './business-type';

/* ----------------------------------------------------------------------------
 * Local SEO mesurable (tâche B4, pro + business local uniquement).
 *
 * Principe de véracité : on ne score QUE ce qui est mesurable par code
 * (on-page, schema, NAP). Fiche Google Business, avis et citations ne sont
 * pas vérifiables automatiquement → une seule ligne `info` les renvoie à la
 * relecture humaine. Jamais de score inventé.
 * ------------------------------------------------------------------------- */

const M = (m: Omit<Measurement, 'module'>): Measurement => ({ ...m, module: 'local-seo' });

const STREET_WORDS = /\b(rue|avenue|boulevard|place|chemin)\b/i;
const POSTAL_CODE = /\b\d{5}\b/g;

/**
 * Cherche un motif d'adresse FR : code postal 5 chiffres avec, dans une
 * fenêtre de ±80 caractères, un mot de voirie OU une ville connue.
 * Retourne l'extrait (preuve) ou null.
 */
function findAddress(text: string): string | null {
  for (const match of text.matchAll(POSTAL_CODE)) {
    const idx = match.index ?? 0;
    const windowText = text.slice(Math.max(0, idx - 80), idx + 80);
    const lower = windowText.toLowerCase();
    if (STREET_WORDS.test(windowText) || FRENCH_CITIES.some((city) => lower.includes(city))) {
      return windowText.replace(/\s+/g, ' ').trim();
    }
  }
  return null;
}

/** @type d'un objet JSON-LD, à plat (string ou tableau). */
function typesOf(obj: JsonLdObject): string[] {
  const t = obj['@type'];
  if (typeof t === 'string') return [t];
  if (Array.isArray(t)) return t.filter((x): x is string => typeof x === 'string');
  return [];
}

/**
 * Checks Local SEO mesurables. À appeler SEULEMENT si business.type === 'local'.
 */
export function checkLocalSeo($: CheerioAPI, business: BusinessDetection): Measurement[] {
  const ms: Measurement[] = [];
  const bodyText = $('body').text();

  // --- NAP : téléphone visible ---
  const phoneMatch = bodyText.match(FRENCH_PHONE);
  ms.push(
    M({
      id: 'local.nap.phone',
      label: 'Numéro de téléphone visible sur la page',
      status: phoneMatch ? 'pass' : 'fail',
      value: phoneMatch ? phoneMatch[0].trim() : null,
      proof: "recherche d'un numéro FR dans le texte de la page",
      details: phoneMatch
        ? undefined
        : 'aucun numéro de téléphone visible, frein de réassurance pour une activité locale',
    }),
  );

  // --- NAP : adresse visible (+ détection footer-only) ---
  const bodyWithoutFooter = $('body').clone();
  bodyWithoutFooter.find('footer').remove();
  const addressOutsideFooter = findAddress(bodyWithoutFooter.text());
  const addressAnywhere = addressOutsideFooter ?? findAddress(bodyText);
  const footerOnly = addressAnywhere !== null && addressOutsideFooter === null;
  ms.push(
    M({
      id: 'local.nap.address',
      label: 'Adresse postale visible sur la page',
      status: addressAnywhere === null ? 'fail' : footerOnly ? 'warn' : 'pass',
      value: addressAnywhere,
      proof: addressAnywhere ?? "recherche d'un code postal + voirie/ville dans le texte de la page",
      details:
        addressAnywhere === null
          ? 'aucune adresse détectée (code postal + rue ou ville)'
          : footerOnly
            ? 'adresse seulement en pied de page'
            : undefined,
    }),
  );

  // --- Schema : LocalBusiness (ou sous-type) ---
  const localObjs = extractJsonLd($).filter((o) =>
    typesOf(o).some((t) => LOCAL_SCHEMA_TYPES.includes(t)),
  );
  const localTypes = localObjs.flatMap(typesOf);
  ms.push(
    M({
      id: 'local.schema.localbusiness',
      label: 'Donnée structurée LocalBusiness (JSON-LD)',
      status: localObjs.length > 0 ? 'pass' : 'fail',
      value: localObjs.length > 0,
      proof:
        localObjs.length > 0
          ? `@type trouvé : ${localTypes.join(', ')}`
          : 'aucun JSON-LD de type LocalBusiness (ou sous-type) dans la page',
    }),
  );

  // --- Schema : géolocalisation ---
  const hasGeo = localObjs.some((o) => {
    const geo = o['geo'];
    if (!geo || typeof geo !== 'object' || Array.isArray(geo)) return false;
    const g = geo as JsonLdObject;
    return g['latitude'] !== undefined && g['longitude'] !== undefined;
  });
  ms.push(
    M({
      id: 'local.schema.geo',
      label: 'Géolocalisation (geo latitude/longitude) dans le schema',
      status: hasGeo ? 'pass' : 'fail',
      value: hasGeo,
      proof: 'propriété geo des objets JSON-LD locaux',
    }),
  );

  // --- Schema : horaires ---
  const hasHours = localObjs.some(
    (o) => o['openingHours'] !== undefined || o['openingHoursSpecification'] !== undefined,
  );
  ms.push(
    M({
      id: 'local.schema.hours',
      label: "Horaires d'ouverture dans le schema (openingHours)",
      status: hasHours ? 'pass' : 'fail',
      value: hasHours,
      proof: 'propriétés openingHours / openingHoursSpecification des objets JSON-LD locaux',
    }),
  );

  // --- On-page : ville dans le <title> ou le <h1> ---
  const city = business.city;
  const title = $('head title').text().toLowerCase();
  const h1 = $('h1').first().text().toLowerCase();
  const cityInTitle = city !== null && (title.includes(city) || h1.includes(city));
  ms.push(
    M({
      id: 'local.city.title',
      label: 'Ville présente dans le <title> ou le <h1>',
      status: cityInTitle ? 'pass' : 'fail',
      value: city,
      proof: `title : "${$('head title').text().trim()}"`,
      details:
        city === null
          ? 'aucune ville détectée sur la page'
          : cityInTitle
            ? undefined
            : `"${city}" n'apparaît ni dans le title ni dans le h1`,
    }),
  );

  // --- GBP / avis / citations : non mesurables par code, jamais scorés ---
  ms.push(
    M({
      id: 'local.gbp.unverified',
      label: 'Fiche Google Business, avis et citations locales',
      status: 'info',
      value: null,
      details:
        'Fiche Google Business, avis et citations locales : non vérifiables automatiquement, à évaluer pendant la relecture humaine.',
    }),
  );

  return ms;
}

/* ----------------------------------------------------------------------------
 * Breakdown : score local sur le MESURABLE uniquement (max 55).
 * GBP /25, CITATIONS /10, REVIEWS /10 restent affichés mais measured: false,
 * exclus du total et du max.
 * ------------------------------------------------------------------------- */

export interface LocalBreakdown {
  label: string;
  score: number;
  max: number;
  measured: boolean;
}

export function localSeoBreakdown(measurements: Measurement[]): {
  total: number;
  max: number;
  rows: LocalBreakdown[];
} {
  const statusOf = (id: string): MeasurementStatus | null =>
    measurements.find((m) => m.id === id)?.status ?? null;
  const pts = (id: string, passPts: number, warnPts = 0): number => {
    const s = statusOf(id);
    return s === 'pass' ? passPts : s === 'warn' ? warnPts : 0;
  };
  const has = (...ids: string[]): boolean => ids.some((id) => statusOf(id) !== null);

  const rows: LocalBreakdown[] = [
    { label: 'GBP', score: 0, max: 25, measured: false },
    {
      label: 'ON PAGE',
      score: pts('local.city.title', 10) + pts('local.nap.address', 10, 5),
      max: 20,
      measured: has('local.city.title', 'local.nap.address'),
    },
    {
      label: 'SCHEMA',
      score:
        pts('local.schema.localbusiness', 8) + pts('local.schema.geo', 6) + pts('local.schema.hours', 6),
      max: 20,
      measured: has('local.schema.localbusiness', 'local.schema.geo', 'local.schema.hours'),
    },
    {
      label: 'NAP',
      score: pts('local.nap.phone', 8) + pts('local.nap.address', 7, 3),
      max: 15,
      measured: has('local.nap.phone', 'local.nap.address'),
    },
    { label: 'CITATIONS', score: 0, max: 10, measured: false },
    { label: 'REVIEWS', score: 0, max: 10, measured: false },
  ];

  const measuredRows = rows.filter((r) => r.measured);
  return {
    total: measuredRows.reduce((sum, r) => sum + r.score, 0),
    max: measuredRows.reduce((sum, r) => sum + r.max, 0),
    rows,
  };
}
