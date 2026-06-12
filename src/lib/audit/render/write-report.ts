import { generateObject } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import type { AuditData } from '../types';
import {
  ProContentSchema,
  ReportContentSchema,
  type ProReportContent,
  type ReportContent,
} from './report-schema';
import { validateReportContract } from './contract';

export type GenerateFn = (audit: AuditData, attemptNote: string) => Promise<ReportContent>;
export type GenerateProFn = (audit: AuditData, attemptNote: string) => Promise<ProReportContent>;

const SYSTEM = `Tu rédiges un audit de site web pour un dirigeant non-technique (CEO).
Tu ne mesures rien : on te fournit des mesures, tu les mets en mots.
Règles ABSOLUES (le texte est rejeté sinon) :
- Conséquence business AVANT la cause technique. Le détail technique en fin de phrase.
- Chiffre tout, mais UNIQUEMENT avec les valeurs des mesures fournies. N'invente aucun chiffre.
- Tout finding doit lister les measurementIds des mesures qui le prouvent.
- INTERDIT : le tiret long (— ou –). Utilise des virgules ou des points.
- INTERDIT : laisser entendre que ce rapport est produit ou rédigé par une IA ("notre IA", "généré par", "notre algorithme"). En revanche, analyser la visibilité du SITE AUDITÉ sur les moteurs IA (ChatGPT, Perplexity, moteurs de réponse) est autorisé et attendu (partie AI Readiness).
- INTERDIT : affirmer une position Google précise ("vous êtes en position 8").
- INTERDIT : citer un montant en euros (€). Tu exprimes l'impact en POURCENTAGE de visiteurs perdus, jamais en argent.
- Ton direct, concret, sans jargon en titre. Varie la forme des findings (pas de structure répétée).
- Chaque finding : 3 a 5 phrases, la consequence business d'abord, puis la cause technique avec les valeurs mesurees, puis ce que la correction change.
- Exprime toujours les durees en secondes avec une decimale et virgule francaise (ex : 10,2 s), jamais en millisecondes.
- Rédige aussi "scoreJustification" : 2 à 3 phrases expliquant à quoi correspond le score global du site (ce qui le tire vers le haut ou le bas), en langage simple pour un dirigeant.`;

const PRO_CONSIGNE = `Rédige execSummary, recommendation, findings (P0/P1/P2 priorisés) et competitorAnalysis. Exprime l'impact en % de visiteurs perdus, jamais en euros.
Rédige aussi auditTable : 18 a 25 lignes, couvre TOUS les domaines mesurés avec plusieurs lignes par domaine quand les mesures le justifient, y compris les points forts (priorité 'A optimiser' n'est pas une insulte : mentionne aussi 2-3 constats POSITIFS avec la priorité la plus basse), chaque constat cite la valeur mesurée. Chaque ligne = constat factuel issu des mesures (measurementIds obligatoires), impact = conséquence business concrète, priority selon la gravité.
recommendations : 4 à 8 actions concrètes priorisées (R1 = le levier numéro 1), action = concrète et actionnable, expectedImpact = effet attendu.
strategicRecommendations : 3 a 5 axes STRATEGIQUES a 6-12 mois, distincts des correctifs techniques : positionnement et differenciation, strategie de contenu/SEO durable, presence locale et reputation (avis clients), visibilite sur les moteurs IA (ChatGPT, Perplexity), mesure et pilotage. Chaque axe : titre + 3-4 phrases de justification ancrees dans les constats.
funnelAnalysis : 3 à 5 phrases sur où se perd le visiteur (base : les mesures, l'impact %).
funnelProjection : 2 à 4 phrases prudentes sur l'effet attendu des corrections, en % uniquement, jamais en euros, toujours présenté comme une estimation.
recommendationSummary : 2 a 3 phrases, le verdict et la marche a suivre recommandee, sans montant en euros.
aiVisibilityAnalysis : 4 a 6 phrases sur la visibilite du site dans les recherches IA (GEO : etre compris et cite par ChatGPT, Perplexity, les reponses IA de Google ; AEO : repondre aux questions des clients). Appuie-toi sur les mesures ai.* fournies (llms.txt, schema, sameAs, passages citables, mentions externes, FAQ, titres en question). Explique ce que le site gagne concretement a corriger les manques : c'est un canal de decouverte en forte croissance.`;

/** Construit le prompt utilisateur à partir des mesures (sérialisation compacte). */
function buildPrompt(audit: AuditData, attemptNote: string): string {
  const fails = audit.measurements.filter((m) => m.status === 'fail' || m.status === 'warn');
  return JSON.stringify({
    note: attemptNote,
    tier: audit.tier,
    ...(audit.description !== null ? { description_du_site: audit.description } : {}),
    business: audit.business,
    problemes: fails.map((m) => ({ id: m.id, label: m.label, value: m.value, unit: m.unit, proof: m.proof })),
    impact: audit.impact,
    concurrents: audit.competitors,
    consigne: audit.tier === 'pro'
      ? PRO_CONSIGNE
      : 'Rédige execSummary, recommendation et 2 à 4 findings. competitorAnalysis = null.',
  });
}

/**
 * Label traçable du modèle rédacteur, pour le CLI et les logs (prouve quel
 * modèle a rédigé le rapport). Ne throw jamais, contrairement à openrouterModel.
 */
export function getWriterModelLabel(): string {
  return `openrouter:${process.env.OPENROUTER_MODEL ?? 'non configuré'}`;
}

function openrouterModel(): string {
  const model = process.env.OPENROUTER_MODEL;
  if (!model) {
    throw new Error('OPENROUTER_MODEL manquant dans l\'environnement');
  }
  return model;
}

const defaultGenerate: GenerateFn = async (audit, attemptNote) => {
  const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  const { object } = await generateObject({
    model: openrouter(openrouterModel()),
    schema: ReportContentSchema,
    system: SYSTEM,
    prompt: buildPrompt(audit, attemptNote),
  });
  return object;
};

const defaultGeneratePro: GenerateProFn = async (audit, attemptNote) => {
  const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  const { object } = await generateObject({
    model: openrouter(openrouterModel()),
    schema: ProContentSchema,
    system: SYSTEM,
    prompt: buildPrompt(audit, attemptNote),
  });
  return object;
};

/**
 * Boucle de retry commune flash/pro : génère, valide le contrat de véracité,
 * réinjecte la violation dans la note d'essai suivante, abandonne après maxAttempts.
 */
async function withContractRetry<T extends ReportContent | ProReportContent>(
  audit: AuditData,
  generate: (audit: AuditData, attemptNote: string) => Promise<T>,
  maxAttempts: number,
): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const note = attempt === 1
      ? 'Premier essai.'
      : `Essai ${attempt}. L'essai précédent a violé le contrat : ${String(lastErr)}. Corrige.`;
    const content = await generate(audit, note);
    try {
      validateReportContract(content, audit);
      return content;
    } catch (err) {
      lastErr = err;
    }
  }
  throw new Error(`writeReport: contrat de véracité violé après ${maxAttempts} essais : ${String(lastErr)}`);
}

export interface WriteReportOptions {
  generateFn?: GenerateFn;
  maxAttempts?: number;
}

/** Génère le contenu rédigé (flash), en réessayant si le contrat de véracité échoue. */
export async function writeReport(audit: AuditData, opts: WriteReportOptions = {}): Promise<ReportContent> {
  return withContractRetry(audit, opts.generateFn ?? defaultGenerate, opts.maxAttempts ?? 3);
}

export interface WriteProReportOptions {
  generateFn?: GenerateProFn;
  maxAttempts?: number;
}

/**
 * Génère le contenu rédigé Pro (tableau d'audit, recommandations, analyses funnel),
 * sous le même contrat de véracité, étendu aux champs Pro.
 */
export async function writeProReport(
  audit: AuditData,
  opts: WriteProReportOptions = {},
): Promise<ProReportContent> {
  return withContractRetry(audit, opts.generateFn ?? defaultGeneratePro, opts.maxAttempts ?? 3);
}
