import type { AuditData, Measurement } from '../types';
import type { ReportContent } from './report-schema';
import { COLORS, statusColor } from './theme';

export interface FlashEmailOptions {
  screenshotUrl: string;
  ctaUrl: string;
}

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

  const safeCta = escapeHtml(opts.ctaUrl);
  const safeScreenshot = escapeHtml(opts.screenshotUrl);

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
          <div style="font-size:20px;font-weight:700;letter-spacing:-0.02em;color:${C.accent};">Aurentia<span style="color:${C.text};">.agency</span></div>
          <div style="font-size:13px;color:${C.muted};margin-top:4px;">Sites web · IA · automatisation</div>
        </td></tr>
        <!-- Intro -->
        <tr><td style="padding:16px 36px 8px;color:${C.text};font-size:16px;line-height:1.65;">
          <p style="margin:0 0 16px;">${safeSummary}</p>
          <p style="margin:0 0 16px;">J'ai noté directement sur une capture de votre page d'accueil ce qui freine un visiteur :</p>
        </td></tr>
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
        </td></tr>${impactBlock}
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
