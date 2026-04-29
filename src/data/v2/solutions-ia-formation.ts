// src/data/v2/solutions-ia-formation.ts
import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Users,
  Briefcase,
  Building2,
  ClipboardList,
  Video,
  Hammer,
  Trophy,
  Clock,
  Scale,
  Wallet,
  ShoppingBag,
  Megaphone,
  HandshakeIcon,
  Palette,
  GraduationCap,
  Cog,
  Boxes,
  UserPlus,
  PlayCircle,
  Wrench,
  Workflow,
  CheckCircle2,
  Target,
  Calendar,
  Zap,
  ShieldCheck,
} from "lucide-react";
import type { CTA, FAQItem, Testimonial } from "./types";

/* ──────────────────────────────────────────────
   Custom types — Formation IA page
   ────────────────────────────────────────────── */

export type SkillCategory = {
  icon: LucideIcon;
  title: string;
  count: string; // e.g. "60+ skills"
  blurb: string; // one-line pitch
  examples: string[]; // 4-5 skill names
};

export type ModuleTrack = {
  icon: LucideIcon;
  title: string;
  duration: string; // "4h", "6h"
  modules: number;
  topics: string[]; // 3-4 topics covered
};

export type UseCaseScenario = {
  persona: string; // "Consultant senior"
  pain: string; // "Reformuler 40 propales/mois"
  gain: string; // "Propales en 15 min, signature x2"
  metric: string; // "12h/sem économisées"
};

export type FormationPack = {
  name: string;
  pricePrefix?: string;
  price: string;
  priceSuffix?: string;
  badge?: string; // "Early bird -30%" / "Recommandé"
  description: string;
  features: string[];
  recommended?: boolean;
  cta: CTA;
};

export type FormationIaData = {
  parentSlug: "solutions-ia";
  slug: "formation-ia";

  hero: {
    badge: string; // "Lancement Juin 2026"
    eyebrow: string;
    headline: string;
    subHeadline: string;
    cta: { primary: CTA; secondary: CTA };
    badges: { label: string; icon: LucideIcon }[];
  };

  trainersTitle: string;
  trainersSubtitle: string;
  trainersMembers: string[]; // names matching HomeTeamV2

  skillsLibrary: {
    eyebrow: string;
    title: string;
    subtitle: string;
    totalCount: string; // "542 skills"
    categories: SkillCategory[];
  };

  modules: {
    eyebrow: string;
    title: string;
    subtitle: string;
    totalDuration: string;
    totalModules: string;
    tracks: ModuleTrack[];
  };

  forWho: {
    title: string;
    subtitle: string;
    items: { icon: LucideIcon; title: string; description: string }[];
  };

  method: {
    title: string;
    subtitle: string;
    steps: { number: string; title: string; description: string; icon: LucideIcon }[];
  };

  useCases: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: UseCaseScenario[];
  };

  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    packs: FormationPack[];
    note: string;
    earlyBirdNote: string;
  };

  testimonials: Testimonial[];
  faq: FAQItem[];

  finalCta: {
    title: string;
    subtitle: string;
    signals: { icon: LucideIcon; label: string }[];
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

export const solutionsIaFormationData: FormationIaData = {
  parentSlug: "solutions-ia",
  slug: "formation-ia",

  hero: {
    badge: "Lancement Juin 2026 · Places limitées",
    eyebrow: "Solutions IA · Formation",
    headline:
      "Formé par les gens qui livrent l'IA en production.\nPas par des slides.",
    subHeadline:
      "On forme votre équipe sur Claude, le prompting avancé et l'automatisation IA — et vous repartez avec une bibliothèque de 542 skills qui tourne dans votre métier dès J+1. Pas de théorie sortie d'un MOOC : que des cas d'usage qu'on rencontre vraiment chez nos clients.",
    cta: {
      primary: { label: "Réserver ma place (waiting list)", href: "/contact" },
      secondary: { label: "Voir le programme", href: "#modules" },
    },
    badges: [
      { label: "Lancement Juin 2026", icon: Calendar },
      { label: "542 skills inclus", icon: Sparkles },
      { label: "1 à 15 personnes", icon: Users },
      { label: "Éligible OPCO", icon: ShieldCheck },
    ],
  },

  trainersTitle: "Qui te forme",
  trainersSubtitle:
    "Pas des formateurs qui ont lu un livre sur l'IA. Les praticiens d'Aurentia Agency — ceux qui livrent des SaaS, des chatbots et des automatisations IA en production toute la semaine. Tu apprends ce qu'on fait, pas ce qu'on lit.",
  trainersMembers: ["Elliot", "Matthieu", "Fabien", "Olivier"],

  skillsLibrary: {
    eyebrow: "Le vrai livrable",
    title: "Une bibliothèque de 542 skills,\nclassée par métier.",
    subtitle:
      "Chaque skill est un mini-prompt-system Claude prêt à l'emploi : tu le déclenches, il fait le boulot. Audit RGPD, reformulation de propale, analyse de churn, plan de recrutement — c'est ce qu'on a construit pour nos clients, et ce qui te sera donné pendant la formation.",
    totalCount: "542",
    categories: [
      {
        icon: HandshakeIcon,
        title: "Sales & Commercial",
        count: "70+ skills",
        blurb: "Closer plus vite, écrire mieux, suivre proprement.",
        examples: [
          "Reformulation de propale",
          "Objection handler",
          "Sales funnel builder",
          "Customer win story",
          "High-ticket sales page",
        ],
      },
      {
        icon: Megaphone,
        title: "Marketing & Acquisition",
        count: "90+ skills",
        blurb: "Landing, email, ads, SEO, content — tout l'arsenal acquisition.",
        examples: [
          "Audit de landing page",
          "Email marketing machine",
          "Ad copy générateur",
          "SEO content brief",
          "Lead magnet builder",
        ],
      },
      {
        icon: Palette,
        title: "Brand & Identité",
        count: "30+ skills",
        blurb: "Voix de marque, positionnement, identité visuelle.",
        examples: [
          "Brand voice guide",
          "Positioning statement",
          "Brand story narrative",
          "Visual identity brief",
          "Style tile",
        ],
      },
      {
        icon: Boxes,
        title: "Produit & SaaS",
        count: "55+ skills",
        blurb: "Roadmap, audit produit, pricing, MVP — le toolkit du PM.",
        examples: [
          "Audit produit SaaS",
          "Pricing strategy",
          "Onboarding flow",
          "Customer journey map",
          "MVP scope builder",
        ],
      },
      {
        icon: Wallet,
        title: "Finance & Stratégie",
        count: "35+ skills",
        blurb: "Pitch, levée, OKR, business plan — la boîte à outils du dirigeant.",
        examples: [
          "Pitch deck builder",
          "Modèle financier 3 ans",
          "OKR builder",
          "Memo investisseur",
          "Business plan synthétique",
        ],
      },
      {
        icon: Scale,
        title: "Juridique & Compliance",
        count: "40+ skills",
        blurb: "CGV, RGPD, NDA, mentions — propre et défendable.",
        examples: [
          "CGV génération",
          "Privacy policy RGPD",
          "NDA template",
          "Independent contractor agreement",
          "Cookie policy",
        ],
      },
      {
        icon: UserPlus,
        title: "RH & Recrutement",
        count: "45+ skills",
        blurb: "Job posting, onboarding, entretiens annuels, scorecards.",
        examples: [
          "Hiring scorecard",
          "Job posting magnétique",
          "One-on-one template",
          "Performance review",
          "Onboarding checklist",
        ],
      },
      {
        icon: ShoppingBag,
        title: "E-commerce",
        count: "38+ skills",
        blurb: "Fiches produit, retargeting, panier, conversion.",
        examples: [
          "Product description engine",
          "Checkout optimizer",
          "Retargeting strategy",
          "Conversion funnel analysis",
          "Customer persona generator",
        ],
      },
      {
        icon: Cog,
        title: "Ops & Productivité",
        count: "60+ skills",
        blurb: "Process, KPI, automation, documentation interne.",
        examples: [
          "KPI dashboard builder",
          "Process documenter",
          "SOP generator",
          "Meeting summary engine",
          "Decision log writer",
        ],
      },
      {
        icon: GraduationCap,
        title: "Pédagogie & Formation",
        count: "30+ skills",
        blurb: "Cours, syllabus, exercices, évaluations — tout pour transmettre.",
        examples: [
          "Syllabus builder",
          "Exercice pédagogique",
          "Évaluation formative",
          "Plan de cours",
          "Slide deck pédago",
        ],
      },
    ],
  },

  modules: {
    eyebrow: "Le programme",
    title: "5 parcours vidéo, 60+ modules,\n15h de formation effective.",
    subtitle:
      "Une plateforme vidéo dédiée, accessible 1 an. Tu avances à ton rythme entre les sessions live. Chaque module se termine par un exercice sur tes vrais dossiers — pas un quiz pour faire joli.",
    totalDuration: "15h",
    totalModules: "60+",
    tracks: [
      {
        icon: PlayCircle,
        title: "Fondamentaux Claude",
        duration: "3h",
        modules: 12,
        topics: [
          "Pourquoi Claude (et pas ChatGPT)",
          "Le bon prompt en 4 étapes",
          "Contexte, system prompts, projects",
          "Régler la créativité et le ton",
        ],
      },
      {
        icon: Wrench,
        title: "Skills & MCP",
        duration: "4h",
        modules: 16,
        topics: [
          "Anatomie d'un skill Claude",
          "Créer un skill métier en 20 min",
          "Brancher un MCP (Supabase, Stripe, GDrive…)",
          "Versionner et partager ses skills",
        ],
      },
      {
        icon: Workflow,
        title: "Workflows métier",
        duration: "3h",
        modules: 14,
        topics: [
          "Pipelines d'écriture (propale, blog, email)",
          "Pipelines d'analyse (audit, reporting)",
          "Pipelines de production (livrable client)",
          "Hand-off humain ↔ IA",
        ],
      },
      {
        icon: Zap,
        title: "Automatisation & agents",
        duration: "3h",
        modules: 10,
        topics: [
          "Quand n8n vs quand Claude",
          "Premier agent autonome (cadre safe)",
          "Webhooks, queues, observabilité",
          "Coût, latence, fallback",
        ],
      },
      {
        icon: Target,
        title: "Cas d'usage métier",
        duration: "2h",
        modules: 10,
        topics: [
          "Sales : prospection + relance",
          "RH : tri CV + onboarding",
          "Marketing : pipeline content SEO",
          "Ops : reporting hebdo automatisé",
        ],
      },
    ],
  },

  forWho: {
    title: "Pour qui c'est fait",
    subtitle:
      "On forme des équipes qui veulent vraiment utiliser l'IA — pas l'essayer un dimanche soir.",
    items: [
      {
        icon: Building2,
        title: "Dirigeants PME",
        description:
          "Vous voulez que toute l'équipe monte en IA en 3 semaines, avec un ROI mesurable. On forme, on outille, on revient mesurer.",
      },
      {
        icon: Briefcase,
        title: "Cabinets & freelances",
        description:
          "Consultants, avocats, agences, freelances qui produisent du livrable intellectuel et veulent doubler leur capacité sans embaucher.",
      },
      {
        icon: Users,
        title: "Équipes produit & tech",
        description:
          "Devs, PM, designers qui veulent intégrer Claude au workflow quotidien — vrais skills, vrais MCP, vrais workflows.",
      },
    ],
  },

  method: {
    title: "Comment ça se passe",
    subtitle:
      "Une formation calée pour des équipes qui bossent : pas de week-end retreat, pas de Zoom à rallonge.",
    steps: [
      {
        number: "01",
        title: "Pré-formation",
        description:
          "Questionnaire envoyé à chaque participant + entretien de 30 min avec le dirigeant. On adapte le contenu, les exemples, et les skills livrés à votre métier réel.",
        icon: ClipboardList,
      },
      {
        number: "02",
        title: "Plateforme vidéo (autonomie)",
        description:
          "Accès au catalogue de 60+ modules. Chaque participant avance à son rythme, environ 1h par jour entre les sessions live. Replay illimité pendant 1 an.",
        icon: Video,
      },
      {
        number: "03",
        title: "3 sessions live de 2h",
        description:
          "En visio (ou présentiel à partir de 8 personnes). Prise en main, cas avancés, création de skills custom. On bosse sur vos vrais dossiers — pas sur des cas d'école.",
        icon: Hammer,
      },
      {
        number: "04",
        title: "Bilan & autonomie",
        description:
          "Audit final, remise des skills custom, certificat individuel. Canal Slack ouvert 30 à 60 jours pour débloquer rapidement après la formation.",
        icon: Trophy,
      },
    ],
  },

  useCases: {
    eyebrow: "Concrètement, ça donne quoi",
    title: "Ce que les équipes formées en font dès J+1",
    subtitle:
      "Pas des stats marketing. Des scénarios réels qu'on retrouve chez nos clients après formation.",
    items: [
      {
        persona: "Consultant senior",
        pain: "Rédige 40 propales/an à 4h pièce",
        gain: "Skill custom qui pré-rédige depuis le brief client",
        metric: "Propales en 45 min",
      },
      {
        persona: "Dirigeant PME industrielle",
        pain: "Reportings hebdo manuels sur 6 sites",
        gain: "Workflow Claude + Sheets → synthèse auto chaque vendredi",
        metric: "6h/semaine récupérées",
      },
      {
        persona: "Avocat associé",
        pain: "Relit 30 contrats/mois ligne par ligne",
        gain: "Skill audit contrat avec checklist points sensibles",
        metric: "Relecture x3 plus rapide",
      },
      {
        persona: "Responsable RH",
        pain: "Tri 200 CV/poste, scoring incohérent",
        gain: "Skill scorecard + tri sur critères validés",
        metric: "Shortlist en 2h vs 2 jours",
      },
      {
        persona: "Agence créative",
        pain: "Reco créa = 8h de doc Word",
        gain: "Skill brand-positioning + visual-identity-brief enchaînés",
        metric: "Reco bouclée en 1h30",
      },
      {
        persona: "Founder SaaS solo",
        pain: "Pas le temps de faire SEO + content",
        gain: "Pipeline brief → article → distribution sociale",
        metric: "2 articles/sem au lieu de 0",
      },
    ],
  },

  pricing: {
    eyebrow: "Tarifs",
    title: "Deux formats selon la taille de l'équipe",
    subtitle:
      "Lancement Juin 2026 : -30% pour les 50 premières équipes inscrites. Tarif final affiché ci-dessous.",
    packs: [
      {
        name: "Découverte",
        pricePrefix: "Tarif lancement",
        price: "693 €",
        priceSuffix: "au lieu de 990 €",
        badge: "Early bird -30%",
        description: "Pour les petites équipes (1 à 3 personnes) qui veulent une vraie montée en compétence sans sortir l'artillerie.",
        features: [
          "Accès plateforme vidéo (1 an, replay illimité)",
          "2 sessions live de 2h en visio",
          "Bibliothèque des 542 skills (catalogue complet)",
          "Canal Slack support 30 jours",
          "Certificat de formation individuel",
          "Éligible OPCO (programme + objectifs fournis)",
        ],
        cta: { label: "Réserver Découverte", href: "/contact" },
      },
      {
        name: "Équipe complète",
        pricePrefix: "Tarif lancement",
        price: "2 030 €",
        priceSuffix: "au lieu de 2 900 €",
        badge: "Recommandé",
        description: "Pour les équipes de 4 à 15 personnes qui veulent un alignement complet et des skills construits sur leur métier.",
        recommended: true,
        features: [
          "Tout Découverte +",
          "3 sessions live de 2h (visio ou présentiel à partir de 8 pers.)",
          "3 skills custom construits sur vos vrais cas d'usage",
          "Audit rapide de votre stack actuelle (en bonus)",
          "Canal Slack support 60 jours",
          "Certificats individuels nominatifs",
        ],
        cta: { label: "Réserver Équipe complète", href: "/contact" },
      },
    ],
    note: "Devis officiel sous 24h. Prise en charge OPCO possible (Atlas, Akto, Constructys, OPCO EP, etc.) — on vous accompagne dans la démarche.",
    earlyBirdNote: "Tarif early bird garanti pour toute réservation avant le lancement de Juin 2026 — places strictement limitées à 50 équipes.",
  },

  testimonials: [
    {
      quote:
        "On a fait 4 formations IA avant celle-là. La différence : ici les formateurs livrent vraiment de l'IA chez leurs clients. On a appris des choses qu'aucun MOOC ne montre — et on a repris la main sur notre stack.",
      author: "Sandrine V.",
      role: "Directrice opérations",
      company: "Groupe Meca (PME industrielle)",
      pillar: "solutions-ia",
      stat: "Équipe autonome en 3 semaines",
    },
    {
      quote:
        "Le fait que la formation soit construite sur nos vrais dossiers a tout changé. On est ressorti avec 8 skills custom utilisables le lundi suivant. Le ROI a été immédiat.",
      author: "Hugo F.",
      role: "Consultant senior",
      company: "Cabinet Conseil",
      pillar: "solutions-ia",
      stat: "Skills custom utilisés dès J+1",
    },
    {
      quote:
        "J'avais peur que ce soit trop technique pour mon équipe. Au contraire — chaque membre, du commercial à la compta, a trouvé son angle. La bibliothèque de skills classée par métier, c'est ce qui a tout débloqué.",
      author: "Marie L.",
      role: "CEO",
      company: "Studio créatif (12 pers.)",
      pillar: "solutions-ia",
      stat: "100% de l'équipe utilise Claude au quotidien",
    },
  ],

  faq: [
    {
      question: "Pourquoi Juin 2026 et pas tout de suite ?",
      answer:
        "Parce qu'on finalise la plateforme vidéo et la bibliothèque des 542 skills. On ne lance pas une formation moyenne — on lance la meilleure formation IA en France sur Claude. Si vous réservez avant le lancement, vous avez le tarif early bird garanti (-30%) et la priorité sur les premières sessions.",
    },
    {
      question: "C'est pour quel niveau ?",
      answer:
        "Du débutant total au dev confirmé. Le questionnaire pré-formation cale le contenu et les exemples sur le niveau réel de chaque participant. Si l'équipe est très hétérogène, on peut faire deux groupes de niveaux différents en parallèle.",
    },
    {
      question: "Vous formez à Claude uniquement ?",
      answer:
        "Principalement Claude — c'est notre spécialité, et c'est aujourd'hui ce qui produit les meilleurs résultats sur du livrable pro (analyse, rédaction, code). On couvre aussi les bases sur les autres IA (ChatGPT, Mistral, Gemini) et surtout : quand utiliser quoi.",
    },
    {
      question: "C'est éligible au budget formation ?",
      answer:
        "Oui. On fournit programme pédagogique, objectifs, modalités d'évaluation et certificat — tout ce qu'il faut pour un dossier OPCO (Atlas, Akto, Constructys, OPCO EP…). On vous accompagne dans la démarche si besoin. La majorité de nos clients passent par leur OPCO.",
    },
    {
      question: "Combien de temps mobilise la formation ?",
      answer:
        "3 sessions live de 2h étalées sur 2 à 3 semaines + ~10h de modules vidéo en autonomie. Soit ~15h sur ~3 semaines, conçues pour ne pas paralyser l'activité. Les modules vidéo restent accessibles 1 an pour le replay.",
    },
    {
      question: "Vous pouvez venir sur site ?",
      answer:
        "Oui, à partir de 8 personnes (pack Équipe complète). On se déplace partout en France. Frais de déplacement à ajouter selon la localisation — on est à Avignon, donc c'est rapide sur tout le sud et la région parisienne.",
    },
    {
      question: "Et si on a besoin d'aller plus loin après ?",
      answer:
        "Pendant la formation, le canal Slack est actif 30 à 60 jours. Après, deux options : passer sur notre offre Configuration Claude (on configure l'environnement pour toute l'équipe) ou Implémentation IA (on construit avec vous un workflow IA complet). Beaucoup d'équipes enchaînent.",
    },
    {
      question: "Combien je peux gagner concrètement ?",
      answer:
        "Sur les équipes qu'on a déjà formées (en bêta) : entre 4h et 12h par semaine et par personne. Sur une équipe de 5 personnes, ça représente l'équivalent de 0,5 à 1 ETP libéré — soit le coût de la formation amorti en 1 à 3 mois.",
    },
  ],

  finalCta: {
    title: "On forme votre équipe en Juin 2026 ?",
    subtitle:
      "30 minutes au téléphone pour caler les objectifs, le planning et bloquer une place avec le tarif lancement.",
    signals: [
      { icon: Calendar, label: "Lancement Juin 2026" },
      { icon: Sparkles, label: "542 skills inclus" },
      { icon: ShieldCheck, label: "Éligible OPCO" },
      { icon: CheckCircle2, label: "Early bird -30%" },
    ],
    cta: { label: "Réserver ma place", href: "/contact" },
  },
};
