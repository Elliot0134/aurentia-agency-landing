// src/data/sites-web-landing.ts
import {
  Rocket,
  TrendingUp,
  Briefcase,
  Clock,
  Target,
  MessageSquare,
  Pencil,
  Code2,
  Eye,
  RefreshCw,
  LifeBuoy,
} from "lucide-react";
import type { SubPageData } from "./types";

export const sitesWebLandingData: SubPageData = {
  parentSlug: "sites-web",
  slug: "landing-page",
  hero: {
    eyebrow: "Sites Web · Landing page",
    headline: "La landing page qui fait passer à l'action.",
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
      title: "Founders & porteurs de projet",
      description:
        "Vous lancez un produit, un service ou une waitlist et vous avez besoin d'une page unique qui capte les bons leads dès la première visite.",
    },
    {
      icon: TrendingUp,
      title: "Indépendants & consultants",
      description:
        "Vous voulez une page claire qui présente votre offre, votre méthode, et qui pousse les visiteurs à réserver un appel sans tergiverser.",
    },
    {
      icon: Briefcase,
      title: "TPE & équipes marketing",
      description:
        "Vous avez besoin d'une page dédiée pour un événement, une campagne ou un produit phare — sans toucher à votre site principal.",
    },
  ],
  whatYouGet: {
    title: "Ce qui est inclus",
    items: [
      "Design one-pager sur-mesure (hero, preuves sociales, features, pricing, FAQ, CTA)",
      "Copywriting orienté conversion (fait avec vous)",
      "Intégration responsive parfaite mobile/desktop",
      "Formulaire de capture de leads ou waitlist",
      "Référencement Google de base configuré",
      "Performance au top (Core Web Vitals au vert)",
      "Affichage clair en mode clair et sombre",
      "30 jours de support et d'itérations mineures",
    ],
  },
  process: [
    {
      number: "01",
      title: "Brief & stratégie",
      description:
        "On challenge votre positionnement, votre promesse et votre cible. On aligne sur l'objectif de la page (leads, RDV, inscriptions).",
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
      title: "Intégration",
      description:
        "Développement responsive, animations fluides, performance soignée, tests sur tous les appareils.",
      icon: Code2,
    },
    {
      number: "04",
      title: "Lancement & itérations",
      description:
        "Mise en ligne, suivi des premiers retours, petits ajustements inclus pendant 30 jours.",
      icon: Rocket,
    },
  ],
  pricing: {
    title: "Un investissement clair, sans surprise.",
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
        title: "Allo Restau — landing livraison",
        imageUrl: "/images/portfolio/allo-restau-1.webp",
        href: "/realisations/allo-restau",
      },
      {
        title: "Comparateur IA Facile — landing produit",
        imageUrl: "/realisations/comparateur-ia/hero.webp",
        href: "/realisations/comparateur-ia-facile",
      },
      {
        title: "Maison Enileh — site vitrine",
        imageUrl: "/images/portfolio/maison-enileh-1.webp",
        href: "/realisations/maison-enileh",
      },
      {
        title: "Friend'iz — landing application",
        imageUrl: "/images/portfolio/friendiz-1.webp",
        href: "/realisations/friendiz",
      },
    ],
  },
  testimonials: [],
  faq: [
    {
      question: "Qu'est-ce qui différencie une landing Aurentia ?",
      answer:
        "Le copywriting est fait avec vous en atelier, pas recraché par une IA. Le design est unique et pensé pour votre audience. Et la perf est au top — ça paraît simple mais peu d'agences le font vraiment.",
    },
    {
      question: "Je n'ai pas de copywriting prêt, vous pouvez m'aider ?",
      answer:
        "Oui, c'est même recommandé. On organise un atelier copy de 60 minutes où on travaille ensemble votre promesse, vos objections et votre narratif. C'est inclus dans l'offre.",
    },
    {
      question: "Vous pouvez connecter à notre CRM ?",
      answer:
        "Oui. On intègre HubSpot, Pipedrive, Airtable, Notion, Supabase, ou votre stack custom. On en parle pendant le brief pour ajuster le devis si besoin.",
    },
    {
      question: "Est-ce que je suis propriétaire de la page ?",
      answer:
        "Oui, entièrement. Nom de domaine, code, hébergement : tout est à votre nom. Vous pouvez partir quand vous voulez avec votre landing.",
    },
    {
      question: "Vous gérez l'hébergement ?",
      answer:
        "Oui. On configure l'hébergement Vercel à votre nom, avec déploiement automatique. Vous gardez le contrôle complet.",
    },
    {
      question: "Et après le lancement ?",
      answer:
        "Vous bénéficiez de 30 jours de support inclus pour les ajustements post-lancement (bugs, optimisations mineures, modifications de copy). Au-delà, on peut intervenir à la demande.",
    },
    {
      question: "Combien de temps pour être en ligne ?",
      answer:
        "Entre 3 et 7 jours ouvrés selon la complexité et la réactivité sur le copywriting. En urgence, on a déjà livré en 72h — mais on ne promet pas ce délai par défaut.",
    },
  ],
  finalCta: {
    title: "Votre landing live la semaine prochaine ?",
    subtitle:
      "Un appel de 15 minutes et on vous dit si on peut livrer dans vos délais.",
    cta: { label: "Réserver un créneau", href: "/contact" },
  },
  trustStats: [
    { value: "3-7 j", label: "délai moyen" },
    { value: "100/100", label: "Core Web Vitals" },
    { value: "1", label: "interlocuteur dédié" },
    { value: "100%", label: "propriétaire du code" },
  ],
  guarantees: [
    {
      icon: Eye,
      title: "Copy & maquette validés avant intégration",
      description:
        "Vous voyez le copywriting et le design avant qu'une seule ligne de code ne soit écrite. On n'avance que si vous êtes 100% aligné.",
    },
    {
      icon: RefreshCw,
      title: "3 tours de révision inclus",
      description:
        "On ajuste ensemble jusqu'à ce que la page vous ressemble. Sans surcoût caché, sans limite floue.",
    },
    {
      icon: LifeBuoy,
      title: "30 jours de support post-live",
      description:
        "Bugs, ajustements de copy, micro-changements de design : on reste dispo 30 jours après la mise en ligne. Vous n'êtes jamais lâché.",
    },
  ],
  comparison: {
    title: "Aurentia vs. le reste",
    subtitle:
      "Ce qu'on fait mieux — et ce qu'on ne prétend pas faire mieux.",
    columns: [
      { label: "Aurentia", highlight: true },
      { label: "Template no-code" },
      { label: "Freelance solo" },
    ],
    rows: [
      {
        label: "Prix landing sur-mesure",
        values: ["1 500 – 4 000 €", "100 – 400 €", "2 000 – 6 000 €"],
      },
      {
        label: "Délai de livraison",
        values: ["3 – 7 jours", "Immédiat", "2 – 5 semaines"],
      },
      {
        label: "Design 100% sur-mesure",
        values: [true, false, true],
      },
      {
        label: "Copywriting orienté conversion",
        values: [true, false, "Au cas par cas"],
      },
      {
        label: "Maquette validée avant intégration",
        values: [true, false, "Au cas par cas"],
      },
      {
        label: "Support post-live",
        values: ["30 j inclus", "Aucun", "Au cas par cas"],
      },
      {
        label: "Performance Core Web Vitals",
        values: ["100/100", "Variable", "Variable"],
      },
      {
        label: "Propriété du code",
        values: [true, false, true],
      },
    ],
  },
};
