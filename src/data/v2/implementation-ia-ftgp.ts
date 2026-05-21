// src/data/v2/implementation-ia-ftgp.ts
//
// Données de la ressource exclusive (non indexée) /ressources/implementation-ia-ftgp
// destinée aux membres French Tech Grande Provence, suite à l'intervention
// d'Elliot sur l'implémentation IA en entreprise.
//
// Lead magnet → objectif : réservation d'un rendez-vous.
//
// REMPLACER avant publication :
//   - canva.embedUrl   → URL d'embed Canva ("https://www.canva.com/design/<ID>/view?embed")
//   - video.youtubeId  → identifiant vidéo YouTube
//   - plugins.items[*] → titres / descriptions / nom de fichier / taille / lien

import {
  Calendar,
  Compass,
  PackageOpen,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type FinalCta = {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: { label: string; href: string };
  external?: boolean;
};

export const implementationIaFtgp = {
  partner: {
    name: "La French Tech Grande Provence",
    logo: {
      src: "/images/partners/french-tech-grande-provence.png",
      alt: "Logo La French Tech Grande Provence",
      width: 921,
      height: 1376,
    },
    href: "https://lafrenchtech-grandeprovence.fr/",
  },

  hero: {
    contextLabel: "Intervention exclusive · Mai 2026",
    eyebrow: "Ressource réservée aux membres",
    headline: "Implémenter l'IA dans ton entreprise",
    subheadline:
      "La présentation, le replay vidéo et les plugins prêts à l'emploi, la suite directe de l'intervention.",
    cta: {
      primary: { label: "Réserver un appel", href: "/contact" },
      secondary: { label: "Voir la présentation", href: "#presentation" },
    },
  },

  /** Cover image après le hero. Si absente, le composant ResourceCover
   *  affiche un placeholder co-brandé (gradient orange + lockup Aurentia ×
   *  partenaire). Remplir avec { src, alt } quand on a une vraie photo. */
  cover: undefined as { src: string; alt: string } | undefined,

  /** Sommaire / table des matières — un entry par section ID rendu dans
   *  la page. Sert au scroll-spy de ResourceArticleToc. */
  toc: [
    { id: "presentation", label: "La présentation" },
    { id: "replay", label: "Le replay vidéo" },
    { id: "plugins", label: "Les plugins" },
    { id: "aller-plus-loin", label: "Aller plus loin" },
  ],

  canva: {
    eyebrow: "La présentation",
    title: "Les slides de l'intervention",
    description:
      "Reprends chaque concept à ton rythme. Naviguer dans les slides ne remplace pas le replay, c'est complémentaire.",
    embedUrl: "https://www.canva.com/design/DAHKJQgCTaE/P_nzhL99j6X-4sb5NwX1FQ/view?embed",
  },

  video: {
    eyebrow: "Le replay",
    title: "Revoir l'intervention en intégralité",
    description:
      "L'enregistrement complet, chapitré. Idéal si tu veux pousser plus loin un concept ou montrer la session à ton équipe.",
    youtubeId: "REPLACE_VIDEO_ID",
  },

  plugin: {
    eyebrow: "Le plugin",
    title: "Aurentia Plugin",
    description:
      "Un plugin clé-en-main avec 11 skills business adaptés au droit français + un sous-flux onboarding (capture business profile via /start). Compatible Claude Desktop, claude.ai et Claude Code. Aucune inscription.",
    version: "2.1",
    download: {
      label: "Télécharger le plugin",
      // Le filename est ce que voit l'utilisateur après téléchargement (avec espace OK)
      filename: "Aurentia Plugin.zip",
      // L'URL elle doit rester URL-safe (sans espace). ?v=<date> = cache busting.
      href: "/ressources/ftgp/Aurentia-Plugin.zip?v=20260521-1118",
      size: "335 KB",
    },

    /** Infographie : les 3 étapes d'usage du plugin. */
    steps: [
      {
        number: "01",
        icon: PackageOpen,
        title: "Installer",
        description:
          "Télécharge le zip et place le dossier dans Claude Desktop (Paramètres → Plugins) ou dans `~/.claude/plugins/` pour Claude Code.",
      },
      {
        number: "02",
        icon: Rocket,
        title: "Lancer l'onboarding",
        description:
          "Dis « démarre » ou « start » à Claude. Le skill aurentia capture ton business profile en 5 min (nom, URL, ICP, stade, priorités) — réutilisable dans toutes tes sessions.",
      },
      {
        number: "03",
        icon: Sparkles,
        title: "Utiliser les 11 skills",
        description:
          "Décris ton besoin en langage naturel (« je dois faire un devis », « mon client paye pas »…). Le bon skill s'active automatiquement avec les bons garde-fous FR.",
      },
    ],

    /** Les 11 skills regroupés par catégorie pour l'affichage en grid. */
    skillCategories: [
      {
        label: "Réflexion & décision",
        skills: [
          {
            name: "aurentia",
            description: "Routeur central + onboarding business profile",
          },
          {
            name: "ceo",
            description:
              "Diagnostic stratégique, frameworks (Hormozi, Thiel, YC), plan 100 jours",
          },
          {
            name: "brainstorming",
            description: "Idéation, naming, premortem, exploration d'un problème",
          },
        ],
      },
      {
        label: "Commercial",
        skills: [
          {
            name: "devis",
            description: "Devis, propositions commerciales, CDC, SOW",
          },
          {
            name: "vente",
            description:
              "Prospection, discovery call, objections, closing, suivi pipeline",
          },
          {
            name: "facture",
            description:
              "Factures FR conformes, relances d'impayés graduées, prévi tréso",
          },
        ],
      },
      {
        label: "Communication",
        skills: [
          {
            name: "social-media",
            description:
              "Posts LinkedIn, ads, calendrier édito, hooks, études de cas",
          },
          {
            name: "email",
            description:
              "Welcome sequence, drip, newsletter, re-engagement, audit deliverability",
          },
        ],
      },
      {
        label: "Opérations",
        skills: [
          {
            name: "réunion",
            description: "Agendas, comptes-rendus structurés, suivi d'actions",
          },
          {
            name: "projet",
            description:
              "Cadrage, planning, SOP, automatisation, gestion de tâches",
          },
          {
            name: "contrat",
            description:
              "Prestation, NDA, CGV, RGPD, mentions légales (droit FR)",
          },
        ],
      },
    ],
  },

  finalCtas: [
    {
      icon: Calendar,
      title: "Réserve un appel découverte",
      description:
        "30 min avec Elliot pour cadrer ton implémentation IA, identifier les premiers cas d'usage et chiffrer la mise en route.",
      cta: { label: "Bloquer un créneau", href: "/contact" },
    },
    {
      icon: Sparkles,
      title: "Faire implémenter par l'agence",
      description:
        "Aurentia Agency : audit IA, déploiement Claude, chatbots, automatisations n8n et formation des équipes, clé en main.",
      cta: { label: "Voir nos solutions IA", href: "/solutions-ia" },
    },
    {
      icon: Compass,
      title: "Former ton équipe",
      description:
        "Formation IA Aurentia : 4 semaines pour mettre toute l'équipe au même niveau, avec coaching 1-1 et accès communauté.",
      cta: { label: "Voir la formation", href: "/solutions-ia/formation-ia" },
    },
  ] satisfies FinalCta[],
};
