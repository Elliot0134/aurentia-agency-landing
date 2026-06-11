import { generateObject } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import type { AuditData } from '../types';
import { ReportContentSchema, type ReportContent } from './report-schema';
import { validateReportContract } from './contract';

export type GenerateFn = (audit: AuditData, attemptNote: string) => Promise<ReportContent>;

const SYSTEM = `Tu rédiges un audit de site web pour un dirigeant non-technique (CEO).
Tu ne mesures rien : on te fournit des mesures, tu les mets en mots.
Règles ABSOLUES (le texte est rejeté sinon) :
- Conséquence business AVANT la cause technique. Le détail technique en fin de phrase.
- Chiffre tout, mais UNIQUEMENT avec les valeurs des mesures fournies. N'invente aucun chiffre.
- Tout finding doit lister les measurementIds des mesures qui le prouvent.
- INTERDIT : le tiret long (— ou –). Utilise des virgules ou des points.
- INTERDIT : mentionner l'IA, l'intelligence artificielle, un algorithme, ChatGPT, un LLM.
- INTERDIT : affirmer une position Google précise ("vous êtes en position 8").
- INTERDIT : citer un montant en euros (€). Tu exprimes l'impact en POURCENTAGE de visiteurs perdus, jamais en argent.
- Ton direct, concret, sans jargon en titre. Varie la forme des findings (pas de structure répétée).
- Rédige aussi "scoreJustification" : 2 à 3 phrases expliquant à quoi correspond le score global du site (ce qui le tire vers le haut ou le bas), en langage simple pour un dirigeant.`;

/** Construit le prompt utilisateur à partir des mesures (sérialisation compacte). */
function buildPrompt(audit: AuditData, attemptNote: string): string {
  const fails = audit.measurements.filter((m) => m.status === 'fail' || m.status === 'warn');
  return JSON.stringify({
    note: attemptNote,
    tier: audit.tier,
    business: audit.business,
    problemes: fails.map((m) => ({ id: m.id, label: m.label, value: m.value, unit: m.unit, proof: m.proof })),
    impact: audit.impact,
    concurrents: audit.competitors,
    consigne: audit.tier === 'pro'
      ? "Rédige execSummary, recommendation, findings (P0/P1/P2 priorisés) et competitorAnalysis. Exprime l'impact en % de visiteurs perdus, jamais en euros."
      : 'Rédige execSummary, recommendation et 2 à 4 findings. competitorAnalysis = null.',
  });
}

const defaultGenerate: GenerateFn = async (audit, attemptNote) => {
  const model = process.env.OPENROUTER_MODEL;
  if (!model) {
    throw new Error('OPENROUTER_MODEL manquant dans l\'environnement');
  }
  const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });
  const { object } = await generateObject({
    model: openrouter(model),
    schema: ReportContentSchema,
    system: SYSTEM,
    prompt: buildPrompt(audit, attemptNote),
  });
  return object;
};

export interface WriteReportOptions {
  generateFn?: GenerateFn;
  maxAttempts?: number;
}

/** Génère le contenu rédigé, en réessayant si le contrat de véracité échoue. */
export async function writeReport(audit: AuditData, opts: WriteReportOptions = {}): Promise<ReportContent> {
  const generateFn = opts.generateFn ?? defaultGenerate;
  const maxAttempts = opts.maxAttempts ?? 3;
  let lastErr: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const note = attempt === 1
      ? 'Premier essai.'
      : `Essai ${attempt}. L'essai précédent a violé le contrat : ${String(lastErr)}. Corrige.`;
    const content = await generateFn(audit, note);
    try {
      validateReportContract(content, audit);
      return content;
    } catch (err) {
      lastErr = err;
    }
  }
  throw new Error(`writeReport: contrat de véracité violé après ${maxAttempts} essais : ${String(lastErr)}`);
}
