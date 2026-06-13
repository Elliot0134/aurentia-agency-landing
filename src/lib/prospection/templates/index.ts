/**
 * Templates v2 des 13 touches de séquence (cold_1..3, inbound_1..5,
 * refonte_1..5). Spec : 2026-06-12-sequences-relances-n8n-design.md.
 *
 * COPY V2 (Elliot, fiches niche 2026-06) :
 * - cold_1..3 existent en 4 variantes de niche + une générique (fallback) ;
 *   `templateVersion` trace la variante : `cold_1.cuisinistes@v2`, `cold_1@v2`.
 * - inbound_* (visiteurs du site, niche inconnue) et refonte_* (client déjà
 *   convaincu) restent génériques.
 * - signature dynamique : `senderName` (depuis le champ Assigné du lead via
 *   senderNameFromAssignee), fallback Elliot.
 *
 * Règles d'acier (verrouillées par le linter et les tests croisés) :
 * - AUCUN tiret long, AUCUNE auto-attribution IA. ChatGPT/Perplexity comme
 *   SUJET du discours sont autorisés (angle de vente OF/EdTech) ;
 * - variables uniquement depuis TemplateVars (données vérifiées au Flash),
 *   jamais d'invention de chiffre, de concurrent ou d'affirmation. Les seuls
 *   montants autorisés viennent des fiches niche d'Elliot : 2 000 à 4 000 €
 *   de marge/an par mandat (conciergeries), 8 000 à 25 000 € la cuisine
 *   posée (cuisinistes), 99 € HT l'audit Pro (inbound) ;
 * - cold_1 : AUCUN lien CTA, le mail se termine par une question ouverte
 *   (le but est une réponse, pas un clic) ;
 * - cold_2/cold_3 : CTA prise de RDV (`calUrl`), jamais le lien Stripe : un
 *   prospect cold a reçu un pré-audit gratuit, il n'a rien à acheter ;
 * - inbound_* : nurture vers l'audit Pro 99 € HT (lien Stripe `auditUrl`) ;
 * - refonte_* : CTA prise de RDV (`calUrl`) UNIQUEMENT, à CHAQUE touche.
 */

/** Clés de variantes cold, dérivées du nom de la niche Airtable du lead. */
export const NICHE_KEYS = ['conciergeries', 'of-edtech', 'agences-immo', 'cuisinistes'] as const;
export type NicheKey = (typeof NICHE_KEYS)[number];

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
  /** Prénom du signataire (champ Assigné du lead) ; fallback Elliot. */
  senderName?: string | null;
  /** Niche du lead pour les variantes cold ; null/absent = copy générique. */
  nicheKey?: NicheKey | null;
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

const SIGNATURE_FALLBACK = 'Elliot';
const SIGNATURE_ORG = 'Aurentia.agency';
const SIGNATURE_SITE_URL = 'https://www.aurentia.agency';
const SIGNATURE_BANNER_URL =
  'https://brfsrpbfqlydzhguqexj.supabase.co/storage/v1/object/public/audit-captures/brand/aurentia-banner.jpg';

/** Coordonnées de signature d'un expéditeur. Tout l'optionnel est omis tant qu'il est inconnu. */
interface SenderSignature {
  /** Nom affiché en gras sur la ligne nom (prénom seul si le nom de famille est inconnu). */
  fullName: string;
  /** Rôle affiché entre le nom et Aurentia.agency ; omis si inconnu. */
  role?: string;
  email?: string;
  /** Affiché tel quel, ex "+33 7 81 95 80 90". */
  phone?: string;
  linkedinUrl?: string;
}

/**
 * Signature par expéditeur (clé = prénom signé, cf SENDER_BY_ASSIGNEE).
 * Coordonnées réelles (source : projet lien-aurentia). Fabien reste en
 * fallback minimal (prénom + Site web) tant que ses coordonnées sont
 * inconnues : on n'invente JAMAIS un rôle, un nom, un mail, un numéro ou
 * un profil Linkedin.
 */
const SIGNATURES: Record<string, SenderSignature> = {
  Elliot: {
    fullName: 'Estrade Elliot',
    role: 'Founder / AI lead',
    email: 'elliot.estrade@gmail.com',
    phone: '+33 7 81 95 80 90',
    linkedinUrl: 'https://www.linkedin.com/in/elliot-estrade-8b7754201/',
  },
  Stéphane: {
    fullName: 'Guillemot Stéphane',
    role: 'Co-founder & Advisor',
    email: 'stephane@aurentia.fr',
    phone: '+33 6 75 08 78 03',
    linkedinUrl: 'https://www.linkedin.com/in/st%C3%A9phane-guillemot-26763a5/',
  },
  Olivier: {
    fullName: "Le Floc'h Olivier",
    role: 'Co-founder & Advisor',
    email: 'olivier@aurentia.fr',
    phone: '+33 6 62 47 95 99',
    linkedinUrl: 'https://www.linkedin.com/in/olivier-le-floch-0899a9/',
  },
  Matthieu: {
    fullName: 'Bousquet Matthieu',
    role: 'Co-founder & CTO',
    email: 'matthieu@aurentia.fr',
    phone: '+33 6 22 76 33 37',
    linkedinUrl: 'https://www.linkedin.com/in/matthieu-bousquet-8070a7262/',
  },
  // Fabien : coordonnées inconnues, fallback minimal (prénom + Site web).
  Fabien: { fullName: 'Fabien' },
};

/** Prénoms signataires par valeur normalisée du champ Assigné Airtable. */
const SENDER_BY_ASSIGNEE: Record<string, string> = {
  elliot: 'Elliot',
  stephane: 'Stéphane',
  olivier: 'Olivier',
  matthieu: 'Matthieu',
  fabien: 'Fabien',
};

/**
 * Prénom de signature depuis le champ Assigné du lead (casse, espaces et
 * accents tolérés). Inconnu, vide ou null → Elliot : un mail signé part
 * toujours avec un prénom réel.
 */
export function senderNameFromAssignee(assignedTo: string | null): string {
  if (assignedTo === null) return SIGNATURE_FALLBACK;
  const key = assignedTo
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  return SENDER_BY_ASSIGNEE[key] ?? SIGNATURE_FALLBACK;
}

/**
 * Clé de variante depuis le nom de la niche Airtable (champ primaire Niche).
 * Motifs actés avec Elliot : 'conciergerie' → conciergeries ; 'OF' (sigle en
 * majuscules, mot entier) ou 'edtech' → of-edtech ; 'immo' → agences-immo ;
 * 'cuisiniste' → cuisinistes ; sinon null (copy générique, jamais devinée).
 */
export function nicheKeyFromName(name: string | null): NicheKey | null {
  if (name === null) return null;
  const lower = name.toLowerCase();
  if (lower.includes('conciergerie')) return 'conciergeries';
  if (/\bOF\b/.test(name) || lower.includes('edtech')) return 'of-edtech';
  if (lower.includes('immo')) return 'agences-immo';
  if (lower.includes('cuisiniste')) return 'cuisinistes';
  return null;
}

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

function senderName(vars: TemplateVars): string {
  const name = vars.senderName?.trim();
  return name ? name : SIGNATURE_FALLBACK;
}

/** Phrase de rappel du score, uniquement si la mesure existe (jamais inventée). */
function scoreSentence(vars: TemplateVars): string {
  return vars.score !== undefined && vars.score !== null
    ? ` Votre site ressort à ${vars.score}/100 au test de performance, et plusieurs points se corrigent rapidement.`
    : ' Plusieurs des points relevés se corrigent rapidement.';
}

interface TemplateDef {
  subject(vars: TemplateVars): string;
  paragraphs(vars: TemplateVars): string[];
  /** Absent (cold_1) → aucun paragraphe lien, ni en html ni en text. */
  cta?(vars: TemplateVars): { label: string; url: string };
}

interface TemplateEntry {
  generic: TemplateDef;
  /** Variantes par niche (séquence cold uniquement). */
  variants?: Partial<Record<NicheKey, TemplateDef>>;
}

const CTA_COLD_2 = '15 minutes pour en parler ? Choisissez un créneau';
const CTA_COLD_3 = 'Réserver un créneau';

const TEMPLATES: Record<string, TemplateEntry> = {
  // ── Séquence cold (relance du pré-audit envoyé, Gmail dans le fil) ──────
  // cold_1 : aucun CTA, le mail finit sur une question ouverte (objectif : une réponse).
  cold_1: {
    generic: {
      subject: (v) => `Votre pré-audit ${siteLabel(v)} : qu'en pensez-vous ?`,
      paragraphs: (v) => [
        `Je reviens vers vous au sujet du pré-audit de ${v.siteUrl} que je vous ai envoyé il y a quelques jours.${scoreSentence(v)}`,
        'Les points relevés touchent à la vitesse de votre site, à sa visibilité et à ce que vivent vos visiteurs. Avez-vous pu y jeter un oeil ?',
      ],
    },
    variants: {
      conciergeries: {
        subject: (v) => `${siteLabel(v)} vu par un propriétaire`,
        paragraphs: (v) => [
          `Je reviens vers vous au sujet du pré-audit de ${v.siteUrl}.${scoreSentence(v)} Pour le préparer, je me suis mis dans la peau d'un propriétaire qui cherche à qui confier son bien.`,
          'Avant de signer un mandat, ce propriétaire compare plusieurs conciergeries, et son premier réflexe est de regarder leur site. Avez-vous pu parcourir les points relevés ?',
        ],
      },
      'of-edtech': {
        subject: () => 'Le test ChatGPT sur votre domaine de formation',
        paragraphs: (v) => [
          `Je reviens vers vous au sujet du pré-audit de ${v.siteUrl}.${scoreSentence(v)}`,
          'Un test simple : posez à ChatGPT ou Perplexity la question que vos prospects se posent avant de choisir une formation, et regardez quels organismes sont cités. Avez-vous déjà fait le test pour votre domaine ?',
        ],
      },
      'agences-immo': {
        subject: (v) => `${siteLabel(v)} face aux agences d'à côté`,
        paragraphs: (v) => [
          `Je reviens vers vous au sujet du pré-audit de ${v.siteUrl}.${scoreSentence(v)}`,
          "Avant de confier son mandat, un vendeur compare deux ou trois agences, souvent la vôtre face à un réseau comme Orpi ou iad. Son premier point de contact, c'est votre site. Avez-vous pu parcourir les points relevés ?",
        ],
      },
      cuisinistes: {
        subject: () => 'Votre site et vos demandes de devis',
        paragraphs: (v) => [
          `Je reviens vers vous au sujet du pré-audit de ${v.siteUrl}.${scoreSentence(v)}`,
          "Une cuisine posée, c'est entre 8 000 et 25 000 €. Si votre site fait fuir une seule personne prête à demander un devis, le manque à gagner se chiffre vite. Avez-vous pu regarder les points relevés ?",
        ],
      },
    },
  },
  cold_2: {
    generic: {
      subject: (v) => `Les points relevés sur ${siteLabel(v)}`,
      paragraphs: (v) => [
        `Je me permets une relance au sujet du pré-audit de ${v.siteUrl}. Chaque point relevé a été mesuré sur votre site, rien de théorique.`,
        'Certains se corrigent vite et changent ce que vivent vos visiteurs. Y a-t-il un sujet prioritaire de votre côté ?',
      ],
      cta: (v) => ({ label: CTA_COLD_2, url: v.calUrl }),
    },
    variants: {
      conciergeries: {
        subject: () => 'Un mandat de gestion se joue souvent sur le site',
        paragraphs: (v) => [
          `Je me permets une relance au sujet du pré-audit de ${v.siteUrl}. Les points relevés sont précisément ce qui fait hésiter un propriétaire au moment de choisir sa conciergerie.`,
          "Un seul propriétaire convaincu, c'est 2 000 à 4 000 € de marge par an. Corriger ces points rend la décision plus simple pour le prochain qui visite votre site.",
        ],
        cta: (v) => ({ label: CTA_COLD_2, url: v.calUrl }),
      },
      'of-edtech': {
        subject: () => 'Vos prospects ne cherchent plus seulement sur Google',
        paragraphs: (v) => [
          `Je me permets une relance au sujet du pré-audit de ${v.siteUrl}. Vos prospects posent de plus en plus leurs questions à ChatGPT ou Perplexity avant même d'ouvrir Google.`,
          'Quand ces outils répondent, ils citent les organismes dont le site leur donne de la matière. Les points relevés montrent ce qui manque au vôtre pour en faire partie.',
        ],
        cta: (v) => ({ label: CTA_COLD_2, url: v.calUrl }),
      },
      'agences-immo': {
        subject: () => 'Le vendeur compare avant de confier son mandat',
        paragraphs: (v) => [
          `Je me permets une relance au sujet du pré-audit de ${v.siteUrl}. Un site lent ou qui ne montre pas vos ventes fait pencher la comparaison du mauvais côté.`,
          "Chaque vendeur qui choisit l'agence d'à côté, c'est un mandat perdu. Les points relevés se corrigent, et la plupart rapidement.",
        ],
        cta: (v) => ({ label: CTA_COLD_2, url: v.calUrl }),
      },
      cuisinistes: {
        subject: () => 'Le client regarde votre site avant de pousser la porte',
        paragraphs: (v) => [
          `Je me permets une relance au sujet du pré-audit de ${v.siteUrl}. La plupart de vos clients regardent votre site sur leur téléphone avant de venir au magasin.`,
          'Si la visite se passe mal ou si demander un devis est compliqué, ils vont voir ailleurs. Une seule demande récupérée par mois rembourse largement les corrections.',
        ],
        cta: (v) => ({ label: CTA_COLD_2, url: v.calUrl }),
      },
    },
  },
  cold_3: {
    generic: {
      subject: (v) => `Dernier message au sujet de ${siteLabel(v)}`,
      paragraphs: (v) => [
        `Dernier message de ma part au sujet de ${v.siteUrl}. Si le sujet n'est pas d'actualité, aucun souci, je ne vous relancerai plus.`,
        'Si vous souhaitez avancer un jour sur les points relevés, 15 minutes au téléphone suffisent pour décider par où commencer.',
      ],
      cta: (v) => ({ label: CTA_COLD_3, url: v.calUrl }),
    },
    variants: {
      conciergeries: {
        subject: (v) => `Dernier message au sujet de ${siteLabel(v)}`,
        paragraphs: (v) => [
          `Dernier message de ma part au sujet de ${v.siteUrl}. Si rentrer de nouveaux mandats n'est pas une priorité en ce moment, aucun souci, je ne vous relancerai plus.`,
          'Si le sujet revient sur la table, 15 minutes au téléphone suffisent pour voir quoi corriger en premier pour rassurer les propriétaires.',
        ],
        cta: (v) => ({ label: CTA_COLD_3, url: v.calUrl }),
      },
      'of-edtech': {
        subject: (v) => `Dernier message au sujet de ${siteLabel(v)}`,
        paragraphs: (v) => [
          `Dernier message de ma part au sujet de ${v.siteUrl}. Si votre visibilité dans les réponses de ChatGPT et Perplexity n'est pas un sujet pour l'instant, aucun souci, je ne vous relancerai plus.`,
          'Si vous voulez creuser un jour, un court échange suffit pour reprendre les points relevés et décider par où commencer.',
        ],
        cta: (v) => ({ label: CTA_COLD_3, url: v.calUrl }),
      },
      'agences-immo': {
        subject: (v) => `Dernier message au sujet de ${siteLabel(v)}`,
        paragraphs: (v) => [
          `Dernier message de ma part au sujet de ${v.siteUrl}. Si la rentrée de mandats passe par d'autres canaux chez vous, aucun souci, je ne vous relancerai plus.`,
          'Si vous voulez remettre votre site dans la comparaison, un court échange suffit pour passer les points relevés en revue et prioriser.',
        ],
        cta: (v) => ({ label: CTA_COLD_3, url: v.calUrl }),
      },
      cuisinistes: {
        subject: (v) => `Dernier message au sujet de ${siteLabel(v)}`,
        paragraphs: (v) => [
          `Dernier message de ma part au sujet de ${v.siteUrl}. Si votre carnet de commandes est plein, tant mieux, je ne vous relancerai plus.`,
          'Si vous voulez que votre site ramène des demandes de devis, on peut reprendre les points relevés ensemble au téléphone, point par point, sans jargon.',
        ],
        cta: (v) => ({ label: CTA_COLD_3, url: v.calUrl }),
      },
    },
  },

  // ── Séquence inbound (nurture opt-in vers l'audit Pro 99 € HT, Resend) ──
  inbound_1: {
    generic: {
      subject: (v) => `Votre pré-audit ${siteLabel(v)} : la suite`,
      paragraphs: (v) => [
        `Merci d'avoir demandé le pré-audit de ${v.siteUrl}.${scoreSentence(v)}`,
        "L'audit complet (99 € HT) reprend chaque point en détail : performance, visibilité, expérience de vos visiteurs, avec un plan d'action priorisé. Une question ? Répondez simplement à ce mail.",
      ],
      cta: (v) => ({ label: "Obtenir l'audit complet", url: auditUrl(v) }),
    },
  },
  inbound_2: {
    generic: {
      subject: (v) => `Ce que couvre l'audit complet de ${siteLabel(v)}`,
      paragraphs: (v) => [
        `Petit complément au sujet de ${v.siteUrl} : l'audit complet passe votre site au crible, vitesse, référencement, parcours visiteur, et votre visibilité dans les réponses des outils que vos clients utilisent pour chercher.`,
        "Chaque constat est mesuré sur votre site et accompagné d'une action concrète. Vous savez quoi corriger, dans quel ordre, et pourquoi.",
      ],
      cta: (v) => ({ label: "Découvrir l'audit complet", url: auditUrl(v) }),
    },
  },
  inbound_3: {
    generic: {
      subject: (v) => `Une question sur votre pré-audit ${siteLabel(v)} ?`,
      paragraphs: (v) => [
        `Avez-vous pu parcourir le pré-audit de ${v.siteUrl} ? Si un point vous interpelle, répondez à ce mail, je vous réponds directement.`,
        "Et pour aller au fond des choses, l'audit complet (99 € HT) vous donne le plan d'action complet, priorisé.",
      ],
      cta: (v) => ({ label: "Passer à l'audit complet", url: auditUrl(v) }),
    },
  },
  inbound_4: {
    generic: {
      subject: (v) => `Les points relevés sur ${siteLabel(v)} sont toujours là`,
      paragraphs: (v) => [
        `Les constats du pré-audit de ${v.siteUrl} restent d'actualité tant qu'ils ne sont pas corrigés, et vos visiteurs les vivent chaque jour.`,
        'Si vous hésitez ou préférez en parler avant de décider, répondez simplement à ce mail.',
      ],
      cta: (v) => ({ label: "Obtenir l'audit complet (99 € HT)", url: auditUrl(v) }),
    },
  },
  inbound_5: {
    generic: {
      subject: (v) => `Dernier rappel pour ${siteLabel(v)}`,
      paragraphs: (v) => [
        `Dernier message de ma part au sujet de ${v.siteUrl} : après celui-ci, je ne vous solliciterai plus.`,
        "L'audit complet reste disponible si vous souhaitez avancer un jour sur les points relevés. Bonne continuation avec votre site.",
      ],
      cta: (v) => ({ label: "Obtenir l'audit complet", url: auditUrl(v) }),
    },
  },

  // ── Séquence refonte (client Pro, CTA prise de RDV à chaque touche) ─────
  refonte_1: {
    generic: {
      subject: (v) => `Votre audit ${siteLabel(v)} : par quoi commencer ?`,
      paragraphs: (v) => [
        `Vous avez votre audit complet de ${v.siteUrl} entre les mains, merci pour votre confiance.`,
        'Le plus utile maintenant : 20 minutes ensemble pour hiérarchiser les priorités et décider de la première étape.',
      ],
      cta: (v) => ({ label: 'Réserver un créneau', url: v.calUrl }),
    },
  },
  refonte_2: {
    generic: {
      subject: (v) => `Les corrections rapides de votre audit ${siteLabel(v)}`,
      paragraphs: (v) => [
        `Parmi les points de votre audit de ${v.siteUrl}, certains se corrigent en quelques jours et se ressentent tout de suite côté visiteurs.`,
        "Je peux vous montrer lesquels valent le coup en premier. De vive voix, c'est plus simple.",
      ],
      cta: (v) => ({ label: 'Choisir un créneau', url: v.calUrl }),
    },
  },
  refonte_3: {
    generic: {
      subject: (v) => `Mettre en oeuvre votre audit ${siteLabel(v)}, ensemble ?`,
      paragraphs: (v) => [
        `Un audit ne vaut que par ce qu'on en fait. Si vous manquez de temps ou de bras pour appliquer celui de ${v.siteUrl}, c'est exactement ce que nous faisons chez Aurentia.`,
        "Un appel de 20 minutes suffit pour voir ce que vous gardez en interne et ce qu'on prend en charge.",
      ],
      cta: (v) => ({ label: 'Réserver un créneau', url: v.calUrl }),
    },
  },
  refonte_4: {
    generic: {
      subject: (v) => `Où en êtes-vous depuis votre audit ${siteLabel(v)} ?`,
      paragraphs: (v) => [
        `Où en êtes-vous depuis votre audit de ${v.siteUrl} ? Si vous avancez en interne, très bien.`,
        "Si une question bloque ou si vous voulez un regard extérieur sur ce qui a été fait, un créneau rapide suffit.",
      ],
      cta: (v) => ({ label: 'Prendre rendez-vous', url: v.calUrl }),
    },
  },
  refonte_5: {
    generic: {
      subject: (v) => `Dernière relance au sujet de ${siteLabel(v)}`,
      paragraphs: (v) => [
        `Dernière relance de ma part au sujet de votre audit de ${v.siteUrl} : après ce message, je vous laisse tranquille.`,
        "Si l'envie de passer à l'action revient, mon calendrier reste ouvert, sans engagement. Bonne continuation.",
      ],
      cta: (v) => ({ label: 'Réserver un créneau', url: v.calUrl }),
    },
  },
};

/** Les 13 types de touches couverts par un template (hors `flash`, qui a son propre rendu). */
export const TEMPLATE_TYPES: readonly string[] = Object.keys(TEMPLATES);

/** Signature de l'expéditeur ; fallback Elliot (un mail signe toujours avec des données réelles). */
function senderSignature(vars: TemplateVars): SenderSignature {
  return SIGNATURES[senderName(vars)] ?? SIGNATURES[SIGNATURE_FALLBACK];
}

/** Ligne nom : "Nom - Rôle - Aurentia.agency", le rôle seulement s'il est connu. */
function signatureNameLine(sig: SenderSignature, nameHtml: string): string {
  return [nameHtml, ...(sig.role ? [sig.role] : []), SIGNATURE_ORG].join(' - ');
}

/**
 * Bloc signature HTML, réplique de la signature Gmail d'Elliot : bannière
 * Aurentia en tête, puis lignes 14px Arial aérées (nom en gras, Site web,
 * et Mail / Tél / Linkedin seulement s'ils sont connus). Séparée du corps
 * par le filet discret. Aucun tiret long (le " - " est un tiret court).
 */
function renderSignatureHtml(vars: TemplateVars): string {
  const sig = senderSignature(vars);
  const link = (url: string): string => `<a href="${url}" style="color:#e8550f;">${url}</a>`;
  const lines = [
    signatureNameLine(sig, `<strong>${escapeHtml(sig.fullName)}</strong>`),
    `<strong>Site web</strong> : ${link(SIGNATURE_SITE_URL)}`,
    ...(sig.email
      ? [`<strong>Mail</strong> : <a href="mailto:${sig.email}" style="color:#e8550f;">${sig.email}</a>`]
      : []),
    ...(sig.phone ? [`<strong>Tél</strong> : ${escapeHtml(sig.phone)}`] : []),
    ...(sig.linkedinUrl ? [`<strong>Linkedin</strong> : ${link(sig.linkedinUrl)}`] : []),
  ];
  return [
    '<div style="margin:24px 0 0;padding-top:12px;border-top:1px solid #ddd;">',
    `<img src="${SIGNATURE_BANNER_URL}" alt="Aurentia.agency" width="420" style="display:block;max-width:100%;border-radius:4px;" />`,
    '<p style="margin:12px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.8;color:#1f2937;">',
    lines.join('<br/>'),
    '</p>',
    '</div>',
  ].join('');
}

/** Équivalent text de la signature : mêmes lignes que le HTML, sans la bannière. */
function renderSignatureText(vars: TemplateVars): string {
  const sig = senderSignature(vars);
  return [
    signatureNameLine(sig, sig.fullName),
    `Site web : ${SIGNATURE_SITE_URL}`,
    ...(sig.email ? [`Mail : ${sig.email}`] : []),
    ...(sig.phone ? [`Tél : ${sig.phone}`] : []),
    ...(sig.linkedinUrl ? [`Linkedin : ${sig.linkedinUrl}`] : []),
  ].join('\n');
}

function renderHtml(vars: TemplateVars, def: TemplateDef): string {
  const cta = def.cta?.(vars);
  const paragraphs = [hello(vars), ...def.paragraphs(vars)]
    .map((p) => `<p style="margin:0 0 16px;">${escapeHtml(p)}</p>`)
    .join('\n');
  const link = cta
    ? `<p style="margin:0 0 16px;"><a href="${escapeHtml(cta.url)}" style="color:#e8550f;">${escapeHtml(cta.label)}</a></p>`
    : null;
  return [
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1f2937;max-width:560px;">',
    paragraphs,
    ...(link ? [link] : []),
    renderSignatureHtml(vars),
    '</div>',
  ].join('\n');
}

function renderText(vars: TemplateVars, def: TemplateDef): string {
  const cta = def.cta?.(vars);
  return [
    hello(vars),
    ...def.paragraphs(vars),
    ...(cta ? [`${cta.label} : ${cta.url}`] : []),
    renderSignatureText(vars),
  ].join('\n\n');
}

/**
 * Rend l'email d'une touche de séquence. Lève une erreur si le type n'a pas
 * de template (ex `flash`, géré par le moteur d'audit, ou type inconnu).
 * La variante de niche ne s'applique que si elle existe pour ce type (cold) ;
 * sinon fallback générique, tracé dans templateVersion.
 */
export function renderTemplate(type: string, vars: TemplateVars): RenderedEmail {
  const entry = TEMPLATES[type];
  if (!entry) {
    throw new Error(`Type de touche inconnu ou sans template : "${type}"`);
  }
  const variant = vars.nicheKey != null ? entry.variants?.[vars.nicheKey] : undefined;
  const def = variant ?? entry.generic;
  const templateVersion = variant !== undefined ? `${type}.${vars.nicheKey}@v2` : `${type}@v2`;
  return {
    subject: def.subject(vars),
    html: renderHtml(vars, def),
    text: renderText(vars, def),
    templateVersion,
  };
}
