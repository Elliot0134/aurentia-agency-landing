// ============================================
// AURENTIA AGENCY — Contenu page /identite-visuelle
// Structured content for the identite visuelle landing page
// ============================================

// ---------------------
// Interfaces
// ---------------------

export interface PrestationBlock {
  icon: string; // Lucide icon name
  title: string;
  text: string;
  accent: "orange" | "amber";
}

export interface IdentiteProcessStep {
  number: string;
  title: string;
  text: string;
}

export interface IdentitePortfolioItem {
  image: string; // path composition visuelle
  brandName: string;
  sector: string;
  description: string;
  credit?: string; // ex: "Direction creative : Fabien Estrade — Le Prisme"
}

export interface IdentiteFAQItem {
  question: string;
  answer: string;
  link?: { text: string; href: string };
}

// ---------------------
// Hero
// ---------------------

export const heroContent = {
  badge: "IDENTIT\u00C9 VISUELLE & DIRECTION CR\u00C9ATIVE",
  h1: "Votre identit\u00E9 visuelle. Forg\u00E9e par 20 ans de direction cr\u00E9ative.",
  subtitle:
    "Logo, charte graphique, univers de marque. On ne d\u00E9core pas \u2014 on r\u00E9v\u00E8le l\u2019essence de votre business. Chaque trait a une intention.",
  cta: "Discuter de mon projet",
  ctaLink: "https://cal.com/elliot-estrade-ixfuya/appel-decouverte",
  proof: "Sur devis \u00B7 Gratuit \u00B7 20 min",
};

// ---------------------
// Prestations
// ---------------------

export const prestationsContent = {
  title: "Ce qu\u2019on forge pour vous.",
  subtitle:
    "Chaque \u00E9l\u00E9ment de votre identit\u00E9 est pens\u00E9 comme une pi\u00E8ce d\u2019un ensemble coh\u00E9rent.",
};

export const prestationBlocks: PrestationBlock[] = [
  {
    icon: "Pen",
    title: "Cr\u00E9ation de logo",
    text: "Un symbole qui vous identifie en un clin d\u2019\u0153il. Recherches, concepts, it\u00E9rations. Votre logo est test\u00E9 sur tous les supports avant validation. D\u00E9clinaisons couleur, monochrome, favicon incluses.",
    accent: "orange",
  },
  {
    icon: "Palette",
    title: "Charte graphique compl\u00E8te",
    text: "Couleurs, typographies, espacements, r\u00E8gles d\u2019usage. Un document de r\u00E9f\u00E9rence pour que chaque support \u2014 web, print, r\u00E9seaux \u2014 soit coh\u00E9rent. Votre marque parle d\u2019une seule voix.",
    accent: "amber",
  },
  {
    icon: "Layers",
    title: "Univers visuel & Direction artistique",
    text: "Au-del\u00E0 du logo et de la charte\u202F: le style photographique, les textures, les motifs, le ton visuel global. L\u2019atmosph\u00E8re qui fait que votre marque se reconna\u00EEt sans m\u00EAme lire le nom.",
    accent: "orange",
  },
  {
    icon: "FileText",
    title: "Papeterie & Supports digitaux",
    text: "Cartes de visite, signatures email, templates r\u00E9seaux sociaux, en-t\u00EAtes de documents. Chaque point de contact avec vos clients porte votre identit\u00E9.",
    accent: "amber",
  },
];

// ---------------------
// Process
// ---------------------

export const processContent = {
  badge: "NOTRE PROCESS",
  title: "De la premi\u00E8re id\u00E9e \u00E0 votre marque. \u00C9tape par \u00E9tape.",
  subtitle:
    "Un process structur\u00E9, transparent, et collaboratif. Vous \u00EAtes impliqu\u00E9 \u00E0 chaque d\u00E9cision.",
};

export const processSteps: IdentiteProcessStep[] = [
  {
    number: "01",
    title: "Immersion",
    text: "On plonge dans votre univers. Votre histoire, votre march\u00E9, vos concurrents, votre audience. On identifie ce qui vous rend unique. C\u2019est la fondation de tout.",
  },
  {
    number: "02",
    title: "Exploration cr\u00E9ative",
    text: "Recherches, moodboards, pistes graphiques. On explore plusieurs directions. L\u2019IA acc\u00E9l\u00E8re l\u2019id\u00E9ation, l\u2019\u0153il de 20 ans de direction cr\u00E9ative s\u00E9lectionne. Vous choisissez la direction qui vous parle.",
  },
  {
    number: "03",
    title: "Cr\u00E9ation & It\u00E9ration",
    text: "On d\u00E9veloppe la direction choisie. Logo, couleurs, typographies, applications. Retours illimit\u00E9s \u00E0 chaque \u00E9tape. On affine jusqu\u2019\u00E0 ce que chaque d\u00E9tail soit juste.",
  },
  {
    number: "04",
    title: "Livraison",
    text: "Fichiers sources, charte graphique document\u00E9e, d\u00E9clinaisons tous formats. Tout est pr\u00EAt pour \u00EAtre utilis\u00E9 \u2014 web, print, r\u00E9seaux sociaux. Votre marque est pr\u00EAte \u00E0 briller.",
  },
];

// ---------------------
// Portfolio
// ---------------------

export const portfolioContent = {
  badge: "NOS CR\u00C9ATIONS",
  title: "Des identit\u00E9s qui marquent.",
  subtitle:
    "Chaque marque a sa propre lumi\u00E8re. Voici celles qu\u2019on a r\u00E9v\u00E9l\u00E9es.",
};

export const portfolioItems: IdentitePortfolioItem[] = [
  {
    image: "/images/identite-visuelle/portfolio/placeholder-1.webp",
    brandName: "Maison Enileh",
    sector: "Conciergerie de luxe",
    description: "Une identit\u00E9 \u00E9l\u00E9gante pour une conciergerie haut de gamme.",
    credit: "Direction cr\u00E9ative : Fabien Estrade",
  },
  {
    image: "/images/identite-visuelle/portfolio/placeholder-2.webp",
    brandName: "Savistas",
    sector: "SaaS / Tech",
    description: "Un univers visuel moderne et percutant pour une plateforme innovante.",
    credit: "Direction cr\u00E9ative : Fabien Estrade",
  },
  {
    image: "/images/identite-visuelle/portfolio/placeholder-3.webp",
    brandName: "Allo Restau",
    sector: "Restauration",
    description: "Une charte graphique chaleureuse qui donne envie de passer \u00E0 table.",
    credit: "Direction cr\u00E9ative : Fabien Estrade \u2014 Le Prisme",
  },
  {
    image: "/images/identite-visuelle/portfolio/placeholder-4.webp",
    brandName: "Golf Mentor",
    sector: "Sport & Loisirs",
    description: "Une identit\u00E9 premium pour un service de coaching golf.",
    credit: "Direction cr\u00E9ative : Fabien Estrade \u2014 Le Prisme",
  },
  {
    image: "/images/identite-visuelle/portfolio/placeholder-5.webp",
    brandName: "Friend\u2019iz",
    sector: "E-commerce",
    description: "Un branding color\u00E9 et m\u00E9morable pour une marketplace sociale.",
    credit: "Direction cr\u00E9ative : Fabien Estrade \u2014 Le Prisme",
  },
  {
    image: "/images/identite-visuelle/portfolio/placeholder-6.webp",
    brandName: "Comparateur-IA-Facile",
    sector: "Tech / IA",
    description: "Une identit\u00E9 claire et fiable pour un comparateur d\u2019outils IA.",
    credit: "Direction cr\u00E9ative : Fabien Estrade",
  },
];

// ---------------------
// Pourquoi (Craft + IA)
// ---------------------

export const pourquoiContent = {
  title: "20 ans de direction cr\u00E9ative. L\u2019IA en plus.",
  subtitle: "Ce qui fait la diff\u00E9rence entre un logo et une identit\u00E9.",
  expertise: {
    title: "L\u2019\u0153il qui forge",
    text: "Fabien a dirig\u00E9 l\u2019agence Le Prisme pendant 20 ans. Des centaines de marques cr\u00E9\u00E9es, forg\u00E9es, accompagn\u00E9es. Il sait reconna\u00EEtre le trait qui fonctionne, la couleur qui convertit, l\u2019identit\u00E9 qui dure. Ce n\u2019est pas un algorithme qui valide \u2014 c\u2019est 20 ans de craft.",
  },
  ia: {
    title: "L\u2019IA qui acc\u00E9l\u00E8re l\u2019exploration",
    text: "L\u2019intelligence artificielle multiplie les pistes cr\u00E9atives. Plus de concepts explor\u00E9s, plus vite. Mais chaque choix passe par l\u2019\u0153il humain. L\u2019IA propose, l\u2019expertise dispose. Le r\u00E9sultat\u202F: un process plus riche, sans compromis sur la qualit\u00E9.",
  },
  quote:
    "\u00ABUne identit\u00E9 visuelle, c\u2019est pas un joli logo. C\u2019est le premier contact entre votre business et le monde. Il doit \u00EAtre parfait.\u00BB",
  quoteAuthor: "Fabien Estrade, 20 ans de direction cr\u00E9ative",
  teamLink: { text: "D\u00E9couvrir toute l\u2019\u00E9quipe \u2192", href: "/a-propos" },
};

// ---------------------
// Tarifs
// ---------------------

export const tarifsContent = {
  badge: "TARIFS",
  title: "Sur devis. Parce que chaque projet est unique.",
  text: "Le prix d\u00E9pend de l\u2019ampleur du projet. Un logo seul, une charte compl\u00E8te, un univers de marque total \u2014 chaque besoin est diff\u00E9rent. On en discute ensemble, on cadre le p\u00E9rim\u00E8tre, on vous fait un devis clair.",
  factors: [
    "Nombre de pistes cr\u00E9atives explor\u00E9es",
    "\u00C9tendue de la charte (logo seul vs. charte compl\u00E8te vs. univers total)",
    "Nombre de supports d\u00E9clin\u00E9s (cartes de visite, r\u00E9seaux, papeterie\u2026)",
    "Cr\u00E9ation de contenu compl\u00E9mentaire (shooting photo, r\u00E9daction)",
  ],
  guarantee:
    "Retours illimit\u00E9s jusqu\u2019\u00E0 validation. On ne livre que du parfait.",
  cta: "Demander un devis",
  ctaLink: "https://cal.com/elliot-estrade-ixfuya/appel-decouverte",
  crossSell:
    "Identit\u00E9 visuelle + site vitrine\u202F? On propose des offres combin\u00E9es. Parlez-en lors du call.",
  crossSellLink: { text: "D\u00E9couvrir nos sites vitrines \u2192", href: "/sites-vitrines" },
};

// ---------------------
// FAQ
// ---------------------

export const faqContent = {
  title: "Questions fr\u00E9quentes.",
};

export const faqItems: IdentiteFAQItem[] = [
  {
    question: "Combien co\u00FBte une identit\u00E9 visuelle\u202F?",
    answer:
      "\u00C7a d\u00E9pend du p\u00E9rim\u00E8tre. Un logo seul, une charte compl\u00E8te ou un univers de marque total \u2014 chaque projet est diff\u00E9rent. On cadre ensemble vos besoins et on vous fait un devis clair, sans surprise.",
  },
  {
    question: "Combien de temps prend la cr\u00E9ation\u202F?",
    answer:
      "Comptez 1 \u00E0 3 semaines selon le p\u00E9rim\u00E8tre. La phase d\u2019exploration prend le temps n\u00E9cessaire \u2014 on ne pr\u00E9cipite pas la direction cr\u00E9ative. L\u2019IA acc\u00E9l\u00E8re l\u2019id\u00E9ation, mais c\u2019est l\u2019\u0153il humain qui tranche.",
  },
  {
    question: "Combien de propositions de logo recevrai-je\u202F?",
    answer:
      "Minimum 3 pistes cr\u00E9atives distinctes. On explore des directions vari\u00E9es pour \u00EAtre s\u00FBr de trouver celle qui vous correspond. Retours et it\u00E9rations illimit\u00E9s sur la piste choisie.",
  },
  {
    question: "Je n\u2019ai aucune id\u00E9e de ce que je veux. C\u2019est un probl\u00E8me\u202F?",
    answer:
      "C\u2019est m\u00EAme mieux. La phase d\u2019immersion est faite pour \u00E7a. On explore votre march\u00E9, vos concurrents, vos valeurs. On vous propose des directions que vous n\u2019auriez pas imagin\u00E9es. C\u2019est notre m\u00E9tier depuis 20 ans.",
  },
  {
    question: "Quels fichiers recevrai-je \u00E0 la fin\u202F?",
    answer:
      "Fichiers vectoriels (AI, SVG, PDF), formats web (PNG, WEBP), d\u00E9clinaisons couleur et monochrome, favicon, charte graphique document\u00E9e en PDF. Tout est organis\u00E9 et pr\u00EAt \u00E0 l\u2019emploi.",
  },
  {
    question: "Vous pouvez aussi cr\u00E9er mon site web\u202F?",
    answer:
      "Oui. C\u2019est m\u00EAme notre sp\u00E9cialit\u00E9. On propose des offres combin\u00E9es identit\u00E9 visuelle + site vitrine. Votre site est forg\u00E9 dans la continuit\u00E9 directe de votre identit\u00E9 \u2014 coh\u00E9rence totale.",
    link: {
      text: "D\u00E9couvrir nos sites vitrines \u2192",
      href: "/sites-vitrines",
    },
  },
];

// ---------------------
// CTA Final
// ---------------------

export const ctaContent = {
  title: "Pr\u00EAt \u00E0 forger votre identit\u00E9\u202F?",
  subtitle:
    "20 minutes pour comprendre votre projet, votre vision, vos ambitions. On vous pr\u00E9sente notre approche et un premier cadrage. Gratuit, sans engagement.",
  cta: "Discuter de mon projet",
  ctaLink: "https://cal.com/elliot-estrade-ixfuya/appel-decouverte",
  proofs: [
    "Gratuit et sans engagement",
    "20 ans de direction cr\u00E9ative",
    "Retours illimit\u00E9s jusqu\u2019\u00E0 perfection",
  ],
};
