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
      "App, plateforme, marketplace, site sur-mesure pensé pour vendre. On part de votre besoin, on conçoit, on développe — et on vous remet un projet qui vous appartient à 100% et qui rapporte. À partir de 6 000 €.",
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
      title: "Vous lancez un projet ambitieux",
      description:
        "Une première version de votre app, une plateforme qui doit grandir vite, un espace de gestion à repenser. Vous voulez un partenaire qui livre vraiment, qui reste joignable et qui pense à long terme — pas une agence qui sous-traite à l'autre bout du monde.",
    },
    {
      icon: Sparkles,
      title: "Vous avez une marque ou une expérience à incarner",
      description:
        "Votre site doit raconter une histoire et marquer vos visiteurs. Animations, parcours sur-mesure, contenus interactifs, connexions à vos outils internes. Un template Wix ne tiendra pas la promesse — il vous faut quelque chose de vraiment unique.",
    },
  ],
  whatYouGet: {
    title: "Tout ce qu'il faut pour livrer un projet sérieux.",
    subtitle:
      "Pas de ticket caché, pas d'option qui apparaît au bout de 3 mois. Le scope est verrouillé en début, le devis est ferme.",
    items: [
      "Une base technique moderne, fiable, qui tiendra 5 ans sans devoir tout refaire",
      "Un design 100% sur-mesure, pensé pour vos clients et votre image",
      "Un espace d'administration privé pour piloter votre projet sans nous appeler",
      "Connexions à vos outils existants (paiement, emails, CRM, calendrier…)",
      "Comptes utilisateurs sécurisés avec différents niveaux d'accès",
      "Parfait sur mobile, tablette, desktop — sans compromis",
      "Optimisé pour Google + suivi des performances",
      "Le code, les bases de données et les domaines : tout est à votre nom",
      "30 jours de support post-livraison inclus",
    ],
    groups: [
      {
        icon: Layers,
        title: "Une base solide pour durer",
        pitch: "Construit sur les technologies que les grosses boîtes utilisent. Votre projet ne sera pas obsolète dans 2 ans.",
        items: [
          "Pensé pour absorber 100× plus de trafic sans devoir tout refaire",
          "Performant, rapide à charger — vos clients ne décrochent pas",
          "Hébergement haut de gamme, disponible partout dans le monde",
        ],
      },
      {
        icon: Plug,
        title: "Connecté à vos outils",
        pitch: "On branche votre projet à ce qui le rend efficace : paiement, emails, CRM, agendas, vos process métier.",
        items: [
          "Paiements en ligne (abonnements, achats, marketplace)",
          "Emails automatiques (confirmations, relances, notifications)",
          "Connexion à vos outils internes ou tiers — au cas par cas",
        ],
      },
      {
        icon: Shield,
        title: "Sécurisé et 100% à vous",
        pitch: "Vos données sont protégées. Le projet vous appartient — on ne vous tient jamais en otage.",
        items: [
          "Le code, la base de données et les domaines sont à votre nom",
          "Données protégées par utilisateur, accès contrôlés",
          "Vous pouvez partir avec tout, à tout moment",
        ],
      },
      {
        icon: Database,
        title: "Construit pour rapporter",
        pitch: "On code propre dès le premier jour pour que votre projet reste rentable à faire évoluer — pas un fardeau qu'il faut tout refaire dans 18 mois.",
        items: [
          "Pas de dette cachée — on ne prend pas de raccourcis qui coûtent cher après",
          "Évolutions futures faciles à ajouter (par nous ou un autre dev)",
          "Documentation claire pour reprendre la main sans friction",
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
      title: "Développement par paliers",
      description:
        "On avance par étapes d'une à deux semaines, avec une démo à chaque fois. Vous suivez le projet en direct sur un lien privé — pas d'effet tunnel.",
      icon: Code2,
    },
    {
      number: "05",
      title: "Mise en ligne & remise des clés",
      description:
        "Mise en production, transfert de tout (code, accès, domaine), formation pour gérer votre projet en autonomie. 30 jours de support inclus.",
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
          "App web, plateforme, marketplace, expérience de marque. Construit pour grandir, livré clé en main, et 100% à vous.",
        recommended: true,
        highlightLabel: "SUR DEVIS",
        features: [
          "Cadrage gratuit + devis ferme avant de signer",
          "Une base technique moderne, prête à grandir",
          "Design 100% sur-mesure pensé pour vos clients",
          "Espace d'administration privé pour piloter en autonomie",
          "Connexions à vos outils (paiement, emails, CRM…)",
          "Comptes utilisateurs sécurisés, multi-rôles",
          "Code, base de données, domaines : tout à votre nom",
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
        title: "Comparateur IA Facile — comparateur SaaS",
        imageUrl: "/realisations/comparateur-ia/hero.webp",
        href: "/realisations/comparateur-ia-facile",
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
        "Entre 4 et 12 semaines selon la complexité. Une première version simple : 4 à 6 semaines. Une plateforme complète avec plein de fonctionnalités : 8 à 12 semaines. Le planning est fixé dans le devis, pas après — vous savez exactement quoi attendre, et quand.",
    },
    {
      question: "Suis-je vraiment propriétaire du projet à 100% ?",
      answer:
        "Oui, entièrement. Le code, la base de données et les domaines sont à votre nom dès le premier jour. Vous pouvez partir avec votre projet à tout moment — c'est non négociable de notre côté. Aucun lock-in, aucune dépendance à nous.",
    },
    {
      question: "Que se passe-t-il si je veux ajouter des fonctionnalités en cours de route ?",
      answer:
        "Le périmètre initial est verrouillé pour éviter le « projet qui dérape ». Toute nouvelle demande est chiffrée séparément et validée par vous avant d'être lancée. Vous gardez le contrôle, pas de mauvaise surprise sur la facture finale.",
    },
    {
      question: "Quelle stack technique vous utilisez ?",
      answer:
        "Question pour les curieux : par défaut on travaille avec Next.js (le framework qu'utilisent Netflix, TikTok ou Notion), Supabase (base de données + comptes utilisateurs), Stripe (paiement) et Vercel (hébergement). C'est la stack qu'on maîtrise par cœur, qui tient la charge et qui durera 5 ans sans réécriture. On l'adapte si votre besoin l'exige.",
    },
    {
      question: "Vous proposez de la maintenance après les 30 jours ?",
      answer:
        "Oui, en option. Forfaits maintenance à partir de 350 €/mois : mises à jour de sécurité, surveillance, petites évolutions. Sinon vous pouvez gérer vous-même — le code est propre et bien documenté, vous (ou votre dev) pouvez reprendre la main sans friction.",
    },
    {
      question: "Est-ce que vous sous-traitez le développement ?",
      answer:
        "Non. Tout est codé en interne par notre équipe basée à Avignon. C'est ce qui nous permet de tenir les délais, garantir la qualité et rester proches du projet. Pas de dilution offshore.",
    },
    {
      question: "Pourquoi le tarif démarre à 6 000 € ?",
      answer:
        "Parce qu'en dessous, ce n'est plus du sur-mesure — c'est un site vitrine ou une landing page (qu'on fait aussi, à partir de 1 200 € et 1 500 €). 6 000 €, c'est le minimum pour un projet construit sérieusement, avec un espace d'administration et un projet 100% à vous. En dessous, regardez plutôt nos packs vitrine ou landing.",
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
    { value: "100%", label: "projet à vous" },
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
      title: "Votre projet vous appartient à 100%",
      description:
        "Code, base de données, domaines : tout est à votre nom dès le premier jour. Vous pouvez partir avec votre projet quand vous voulez — aucun lock-in, aucune dépendance à nous.",
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
        label: "Projet 100% à vous",
        values: [true, false, "Selon contrat"],
      },
      {
        label: "Pensé pour grandir",
        values: ["Sans limite", "Limité (lock-in plateforme)", "Sans limite"],
      },
      {
        label: "Connexions à vos outils",
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
