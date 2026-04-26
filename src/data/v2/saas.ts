// src/data/saas.ts
// DRAFT_COPY — to refine before swap
// NOTE: realisation KPIs and stats are plausible placeholders.
import {
  Rocket,
  Settings,
  BrainCircuit,
  Building2,
  Briefcase,
  Users,
  Clock,
  ShieldCheck,
  ClipboardList,
  Palette,
  Code2,
} from "lucide-react";
import type { CommercialPillarData } from "./types";

export const saasData: CommercialPillarData = {
  slug: "saas",
  hero: {
    eyebrow: "Pilier SaaS sur-mesure",
    headline:
      "Votre SaaS en production,\n2 semaines après le premier appel.",
    subHeadline:
      "MVP, refontes, intégrations IA, outils métier : on conçoit et on livre des SaaS pro avec une qualité de code irréprochable — pas de bricolage low-code.",
    badges: [
      { label: "MVP en 1 à 2 semaines", icon: Clock },
      { label: "Architecture production", icon: ShieldCheck },
    ],
    cta: {
      primary: { label: "Parler de mon SaaS", href: "/contact" },
      secondary: { label: "Voir ce qu'on construit", href: "#sub-offers" },
    },
    visual: {
      kind: "image",
      src: "/images/saas/hero.jpg",
      alt: "Captures d'écran de SaaS livrés par Aurentia",
    },
  },
  stats: [
    { value: "15+", label: "SaaS livrés" },
    { value: "1-2 sem.", label: "délai MVP" },
    { value: "100%", label: "code propriétaire" },
    { value: "5 000 €", label: "à partir de" },
  ],
  subOffers: {
    variant: "single",
    title: "Ce qu'on construit",
    items: [
      {
        icon: Rocket,
        title: "MVP from scratch",
        description:
          "Votre idée en production en 1 à 2 semaines : auth, DB, paiements, dashboard.",
        eyebrow: "Pour les founders",
        meta: "1-2 semaines",
      },
      {
        icon: Settings,
        title: "Refonte SaaS existant",
        description:
          "Refactor, stack modernisée, vélocité produit retrouvée.",
        eyebrow: "Pour les CTOs",
        meta: "3-6 semaines",
      },
      {
        icon: BrainCircuit,
        title: "SaaS sur-mesure",
        description:
          "Un produit pensé pour votre marché, vos users, votre process. De zéro, sans compromis.",
        eyebrow: "Pour les besoins spécifiques",
        meta: "4-8 semaines",
      },
      {
        icon: Building2,
        title: "Outils internes métier",
        description:
          "L'outil custom qui remplace 5 tableurs et 3 Notions. Adopté dès le jour 1.",
        eyebrow: "Pour les PME",
        meta: "2-3 semaines",
      },
    ],
    stack: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Supabase" },
      { name: "PostgreSQL" },
      { name: "Stripe" },
      { name: "Vercel" },
      { name: "Anthropic API" },
    ],
  },
  forWho: {
    title: "Pour qui on travaille",
    profiles: [
      {
        icon: Rocket,
        title: "Founders early-stage",
        description:
          "Vous avez une idée validée, un premier utilisateur ou un seed round en vue. On vous livre le MVP qui vous permet de signer vos premiers clients.",
      },
      {
        icon: Building2,
        title: "PME en digitalisation",
        description:
          "Vos process tournent sur Excel et c'est de moins en moins tenable. On remplace ça par un outil custom qui scale avec votre activité.",
      },
      {
        icon: Briefcase,
        title: "Agences en whitelabel",
        description:
          "Vous êtes une agence marketing/conseil et vous avez besoin d'un partenaire tech fiable pour livrer vos SaaS clients. On bosse en backstage.",
      },
      {
        icon: Users,
        title: "Cabinets avec besoin métier",
        description:
          "Cabinet d'expertise, étude d'avocats, bureau d'études : vous avez un besoin logiciel que personne ne vend sur étagère. On le construit.",
      },
    ],
  },
  method: {
    title: "Comment on livre un MVP en 2 semaines",
    steps: [
      {
        number: "01",
        title: "Cadrage produit",
        description:
          "Deux heures pour définir le périmètre MVP, les user flows critiques et ce qui attend le v2.",
        icon: ClipboardList,
      },
      {
        number: "02",
        title: "Sprint design",
        description:
          "Maquettes haute-fidélité livrées en 72h, validées avec vous, prêtes à être intégrées.",
        icon: Palette,
      },
      {
        number: "03",
        title: "Sprint dev",
        description:
          "Développement en sprints courts, Preview deploys Vercel à chaque push, vous suivez en temps réel.",
        icon: Code2,
      },
      {
        number: "04",
        title: "Livraison & handover",
        description:
          "Déploiement en production, documentation technique, formation de votre équipe si besoin, 30 jours de support.",
        icon: Rocket,
      },
    ],
  },
  realisationsFiltered: [
    {
      slug: "mvp-12-jours",
      title: "MVP SaaS B2B livré en 12 jours",
      client: "Startup B2B",
      pillar: "saas",
      resultKpi: "12 jours · 0 → 100 utilisateurs",
      imageUrl: "/images/realisations/saas-1.jpg",
      href: "/agence",
    },
    {
      slug: "refonte-cabinet",
      title: "Refonte outil métier cabinet d'expertise",
      client: "Cabinet Meridian",
      pillar: "saas",
      resultKpi: "−60% temps de traitement dossier",
      imageUrl: "/images/realisations/saas-2.jpg",
      href: "/agence",
    },
  ],
  testimonialsFiltered: [
    {
      quote:
        "On avait un devis à 80k€ sur 6 mois d'une autre agence. Aurentia a livré la même chose en 3 semaines pour un quart du prix. Le code est propre, on a pu embaucher sur cette base.",
      author: "Lisa K.",
      role: "CEO",
      company: "Startup B2B",
      pillar: "saas",
      stat: "−75% budget",
    },
    {
      quote:
        "Notre outil interne était devenu ingérable. Ils ont tout refait en deux semaines et on a gagné 60% de temps sur chaque dossier. ROI atteint en 2 mois.",
      author: "Alexandre D.",
      role: "Directeur",
      company: "Cabinet Meridian",
      pillar: "saas",
      stat: "−60% temps/dossier",
    },
  ],
  faq: [
    {
      question: "Un MVP en 2 semaines, vraiment ?",
      answer:
        "Oui, tant que le périmètre MVP est clair et raisonnable. On aide à le cadrer pendant l'appel initial. Si votre « MVP » est en fait un v1 ambitieux, on vous le dit et on propose une roadmap en phases.",
    },
    {
      question: "Quelle stack vous utilisez ?",
      answer:
        "Next.js + TypeScript + Supabase + Stripe + Vercel par défaut. C'est la stack la plus efficace pour itérer vite avec une qualité de production. On sait aussi bosser sur d'autres stacks si vous en avez déjà une.",
    },
    {
      question: "Le code est à moi ?",
      answer:
        "Oui, intégralement. Code source sur votre GitHub, infrastructure sur vos comptes Supabase/Vercel. Aucun enfermement, vous pouvez partir avec tout du jour au lendemain.",
    },
    {
      question: "Vous pouvez ajouter de l'IA à notre SaaS existant ?",
      answer:
        "C'est même une de nos spécialités. On commence par un audit de votre codebase (1 à 2 jours) puis on définit ensemble les features IA qui ont du sens pour votre produit — pas du gadget.",
    },
    {
      question: "Et la maintenance après ?",
      answer:
        "30 jours inclus. Au-delà, on peut proposer un retainer mensuel (quelques jours/mois) pour les évolutions et la maintenance, ou une relation à la demande selon votre rythme.",
    },
    {
      question: "Vous facturez au forfait ou en régie ?",
      answer:
        "Au forfait pour les MVP et refontes, car le périmètre est cadré. En régie ou en sprints à la demande pour les évolutions long-terme. On est transparent sur le mode de facturation dès le devis.",
    },
  ],
  finalCta: {
    title: "On cadre votre MVP cette semaine ?",
    subtitle:
      "Un appel de 30 minutes suffit pour savoir ce qu'on peut livrer, quand, et pour combien.",
    cta: { label: "Prendre rendez-vous", href: "/contact" },
  },
};
