// src/data/v2/vibe-coding.ts
//
// Toute la matière de la page /ressources/vibe-coding.
// Source : brief PlayTech Vibe Coding (avril 2026) + zettels ENTREPRENEUR.

import {
  Bot,
  Braces,
  Brain,
  Briefcase,
  Building2,
  CheckCircle2,
  Code2,
  Compass,
  CreditCard,
  Database,
  Eye,
  FileWarning,
  Gauge,
  GitBranch,
  Globe,
  Hammer,
  Layers,
  Lightbulb,
  Lock,
  MessageSquare,
  MonitorSmartphone,
  Network,
  Palette,
  Rocket,
  ScrollText,
  Server,
  Settings2,
  Shield,
  ShieldAlert,
  Sparkles,
  SquareCode,
  Target,
  Terminal,
  Trash2,
  Users,
  Wand2,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ───────────── Hero ───────────── */

export const vibeCodingHero = {
  eyebrow: "Ressources",
  headline: "Le guide complet du vibe coding",
  subHeadline:
    "Construire du logiciel en parlant à une IA. Les outils, la méthode, les pièges — tout ce que nous avons appris en bossant en vibe coding chez Aurentia.",
  cta: {
    primary: { label: "Demander un accompagnement", href: "/contact" },
    secondary: { label: "Voir nos formations IA", href: "/solutions-ia/formation-ia" },
  },
};

/* ───────────── Table of contents ───────────── */

export type TocEntry = { id: string; label: string };

export const vibeCodingToc: TocEntry[] = [
  { id: "concepts", label: "Le vibe coding, c'est quoi ?" },
  { id: "paradigmes", label: "Les 3 paradigmes du marché" },
  { id: "outils", label: "Le benchmark des 10 outils" },
  { id: "decision", label: "Quel outil pour quel profil ?" },
  { id: "methode", label: "La méthode pro en 6 étapes" },
  { id: "prompts", label: "Prompts & templates copiables" },
  { id: "stack", label: "La stack d'Aurentia" },
  { id: "risques", label: "Risques & vibe engineering" },
];

/* ───────────── Section 1 — Concepts ───────────── */

export const karpathyQuote = {
  source: "Andrej Karpathy",
  date: "2 février 2025 — sur X",
  vo: "There's a new kind of coding I call vibe coding, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists.",
  fr: "Il y a un nouveau type de coding que j'appelle vibe coding : on se laisse porter par le feeling, on parie sur l'exponentielle, et on oublie même que le code existe.",
};

export const vibeCodingPillars: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Sparkles,
    title: "Give in to the vibes",
    description:
      "On ne lutte plus avec l'IA. On accepte sa suggestion même imparfaite, on corrige en conversation au lieu de réécrire à la main.",
  },
  {
    icon: Rocket,
    title: "Embrace exponentials",
    description:
      "On parie que le modèle s'améliore plus vite que nous. On mise sur le workflow, pas sur la perfection de chaque output.",
  },
  {
    icon: Eye,
    title: "Forget the code exists",
    description:
      "On ne lit pas ce que l'IA écrit — on voit le résultat, on juge l'usage, on reprompt. C'est le point qui fait le plus débat.",
  },
];

export const willisonDistinction = {
  vibeCoding: {
    title: "Vibe coding",
    bullets: [
      "Construire avec un LLM sans reviewer le code",
      "Sweet spot : prototypes jetables, internal tools, démos, weekend projects",
      "Speed > qualité du code. On ship pour valider une idée.",
    ],
  },
  vibeEngineering: {
    title: "Vibe engineering",
    bullets: [
      "LLM + spec + tests + review + déploiement disciplinés",
      "Obligatoire dès qu'il y a auth, paiement, données utilisateurs ou code maintenu 6+ mois",
      "Le coding reste assisté, mais la rigueur d'ingénieur reprend le volant.",
    ],
  },
  source: "Simon Willison — co-créateur de Django, voix #1 sur l'usage des LLMs",
};

export const vibeCodingStats: { value: string; label: string; suffix?: string }[] = [
  { value: "92", suffix: "%", label: "des dévs US utilisent l'IA quotidiennement" },
  { value: "25", suffix: "%", label: "du batch YC W25 livré avec 95 % de code IA" },
  { value: "3-5", suffix: "×", label: "plus rapide pour prototyper vs codage manuel" },
  { value: "80", suffix: "M$", label: "Base44 racheté par Wix après 6 mois d'existence" },
  { value: "1", suffix: "M$", label: "ARR en 17 jours (record Pieter Levels)" },
];

/* ───────────── Section 2 — Paradigmes ───────────── */

export type Paradigm = {
  icon: LucideIcon;
  title: string;
  sweetSpot: string;
  forWho: string;
  examples: string[];
};

export const paradigms: Paradigm[] = [
  {
    icon: MessageSquare,
    title: "Chat-web no-code",
    sweetSpot: "On prompt dans une interface web, preview live, itération conversationnelle.",
    forWho: "Non-tech ou semi-tech qui veut un MVP visible vite.",
    examples: ["Lovable", "Base44", "Bolt.new", "Emergent", "v0"],
  },
  {
    icon: SquareCode,
    title: "IDE augmenté",
    sweetSpot: "Un éditeur de code (souvent fork VS Code) avec couche IA agent native.",
    forWho: "Dévs juniors à seniors qui veulent garder leur IDE familier.",
    examples: ["Cursor", "Windsurf", "Antigravity"],
  },
  {
    icon: Terminal,
    title: "CLI agentique",
    sweetSpot: "L'IA dans le terminal, branchée au repo, capable d'orchestrer subagents et MCPs.",
    forWho: "Dévs sérieux + automation pipelines.",
    examples: ["Claude Code"],
  },
];

/* ───────────── Section 3 — Outils ───────────── */

export type ToolCategory = "chat-web" | "ide" | "cli" | "design";

export type Tool = {
  name: string;
  url: string;
  category: ToolCategory;
  paradigm: string;
  pricing: string;
  forWho: string;
  strength: string;
  weakness: string;
  badge?: string;
  hero?: boolean;
};

export const tools: Tool[] = [
  {
    name: "Claude Code",
    url: "https://claude.com/claude-code",
    category: "cli",
    paradigm: "CLI agentique",
    pricing: "20 $/mois (Claude Pro)",
    forWho: "Dévs sérieux ou vibe coders qui veulent du code prod-grade",
    strength:
      "Archi la plus propre du marché, contexte 1M tokens (Opus 4.7), écosystème MCP/skills extensible, verification before completion intégrée.",
    weakness: "Pas d'IDE visuel, courbe d'entrée plus rude pour non-tech, moins « show off » qu'un Lovable en démo.",
    badge: "Notre choix",
    hero: true,
  },
  {
    name: "Lovable",
    url: "https://lovable.dev",
    category: "chat-web",
    paradigm: "Chat-web no-code",
    pricing: "Free / Pro 25 $/mois",
    forWho: "Non-tech ou semi-tech qui veut un MVP visible vite",
    strength: "Le plus accessible pour un non-tech, backend Supabase natif, vraie app fonctionnelle pas que maquette.",
    weakness: "Backend logic parfois fragile, crédits limitants si on itère beaucoup.",
  },
  {
    name: "Base44",
    url: "https://base44.com",
    category: "chat-web",
    paradigm: "Chat-web all-in-one",
    pricing: "Free / ~25 $/mois",
    forWho: "Vrai débutant total non-tech (app interne, productivité)",
    strength:
      "Le plus simple absolu, backend + auth + emails + analytics intégrés, racheté 80 M$ par Wix en juin 2025.",
    weakness: "Moins de contrôle qu'un Lovable, lock-in plateforme Wix maintenant.",
  },
  {
    name: "Bolt.new",
    url: "https://bolt.new",
    category: "chat-web",
    paradigm: "Chat-web sandbox",
    pricing: "Free / 25 $/mois",
    forWho: "Tout le monde, prototypes rapides en browser",
    strength: "Ultra rapide, accepte images en input, idéal démo et prototype.",
    weakness: "Génère le plus de bugs des chat-web, pas pour code maintenable.",
  },
  {
    name: "Emergent.sh",
    url: "https://emergent.sh",
    category: "chat-web",
    paradigm: "Multi-agent full-stack",
    pricing: "Credit-based",
    forWho: "Product builders qui veulent valider une idée monétisable",
    strength: "Speed prompt-to-live-app parmi les meilleurs, Stripe inclus en natif (rare), backé YC.",
    weakness: "Reviews mitigées sur la stabilité, crédits qui tombent même quand le bug n'est pas résolu.",
  },
  {
    name: "v0 by Vercel",
    url: "https://v0.app",
    category: "design",
    paradigm: "Chat-web (UI focus)",
    pricing: "Free / Premium 20 $/mois",
    forWho: "Dév ou semi-tech qui veut générer des UIs propres avec shadcn",
    strength: "Sortie shadcn/ui + Tailwind = stack standard 2026, déploiement edge instant.",
    weakness: "Génial sur l'UI, plus limité sur backend complexe.",
  },
  {
    name: "Google Stitch",
    url: "https://stitch.withgoogle.com",
    category: "design",
    paradigm: "Design vocal → code",
    pricing: "100 % gratuit",
    forWho: "Tout le monde, surtout designers",
    strength: "Gratuit, design vocal, export multi-framework.",
    weakness: "Pas de backend, frontend only.",
  },
  {
    name: "Cursor",
    url: "https://cursor.com",
    category: "ide",
    paradigm: "IDE forké VS Code",
    pricing: "Free / Pro 20 $/mois",
    forWho: "Dévs (junior à senior) qui veulent un IDE familier",
    strength:
      "Vitesse (la plupart des tâches en moins de 30 s), zéro learning curve, Design Mode pour itérer sur l'UI.",
    weakness: "Moins agent autonome que Claude Code ou Antigravity sur tâches multi-fichiers complexes.",
  },
  {
    name: "Windsurf",
    url: "https://windsurf.com",
    category: "ide",
    paradigm: "IDE + Cascade agent",
    pricing: "Free / 15 $/mois",
    forWho: "Dévs cherchant une alternative à Cursor",
    strength: "Cascade pour refactor multi-fichiers en entreprise.",
    weakness: "Moins connu, racheté par Google (devenu base d'Antigravity).",
  },
  {
    name: "Antigravity",
    url: "https://antigravity.google",
    category: "ide",
    paradigm: "IDE agent-first",
    pricing: "Gratuit (preview)",
    forWho: "Dévs qui veulent expérimenter l'agent-first le plus poussé",
    strength:
      "Multi-agent parallel natif, Artifacts vérifiables (plans, screenshots, browser recordings), 76,2 % SWE-bench.",
    weakness: "Pas encore stable enough pour daily driver selon reviews.",
  },
  {
    name: "Replit",
    url: "https://replit.com",
    category: "cli",
    paradigm: "Cloud + Agent 3",
    pricing: "Core 25 $/mois",
    forWho: "Prototypeurs, indie hackers, hackathons, mobile-first",
    strength: "Agent 3 autonome jusqu'à 200 min, self-healing code, mobile build natif via Expo.",
    weakness: "Hosting lock-in Replit, editor moins puissant que Cursor.",
  },
];

/* ───────────── Section 4 — Decision tree ───────────── */

export type DecisionNode =
  | {
      type: "question";
      id: string;
      prompt: string;
      options: { label: string; nextId: string }[];
    }
  | {
      type: "result";
      id: string;
      title: string;
      tools: string[];
      reasoning: string;
    };

export const decisionTree: DecisionNode[] = [
  {
    type: "question",
    id: "q1",
    prompt: "Niveau code ?",
    options: [
      { label: "Non-tech / très peu de code", nextId: "q2" },
      { label: "Dév confirmé", nextId: "q3" },
    ],
  },
  {
    type: "question",
    id: "q2",
    prompt: "Quel besoin ?",
    options: [
      { label: "MVP visible vite avec backend", nextId: "r-lovable" },
      { label: "Tout géré, j'y connais rien", nextId: "r-base44" },
      { label: "Juste de jolies UIs React", nextId: "r-v0" },
      { label: "Stripe natif inclus", nextId: "r-emergent" },
    ],
  },
  {
    type: "question",
    id: "q3",
    prompt: "IDE familier ou agent autonome ?",
    options: [
      { label: "IDE familier (VS Code feel)", nextId: "r-cursor" },
      { label: "Agent autonome dans le terminal", nextId: "r-claudecode" },
      { label: "Agent autonome dans IDE Google", nextId: "r-antigravity" },
      { label: "Cloud full-stack avec mobile", nextId: "r-replit" },
    ],
  },
  {
    type: "result",
    id: "r-lovable",
    title: "Lovable",
    tools: ["Lovable"],
    reasoning:
      "MVP non-tech avec Supabase natif. Le plus accessible pour transformer une idée en app fonctionnelle vite.",
  },
  {
    type: "result",
    id: "r-base44",
    title: "Base44",
    tools: ["Base44"],
    reasoning: "Vraiment tout-en-un. App perso/interne sans rien savoir. C'est le 80 M$ rachat de Wix.",
  },
  {
    type: "result",
    id: "r-v0",
    title: "v0 by Vercel",
    tools: ["v0 by Vercel"],
    reasoning: "Sorties shadcn/ui + Tailwind nickel. Déploiement edge instant. Stack standard 2026.",
  },
  {
    type: "result",
    id: "r-emergent",
    title: "Emergent.sh",
    tools: ["Emergent.sh"],
    reasoning: "Stripe inclus en natif (rare). Idéal pour valider une idée monétisable rapidement.",
  },
  {
    type: "result",
    id: "r-cursor",
    title: "Cursor",
    tools: ["Cursor"],
    reasoning: "Daily driver de la majorité des dévs pros. Familier, rapide, Design Mode.",
  },
  {
    type: "result",
    id: "r-claudecode",
    title: "Claude Code",
    tools: ["Claude Code"],
    reasoning: "L'archi la plus propre, contexte 1M, écosystème MCP/skills. C'est ce qu'on utilise chez Aurentia.",
  },
  {
    type: "result",
    id: "r-antigravity",
    title: "Antigravity",
    tools: ["Antigravity"],
    reasoning: "Multi-agent parallel natif, Artifacts vérifiables. À surveiller pour 2026.",
  },
  {
    type: "result",
    id: "r-replit",
    title: "Replit",
    tools: ["Replit"],
    reasoning: "Cloud full + Agent 3 jusqu'à 200 min + mobile via Expo + QR. Indie hacker / hackathon / mobile.",
  },
];

/* ───────────── Section 5 — Méthode ───────────── */

export type MethodStep = {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
};

export const methodSteps: MethodStep[] = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Skill brainstorming — clarifier l'intention",
    description: "5 questions à se poser AVANT d'ouvrir un outil.",
    details: [
      "C'est quoi exactement le résultat que je veux obtenir ?",
      "Pour qui c'est ? (utilisateur cible, contexte d'usage)",
      "Quelles sont les 3 features prioritaires ? (pas 10 — 3)",
      "Stack imposée ou pas ?",
      "C'est un proto jetable ou un truc à maintenir ?",
    ],
  },
  {
    number: "02",
    icon: Compass,
    title: "Choix de la plateforme",
    description: "Une fois choisi, on s'y tient. Pas de zapping qui multiplie les surfaces de bug.",
    details: [
      "Non-tech total → Lovable ou Base44",
      "Semi-tech (sait lire du code) → v0 + Lovable, ou attaque direct Cursor",
      "Dév junior → Cursor en daily, Claude Code en learning",
      "Dév senior / startup CTO → Claude Code en hero + Cursor en quotidien",
      "Indie hacker solo → Cursor + Claude Code + Lovable pour prototype rapide",
    ],
  },
  {
    number: "03",
    icon: ScrollText,
    title: "Premier prompt = un PRD d'une page",
    description: "Avant le premier prompt, écrire un Product Requirements Document court et structuré.",
    details: [
      "Un PRD limite les hypothèses inventées par l'IA.",
      "Structure : objectif, users cibles, features P0/P1/P2, stack imposée, non-négos, edge cases, acceptance criteria.",
      "Impact mesuré : 5× moins d'itérations, disparition quasi totale du doom loop.",
    ],
  },
  {
    number: "04",
    icon: Workflow,
    title: "Iteration loop avec feedback tool",
    description:
      "Quand l'IA peut vérifier son propre travail, elle itère seule jusqu'au presque-parfait.",
    details: [
      "Backend / logique → unit tests (vitest, jest)",
      "Frontend Web → Puppeteer ou Playwright (screenshots)",
      "Mobile iOS → Simulator iOS screenshots",
      "API → integration tests / curl",
      "Cas killer : drag-drop d'un mock UI → « build avec shadcn + Tailwind, vérifie via Puppeteer screenshot ». Pixel-perfect en 2-3 itérations.",
    ],
  },
  {
    number: "05",
    icon: Shield,
    title: "Review & règle Willison",
    description: "Pour passer du prototype au code prod, une seule règle universelle.",
    details: [
      "« Si on ne peut pas expliquer exactement ce que ce code fait à quelqu'un d'autre, ne pas le commit. » — Simon Willison",
      "Test pratique avant chaque commit : expliquer mentalement à un collègue.",
      "Si on hésite → c'est du vibe coding, pas du vibe engineering. Relire, comprendre, ou jeter.",
    ],
  },
];

/* ───────────── Section 6 — Prompts copiables ───────────── */

export type CopyableSnippet = {
  id: string;
  title: string;
  description?: string;
  language: "markdown" | "bash" | "text";
  content: string;
};

export const prdTemplate: CopyableSnippet = {
  id: "prd",
  title: "Template PRD minimal",
  description: "À coller en frontmatter de prompt ou dans un .md à la racine du repo.",
  language: "markdown",
  content: `# PRD — Nom du projet

## Objectif (1 phrase)
[Ce que l'app doit accomplir, du point de vue user]

## Users cibles
- Profil : [qui]
- Contexte : [quand, où, pourquoi]

## Features prioritaires
P0 (must have) : [3 max]
P1 (nice to have) : [optionnel]
P2 (plus tard) : [optionnel]

## Stack imposée
- Framework : Next.js 14 App Router
- Langage : TypeScript strict
- UI : Tailwind + shadcn/ui
- Auth/DB : Supabase avec RLS
- Déploiement : Vercel

## Non-négos
- Mobile-first
- Dark mode
- WCAG AA accessibility
- Pas de \`any\` TypeScript
- Loading states partout

## Edge cases connus
- User non connecté → redirect /login
- Empty states sur chaque liste
- Erreurs réseau → toast + retry

## Acceptance criteria
- [ ] L'app run sans erreur console
- [ ] Type check passe
- [ ] Lighthouse > 90 mobile
- [ ] Tous les CTAs marchent
`,
};

export const magicPrompt: CopyableSnippet = {
  id: "magic-prompt",
  title: "Le prompt magique (à ajouter à chaque demande majeure)",
  description: "La phrase la plus rentable de Claude Code — et de tous les LLMs.",
  language: "text",
  content: `Before you write code, make a plan and run it by me.
Identify the unclear zones, propose 3 clarification questions if needed.
Wait for my validation before starting to code.`,
};

export const brainstormSkill: CopyableSnippet = {
  id: "brainstorm-skill",
  title: "Skill — Vibe coding co-pilote (custom instruction)",
  description:
    "À coller comme system prompt / custom instruction dans Claude, ChatGPT ou Cursor. Brainstorme l'idée, va lire les docs officielles de la plateforme cible (via Exa MCP si dispo, sinon web search), et génère un PRD calibré à coller direct.",
  language: "markdown",
  content: `# Vibe coding co-pilote

Tu es mon co-pilote de vibe coding. Ton job : transformer une idée brouillon en un PRD prêt à coller sur la plateforme de vibe coding que je vais te dire. Tu ne codes JAMAIS — tu produis un PRD.

## Workflow strict (ne saute aucune étape)

### 1. Brainstorm — clarifie l'intention
Pose-moi des questions courtes, une par une si tu sens que je suis flou, sinon en bloc, regroupées en 2 axes :

**Produit**
- Quel est le résultat exact que je veux ? (en une phrase, du point de vue user)
- Pour qui ? (profil, contexte d'usage, fréquence)
- Quelles sont les 3 features prioritaires ? (P0 strict, pas plus)
- Stack imposée ? (sinon tu proposes celle de la plateforme)
- Proto jetable, MVP qui peut grandir, ou code prod à maintenir 12+ mois ?
- Quels edge cases comptent vraiment ? (auth, paiement, data sensible, perf)

**Design**
- Vibe / mood général ? (minimal, premium, playful, brutalist, calm, bold, retro, glassmorphism…)
- Références visuelles ? (concurrents qui te plaisent, screenshots Dribbble/Mobbin, sites précis à imiter)
- Palette de couleurs ? (primaire / accent / fond, hex précis ou direction émotionnelle)
- Mode clair, sombre, ou les deux ?
- Typographie ? (sans-serif moderne, serif éditorial, mono…)
- Densité ? (aéré / compact, beaucoup de whitespace ou dense)
- Charge animation / motion ? (statique / micro-interactions / animations généreuses)
- Layout cible ? (mobile-first only, desktop-first, ou les deux)
- Identité de marque existante ? (logo, charte, design system déjà fixé)

Reformule ce que tu as compris en 6-8 bullets (3 produit + 3 design) et demande-moi confirmation avant de continuer.

### 2. Choix de la plateforme cible
Demande-moi sur quelle plateforme je vais coller le PRD. Réponses attendues :
\`Lovable\` · \`Bolt\` · \`v0\` · \`Stitch\` · \`Cursor\` · \`Claude Code\` · \`Replit\` · \`Base44\`

### 3. Recherche docs officielles (obligatoire, pas optionnel)
Avant d'écrire le PRD, va lire la doc de prompting de la plateforme cible.
- **Si tu as accès au MCP Exa** → utilise \`exa_search\` puis \`exa_get_contents\` sur les URLs ci-dessous.
- **Sinon** → utilise ton outil de web search natif (web_search / browse / read_url).

URLs de référence par plateforme :
- **Lovable** → https://docs.lovable.dev/prompting/prompting-one + https://docs.lovable.dev/tips-tricks/best-practice
- **Bolt** → https://support.bolt.new/best-practices/prompting-effectively + https://bolt.new/blog/prompting-tips-for-bolt
- **v0** → https://v0.app/docs/text-prompting + https://vercel.com/blog/how-to-prompt-v0
- **Stitch** → https://stitch.withgoogle.com/docs/learn/prompting
- **Cursor** → https://docs.cursor.com/context/rules + https://docs.cursor.com/get-started/concepts
- **Claude Code** → https://docs.claude.com/en/docs/claude-code/overview + https://docs.claude.com/en/docs/claude-code/memory
- **Replit** → https://docs.replit.com/replitai/agent
- **Base44** → https://docs.base44.com

Si une URL est cassée, cherche \`<plateforme> prompting best practices 2026\` et lis les 2-3 sources les plus officielles.

À la fin de cette étape, liste-moi en 1 bloc :
- Les 3-5 conventions clés de cette plateforme (ex : Lovable = vibe + une seule feature atomique ; v0 = product surface + context + states ; Bolt = blocs What/Who/Flows/Data/Pages/Auth ; Stitch = purpose + audience + vibe émotionnelle).
- Les pièges à éviter documentés.
- Les sources que tu as lues (URLs + dates si tu les vois).

### 4. Production du PRD calibré

Une fois que tu as : (a) la confirmation du brief par l'user, (b) la plateforme cible, (c) la doc plateforme lue → produis le PRD.

Sors **un seul bloc markdown** prêt à coller sur la plateforme. Adapte la structure et le vocabulaire à la plateforme cible (vibe Lovable, blocs What/Who/Flows/Data/Pages/Auth pour Bolt, Product Surface + Context + Constraints pour v0, purpose+audience+vibe Stitch, rules Cursor, CLAUDE.md Claude Code), MAIS le contenu doit toujours couvrir les sections suivantes — n'en saute aucune, surtout pas la section Design.

#### Template PRD à suivre (à adapter à la plateforme cible)

\`\`\`markdown
# PRD — [Nom du projet]

## Objectif (1 phrase)
[Ce que l'app doit accomplir, du point de vue user]

## Users cibles
- Profil : [qui]
- Contexte : [quand, où, pourquoi]
- Fréquence d'usage : [quotidien / hebdo / one-shot]

## Features prioritaires
P0 (must have) : [3 max]
P1 (nice to have) : [optionnel]
P2 (plus tard) : [optionnel]

## Stack
- Framework : [Next.js 14 App Router / autre]
- Langage : [TypeScript strict / autre]
- UI : [Tailwind + shadcn/ui / autre]
- Auth/DB : [Supabase avec RLS / autre]
- Déploiement : [Vercel / autre]

## Design
- **Vibe / mood** : [2-3 mots-clés — ex : « minimal premium », « playful bold », « calm editorial »]
- **Références visuelles** : [concurrents / sites cités par l'user — Linear, Stripe, Notion, Vercel…]
- **Palette** :
  - Primaire : [hex ou direction émotionnelle]
  - Accent : [hex ou direction]
  - Fond : [light / dark / les deux]
- **Typographie** : [famille + hiérarchie — ex : « Geist sans, hierarchy bold-3xl-headings + sm-body »]
- **Densité & spacing** : [aéré / compact, padding gutter typique]
- **Motion** : [statique / micro-interactions 500ms / animations généreuses]
- **Layout & responsive** : [mobile-first ou desktop-first, breakpoints critiques]
- **États visuels** : loading (skeleton), empty, error, populated — à coder pour TOUTES les vues data

## Non-négos
- Mobile-first
- Dark mode [si applicable]
- WCAG AA accessibility (contraste 4.5:1, semantic HTML, focus visible)
- Pas de \`any\` TypeScript
- text-sm minimum partout, jamais plus petit
- Transitions ≥ 500ms ease-in-out, jamais d'instantané
- Tokens sémantiques (foreground/background/accent), pas de couleurs hardcodées
- Loading states partout, pas de lorem ipsum

## Edge cases connus
- [User non connecté → redirect /login]
- [Empty states sur chaque liste]
- [Erreurs réseau → toast + retry]
- [Autres edge cases identifiés au brainstorm]

## Acceptance criteria
- [ ] L'app run sans erreur console
- [ ] Type check passe
- [ ] Lighthouse > 90 mobile
- [ ] Tous les CTAs marchent
- [ ] Mobile testé à 375px / 768px / 1280px
- [ ] Light + dark mode parfaits

---

Avant d'écrire du code, fais-moi un plan en bullets et attends ma validation.
\`\`\`

Si la plateforme préfère l'anglais (Lovable, Bolt, v0, Stitch), traduis le PRD en anglais en gardant la même structure, et finis par \`Before writing code, give me a plan in bullets and wait for my validation.\`

### 5. Itération
Une fois le PRD livré, propose-moi 3 axes d'itération possibles (ajout d'une feature P1, refinement visuel, ajout d'edge case). N'itère que si je te dis go.

## Règles
- Tu ne codes pas. Tu produis un PRD prêt à être collé.
- Tu ne sautes pas la recherche docs même si tu penses connaître la plateforme — les conventions changent vite.
- Si l'user ne fournit pas assez d'info pour le brainstorm, repose des questions au lieu d'inventer.
- Cite tes sources à la fin (URLs).
- Reste direct, cash, pas de blabla IA.`,
};

/* ───────────── Section 7 — Tips pros ───────────── */

export type Tip = {
  number: string;
  icon: LucideIcon;
  title: string;
  body: string;
  extra?:
    | { kind: "table"; headers: string[]; rows: string[][] }
    | { kind: "list"; items: { key: string; value: string }[] }
    | { kind: "code"; snippet: CopyableSnippet };
};

export const claudeMdHierarchy = {
  headers: ["Niveau", "Fichier", "Quand chargé", "Pour quoi"],
  rows: [
    ["Enterprise", "Policy file admin", "Toutes sessions, tous employés", "Politiques boîte (allowed tools, MCP)"],
    ["Project", "CLAUDE.md racine (checked in)", "Au start de chaque session", "Conventions équipe, bash, MCPs"],
    ["Local", "CLAUDE.local.md (gitignored)", "Au start de session", "Préférences perso"],
    ["Nested", "CLAUDE.md sous-dossier", "Auto chargé en contexte", "Spécifique à un module"],
  ],
};

export const keyBindings: { key: string; action: string }[] = [
  { key: "shift + tab", action: "Toggle auto-accept edits mode" },
  { key: "#", action: "Add to memory (CLAUDE.md) à la volée" },
  { key: "!", action: "Bash mode — output partagé avec Claude" },
  { key: "@", action: "Mention file/folder (ex: @app/Header.tsx)" },
  { key: "escape", action: "Stop ce que Claude fait, sans corruption" },
  { key: "escape × 2", action: "Jump back dans l'historique" },
  { key: "Ctrl + R", action: "Voir l'output complet (debug context window)" },
  { key: "--resume / --continue", action: "Reprendre une session précédente" },
];

export const standupHack: CopyableSnippet = {
  id: "standup-hack",
  title: "Daily standup hack (snippet Boris Cherny)",
  language: "text",
  content: `Look at the git log for the past week. My username is X.
Summarize what I shipped, organized by repo or theme.`,
};

export const sdkSnippet: CopyableSnippet = {
  id: "sdk-unix",
  title: "SDK comme Unix utility",
  language: "bash",
  content: `# Mode SDK avec -p
claude -p "votre prompt" \\
  --allowed-tools "Read,Bash(git:*)" \\
  --output-format json

# Pipes Unix
cat huge-log.txt | claude -p "what's interesting in this log?"
git log v1.2..v1.3 | claude -p "write user-facing release notes"

# GitHub Action audit PR
claude -p "review this diff for security issues"`,
};

export const parallelAgentsSnippet: CopyableSnippet = {
  id: "parallel-agents",
  title: "Parallel agents (git worktrees + tmux)",
  language: "bash",
  content: `# Worktree par feature
git worktree add ../feat-x feat-x-branch

# Une session tmux par worktree
tmux new-session -s claude-feat-x 'cd ../feat-x && claude'
tmux new-session -s claude-feat-y 'cd ../feat-y && claude'

# Naviguer entre les sessions : Ctrl+B + s`,
};

export const tips: Tip[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Commencer par poser des questions au repo",
    body: "Ne pas éditer du code en premier. Poser des questions au codebase. C'est ce qui apprend à prompter, à jauger les limites de l'IA, à prendre confiance. Onboarding tech chez Anthropic : passé de 2-3 semaines à 2-3 jours.",
  },
  {
    number: "02",
    icon: Layers,
    title: "CLAUDE.md hierarchy — la mémoire de Claude",
    body: "Claude Code lit plusieurs fichiers de mémoire en hiérarchie. Règle de Boris Cherny : « Try to keep it pretty short. If it gets too long, it just uses up context. »",
    extra: { kind: "table", headers: claudeMdHierarchy.headers, rows: claudeMdHierarchy.rows },
  },
  {
    number: "03",
    icon: Brain,
    title: "Brainstorm before code",
    body: "Pas besoin de plan mode ni d'outil spécial. Juste écrire « Before you write code, make a plan and run it by me. » Le modèle comprend, propose, attend l'OK, ensuite exécute.",
  },
  {
    number: "04",
    icon: Workflow,
    title: "Iteration loop avec feedback tool",
    body: "Donner à Claude un moyen de vérifier son travail = il itère seul. « If you give it some way to check its work, it will iterate by itself, and you're going to get a much better result. » — Boris Cherny",
  },
  {
    number: "05",
    icon: Terminal,
    title: "Key bindings essentiels",
    body: "Le terminal est minimaliste, les raccourcis sont peu découvrables. Les 8 à connaître par cœur :",
    extra: {
      kind: "list",
      items: keyBindings.map((kb) => ({ key: kb.key, value: kb.action })),
    },
  },
  {
    number: "06",
    icon: Wand2,
    title: "Multimodal natif (drag-drop image)",
    body: "Claude Code est multimodal depuis le départ. Drag-drop, copy-paste, ou file path. Cas killer : drag-drop d'un mock Figma → « implémente avec shadcn + Tailwind, vérifie via Puppeteer screenshot ».",
  },
  {
    number: "07",
    icon: GitBranch,
    title: "Daily standup hack",
    body: "Hack productivité de Boris lui-même. Sortie = base directe pour le standup, le report mensuel, la retro, le post LinkedIn weekly. Économise 10 min/semaine.",
    extra: { kind: "code", snippet: standupHack },
  },
  {
    number: "08",
    icon: Settings2,
    title: "SDK comme Unix utility",
    body: "Au-delà du REPL interactif, Claude Code expose un mode SDK CLI via -p. Utilisable comme une utility Unix dans n'importe quel pipe. Cas internes Anthropic : CI, incident response, GCP logs, Sentry triage.",
    extra: { kind: "code", snippet: sdkSnippet },
  },
  {
    number: "09",
    icon: Network,
    title: "Parallel agents avec git worktrees + tmux",
    body: "Pattern power user observé chez les top utilisateurs. On ship 3 PRs en parallèle au lieu de 3 séquentielles.",
    extra: { kind: "code", snippet: parallelAgentsSnippet },
  },
];

/* ───────────── Section 8 — Stack perso ───────────── */

export type StackCategory = {
  icon: LucideIcon;
  title: string;
  items: { name: string; url?: string; note?: string }[];
};

export const stackCategories: StackCategory[] = [
  {
    icon: Palette,
    title: "Design",
    items: [
      { name: "Dribbble", url: "https://dribbble.com" },
      { name: "Canva", url: "https://canva.com" },
      { name: "Google Stitch", url: "https://stitch.withgoogle.com" },
      { name: "Claude (design)", url: "https://claude.ai" },
      { name: "tweakcn", url: "https://tweakcn.com" },
    ],
  },
  {
    icon: Code2,
    title: "Code",
    items: [{ name: "Claude Code", url: "https://claude.com/claude-code" }],
  },
  {
    icon: Server,
    title: "Backend & automation",
    items: [
      { name: "Supabase", url: "https://supabase.com" },
      { name: "n8n", url: "https://n8n.io" },
    ],
  },
  {
    icon: Rocket,
    title: "Déploiement",
    items: [
      { name: "GitHub", url: "https://github.com" },
      { name: "Vercel", url: "https://vercel.com" },
    ],
  },
];

/* ───────────── Section 9 — Risques ───────────── */

export const securityStats: { value: string; label: string }[] = [
  { value: "40-62 %", label: "du code IA-généré contient des failles de sécurité" },
  { value: "86 %", label: "taux d'échec de l'IA à sécuriser contre XSS" },
  { value: "2,74 ×", label: "plus de vulnérabilités vs code humain (étude METR)" },
  { value: "3 ×", label: "plus rapide : vitesse d'accumulation de tech debt" },
  { value: "+63 %", label: "de temps passé à débugger les bugs IA vs bugs humains" },
];

export const redListZones: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Lock,
    title: "Auth & autorisation",
    description: "JWT, OAuth, RLS Supabase. Une faille = data breach.",
  },
  {
    icon: Shield,
    title: "Encryption & secrets",
    description: "Clés API, tokens, hashing passwords.",
  },
  {
    icon: CreditCard,
    title: "Paiement",
    description: "Intégrations Stripe, gestion montants, webhooks.",
  },
  {
    icon: Users,
    title: "Données utilisateurs sensibles",
    description: "PII, RGPD, emails, adresses, données médicales.",
  },
  {
    icon: Trash2,
    title: "Opérations destructives",
    description: "DELETE en DB, suppressions fichiers.",
  },
  {
    icon: Database,
    title: "Migrations de schéma DB en prod",
    description: "Colonne ajoutée mal, RLS pétée.",
  },
  {
    icon: Gauge,
    title: "Code de scaling / perf critique",
    description: "Caching, rate limiting, queues.",
  },
  {
    icon: Globe,
    title: "Webhooks vers tiers",
    description: "Un bug = spam tiers, blocage par leur côté.",
  },
  {
    icon: Bot,
    title: "CI/CD & infra-as-code",
    description: "Terraform, GitHub Actions, configs Vercel.",
  },
  {
    icon: FileWarning,
    title: "Code legal-bound",
    description: "CGV, mentions légales, paywall.",
  },
];

export const willisonRule = {
  vo: "I won't commit any code to my repository if I couldn't explain exactly what it does to somebody else.",
  fr: "Je ne commit aucun code dans mon repo si je ne peux pas expliquer exactement ce qu'il fait à quelqu'un d'autre.",
  source: "Simon Willison",
};

/* ───────────── CTA final ───────────── */

export const finalCtas: { icon: LucideIcon; title: string; description: string; cta: { label: string; href: string }; external?: boolean }[] = [
  {
    icon: Hammer,
    title: "Besoin d'un accompagnement ?",
    description: "Aurentia Agency : repositionnement IA, vibe coding appliqué aux projets clients, formation des équipes.",
    cta: { label: "Demander un accompagnement", href: "/contact" },
  },
  {
    icon: Target,
    title: "Trouver les bons outils IA",
    description: "Comparateur IA Facile : nous benchmarkons les outils IA cas d'usage par cas d'usage.",
    cta: { label: "Voir le comparateur", href: "https://comparateur-ia-facile.com" },
    external: true,
  },
  {
    icon: Briefcase,
    title: "Maîtriser le vibe coding",
    description: "Formation IA Aurentia : 4 semaines, coaching 1-1, accès communauté.",
    cta: { label: "Voir nos formations", href: "/solutions-ia/formation-ia" },
  },
];
