// src/data/v2/solutions-ia-config-claude.ts
// DRAFT_COPY — to refine before swap
import {
  Code2,
  Briefcase,
  Users,
  Sparkles,
  Clock,
} from "lucide-react";
import type { SubPageData } from "./types";

export const solutionsIaConfigClaudeData: SubPageData = {
  parentSlug: "solutions-ia",
  slug: "configuration-claude",
  hero: {
    eyebrow: "Solutions IA · Configuration Claude",
    headline: "Claude Code, configuré comme un vrai membre de votre équipe.",
    subHeadline:
      "CLAUDE.md, hooks, skills, MCP servers : on installe et paramètre Claude Code pour votre stack, vos process et votre équipe. Opérationnel en 2 à 5 jours.",
    priceFrom: "1 500 €",
    badges: [
      { label: "Livré en 2 à 5 jours", icon: Clock },
      { label: "100% sur-mesure", icon: Sparkles },
    ],
    cta: {
      primary: { label: "Discutons de votre setup", href: "/v2/contact" },
      secondary: { label: "Voir ce qui est inclus", href: "#what" },
    },
    visual: {
      kind: "image",
      src: "/images/v2/solutions-ia/config-claude-hero.jpg",
      alt: "Setup Claude Code configuré par Aurentia",
    },
  },
  forWho: [
    {
      icon: Code2,
      title: "Développeurs solo",
      description:
        "Vous utilisez Claude Code mais vous sentez que vous pourriez en tirer 5× plus. On transforme votre setup en cockpit.",
    },
    {
      icon: Users,
      title: "Équipes tech",
      description:
        "Vous voulez que toute votre équipe utilise Claude avec les mêmes conventions, hooks, skills et règles de qualité.",
    },
    {
      icon: Briefcase,
      title: "Agences & studios",
      description:
        "Vous livrez des projets clients et vous avez besoin d'un setup Claude reproductible, templatisé, versionné.",
    },
  ],
  whatYouGet: {
    title: "Ce qui est inclus",
    items: [
      "CLAUDE.md complet adapté à votre stack et vos conventions",
      "Hooks personnalisés (pre-commit, format, lint, tests) branchés à votre CI",
      "3 à 5 skills Claude custom pour vos tâches récurrentes",
      "Configuration des MCP servers pertinents (Supabase, GitHub, Notion, Linear…)",
      "Fichier de settings global partageable à toute votre équipe",
      "Documentation interne pour onboarder un nouveau dev en 15 minutes",
      "Session de handover d'1 heure pour former votre équipe",
      "30 jours de support pour ajuster les skills après mise en production",
    ],
  },
  process: [
    {
      number: "01",
      title: "Audit de stack",
      description:
        "On regarde votre codebase, vos conventions, votre CI et vos pain points. Objectif : savoir ce qu'on doit automatiser.",
    },
    {
      number: "02",
      title: "Design du setup",
      description:
        "On rédige le CLAUDE.md, on définit les hooks et on liste les skills à créer. Validation rapide avec vous.",
    },
    {
      number: "03",
      title: "Développement & tests",
      description:
        "On développe les skills custom, on branche les hooks et on teste sur vos vrais scénarios.",
    },
    {
      number: "04",
      title: "Handover & support",
      description:
        "Session d'1 heure pour former l'équipe, livraison du repo de config, support 30 jours inclus.",
    },
  ],
  pricing: {
    title: "Un seul pack, transparent",
    packs: [
      {
        name: "Configuration Claude Pro",
        price: "1 500 €",
        features: [
          "Audit de stack inclus",
          "CLAUDE.md complet adapté à votre code",
          "Hooks pre-commit / format / tests",
          "3 à 5 skills Claude custom",
          "Configuration MCP servers",
          "Session handover de 1h",
          "Documentation interne",
          "30 jours de support",
        ],
        cta: { label: "Commander la configuration", href: "/v2/contact" },
      },
    ],
    note: "Pour les équipes de plus de 10 devs ou les stacks complexes, on adapte le périmètre et le prix.",
  },
  examples: {
    title: "Quelques configurations récentes",
    items: [
      {
        title: "Studio Nord — agence créative",
        imageUrl: "/images/v2/solutions-ia/config-studio-nord.jpg",
        href: "/v2/agence",
      },
      {
        title: "Northlight — startup SaaS",
        imageUrl: "/images/v2/solutions-ia/config-northlight.jpg",
        href: "/v2/agence",
      },
      {
        title: "Groupe Meca — outil interne",
        imageUrl: "/images/v2/solutions-ia/config-meca.jpg",
        href: "/v2/agence",
      },
      {
        title: "Kairos Ops — équipe growth",
        imageUrl: "/images/v2/solutions-ia/config-kairos.jpg",
        href: "/v2/agence",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "Avant Aurentia, on utilisait Claude à 20% de ses possibilités. Depuis leur setup, on lance nos features avec des skills automatisés — c'est un autre métier.",
      author: "Matthieu G.",
      role: "Lead dev",
      company: "Studio Nord",
      pillar: "solutions-ia",
    },
    {
      quote:
        "Le CLAUDE.md qu'ils ont écrit est meilleur que notre propre documentation. Et les hooks pré-commit ont supprimé 80% des allers-retours sur le code review.",
      author: "Elena S.",
      role: "CTO",
      company: "Northlight",
      pillar: "solutions-ia",
    },
  ],
  faq: [
    {
      question: "C'est quoi exactement un CLAUDE.md ?",
      answer:
        "C'est le fichier de règles que Claude Code lit automatiquement pour comprendre votre projet : conventions, stack, structure, patterns à respecter. Bien écrit, il fait gagner des heures à chaque session.",
    },
    {
      question: "C'est quoi les hooks ?",
      answer:
        "Des scripts qui se déclenchent à des moments clés (avant un commit, après un edit, etc.). On les utilise pour forcer le format, lancer les tests, vérifier les types — tout ce qui doit être automatique.",
    },
    {
      question: "Je n'ai jamais utilisé Claude Code, c'est pour moi ?",
      answer:
        "Oui. On configure tout pour vous et on vous forme à la livraison. Vous n'avez pas besoin d'avoir une expertise préalable — on s'en charge.",
    },
    {
      question: "Vous créez des skills pour tous les langages ?",
      answer:
        "Oui : Next.js/React, Python, Node, Rails, etc. On travaille régulièrement avec ces stacks. Pour des langages plus exotiques, on vérifie la faisabilité en amont.",
    },
    {
      question: "Je peux modifier les skills après ?",
      answer:
        "Évidemment. Tout est versionné dans votre repo, vous avez la main totale. On livre avec une doc interne pour que vous puissiez les faire évoluer sans dépendre de nous.",
    },
    {
      question: "Et si mes besoins changent dans 6 mois ?",
      answer:
        "On propose des retainers mensuels pour les équipes qui veulent faire évoluer leur setup en continu, ou des interventions à la demande. Vous n'êtes jamais coincé.",
    },
  ],
  finalCta: {
    title: "On configure votre Claude cette semaine ?",
    subtitle:
      "30 minutes d'audit gratuit pour cadrer ce qui mérite d'être automatisé chez vous.",
    cta: { label: "Prendre rendez-vous", href: "/v2/contact" },
  },
};
