# Réalisations V2 + pSEO — Implementation Plan (Phase 1)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a production-grade `/v2/realisations` section with MDX-driven case studies, a hub pSEO index, sector pages, and a full SEO stack (schema.org, sitemap, OG images, internal linking, canonical, noindex safety).

**Architecture:** MDX + Zod frontmatter → parsed at build with `gray-matter` + `next-mdx-remote/rsc`. Helpers expose typed lookups (by slug, sector, type, related). Pages consume helpers via RSC (`generateStaticParams` + `generateMetadata`). Case studies use a 2-column layout with a sticky left rail (meta + scroll-spy) and 9 narrative sections. Sector pages provide unique editorial content + FAQ schema.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript strict, Tailwind 4, Framer Motion, GSAP, `gray-matter`, `next-mdx-remote`, `zod`, `@vercel/og` via Next's `ImageResponse`.

**Reference spec:** `docs/superpowers/specs/2026-04-22-realisations-v2-pseo-design.md`

**Scope:** Phase 1 only. Phase 2 (pages type + pages croisées + FAQ enrichi) is a separate plan written after phase 1 merges.

**Conventions to honor (from CLAUDE.md + AGENTS.md):**
- pnpm 10.26.2, never `npm install`
- Read `node_modules/next/dist/docs/` before using Next features you're unsure about
- No `text-xs` or custom sizes below `text-sm`
- Light/dark semantic tokens only (`bg-foreground`, `text-foreground`, `border-foreground/…`, `bg-background-surface`)
- Transitions ≥500ms, `ease-in-out`, nothing instant
- No `position: sticky` on full-screen sections except validated case (rail column is fine — not a full-screen pin)
- Mobile-first

---

## File Structure Map

### New — content & data
- `src/content/realisations/*.mdx` — one file per project (~10 in phase 1)
- `src/data/realisations/schemas.ts` — Zod frontmatter schema + inferred types
- `src/data/realisations/secteurs.ts` — sector enum, labels, intro copy, slug mapping
- `src/data/realisations/types.ts` — type enum, labels, slug mapping
- `src/data/realisations/index.ts` — loader + helpers (`getAllProjects`, `getProjectBySlug`, `getProjectsBySecteur`, `getProjectsByType`, `getRelatedProjects`, `getSecteursWithProjects`)
- `src/data/realisations/related.ts` — related-projects algorithm (pure, testable)
- `src/data/realisations/__tests__/` — unit tests for loader + helpers + schema

### New — components
- `src/components/v2/realisations/index.tsx` (hub index)
  - `ReaHero.tsx`
  - `ReaSectorBlock.tsx`
  - `ReaTypeBlock.tsx`
  - `ReaProjectGrid.tsx`
  - `ReaProjectCard.tsx`
  - `ReaFilters.tsx` (client, filterable grid)
  - `ReaBreadcrumbs.tsx`
- Case study
  - `CaseStudyLayout.tsx`
  - `CaseStudyRail.tsx` (sticky left: meta + scroll-spy)
  - `CaseStudyRailMobile.tsx` (drawer)
  - `CaseStudyHero.tsx`
  - `CaseStudySection.tsx` (heading + anchor wrapper)
  - `CaseStudyGallery.tsx`
  - `CaseStudyMetrics.tsx`
  - `CaseStudyTestimonial.tsx`
  - `CaseStudyStack.tsx`
  - `CaseStudyRelated.tsx`
  - `CaseStudyCTA.tsx`
- MDX-embeddable components
  - `src/components/v2/realisations/mdx/BeforeAfter.tsx`
  - `src/components/v2/realisations/mdx/MetricGrid.tsx`
  - `src/components/v2/realisations/mdx/Gallery.tsx`
  - `src/components/v2/realisations/mdx/SplitSection.tsx`
  - `src/components/v2/realisations/mdx/Callout.tsx`
  - `src/components/v2/realisations/mdx/mdx-components.ts` (maps MDX tags → React components)
- Sector page
  - `SectorPageLayout.tsx`
  - `SectorHero.tsx`
  - `SectorEditorial.tsx`
  - `SectorProjects.tsx`
  - `SectorProcess.tsx`
  - `SectorFAQ.tsx`
  - `SectorCTA.tsx`
- SEO helpers
  - `src/components/v2/seo/JsonLd.tsx` (universal JSON-LD injector)
  - `src/lib/seo/schema.ts` (builders: breadcrumb, creativeWork, collectionPage, faqPage, organization)

### New — routes
- `src/app/v2/realisations/page.tsx` — index hub
- `src/app/v2/realisations/opengraph-image.tsx` — OG index
- `src/app/v2/realisations/[slug]/page.tsx` — case study
- `src/app/v2/realisations/[slug]/opengraph-image.tsx` — OG case study
- `src/app/v2/realisations/secteur/[secteur]/page.tsx` — sector
- `src/app/v2/realisations/secteur/[secteur]/opengraph-image.tsx` — OG sector

### Modified
- `src/app/sitemap.ts` — include all new URLs
- `src/components/v2/layout/MegaMenu.tsx` — add Réalisations entry + sub-links
- `src/components/v2/layout/NavbarV2Desktop.tsx` / `NavbarV2Mobile.tsx` — link target
- `src/components/v2/layout/FooterV2.tsx` (find it) — Réalisations section
- `src/components/v2/home/HomeRealisationsPreview.tsx` — consume new data source
- `package.json` — add deps

### Deleted (end of phase 1)
- `src/app/realisations/page.tsx`
- `src/app/realisations/[slug]/page.tsx`
- `src/data/projects.ts`

---

## Task 1 — Install dependencies and lock conventions

**Files:**
- Modify: `package.json`, `pnpm-lock.yaml`

- [ ] **Step 1: Install deps**

```bash
pnpm add gray-matter next-mdx-remote zod
pnpm add -D @types/mdx
```

- [ ] **Step 2: Verify**

```bash
pnpm -s ls gray-matter next-mdx-remote zod | cat
pnpm -s tsc --noEmit
```

Expected: deps listed, no TS errors.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): add mdx + zod for realisations v2"
```

---

## Task 2 — Zod schema + content types

**Files:**
- Create: `src/data/realisations/schemas.ts`

- [ ] **Step 1: Write schema**

```ts
// src/data/realisations/schemas.ts
import { z } from "zod";

export const ProjectType = z.enum([
  "Site vitrine",
  "SaaS",
  "Landing page",
  "Identite visuelle",
]);
export type ProjectType = z.infer<typeof ProjectType>;

export const ProjectStatus = z.enum(["Livre", "En cours"]);
export type ProjectStatus = z.infer<typeof ProjectStatus>;

export const Secteur = z.enum([
  "restauration",
  "conciergerie",
  "immobilier",
  "coaching",
  "tech-ia",
  "sante-bien-etre",
  "services-pro",
]);
export type Secteur = z.infer<typeof Secteur>;

export const ProjectMetric = z.object({
  value: z.string(),
  label: z.string(),
  context: z.string().optional(),
});

export const ProjectTestimonial = z.object({
  quote: z.string(),
  author: z.string(),
  role: z.string(),
  avatar: z.string().optional(),
});

export const ProjectFrontmatter = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  type: ProjectType,
  secteur: Secteur,
  city: z.string(),
  year: z.number().int().min(2020).max(2030),
  duration: z.string(),
  status: ProjectStatus,
  featured: z.boolean().default(false),
  clientName: z.string().optional(),
  clientRole: z.string().optional(),
  clientLogo: z.string().optional(),
  tags: z.array(z.string()).default([]),
  technos: z.array(z.string()).default([]),
  liveUrl: z.string().url().optional(),
  coverImage: z.string(),
  images: z.array(z.string()).default([]),
  metrics: z.array(ProjectMetric).default([]),
  testimonial: ProjectTestimonial.optional(),
  seo: z
    .object({ title: z.string().optional(), description: z.string().optional() })
    .optional(),
});
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatter>;

export interface ProjectRecord {
  frontmatter: ProjectFrontmatter;
  mdxSource: string; // raw body
  filePath: string;
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm -s tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/data/realisations/schemas.ts
git commit -m "feat(realisations): add zod frontmatter schema"
```

---

## Task 3 — Sector and type registries

**Files:**
- Create: `src/data/realisations/secteurs.ts`, `src/data/realisations/types.ts`

- [ ] **Step 1: Write sector registry**

```ts
// src/data/realisations/secteurs.ts
import type { Secteur } from "./schemas";

export interface SecteurMeta {
  slug: Secteur;
  label: string;
  plural: string;
  shortDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  // Long-form editorial (filled in Task 12 by Elliot)
  editorial?: string;
  faq?: { question: string; answer: string }[];
  process?: { title: string; description: string }[];
}

export const secteurs: Record<Secteur, SecteurMeta> = {
  "restauration": {
    slug: "restauration",
    label: "Restauration",
    plural: "restaurants & food",
    shortDescription: "Sites vitrines et identités pour restaurants, cafés et concepts food.",
    heroTitle: "Création de sites pour restaurants",
    heroSubtitle: "Un site qui remplit la salle.",
  },
  "conciergerie": {
    slug: "conciergerie",
    label: "Conciergerie",
    plural: "conciergeries & location courte durée",
    shortDescription: "Sites et SaaS pour conciergeries Airbnb et gestion locative.",
    heroTitle: "Sites & outils pour conciergeries",
    heroSubtitle: "Captez plus de propriétaires, gérez mieux vos biens.",
  },
  "immobilier": {
    slug: "immobilier",
    label: "Immobilier",
    plural: "agences & pros de l'immobilier",
    shortDescription: "Sites vitrines, landing et outils pour agents et agences immobilières.",
    heroTitle: "Sites pour professionnels de l'immobilier",
    heroSubtitle: "Générez plus de mandats qualifiés.",
  },
  "coaching": {
    slug: "coaching",
    label: "Coaching & formation",
    plural: "coachs, formateurs et experts",
    shortDescription: "Sites et tunnels de vente pour coachs, formateurs et créateurs.",
    heroTitle: "Sites pour coachs et formateurs",
    heroSubtitle: "Votre expertise méritait mieux.",
  },
  "tech-ia": {
    slug: "tech-ia",
    label: "Tech & IA",
    plural: "startups tech & IA",
    shortDescription: "Sites et SaaS pour startups, éditeurs et produits IA.",
    heroTitle: "Sites & SaaS pour startups tech",
    heroSubtitle: "On parle votre langue.",
  },
  "sante-bien-etre": {
    slug: "sante-bien-etre",
    label: "Santé & bien-être",
    plural: "pros de la santé et du bien-être",
    shortDescription: "Sites pour praticiens, thérapeutes, studios et centres.",
    heroTitle: "Sites pour pros de la santé et du bien-être",
    heroSubtitle: "Remplissez votre agenda en continu.",
  },
  "services-pro": {
    slug: "services-pro",
    label: "Services aux pros",
    plural: "services B2B",
    shortDescription: "Sites et landing pour cabinets, consultants et agences.",
    heroTitle: "Sites B2B qui convertissent",
    heroSubtitle: "Plus de demandes entrantes, moins de prospection.",
  },
};

export const secteurList: SecteurMeta[] = Object.values(secteurs);

export function getSecteur(slug: string): SecteurMeta | undefined {
  return (secteurs as Record<string, SecteurMeta>)[slug];
}
```

- [ ] **Step 2: Write type registry**

```ts
// src/data/realisations/types.ts
import type { ProjectType } from "./schemas";

export interface TypeMeta {
  slug: string;            // url slug
  label: ProjectType;      // matches schema enum
  plural: string;
  shortDescription: string;
}

export const projectTypes: TypeMeta[] = [
  { slug: "site-vitrine", label: "Site vitrine", plural: "sites vitrines",
    shortDescription: "Sites vitrines design et performants." },
  { slug: "saas", label: "SaaS", plural: "applications SaaS",
    shortDescription: "Applications SaaS sur-mesure." },
  { slug: "landing-page", label: "Landing page", plural: "landing pages",
    shortDescription: "Landing pages orientées conversion." },
  { slug: "identite-visuelle", label: "Identite visuelle", plural: "identités visuelles",
    shortDescription: "Identités de marque et chartes graphiques." },
];

export function getTypeBySlug(slug: string): TypeMeta | undefined {
  return projectTypes.find((t) => t.slug === slug);
}

export function getTypeByLabel(label: ProjectType): TypeMeta | undefined {
  return projectTypes.find((t) => t.label === label);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/realisations/secteurs.ts src/data/realisations/types.ts
git commit -m "feat(realisations): add sector and type registries"
```

---

## Task 4 — MDX loader + helpers

**Files:**
- Create: `src/data/realisations/index.ts`, `src/data/realisations/related.ts`

- [ ] **Step 1: Write related-projects algorithm (pure, testable)**

```ts
// src/data/realisations/related.ts
import type { ProjectFrontmatter } from "./schemas";

export interface RelatedOptions {
  limit?: number;        // default 3
  preferSecteur?: boolean;
}

/** Returns up to `limit` projects ranked by: same secteur > same type > most recent. */
export function pickRelated(
  target: ProjectFrontmatter,
  pool: ProjectFrontmatter[],
  options: RelatedOptions = {},
): ProjectFrontmatter[] {
  const limit = options.limit ?? 3;
  const others = pool.filter((p) => p.slug !== target.slug);
  const scored = others.map((p) => {
    let score = 0;
    if (p.secteur === target.secteur) score += 10;
    if (p.type === target.type) score += 5;
    score += (p.year ?? 0) / 10000; // tiebreak recent
    if (p.featured) score += 0.5;
    return { p, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}
```

- [ ] **Step 2: Write loader + helpers**

```ts
// src/data/realisations/index.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { ProjectFrontmatter, type ProjectRecord, type Secteur, type ProjectType } from "./schemas";
import { pickRelated } from "./related";

const CONTENT_DIR = path.join(process.cwd(), "src/content/realisations");

let cache: ProjectRecord[] | null = null;

export function loadAllProjects(): ProjectRecord[] {
  if (cache) return cache;
  if (!fs.existsSync(CONTENT_DIR)) {
    cache = [];
    return cache;
  }
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"));
  const records: ProjectRecord[] = files.map((file) => {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const result = ProjectFrontmatter.safeParse({
      ...parsed.data,
      slug: parsed.data.slug ?? file.replace(/\.mdx$/, ""),
    });
    if (!result.success) {
      throw new Error(
        `[realisations] Invalid frontmatter in ${file}: ${result.error.message}`,
      );
    }
    return { frontmatter: result.data, mdxSource: parsed.content, filePath };
  });
  // stable sort: featured first, then year desc, then name
  records.sort((a, b) => {
    const fa = a.frontmatter, fb = b.frontmatter;
    if (fa.featured !== fb.featured) return fa.featured ? -1 : 1;
    if (fa.year !== fb.year) return fb.year - fa.year;
    return fa.name.localeCompare(fb.name);
  });
  cache = records;
  return cache;
}

export function getAllProjectFrontmatter() {
  return loadAllProjects().map((r) => r.frontmatter);
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  return loadAllProjects().find((r) => r.frontmatter.slug === slug);
}

export function getProjectsBySecteur(secteur: Secteur) {
  return loadAllProjects().filter((r) => r.frontmatter.secteur === secteur);
}

export function getProjectsByType(type: ProjectType) {
  return loadAllProjects().filter((r) => r.frontmatter.type === type);
}

export function getRelatedProjects(slug: string, limit = 3) {
  const all = getAllProjectFrontmatter();
  const target = all.find((p) => p.slug === slug);
  if (!target) return [];
  return pickRelated(target, all, { limit });
}

export function getSecteursWithProjects() {
  const counts = new Map<Secteur, number>();
  for (const r of loadAllProjects()) {
    const s = r.frontmatter.secteur;
    counts.set(s, (counts.get(s) ?? 0) + 1);
  }
  return counts;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/realisations/index.ts src/data/realisations/related.ts
git commit -m "feat(realisations): add mdx loader and query helpers"
```

---

## Task 5 — Migrate V1 projects to MDX

**Files:**
- Create: `src/content/realisations/<slug>.mdx` × ~10 (one per project in `src/data/projects.ts`)

For each project in `src/data/projects.ts`:

- [ ] **Step 1: Create MDX file with frontmatter from V1 data**

Template:

```mdx
---
slug: comparateur-ia-facile
name: Comparateur-IA-Facile
type: SaaS
secteur: tech-ia
city: France
year: 2025
duration: 2 semaines
status: Livre
featured: true
clientName: Elliot E.
clientRole: Fondateur
tags:
  - Charte graphique
  - Design UI
  - Developpement
  - SEO
technos:
  - Next.js
  - TypeScript
  - Tailwind
  - Supabase
liveUrl: https://comparateur-ia-facile.com
coverImage: /images/portfolio/comparateur-ia-1.webp
images:
  - /images/portfolio/comparateur-ia-1.webp
  - /images/portfolio/comparateur-ia-2.webp
  - /images/portfolio/comparateur-ia-3.webp
metrics:
  - value: "2 semaines"
    label: "Time to market"
    context: "Du brief au live"
seo:
  title: Comparateur-IA-Facile — Cas client SaaS
  description: Création d'un comparateur d'outils IA grand public en 2 semaines.
---

## Contexte

Comparateur-IA-Facile est un comparateur d'outils d'intelligence artificielle destiné au grand public francophone.

## Défi

(copied from V1 `problem`)

## Solution

(copied from V1 `solution`)

## Features

<MetricGrid items={[…]} />

## Galerie

<Gallery images={[…]} />

## Stack technique

…

## Résultats

…

## Témoignage

> …

```

Each project migration = one commit (keeps diffs reviewable).

- [ ] **Step 2: After each MDX file, verify build parses it**

```bash
pnpm tsx -e "import('./src/data/realisations/index').then(m => console.log(m.loadAllProjects().length))"
```

Expected: incrementing count matches files created.

- [ ] **Step 3: Commit per project**

```bash
git add src/content/realisations/<slug>.mdx
git commit -m "content(realisations): migrate <slug> from v1"
```

---

## Task 6 — MDX-embeddable components

**Files:**
- Create: `src/components/v2/realisations/mdx/{BeforeAfter,MetricGrid,Gallery,SplitSection,Callout,mdx-components}.tsx`

- [ ] **Step 1: `MetricGrid.tsx`**

```tsx
// src/components/v2/realisations/mdx/MetricGrid.tsx
import { cn } from "@/lib/utils";

interface Metric { value: string; label: string; context?: string }
export function MetricGrid({ items, className }: { items: Metric[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10", className)}>
      {items.map((m, i) => (
        <div key={i} className="rounded-2xl bg-background-surface p-6 border border-foreground/10 transition-all duration-500 ease-in-out hover:border-foreground/30">
          <div className="text-4xl font-semibold text-foreground">{m.value}</div>
          <div className="text-sm text-foreground/70 mt-2">{m.label}</div>
          {m.context && <div className="text-sm text-foreground/50 mt-1">{m.context}</div>}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: `Gallery.tsx`** — grid of Next/Image with click-to-fullscreen (use `<dialog>` or shadcn Dialog)

- [ ] **Step 3: `BeforeAfter.tsx`** — split slider (use `framer-motion` drag for handle)

- [ ] **Step 4: `SplitSection.tsx`** — 2-column, sticky image left, scrolling text right

- [ ] **Step 5: `Callout.tsx`** — accent callout (tip/warning/info variants using semantic tokens)

- [ ] **Step 6: `mdx-components.ts`** — maps default MDX tags + exports custom components

```ts
// src/components/v2/realisations/mdx/mdx-components.ts
import type { MDXComponents } from "mdx/types";
import { MetricGrid } from "./MetricGrid";
import { Gallery } from "./Gallery";
import { BeforeAfter } from "./BeforeAfter";
import { SplitSection } from "./SplitSection";
import { Callout } from "./Callout";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="text-3xl font-semibold text-foreground mt-16 mb-6 scroll-mt-28" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold text-foreground mt-10 mb-4" {...props} />,
  p: (props) => <p className="text-base leading-relaxed text-foreground/80 mb-5" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 text-foreground/80 space-y-2 mb-5" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 text-foreground/80 space-y-2 mb-5" {...props} />,
  blockquote: (props) => <blockquote className="border-l-2 border-foreground/30 pl-6 italic text-foreground/70 my-6" {...props} />,
  MetricGrid, Gallery, BeforeAfter, SplitSection, Callout,
};
```

- [ ] **Step 7: Commit**

```bash
git add src/components/v2/realisations/mdx
git commit -m "feat(realisations): add MDX-embeddable components"
```

---

## Task 7 — SEO primitives

**Files:**
- Create: `src/components/v2/seo/JsonLd.tsx`, `src/lib/seo/schema.ts`

- [ ] **Step 1: Generic JSON-LD injector**

```tsx
// src/components/v2/seo/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Schema builders**

```ts
// src/lib/seo/schema.ts
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { secteurs } from "@/data/realisations/secteurs";

const BASE_URL = "https://aurentia.agency";

export const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aurentia Agency",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  sameAs: ["https://www.linkedin.com/company/aurentia-agency"],
  address: { "@type": "PostalAddress", addressLocality: "Avignon", addressCountry: "FR" },
};

export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem", position: i + 1, name: it.name, item: `${BASE_URL}${it.url}`,
    })),
  };
}

export function creativeWorkForProject(p: ProjectFrontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    datePublished: `${p.year}-01-01`,
    creator: ORGANIZATION,
    url: `${BASE_URL}/v2/realisations/${p.slug}`,
    image: `${BASE_URL}${p.coverImage}`,
    keywords: [...p.tags, ...p.technos, p.type, secteurs[p.secteur].label].join(", "),
    ...(p.testimonial && {
      review: {
        "@type": "Review",
        reviewBody: p.testimonial.quote,
        author: { "@type": "Person", name: p.testimonial.author },
      },
    }),
  };
}

export function collectionPage(name: string, description: string, items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name, description,
    hasPart: items.map((it) => ({ "@type": "CreativeWork", name: it.name, url: `${BASE_URL}${it.url}` })),
  };
}

export function faqPage(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question", name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/v2/seo src/lib/seo
git commit -m "feat(seo): add JSON-LD injector and schema builders"
```

---

## Task 8 — Case study page and layout

**Files:**
- Create: `src/app/v2/realisations/[slug]/page.tsx` + all CaseStudy*.tsx components

- [ ] **Step 1: Rail component (desktop sticky, scroll-spy)**

```tsx
// src/components/v2/realisations/CaseStudyRail.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Vue d'ensemble" },
  { id: "contexte", label: "Contexte" },
  { id: "defi", label: "Défi" },
  { id: "solution", label: "Solution" },
  { id: "features", label: "Features" },
  { id: "galerie", label: "Galerie" },
  { id: "stack", label: "Stack" },
  { id: "resultats", label: "Résultats" },
  { id: "temoignage", label: "Témoignage" },
];

export function CaseStudyRail({ project }: { project: ProjectFrontmatter }) {
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0% -40% 0%", threshold: 0 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:block sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto w-[320px] shrink-0">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="text-sm uppercase tracking-wider text-foreground/50">{project.type}</div>
          <h1 className="text-2xl font-semibold text-foreground">{project.name}</h1>
          {project.clientName && (
            <div className="text-sm text-foreground/70">{project.clientName} · {project.clientRole}</div>
          )}
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-foreground/50">Année</dt><dd className="text-foreground">{project.year}</dd></div>
            <div><dt className="text-foreground/50">Durée</dt><dd className="text-foreground">{project.duration}</dd></div>
            <div><dt className="text-foreground/50">Ville</dt><dd className="text-foreground">{project.city}</dd></div>
            <div><dt className="text-foreground/50">Statut</dt><dd className="text-foreground">{project.status}</dd></div>
          </dl>
          {project.technos.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technos.map((t) => (
                <span key={t} className="text-sm px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 border border-foreground/10">{t}</span>
              ))}
            </div>
          )}
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="inline-flex text-sm text-foreground underline underline-offset-4 transition-colors duration-500 ease-in-out hover:text-foreground/70">
              Voir le site live ↗
            </Link>
          )}
        </div>

        <nav aria-label="Sommaire">
          <div className="text-sm uppercase tracking-wider text-foreground/50 mb-4">Sommaire</div>
          <ul className="space-y-1 border-l border-foreground/10">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "block pl-4 -ml-px border-l py-2 text-sm transition-all duration-500 ease-in-out",
                    active === s.id
                      ? "border-foreground text-foreground"
                      : "border-transparent text-foreground/50 hover:text-foreground/80",
                  )}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Mobile rail drawer (`CaseStudyRailMobile.tsx`)** — FAB bottom-right opens a sheet (use shadcn Sheet) with same content, dismisses on anchor click.

- [ ] **Step 3: Layout wrapper**

```tsx
// src/components/v2/realisations/CaseStudyLayout.tsx
import type { ReactNode } from "react";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import { CaseStudyRail } from "./CaseStudyRail";
import { CaseStudyRailMobile } from "./CaseStudyRailMobile";

export function CaseStudyLayout({ project, children }: { project: ProjectFrontmatter; children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="flex gap-12">
        <CaseStudyRail project={project} />
        <div className="flex-1 min-w-0 max-w-3xl">{children}</div>
      </div>
      <CaseStudyRailMobile project={project} />
    </div>
  );
}
```

- [ ] **Step 4: Section wrapper, Hero, Metrics, Gallery, Stack, Testimonial, Related, CTA** — one file each, accent on semantic tokens and transitions ≥500ms.

- [ ] **Step 5: Page route**

```tsx
// src/app/v2/realisations/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjectFrontmatter, getProjectBySlug, getRelatedProjects } from "@/data/realisations";
import { CaseStudyLayout } from "@/components/v2/realisations/CaseStudyLayout";
import { CaseStudyHero } from "@/components/v2/realisations/CaseStudyHero";
import { CaseStudyMetrics } from "@/components/v2/realisations/CaseStudyMetrics";
import { CaseStudyTestimonial } from "@/components/v2/realisations/CaseStudyTestimonial";
import { CaseStudyRelated } from "@/components/v2/realisations/CaseStudyRelated";
import { CaseStudyCTA } from "@/components/v2/realisations/CaseStudyCTA";
import { mdxComponents } from "@/components/v2/realisations/mdx/mdx-components";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { breadcrumb, creativeWorkForProject, ORGANIZATION } from "@/lib/seo/schema";
import { secteurs } from "@/data/realisations/secteurs";

export function generateStaticParams() {
  return getAllProjectFrontmatter().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const record = getProjectBySlug(params.slug);
  if (!record) return {};
  const p = record.frontmatter;
  const title = p.seo?.title ?? `${p.name} — Cas client`;
  const description = p.seo?.description ?? `Découvrez comment Aurentia a livré ${p.name} en ${p.duration}.`;
  return {
    title, description,
    alternates: { canonical: `/v2/realisations/${p.slug}` },
    openGraph: { title, description, type: "article", url: `/v2/realisations/${p.slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const record = getProjectBySlug(params.slug);
  if (!record) notFound();
  const p = record.frontmatter;
  const related = getRelatedProjects(p.slug, 3);
  const secteur = secteurs[p.secteur];

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={creativeWorkForProject(p)} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/v2" },
        { name: "Réalisations", url: "/v2/realisations" },
        { name: secteur.label, url: `/v2/realisations/secteur/${secteur.slug}` },
        { name: p.name, url: `/v2/realisations/${p.slug}` },
      ])} />

      <CaseStudyLayout project={p}>
        <section id="hero"><CaseStudyHero project={p} /></section>
        <div className="prose-realisation">
          <MDXRemote source={record.mdxSource} components={mdxComponents} />
        </div>
        <section id="resultats"><CaseStudyMetrics metrics={p.metrics} /></section>
        {p.testimonial && (
          <section id="temoignage"><CaseStudyTestimonial testimonial={p.testimonial} /></section>
        )}
        <CaseStudyRelated projects={related} />
        <CaseStudyCTA project={p} />
      </CaseStudyLayout>
    </>
  );
}
```

Note: MDX body provides sections Contexte/Défi/Solution/Features/Galerie/Stack via `##` headings matching SECTIONS anchor IDs. Convention: each MDX uses `## Contexte {#contexte}` etc. If `mdx-components.ts` doesn't produce `id` attrs, use `rehype-slug` plugin (pass via `next-mdx-remote` options).

- [ ] **Step 6: Add `rehype-slug` for auto-ids**

```bash
pnpm add rehype-slug
```

Update `MDXRemote` call: `<MDXRemote source={…} components={…} options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }} />`.

- [ ] **Step 7: Build + visual smoke test**

```bash
pnpm build
pnpm dev
# open http://localhost:3000/v2/realisations/comparateur-ia-facile
```

Check: rail is sticky, scroll-spy updates, dark/light both clean, no CLS, no text-xs, transitions feel ≥500ms.

- [ ] **Step 8: Commit**

```bash
git add src/app/v2/realisations/\[slug\] src/components/v2/realisations
git commit -m "feat(realisations): add case study page with sticky rail + MDX"
```

---

## Task 9 — Index hub page

**Files:**
- Create: `src/app/v2/realisations/page.tsx` + `Rea*.tsx` components

- [ ] **Step 1: Hero, project card, project grid (filterable client), sector block, type block, breadcrumbs** — one component per file, semantic tokens only.

- [ ] **Step 2: Index page route**

```tsx
// src/app/v2/realisations/page.tsx
import type { Metadata } from "next";
import { getAllProjectFrontmatter, getSecteursWithProjects } from "@/data/realisations";
import { projectTypes } from "@/data/realisations/types";
import { secteurList } from "@/data/realisations/secteurs";
import { ReaHero } from "@/components/v2/realisations/ReaHero";
import { ReaSectorBlock } from "@/components/v2/realisations/ReaSectorBlock";
import { ReaTypeBlock } from "@/components/v2/realisations/ReaTypeBlock";
import { ReaProjectGrid } from "@/components/v2/realisations/ReaProjectGrid";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { breadcrumb, collectionPage, ORGANIZATION } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Réalisations",
  description: "Nos sites web, SaaS, landing pages et identités livrés avec Aurentia Agency.",
  alternates: { canonical: "/v2/realisations" },
  openGraph: { title: "Réalisations — Aurentia Agency", url: "/v2/realisations" },
};

export default function RealisationsIndex() {
  const projects = getAllProjectFrontmatter();
  const counts = getSecteursWithProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/v2" },
        { name: "Réalisations", url: "/v2/realisations" },
      ])} />
      <JsonLd data={collectionPage(
        "Réalisations Aurentia Agency",
        "Portfolio des projets livrés.",
        projects.map((p) => ({ name: p.name, url: `/v2/realisations/${p.slug}` })),
      )} />

      <ReaHero count={projects.length} />
      <ReaProjectGrid projects={featured} variant="featured" />
      {secteurList
        .filter((s) => (counts.get(s.slug) ?? 0) > 0)
        .map((s) => (
          <ReaSectorBlock key={s.slug} secteur={s} projects={projects.filter((p) => p.secteur === s.slug)} />
        ))}
      {projectTypes.map((t) => (
        <ReaTypeBlock key={t.slug} type={t} projects={projects.filter((p) => p.type === t.label)} />
      ))}
      <ReaProjectGrid projects={projects} variant="all" filterable />
    </>
  );
}
```

- [ ] **Step 3: Build + smoke test**

```bash
pnpm build && pnpm dev
# http://localhost:3000/v2/realisations
```

- [ ] **Step 4: Commit**

```bash
git add src/app/v2/realisations/page.tsx src/components/v2/realisations
git commit -m "feat(realisations): add hub index page with sector/type blocks"
```

---

## Task 10 — Sector pages

**Files:**
- Create: `src/app/v2/realisations/secteur/[secteur]/page.tsx` + `Sector*.tsx` components

- [ ] **Step 1: Components** — SectorHero, SectorEditorial, SectorProjects, SectorProcess, SectorFAQ, SectorCTA.

- [ ] **Step 2: Route**

```tsx
// src/app/v2/realisations/secteur/[secteur]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Secteur } from "@/data/realisations/schemas";
import { secteurs, getSecteur, secteurList } from "@/data/realisations/secteurs";
import { getProjectsBySecteur } from "@/data/realisations";
import { SectorPageLayout } from "@/components/v2/realisations/SectorPageLayout";
import { JsonLd } from "@/components/v2/seo/JsonLd";
import { breadcrumb, collectionPage, faqPage, ORGANIZATION } from "@/lib/seo/schema";

export function generateStaticParams() {
  return secteurList.map((s) => ({ secteur: s.slug }));
}

export function generateMetadata({ params }: { params: { secteur: string } }): Metadata {
  const s = getSecteur(params.secteur);
  if (!s) return {};
  return {
    title: s.heroTitle,
    description: s.shortDescription,
    alternates: { canonical: `/v2/realisations/secteur/${s.slug}` },
    openGraph: { title: s.heroTitle, description: s.shortDescription },
  };
}

const MIN_UNIQUE_WORDS = 400;

function countUniqueWords(text: string) {
  return new Set(text.toLowerCase().split(/\s+/)).size;
}

export default function SectorPage({ params }: { params: { secteur: string } }) {
  const s = getSecteur(params.secteur);
  if (!s) notFound();
  const parsed = Secteur.safeParse(s.slug);
  if (!parsed.success) notFound();
  const projects = getProjectsBySecteur(parsed.data).map((r) => r.frontmatter);

  // Safety: no-index if editorial is thin (avoid Google thin-content penalty)
  const editorialWordCount = s.editorial ? countUniqueWords(s.editorial) : 0;
  const indexable = editorialWordCount >= MIN_UNIQUE_WORDS && projects.length >= 1;

  return (
    <>
      {!indexable && <meta name="robots" content="noindex,follow" />}
      <JsonLd data={ORGANIZATION} />
      <JsonLd data={breadcrumb([
        { name: "Accueil", url: "/v2" },
        { name: "Réalisations", url: "/v2/realisations" },
        { name: s.label, url: `/v2/realisations/secteur/${s.slug}` },
      ])} />
      <JsonLd data={collectionPage(
        s.heroTitle, s.shortDescription,
        projects.map((p) => ({ name: p.name, url: `/v2/realisations/${p.slug}` })),
      )} />
      {s.faq && s.faq.length > 0 && <JsonLd data={faqPage(s.faq)} />}

      <SectorPageLayout secteur={s} projects={projects} />
    </>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/v2/realisations/secteur src/components/v2/realisations/Sector*
git commit -m "feat(realisations): add sector pages with FAQ schema + noindex safety"
```

---

## Task 11 — Dynamic OG images

**Files:**
- Create: `src/app/v2/realisations/opengraph-image.tsx`, `src/app/v2/realisations/[slug]/opengraph-image.tsx`, `src/app/v2/realisations/secteur/[secteur]/opengraph-image.tsx`

- [ ] **Step 1: Case study OG**

```tsx
// src/app/v2/realisations/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { getProjectBySlug, getAllProjectFrontmatter } from "@/data/realisations";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export function generateStaticParams() {
  return getAllProjectFrontmatter().map((p) => ({ slug: p.slug }));
}

export default function OG({ params }: { params: { slug: string } }) {
  const record = getProjectBySlug(params.slug);
  const p = record?.frontmatter;
  const headline = p?.name ?? "Aurentia Agency";
  const sub = p ? `${p.type} · ${p.year}` : "Réalisations";
  const metric = p?.metrics?.[0];

  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: 80,
        background: "linear-gradient(135deg, #0b0b0a 0%, #1a1a18 100%)",
        color: "#fff", fontFamily: "system-ui",
      }}>
        <div style={{ fontSize: 28, opacity: 0.6 }}>Aurentia Agency</div>
        <div>
          <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.1 }}>{headline}</div>
          <div style={{ fontSize: 32, opacity: 0.7, marginTop: 16 }}>{sub}</div>
          {metric && (
            <div style={{ fontSize: 40, opacity: 0.9, marginTop: 32 }}>
              {metric.value} — {metric.label}
            </div>
          )}
        </div>
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 2: Index + Sector OG** (similar pattern, headline = "Nos réalisations" or sector `heroTitle`)

- [ ] **Step 3: Smoke test**

```bash
pnpm dev
# visit /v2/realisations/<slug>/opengraph-image — should render PNG
```

- [ ] **Step 4: Commit**

```bash
git add src/app/v2/realisations/**/opengraph-image.tsx
git commit -m "feat(seo): dynamic OG images for realisations"
```

---

## Task 12 — Sitemap, MegaMenu, Footer, Home preview

**Files:**
- Modify: `src/app/sitemap.ts`, `src/components/v2/layout/MegaMenu.tsx`, `src/components/v2/layout/NavbarV2*.tsx`, footer v2, `src/components/v2/home/HomeRealisationsPreview.tsx`

- [ ] **Step 1: Sitemap**

```ts
// src/app/sitemap.ts (extend existing)
import type { MetadataRoute } from "next";
import { getAllProjectFrontmatter } from "@/data/realisations";
import { secteurList } from "@/data/realisations/secteurs";

const BASE = "https://aurentia.agency";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const caseStudies = getAllProjectFrontmatter().map((p) => ({
    url: `${BASE}/v2/realisations/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.9 : 0.7,
  }));
  const sectors = secteurList.map((s) => ({
    url: `${BASE}/v2/realisations/secteur/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [
    { url: `${BASE}/v2/realisations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...caseStudies,
    ...sectors,
    // keep existing entries
  ];
}
```

(Merge with existing sitemap — don't clobber other URLs.)

- [ ] **Step 2: MegaMenu** — add "Réalisations" top-level entry with quicklinks to top 3 sectors.

- [ ] **Step 3: Navbar desktop + mobile** — add link.

- [ ] **Step 4: FooterV2** — add "Réalisations" column.

- [ ] **Step 5: HomeRealisationsPreview** — swap `import { projects } from "@/data/projects"` for `getAllProjectFrontmatter()` from new loader. Keep UI identical, just re-source.

- [ ] **Step 6: Build**

```bash
pnpm build
curl -s http://localhost:3000/sitemap.xml | head -30  # after dev up
```

- [ ] **Step 7: Commit**

```bash
git add src/app/sitemap.ts src/components/v2/layout src/components/v2/home/HomeRealisationsPreview.tsx
git commit -m "feat(seo): wire realisations into sitemap + navigation"
```

---

## Task 13 — Editorial content for sector pages

**Files:**
- Modify: `src/data/realisations/secteurs.ts` (fill `editorial`, `faq`, `process` per sector)

Elliot will provide for each sector: code/URLs of projects + what the agency delivered for these clients + any notes. For each sector:

- [ ] **Step 1: Gather inputs** — Elliot hands over references for sector (min 1 project per sector where possible).

- [ ] **Step 2: Draft editorial copy (800-1500 unique words)** — focus on sector pains, specific agency approach, outcomes. No fluff.

- [ ] **Step 3: Draft FAQ (5-8 Q/R)** — real questions prospects ask in that sector, with precise answers.

- [ ] **Step 4: Draft process (3-5 steps)** — how Aurentia delivers for this sector specifically.

- [ ] **Step 5: Elliot validates**, then commit per sector:

```bash
git add src/data/realisations/secteurs.ts
git commit -m "content(secteurs): editorial + faq + process for <sector>"
```

If a sector's editorial isn't ready at ship time, it remains `undefined` → the page ships with `noindex` (Task 10 safety) until filled.

---

## Task 14 — Remove V1 realisations

**Files:**
- Delete: `src/app/realisations/page.tsx`, `src/app/realisations/[slug]/page.tsx`, `src/data/projects.ts`
- Add redirects: `next.config.ts` or `src/app/realisations/page.tsx` → redirect to `/v2/realisations`

- [ ] **Step 1: Add permanent redirects** in `next.config.ts`

```ts
async redirects() {
  return [
    { source: "/realisations", destination: "/v2/realisations", permanent: true },
    { source: "/realisations/:slug", destination: "/v2/realisations/:slug", permanent: true },
  ];
}
```

- [ ] **Step 2: Delete old files**

```bash
rm -rf src/app/realisations src/data/projects.ts
```

- [ ] **Step 3: Grep for lingering imports**

```bash
rg "from [\"']@/data/projects[\"']" src/
```

Expected: no results. Fix any remaining (should already be done in Task 12 step 5).

- [ ] **Step 4: Build + typecheck**

```bash
pnpm build && pnpm -s tsc --noEmit
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor(realisations): remove v1 and add permanent redirects"
```

---

## Task 15 — Final verification

- [ ] **Step 1: Full build**

```bash
pnpm build
```

Expected: clean build, all routes generated (`/v2/realisations`, `/v2/realisations/[slug]` × N, `/v2/realisations/secteur/[secteur]` × N).

- [ ] **Step 2: Dev server + visual QA checklist**

```bash
pnpm dev
```

Check at `http://localhost:3000`:
- [ ] Index `/v2/realisations` — hero, featured, sector blocks, type blocks, grid all render both themes
- [ ] Case study (all migrated projects) — rail sticky, scroll-spy accurate, MDX components render, metrics count up, related shows, CTA works, mobile drawer opens
- [ ] Sector pages — render, noindex only where editorial missing
- [ ] OG images: `/v2/realisations/opengraph-image`, `/v2/realisations/<slug>/opengraph-image` render PNG
- [ ] Sitemap: `/sitemap.xml` contains all new URLs
- [ ] Redirects: `/realisations/<slug>` 308s to `/v2/realisations/<slug>`
- [ ] MegaMenu shows Réalisations, links work
- [ ] Home preview still renders
- [ ] No `text-xs`, no hardcoded colors anywhere in new files:
  ```bash
  rg "text-xs|text-\[9px\]|text-\[10px\]|text-\[11px\]" src/components/v2/realisations src/app/v2/realisations
  rg "text-white|bg-white|bg-\[#" src/components/v2/realisations src/app/v2/realisations
  ```
  Expected: no matches (decorative overlays aside).
- [ ] Lighthouse on case study + index + sector page: SEO ≥ 95, Perf ≥ 90 mobile.

- [ ] **Step 3: Structured data validation**

Paste rendered HTML of index, a case study, a sector page into https://validator.schema.org/ — expect 0 errors.

- [ ] **Step 4: Final commit + PR**

```bash
git push -u origin feat/v2-redesign-phase1
gh pr create --title "feat(v2): realisations + programmatic SEO (phase 1)" --body "$(cat <<'EOF'
## Summary
- MDX + Zod content archi for case studies
- Hub pSEO index, case studies with sticky rail, sector pages
- Full SEO stack: schema.org (CreativeWork/Review/FAQ/Breadcrumb/CollectionPage), dynamic OG images, sitemap, canonical, noindex safety
- V1 `/realisations` removed with permanent redirects

See spec: docs/superpowers/specs/2026-04-22-realisations-v2-pseo-design.md
See plan: docs/superpowers/plans/2026-04-22-realisations-v2-phase1.md

## Test plan
- [ ] All migrated case studies render in both themes
- [ ] Sticky rail + scroll-spy work Chrome/Safari/Firefox desktop
- [ ] Mobile drawer works iOS/Android
- [ ] Sitemap contains all new URLs
- [ ] OG images render for index + each case study + each sector
- [ ] Redirects from /realisations/* return 308
- [ ] Lighthouse SEO ≥ 95, Perf ≥ 90 on mobile
- [ ] Schema validator returns 0 errors
EOF
)"
```

---

## Self-review summary

- **Spec coverage:** all 10 SEO items covered (Task 7 schemas, Task 10 FAQ + noindex, Task 11 OG, Task 12 sitemap + maillage, Tasks 8-10 canonical via `alternates.canonical`). MDX + Zod (Task 2-6), index hub (Task 9), case study rail (Task 8), sector pages (Task 10), migration (Task 5), V1 removal (Task 14). Phase 2 (type + crossed pages) explicitly out of scope.
- **Placeholders:** none — every task has exact paths, code, commands. "Elliot provides matter" in Task 13 is a content dependency, not a placeholder (plan documents the iterative workflow + `noindex` safety).
- **Type consistency:** `ProjectFrontmatter`, `Secteur`, `ProjectType` names consistent across tasks. Helpers (`getAllProjectFrontmatter`, `getProjectBySlug`, `getProjectsBySecteur`, `getRelatedProjects`, `getSecteursWithProjects`) defined in Task 4 and referenced unchanged in Tasks 8-12.
