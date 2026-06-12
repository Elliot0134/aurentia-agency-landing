import type { AuditData } from '../types';
import type { ProReportContent, ReportContent } from './report-schema';

export class ContractViolation extends Error {}

const IA_LEXICON = [
  'intelligence artificielle', "l'ia", ' ia ', 'algorithme d', 'chatgpt', 'gpt', 'llm',
  'machine learning', 'réseau de neurones', 'généré par ',
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
 *    (auditTable, recommendations, funnelAnalysis, funnelProjection) quand ils sont présents.
 */
export function validateReportContract(content: ReportContent | ProReportContent, audit: AuditData): void {
  const validIds = new Set(audit.measurements.map((m) => m.id));

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
      content.funnelAnalysis,
      content.funnelProjection,
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
