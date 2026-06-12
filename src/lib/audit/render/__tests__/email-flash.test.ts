import { describe, it, expect } from 'vitest';
import { buildFlashEmailHtml } from '../email-flash';
import type { AuditData } from '../../types';
import type { ReportContent } from '../report-schema';

const audit = (): AuditData => ({
  url: 'https://x.fr', finalUrl: 'https://x.fr', tier: 'flash', collectedAt: '2026-06-11T00:00:00Z',
  description: null,
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'marseille', sector: 'conciergerie' },
  measurements: [
    { id: 'perf.mobile.lcp', module: 'perf', label: 'Affichage du contenu principal', status: 'fail', value: 11.8, unit: 's' },
    { id: 'perf.mobile.score', module: 'perf', label: 'Performance mobile', status: 'fail', value: 32, unit: '/100' },
  ],
  annotations: [{ x: 1, y: 1, width: 1, height: 1, measurementId: 'perf.mobile.lcp', note: 'Zone lente' }],
  screenshotPath: null, competitors: [],
  impact: {
    items: [{ id: 'impact.lcp', label: 'Visiteurs perdus a cause de la lenteur de chargement', lossPercent: 32, basis: 'Google.' }],
    headlinePercent: 32,
    assumptions: ['Estimation sans donnee de trafic.'],
  },
});
const content = (): ReportContent => ({
  execSummary: "Votre site est lent et perd des visiteurs avant meme qu'ils voient votre offre.",
  recommendation: 'refonte',
  findings: [{ title: 'Site lent', body: 'Le contenu met 11,8s a apparaitre.', priority: 'P0', measurementIds: ['perf.mobile.lcp'] }],
  competitorAnalysis: null,
  scoreJustification: 'Score faible cause par des temps de chargement excessifs sur mobile.',
});

describe('buildFlashEmailHtml', () => {
  it('produit un HTML avec capture, metriques colorees et CTA', () => {
    const html = buildFlashEmailHtml(audit(), content(), { screenshotUrl: 'https://cdn/x.jpg', ctaUrl: 'https://aurentia.agency/audit', scoreGaugeUrl: 'https://cdn/gauge.png' });
    expect(html).toContain('https://cdn/x.jpg'); // image capture
    expect(html).toContain('11,8'); // valeur LCP injectee depuis la mesure
    expect(html).toContain('#c96442'); // charte terracotta v2 chaud
    expect(html).toContain('https://aurentia.agency/audit'); // CTA
    expect(html.toLowerCase()).toContain('vaucluse'); // presentation agence (devs/designers)
    expect(html).toContain('32'); // impact en % de visiteurs perdus
    expect(html.toLowerCase()).toContain('visiteurs'); // libelle impact
    expect(html).toContain('%'); // exprime en pourcentage, pas en euros
    expect(html).toContain('logo-aurentia-email.png'); // vrai wordmark en en-tête
    expect(html.toLowerCase()).toContain('audit pro'); // section audit Pro
    expect(html).toContain('99'); // prix audit Pro
    expect(html).toContain('buy.stripe.com/28E6oGaA43WGgL72Bf0x200'); // bouton Pro vers Stripe
    expect(html).toContain('cal.com/elliot-estrade-ixfuya/appel-decouverte'); // RDV cal.com par défaut
  });
  it("ne contient ni tiret long, ni mention IA, ni montant euros d'impact", () => {
    const html = buildFlashEmailHtml(audit(), content(), { screenshotUrl: 'x', ctaUrl: 'y' });
    expect(html).not.toMatch(/—|–/);
    expect(html.toLowerCase()).not.toContain('intelligence artificielle');
    // Seul euro autorisé : le prix de l'audit Pro (99 €). Aucun montant d'impact
    // chiffré en euros (ex "1 200 €/mois", "perte de X €").
    expect(html).not.toMatch(/\/mois/);
    expect(html).not.toMatch(/perte[^.]*€/i);
  });
  it('affiche le cadran de score quand scoreGaugeUrl est fourni', () => {
    const html = buildFlashEmailHtml(audit(), content(), {
      screenshotUrl: 'https://cdn/x.jpg',
      ctaUrl: 'https://aurentia.agency/audit',
      scoreGaugeUrl: 'https://cdn/gauge.png',
    });
    expect(html).toContain('https://cdn/gauge.png');
    expect(html).toContain('Votre score global');
    expect(html).toContain('Score faible cause par des temps de chargement excessifs sur mobile.');
  });
  it('omet le cadran de score quand scoreGaugeUrl est absent', () => {
    const html = buildFlashEmailHtml(audit(), content(), {
      screenshotUrl: 'https://cdn/x.jpg',
      ctaUrl: 'https://aurentia.agency/audit',
    });
    expect(html).not.toContain('Votre score global');
  });
  it('affiche le tableau concurrents quand il y a des concurrents', () => {
    const a = audit();
    a.competitors = [
      { domain: 'rival-un.fr', url: 'https://rival-un.fr', perfScoreMobile: 78, seoScore: 91, lcpMs: 2100 },
      { domain: 'rival-deux.fr', url: 'https://rival-deux.fr', perfScoreMobile: null, seoScore: 85, lcpMs: null },
    ];
    const html = buildFlashEmailHtml(a, content(), { screenshotUrl: 'x', ctaUrl: 'y' });
    expect(html).toContain('Face à vos concurrents');
    expect(html).toContain('Votre site');
    expect(html).toContain('rival-un.fr');
    expect(html).toContain('78/100'); // perf concurrent
    expect(html).toContain('n/d'); // valeur manquante du 2e concurrent
    expect(html).not.toMatch(/—|–/); // toujours zéro tiret long
  });
  it("n'affiche pas le tableau concurrents quand il n'y en a pas", () => {
    const html = buildFlashEmailHtml(audit(), content(), { screenshotUrl: 'x', ctaUrl: 'y' });
    expect(html).not.toContain('Face à vos concurrents');
  });
});
