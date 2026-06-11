import { z } from 'zod';

/** Un finding rédigé par le LLM. `measurementIds` = preuve : ids de mesures existantes. */
export const FindingSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(10), // conséquence business avant cause technique
  priority: z.enum(['P0', 'P1', 'P2']),
  measurementIds: z.array(z.string()).min(1), // AU MOINS une mesure référencée
});
export type Finding = z.infer<typeof FindingSchema>;

export const ReportContentSchema = z.object({
  execSummary: z.string().min(20), // 2-4 phrases, conséquence business
  recommendation: z.enum(['refonte', 'optimisations', 'bon-etat']),
  findings: z.array(FindingSchema).min(1),
  competitorAnalysis: z.string().nullable(), // pro uniquement, sinon null
  scoreJustification: z.string().min(10), // 2-3 phrases CEO-friendly expliquant le score global
});
export type ReportContent = z.infer<typeof ReportContentSchema>;
