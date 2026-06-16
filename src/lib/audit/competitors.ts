import { generateObject } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { z } from 'zod';
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

/**
 * Recherche de concurrents via une requête fournie directement (ex: requête géo
 * issue de la classification de scope). Ne throw jamais : en cas d'erreur, [].
 */
export async function searchCompetitorsByQuery(
  query: string,
  auditedDomain: string,
  exaApiKey: string,
  fetchFn: typeof fetch = fetch
): Promise<string[]> {
  try {
    const res = await fetchFn('https://api.exa.ai/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': exaApiKey },
      body: JSON.stringify({ query, numResults: 10, type: 'keyword' }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return [];
    const data = (await res.json()) as ExaSearchResponse;
    return selectCompetitorUrls(data.results.map((r) => r.url), auditedDomain, 3);
  } catch {
    return [];
  }
}

/** Portée d'un business : local (concurrents proches) vs national/en ligne. */
export type BusinessScope = { isLocal: boolean; geoQuery: string | null };

/** Fonction de classification injectable (stub en test, LLM en prod). */
export type ScopeClassifyFn = (description: string, city: string | null) => Promise<BusinessScope>;

const ScopeSchema = z.object({
  isLocal: z.boolean(),
  geoQuery: z.string().nullable(),
});

const SCOPE_SYSTEM =
  "Tu classes un site web. On te donne sa description et la ville detectee. Determine si c'est un business a ancrage LOCAL (commerce physique, restaurant, artisan, agence ou cabinet servant une zone geographique precise) dont les concurrents pertinents sont geographiquement proches — isLocal=true ; OU un business NATIONAL ou en ligne (SaaS, e-commerce national, marque nationale) dont les concurrents sont a l'echelle nationale — isLocal=false. Si isLocal=true ET qu'une ville est connue, geoQuery = la meilleure requete '[type d'activite] [ville]' pour trouver des concurrents locaux (ex: 'agence web Avignon', 'restaurant italien Lyon'). Sinon geoQuery=null. Pas de tiret long, pas de mention d'IA.";

const defaultScopeClassify: ScopeClassifyFn = async (description, city) => {
  const model = process.env.OPENROUTER_MODEL;
  if (!model) throw new Error("OPENROUTER_MODEL manquant dans l'environnement");
  const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  const { object } = await generateObject({
    model: openrouter(model),
    schema: ScopeSchema,
    system: SCOPE_SYSTEM,
    prompt: JSON.stringify({ description, ville: city }),
  });
  return object;
};

/**
 * Classe la portée d'un business à partir de sa description Exa et de la ville.
 * Remplace l'ancienne règle en dur (liste de secteurs). Ne throw jamais :
 * description absente ou erreur LLM → fallback national (findSimilar).
 */
export async function classifyBusinessScope(
  description: string | null,
  city: string | null,
  opts: { classifyFn?: ScopeClassifyFn } = {}
): Promise<BusinessScope> {
  if (description === null || description.trim() === '') {
    return { isLocal: false, geoQuery: null };
  }
  const classifyFn = opts.classifyFn ?? defaultScopeClassify;
  try {
    return await classifyFn(description, city);
  } catch {
    return { isLocal: false, geoQuery: null };
  }
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

/**
 * Mini-audit PSI mobile de chaque concurrent. En parallèle (≤3 sites) et SANS
 * retry (`[]`) : c'est un benchmark best-effort, un concurrent lent ou en erreur
 * est simplement sauté. Le séquentiel + retries faisait exploser la latence de
 * l'audit (jusqu'à 3 sites × plusieurs tentatives × ~90s).
 */
export async function auditCompetitors(
  urls: string[],
  psiApiKey: string,
  fetchFn: typeof fetch = fetch
): Promise<CompetitorSummary[]> {
  const results = await Promise.all(
    urls.map(async (url): Promise<CompetitorSummary | null> => {
      try {
        const psi = await runPsi(url, 'mobile', psiApiKey, fetchFn, []);
        return {
          domain: new URL(url).hostname.replace(/^www\./, ''),
          url,
          perfScoreMobile: psi.performanceScore,
          seoScore: psi.seoScore,
          lcpMs: psi.lcpMs,
        };
      } catch {
        // concurrent injoignable : on le saute, on ne bloque pas l'audit
        return null;
      }
    }),
  );
  return results.filter((c): c is CompetitorSummary => c !== null);
}
