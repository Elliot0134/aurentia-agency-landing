/**
 * Templates v1 des 13 touches de séquence (cold_1..3, inbound_1..5,
 * refonte_1..5). Spec : 2026-06-12-sequences-relances-n8n-design.md.
 *
 * COPY V1 : à réécrire par Elliot (structure et variables stables).
 * Les textes ci-dessous sont des placeholders propres : courts, sobres,
 * français correct, charte simple (texte + UN lien CTA). Règles d'acier :
 * - AUCUN tiret long, AUCUNE mention d'IA (vérifié par le linter, testé en croisé) ;
 * - variables uniquement depuis TemplateVars (données vérifiées au Flash),
 *   jamais d'invention de chiffre, de concurrent ou d'affirmation ;
 * - cold_* : relance douce du pré-audit (rappel valeur + question ouverte + lien audit) ;
 * - inbound_* : nurture vers l'audit Pro 99 € HT (lien Stripe `auditUrl`) ;
 * - refonte_* : CTA prise de RDV (`calUrl`) à CHAQUE touche.
 */

export interface TemplateVars {
  contactName: string | null;
  entreprise: string | null;
  siteUrl: string;
  /** Lien d'achat de l'audit Pro (défaut : DEFAULT_AUDIT_URL). */
  auditUrl?: string;
  /** Lien de prise de rendez-vous (cal.com). */
  calUrl: string;
  /** Score Lighthouse mesuré au Flash ; cité uniquement s'il est fourni. */
  score?: number | null;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
  templateVersion: string;
}

/** Mêmes défauts que le mail Flash (src/lib/audit/render/email-flash.ts). */
export const DEFAULT_AUDIT_URL = 'https://buy.stripe.com/28E6oGaA43WGgL72Bf0x200';
export const DEFAULT_CAL_URL = 'https://cal.com/elliot-estrade-ixfuya/appel-decouverte';

const SIGNATURE_NAME = 'Elliot';
const SIGNATURE_ORG = 'Aurentia Agency';

/** Échappe une valeur variable avant injection dans le HTML du mail. */
function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  );
}

/** Nom affichable du site dans un sujet : l'entreprise, sinon l'URL. */
function siteLabel(vars: TemplateVars): string {
  return vars.entreprise ?? vars.siteUrl;
}

function hello(vars: TemplateVars): string {
  return vars.contactName ? `Bonjour ${vars.contactName},` : 'Bonjour,';
}

function auditUrl(vars: TemplateVars): string {
  return vars.auditUrl ?? DEFAULT_AUDIT_URL;
}

/** Phrase de rappel du score, uniquement si la mesure existe (jamais inventée). */
function scoreSentence(vars: TemplateVars): string {
  return vars.score !== undefined && vars.score !== null
    ? ` Votre site affiche un score de ${vars.score}/100 : plusieurs points sont améliorables rapidement.`
    : ' Plusieurs points relevés sont améliorables rapidement.';
}

interface TemplateDef {
  subject(vars: TemplateVars): string;
  paragraphs(vars: TemplateVars): string[];
  cta(vars: TemplateVars): { label: string; url: string };
}

const TEMPLATES: Record<string, TemplateDef> = {
  // ── Séquence cold (relance du pré-audit envoyé, Gmail dans le fil) ──────
  cold_1: {
    subject: (v) => `Votre pré-audit ${siteLabel(v)} : qu'en pensez-vous ?`,
    paragraphs: (v) => [
      `Je reviens vers vous au sujet du pré-audit de ${v.siteUrl} que je vous ai envoyé il y a quelques jours.${scoreSentence(v)}`,
      "Avez-vous eu le temps d'y jeter un oeil ? Je serais curieux d'avoir votre retour.",
    ],
    cta: (v) => ({ label: "L'audit complet est disponible ici", url: auditUrl(v) }),
  },
  cold_2: {
    subject: (v) => `Les points relevés sur ${siteLabel(v)}`,
    paragraphs: (v) => [
      `Je me permets une relance au sujet du pré-audit de ${v.siteUrl}. Les points relevés ont un impact direct sur vos visiteurs et votre visibilité.`,
      'Y a-t-il un sujet qui vous semble prioritaire de votre côté ?',
    ],
    cta: (v) => ({ label: 'Le détail complet est ici', url: auditUrl(v) }),
  },
  cold_3: {
    subject: (v) => `Dernier message au sujet de ${siteLabel(v)}`,
    paragraphs: (v) => [
      `Dernier message de ma part au sujet de ${v.siteUrl}. Si le sujet n'est pas d'actualité, aucun souci, je ne vous relancerai plus.`,
      "Si vous souhaitez creuser les points relevés, l'audit complet reste disponible.",
    ],
    cta: (v) => ({ label: "Accéder à l'audit complet", url: auditUrl(v) }),
  },

  // ── Séquence inbound (nurture opt-in vers l'audit Pro 99 € HT, Resend) ──
  inbound_1: {
    subject: (v) => `Votre pré-audit ${siteLabel(v)} : la suite`,
    paragraphs: (v) => [
      `Merci d'avoir demandé le pré-audit de ${v.siteUrl}.${scoreSentence(v)}`,
      "L'audit complet (99 € HT) reprend chaque point en détail avec un plan d'action priorisé. Une question ? Répondez simplement à ce mail.",
    ],
    cta: (v) => ({ label: "Obtenir l'audit complet", url: auditUrl(v) }),
  },
  inbound_2: {
    subject: (v) => `Ce que couvre l'audit complet de ${siteLabel(v)}`,
    paragraphs: (v) => [
      `Petit complément au sujet de ${v.siteUrl} : l'audit complet couvre la performance, le référencement, l'expérience utilisateur et votre visibilité dans les recherches.`,
      "Chaque constat y est mesuré et accompagné d'une action concrète, rien de théorique.",
    ],
    cta: (v) => ({ label: "Découvrir l'audit complet", url: auditUrl(v) }),
  },
  inbound_3: {
    subject: (v) => `Une question sur votre pré-audit ${siteLabel(v)} ?`,
    paragraphs: (v) => [
      `Avez-vous pu parcourir le pré-audit de ${v.siteUrl} ? Si un point vous interpelle, répondez à ce mail, je vous éclaire volontiers.`,
      "Pour aller au fond des choses, l'audit complet (99 € HT) vous donne un plan d'action priorisé.",
    ],
    cta: (v) => ({ label: "Passer à l'audit complet", url: auditUrl(v) }),
  },
  inbound_4: {
    subject: (v) => `Votre pré-audit ${siteLabel(v)} reste d'actualité`,
    paragraphs: (v) => [
      `Les constats du pré-audit de ${v.siteUrl} sont toujours d'actualité tant qu'ils ne sont pas corrigés.`,
      'Si vous préférez en parler de vive voix avant de décider, répondez simplement à ce mail.',
    ],
    cta: (v) => ({ label: "L'audit complet est disponible ici", url: auditUrl(v) }),
  },
  inbound_5: {
    subject: (v) => `Dernier rappel pour ${siteLabel(v)}`,
    paragraphs: (v) => [
      `Dernier rappel au sujet de ${v.siteUrl} : après ce message, je ne vous solliciterai plus.`,
      "L'audit complet reste disponible si vous souhaitez avancer sur les points relevés.",
    ],
    cta: (v) => ({ label: "Obtenir l'audit complet", url: auditUrl(v) }),
  },

  // ── Séquence refonte (client Pro, CTA prise de RDV à chaque touche) ─────
  refonte_1: {
    subject: (v) => `Votre audit complet ${siteLabel(v)} : on en parle ?`,
    paragraphs: (v) => [
      `Vous avez reçu votre audit complet de ${v.siteUrl}, merci encore pour votre confiance.`,
      "Le plus simple pour transformer ces constats en plan concret est d'en parler 20 minutes ensemble.",
    ],
    cta: (v) => ({ label: 'Réserver un créneau', url: v.calUrl }),
  },
  refonte_2: {
    subject: (v) => `Les priorités de votre audit ${siteLabel(v)}`,
    paragraphs: (v) => [
      `Avez-vous pu parcourir votre audit de ${v.siteUrl} ? Je peux vous détailler les priorités de vive voix.`,
      'Un échange court suffit pour cadrer les premières actions.',
    ],
    cta: (v) => ({ label: 'Choisir un créneau', url: v.calUrl }),
  },
  refonte_3: {
    subject: (v) => `Les actions rapides pour ${siteLabel(v)}`,
    paragraphs: (v) => [
      `Parmi les points de votre audit de ${v.siteUrl}, certains se corrigent vite et changent l'expérience de vos visiteurs.`,
      "Je vous propose d'identifier ensemble ceux qui valent le coup en premier.",
    ],
    cta: (v) => ({ label: 'Réserver un créneau', url: v.calUrl }),
  },
  refonte_4: {
    subject: (v) => `Où en êtes-vous avec votre audit ${siteLabel(v)} ?`,
    paragraphs: (v) => [
      `Où en êtes-vous depuis votre audit de ${v.siteUrl} ? Si vous avancez en interne, très bien.`,
      "Si vous préférez être accompagné, on peut en parler rapidement.",
    ],
    cta: (v) => ({ label: 'Prendre rendez-vous', url: v.calUrl }),
  },
  refonte_5: {
    subject: (v) => `Dernière relance au sujet de ${siteLabel(v)}`,
    paragraphs: (v) => [
      `Dernière relance au sujet de votre audit de ${v.siteUrl} : je reste disponible si vous souhaitez passer à l'action.`,
      'Mon calendrier reste ouvert, sans engagement.',
    ],
    cta: (v) => ({ label: 'Réserver un créneau', url: v.calUrl }),
  },
};

/** Les 13 types de touches couverts par un template (hors `flash`, qui a son propre rendu). */
export const TEMPLATE_TYPES: readonly string[] = Object.keys(TEMPLATES);

function renderHtml(vars: TemplateVars, def: TemplateDef): string {
  const cta = def.cta(vars);
  const paragraphs = [hello(vars), ...def.paragraphs(vars)]
    .map((p) => `<p style="margin:0 0 16px;">${escapeHtml(p)}</p>`)
    .join('\n');
  const link = `<p style="margin:0 0 16px;"><a href="${escapeHtml(cta.url)}" style="color:#e8550f;">${escapeHtml(cta.label)}</a></p>`;
  const signature = `<p style="margin:24px 0 0;">${escapeHtml(SIGNATURE_NAME)}<br/>${escapeHtml(SIGNATURE_ORG)}</p>`;
  return [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1f2937;max-width:560px;">',
    paragraphs,
    link,
    signature,
    '</div>',
  ].join('\n');
}

function renderText(vars: TemplateVars, def: TemplateDef): string {
  const cta = def.cta(vars);
  return [
    hello(vars),
    ...def.paragraphs(vars),
    `${cta.label} : ${cta.url}`,
    `${SIGNATURE_NAME}\n${SIGNATURE_ORG}`,
  ].join('\n\n');
}

/**
 * Rend l'email d'une touche de séquence. Lève une erreur si le type n'a pas
 * de template (ex `flash`, géré par le moteur d'audit, ou type inconnu).
 */
export function renderTemplate(type: string, vars: TemplateVars): RenderedEmail {
  const def = TEMPLATES[type];
  if (!def) {
    throw new Error(`Type de touche inconnu ou sans template : "${type}"`);
  }
  return {
    subject: def.subject(vars),
    html: renderHtml(vars, def),
    text: renderText(vars, def),
    templateVersion: `${type}@v1`,
  };
}
