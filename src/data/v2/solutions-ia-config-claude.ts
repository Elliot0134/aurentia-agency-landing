// src/data/solutions-ia-config-claude.ts
//
// Page "Configuration Claude" — spécialité phare de l'offre Implémentation IA.
// Cible primaire : dirigeants, freelances, équipes ops/marketing.
// Cible secondaire : équipes tech (devs, agences, CTO).
import {
  BrainCircuit,
  Briefcase,
  Users,
  Code2,
  Sparkles,
  Clock,
  ScanSearch,
  Pencil,
  Cog,
  Headphones,
  Plug,
  FileText,
  Sliders,
  Database,
  Shield,
} from "lucide-react";
import type { SubPageData } from "./types";

export const solutionsIaConfigClaudeData: SubPageData = {
  parentSlug: "solutions-ia",
  slug: "configuration-claude",
  hero: {
    eyebrow: "Solutions IA · Spécialité d'Implémentation IA",
    headline:
      "Claude, configuré pour devenir un copilote business — pas un chatbot occasionnel.",
    subHeadline:
      "CLAUDE.md sur-mesure, skills métier, MCP servers connectés à vos outils, memory persistante. Que vous soyez dirigeant, freelance ou équipe tech, on transforme Claude en vrai membre de votre stack. Opérationnel en 3 à 7 jours.",
    priceFrom: "1 500 €",
    badges: [
      { label: "Livré en 3 à 7 jours", icon: Clock },
      { label: "Setup 100% sur-mesure", icon: Sparkles },
    ],
    cta: {
      primary: { label: "Discutons de votre setup", href: "/contact" },
      secondary: { label: "Voir ce qui est inclus", href: "#what-you-get" },
    },
    visual: {
      kind: "image",
      src: "/images/solutions-ia/config-claude-hero.jpg",
      alt: "Setup Claude configuré par Aurentia",
    },
  },
  forWho: [
    {
      icon: Briefcase,
      title: "Dirigeants & freelances",
      description:
        "Vous voulez travailler comme une équipe de cinq en étant seul. On transforme Claude en bras droit qui rédige, recherche, qualifie, analyse — connecté à votre Notion, Gmail, Drive, agenda.",
    },
    {
      icon: Users,
      title: "Équipes ops & marketing",
      description:
        "Vous voulez que toute l'équipe utilise Claude avec les mêmes skills, les mêmes outils, les mêmes garde-fous. Setup partagé, versionné, reproductible — chacun gagne 1 à 2 h par jour.",
    },
    {
      icon: Code2,
      title: "Équipes tech & agences",
      description:
        "Vous codez avec Claude Code mais vous sentez qu'il manque le dernier pourcent : CLAUDE.md complet, skills custom, hooks pre-commit, MCP serveurs branchés à votre infra. On le fait.",
    },
  ],
  whatYouGet: {
    title: "Ce qui est inclus",
    subtitle:
      "Pas de surprise — voici exactement ce qu'on installe, configure et vous remet, prêt à l'emploi.",
    items: [
      "CLAUDE.md sur-mesure adapté à votre métier, vos process et votre stack",
      "3 à 5 skills Claude custom pour vos tâches récurrentes (rédaction, recherche, analyse, ops, code…)",
      "MCP servers branchés à vos outils : Notion, Gmail, Drive, Calendar, Supabase, GitHub, Slack, Stripe…",
      "Memory persistante configurée pour des conversations contextuelles entre sessions",
      "Hooks et automatisations selon vos besoins (pre-commit, format, déclencheurs métier…)",
      "Fichier de settings partageable à toute votre équipe — versionné, reproductible",
      "Documentation interne pour onboarder un nouveau collaborateur en 15 minutes",
      "Session de handover d'1 heure pour former vous et votre équipe",
      "30 jours de support post-livraison pour ajuster et faire évoluer",
    ],
  },
  process: [
    {
      number: "01",
      title: "Audit de votre usage",
      description:
        "On regarde comment vous travaillez aujourd'hui, vos outils, vos pain points et ce que vous attendez de Claude. Objectif : identifier les vrais leviers, pas les gadgets.",
      icon: ScanSearch,
    },
    {
      number: "02",
      title: "Design du setup",
      description:
        "On rédige le CLAUDE.md, on liste les skills à créer, on choisit les MCP servers et on cale les hooks/automatisations. Validation rapide avant de coder.",
      icon: Pencil,
    },
    {
      number: "03",
      title: "Configuration & tests",
      description:
        "On installe, on configure, on développe les skills, on branche les MCP, on teste sur vos vrais cas d'usage. Démos régulières pour vérifier que ça colle.",
      icon: Cog,
    },
    {
      number: "04",
      title: "Handover & support",
      description:
        "Session d'1h pour vous former (et votre équipe), remise du repo de config + documentation, 30 jours de support pour les ajustements post-livraison.",
      icon: Headphones,
    },
  ],
  pricing: {
    title: "Deux formules selon la taille de votre setup",
    subtitle:
      "Que vous soyez seul·e ou une équipe entière, le périmètre s'adapte. Tout est versionné et vous appartient.",
    packs: [
      {
        name: "Setup Solo",
        price: "1 500 €",
        priceSuffix: "1 utilisateur",
        description:
          "Pour les dirigeants, freelances et solopreneurs qui veulent un Claude calibré à leur quotidien.",
        features: [
          "Audit d'usage personnalisé",
          "CLAUDE.md sur-mesure adapté à votre métier",
          "3 skills Claude custom",
          "MCP servers branchés à vos outils principaux",
          "Memory persistante configurée",
          "Setup versionné et documenté",
          "Session handover de 1 h",
          "30 jours de support post-livraison",
        ],
        cta: { label: "Choisir Solo", href: "/contact" },
      },
      {
        name: "Setup Équipe",
        price: "3 500 €",
        priceSuffix: "jusqu'à 10 utilisateurs",
        recommended: true,
        description:
          "Pour les équipes ops, marketing, tech ou agences qui veulent un Claude unifié et reproductible.",
        features: [
          "Audit d'usage avec entretiens équipe",
          "CLAUDE.md complet adapté à votre stack",
          "5 skills Claude custom",
          "MCP servers complets (Notion, Drive, CRM, DB, etc.)",
          "Hooks et automatisations sur-mesure",
          "Setup multi-utilisateurs versionné",
          "Documentation interne d'onboarding",
          "Session handover collective (1 h 30)",
          "30 jours de support prioritaire",
        ],
        cta: { label: "Choisir Équipe", href: "/contact" },
      },
    ],
    note: "Pour les équipes de 10+ collaborateurs ou les stacks complexes, on adapte le périmètre — devis sous 48h après cadrage.",
  },
  examples: {
    title: "Quelques setups récents",
    items: [
      {
        title: "Cabinet d'avocats — Claude pour rédaction & recherche juridique",
        imageUrl: "/images/solutions-ia/config-cabinet.jpg",
        href: "/agence",
      },
      {
        title: "Freelance growth — Claude assistant perso connecté Notion + Gmail",
        imageUrl: "/images/solutions-ia/config-freelance.jpg",
        href: "/agence",
      },
      {
        title: "Studio créatif — Claude pour brief, recherche, copywriting",
        imageUrl: "/images/solutions-ia/config-studio.jpg",
        href: "/agence",
      },
      {
        title: "Agence dev — Claude Code complet (CLAUDE.md, hooks, skills, MCP)",
        imageUrl: "/images/solutions-ia/config-agence.jpg",
        href: "/agence",
      },
    ],
  },
  testimonials: [
    {
      quote:
        "Avant Aurentia, je payais Claude 20 €/mois et je l'utilisais comme un Google amélioré. Depuis le setup, c'est devenu mon associé invisible — il connaît mes clients, mes process, mes outils.",
      author: "Léa M.",
      role: "Freelance growth",
      company: "Indépendante",
      pillar: "solutions-ia",
      stat: "+2 h/jour gagnées",
    },
    {
      quote:
        "On voulait que toute l'équipe ops utilise Claude avec les mêmes règles. Aurentia a livré un setup partagé en 5 jours. Aujourd'hui chaque collaborateur a la même qualité de copilote, sans avoir à le configurer.",
      author: "Sandrine V.",
      role: "Directrice opérations",
      company: "Groupe Meca",
      pillar: "solutions-ia",
      stat: "Équipe alignée",
    },
    {
      quote:
        "Le CLAUDE.md qu'ils ont écrit est meilleur que notre propre documentation interne. Les hooks pre-commit ont supprimé 80 % des allers-retours sur le code review. Setup payé en 3 semaines.",
      author: "Elena S.",
      role: "CTO",
      company: "Northlight",
      pillar: "solutions-ia",
      stat: "−80 % review loops",
    },
  ],
  faq: [
    {
      question: "C'est différent du service Implémentation IA ?",
      answer:
        "Configuration Claude est une spécialité d'Implémentation IA — la spécialité phare quand votre besoin est centré sur Claude (Desktop ou Code) plutôt que sur des agents/automatisations distribuées. Si votre besoin déborde (workflows n8n, agents conversationnels métier, intégrations larges), on bascule sur le pack Implémentation IA complet — c'est nous qui vous dirons si la Config Claude seule suffit ou pas.",
    },
    {
      question: "C'est quoi un CLAUDE.md exactement ?",
      answer:
        "C'est le fichier de règles que Claude lit automatiquement à chaque session pour comprendre votre contexte : qui vous êtes, vos process, votre ton, votre stack, ce qu'il doit faire ou ne pas faire. Bien rédigé, il transforme Claude d'assistant générique en collaborateur qui connaît votre métier. C'est la pièce centrale du setup.",
    },
    {
      question: "C'est quoi un MCP server ?",
      answer:
        "MCP (Model Context Protocol) permet à Claude de se connecter directement à vos outils : Notion, Gmail, Drive, Calendar, Supabase, GitHub, Slack, Stripe, etc. Concrètement, Claude peut lire et écrire dans vos outils sans copier-coller, et exécuter des actions à votre place. C'est ce qui le fait passer de chatbot à assistant opérationnel.",
    },
    {
      question: "Faut-il être développeur pour utiliser ça ?",
      answer:
        "Non, surtout pas. La majorité de nos clients ne sont pas développeurs : dirigeants, freelances, équipes ops, équipes marketing. On configure tout pour vous, on vous forme à l'utilisation, et vous l'utilisez comme une app classique. Si vous savez utiliser ChatGPT, vous saurez utiliser le setup qu'on livre.",
    },
    {
      question: "Mes données restent privées ?",
      answer:
        "Oui. On configure tout pour que vos données restent contrôlées : API keys privées, MCP servers locaux ou sur votre infra, respect RGPD. Pour les besoins les plus stricts (cabinet juridique, santé, finance), on peut déployer sur Claude Enterprise avec garanties contractuelles d'Anthropic.",
    },
    {
      question: "Quelle différence entre Claude Desktop et Claude Code ?",
      answer:
        "Claude Desktop, c'est l'app conversationnelle (rédaction, recherche, analyse, brainstorm). Claude Code, c'est l'outil pour développer (lire/écrire du code, exécuter des commandes). On configure les deux selon votre besoin — la majorité des dirigeants utilisent surtout Desktop, les équipes tech surtout Code, certains les deux.",
    },
    {
      question: "Je peux modifier les skills après livraison ?",
      answer:
        "Évidemment. Tout est versionné dans votre repo (ou votre Drive selon la cible), vous avez la main totale. On livre avec une doc interne pour que vous puissiez ajuster sans dépendre de nous. Si vous voulez qu'on continue à faire évoluer pour vous, on a des retainers mensuels en option.",
    },
    {
      question: "Et si mes besoins changent dans 6 mois ?",
      answer:
        "On propose des retainers mensuels pour les setups qui doivent évoluer en continu (≈ 600 à 1 800 € / mois selon le périmètre), ou des interventions à la demande si c'est plus ponctuel. Vous n'êtes jamais coincé — tout vous appartient, code source comme documentation.",
    },
  ],
  finalCta: {
    title: "On configure votre Claude cette semaine ?",
    subtitle:
      "30 minutes d'audit gratuit pour cadrer ce qui mérite vraiment d'être automatisé chez vous — et chiffrer le setup.",
    cta: { label: "Prendre rendez-vous", href: "/contact" },
  },
  guarantees: [
    {
      icon: Plug,
      title: "Connexions multi-outils",
      description:
        "Notion, Gmail, Drive, Calendar, Supabase, GitHub, Slack, Stripe, HubSpot, Pipedrive… tous les outils avec API se branchent.",
    },
    {
      icon: FileText,
      title: "Documentation interne complète",
      description:
        "Doc d'onboarding lisible par n'importe qui — pas besoin d'être dev pour comprendre comment utiliser et faire évoluer le setup.",
    },
    {
      icon: Sliders,
      title: "Skills 100% sur-mesure",
      description:
        "Chaque skill est calibré sur vos process, votre ton, vos données. Aucun template générique — du sur-mesure dès le premier euro.",
    },
    {
      icon: Database,
      title: "Memory persistante",
      description:
        "Claude se souvient de vos préférences, de votre contexte, de vos clients d'une session à l'autre. Plus besoin de tout réexpliquer à chaque fois.",
    },
    {
      icon: Shield,
      title: "RGPD & Claude Enterprise",
      description:
        "API keys privées, intégrations chiffrées, déploiement sur Claude Enterprise possible pour les structures les plus sensibles.",
    },
    {
      icon: BrainCircuit,
      title: "Partenaires Anthropic",
      description:
        "On utilise Claude depuis ses toutes premières versions et on fait partie du programme partenaires — accès avancé, remontées directes.",
    },
  ],
};
