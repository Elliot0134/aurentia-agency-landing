// src/data/solutions-ia-audit.ts
// DRAFT_COPY — to refine before swap
import {
  Building2,
  Briefcase,
  Users,
  MessageSquare,
  Search,
  BarChart3,
  FileText,
} from "lucide-react";
import type { SubPageData } from "./types";

export const solutionsIaAuditData: SubPageData = {
  parentSlug: "solutions-ia",
  slug: "audit",
  hero: {
    eyebrow: "Solutions IA · Audit",
    headline: "L'audit IA qui sort une vraie roadmap, pas un PowerPoint.",
    subHeadline:
      "On cartographie vos process, on identifie les chantiers IA à fort ROI, et on vous livre une roadmap 90 jours chiffrée et priorisée.",
    priceFrom: "800 €",
    badges: [],
    cta: {
      primary: { label: "Demander l'audit", href: "/contact" },
      secondary: { label: "Voir les formats", href: "#pricing" },
    },
    visual: {
      kind: "image",
      src: "/images/solutions-ia/audit-hero.jpg",
      alt: "Audit IA Aurentia livrables",
    },
  },
  forWho: [
    {
      icon: Building2,
      title: "Dirigeants curieux",
      description:
        "Vous entendez parler d'IA partout mais vous ne savez pas où commencer chez vous. On fait le tri.",
    },
    {
      icon: Briefcase,
      title: "Directeurs opérations",
      description:
        "Vous voulez automatiser mais vous ne voulez pas casser ce qui marche. On identifie les bons leviers prudemment.",
    },
    {
      icon: Users,
      title: "CTO & leads techniques",
      description:
        "Vous voulez une vue externe sur ce que l'IA peut vraiment apporter à vos produits et à votre équipe.",
    },
  ],
  whatYouGet: {
    title: "Ce que vous recevez",
    items: [
      "Cartographie complète de vos process (≈20 à 40 process identifiés)",
      "Scoring IA-compatibilité pour chaque process (ROI vs. effort)",
      "Top 5 quick wins à lancer dans les 30 jours",
      "Roadmap 90 jours chiffrée et priorisée",
      "Estimation du gain en temps et en euros par chantier",
      "Recommandations stack (quels outils, quels modèles, quelles intégrations)",
      "Atelier de restitution avec votre équipe (Approfondi uniquement)",
      "Rapport PDF prêt à partager à votre COMEX",
    ],
  },
  process: [
    {
      number: "01",
      title: "Kick-off",
      description:
        "Appel d'alignement pour comprendre votre activité, votre organisation et vos priorités stratégiques.",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "Entretiens & immersion",
      description:
        "On interroge 3 à 8 personnes clés dans votre équipe et on observe les process réels, pas les process rêvés.",
      icon: Search,
    },
    {
      number: "03",
      title: "Analyse & priorisation",
      description:
        "On scoring chaque process selon l'impact IA potentiel, la faisabilité et le ROI attendu. On priorise.",
      icon: BarChart3,
    },
    {
      number: "04",
      title: "Livraison & restitution",
      description:
        "Rapport PDF complet, roadmap 90 jours chiffrée, atelier de restitution avec votre équipe pour embarquer tout le monde.",
      icon: FileText,
    },
  ],
  pricing: {
    title: "Deux formats selon l'ambition",
    packs: [
      {
        name: "Audit Express",
        price: "800 €",
        priceSuffix: "demi-journée",
        features: [
          "Appel d'alignement de 30 min",
          "Demi-journée d'analyse en immersion",
          "Cartographie des 10 process clés",
          "Top 3 quick wins",
          "Rapport synthétique 5 pages",
          "Appel de restitution de 30 min",
        ],
        cta: { label: "Choisir Express", href: "/contact" },
      },
      {
        name: "Audit Approfondi",
        price: "2 900 €",
        priceSuffix: "2 jours + atelier",
        recommended: true,
        features: [
          "Kick-off étendu avec les dirigeants",
          "2 jours de diagnostic",
          "Interviews avec 5 à 8 collaborateurs",
          "Cartographie complète des process",
          "Roadmap 90 jours chiffrée et priorisée",
          "Atelier de restitution de 2h",
          "Rapport PDF complet (20+ pages)",
          "2 semaines de questions/réponses post-livraison",
        ],
        cta: { label: "Choisir Approfondi", href: "/contact" },
      },
    ],
    note: "L'audit est souvent déductible du budget d'une mission d'implémentation IA ultérieure chez Aurentia.",
  },
  examples: {
    title: "Quelques audits récents",
    items: [],
  },
  testimonials: [
    {
      quote:
        "Je m'attendais à un PowerPoint vague avec trois recos consensuelles. On est ressorti avec 27 chantiers IA priorisés, chiffrés et reliés à un vrai gain métier. On a lancé les 5 premiers la semaine suivante — sans avoir à les revendre en interne.",
      author: "Alexandre Delaunay",
      role: "Directeur associé",
      company: "Cabinet Meridian — conseil RH",
      pillar: "solutions-ia",
      stat: "27 chantiers priorisés",
    },
    {
      quote:
        "Le rapport est utile, mais le vrai déclic c'est l'atelier de restitution. Pour la première fois en deux ans, toute l'équipe est sortie alignée sur la même roadmap IA. C'est ça qui a débloqué les budgets, pas le PDF.",
      author: "Camille Rouvier",
      role: "Head of Ops",
      company: "Fable Studio — production audio",
      pillar: "solutions-ia",
      stat: "Équipe alignée en 2 j",
    },
    {
      quote:
        "On hésitait depuis des mois sur où mettre nos billes IA. L'audit nous a évité d'investir 40 k€ sur un projet voué à l'échec, et nous a redirigés sur une automatisation à 80 k€ d'impact annuel. Payé largement avec un seul chantier évité.",
      author: "Yannis Belhadj",
      role: "COO",
      company: "Northbridge — agence média",
      pillar: "solutions-ia",
      stat: "+80 k€ / an d'impact",
    },
  ],
  faq: [
    {
      question: "Quelle différence entre Express et Approfondi ?",
      answer:
        "L'Express est une prise de vue rapide (demi-journée) pour identifier les quick wins évidents. L'Approfondi est un vrai diagnostic de 2 jours avec interviews d'équipe, rapport complet et atelier de restitution. Express pour les petites structures, Approfondi pour les PME et plus.",
    },
    {
      question: "Vous imposez une stack ou des outils ?",
      answer:
        "Non. On recommande des stacks mais c'est vous qui décidez. On est agnostique dans nos recommandations — même si on a des préférences basées sur l'expérience.",
    },
    {
      question: "Combien de personnes à interviewer ?",
      answer:
        "3 pour l'Express, 5 à 8 pour l'Approfondi, en incluant dirigeants, managers et opérationnels. On a besoin des trois niveaux pour avoir une vue fidèle.",
    },
    {
      question: "Est-ce qu'on est obligé d'implémenter avec vous ensuite ?",
      answer:
        "Non. L'audit est vendu seul. Vous pouvez ensuite implémenter avec nous, avec une autre agence, ou en interne. On est totalement transparent là-dessus.",
    },
    {
      question: "C'est éligible budget formation/conseil ?",
      answer:
        "Dans certains cas oui, selon votre OPCO et le statut de votre structure. On peut fournir les documents nécessaires sur demande.",
    },
    {
      question: "Quel est le délai de livraison ?",
      answer:
        "3 à 7 jours ouvrés pour l'Express, 2 à 3 semaines pour l'Approfondi (incluant le temps des interviews et de la rédaction du rapport).",
    },
  ],
  finalCta: {
    title: "On fait votre audit ce mois-ci ?",
    subtitle:
      "30 minutes d'appel pour cadrer le format et le planning.",
    cta: { label: "Réserver l'audit", href: "/contact" },
  },
};
