import type { AuditData, Measurement } from '../types';
import type { ReportContent } from './report-schema';
import { COLORS, statusColor } from './theme';

export interface FlashEmailOptions {
  screenshotUrl: string;
  ctaUrl: string;
  scoreGaugeUrl?: string;
  /** Lien de prise de rendez-vous (défaut : cal.com Elliot). */
  calUrl?: string;
  /** Lien d'achat de l'audit Pro (défaut : page de paiement Stripe). */
  proUrl?: string;
  /** URL du logo de l'en-tête (défaut : logo clair hébergé). */
  logoUrl?: string;
}

const DEFAULT_LOGO_URL = 'https://www.aurentia.agency/images/logo-aurentia-email.png';
const DEFAULT_CAL_URL = 'https://cal.com/elliot-estrade-ixfuya/appel-decouverte';
const DEFAULT_PRO_URL = 'https://buy.stripe.com/28E6oGaA43WGgL72Bf0x200';

/** Échappe l'input (texte LLM) avant injection dans le HTML du mail. */
function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}

/** Formate un nombre à la française (virgule décimale), sans tiret long. */
function formatFr(value: number): string {
  return value.toLocaleString('fr-FR', { maximumFractionDigits: 2 });
}

/**
 * Affiche la valeur d'une mesure avec son unité (ex `11,8 s`, `32/100`).
 * Les valeurs viennent TOUJOURS de la mesure, jamais du texte LLM.
 */
function formatMeasurement(m: Measurement): string {
  const unit = m.unit ?? '';
  if (typeof m.value === 'number') {
    // unité "/100" se colle ; les autres unités sont précédées d'une espace.
    return unit.startsWith('/') ? `${formatFr(m.value)}${unit}` : `${formatFr(m.value)}${unit ? ` ${unit}` : ''}`;
  }
  if (typeof m.value === 'boolean') return m.value ? 'Oui' : 'Non';
  return m.value === null ? '' : escapeHtml(String(m.value));
}

/** Valeur "recommandée" par mesure, libellé fixe (pas de chiffre inventé). */
const RECOMMENDED: Record<string, string> = {
  'perf.mobile.lcp': 'moins de 2,5 s',
  'perf.mobile.cls': 'moins de 0,10',
  'perf.mobile.score': '90/100',
};

/** Formate un score sur 100 (`32/100`) ou "n/d" si la valeur manque. */
function formatScore100(value: number | null): string {
  return value === null ? 'n/d' : `${value}/100`;
}

/**
 * Construit le tableau comparatif "Face à vos concurrents" (perf mobile + SEO).
 * Renvoie une chaîne vide si aucun concurrent n'a été trouvé.
 * Votre ligne tire ses valeurs des mesures `perf.mobile.score` / `perf.mobile.seo-score`.
 */
function buildCompetitorBlock(audit: AuditData): string {
  if (audit.competitors.length === 0) return '';
  const C = COLORS;

  const perfM = audit.measurements.find((m) => m.id === 'perf.mobile.score');
  const seoM = audit.measurements.find((m) => m.id === 'perf.mobile.seo-score');
  const cellYou = (m: Measurement | undefined): string => {
    if (!m || typeof m.value !== 'number') return 'n/d';
    const color = statusColor(m.status);
    return `<span style="color:${color};font-weight:bold;">${m.value}/100</span>`;
  };

  const youRow = `
              <tr>
                <td style="border:1px solid ${C.border};padding:8px 12px;font-weight:bold;color:${C.text};font-size:14px;">Votre site</td>
                <td style="border:1px solid ${C.border};padding:8px 12px;text-align:center;font-size:14px;">${cellYou(perfM)}</td>
                <td style="border:1px solid ${C.border};padding:8px 12px;text-align:center;font-size:14px;">${cellYou(seoM)}</td>
              </tr>`;

  const competitorRows = audit.competitors
    .slice(0, 3)
    .map(
      (c) => `
              <tr>
                <td style="border:1px solid ${C.border};padding:8px 12px;color:${C.text};font-size:14px;">${escapeHtml(c.domain)}</td>
                <td style="border:1px solid ${C.border};padding:8px 12px;text-align:center;color:${C.muted};font-size:14px;">${formatScore100(c.perfScoreMobile)}</td>
                <td style="border:1px solid ${C.border};padding:8px 12px;text-align:center;color:${C.muted};font-size:14px;">${formatScore100(c.seoScore)}</td>
              </tr>`,
    )
    .join('');

  return `
        <tr><td style="padding:16px 36px 4px;color:${C.text};font-size:16px;line-height:1.65;">
          <p style="margin:0;font-weight:bold;">Face à vos concurrents</p>
        </td></tr>
        <tr><td style="padding:8px 36px;">
          <table role="presentation" style="border-collapse:collapse;width:100%;margin:0;">
            <tr style="background:${C.surface};">
              <td style="border:1px solid ${C.border};padding:8px 12px;font-weight:bold;color:${C.text};font-size:14px;">Site</td>
              <td style="border:1px solid ${C.border};padding:8px 12px;font-weight:bold;text-align:center;color:${C.text};font-size:14px;">Performance mobile</td>
              <td style="border:1px solid ${C.border};padding:8px 12px;font-weight:bold;text-align:center;color:${C.text};font-size:14px;">SEO</td>
            </tr>${youRow}${competitorRows}
          </table>
        </td></tr>`;
}

/**
 * Construit le mail Flash HTML : structure du template de prospection
 * (intro, capture annotée, pastilles numérotées, constat mobile, tableau
 * métriques 3 colonnes, présentation agence, CTA, désinscription) habillée
 * à la charte orange Aurentia.agency. Fonction pure, aucun réseau.
 *
 * Règles : zéro tiret long, zéro mention IA, valeurs numériques injectées
 * depuis `audit.measurements` (jamais depuis le texte LLM).
 */
export function buildFlashEmailHtml(
  audit: AuditData,
  content: ReportContent,
  opts: FlashEmailOptions,
): string {
  const C = COLORS;
  const safeSummary = escapeHtml(content.execSummary);

  // Pastilles numérotées : une par annotation, avec le note (échappé).
  const annotationRows = audit.annotations
    .map((a, i) => {
      const n = i + 1;
      return `
              <tr>
                <td style="padding:6px 10px 6px 0;vertical-align:top;"><span style="display:inline-block;background:${C.bad};color:#ffffff;border-radius:50%;width:22px;height:22px;text-align:center;line-height:22px;font-weight:bold;font-size:13px;">${n}</span></td>
                <td style="padding:6px 0;vertical-align:middle;color:${C.text};font-size:15px;line-height:1.5;">${escapeHtml(a.note)}</td>
              </tr>`;
    })
    .join('');

  // Tableau métriques 3 colonnes, construit depuis les mesures perf.mobile.*.
  const perfMeasurements = audit.measurements.filter((m) => m.id.startsWith('perf.mobile.'));
  const metricRows = perfMeasurements
    .map((m) => {
      const color = statusColor(m.status);
      const recommended = RECOMMENDED[m.id] ?? '';
      return `
              <tr>
                <td style="border:1px solid ${C.border};padding:8px 12px;color:${C.text};font-size:14px;">${escapeHtml(m.label)}</td>
                <td style="border:1px solid ${C.border};padding:8px 12px;text-align:center;color:${color};font-weight:bold;font-size:14px;">${formatMeasurement(m)}</td>
                <td style="border:1px solid ${C.border};padding:8px 12px;text-align:center;color:${C.muted};font-size:14px;">${escapeHtml(recommended)}</td>
              </tr>`;
    })
    .join('');

  // Bloc concurrents : benchmark perf mobile + SEO face à 3 concurrents max.
  // Affiché seulement si des concurrents ont été trouvés. Valeurs depuis les
  // mesures (votre site) et les CompetitorSummary (concurrents).
  const competitorBlock = buildCompetitorBlock(audit);

  const safeCta = escapeHtml(opts.ctaUrl);
  const safeScreenshot = escapeHtml(opts.screenshotUrl);
  const safeCal = escapeHtml(opts.calUrl ?? DEFAULT_CAL_URL);
  const safePro = escapeHtml(opts.proUrl ?? DEFAULT_PRO_URL);

  // Encart "audit Pro à 99 €" : explique l'offre payante et propose deux CTA
  // (bouton primaire Pro + bouton secondaire prise de RDV).
  const proBlock = `
        <tr><td style="padding:8px 36px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.tintBg};border:1px solid ${C.tintBorder};border-radius:16px;">
            <tr><td style="padding:24px 24px 26px;">
              <div style="font-size:17px;font-weight:700;color:${C.text};margin-bottom:8px;">Vous voulez l'analyse complète ?</div>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:${C.muted};">Ce pré-audit ne couvre que votre page d'accueil. L'audit Pro à 99 € HT passe TOUT votre site au crible : SEO technique et contenu, performance détaillée, expérience utilisateur, accessibilité, votre visibilité sur les IA (ChatGPT, Perplexity), et un comparatif approfondi de vos concurrents. Vous recevez un PDF complet avec votre score détaillé et un plan d'action priorisé, relu par un humain et livré sous 24h.</p>
              <a href="${safePro}" style="display:inline-block;background:${C.accent};color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 26px;border-radius:12px;margin:0 0 12px;">Obtenir l'audit Pro (99 €)</a>
              <br>
              <a href="${safeCal}" style="display:inline-block;background:${C.card};color:${C.accent};font-size:16px;font-weight:600;text-decoration:none;padding:13px 25px;border-radius:12px;border:1px solid ${C.accent};">Prendre rendez-vous pour en parler</a>
            </td></tr>
          </table>
        </td></tr>`;

  const safeJustification = escapeHtml(content.scoreJustification);
  const gaugeBlock =
    opts.scoreGaugeUrl
      ? `
        <tr><td style="padding:8px 36px 0;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            <tr>
              <td style="width:180px;vertical-align:middle;text-align:center;padding-right:16px;">
                <img src="${escapeHtml(opts.scoreGaugeUrl)}" alt="Score global de votre site" width="160" style="height:auto;display:block;margin:0 auto;">
              </td>
              <td style="vertical-align:middle;">
                <div style="font-size:14px;font-weight:600;color:${C.muted};margin-bottom:6px;">Votre score global</div>
                <div style="font-size:15px;color:${C.text};line-height:1.55;">${safeJustification}</div>
              </td>
            </tr>
          </table>
        </td></tr>`
      : '';

  // Bloc impact : % de visiteurs perdus (jamais de montant €). Affiché seulement
  // si l'impact est calculé et significatif.
  const impactBlock =
    audit.impact && audit.impact.headlinePercent > 0
      ? `
        <tr><td style="padding:8px 36px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.tintBg};border:1px solid ${C.tintBorder};border-radius:16px;">
            <tr><td style="padding:18px 24px;color:${C.text};font-size:16px;line-height:1.6;">
              <strong>Environ ${formatFr(audit.impact.headlinePercent)}% de vos visiteurs partent avant de voir votre offre</strong>, à cause de la lenteur de chargement.
            </td></tr>
          </table>
        </td></tr>`
      : '';

  return `<!doctype html>
<html lang="fr">
<body style="margin:0;padding:0;background:${C.surface};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.surface};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${C.card};border:1px solid ${C.border};border-radius:20px;overflow:hidden;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        <!-- Header -->
        <tr><td style="padding:32px 36px 8px;">
          <div style="text-align:center;padding:8px 0 4px;">
            <img src="${escapeHtml(opts.logoUrl ?? DEFAULT_LOGO_URL)}" alt="Aurentia Agency" width="190" style="height:auto;display:inline-block;">
          </div>
          <div style="font-size:13px;color:${C.dim};margin-top:4px;text-align:center;">Sites web · automatisation</div>
        </td></tr>
        <!-- Intro -->
        <tr><td style="padding:16px 36px 8px;color:${C.text};font-size:16px;line-height:1.65;">
          <p style="margin:0 0 16px;">${safeSummary}</p>
          <p style="margin:0 0 16px;">J'ai noté directement sur une capture de votre page d'accueil ce qui freine un visiteur :</p>
        </td></tr>
        <!-- Cadran de score global -->
        ${gaugeBlock}
        <!-- Capture annotée -->
        <tr><td style="padding:8px 36px;">
          <img src="${safeScreenshot}" alt="Votre page d'accueil annotée" width="528" style="max-width:100%;height:auto;border:1px solid ${C.border};border-radius:10px;display:block;"/>
        </td></tr>
        <!-- Pastilles numérotées -->
        <tr><td style="padding:8px 36px;">
          <table role="presentation" style="border-collapse:collapse;margin:0;">${annotationRows}
          </table>
        </td></tr>
        <!-- Constat mobile (texte) -->
        <tr><td style="padding:8px 36px;color:${C.text};font-size:16px;line-height:1.65;">
          <p style="margin:0 0 16px;"><strong>Sur téléphone, c'est encore plus marqué.</strong> Le chargement est plus lent et la mise en page bouge pendant l'affichage, ce qui pousse vos visiteurs à repartir avant de voir votre offre.</p>
          <p style="margin:0 0 8px;"><strong>J'ai aussi passé votre page d'accueil dans nos outils de mesure</strong> (les mêmes critères que Google utilise pour classer les sites) :</p>
        </td></tr>
        <!-- Tableau métriques 3 colonnes -->
        <tr><td style="padding:8px 36px;">
          <table role="presentation" style="border-collapse:collapse;width:100%;margin:0;">
            <tr style="background:${C.surface};">
              <td style="border:1px solid ${C.border};padding:8px 12px;font-weight:bold;color:${C.text};font-size:14px;">Mesure</td>
              <td style="border:1px solid ${C.border};padding:8px 12px;font-weight:bold;text-align:center;color:${C.text};font-size:14px;">Votre site</td>
              <td style="border:1px solid ${C.border};padding:8px 12px;font-weight:bold;text-align:center;color:${C.text};font-size:14px;">Recommandé</td>
            </tr>${metricRows}
          </table>
        </td></tr>${competitorBlock}${impactBlock}
        <!-- Présentation agence + offre -->
        <tr><td style="padding:16px 36px 8px;color:${C.text};font-size:16px;line-height:1.65;">
          <p style="margin:0 0 16px;">Là je ne vous parle que de votre page d'accueil. On a des outils d'analyse développés en interne qui passent un site complet au crible : toutes les pages, le référencement, la vitesse, les parcours de réservation.</p>
          <p style="margin:0 0 16px;">Pour me présenter : je dirige Aurentia, une équipe de développeurs et designers basée dans le Vaucluse. On a déjà travaillé sur des refontes de sites pour des activités comme la vôtre, où le site doit avant tout transformer un visiteur en client.</p>
        </td></tr>
        <!-- CTA box -->
        <tr><td style="padding:8px 36px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.tintBg};border:1px solid ${C.tintBorder};border-radius:16px;">
            <tr><td style="padding:24px 24px 26px;">
              <div style="font-size:17px;font-weight:700;color:${C.text};margin-bottom:6px;">Je vous fais l'audit complet, offert.</div>
              <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:${C.muted};">Sans engagement. Si vous voulez voir concrètement ce que ça donnerait, je peux aussi vous préparer une maquette de votre nouvelle page d'accueil.</p>
              <a href="${safeCta}" style="display:inline-block;background:${C.accent};color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;padding:14px 26px;border-radius:12px;">Recevoir mon audit complet</a>
            </td></tr>
          </table>
        </td></tr>
        <!-- Sign-off -->
        <tr><td style="padding:16px 36px 4px;color:${C.text};font-size:16px;line-height:1.65;">
          <p style="margin:0;">Bonne journée,<br/>L'équipe Aurentia.agency</p>
        </td></tr>
        <!-- Encart audit Pro + prise de RDV -->
        ${proBlock}
        <!-- Footer + désinscription -->
        <tr><td style="padding:20px 36px 32px;">
          <div style="border-top:1px solid ${C.border};padding-top:16px;font-size:13px;color:${C.muted};line-height:1.5;">
            Si vous ne souhaitez plus recevoir de message de ma part, répondez simplement « stop » et je ne vous recontacterai pas.
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
