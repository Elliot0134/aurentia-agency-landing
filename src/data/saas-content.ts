// ============================================
// AURENTIA AGENCY — SaaS & Logiciels Métier page content
// Edit this file to change content without touching components
// ============================================

// ── Interfaces ──

export interface SaasProductCard {
  icon: string; // Lucide icon name
  title: string;
  text: string;
  tags: string[];
  span?: number; // 1 or 2
}

export interface ProcessStep {
  number: string;
  icon: string; // Lucide icon name
  title: string;
  text: string;
  duration: string;
}

export interface SaasProject {
  screenshots: string[];
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface TechCard {
  name: string;
  description: string;
  icon?: string; // path to logo SVG
}

// ── Hero ──

export const saasHeroContent = {
  badge: "DÉVELOPPEMENT SAAS & LOGICIELS MÉTIER",
  headline: "Votre vision. Notre ingénierie. Propulsé par l'IA.",
  subtitle:
    "On conçoit des applications SaaS et des logiciels métier sur-mesure. Du brief au déploiement en 1 à 2 semaines. Architecture, design et mise en production inclus.",
  ctaPrimary: "Réserver un call stratégique",
  ctaPrimaryHref: "https://cal.com/aurentia/saas",
  ctaSecondary: "Voir nos réalisations",
  ctaSecondaryHref: "#portfolio",
};

// ── Services / Products ──

export const saasServicesContent = {
  title: "Des applications qui propulsent votre business.",
  subtitle:
    "SaaS, logiciels métier, portails, dashboards — on forge l'outil dont vous avez besoin.",
};

export const saasProducts: SaasProductCard[] = [
  {
    icon: "Rocket",
    title: "Applications SaaS",
    text: "Votre produit, de l'idée au premier utilisateur. Authentification, billing, dashboard, API — tout est inclus. On construit des SaaS qui tiennent la charge et qui scalent.",
    tags: ["Auth", "Billing", "API", "Dashboard", "Multi-tenant"],
    span: 2,
  },
  {
    icon: "Building2",
    title: "Logiciels métier",
    text: "Votre activité mérite un outil taillé sur-mesure. Gestion de stocks, CRM interne, suivi de production — on digitalise vos process.",
    tags: ["Sur-mesure", "Process métier", "Intégrations"],
  },
  {
    icon: "LayoutDashboard",
    title: "Dashboards & Back-offices",
    text: "Des interfaces d'administration claires et puissantes. Vos données deviennent lisibles. Vos décisions deviennent rapides.",
    tags: ["Data visualization", "Admin panels", "Analytics"],
  },
  {
    icon: "Users",
    title: "Portails clients",
    text: "Offrez à vos clients un espace dédié. Suivi de commandes, facturation, support — une expérience pro qui renforce la confiance.",
    tags: ["Espace client", "Self-service", "Notifications"],
  },
];

// ── Stack ──

export const saasStackContent = {
  title: "Forgé avec les outils de demain.",
  subtitle:
    "On ne choisit pas nos technos pour la hype. On les choisit pour le résultat.",
};

export const techStack: TechCard[] = [
  { name: "Next.js", description: "Framework React. SSR, SSG, App Router." },
  {
    name: "TypeScript",
    description: "Typage strict. Zéro surprise en production.",
  },
  { name: "React", description: "Composants réutilisables. UI réactive." },
  {
    name: "Tailwind CSS",
    description: "Styling rapide. Design system cohérent.",
  },
  {
    name: "Supabase",
    description: "Base de données, auth, storage, realtime.",
  },
  {
    name: "Vercel",
    description: "Déploiement instantané. Edge network mondial.",
  },
  { name: "Stripe", description: "Paiements, abonnements, facturation." },
  {
    name: "Claude AI",
    description: "Intelligence artificielle. Accélération du dev.",
  },
];

export const marqueeItems: string[] = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Supabase",
  "Vercel",
  "Stripe",
  "Claude AI",
  "Framer Motion",
  "GSAP",
  "PostgreSQL",
  "Zod",
];

// ── Process ──

export const saasProcessContent = {
  badge: "NOTRE PROCESS",
  title: "Du brief au déploiement. En 5 étapes.",
  subtitle:
    "Chaque projet suit un process éprouvé. Pas de surprises, pas de zones grises.",
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    icon: "PhoneCall",
    title: "Call stratégique",
    text: "20 minutes pour comprendre votre vision, votre marché, vos contraintes. On identifie le scope du MVP et on estime le budget.",
    duration: "20 min",
  },
  {
    number: "02",
    icon: "FileText",
    title: "Spécifications & Architecture",
    text: "On traduit votre vision en specs techniques. Architecture de la base de données, user flows, wireframes. Vous validez avant qu'on code.",
    duration: "2 à 3 jours",
  },
  {
    number: "03",
    icon: "Paintbrush",
    title: "Design & Charte graphique",
    text: "Identité visuelle intégrée. Design system cohérent, composants réutilisables, responsive natif. Votre produit a une identité dès le premier jour.",
    duration: "2 à 3 jours",
  },
  {
    number: "04",
    icon: "Code",
    title: "Développement",
    text: "L'IA accélère. L'expertise humaine valide. Chaque feature est testée, chaque ligne de code est review. On avance vite sans sacrifier la qualité.",
    duration: "1 à 2 semaines",
  },
  {
    number: "05",
    icon: "Rocket",
    title: "Déploiement & Lancement",
    text: "Mise en production sur Vercel. Configuration DNS, SSL, monitoring. Votre application est live, sécurisée, et prête à accueillir vos premiers utilisateurs.",
    duration: "1 jour",
  },
];

// ── Portfolio ──

export const saasPortfolioContent = {
  badge: "RÉALISATIONS",
  title: "Nos coups de cœur qu'on a forgés.",
  subtitle: "Des applications en production. Pas des maquettes.",
};

// ── Pricing ──

export interface SaasPricingContent {
  badge: string;
  title: string;
  subtitle: string;
  card: {
    label: string;
    price: number;
    mention: string;
    inclus: string[];
    delay: string;
    cta: string;
    ctaHref: string;
  };
  bottomText: string;
}

export const saasPricingContent: SaasPricingContent = {
  badge: "INVESTISSEMENT",
  title: "Investir dans un outil qui travaille pour vous.",
  subtitle: "Chaque projet est unique. Le prix aussi.",
  card: {
    label: "MVP PRÉ-FONCTIONNEL",
    price: 5000,
    mention: "Sur devis — selon la complexité du projet",
    inclus: [
      "Charte graphique intégrée",
      "Architecture technique complète",
      "Développement front-end + back-end",
      "Base de données & authentification",
      "Déploiement en production",
      "1 mois de support post-lancement",
    ],
    delay: "Livraison en 1 à 2 semaines",
    cta: "Discuter de votre projet",
    ctaHref: "https://cal.com/aurentia/saas",
  },
  bottomText:
    "Pas de surprise. On définit le scope ensemble, on s'engage sur un prix fixe avant de commencer. Vous savez exactement ce que vous payez.",
};

// ── FAQ ──

export interface SaasFAQItem {
  question: string;
  answer: string;
}

export const saasFAQContent = {
  title: "Questions fréquentes.",
};

export const saasFAQItems: SaasFAQItem[] = [
  {
    question: "Combien de temps pour développer un MVP ?",
    answer:
      "Entre 1 et 2 semaines pour un MVP pré-fonctionnel. Ça dépend de la complexité : nombre de features, intégrations tierces, volume de données. On définit le scope ensemble lors du call stratégique.",
  },
  {
    question: "Qu'est-ce qui est inclus dans le prix ?",
    answer:
      "Tout ce qu'il faut pour lancer : charte graphique, architecture technique, développement front + back, base de données, authentification, déploiement en production. Pas de coûts cachés.",
  },
  {
    question: "Et après le MVP ? Qui maintient l'application ?",
    answer:
      "On reste. 1 mois de support est inclus. Ensuite, on propose un contrat de maintenance ou on vous accompagne pour scaler. Si vous avez une équipe technique, on fait le handover proprement.",
  },
  {
    question: "Pourquoi si rapide ? La qualité est-elle au rendez-vous ?",
    answer:
      "L'IA accélère les tâches répétitives : scaffolding, composants, tests, documentation. L'expertise humaine — 20 ans de craft web + un CTO formateur Epitech — valide chaque décision. Rapide ne veut pas dire bâclé.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Next.js, TypeScript, React, Tailwind CSS, Supabase (PostgreSQL), Vercel, Stripe pour le billing. Des technologies éprouvées, maintenues, qui scalent. Pas de stack exotique qui disparaît dans 6 mois.",
  },
  {
    question: "Je n'ai pas de specs techniques. C'est un problème ?",
    answer:
      "Non. On part de votre vision, pas d'un cahier des charges. Lors du call stratégique, on identifie ensemble les features essentielles, les user flows, et on traduit ça en specs. C'est notre métier.",
  },
  {
    question:
      "Vous travaillez avec des startups ou aussi des entreprises établies ?",
    answer:
      "Les deux. Startups qui veulent un MVP pour lever des fonds ou valider un marché. Entreprises qui veulent digitaliser un process avec un logiciel métier sur-mesure. Le point commun : un besoin d'aller vite sans sacrifier la qualité.",
  },
];

// ── CTA ──

export const saasCTAContent = {
  title: "Votre application mérite d'exister.",
  subtitle:
    "20 minutes pour comprendre votre vision, estimer le scope et le budget. On vous dit franchement si on est les bons pour votre projet.",
  cta: "Réserver un call stratégique",
  ctaHref: "https://cal.com/aurentia/saas",
  proofs: [
    "Gratuit et sans engagement",
    "Scope et budget estimés en 20 min",
    "On vous dit non si le projet n'est pas pour nous",
  ],
};

// ── Portfolio ──

export const saasProjects: SaasProject[] = [
  {
    screenshots: [
      "/images/portfolio/comparateur-ia-1.webp",
      "/images/portfolio/comparateur-ia-2.webp",
      "/images/portfolio/comparateur-ia-3.webp",
    ],
    title: "Aurentia SaaS",
    description:
      "Plateforme de création d'entreprise par IA. Multi-agents, génération de documents, billing intégré.",
    tags: ["SaaS", "Design", "Développement", "Intégrations API"],
    link: "#",
  },
  {
    screenshots: ["/images/portfolio/golf-mentor-1.webp"],
    title: "Communauté Golf Mentor",
    description:
      "Plateforme communautaire pour passionnés de golf. Coaching en ligne, forums, suivi de progression.",
    tags: ["SaaS", "Design", "Landing page", "Développement"],
    link: "#",
  },
  {
    screenshots: ["/images/portfolio/savistas-1.webp"],
    title: "Savistas",
    description:
      "Application de gestion pour entreprises de services. Planification, facturation automatisée, reporting.",
    tags: ["Logiciel métier", "Design", "Développement"],
    link: "#",
  },
  {
    screenshots: [
      "/images/portfolio/allo-restau-1.webp",
      "/images/portfolio/allo-restau-2.webp",
      "/images/portfolio/allo-restau-3.webp",
    ],
    title: "Aloresto",
    description:
      "Plateforme de commande en ligne pour restaurants. Dashboard propriétaire, gestion des commandes en temps réel.",
    tags: ["SaaS", "Design", "Développement", "Landing page"],
    link: "#",
  },
  {
    screenshots: [
      "/images/portfolio/comparateur-ia-1.webp",
      "/images/portfolio/comparateur-ia-2.webp",
      "/images/portfolio/comparateur-ia-3.webp",
    ],
    title: "Comparateur IA Facile",
    description:
      "Comparateur d'outils d'intelligence artificielle. Affiliation, SEO optimisé, analytics avancés.",
    tags: ["Site vitrine", "Design", "SEO", "Développement"],
    link: "#",
  },
];
