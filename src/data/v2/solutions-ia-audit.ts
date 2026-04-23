// src/data/v2/solutions-ia-audit.ts
// DRAFT_COPY — to refine before swap
import {
  Target,
  Building2,
  Briefcase,
  Users,
  Clock,
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
    priceFrom: "990 €",
    badges: [
      { label: "Livrable en 3 à 7 jours", icon: Clock },
      { label: "Roadmap chiffrée", icon: Target },
    ],
    cta: {
      primary: { label: "Demander l'audit", href: "/v2/contact" },
      secondary: { label: "Voir les formats", href: "#pricing" },
    },
    visual: {
      kind: "image",
      src: "/images/v2/solutions-ia/audit-hero.jpg",
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
        price: "990 €",
        priceSuffix: "demi-journée",
        features: [
          "Appel d'alignement de 30 min",
          "Demi-journée d'analyse en immersion",
          "Cartographie des 10 process clés",
          "Top 3 quick wins",
          "Rapport synthétique 5 pages",
          "Appel de restitution de 30 min",
        ],
        cta: { label: "Choisir Express", href: "/v2/contact" },
      },
      {
        name: "Audit Approfondi",
        price: "2 900 €",
        priceSuffix: "5 jours + atelier",
        recommended: true,
        features: [
          "Kick-off étendu avec les dirigeants",
          "5 jours de diagnostic",
          "Interviews avec 5 à 8 collaborateurs",
          "Cartographie complète des process",
          "Roadmap 90 jours chiffrée et priorisée",
          "Atelier de restitution de 2h",
          "Rapport PDF complet (20+ pages)",
          "2 semaines de questions/réponses post-livraison",
        ],
        cta: { label: "Choisir Approfondi", href: "/v2/contact" },
      },
    ],
    note: "L'audit est souvent déductible du budget d'une mission d'implémentation IA ultérieure chez Aurentia.",
  },
  examples: {
    title: "Quelques audits récents",
    items: [
      {
        title: "Groupe Meca — PME industrielle",
        imageUrl: "/images/v2/solutions-ia/audit-meca.jpg",
        href: "/v2/agence",
      },
      {
        title: "Cabinet Meridian — cabinet d'expertise",
        imageUrl: "/images/v2/solutions-ia/audit-meridian.jpg",
        href: "/v2/agence",
      },
      {
        title: "Fable Studio — agence contenu",
        imageUrl: "/images/v2/solutions-ia/audit-fable.jpg",
        href: "/v2/agence",
      },
      {
        title: "Pulsio — équipe produit SaaS",
        imageUrl: "/images/v2/solutions-ia/audit-pulsio.jpg",
        href: "/v2/agence",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "On s'attendait à un rapport vague. Ils nous ont sorti 27 chantiers IA priorisés avec du chiffrage. On a pu lancer les 5 premiers immédiatement.",
      author: "Alexandre D.",
      role: "Directeur",
      company: "Cabinet Meridian",
      pillar: "solutions-ia",
      stat: "27 chantiers IA",
    },
    {
      quote:
        "Le plus utile n'a pas été le rapport, mais l'atelier. Toute l'équipe est ressortie alignée sur la roadmap — c'est ça qui a débloqué les choses.",
      author: "Camille R.",
      role: "Head of Ops",
      company: "Fable Studio",
      pillar: "solutions-ia",
      stat: "Équipe alignée",
    },
  ],
  faq: [
    {
      question: "Quelle différence entre Express et Approfondi ?",
      answer:
        "L'Express est une prise de vue rapide (demi-journée) pour identifier les quick wins évidents. L'Approfondi est un vrai diagnostic de 5 jours avec interviews d'équipe, rapport complet et atelier de restitution. Express pour les petites structures, Approfondi pour les PME et plus.",
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
    cta: { label: "Réserver l'audit", href: "/v2/contact" },
  },
};
