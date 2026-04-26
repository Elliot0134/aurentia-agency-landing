// src/data/v2/sites-web-ecommerce.ts
import {
  ShoppingBag,
  RefreshCw,
  Boxes,
  MessageSquare,
  Palette,
  Code2,
  Rocket,
  Eye,
  LifeBuoy,
  CreditCard,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import type { SubPageData } from "./types";

export const sitesWebEcommerceData: SubPageData = {
  parentSlug: "sites-web",
  slug: "ecommerce",
  hero: {
    eyebrow: "Sites Web · E-commerce",
    headline: "La boutique Shopify qui vend dès la mise en ligne.",
    subHeadline:
      "Design sur-mesure, paiement sécurisé, livraison configurée, email marketing branché. Livrée en 7 jours, à partir de 2 500 €.",
    priceFrom: "2 500 €",
    badges: [
      { label: "Shopify expert", icon: ShoppingBag },
      { label: "Sur-mesure Next.js + Stripe possible", icon: Sparkles },
    ],
    cta: {
      primary: { label: "Discutons de ma boutique", href: "/contact" },
      secondary: { label: "Voir les tarifs", href: "#pricing" },
    },
    visual: {
      kind: "image",
      src: "/images/portfolio/friendiz-1.webp",
      alt: "Boutique e-commerce livrée par Aurentia Agency",
    },
  },
  forWho: [
    {
      icon: Rocket,
      title: "Vous lancez votre première boutique",
      description:
        "Une marque, un produit, une vision — mais pas encore de boutique en ligne. Vous voulez vendre dès la première semaine, pas dans 3 mois.",
    },
    {
      icon: RefreshCw,
      title: "Votre boutique actuelle ne convertit pas",
      description:
        "Vous avez du trafic mais peu de ventes. Le design fait fuir, le checkout est pénible, le mobile est cassé. Une refonte ciblée peut tout changer.",
    },
    {
      icon: Boxes,
      title: "Vous voulez automatiser votre back-office",
      description:
        "Vos commandes explosent, vos ops manuelles aussi. Stock, expédition, support, emails : on connecte tout pour que vous repreniez du temps.",
    },
  ],
  whatYouGet: {
    title: "Une boutique qui vend, pas juste qui existe.",
    subtitle:
      "Tout ce qu'il faut pour vendre dès le jour 1. Pas de surcharge cachée, pas de frais surprise.",
    items: [
      "Design 100% sur-mesure pensé pour votre marque",
      "Catalogue produits structuré, fiches optimisées",
      "Paiement sécurisé (Stripe, PayPal, Apple/Google Pay)",
      "Livraison configurée (Mondial Relay, Colissimo, Chronopost)",
      "Email marketing branché (Klaviyo, Brevo)",
      "Multi-devises et multi-langues sur les packs avancés",
      "Analytics complet (GA4, Meta Pixel, TikTok Pixel)",
      "Formation back-office et support inclus 30 jours",
    ],
    groups: [
      {
        icon: Palette,
        title: "Design qui vend",
        pitch: "Une boutique qui inspire confiance et donne envie d'acheter.",
        items: [
          "Direction artistique sur-mesure pour votre marque",
          "Fiches produits éditoriales (galerie, UGC, social proof)",
          "Mobile-first, parfait sur tous les écrans",
        ],
      },
      {
        icon: TrendingUp,
        title: "Conversion & SEO",
        pitch: "Optimisé pour transformer le trafic en commandes.",
        scores: [
          { label: "Performance", value: 95 },
          { label: "SEO", value: 100 },
          { label: "Accessibilité", value: 100 },
        ],
      },
      {
        icon: CreditCard,
        title: "Paiement & livraison",
        pitch: "Tout configuré, tout testé, dès la mise en ligne.",
        items: [
          "Stripe + PayPal + Apple/Google Pay",
          "Transporteurs FR + Europe (Mondial Relay, Colissimo, Chronopost)",
          "TVA, factures, retours : conformes dès le jour 1",
        ],
      },
      {
        icon: LifeBuoy,
        title: "Accompagnement humain",
        pitch: "Un interlocuteur dédié du brief à la première vente.",
        items: [
          "Formation back-office (1h en visio, replay fourni)",
          "Support inclus 30 jours après la mise en ligne",
          "Documentation personnalisée pour votre équipe",
        ],
      },
    ],
  },
  process: [
    {
      number: "01",
      title: "Brief & catalogue",
      description:
        "Appel de cadrage, audit du catalogue produits, définition de l'arborescence et de la stratégie de prix.",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "Design boutique",
      description:
        "Maquettes sur-mesure de la home, des fiches produit, du panier et du checkout. Deux aller-retours inclus.",
      icon: Palette,
    },
    {
      number: "03",
      title: "Build & intégrations",
      description:
        "Développement Shopify (ou Next.js + Stripe), intégration paiement, livraison, email marketing et analytics.",
      icon: Code2,
    },
    {
      number: "04",
      title: "Lancement & formation",
      description:
        "Mise en ligne, tests de commande, formation back-office en visio, support inclus pendant 30 jours.",
      icon: Rocket,
    },
  ],
  pricing: {
    title: "Un prix clair. Une boutique qui se rentabilise.",
    subtitle: "3 packs. Pas de surprise. Paiement en 3× possible.",
    packs: [
      {
        name: "One-Product",
        price: "2 500 €",
        description: "Une marque, un produit phare. Lancement express.",
        features: [
          "Boutique Shopify monoproduit ou collection courte",
          "Thème entièrement sur-mesure",
          "Paiement Stripe + PayPal + Apple/Google Pay",
          "Livraison configurée (Mondial Relay, Colissimo)",
          "Emails transactionnels (commande, expédition)",
          "Référencement Google de base",
          "Formation back-office (1h en visio)",
        ],
        subscription: "29 €/mois",
        subscriptionDetails:
          "Maintenance technique, surveillance, support sous 72h, sauvegardes automatiques",
        cta: { label: "Choisir One-Product", href: "/contact" },
      },
      {
        name: "Boutique Croissance",
        price: "à partir de 3 900 €",
        description: "Catalogue complet, croissance pilotée par la donnée.",
        recommended: true,
        highlightLabel: "POPULAIRE",
        features: [
          "Tout le pack One-Product",
          "Catalogue produits illimité",
          "Multi-devises + multi-langues (FR/EN)",
          "Blog SEO + 4 articles par mois optimisés",
          "Email marketing branché (Klaviyo ou Brevo)",
          "Analytics complet (GA4, Meta Pixel, TikTok Pixel)",
          "Page collections custom + filtres avancés",
        ],
        subscription: "59 €/mois",
        subscriptionDetails:
          "Plan 29 € + 1 modification/mois, support sous 24h, 4 articles SEO/mois",
        cta: { label: "Choisir Croissance", href: "/contact" },
      },
      {
        name: "Premium",
        price: "à partir de 6 500 €",
        priceNote: "Sur devis — Shopify Plus ou sur-mesure Next.js + Stripe",
        description: "Volume, complexité, ambition internationale.",
        features: [
          "Tout le pack Croissance",
          "Shopify Plus OU sur-mesure Next.js + Stripe",
          "Agent IA support et recommandation produits",
          "Intégration ERP / gestion de stock",
          "Automatisations n8n (commandes, support, retargeting)",
          "Connexions Mondial Relay / Colissimo / Chronopost API",
          "Tableau de bord business sur-mesure",
        ],
        subscription: "149 €/mois",
        subscriptionDetails:
          "Plan 59 € + modifications illimitées, rapport business mensuel, support sous 12h",
        cta: { label: "Choisir Premium", href: "/contact" },
      },
    ],
    conditions: [
      "Paiement 50% au lancement, solde à la mise en ligne",
      "Paiement en 3x possible",
      "3 tours de révision inclus",
      "1er mois d'abonnement offert",
    ],
    note: "Vous voulez migrer depuis WooCommerce, Wix ou Prestashop ? On reprend votre catalogue et vos clients existants.",
    sideLink: { label: "Parler de ma migration", href: "/contact" },
  },
  examples: {
    title: "Quelques boutiques récentes",
    items: [
      {
        title: "Friend'iz — boutique communautaire",
        imageUrl: "/images/portfolio/friendiz-1.webp",
        href: "/realisations/friendiz",
      },
      {
        title: "Maison Enileh — épicerie libanaise",
        imageUrl: "/images/portfolio/maison-enileh-1.webp",
        href: "/realisations/maison-enileh",
      },
      {
        title: "AlloRestau — commandes en ligne",
        imageUrl: "/images/portfolio/allo-restau-1.webp",
        href: "/realisations/allo-restau",
      },
      {
        title: "Comparateur IA — boutique d'outils",
        imageUrl: "/images/portfolio/comparateur-ia-1.webp",
        href: "/realisations/comparateur-ia-facile",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "On voulait une boutique qui ressemble à notre marque, pas un thème Shopify de plus. Aurentia a livré une expérience dont on est fiers — et qui convertit.",
      author: "Léa M.",
      role: "Fondatrice",
      company: "Boutique mode indépendante",
      pillar: "sites-web",
      stat: "Livré en 7 jours",
    },
    {
      quote:
        "Notre ancienne boutique nous coûtait des ventes. Après la refonte, le checkout est devenu fluide, le mobile parfait. On a vu la différence dès la première semaine.",
      author: "Marc T.",
      role: "Co-fondateur",
      company: "Marque DTC food",
      pillar: "sites-web",
      stat: "+34% conversion",
    },
  ],
  faq: [
    {
      question: "Combien de temps pour avoir ma boutique en ligne ?",
      answer:
        "Entre 7 et 14 jours ouvrés selon la complexité du catalogue et la réactivité sur les contenus. Le pack One-Product est le plus rapide (7 jours), le pack Croissance prend 10 à 14 jours.",
    },
    {
      question: "Je n'ai pas de photos produits ni de descriptions, vous pouvez m'aider ?",
      answer:
        "Oui. On peut organiser un shooting photo simple, retoucher vos visuels existants, et rédiger les fiches produits avec vous. Une partie est faite avec l'IA pour aller vite, mais on relit et on adapte à votre marque.",
    },
    {
      question: "Les frais Shopify sont-ils inclus dans le prix ?",
      answer:
        "Non. L'abonnement Shopify (29 €/mois pour la formule de base, plus selon le plan) est facturé directement par Shopify sur votre compte. Vous gardez le contrôle complet et la propriété de votre boutique.",
    },
    {
      question: "Comment ça se passe pour la TVA et la facturation ?",
      answer:
        "On configure tout dès la mise en ligne : taux de TVA selon vos zones de vente, factures automatiques aux clients, export comptable. Vous êtes conformes dès le jour 1, en France comme en Europe.",
    },
    {
      question: "Quels transporteurs sont supportés ?",
      answer:
        "Mondial Relay, Colissimo, Chronopost, UPS, DHL — tout ce qu'il faut pour livrer en France et en Europe. Sur le pack Premium, on connecte directement les API pour automatiser bordereaux et suivi.",
    },
    {
      question: "Et pour vendre à l'international (multi-langues, multi-devises) ?",
      answer:
        "Inclus à partir du pack Croissance : français + anglais, multi-devises (€, $, £, etc.), conversion automatique selon la géolocalisation du visiteur. On peut ajouter d'autres langues sur devis.",
    },
    {
      question: "Vous gérez les migrations depuis WooCommerce, Wix ou Prestashop ?",
      answer:
        "Oui. On reprend votre catalogue produits, vos clients, votre historique de commandes, vos URLs (avec redirections SEO propres). C'est un poste à part dans le devis, on le chiffre après audit de l'existant.",
    },
  ],
  finalCta: {
    title: "On lance votre boutique cette semaine ?",
    subtitle:
      "15 minutes au téléphone et vous savez quoi, quand et combien. Devis clair sous 24h.",
    cta: { label: "Réserver un créneau", href: "/contact" },
  },
  trustStats: [
    { value: "7 j", label: "délai moyen" },
    { value: "Shopify", label: "expert certifié" },
    { value: "1", label: "interlocuteur dédié" },
    { value: "100%", label: "propriétaire de la boutique" },
  ],
  guarantees: [
    {
      icon: Eye,
      title: "Maquette validée avant build",
      description:
        "Vous voyez le design de la home, des fiches produit et du checkout avant qu'on développe. Pas convaincu ? Zéro euro déboursé.",
    },
    {
      icon: RefreshCw,
      title: "3 tours de révision inclus",
      description:
        "On ajuste ensemble jusqu'à ce que la boutique vous ressemble. Sans surcoût caché, sans limite floue.",
    },
    {
      icon: LifeBuoy,
      title: "30 jours de support post-live",
      description:
        "Bug, question, ajustement de fiche produit, configuration : on reste dispo après la mise en ligne. Vous n'êtes jamais lâché.",
    },
  ],
  comparison: {
    title: "Aurentia vs. le reste",
    subtitle:
      "Ce qu'on fait mieux — et ce qu'on ne prétend pas faire mieux.",
    columns: [
      { label: "Aurentia", highlight: true },
      { label: "Freelance Shopify" },
      { label: "Agence Shopify Plus" },
    ],
    rows: [
      {
        label: "Prix boutique sur-mesure",
        values: ["2 500 – 6 500 €", "1 500 – 5 000 €", "12 000 – 40 000 €"],
      },
      {
        label: "Délai de livraison",
        values: ["7 – 14 jours", "3 – 8 semaines", "2 – 4 mois"],
      },
      {
        label: "Design 100% sur-mesure",
        values: [true, false, true],
      },
      {
        label: "Email marketing branché",
        values: [true, "Au cas par cas", true],
      },
      {
        label: "Multi-langues / multi-devises",
        values: ["Dès Croissance", "En option", true],
      },
      {
        label: "Formation back-office",
        values: [true, false, "Contrat obligatoire"],
      },
      {
        label: "Sur-mesure Next.js + Stripe possible",
        values: [true, false, "Rare"],
      },
      {
        label: "Propriété de la boutique",
        values: [true, true, "Souvent verrouillée"],
      },
    ],
  },
};
