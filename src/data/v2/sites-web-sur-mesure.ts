// src/data/v2/sites-web-sur-mesure.ts
// DRAFT_COPY — to refine before swap
import {
  Layers,
  MessageSquare,
  Palette,
  Code2,
  Rocket,
  Eye,
  RefreshCw,
  LifeBuoy,
  Shield,
  Database,
  Plug,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { SubPageData } from "./types";

export const sitesWebSurMesureData: SubPageData = {
  parentSlug: "sites-web",
  slug: "sur-mesure",
  hero: {
    eyebrow: "Sites Web · Sur-mesure",
    headline: "Le projet web qui sort du cadre. Conçu, codé, livré.",
    subHeadline:
      "App, marketplace, plateforme, expérience brand-strong. Quand un template ne suffit pas, on architecture, on développe et on vous remet le code. À partir de 6 000 €.",
    priceFrom: "6 000 €",
    badges: [],
    cta: {
      primary: { label: "Cadrer mon projet", href: "/contact" },
      secondary: { label: "Voir les exemples", href: "#examples" },
    },
    visual: {
      kind: "image",
      src: "/images/portfolio/friendiz-1.webp",
      alt: "Projet sur-mesure Friendiz — marketplace livrée par Aurentia",
    },
  },
  forWho: [
    {
      icon: Rocket,
      title: "Founder SaaS, marketplace ou app web",
      description:
        "Vous avez un MVP en tête, une plateforme à scaler, ou un back-office à repenser. Vous cherchez un partenaire tech qui code propre, livre vite et reste sur la durée — pas une agence qui sous-traite à l'autre bout du monde.",
    },
    {
      icon: Sparkles,
      title: "Marque ou projet expérientiel",
      description:
        "Votre site doit raconter une vraie histoire. Parcours sur-mesure, animations, intégrations métier, contenus interactifs. Un template Wix ou un thème Webflow ne tiendra pas la promesse — il vous faut du custom, conçu sur-mesure pour votre marque.",
    },
  ],
  whatYouGet: {
    title: "Tout ce qu'il faut pour livrer un projet sérieux.",
    subtitle:
      "Pas de ticket caché, pas d'option qui apparaît au bout de 3 mois. Le scope est verrouillé en début, le devis est ferme.",
    items: [
      "Architecture Next.js + Supabase + Stripe (ou stack adaptée à votre besoin)",
      "Design 100% sur-mesure pensé pour votre marque et votre parcours",
      "Back-office admin pour gérer votre contenu, vos utilisateurs, vos données",
      "Intégrations API (Stripe, Resend, Google, CRM, outils internes…)",
      "Authentification, rôles, RLS — sécurisé dès le premier commit",
      "Responsive mobile, tablette, desktop",
      "SEO technique complet + analytics",
      "Code remis 100% (GitHub) + documentation technique",
      "30 jours de support post-livraison inclus",
    ],
    groups: [
      {
        icon: Layers,
        title: "Architecture solide",
        pitch: "Next.js + Supabase + Stripe. La stack qu'on connaît par cœur, qui scale, qui dure.",
        items: [
          "Next.js 14+ App Router, TypeScript strict",
          "Supabase Postgres + Auth + Storage + Realtime",
          "Déploiement Vercel — instantané, scalable",
        ],
      },
      {
        icon: Plug,
        title: "Intégrations métier",
        pitch: "On connecte ce qu'il faut connecter. Stripe, Resend, Google, votre CRM, vos outils internes.",
        items: [
          "Paiements Stripe (subscription, one-shot, marketplace)",
          "Emails transactionnels Resend / SendGrid",
          "Webhooks et APIs custom selon votre besoin",
        ],
      },
      {
        icon: Shield,
        title: "Sécurité & propriété",
        pitch: "Code à votre nom, RLS sur toutes les tables, secrets jamais exposés.",
        items: [
          "Code remis 100% sur votre GitHub",
          "Row Level Security obligatoire sur toute table",
          "Variables d'environnement chiffrées, jamais de secret en dur",
        ],
      },
      {
        icon: Database,
        title: "Scalable dès le jour 1",
        pitch: "Pensé pour tenir x100 sans réécriture. Pas de raccourci, pas de dette cachée.",
        items: [
          "Schéma DB normalisé, indexé, prêt à scaler",
          "Composants réutilisables, code typé strict",
          "Migrations versionnées, déploiements reproductibles",
        ],
      },
    ],
  },
  process: [
    {
      number: "01",
      title: "Call découverte (gratuit)",
      description:
        "30 minutes pour comprendre votre projet, votre cible, vos contraintes, votre budget. On vous dit franchement si on est le bon partenaire ou pas.",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "Cahier des charges chiffré",
      description:
        "Sous 5 jours : périmètre détaillé, choix techniques, planning, devis ferme. Vous savez exactement quoi, quand et combien — avant de signer.",
      icon: Workflow,
    },
    {
      number: "03",
      title: "Design & wireframes",
      description:
        "Maquettes Figma de toutes les vues clés. Deux tours de révision inclus. On valide ensemble avant la moindre ligne de code.",
      icon: Palette,
    },
    {
      number: "04",
      title: "Développement itératif",
      description:
        "Sprints d'une à deux semaines avec démo systématique. Vous voyez le projet avancer en temps réel sur une URL de staging.",
      icon: Code2,
    },
    {
      number: "05",
      title: "Livraison & handover",
      description:
        "Mise en prod, transfert du code et des accès, formation au back-office, documentation technique. 30 jours de support inclus.",
      icon: Rocket,
    },
  ],
  pricing: {
    title: "Un budget clair. Un projet livré.",
    subtitle: "Pas de pack figé sur du sur-mesure. Un floor à 6 000 €, un devis ferme sous 5 jours.",
    packs: [
      {
        name: "Projet sur-mesure",
        price: "À partir de 6 000 €",
        priceNote: "Sur devis selon scope — chiffrage ferme sous 5 jours",
        description:
          "App web, marketplace, plateforme, expérience brand. Architecture pensée pour scaler, code remis, support inclus.",
        recommended: true,
        highlightLabel: "SUR DEVIS",
        features: [
          "Cadrage gratuit + cahier des charges chiffré",
          "Architecture Next.js + Supabase + Stripe",
          "Design 100% sur-mesure",
          "Back-office admin sur-mesure",
          "Intégrations API (Stripe, Resend, CRM…)",
          "Authentification + rôles + RLS",
          "Code remis 100% sur votre GitHub",
          "30 jours de support post-livraison",
        ],
        cta: { label: "Cadrer mon projet", href: "/contact" },
      },
    ],
    conditions: [
      "Cadrage et devis : gratuits, sans engagement",
      "Paiement échelonné en 3 ou 4 fois selon le projet",
      "Scope verrouillé en début — pas de surprise en cours de route",
      "Demandes hors scope chiffrées séparément, jamais imposées",
    ],
    note: "Vous n'êtes pas sûr que ça rentre dans le sur-mesure ? On regarde ensemble — 20 minutes au téléphone et vous savez.",
    sideLink: { label: "Comparer les offres Sites Web", href: "/sites-web" },
  },
  examples: {
    title: "Deux projets sur-mesure récents",
    items: [
      {
        title: "Friendiz — marketplace sociale",
        imageUrl: "/images/portfolio/friendiz-1.webp",
        href: "/realisations/friendiz",
      },
      {
        title: "HighLove — marque expérientielle",
        imageUrl: "/images/portfolio/highlove-1.webp",
      },
    ],
  },
  testimonials: [],
  faq: [
    {
      question: "Quel est le délai réel pour un projet sur-mesure ?",
      answer:
        "Entre 4 et 12 semaines selon la complexité. Un MVP SaaS simple : 4 à 6 semaines. Une marketplace ou plateforme complète : 8 à 12 semaines. Le planning est fixé dans le cahier des charges, pas après — vous savez exactement quoi attendre quand.",
    },
    {
      question: "Suis-je propriétaire du code à 100% ?",
      answer:
        "Oui, entièrement. Le code est poussé sur votre GitHub dès le premier commit, les bases de données sont à votre nom, les domaines sont à votre nom. Vous pouvez partir avec votre projet à tout moment — c'est non négociable de notre côté.",
    },
    {
      question: "Que se passe-t-il si on veut ajouter des fonctionnalités en cours de route ?",
      answer:
        "Le scope initial est verrouillé pour éviter le « projet qui dérape ». Toute demande hors scope est chiffrée séparément et validée par vous avant d'être lancée. Pas de mauvaise surprise sur la facture finale.",
    },
    {
      question: "Quelle stack technique vous utilisez ?",
      answer:
        "Par défaut : Next.js 14+ (TypeScript strict), Supabase (Postgres + Auth + Storage), Stripe pour le paiement, Vercel pour le déploiement. C'est la stack qu'on connaît par cœur, qui scale et qui durera 5 ans sans réécriture. On adapte si votre besoin l'exige (ex : Shopify pour l'e-commerce, Python pour du traitement IA).",
    },
    {
      question: "Vous proposez de la maintenance après les 30 jours ?",
      answer:
        "Oui, en option. Forfaits maintenance à partir de 350 €/mois (mises à jour sécurité, monitoring, petites évolutions). Sinon vous pouvez gérer vous-même — le code est propre, documenté, vous (ou votre dev) pouvez reprendre la main sans friction.",
    },
    {
      question: "Est-ce que vous sous-traitez le développement ?",
      answer:
        "Non. Tout est codé en interne par notre équipe basée à Avignon. C'est ce qui nous permet de tenir les délais, garantir la qualité et rester proches du projet. Pas de dilution offshore.",
    },
    {
      question: "Pourquoi le floor est à 6 000 € ?",
      answer:
        "Parce qu'en dessous, ce n'est plus du sur-mesure — c'est un site vitrine ou une landing page (qu'on fait aussi, à partir de 1 200 € et 1 500 €). 6 000 €, c'est le minimum pour un projet custom avec architecture sérieuse, back-office et code remis. En dessous, vous avez intérêt à regarder nos packs vitrine ou landing.",
    },
  ],
  finalCta: {
    title: "On cadre votre projet cette semaine ?",
    subtitle:
      "30 minutes au téléphone, on vous dit si on est le bon partenaire et combien ça coûte. Devis ferme sous 5 jours.",
    cta: { label: "Réserver un cadrage gratuit", href: "/contact" },
  },
  trustStats: [
    { value: "6 000 €", label: "à partir de" },
    { value: "100%", label: "code remis" },
    { value: "5 jours", label: "devis ferme" },
    { value: "Avignon", label: "équipe interne" },
  ],
  guarantees: [
    {
      icon: Eye,
      title: "Cadrage gratuit, devis ferme",
      description:
        "Aucun euro tant que vous n'avez pas validé le cahier des charges chiffré. Pas de devis flou, pas de pricing élastique en cours de route.",
    },
    {
      icon: Shield,
      title: "Code remis 100% sur votre GitHub",
      description:
        "Vous êtes propriétaire de tout : code, base de données, domaines, secrets. Vous pouvez partir avec votre projet quand vous voulez — c'est non négociable.",
    },
    {
      icon: RefreshCw,
      title: "Scope verrouillé, pas de surprise",
      description:
        "Le périmètre est figé dans le cahier des charges. Toute évolution hors scope est chiffrée et validée par vous avant d'être lancée.",
    },
    {
      icon: LifeBuoy,
      title: "30 jours de support post-livraison",
      description:
        "Bug, question, ajustement : on reste joignables pendant 30 jours après la mise en prod. Maintenance long terme dispo en option.",
    },
  ],
  comparison: {
    title: "Aurentia sur-mesure vs. les alternatives",
    subtitle: "Quand le no-code ne tient plus et qu'une grosse agence coûte 4× le prix.",
    columns: [
      { label: "Aurentia", highlight: true },
      { label: "No-code (Webflow / Bubble)" },
      { label: "Grosse agence" },
    ],
    rows: [
      {
        label: "Prix projet sur-mesure",
        values: ["6 000 – 25 000 €", "3 000 – 8 000 €", "25 000 – 80 000 €"],
      },
      {
        label: "Délai de livraison",
        values: ["4 – 12 semaines", "2 – 8 semaines", "4 – 9 mois"],
      },
      {
        label: "Code remis 100%",
        values: [true, false, "Selon contrat"],
      },
      {
        label: "Scalabilité long terme",
        values: ["Native (Next + Supabase)", "Limitée (lock-in)", "Native"],
      },
      {
        label: "Intégrations API custom",
        values: [true, "Limitées", true],
      },
      {
        label: "Équipe interne",
        values: ["Avignon, in-house", "Selon prestataire", "Souvent sous-traité"],
      },
      {
        label: "Cadrage gratuit",
        values: [true, false, false],
      },
    ],
  },
};
