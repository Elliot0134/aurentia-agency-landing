import type { BusinessDetection, CompetitorSummary } from './types';
import { runPsi } from './psi';

export const EXCLUDED_DOMAINS = [
  'pagesjaunes.fr', 'yelp.fr', 'yelp.com', 'tripadvisor.fr', 'tripadvisor.com',
  'booking.com', 'airbnb.fr', 'airbnb.com', 'leboncoin.fr', 'indeed.fr', 'indeed.com',
  'linkedin.com', 'facebook.com', 'instagram.com', 'google.com', 'maps.google.com',
  'wikipedia.org', 'youtube.com', 'capterra.fr', 'g2.com', 'trustpilot.com',
];

export function buildCompetitorQuery(business: BusinessDetection, auditedDomain: string): string {
  if (business.type === 'local' && business.sector && business.city) {
    return `${business.sector} ${business.city}`;
  }
  const brand = auditedDomain.replace(/^www\./, '').split('.')[0];
  return `alternatives à ${brand}`;
}

export function selectCompetitorUrls(urls: string[], auditedDomain: string, max: number): string[] {
  const cleanAudited = auditedDomain.replace(/^www\./, '');
  const seen = new Set<string>();
  const out: string[] = [];
  for (const u of urls) {
    let domain: string;
    try {
      domain = new URL(u).hostname.replace(/^www\./, '');
    } catch {
      continue;
    }
    if (domain === cleanAudited) continue;
    if (EXCLUDED_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`))) continue;
    if (seen.has(domain)) continue;
    seen.add(domain);
    out.push(u);
    if (out.length === max) break;
  }
  return out;
}

interface ExaSearchResponse {
  results: { url: string }[];
}

export async function searchCompetitors(
  business: BusinessDetection,
  auditedDomain: string,
  exaApiKey: string,
  fetchFn: typeof fetch = fetch
): Promise<string[]> {
  const query = buildCompetitorQuery(business, auditedDomain);
  const res = await fetchFn('https://api.exa.ai/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': exaApiKey },
    body: JSON.stringify({ query, numResults: 10, type: 'keyword' }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`Exa /search → ${res.status}`);
  const data = (await res.json()) as ExaSearchResponse;
  return selectCompetitorUrls(data.results.map((r) => r.url), auditedDomain, 3);
}

interface ExaContentsResponse {
  results: { summary?: string }[];
}

/**
 * Décrit le site analysé via Exa /contents (résumé secteur).
 * Ne throw jamais : une description manquante ne doit pas faire planter l'audit.
 */
export async function describeSite(
  url: string,
  exaApiKey: string,
  fetchFn: typeof fetch = fetch
): Promise<string | null> {
  try {
    const res = await fetchFn('https://api.exa.ai/contents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': exaApiKey },
      body: JSON.stringify({
        urls: [url],
        summary: { query: "En une phrase, qu'est-ce que ce site et quel est son secteur ?" },
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as ExaContentsResponse;
    return data.results[0]?.summary ?? null;
  } catch {
    return null;
  }
}

/**
 * Concurrents réellement similaires via Exa /findSimilar.
 * Ne throw jamais : en cas d'erreur, retourne [] (concurrents = bonus).
 */
export async function findSimilarCompetitors(
  url: string,
  auditedDomain: string,
  exaApiKey: string,
  fetchFn: typeof fetch = fetch
): Promise<string[]> {
  try {
    const res = await fetchFn('https://api.exa.ai/findSimilar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': exaApiKey },
      body: JSON.stringify({ url, numResults: 8 }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ExaSearchResponse;
    return selectCompetitorUrls(data.results.map((r) => r.url), auditedDomain, 3);
  } catch {
    return [];
  }
}

/** Mini-audit PSI mobile de chaque concurrent (séquentiel : pas de rafale). */
export async function auditCompetitors(
  urls: string[],
  psiApiKey: string,
  fetchFn: typeof fetch = fetch
): Promise<CompetitorSummary[]> {
  const out: CompetitorSummary[] = [];
  for (const url of urls) {
    try {
      const psi = await runPsi(url, 'mobile', psiApiKey, fetchFn);
      out.push({
        domain: new URL(url).hostname.replace(/^www\./, ''),
        url,
        perfScoreMobile: psi.performanceScore,
        seoScore: psi.seoScore,
        lcpMs: psi.lcpMs,
      });
    } catch {
      // concurrent injoignable : on le saute, on ne bloque pas l'audit
    }
  }
  return out;
}
