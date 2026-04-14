# Aurentia v2 Redesign — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Phase 1 of Aurentia Agency v2 redesign (corporate multi-page restructure) in parallel routes under `/v2`, ready to be swapped onto `/` when validated.

**Architecture:** All v2 code lives in `src/app/v2/`, `src/components/v2/`, `src/data/v2/` — fully isolated from the existing site. Two reusable React templates (`<CommercialPillarPage>` and `<SubPage>`) drive most of the new pages; data lives in typed `src/data/v2/*.ts` files. After Phase 1 ships, an additional swap commit will move `app/v2/*` to `app/*`.

**Tech Stack:** Next.js 15.5 (App Router, RSC by default), React 19, TypeScript strict, Tailwind v4 (`@theme` blocks in CSS, no tailwind.config.js), shadcn (existing), `@base-ui/react`, `lucide-react`, `next-themes`, existing N8N webhook wiring for the contact form.

**Phase 1 scope (out of scope: Phase 2 = Réalisations + Blog · Phase 3 = Ressources + Affiliation):**
- `/v2` Home (10 sections)
- 3 commercial pillars: `/v2/sites-web` · `/v2/saas` · `/v2/solutions-ia` (with their sub-pages)
- 1 corporate pillar: `/v2/agence` (light version) + `/v2/agence/a-propos`
- `/v2/contact`
- New NavbarV2 (mega-menus desktop, accordions mobile) + new FooterV2

**Reference spec:** `docs/superpowers/specs/2026-04-13-v2-redesign-design.md`

---

## Testing Discipline (no test framework installed)

This project has no jest/vitest/RTL configured, and we are **not** introducing one in Phase 1 (out of scope, friction-heavy for static UI). Quality bar is enforced by:

1. **TypeScript strict** — first line of correctness. All v2 data files use exported types from `src/data/v2/types.ts`. No `any`. The compiler must accept every change.
2. **`npm run build`** after each milestone — must succeed (catches type errors, import errors, RSC vs Client boundary issues).
3. **`npm run lint`** must succeed at the end of every milestone.
4. **Manual dev server smoke** (`npm run dev`, then visit each new route) — verify the page renders, sections appear in order, no console errors, light AND dark mode look correct.
5. **Manual responsive check** at the end of each milestone that adds visible UI: viewports 375 / 768 / 1280.
6. **a11y quick audit** in Milestone 9: keyboard navigation, focus visible, alt texts, contrast against tokens.

If during execution a milestone reveals a need for genuine unit tests (e.g. tricky scroll-spy logic in `<SubPageStickyNav>`), add a test framework setup as a follow-up task — don't paper over it.

---

## File Structure

### Files created in Phase 1

```
src/
├── app/
│   └── v2/
│       ├── layout.tsx                                # v2 layout (NavbarV2 + FooterV2 wrappers)
│       ├── page.tsx                                  # Home v2
│       ├── contact/page.tsx
│       ├── sites-web/
│       │   ├── page.tsx                              # CommercialPillarPage
│       │   ├── site-vitrine/page.tsx                 # SubPage
│       │   └── landing-page/page.tsx                 # SubPage
│       ├── saas/page.tsx                             # CommercialPillarPage variant=single
│       ├── solutions-ia/
│       │   ├── page.tsx                              # CommercialPillarPage
│       │   ├── formation-ia/page.tsx                 # SubPage
│       │   ├── configuration-claude/page.tsx         # SubPage
│       │   ├── audit/page.tsx                        # SubPage
│       │   └── implementation-ia/page.tsx            # SubPage
│       └── agence/
│           ├── page.tsx                              # AgencyPillarPage
│           └── a-propos/page.tsx                     # plain page (HomeTeam-like content)
│
├── components/
│   └── v2/
│       ├── layout/
│       │   ├── NavbarV2.tsx                          # desktop + mobile dispatch
│       │   ├── NavbarV2Desktop.tsx                   # nav bar + mega menus
│       │   ├── NavbarV2Mobile.tsx                    # hamburger + accordion menu
│       │   ├── MegaMenu.tsx                          # parameterized mega-menu (Sites Web / Solutions IA / L'agence)
│       │   └── FooterV2.tsx                          # 4 columns
│       ├── home/
│       │   ├── HomeHeroV2.tsx
│       │   ├── HomeLogoStrip.tsx
│       │   ├── HomePillarsGrid.tsx
│       │   ├── HomeWhyAurentia.tsx
│       │   ├── HomeRealisationsPreview.tsx
│       │   ├── HomeTestimonialsV2.tsx
│       │   ├── HomeMethodV2.tsx
│       │   ├── HomeFAQV2.tsx
│       │   └── HomeContactV2.tsx
│       ├── pillar/
│       │   ├── CommercialPillarPage.tsx              # template assembling sub-components
│       │   ├── AgencyPillarPage.tsx                  # template for /agence (distinct)
│       │   ├── PillarHero.tsx
│       │   ├── PillarStatsBanner.tsx
│       │   ├── PillarSubOffersGrid.tsx               # supports variant="single" for /saas
│       │   ├── PillarForWho.tsx
│       │   ├── PillarMethod.tsx
│       │   └── PillarFAQ.tsx
│       ├── subpage/
│       │   ├── SubPage.tsx                           # template assembling sub-components
│       │   ├── SubPageHero.tsx
│       │   ├── SubPageStickyNav.tsx                  # sticky scroll-spy nav
│       │   ├── SubPageForWho.tsx
│       │   ├── SubPageWhatYouGet.tsx                 # checklist
│       │   ├── SubPageProcess.tsx
│       │   ├── SubPagePricing.tsx                    # pricing packs grid
│       │   ├── SubPageExamples.tsx
│       │   ├── SubPageFAQ.tsx
│       │   └── SubPageCTA.tsx
│       └── shared/
│           ├── SectionContainer.tsx                  # consistent section wrapper (padding, max-width)
│           ├── DualCTA.tsx                           # primary + ghost button pair
│           ├── ServiceBadge.tsx                      # pill-shaped tag
│           ├── TestimonialCard.tsx
│           ├── RealisationCard.tsx
│           └── FAQAccordion.tsx                      # reusable accordion
│
└── data/
    └── v2/
        ├── types.ts                                  # ALL shared TypeScript types
        ├── home.ts
        ├── sites-web.ts
        ├── sites-web-vitrine.ts
        ├── sites-web-landing.ts
        ├── saas.ts
        ├── solutions-ia.ts
        ├── solutions-ia-formation.ts
        ├── solutions-ia-config-claude.ts
        ├── solutions-ia-audit.ts
        ├── solutions-ia-implementation.ts
        ├── agence.ts
        └── agence-a-propos.ts
```

### Files NOT touched (the existing site stays live during Phase 1)

- All existing `src/app/*` routes outside `/v2`
- All existing `src/components/*` outside `components/v2/`
- `src/components/ui/` (shadcn primitives — only consumed, never modified)
- `src/lib/`, `src/hooks/`, `src/lib/utils.ts` (shared infra — consumed only)
- N8N webhook routes (`src/app/api/contact/...` etc.)
- `src/app/globals.css` (we use existing tokens — only modified if a new token is genuinely needed)

---

## Milestone 0 — Foundation (types + v2 stub + routing sanity)

**Goal:** `/v2` route exists, renders a placeholder, builds clean. All shared TS types exist before any component is built — this prevents drift.

### Task 0.1 — Create shared TypeScript types

**Files:**
- Create: `src/data/v2/types.ts`

- [ ] **Step 1: Write the file**

```typescript
// src/data/v2/types.ts
//
// Shared TypeScript types for all v2 data files.
// Every data file in src/data/v2/ exports an object that conforms to one of these.

import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

/* ──────────────────────────────────────────────
   Generic building blocks
   ────────────────────────────────────────────── */

export type CTA = {
  label: string;
  href: string;
};

export type DualCTA = {
  primary: CTA;
  secondary: CTA;
};

export type Badge = {
  label: string;
  icon?: LucideIcon;
};

export type Stat = {
  value: string; // e.g. "200+", "48h", "4.9/5"
  label: string; // e.g. "projets livrés"
};

export type ProfileCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string; // "01", "02"…
  title: string;
  description: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type Realisation = {
  slug: string;
  title: string;
  client: string;
  pillar: "sites-web" | "saas" | "solutions-ia";
  resultKpi: string; // e.g. "+180% conversions"
  imageUrl: string;
  href: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  pillar?: "sites-web" | "saas" | "solutions-ia";
};

/* ──────────────────────────────────────────────
   Home page data shape
   ────────────────────────────────────────────── */

export type HomeData = {
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent?: string; // optional second-line accent
    subHeadline: string;
    badges: Badge[];
    cta: DualCTA;
    visual: { kind: "image"; src: string; alt: string };
  };
  logoStrip: {
    label: string;
    logos: { name: string; src: string }[];
  };
  pillars: {
    eyebrow: string;
    title: string;
    items: {
      icon: LucideIcon;
      title: string;
      pitch: string;
      priceFrom?: string;
      href: string;
    }[];
  };
  whyAurentia: {
    eyebrow: string;
    title: string;
    items: { icon: LucideIcon; title: string; description: string }[];
  };
  realisationsPreview: Realisation[];
  testimonials: Testimonial[];
  method: {
    title: string;
    steps: ProcessStep[];
  };
  faq: FAQItem[];
  contactCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   Commercial pillar page data shape
   ────────────────────────────────────────────── */

export type CommercialPillarData = {
  slug: string; // "sites-web" | "saas" | "solutions-ia"
  hero: {
    eyebrow: string;
    headline: string;
    subHeadline: string;
    badges: Badge[];
    cta: DualCTA;
    visual: { kind: "image"; src: string; alt: string };
  };
  stats: Stat[];
  subOffers:
    | {
        variant: "grid";
        title: string;
        items: {
          icon: LucideIcon;
          title: string;
          pitch: string;
          priceFrom?: string;
          href: string;
        }[];
      }
    | {
        variant: "single"; // for /saas which has no sub-pages
        title: string;
        items: { // "Ce qu'on construit" cards instead
          icon: LucideIcon;
          title: string;
          description: string;
        }[];
        stack?: { name: string; logo: string }[]; // tech stack logos
      };
  forWho: {
    title: string;
    profiles: ProfileCard[];
  };
  method: {
    title: string;
    steps: ProcessStep[];
  };
  realisationsFiltered: Realisation[]; // 2-3 cards
  testimonialsFiltered: Testimonial[]; // 1-2
  faq: FAQItem[];
  finalCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   Sub-page data shape
   ────────────────────────────────────────────── */

export type PricingPack = {
  name: string;
  price: string;
  priceSuffix?: string; // "/mois", "HT", etc.
  recommended?: boolean;
  features: string[];
  cta: CTA;
};

export type SubPageData = {
  parentSlug: string; // "sites-web" | "solutions-ia"
  slug: string;
  hero: {
    eyebrow: string;
    headline: string;
    subHeadline: string;
    priceFrom?: string;
    badges: Badge[];
    cta: DualCTA;
    visual: { kind: "image"; src: string; alt: string };
  };
  forWho: ProfileCard[];
  whatYouGet: {
    title: string;
    items: string[]; // checklist lines
  };
  process: ProcessStep[];
  pricing: {
    title: string;
    subtitle?: string;
    packs: PricingPack[];
    note?: string;
  };
  examples: {
    title: string;
    items: { title: string; imageUrl: string; href?: string }[];
  };
  testimonials: Testimonial[];
  faq: FAQItem[];
  finalCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   Agency pillar page (light version, Phase 1)
   ────────────────────────────────────────────── */

export type AgencyPillarData = {
  hero: {
    eyebrow: string;
    headline: string;
    subHeadline: string;
    cta: DualCTA;
  };
  subPages: {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
    available: boolean; // false → "Bientôt disponible"
  }[];
  story: {
    title: string;
    paragraph: string;
  };
  teamPreview: {
    title: string;
    members: { name: string; role: string; avatarUrl?: string }[];
    seeAllHref: string;
  };
  finalCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   À propos page
   ────────────────────────────────────────────── */

export type AProposData = {
  hero: {
    eyebrow: string;
    headline: string;
    subHeadline: string;
  };
  manifesto: {
    title: string;
    paragraphs: string[];
  };
  team: {
    title: string;
    members: {
      name: string;
      role: string;
      bio: string;
      avatarUrl?: string;
      links?: { label: string; href: string }[];
    }[];
  };
  values: {
    title: string;
    items: { icon: LucideIcon; title: string; description: string }[];
  };
  finalCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};

/* ──────────────────────────────────────────────
   Navbar / Footer config
   ────────────────────────────────────────────── */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavSection = {
  label: string;
  href?: string; // pillar landing
  children?: NavLink[]; // mega menu items
};

export type NavbarConfig = {
  logo: { label: string; href: string };
  sections: NavSection[];
  rightLinks: NavLink[]; // À propos, Contact
  cta: CTA;
};

export type FooterConfig = {
  logo: { label: string; tagline: string };
  columns: {
    title: string;
    links: NavLink[];
  }[];
  socials: { label: string; href: string; icon: LucideIcon }[];
  legalLine: string;
};
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit src/data/v2/types.ts`
Expected: no errors. (If `tsconfig` blocks single-file checks, run `npx tsc --noEmit` on the whole project — should still pass as nothing imports types.ts yet.)

- [ ] **Step 3: Commit**

```bash
git add src/data/v2/types.ts
git commit -m "feat(v2): add shared TypeScript types for v2 redesign data layer"
```

### Task 0.2 — Create v2 layout stub

**Files:**
- Create: `src/app/v2/layout.tsx`
- Create: `src/app/v2/page.tsx` (placeholder home)

- [ ] **Step 1: Write the layout**

```tsx
// src/app/v2/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Aurentia Agency",
    template: "%s | Aurentia Agency",
  },
  description: "L'IA dans vos produits. L'IA dans votre quotidien.",
};

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased" data-v2-root>
      {/* NavbarV2 — added in Milestone 2 */}
      <main className="flex min-h-screen flex-col">{children}</main>
      {/* FooterV2 — added in Milestone 2 */}
    </div>
  );
}
```

- [ ] **Step 2: Write the placeholder home**

```tsx
// src/app/v2/page.tsx
export default function HomeV2() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.12em] text-foreground/50">
        v2 — chantier en cours
      </p>
      <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
        Aurentia v2 — placeholder
      </h1>
      <p className="text-base text-foreground/70">
        Cette version remplacera la home actuelle quand la Phase 1 sera shippée.
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Verify build + dev**

```bash
npm run build
```
Expected: build succeeds, route `/v2` listed in the route summary as ƒ or ○.

```bash
npm run dev
```
Visit `http://localhost:3000/v2` — placeholder should render in light mode AND dark mode (toggle with theme switcher). Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add src/app/v2/layout.tsx src/app/v2/page.tsx
git commit -m "feat(v2): scaffold /v2 layout and placeholder home"
```

---

## Milestone 1 — Shared building blocks

**Goal:** All low-level reusable components exist and work in isolation. After this milestone, every higher-level component can compose these without duplication.

### Task 1.1 — `<SectionContainer>`

**Files:**
- Create: `src/components/v2/shared/SectionContainer.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/shared/SectionContainer.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: ReactNode;
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  innerClassName?: string;
  alignHeader?: "left" | "center";
  as?: "section" | "div";
};

export function SectionContainer({
  children,
  id,
  eyebrow,
  title,
  subtitle,
  className,
  innerClassName,
  alignHeader = "left",
  as: Tag = "section",
}: SectionContainerProps) {
  const headerAlign =
    alignHeader === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <Tag
      id={id}
      className={cn("w-full px-6 py-20 md:px-12 md:py-24", className)}
    >
      <div className={cn("mx-auto w-full max-w-6xl", innerClassName)}>
        {(eyebrow || title || subtitle) && (
          <header className={cn("mb-12 flex flex-col gap-3", headerAlign)}>
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}
```

- [ ] **Step 2: Verify import path resolves**

Add a no-op import to `src/app/v2/page.tsx`:
```tsx
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
```
Run `npm run build`. Expected: succeeds. Then remove the import (don't commit it).

- [ ] **Step 3: Commit**

```bash
git add src/components/v2/shared/SectionContainer.tsx
git commit -m "feat(v2): add SectionContainer wrapper component"
```

### Task 1.2 — `<DualCTA>`

**Files:**
- Create: `src/components/v2/shared/DualCTA.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/shared/DualCTA.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CTA } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type DualCTAProps = {
  primary: CTA;
  secondary?: CTA;
  className?: string;
  size?: "md" | "lg";
};

export function DualCTA({ primary, secondary, className, size = "md" }: DualCTAProps) {
  const padding = size === "lg" ? "px-7 py-3.5 text-base" : "px-6 py-3 text-sm";

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Link
        href={primary.href}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full bg-foreground text-background font-semibold transition-all duration-500 ease-in-out hover:bg-foreground/90",
          padding
        )}
      >
        {primary.label}
        <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
      </Link>

      {secondary && (
        <Link
          href={secondary.href}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-foreground/20 text-foreground/85 font-semibold transition-all duration-500 ease-in-out hover:border-foreground/40 hover:text-foreground",
            padding
          )}
        >
          {secondary.label}
        </Link>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/components/v2/shared/DualCTA.tsx
git commit -m "feat(v2): add DualCTA shared component"
```

### Task 1.3 — `<ServiceBadge>`

**Files:**
- Create: `src/components/v2/shared/ServiceBadge.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/shared/ServiceBadge.tsx
import type { Badge as BadgeType } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type ServiceBadgeProps = {
  badge: BadgeType;
  className?: string;
};

export function ServiceBadge({ badge, className }: ServiceBadgeProps) {
  const Icon = badge.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent-primary/25 bg-accent-primary/8 px-3.5 py-1.5 text-sm font-medium text-accent-primary transition-colors duration-500 ease-in-out",
        className
      )}
    >
      {Icon && <Icon className="size-4" />}
      {badge.label}
    </span>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/shared/ServiceBadge.tsx
git commit -m "feat(v2): add ServiceBadge component"
```

### Task 1.4 — `<TestimonialCard>`

**Files:**
- Create: `src/components/v2/shared/TestimonialCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/shared/TestimonialCard.tsx
import type { Testimonial } from "@/data/v2/types";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col gap-5 rounded-2xl border border-foreground/8 bg-background-surface p-7 transition-all duration-500 ease-in-out hover:border-foreground/15 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <Quote className="size-6 text-accent-primary opacity-70" />
      <p className="flex-1 text-base leading-relaxed text-foreground/85">
        “{testimonial.quote}”
      </p>
      <footer className="flex items-center gap-3">
        {testimonial.avatarUrl ? (
          <img
            src={testimonial.avatarUrl}
            alt={testimonial.author}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <div className="size-11 rounded-full bg-foreground/10" aria-hidden />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{testimonial.author}</span>
          <span className="text-sm text-foreground/55">
            {testimonial.role}{testimonial.company ? ` — ${testimonial.company}` : ""}
          </span>
        </div>
      </footer>
    </article>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/shared/TestimonialCard.tsx
git commit -m "feat(v2): add TestimonialCard component"
```

### Task 1.5 — `<RealisationCard>`

**Files:**
- Create: `src/components/v2/shared/RealisationCard.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/shared/RealisationCard.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Realisation } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type RealisationCardProps = {
  realisation: Realisation;
  className?: string;
};

export function RealisationCard({ realisation, className }: RealisationCardProps) {
  return (
    <Link
      href={realisation.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/8 bg-background-surface transition-all duration-500 ease-in-out hover:border-foreground/15 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]",
        className
      )}
    >
      <div className="aspect-[16/10] overflow-hidden bg-foreground/5">
        <img
          src={realisation.imageUrl}
          alt={realisation.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="text-sm font-semibold uppercase tracking-[0.1em] text-accent-primary">
          {realisation.client}
        </span>
        <h3 className="font-heading text-xl font-bold text-foreground">{realisation.title}</h3>
        <p className="text-base font-medium text-foreground/65">{realisation.resultKpi}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-transform duration-500 ease-in-out group-hover:translate-x-1">
          Voir le projet <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/shared/RealisationCard.tsx
git commit -m "feat(v2): add RealisationCard component"
```

### Task 1.6 — `<FAQAccordion>`

**Files:**
- Create: `src/components/v2/shared/FAQAccordion.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/shared/FAQAccordion.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { FAQItem } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type FAQAccordionProps = {
  items: FAQItem[];
  className?: string;
};

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn("flex flex-col divide-y divide-foreground/10", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-500 ease-in-out hover:text-accent-primary"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-foreground md:text-lg">
                {item.question}
              </span>
              <Plus
                className={cn(
                  "size-5 shrink-0 text-foreground/60 transition-transform duration-500 ease-in-out",
                  isOpen && "rotate-45 text-accent-primary"
                )}
              />
            </button>
            <div
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0">
                <p className="text-base leading-relaxed text-foreground/70">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/shared/FAQAccordion.tsx
git commit -m "feat(v2): add FAQAccordion shared component"
```

### Task 1.7 — Milestone 1 build & lint check

- [ ] **Step 1: Full build**
```bash
npm run build && npm run lint
```
Expected: both pass. Fix any errors before proceeding to Milestone 2.

---

## Milestone 2 — Layout: Navbar + Footer + Mega-menus

**Goal:** The v2 layout has a real navbar (desktop with mega-menus, mobile with accordion) and a real footer. After this milestone, `/v2` looks like a real site shell — even if the home is still a placeholder.

### Task 2.1 — Navbar config data

**Files:**
- Create: `src/data/v2/navbar.ts`
- Create: `src/data/v2/footer.ts`

- [ ] **Step 1: Write navbar config**

```typescript
// src/data/v2/navbar.ts
import { Globe, Code2, BrainCircuit, Building2, Phone } from "lucide-react";
import type { NavbarConfig } from "./types";

export const navbarConfig: NavbarConfig = {
  logo: { label: "Aurentia.", href: "/v2" },
  sections: [
    {
      label: "Sites Web",
      href: "/v2/sites-web",
      children: [
        {
          label: "Site vitrine",
          href: "/v2/sites-web/site-vitrine",
          description: "Présence pro pour TPE, artisans, commerces",
        },
        {
          label: "Landing page",
          href: "/v2/sites-web/landing-page",
          description: "Pages haute conversion pour startups et SaaS",
        },
      ],
    },
    {
      label: "SaaS",
      href: "/v2/saas",
      // no children → simple link
    },
    {
      label: "Solutions IA",
      href: "/v2/solutions-ia",
      children: [
        { label: "Formation IA", href: "/v2/solutions-ia/formation-ia", description: "Vidéos, cours, skills pour vos équipes" },
        { label: "Configuration Claude", href: "/v2/solutions-ia/configuration-claude", description: "On configure Claude pour votre workflow" },
        { label: "Audit", href: "/v2/solutions-ia/audit", description: "Audit IA de votre business" },
        { label: "Implémentation IA", href: "/v2/solutions-ia/implementation-ia", description: "Skills custom déployés chez vous" },
      ],
    },
    {
      label: "L'agence",
      href: "/v2/agence",
      children: [
        { label: "À propos", href: "/v2/agence/a-propos", description: "Équipe, méthode, manifeste" },
        { label: "Réalisations", href: "/v2/agence", description: "Bientôt — cas clients détaillés" },
        { label: "Le blog", href: "/v2/agence", description: "Bientôt — articles et tendances" },
        { label: "Ressources", href: "/v2/agence", description: "Bientôt — guides, templates, outils" },
        { label: "Affiliation", href: "/v2/agence", description: "Bientôt — 10% sur chaque projet recommandé" },
      ],
    },
  ],
  rightLinks: [
    { label: "Contact", href: "/v2/contact" },
  ],
  cta: { label: "Prendre RDV", href: "/v2/contact" },
};
```

- [ ] **Step 2: Write footer config**

```typescript
// src/data/v2/footer.ts
import type { FooterConfig } from "./types";
import { Linkedin, Instagram, Twitter, Github } from "lucide-react";

export const footerConfig: FooterConfig = {
  logo: {
    label: "Aurentia.",
    tagline: "L'IA dans vos produits. L'IA dans votre quotidien.",
  },
  columns: [
    {
      title: "Offres",
      links: [
        { label: "Sites Web", href: "/v2/sites-web" },
        { label: "Site vitrine", href: "/v2/sites-web/site-vitrine" },
        { label: "Landing page", href: "/v2/sites-web/landing-page" },
        { label: "SaaS sur-mesure", href: "/v2/saas" },
        { label: "Formation IA", href: "/v2/solutions-ia/formation-ia" },
        { label: "Configuration Claude", href: "/v2/solutions-ia/configuration-claude" },
        { label: "Audit", href: "/v2/solutions-ia/audit" },
        { label: "Implémentation IA", href: "/v2/solutions-ia/implementation-ia" },
      ],
    },
    {
      title: "L'agence",
      links: [
        { label: "À propos", href: "/v2/agence/a-propos" },
        { label: "Réalisations", href: "/v2/agence" },
        { label: "Blog", href: "/v2/agence" },
        { label: "Ressources", href: "/v2/agence" },
        { label: "Affiliation", href: "/v2/agence" },
        { label: "Contact", href: "/v2/contact" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "CGV", href: "/cgv" },
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de confidentialité", href: "/politique-confidentialite" },
      ],
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/company/aurentia", icon: Linkedin },
    { label: "Instagram", href: "https://instagram.com/aurentia", icon: Instagram },
    { label: "Twitter", href: "https://twitter.com/aurentia", icon: Twitter },
    { label: "GitHub", href: "https://github.com/aurentia", icon: Github },
  ],
  legalLine: "© Aurentia Agency — Tous droits réservés",
};
```

> **Note:** the social URLs above are placeholders. Replace with real URLs before swap.

- [ ] **Step 3: Build + commit**

```bash
npm run build
git add src/data/v2/navbar.ts src/data/v2/footer.ts
git commit -m "feat(v2): add navbar and footer configuration data"
```

### Task 2.2 — `<MegaMenu>` component

**Files:**
- Create: `src/components/v2/layout/MegaMenu.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/layout/MegaMenu.tsx
"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { NavLink } from "@/data/v2/types";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  pillarLabel: string;
  pillarHref: string;
  items: NavLink[];
  className?: string;
};

export function MegaMenu({ pillarLabel, pillarHref, items, className }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-full mt-3 w-[min(640px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-foreground/10 bg-background-surface p-4 shadow-[0_10px_60px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-500 ease-in-out",
        className
      )}
      role="menu"
    >
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="group flex flex-col gap-1 rounded-xl px-4 py-3 transition-colors duration-500 ease-in-out hover:bg-foreground/5"
            role="menuitem"
          >
            <span className="text-base font-semibold text-foreground">{item.label}</span>
            {item.description && (
              <span className="text-sm text-foreground/60">{item.description}</span>
            )}
          </Link>
        ))}
      </div>
      <div className="mt-3 border-t border-foreground/10 pt-3">
        <Link
          href={pillarHref}
          className="group inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-accent-primary transition-colors duration-500 ease-in-out hover:bg-accent-primary/10"
        >
          Voir tout {pillarLabel}
          <ChevronRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/layout/MegaMenu.tsx
git commit -m "feat(v2): add MegaMenu component"
```

### Task 2.3 — `<NavbarV2Desktop>`

**Files:**
- Create: `src/components/v2/layout/NavbarV2Desktop.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/layout/NavbarV2Desktop.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { navbarConfig } from "@/data/v2/navbar";
import { MegaMenu } from "./MegaMenu";
import { cn } from "@/lib/utils";

export function NavbarV2Desktop() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <nav className="hidden md:block">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-8 px-12 py-4">
        <Link
          href={navbarConfig.logo.href}
          className="font-heading text-xl font-bold text-foreground"
        >
          {navbarConfig.logo.label}
        </Link>

        <ul className="flex items-center gap-1">
          {navbarConfig.sections.map((section) => {
            const hasMenu = !!section.children?.length;
            const isOpen = openSection === section.label;
            return (
              <li
                key={section.label}
                className="relative"
                onMouseEnter={() => hasMenu && setOpenSection(section.label)}
                onMouseLeave={() => hasMenu && setOpenSection(null)}
              >
                <Link
                  href={section.href ?? "#"}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-base font-medium text-foreground/85 transition-colors duration-500 ease-in-out hover:bg-foreground/5 hover:text-foreground",
                    isOpen && "bg-foreground/5 text-foreground"
                  )}
                >
                  {section.label}
                  {hasMenu && (
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform duration-500 ease-in-out",
                        isOpen && "rotate-180"
                      )}
                    />
                  )}
                </Link>
                {hasMenu && isOpen && (
                  <MegaMenu
                    pillarLabel={section.label}
                    pillarHref={section.href ?? "#"}
                    items={section.children!}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-4">
          {navbarConfig.rightLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-medium text-foreground/70 transition-colors duration-500 ease-in-out hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={navbarConfig.cta.href}
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
          >
            {navbarConfig.cta.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/layout/NavbarV2Desktop.tsx
git commit -m "feat(v2): add NavbarV2Desktop with mega-menus"
```

### Task 2.4 — `<NavbarV2Mobile>`

**Files:**
- Create: `src/components/v2/layout/NavbarV2Mobile.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/layout/NavbarV2Mobile.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { navbarConfig } from "@/data/v2/navbar";
import { cn } from "@/lib/utils";

export function NavbarV2Mobile() {
  const [open, setOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <nav className="md:hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <Link
          href={navbarConfig.logo.href}
          className="font-heading text-xl font-bold text-foreground"
        >
          {navbarConfig.logo.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="rounded-full p-2 text-foreground transition-colors duration-500 ease-in-out hover:bg-foreground/5"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          open ? "max-h-[80vh]" : "max-h-0"
        )}
      >
        <div className="border-t border-foreground/10 bg-background-surface px-6 py-4">
          <ul className="flex flex-col">
            {navbarConfig.sections.map((section) => {
              const hasMenu = !!section.children?.length;
              const isExpanded = expandedSection === section.label;
              return (
                <li key={section.label} className="border-b border-foreground/8 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <Link
                      href={section.href ?? "#"}
                      onClick={() => setOpen(false)}
                      className="flex-1 py-4 text-base font-semibold text-foreground"
                    >
                      {section.label}
                    </Link>
                    {hasMenu && (
                      <button
                        type="button"
                        onClick={() => setExpandedSection(isExpanded ? null : section.label)}
                        aria-label={isExpanded ? "Replier" : "Déplier"}
                        className="p-3"
                      >
                        <ChevronDown
                          className={cn(
                            "size-5 text-foreground/60 transition-transform duration-500 ease-in-out",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </button>
                    )}
                  </div>
                  {hasMenu && (
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-500 ease-in-out",
                        isExpanded ? "max-h-96" : "max-h-0"
                      )}
                    >
                      <ul className="flex flex-col gap-1 pb-4 pl-4">
                        {section.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              className="block rounded-lg px-3 py-2 text-base text-foreground/75 transition-colors duration-500 ease-in-out hover:bg-foreground/5"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}

            {navbarConfig.rightLinks.map((link) => (
              <li key={link.href} className="border-b border-foreground/8 last:border-b-0">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-base font-semibold text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={navbarConfig.cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
          >
            {navbarConfig.cta.label}
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/layout/NavbarV2Mobile.tsx
git commit -m "feat(v2): add NavbarV2Mobile with accordion menu"
```

### Task 2.5 — `<NavbarV2>` dispatcher

**Files:**
- Create: `src/components/v2/layout/NavbarV2.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/layout/NavbarV2.tsx
import { NavbarV2Desktop } from "./NavbarV2Desktop";
import { NavbarV2Mobile } from "./NavbarV2Mobile";

export function NavbarV2() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/8 bg-background/85 backdrop-blur-md">
      <NavbarV2Desktop />
      <NavbarV2Mobile />
    </header>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/layout/NavbarV2.tsx
git commit -m "feat(v2): add NavbarV2 dispatcher"
```

### Task 2.6 — `<FooterV2>`

**Files:**
- Create: `src/components/v2/layout/FooterV2.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/layout/FooterV2.tsx
import Link from "next/link";
import { footerConfig } from "@/data/v2/footer";

export function FooterV2() {
  return (
    <footer className="mt-32 border-t border-foreground/10 bg-background-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="font-heading text-2xl font-bold text-foreground">
              {footerConfig.logo.label}
            </span>
            <p className="max-w-xs text-base text-foreground/65">
              {footerConfig.logo.tagline}
            </p>
            <div className="mt-2 flex items-center gap-3">
              {footerConfig.socials.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="rounded-full border border-foreground/15 p-2.5 text-foreground/70 transition-all duration-500 ease-in-out hover:border-foreground/30 hover:text-foreground"
                  >
                    <Icon className="size-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {footerConfig.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-base text-foreground/75 transition-colors duration-500 ease-in-out hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-foreground/10 pt-8 md:flex-row md:items-center">
          <p className="text-sm text-foreground/55">{footerConfig.legalLine}</p>
          <p className="text-sm text-foreground/55">
            Construit avec amour à Paris ✦ {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/layout/FooterV2.tsx
git commit -m "feat(v2): add FooterV2 with 4-column layout"
```

### Task 2.7 — Wire NavbarV2 + FooterV2 into v2 layout

**Files:**
- Modify: `src/app/v2/layout.tsx`

- [ ] **Step 1: Update layout to mount Navbar and Footer**

Replace the body of `src/app/v2/layout.tsx` with:

```tsx
// src/app/v2/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";

export const metadata: Metadata = {
  title: {
    default: "Aurentia Agency",
    template: "%s | Aurentia Agency",
  },
  description: "L'IA dans vos produits. L'IA dans votre quotidien.",
};

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased" data-v2-root>
      <NavbarV2 />
      <main className="flex flex-col">{children}</main>
      <FooterV2 />
    </div>
  );
}
```

- [ ] **Step 2: Visual smoke check**

```bash
npm run dev
```
- Visit `http://localhost:3000/v2` — Navbar visible, footer at bottom, placeholder home in between.
- Hover "Sites Web" / "Solutions IA" / "L'agence" — mega-menus appear smoothly.
- Resize browser narrower than 768px — mobile hamburger should appear, click it, accordion sub-sections expand correctly.
- Toggle dark mode — both navbar and footer must look correct in both themes (no hardcoded colors).
- Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/app/v2/layout.tsx
git commit -m "feat(v2): mount NavbarV2 and FooterV2 in v2 layout"
```

### Task 2.8 — Milestone 2 build & lint check

- [ ] **Step 1: Run final checks**

```bash
npm run build && npm run lint
```
Expected: both pass.

---

## Milestone 3 — Commercial Pillar Template

**Goal:** A reusable `<CommercialPillarPage>` that takes a `CommercialPillarData` prop and renders the entire page. After this milestone, it can render any of the 3 commercial pillar pages by passing the right data.

### Task 3.1 — `<PillarHero>`

**Files:**
- Create: `src/components/v2/pillar/PillarHero.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/pillar/PillarHero.tsx
import type { CommercialPillarData } from "@/data/v2/types";
import { ServiceBadge } from "@/components/v2/shared/ServiceBadge";
import { DualCTA } from "@/components/v2/shared/DualCTA";

type PillarHeroProps = {
  hero: CommercialPillarData["hero"];
};

export function PillarHero({ hero }: PillarHeroProps) {
  return (
    <section className="border-b border-foreground/8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-12 md:py-28">
        <div className="flex flex-col justify-center gap-7">
          {hero.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hero.badges.map((b) => (
                <ServiceBadge key={b.label} badge={b} />
              ))}
            </div>
          )}
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="max-w-xl text-base text-foreground/70 md:text-lg">
            {hero.subHeadline}
          </p>
          <DualCTA primary={hero.cta.primary} secondary={hero.cta.secondary} size="lg" />
        </div>
        <div className="relative aspect-[4/3.6] overflow-hidden rounded-3xl bg-foreground/5">
          <img
            src={hero.visual.src}
            alt={hero.visual.alt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/pillar/PillarHero.tsx
git commit -m "feat(v2): add PillarHero component"
```

### Task 3.2 — `<PillarStatsBanner>`

**Files:**
- Create: `src/components/v2/pillar/PillarStatsBanner.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/pillar/PillarStatsBanner.tsx
import type { Stat } from "@/data/v2/types";

type PillarStatsBannerProps = {
  stats: Stat[];
};

export function PillarStatsBanner({ stats }: PillarStatsBannerProps) {
  return (
    <section className="border-b border-foreground/8 bg-background-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 md:grid-cols-4 md:px-12">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="font-heading text-3xl font-bold text-accent-primary md:text-4xl">
              {stat.value}
            </span>
            <span className="text-base text-foreground/65">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/pillar/PillarStatsBanner.tsx
git commit -m "feat(v2): add PillarStatsBanner"
```

### Task 3.3 — `<PillarSubOffersGrid>` (with single variant for /saas)

**Files:**
- Create: `src/components/v2/pillar/PillarSubOffersGrid.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/pillar/PillarSubOffersGrid.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CommercialPillarData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type PillarSubOffersGridProps = {
  subOffers: CommercialPillarData["subOffers"];
};

export function PillarSubOffersGrid({ subOffers }: PillarSubOffersGridProps) {
  return (
    <SectionContainer eyebrow="Nos offres" title={subOffers.title}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subOffers.items.map((item, idx) => {
          const Icon = item.icon;
          const hrefable = subOffers.variant === "grid" && "href" in item;
          const Wrapper = hrefable
            ? (props: { children: React.ReactNode }) => (
                <Link
                  href={(item as { href: string }).href}
                  className="group flex h-full flex-col gap-5 rounded-2xl border border-foreground/10 bg-background-surface p-7 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                >
                  {props.children}
                </Link>
              )
            : (props: { children: React.ReactNode }) => (
                <div className="flex h-full flex-col gap-5 rounded-2xl border border-foreground/10 bg-background-surface p-7">
                  {props.children}
                </div>
              );

          return (
            <Wrapper key={idx}>
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Icon className="size-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">{item.title}</h3>
              <p className="flex-1 text-base text-foreground/70">
                {"pitch" in item ? item.pitch : item.description}
              </p>
              {"priceFrom" in item && item.priceFrom && (
                <p className="text-sm text-foreground/55">
                  À partir de <span className="font-semibold text-foreground">{item.priceFrom}</span>
                </p>
              )}
              {hrefable && (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                  Découvrir <ArrowUpRight className="size-4" />
                </span>
              )}
            </Wrapper>
          );
        })}
      </div>

      {subOffers.variant === "single" && subOffers.stack && (
        <div className="mt-16 flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface p-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">
            Notre stack
          </h3>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {subOffers.stack.map((tech) => (
              <span key={tech.name} className="text-base font-medium text-foreground/70">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/pillar/PillarSubOffersGrid.tsx
git commit -m "feat(v2): add PillarSubOffersGrid (with single variant for /saas)"
```

### Task 3.4 — `<PillarForWho>`

**Files:**
- Create: `src/components/v2/pillar/PillarForWho.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/pillar/PillarForWho.tsx
import type { ProfileCard } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type PillarForWhoProps = {
  title: string;
  profiles: ProfileCard[];
};

export function PillarForWho({ title, profiles }: PillarForWhoProps) {
  return (
    <SectionContainer eyebrow="Pour qui" title={title} className="bg-background-surface">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          return (
            <div
              key={profile.title}
              className="flex flex-col gap-4 rounded-2xl bg-background p-6"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{profile.title}</h3>
              <p className="text-base text-foreground/65">{profile.description}</p>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/pillar/PillarForWho.tsx
git commit -m "feat(v2): add PillarForWho component"
```

### Task 3.5 — `<PillarMethod>`

**Files:**
- Create: `src/components/v2/pillar/PillarMethod.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/pillar/PillarMethod.tsx
import type { ProcessStep } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type PillarMethodProps = {
  title: string;
  steps: ProcessStep[];
};

export function PillarMethod({ title, steps }: PillarMethodProps) {
  return (
    <SectionContainer eyebrow="Notre méthode" title={title}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-3">
            <span className="font-heading text-4xl font-bold text-accent-primary/40">
              {step.number}
            </span>
            <h3 className="font-heading text-lg font-bold text-foreground">{step.title}</h3>
            <p className="text-base text-foreground/65">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/pillar/PillarMethod.tsx
git commit -m "feat(v2): add PillarMethod component"
```

### Task 3.6 — `<PillarFAQ>`

**Files:**
- Create: `src/components/v2/pillar/PillarFAQ.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/pillar/PillarFAQ.tsx
import type { FAQItem } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

type PillarFAQProps = {
  items: FAQItem[];
};

export function PillarFAQ({ items }: PillarFAQProps) {
  return (
    <SectionContainer
      eyebrow="FAQ"
      title="Vos questions, nos réponses"
      className="bg-background-surface"
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={items} />
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/pillar/PillarFAQ.tsx
git commit -m "feat(v2): add PillarFAQ component"
```

### Task 3.7 — `<CommercialPillarPage>` template

**Files:**
- Create: `src/components/v2/pillar/CommercialPillarPage.tsx`

- [ ] **Step 1: Write the template**

```tsx
// src/components/v2/pillar/CommercialPillarPage.tsx
import type { CommercialPillarData } from "@/data/v2/types";
import { PillarHero } from "./PillarHero";
import { PillarStatsBanner } from "./PillarStatsBanner";
import { PillarSubOffersGrid } from "./PillarSubOffersGrid";
import { PillarForWho } from "./PillarForWho";
import { PillarMethod } from "./PillarMethod";
import { PillarFAQ } from "./PillarFAQ";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { RealisationCard } from "@/components/v2/shared/RealisationCard";
import { TestimonialCard } from "@/components/v2/shared/TestimonialCard";
import { DualCTA } from "@/components/v2/shared/DualCTA";

type CommercialPillarPageProps = {
  data: CommercialPillarData;
};

export function CommercialPillarPage({ data }: CommercialPillarPageProps) {
  return (
    <>
      <PillarHero hero={data.hero} />
      <PillarStatsBanner stats={data.stats} />
      <PillarSubOffersGrid subOffers={data.subOffers} />
      <PillarForWho title={data.forWho.title} profiles={data.forWho.profiles} />
      <PillarMethod title={data.method.title} steps={data.method.steps} />

      {data.realisationsFiltered.length > 0 && (
        <SectionContainer eyebrow="Réalisations" title="Quelques projets récents">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.realisationsFiltered.map((r) => (
              <RealisationCard key={r.slug} realisation={r} />
            ))}
          </div>
        </SectionContainer>
      )}

      {data.testimonialsFiltered.length > 0 && (
        <SectionContainer
          eyebrow="Témoignages"
          title="Ils nous font confiance"
          className="bg-background-surface"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {data.testimonialsFiltered.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </SectionContainer>
      )}

      <PillarFAQ items={data.faq} />

      <SectionContainer alignHeader="center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {data.finalCta.title}
          </h2>
          <p className="text-base text-foreground/70 md:text-lg">{data.finalCta.subtitle}</p>
          <DualCTA primary={data.finalCta.cta} size="lg" />
        </div>
      </SectionContainer>
    </>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/pillar/CommercialPillarPage.tsx
git commit -m "feat(v2): add CommercialPillarPage template"
```

### Task 3.8 — Milestone 3 build & lint check

- [ ] **Step 1: Run checks**
```bash
npm run build && npm run lint
```

---

## Milestone 4 — Sub-page template

**Goal:** A reusable `<SubPage>` template renders any sub-page from a `SubPageData` prop, with sticky scroll-spy navigation.

### Task 4.1 — `<SubPageStickyNav>`

**Files:**
- Create: `src/components/v2/subpage/SubPageStickyNav.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/subpage/SubPageStickyNav.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ANCHORS = [
  { id: "for-who", label: "Pour qui" },
  { id: "what-you-get", label: "Inclus" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Tarifs" },
  { id: "examples", label: "Exemples" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Devis" },
];

export function SubPageStickyNav() {
  const [activeId, setActiveId] = useState<string>(ANCHORS[0].id);

  useEffect(() => {
    const sections = ANCHORS.map((a) => document.getElementById(a.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-[64px] z-40 hidden border-b border-foreground/8 bg-background/90 backdrop-blur-md md:block">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-1 overflow-x-auto px-12 py-3">
        {ANCHORS.map((anchor) => (
          <a
            key={anchor.id}
            href={`#${anchor.id}`}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-500 ease-in-out",
              activeId === anchor.id
                ? "bg-foreground/10 text-foreground"
                : "text-foreground/60 hover:text-foreground"
            )}
          >
            {anchor.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPageStickyNav.tsx
git commit -m "feat(v2): add SubPageStickyNav with scroll-spy"
```

### Task 4.2 — `<SubPageHero>`

**Files:**
- Create: `src/components/v2/subpage/SubPageHero.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/subpage/SubPageHero.tsx
import type { SubPageData } from "@/data/v2/types";
import { ServiceBadge } from "@/components/v2/shared/ServiceBadge";
import { DualCTA } from "@/components/v2/shared/DualCTA";

type SubPageHeroProps = {
  hero: SubPageData["hero"];
};

export function SubPageHero({ hero }: SubPageHeroProps) {
  return (
    <section className="border-b border-foreground/8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-12 md:py-24">
        <div className="flex flex-col justify-center gap-6">
          {hero.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hero.badges.map((b) => (
                <ServiceBadge key={b.label} badge={b} />
              ))}
            </div>
          )}
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl">
            {hero.headline}
          </h1>
          <p className="max-w-xl text-base text-foreground/70 md:text-lg">{hero.subHeadline}</p>
          {hero.priceFrom && (
            <p className="text-base text-foreground/65">
              À partir de <span className="font-bold text-foreground">{hero.priceFrom}</span>
            </p>
          )}
          <DualCTA primary={hero.cta.primary} secondary={hero.cta.secondary} size="lg" />
        </div>
        <div className="relative aspect-[4/3.6] overflow-hidden rounded-3xl bg-foreground/5">
          <img src={hero.visual.src} alt={hero.visual.alt} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPageHero.tsx
git commit -m "feat(v2): add SubPageHero"
```

### Task 4.3 — `<SubPageForWho>`

**Files:**
- Create: `src/components/v2/subpage/SubPageForWho.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/subpage/SubPageForWho.tsx
import type { ProfileCard } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type SubPageForWhoProps = {
  profiles: ProfileCard[];
};

export function SubPageForWho({ profiles }: SubPageForWhoProps) {
  return (
    <SectionContainer
      id="for-who"
      eyebrow="Pour qui c'est"
      title="C'est exactement ce qu'il vous faut si…"
      className="bg-background-surface"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {profiles.map((profile) => {
          const Icon = profile.icon;
          return (
            <div key={profile.title} className="flex items-start gap-4 rounded-2xl bg-background p-6">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Icon className="size-5" />
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-lg font-bold text-foreground">{profile.title}</h3>
                <p className="text-base text-foreground/65">{profile.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPageForWho.tsx
git commit -m "feat(v2): add SubPageForWho"
```

### Task 4.4 — `<SubPageWhatYouGet>`

**Files:**
- Create: `src/components/v2/subpage/SubPageWhatYouGet.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/subpage/SubPageWhatYouGet.tsx
import { Check } from "lucide-react";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type SubPageWhatYouGetProps = {
  data: SubPageData["whatYouGet"];
};

export function SubPageWhatYouGet({ data }: SubPageWhatYouGetProps) {
  return (
    <SectionContainer id="what-you-get" eyebrow="Ce que vous obtenez" title={data.title}>
      <ul className="grid gap-4 md:grid-cols-2">
        {data.items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-primary/15 text-accent-primary">
              <Check className="size-4" />
            </span>
            <span className="text-base text-foreground/80">{item}</span>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPageWhatYouGet.tsx
git commit -m "feat(v2): add SubPageWhatYouGet checklist"
```

### Task 4.5 — `<SubPageProcess>`

**Files:**
- Create: `src/components/v2/subpage/SubPageProcess.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/subpage/SubPageProcess.tsx
import type { ProcessStep } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type SubPageProcessProps = {
  steps: ProcessStep[];
};

export function SubPageProcess({ steps }: SubPageProcessProps) {
  return (
    <SectionContainer id="process" eyebrow="Le processus" title="Comment ça se passe" className="bg-background-surface">
      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li key={step.number} className="flex flex-col gap-3 rounded-2xl bg-background p-6">
            <span className="font-heading text-3xl font-bold text-accent-primary/40">{step.number}</span>
            <h3 className="font-heading text-lg font-bold text-foreground">{step.title}</h3>
            <p className="text-base text-foreground/65">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPageProcess.tsx
git commit -m "feat(v2): add SubPageProcess"
```

### Task 4.6 — `<SubPagePricing>`

**Files:**
- Create: `src/components/v2/subpage/SubPagePricing.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/subpage/SubPagePricing.tsx
import { Check } from "lucide-react";
import Link from "next/link";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { cn } from "@/lib/utils";

type SubPagePricingProps = {
  data: SubPageData["pricing"];
};

export function SubPagePricing({ data }: SubPagePricingProps) {
  return (
    <SectionContainer id="pricing" eyebrow="Tarifs" title={data.title} subtitle={data.subtitle}>
      <div className={cn("grid gap-6", data.packs.length === 1 ? "md:grid-cols-1 max-w-md mx-auto" : data.packs.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {data.packs.map((pack) => (
          <div
            key={pack.name}
            className={cn(
              "relative flex flex-col gap-6 rounded-2xl border bg-background-surface p-8 transition-all duration-500 ease-in-out",
              pack.recommended
                ? "border-accent-primary shadow-[0_4px_30px_rgba(201,100,66,0.18)]"
                : "border-foreground/10"
            )}
          >
            {pack.recommended && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-primary px-3 py-1 text-sm font-semibold text-background">
                Recommandé
              </span>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-xl font-bold text-foreground">{pack.name}</h3>
              <p className="font-heading text-3xl font-bold text-foreground">
                {pack.price}
                {pack.priceSuffix && (
                  <span className="text-base font-medium text-foreground/55"> {pack.priceSuffix}</span>
                )}
              </p>
            </div>
            <ul className="flex flex-1 flex-col gap-2.5">
              {pack.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-base text-foreground/75">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={pack.cta.href}
              className={cn(
                "inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-500 ease-in-out",
                pack.recommended
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "border border-foreground/20 text-foreground hover:border-foreground/40"
              )}
            >
              {pack.cta.label}
            </Link>
          </div>
        ))}
      </div>
      {data.note && <p className="mt-8 text-center text-base text-foreground/55">{data.note}</p>}
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPagePricing.tsx
git commit -m "feat(v2): add SubPagePricing component"
```

### Task 4.7 — `<SubPageExamples>`

**Files:**
- Create: `src/components/v2/subpage/SubPageExamples.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/subpage/SubPageExamples.tsx
import Link from "next/link";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type SubPageExamplesProps = {
  data: SubPageData["examples"];
};

export function SubPageExamples({ data }: SubPageExamplesProps) {
  return (
    <SectionContainer id="examples" eyebrow="Exemples" title={data.title} className="bg-background-surface">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item, idx) => {
          const Wrapper = item.href
            ? ({ children }: { children: React.ReactNode }) => (
                <Link href={item.href!} className="group block">
                  {children}
                </Link>
              )
            : ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
          return (
            <Wrapper key={idx}>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-background">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-base font-medium text-foreground/80">{item.title}</p>
            </Wrapper>
          );
        })}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPageExamples.tsx
git commit -m "feat(v2): add SubPageExamples"
```

### Task 4.8 — `<SubPageFAQ>`

**Files:**
- Create: `src/components/v2/subpage/SubPageFAQ.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/subpage/SubPageFAQ.tsx
import type { FAQItem } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

type SubPageFAQProps = {
  items: FAQItem[];
};

export function SubPageFAQ({ items }: SubPageFAQProps) {
  return (
    <SectionContainer id="faq" eyebrow="FAQ" title="Vos questions, nos réponses" innerClassName="max-w-3xl">
      <FAQAccordion items={items} />
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPageFAQ.tsx
git commit -m "feat(v2): add SubPageFAQ"
```

### Task 4.9 — `<SubPageCTA>`

**Files:**
- Create: `src/components/v2/subpage/SubPageCTA.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/subpage/SubPageCTA.tsx
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { DualCTA } from "@/components/v2/shared/DualCTA";

type SubPageCTAProps = {
  data: SubPageData["finalCta"];
};

export function SubPageCTA({ data }: SubPageCTAProps) {
  return (
    <SectionContainer id="cta" alignHeader="center">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {data.title}
        </h2>
        <p className="text-base text-foreground/70 md:text-lg">{data.subtitle}</p>
        <DualCTA primary={data.cta} size="lg" />
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPageCTA.tsx
git commit -m "feat(v2): add SubPageCTA"
```

### Task 4.10 — `<SubPage>` template

**Files:**
- Create: `src/components/v2/subpage/SubPage.tsx`

- [ ] **Step 1: Write the template**

```tsx
// src/components/v2/subpage/SubPage.tsx
import type { SubPageData } from "@/data/v2/types";
import { SubPageStickyNav } from "./SubPageStickyNav";
import { SubPageHero } from "./SubPageHero";
import { SubPageForWho } from "./SubPageForWho";
import { SubPageWhatYouGet } from "./SubPageWhatYouGet";
import { SubPageProcess } from "./SubPageProcess";
import { SubPagePricing } from "./SubPagePricing";
import { SubPageExamples } from "./SubPageExamples";
import { SubPageFAQ } from "./SubPageFAQ";
import { SubPageCTA } from "./SubPageCTA";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { TestimonialCard } from "@/components/v2/shared/TestimonialCard";

type SubPageProps = {
  data: SubPageData;
};

export function SubPage({ data }: SubPageProps) {
  return (
    <>
      <SubPageHero hero={data.hero} />
      <SubPageStickyNav />
      <SubPageForWho profiles={data.forWho} />
      <SubPageWhatYouGet data={data.whatYouGet} />
      <SubPageProcess steps={data.process} />
      <SubPagePricing data={data.pricing} />
      <SubPageExamples data={data.examples} />

      {data.testimonials.length > 0 && (
        <SectionContainer eyebrow="Témoignages" title="Ils en parlent mieux que nous">
          <div className="grid gap-6 md:grid-cols-2">
            {data.testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} />
            ))}
          </div>
        </SectionContainer>
      )}

      <SubPageFAQ items={data.faq} />
      <SubPageCTA data={data.finalCta} />
    </>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/subpage/SubPage.tsx
git commit -m "feat(v2): add SubPage template"
```

### Task 4.11 — Milestone 4 build & lint check

- [ ] **Step 1: Run checks**
```bash
npm run build && npm run lint
```

---

## Milestone 5 — Data files (all 13 of them)

**Goal:** All v2 data files exist with realistic placeholder content. The user can refine copy after Phase 1 is structurally complete.

> **Important:** Use real-sounding French copy aligned with Aurentia's brand voice. Don't write Lorem ipsum. Where you don't know specifics (real client names, real testimonial quotes), use plausible placeholders that the user can swap later — but mark them clearly as drafts at the top of the file with a `DRAFT_COPY` comment.

> **Critical decision:** the realisations grid in `home.ts` and pillar pages must use **stub realisation data** in Phase 1 (since `/v2/agence/realisations` doesn't exist yet). Each realisation `href` should point to `/v2/agence` for now. The cards still display correctly.

### Task 5.1 — `home.ts`

**Files:**
- Create: `src/data/v2/home.ts`

- [ ] **Step 1: Write the file**

```typescript
// src/data/v2/home.ts
// DRAFT_COPY — to refine with real client data before swap
import {
  Sparkles, Zap, Globe, Code2, BrainCircuit, Building2,
  Briefcase, Store, Rocket, Users, ShieldCheck, Clock,
} from "lucide-react";
import type { HomeData } from "./types";

export const homeData: HomeData = {
  hero: {
    eyebrow: "L'agence IA full-stack",
    headline: "L'IA dans vos produits.",
    headlineAccent: "L'IA dans votre quotidien.",
    subHeadline:
      "Sites et SaaS construits avec l'IA. Formations et automatisations déployées chez vous. Une seule agence pour tout votre virage digital.",
    badges: [
      { label: "+50 projets livrés", icon: Sparkles },
      { label: "Partenaire Anthropic Claude", icon: BrainCircuit },
    ],
    cta: {
      primary: { label: "Discutons de votre projet", href: "/v2/contact" },
      secondary: { label: "Voir nos offres", href: "#pillars" },
    },
    visual: { kind: "image", src: "/images/v2/hero-home.jpg", alt: "Aurentia en mission" },
  },

  logoStrip: {
    label: "Ils nous font confiance",
    logos: [
      { name: "Client A", src: "/images/v2/logos/client-a.svg" },
      { name: "Client B", src: "/images/v2/logos/client-b.svg" },
      { name: "Client C", src: "/images/v2/logos/client-c.svg" },
      { name: "Client D", src: "/images/v2/logos/client-d.svg" },
      { name: "Client E", src: "/images/v2/logos/client-e.svg" },
      { name: "Client F", src: "/images/v2/logos/client-f.svg" },
    ],
  },

  pillars: {
    eyebrow: "Nos expertises",
    title: "Trois piliers, une seule agence",
    items: [
      {
        icon: Globe,
        title: "Sites Web",
        pitch: "Sites vitrines et landing pages livrés en jours grâce à l'IA",
        priceFrom: "1 200 €",
        href: "/v2/sites-web",
      },
      {
        icon: Code2,
        title: "SaaS sur-mesure",
        pitch: "MVP fonctionnel en 1 à 2 semaines, architecture pro, IA intégrée",
        priceFrom: "5 000 €",
        href: "/v2/saas",
      },
      {
        icon: BrainCircuit,
        title: "Solutions IA",
        pitch: "Formations Claude, audits, configuration et skills custom déployés chez vous",
        priceFrom: "Sur devis",
        href: "/v2/solutions-ia",
      },
    ],
  },

  whyAurentia: {
    eyebrow: "Pourquoi Aurentia",
    title: "Une agence pensée pour l'ère de l'IA",
    items: [
      {
        icon: Zap,
        title: "5× plus rapide",
        description: "L'IA accélère chaque étape — du design au déploiement. On livre en jours ce que les autres font en mois.",
      },
      {
        icon: BrainCircuit,
        title: "L'IA en profondeur",
        description: "On ne fait pas que parler d'IA, on l'utilise au quotidien et on sait l'intégrer concrètement dans vos produits et vos workflows.",
      },
      {
        icon: ShieldCheck,
        title: "Qualité garantie",
        description: "Code propre, design soigné, accompagnement humain. La vitesse n'est jamais un compromis sur la qualité.",
      },
      {
        icon: Users,
        title: "Sur-mesure réel",
        description: "Aucun template recyclé. Chaque projet est conçu spécifiquement pour vos besoins, votre marque, vos clients.",
      },
    ],
  },

  realisationsPreview: [
    {
      slug: "client-1",
      title: "Refonte complète et SEO multiplié par 4",
      client: "Client 1",
      pillar: "sites-web",
      resultKpi: "+340% trafic organique",
      imageUrl: "/images/v2/realisations/realisation-1.jpg",
      href: "/v2/agence",
    },
    {
      slug: "client-2",
      title: "MVP livré en 12 jours",
      client: "Client 2",
      pillar: "saas",
      resultKpi: "12 jours · 0 → 100 utilisateurs",
      imageUrl: "/images/v2/realisations/realisation-2.jpg",
      href: "/v2/agence",
    },
    {
      slug: "client-3",
      title: "Skill Claude custom pour automatiser le service client",
      client: "Client 3",
      pillar: "solutions-ia",
      resultKpi: "−65% temps de réponse",
      imageUrl: "/images/v2/realisations/realisation-3.jpg",
      href: "/v2/agence",
    },
  ],

  testimonials: [
    {
      quote:
        "Aurentia a livré notre site en 5 jours. Cinq jours. Et le résultat est meilleur que ce que d'autres agences nous proposaient en deux mois.",
      author: "Marie L.",
      role: "Fondatrice",
      company: "Atelier Marie",
    },
    {
      quote:
        "Ils ont configuré Claude pour notre équipe et nous ont formés. On a gagné l'équivalent d'un mi-temps en automatisations en moins de trois semaines.",
      author: "Thomas R.",
      role: "Directeur",
      company: "Cabinet Conseil",
    },
    {
      quote:
        "Notre MVP SaaS était en ligne 12 jours après notre premier appel. C'est ce qui nous a permis de signer notre seed round.",
      author: "Lisa K.",
      role: "CEO",
      company: "Startup B2B",
    },
  ],

  method: {
    title: "Notre méthode en 4 étapes",
    steps: [
      { number: "01", title: "Briefing", description: "On comprend votre besoin, vos contraintes et vos objectifs en un seul appel." },
      { number: "02", title: "Devis & cadrage", description: "Devis clair sous 24h, périmètre détaillé, deadline ferme." },
      { number: "03", title: "Production", description: "Sprints courts, livrables réguliers, vous suivez l'avancement en temps réel." },
      { number: "04", title: "Livraison & support", description: "Mise en ligne, formation et support inclus pendant 30 jours." },
    ],
  },

  faq: [
    {
      question: "Combien de temps pour livrer un projet ?",
      answer:
        "Cela dépend du type de projet : un site vitrine est livré en 48h à 5 jours. Une landing page en 3 à 7 jours. Un MVP SaaS en 1 à 2 semaines. Une formation IA en 1 semaine. Pour les projets plus ambitieux, on cadre une roadmap claire avec des livrables intermédiaires.",
    },
    {
      question: "Quel est votre tarif moyen ?",
      answer:
        "Sites vitrines à partir de 1 200 €, landing pages à partir de 1 500 €, MVP SaaS à partir de 5 000 €. Les solutions IA et l'implémentation sont sur devis selon le périmètre. Tous nos prix sont affichés clairement sur les pages dédiées.",
    },
    {
      question: "Qu'est-ce qui vous rend différents des autres agences ?",
      answer:
        "L'IA n'est pas un argument marketing chez nous, c'est notre mode de production quotidien. C'est ce qui nous permet d'être 5× plus rapides à qualité égale. Et nous savons aussi déployer l'IA dans votre entreprise — pas seulement en parler.",
    },
    {
      question: "Travaillez-vous avec des entreprises de toutes tailles ?",
      answer:
        "Oui. Du freelance au groupe de 200 personnes. Notre approche s'adapte : pour les petites structures on livre des outils prêts à l'emploi ; pour les grandes on accompagne aussi le changement.",
    },
    {
      question: "Comment ça se passe si on a déjà un site ou un SaaS ?",
      answer:
        "On peut faire une refonte, ajouter une couche IA, ou déployer des skills custom dans votre stack existante. On commence toujours par un audit gratuit pour voir ce qui mérite d'être gardé et ce qu'il faut réécrire.",
    },
    {
      question: "Et après la livraison ?",
      answer:
        "Support inclus pendant 30 jours pour tout projet. Au-delà, on propose des forfaits de maintenance et d'évolution adaptés à votre rythme. On ne disparaît jamais après la livraison.",
    },
  ],

  contactCta: {
    title: "Discutons de votre projet",
    subtitle: "Réponse en moins de 24h. Pas de SDR, pas de pitch — directement avec l'équipe technique.",
    cta: { label: "Prendre rendez-vous", href: "/v2/contact" },
  },
};
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/data/v2/home.ts
git commit -m "feat(v2): add home page draft data"
```

### Task 5.2 to 5.10 — Other data files

> **Approach:** Each remaining data file follows the same pattern as `home.ts`: typed export, `DRAFT_COPY` marker, realistic French content, references to `/images/v2/...` for visual assets (placeholders are OK; we'll source real assets later). Lucide icons consistent with brand.

For brevity, this plan does not inline the full 12 remaining data files. The execution agent should:

1. **For each file below, follow the structure of its corresponding type** in `src/data/v2/types.ts`.
2. **Use the spec section 2 (positioning) and section 5 (page design)** as the source of truth for tone and content.
3. **Mark every file with a top comment** `// DRAFT_COPY — to refine before swap`.
4. **Cross-reference**: testimonials should be reused across home / pillar / sub-pages where relevant (filter by `pillar` field). FAQs should NOT be duplicated — each page has its own.
5. **Pricing in sub-pages** should match the spec: site-vitrine from 1 200 €, landing-page from 1 500 €, saas (no sub-pages, pricing on pillar) from 5 000 €, solutions IA generally "Sur devis" except formation-ia which can have packs.

**Files to create (one task each):**

- [ ] **Task 5.2** — `src/data/v2/sites-web.ts` (CommercialPillarData) — 2 sub-offers in grid mode (Site vitrine, Landing page)
- [ ] **Task 5.3** — `src/data/v2/sites-web-vitrine.ts` (SubPageData) — 3 pricing packs (Essentiel 1200€, Pro 2400€, Premium sur devis)
- [ ] **Task 5.4** — `src/data/v2/sites-web-landing.ts` (SubPageData) — 2 pricing packs (Standard 1500€, Premium 3500€)
- [ ] **Task 5.5** — `src/data/v2/saas.ts` (CommercialPillarData) — `subOffers.variant = "single"` with 4 build types and stack array
- [ ] **Task 5.6** — `src/data/v2/solutions-ia.ts` (CommercialPillarData) — 4 sub-offers in grid mode
- [ ] **Task 5.7** — `src/data/v2/solutions-ia-formation.ts` (SubPageData) — 2 packs (Découverte, Équipe complète)
- [ ] **Task 5.8** — `src/data/v2/solutions-ia-config-claude.ts` (SubPageData) — 1 pack "Sur devis"
- [ ] **Task 5.9** — `src/data/v2/solutions-ia-audit.ts` (SubPageData) — 2 packs (Express 990€, Approfondi 2900€)
- [ ] **Task 5.10** — `src/data/v2/solutions-ia-implementation.ts` (SubPageData) — 1 pack "Sur devis"
- [ ] **Task 5.11** — `src/data/v2/agence.ts` (AgencyPillarData) — 5 sub-pages, with `available: false` for all except `a-propos`
- [ ] **Task 5.12** — `src/data/v2/agence-a-propos.ts` (AProposData) — team, manifesto, values

For each task above, the steps are identical:
1. Write the data file conforming to its type
2. `npm run build` — verify TypeScript accepts it
3. Commit with message `feat(v2): add [file-name] draft data`

### Task 5.13 — Milestone 5 build & lint check

- [ ] **Step 1: Run final checks**
```bash
npm run build && npm run lint
```

---

## Milestone 6 — Home v2 sections

**Goal:** Build all 10 home page section components, then assemble them in `src/app/v2/page.tsx` to replace the placeholder.

### Task 6.1 — `<HomeHeroV2>`

**Files:**
- Create: `src/components/v2/home/HomeHeroV2.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/home/HomeHeroV2.tsx
import { homeData } from "@/data/v2/home";
import { ServiceBadge } from "@/components/v2/shared/ServiceBadge";
import { DualCTA } from "@/components/v2/shared/DualCTA";

export function HomeHeroV2() {
  const { hero } = homeData;
  return (
    <section className="border-b border-foreground/8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-12 md:py-32">
        <div className="flex flex-col justify-center gap-7">
          {hero.badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hero.badges.map((b) => (
                <ServiceBadge key={b.label} badge={b} />
              ))}
            </div>
          )}
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {hero.eyebrow}
          </p>
          <h1 className="font-heading text-5xl font-bold leading-[1.02] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            {hero.headline}
            {hero.headlineAccent && (
              <>
                <br />
                <span className="italic text-accent-primary">{hero.headlineAccent}</span>
              </>
            )}
          </h1>
          <p className="max-w-xl text-base text-foreground/70 md:text-lg">{hero.subHeadline}</p>
          <DualCTA primary={hero.cta.primary} secondary={hero.cta.secondary} size="lg" />
        </div>
        <div className="relative aspect-[4/3.6] overflow-hidden rounded-3xl bg-foreground/5">
          <img src={hero.visual.src} alt={hero.visual.alt} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/home/HomeHeroV2.tsx
git commit -m "feat(v2): add HomeHeroV2"
```

### Task 6.2 — `<HomeLogoStrip>`

**Files:**
- Create: `src/components/v2/home/HomeLogoStrip.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/home/HomeLogoStrip.tsx
import { homeData } from "@/data/v2/home";

export function HomeLogoStrip() {
  const { logoStrip } = homeData;
  return (
    <section className="border-b border-foreground/8 bg-background-surface">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-12 md:px-12">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55">
          {logoStrip.label}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {logoStrip.logos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              className="h-8 w-auto opacity-65 grayscale transition-opacity duration-500 ease-in-out hover:opacity-100 hover:grayscale-0 md:h-10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/home/HomeLogoStrip.tsx
git commit -m "feat(v2): add HomeLogoStrip"
```

### Task 6.3 — `<HomePillarsGrid>`

**Files:**
- Create: `src/components/v2/home/HomePillarsGrid.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/home/HomePillarsGrid.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

export function HomePillarsGrid() {
  const { pillars } = homeData;
  return (
    <SectionContainer id="pillars" eyebrow={pillars.eyebrow} title={pillars.title}>
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.items.map((p) => {
          const Icon = p.icon;
          return (
            <Link
              key={p.title}
              href={p.href}
              className="group flex h-full flex-col gap-5 rounded-2xl border border-foreground/10 bg-background-surface p-8 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Icon className="size-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground">{p.title}</h3>
              <p className="flex-1 text-base text-foreground/70">{p.pitch}</p>
              {p.priceFrom && (
                <p className="text-sm text-foreground/55">
                  À partir de <span className="font-semibold text-foreground">{p.priceFrom}</span>
                </p>
              )}
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                Découvrir <ArrowUpRight className="size-4" />
              </span>
            </Link>
          );
        })}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/home/HomePillarsGrid.tsx
git commit -m "feat(v2): add HomePillarsGrid"
```

### Task 6.4 — `<HomeWhyAurentia>`

**Files:**
- Create: `src/components/v2/home/HomeWhyAurentia.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/home/HomeWhyAurentia.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

export function HomeWhyAurentia() {
  const { whyAurentia } = homeData;
  return (
    <SectionContainer
      eyebrow={whyAurentia.eyebrow}
      title={whyAurentia.title}
      className="bg-background-surface"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {whyAurentia.items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col gap-4 rounded-2xl bg-background p-7"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">{item.title}</h3>
              <p className="text-base text-foreground/65">{item.description}</p>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/home/HomeWhyAurentia.tsx
git commit -m "feat(v2): add HomeWhyAurentia"
```

### Task 6.5 — `<HomeRealisationsPreview>`

**Files:**
- Create: `src/components/v2/home/HomeRealisationsPreview.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/home/HomeRealisationsPreview.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { RealisationCard } from "@/components/v2/shared/RealisationCard";

export function HomeRealisationsPreview() {
  const items = homeData.realisationsPreview;
  return (
    <SectionContainer eyebrow="Réalisations" title="Quelques projets récents">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <RealisationCard key={r.slug} realisation={r} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          href="/v2/agence"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-base font-semibold text-foreground transition-all duration-500 ease-in-out hover:border-foreground/40"
        >
          Voir toutes nos réalisations
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/home/HomeRealisationsPreview.tsx
git commit -m "feat(v2): add HomeRealisationsPreview"
```

### Task 6.6 — `<HomeTestimonialsV2>`

**Files:**
- Create: `src/components/v2/home/HomeTestimonialsV2.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/home/HomeTestimonialsV2.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { TestimonialCard } from "@/components/v2/shared/TestimonialCard";

export function HomeTestimonialsV2() {
  return (
    <SectionContainer
      eyebrow="Témoignages"
      title="Ce qu'ils en disent"
      className="bg-background-surface"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {homeData.testimonials.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/home/HomeTestimonialsV2.tsx
git commit -m "feat(v2): add HomeTestimonialsV2"
```

### Task 6.7 — `<HomeMethodV2>`

**Files:**
- Create: `src/components/v2/home/HomeMethodV2.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/home/HomeMethodV2.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

export function HomeMethodV2() {
  const { method } = homeData;
  return (
    <SectionContainer eyebrow="Notre méthode" title={method.title}>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {method.steps.map((step) => (
          <div key={step.number} className="flex flex-col gap-3">
            <span className="font-heading text-5xl font-bold text-accent-primary/30">
              {step.number}
            </span>
            <h3 className="font-heading text-xl font-bold text-foreground">{step.title}</h3>
            <p className="text-base text-foreground/65">{step.description}</p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/home/HomeMethodV2.tsx
git commit -m "feat(v2): add HomeMethodV2"
```

### Task 6.8 — `<HomeFAQV2>`

**Files:**
- Create: `src/components/v2/home/HomeFAQV2.tsx`

- [ ] **Step 1: Write the component**

```tsx
// src/components/v2/home/HomeFAQV2.tsx
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { FAQAccordion } from "@/components/v2/shared/FAQAccordion";

export function HomeFAQV2() {
  return (
    <SectionContainer
      eyebrow="FAQ"
      title="Vos questions, nos réponses"
      className="bg-background-surface"
      innerClassName="max-w-3xl"
    >
      <FAQAccordion items={homeData.faq} />
    </SectionContainer>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/home/HomeFAQV2.tsx
git commit -m "feat(v2): add HomeFAQV2"
```

### Task 6.9 — `<HomeContactV2>`

**Files:**
- Create: `src/components/v2/home/HomeContactV2.tsx`

> **Reuse note:** The existing `src/components/home/HomeContact.tsx` is wired to N8N webhooks via API routes in `src/app/api/`. For Phase 1 we keep the existing form behavior — copy the form logic from the current HomeContact (but use semantic tokens, no hardcoded colors, and link to homeData.contactCta).

- [ ] **Step 1: Inspect existing form wiring**

```bash
cat src/components/home/HomeContact.tsx | head -80
```
Identify how the form posts to N8N. Note the API route used.

- [ ] **Step 2: Write a fresh HomeContactV2 that reuses the same API endpoint**

```tsx
// src/components/v2/home/HomeContactV2.tsx
"use client";

import { useState } from "react";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { cn } from "@/lib/utils";

export function HomeContactV2() {
  const { contactCta } = homeData;
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    try {
      // NOTE: Verify this matches the actual API route used by HomeContact (from Step 1 inspection)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Échec de l'envoi");
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Une erreur est survenue");
    }
  }

  return (
    <SectionContainer alignHeader="center" innerClassName="max-w-2xl">
      <div className="flex flex-col items-center gap-6 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {contactCta.title}
        </h2>
        <p className="text-base text-foreground/70 md:text-lg">{contactCta.subtitle}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-4 rounded-3xl border border-foreground/10 bg-background-surface p-8 md:p-10"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="name"
            type="text"
            required
            placeholder="Votre nom"
            className="rounded-xl border border-foreground/15 bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-accent-primary focus:outline-none transition-colors duration-500 ease-in-out"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Votre email"
            className="rounded-xl border border-foreground/15 bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-accent-primary focus:outline-none transition-colors duration-500 ease-in-out"
          />
        </div>
        <input
          name="phone"
          type="tel"
          placeholder="Votre téléphone (optionnel)"
          className="rounded-xl border border-foreground/15 bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-accent-primary focus:outline-none transition-colors duration-500 ease-in-out"
        />
        <textarea
          name="message"
          required
          placeholder="Parlez-nous de votre projet"
          rows={5}
          className="rounded-xl border border-foreground/15 bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-accent-primary focus:outline-none transition-colors duration-500 ease-in-out"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90 disabled:opacity-50",
          )}
        >
          {status === "submitting" ? "Envoi…" : contactCta.cta.label}
        </button>
        {status === "success" && (
          <p className="text-base text-accent-primary">
            Message reçu, on revient vers vous sous 24h.
          </p>
        )}
        {status === "error" && errorMessage && (
          <p className="text-base text-destructive">{errorMessage}</p>
        )}
      </form>
    </SectionContainer>
  );
}
```

- [ ] **Step 3: Verify API route still works**

In dev server, submit a test message via the existing site contact form first to confirm the `/api/contact` endpoint behavior, then submit via the new HomeContactV2 once it's wired in. Both should hit the same N8N webhook.

- [ ] **Step 4: Build + commit**

```bash
npm run build
git add src/components/v2/home/HomeContactV2.tsx
git commit -m "feat(v2): add HomeContactV2 form reusing existing N8N webhook"
```

### Task 6.10 — Assemble Home v2

**Files:**
- Modify: `src/app/v2/page.tsx`

- [ ] **Step 1: Replace placeholder home with assembled sections**

```tsx
// src/app/v2/page.tsx
import { HomeHeroV2 } from "@/components/v2/home/HomeHeroV2";
import { HomeLogoStrip } from "@/components/v2/home/HomeLogoStrip";
import { HomePillarsGrid } from "@/components/v2/home/HomePillarsGrid";
import { HomeWhyAurentia } from "@/components/v2/home/HomeWhyAurentia";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";
import { HomeTestimonialsV2 } from "@/components/v2/home/HomeTestimonialsV2";
import { HomeMethodV2 } from "@/components/v2/home/HomeMethodV2";
import { HomeFAQV2 } from "@/components/v2/home/HomeFAQV2";
import { HomeContactV2 } from "@/components/v2/home/HomeContactV2";

export default function HomeV2() {
  return (
    <>
      <HomeHeroV2 />
      <HomeLogoStrip />
      <HomePillarsGrid />
      <HomeWhyAurentia />
      <HomeRealisationsPreview />
      <HomeTestimonialsV2 />
      <HomeMethodV2 />
      <HomeFAQV2 />
      <HomeContactV2 />
    </>
  );
}
```

- [ ] **Step 2: Visual smoke check**

```bash
npm run dev
```
Visit `http://localhost:3000/v2` — all 9 sections render in order, no console errors. Toggle dark mode. Resize to mobile. Verify the FAQ accordion opens/closes smoothly, the navbar mega-menus still work, the form posts.

- [ ] **Step 3: Commit**

```bash
git add src/app/v2/page.tsx
git commit -m "feat(v2): assemble Home v2 with all 9 sections"
```

### Task 6.11 — Milestone 6 build & lint check

- [ ] **Step 1: Run checks**
```bash
npm run build && npm run lint
```

---

## Milestone 7 — Wire commercial pillar pages + sub-pages

**Goal:** Every commercial pillar route and every sub-page route loads the right data and renders via the templates.

### Task 7.1 — `/v2/sites-web` page

**Files:**
- Create: `src/app/v2/sites-web/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// src/app/v2/sites-web/page.tsx
import type { Metadata } from "next";
import { CommercialPillarPage } from "@/components/v2/pillar/CommercialPillarPage";
import { sitesWebData } from "@/data/v2/sites-web";

export const metadata: Metadata = {
  title: "Sites Web sur-mesure",
  description:
    "Sites vitrines et landing pages livrés en jours grâce à l'IA. Pour TPE, artisans, commerces et startups.",
};

export default function SitesWebPillarPage() {
  return <CommercialPillarPage data={sitesWebData} />;
}
```

- [ ] **Step 2: Build, visual check, commit**

```bash
npm run build
```
Visit `/v2/sites-web` in dev server, verify hero/stats/sub-offers grid/forWho/method/realisations/testimonials/FAQ/CTA all render correctly. Light + dark.

```bash
git add src/app/v2/sites-web/page.tsx
git commit -m "feat(v2): wire /v2/sites-web pillar page"
```

### Task 7.2 — `/v2/sites-web/site-vitrine` page

**Files:**
- Create: `src/app/v2/sites-web/site-vitrine/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// src/app/v2/sites-web/site-vitrine/page.tsx
import type { Metadata } from "next";
import { SubPage } from "@/components/v2/subpage/SubPage";
import { sitesWebVitrineData } from "@/data/v2/sites-web-vitrine";

export const metadata: Metadata = {
  title: "Site vitrine sur-mesure dès 1 200 €",
  description:
    "Site vitrine professionnel livré en 48h à 5 jours. Sur-mesure, optimisé SEO, prêt à convertir.",
};

export default function SiteVitrinePage() {
  return <SubPage data={sitesWebVitrineData} />;
}
```

- [ ] **Step 2: Build, visual check, commit**

```bash
npm run build
git add src/app/v2/sites-web/site-vitrine/page.tsx
git commit -m "feat(v2): wire /v2/sites-web/site-vitrine sub-page"
```

### Task 7.3 — `/v2/sites-web/landing-page`

**Files:**
- Create: `src/app/v2/sites-web/landing-page/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// src/app/v2/sites-web/landing-page/page.tsx
import type { Metadata } from "next";
import { SubPage } from "@/components/v2/subpage/SubPage";
import { sitesWebLandingData } from "@/data/v2/sites-web-landing";

export const metadata: Metadata = {
  title: "Landing pages haute conversion dès 1 500 €",
  description:
    "Landing pages design spectaculaire, optimisées conversion. Pour startups et SaaS.",
};

export default function LandingPageSubpage() {
  return <SubPage data={sitesWebLandingData} />;
}
```

- [ ] **Step 2: Build, visual check, commit**

```bash
npm run build
git add src/app/v2/sites-web/landing-page/page.tsx
git commit -m "feat(v2): wire /v2/sites-web/landing-page sub-page"
```

### Task 7.4 — `/v2/saas`

**Files:**
- Create: `src/app/v2/saas/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// src/app/v2/saas/page.tsx
import type { Metadata } from "next";
import { CommercialPillarPage } from "@/components/v2/pillar/CommercialPillarPage";
import { saasData } from "@/data/v2/saas";

export const metadata: Metadata = {
  title: "SaaS sur-mesure",
  description:
    "MVP SaaS livré en 1 à 2 semaines. Architecture pro, IA intégrée, design soigné. À partir de 5 000 €.",
};

export default function SaasPillarPage() {
  return <CommercialPillarPage data={saasData} />;
}
```

- [ ] **Step 2: Build, visual check, commit**

Verify the `subOffers.variant === "single"` branch renders the "Ce qu'on construit" cards plus the stack section.

```bash
npm run build
git add src/app/v2/saas/page.tsx
git commit -m "feat(v2): wire /v2/saas pillar page (single variant)"
```

### Task 7.5 — `/v2/solutions-ia`

**Files:**
- Create: `src/app/v2/solutions-ia/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// src/app/v2/solutions-ia/page.tsx
import type { Metadata } from "next";
import { CommercialPillarPage } from "@/components/v2/pillar/CommercialPillarPage";
import { solutionsIaData } from "@/data/v2/solutions-ia";

export const metadata: Metadata = {
  title: "Solutions IA pour entreprises",
  description:
    "Formation, configuration Claude, audit et implémentation IA. L'IA dans votre quotidien business.",
};

export default function SolutionsIaPillarPage() {
  return <CommercialPillarPage data={solutionsIaData} />;
}
```

- [ ] **Step 2: Build, visual check, commit**

```bash
npm run build
git add src/app/v2/solutions-ia/page.tsx
git commit -m "feat(v2): wire /v2/solutions-ia pillar page"
```

### Task 7.6 — Solutions IA sub-pages (4 files)

**Files (4):**
- Create: `src/app/v2/solutions-ia/formation-ia/page.tsx`
- Create: `src/app/v2/solutions-ia/configuration-claude/page.tsx`
- Create: `src/app/v2/solutions-ia/audit/page.tsx`
- Create: `src/app/v2/solutions-ia/implementation-ia/page.tsx`

> **Pattern:** Each follows the exact same shape as Task 7.2/7.3 — import the corresponding data file, return `<SubPage data={...} />`, set metadata. One commit per file.

- [ ] **Step 1: Write `formation-ia/page.tsx`**

```tsx
// src/app/v2/solutions-ia/formation-ia/page.tsx
import type { Metadata } from "next";
import { SubPage } from "@/components/v2/subpage/SubPage";
import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";

export const metadata: Metadata = {
  title: "Formation IA pour entreprises",
  description:
    "Vidéos, cours et skills pour maîtriser Claude AI, le prompting avancé et l'automatisation IA.",
};

export default function FormationIaPage() {
  return <SubPage data={solutionsIaFormationData} />;
}
```

- [ ] **Step 2: Write `configuration-claude/page.tsx`** (same shape)
- [ ] **Step 3: Write `audit/page.tsx`** (same shape)
- [ ] **Step 4: Write `implementation-ia/page.tsx`** (same shape)
- [ ] **Step 5: Build + visual check each route in dev server**
- [ ] **Step 6: Commit all four files together**

```bash
npm run build
git add src/app/v2/solutions-ia/formation-ia/page.tsx \
        src/app/v2/solutions-ia/configuration-claude/page.tsx \
        src/app/v2/solutions-ia/audit/page.tsx \
        src/app/v2/solutions-ia/implementation-ia/page.tsx
git commit -m "feat(v2): wire 4 solutions-ia sub-pages"
```

### Task 7.7 — Milestone 7 build & lint check

- [ ] **Step 1: Run checks**
```bash
npm run build && npm run lint
```
- [ ] **Step 2: Manual walkthrough** — visit each new route in dev server, light + dark, mobile + desktop. Capture any visual issue as a follow-up note (don't fix in this milestone unless trivial).

---

## Milestone 8 — Agency pillar + à propos + contact

**Goal:** `/v2/agence`, `/v2/agence/a-propos` and `/v2/contact` are built and shippable.

### Task 8.1 — `<AgencyPillarPage>` template

**Files:**
- Create: `src/components/v2/pillar/AgencyPillarPage.tsx`

- [ ] **Step 1: Write the template**

```tsx
// src/components/v2/pillar/AgencyPillarPage.tsx
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { AgencyPillarData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { DualCTA } from "@/components/v2/shared/DualCTA";
import { cn } from "@/lib/utils";

type AgencyPillarPageProps = {
  data: AgencyPillarData;
};

export function AgencyPillarPage({ data }: AgencyPillarPageProps) {
  return (
    <>
      <section className="border-b border-foreground/8">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-7 px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {data.hero.eyebrow}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {data.hero.headline}
          </h1>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">{data.hero.subHeadline}</p>
          <DualCTA primary={data.hero.cta.primary} secondary={data.hero.cta.secondary} size="lg" />
        </div>
      </section>

      <SectionContainer eyebrow="L'agence" title="Tout ce qui constitue Aurentia">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.subPages.map((p) => {
            const Icon = p.icon;
            const Wrapper = p.available
              ? ({ children }: { children: React.ReactNode }) => (
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface p-7 transition-all duration-500 ease-in-out hover:border-foreground/20 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
                  >
                    {children}
                  </Link>
                )
              : ({ children }: { children: React.ReactNode }) => (
                  <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface p-7 opacity-70">
                    <span className="absolute right-4 top-4 rounded-full bg-foreground/10 px-2.5 py-1 text-sm font-semibold text-foreground/65">
                      Bientôt
                    </span>
                    {children}
                  </div>
                );
            return (
              <Wrapper key={p.title}>
                <div className="flex size-12 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">{p.title}</h3>
                <p className="flex-1 text-base text-foreground/65">{p.description}</p>
                {p.available && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-primary transition-transform duration-500 ease-in-out group-hover:translate-x-1">
                    Découvrir <ArrowUpRight className="size-4" />
                  </span>
                )}
              </Wrapper>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer
        eyebrow="Notre histoire"
        title={data.story.title}
        className="bg-background-surface"
        innerClassName="max-w-3xl"
      >
        <p className="text-base leading-relaxed text-foreground/75 md:text-lg">{data.story.paragraph}</p>
      </SectionContainer>

      <SectionContainer eyebrow="L'équipe" title={data.teamPreview.title}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.teamPreview.members.map((m) => (
            <div key={m.name} className="flex flex-col items-center gap-3 text-center">
              {m.avatarUrl ? (
                <img src={m.avatarUrl} alt={m.name} className="size-24 rounded-full object-cover" />
              ) : (
                <div className="size-24 rounded-full bg-foreground/10" aria-hidden />
              )}
              <h3 className="font-heading text-lg font-bold text-foreground">{m.name}</h3>
              <p className="text-sm text-foreground/55">{m.role}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link
            href={data.teamPreview.seeAllHref}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-base font-semibold text-foreground transition-all duration-500 ease-in-out hover:border-foreground/40"
          >
            Voir l'équipe complète
          </Link>
        </div>
      </SectionContainer>

      <SectionContainer alignHeader="center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {data.finalCta.title}
          </h2>
          <p className="text-base text-foreground/70 md:text-lg">{data.finalCta.subtitle}</p>
          <DualCTA primary={data.finalCta.cta} size="lg" />
        </div>
      </SectionContainer>
    </>
  );
}
```

- [ ] **Step 2: Build + commit**

```bash
npm run build
git add src/components/v2/pillar/AgencyPillarPage.tsx
git commit -m "feat(v2): add AgencyPillarPage template"
```

### Task 8.2 — `/v2/agence` page

**Files:**
- Create: `src/app/v2/agence/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// src/app/v2/agence/page.tsx
import type { Metadata } from "next";
import { AgencyPillarPage } from "@/components/v2/pillar/AgencyPillarPage";
import { agenceData } from "@/data/v2/agence";

export const metadata: Metadata = {
  title: "L'agence",
  description: "Aurentia : équipe, méthode, manifeste, réalisations et ressources.",
};

export default function AgencePage() {
  return <AgencyPillarPage data={agenceData} />;
}
```

- [ ] **Step 2: Build, visual check, commit**

```bash
npm run build
git add src/app/v2/agence/page.tsx
git commit -m "feat(v2): wire /v2/agence pillar page"
```

### Task 8.3 — `/v2/agence/a-propos` page

**Files:**
- Create: `src/app/v2/agence/a-propos/page.tsx`
- Create (or extend): a small `<AProposContent>` inline section composer (the data is rich enough that we don't need a full template — inline is fine for this single page)

- [ ] **Step 1: Write the page with inline sections**

```tsx
// src/app/v2/agence/a-propos/page.tsx
import type { Metadata } from "next";
import { aProposData } from "@/data/v2/agence-a-propos";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { DualCTA } from "@/components/v2/shared/DualCTA";

export const metadata: Metadata = {
  title: "À propos d'Aurentia",
  description: "Notre équipe, notre méthode, notre manifeste.",
};

export default function AProposPage() {
  return (
    <>
      <section className="border-b border-foreground/8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center md:px-12 md:py-32">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {aProposData.hero.eyebrow}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {aProposData.hero.headline}
          </h1>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            {aProposData.hero.subHeadline}
          </p>
        </div>
      </section>

      <SectionContainer
        eyebrow="Manifeste"
        title={aProposData.manifesto.title}
        innerClassName="max-w-3xl"
      >
        <div className="flex flex-col gap-5 text-base leading-relaxed text-foreground/75 md:text-lg">
          {aProposData.manifesto.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer
        eyebrow="L'équipe"
        title={aProposData.team.title}
        className="bg-background-surface"
      >
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {aProposData.team.members.map((m) => (
            <div key={m.name} className="flex flex-col gap-4 rounded-2xl bg-background p-7">
              <div className="flex items-center gap-4">
                {m.avatarUrl ? (
                  <img src={m.avatarUrl} alt={m.name} className="size-16 rounded-full object-cover" />
                ) : (
                  <div className="size-16 rounded-full bg-foreground/10" aria-hidden />
                )}
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground">{m.name}</h3>
                  <p className="text-sm text-foreground/55">{m.role}</p>
                </div>
              </div>
              <p className="text-base text-foreground/70">{m.bio}</p>
            </div>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer eyebrow="Nos valeurs" title={aProposData.values.title}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aProposData.values.items.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-background-surface p-7"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">{v.title}</h3>
                <p className="text-base text-foreground/65">{v.description}</p>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      <SectionContainer alignHeader="center">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {aProposData.finalCta.title}
          </h2>
          <p className="text-base text-foreground/70 md:text-lg">{aProposData.finalCta.subtitle}</p>
          <DualCTA primary={aProposData.finalCta.cta} size="lg" />
        </div>
      </SectionContainer>
    </>
  );
}
```

- [ ] **Step 2: Build, visual check, commit**

```bash
npm run build
git add src/app/v2/agence/a-propos/page.tsx
git commit -m "feat(v2): wire /v2/agence/a-propos page"
```

### Task 8.4 — `/v2/contact` page

**Files:**
- Create: `src/app/v2/contact/page.tsx`

- [ ] **Step 1: Write the page**

```tsx
// src/app/v2/contact/page.tsx
import type { Metadata } from "next";
import { HomeContactV2 } from "@/components/v2/home/HomeContactV2";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Discutons de votre projet. Réponse en moins de 24h.",
};

export default function ContactV2Page() {
  return (
    <>
      <section className="border-b border-foreground/8">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center md:px-12 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Contact
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Parlons de votre projet
          </h1>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            Réponse en moins de 24h. Pas de SDR, pas de pitch — directement avec l'équipe technique.
          </p>
        </div>
      </section>
      <HomeContactV2 />
    </>
  );
}
```

- [ ] **Step 2: Verify form submits to N8N webhook in dev server**
- [ ] **Step 3: Commit**

```bash
npm run build
git add src/app/v2/contact/page.tsx
git commit -m "feat(v2): wire /v2/contact page reusing HomeContactV2 form"
```

### Task 8.5 — Milestone 8 build & lint check

- [ ] **Step 1: Run checks**
```bash
npm run build && npm run lint
```

---

## Milestone 9 — Cross-cutting verification

**Goal:** Phase 1 is shippable. Build is clean, lint passes, every page renders correctly in light AND dark, on mobile AND desktop, with reasonable a11y and SEO basics.

### Task 9.1 — Full build verification

- [ ] **Step 1: Clean build**
```bash
rm -rf .next
npm run build
```
Expected: build succeeds, all 12 v2 routes appear in the route summary. No type errors, no runtime warnings.

### Task 9.2 — Lint pass

- [ ] **Step 1: Lint**
```bash
npm run lint
```
Expected: 0 errors. Warnings acceptable but should be reviewed.

### Task 9.3 — Manual walkthrough — light mode

- [ ] **Step 1: Start dev**
```bash
npm run dev
```
- [ ] **Step 2: Visit each route in light mode** and verify it renders without console errors:
  - [ ] `/v2`
  - [ ] `/v2/sites-web`
  - [ ] `/v2/sites-web/site-vitrine`
  - [ ] `/v2/sites-web/landing-page`
  - [ ] `/v2/saas`
  - [ ] `/v2/solutions-ia`
  - [ ] `/v2/solutions-ia/formation-ia`
  - [ ] `/v2/solutions-ia/configuration-claude`
  - [ ] `/v2/solutions-ia/audit`
  - [ ] `/v2/solutions-ia/implementation-ia`
  - [ ] `/v2/agence`
  - [ ] `/v2/agence/a-propos`
  - [ ] `/v2/contact`
- [ ] **Step 3: Note any visual issue in a follow-up file** (don't fix during walkthrough — fix-then-rewalk is wasteful)

### Task 9.4 — Manual walkthrough — dark mode

- [ ] **Step 1: Toggle dark mode** via the theme switcher
- [ ] **Step 2: Re-walk every route** and verify nothing has hardcoded white/black, all text is readable, all backgrounds invert correctly. Issues that may surface: `bg-background-surface` becoming invisible against `bg-background`, focus rings missing in dark, badge contrast.

### Task 9.5 — Responsive walkthrough

- [ ] **Step 1: Pick 3 representative routes** — `/v2` (home), `/v2/sites-web` (commercial pillar), `/v2/sites-web/site-vitrine` (sub-page).
- [ ] **Step 2: Test 3 viewports** in browser devtools:
  - 375px — mobile
  - 768px — tablet
  - 1280px — desktop
- [ ] **Step 3: Verify**: navbar collapses to hamburger, mega-menus become accordions, all text remains ≥ `text-sm`, no horizontal scroll, popups (FAQ accordion, pricing recommended badge) have margins from the screen edges.

### Task 9.6 — Accessibility quick audit

- [ ] **Step 1: Keyboard navigation** — tab through `/v2` and verify every interactive element receives a visible focus ring and can be activated with Enter/Space.
- [ ] **Step 2: Image alt texts** — verify every `<img>` has a non-empty alt attribute (or `alt=""` for purely decorative images).
- [ ] **Step 3: Aria** — mega menus have `role="menu"`/`role="menuitem"`, the mobile burger button has an `aria-label` that updates with state.
- [ ] **Step 4: Contrast** — spot-check 3 different text/bg pairs against WCAG AA (4.5:1 for body text). The semantic tokens should already enforce this but verify visually in both themes.

### Task 9.7 — SEO metadata check

- [ ] **Step 1:** For each of the 12 routes, view source in dev server and verify:
  - `<title>` exists and matches `metadata.title` from the page
  - `<meta name="description">` exists and matches
  - No duplicate titles across pages
- [ ] **Step 2: Add OG metadata** if missing — at minimum `openGraph.title` and `openGraph.description` per page. Use the existing OG image (`/images/opengraph/opengraph.png`) as default.

### Task 9.8 — Final build, lint, commit

- [ ] **Step 1: Final clean build + lint**
```bash
rm -rf .next
npm run build
npm run lint
```
Expected: both pass cleanly.

- [ ] **Step 2: Final commit if any fixes were made during walkthrough**
```bash
git add .
git commit -m "fix(v2): walkthrough fixes for Phase 1 release readiness"
```

- [ ] **Step 3: Push branch and prepare for review**
```bash
git push -u origin <branch-name>
```
(Branch should be `feat/v2-redesign-phase1` if not already.)

---

## Phase 1 Done — what's NOT in this plan

These are explicitly out of Phase 1 and tracked separately:

- **Realisations CMS** (`/v2/agence/realisations` + `[slug]`) — Phase 2
- **Blog CMS** (`/v2/agence/blog` + `[slug]`) — Phase 2
- **Ressources** (`/v2/agence/ressources` + `[slug]`) — Phase 3
- **Affiliation** (`/v2/agence/affiliation`) — Phase 3
- **The swap** (moving `/v2/*` to `/*`, archiving the legacy site, 301 redirects) — separate plan after Phase 1 is validated by Elliot

---

## Self-Review Notes

This plan has been self-reviewed against the spec on 2026-04-13:

**Spec coverage:**
- Section 2 (positioning) → embedded in `home.ts` hero & subHeadline ✓
- Section 3.1 (sitemap) → all Phase 1 routes have a task in Milestone 7 or 8 ✓
- Section 3.2 (navbar) → Tasks 2.1–2.7 ✓
- Section 3.3 (footer) → Task 2.6 ✓
- Section 4 (routing/phasing) → entire plan scoped to Phase 1 ✓
- Section 5.1 (home structure) → Milestone 6 ✓
- Section 5.2 (commercial pillar) → Milestone 3 ✓
- Section 5.3 (agency pillar) → Milestone 8 (light version, as spec'd) ✓
- Section 5.4 (sub-page) → Milestone 4 ✓
- Section 6 (component arch) → mirrored 1:1 in the File Structure ✓
- Section 7 (transversal rules) → enforced via testing discipline + `text-sm` minimum + 500ms+ transitions in every component ✓
- Section 9 (success criteria) → verified in Milestone 9 ✓

**Placeholder scan:** No "TBD" / "implement later" / "add error handling" steps. Tasks 5.2–5.12 reference the type definitions and pattern from Task 5.1 instead of inlining all 12 data files (intentional, to keep plan readable; pattern is fully specified).

**Type consistency:** All component props reference `CommercialPillarData`, `SubPageData`, `HomeData`, `AgencyPillarData`, `AProposData` types defined in Task 0.1. Function names checked — `homeData`, `sitesWebData`, `sitesWebVitrineData`, `sitesWebLandingData`, `saasData`, `solutionsIaData`, `solutionsIaFormationData`, `solutionsIaConfigClaudeData`, `solutionsIaAuditData`, `solutionsIaImplementationData`, `agenceData`, `aProposData` — these are the exact names imported in Milestones 7 and 8 page files. Match.

**Known gaps deliberately deferred:**
- Real client logos in `HomeLogoStrip` — placeholder paths `/images/v2/logos/*.svg` need actual files
- Real realisation images in cards
- Real testimonials with consent
- Real team avatars in `/agence/a-propos`
- Hero visual `/images/v2/hero-home.jpg`
- Final wording of the home headline (currently `L'IA dans vos produits. / L'IA dans votre quotidien.` — to be validated with Elliot)

These are content tasks, not engineering tasks, and are tracked in spec section 8.
