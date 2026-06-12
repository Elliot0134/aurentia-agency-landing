import { describe, it, expect } from 'vitest';
import { buildProReportHtml } from '../pdf-pro-html';
import type { ProContent, ProReportOptions } from '../pdf-pro-html';
import type { AuditData } from '../../types';
import type { ReportContent } from '../report-schema';

/** Extrait le HTML d'une section (de son id jusqu'à la section suivante). */
function section(html: string, id: string): string {
  const start = html.indexOf(`id="${id}"`);
  expect(start, `section ${id} absente`).toBeGreaterThan(-1);
  const end = html.indexOf('<section', start + 1);
  return end === -1 ? html.slice(start) : html.slice(start, end);
}

const richAudit = (): AuditData => ({
  url: 'https://exemple.fr',
  finalUrl: 'https://www.exemple.fr',
  tier: 'pro',
  collectedAt: '2026-06-12T08:00:00Z',
  description: 'Conciergerie de location courte duree dans le Luberon.',
  business: { type: 'local', scoreLocal: 6, scoreNational: 1, city: 'Cavaillon', sector: 'conciergerie' },
  measurements: [
    { id: 'perf.mobile.score', module: 'perf', label: 'Score performance Lighthouse (mobile)', status: 'fail', value: 32, unit: '/100', proof: 'PageSpeed Insights API' },
    // tiret long volontaire dans le label : le template doit le neutraliser
    { id: 'perf.mobile.lcp', module: 'perf', label: 'LCP — affichage du contenu principal (mobile)', status: 'fail', value: 6.2, unit: 's', details: 'Seuil Google : 2,5 s' },
    { id: 'perf.mobile.seo-score', module: 'perf', label: 'Score SEO Lighthouse (mobile)', status: 'warn', value: 78, unit: '/100' },
    { id: 'seo.title.present', module: 'seo-onpage', label: 'Balise title', status: 'pass', value: true },
    { id: 'seo.meta-description.present', module: 'seo-onpage', label: 'Meta description', status: 'fail', value: false, proof: 'HTML de la page d accueil' },
    { id: 'tech.https', module: 'seo-tech', label: 'HTTPS', status: 'pass', value: true },
    { id: 'tech.schema.present', module: 'seo-tech', label: 'Donnees structurees', status: 'warn', value: false },
    { id: 'images.broken', module: 'images', label: 'Images en erreur', status: 'info', value: 2 },
    { id: 'local.nap.phone', module: 'local-seo', label: 'Telephone visible sur la page', status: 'pass', value: '04 90 00 00 00' },
    { id: 'local.nap.address', module: 'local-seo', label: 'Adresse postale visible', status: 'warn', value: '84300 Cavaillon', details: 'adresse seulement en pied de page' },
    { id: 'local.schema.localbusiness', module: 'local-seo', label: 'Schema LocalBusiness', status: 'fail', value: false },
    { id: 'local.schema.geo', module: 'local-seo', label: 'Geolocalisation dans le schema', status: 'fail', value: false },
    { id: 'local.schema.hours', module: 'local-seo', label: 'Horaires dans le schema', status: 'fail', value: false },
    { id: 'local.city.title', module: 'local-seo', label: 'Ville dans le title ou le h1', status: 'pass', value: 'cavaillon' },
    { id: 'local.gbp.unverified', module: 'local-seo', label: 'Fiche Google Business, avis, citations', status: 'info', value: null, details: 'A evaluer pendant la relecture humaine.' },
    { id: 'ai.llms-txt', module: 'ai-readiness', label: 'Fichier llms.txt (guidage des moteurs IA)', status: 'fail', value: false, proof: 'GET https://www.exemple.fr/llms.txt → 404' },
  ],
  annotations: [],
  screenshotPath: null,
  competitors: [
    { domain: 'concurrent-a.fr', url: 'https://concurrent-a.fr', perfScoreMobile: 85, seoScore: 92, lcpMs: 1900 },
    { domain: 'concurrent-b.fr', url: 'https://concurrent-b.fr', perfScoreMobile: 61, seoScore: 88, lcpMs: 2600 },
  ],
  impact: {
    items: [{ id: 'impact.lcp', label: 'Lenteur du chargement', lossPercent: 32, basis: 'Etude Google sur le taux d abandon mobile.' }],
    headlinePercent: 32,
    assumptions: ['Trafic suppose constant.'],
  },
  crawl: {
    analyzedPages: 5,
    discoveredCount: 12,
    pages: [
      { url: 'https://www.exemple.fr/contact', title: 'Contact', status: 200 },
      { url: 'https://www.exemple.fr/services', title: 'Services', status: 200 },
      { url: 'https://www.exemple.fr/tarifs', title: 'Tarifs', status: 200 },
      { url: 'https://www.exemple.fr/blog', title: 'Blog', status: 200 },
    ],
  },
});

const richContent = (): ReportContent => ({
  execSummary: 'Votre site perd une part importante de ses visiteurs avant meme d afficher votre offre.',
  recommendation: 'refonte',
  findings: [
    { title: 'Le site met plus de 6 secondes a afficher son contenu', body: 'Une majorite de visiteurs mobiles partent avant de voir votre offre.', priority: 'P0', measurementIds: ['perf.mobile.lcp'] },
    { title: 'Google ne sait pas decrire votre site', body: 'Aucune meta description : le resultat Google est genere au hasard.', priority: 'P1', measurementIds: ['seo.meta-description.present'] },
    { title: 'Donnees structurees absentes', body: 'Votre fiche est moins riche que celle des concurrents.', priority: 'P2', measurementIds: ['tech.schema.present'] },
  ],
  competitorAnalysis: 'Vos concurrents chargent trois fois plus vite et captent les visiteurs mobiles.',
  scoreJustification: 'Le score est tire vers le bas par la performance mobile et le SEO incomplet.',
});

const richOpts = (): ProReportOptions => ({
  score: 38,
  charts: {
    radar: '<svg data-chart="radar" xmlns="http://www.w3.org/2000/svg"></svg>',
    funnel: '<svg data-chart="funnel" xmlns="http://www.w3.org/2000/svg"></svg>',
    scoreTarget: '<svg data-chart="score-target" xmlns="http://www.w3.org/2000/svg"></svg>',
    heatmap: '<svg data-chart="heatmap" xmlns="http://www.w3.org/2000/svg"></svg>',
  },
  visuals: [
    {
      title: 'Le menu mobile masque le bouton de reservation',
      imageDataUri: 'data:image/png;base64,iVBORw0KGgoTEST',
      legend: ['Bouton de reservation masque par le menu', 'Texte illisible sur fond clair'],
      analysis: 'Le visiteur mobile ne voit jamais votre bouton principal.',
    },
  ],
});

/** Audit national minimal : aucune donnée conditionnelle. */
const bareAudit = (): AuditData => {
  const a = richAudit();
  return {
    ...a,
    business: { type: 'national', scoreLocal: 0, scoreNational: 5, city: null, sector: null },
    measurements: a.measurements.filter((m) => !m.id.startsWith('local.')),
    competitors: [],
    impact: null,
    crawl: null,
  };
};

describe('buildProReportHtml', () => {
  it("cover : bandeau de marque HTML/CSS, RAPPORT D'AUDIT et les deux boxes", async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const cover = section(html, 'cover');
    expect(cover).toContain('Aurentia.agency');
    expect(cover).toContain('Landing pages · Applications SaaS · Sites vitrines');
    expect(cover).toContain('Audit &amp; Recommandations Stratégiques');
    expect(cover).toContain("RAPPORT D'AUDIT");
    expect(cover).toContain('Site web exemple.fr');
    expect(cover).toContain('SITE AUDITÉ');
    expect(cover).toContain('INFORMATIONS RAPPORT');
    expect(cover).toContain('Conciergerie de location courte duree dans le Luberon.');
    expect(cover).toContain('Cavaillon');
    expect(cover).toContain('Aurentia Agency');
    expect(cover).not.toMatch(/<img/); // bandeau recréé en HTML/CSS, pas d'image bitmap
  });

  it('cover : Pages analysées branchée sur audit.crawl quand présent, fallback homepage sinon', async () => {
    const withCrawl = section(await buildProReportHtml(richAudit(), richContent(), richOpts()), 'cover');
    expect(withCrawl).toContain('Pages analysées :</span> 5');
    const noCrawl = section(await buildProReportHtml(bareAudit(), richContent(), richOpts()), 'cover');
    expect(noCrawl).toContain("Pages analysées :</span> 1 (page d'accueil)");
  });

  it('synthèse : score color-codé, radar inline, impact en %, priorités à pastilles, box recommandation', async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const syn = section(html, 'synthese');
    expect(syn).toContain('>38<');
    expect(syn).toContain('data-chart="radar"');
    expect(syn).toContain('Impact estimé');
    expect(syn).toContain('32');
    expect(syn.toLowerCase()).toContain('visiteurs perdus');
    expect(syn).toContain('3 priorités identifiées');
    expect(syn).toContain('priority-list');
    expect(syn).toContain('Recommandation :');
    expect(syn).toContain('Refonte recommandée');
  });

  it('comparatif : colonne Vous, cellule rouge quand mauvais, analyse concurrents', async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const comp = section(html, 'competitors');
    expect(comp).toContain('Vous');
    expect(comp).toContain('concurrent-a.fr');
    expect(comp).toContain('concurrent-b.fr');
    expect(comp).toContain('you-cell'); // colonne Vous stylée
    expect(comp).toContain('bad-cell'); // perf 32/100 → rouge clair
    expect(comp).toContain('Ce que les concurrents font mieux');
    expect(comp).toContain('Vos concurrents chargent trois fois plus vite');
  });

  it("tableau d'audit fallback : bandes de catégorie, badges, pass exclus, légende", async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const table = section(html, 'audit-table');
    expect(table).toContain('PERFORMANCE &amp; TECHNIQUE');
    expect(table).toContain('SEO &amp; CONTENU');
    expect(table).toContain('VISIBILITÉ &amp; GOOGLE');
    expect(table).toContain('badge-critique');
    expect(table).toContain('badge-important');
    expect(table).toContain('badge-optimiser');
    expect(table).toContain('Critique');
    expect(table).toContain('Important');
    expect(table).toContain('À optimiser');
    expect(table).not.toContain('Balise title'); // pass exclu du tableau
    expect(table).toContain('Meta description'); // fail présent
    // légende au-dessus du tableau
    expect(table.indexOf('legend')).toBeLessThan(table.indexOf('<table'));
  });

  it('constats visuels : image centrée, légende numérotée, analyse', async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const vis = section(html, 'visuals');
    expect(vis).toContain('Constats visuels');
    expect(vis).toContain('Le menu mobile masque le bouton de reservation');
    expect(vis).toContain('data:image/png;base64,iVBORw0KGgoTEST');
    expect(vis).toContain('annot-legend');
    expect(vis).toContain('Bouton de reservation masque par le menu');
    expect(vis).toContain('Le visiteur mobile ne voit jamais votre bouton principal.');
  });

  it('local SEO : score mesurable /55, breakdown, non-mesurés en "à vérifier"', async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const local = section(html, 'local-seo');
    expect(local).toContain('Local SEO');
    for (const label of ['GBP', 'ON PAGE', 'SCHEMA', 'NAP', 'CITATIONS', 'REVIEWS']) {
      expect(local).toContain(label);
    }
    // ON PAGE : city.title pass (10) + adresse warn (5) = 15/20
    expect(local).toContain('15 / 20');
    // SCHEMA : tout fail = 0/20
    expect(local).toContain('0 / 20');
    // NAP : phone pass (8) + adresse warn (3) = 11/15
    expect(local).toContain('11 / 15');
    // gros score = total mesurable uniquement (26/55), jamais un /100 inventé
    expect(local).toContain('26 / 55');
    expect(local).toContain('mesurable');
    // GBP, avis, citations : pas de score inventé, marqués à vérifier en relecture
    expect(local).toContain('à vérifier');
    expect(local).toContain('détectée comme locale');
    expect(local).not.toContain('/ 100');
  });

  it('funnel et état actuel vs cible : charts inline + analyse + tableau axes', async () => {
    const pro: ProContent = {
      ...richContent(),
      funnelAnalysis: 'Sur 100 visiteurs, 32 partent avant l affichage du contenu.',
      funnelProjection: 'Apres correction, la perte estimee tombe sous 10 visiteurs sur 100.',
    };
    const html = await buildProReportHtml(richAudit(), pro, richOpts());
    const funnel = section(html, 'funnel');
    expect(funnel).toContain('data-chart="funnel"');
    expect(funnel).toContain('Analyse');
    expect(funnel).toContain('Projection post-refonte');
    expect(funnel).toContain('Sur 100 visiteurs, 32 partent');
    const target = section(html, 'score-target');
    expect(target).toContain('data-chart="score-target"');
    expect(target).toContain('Axe');
    expect(target).toContain('Objectif');
    expect(target).toContain('/10');
  });

  it('recommandations : R1..Rn, devis transmis séparément, fallback depuis P0/P1', async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const rec = section(html, 'recommendations');
    expect(rec).toContain('Recommandations prioritaires');
    expect(rec).toContain('Le devis chiffré est transmis séparément.');
    expect(rec).toContain('>R1<');
    expect(rec).toContain('>R2<'); // 1 P0 + 1 P1 = R1, R2 (P2 exclu)
    expect(rec).not.toContain('>R3<');
    expect(rec).toContain('Le site met plus de 6 secondes a afficher son contenu');
  });

  it('champs Pro étendus : auditTable et recommendations fournis priment sur le fallback', async () => {
    const pro: ProContent = {
      ...richContent(),
      auditTable: [
        { category: 'AI Readiness', domain: 'AI Readiness', finding: 'Aucun llms.txt detecte', impact: 'Invisible pour les assistants de recherche', priority: 'Critique' },
      ],
      recommendations: [
        { title: 'Publier un llms.txt', action: 'Ajouter le fichier a la racine du site', expectedImpact: 'Visibilite dans les nouveaux moteurs de recherche' },
      ],
    };
    const html = await buildProReportHtml(richAudit(), pro, richOpts());
    const table = section(html, 'audit-table');
    expect(table).toContain('AI READINESS');
    expect(table).toContain('Aucun llms.txt detecte');
    expect(table).not.toContain('Meta description'); // fallback non utilisé
    const rec = section(html, 'recommendations');
    expect(rec).toContain('Publier un llms.txt');
    expect(rec).not.toContain('>R2<');
  });

  it('annexe : heatmap, méthodologie, blocs pre monospace, sources des estimations', async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const annex = section(html, 'annex');
    expect(annex).toContain('data-chart="heatmap"');
    expect(annex).toContain('Méthodologie &amp; outils');
    expect(annex).toContain('<pre>');
    expect(annex).toContain('SEO technique');
    expect(annex).toContain('Performance');
    expect(annex).toContain('Sources des estimations');
    expect(annex).toContain('Etude Google sur le taux d abandon mobile.');
    expect(annex).toContain('Balise title'); // les pass restent visibles dans l'annexe
    // bloc AI Readiness présent avec ses mesures ai.*
    expect(annex).toContain('AI Readiness');
    expect(annex).toContain('ai.llms-txt');
  });

  it('back cover : bandeau, bouton mailto, QR svg, coordonnées centrées', async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const back = html.slice(html.indexOf('id="back-cover"'));
    expect(html.indexOf('id="back-cover"')).toBeGreaterThan(-1);
    expect(back).toContain('Aurentia.agency');
    expect(back).toContain('mailto:agency@aurentia.fr');
    expect(back).toContain('Nous contacter');
    expect(back).toContain('<svg'); // QR généré offline
    expect(back).toContain('contact@aurentia.fr');
    expect(back).toContain('Aurentia Agency');
  });

  it('sections conditionnelles absentes quand les données manquent', async () => {
    const html = await buildProReportHtml(bareAudit(), richContent(), { score: 55 });
    expect(html).not.toContain('Local SEO');
    expect(html).not.toContain('Constats visuels');
    expect(html).not.toContain('Comparatif concurrentiel');
    expect(html).not.toContain('id="funnel"');
    expect(html).not.toContain('data-chart');
    expect(html).not.toContain('Impact estimé'); // pas d'impact → pas de ligne %
    // mais le rapport reste complet
    expect(html).toContain('id="audit-table"');
    expect(html).toContain('id="score-target"');
    expect(html).toContain('id="recommendations"');
    expect(html).toContain('id="annex"');
    expect(html).toContain('id="back-cover"');
  });

  it('charte : terracotta, zéro bleu de référence, zéro €, zéro tiret long, footer Chromium uniquement', async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    expect(html).toContain('#c96442');
    expect(html).not.toContain('#1e40af');
    expect(html).not.toContain('#1e3a5f');
    expect(html).not.toMatch(/€|&euro;/);
    expect(html).not.toMatch(/—|–/); // y compris le label LCP qui contenait un tiret long
    expect(html).toContain('<meta charset="utf-8"');
    // le footer est rendu UNIQUEMENT par Chromium (render-pdf.ts), pas par le template
    // (les deux superposés = footer doublé sur chaque page)
    expect(html).not.toContain('Aurentia Agency · Audit confidentiel');
    expect(html).not.toContain('counter(page)');
    expect(html.toLowerCase()).not.toMatch(/\broadmap\b|\bsprint\b|\btjm\b/);
    expect(html.toLowerCase()).not.toMatch(/intelligence artificielle|chatgpt|\bllm\b/);
  });

  it('état vs cible : axe déjà au niveau → cible jamais sous l\'actuel et badge Maintenir', async () => {
    const a = bareAudit();
    a.measurements = [
      { id: 'perf.mobile.score', module: 'perf', label: 'Score performance', status: 'pass', value: 95, unit: '/100' },
      { id: 'seo.title.present', module: 'seo-onpage', label: 'Balise title', status: 'pass', value: true },
    ];
    const html = await buildProReportHtml(a, richContent(), { score: 90 });
    const target = section(html, 'score-target');
    expect(target).toContain('10/10'); // note 10 → cible relevée à 10, jamais 9 < actuel
    expect(target).toContain('badge-maintenir');
    expect(target).toContain('Maintenir');
    expect(target).not.toContain('>9/10<');
  });

  it('libellés humanisés : secteur mappé, ville capitalisée (cover + intro Local SEO)', async () => {
    const html = await buildProReportHtml(richAudit(), richContent(), richOpts());
    const cover = section(html, 'cover');
    expect(cover).toContain('Secteur :</span> Conciergerie');
    const local = section(html, 'local-seo');
    expect(local).toContain('(Conciergerie)');

    const a = richAudit();
    a.business = { ...a.business, sector: 'saas-b2b', city: 'aix-en-provence' };
    const cover2 = section(await buildProReportHtml(a, richContent(), richOpts()), 'cover');
    expect(cover2).toContain('SaaS / B2B');
    expect(cover2).toContain('Aix-En-Provence');
  });

  it('box recommandation : recommendationSummary rédigé si présent, label enum en fallback', async () => {
    const withSummary: ProContent = {
      ...richContent(),
      recommendationSummary:
        'Votre site repose sur des fondations saines mais perd ses visiteurs mobiles. Nous recommandons de traiter la performance en priorité, puis la visibilité locale.',
    };
    const html = await buildProReportHtml(richAudit(), withSummary, richOpts());
    const syn = section(html, 'synthese');
    expect(syn).toContain('Nous recommandons de traiter la performance en priorité');
    expect(syn).not.toContain('Refonte recommandée'); // le résumé remplace le label enum
    // fallback sans summary : couvert par le test synthèse (Refonte recommandée)
  });
});
