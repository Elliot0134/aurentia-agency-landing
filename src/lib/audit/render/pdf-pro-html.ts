import { toString as qrToString } from 'qrcode';
import type { AuditData, CompetitorSummary, Measurement, ModuleId } from '../types';
import { localSeoBreakdown } from '../local-seo';
import { BANNER_DATA_URI } from './banner-asset';
import type { Finding, ReportContent } from './report-schema';
import { COLORS, statusColor } from './theme';

/* ----------------------------------------------------------------------------
 * Interface du module
 * ------------------------------------------------------------------------- */

/** Constat visuel (capture annotée + légende), fourni par la tâche B5. */
export interface ProVisualFinding {
  title: string;
  imageDataUri: string;
  legend: string[];
  analysis: string;
  /** Orientation de la capture : mobile → affichage étroit centré (~300px). Défaut : desktop. */
  kind?: 'desktop' | 'mobile';
}

export interface ProReportOptions {
  score: number;
  /** Charts SVG inline (tâche A2). Absents → emplacements omis, jamais de trou. */
  charts?: { radar?: string; funnel?: string; scoreTarget?: string; heatmap?: string };
  /** Constats visuels (tâche B5). Absents → section omise. */
  visuals?: ProVisualFinding[];
}

export type ProPriority = 'Critique' | 'Important' | 'À optimiser';

/** Badge affichable : les 3 priorités + "Maintenir" (axe déjà au niveau cible). */
export type ProBadge = ProPriority | 'Maintenir';

/**
 * Forme acceptée en entrée pour la priorité : le schéma LLM (report-schema)
 * produit la forme accentuée, mais on tolère "A optimiser" sans accent.
 * Le badge affiché reste TOUJOURS "À optimiser".
 */
export type ProPriorityInput = ProBadge | 'A optimiser';

export interface ProAuditTableRow {
  category: string;
  domain: string;
  finding: string;
  impact: string;
  priority: ProPriorityInput;
}

export interface ProRecommendation {
  title: string;
  action: string;
  expectedImpact: string;
}

export interface ProStrategicRecommendation {
  title: string;
  rationale: string;
}

/**
 * Type élargi local consommé par le template. Le contenu Pro rédigé par le LLM
 * (`ProReportContent` de report-schema, tâche A3) y est structurellement
 * assignable : champs requis côté LLM, optionnels ici car le template garde un
 * fallback complet construit depuis `audit.measurements` quand ils manquent.
 */
export type ProContent = ReportContent &
  Partial<{
    auditTable: ProAuditTableRow[];
    recommendations: ProRecommendation[];
    strategicRecommendations: ProStrategicRecommendation[];
    funnelAnalysis: string;
    funnelProjection: string;
    recommendationSummary: string;
    aiVisibilityAnalysis: string;
  }>;

/* ----------------------------------------------------------------------------
 * Constantes charte (le bleu marine de la référence devient terracotta/chaud)
 * ------------------------------------------------------------------------- */

const BANNER_BG = '#2b2017'; // sombre chaud de la marque (utilisé pour le QR code)
const TABLE_HEAD_BG = '#3d3929'; // en-têtes de tableau : sombre chaud

/** Lien de prise de rendez-vous (les <a href> restent cliquables dans le PDF Chromium). */
const CAL_URL = 'https://cal.com/elliot-estrade-ixfuya/appel-decouverte';

const BADGE = {
  Critique: { cls: 'badge-critique', fg: '#C62828', bg: '#FDECEA' },
  Important: { cls: 'badge-important', fg: '#B45309', bg: '#FEF3C7' },
  'À optimiser': { cls: 'badge-optimiser', fg: '#2E7D32', bg: '#E8F5E9' },
  // Gris neutre : l'axe est déjà au niveau cible, rien à corriger.
  Maintenir: { cls: 'badge-maintenir', fg: '#57534E', bg: '#F0EEEC' },
} as const;

const RECO_LABEL: Record<ReportContent['recommendation'], string> = {
  refonte: 'Refonte recommandée',
  optimisations: 'Optimisations ciblées recommandées',
  'bon-etat': 'Site en bon état',
};

/** Les 7 domaines d'audit, dans l'ordre des bandes du tableau. */
const CATEGORY_ORDER = [
  'VISIBILITÉ & GOOGLE',
  'SEO & CONTENU',
  'UX & MOBILE',
  'CONVERSION & FUNNEL',
  'PERFORMANCE & TECHNIQUE',
  'ACCESSIBILITÉ',
  'AI READINESS',
] as const;

/** Alias sans accent tolérés en entrée → forme canonique affichée. */
const CATEGORY_ALIASES: Record<string, string> = {
  'VISIBILITE & GOOGLE': 'VISIBILITÉ & GOOGLE',
  ACCESSIBILITE: 'ACCESSIBILITÉ',
};

const CATEGORY_DISPLAY: Record<string, string> = {
  'VISIBILITÉ & GOOGLE': 'Visibilité & Google',
  'SEO & CONTENU': 'SEO & Contenu',
  'UX & MOBILE': 'UX & Mobile',
  'CONVERSION & FUNNEL': 'Conversion & Funnel',
  'PERFORMANCE & TECHNIQUE': 'Performance & Technique',
  'ACCESSIBILITÉ': 'Accessibilité',
  'AI READINESS': 'AI Readiness',
};

const MODULE_CATEGORY: Record<ModuleId, string> = {
  business: 'VISIBILITÉ & GOOGLE',
  'local-seo': 'VISIBILITÉ & GOOGLE',
  competitors: 'VISIBILITÉ & GOOGLE',
  'seo-onpage': 'SEO & CONTENU',
  'seo-tech': 'SEO & CONTENU',
  mobile: 'UX & MOBILE',
  impact: 'CONVERSION & FUNNEL',
  perf: 'PERFORMANCE & TECHNIQUE',
  images: 'PERFORMANCE & TECHNIQUE',
  a11y: 'ACCESSIBILITÉ',
  'ai-readiness': 'AI READINESS',
};

const MODULE_DOMAIN: Record<ModuleId, string> = {
  business: 'Visibilité',
  'local-seo': 'Visibilité locale',
  competitors: 'Concurrence',
  'seo-onpage': 'SEO on-page',
  'seo-tech': 'SEO technique',
  mobile: 'Mobile',
  impact: 'Conversion',
  perf: 'Performance',
  images: 'Images',
  a11y: 'Accessibilité',
  'ai-readiness': 'AI Readiness',
};

/* ----------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------- */

/** Neutralise les tirets longs (interdits partout dans les livrables prospects). */
function stripLongDashes(s: string): string {
  return s.replace(/\s*—\s*/g, ', ').replace(/–/g, '-');
}

/** Échappe l'input (texte LLM ou mesuré) avant injection dans le HTML. */
function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}

/** Sanitize + escape : passage obligatoire de tout texte dynamique. */
function esc(s: string): string {
  return escapeHtml(stripLongDashes(s));
}

/** Formate un nombre à la française (virgule décimale). */
function formatNumberFr(value: number): string {
  return value.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
}

/** Couleur de score color-codée (rouge/orange/vert) selon le seuil. */
function scoreColor(score: number): string {
  if (score < 50) return COLORS.bad;
  if (score < 70) return COLORS.mid;
  return COLORS.good;
}

/** Clés de secteur internes → libellé humain affiché dans le PDF. */
const SECTOR_LABELS: Record<string, string> = {
  'saas-b2b': 'SaaS / B2B',
  'service-pro': 'Services professionnels',
  conciergerie: 'Conciergerie',
  artisan: 'Artisanat',
  restaurant: 'Restauration',
  ecommerce: 'E-commerce',
  default: 'Multi-secteurs',
};

/** Libellé humain du secteur ; fallback : clé capitalisée. */
function sectorLabel(sector: string): string {
  return SECTOR_LABELS[sector] ?? sector.charAt(0).toUpperCase() + sector.slice(1);
}

/** "avignon" → "Avignon", "aix-en-provence" → "Aix-En-Provence" (majuscule après espace et tiret). */
function cityLabel(city: string): string {
  return city.replace(/(^|[\s-])(\p{L})/gu, (_m, sep: string, ch: string) => sep + ch.toUpperCase());
}

/** Extrait le nom de domaine de l'URL finale. */
function domainOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function measurementValue(value: Measurement['value'], unit?: string): string {
  if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
  if (value === null) return 'n.d.';
  if (typeof value === 'number') {
    const u = unit ?? '';
    return u.startsWith('/')
      ? `${formatNumberFr(value)}${u}`
      : `${formatNumberFr(value)}${u ? ` ${escapeHtml(u)}` : ''}`;
  }
  return esc(String(value));
}

/** Catégorie d'une mesure : préfixe d'id prioritaire, sinon module. */
function categoryOf(m: Measurement): string {
  if (m.id.startsWith('a11y.')) return 'ACCESSIBILITÉ';
  if (m.id.startsWith('ai.')) return 'AI READINESS';
  if (m.id.startsWith('local.')) return 'VISIBILITÉ & GOOGLE';
  return MODULE_CATEGORY[m.module];
}

function domainLabelOf(m: Measurement): string {
  if (m.id.startsWith('a11y.')) return 'Accessibilité';
  if (m.id.startsWith('ai.')) return 'AI Readiness';
  if (m.id.startsWith('local.')) return 'Visibilité locale';
  return MODULE_DOMAIN[m.module];
}

/** Normalise la priorité d'entrée ("A optimiser" toléré) vers la forme affichée. */
function normalizePriority(priority: ProPriorityInput): ProBadge {
  return priority === 'A optimiser' ? 'À optimiser' : priority;
}

function badgeHtml(priority: ProPriorityInput): string {
  const p = normalizePriority(priority);
  const b = BADGE[p];
  return `<span class="badge ${b.cls}">${esc(p)}</span>`;
}

function chartHtml(svg: string | undefined): string {
  return svg ? `<div class="chart">${svg}</div>` : '';
}

/* ----------------------------------------------------------------------------
 * CSS (porté de CSS_TEMPLATE de generate_pdf.py, recoloré terracotta)
 * ------------------------------------------------------------------------- */

function styleBlock(): string {
  const C = COLORS;
  return `
/* Footer : rendu UNIQUEMENT par le footer natif Chromium (render-pdf.ts).
   Pas de margin boxes @bottom-* ici, sinon footer doublé sur chaque page. */
@page {
  size: A4;
  margin: 20mm 18mm 20mm 18mm;
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

/* --- Bannière image de marque (cover + back cover) : insérée DANS les marges
   de page (jamais collée aux bords), centrée, coins arrondis. --- */
.cover-banner {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 10pt;
  margin: 0 auto 8mm;
}

/* --- Cover (composition centrée, comme la référence) --- */
.cover-page {
  page-break-after: always;
}
.cover-tagline {
  text-align: center;
  font-size: 12pt;
  color: ${C.text};
  padding-bottom: 6pt;
  border-bottom: 1px solid ${C.border};
}
.cover-contact {
  text-align: center;
  font-size: 9pt;
  color: ${C.muted};
  margin-top: 5pt;
}
.cover-title {
  text-align: center;
  font-size: 30pt;
  font-weight: 800;
  letter-spacing: 1pt;
  line-height: 1.1;
  color: ${C.text};
  margin: 12mm 0 6pt;
}
.cover-subtitle {
  text-align: center;
  font-size: 15pt;
  font-weight: 700;
  color: ${C.accent};
  margin: 0 0 6pt 0;
}
.cover-domains {
  text-align: center;
  font-style: italic;
  font-size: 10pt;
  color: ${C.muted};
}
.cover-rule {
  border: none;
  border-bottom: 1px solid ${C.border};
  margin: 10pt 0 12pt;
}
.cover-boxes {
  display: flex;
  gap: 8mm;
}
.cover-box {
  flex: 1;
  background: ${C.tintBg};
  border: 1px solid ${C.tintBorder};
  border-radius: 6pt;
  padding: 10pt 12pt;
}
.cover-box .box-label {
  font-size: 8.5pt;
  font-weight: 700;
  letter-spacing: 1.5pt;
  color: ${C.accent};
  margin-bottom: 6pt;
}
.cover-box .box-row { font-size: 10pt; margin: 3pt 0; }
.cover-box .box-row .k { color: ${C.muted}; }
.exec-title {
  font-size: 13pt;
  font-weight: 700;
  letter-spacing: 1.2pt;
  color: ${C.accent};
  border-bottom: 2px solid ${C.accent};
  padding-bottom: 4pt;
  margin: 14pt 0 8pt;
}
.exec-text { text-align: justify; }

/* --- Sections --- */
.section { page-break-after: always; }
.section.compact { page-break-after: avoid; }

.score-block {
  display: flex;
  gap: 16pt;
  align-items: center;
  margin: 12pt 0;
}
/* Colonne gauche étroite (score + impact), radar large à droite. */
.score-left { flex: 0 0 38%; }
.score-right { flex: 0 0 62%; }
.score-right .chart { margin: 0 auto; }
.score-right .chart svg { width: 440px; max-width: 100%; height: auto; }
.score-big {
  font-size: 64pt;
  font-weight: 800;
  line-height: 1;
}
.score-meta { color: ${C.muted}; font-size: 10pt; }
.lead { font-size: 12pt; line-height: 1.6; }

.impact-line {
  font-size: 12pt;
  font-weight: 700;
  color: ${C.accent};
  margin: 12pt 0 0;
}
.impact-value {
  font-size: 11pt;
  font-weight: 700;
  color: ${C.accent};
  margin: 2pt 0 4pt;
}
.impact-value .impact-pct {
  font-size: 24pt;
  line-height: 1.1;
}

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

.reco-box {
  margin-top: 20pt;
  padding: 14pt 18pt;
  background: ${C.tintBg};
  border-left: 4px solid ${C.accent};
  page-break-inside: avoid;
}

/* --- Tableaux --- */
table { width: 100%; border-collapse: collapse; margin: 10pt 0; font-size: 10pt; }
th { background: ${TABLE_HEAD_BG}; color: white; padding: 6pt 8pt; text-align: left; font-weight: 600; }
td { padding: 5pt 8pt; border-bottom: 1px solid ${C.border}; vertical-align: top; }
tr:nth-child(even) td { background: ${C.surface}; }

td.you-cell { font-weight: 700; }
td.bad-cell { background: ${BADGE.Critique.bg} !important; color: ${BADGE.Critique.fg}; }
td.good-cell { background: ${BADGE['À optimiser'].bg} !important; color: ${BADGE['À optimiser'].fg}; }
td.standard-cell { color: ${C.muted}; }
.table-note { font-size: 9pt; color: ${C.muted}; margin: 2pt 0 8pt; }
td.cat-band {
  background: ${C.tintBg} !important;
  color: ${C.accentDark};
  font-weight: 700;
  font-size: 9pt;
  letter-spacing: 1.2pt;
  border-bottom: 1px solid ${C.tintBorder};
}
td.impact-cell { color: ${C.dim}; font-style: italic; font-size: 9pt; }
td.note-now { color: ${C.bad}; font-weight: 700; }
td.note-target { color: ${C.good}; font-weight: 700; }
td.rec-id { background: ${TABLE_HEAD_BG} !important; color: #ffffff; font-weight: 700; text-align: center; width: 24pt; }

.badge {
  display: inline-block;
  font-size: 8.5pt;
  font-weight: 700;
  border-radius: 4pt;
  padding: 1pt 6pt;
  white-space: nowrap;
}
.badge-critique { color: ${BADGE.Critique.fg}; background: ${BADGE.Critique.bg}; }
.badge-important { color: ${BADGE.Important.fg}; background: ${BADGE.Important.bg}; }
.badge-optimiser { color: ${BADGE['À optimiser'].fg}; background: ${BADGE['À optimiser'].bg}; }
.badge-maintenir { color: ${BADGE.Maintenir.fg}; background: ${BADGE.Maintenir.bg}; }

.badges-legend { font-size: 9pt; color: ${C.muted}; margin: 6pt 0; }
.badges-legend .badge { margin-right: 6pt; }

/* --- Charts SVG inline --- */
.chart { margin: 12pt auto; text-align: center; }
.chart svg { max-width: 100%; height: auto; }

/* --- Captures annotées --- */
.visual-finding { margin: 14pt 0; page-break-inside: avoid; }
.visual-finding h3 { color: ${C.text}; break-after: avoid; }
.visual-finding img {
  display: block;
  margin: 8pt auto;
  max-width: 100%;
  max-height: 115mm;
  height: auto;
  border: 1px solid ${C.border};
  break-inside: avoid;
}
/* Capture mobile (portrait étroit) : largeur d'un téléphone, centrée. */
.visual-finding img.visual-mobile {
  max-width: 300px;
}
.annot-legend { list-style: none; padding: 0; margin: 6pt 0 10pt; }
.annot-legend li {
  position: relative;
  padding-left: 28pt;
  margin: 6pt 0;
  font-size: 10.5pt;
  line-height: 1.45;
  break-inside: avoid;
}
.annot-num {
  position: absolute;
  left: 0;
  top: 0.5pt;
  width: 19pt;
  height: 19pt;
  background: ${C.accent};
  color: #ffffff;
  border-radius: 50%;
  text-align: center;
  line-height: 19pt;
  font-weight: 700;
  font-size: 10pt;
}

/* --- Bloc score local (réutilisé par la section GEO/AEO) --- */
.local-score-block { display: flex; gap: 20pt; align-items: center; margin: 12pt 0; }
.local-score-big { font-size: 42pt; font-weight: 800; line-height: 1; }
.ai-dot {
  display: inline-block;
  width: 8pt;
  height: 8pt;
  border-radius: 50%;
  margin-right: 5pt;
  vertical-align: baseline;
}
.breakdown-table { width: 100%; }
.breakdown-table td.k { color: ${C.muted}; letter-spacing: 0.8pt; font-size: 9pt; font-weight: 600; }
.breakdown-table td.v { text-align: right; font-weight: 700; }
.tech-detail {
  color: ${C.dim};
  font-style: italic;
  font-size: 9pt;
  display: block;
  margin-top: 4pt;
}

/* --- Annexe --- */
.annex { font-size: 9.5pt; color: ${C.text}; }
.annex h3 { font-size: 11pt; }
.annex pre {
  background: ${C.surface};
  padding: 6pt 8pt;
  font-family: 'Courier New', monospace;
  font-size: 8.5pt;
  line-height: 1.5;
  white-space: pre-wrap;
  border-left: 3px solid ${C.accent};
}

/* --- Back cover --- */
.back-cover {
  page-break-before: always;
  display: flex;
  flex-direction: column;
  min-height: 230mm;
}
.back-cover-middle {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16pt;
  text-align: center;
}
.btn-contact {
  display: inline-block;
  background: ${C.accent};
  color: #ffffff;
  font-weight: 700;
  font-size: 12pt;
  padding: 9pt 22pt;
  border-radius: 6pt;
  text-decoration: none;
}
.btn-row { display: flex; gap: 12pt; justify-content: center; flex-wrap: wrap; }

/* --- Bloc appel à l'action (fin des recommandations) --- */
.cta-block {
  text-align: center;
  margin: 20pt 0 6pt;
  page-break-inside: avoid;
}
.cta-block p { margin: 0 0 8pt; color: ${C.muted}; }
.qr { width: 24mm; height: 24mm; margin: 0 auto; }
.qr svg { width: 100%; height: 100%; }
.back-contact { text-align: center; color: ${C.muted}; font-size: 10pt; line-height: 1.7; }
.back-contact .brand-name { color: ${C.text}; font-weight: 700; font-size: 11pt; }
`;
}

/* ----------------------------------------------------------------------------
 * Bannière de marque (image, comme la référence : centrée, coins arrondis,
 * insérée avec les marges de page)
 * ------------------------------------------------------------------------- */

function brandBanner(): string {
  return `<img src="${BANNER_DATA_URI}" alt="Aurentia.agency" class="cover-banner" />`;
}

/* ----------------------------------------------------------------------------
 * Cover
 * ------------------------------------------------------------------------- */

/** Domaines audités présents dans les mesures (affichés en italique sur la cover). */
function auditedDomains(audit: AuditData): string[] {
  const present = new Set(audit.measurements.map(categoryOf));
  return CATEGORY_ORDER.filter((c) => present.has(c)).map((c) => CATEGORY_DISPLAY[c]);
}

/**
 * Page 1 complète, comme la référence : bannière image → tagline centrée +
 * filet → ligne de contact → "RAPPORT D'AUDIT" → domaine en accent → domaines
 * audités en italique → filet → les deux boxes côte à côte → SYNTHÈSE
 * EXÉCUTIVE (execSummary justifié + impact estimé). Saut de page après.
 */
function buildCover(audit: AuditData, content: ProContent): string {
  const domain = domainOf(audit.finalUrl);
  const date = new Date(audit.collectedAt).toLocaleDateString('fr-FR');
  const domains = auditedDomains(audit).join(' · ');
  const pagesAnalyzed =
    audit.crawl !== null ? esc(String(audit.crawl.analyzedPages)) : "1 (page d'accueil)";

  const siteRows = [
    `<div class="box-row"><span class="k">Domaine :</span> <strong>${esc(domain)}</strong></div>`,
    audit.description !== null ? `<div class="box-row">${esc(audit.description)}</div>` : '',
    audit.business.sector !== null
      ? `<div class="box-row"><span class="k">Secteur :</span> ${esc(sectorLabel(audit.business.sector))}</div>`
      : '',
    audit.business.city !== null
      ? `<div class="box-row"><span class="k">Ville :</span> ${esc(cityLabel(audit.business.city))}</div>`
      : '',
  ].join('');

  const impactSentence =
    audit.impact !== null && audit.impact.headlinePercent > 0
      ? `Impact estimé : ~${formatNumberFr(audit.impact.headlinePercent)}% de visiteurs perdus (détail et hypothèses en annexe). Le diagnostic complet et les corrections recommandées suivent.`
      : 'Le diagnostic complet et les corrections recommandées suivent.';

  return `
  <div class="cover-page" id="cover">
    ${brandBanner()}
    <div class="cover-tagline">Audit &amp; Recommandations Stratégiques</div>
    <div class="cover-contact">Aurentia Agency | contact@aurentia.fr</div>
    <h1 class="cover-title">RAPPORT D'AUDIT</h1>
    <div class="cover-subtitle">Site web ${esc(domain)}</div>
    <div class="cover-domains">${esc(domains)}</div>
    <hr class="cover-rule" />
    <div class="cover-boxes">
      <div class="cover-box">
        <div class="box-label">SITE AUDITÉ</div>
        ${siteRows}
      </div>
      <div class="cover-box">
        <div class="box-label">INFORMATIONS RAPPORT</div>
        <div class="box-row"><span class="k">Date :</span> ${esc(date)}</div>
        <div class="box-row"><span class="k">Pages analysées :</span> ${pagesAnalyzed}</div>
        <div class="box-row"><span class="k">Auditeur :</span> Elliot Estrade, Aurentia Agency</div>
      </div>
    </div>
    <div class="exec-title">SYNTHÈSE EXÉCUTIVE</div>
    <p class="exec-text">${esc(content.execSummary)}</p>
    <p class="exec-text">${impactSentence}</p>
  </div>`;
}

/* ----------------------------------------------------------------------------
 * Synthèse
 * ------------------------------------------------------------------------- */

const PRIORITY_RANK: Record<Finding['priority'], number> = { P0: 0, P1: 1, P2: 2 };

/**
 * Page Synthèse, comme la référence p2 : à gauche le gros score /100
 * color-codé avec l'impact estimé en accent dessous, à droite le radar.
 * Puis les priorités à pastilles et la box Recommandation. L'execSummary
 * n'est PAS répété ici : il vit en page 1 (SYNTHÈSE EXÉCUTIVE).
 */
function buildSynthese(audit: AuditData, content: ProContent, opts: ProReportOptions): string {
  const score = opts.score;
  const radar = opts.charts?.radar;

  const right = radar ? `<div class="score-right">${chartHtml(radar)}</div>` : '';

  // Deux lignes : libellé, puis le % en gros (accent) pour ne pas écraser le radar.
  const impactLine =
    audit.impact !== null && audit.impact.headlinePercent > 0
      ? `<p class="impact-line">Impact estimé :</p>
        <p class="impact-value"><span class="impact-pct">~${formatNumberFr(audit.impact.headlinePercent)}%</span> de visiteurs perdus</p>`
      : '';

  const top = [...content.findings]
    .sort((a, b) => PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority])
    .slice(0, 3);
  const prioritiesTitle = top.length === 1 ? '1 priorité identifiée' : `${top.length} priorités identifiées`;
  const prioritiesHtml = top
    .map((f) => `<li><strong>${esc(f.title)}</strong><br/>${esc(f.body)}</li>`)
    .join('');

  return `
  <section class="section" id="synthese">
    <h2>Synthèse</h2>
    <div class="score-block">
      <div class="score-left">
        <div class="score-big" style="color:${scoreColor(score)};">${score}</div>
        <div class="score-meta">/ 100</div>
        ${impactLine}
      </div>
      ${right}
    </div>
    <p class="score-meta">${esc(content.scoreJustification)}</p>

    <h3>${prioritiesTitle}</h3>
    <ol class="priority-list">${prioritiesHtml}</ol>

    <div class="reco-box">
      <strong>Recommandation :</strong> ${
        content.recommendationSummary
          ? esc(content.recommendationSummary)
          : `${esc(RECO_LABEL[content.recommendation])}.`
      }
    </div>
  </section>`;
}

/* ----------------------------------------------------------------------------
 * Comparatif concurrentiel
 * ------------------------------------------------------------------------- */

interface CompetitorCriterion {
  label: string;
  you: number | null;
  ofCompetitor: (c: CompetitorSummary) => number | null;
  format: (v: number) => string;
  isBad: (v: number) => boolean;
  /** Standard secteur affiché : référence FIXE et sourcée (seuils Google/Lighthouse). */
  standardLabel: string;
  meetsStandard: (v: number) => boolean;
  /** true si `a` est strictement meilleur que `b` pour ce critère. */
  betterThan: (a: number, b: number) => boolean;
}

function buildCompetitors(audit: AuditData, content: ReportContent): string {
  if (audit.competitors.length === 0) return '';

  const num = (id: string): number | null => {
    const m = audit.measurements.find((x) => x.id === id);
    return typeof m?.value === 'number' ? m.value : null;
  };

  // Les CompetitorSummary n'exposent que perfScoreMobile/seoScore/lcpMs : aucune
  // ligne additionnelle n'est inventée. La colonne "Standard secteur" sert de
  // référence fixe (seuils Lighthouse "bon" >= 90 ; LCP "bon" <= 2,5 s, Google CWV).
  const criteria: CompetitorCriterion[] = [
    {
      label: 'Performance mobile',
      you: num('perf.mobile.score'),
      ofCompetitor: (c) => c.perfScoreMobile,
      format: (v) => `${formatNumberFr(v)}/100`,
      isBad: (v) => v < 50,
      standardLabel: '≥ 90/100',
      meetsStandard: (v) => v >= 90,
      betterThan: (a, b) => a > b,
    },
    {
      label: 'SEO',
      you: num('perf.mobile.seo-score'),
      ofCompetitor: (c) => c.seoScore,
      format: (v) => `${formatNumberFr(v)}/100`,
      isBad: (v) => v < 70,
      standardLabel: '≥ 90/100',
      meetsStandard: (v) => v >= 90,
      betterThan: (a, b) => a > b,
    },
    {
      label: 'Affichage du contenu (LCP)',
      you: num('perf.mobile.lcp'),
      ofCompetitor: (c) => (c.lcpMs === null ? null : c.lcpMs / 1000),
      format: (v) => `${formatNumberFr(v)} s`,
      isBad: (v) => v > 4,
      standardLabel: '≤ 2,5 s',
      meetsStandard: (v) => v <= 2.5,
      betterThan: (a, b) => a < b,
    },
  ];

  const cell = (v: number | null, crit: CompetitorCriterion): string => {
    const attr = v !== null && crit.isBad(v) ? ' class="bad-cell"' : '';
    return `<td${attr}>${v === null ? 'n.d.' : crit.format(v)}</td>`;
  };

  // Colonne "Vous" color-codée : rouge si pire que TOUS les concurrents affichés
  // ou hors standard, vert si meilleur que tous ET dans le standard, sinon neutre.
  const youCell = (crit: CompetitorCriterion): string => {
    const v = crit.you;
    if (v === null) return '<td class="you-cell">n.d.</td>';
    const others = audit.competitors
      .map((c) => crit.ofCompetitor(c))
      .filter((x): x is number => x !== null);
    const inStandard = crit.meetsStandard(v);
    const worseThanAll = others.length > 0 && others.every((x) => crit.betterThan(x, v));
    const betterThanAll = others.length > 0 && others.every((x) => crit.betterThan(v, x));
    const tone = worseThanAll || !inStandard ? ' bad-cell' : betterThanAll && inStandard ? ' good-cell' : '';
    return `<td class="you-cell${tone}">${crit.format(v)}</td>`;
  };

  const rows = criteria
    .map(
      (crit) => `<tr>
        <td>${esc(crit.label)}</td>
        ${youCell(crit)}
        ${audit.competitors.map((c) => cell(crit.ofCompetitor(c), crit)).join('')}
        <td class="standard-cell">${esc(crit.standardLabel)}</td>
      </tr>`,
    )
    .join('');

  const n = audit.competitors.length;
  const note = `<p class="table-note">Lecture : vos valeurs comparées à ${n} concurrent${n > 1 ? 's' : ''} mesuré${n > 1 ? 's' : ''} le même jour et au standard attendu par Google.</p>`;

  const analysis = content.competitorAnalysis
    ? `<h3>Ce que les concurrents font mieux</h3><p>${esc(content.competitorAnalysis)}</p>`
    : '';

  return `
  <section class="section" id="competitors">
    <h2>Comparatif concurrentiel</h2>
    <table>
      <thead><tr>
        <th>Critère mesuré</th>
        <th>Vous</th>
        ${audit.competitors.map((c) => `<th>${esc(c.domain)}</th>`).join('')}
        <th>Standard secteur</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${note}
    ${analysis}
  </section>`;
}

/* ----------------------------------------------------------------------------
 * Tableau d'audit complet (bandes de catégorie + badges de priorité)
 * ------------------------------------------------------------------------- */

const STATUS_PRIORITY: Partial<Record<Measurement['status'], ProPriority>> = {
  fail: 'Critique',
  warn: 'Important',
  info: 'À optimiser',
};

/** Fallback : lignes du tableau d'audit construites depuis les mesures. */
function auditRowsFromMeasurements(audit: AuditData): ProAuditTableRow[] {
  return audit.measurements
    .filter((m) => m.status !== 'pass')
    .map((m) => ({
      category: categoryOf(m),
      domain: domainLabelOf(m),
      finding: `${m.label} : ${typeof m.value === 'boolean' ? (m.value ? 'oui' : 'non') : measurementValue(m.value, m.unit)}`,
      impact: m.details ?? m.proof ?? '',
      priority: STATUS_PRIORITY[m.status] as ProPriority,
    }));
}

function buildAuditTable(audit: AuditData, pro: ProContent): string {
  const rows = pro.auditTable && pro.auditTable.length > 0 ? pro.auditTable : auditRowsFromMeasurements(audit);
  if (rows.length === 0) return '';

  // Groupage par bande de catégorie : ordre canonique d'abord, inconnues ensuite.
  const byCategory = new Map<string, ProAuditTableRow[]>();
  for (const row of rows) {
    const upper = stripLongDashes(row.category).toUpperCase();
    const key = CATEGORY_ALIASES[upper] ?? upper;
    const list = byCategory.get(key) ?? [];
    list.push(row);
    byCategory.set(key, list);
  }
  const orderedKeys = [
    ...CATEGORY_ORDER.filter((c) => byCategory.has(c)),
    ...[...byCategory.keys()].filter((k) => !(CATEGORY_ORDER as readonly string[]).includes(k)),
  ];

  const bodyHtml = orderedKeys
    .map((key) => {
      const band = `<tr><td class="cat-band" colspan="4">${escapeHtml(key)}</td></tr>`;
      const lines = (byCategory.get(key) ?? [])
        .map(
          (r) => `<tr>
            <td>${esc(r.domain)}</td>
            <td>${esc(r.finding)}</td>
            <td class="impact-cell">${esc(r.impact)}</td>
            <td>${badgeHtml(r.priority)}</td>
          </tr>`,
        )
        .join('');
      return band + lines;
    })
    .join('');

  return `
  <section class="section" id="audit-table">
    <h2>Tableau d'audit complet</h2>
    <p class="badges-legend">
      Priorités :
      ${badgeHtml('Critique')} à corriger en premier
      ${badgeHtml('Important')} à corriger ensuite
      ${badgeHtml('À optimiser')} amélioration continue
    </p>
    <table>
      <thead><tr><th>Domaine</th><th>Constat</th><th>Impact</th><th>Priorité</th></tr></thead>
      <tbody>${bodyHtml}</tbody>
    </table>
  </section>`;
}

/* ----------------------------------------------------------------------------
 * Constats visuels
 * ------------------------------------------------------------------------- */

function buildVisuals(visuals: ProVisualFinding[] | undefined): string {
  if (!visuals || visuals.length === 0) return '';
  const blocks = visuals
    .map((v) => {
      const legend = v.legend.length
        ? `<ul class="annot-legend">${v.legend
            .map((note, i) => `<li><span class="annot-num">${i + 1}</span>${esc(note)}</li>`)
            .join('')}</ul>`
        : '';
      const mobileCls = v.kind === 'mobile' ? ' class="visual-mobile"' : '';
      return `
      <div class="visual-finding">
        <h3>${esc(v.title)}</h3>
        <img${mobileCls} src="${escapeHtml(v.imageDataUri)}" alt="${esc(v.title)}" />
        ${legend}
        <p>${esc(v.analysis)}</p>
      </div>`;
    })
    .join('');

  return `
  <section class="section" id="visuals">
    <h2>Constats visuels : ce que vivent vos visiteurs</h2>
    ${blocks}
  </section>`;
}

/* ----------------------------------------------------------------------------
 * Local SEO (conditionnel : business local)
 * ------------------------------------------------------------------------- */

function buildLocalSeo(audit: AuditData): string {
  if (audit.business.type !== 'local') return '';

  const { total, max, rows } = localSeoBreakdown(audit.measurements);

  const rowsHtml = rows
    .map((r) =>
      r.measured
        ? `<tr><td class="k">${esc(r.label)}</td><td class="v">${r.score} / ${r.max}</td></tr>`
        : `<tr><td class="k">${esc(r.label)}</td><td class="v"><span style="color:${COLORS.muted};">à vérifier</span></td></tr>`,
    )
    .join('');

  const scoreHtml =
    max > 0
      ? `<div class="local-score-big" style="color:${scoreColor(Math.round((total / max) * 100))};">${total} / ${max}</div>
         <div class="score-meta">Score local (mesurable) : ${total}/${max}</div>`
      : `<div class="local-score-big" style="color:${COLORS.muted};">n.d.</div>
         <div class="score-meta">Score local (mesurable)</div>`;

  const sector = audit.business.sector;
  const city = audit.business.city;
  const intro = `Section spécifique : votre activité${sector !== null ? ` (${esc(sectorLabel(sector))})` : ''} est détectée comme locale${
    city !== null ? `, à ${esc(cityLabel(city))}` : ''
  }. GBP, avis et citations sont vérifiés pendant la relecture.`;

  return `
  <section class="section" id="local-seo">
    <h2>Local SEO : visibilité locale et pack Maps</h2>
    <p>${intro}</p>
    <div class="local-score-block">
      <div>${scoreHtml}</div>
      <div style="flex:1;"><table class="breakdown-table"><tbody>${rowsHtml}</tbody></table></div>
    </div>
    <h3>Ce qui est mesuré, ce qui reste à vérifier</h3>
    <p>Les lignes chiffrées ci-dessus proviennent de mesures effectuées sur votre site
    (on-page, données structurées, coordonnées). Les critères externes (fiche Google Business
    Profile, avis, citations) ne sont pas mesurables automatiquement : ils sont contrôlés lors
    de la relecture du rapport, jamais notés à l'aveugle.
    <span class="tech-detail">Critères mesurés : ON PAGE /20 · SCHEMA /20 · NAP /15. À vérifier en relecture : GBP, CITATIONS, REVIEWS.</span></p>
  </section>`;
}

/* ----------------------------------------------------------------------------
 * Visibilité dans les recherches IA (GEO / AEO) : section dédiée, présente
 * pour TOUT site pro (pas conditionnelle au type local).
 * ------------------------------------------------------------------------- */

/** Libellés courts du breakdown GEO/AEO, dans l'ordre d'affichage. */
const AI_BREAKDOWN_LABELS: readonly { id: string; label: string }[] = [
  { id: 'ai.llms-txt', label: 'llms.txt' },
  { id: 'ai.robots.ai-agents', label: 'Accès des crawlers IA' },
  { id: 'ai.schema.richness', label: 'Données structurées' },
  { id: 'ai.schema.sameas', label: 'Profils reliés (sameAs)' },
  { id: 'ai.citability', label: 'Passages citables' },
  { id: 'ai.mentions.external', label: 'Mentions externes' },
  { id: 'ai.faq.schema', label: 'Balisage FAQ' },
  { id: 'ai.headings.questions', label: 'Titres en question' },
] as const;

const AI_STATUS_LABELS: Record<Measurement['status'], string> = {
  pass: 'OK',
  warn: 'À améliorer',
  fail: 'Manquant',
  info: 'À vérifier',
};

const AI_INTRO =
  'De plus en plus de clients trouvent leurs prestataires via ChatGPT, Perplexity ou les ' +
  'réponses IA de Google. Le GEO (Generative Engine Optimization) mesure la capacité de ' +
  'votre site à être compris et cité par ces moteurs ; l\'AEO (Answer Engine Optimization) ' +
  'sa capacité à répondre aux questions que vos clients posent.';

/**
 * Section GEO/AEO : intro pédagogique, score « X / N » calculé du pass-rate des
 * mesures ai-readiness (pass = 1, warn = 0,5, info exclues), breakdown des
 * checks ai.* avec pastille color-codée, puis analyse rédigée par le LLM
 * (aiVisibilityAnalysis). Aucune mesure ai-readiness → section omise (pas de trou).
 */
function buildAiVisibility(audit: AuditData, pro: ProContent): string {
  const ms = audit.measurements.filter((m) => m.module === 'ai-readiness');
  if (ms.length === 0) return '';

  const scored = ms.filter((m) => m.status !== 'info');
  const points = scored.reduce(
    (acc, m) => acc + (m.status === 'pass' ? 1 : m.status === 'warn' ? 0.5 : 0),
    0,
  );
  const max = scored.length;

  const scoreHtml =
    max > 0
      ? `<div class="local-score-big" style="color:${scoreColor(Math.round((points / max) * 100))};">${formatNumberFr(points)} / ${max}</div>
         <div class="score-meta">Score de visibilité IA (mesurable)</div>`
      : `<div class="local-score-big" style="color:${COLORS.muted};">n.d.</div>
         <div class="score-meta">Score de visibilité IA</div>`;

  const rowsHtml = AI_BREAKDOWN_LABELS.flatMap(({ id, label }) => {
    const m = ms.find((x) => x.id === id);
    if (!m) return [];
    const color = statusColor(m.status);
    return [
      `<tr>
        <td class="k">${esc(label)}</td>
        <td><span class="ai-dot" style="background:${color};"></span><span style="color:${color}; font-weight:700;">${esc(AI_STATUS_LABELS[m.status])}</span></td>
        <td class="v">${measurementValue(m.value, m.unit)}</td>
      </tr>`,
    ];
  }).join('');

  const analysis = pro.aiVisibilityAnalysis
    ? `<h3>Analyse</h3><p>${esc(pro.aiVisibilityAnalysis)}</p>`
    : '';

  return `
  <section class="section" id="ai-visibility">
    <h2>Visibilité dans les recherches IA (GEO / AEO)</h2>
    <p>${AI_INTRO}</p>
    <div class="local-score-block">
      <div>${scoreHtml}</div>
      <div style="flex:1;"><table class="breakdown-table"><tbody>${rowsHtml}</tbody></table></div>
    </div>
    ${analysis}
  </section>`;
}

/* ----------------------------------------------------------------------------
 * Funnel
 * ------------------------------------------------------------------------- */

function buildFunnel(pro: ProContent, opts: ProReportOptions): string {
  const chart = opts.charts?.funnel;
  if (!chart && !pro.funnelAnalysis && !pro.funnelProjection) return '';

  const analysis = pro.funnelAnalysis ? `<h3>Analyse</h3><p>${esc(pro.funnelAnalysis)}</p>` : '';
  const projection = pro.funnelProjection
    ? `<h3>Projection post-refonte</h3><p>${esc(pro.funnelProjection)}</p>`
    : '';

  return `
  <section class="section" id="funnel">
    <h2>Funnel : où partent vos visiteurs</h2>
    ${chartHtml(chart)}
    ${analysis}
    ${projection}
  </section>`;
}

/* ----------------------------------------------------------------------------
 * État actuel vs cible
 * ------------------------------------------------------------------------- */

interface AxisScore {
  label: string;
  note: number; // /10
}

/** Note /10 par domaine d'audit, calculée depuis le taux de réussite des mesures. */
function axisScores(audit: AuditData): AxisScore[] {
  return CATEGORY_ORDER.flatMap((cat) => {
    const ms = audit.measurements.filter((m) => categoryOf(m) === cat && m.status !== 'info');
    if (ms.length === 0) return [];
    const passRate = ms.filter((m) => m.status === 'pass').length / ms.length;
    return [{ label: CATEGORY_DISPLAY[cat], note: Math.round(passRate * 100) / 10 }];
  });
}

function buildScoreTarget(audit: AuditData, opts: ProReportOptions): string {
  const axes = axisScores(audit);
  if (axes.length === 0) return '';

  const rows = axes
    .map((a) => {
      const baseTarget = a.note >= 8 ? 9 : 8;
      // Axe déjà au niveau cible : cible >= actuel (jamais en dessous) et badge neutre.
      const maintain = a.note >= baseTarget;
      const target = maintain ? Math.max(baseTarget, Math.ceil(a.note)) : baseTarget;
      const badge: ProBadge = maintain
        ? 'Maintenir'
        : a.note < 4
          ? 'Critique'
          : a.note < 7
            ? 'Important'
            : 'À optimiser';
      return `<tr>
        <td>${esc(a.label)}</td>
        <td class="note-now">${formatNumberFr(a.note)}/10</td>
        <td class="note-target">${target}/10</td>
        <td>${badgeHtml(badge)}</td>
      </tr>`;
    })
    .join('');

  return `
  <section class="section" id="score-target">
    <h2>État actuel vs cible</h2>
    ${chartHtml(opts.charts?.scoreTarget)}
    <table>
      <thead><tr><th>Axe</th><th>Note actuelle</th><th>Objectif</th><th>Priorité</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </section>`;
}

/* ----------------------------------------------------------------------------
 * Recommandations prioritaires
 * ------------------------------------------------------------------------- */

/** Fallback : recommandations construites depuis les findings P0/P1. */
function recommendationsFromFindings(audit: AuditData, content: ReportContent): ProRecommendation[] {
  const labelOf = (id: string): string | null =>
    audit.measurements.find((m) => m.id === id)?.label ?? null;
  return content.findings
    .filter((f) => f.priority === 'P0' || f.priority === 'P1')
    .map((f) => {
      const labels = f.measurementIds.map(labelOf).filter((l): l is string => l !== null);
      return {
        title: f.title,
        action: f.body,
        expectedImpact: labels.length > 0 ? `Améliore : ${labels.join(', ')}` : '',
      };
    });
}

function buildRecommendations(audit: AuditData, pro: ProContent): string {
  const recs =
    pro.recommendations && pro.recommendations.length > 0
      ? pro.recommendations
      : recommendationsFromFindings(audit, pro);
  if (recs.length === 0) return '';

  const rows = recs
    .map(
      (r, i) => `<tr>
        <td class="rec-id">R${i + 1}</td>
        <td><strong>${esc(r.title)}</strong></td>
        <td>${esc(r.action)}</td>
        <td class="impact-cell">${esc(r.expectedImpact)}</td>
      </tr>`,
    )
    .join('');

  return `
  <section class="section" id="recommendations">
    <h2>Recommandations prioritaires</h2>
    <p>Les recommandations découlent directement des constats de l'audit. Le devis chiffré est transmis séparément.</p>
    <table>
      <thead><tr><th>#</th><th>Recommandation</th><th>Action concrète</th><th>Impact attendu</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    ${buildStrategicRecommendations(pro)}
    <div class="cta-block">
      <p>Envie d'en discuter ? 15 minutes suffisent.</p>
      <a class="btn-contact" href="${CAL_URL}">Réserver mon appel découverte</a>
    </div>
  </section>`;
}

/**
 * Recommandations stratégiques (vision 6-12 mois) : axes de fond rédigés par
 * le LLM (positionnement, contenu, présence locale, visibilité sur les
 * nouveaux moteurs de recherche, réputation), par opposition aux correctifs
 * techniques R1..Rn. Absentes → bloc omis, jamais de trou.
 */
function buildStrategicRecommendations(pro: ProContent): string {
  const recs = pro.strategicRecommendations;
  if (!recs || recs.length === 0) return '';
  const blocks = recs
    .map((r) => `<h3>${esc(r.title)}</h3><p>${esc(r.rationale)}</p>`)
    .join('');
  return `
    <div id="strategic-recommendations">
      <h2>Recommandations stratégiques</h2>
      <p>Au-delà des correctifs techniques, ces axes de fond construisent votre visibilité sur 6 à 12 mois.</p>
      ${blocks}
    </div>`;
}

/* ----------------------------------------------------------------------------
 * Annexe technique
 * ------------------------------------------------------------------------- */

const ANNEX_GROUPS: { title: string; match: (m: Measurement) => boolean }[] = [
  { title: 'SEO technique', match: (m) => m.module === 'seo-tech' || m.module === 'seo-onpage' },
  { title: 'Performance', match: (m) => m.module === 'perf' || m.module === 'images' },
  { title: 'Accessibilité (axe-core, WCAG 2.2 AA)', match: (m) => m.module === 'a11y' || m.id.startsWith('a11y.') },
  { title: 'AI Readiness', match: (m) => m.module === 'ai-readiness' || m.id.startsWith('ai.') },
  {
    title: 'Conversion / stack',
    match: (m) =>
      !m.id.startsWith('a11y.') &&
      (m.module === 'mobile' || m.module === 'business' || m.module === 'competitors' || m.module === 'impact'),
  },
];

function annexLine(m: Measurement): string {
  const value =
    typeof m.value === 'boolean' ? (m.value ? 'oui' : 'non') : m.value === null ? 'n.d.' : String(m.value);
  const unit = m.unit ?? '';
  const extra = [m.proof, m.details].filter((x): x is string => Boolean(x)).join(' · ');
  return stripLongDashes(
    `[${m.status.toUpperCase()}] ${m.id}  ${m.label} = ${value}${unit ? ` ${unit}` : ''}${extra ? `  (${extra})` : ''}`,
  );
}

function buildAnnex(audit: AuditData, opts: ProReportOptions): string {
  const date = new Date(audit.collectedAt).toLocaleDateString('fr-FR');

  const blocks = ANNEX_GROUPS.map((g) => {
    const ms = audit.measurements.filter(g.match);
    if (ms.length === 0) return '';
    const lines = ms.map((m) => escapeHtml(annexLine(m))).join('\n');
    return `<h3>${escapeHtml(g.title)}</h3><pre>${lines}</pre>`;
  }).join('');

  const sources =
    audit.impact !== null
      ? `<h3>Sources des estimations</h3>
    <ul>
      ${audit.impact.items.map((it) => `<li><strong>${esc(it.label)}</strong> (~${formatNumberFr(it.lossPercent)}% de visiteurs perdus) : ${esc(it.basis)}</li>`).join('')}
    </ul>
    <p class="tech-detail">Hypothèses : ${audit.impact.assumptions.map(esc).join(' · ')}</p>`
      : '';

  return `
  <section class="section annex" id="annex">
    <h2>Annexe technique</h2>
    ${chartHtml(opts.charts?.heatmap)}
    <h3>Méthodologie &amp; outils</h3>
    <p>Mesures collectées le ${esc(date)} via Google PageSpeed Insights (Lighthouse),
    analyse du code HTML des pages, capture d'écran navigateur et comparaison concurrentielle.
    Chaque constat du rapport référence une mesure listée ci-dessous : un développeur peut
    reproduire et vérifier chacune d'elles.</p>
    ${blocks}
    ${sources}
  </section>`;
}

/* ----------------------------------------------------------------------------
 * Back cover
 * ------------------------------------------------------------------------- */

function buildBackCover(qrSvg: string): string {
  return `
  <div class="back-cover" id="back-cover">
    ${brandBanner()}
    <div class="back-cover-middle">
      <p class="lead">Parlons de votre site.</p>
      <div class="btn-row">
        <a class="btn-contact" href="mailto:agency@aurentia.fr">Nous contacter</a>
        <a class="btn-contact" href="${CAL_URL}">Réserver mon appel découverte</a>
      </div>
      <div class="qr">${qrSvg}</div>
      <div class="back-contact">
        <div class="brand-name">Aurentia Agency</div>
        aurentia.agency<br/>
        contact@aurentia.fr
      </div>
    </div>
  </div>`;
}

/* ----------------------------------------------------------------------------
 * Assemblage
 * ------------------------------------------------------------------------- */

/**
 * Construit le HTML complet du rapport PDF Pro, porté fidèlement du template
 * de référence `generate_pdf.py` (PDF "La Voix des Vertus"), recoloré à la
 * charte terracotta Aurentia.agency. Async (génération offline du QR code),
 * aucun réseau.
 *
 * Sections fixes : cover page 1 complète (bannière image + composition centrée
 * + 2 boxes + synthèse exécutive), synthèse (score 64pt + impact % + priorités +
 * box recommandation), tableau d'audit complet (bandes de catégorie + badges),
 * état actuel vs cible, recommandations R1..Rn (+ recommandations stratégiques
 * 6-12 mois si rédigées, et bouton de prise de rendez-vous), annexe technique
 * (pre monospace), back cover (bannière image + boutons contact/rendez-vous + QR).
 * Sections conditionnelles : comparatif (si concurrents), constats visuels
 * (si opts.visuals), Local SEO (si business local), visibilité IA GEO/AEO
 * (tout site pro, dès qu'une mesure ai-readiness existe), funnel (si chart ou analyse).
 *
 * Règles : zéro tiret long (neutralisés même dans les données), zéro montant en
 * euros (impact en % uniquement), zéro prix/roadmap, texte dynamique échappé.
 */
export async function buildProReportHtml(
  audit: AuditData,
  content: ProContent,
  opts: ProReportOptions,
): Promise<string> {
  const pro: ProContent = content;
  const qrSvg = await qrToString('https://www.aurentia.agency', {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    color: { dark: BANNER_BG, light: '#ffffff' },
  });

  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <title>Audit Aurentia</title>
  <style>${styleBlock()}</style>
</head>
<body>
${buildCover(audit, content)}
${buildSynthese(audit, content, opts)}
${buildCompetitors(audit, content)}
${buildAuditTable(audit, pro)}
${buildVisuals(opts.visuals)}
${buildLocalSeo(audit)}
${buildAiVisibility(audit, pro)}
${buildFunnel(pro, opts)}
${buildScoreTarget(audit, opts)}
${buildRecommendations(audit, pro)}
${buildAnnex(audit, opts)}
${buildBackCover(qrSvg)}
</body>
</html>`;
}
