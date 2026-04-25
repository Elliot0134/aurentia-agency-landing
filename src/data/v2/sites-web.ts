// src/data/sites-web.ts
// Content sourced from live /sites-vitrines page
import {
  Globe,
  FileText,
  Rocket,
  Sparkles,
  Clock,
  MessageSquare,
  Palette,
  Code2,
  Search,
  Smartphone,
  Headphones,
  Shield,
  BrainCircuit,
  Eye,
  HandCoins,
  Hotel,
  UtensilsCrossed,
  Store,
  Briefcase,
  Dumbbell,
  Building2,
} from "lucide-react";
import type { CommercialPillarData, FAQItem } from "./types";
import type { LucideIcon } from "lucide-react";

/* ──────────────────────────────────────────────
   Extra types for sections not in CommercialPillarData
   ────────────────────────────────────────────── */

export type SitesWebFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type SitesWebNiche = {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  href?: string;
  ctaLabel?: string;
};

export type SitesWebPack = {
  name: string;
  price: string;
  priceSuffix?: string;
  tagline: string;
  popular?: boolean;
  features: string[];
  bonuses: string[];
  subscription: string;
  subscriptionNote: string;
  cta: { label: string; href: string };
};

export type SitesWebWhyItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type SitesWebExtra = {
  features: SitesWebFeature[];
  niches: {
    title: string;
    subtitle: string;
    items: SitesWebNiche[];
    footerNote: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    packs: SitesWebPack[];
    paymentTerms: string[];
  };
  why: {
    title: string;
    subtitle: string;
    items: SitesWebWhyItem[];
  };
  faqExtended: FAQItem[];
  finalCta: {
    title: string;
    description: string;
    cta: { label: string; href: string };
    bullets: string[];
  };
};

/* ──────────────────────────────────────────────
   Core pillar data (hero, method, etc.)
   ────────────────────────────────────────────── */

export const sitesWebData: CommercialPillarData = {
  slug: "sites-web",
  hero: {
    eyebrow: "Sites vitrines sur-mesure",
    headline:
      "Votre site vitrine sur-mesure.\nLivré en 72h dès 1 500 €.",
    subHeadline:
      "Design unique, SEO intégré, performance native. Propulsé par l'IA, forgé par 20 ans d'expertise web. On vous montre le résultat avant de facturer.",
    badges: [
      { label: "Livré en 72h", icon: Clock },
      { label: "Dès 1 500 €", icon: Sparkles },
    ],
    cta: {
      primary: { label: "Réserver mon call découverte", href: "/contact" },
      secondary: { label: "Voir les tarifs", href: "#pricing" },
    },
    visual: {
      kind: "image",
      src: "/images/sites-web/hero.jpg",
      alt: "Aperçus de sites livrés par Aurentia",
    },
  },
  stats: [
    { value: "200+", label: "sites livrés" },
    { value: "72h", label: "délai moyen" },
    { value: "100%", label: "sur-mesure" },
    { value: "4.9/5", label: "satisfaction clients" },
  ],
  subOffers: {
    variant: "grid",
    title: "Deux formats, un même niveau d'exigence",
    items: [
      {
        icon: Globe,
        title: "Site vitrine",
        pitch:
          "Pour présenter votre activité, générer de la confiance et capter des leads locaux.",
        priceFrom: "1 500 €",
        href: "/sites-web/site-vitrine",
      },
      {
        icon: FileText,
        title: "Landing page",
        pitch:
          "Pour pousser une offre, un produit ou une levée — taux de conversion maximisé.",
        priceFrom: "1 500 €",
        href: "/sites-web/landing-page",
      },
    ],
  },
  forWho: {
    title: "Pour qui on travaille",
    profiles: [
      {
        icon: Briefcase,
        title: "Artisans & TPE",
        description:
          "Plombier, menuisier, architecte, coach… vous voulez un site qui inspire confiance et fait sonner le téléphone.",
      },
      {
        icon: Store,
        title: "Commerces & boutiques",
        description:
          "Boutiques physiques, e-shops légers, concept stores qui ont besoin d'une présence web soignée et locale.",
      },
      {
        icon: Sparkles,
        title: "Restaurateurs",
        description:
          "Restaurants, bars, traiteurs qui veulent une vitrine appétissante avec menu, réservation et photos qui donnent faim.",
      },
      {
        icon: Rocket,
        title: "Startups en go-to-market",
        description:
          "Fondateurs qui lancent un produit et ont besoin d'une landing page qui convertit dès les premiers visiteurs.",
      },
    ],
  },
  method: {
    title: "De l'échange au lancement. En 48 heures.",
    steps: [
      {
        number: "01",
        title: "L'échange",
        description:
          "Un call de 20 minutes. On comprend votre activité, vos objectifs, votre audience. Vous nous envoyez votre contenu (textes, photos, logo). C'est tout ce dont on a besoin.",
        icon: MessageSquare,
      },
      {
        number: "02",
        title: "La création",
        description:
          "L'IA accélère le design et le code. L'expertise humaine valide chaque choix. On forge votre site sur-mesure — design, contenu, SEO, responsive. Tout.",
        icon: Palette,
      },
      {
        number: "03",
        title: "Votre validation",
        description:
          "On vous montre le site terminé. Vous testez, vous regardez chaque page, chaque détail. Retours illimités jusqu'à ce que ce soit parfait. Vous ne payez qu'après validation.",
        icon: Eye,
      },
      {
        number: "04",
        title: "Lancement + suivi",
        description:
          "Mise en ligne sur votre domaine. Configuration email, analytics, Google Business. Et on reste là après — pour les ajustements, les questions, les évolutions.",
        icon: Rocket,
      },
    ],
  },
  realisationsFiltered: [
    {
      slug: "maison-enileh",
      title: "Site vitrine conciergerie — livré en 72h",
      client: "Maison Enileh",
      pillar: "sites-web",
      resultKpi: "Livré en 72h",
      imageUrl: "/images/portfolio/maison-enileh-1.webp",
      href: "/realisations/maison-enileh",
    },
    {
      slug: "savistas",
      title: "SaaS + Landing page en 72h",
      client: "Savistas",
      pillar: "sites-web",
      resultKpi: "Livré en 72h",
      imageUrl: "/images/portfolio/savistas-1.webp",
      href: "/realisations/savistas",
    },
  ],
  testimonialsFiltered: [
    {
      quote:
        "Aurentia a livré notre site en 5 jours. Cinq jours. Et le résultat est meilleur que ce que d'autres agences nous proposaient en deux mois.",
      author: "Marie L.",
      role: "Fondatrice",
      company: "Atelier Marie",
      pillar: "sites-web",
      stat: "Livré en 5 jours",
    },
    {
      quote:
        "On avait déjà consulté trois agences, toutes parlaient en mois et en milliers d'euros. Aurentia a livré un site qu'on aime en moins d'une semaine pour un budget honnête.",
      author: "Camille B.",
      role: "Co-fondatrice",
      company: "Studio Nord",
      pillar: "sites-web",
      stat: "Livré en 6 jours",
    },
  ],
  faq: [
    {
      question: "Combien coûte un site vitrine chez Aurentia ?",
      answer:
        "Nos sites vitrines démarrent à 1 500 €. Le prix dépend du nombre de pages, des fonctionnalités souhaitées et du niveau de personnalisation. On en parle ensemble pendant le call — c'est gratuit et sans engagement.",
    },
    {
      question: "Comment c'est possible de livrer en 72h ?",
      answer:
        "L'IA accélère le design, le code et le contenu. L'expertise humaine de 20 ans valide chaque choix. On ne bâcle rien — notre process est simplement redoutablement efficace. Là où une agence classique met 6 semaines, on met 72h.",
    },
    {
      question: "Est-ce que vous utilisez des templates ?",
      answer:
        "Jamais. Chaque site est conçu sur-mesure pour votre activité, votre identité et vos objectifs. On part de zéro à chaque fois. C'est la seule façon de créer un site qui vous ressemble vraiment.",
    },
    {
      question: "Le SEO est-il inclus ?",
      answer:
        "Oui, dans chaque site. Structure technique optimisée, balises méta, vitesse de chargement, responsive, données structurées. Votre site est prêt à être indexé et visible dès la mise en ligne.",
    },
    {
      question:
        "Je n'ai pas de contenu (textes, photos). Vous pouvez vous en charger ?",
      answer:
        "Oui. On rédige le contenu adapté à votre activité et optimisé SEO. Pour les photos, on peut utiliser des visuels professionnels ou vous accompagner pour un shooting. On s'occupe de tout.",
    },
    {
      question: "Que se passe-t-il après la livraison ?",
      answer:
        "On ne disparaît pas. Modifications mineures, questions techniques, évolutions — on reste votre interlocuteur. Et si votre activité grandit, on fait évoluer le site avec vous.",
    },
    {
      question: "Quelles technologies utilisez-vous ?",
      answer:
        "Next.js, React, Tailwind CSS, hébergement Vercel. Ce sont les technologies des plus grandes startups mondiales. Votre site est rapide, sécurisé, et techniquement à la pointe.",
    },
    {
      question:
        "Je veux aussi un logo / une identité visuelle. C'est possible ?",
      answer:
        "Oui. On propose aussi la création d'identité visuelle complète : logo, charte graphique, univers de marque. 20 ans de direction créative derrière chaque projet.",
    },
  ],
  finalCta: {
    title: "Prêt à révéler votre business en ligne ?",
    subtitle:
      "On prépare un aperçu de votre futur site AVANT le call. Vous voyez le résultat, vous jugez. Gratuit. 20 minutes. Sans engagement.",
    cta: { label: "Réserver mon call découverte", href: "/contact" },
  },
};

/* ──────────────────────────────────────────────
   Extended data — sections specific to /sites-web
   ────────────────────────────────────────────── */

export const sitesWebExtra: SitesWebExtra = {
  features: [
    {
      icon: Palette,
      title: "Design sur-mesure",
      description:
        "Zéro template. Chaque pixel est pensé pour votre activité, votre audience, votre marque. Un site qui ne ressemble à aucun autre.",
    },
    {
      icon: Search,
      title: "SEO intégré dès le départ",
      description:
        "Structure technique, balises, vitesse, contenu optimisé. Vous êtes indexé et visible sur Google dès la mise en ligne.",
    },
    {
      icon: Smartphone,
      title: "Responsive natif",
      description:
        "Votre site est parfait sur mobile, tablette et desktop. 60% de vos visiteurs arrivent sur téléphone — on le sait.",
    },
    {
      icon: Rocket,
      title: "Performance maximale",
      description:
        "Temps de chargement inférieur à 2 secondes. Next.js, hébergement Vercel, images optimisées. Vos visiteurs ne patientent pas.",
    },
    {
      icon: Shield,
      title: "Sécurisé et maintenable",
      description:
        "HTTPS, headers sécurisés, code propre et documenté. Votre site est solide, protégé, facile à faire évoluer.",
    },
    {
      icon: Headphones,
      title: "Accompagnement après livraison",
      description:
        "On ne disparaît pas après le lancement. Modifications mineures, questions, évolutions — on reste disponible.",
    },
  ],

  niches: {
    title: "Un site sur-mesure. Quelle que soit votre activité.",
    subtitle:
      "On travaille niche par niche. Chaque site est pensé pour votre métier, vos clients, vos enjeux.",
    items: [
      {
        icon: Building2,
        title: "Conciergeries",
        description:
          "Locations saisonnières, gestion de biens, accueil voyageurs. Un site qui inspire confiance aux propriétaires et aux locataires.",
        badge: "Offre dédiée",
        href: "/conciergeries",
        ctaLabel: "Découvrir l'offre conciergeries",
      },
      {
        icon: Hotel,
        title: "Hôtels & Hébergements",
        description:
          "Chambres d'hôtes, hôtels, gîtes. Un site qui donne envie de réserver avant même d'avoir vu les photos.",
      },
      {
        icon: UtensilsCrossed,
        title: "Restaurants & Bars",
        description:
          "Votre carte, votre ambiance, vos horaires. Un site qui fait saliver et qui convertit le passant curieux en client.",
      },
      {
        icon: Store,
        title: "Commerces & Boutiques",
        description:
          "Artisans, commerçants, boutiques de quartier. Un site vitrine qui attire les clients locaux et renforce votre présence.",
      },
      {
        icon: Briefcase,
        title: "Professions libérales",
        description:
          "Avocats, consultants, coachs, thérapeutes. Un site qui pose votre expertise et rassure vos futurs clients.",
      },
      {
        icon: Dumbbell,
        title: "Salles de sport & Bien-être",
        description:
          "Studios, salles de sport, spas. Un site qui donne l'énergie de s'inscrire dès la première visite.",
      },
    ],
    footerNote:
      "Votre niche n'est pas listée ? On s'adapte. Chaque site est conçu pour votre métier spécifique.",
  },

  pricing: {
    title: "Un site pro. Des tarifs clairs.",
    subtitle: "3 packs clairs. Pas de surprise. Paiement en 3× possible.",
    packs: [
      {
        name: "Essentiel",
        price: "1 500 €",
        tagline: "Un site vitrine complet et pro, prêt à convertir.",
        features: [
          "Site vitrine 3 pages",
          "Design sur-mesure — zéro template",
          "Responsive + animations",
          "SEO de base",
          "Connexion domaine",
        ],
        bonuses: ["Charte graphique", "Étude concurrentielle IA"],
        subscription: "19 €/mois — 1er mois offert",
        subscriptionNote:
          "Hébergement, SSL, backups, monitoring, support 72h",
        cta: { label: "Choisir l'Essentiel", href: "/contact" },
      },
      {
        name: "Croissance",
        price: "1 900 €",
        tagline: "Pour ceux qui veulent grandir. Le plus choisi.",
        popular: true,
        features: [
          "Tout le pack Essentiel",
          "Blog + 4 articles SEO/mois",
          "SEO avancé (schema, maillage)",
          "Pages multilingues FR/EN",
        ],
        bonuses: [
          "Lead magnet intégré",
          "Analyse de marché IA",
          "Étude concurrentielle IA",
        ],
        subscription: "35 €/mois — 1er mois offert",
        subscriptionNote:
          "Plan 19 € + maintenance, 1 modif/mois, support 24h, 4 articles/mois",
        cta: { label: "Choisir Croissance", href: "/contact" },
      },
      {
        name: "Premium",
        price: "3 200 €",
        priceSuffix: "À partir de — sur devis",
        tagline: "",
        features: [
          "Tout le pack Croissance",
          "Chatbot IA personnalisé",
          "Module d'avis clients",
          "Formation visio 1h",
        ],
        bonuses: [
          "Stratégie de croissance IA",
          "Clientèles cibles IA",
          "Crédits réseaux sociaux IA",
        ],
        subscription: "75 €/mois — 1er mois offert",
        subscriptionNote:
          "Plan 35 € + modifs illimitées, rapport SEO mensuel, support 12h",
        cta: { label: "Choisir Premium", href: "/contact" },
      },
    ],
    paymentTerms: [
      "Paiement 50% à la V1, solde à la livraison",
      "Paiement en 3× possible",
      "3 tours de révision inclus",
      "1er mois d'abonnement offert",
    ],
  },

  why: {
    title: "Pourquoi Aurentia. Pas une autre agence.",
    subtitle: "Trois raisons. Pas des slogans — des faits.",
    items: [
      {
        icon: BrainCircuit,
        title: "L'IA qui accélère tout",
        description:
          "Design, code, contenu, SEO — l'IA propulse chaque étape. Pas pour remplacer l'humain. Pour amplifier 20 ans d'expertise. Résultat : 72h au lieu de 6 semaines.",
      },
      {
        icon: Code2,
        title: "20 ans de craft web",
        description:
          "Fabien a forgé des centaines de sites. Il sait ce qui convertit, ce qui dure, ce qui illumine un business. L'IA est un outil. L'œil, c'est 20 ans d'expérience.",
        ctaLabel: "En savoir plus sur l'équipe",
        ctaHref: "/agence",
      },
      {
        icon: HandCoins,
        title: "On montre avant de facturer",
        description:
          "Votre site est construit AVANT le call. Vous voyez le résultat, vous jugez. Pas de mockup flou, pas de promesse en l'air. Vous décidez en toute connaissance.",
      },
    ],
  },

  faqExtended: [
    {
      question: "Combien coûte un site vitrine chez Aurentia ?",
      answer:
        "Nos sites vitrines démarrent à 1 500 €. Le prix dépend du nombre de pages, des fonctionnalités souhaitées et du niveau de personnalisation. On en parle ensemble pendant le call — c'est gratuit et sans engagement.",
    },
    {
      question: "Comment c'est possible de livrer en 72h ?",
      answer:
        "L'IA accélère le design, le code et le contenu. L'expertise humaine de 20 ans valide chaque choix. On ne bâcle rien — notre process est simplement redoutablement efficace. Là où une agence classique met 6 semaines, on met 72h.",
    },
    {
      question: "Est-ce que vous utilisez des templates ?",
      answer:
        "Jamais. Chaque site est conçu sur-mesure pour votre activité, votre identité et vos objectifs. On part de zéro à chaque fois. C'est la seule façon de créer un site qui vous ressemble vraiment.",
    },
    {
      question: "Le SEO est-il inclus ?",
      answer:
        "Oui, dans chaque site. Structure technique optimisée, balises méta, vitesse de chargement, responsive, données structurées. Votre site est prêt à être indexé et visible dès la mise en ligne.",
    },
    {
      question:
        "Je n'ai pas de contenu (textes, photos). Vous pouvez vous en charger ?",
      answer:
        "Oui. On rédige le contenu adapté à votre activité et optimisé SEO. Pour les photos, on peut utiliser des visuels professionnels ou vous accompagner pour un shooting. On s'occupe de tout.",
    },
    {
      question: "Que se passe-t-il après la livraison ?",
      answer:
        "On ne disparaît pas. Modifications mineures, questions techniques, évolutions — on reste votre interlocuteur. Et si votre activité grandit, on fait évoluer le site avec vous.",
    },
    {
      question: "Quelles technologies utilisez-vous ?",
      answer:
        "Next.js, React, Tailwind CSS, hébergement Vercel. Ce sont les technologies des plus grandes startups mondiales. Votre site est rapide, sécurisé, et techniquement à la pointe.",
    },
    {
      question:
        "Je veux aussi un logo / une identité visuelle. C'est possible ?",
      answer:
        "Oui. On propose aussi la création d'identité visuelle complète : logo, charte graphique, univers de marque. 20 ans de direction créative derrière chaque projet.",
    },
  ],

  finalCta: {
    title: "Prêt à révéler votre business en ligne ?",
    description:
      "On prépare un aperçu de votre futur site AVANT le call. Vous voyez le résultat, vous jugez. Gratuit. 20 minutes. Sans engagement.",
    cta: { label: "Réserver mon call découverte", href: "/contact" },
    bullets: [
      "Gratuit et sans engagement",
      "On vous montre VOTRE site",
      "Livraison en 72h après validation",
    ],
  },
};
