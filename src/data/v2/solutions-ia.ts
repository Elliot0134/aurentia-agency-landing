// src/data/v2/solutions-ia.ts
// DRAFT_COPY — to refine before swap
// NOTE: stats are plausible placeholders.
import {
  BrainCircuit,
  Lightbulb,
  Settings,
  Video,
  Briefcase,
  Users,
  Building2,
  Target,
  Clock,
  ScanSearch,
  ClipboardList,
  Cog,
  Headphones,
} from "lucide-react";
import type { CommercialPillarData } from "./types";

export const solutionsIaData: CommercialPillarData = {
  slug: "solutions-ia",
  hero: {
    eyebrow: "Pilier Solutions IA",
    headline:
      "L'IA qui travaille vraiment pour vous — pas à la place.",
    subHeadline:
      "Formations, configuration Claude, audits et skills custom. On déploie l'IA dans votre équipe pour qu'elle devienne un vrai levier de productivité.",
    badges: [
      { label: "Partenaire Anthropic Claude", icon: BrainCircuit },
      { label: "Déploiement en 1 semaine", icon: Clock },
    ],
    cta: {
      primary: {
        label: "Discutons de votre besoin IA",
        href: "/v2/contact",
      },
      secondary: { label: "Voir les offres", href: "#sub-offers" },
    },
    visual: {
      kind: "image",
      src: "/images/v2/solutions-ia/hero.jpg",
      alt: "Illustration solutions IA Aurentia",
    },
  },
  stats: [
    { value: "30+", label: "équipes formées" },
    { value: "3 jours", label: "formation moyenne" },
    { value: "Partenaire", label: "Anthropic Claude" },
    { value: "−70%", label: "tâches manuelles" },
  ],
  subOffers: {
    variant: "grid",
    title: "Quatre façons de déployer l'IA chez vous",
    items: [
      {
        icon: Video,
        title: "Formation IA",
        pitch:
          "On forme votre équipe à utiliser Claude, les skills et les agents IA pour 5× leur productivité.",
        priceFrom: "990 €",
        href: "/v2/solutions-ia/formation-ia",
      },
      {
        icon: Settings,
        title: "Configuration Claude",
        pitch:
          "On paramètre Claude Code pour votre stack : CLAUDE.md, hooks, skills, MCP servers. Tout opérationnel.",
        priceFrom: "1 500 €",
        href: "/v2/solutions-ia/configuration-claude",
      },
      {
        icon: Lightbulb,
        title: "Audit IA",
        pitch:
          "On analyse vos process et on identifie les leviers IA à fort ROI. Roadmap 90 jours en sortie.",
        priceFrom: "990 €",
        href: "/v2/solutions-ia/audit",
      },
      {
        icon: BrainCircuit,
        title: "Implémentation IA",
        pitch:
          "On développe et déploie des skills IA custom dans votre stack. Intégrations, formation, support inclus.",
        priceFrom: "Sur devis",
        href: "/v2/solutions-ia/implementation-ia",
      },
    ],
  },
  forWho: {
    title: "Pour qui on déploie de l'IA",
    profiles: [
      {
        icon: Briefcase,
        title: "Freelances & solopreneurs",
        description:
          "Vous voulez travailler comme une équipe de cinq en étant seul. Objectif : automatiser tout ce qui n'a pas besoin de vous.",
      },
      {
        icon: Building2,
        title: "PME qui veulent passer à l'échelle",
        description:
          "Vous avez une équipe qui peine à absorber la charge. On déploie l'IA là où elle soulage vraiment, sans casser les process existants.",
      },
      {
        icon: Target,
        title: "Équipes sales & support",
        description:
          "Vous voulez automatiser le qualifying, la réponse mail, la préparation de rendez-vous, le suivi client. On construit les skills pour ça.",
      },
      {
        icon: Users,
        title: "Cabinets conseil & experts",
        description:
          "Vous produisez des livrables, des rapports, des analyses. On met l'IA dans votre workflow pour gagner 40 à 60% du temps sur la production.",
      },
    ],
  },
  method: {
    title: "Notre méthode en 4 étapes",
    steps: [
      {
        number: "01",
        title: "Audit",
        description:
          "On cartographie vos process et on identifie les quick wins IA à fort ROI. Livrable : une note claire avec les leviers prioritaires.",
        icon: ScanSearch,
      },
      {
        number: "02",
        title: "Plan d'action",
        description:
          "On priorise les chantiers IA et on définit ensemble une roadmap sur 30 à 90 jours. Pas d'effet d'annonce — que du concret.",
        icon: ClipboardList,
      },
      {
        number: "03",
        title: "Déploiement",
        description:
          "On configure Claude, on développe les skills et on intègre dans votre stack. Vous voyez les résultats en une à trois semaines.",
        icon: Cog,
      },
      {
        number: "04",
        title: "Formation",
        description:
          "On forme vos équipes à utiliser et faire évoluer les outils. À la fin, vous êtes autonome.",
        icon: Headphones,
      },
    ],
  },
  realisationsFiltered: [
    {
      slug: "skill-claude-conseil",
      title: "Skill Claude pour un cabinet de conseil",
      client: "Cabinet Conseil",
      pillar: "solutions-ia",
      resultKpi: "−65% temps de réponse client",
      imageUrl: "/images/v2/realisations/solutions-ia-1.jpg",
      href: "/v2/agence",
    },
    {
      slug: "formation-pme-industrie",
      title: "Formation IA pour une PME industrielle",
      client: "Groupe Meca",
      pillar: "solutions-ia",
      resultKpi: "+40% de productivité équipe",
      imageUrl: "/images/v2/realisations/solutions-ia-2.jpg",
      href: "/v2/agence",
    },
  ],
  testimonialsFiltered: [
    {
      quote:
        "On a formé toute l'équipe en trois jours, et en deux semaines on avait des gains concrets. C'est la formation IA la plus utile qu'on ait jamais suivie.",
      author: "Sandrine V.",
      role: "Directrice opérations",
      company: "Groupe Meca",
      pillar: "solutions-ia",
      stat: "+40% productivité",
    },
    {
      quote:
        "Aurentia a configuré Claude pour notre cabinet, construit deux skills custom, et formé l'équipe. Résultat : nos associés gagnent 1 à 2 heures par jour.",
      author: "Thomas R.",
      role: "Directeur",
      company: "Cabinet Conseil",
      pillar: "solutions-ia",
      stat: "+2h/jour/associé",
    },
  ],
  faq: [
    {
      question: "Vous êtes vraiment partenaires d'Anthropic ?",
      answer:
        "Oui. On utilise Claude au quotidien depuis les toutes premières versions et on fait partie de leur programme partenaires. On a un accès avancé à leurs outils et on remonte du feedback direct à leurs équipes.",
    },
    {
      question: "Je ne sais pas ce que je veux, vous pouvez m'aider à définir le besoin ?",
      answer:
        "Oui, c'est exactement pour ça qu'on propose l'offre Audit. En une demi-journée à 5 jours selon la taille, on cartographie vos process et on sort une roadmap claire.",
    },
    {
      question: "Est-ce que mes données vont sortir de l'entreprise ?",
      answer:
        "On configure tout pour que vos données restent contrôlées : API keys privées, stockage local si besoin, respect RGPD. On peut aussi déployer sur Claude Enterprise pour les besoins les plus stricts.",
    },
    {
      question: "Quelle différence entre Formation et Configuration Claude ?",
      answer:
        "La formation forme votre équipe aux bons usages, à la culture et aux bons prompts. La configuration, c'est le travail technique : installer Claude, configurer CLAUDE.md, créer hooks et skills sur-mesure pour votre stack. Les deux sont complémentaires.",
    },
    {
      question: "C'est quoi un skill Claude custom exactement ?",
      answer:
        "Un skill, c'est un module (prompts, procédures, outils) qu'on attache à Claude pour qu'il devienne expert sur une tâche précise : répondre à votre service client, générer vos contrats, analyser vos dossiers, etc. Vous les lancez en une commande.",
    },
    {
      question: "Combien de temps pour voir des résultats ?",
      answer:
        "En général, une à trois semaines après le déploiement. Nos clients voient les premiers gains (automatisations, accélérations) dès la première semaine, puis la courbe d'adoption monte sur le mois.",
    },
  ],
  finalCta: {
    title: "On audite votre stack IA cette semaine ?",
    subtitle:
      "30 minutes au téléphone pour identifier vos priorités IA et chiffrer un plan d'action.",
    cta: { label: "Réserver l'audit", href: "/v2/contact" },
  },
};
