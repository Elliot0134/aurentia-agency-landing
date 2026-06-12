import type { CheerioAPI } from 'cheerio';
import type { Measurement } from './types';
import { extractJsonLd, jsonLdTypes, type JsonLdObject } from './jsonld';

/* ----------------------------------------------------------------------------
 * AI Readiness (pro uniquement) : visibilité du site auprès des moteurs IA
 * (ChatGPT, Perplexity, Claude, AI Overviews). 100% checks code, plus une
 * recherche Exa pour les mentions externes. Aucune conclusion non mesurée :
 * si Exa est indisponible, la mesure passe en 'info', jamais en fail inventé.
 * ------------------------------------------------------------------------- */

const M = (m: Omit<Measurement, 'module'>): Measurement => ({ ...m, module: 'ai-readiness' });

/** Crawlers IA connus, vérifiés contre robots.txt. */
const AI_AGENTS = ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'CCBot'] as const;

/** Types Schema.org exploitables par les moteurs IA pour comprendre l'entité. */
const RELEVANT_SCHEMA_TYPES = new Set([
  'Organization',
  'LocalBusiness',
  'WebSite',
  'Service',
  'Product',
  'FAQPage',
  'Course',
  'Event',
  'Article',
  'BlogPosting',
  'HowTo',
  'Review',
  'AggregateRating',
  'VideoObject',
  'Person',
]);

/**
 * Agents IA explicitement bloqués (Disallow: / dans leur groupe User-agent).
 * Parse les groupes du robots.txt : des lignes User-agent consécutives forment
 * un groupe, les directives qui suivent s'appliquent à tous ses agents.
 */
export function blockedAiAgents(robotsTxt: string): string[] {
  const blocked = new Set<string>();
  let currentAgents: string[] = [];
  let collectingAgents = false;
  for (const raw of robotsTxt.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    if (line === '') continue;
    const ua = /^user-agent:\s*(.+)$/i.exec(line);
    if (ua && ua[1] !== undefined) {
      if (!collectingAgents) currentAgents = [];
      collectingAgents = true;
      currentAgents.push(ua[1].trim().toLowerCase());
      continue;
    }
    collectingAgents = false;
    const dis = /^disallow:\s*(.*)$/i.exec(line);
    if (dis && (dis[1] ?? '').trim() === '/') {
      for (const agent of currentAgents) blocked.add(agent);
    }
  }
  return AI_AGENTS.filter((agent) => blocked.has(agent.toLowerCase()));
}

/** Liens sameAs (profils externes) trouvés dans les objets JSON-LD. */
function sameAsLinks(objs: JsonLdObject[]): string[] {
  const links: string[] = [];
  for (const obj of objs) {
    const sameAs = obj['sameAs'];
    const values = typeof sameAs === 'string' ? [sameAs] : Array.isArray(sameAs) ? sameAs : [];
    for (const v of values) {
      if (typeof v === 'string' && v.trim() !== '') links.push(v.trim());
    }
  }
  return links;
}

/**
 * Bloc factuel citable : paragraphe de 40 à 400 caractères contenant au moins
 * un chiffre (ce qui couvre codes postaux, horaires, années, quantités) ou un
 * mot d'adresse. Les moteurs IA citent des passages autosuffisants de ce type.
 */
const FACTUAL_RE = /\d|\b(?:rue|avenue|boulevard|chemin|place|impasse|allée)\b/i;

function countFactualBlocks($: CheerioAPI): number {
  let count = 0;
  $('p').each((_, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text.length >= 40 && text.length <= 400 && FACTUAL_RE.test(text)) count += 1;
  });
  return count;
}

interface ExaSearchResponse {
  results: { url: string }[];
}

export async function checkAiReadiness(args: {
  finalUrl: string;
  $: CheerioAPI;
  robotsTxt: string | null;
  brand: string;
  exaApiKey: string;
  fetchFn?: typeof fetch;
}): Promise<Measurement[]> {
  const { finalUrl, $, robotsTxt, brand, exaApiKey } = args;
  const fetchFn = args.fetchFn ?? fetch;
  const origin = new URL(finalUrl).origin;
  const ms: Measurement[] = [];

  // 1. llms.txt : fichier de guidage des moteurs IA à la racine du site.
  let llmsStatus = 0;
  let llmsBody = '';
  try {
    const res = await fetchFn(`${origin}/llms.txt`, { signal: AbortSignal.timeout(10_000) });
    llmsStatus = res.status;
    if (res.ok) llmsBody = await res.text();
  } catch {
    llmsStatus = 0;
  }
  const llmsLooksHtml = /^\s*(?:<!doctype|<html)/i.test(llmsBody) || llmsBody.includes('<html');
  const llmsOk = llmsStatus === 200 && llmsBody.trim() !== '' && !llmsLooksHtml;
  ms.push(
    M({
      id: 'ai.llms-txt',
      label: 'Fichier llms.txt (guidage des moteurs IA)',
      status: llmsOk ? 'pass' : 'fail',
      value: llmsOk,
      proof: `GET ${origin}/llms.txt → ${llmsStatus || 'erreur réseau'}${llmsStatus === 200 && !llmsOk ? ' (contenu HTML, pas un vrai llms.txt)' : ''}`,
    }),
  );

  // 2. robots.txt : les crawlers IA sont-ils explicitement bloqués ?
  const blocked = robotsTxt === null ? [] : blockedAiAgents(robotsTxt);
  ms.push(
    M({
      id: 'ai.robots.ai-agents',
      label: 'Accès des crawlers IA (robots.txt)',
      status: blocked.length > 0 ? 'fail' : 'pass',
      value: blocked.length > 0 ? blocked.join(', ') : 'aucun blocage',
      proof: `agents vérifiés : ${AI_AGENTS.join(', ')}`,
      details:
        blocked.length > 0
          ? 'les moteurs IA sont bloqués : le site est invisible pour ChatGPT, Perplexity et les recherches IA'
          : undefined,
    }),
  );

  // 3. Richesse du JSON-LD : au moins 2 types pertinents pour qu'un moteur IA
  // comprenne l'entité (qui, quoi, où).
  const jsonLd = extractJsonLd($);
  const relevantTypes = [...new Set(jsonLdTypes(jsonLd))].filter((t) => RELEVANT_SCHEMA_TYPES.has(t));
  ms.push(
    M({
      id: 'ai.schema.richness',
      label: 'Richesse des données structurées (compréhension par les IA)',
      status: relevantTypes.length >= 2 ? 'pass' : relevantTypes.length === 1 ? 'warn' : 'fail',
      value: relevantTypes.length > 0 ? relevantTypes.join(', ') : null,
      proof: `${relevantTypes.length} type(s) Schema.org pertinents dans le JSON-LD de la homepage`,
    }),
  );

  // 4. sameAs : reliage sémantique de l'entité à ses profils externes
  // (YouTube, LinkedIn, réseaux). Sans lui, les actifs existants sont orphelins.
  const sameAs = sameAsLinks(jsonLd);
  ms.push(
    M({
      id: 'ai.schema.sameas',
      label: 'Profils externes reliés (sameAs dans le JSON-LD)',
      status: sameAs.length > 0 ? 'pass' : 'fail',
      value: sameAs.length,
      proof: 'présence d\'un champ sameAs non vide dans un objet JSON-LD',
      details:
        sameAs.length > 0
          ? `liens trouvés : ${sameAs.slice(0, 5).join(', ')}`
          : 'aucun profil externe relié : les actifs de la marque (YouTube, LinkedIn) ne sont pas rattachés au site',
    }),
  );

  // 5. Citabilité : blocs factuels autosuffisants que les IA peuvent citer.
  const factualBlocks = countFactualBlocks($);
  ms.push(
    M({
      id: 'ai.citability',
      label: 'Passages factuels citables par les moteurs IA',
      status: factualBlocks >= 3 ? 'pass' : factualBlocks >= 1 ? 'warn' : 'fail',
      value: factualBlocks,
      proof: 'paragraphes de 40 à 400 caractères contenant un chiffre, une adresse ou un horaire',
      details: 'les moteurs IA citent plus volontiers des passages factuels autosuffisants',
    }),
  );

  // 6. Mentions externes de la marque (recherche Exa). En cas d'erreur : info,
  // jamais de fausse conclusion.
  const auditedDomain = new URL(finalUrl).hostname.replace(/^www\./, '');
  try {
    const res = await fetchFn('https://api.exa.ai/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': exaApiKey },
      body: JSON.stringify({ query: `"${brand}"`, numResults: 10, type: 'keyword' }),
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) throw new Error(`Exa /search → ${res.status}`);
    const data = (await res.json()) as ExaSearchResponse;
    const externalDomains: string[] = [];
    for (const r of data.results) {
      let domain: string;
      try {
        domain = new URL(r.url).hostname.replace(/^www\./, '');
      } catch {
        continue;
      }
      if (domain !== auditedDomain) externalDomains.push(domain);
    }
    ms.push(
      M({
        id: 'ai.mentions.external',
        label: 'Mentions externes de la marque (empreinte exploitable par les IA)',
        status: externalDomains.length >= 3 ? 'pass' : externalDomains.length >= 1 ? 'warn' : 'fail',
        value: externalDomains.length,
        proof:
          externalDomains.length > 0
            ? `domaines : ${[...new Set(externalDomains)].slice(0, 5).join(', ')}`
            : `recherche "${brand}" : aucun résultat hors ${auditedDomain}`,
      }),
    );
  } catch {
    ms.push(
      M({
        id: 'ai.mentions.external',
        label: 'Mentions externes de la marque (empreinte exploitable par les IA)',
        status: 'info',
        value: null,
        details: 'vérification des mentions externes indisponible pendant la génération',
      }),
    );
  }

  return ms;
}
