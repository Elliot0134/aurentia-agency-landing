# /v2/agence Content Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/v2/agence` by porting the rich narrative content from the initial `/a-propos` page into the v2 design language, with team cards as 1 per row (alternating L/R).

**Architecture:** Replace the current "agency hub" composition of `/v2/agence` with 10 narrative sections mirroring `/a-propos`. Each section is a new component in `src/components/v2/agence/` that uses the existing v2 shared primitives (`SectionContainer`, `BlurReveal`, Lucide icons, semantic color tokens). Content lives in a new `src/data/v2/agence-content.ts` so the two pages can evolve independently.

**Tech Stack:** Next.js 14 App Router, TypeScript strict, Tailwind (semantic tokens), Lucide React, GSAP (via existing `BlurReveal` + `NumberMorph`), shared `CalModal` + `LinkedInEmbed`.

**Reference spec:** `docs/superpowers/specs/2026-04-16-agence-v2-port-design.md`

**Verification approach:** TypeScript/build verification via `bun run build`, plus manual browser check on final page. No unit test suite — this is a Next.js content-heavy UI page.

---

## File Structure

### New files

| File | Responsibility |
|------|----------------|
| `src/data/v2/agence-content.ts` | All narrative content (story, stats, team, values, hackathons, stack, approach, audience, CTA) + types |
| `src/components/v2/agence/AgenceStoryV2.tsx` | "Le constat / Le déclic / La mission" — 3 paragraphs |
| `src/components/v2/agence/AgenceStats.tsx` | 4 counters (20 ans / 48h / 15+ / 100%) |
| `src/components/v2/agence/AgenceTeamFull.tsx` | 4 team members, 1 per row, photo bleed 55% + text 45%, alternating L/R |
| `src/components/v2/agence/AgenceValuesV2.tsx` | 5 convictions bento grid |
| `src/components/v2/agence/AgenceHackathons.tsx` | Origin story solo → bridge → duo with LinkedIn embeds |
| `src/components/v2/agence/AgenceStack.tsx` | Interactive pipeline by phase |
| `src/components/v2/agence/AgenceApproach.tsx` | 3 pillars with accent colors |
| `src/components/v2/agence/AgenceAudience.tsx` | "Pour qui on travaille" checklist |
| `src/components/v2/agence/AgenceFinalCTA.tsx` | Final CTA with Cal modal |

### Modified files

| File | Change |
|------|--------|
| `src/app/v2/agence/page.tsx` | Recompose section order, update sub-nav |
| `src/components/v2/agence/AgenceHero.tsx` | Inline JSX headline with gradient spans; remove `hero.headline` dependency |
| `src/data/v2/agence.ts` | Update `hero` fields; remove unused `subPages`, `teamPreview`, `finalCta` |

### Files left untouched (not imported anymore by page.tsx, but kept on disk)

- `src/components/v2/agence/AgenceComposition.tsx`
- `src/components/v2/agence/AgenceWhy.tsx`
- `src/components/v2/agence/AgenceMethod.tsx`
- `src/components/v2/agence/AgenceFAQ.tsx`
- `src/components/v2/agence/AgenceTeamPreview.tsx`
- `src/components/v2/agence/AgenceStory.tsx`

---

## Task 1: Create the data file

**Files:**
- Create: `src/data/v2/agence-content.ts`

- [ ] **Step 1.1: Create the data file**

Write this file:

```ts
// src/data/v2/agence-content.ts
// Narrative content for /v2/agence — ported from about-content.ts then
// adapted for the v2 layout. Kept independent so /v2/agence and /a-propos
// can evolve separately.

export interface AgenceTeamMember {
  name: string;
  role: string;
  badge: string;
  bio: string;
  tags: string[];
  image: string;
  linkedin: string;
}

export interface AgenceValueCard {
  icon: "Sun" | "Zap" | "Shield" | "Eye" | "Users";
  title: string;
  text: string;
  span?: number;
}

export interface AgenceStat {
  value: number;
  suffix: string;
  label: string;
}

export interface AgenceApproachPillar {
  icon: "Cpu" | "Hammer" | "Handshake";
  title: string;
  text: string;
  accentColor: "orange" | "amber" | "cyan";
}

export interface AgenceHackathonTeammate {
  name: string;
  linkedinUrl?: string;
}

export interface AgenceHackathonCard {
  title: string;
  date: string;
  description: string;
  result: string;
  linkedinEmbedUrl: string;
  phase: "solo" | "duo";
  teammates?: AgenceHackathonTeammate[];
}

export interface AgenceStackTech {
  name: string;
  icon: string;
  description: string;
}

export const agenceStory = {
  title: "Comment Aurentia est née",
  subtitle: "20 ans de constat, 6 mois de R&D, une seule conviction.",
  paragraphs: [
    {
      label: "Le constat",
      text: "En 20 ans de création web, on a vu le même problème se répéter. Des centaines de PME, d'artisans, de commerçants — sans présence digitale digne de ce nom. Pas par manque de volonté. Par manque d'offre adaptée. Les agences classiques facturent 5 000€ et livrent en 2 mois. Les templates font cheap. Le marché laissait un vide béant.",
    },
    {
      label: "Le déclic",
      text: "L'intelligence artificielle a tout changé. Pas les chatbots gadgets — les vrais outils de production. Ceux qui permettent de générer un site vitrine sur-mesure en quelques heures. Pas un template. Un vrai site, avec du contenu pensé, du SEO intégré, un design qui tient la route. On a testé. Vérifié. Comparé. Le résultat tenait la route face à ce qui prenait 3 semaines en process classique.",
    },
    {
      label: "La mission",
      text: "Aurentia est née de cette conviction : l'IA comme accélérateur, 20 ans d'expertise comme garde-fou, et une exigence technique sans compromis. Le résultat : des sites professionnels livrés en 48h, à partir de 1 200€. Pas parce qu'on bâcle. Parce que le process est redoutablement efficace.",
    },
  ],
};

export const agenceStats: AgenceStat[] = [
  { value: 20, suffix: "ans", label: "d'expertise web cumulée" },
  { value: 48, suffix: "h", label: "pour livrer votre V1" },
  { value: 15, suffix: "+", label: "sites livrés" },
  { value: 100, suffix: "%", label: "de clients satisfaits" },
];

export const agenceStatsSection = {
  title: "Les chiffres parlent.",
  subtitle: "Ce qu'on a construit en quelques mois.",
};

export const agenceTeam: AgenceTeamMember[] = [
  {
    name: "Elliot Estrade",
    role: "CEO, IA & Design",
    badge: "Architecte IA & Design",
    bio: "Entrepreneur et architecte IA. Fondateur d'ESST Solutions (consulting IA & dev). Co-fondateur de Kaelen Studio (jeux Roblox). Créateur de Comparateur-IA-Facile.com. Formateur IA en entreprise — il forme des équipes à intégrer l'intelligence artificielle dans leurs process. C'est lui qui a forgé le workflow IA d'Aurentia — le système sur-mesure qui permet de livrer un site pro en 48h. La vision, l'innovation, la vitesse.",
    tags: [
      "Intelligence Artificielle",
      "Design UI/UX",
      "Automatisation",
      "Stratégie produit",
      "Formation IA",
      "E-commerce",
    ],
    image: "/images/team/elliot.webp",
    linkedin: "https://www.linkedin.com/in/elliot-estrade/",
  },
  {
    name: "Matthieu Bousquet",
    role: "CTO, Lead Technique",
    badge: "Dev Senior & Formateur Epitech",
    bio: "Développeur full-stack et formateur à Epitech Marseille. Pionnier Claude Code au sein de l'équipe — il a été le premier à intégrer l'IA dans son workflow de développement quotidien. Architecte technique, il conçoit les fondations de chaque projet. Chaque site est sécurisé, rapide, et techniquement irréprochable. Code review, performance, scalabilité — rien ne lui échappe. Avec Elliot, il a remporté 2 hackathons. Le craft technique, c'est son terrain.",
    tags: [
      "Architecture technique",
      "Sécurité",
      "Performance",
      "Code review",
      "Formation Epitech",
      "Claude Code",
    ],
    image: "/images/team/mathieu.webp",
    linkedin: "https://www.linkedin.com/in/mathieu-bousquet-178454315/",
  },
  {
    name: "Fabien Estrade",
    role: "Production Lead",
    badge: "20 ans de création web",
    bio: "Co-fondateur de l'agence Le Prisme à Avignon. 20 ans à forger des sites, des identités visuelles, des marques pour des PME, artisans et commerçants. Direction créative, stratégie de marque, accompagnement client — il a traversé chaque vague du web. WordPress, Flash, le responsive, les frameworks modernes. Il sait ce qui convertit. Ce qui dure. Ce qui illumine un business. Chez Aurentia, il est le pilier qualité. Rien ne sort sans son feu vert.",
    tags: [
      "Direction créative",
      "Identité visuelle",
      "Stratégie de marque",
      "Accompagnement client",
      "20 ans de craft web",
    ],
    image: "/images/team/fabien.webp",
    linkedin: "https://www.linkedin.com/in/fabienestrade/",
  },
  {
    name: "Olivier Le Floch",
    role: "Stratégie & Business",
    badge: "Serial entrepreneur",
    bio: "Cofondateur d'achat-vip.com (millions de membres, dizaines de M€ de CA). Créateur de LePass / vente-privee LEPASS, rachetée par le groupe. Cofondateur d'Holirenting, puis Directeur Général de Smily France (centaines de M€ de volume). Du e-commerce à la location saisonnière, il a scalé des boîtes à chaque étape. Chez Aurentia, il apporte la vision stratégique et le sens business.",
    tags: [
      "Stratégie d'entreprise",
      "E-commerce",
      "Scaling startups",
      "SaaS",
      "Business development",
    ],
    image: "/images/team/olivier-droite.webp",
    linkedin: "https://www.linkedin.com/in/olivier-le-floch-0899a9/",
  },
];

export const agenceTeamSection = {
  title: "Quatre profils. Une seule exigence.",
  subtitle: "20 ans de craft web, l'IA comme superpouvoir, et une ingénierie sans compromis.",
};

export const agenceValues: AgenceValueCard[] = [
  {
    icon: "Sun",
    title: "Révéler, pas créer",
    text: "Votre business a déjà un potentiel. On ne part pas de zéro — on met en lumière ce qui est déjà là. Vous êtes le héros. On est la lumière.",
    span: 2,
  },
  {
    icon: "Zap",
    title: "48h. Pas 6 semaines.",
    text: "L'IA nous donne un superpouvoir : la vitesse. Pas parce qu'on bâcle — parce que notre process est redoutablement efficace.",
  },
  {
    icon: "Shield",
    title: "Tant que c'est pas parfait, on ne lance pas.",
    text: "Chaque pixel compte. Chaque ligne de code est propre. On ne fait pas de compromis sur la qualité.",
  },
  {
    icon: "Eye",
    title: "On montre avant de facturer.",
    text: "Vous voyez votre site AVANT de payer. Pas de mockup flou — un vrai site, fonctionnel, avec votre contenu. Vous jugez, vous décidez.",
  },
  {
    icon: "Users",
    title: "Un interlocuteur. Pas un ticket.",
    text: "Pas de chef de projet qui transmet à un dev qui transmet à un designer. Vous parlez directement à l'équipe qui construit.",
  },
];

export const agenceValuesSection = {
  title: "Ce en quoi on croit.",
  subtitle: "Cinq convictions. Pas des slogans — des règles qu'on applique sur chaque projet.",
};

export const agenceHackathons: AgenceHackathonCard[] = [
  {
    title: "Hacktogone #1 — Matthieu",
    date: "Mai 2025",
    description:
      "Matthieu et son équipe (Nicolas Dunand, Tikinas Oughlis) remportent la première place du premier Hacktogone, le plus grand hackathon Agents IA de France. Architecture technique, workflows intelligents, exécution chirurgicale — le craft à l'état pur.",
    result: "1ère place",
    linkedinEmbedUrl:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7327776555282157568?collapsed=1",
    phase: "solo",
  },
  {
    title: "Hacktogone #1 — Elliot",
    date: "Mai 2025",
    description:
      "Elliot et son équipe ({teammates}) décrochent la 3ème place du même hackathon. Un SaaS d'agent RAG ultra performant pour Raedificare : analyse documentaire, extraction de sources, rapports en quelques minutes. IA, design, pitch — une approche radicalement différente, mais le même podium.",
    teammates: [
      { name: "Anne-Lorie Baert", linkedinUrl: "https://www.linkedin.com/in/anne-lorie-baert-443667197/" },
      { name: "Lucas Peyrin", linkedinUrl: "https://www.linkedin.com/in/lucas-peyrin-5548171a6/" },
    ],
    result: "3ème place",
    linkedinEmbedUrl:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7331637013185466368?collapsed=1",
    phase: "solo",
  },
  {
    title: "Hacktogone #2 Toulouse — Elliot & Matthieu",
    date: "Août 2025",
    description:
      "99 développeurs. 4 jours. 2 nuits blanches. 1 objectif. Architecture technique de Matthieu + vision IA/design d'Elliot — cette fois ensemble. Un SaaS de navigation propulsé par l'IA, type Waze/Google Maps intelligent, pour l'entreprise Symone. Résultat : Grand Prix du Hacktogone. La preuve que la collaboration bat toujours le talent solo.",
    result: "1ère place",
    linkedinEmbedUrl:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7394753300794884096?collapsed=1",
    phase: "duo",
  },
];

export const agenceHackathonsSection = {
  eyebrow: "ORIGIN STORY",
  title: "Séparés, on gagne. Ensemble, on domine.",
  subtitle:
    "Elliot et Matthieu se sont rencontrés en compétition. Chacun sur le podium, chacun de son côté. Puis ils ont uni leurs forces — et n'ont plus jamais perdu.",
  phaseLabels: {
    solo: "Chacun de son côté",
    bridge: "La rencontre. Le déclic.",
    duo: "Forces unies",
  },
  closing:
    "Ce qu'on fait en hackathon, on le fait pour vous. La même intensité, la même complémentarité, le même résultat — mais avec votre business au centre.",
};

export const agenceStackTechnologies: AgenceStackTech[] = [
  { name: "Claude AI", icon: "/images/icons/claude-icon.webp", description: "Notre copilote IA. Design, code, contenu — il accélère chaque étape sans remplacer l'expertise." },
  { name: "N8N", icon: "/images/icons/n8n-icon.webp", description: "Automatisation sur-mesure. On connecte vos outils entre eux pour éliminer les tâches répétitives." },
  { name: "Supabase", icon: "/images/icons/supaabse-icon.webp", description: "Base de données, auth, stockage. Le backend complet, open-source et ultra performant." },
  { name: "Vercel", icon: "/images/icons/vercel-icon.webp", description: "Déploiement instantané. Votre site en ligne en quelques secondes, partout dans le monde." },
  { name: "Stripe", icon: "/images/icons/stripe-icon.webp", description: "Paiements en ligne fiables. Abonnements, factures, checkout — tout est géré." },
  { name: "GitHub", icon: "/images/icons/github-icon.webp", description: "Versioning et collaboration. Chaque ligne de code est tracée, revue et sécurisée." },
  { name: "Google Drive", icon: "/images/icons/google-drive-icon.webp", description: "Espace partagé client. Briefs, assets, livrables — tout au même endroit." },
  { name: "Canva", icon: "/images/icons/canva-icon.webp", description: "Création visuelle rapide. Mockups, visuels réseaux, assets marketing." },
  { name: "Illustrator", icon: "/images/icons/illustrator-icon.webp", description: "Design vectoriel précis. Logos, icônes, illustrations sur-mesure." },
  { name: "WhatsApp", icon: "/images/icons/whatsapp-icon.webp", description: "Communication directe. On répond vite, sans formalités inutiles." },
  { name: "Figma", icon: "/images/icons/figma-icon.webp", description: "Prototypage et design collaboratif. Chaque maquette est validée avant de coder." },
];

export const agenceStackPhases: { label: string; names: string[] }[] = [
  { label: "Design", names: ["Figma", "Canva", "Illustrator"] },
  { label: "Développement", names: ["GitHub", "Supabase", "Vercel"] },
  { label: "Intelligence", names: ["Claude AI", "N8N"] },
  { label: "Business", names: ["Stripe", "Google Drive", "WhatsApp"] },
];

export const agenceStackSection = {
  eyebrow: "Nos outils",
  title: "Notre stack.",
  subtitle: "Des outils de pointe. Pas pour la hype — pour le résultat.",
};

export const agenceApproach: AgenceApproachPillar[] = [
  {
    icon: "Cpu",
    title: "L'IA qui amplifie",
    text: "L'IA accélère le design, le code, le SEO, le contenu. Mais elle ne décide de rien. C'est l'expertise humaine qui valide. Chaque pixel, chaque mot, chaque choix technique.",
    accentColor: "orange",
  },
  {
    icon: "Hammer",
    title: "Le craft qui dure",
    text: "20 ans de création web, ça forge un œil. On sait ce qui fonctionne, ce qui convertit, ce qui tient dans le temps. Le site qu'on livre aujourd'hui sera encore pertinent dans 3 ans.",
    accentColor: "amber",
  },
  {
    icon: "Handshake",
    title: "L'humain au centre",
    text: "Un seul interlocuteur du brief au lancement. Pas de process kafkaïen. Vous parlez à ceux qui construisent. On avance ensemble, à votre rythme.",
    accentColor: "cyan",
  },
];

export const agenceApproachSection = {
  title: "L'IA comme instrument de précision. Pas comme raccourci.",
  subtitle: "Ce qui nous sépare du reste.",
};

export const agenceAudience = {
  title: "Pour qui on travaille.",
  paragraph:
    "Si vous vous reconnaissez dans une de ces situations, on est faits pour bosser ensemble.",
  items: [
    { text: "Vous êtes entrepreneur, artisan, commerçant ou dirigeant de PME — et votre présence digitale ne reflète pas la qualité de ce que vous faites." },
    { text: "Vous avez une idée de SaaS ou d'application mais pas d'équipe technique pour la concrétiser." },
    { text: "Vous perdez des clients parce que vos concurrents apparaissent sur Google et pas vous." },
    { text: "Vous avez contacté des agences. Devis : 5 000€+. Délai : 2 mois. Vous avez laissé tomber." },
    { text: "Vous avez besoin d'une landing page qui convertit, d'une identité visuelle forte, ou d'un site vitrine qui ramène des clients." },
    { text: "Vous voulez un partenaire digital complet — site, app, branding, stratégie — sans multiplier les prestataires." },
  ],
  conclusion:
    "On a construit Aurentia pour vous. Site vitrine, SaaS, landing page, identité visuelle — peu importe le besoin, on a la solution. Pour les entreprises qui méritent d'être vues.",
};

export const agenceFinalCTA = {
  title: "Envie de voir ce qu'on peut faire pour vous ?",
  subtitle:
    "On vous prépare un aperçu de votre futur site, un audit de vos concurrents, et des recommandations stratégiques. Gratuit. 20 minutes. Sans engagement.",
  cta: "Réserver mon call gratuit",
  proofs: [
    "Gratuit et sans engagement",
    "On vous montre VOTRE site",
    "Vous gardez l'audit quoi qu'il arrive",
  ],
};
```

- [ ] **Step 1.2: Run build to verify types**

Run: `bun run build 2>&1 | tail -30`
Expected: build succeeds (no TypeScript errors in the new file). The page.tsx may still compile fine since the file isn't yet imported.

- [ ] **Step 1.3: Commit**

```bash
git add src/data/v2/agence-content.ts
git commit -m "$(cat <<'EOF'
feat(v2/agence): add agence-content data module

New narrative content for /v2/agence, ported from about-content.ts.
Kept separate so the legacy /a-propos page and the new /v2/agence page
can evolve independently.
EOF
)"
```

---

## Task 2: Update agence.ts data (hero + cleanup)

**Files:**
- Modify: `src/data/v2/agence.ts`

- [ ] **Step 2.1: Rewrite `src/data/v2/agence.ts`**

Replace the entire file with:

```ts
// src/data/v2/agence.ts
// Hero + sub-nav data for /v2/agence.
// Rich narrative content lives in agence-content.ts.

export const agenceData = {
  hero: {
    eyebrow: "L'équipe Aurentia",
    // Headline is rendered as JSX in AgenceHero.tsx (gradient spans).
    subHeadline:
      "On ne crée pas à partir de rien. On révèle le potentiel qui est déjà là. Trois profils complémentaires, un seul objectif : que votre business soit vu.",
    cta: {
      primary: { label: "Rencontrer l'équipe", href: "#equipe" },
      secondary: { label: "Travailler avec nous", href: "/v2/contact" },
    },
  },
};
```

- [ ] **Step 2.2: Audit other importers of `agenceData`**

Run: `grep -rn "agenceData" src/ --include='*.tsx' --include='*.ts'`

Expected: only `src/components/v2/agence/AgenceHero.tsx` and (before this change) the removed `AgenceComposition`, `AgenceStory`, `AgenceTeamPreview` pieces imported from `agenceData`. Since those components are no longer in `page.tsx`, removing `subPages` / `story` / `teamPreview` / `finalCta` will break them only if still referenced elsewhere.

If `grep` reveals any lingering importer under `src/app/` that we still use, stop and surface the issue. If only the 3 now-orphan components (`AgenceComposition`, `AgenceStory`, `AgenceTeamPreview`) import the removed fields, that is expected — they stay on disk as reference but are not imported by our page anymore.

- [ ] **Step 2.3: Run build**

Run: `bun run build 2>&1 | tail -30`
Expected: **build will fail** because `AgenceComposition`, `AgenceStory`, `AgenceTeamPreview` still reference the deleted `subPages` / `story` / `teamPreview` on `agenceData`. They are still imported by the current `page.tsx` until Task 13. We'll fix this in Task 13 by stopping to import them. For now, **skip the build check for this task** — the lingering imports will resolve once `page.tsx` is rewritten.

- [ ] **Step 2.4: Commit**

```bash
git add src/data/v2/agence.ts
git commit -m "$(cat <<'EOF'
refactor(v2/agence): simplify agence.ts to hero + nav only

Narrative data moves to agence-content.ts. subPages, teamPreview,
and finalCta are no longer needed since page.tsx will be recomposed.
Related hub components will be disconnected from page.tsx in a later
task and are temporarily broken — type check deferred until then.
EOF
)"
```

---

## Task 3: Rewrite AgenceHero with gradient headline

**Files:**
- Modify: `src/components/v2/agence/AgenceHero.tsx`

- [ ] **Step 3.1: Replace the file**

Overwrite `src/components/v2/agence/AgenceHero.tsx` with:

```tsx
// src/components/v2/agence/AgenceHero.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { agenceData } from "@/data/v2/agence";

const AGENCE_TAGS: { key: string; label: string; sectionId: string }[] = [
  { key: "histoire", label: "Histoire", sectionId: "histoire" },
  { key: "equipe", label: "Équipe", sectionId: "equipe" },
  { key: "valeurs", label: "Valeurs", sectionId: "valeurs" },
  { key: "approche", label: "Approche", sectionId: "approche" },
  { key: "contact", label: "Contact", sectionId: "contact" },
];

export function AgenceHero() {
  const { hero } = agenceData;

  const handleTagClick = (sectionId: string) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="agence-hero" className="relative overflow-hidden">
      {/* Top halo */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[500px]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse 130% 100% at 50% 0%,
              color-mix(in srgb, var(--orange-500) 45%, transparent) 0%,
              color-mix(in srgb, var(--orange-500) 36%, transparent) 12%,
              color-mix(in srgb, var(--orange-500) 26%, transparent) 25%,
              color-mix(in srgb, var(--orange-500) 18%, transparent) 38%,
              color-mix(in srgb, var(--orange-500) 11%, transparent) 52%,
              color-mix(in srgb, var(--orange-500) 6%, transparent) 66%,
              color-mix(in srgb, var(--orange-500) 2%, transparent) 82%,
              transparent 100%
            )`,
          }}
        />
      </div>

      <div className="relative z-10 pt-20 md:pt-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 py-12 text-center md:px-12 md:py-20">
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange-500)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orange-500)]" />
            </span>
            {hero.eyebrow} · Avignon
          </span>

          {/* H1 — inline JSX with gradient spans */}
          <h1 className="max-w-4xl font-heading text-4xl leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent">
              20 ans
            </span>
            {" d'expertise."}
            <br />
            {"L'IA en "}
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              plus
            </span>
            .
          </h1>

          {/* Subhead */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subHeadline}
          </p>

          {/* Section tags */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {AGENCE_TAGS.map((tag) => (
              <button
                key={tag.key}
                type="button"
                onClick={() => handleTagClick(tag.sectionId)}
                className="group inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-background px-3 py-1 text-sm text-muted-foreground transition-all duration-500 ease-in-out hover:border-foreground/40 hover:text-foreground"
              >
                <span className="h-1 w-1 rounded-full bg-muted-foreground/50 transition-colors duration-500 ease-in-out group-hover:bg-[var(--orange-500)]" />
                {tag.label}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={hero.cta.primary.href}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
            >
              {hero.cta.primary.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-in-out" />
            </Link>
            <Link
              href={hero.cta.secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40"
            >
              {hero.cta.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3.2: Commit**

```bash
git add src/components/v2/agence/AgenceHero.tsx
git commit -m "$(cat <<'EOF'
feat(v2/agence): update AgenceHero with narrative headline

Inline JSX for gradient spans on "20 ans" and "plus". Tags and CTA
hrefs aligned with the new section ids (histoire, equipe, valeurs,
approche, contact).
EOF
)"
```

---

## Task 4: Create AgenceStoryV2

**Files:**
- Create: `src/components/v2/agence/AgenceStoryV2.tsx`

- [ ] **Step 4.1: Create the component**

Write `src/components/v2/agence/AgenceStoryV2.tsx`:

```tsx
// src/components/v2/agence/AgenceStoryV2.tsx
"use client";

import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { agenceStory } from "@/data/v2/agence-content";

function splitFirstSentence(text: string): { first: string; rest: string } {
  const dotIndex = text.indexOf(". ");
  if (dotIndex === -1) {
    return { first: text, rest: "" };
  }
  return {
    first: text.slice(0, dotIndex + 1),
    rest: text.slice(dotIndex + 2),
  };
}

export function AgenceStoryV2() {
  return (
    <SectionContainer
      id="histoire"
      title={agenceStory.title}
      subtitle={agenceStory.subtitle}
      innerClassName="max-w-3xl"
    >
      <div className="space-y-14 md:space-y-16">
        {agenceStory.paragraphs.map((paragraph, index) => {
          const { first, rest } = splitFirstSentence(paragraph.text);

          return (
            <BlurReveal key={paragraph.label} delay={index * 0.15}>
              <div className="space-y-4 border-l-2 border-accent-primary/30 pl-6">
                <span className="text-sm font-mono tracking-wider text-accent-primary uppercase">
                  {paragraph.label}
                </span>
                <p className="text-base md:text-lg text-foreground leading-relaxed md:leading-[1.8] font-semibold">
                  {first}
                </p>
                {rest && (
                  <p className="text-base md:text-lg text-foreground/65 leading-relaxed md:leading-[1.8]">
                    {rest}
                  </p>
                )}
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 4.2: Commit**

```bash
git add src/components/v2/agence/AgenceStoryV2.tsx
git commit -m "feat(v2/agence): add AgenceStoryV2 section"
```

---

## Task 5: Create AgenceStats

**Files:**
- Create: `src/components/v2/agence/AgenceStats.tsx`

- [ ] **Step 5.1: Create the component**

Write `src/components/v2/agence/AgenceStats.tsx`:

```tsx
// src/components/v2/agence/AgenceStats.tsx
"use client";

import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { NumberMorph } from "@/components/animations/NumberMorph";
import { agenceStats, agenceStatsSection } from "@/data/v2/agence-content";

export function AgenceStats() {
  return (
    <SectionContainer
      id="stats"
      title={agenceStatsSection.title}
      subtitle={agenceStatsSection.subtitle}
      className="bg-background-surface"
    >
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
        {agenceStats.map((stat, index) => (
          <BlurReveal key={stat.label} delay={index * 0.15}>
            <div className="relative flex flex-col items-center gap-2 text-center">
              <NumberMorph
                value={stat.value}
                suffix={stat.suffix}
                className="text-5xl font-mono font-black text-foreground md:text-6xl lg:text-7xl"
              />
              <span className="text-sm text-foreground/60 md:text-base">
                {stat.label}
              </span>
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-24 -translate-x-1/2 -translate-y-1/4 rounded-full bg-accent-primary/20 blur-2xl"
                aria-hidden="true"
              />
            </div>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 5.2: Commit**

```bash
git add src/components/v2/agence/AgenceStats.tsx
git commit -m "feat(v2/agence): add AgenceStats section"
```

---

## Task 6: Create AgenceTeamFull (1 per row, alternating L/R)

**Files:**
- Create: `src/components/v2/agence/AgenceTeamFull.tsx`

- [ ] **Step 6.1: Create the component**

Write `src/components/v2/agence/AgenceTeamFull.tsx`:

```tsx
// src/components/v2/agence/AgenceTeamFull.tsx
"use client";

import Image from "next/image";
import { Linkedin } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  agenceTeam,
  agenceTeamSection,
  type AgenceTeamMember,
} from "@/data/v2/agence-content";

function MemberCard({ member, index }: { member: AgenceTeamMember; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] md:min-h-[480px]">
      {/* ── Mobile: stacked image + text ── */}
      <div className="flex flex-col md:hidden">
        <div className="relative h-[320px] w-full overflow-hidden">
          <Image
            src={member.image}
            alt={`Portrait de ${member.name}`}
            fill
            className="object-contain object-bottom transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="100vw"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background-surface to-transparent dark:from-[rgba(255,255,255,0.04)]" />
        </div>

        <div className="relative z-10 flex flex-col gap-3 p-5">
          <span className="inline-flex items-center self-start rounded-full bg-accent-primary/10 px-3 py-1.5 font-mono text-sm uppercase tracking-wider text-accent-primary">
            {member.badge}
          </span>

          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">
              {member.name}
            </h3>
            <p className="mt-1 text-base font-medium text-foreground/50">
              {member.role}
            </p>
          </div>

          <p className="text-base leading-relaxed text-foreground/70">
            {member.bio}
          </p>

          <div className="mt-1 flex flex-wrap gap-2">
            {member.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-sm text-foreground/60 transition-colors duration-500 ease-in-out hover:border-accent-primary/30 hover:text-accent-primary/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 self-start text-foreground/50 transition-colors duration-500 ease-in-out hover:text-accent-primary"
            aria-label={`Profil LinkedIn de ${member.name}`}
          >
            <Linkedin className="h-5 w-5" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        </div>
      </div>

      {/* ── Desktop: side-by-side with photo bleed ── */}
      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background: isEven
            ? "linear-gradient(to right, transparent 40%, color-mix(in srgb, var(--foreground) 10%, transparent) 60%, color-mix(in srgb, var(--foreground) 18%, transparent) 100%)"
            : "linear-gradient(to left, transparent 40%, color-mix(in srgb, var(--foreground) 10%, transparent) 60%, color-mix(in srgb, var(--foreground) 18%, transparent) 100%)",
        }}
      />

      <div
        className={`pointer-events-none absolute bottom-0 hidden h-[110%] w-[55%] md:block ${
          isEven ? "right-0" : "left-0 md:-left-[4%]"
        }`}
      >
        <Image
          src={member.image}
          alt={`Portrait de ${member.name}`}
          fill
          className="object-contain object-bottom transition-transform duration-700 ease-in-out group-hover:scale-105"
          sizes="55vw"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        style={{
          background: isEven
            ? "linear-gradient(to right, var(--background-surface, var(--background)) 0%, var(--background-surface, var(--background)) 25%, color-mix(in srgb, var(--background-surface, var(--background)) 80%, transparent) 40%, color-mix(in srgb, var(--background-surface, var(--background)) 30%, transparent) 55%, transparent 70%)"
            : "linear-gradient(to left, var(--background-surface, var(--background)) 0%, var(--background-surface, var(--background)) 25%, color-mix(in srgb, var(--background-surface, var(--background)) 80%, transparent) 40%, color-mix(in srgb, var(--background-surface, var(--background)) 30%, transparent) 55%, transparent 70%)",
        }}
      />

      <div
        className={`relative z-10 hidden min-h-[480px] flex-col justify-center gap-4 p-10 md:flex lg:p-12 ${
          isEven ? "md:w-[55%]" : "md:ml-auto md:w-[55%]"
        }`}
      >
        <span className="inline-flex items-center self-start rounded-full bg-accent-primary/10 px-3 py-1.5 font-mono text-sm uppercase tracking-wider text-accent-primary">
          {member.badge}
        </span>

        <div>
          <h3 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            {member.name}
          </h3>
          <p className="mt-1 text-base font-medium text-foreground/50">
            {member.role}
          </p>
        </div>

        <p className="text-base leading-relaxed text-foreground/70 lg:text-lg">
          {member.bio}
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          {member.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground/10 bg-foreground/[0.03] px-3 py-1 text-sm text-foreground/60 transition-colors duration-500 ease-in-out hover:border-accent-primary/30 hover:text-accent-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-2 self-start text-foreground/50 transition-colors duration-500 ease-in-out hover:text-accent-primary"
          aria-label={`Profil LinkedIn de ${member.name}`}
        >
          <Linkedin className="h-5 w-5" />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

export function AgenceTeamFull() {
  return (
    <SectionContainer
      id="equipe"
      title={agenceTeamSection.title}
      subtitle={agenceTeamSection.subtitle}
    >
      <div className="flex flex-col gap-10 md:gap-14">
        {agenceTeam.map((member, index) => (
          <BlurReveal key={member.name} delay={0.1}>
            <MemberCard member={member} index={index} />
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
```

**Note on `var(--background-surface)`:** The component uses it inside CSS gradients. If the token is not declared as a CSS variable in `globals.css`, the `var()` fallback to `var(--background)` keeps the gradient working. Do not add new CSS variables unless a follow-up issue surfaces.

- [ ] **Step 6.2: Commit**

```bash
git add src/components/v2/agence/AgenceTeamFull.tsx
git commit -m "$(cat <<'EOF'
feat(v2/agence): add AgenceTeamFull section

One card per row with alternating L/R photo bleed on desktop,
stacked photo+text on mobile. Reuses BlurReveal for scroll reveal.
EOF
)"
```

---

## Task 7: Create AgenceValuesV2

**Files:**
- Create: `src/components/v2/agence/AgenceValuesV2.tsx`

- [ ] **Step 7.1: Create the component**

Write `src/components/v2/agence/AgenceValuesV2.tsx`:

```tsx
// src/components/v2/agence/AgenceValuesV2.tsx
import { Sun, Zap, Shield, Eye, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  agenceValues,
  agenceValuesSection,
  type AgenceValueCard,
} from "@/data/v2/agence-content";

const ICON_MAP: Record<AgenceValueCard["icon"], LucideIcon> = {
  Sun,
  Zap,
  Shield,
  Eye,
  Users,
};

export function AgenceValuesV2() {
  return (
    <SectionContainer
      id="valeurs"
      title={agenceValuesSection.title}
      subtitle={agenceValuesSection.subtitle}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {agenceValues.map((card, index) => {
          const Icon = ICON_MAP[card.icon];
          const isWide = card.span === 2;

          return (
            <BlurReveal
              key={card.title}
              delay={index * 0.08}
              className={isWide ? "md:col-span-2" : ""}
            >
              <div className="group flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] p-7 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-sm">
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-bold tracking-tight text-foreground md:text-xl">
                  {card.title}
                </h3>
                <p className="text-base leading-relaxed text-foreground/65">
                  {card.text}
                </p>
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 7.2: Commit**

```bash
git add src/components/v2/agence/AgenceValuesV2.tsx
git commit -m "feat(v2/agence): add AgenceValuesV2 section"
```

---

## Task 8: Create AgenceHackathons

**Files:**
- Create: `src/components/v2/agence/AgenceHackathons.tsx`

- [ ] **Step 8.1: Create the component**

Write `src/components/v2/agence/AgenceHackathons.tsx`:

```tsx
// src/components/v2/agence/AgenceHackathons.tsx
"use client";

import { Trophy, Zap, Users } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { LinkedInEmbed } from "@/components/shared/LinkedInEmbed";
import {
  agenceHackathons,
  agenceHackathonsSection,
  type AgenceHackathonCard,
  type AgenceHackathonTeammate,
} from "@/data/v2/agence-content";

function DescriptionWithTeammates({
  description,
  teammates,
}: {
  description: string;
  teammates?: AgenceHackathonTeammate[];
}) {
  if (!teammates?.length || !description.includes("{teammates}")) {
    return <>{description}</>;
  }

  const teammateLinks = teammates.map((t, i) => (
    <span key={t.name}>
      {t.linkedinUrl ? (
        <a
          href={t.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-2 transition-colors duration-500 ease-in-out hover:text-accent-primary"
        >
          {t.name}
        </a>
      ) : (
        <span className="text-foreground">{t.name}</span>
      )}
      {i < teammates.length - 1 && (i === teammates.length - 2 ? " et " : ", ")}
    </span>
  ));

  const parts = description.split("{teammates}");
  return (
    <>
      {parts[0]}
      {teammateLinks}
      {parts[1]}
    </>
  );
}

function HackathonCardContent({ card }: { card: AgenceHackathonCard }) {
  return (
    <div className="flex flex-col gap-5">
      <LinkedInEmbed url={card.linkedinEmbedUrl} />
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold text-accent-primary">
          <Trophy className="h-4 w-4" />
          {card.result}
        </span>
        <span className="text-sm text-foreground/50">{card.date}</span>
      </div>
      <h4 className="text-lg font-bold text-foreground md:text-xl">
        {card.title}
      </h4>
      <p className="text-base leading-relaxed text-foreground/65">
        <DescriptionWithTeammates
          description={card.description}
          teammates={card.teammates}
        />
      </p>
    </div>
  );
}

export function AgenceHackathons() {
  const soloCards = agenceHackathons.filter((c) => c.phase === "solo");
  const duoCard = agenceHackathons.find((c) => c.phase === "duo");

  return (
    <SectionContainer
      id="hackathons"
      eyebrow={agenceHackathonsSection.eyebrow}
      title={agenceHackathonsSection.title}
      subtitle={agenceHackathonsSection.subtitle}
      innerClassName="max-w-5xl"
    >
      {/* Phase solo */}
      <BlurReveal>
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5">
            <Zap className="h-5 w-5 text-accent-primary" />
          </div>
          <h3 className="text-lg font-semibold uppercase tracking-wide text-foreground/80 md:text-xl">
            {agenceHackathonsSection.phaseLabels.solo}
          </h3>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>
      </BlurReveal>

      <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        {soloCards.map((card, i) => (
          <BlurReveal key={card.title} delay={i * 0.2}>
            <HackathonCardContent card={card} />
          </BlurReveal>
        ))}
      </div>

      {/* Bridge */}
      <BlurReveal delay={0.2}>
        <div className="relative my-12 flex items-center justify-center md:my-16">
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-primary/30 to-transparent" />
          </div>
          <div className="relative z-10 rounded-full border border-accent-primary/20 bg-background px-6 py-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent-primary md:text-base">
              {agenceHackathonsSection.phaseLabels.bridge}
            </p>
          </div>
        </div>
      </BlurReveal>

      {/* Phase duo */}
      <BlurReveal delay={0.1}>
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-primary/20 bg-accent-primary/10">
            <Users className="h-5 w-5 text-accent-primary" />
          </div>
          <h3 className="text-lg font-semibold uppercase tracking-wide text-foreground/80 md:text-xl">
            {agenceHackathonsSection.phaseLabels.duo}
          </h3>
          <div className="h-px flex-1 bg-foreground/10" />
        </div>
      </BlurReveal>

      {duoCard && (
        <BlurReveal delay={0.3}>
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="w-full shrink-0 md:w-[45%]">
              <LinkedInEmbed url={duoCard.linkedinEmbedUrl} />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold text-accent-primary">
                  <Trophy className="h-4 w-4" />
                  {duoCard.result}
                </span>
                <span className="text-sm text-foreground/50">{duoCard.date}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground md:text-2xl">
                {duoCard.title}
              </h3>
              <p className="text-base leading-relaxed text-foreground/65">
                <DescriptionWithTeammates
                  description={duoCard.description}
                  teammates={duoCard.teammates}
                />
              </p>
            </div>
          </div>
        </BlurReveal>
      )}

      {/* Closing */}
      <BlurReveal delay={0.6}>
        <p className="mx-auto mt-16 max-w-2xl text-center text-base italic leading-relaxed text-foreground/55 md:text-lg">
          {agenceHackathonsSection.closing}
        </p>
      </BlurReveal>
    </SectionContainer>
  );
}
```

- [ ] **Step 8.2: Commit**

```bash
git add src/components/v2/agence/AgenceHackathons.tsx
git commit -m "feat(v2/agence): add AgenceHackathons section"
```

---

## Task 9: Create AgenceStack

**Files:**
- Create: `src/components/v2/agence/AgenceStack.tsx`

- [ ] **Step 9.1: Create the component**

Write `src/components/v2/agence/AgenceStack.tsx`:

```tsx
// src/components/v2/agence/AgenceStack.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  agenceStackTechnologies,
  agenceStackPhases,
  agenceStackSection,
  type AgenceStackTech,
} from "@/data/v2/agence-content";

function getTechByName(name: string): AgenceStackTech | undefined {
  return agenceStackTechnologies.find((t) => t.name === name);
}

export function AgenceStack() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileSelected, setMobileSelected] = useState<Record<string, string>>({});

  const phaseTechs = agenceStackPhases.map((phase) => ({
    ...phase,
    techs: phase.names
      .map(getTechByName)
      .filter((t): t is AgenceStackTech => t !== undefined),
  }));

  function getMobileSelected(phase: (typeof phaseTechs)[number]): string {
    return mobileSelected[phase.label] || phase.techs[0]?.name || "";
  }

  return (
    <SectionContainer
      id="stack"
      eyebrow={agenceStackSection.eyebrow}
      title={agenceStackSection.title}
      subtitle={agenceStackSection.subtitle}
      className="bg-background-surface"
    >
      <BlurReveal>
        <div className="mx-auto max-w-6xl">
          {/* Mobile */}
          <div className="flex flex-col gap-6 md:hidden">
            {phaseTechs.map((phase, phaseIndex) => {
              const selectedName = getMobileSelected(phase);
              const selectedTech = phase.techs.find((t) => t.name === selectedName);

              return (
                <div key={phase.label}>
                  <span className="mb-5 block text-center text-sm font-semibold uppercase tracking-[0.2em] text-foreground/40">
                    {phase.label}
                  </span>

                  <div className="mb-4 flex items-center justify-center gap-6">
                    {phase.techs.map((tech) => {
                      const isSelected = tech.name === selectedName;
                      return (
                        <button
                          key={tech.name}
                          className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center"
                          onClick={() =>
                            setMobileSelected((prev) => ({
                              ...prev,
                              [phase.label]: tech.name,
                            }))
                          }
                          aria-label={tech.name}
                          aria-pressed={isSelected}
                        >
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={80}
                            height={80}
                            className={[
                              "h-14 w-14 object-contain transition-all duration-500 ease-in-out",
                              isSelected ? "scale-110 opacity-100" : "opacity-40",
                            ].join(" ")}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {selectedTech && (
                    <div className="px-4 text-center transition-all duration-500 ease-in-out">
                      <p className="mb-1 text-sm font-semibold text-foreground">
                        {selectedTech.name}
                      </p>
                      <p className="text-sm leading-relaxed text-foreground/55">
                        {selectedTech.description}
                      </p>
                    </div>
                  )}

                  {phaseIndex < agenceStackPhases.length - 1 && (
                    <div className="flex flex-col items-center pt-6">
                      <svg
                        width="24"
                        height="40"
                        viewBox="0 0 24 40"
                        className="text-foreground/30"
                        aria-hidden
                      >
                        <line x1="12" y1="0" x2="12" y2="28" stroke="currentColor" strokeWidth="2" />
                        <polygon points="6,28 12,40 18,28" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop */}
          <div className="hidden flex-row items-stretch gap-0 md:flex">
            {phaseTechs.map((phase, phaseIndex) => {
              const tooltipSide = phaseIndex < 2 ? "right" : "left";

              return (
                <div key={phase.label} className="flex flex-1 flex-row items-stretch">
                  <div className="flex min-w-0 flex-1 flex-col items-center">
                    <span className="mb-8 whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] text-foreground/40">
                      {phase.label}
                    </span>
                    <div className="flex w-full flex-col items-center gap-10">
                      {phase.techs.map((tech) => {
                        const isActive = activeId === tech.name;
                        const isDimmed = activeId !== null && !isActive;

                        return (
                          <div key={tech.name} className="relative flex flex-row items-center">
                            <button
                              className="cursor-default"
                              onMouseEnter={() => setActiveId(tech.name)}
                              onMouseLeave={() => setActiveId(null)}
                              onFocus={() => setActiveId(tech.name)}
                              onBlur={() => setActiveId(null)}
                              aria-label={tech.name}
                            >
                              <Image
                                src={tech.icon}
                                alt={tech.name}
                                width={80}
                                height={80}
                                className={[
                                  "h-14 w-14 object-contain transition-all duration-500 ease-in-out lg:h-20 lg:w-20",
                                  isActive
                                    ? "scale-115 opacity-100"
                                    : isDimmed
                                    ? "opacity-25"
                                    : "opacity-60 hover:opacity-90",
                                ].join(" ")}
                              />
                            </button>

                            <div
                              className={[
                                "pointer-events-none absolute z-30",
                                "transition-all duration-500 ease-in-out",
                                tooltipSide === "right"
                                  ? "left-full top-1/2 ml-5 w-56 -translate-y-1/2 text-left"
                                  : "right-full top-1/2 mr-5 w-56 -translate-y-1/2 text-right",
                                isActive
                                  ? "translate-y-0 scale-100 opacity-100"
                                  : "translate-y-1 scale-95 opacity-0",
                              ].join(" ")}
                              role="tooltip"
                              aria-hidden={!isActive}
                            >
                              <div className="rounded-xl border border-foreground/10 bg-foreground/[0.04] px-4 py-3 shadow-lg shadow-foreground/[0.05] backdrop-blur-xl">
                                <p className="mb-1 text-sm font-semibold text-foreground">
                                  {tech.name}
                                </p>
                                <p className="text-sm leading-relaxed text-foreground/55">
                                  {tech.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {phaseIndex < agenceStackPhases.length - 1 && (
                    <div className="flex items-center justify-center px-4 pt-8">
                      <svg
                        width="40"
                        height="24"
                        viewBox="0 0 40 24"
                        className="text-foreground/30"
                        aria-hidden
                      >
                        <line x1="0" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="2" />
                        <polygon points="28,6 40,12 28,18" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
```

- [ ] **Step 9.2: Commit**

```bash
git add src/components/v2/agence/AgenceStack.tsx
git commit -m "feat(v2/agence): add AgenceStack interactive pipeline"
```

---

## Task 10: Create AgenceApproach

**Files:**
- Create: `src/components/v2/agence/AgenceApproach.tsx`

- [ ] **Step 10.1: Create the component**

Write `src/components/v2/agence/AgenceApproach.tsx`:

```tsx
// src/components/v2/agence/AgenceApproach.tsx
import { Cpu, Hammer, Handshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import {
  agenceApproach,
  agenceApproachSection,
  type AgenceApproachPillar,
} from "@/data/v2/agence-content";

const ICON_MAP: Record<AgenceApproachPillar["icon"], LucideIcon> = {
  Cpu,
  Hammer,
  Handshake,
};

const ICON_BG_MAP: Record<AgenceApproachPillar["accentColor"], string> = {
  orange: "bg-orange-500/10 text-orange-500",
  amber: "bg-amber-500/10 text-amber-500",
  cyan: "bg-cyan-500/10 text-cyan-500",
};

const ORB_GLOW_MAP: Record<AgenceApproachPillar["accentColor"], string> = {
  orange: "bg-orange-500/15",
  amber: "bg-amber-500/12",
  cyan: "bg-cyan-500/12",
};

export function AgenceApproach() {
  return (
    <SectionContainer
      id="approche"
      title={agenceApproachSection.title}
      subtitle={agenceApproachSection.subtitle}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {agenceApproach.map((pillar, index) => {
          const Icon = ICON_MAP[pillar.icon];

          return (
            <BlurReveal key={pillar.title} delay={index * 0.15} className="h-full">
              <div className="relative h-full">
                <div
                  className={`pointer-events-none absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${ORB_GLOW_MAP[pillar.accentColor]}`}
                  aria-hidden="true"
                />
                <div className="relative flex h-full flex-col items-start gap-5 rounded-2xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] p-8 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-sm md:p-10">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${ICON_BG_MAP[pillar.accentColor]}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/55 md:text-base">
                    {pillar.text}
                  </p>
                </div>
              </div>
            </BlurReveal>
          );
        })}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 10.2: Commit**

```bash
git add src/components/v2/agence/AgenceApproach.tsx
git commit -m "feat(v2/agence): add AgenceApproach 3-pillar section"
```

---

## Task 11: Create AgenceAudience

**Files:**
- Create: `src/components/v2/agence/AgenceAudience.tsx`

- [ ] **Step 11.1: Create the component**

Write `src/components/v2/agence/AgenceAudience.tsx`:

```tsx
// src/components/v2/agence/AgenceAudience.tsx
import { Check } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { agenceAudience } from "@/data/v2/agence-content";

export function AgenceAudience() {
  return (
    <SectionContainer
      id="pour-qui"
      title={agenceAudience.title}
      subtitle={agenceAudience.paragraph}
      className="bg-background-surface"
      innerClassName="max-w-3xl"
      alignHeader="left"
    >
      <ul className="mb-12 space-y-5 md:space-y-6 md:mb-16">
        {agenceAudience.items.map((item, index) => (
          <BlurReveal key={index} delay={index * 0.08}>
            <li className="flex items-start gap-4 rounded-xl p-4 transition-colors duration-500 ease-in-out hover:bg-foreground/[0.02]">
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent-primary/15">
                <Check className="h-3.5 w-3.5 text-accent-primary" />
              </div>
              <p className="text-base leading-relaxed text-foreground/75 md:text-lg">
                {item.text}
              </p>
            </li>
          </BlurReveal>
        ))}
      </ul>

      <BlurReveal>
        <p className="border-l-2 border-accent-primary/40 pl-6 text-base font-medium leading-relaxed text-foreground/70 md:text-lg">
          {agenceAudience.conclusion}
        </p>
      </BlurReveal>
    </SectionContainer>
  );
}
```

- [ ] **Step 11.2: Commit**

```bash
git add src/components/v2/agence/AgenceAudience.tsx
git commit -m "feat(v2/agence): add AgenceAudience checklist section"
```

---

## Task 12: Create AgenceFinalCTA

**Files:**
- Create: `src/components/v2/agence/AgenceFinalCTA.tsx`

- [ ] **Step 12.1: Create the component**

Write `src/components/v2/agence/AgenceFinalCTA.tsx`:

```tsx
// src/components/v2/agence/AgenceFinalCTA.tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { CalModal } from "@/components/shared/CalModal";
import { agenceFinalCTA } from "@/data/v2/agence-content";

export function AgenceFinalCTA() {
  const [calOpen, setCalOpen] = useState(false);

  return (
    <>
      <SectionContainer
        id="contact"
        className="relative overflow-hidden py-28 md:py-40"
        innerClassName="max-w-2xl"
      >
        {/* Decorative orange halo */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(
                ellipse 70% 80% at 50% 50%,
                color-mix(in srgb, var(--orange-500) 18%, transparent) 0%,
                color-mix(in srgb, var(--orange-500) 10%, transparent) 25%,
                color-mix(in srgb, var(--orange-500) 4%, transparent) 55%,
                transparent 80%
              )`,
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-5 text-center">
          <BlurReveal>
            <h2 className="font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent">
                {agenceFinalCTA.title}
              </span>
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.2} className="max-w-lg">
            <p className="text-base leading-relaxed text-foreground/60 md:text-lg">
              {agenceFinalCTA.subtitle}
            </p>
          </BlurReveal>

          <BlurReveal delay={0.3} className="mt-4">
            <button
              type="button"
              onClick={() => setCalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
            >
              {agenceFinalCTA.cta}
              <span className="transition-transform duration-500 ease-in-out">&rarr;</span>
            </button>
          </BlurReveal>

          <BlurReveal delay={0.4} className="mt-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
              {agenceFinalCTA.proofs.map((proof) => (
                <div
                  key={proof}
                  className="flex items-center gap-2 text-sm text-foreground/40"
                >
                  <Check className="h-4 w-4 flex-shrink-0 text-accent-primary" />
                  <span>{proof}</span>
                </div>
              ))}
            </div>
          </BlurReveal>
        </div>
      </SectionContainer>

      <CalModal open={calOpen} onClose={() => setCalOpen(false)} />
    </>
  );
}
```

- [ ] **Step 12.2: Verify `CalModal` API matches**

Run: `grep -n 'interface\|type.*CalModalProps\|export function CalModal' src/components/shared/CalModal.tsx`

Expected: props signature with `open: boolean` and `onClose: () => void`. If the actual signature differs (e.g., uses `isOpen` / `onOpenChange`), adjust the call site accordingly before committing. Do not invent new props on CalModal.

- [ ] **Step 12.3: Commit**

```bash
git add src/components/v2/agence/AgenceFinalCTA.tsx
git commit -m "feat(v2/agence): add AgenceFinalCTA section"
```

---

## Task 13: Recompose page.tsx

**Files:**
- Modify: `src/app/v2/agence/page.tsx`

- [ ] **Step 13.1: Rewrite the page**

Replace `src/app/v2/agence/page.tsx` with:

```tsx
// src/app/v2/agence/page.tsx
// The "L'agence" page: rich about-style narrative, ported from the legacy
// /a-propos page into the v2 design language.
import type { Metadata } from "next";
import { AgenceHero } from "@/components/v2/agence/AgenceHero";
import { AgenceStoryV2 } from "@/components/v2/agence/AgenceStoryV2";
import { AgenceStats } from "@/components/v2/agence/AgenceStats";
import { AgenceTeamFull } from "@/components/v2/agence/AgenceTeamFull";
import { AgenceValuesV2 } from "@/components/v2/agence/AgenceValuesV2";
import { AgenceHackathons } from "@/components/v2/agence/AgenceHackathons";
import { AgenceStack } from "@/components/v2/agence/AgenceStack";
import { AgenceApproach } from "@/components/v2/agence/AgenceApproach";
import { AgenceAudience } from "@/components/v2/agence/AgenceAudience";
import { AgenceFinalCTA } from "@/components/v2/agence/AgenceFinalCTA";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SubNavSetter } from "@/components/shared/SubNavContext";

export const metadata: Metadata = {
  title: "L'agence",
  description:
    "Aurentia : 20 ans d'expertise web, l'IA comme superpouvoir. L'équipe, l'histoire, la méthode.",
};

const subNavItems = [
  { label: "Histoire", sectionId: "histoire" },
  { label: "Stats", sectionId: "stats" },
  { label: "Équipe", sectionId: "equipe" },
  { label: "Valeurs", sectionId: "valeurs" },
  { label: "Hackathons", sectionId: "hackathons" },
  { label: "Stack", sectionId: "stack" },
  { label: "Approche", sectionId: "approche" },
  { label: "Pour qui", sectionId: "pour-qui" },
  { label: "Contact", sectionId: "contact" },
];

export default function AgencePage() {
  return (
    <>
      <SubNavSetter items={subNavItems} />
      <ScrollToTop />
      <AgenceHero />
      <AgenceStoryV2 />
      <AgenceStats />
      <AgenceTeamFull />
      <AgenceValuesV2 />
      <AgenceHackathons />
      <AgenceStack />
      <AgenceApproach />
      <AgenceAudience />
      <AgenceFinalCTA />
    </>
  );
}
```

- [ ] **Step 13.2: Run build (first full typecheck)**

Run: `bun run build 2>&1 | tail -60`

Expected: build succeeds. The now-orphan hub components (`AgenceComposition`, `AgenceStory`, `AgenceTeamPreview`, `AgenceWhy`, `AgenceMethod`, `AgenceFAQ`) remain on disk but are NOT imported, so their stale references to removed `agenceData.subPages`/`.story`/`.teamPreview`/etc. are tree-shaken — they don't cause a type error because unused files are still type-checked.

If the build fails because those orphan files still reference deleted fields on `agenceData`, take one of two paths (prefer option A):

**Option A — delete the orphan files** (cleaner):

```bash
git rm src/components/v2/agence/AgenceComposition.tsx \
       src/components/v2/agence/AgenceStory.tsx \
       src/components/v2/agence/AgenceTeamPreview.tsx \
       src/components/v2/agence/AgenceWhy.tsx \
       src/components/v2/agence/AgenceMethod.tsx \
       src/components/v2/agence/AgenceFAQ.tsx
```

Re-run: `bun run build 2>&1 | tail -40`

**Option B — restore minimal `subPages` / `teamPreview` / `finalCta` stubs in `agenceData`** just enough to keep the orphan files type-checking without importing them. Only do this if the user pushes back on deleting those files.

- [ ] **Step 13.3: Commit**

```bash
git add src/app/v2/agence/page.tsx
# If you deleted orphan files in 13.2, they'll already be staged via git rm.
git commit -m "$(cat <<'EOF'
feat(v2/agence): recompose L'agence page with ported narrative

Replaces the hub-style composition (Composition/Why/Method/FAQ/etc.)
with 10 narrative sections mirroring the legacy /a-propos page but
built in the v2 design language. Sub-nav updated accordingly.

Orphaned hub components are removed to keep the codebase tidy.
EOF
)"
```

---

## Task 14: Manual browser verification

**Files:** None — verification only.

- [ ] **Step 14.1: Start dev server**

Run (in background): `bun run dev`
Wait for "Ready" log line. Open `http://localhost:3000/v2/agence`.

- [ ] **Step 14.2: Visual checks — desktop**

Scroll through each of the 10 sections and verify:
- Hero: gradient spans on "20 ans" and "plus" render correctly.
- Story: 3 paragraphs, border-left accent, first sentence semibold.
- Stats: 4 counters animate on scroll via `NumberMorph`.
- Team: 4 cards, 1 per row, alternating L/R photo bleed on desktop (≥ 768px). Photos render crisp.
- Values: bento grid — first card spans 2 columns.
- Hackathons: 2 LinkedIn iframes load in solo row, 1 in duo row, bridge pill centered.
- Stack: hover on desktop icons shows tooltip with name + description; dimming on siblings works.
- Approach: 3 pillar cards with orange/amber/cyan accents, glow orbs behind.
- Audience: checklist with Check icons, conclusion block with left border.
- Final CTA: "Réserver mon call gratuit" button opens `CalModal`.
- Sub-nav tags in hero scroll smoothly to target sections.

- [ ] **Step 14.3: Visual checks — mobile (375px)**

Use DevTools responsive mode at 375 px and verify:
- Hero stacks correctly, tags wrap.
- Team cards: photo stacked on top, text below. No side-bleed on mobile.
- Stack: vertical per-phase layout, tap switches tech description.
- Approach: single column.
- All touch targets ≥ 44 px (Lucide icons + LinkedIn links).

- [ ] **Step 14.4: Light + dark theme**

Toggle the theme (existing app toggler) and verify every section renders correctly in both. Particularly check:
- Team card: gradient fade from background-surface works in both themes.
- Cards: borders invisible in light, subtle in dark (per commit 521659d convention).
- Stack tooltips: background blur readable in both.
- Orange halo on Hero + Final CTA renders softly in both.

- [ ] **Step 14.5: Verify unrelated pages still work**

Hit each of these in the browser:
- `/` (initial homepage)
- `/a-propos` (initial about page — must still render, untouched)
- `/v2` (v2 homepage)
- `/v2/agence/a-propos` (v2 about page — must still render, untouched)

If any is broken, something unintended was imported or removed. Investigate before reporting done.

- [ ] **Step 14.6: Stop dev server, final commit if needed**

If any tweak was needed during verification (typos, copy adjustments), commit it:

```bash
git status
# if changes exist:
git add <touched files>
git commit -m "fix(v2/agence): visual polish after manual review"
```

Otherwise, nothing to do here. The previous Task 13 commit is the final state.

---

## Self-Review

**Spec coverage (10 sections):** all 10 sections from the spec have a dedicated Task (4 through 12) plus Task 13 composing them. Sub-nav (spec §3) is in Task 13. Data port (spec §5) is Task 1. Hero update (spec §4.1) is Task 3. Light/dark + responsive + a11y (spec §6-9) are verified in Task 14.

**Placeholders:** no "TBD"/"TODO". The only forward-looking note is Step 12.2 (verify CalModal API) — that's an explicit verification step, not a placeholder; if the API differs, the engineer adjusts before committing.

**Type consistency checked:**
- `AgenceValueCard["icon"]` / `AgenceApproachPillar["icon"]` / `AgenceApproachPillar["accentColor"]` used consistently across data file and components.
- `CalModal` props (`open` + `onClose`) assumed — Step 12.2 verifies before commit.
- All section ids consistent between hero tags (Task 3), sub-nav (Task 13), and section components (Tasks 4-12): `histoire`, `stats`, `equipe`, `valeurs`, `hackathons`, `stack`, `approche`, `pour-qui`, `contact`.
- `var(--background-surface)` usage in Task 6 gradient: has `var(--background)` fallback so the gradient still works even if the custom property isn't registered — no hard dependency introduced.

**Risk acknowledged:** Task 13 Step 2 surfaces the orphan-component issue explicitly, with deletion (option A) as the recommended fix.
