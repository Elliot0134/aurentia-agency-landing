// src/data/v2/audit.ts
//
// Toute la copy de la page /audit (audit de site web · lead magnet + 99 €).
// Édite le contenu ici sans toucher au JSX des composants.
//
// ⚠️ PLACEHOLDERS À REMPLACER :
//   - STRIPE_PAYMENT_LINK : ton lien Stripe Payment Link pour l'audit à 99 €.
//   - Le webhook de capture des leads est dans src/app/api/audit/route.ts (AUDIT_WEBHOOK).

import {
  Search,
  Gauge,
  LayoutGrid,
  MessageSquareQuote,
  Bot,
  Accessibility,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import type { FAQItem } from "./types";

/** Lien Stripe Payment Link pour l'audit complet à 99 €. À remplacer. */
export const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/REMPLACER-PAR-TON-LIEN";

export type AuditDomain = {
  icon: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
  badge?: string;
};

export type AuditDeliverable = {
  title: string;
  description: string;
};

export type AuditAxis = {
  label: string;
  current: number; // /10
};

export const auditData = {
  hero: {
    eyebrow: "Audit de site web · Aurentia Agency",
    headline: "Votre site est-il invisible sur Google",
    headlineAccent: "et sur ChatGPT ?",
    subHeadline:
      "On mesure, on compare à vos concurrents, et on vous montre ce que votre site vous fait perdre — chaque mois.",
    proofs: ["7 domaines analysés", "Comparatif concurrents", "Plan d'action priorisé"],
    // Carte score — cas réel anonymisé. Radar /100 par axe.
    scoreCard: {
      tag: "Cas réel",
      siteName: "Restaurant — centre-ville",
      score: 30,
      lossValue: "≈ 1 500 €",
      lossLabel: "de manque à gagner / mois",
      radar: [
        { axis: "SEO", value: 28 },
        { axis: "Perf.", value: 38 },
        { axis: "UX", value: 35 },
        { axis: "Copy", value: 42 },
        { axis: "IA", value: 18 },
        { axis: "A11y", value: 30 },
        { axis: "Local", value: 22 },
      ],
    },
  },

  problems: {
    eyebrow: "Le vrai problème",
    title: "La plupart des sites ne convertissent pas — et personne ne sait pourquoi",
    subtitle:
      "Un beau site ne sert à rien s'il est invisible. Trois fuites silencieuses vident votre trafic avant même que vos visiteurs voient votre travail.",
    items: [
      {
        stat: "90 %+",
        title: "Du trafic part chez vos concurrents",
        description:
          "Titres incohérents, pages non indexées, absence des annuaires de votre secteur : Google place vos concurrents devant vous sur vos propres mots-clés.",
      },
      {
        stat: "0",
        title: "Mention sur les IA et les LLM",
        description:
          "Quand un client demande à ChatGPT ou Perplexity « le meilleur prestataire près de chez moi », votre nom ne sort pas. Vos concurrents, si.",
      },
      {
        stat: "< 0,2 %",
        title: "De visiteurs qui passent à l'action",
        description:
          "Site lourd, navigation confuse, aucune preuve sociale : les rares visiteurs qui arrivent repartent sans vous contacter. Le benchmark du secteur est 10× plus haut.",
      },
    ],
  },

  // Bloc éditorial citable (GEO/AEO) — définition self-contained + réponses courtes.
  whatIs: {
    eyebrow: "Comprendre l'audit",
    title: "Qu'est-ce qu'un audit de site web ?",
    // Bloc définition (40-60 mots, self-contained) — format extrait par les IA.
    definition:
      "Un audit de site web est un diagnostic structuré qui évalue un site sur des critères mesurables — référencement (SEO), vitesse de chargement, expérience utilisateur, qualité du contenu, accessibilité et visibilité sur les moteurs IA — afin d'identifier précisément ce qui freine sa visibilité et ses conversions, puis de le corriger.",
    blocks: [
      {
        question: "Que contient un audit SEO complet ?",
        answer:
          "Le SEO technique et on-page, la performance, l'UX, le copywriting, l'accessibilité, la visibilité IA et le Local SEO. Chez Aurentia, chaque constat est vérifié à la main, pas sorti d'un score automatique.",
      },
      {
        question: "Pourquoi un audit est-il important en 2026 ?",
        answer:
          "Vitesse et visibilité pèsent direct sur le CA : 53 % des visiteurs mobiles quittent une page qui charge en plus de 3 secondes (Google). Et de plus en plus de recherches passent par ChatGPT ou Perplexity — sans les bons signaux, ces IA recommandent un concurrent.",
      },
      {
        question: "Combien coûte un audit de site web ?",
        answer:
          "Ça dépend de la profondeur. Aurentia propose un pré-audit gratuit par email et un audit complet à 99 € HT : rapport PDF avec score /100, comparatif concurrents, manque à gagner chiffré et plan d'action, relu par un humain et livré sous 24h.",
      },
    ],
    sourceNote:
      "Source performance : Google / SOASTA, « The State of Online Retail Performance » (2017).",
  },

  domains: {
    eyebrow: "Ce qu'on analyse",
    title: "7 domaines passés au crible",
    subtitle:
      "Pas un score automatique sorti d'un outil. Un audit réel, page par page, avec des constats vérifiables sur votre vrai site en quelques secondes.",
    items: [
      {
        icon: Search,
        title: "SEO technique & on-page",
        description:
          "Titres, métas, balises, schema, sitemap, images sans alt, indexation Google. On vérifie pourquoi vos pages ne remontent pas.",
      },
      {
        icon: Gauge,
        title: "Performance & vitesse",
        description:
          "Core Web Vitals, poids de la page, temps de chargement mobile, format des images. Chaque seconde de lenteur fait fuir des visiteurs.",
      },
      {
        icon: LayoutGrid,
        title: "UX & navigation",
        description:
          "Parcours visiteur, clarté des boutons d'action, affichage mobile, galeries et contenus. Où vos prospects se perdent et abandonnent.",
      },
      {
        icon: MessageSquareQuote,
        title: "Copy & preuve sociale",
        description:
          "Message, positionnement, témoignages, affichage des tarifs, fautes. Ce qui crédibilise — ou décrédibilise — votre offre en quelques secondes.",
      },
      {
        icon: Bot,
        title: "AI Readiness (GEO / AEO)",
        featured: true,
        badge: "Le levier 2026",
        description:
          "On teste votre visibilité réelle sur ChatGPT et Perplexity, on vérifie vos signaux pour les IA (llms.txt, E-E-A-T, schema) et on identifie pourquoi les LLM ne vous citent pas — avec le plan pour y remédier.",
      },
      {
        icon: Accessibility,
        title: "Accessibilité (WCAG)",
        description:
          "Contrastes, navigation clavier, labels de formulaires, structure sémantique. Un site accessible convertit mieux — et vous protège juridiquement.",
      },
      {
        icon: MapPin,
        title: "Local SEO & Google Maps",
        description:
          "Fiche Google Business, cohérence Nom-Adresse-Téléphone, présence sur les annuaires de votre secteur, avis clients. 20 à 40 % du levier pour une activité locale.",
      },
    ] satisfies AuditDomain[],
  },

  deliverables: {
    eyebrow: "Ce que vous recevez",
    title: "Un rapport complet, pas une checklist générique",
    subtitle:
      "Chaque constat est mesuré sur votre site et vérifiable. Vous repartez avec une feuille de route claire, pas une liste de bonnes intentions.",
    items: [
      {
        title: "Un score global /100 sur 7 axes",
        description:
          "Une vision instantanée de l'état de votre site, axe par axe, sur un graphique radar.",
      },
      {
        title: "La synthèse des 3 problèmes qui vous coûtent le plus",
        description:
          "Pas 40 points noyés dans le bruit : les priorités qui font vraiment bouger l'aiguille.",
      },
      {
        title: "Un comparatif face à vos concurrents directs",
        description:
          "Où vous vous situez, point par point, contre ceux qui captent vos clients aujourd'hui.",
      },
      {
        title: "Votre manque à gagner chiffré, en €/mois",
        description:
          "Un funnel de perte qui montre combien de clients potentiels s'évaporent à chaque étape.",
      },
      {
        title: "Un plan d'action priorisé (Critique / Important)",
        description:
          "Chaque recommandation avec l'action concrète et l'impact attendu, dans l'ordre.",
      },
      {
        title: "Une annexe technique avec captures annotées",
        description:
          "Core Web Vitals, schema, fichiers manquants, preuves visuelles. De quoi briefer n'importe quel développeur.",
      },
    ] satisfies AuditDeliverable[],
    // Mock visuel — barres par axe (état actuel mesuré, /10).
    axes: [
      { label: "SEO technique", current: 2.8 },
      { label: "Performance", current: 3.8 },
      { label: "UX & navigation", current: 3.5 },
      { label: "Copy & preuve", current: 4.2 },
      { label: "AI Readiness", current: 1.8 },
      { label: "Accessibilité", current: 3.0 },
      { label: "Local SEO", current: 2.2 },
    ] satisfies AuditAxis[],
  },

  reportExample: {
    eyebrow: "Exemple concret",
    title: "Un vrai rapport d'audit, livré à un vrai client",
    subtitle:
      "Voici l'audit complet que nous avons réalisé pour un restaurant. Score global, benchmark concurrents, manque à gagner chiffré, plan d'action et annexe technique — téléchargez-le pour voir exactement ce que vous recevez.",
    pdfHref: "/audit/exemple-audit-casa-pavoni.pdf",
    downloadLabel: "Télécharger un exemple d'audit (PDF)",
    fileMeta: "PDF · 21 pages · cas réel",
    // Carrousel d'aperçu : pages rendues du PDF (public/audit/pages/page-XX.png).
    pagesPath: "/audit/pages",
    pagesCount: 21,
    // Ce que contient le rapport (résumé des pages du PDF).
    contents: [
      "Synthèse exécutive : score /100 + radar 7 axes",
      "Benchmark face à 3-5 concurrents directs",
      "Constats critiques (P0) avec impact business chiffré",
      "Constats importants (P1) et quick wins (P2)",
      "Funnel de manque à gagner en €/mois",
      "Section Local SEO (si activité locale)",
      "Annexe technique : Core Web Vitals, schema, sécurité",
    ],
  },

  ai: {
    eyebrow: "La recherche change de mains",
    title: "Demain, vos clients ne « googlent » plus. Ils demandent à une IA.",
    description:
      "Une part croissante des recherches passe déjà par ChatGPT, Perplexity et les réponses IA de Google. Si votre site n'envoie pas les bons signaux, ces outils ne vous connaissent pas — et recommandent quelqu'un d'autre, à votre place.",
    points: [
      "On teste votre visibilité réelle sur les principaux LLM et on vous montre le résultat.",
      "On vérifie les signaux que les IA lisent : llms.txt, données structurées, E-E-A-T, cohérence de marque.",
      "On vous donne le plan exact pour devenir citable par les moteurs de recherche et les IA.",
    ],
    demo: {
      question: "« Quel est le meilleur [votre métier] près de chez moi ? »",
      answerIntro: "Voici plusieurs options recommandées :",
      competitors: ["Concurrent A", "Concurrent B", "Concurrent C"],
      missing: "… votre nom n'apparaît pas.",
      footnote: "Test réel mené dans l'audit sur ChatGPT & Perplexity.",
    },
  },

  steps: {
    eyebrow: "Comment ça marche",
    title: "Trois étapes, zéro friction",
    items: [
      {
        number: "01",
        title: "Votre pré-audit gratuit",
        description:
          "Vous entrez l'adresse de votre site et votre email. Aucun paiement, aucun engagement.",
      },
      {
        number: "02",
        title: "Un premier diagnostic offert par email",
        description:
          "Vous recevez un aperçu concret de ce qui cloche sur votre site — et de ce que ça vous coûte.",
      },
      {
        number: "03",
        title: "L'audit complet (99 € HT) sous 24h",
        description:
          "Si vous voulez tout le détail, vous passez à l'audit complet : rapport intégral, relu par un humain, livré sous 24h.",
      },
    ],
  },

  pricing: {
    eyebrow: "Deux étapes, à votre rythme",
    title: "Commencez gratuitement. Passez au complet quand vous voulez.",
    subtitle:
      "Le pré-audit gratuit vous donne déjà un aperçu concret. L'audit complet, lui, déroule tout : 7 domaines, comparatif concurrents, manque à gagner chiffré et plan d'action priorisé.",
    free: {
      ribbon: "Commencez ici",
      title: "Pré-audit",
      price: "Gratuit",
      subtitle: "Premier diagnostic, livré par email",
      features: [
        "Un aperçu des points qui bloquent votre site",
        "Un premier signal sur votre visibilité Google & IA",
        "Sans paiement, sans engagement",
      ],
      ctaLabel: "Recevoir mon pré-audit gratuit",
    },
    paid: {
      title: "Audit complet",
      price: "99",
      currency: "€",
      subtitle: "Le rapport intégral, relu par un humain, sous 24h",
      features: [
        "Audit sur 7 domaines (SEO, perf, UX, copy, IA, accessibilité, local)",
        "Score /100 + comparatif face à vos concurrents",
        "Votre manque à gagner chiffré en €/mois",
        "Plan d'action priorisé + annexe technique",
      ],
      ctaLabel: "Passer à l'audit complet · 99 € HT",
    },
    reassurance:
      "Prix HT · Audit complet livré sous 24h — le temps qu'un humain relise chaque constat avant envoi.",
  },

  faq: [
    {
      question: "Quelle différence entre le pré-audit gratuit et l'audit complet ?",
      answer:
        "Le pré-audit gratuit vous donne un premier aperçu des points qui bloquent votre site, livré par email. L'audit complet à 99 € HT déroule tout : un rapport PDF personnalisé avec score global, synthèse des priorités, comparatif face à vos concurrents, manque à gagner chiffré, plan d'action priorisé et annexe technique. Vous commencez gratuitement, et vous passez au complet seulement si vous le souhaitez.",
    },
    {
      question: "Le pré-audit gratuit, c'est vraiment gratuit ?",
      answer:
        "Oui, totalement. Vous entrez l'adresse de votre site et votre email, vous recevez un premier diagnostic sans payer et sans engagement. C'est notre façon de vous montrer la qualité du travail avant que vous décidiez d'aller plus loin.",
    },
    {
      question: "C'est un rapport généré automatiquement par un outil ?",
      answer:
        "Non. C'est un audit réel mené sur votre site, page par page, avec des constats vérifiables. Chaque affirmation du rapport peut être vérifiée sur votre propre site en quelques secondes. C'est ce qui le distingue des scores automatiques type « note sur 100 » sans valeur.",
    },
    {
      question: "Est-ce que vous corrigez mon site ou créez des liens ?",
      answer:
        "L'audit à 99 € HT est un diagnostic complet : il identifie tout ce qui bloque et vous remet un plan d'action. La mise en œuvre (refonte, optimisation, création des fiches annuaires, etc.) fait l'objet d'une prestation séparée. Beaucoup de clients commencent par l'audit pour savoir exactement quoi prioriser avant d'investir davantage.",
    },
    {
      question: "Pourquoi parler des IA comme ChatGPT ?",
      answer:
        "Parce qu'une part croissante de vos clients y cherche déjà des recommandations. Si votre site n'envoie pas les bons signaux, ces outils ne vous citent pas et orientent vos prospects vers vos concurrents. L'audit teste votre visibilité réelle sur ces plateformes et vous donne le plan pour devenir citable.",
    },
    {
      question: "En combien de temps je reçois mon audit complet ?",
      answer:
        "Sous 24h. Une fois votre commande passée, on réalise l'audit puis un humain relit chaque constat avant de vous l'envoyer par email. Ce contrôle, c'est ce qui garantit que tout ce qu'on affirme est exact et vérifiable sur votre vrai site.",
    },
    {
      question: "Ça marche pour tout type de site ?",
      answer:
        "Oui : site vitrine, e-commerce, prestataire local, indépendant, PME. L'audit s'adapte à votre activité, et la section Local SEO se déclenche automatiquement si votre business est local.",
    },
  ] satisfies FAQItem[],

  finalCta: {
    title: "Arrêtez de deviner pourquoi votre site ne ramène personne.",
    subtitle:
      "Commencez par votre pré-audit gratuit : sachez ce qui vous coûte des clients — sur Google comme sur les IA — avant d'investir un centime.",
    note: "Puis, si vous voulez tout le détail : audit complet à 99 € HT, livré sous 24h.",
  },
};

export type AuditData = typeof auditData;
