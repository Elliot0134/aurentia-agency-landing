// src/data/v2/solutions-ia-implementation.ts
// DRAFT_COPY — to refine before swap
// NOTE: price is "Sur devis" per scope.
import {
  Headphones,
  Target,
  Building2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import type { SubPageData } from "./types";

export const solutionsIaImplementationData: SubPageData = {
  parentSlug: "solutions-ia",
  slug: "implementation-ia",
  hero: {
    eyebrow: "Solutions IA · Implémentation",
    headline: "Des skills IA sur-mesure, déployés dans votre stack, utilisés dès demain.",
    subHeadline:
      "On conçoit, on développe et on déploie des agents IA custom pour vos équipes : service client, sales, production, back-office. Intégrations, formation et support inclus.",
    priceFrom: "Sur devis",
    badges: [
      { label: "Sur-mesure 100%", icon: Sparkles },
      { label: "Support 3 mois", icon: ShieldCheck },
    ],
    cta: {
      primary: { label: "Discutons de votre besoin", href: "/v2/contact" },
      secondary: { label: "Voir la méthode", href: "#process" },
    },
    visual: {
      kind: "image",
      src: "/images/v2/solutions-ia/implementation-hero.jpg",
      alt: "Implémentation IA sur-mesure Aurentia",
    },
  },
  forWho: [
    {
      icon: Headphones,
      title: "Services client PME",
      description:
        "Vous croulez sous les tickets et les emails répétitifs. On construit un assistant qui répond, qualifie et escalade uniquement quand c'est nécessaire.",
    },
    {
      icon: Target,
      title: "Équipes commerciales",
      description:
        "Qualification de leads, préparation de rendez-vous, suivi post-call, génération de propositions : on automatise ce qui mange votre temps.",
    },
    {
      icon: Building2,
      title: "Production & back-office",
      description:
        "Rédaction de contrats, analyse de documents, traitement de dossiers : on met l'IA là où elle fait vraiment gagner des heures par jour.",
    },
  ],
  whatYouGet: {
    title: "Ce qui est inclus",
    items: [
      "Atelier de cadrage pour définir les cas d'usage prioritaires",
      "Cahier des charges technique validé avec vous",
      "Développement des skills IA sur-mesure pour vos workflows",
      "Intégrations avec votre stack (Supabase, Notion, HubSpot, Slack, email…)",
      "Déploiement en production sécurisé (RGPD-friendly)",
      "Formation de vos équipes à l'utilisation et à la maintenance",
      "Documentation technique et fonctionnelle complète",
      "Support prioritaire pendant 3 mois post-livraison",
    ],
  },
  process: [
    {
      number: "01",
      title: "Atelier de cadrage",
      description:
        "Une demi-journée pour cartographier vos process, valider les cas d'usage et définir le périmètre du MVP.",
    },
    {
      number: "02",
      title: "Cahier des charges",
      description:
        "On rédige un doc technique et fonctionnel précis : flux, intégrations, sécurité, métriques de succès. Validé avec vous avant de coder.",
    },
    {
      number: "03",
      title: "Développement",
      description:
        "Développement des skills IA, intégration à votre stack, tests sur vos vrais scénarios. On vous fait des démos régulières.",
    },
    {
      number: "04",
      title: "Déploiement",
      description:
        "Mise en production progressive, suivi des premières utilisations réelles, ajustements.",
    },
    {
      number: "05",
      title: "Formation & support",
      description:
        "Formation de vos équipes (utilisateurs et admins), remise de la documentation, 3 mois de support prioritaire.",
    },
  ],
  pricing: {
    title: "Tarification sur-mesure, selon le périmètre",
    subtitle:
      "Chaque implémentation est unique. On cadre le périmètre ensemble et on vous fournit un devis clair sous 48h après le cadrage.",
    packs: [
      {
        name: "Implémentation IA sur-mesure",
        price: "Sur devis",
        features: [
          "Atelier de cadrage inclus",
          "Cahier des charges détaillé",
          "Développement de skills custom illimités",
          "Intégrations stack (Supabase, Notion, HubSpot…)",
          "Déploiement production sécurisé",
          "Formation utilisateurs & admins",
          "Documentation technique complète",
          "3 mois de support prioritaire",
        ],
        cta: { label: "Demander un devis", href: "/v2/contact" },
      },
    ],
    note: "À titre indicatif, nos implémentations démarrent à 4 500 € pour un cas d'usage simple et montent selon la complexité.",
  },
  examples: {
    title: "Quelques implémentations récentes",
    items: [
      {
        title: "Cabinet Conseil — agent service client",
        imageUrl: "/images/v2/solutions-ia/impl-cabinet.jpg",
        href: "/v2/agence",
      },
      {
        title: "Groupe Meca — assistant commercial",
        imageUrl: "/images/v2/solutions-ia/impl-meca.jpg",
        href: "/v2/agence",
      },
      {
        title: "Cabinet Meridian — analyse documents",
        imageUrl: "/images/v2/solutions-ia/impl-meridian.jpg",
        href: "/v2/agence",
      },
      {
        title: "Fable Studio — assistant rédaction",
        imageUrl: "/images/v2/solutions-ia/impl-fable.jpg",
        href: "/v2/agence",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "On voulait un assistant pour notre service client. Aurentia l'a livré, intégré à HubSpot et formé l'équipe. Temps de première réponse divisé par trois, satisfaction en hausse.",
      author: "Thomas R.",
      role: "Directeur",
      company: "Cabinet Conseil",
      pillar: "solutions-ia",
    },
    {
      quote:
        "Ils ont construit un agent qui analyse nos dossiers en 30 secondes là où on mettait 20 minutes. Le ROI était atteint en 3 semaines d'usage.",
      author: "Alexandre D.",
      role: "Directeur",
      company: "Cabinet Meridian",
      pillar: "solutions-ia",
    },
  ],
  faq: [
    {
      question: "C'est quoi un skill IA exactement ?",
      answer:
        "Un skill, c'est un module (prompts, procédures, outils, intégrations) qui donne à Claude la capacité d'exécuter une tâche précise avec vos données et vos règles. C'est plus qu'un simple prompt — c'est un vrai agent métier.",
    },
    {
      question: "Mes données restent privées ?",
      answer:
        "Oui. On configure tout pour que vos données restent contrôlées : API keys privées, intégrations chiffrées, respect RGPD. On peut aussi déployer sur Claude Enterprise pour les besoins les plus stricts.",
    },
    {
      question: "Vous intégrez à quels outils ?",
      answer:
        "Tous les outils avec API : Supabase, HubSpot, Pipedrive, Notion, Airtable, Slack, Gmail, Zendesk, Stripe… On peut aussi développer des connecteurs custom si besoin.",
    },
    {
      question: "C'est quoi le délai moyen ?",
      answer:
        "Entre 2 et 6 semaines selon la complexité. Une automatisation simple peut prendre 2 semaines, un agent métier complet avec intégrations et dashboards peut monter à 6 semaines.",
    },
    {
      question: "Et si les besoins évoluent après livraison ?",
      answer:
        "Le support 3 mois couvre les ajustements mineurs. Pour les évolutions majeures, on propose des retainers mensuels ou des interventions à la demande. Tout est documenté pour que vous puissiez aussi faire évoluer en interne si vous en avez la compétence.",
    },
    {
      question: "Je suis propriétaire des skills développés ?",
      answer:
        "Oui, entièrement. Code source sur votre infra, documentation, prompts, tout vous appartient. Aucun enfermement.",
    },
    {
      question: "Vous garantissez des résultats ?",
      answer:
        "On ne garantit jamais des chiffres précis (qui pourrait ?), mais on définit en amont des métriques de succès claires avec vous. Si le projet ne tient pas ses objectifs, on refait le tour du problème ensemble.",
    },
  ],
  finalCta: {
    title: "On cadre votre implémentation IA ?",
    subtitle:
      "30 minutes pour comprendre votre besoin et vous dire si on peut livrer.",
    cta: { label: "Prendre rendez-vous", href: "/v2/contact" },
  },
};
