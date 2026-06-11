import type { AuditData, CompetitorSummary } from '../types';
import type { Finding, ReportContent } from './report-schema';
import { COLORS } from './theme';

export interface ProReportOptions {
  score: number;
}

/** Échappe l'input (texte LLM) avant injection dans le HTML du rapport. */
function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}

/** Formate un nombre à la française (virgule décimale). */
function formatNumberFr(value: number): string {
  return value.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
}

/** Couleur de score color-codee (rouge/orange/vert) selon le seuil. */
function scoreColor(score: number): string {
  if (score < 50) return COLORS.bad;
  if (score < 70) return COLORS.mid;
  return COLORS.good;
}

/** Extrait le nom de domaine de l'URL finale (sert de nom client sur la couverture). */
function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

const RECO_LABEL: Record<ReportContent['recommendation'], string> = {
  refonte: 'Refonte recommandée',
  optimisations: 'Optimisations ciblées recommandées',
  'bon-etat': 'Site en bon état',
};

/**
 * CSS print A4 porté de `generate_pdf.py` (CSS_TEMPLATE), recoloré à la charte
 * orange Aurentia.agency : le bleu `#1e40af`/`#1e3a8a` du skill devient
 * `COLORS.accent`/`COLORS.accentDark`. Scores color-codés via bad/mid/good.
 */
function styleBlock(): string {
  const C = COLORS;
  return `
@page {
  size: A4;
  margin: 24mm 18mm 20mm 18mm;
  @top-left {
    content: "AURENTIA AGENCY";
    font-family: 'Inter', Arial, sans-serif;
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 0.6pt;
    color: ${C.accent};
    vertical-align: bottom;
    padding-bottom: 4pt;
  }
  @top-right {
    content: "Audit stratégique";
    font-family: 'Inter', Arial, sans-serif;
    font-size: 8.5pt;
    color: ${C.muted};
    vertical-align: bottom;
    padding-bottom: 4pt;
  }
  @bottom-right {
    content: counter(page) " / " counter(pages);
    font-family: 'Inter', Arial, sans-serif;
    font-size: 9pt;
    color: ${C.muted};
  }
  @bottom-left {
    content: "Aurentia Agency, audit confidentiel";
    font-family: 'Inter', Arial, sans-serif;
    font-size: 8.5pt;
    color: ${C.muted};
  }
}
@page :first {
  margin: 0;
  @top-left { content: none; }
  @top-right { content: none; }
  @bottom-right { content: none; }
  @bottom-left { content: none; }
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  font-size: 11pt;
  line-height: 1.55;
  color: ${C.text};
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4 { color: ${C.text}; font-weight: 700; }
h1 { font-size: 22pt; margin: 0 0 8pt 0; }
h2 { font-size: 16pt; margin: 16pt 0 8pt; border-bottom: 2px solid ${C.accent}; padding-bottom: 4pt; }
h3 { font-size: 13pt; margin: 12pt 0 6pt; color: ${C.accentDark}; }
h4 { font-size: 11pt; margin: 10pt 0 4pt; }

p { margin: 6pt 0; }

.cover-page {
  page-break-after: always;
  padding: 30mm 18mm;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cover-logo {
  font-size: 18pt;
  font-weight: 700;
  color: ${C.accent};
  letter-spacing: -0.5pt;
}
.cover-main h1 {
  font-size: 32pt;
  line-height: 1.15;
  margin-bottom: 24pt;
}
.cover-main h2 {
  font-size: 18pt;
  color: ${C.accentDark};
  border-bottom: none;
  margin: 0 0 6pt 0;
  padding: 0;
}
.cover-main .url {
  font-size: 12pt;
  color: ${C.muted};
}
.cover-meta {
  font-size: 10pt;
  color: ${C.muted};
}

.section { page-break-after: always; }
.section.compact { page-break-after: avoid; }

.score-block {
  display: flex;
  gap: 24pt;
  align-items: center;
  margin: 12pt 0;
}
.score-big {
  font-size: 64pt;
  font-weight: 800;
  line-height: 1;
}
.score-meta { color: ${C.muted}; font-size: 10pt; }

.priority-list { padding-left: 0; list-style: none; counter-reset: prio; }
.priority-list li {
  counter-increment: prio;
  margin: 8pt 0;
  padding-left: 28pt;
  position: relative;
}
.priority-list li:before {
  content: counter(prio);
  position: absolute;
  left: 0;
  top: 0;
  width: 22pt;
  height: 22pt;
  background: ${C.accent};
  color: white;
  border-radius: 50%;
  text-align: center;
  line-height: 22pt;
  font-weight: 700;
  font-size: 11pt;
}

.finding { margin: 14pt 0; page-break-inside: avoid; }
.finding h3 { color: ${C.text}; break-after: avoid; }
.finding .prio-tag {
  display: inline-block;
  font-size: 8.5pt;
  font-weight: 700;
  letter-spacing: 0.5pt;
  color: #ffffff;
  background: ${C.accent};
  border-radius: 4pt;
  padding: 1pt 6pt;
  margin-right: 6pt;
  vertical-align: middle;
}
.finding .proof {
  color: ${C.muted};
  font-size: 8.5pt;
  display: block;
  margin-top: 4pt;
}

table { width: 100%; border-collapse: collapse; margin: 10pt 0; font-size: 10pt; }
th { background: ${C.accent}; color: white; padding: 6pt 8pt; text-align: left; font-weight: 600; }
td { padding: 5pt 8pt; border-bottom: 1px solid ${C.border}; }
tr:nth-child(even) td { background: ${C.surface}; }

.loss-amount {
  font-size: 18pt;
  font-weight: 700;
  color: ${C.bad};
  margin: 0;
}

.annex { font-size: 9.5pt; color: ${C.text}; }
.annex h3 { font-size: 11pt; }

.footer-pitch {
  margin-top: 24pt;
  padding: 18pt;
  background: ${C.tintBg};
  border-left: 4px solid ${C.accent};
}
`;
}

function buildCover(audit: AuditData): string {
  const name = domainOf(audit.finalUrl);
  const date = new Date(audit.collectedAt).toLocaleDateString('fr-FR');
  return `
  <div class="cover-page">
    <div class="cover-logo">AURENTIA AGENCY</div>
    <div class="cover-main">
      <h2>Audit stratégique</h2>
      <h1>${escapeHtml(name)}</h1>
      <div class="url">${escapeHtml(audit.finalUrl)}</div>
    </div>
    <div class="cover-meta">
      Date : ${escapeHtml(date)}<br/>
      Préparé par : Aurentia Agency<br/>
      Confidentiel, destiné à ${escapeHtml(name)}
    </div>
  </div>`;
}

function buildSynthese(audit: AuditData, content: ReportContent, score: number): string {
  const loss = audit.impact && audit.impact.headlinePercent > 0
    ? `
        <p style="margin-top:14pt;"><strong>Impact estimé de la lenteur :</strong></p>
        <p class="loss-amount">~ ${formatNumberFr(audit.impact.headlinePercent)}% de vos visiteurs partent avant de voir votre offre</p>`
    : '';
  return `
  <section class="section">
    <h2>Synthèse</h2>
    <div class="score-block">
      <div>
        <div class="score-big" style="color:${scoreColor(score)};">${score}</div>
        <div class="score-meta">/ 100</div>${loss}
      </div>
      <div style="flex:1;">
        <p style="font-size:13pt;line-height:1.6;">${escapeHtml(content.execSummary)}</p>
      </div>
    </div>

    <div class="footer-pitch">
      <strong>${escapeHtml(RECO_LABEL[content.recommendation])} :</strong> ${escapeHtml(content.execSummary)}
    </div>
  </section>`;
}

function findingBlock(f: Finding): string {
  const proof = f.measurementIds.length
    ? `<span class="proof">Mesures : ${f.measurementIds.map((id) => escapeHtml(id)).join(', ')}</span>`
    : '';
  return `
    <div class="finding">
      <h3><span class="prio-tag">${escapeHtml(f.priority)}</span>${escapeHtml(f.title)}</h3>
      <p>${escapeHtml(f.body)}</p>
      ${proof}
    </div>`;
}

function buildFindings(content: ReportContent): string {
  const groups: { priority: Finding['priority']; title: string }[] = [
    { priority: 'P0', title: 'Problèmes critiques (P0)' },
    { priority: 'P1', title: 'Problèmes importants (P1)' },
    { priority: 'P2', title: 'Optimisations (P2)' },
  ];
  return groups
    .map((g) => {
      const items = content.findings.filter((f) => f.priority === g.priority);
      if (items.length === 0) return '';
      return `
  <section class="section">
    <h2>${g.title}</h2>
    ${items.map(findingBlock).join('')}
  </section>`;
    })
    .join('');
}

function competitorRow(c: CompetitorSummary): string {
  const perf = c.perfScoreMobile === null ? 'n.d.' : `${formatNumberFr(c.perfScoreMobile)}/100`;
  const seo = c.seoScore === null ? 'n.d.' : `${formatNumberFr(c.seoScore)}/100`;
  const lcp = c.lcpMs === null ? 'n.d.' : `${formatNumberFr(c.lcpMs / 1000)} s`;
  return `<tr><td>${escapeHtml(c.domain)}</td><td>${perf}</td><td>${seo}</td><td>${lcp}</td></tr>`;
}

function buildCompetitors(audit: AuditData, content: ReportContent): string {
  if (audit.competitors.length === 0) return '';
  const analysis = content.competitorAnalysis
    ? `<h3>Ce que les concurrents font mieux</h3><p>${escapeHtml(content.competitorAnalysis)}</p>`
    : '';
  return `
  <section class="section">
    <h2>Comparatif concurrentiel</h2>
    <table>
      <thead><tr><th>Concurrent</th><th>Performance mobile</th><th>SEO</th><th>Affichage</th></tr></thead>
      <tbody>${audit.competitors.map(competitorRow).join('')}</tbody>
    </table>
    ${analysis}
  </section>`;
}

function measurementValue(value: AuditData['measurements'][number]['value'], unit?: string): string {
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (value === null) return 'n.d.';
  if (typeof value === 'number') {
    const u = unit ?? '';
    return u.startsWith('/')
      ? `${formatNumberFr(value)}${u}`
      : `${formatNumberFr(value)}${u ? ` ${escapeHtml(u)}` : ''}`;
  }
  return escapeHtml(String(value));
}

function buildAnnex(audit: AuditData): string {
  const rows = audit.measurements
    .map(
      (m) =>
        `<tr><td>${escapeHtml(m.label)}</td><td>${measurementValue(m.value, m.unit)}</td><td>${escapeHtml(m.status)}</td></tr>`,
    )
    .join('');
  return `
  <section class="section annex">
    <h2>Annexe technique</h2>
    <p>Détail des mesures collectées sur le site.</p>
    <table>
      <thead><tr><th>Mesure</th><th>Valeur</th><th>État</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>`;
}

/**
 * Construit le HTML complet du rapport PDF Pro (charte orange Aurentia.agency),
 * porté de la structure + CSS de `generate_pdf.py`. Fonction pure, aucun réseau.
 *
 * Sections : couverture, synthèse (score color-codé + impact en % de visiteurs), findings
 * groupés P0/P1/P2, comparatif concurrents, annexe technique. Footer @page paginé.
 *
 * Règles : zéro tiret long, zéro prix de refonte, zéro roadmap, valeurs numériques
 * injectées depuis les données (jamais depuis le texte LLM), texte LLM échappé.
 */
export function buildProReportHtml(
  audit: AuditData,
  content: ReportContent,
  opts: ProReportOptions,
): string {
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <title>Audit Aurentia</title>
  <style>${styleBlock()}</style>
</head>
<body>
${buildCover(audit)}
${buildSynthese(audit, content, opts.score)}
${buildFindings(content)}
${buildCompetitors(audit, content)}
${buildAnnex(audit)}
</body>
</html>`;
}
