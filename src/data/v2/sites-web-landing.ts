// src/data/sites-web-landing.ts
// DRAFT_COPY — to refine before swap
import {
  Rocket,
  TrendingUp,
  Briefcase,
  Clock,
  Target,
  MessageSquare,
  Pencil,
  Code2,
} from "lucide-react";
import type { SubPageData } from "./types";

export const sitesWebLandingData: SubPageData = {
  parentSlug: "sites-web",
  slug: "landing-page",
  hero: {
    eyebrow: "Sites Web · Landing page",
    headline: "La landing page qui vend pendant que vous dormez.",
    subHeadline:
      "Copywriting soigné, design qui convertit, performance au top. Livrée en 3 à 7 jours, à partir de 1 500 €.",
    priceFrom: "1 500 €",
    badges: [
      { label: "Livrée en 3 à 7 jours", icon: Clock },
      { label: "Optimisée pour la conversion", icon: Target },
    ],
    cta: {
      primary: { label: "Discutons de ma landing", href: "/contact" },
      secondary: { label: "Voir les tarifs", href: "#pricing" },
    },
    visual: {
      kind: "image",
      src: "/images/sites-web/landing-hero.jpg",
      alt: "Exemples de landing pages construites par Aurentia",
    },
  },
  forWho: [
    {
      icon: Rocket,
      title: "Founders SaaS",
      description:
        "Vous lancez un produit et avez besoin d'une landing page de pré-lancement ou de waiting list qui convertit vraiment.",
    },
    {
      icon: TrendingUp,
      title: "Growth marketers",
      description:
        "Vous avez besoin de landing dédiées pour vos campagnes paid ou outbound, avec A/B test en tête.",
    },
    {
      icon: Briefcase,
      title: "Agences & consultants",
      description:
        "Vous voulez externaliser la production de landing clients avec une exigence de qualité élevée.",
    },
  ],
  whatYouGet: {
    title: "Ce qui est inclus",
    items: [
      "Design one-pager sur-mesure (hero, preuves sociales, features, pricing, FAQ, CTA)",
      "Copywriting orienté conversion (fait avec vous)",
      "Intégration responsive parfaite mobile/desktop",
      "Formulaire de capture de leads ou wait-list",
      "Tracking complet (GA4, Meta Pixel, conversions)",
      "Temps de chargement < 1s (Core Web Vitals au vert)",
      "Préparation A/B test possible dès la livraison",
      "30 jours de support et d'itérations mineures",
    ],
  },
  process: [
    {
      number: "01",
      title: "Brief & stratégie",
      description:
        "On challenge votre positionnement, votre promesse et votre cible. On aligne sur l'objectif chiffré (leads, conversions, MRR).",
      icon: MessageSquare,
    },
    {
      number: "02",
      title: "Copy & design",
      description:
        "On rédige le copywriting orienté conversion et on conçoit un design qui ne ressemble à aucune autre landing du marché.",
      icon: Pencil,
    },
    {
      number: "03",
      title: "Intégration & tracking",
      description:
        "Intégration rapide (<1s), tracking complet, tests sur tous les appareils.",
      icon: Code2,
    },
    {
      number: "04",
      title: "Lancement & itérations",
      description:
        "Mise en ligne, suivi des premiers résultats, petits ajustements inclus pendant 30 jours.",
      icon: Rocket,
    },
  ],
  pricing: {
    title: "Un investissement qui se mesure en conversions.",
    subtitle: "Chaque page est sur-mesure. Le prix aussi.",
    packs: [
      {
        name: "Landing page haute conversion",
        price: "1 500 €",
        priceNote: "À partir de — sur devis selon la complexité et les animations",
        description: "Livraison en 1 à 2 semaines.",
        features: [
          "Design sur-mesure",
          "Textes rédigés pour convaincre vos visiteurs",
          "Animations fluides et premium",
          "Parfait sur mobile, tablette et ordinateur",
          "Référencement Google optimisé",
          "Affichage clair en mode clair et sombre",
          "Mise en ligne clé en main",
        ],
        cta: { label: "Discuter de votre projet", href: "/contact" },
      },
    ],
    note: "Le prix dépend du nombre de sections, de la complexité des animations, et du volume de contenu. On vous fait un devis précis après le brief créatif.",
  },
  examples: {
    title: "Quelques lancements récents",
    items: [
      {
        title: "Northlight — lancement seed round",
        imageUrl: "/images/sites-web/landing-northlight.jpg",
        href: "/agence",
      },
      {
        title: "Pulsio — waitlist produit",
        imageUrl: "/images/sites-web/landing-pulsio.jpg",
        href: "/agence",
      },
      {
        title: "Kairos Ops — campagne paid B2B",
        imageUrl: "/images/sites-web/landing-kairos.jpg",
        href: "/agence",
      },
      {
        title: "Fable Studio — lancement formation",
        imageUrl: "/images/sites-web/landing-fable.jpg",
        href: "/agence",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "22% de conversion au lancement. Je n'y croyais pas. Les VCs ont trouvé la landing plus claire que notre deck.",
      author: "Julien M.",
      role: "Founder",
      company: "Northlight",
      pillar: "sites-web",
      stat: "22% conversion",
    },
    {
      quote:
        "On a pu itérer trois fois en une semaine grâce à la préparation A/B test. CPA divisé par deux sur Meta Ads.",
      author: "Sarah P.",
      role: "Head of Growth",
      company: "Kairos Ops",
      pillar: "sites-web",
      stat: "CPA ÷2",
    },
  ],
  faq: [
    {
      question: "Qu'est-ce qui différencie une landing Aurentia ?",
      answer:
        "Le copywriting est fait avec vous en atelier, pas recraché par une IA. Le design est unique et pensé pour votre audience. Et la perf est au top — ça paraît simple mais peu d'agences le font vraiment.",
    },
    {
      question: "Je n'ai pas de copywriting prêt, vous pouvez m'aider ?",
      answer:
        "Oui, c'est même recommandé. On a un atelier copy de 60 minutes où on travaille ensemble votre promesse, vos objections et votre narratif. C'est inclus dans l'offre Standard.",
    },
    {
      question: "Vous pouvez connecter à notre CRM ?",
      answer:
        "Oui. On intègre HubSpot, Pipedrive, Airtable, Notion, Supabase, ou votre stack custom. C'est inclus dans le pack Premium, en option sur Standard.",
    },
    {
      question: "Est-ce qu'on peut faire des A/B tests ?",
      answer:
        "Avec le pack Premium, on livre la landing déjà préparée pour l'A/B test (variants de hero, CTA, headline). On peut aussi vous aider à les lancer et les analyser.",
    },
    {
      question: "Vous gérez l'hébergement ?",
      answer:
        "Oui, hébergement Vercel offert pour toute landing. Domaine à votre nom, déploiement automatique à chaque édition de contenu.",
    },
    {
      question: "Et après le lancement ?",
      answer:
        "Vous bénéficiez de 30 à 60 jours de support inclus pour les ajustements post-lancement (bugs, optimisations mineures, modifications de copy). Au-delà, on peut intervenir à la demande.",
    },
    {
      question: "Combien de temps pour être en ligne ?",
      answer:
        "Entre 3 et 7 jours ouvrés selon le pack et la réactivité sur le copywriting. En urgence, on a déjà livré en 72h — mais on ne promet pas ce délai par défaut.",
    },
  ],
  finalCta: {
    title: "Votre landing live la semaine prochaine ?",
    subtitle:
      "Un appel de 15 minutes et on vous dit si on peut livrer dans vos délais.",
    cta: { label: "Réserver un créneau", href: "/contact" },
  },
};
