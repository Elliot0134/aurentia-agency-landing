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

/* ----------------------------------------------------------------------------
 * Schéma Pro (tâche A3) : contenu enrichi rédigé par le LLM pour le PDF Pro.
 * Les valeurs d'enum sont EXACTEMENT celles que le template pdf-pro-html
 * affiche (catégories accentuées de CATEGORY_ORDER, badge "À optimiser").
 * ------------------------------------------------------------------------- */

/** Les 7 domaines d'audit, alignés sur les bandes du tableau du template Pro. */
export const AuditCategorySchema = z.enum([
  'VISIBILITÉ & GOOGLE',
  'SEO & CONTENU',
  'UX & MOBILE',
  'CONVERSION & FUNNEL',
  'PERFORMANCE & TECHNIQUE',
  'ACCESSIBILITÉ',
  'AI READINESS',
]);
export type AuditCategory = z.infer<typeof AuditCategorySchema>;

/** Une ligne du tableau d'audit complet. `measurementIds` = preuve obligatoire. */
export const AuditTableRowSchema = z.object({
  category: AuditCategorySchema,
  domain: z.string().min(2), // ex "Navigation mobile"
  finding: z.string().min(10), // le constat, factuel
  impact: z.string().min(5), // la conséquence business, italique dans le PDF
  priority: z.enum(['Critique', 'Important', 'À optimiser']),
  measurementIds: z.array(z.string()).min(1),
});
export type AuditTableRow = z.infer<typeof AuditTableRowSchema>;

/** Une recommandation priorisée (R1 = le levier numéro 1). */
export const RecommendationSchema = z.object({
  title: z.string().min(3),
  action: z.string().min(10), // concrète et actionnable
  expectedImpact: z.string().min(5), // effet attendu, en %, jamais en euros
});
export type Recommendation = z.infer<typeof RecommendationSchema>;

export const ProContentSchema = ReportContentSchema.extend({
  auditTable: z.array(AuditTableRowSchema).min(5),
  recommendations: z.array(RecommendationSchema).min(4),
  funnelAnalysis: z.string().min(30), // où se perd le visiteur
  funnelProjection: z.string().min(30), // effet attendu des corrections, prudent, en %
  recommendationSummary: z.string().min(40), // 2-3 phrases : verdict global + chemin recommandé, ton consultant, sans prix
});
export type ProReportContent = z.infer<typeof ProContentSchema>;
