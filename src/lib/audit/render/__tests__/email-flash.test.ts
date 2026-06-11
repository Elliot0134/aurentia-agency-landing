import { describe, it, expect } from 'vitest';
import { buildFlashEmailHtml } from '../email-flash';
import type { AuditData } from '../../types';
import type { ReportContent } from '../report-schema';

const audit = (): AuditData => ({
  url: 'https://x.fr', finalUrl: 'https://x.fr', tier: 'flash', collectedAt: '2026-06-11T00:00:00Z',
  business: { type: 'local', scoreLocal: 5, scoreNational: 0, city: 'marseille', sector: 'conciergerie' },
  measurements: [
    { id: 'perf.mobile.lcp', module: 'perf', label: 'Affichage du contenu principal', status: 'fail', value: 11.8, unit: 's' },
    { id: 'perf.mobile.score', module: 'perf', label: 'Performance mobile', status: 'fail', value: 32, unit: '/100' },
  ],
  annotations: [{ x: 1, y: 1, width: 1, height: 1, measurementId: 'perf.mobile.lcp', note: 'Zone lente' }],
  screenshotPath: null, competitors: [],
  impact: {
    items: [{ id: 'impact.lcp', label: 'Visiteurs perdus à cause de la lenteur de chargement', lossPercent: 32, basis: 'Google.' }],
    headlinePercent: 32,
    assumptions: ['Estimation sans donnée de trafic.'],
  },
});
const content = (): ReportContent => ({
  execSummary: 'Votre site est lent et perd des visiteurs avant même qu’ils voient votre offre.',
  recommendation: 'refonte',
  findings: [{ title: 'Site lent', body: 'Le contenu met 11,8s a apparaitre.', priority: 'P0', measurementIds: ['perf.mobile.lcp'] }],
  competitorAnalysis: null,
});

describe('buildFlashEmailHtml', () => {
  it('produit un HTML avec capture, métriques colorées et CTA', () => {
    const html = buildFlashEmailHtml(audit(), content(), { screenshotUrl: 'https://cdn/x.jpg', ctaUrl: 'https://aurentia.agency/audit', scoreGaugeUrl: 'https://cdn/gauge.png' });
    expect(html).toContain('https://cdn/x.jpg'); // image capture
    expect(html).toContain('11,8'); // valeur LCP injectée depuis la mesure
    expect(html).toContain('#F36F1C'); // charte orange
    expect(html).toContain('https://aurentia.agency/audit'); // CTA
    expect(html.toLowerCase()).toContain('vaucluse'); // présentation agence (devs/designers)
    expect(html).toContain('32'); // impact en % de visiteurs perdus
    expect(html.toLowerCase()).toContain('visiteurs'); // libellé impact
    expect(html).toContain('%'); // exprimé en pourcentage, pas en euros
  });
  it('ne contient ni tiret long, ni mention IA, ni montant €', () => {
    const html = buildFlashEmailHtml(audit(), content(), { screenshotUrl: 'x', ctaUrl: 'y' });
    expect(html).not.toMatch(/—|–/);
    expect(html.toLowerCase()).not.toContain('intelligence artificielle');
    expect(html).not.toMatch(/€|&euro;/);
  });
  it('affiche le cadran de score quand scoreGaugeUrl est fourni', () => {
    const html = buildFlashEmailHtml(audit(), content(), {
      screenshotUrl: 'https://cdn/x.jpg',
      ctaUrl: 'https://aurentia.agency/audit',
      scoreGaugeUrl: 'https://cdn/gauge.png',
    });
    expect(html).toContain('https://cdn/gauge.png');
    expect(html).toContain('Votre score global');
  });
  it('omet le cadran de score quand scoreGaugeUrl est absent', () => {
    const html = buildFlashEmailHtml(audit(), content(), {
      screenshotUrl: 'https://cdn/x.jpg',
      ctaUrl: 'https://aurentia.agency/audit',
    });
    expect(html).not.toContain('Votre score global');
  });
});
