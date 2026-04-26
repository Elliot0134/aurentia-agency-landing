// src/data/solutions-ia-formation.ts
// DRAFT_COPY — to refine before swap
import {
  Sparkles,
  Users,
  Briefcase,
  Building2,
  ClipboardList,
  Video,
  Hammer,
  Trophy,
  Clock,
} from "lucide-react";
import type { SubPageData } from "./types";

export const solutionsIaFormationData: SubPageData = {
  parentSlug: "solutions-ia",
  slug: "formation-ia",
  hero: {
    eyebrow: "Solutions IA · Formation · Bientôt disponible",
    headline: "La formation IA qui se voit sur la productivité dès la semaine d'après.",
    subHeadline:
      "On finalise actuellement le programme — sessions live, plateforme vidéo, bibliothèque de skills, exercices sur vos vrais cas d'usage. Contactez-nous pour être prévenu·e en avant-première (et bénéficier des conditions de lancement).",
    priceFrom: "990 €",
    badges: [
      { label: "Bientôt disponible", icon: Clock },
      { label: "De 1 à 15 personnes", icon: Users },
      { label: "Cas d'usage réels", icon: Sparkles },
    ],
    cta: {
      primary: { label: "Être prévenu·e en avant-première", href: "/contact" },
      secondary: { label: "Voir le programme", href: "#what-you-get" },
    },
    visual: {
      kind: "image",
      src: "/images/solutions-ia/formation-hero.jpg",
      alt: "Session de formation IA Aurentia",
    },
  },
  forWho: [
    {
      icon: Users,
      title: "Équipes produit & tech",
      description:
        "Devs, PM, designers qui veulent vraiment utiliser Claude dans leur workflow et ne plus juste l'essayer de temps en temps.",
    },
    {
      icon: Briefcase,
      title: "Freelances ambitieux",
      description:
        "Solopreneurs et freelances qui veulent travailler comme une équipe grâce à l'IA — sans s'y perdre.",
    },
    {
      icon: Building2,
      title: "Dirigeants PME",
      description:
        "Dirigeants qui veulent que toute leur équipe monte en IA rapidement, avec un ROI mesurable.",
    },
  ],
  whatYouGet: {
    title: "Ce qui est inclus",
    items: [
      "Accès à notre plateforme de cours vidéo (60+ modules)",
      "Bibliothèque de skills Claude pré-configurés, prêts à l'emploi",
      "3 sessions live en visio avec un expert Aurentia",
      "Exercices construits sur vos vrais cas d'usage",
      "Templates de prompts et de skills customisés pour votre métier",
      "Canal Slack de support pendant 30 jours post-formation",
      "Certificat de formation (éligible budget formation)",
      "Enregistrements des sessions pour le replay à vie",
    ],
  },
  process: [
    {
      number: "01",
      title: "Pré-formation",
      description:
        "On vous envoie un questionnaire pour comprendre votre équipe, votre stack et vos besoins. On adapte le contenu.",
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Sessions live",
      description:
        "3 sessions de 2 heures en visio : prise en main, cas d'usage avancés, création de skills sur-mesure.",
      icon: Video,
    },
    {
      number: "03",
      title: "Pratique guidée",
      description:
        "Entre les sessions, vous pratiquez sur vos vrais dossiers. Support Slack pour débloquer rapidement.",
      icon: Hammer,
    },
    {
      number: "04",
      title: "Bilan & autonomie",
      description:
        "Bilan final avec l'équipe, remise du certificat, plan d'action pour continuer à monter en compétence.",
      icon: Trophy,
    },
  ],
  pricing: {
    title: "Deux formules selon la taille de votre équipe",
    packs: [
      {
        name: "Découverte",
        price: "990 €",
        priceSuffix: "3 personnes max",
        features: [
          "Accès plateforme vidéo (1 an)",
          "2 sessions live de 2h",
          "Bibliothèque de skills pré-configurés",
          "Canal Slack 30 jours",
          "Certificat de formation",
          "Éligible OPCO",
        ],
        cta: { label: "Choisir Découverte", href: "/contact" },
      },
      {
        name: "Équipe complète",
        price: "2 900 €",
        priceSuffix: "jusqu'à 15 personnes",
        recommended: true,
        features: [
          "Accès plateforme vidéo (1 an)",
          "3 sessions live de 2h",
          "Bibliothèque + 3 skills custom pour votre métier",
          "Canal Slack 60 jours",
          "Audit rapide de votre stack en bonus",
          "Certificat individuel",
          "Éligible OPCO",
        ],
        cta: { label: "Choisir Équipe complète", href: "/contact" },
      },
    ],
    note: "Formation éligible aux fonds OPCO sur demande. Devis officiel fourni sous 24h.",
  },
  examples: {
    title: "Quelques équipes déjà formées",
    items: [
      {
        title: "Groupe Meca — PME industrielle",
        href: "/agence",
      },
      {
        title: "Cabinet Conseil — 12 consultants",
        href: "/agence",
      },
      {
        title: "Studio Nord — agence créative",
        href: "/agence",
      },
      {
        title: "Freelances collective — 8 solopreneurs",
        href: "/agence",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "En trois sessions, on a plus appris sur l'IA que dans tous les webinars de l'année. Et surtout on l'utilise vraiment maintenant — c'est la vraie différence.",
      author: "Sandrine V.",
      role: "Directrice opérations",
      company: "Groupe Meca",
      pillar: "solutions-ia",
      stat: "Équipe autonome",
    },
    {
      quote:
        "Le fait que la formation soit basée sur nos vrais dossiers a tout changé. On a ressorti des skills utilisables dès le lendemain.",
      author: "Hugo F.",
      role: "Consultant senior",
      company: "Cabinet Conseil",
      pillar: "solutions-ia",
      stat: "Utilisé dès J+1",
    },
  ],
  faq: [
    {
      question: "C'est pour quel niveau ?",
      answer:
        "Pour tous les niveaux, du débutant total au dev confirmé. On adapte le rythme et les cas d'usage en fonction du questionnaire pré-formation. Si votre équipe est très hétérogène, on peut faire deux groupes.",
    },
    {
      question: "Vous formez à Claude uniquement ou à d'autres IA ?",
      answer:
        "Principalement Claude (c'est notre spécialité et c'est aujourd'hui le plus pertinent pour le pro). On couvre aussi les bases sur les autres IA grand public et sur les choix à faire selon le cas d'usage.",
    },
    {
      question: "C'est éligible au budget formation ?",
      answer:
        "Oui, on peut fournir les documents OPCO sur demande (programme, objectifs pédagogiques, etc.). On vous accompagne dans la démarche si vous en avez besoin.",
    },
    {
      question: "Combien de temps dure la formation ?",
      answer:
        "3 sessions live de 2h réparties sur 2 à 3 semaines, plus les cours vidéo en autonomie (≈10h). Soit ~15h de formation effective, étalées pour permettre la mise en pratique entre les sessions.",
    },
    {
      question: "Vous pouvez venir sur site ?",
      answer:
        "Oui, pour les équipes de 8+ personnes, on peut faire la formation en présentiel sur votre site. Frais de déplacement à ajouter selon la localisation.",
    },
    {
      question: "Et après la formation ?",
      answer:
        "Canal Slack de support actif 30 à 60 jours selon le pack, accès à la plateforme vidéo pendant 1 an, et possibilité de passer sur nos offres Configuration Claude ou Implémentation IA pour aller plus loin.",
    },
  ],
  finalCta: {
    title: "On forme votre équipe ce mois-ci ?",
    subtitle:
      "30 minutes au téléphone pour caler les objectifs et le planning.",
    cta: { label: "Demander la formation", href: "/contact" },
  },
};
