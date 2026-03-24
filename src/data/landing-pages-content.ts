// ──────────────────────────────────────────────────────
// Landing Pages — data layer
// ──────────────────────────────────────────────────────

export interface FeatureCard {
  icon: string; // Lucide icon name
  title: string;
  text: string;
}

export interface ShowcaseCallout {
  label: string;
  position: { x: string; y: string }; // position relative to browser frame
}

export interface LandingExample {
  screenshot: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  isPlaceholder?: boolean;
}

export interface LandingProcessStep {
  number: string;
  icon: string; // Lucide icon name
  title: string;
  text: string;
  duration: string;
}

// ── Hero ────────────────────────────────────────────

export const heroContent = {
  badge: "LANDING PAGES HAUTE CONVERSION",
  h1: "Des landing pages qui convertissent. Pas qui décorent.",
  subtitle:
    "Design spectaculaire. Animations premium. Optimisées pour transformer vos visiteurs en clients. Chaque pixel a une intention.",
  vitrineMention:
    "Ce site est notre carte de visite. Vous êtes en train de naviguer sur notre travail.",
  ctaPrimary: {
    label: "Discuter de votre landing page",
    href: "https://cal.com/aurentia/landing-page",
  },
  ctaSecondary: {
    label: "Voir des exemples",
    href: "#exemples",
  },
} as const;

// ── Features ────────────────────────────────────────

export const featuresContent = {
  title: "Chaque détail est une arme de conversion.",
  subtitle: "On ne livre pas juste une page. On livre une machine à convertir.",
  cards: [
    {
      icon: "Paintbrush",
      title: "Design sur-mesure",
      text: "Zéro template. Chaque landing page est forgée pour votre produit, votre audience, votre marché. Un design qui impressionne et qui convertit.",
    },
    {
      icon: "Sparkles",
      title: "Animations premium",
      text: "GSAP, Framer Motion, scroll animations, parallax, blur reveals. Des micro-interactions qui captivent l'attention et guident vers l'action.",
    },
    {
      icon: "Smartphone",
      title: "Responsive natif",
      text: "Mobile-first. Chaque breakpoint est pensé. 375px, 768px, 1280px — votre page est parfaite sur chaque écran.",
    },
    {
      icon: "Search",
      title: "SEO technique",
      text: "Metadata, Schema.org, Open Graph, Core Web Vitals. Votre page est indexée, rapide, et prête à ranker.",
    },
    {
      icon: "Gauge",
      title: "Performance",
      text: "PageSpeed 90+ mobile, 95+ desktop. Chaque animation est GPU-accelerated. Zéro Three.js lourd. Ça tourne sur n'importe quel appareil.",
    },
    {
      icon: "Moon",
      title: "Dark & Light mode",
      text: "Deux thèmes, zéro compromis. Chaque composant fonctionne dans les deux modes. Tokens sémantiques, pas de couleurs hardcodées.",
    },
  ] satisfies FeatureCard[],
};

// ── Vitrine ─────────────────────────────────────────

export const vitrineContent = {
  badge: "NOTRE VITRINE",
  title: "Vous êtes en train de naviguer sur notre meilleur argument.",
  subtitle:
    "Ce site a été conçu avec les mêmes standards que ceux qu'on applique à vos projets. Chaque animation, chaque transition, chaque pixel — c'est exactement ce qu'on livre.",
  callouts: [
    { label: "Magnetic buttons", position: { x: "5%", y: "20%" } },
    { label: "Scroll animations GSAP", position: { x: "75%", y: "15%" } },
    { label: "Spotlight cards", position: { x: "80%", y: "55%" } },
    { label: "Text reveal au scroll", position: { x: "10%", y: "60%" } },
    { label: "Curseur personnalisé", position: { x: "70%", y: "80%" } },
    { label: "Gradient mesh animé", position: { x: "15%", y: "85%" } },
  ] satisfies ShowcaseCallout[],
  closing: "Imaginez ça. Mais pour votre produit.",
};

// ── Exemples ────────────────────────────────────────

export const exemplesContent = {
  badge: "EXEMPLES",
  title: "Des pages qui marquent les esprits.",
  subtitle: "Chaque projet est unique. Voici ce qu'on a forgé.",
  examples: [
    {
      screenshot: "/images/landing-pages/exemple-aurentia.webp",
      title: "Aurentia Agency",
      description:
        "Notre propre site. Next.js, GSAP, Framer Motion, scroll narratif, gradient mesh, magnetic buttons, dark/light mode. La vitrine de ce qu'on sait faire.",
      tags: ["Next.js", "GSAP", "Framer Motion", "Scroll narratif"],
      link: "https://aurentia.agency",
    },
    {
      screenshot: "/images/landing-pages/exemple-2.webp",
      title: "Projet client",
      description:
        "Landing page haute conversion pour un SaaS B2B. Design sur-mesure, animations scroll-triggered, performance 95+ mobile.",
      tags: ["Next.js", "Conversion", "SaaS"],
      isPlaceholder: true,
    },
    {
      screenshot: "/images/landing-pages/exemple-3.webp",
      title: "Projet client",
      description:
        "Page de lancement produit avec storytelling visuel. Parallax multi-couches, dark mode natif, SEO technique intégré.",
      tags: ["Storytelling", "Parallax", "SEO"],
      isPlaceholder: true,
    },
  ] satisfies LandingExample[],
};

// ── Process ─────────────────────────────────────────

export const processContent = {
  badge: "NOTRE PROCESS",
  title: "De la vision au pixel. En 4 étapes.",
  subtitle: "Un process direct. Pas de réunions inutiles.",
  steps: [
    {
      number: "01",
      icon: "PhoneCall",
      title: "Brief créatif",
      text: "On comprend votre produit, votre audience, vos objectifs de conversion. On analyse vos concurrents. On définit la direction créative.",
      duration: "30 min",
    },
    {
      number: "02",
      icon: "Layers",
      title: "Design & Copywriting",
      text: "Wireframe, direction artistique, rédaction des textes. Chaque section a un objectif de conversion. Vous validez le design avant qu'on code.",
      duration: "3 à 5 jours",
    },
    {
      number: "03",
      icon: "Code",
      title: "Développement & Animations",
      text: "Next.js, GSAP, Framer Motion. Responsive pixel-perfect. Animations scroll-triggered. Performance optimisée. SEO technique intégré.",
      duration: "3 à 5 jours",
    },
    {
      number: "04",
      icon: "Rocket",
      title: "Lancement",
      text: "Déploiement Vercel, configuration DNS, tests cross-browser, PageSpeed validé. Votre page est live et prête à convertir.",
      duration: "1 jour",
    },
  ] satisfies LandingProcessStep[],
};

// ── Pricing ────────────────────────────────────────

export interface LandingPricingIncluded {
  label: string;
}

export const pricingContent = {
  badge: "INVESTISSEMENT",
  title: "Un investissement qui se mesure en conversions.",
  subtitle: "Chaque page est sur-mesure. Le prix aussi.",
  card: {
    label: "LANDING PAGE HAUTE CONVERSION",
    price: "1 500",
    priceSuffix: "€",
    pricePrefix: "À partir de",
    mention: "Sur devis — selon la complexité et les animations",
    included: [
      { label: "Design sur-mesure" },
      { label: "Copywriting orienté conversion" },
      { label: "Animations premium (GSAP / Framer Motion)" },
      { label: "Responsive pixel-perfect" },
      { label: "SEO technique & metadata" },
      { label: "Dark & Light mode" },
      { label: "Déploiement Vercel" },
    ] satisfies LandingPricingIncluded[],
    delay: "Livraison en 1 à 2 semaines",
    cta: {
      label: "Discuter de votre projet",
      href: "https://cal.com/aurentia/landing-page",
    },
  },
  footer:
    "Le prix dépend du nombre de sections, de la complexité des animations, et du volume de contenu. On vous fait un devis précis après le brief créatif.",
} as const;

// ── FAQ ────────────────────────────────────────────

export interface LandingFAQItem {
  question: string;
  answer: string;
}

export const faqContent = {
  title: "Questions fréquentes.",
  items: [
    {
      question:
        "Quelle est la différence entre vos landing pages et un site vitrine ?",
      answer:
        "Un site vitrine présente votre activité (plusieurs pages, navigation). Une landing page a un seul objectif : convertir un visiteur en lead ou en client. Pas de menu, pas de distraction. Chaque section pousse vers l'action.",
    },
    {
      question: "Combien de temps pour livrer une landing page ?",
      answer:
        "Entre 1 et 2 semaines. Brief créatif + design + copywriting + développement + déploiement. On peut aller plus vite si le scope est serré. On peut prendre plus de temps si les animations sont complexes.",
    },
    {
      question: "Vous faites aussi le copywriting ?",
      answer:
        "Oui. On rédige les textes orientés conversion. Si vous avez déjà du contenu, on l'optimise. L'IA nous aide à itérer vite — l'expertise humaine valide chaque mot.",
    },
    {
      question: "Est-ce que je peux modifier la page après livraison ?",
      answer:
        "Oui. On développe avec Next.js — le code est propre, documenté, et déployé sur votre compte Vercel. Vous pouvez modifier le contenu ou nous demander des ajustements.",
    },
    {
      question: "Pourquoi pas Webflow ou Framer ?",
      answer:
        "Webflow et Framer sont bons pour prototyper. Pour des animations complexes (GSAP, scroll narratif, parallax multi-couches), du SEO technique poussé, et une performance 90+ mobile, Next.js n'a pas d'équivalent. C'est aussi ce qui fait la différence en conversion.",
    },
    {
      question: "Quel est le ROI d'une landing page premium ?",
      answer:
        "Une landing page bien conçue convertit entre 3% et 12% selon l'offre et le trafic. Si votre produit coûte 50€/mois et que vous envoyez 1 000 visiteurs, même un gain de 2 points de conversion = 1 000€/mois de revenus supplémentaires. L'investissement se rembourse vite.",
    },
  ] satisfies LandingFAQItem[],
};

// ── CTA Final ──────────────────────────────────────

export const ctaContent = {
  title: "Votre produit mérite une page à la hauteur.",
  subtitle:
    "30 minutes pour comprendre votre produit, votre audience, et vos objectifs de conversion. On vous montre ce qu'on peut faire pour vous.",
  cta: {
    label: "Réserver un brief créatif",
    href: "https://cal.com/aurentia/landing-page",
  },
  proofs: [
    "Gratuit et sans engagement",
    "On analyse votre marché et vos concurrents",
    "Direction créative proposée dès le call",
  ],
} as const;
