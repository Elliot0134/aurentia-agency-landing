import type { AuditData } from '../types';
import type { ProReportContent, ReportContent } from './report-schema';

export class ContractViolation extends Error {}

/**
 * La règle n'est PAS « ne jamais parler d'IA » : la section AI Readiness du rapport
 * analyse précisément la visibilité du site sur ChatGPT/Perplexity (sujet légitime).
 * La règle est : ne JAMAIS révéler que l'audit lui-même est produit par une IA.
 * Seules les formulations d'auto-attribution sont interdites.
 * Exporté : le linter d'envoi des séquences (src/lib/prospection/linter.ts)
 * réutilise le même lexique pour bloquer les emails.
 */
export const IA_LEXICON = [
  'généré par ', 'génère ce rapport', 'notre ia', 'notre intelligence artificielle',
  'notre algorithme', "l'algorithme d'analyse", 'notre modèle', 'assistant ia',
  'rédigé par une ia', 'analyse automatisée par ia',
];

/** Extrait tous les montants € d'un texte (ex "1 760 €", "1760€"). Retourne les entiers. */
function extractEuros(text: string): number[] {
  const out: number[] = [];
  const re = /(\d[\d\s.]*)\s*€/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const n = parseInt(match[1].replace(/[\s.]/g, ''), 10);
    if (!Number.isNaN(n)) out.push(n);
  }
  return out;
}

function isProContent(content: ReportContent | ProReportContent): content is ProReportContent {
  return 'auditTable' in content;
}

/**
 * Vérifie que le contenu rédigé respecte le contrat de véracité. Lève ContractViolation sinon.
 * 1. tout measurementId référencé existe (findings ET lignes du tableau d'audit Pro) ;
 * 2. zéro tiret long ; 3. zéro mention IA ; 4. zéro position Google affirmée ;
 * 5. zéro montant € (on n'estime plus aucun montant en self-service, l'impact s'exprime
 *    en % de visiteurs perdus). Les checks texte couvrent aussi les champs Pro
 *    (auditTable, recommendations, strategicRecommendations, funnelAnalysis,
 *    funnelProjection, recommendationSummary, aiVisibilityAnalysis) quand ils
 *    sont présents.
 */
export function validateReportContract(content: ReportContent | ProReportContent, audit: AuditData): void {
  // Références valides : les mesures + les items d'impact calculés (ex impact.lcp),
  // qui sont eux aussi des valeurs vérifiées fournies au rédacteur.
  const validIds = new Set([
    ...audit.measurements.map((m) => m.id),
    ...(audit.impact?.items.map((i) => i.id) ?? []),
  ]);

  const texts = [
    content.execSummary,
    content.scoreJustification,
    content.competitorAnalysis ?? '',
    ...content.findings.flatMap((f) => [f.title, f.body]),
  ];
  if (isProContent(content)) {
    texts.push(
      ...content.auditTable.flatMap((r) => [r.domain, r.finding, r.impact]),
      ...content.recommendations.flatMap((r) => [r.title, r.action, r.expectedImpact]),
      ...content.strategicRecommendations.flatMap((r) => [r.title, r.rationale]),
      content.funnelAnalysis,
      content.funnelProjection,
      content.recommendationSummary,
      content.aiVisibilityAnalysis,
    );
  }
  const allText = texts.join('\n');
  const lower = allText.toLowerCase();

  if (allText.includes('—') || allText.includes('–')) {
    throw new ContractViolation('Tiret long (— ou –) interdit dans le rapport.');
  }
  for (const term of IA_LEXICON) {
    if (lower.includes(term)) {
      throw new ContractViolation(`Mention IA interdite détectée : "${term.trim()}".`);
    }
  }
  if (/position\s+\d+\s+sur\s+google|en\s+position\s+\d+/i.test(allText)) {
    throw new ContractViolation('Affirmation de position Google précise interdite (invérifiable).');
  }
  for (const f of content.findings) {
    for (const id of f.measurementIds) {
      if (!validIds.has(id)) {
        throw new ContractViolation(`Finding "${f.title}" référence une mesure inexistante : ${id}`);
      }
    }
  }
  if (isProContent(content)) {
    for (const row of content.auditTable) {
      for (const id of row.measurementIds) {
        if (!validIds.has(id)) {
          throw new ContractViolation(
            `Ligne du tableau d'audit "${row.domain}" référence une mesure inexistante : ${id}`,
          );
        }
      }
    }
  }
  for (const euro of extractEuros(allText)) {
    throw new ContractViolation(`Montant € interdit (l'impact s'exprime en % de visiteurs) : ${euro} €`);
  }
}
