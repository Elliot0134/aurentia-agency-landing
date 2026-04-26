// src/data/v2/implementer-claude.ts
//
// Toute la matière de la page /ressources/implementer-claude.
// Source : CONCEPT - Claude (vault ENTREPRENEUR) — avril 2026.

import {
  AlertTriangle,
  Bot,
  Brain,
  Briefcase,
  Code2,
  Database,
  FileCode2,
  FileText,
  Github,
  Lock,
  MessageSquare,
  MonitorSmartphone,
  Network,
  Palette,
  Plug,
  Rocket,
  ScrollText,
  Server,
  ShieldAlert,
  Sparkles,
  Target,
  Terminal,
  Users,
  Wand2,
  Zap,
  type LucideIcon,
} from "lucide-react";

/* ───────────── Hero ───────────── */

export const implementerClaudeHero = {
  eyebrow: "Ressources",
  headline: "Le kit pour implémenter Claude\ndans ton business",
  subHeadline:
    "Les prompts, skills, configs et templates qu'on déploie chez nos clients. Copie, colle, ton setup est branché en un week-end.",
  cta: {
    primary: { label: "Demander un accompagnement", href: "/contact" },
    secondary: { label: "Voir nos formations IA", href: "/solutions-ia/formation-ia" },
  },
};

/* ───────────── Table of contents ───────────── */

export type TocEntry = { id: string; label: string };

export const implementerClaudeToc: TocEntry[] = [
  { id: "choisir-plan", label: "Choisis ton plan en 2 min" },
  { id: "produits", label: "Les 6 produits Claude (et lequel ouvrir maintenant)" },
  { id: "claude-md", label: "Ton premier CLAUDE.md" },
  { id: "memory", label: "Activer Memory comme un pro" },
  { id: "mcp", label: "Les 10 MCP à brancher" },
  { id: "context7", label: "Context7 — la doc à jour des libs" },
  { id: "skills", label: "5 Skills business prêts à copier" },
  { id: "skill-creator", label: "Crée tes propres Skills (méta)" },
  { id: "prompts", label: "15 prompts business prêts" },
  { id: "14-jours", label: "La séquence 14 jours" },
  { id: "risques", label: "Les 6 erreurs à ne JAMAIS faire" },
];

/* ───────────── 1. Choisir son plan ───────────── */

export type PlanQuizOption = {
  value: "free" | "pro" | "max100" | "max200" | "team" | "enterprise";
  label: string;
};

export const planQuiz: {
  q1: { question: string; options: PlanQuizOption[] };
  q2: { question: string; options: PlanQuizOption[] };
  q3: { question: string; options: PlanQuizOption[] };
} = {
  q1: {
    question: "Tu es seul ou en équipe ?",
    options: [
      { value: "pro", label: "Solo" },
      { value: "team", label: "Équipe (3+ personnes)" },
      { value: "enterprise", label: "Boîte 50+ avec compliance/SSO" },
    ],
  },
  q2: {
    question: "Combien d'heures/jour tu passes sur Claude ?",
    options: [
      { value: "free", label: "< 1h — je teste" },
      { value: "pro", label: "1-4h — usage modéré" },
      { value: "max100", label: "4-6h — build mode" },
      { value: "max200", label: "8-10h — power user (Code + Cowork)" },
    ],
  },
  q3: {
    question: "Tu fais surtout du…",
    options: [
      { value: "pro", label: "Chat / écriture / analyse" },
      { value: "max100", label: "Code intensif (Claude Code daily)" },
      { value: "max200", label: "Code + agents desktop autonomes" },
    ],
  },
};

export type PlanCard = {
  name: string;
  price: string;
  period: string;
  forWho: string;
  highlights: string[];
  recommended?: boolean;
};

export const plans: PlanCard[] = [
  {
    name: "Free",
    price: "0 €",
    period: "/mois",
    forWho: "Tester, c'est tout",
    highlights: ["Sonnet limité", "Pas de Memory", "Pas de Projects"],
  },
  {
    name: "Pro",
    price: "20 $",
    period: "/mois",
    forWho: "Solo, usage modéré (chat, écriture, analyse)",
    highlights: ["1M context", "Projects + Memory", "Claude Code limité"],
  },
  {
    name: "Max 5×",
    price: "100 $",
    period: "/mois",
    forWho: "Solo en build mode 4-6h/jour",
    highlights: ["5× le quota Pro", "Claude Code intensif", "Sweet spot solo founder"],
    recommended: true,
  },
  {
    name: "Max 20×",
    price: "200 $",
    period: "/mois",
    forWho: "Power user 8-10h/jour (Code + Cowork)",
    highlights: ["20× le quota Pro", "Cowork agentic illimité", "Pour le 1% qui pousse fort"],
  },
  {
    name: "Team",
    price: "25-30 $",
    period: "/seat/mois",
    forWho: "Équipe 3-30 personnes",
    highlights: ["Projects partagés", "Admin + facture unique", "Memory team"],
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    period: "",
    forWho: "Boîtes 50+ avec compliance",
    highlights: ["SSO + audit log", "Data residency EU", "BAA HIPAA + DPA"],
  },
];

/* ───────────── 2. Produits Claude ───────────── */

export type ClaudeProduct = {
  icon: LucideIcon;
  name: string;
  tagline: string;
  forWho: string;
  installLabel: string;
  installHref: string;
  installCommand?: string;
};

export const claudeProducts: ClaudeProduct[] = [
  {
    icon: MessageSquare,
    name: "Claude.ai",
    tagline: "Le chat web/desktop. Projects, Artifacts, Memory native.",
    forWho: "Tout le monde — porte d'entrée par défaut.",
    installLabel: "Ouvrir claude.ai",
    installHref: "https://claude.ai",
  },
  {
    icon: Terminal,
    name: "Claude Code",
    tagline: "CLI agentique terminal/IDE. Skills, MCP, Hooks, Subagents, Plugins.",
    forWho: "Devs et power users ops.",
    installLabel: "Installer en CLI",
    installHref: "https://docs.anthropic.com/claude-code",
    installCommand: "npm install -g @anthropic-ai/claude-code",
  },
  {
    icon: Bot,
    name: "Claude Cowork",
    tagline: "Agent desktop autonome (filesystem + apps + browser). GA 9 avril 2026.",
    forWho: "Tout le monde, dès qu'on veut déléguer du run.",
    installLabel: "Télécharger Cowork",
    installHref: "https://claude.ai/download",
  },
  {
    icon: Palette,
    name: "Claude Design",
    tagline: "Prompt → wireframes / decks / illustrations. Research preview avril 2026.",
    forWho: "Founders / marketeurs / agences créa.",
    installLabel: "Tester Design",
    installHref: "https://claude.ai/design",
  },
  {
    icon: Code2,
    name: "Claude API + Agent SDK",
    tagline: "Embarquer Claude dans un SaaS, edge function, cron job.",
    forWho: "Devs SaaS / intégrateurs.",
    installLabel: "Console Anthropic",
    installHref: "https://console.anthropic.com",
    installCommand: "npm install @anthropic-ai/claude-agent-sdk",
  },
  {
    icon: MonitorSmartphone,
    name: "Computer Use",
    tagline: "La brique tech sous Cowork, exposée API pour build tes propres agents desktop.",
    forWho: "Devs avancés qui buildent leur propre agent.",
    installLabel: "Doc Computer Use",
    installHref: "https://docs.anthropic.com/claude/docs/computer-use",
  },
];

/* ───────────── 3. CLAUDE.md templates ───────────── */

export const claudeMdGeneratorPrompt = `Tu es expert Claude Code et tu dois générer un fichier CLAUDE.md optimal pour mon business.

Contexte :
- Site web : [URL]
- Activité : [DÉCRIS EN 2 PHRASES]
- Stack tech (si applicable) : [Next.js / Supabase / autre]
- Taille équipe : [SOLO / 3-10 / 10+]
- Cas d'usage Claude prioritaires : [SALES / OPS / DEV / MARKETING / …]

Va lire mon site, comprends l'activité, et génère un CLAUDE.md structuré avec :
1. Qui je suis / qui on est
2. Ton et style de communication attendus
3. Stack et conventions techniques
4. Skills à charger systématiquement
5. Règles non-négociables (sécurité, qualité, process)
6. Paths critiques

Format markdown, prose dense, pas de blabla. Direct.`;

export const claudeMdSoloFounder = `# CLAUDE.md — [Ton prénom]

## Qui je suis
[Prénom], [âge], [ville]. [Activité principale en 1 phrase].
Profil : [3 mots clés — ex: stratégie + dev + design].

## Mon business
- **[Nom business]** — [pitch 1 phrase]
- Stade : [pré-revenu / MRR XK / ARR XK]
- Stack : [outils principaux]

## Comment tu me parles
- Direct, cash, zéro bullshit, zéro disclaimer IA
- Français par défaut, anglais pour le code
- Prose > listes en conversationnel
- Avocat du diable sur mes idées
- Quand tu poses une question, recommande UNE réponse avec justif courte
- Next step actionnable si pertinent

## Stack tech (si applicable)
- [Next.js 14+ / TypeScript strict]
- [Tailwind + shadcn/ui]
- [Supabase + Stripe]

## Règles non négociables
1. TypeScript strict, pas de \`any\`
2. RLS obligatoire sur toute table Supabase
3. Mobile-first, accessibilité WCAG AA
4. Plan avant changements majeurs
5. Tests sur les flows critiques (auth, paiement)

## Paths critiques
- Code : [/path/to/code]
- Docs : [/path/to/docs]
`;

export const claudeMdAgence = `# CLAUDE.md — Agence [Nom]

## L'agence
[Nom], [N personnes], spécialisée [vertical]. On livre [type de missions] pour des clients [profil].

## Comment tu nous parles
- Pro mais direct, pas de jargon corporate
- Français
- Recommande, ne propose pas 5 options
- Documente toujours le "pourquoi" derrière une décision

## Stack standard
- Next.js 14+ App Router, TypeScript strict
- Tailwind + shadcn/ui
- Supabase ou Postgres direct selon mission
- Vercel pour déploiement front
- n8n pour workflows automation

## Conventions code
- Conventional commits (feat:, fix:, chore:)
- Branches : feature/[ticket-id]-[slug]
- PR obligatoire, review humaine sur tout ce qui touche prod
- Pas de \`any\`, pas de \`@ts-ignore\` sans commentaire justifiant

## Skills à charger
- esst-stack, responsive-best-practices, accessibility
- supabase-best-practices si DB
- stripe-billing si billing client
- seo-checklist sur landing/site marketing

## Process delivery client
1. Discovery : prompt utilisateur clarifié + audit existant
2. Plan validé client AVANT exec
3. Sprints courts (1 semaine) avec démo fin de sprint
4. Handoff : doc technique + doc usage + 2 sessions formation

## Règles non négociables
1. Pas de code en prod sans review humaine
2. Tous les secrets via variables d'env, jamais committés
3. Backup + monitoring obligatoires sur tout SaaS livré
4. Le client doit pouvoir reprendre le code seul (zéro lock-in)
`;

export const claudeMdPme = `# CLAUDE.md — [Nom entreprise]

## L'entreprise
[Nom], [N personnes], [secteur]. On fait [activité].

## Comment tu nous parles
- Français, ton pro mais humain
- Direct, pas de remplissage
- Si tu hésites entre deux approches, recommande celle qui scale et explique pourquoi

## Notre stack ops
- CRM : [HubSpot / Pipedrive / Salesforce]
- Comm interne : [Slack / Teams]
- Doc/Knowledge : [Notion / Confluence]
- Email : [Gmail / Outlook]
- Compta : [Pennylane / autre]

## Sources de vérité
- Process et SOP : [lien Notion]
- Contrats et legal : [lien drive]
- Reporting : [lien dashboard]

## MCP branchés
- Notion (knowledge base)
- Slack (canaux #general #produit #commercial)
- Stripe (revenue)
- Linear (delivery)

## Skills disponibles
- daily-standup, recap-réunion, audit-site, propale-commerciale, email-client

## Règles non négociables
1. JAMAIS coller de data client sensible (PII, données financières) dans le chat free
2. Pour data sensible : passer par l'API Anthropic en zero-retention
3. Auditer les Routines mensuellement (budget alert obligatoire)
4. Memory dashboard reviewé tous les vendredis
5. Toute décision stratégique documentée en ADR (Architecture Decision Record)
`;

/* ───────────── 4. Memory ───────────── */

export const memorySetupSteps: { step: string; title: string; description: string }[] = [
  {
    step: "01",
    title: "Active Memory dans Settings",
    description:
      "Claude.ai → Settings → Memory → Enable. Le dashboard transparent te montre TOUT ce que Claude retient de toi.",
  },
  {
    step: "02",
    title: "Importe ton historique ChatGPT/Gemini",
    description:
      "Settings → Import history → upload le ZIP export. Claude lit les conversations et construit ta Memory en 10 min.",
  },
  {
    step: "03",
    title: "Lance le prompt fiche profil",
    description:
      "Premier prompt à donner pour calibrer Memory : copie le bloc ci-dessous, Claude pose 8-10 questions, ta fiche profil est sauvegardée.",
  },
  {
    step: "04",
    title: "Audit mensuel du dashboard",
    description:
      "Tous les premiers du mois : Memory dashboard → vire ce qui est obsolète, garde ce qui est encore vrai. 2 minutes, énorme impact.",
  },
];

export const memoryProfilePrompt = `Construis ma fiche profil business pour Memory.

Pose-moi les questions une par une (max 10) pour capturer :
1. Qui je suis (prénom, rôle, ville, parcours en 1 phrase)
2. Mes business actifs (nom, pitch 1 phrase, stade, MRR/ARR)
3. Mon associé(s) le cas échéant
4. Ma stack tech principale
5. Mon ambition 5 ans
6. Comment je veux qu'on me parle (ton, langue, format)
7. Mes 3 priorités du moment
8. Mes red flags (ce que je veux JAMAIS qu'un assistant fasse)

Quand tu as toutes les réponses, sauvegarde le résultat en Memory comme "Profil business" et confirme-moi ce qui est stocké.`;

/* ───────────── 5. MCP servers ───────────── */

export type McpServer = {
  icon: LucideIcon;
  name: string;
  unlocks: string;
  command: string;
};

export const mcpServers: McpServer[] = [
  {
    icon: Database,
    name: "Supabase",
    unlocks: "Schéma DB + génération de types TS + requêtes en langage naturel.",
    command: "claude mcp add supabase -- npx -y @supabase/mcp-server-supabase",
  },
  {
    icon: Github,
    name: "GitHub",
    unlocks: "Issues, PR, review, gestion repos directement depuis Claude.",
    command: "claude mcp add github -- npx -y @modelcontextprotocol/server-github",
  },
  {
    icon: Briefcase,
    name: "Stripe",
    unlocks: "Subscriptions, customers, invoices, refunds — sans quitter Claude.",
    command: "claude mcp add stripe -- npx -y @stripe/mcp",
  },
  {
    icon: ScrollText,
    name: "Notion",
    unlocks: "Lecture/écriture de pages, base knowledge interrogeable en langage naturel.",
    command: "claude mcp add notion -- npx -y @notionhq/notion-mcp-server",
  },
  {
    icon: Palette,
    name: "Figma",
    unlocks: "Design tokens, frames, handoff dev en un prompt.",
    command: "claude mcp add figma -- npx -y figma-developer-mcp",
  },
  {
    icon: Target,
    name: "Linear",
    unlocks: "Issues, sprints, status — Claude pilote ta delivery.",
    command: "claude mcp add linear -- npx -y mcp-linear",
  },
  {
    icon: MessageSquare,
    name: "Slack",
    unlocks: "Lecture canaux, recherche threads, post messages en sortie.",
    command: "claude mcp add slack -- npx -y @modelcontextprotocol/server-slack",
  },
  {
    icon: ShieldAlert,
    name: "Sentry",
    unlocks: "Erreurs prod en contexte, debug guidé par les logs.",
    command: "claude mcp add sentry -- npx -y @sentry/mcp-server",
  },
  {
    icon: Sparkles,
    name: "shadcn",
    unlocks: "Installer / chercher des composants shadcn et registries premium.",
    command: "claude mcp add shadcn -- npx -y shadcn@latest mcp",
  },
  {
    icon: FileText,
    name: "context7",
    unlocks: "Doc à jour des libs (Next.js, React, Tailwind…) — voir section dédiée.",
    command: "claude mcp add context7 -- npx -y @upstash/context7-mcp",
  },
];

/* ───────────── 6. Context7 ───────────── */

export const context7InstallCommand = `claude mcp add context7 -- npx -y @upstash/context7-mcp`;

export const context7UsagePrompt = `Use context7 to fetch the latest Next.js 15 App Router docs for [SUJET — ex: server actions, parallel routes, intercepting routes].

Then implement [CE QUE TU VEUX] en suivant exactement les patterns officiels actuels. Pas de pattern obsolète, pas d'API dépréciée.`;

/* ───────────── 7. Skills business ───────────── */

export type BusinessSkill = {
  icon: LucideIcon;
  name: string;
  tagline: string;
  filename: string;
  content: string;
};

export const businessSkills: BusinessSkill[] = [
  {
    icon: Zap,
    name: "daily-standup",
    tagline: "Le hack productivité de Boris Cherny lui-même.",
    filename: "daily-standup/SKILL.md",
    content: `---
name: daily-standup
description: Use when the user asks "what did I ship today/this week" or wants a daily standup recap. Generates a punchy summary from git log, calendar, and recent files modified.
---

# Daily standup

Quand l'utilisateur demande son standup ou ce qu'il a livré, exécute :

1. Lance \`git log --since="1 day ago" --oneline\` sur tous les repos actifs (lis ~/.claude/projects/ pour les paths)
2. Liste les fichiers modifiés aujourd'hui (\`find . -type f -mtime -1 -not -path "*/node_modules/*"\`)
3. Si MCP Linear branché : récupère les issues fermées ces 24h
4. Si MCP Slack branché : récupère les messages importants postés par l'utilisateur

Sortie attendue (max 200 mots) :
**Shippé aujourd'hui :** [3-5 bullets concrets]
**En cours :** [2-3 bullets]
**Bloqué sur :** [si applicable]
**Demain :** [1 next step actionnable]

Ton : direct, factuel, zéro fluff. Format markdown.`,
  },
  {
    icon: MessageSquare,
    name: "email-client",
    tagline: "Réponses email pro, ton calibré, en 30 secondes.",
    filename: "email-client/SKILL.md",
    content: `---
name: email-client
description: Use when drafting a professional email response to a client. Calibrates tone (warm but pro), structures the answer, ends with a clear next step.
---

# Email client

Quand l'utilisateur veut répondre à un email client :

1. Lis l'email source (collé ou via MCP Gmail)
2. Identifie : (a) la demande explicite, (b) la demande implicite, (c) le ton du client
3. Réponds en match du ton client (formel/informel) MAIS toujours :
   - Phrase d'accroche personnalisée (pas "Bonjour, j'espère que vous allez bien")
   - Réponse directe à la demande en 2-3 phrases max
   - Si action nécessaire : 1 next step CLAIR avec date
   - Signature pro (récupère depuis CLAUDE.md)

Règles non-négo :
- JAMAIS "n'hésitez pas à revenir vers moi"
- JAMAIS "dans l'attente de votre retour"
- JAMAIS plus de 120 mots sauf si techniquement requis
- TOUJOURS proposer un créneau précis si on parle de RDV (pas "quand vous voulez")`,
  },
  {
    icon: FileText,
    name: "audit-site",
    tagline: "Audit conversion / SEO / UX d'une URL en 5 min.",
    filename: "audit-site/SKILL.md",
    content: `---
name: audit-site
description: Use when the user asks for a website audit. Fetches the URL, analyzes conversion, SEO, UX, and outputs a prioritized action list.
---

# Audit site

Quand l'utilisateur donne une URL :

1. WebFetch sur la home + 2 pages clés (services + contact)
2. Évalue 5 axes (note /10 chacun) :
   - **Hero clarity** : promesse claire, public cible, CTA visible above the fold
   - **Conversion** : friction du parcours, force des CTA, social proof
   - **SEO technique** : title, meta, h1, structure, vitesse perçue
   - **Trust** : preuves sociales, mentions légales, transparence pricing
   - **Mobile** : si possible, simule un viewport mobile
3. Sortie :

\`\`\`
## Audit [URL]
**Score global : X/50**

### Top 3 quick wins (impact > effort)
1. [Action concrète + emplacement exact]
2. ...

### Top 3 chantiers de fond
1. ...

### Ce qui marche déjà bien
- ...
\`\`\`

Ton : direct, pas de "vous pourriez envisager", c'est "fais X".`,
  },
  {
    icon: ScrollText,
    name: "recap-reunion",
    tagline: "Notes de réunion → CR actionnable + tasks.",
    filename: "recap-reunion/SKILL.md",
    content: `---
name: recap-reunion
description: Use when the user pastes raw meeting notes or a transcript. Produces a structured CR with decisions, action items, and a follow-up email draft.
---

# Recap réunion

Quand l'utilisateur colle ses notes brutes :

1. Identifie automatiquement :
   - Participants
   - Décisions prises (DÉCISION en majuscules)
   - Action items (qui / quoi / quand)
   - Sujets ouverts non tranchés
   - Prochaine étape

2. Sortie format markdown :

\`\`\`
# CR — [Sujet] — [Date]

**Participants :** ...
**Durée :** ...

## Décisions
- [DÉCISION 1]
- ...

## Actions (qui / quoi / quand)
- [ ] @prénom — action — date
- ...

## Sujets ouverts
- ...

## Prochaine étape
[1 phrase claire]
\`\`\`

3. Bonus si demandé : génère le mail de récap à envoyer aux participants (max 150 mots, ton pro direct).`,
  },
  {
    icon: Briefcase,
    name: "propale-commerciale",
    tagline: "Discovery → propale structurée prête à envoyer.",
    filename: "propale-commerciale/SKILL.md",
    content: `---
name: propale-commerciale
description: Use when the user wants to draft a commercial proposal after a discovery call. Structures the proposal with context, scope, deliverables, timeline, pricing.
---

# Propale commerciale

Quand l'utilisateur veut générer une proposition après un RDV discovery :

1. Demande (si manquant) :
   - Nom du prospect + contact principal
   - Pain points exprimés (3 max, hiérarchisés)
   - Solution envisagée (1 phrase)
   - Budget évoqué ou range estimé
   - Deadline souhaitée

2. Génère la propale en 6 sections :

\`\`\`
# Proposition commerciale — [Client]
**Date :** [date] · **Validité :** 30 jours

## 1. Contexte (max 5 lignes)
[Reformulation des pain points en miroir]

## 2. Objectifs (3 max, mesurables)
- ...

## 3. Notre approche (3 phases)
- **Phase 1** — [découverte/audit] — [livrable] — [délai]
- **Phase 2** — [...]
- **Phase 3** — [...]

## 4. Livrables concrets
- [livrable 1] — [format] — [date cible]
- ...

## 5. Investissement
[Montant HT] € — [conditions paiement : 30/40/30 ou autre]
**Inclus :** [...]
**En option :** [...]

## 6. Prochaine étape
[Action précise + date]
\`\`\`

Ton : confiant, direct, zéro condescendance. Pas de "nous serions ravis de…". On parle business.`,
  },
];

/* ───────────── 8. Skill creator ───────────── */

export const skillCreatorMetaPrompt = `Tu es expert création de Skills Claude Code.

Je vais te décrire un process que je répète souvent. Ton job : extraire la structure et générer un fichier SKILL.md complet, prêt à drag-drop dans ~/.claude/skills/.

Pose-moi les questions suivantes UNE PAR UNE :

1. **Nom du process** (en kebab-case, ex: "audit-landing-page")
2. **Quand est-ce que tu le déclenches ?** (mots-clés / phrases qui doivent activer le skill)
3. **Quels sont les inputs nécessaires ?** (URL, fichier, texte collé, etc.)
4. **Décris-moi le process étape par étape** (5-8 étapes max, comme tu le ferais à un junior)
5. **Quel format de sortie attendu ?** (markdown, JSON, email, autre — donne un exemple)
6. **Y a-t-il des règles non-négociables ?** (ce que le skill doit JAMAIS faire)
7. **Quels MCP / outils externes utiliser ?** (WebFetch, Bash, Read, MCP Notion, etc.)

Quand tu as toutes les réponses, génère :

\`\`\`markdown
---
name: [nom]
description: Use when [trigger explicite, vraies phrases utilisateur]. [Ce que le skill produit en 1 phrase].
---

# [Titre humain]

[Contexte d'usage en 2 phrases]

## Process
1. [Étape 1 — verbe d'action]
2. ...

## Format de sortie
[Exemple structuré]

## Règles non-négociables
- ...
\`\`\`

Sauvegarde-le dans \`~/.claude/skills/[nom]/SKILL.md\` et donne-moi la commande \`mkdir -p\` + \`cat > EOF\` exacte pour l'installer.`;

/* ───────────── 9. Prompts business ───────────── */

export type BusinessPrompt = {
  category: "Sales" | "Ops" | "Marketing" | "Finance" | "RH";
  title: string;
  content: string;
};

export const businessPrompts: BusinessPrompt[] = [
  {
    category: "Sales",
    title: "Cold email ultra-personnalisé",
    content: `Lis [URL prospect / LinkedIn] et écris un cold email de 80 mots max.

Structure :
- Ligne 1 : un détail SPÉCIFIQUE du business du prospect (pas générique)
- Ligne 2 : le pain qu'on résout pour son segment
- Ligne 3 : la preuve (1 cas client similaire chiffré)
- Ligne 4 : un CTA léger (15 min, pas de "intéressé ?")

Ton : peer-to-peer, jamais "vous", utilise le prénom. Zéro buzzword.`,
  },
  {
    category: "Sales",
    title: "Qualif lead express",
    content: `Voici la transcription d'un appel discovery : [PASTE].

Sors :
1. Score MEDDIC sur 6 axes (Metrics / Economic buyer / Decision criteria / Decision process / Identify pain / Champion) — 1-5 chacun
2. Probabilité de signer : Hot / Warm / Cold (avec justif 1 phrase)
3. 3 next steps actionnables (qui fait quoi quand)
4. Mail de follow-up à envoyer dans les 2h (120 mots max)`,
  },
  {
    category: "Sales",
    title: "Follow-up qui débloque",
    content: `Le prospect [Nom] m'a dit qu'il "réfléchissait" il y a [X jours].

Écris un follow-up de 60 mots max qui :
- Ne supplie PAS
- Apporte UNE info nouvelle (cas client, étude, insight marché)
- Pose UNE question qui force une réponse oui/non
- Donne une deadline naturelle (offre, créneau, dispo équipe)`,
  },
  {
    category: "Ops",
    title: "SOP → checklist actionnable",
    content: `Voici une procédure interne brute : [PASTE].

Transforme-la en checklist actionnable au format markdown :
- [ ] Étape avec verbe d'action en début
- [ ] Owner (rôle, pas nom)
- [ ] Outil utilisé
- [ ] Critère "fait" mesurable

Si une étape est ambiguë, marque-la "🔶 À clarifier" + question précise à poser au process owner.`,
  },
  {
    category: "Ops",
    title: "Recap call client",
    content: `Voici mes notes de call : [PASTE].

Sors :
1. Décisions prises (3 max, en majuscules)
2. Action items (qui / quoi / quand) au format \`- [ ] @prénom — action — date\`
3. Risques identifiés (1-3)
4. Email de recap à envoyer (150 mots max, ton pro direct)`,
  },
  {
    category: "Ops",
    title: "Brief → cahier des charges",
    content: `Voici un brief client brut : [PASTE].

Génère un cahier des charges en 6 sections :
1. Contexte (5 lignes)
2. Objectifs business (3 max, mesurables)
3. Périmètre (in scope / out of scope explicite)
4. Livrables (avec format)
5. Hypothèses + dépendances (ce qu'on assume vrai)
6. Risques majeurs

Pour chaque ambiguïté du brief, marque "🔶 À clarifier" avec la question précise.`,
  },
  {
    category: "Marketing",
    title: "Landing page teardown",
    content: `Lis [URL] et fais un teardown brutal :
1. Hero — promesse claire ? CTA visible ? (note /10)
2. Public cible — identifié en 3 secondes ?
3. Preuves sociales — quantifiées ou floues ?
4. CTA principal — friction ? clarté ?
5. Mobile — qu'est-ce qui casse ?

Sortie : 5 quick wins (impact > effort) avec emplacement EXACT de la modif. Pas de "vous pourriez", c'est "fais X".`,
  },
  {
    category: "Marketing",
    title: "3 variantes de copy",
    content: `Voici un bloc de copy actuel : "[PASTE]".

Génère 3 variantes :
- **Variante A — Direct** (factuel, bénéfice chiffré)
- **Variante B — Aspiration** (transformation, identité)
- **Variante C — Tension** (problème + retournement)

Pour chaque variante : headline + sub + CTA. Et explique en 1 phrase la psycho derrière.`,
  },
  {
    category: "Marketing",
    title: "Post LinkedIn à fort engagement",
    content: `Sujet : [SUJET].
Contexte personnel : [TON ANGLE / TON STORY].

Écris un post LinkedIn :
- Hook (ligne 1) qui arrête le scroll — contre-intuitif ou stats choc
- Story personnelle ou observation terrain en 4-5 lignes courtes
- 3 takeaways actionnables
- CTA d'engagement (question ouverte qui force une vraie réponse)
- Max 1300 caractères, espaces aérés, pas d'emoji ni de #hashtag spam`,
  },
  {
    category: "Finance",
    title: "Analyse P&L mensuel",
    content: `Voici le P&L du mois : [PASTE chiffres].

Sors :
1. Top 3 trends positifs (avec % vs mois précédent)
2. Top 3 alertes (cash burn, marges, dépendance client)
3. 3 décisions à prendre ce mois (avec impact estimé)
4. Chiffres à surveiller la semaine prochaine

Format : exécutif, 1 page max. Pas de jargon comptable.`,
  },
  {
    category: "Finance",
    title: "Pricing : recommandation chiffrée",
    content: `Mon offre actuelle : [DESCRIPTION + prix].
Mes coûts : [COÛTS].
Concurrence : [3 concurrents + leurs prix].

Recommande :
1. Prix optimal selon Value-Based Pricing (avec justif chiffrée)
2. Structure de pricing (tier unique / 3 tiers / freemium)
3. Anchor pricing si applicable
4. 3 objections client probables + réponses

Sortie : recommandation tranchée, pas "ça dépend".`,
  },
  {
    category: "RH",
    title: "Job spec qui attire les A-players",
    content: `Rôle à recruter : [RÔLE].
Contexte boîte : [BOÎTE en 2 phrases].
Stack / contexte tech : [STACK].

Écris une fiche de poste qui :
- Hook ouverture : pourquoi ce job est unique (pas générique)
- Ce que la personne va vraiment faire (3 missions concrètes, pas du blabla)
- Profil cible (3 hard skills + 3 soft skills + red flags)
- Ce qu'on offre (avec range salaire — obligatoire)
- Process recrutement (étapes + timing)

Ton : honnête, direct, zéro langue de bois. Public cible : top 10% du marché.`,
  },
  {
    category: "RH",
    title: "Screening CV en 30 secondes",
    content: `Voici un CV : [PASTE].
Voici la job spec : [PASTE].

Sors :
1. Match score /10 (avec justif 2 phrases)
2. 3 forces alignées avec le poste
3. 3 doutes / questions à poser en entretien
4. Décision : Pass / Phone screen / Interview direct

Bonus : 5 questions ciblées pour valider les doutes.`,
  },
  {
    category: "Sales",
    title: "Pitch deck en 10 slides",
    content: `Mon business : [DESCRIPTION].
Audience : [investisseurs / clients / partenaires].

Génère un plan de deck 10 slides :
1. Problem (qui souffre, pourquoi maintenant)
2. Solution (en 1 phrase + démo visuelle)
3. Market size (TAM/SAM/SOM chiffrés)
4. Product (3 features killer)
5. Traction (chiffres concrets)
6. Business model (unit economics)
7. Go-to-market (3 canaux prioritaires)
8. Competition (matrice positionnement)
9. Team (pourquoi NOUS)
10. Ask (montant + usage des fonds)

Pour chaque slide : titre + 3 bullets max + visual cue.`,
  },
  {
    category: "Marketing",
    title: "Calendrier éditorial 30 jours",
    content: `Niche : [NICHE].
Audience cible : [PERSONA].
Plateforme principale : [LinkedIn / X / Newsletter / autre].

Génère un calendrier 30 jours :
- 12 publications réparties (3/semaine)
- Mix : 4 valeur dense / 4 storytelling / 2 contrarian / 2 promo
- Pour chaque post : titre + angle + hook (ligne 1) + CTA

Ajoute une "thèse éditoriale" en intro : la position unique qu'on veut occuper.`,
  },
];

/* ───────────── 10. Séquence 14 jours ───────────── */

export type TimelineDay = {
  day: string;
  title: string;
  tasks: string[];
};

export const timeline14Days: TimelineDay[] = [
  {
    day: "J1",
    title: "Choix du plan + install",
    tasks: [
      "Quiz 2 min → décision plan (Pro / Max / Team)",
      "Crée le compte + paie le plan",
      "Installe Claude Code (CLI) + Claude Cowork (desktop)",
      "Bookmark claude.ai dans la barre",
    ],
  },
  {
    day: "J2",
    title: "Ton premier CLAUDE.md",
    tasks: [
      "Choisis le template (solo / agence / PME)",
      "Lance le prompt générateur sur ton site web",
      "Itère 2-3 fois jusqu'à ce que ça sonne juste",
      "Sauvegarde dans ~/.claude/CLAUDE.md (global)",
    ],
  },
  {
    day: "J3",
    title: "Memory + import historique",
    tasks: [
      "Active Memory dans Settings",
      "Importe ton historique ChatGPT/Gemini",
      "Lance le prompt fiche profil",
      "Vérifie le dashboard Memory : ce qui est stocké est correct",
    ],
  },
  {
    day: "J4",
    title: "MCP critiques (3 max au début)",
    tasks: [
      "Branche context7 (doc libs à jour) — non négociable",
      "Branche le MCP de ton outil knowledge (Notion / Linear)",
      "Branche le MCP de ton CRM ou Slack si applicable",
      "Test : pose une question qui croise les 3",
    ],
  },
  {
    day: "J5",
    title: "Installe 3 Skills business",
    tasks: [
      "Drag-drop daily-standup, email-client, recap-reunion dans ~/.claude/skills/",
      "Test chaque skill sur un cas réel de la semaine",
      "Ajuste le SKILL.md si la sortie n'est pas calibrée",
    ],
  },
  {
    day: "J6-J7",
    title: "Week-end : crée ton premier Skill custom",
    tasks: [
      "Identifie 1 process que tu répètes 3+ fois/semaine",
      "Lance le meta-prompt skill creator",
      "Réponds aux 7 questions",
      "Drag le SKILL.md généré dans ~/.claude/skills/",
      "Test sur 3 cas différents pour valider la robustesse",
    ],
  },
  {
    day: "J8",
    title: "Bibliothèque de prompts personnels",
    tasks: [
      "Copie les 15 prompts business dans un Notion / Obsidian",
      "Adapte les variables [PROSPECT], [BUSINESS], [STACK] à ton contexte",
      "Crée 5 raccourcis dans ton launcher (Raycast, Alfred) vers les prompts les plus utilisés",
    ],
  },
  {
    day: "J9",
    title: "Premier Project Claude.ai partagé",
    tasks: [
      "Crée un Project pour ton activité principale",
      "Upload tes docs clés (process, brand book, ICP)",
      "Custom instructions : référence ton CLAUDE.md",
      "Test : pose 5 questions business — la réponse doit être ON brand",
    ],
  },
  {
    day: "J10",
    title: "Premier audit ROI perso",
    tasks: [
      "Liste les 3 tâches où Claude t'a fait gagner le + de temps cette semaine",
      "Estime l'économie horaire (sois honnête)",
      "Identifie 2 process à automatiser la semaine prochaine",
    ],
  },
  {
    day: "J11",
    title: "Onboarding équipe (si applicable)",
    tasks: [
      "Présente ton CLAUDE.md à l'équipe (1 réunion 30 min)",
      "Onboard 2-3 champions sur Team plan",
      "Partage les Skills + prompts dans le drive commun",
    ],
  },
  {
    day: "J12",
    title: "Premier projet équipe en mode Claude",
    tasks: [
      "Choisis 1 livrable client de la semaine",
      "Fais-le 100% en mode Claude-augmenté (Code + Cowork + Skills)",
      "Documente le gain de temps vs ta baseline",
    ],
  },
  {
    day: "J13",
    title: "Garde-fous + audit sécurité",
    tasks: [
      "Vérifie qu'aucune data sensible client n'est passée par chat free",
      "Setter budget alert API si tu as commencé l'API",
      "Si Routines : audit la config + budget cap",
      "Memory dashboard : nettoie l'obsolète",
    ],
  },
  {
    day: "J14",
    title: "Bilan + plan mois 2",
    tasks: [
      "Calcule l'économie horaire totale sur 14 jours",
      "Liste 3 wins concrets (montrables à un client)",
      "Liste 3 frustrations à résoudre mois 2",
      "Décide : tu pousses solo ou tu prends un accompagnement Aurentia ?",
    ],
  },
];

/* ───────────── 11. Risques ───────────── */

export type RedZone = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const redZones: RedZone[] = [
  {
    icon: Lock,
    title: "Coller de la data sensible dans le chat free/Pro",
    description:
      "Conversations utilisées pour training selon plan. Pour PII / data financière / legal : API zero-retention OU Bedrock/Vertex avec contrats DPA.",
  },
  {
    icon: Bot,
    title: "Lancer Cowork sans sandbox",
    description:
      "Cowork = filesystem + apps + browser. 3 niveaux de permission existent — comprends-les AVANT le run autonome. Sandbox dès que possible.",
  },
  {
    icon: AlertTriangle,
    title: "Ignorer le Memory dashboard",
    description:
      "Memory accumule du contexte qui peut devenir faux ou compromettant. Audit mensuel obligatoire — 2 minutes, énorme impact.",
  },
  {
    icon: Zap,
    title: "Routines sans budget alert",
    description:
      "Une Routine mal configurée = facture qui explose en silence. TOUJOURS setter budget alert + auditer mensuellement.",
  },
  {
    icon: Brain,
    title: "Confondre Constitutional AI et neutralité",
    description:
      "Anthropic est US, vision libérale-tech. Sur sujets politiques/culturels Claude a des biais. Pas un problème pour 95% du business mais à connaître.",
  },
  {
    icon: Server,
    title: "Skipper l'abstraction layer en prod",
    description:
      "Single vendor lock-in : pas d'alternative open-source aux Skills/Hooks/Subagents en 2026. Sépare l'Agent SDK de ta business logic, abstraction layer si critique.",
  },
];

/* ───────────── Final CTAs ───────────── */

export const finalCtas: {
  icon: LucideIcon;
  title: string;
  description: string;
  cta: { label: string; href: string };
  external?: boolean;
}[] = [
  {
    icon: Rocket,
    title: "On déploie le kit chez toi en 14 jours",
    description:
      "Tu veux pas le faire seul ? On audit ton usage actuel, on installe le setup complet (CLAUDE.md, Memory, MCP, Skills, prompts), on forme ton équipe. Tu repars opérationnel.",
    cta: { label: "Discuter d'un accompagnement", href: "/contact" },
  },
  {
    icon: Users,
    title: "Forme ton équipe à Claude",
    description:
      "Workshop 2 jours sur-mesure pour ton équipe. On part de tes vrais cas d'usage, on installe les skills métier, on mesure le ROI. Ils repartent vendus.",
    cta: { label: "Voir nos formations IA", href: "/solutions-ia/formation-ia" },
  },
  {
    icon: Wand2,
    title: "Doc officielle Claude",
    description:
      "Si tu veux creuser : Skills, MCP, Hooks, Subagents, Plugins, Routines. La référence Anthropic, à jour.",
    cta: { label: "docs.anthropic.com", href: "https://docs.anthropic.com" },
    external: true,
  },
];
