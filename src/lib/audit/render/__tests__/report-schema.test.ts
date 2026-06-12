import { describe, it, expect } from 'vitest';
import { ProContentSchema } from '../report-schema';

const row = (i: number) => ({
  category: 'SEO & CONTENU',
  domain: `Domaine ${i}`,
  finding: 'Constat factuel issu des mesures du site.',
  impact: 'Perte de visiteurs avant la prise de contact.',
  priority: 'Important',
  measurementIds: ['perf.mobile.lcp'],
});

const rec = (i: number) => ({
  title: `Recommandation ${i}`,
  action: 'Action concrète et actionnable pour corriger le constat.',
  expectedImpact: 'Effet attendu mesurable.',
});

const valid = () => ({
  execSummary: 'Votre site perd des visiteurs avant la prise de contact.',
  recommendation: 'refonte',
  findings: [
    { title: 'Lenteur', body: 'Le contenu met 11,8s a charger.', priority: 'P0', measurementIds: ['perf.mobile.lcp'] },
  ],
  competitorAnalysis: null,
  scoreJustification: 'Le score est tiré vers le bas par la performance mobile.',
  auditTable: [1, 2, 3, 4, 5].map(row),
  recommendations: [1, 2, 3, 4].map(rec),
  funnelAnalysis: 'Sur 100 visiteurs, environ 32 partent avant que le contenu principal ne soit affiché.',
  funnelProjection: 'Après correction des lenteurs, la perte estimée tombe sous 10 visiteurs sur 100, estimation prudente.',
  recommendationSummary: 'Le site repose sur de bonnes fondations mais perd ses visiteurs mobiles. Nous recommandons une refonte ciblée de la performance avant tout travail de contenu.',
});

describe('ProContentSchema', () => {
  it('accepte un contenu Pro complet et conforme', () => {
    const parsed = ProContentSchema.parse(valid());
    expect(parsed.auditTable).toHaveLength(5);
    expect(parsed.recommendations).toHaveLength(4);
  });

  it('rejette moins de 5 lignes de tableau d\'audit', () => {
    const c = { ...valid(), auditTable: [1, 2, 3, 4].map(row) };
    expect(ProContentSchema.safeParse(c).success).toBe(false);
  });

  it('rejette moins de 4 recommandations', () => {
    const c = { ...valid(), recommendations: [1, 2, 3].map(rec) };
    expect(ProContentSchema.safeParse(c).success).toBe(false);
  });

  it('rejette une catégorie hors des 7 domaines', () => {
    const c = valid();
    c.auditTable[0] = { ...row(1), category: 'CATEGORIE INVENTEE' };
    expect(ProContentSchema.safeParse(c).success).toBe(false);
  });

  it('rejette une priorité inconnue', () => {
    const c = valid();
    c.auditTable[0] = { ...row(1), priority: 'Urgent' };
    expect(ProContentSchema.safeParse(c).success).toBe(false);
  });

  it('accepte la priorité "À optimiser" (avec accent, telle qu\'affichée dans le PDF)', () => {
    const c = valid();
    c.auditTable[0] = { ...row(1), priority: 'À optimiser' };
    expect(ProContentSchema.safeParse(c).success).toBe(true);
  });

  it('rejette une ligne de tableau sans measurementIds', () => {
    const c = valid();
    c.auditTable[0] = { ...row(1), measurementIds: [] };
    expect(ProContentSchema.safeParse(c).success).toBe(false);
  });

  it('rejette une funnelAnalysis trop courte', () => {
    const c = { ...valid(), funnelAnalysis: 'Trop court.' };
    expect(ProContentSchema.safeParse(c).success).toBe(false);
  });

  it('rejette un recommendationSummary trop court ou absent', () => {
    expect(ProContentSchema.safeParse({ ...valid(), recommendationSummary: 'Refonte.' }).success).toBe(false);
    const { recommendationSummary: _omitted, ...rest } = valid();
    expect(ProContentSchema.safeParse(rest).success).toBe(false);
  });

  it('rejette un contenu Pro privé des champs de base (execSummary)', () => {
    const { execSummary: _omitted, ...rest } = valid();
    expect(ProContentSchema.safeParse(rest).success).toBe(false);
  });
});
