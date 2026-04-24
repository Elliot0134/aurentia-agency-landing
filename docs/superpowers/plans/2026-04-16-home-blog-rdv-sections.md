# Home /v2 — Sections Blog & RDV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter deux nouvelles sections sur la home `/v2` — preview d'articles de blog (3 articles mock) et CTA compacte "Prenons 15 minutes ensemble" avec lien externe vers Calendly/Cal.com.

**Architecture:** Deux nouveaux components client React dans `src/components/v2/home/`, données mock dans `src/data/v2/home.ts`, types dans `src/data/v2/types.ts`, 3 SVG placeholder 16:9 dans `public/images/v2/blog/`. Réutilise les primitives existantes (`SectionContainer`, `SpotlightCard`, `BlurReveal`, `SectionDivider`). Pas de test framework dans le projet — la validation se fait via `npm run lint`, `npm run build` et vérification visuelle dans le navigateur.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, lucide-react (icônes), GSAP (via `BlurReveal`).

---

## File Structure

**Fichiers créés :**
- `src/components/v2/home/HomeBlogPreview.tsx` — section blog, component client, grid 3 cards avec SpotlightCard + BlurReveal
- `src/components/v2/home/HomeBookingCTA.tsx` — section RDV compacte, CTA externe vers Cal.com
- `public/images/v2/blog/blog-1.svg` — placeholder 16:9 pour article IA (gradient accent orange)
- `public/images/v2/blog/blog-2.svg` — placeholder 16:9 pour article Sites Web (gradient neutre clair)
- `public/images/v2/blog/blog-3.svg` — placeholder 16:9 pour article SaaS (gradient foreground subtil)

**Fichiers modifiés :**
- `src/data/v2/types.ts` — ajout des types `BlogArticlePreview`, `BookingCtaSignal`, extension de `HomeData`
- `src/data/v2/home.ts` — ajout des données `blogPreview` et `bookingCta`, import des nouvelles icônes lucide
- `src/app/v2/page.tsx` — imports + JSX des 2 sections avec `SectionDivider`, ajout Blog dans `subNavItems`

---

## Task 1 : Types TypeScript

**Files:**
- Modify: `src/data/v2/types.ts`

- [ ] **Step 1 : Ajouter les types `BlogArticlePreview` et `BookingCtaSignal`**

Dans `src/data/v2/types.ts`, sous la section `/* Generic building blocks */` (après le type `Testimonial` à la ligne ~68), ajouter :

```ts
export type BlogArticlePreview = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;          // ISO format: "2026-04-10"
  readingTime: string;   // ex: "5 min"
  imageUrl: string;
  href: string;
};

export type BookingCtaSignal = {
  icon: LucideIcon;
  label: string;
};
```

- [ ] **Step 2 : Étendre le type `HomeData`**

Dans `src/data/v2/types.ts`, dans le type `HomeData` (ligne ~74), ajouter `blogPreview` et `bookingCta` **avant** `contactCta`. Le type final doit ressembler à :

```ts
export type HomeData = {
  hero: {
    eyebrow?: string;
    headline: string;
    headlineAccent?: string;
    subHeadline: string;
    badges?: Badge[];
    cta: DualCTA;
    visual?: { kind: "image"; src: string; alt: string };
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
    items: {
      icon?: LucideIcon;
      image?: string;
      title: string;
      description: string;
    }[];
  };
  realisationsPreview: Realisation[];
  testimonials: Testimonial[];
  method: {
    title: string;
    steps: ProcessStep[];
  };
  blogPreview: {
    title: string;
    articles: BlogArticlePreview[];
    seeAllCta: CTA;
  };
  faq: FAQItem[];
  bookingCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    signals: BookingCtaSignal[];
    cta: CTA;
    secondaryLink: CTA;
  };
  contactCta: {
    title: string;
    subtitle: string;
    cta: CTA;
  };
};
```

- [ ] **Step 3 : Vérifier le lint**

Run: `npm run lint`
Expected: aucune erreur liée à `types.ts` (il peut rester d'autres warnings préexistants).

- [ ] **Step 4 : Commit**

```bash
git add src/data/v2/types.ts
git commit -m "feat(v2/home): add types for blog preview and booking CTA sections"
```

---

## Task 2 : Images placeholder SVG

**Files:**
- Create: `public/images/v2/blog/blog-1.svg`
- Create: `public/images/v2/blog/blog-2.svg`
- Create: `public/images/v2/blog/blog-3.svg`

- [ ] **Step 1 : Créer `public/images/v2/blog/blog-1.svg`**

Article IA — gradient accent orange (Aurentia brand).

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="Article blog — IA">
  <defs>
    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1a1a18"/>
      <stop offset="60%" stop-color="#c96442"/>
      <stop offset="100%" stop-color="#e8a08a"/>
    </linearGradient>
    <pattern id="grain1" width="3" height="3" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.4" fill="rgba(255,255,255,0.06)"/>
    </pattern>
  </defs>
  <rect width="1200" height="675" fill="url(#g1)"/>
  <rect width="1200" height="675" fill="url(#grain1)"/>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="rgba(255,255,255,0.85)">
    <text x="60" y="100" font-size="20" letter-spacing="4">IA · CLAUDE</text>
    <text x="60" y="560" font-size="96" font-weight="700" letter-spacing="-2">Claude.</text>
    <text x="60" y="620" font-size="28" opacity="0.7">Automations internes</text>
  </g>
</svg>
```

- [ ] **Step 2 : Créer `public/images/v2/blog/blog-2.svg`**

Article Sites Web — gradient neutre clair.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="Article blog — Sites Web">
  <defs>
    <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f5f0e8"/>
      <stop offset="50%" stop-color="#e8ddc9"/>
      <stop offset="100%" stop-color="#c96442" stop-opacity="0.35"/>
    </linearGradient>
    <pattern id="grid2" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(26,26,24,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="675" fill="url(#g2)"/>
  <rect width="1200" height="675" fill="url(#grid2)"/>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="rgba(26,26,24,0.7)">
    <text x="60" y="100" font-size="20" letter-spacing="4">SITES WEB · CONVERSION</text>
  </g>
  <g font-family="serif" fill="#1a1a18">
    <text x="60" y="540" font-size="96" font-weight="700" letter-spacing="-2">Convertir.</text>
    <text x="60" y="600" font-size="28" opacity="0.6" font-family="ui-monospace, Menlo, monospace">5 erreurs, 7 jours</text>
  </g>
</svg>
```

- [ ] **Step 3 : Créer `public/images/v2/blog/blog-3.svg`**

Article SaaS — gradient sombre subtil.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="Article blog — SaaS">
  <defs>
    <linearGradient id="g3" x1="0" y1="0" x2="1" y2="0.6">
      <stop offset="0%" stop-color="#1a1a18"/>
      <stop offset="60%" stop-color="#2a2a28"/>
      <stop offset="100%" stop-color="#c96442" stop-opacity="0.4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#g3)"/>
  <g stroke="rgba(255,255,255,0.08)" stroke-width="1" fill="none">
    <path d="M 0 400 Q 300 340 600 380 T 1200 360"/>
    <path d="M 0 430 Q 300 370 600 410 T 1200 390"/>
    <path d="M 0 460 Q 300 400 600 440 T 1200 420"/>
  </g>
  <g font-family="ui-monospace, SFMono-Regular, Menlo, monospace" fill="rgba(255,255,255,0.85)">
    <text x="60" y="100" font-size="20" letter-spacing="4">SAAS · MVP</text>
    <text x="60" y="560" font-size="96" font-weight="700" letter-spacing="-2">12 jours.</text>
    <text x="60" y="620" font-size="28" opacity="0.7">Du brief au lancement</text>
  </g>
</svg>
```

- [ ] **Step 4 : Vérifier les fichiers sont valides**

Run: `ls -la public/images/v2/blog/`
Expected: les 3 fichiers `blog-1.svg`, `blog-2.svg`, `blog-3.svg` présents avec une taille > 0.

- [ ] **Step 5 : Commit**

```bash
git add public/images/v2/blog/
git commit -m "feat(v2/home): add placeholder SVG thumbnails for blog preview section"
```

---

## Task 3 : Données mock dans `home.ts`

**Files:**
- Modify: `src/data/v2/home.ts`

- [ ] **Step 1 : Ajouter les nouveaux imports d'icônes lucide**

Dans `src/data/v2/home.ts`, modifier le bloc d'import de lucide-react (lignes 6-17) en ajoutant `CalendarCheck`, `Clock`, `ShieldCheck` :

```ts
import {
  Globe,
  Code2,
  BrainCircuit,
  Sparkles,
  Tag,
  Layers,
  Headphones,
  MessageSquare,
  FileText,
  Hammer,
  Rocket,
  CalendarCheck,
  Clock,
  ShieldCheck,
} from "lucide-react";
```

- [ ] **Step 2 : Ajouter les données `blogPreview` dans `homeData`**

Dans `homeData`, **avant** le champ `faq` (ligne ~204), insérer :

```ts
  blogPreview: {
    title: "Dernières publications",
    articles: [
      {
        slug: "automatiser-40-pourcent-admin-avec-claude",
        category: "IA",
        title: "Comment on a automatisé 40% de nos tâches admin avec Claude",
        excerpt:
          "Retour d'expérience : les workflows, skills et automations qu'on a déployés en interne pour gagner 2 jours par semaine.",
        date: "2026-04-10",
        readingTime: "6 min",
        imageUrl: "/images/v2/blog/blog-1.svg",
        href: "/blog/automatiser-40-pourcent-admin-avec-claude",
      },
      {
        slug: "pourquoi-votre-site-ne-convertit-pas",
        category: "Sites Web",
        title: "Pourquoi votre site ne convertit pas (et comment corriger en 7 jours)",
        excerpt:
          "Les 5 erreurs qu'on voit sur 8 sites sur 10 — et le plan concret pour les corriger sans tout refondre.",
        date: "2026-04-03",
        readingTime: "5 min",
        imageUrl: "/images/v2/blog/blog-2.svg",
        href: "/blog/pourquoi-votre-site-ne-convertit-pas",
      },
      {
        slug: "mvp-en-12-jours-notre-methode",
        category: "SaaS",
        title: "MVP en 12 jours : la méthode qu'on utilise pour nos clients",
        excerpt:
          "Stack, découpage, choix techniques, outils IA : comment on livre un MVP fonctionnel en 2 semaines sans rogner sur la qualité.",
        date: "2026-03-27",
        readingTime: "8 min",
        imageUrl: "/images/v2/blog/blog-3.svg",
        href: "/blog/mvp-en-12-jours-notre-methode",
      },
    ],
    seeAllCta: { label: "Voir tous les articles", href: "/blog" },
  },
```

- [ ] **Step 3 : Ajouter les données `bookingCta` dans `homeData`**

Dans `homeData`, **entre** le champ `faq` et le champ `contactCta` (juste avant la ligne `contactCta: {`), insérer :

```ts
  bookingCta: {
    eyebrow: "Plus rapide",
    title: "Prenons 15 minutes ensemble",
    subtitle:
      "Un appel rapide pour comprendre votre besoin et vous dire si on peut vous aider. Sans engagement.",
    signals: [
      { icon: CalendarCheck, label: "Créneau sous 48h" },
      { icon: Clock, label: "15 min chrono" },
      { icon: ShieldCheck, label: "Sans engagement" },
    ],
    cta: {
      label: "Réserver un créneau",
      href: "https://cal.com/aurentia-agency",
    },
    secondaryLink: {
      label: "ou envoyez-nous un brief détaillé",
      href: "#contact",
    },
  },
```

- [ ] **Step 4 : Vérifier la compilation TypeScript**

Run: `npx tsc --noEmit`
Expected: pas d'erreur TypeScript sur `types.ts` ni `home.ts`. (Il peut rester des erreurs préexistantes sur d'autres fichiers — ignore-les si elles ne concernent pas nos modifs.)

- [ ] **Step 5 : Commit**

```bash
git add src/data/v2/home.ts
git commit -m "feat(v2/home): add mock data for blog preview and booking CTA sections"
```

---

## Task 4 : Component `HomeBlogPreview`

**Files:**
- Create: `src/components/v2/home/HomeBlogPreview.tsx`

- [ ] **Step 1 : Créer le fichier `HomeBlogPreview.tsx`**

```tsx
// src/components/v2/home/HomeBlogPreview.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import type { BlogArticlePreview } from "@/data/v2/types";

function formatDateFr(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleCard({ article }: { article: BlogArticlePreview }) {
  return (
    <Link
      href={article.href}
      className="block h-full"
      data-cursor="click"
    >
      <SpotlightCard className="group flex h-full flex-col overflow-hidden p-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60">
            <span>{article.category}</span>
            <span className="text-foreground/30">·</span>
            <span>{article.readingTime}</span>
          </div>

          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground md:text-xl">
            {article.title}
          </h3>

          <p className="line-clamp-2 text-sm text-foreground/70">
            {article.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2 text-sm font-mono">
            <span className="text-foreground/50">{formatDateFr(article.date)}</span>
            <span className="flex items-center gap-1 text-foreground/60 transition-all duration-500 ease-in-out group-hover:text-accent-primary group-hover:translate-x-0.5">
              Lire
              <ArrowRight className="size-3.5" />
            </span>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}

export function HomeBlogPreview() {
  const { blogPreview } = homeData;

  return (
    <SectionContainer id="blog" title={blogPreview.title}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
        {blogPreview.articles.map((article, idx) => (
          <BlurReveal key={article.slug} delay={idx * 0.1} className="h-full">
            <ArticleCard article={article} />
          </BlurReveal>
        ))}
      </div>

      <BlurReveal delay={0.35}>
        <div className="mt-12 flex justify-center">
          <Link
            href={blogPreview.seeAllCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
          >
            {blogPreview.seeAllCta.label}
            <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </Link>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
```

**Notes:**
- `aspect-[16/9]` respecte le ratio 16:9 demandé.
- `line-clamp-2` tronque proprement titre et extrait à 2 lignes.
- Utilise les tokens sémantiques (`foreground`, `accent-primary`) → compatible light/dark.
- Toutes les transitions en `duration-500 ease-in-out` (respect CLAUDE.md).
- `text-sm` est la taille minimum utilisée (respect CLAUDE.md).
- `formatDateFr` convertit l'ISO en date française lisible.

- [ ] **Step 2 : Vérifier le build**

Run: `npm run build`
Expected: build réussit sans erreur sur `HomeBlogPreview.tsx`.

- [ ] **Step 3 : Commit**

```bash
git add src/components/v2/home/HomeBlogPreview.tsx
git commit -m "feat(v2/home): add HomeBlogPreview section with 3-card grid"
```

---

## Task 5 : Component `HomeBookingCTA`

**Files:**
- Create: `src/components/v2/home/HomeBookingCTA.tsx`

- [ ] **Step 1 : Créer le fichier `HomeBookingCTA.tsx`**

```tsx
// src/components/v2/home/HomeBookingCTA.tsx
"use client";

import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { BlurReveal } from "@/components/animations/BlurReveal";

export function HomeBookingCTA() {
  const { bookingCta } = homeData;

  return (
    <section
      id="rdv"
      className="w-full bg-background-surface px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <BlurReveal>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            {bookingCta.eyebrow}
          </p>
        </BlurReveal>

        <BlurReveal delay={0.05}>
          <h2 className="mt-4 font-heading text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {bookingCta.title}
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-base text-foreground/70 md:text-lg">
            {bookingCta.subtitle}
          </p>
        </BlurReveal>

        <BlurReveal delay={0.15}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {bookingCta.signals.map((signal) => {
              const Icon = signal.icon;
              return (
                <li
                  key={signal.label}
                  className="flex items-center gap-2 text-sm text-foreground/70"
                >
                  <Icon className="size-4 text-foreground/50" aria-hidden />
                  <span>{signal.label}</span>
                </li>
              );
            })}
          </ul>
        </BlurReveal>

        <BlurReveal delay={0.2}>
          <a
            href={bookingCta.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
          >
            {bookingCta.cta.label}
            <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </a>
        </BlurReveal>

        <BlurReveal delay={0.25}>
          <a
            href={bookingCta.secondaryLink.href}
            className="mt-5 text-sm text-foreground/60 transition-colors duration-500 ease-in-out hover:text-foreground"
          >
            {bookingCta.secondaryLink.label} ↓
          </a>
        </BlurReveal>
      </div>
    </section>
  );
}
```

**Notes:**
- Pas de `SectionContainer` ici car on veut un `bg-background-surface` sur toute la largeur pour contraster avec les sections voisines.
- Structure de padding identique à `SectionContainer` (`px-6 py-20 md:px-12 md:py-24`) pour cohérence.
- `<a target="_blank">` pour ouvrir Cal.com dans un nouvel onglet.
- Lien secondaire `#contact` fait scroll vers le formulaire existant.
- `text-sm` minimum partout.
- Toutes les transitions en `duration-500 ease-in-out`.

- [ ] **Step 2 : Vérifier le build**

Run: `npm run build`
Expected: build réussit sans erreur sur `HomeBookingCTA.tsx`.

- [ ] **Step 3 : Commit**

```bash
git add src/components/v2/home/HomeBookingCTA.tsx
git commit -m "feat(v2/home): add HomeBookingCTA section with Cal.com link"
```

---

## Task 6 : Wiring dans `src/app/v2/page.tsx`

**Files:**
- Modify: `src/app/v2/page.tsx`

- [ ] **Step 1 : Ajouter les imports**

Dans `src/app/v2/page.tsx`, après l'import de `HomeFAQV2` (ligne 14), ajouter :

```tsx
import { HomeBlogPreview } from "@/components/v2/home/HomeBlogPreview";
import { HomeBookingCTA } from "@/components/v2/home/HomeBookingCTA";
```

- [ ] **Step 2 : Mettre à jour `subNavItems`**

Remplacer le bloc `subNavItems` (lignes 21-30) par :

```tsx
const subNavItems = [
  { label: "Services", sectionId: "pillars" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Équipe", sectionId: "equipe" },
  { label: "Pourquoi", sectionId: "why" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "Méthode", sectionId: "method" },
  { label: "Blog", sectionId: "blog" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Contact", sectionId: "contact" },
];
```

(Pas d'entrée "RDV" dans le sub-nav — c'est une micro-section de conversion, pas une étape d'exploration.)

- [ ] **Step 3 : Insérer les sections dans le JSX**

Dans le JSX de `HomeV2` (lignes 73-94), remplacer le bloc entre `<HomeMethodV2 />` et `<HomeContactV2 />` par la séquence suivante :

```tsx
        <HomeMethodV2 />
        <SectionDivider />
        <HomeBlogPreview />
        <SectionDivider />
        <HomeFAQV2 />
        <SectionDivider />
        <HomeBookingCTA />
        <SectionDivider />
        <HomeContactV2 />
```

Le JSX complet du `return` doit être :

```tsx
  return (
    <>
      <SubNavSetter items={subNavItems} />
      <ScrollToTop />
      <div ref={wrapperRef} className="will-change-[filter,opacity]" data-splash-content>
        <HomeEasterEggV2 />
        <HomeHeroV2 />
        <SectionDivider />
        <HomeServicesV2 />
        <SectionDivider />
        <HomeRealisationsPreview />
        <SectionDivider />
        <HomeTeamV2 />
        <SectionDivider />
        <HomeQuoteV2 />
        <SectionDivider />
        <HomeWhyAurentia />
        <SectionDivider />
        <HomeTestimonialsV2 />
        <SectionDivider />
        <HomeMethodV2 />
        <SectionDivider />
        <HomeBlogPreview />
        <SectionDivider />
        <HomeFAQV2 />
        <SectionDivider />
        <HomeBookingCTA />
        <SectionDivider />
        <HomeContactV2 />
      </div>
    </>
  );
```

- [ ] **Step 4 : Vérifier le lint et le build**

Run: `npm run lint && npm run build`
Expected: aucune nouvelle erreur introduite par nos modifs.

- [ ] **Step 5 : Commit**

```bash
git add src/app/v2/page.tsx
git commit -m "feat(v2/home): wire blog and booking CTA sections into page"
```

---

## Task 7 : Vérification visuelle

**Files:** (aucun — validation manuelle)

- [ ] **Step 1 : Lancer le dev server**

Run: `npm run dev`
Expected: démarre sur `http://localhost:3000` (ou port suivant disponible).

- [ ] **Step 2 : Ouvrir la home V2 dans le navigateur**

Aller sur `http://localhost:3000/v2`.

- [ ] **Step 3 : Checklist visuelle**

Vérifier chacun des points suivants :

**Section Blog :**
- [ ] La section apparaît entre la section "Méthode" et la section "FAQ".
- [ ] Titre "Dernières publications" affiché, centré.
- [ ] 3 cards visibles en grid 3 colonnes sur desktop, 1 colonne sur mobile (< 768px).
- [ ] Chaque card a : image 16:9 en haut, catégorie · temps de lecture, titre sur 2 lignes max, extrait sur 2 lignes max, date + "Lire →" en bas.
- [ ] Les 3 SVG placeholder s'affichent correctement.
- [ ] Au hover : image zoom léger, "Lire →" passe en accent-primary et slide.
- [ ] Bouton "Voir tous les articles →" en bas de section, clic navigue vers `/blog`.
- [ ] La section apparaît dans le sub-nav comme "Blog".

**Section RDV :**
- [ ] La section apparaît entre la FAQ et la section Contact (formulaire).
- [ ] Fond `bg-background-surface` (légèrement contrasté).
- [ ] Eyebrow "Plus rapide" en accent-primary uppercase.
- [ ] Titre "Prenons 15 minutes ensemble" centré, grande taille.
- [ ] Sous-titre visible.
- [ ] 3 micro-signaux (icônes + texte) en rangée.
- [ ] Bouton solide "Réserver un créneau →" bien visible.
- [ ] Clic sur le bouton ouvre `https://cal.com/aurentia-agency` dans un nouvel onglet.
- [ ] Lien "ou envoyez-nous un brief détaillé ↓" en dessous, clic scroll vers le formulaire `#contact`.

**Responsive :**
- [ ] Mobile (375px — DevTools) : cards blog en 1 colonne, RDV en stack vertical, tout lisible.
- [ ] Tablet (768px) : cards blog en 3 colonnes compactes.
- [ ] Desktop (1280px+) : tout respire bien.

**Light / Dark theme :**
- [ ] Basculer le thème (toggle dans la navbar).
- [ ] Vérifier que les deux sections sont correctement lisibles dans les deux thèmes.
- [ ] Boutons solides : noir en light, blanc en dark.
- [ ] Aucune couleur hardcodée apparente.

**Sub-navigation :**
- [ ] Au scroll, le sub-nav affiche "Blog" quand la section est visible.
- [ ] Clic sur "Blog" dans le sub-nav scroll jusqu'à la section.

- [ ] **Step 4 : Fix les éventuels problèmes visuels**

Si l'un des points de la checklist échoue, corriger le component concerné. Re-vérifier. Commit final avec un message clair (ex: `fix(v2/home): adjust blog card hover contrast`).

---

## Self-review effectuée

**Couverture du spec :**
- Section Blog (design §3) → Tasks 2, 3, 4 ✓
- Section RDV (design §4) → Tasks 3, 5 ✓
- Types TypeScript (design §5) → Task 1 ✓
- Fichiers à créer/modifier (design §6) → Tasks 1-6 ✓
- Responsive (design §7) → Task 7 checklist ✓
- Light/Dark theme (design §8) → Task 7 checklist ✓
- Transitions (design §9) → implémentées dans chaque component, vérifiées Task 7 ✓
- Placement et sub-nav (design §2) → Task 6 ✓

**Placeholder scan :** aucun "TBD", "TODO", "à compléter" dans le plan. Chaque step contient le code complet ou la commande exacte.

**Type consistency :**
- `BlogArticlePreview` défini Task 1, utilisé Tasks 3, 4 — signatures identiques.
- `BookingCtaSignal` défini Task 1, utilisé Tasks 3, 5 — signatures identiques.
- `HomeData` étendu Task 1 avec `blogPreview` et `bookingCta`, consommé Tasks 4, 5 — cohérent.
- Noms de fonctions : `HomeBlogPreview` (Task 4), `HomeBookingCTA` (Task 5), importés Task 6 avec les mêmes noms.
