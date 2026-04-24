# Design — Home /v2 : sections Blog & RDV

**Date** : 2026-04-16
**Context** : ajouter deux nouvelles sections sur la page `/v2` (home) — preview d'articles de blog (mock) et CTA de prise de rendez-vous.

---

## 1. Objectifs

- Préparer visuellement la présence d'un blog (contenu mock, réel à remplir plus tard).
- Offrir un chemin de conversion rapide "Réserver un créneau" distinct du formulaire détaillé existant (`HomeContactV2`).
- Ne casser aucun pattern existant (SectionContainer, BlurReveal, SpotlightCard, `SectionDivider`).

---

## 2. Insertion dans la home

Ordre final des sections dans `src/app/v2/page.tsx` :

```
Hero → Services → Réalisations → Team → Quote → WhyAurentia
→ Testimonials → Method → Blog (NEW) → FAQ → RDV (NEW) → Contact
```

Chaque section reste séparée par `<SectionDivider />`.

**Sub-nav** (`subNavItems` dans `page.tsx`) : ajouter `{ label: "Blog", sectionId: "blog" }` entre `method` et `faq`. Pas d'entrée nav pour la section RDV (micro-section de conversion, pas une étape d'exploration).

---

## 3. Section Blog (`HomeBlogPreview`)

### 3.1 Comportement

- Component client (`"use client"`) pour cohérence avec les autres sections animées.
- Wrap dans `SectionContainer` avec `id="blog"` et `title="Dernières publications"`.
- Grid responsive : 1 col mobile, 3 cols desktop (`grid-cols-1 md:grid-cols-3`).
- Chaque card entre via `BlurReveal` avec `delay={idx * 0.1}`.
- Chaque card est un `Link` vers `/blog/{slug}` enveloppant un `SpotlightCard`.
- Bouton `Voir tous les articles →` en bas de section (même pattern que Réalisations).

### 3.2 Structure de card

```
┌─────────────────────────────┐
│  [IMAGE 16:9 cover]         │  ← aspect-[16/9], group-hover scale-105
│                             │
├─────────────────────────────┤
│  CATÉGORIE  ·  5 min        │  ← text-sm font-mono uppercase, foreground/60
│                             │
│  Titre de l'article         │  ← text-lg md:text-xl font-semibold, 2 lignes max
│  sur deux lignes            │
│                             │
│  Extrait de l'article sur   │  ← text-sm foreground/70, 2 lignes max
│  deux lignes maximum.       │
│                             │
│  10 avril 2026    Lire →    │  ← text-sm mono foreground/50 | accent-primary
└─────────────────────────────┘
```

**Règles typo (CLAUDE.md)** :
- Jamais de `text-xs` → tous les textes auxiliaires utilisent `text-sm`.
- Toutes les transitions en `duration-500 ease-in-out` minimum.

**Tokens couleurs** :
- Titre : `text-foreground`
- Meta (catégorie, temps lecture, date) : `text-foreground/50` à `/70`, `font-mono`
- Hover "Lire →" : `text-accent-primary` (apparition progressive)
- Card border : déjà géré par `SpotlightCard`

### 3.3 Données mock (dans `home.ts`)

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

### 3.4 Images placeholder

3 SVG générés à la main dans `public/images/v2/blog/` :
- `blog-1.svg` — gradient accent-primary (orange)
- `blog-2.svg` — gradient background → background-surface (neutre)
- `blog-3.svg` — gradient foreground/15 → transparent (sombre subtil)

Ratio **16:9** (1200x675), léger pattern ou grain optionnel. Le titre de la catégorie peut être intégré typographiquement dans le SVG pour donner un sens visuel au placeholder.

Les liens `href: "/blog/..."` pointent vers des routes qui n'existent pas encore — la page `/blog` affiche "Coming Soon", et les slugs individuels renverront vers le fallback 404 Next.js. Acceptable pour un mock.

**Accepté** : cards cliquables vers des pages 404. À remplacer quand les articles seront réels.

---

## 4. Section RDV (`HomeBookingCTA`)

### 4.1 Comportement

- Component `"use client"` uniquement si animations nécessaires, sinon server component simple.
- Wrap dans `SectionContainer` avec `id="rdv"`, centré (`alignHeader="center"`, `innerClassName="max-w-3xl"`).
- Fond légèrement contrasté : `bg-background-surface` appliqué à la section (wrap dans une div ou via prop `SectionContainer`).
- Entrée animée : `BlurReveal` sur le bloc central.

### 4.2 Structure

```
         [Plus rapide]             ← eyebrow mono uppercase accent-primary
                                   
   Prenons 15 minutes ensemble     ← h2, font-heading, text-4xl md:text-5xl lg:text-6xl
                                   
  Un appel rapide pour comprendre  ← text-base md:text-lg foreground/70
  votre besoin et vous dire si     
  on peut vous aider. Sans
  engagement.

  📅 Créneau 48h   ⏱ 15 min   ✅ Sans engagement    ← row de 3 items

      [ Réserver un créneau → ]     ← bouton solide bg-foreground text-background, size lg
                                    ↑ target=_blank, rel="noopener noreferrer"

      ou envoyez-nous un brief détaillé ↓    ← lien subtle vers #contact
```

### 4.3 Micro-signaux (icônes lucide)

3 éléments en rangée flex-wrap, séparés par des dots :
- `CalendarCheck` — "Créneau sous 48h"
- `Clock` — "15 min chrono"
- `ShieldCheck` — "Sans engagement"

Taille icône : `size-4`, couleur `text-foreground/50`, texte `text-sm text-foreground/70`.

Alignement : `flex flex-wrap items-center justify-center gap-4 md:gap-6`.

### 4.4 Boutons

**Primary** :
```tsx
<a
  href={bookingCta.cta.href}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90 group"
>
  {bookingCta.cta.label}
  <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
</a>
```

**Secondary (lien vers formulaire)** :
```tsx
<a
  href="#contact"
  className="text-sm text-foreground/60 hover:text-foreground transition-colors duration-500 ease-in-out"
>
  ou envoyez-nous un brief détaillé ↓
</a>
```

### 4.5 Données (dans `home.ts`)

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
  cta: { label: "Réserver un créneau", href: "https://cal.com/aurentia-agency" },
  secondaryLink: { label: "ou envoyez-nous un brief détaillé ↓", href: "#contact" },
},
```

**Note importante** : l'URL `https://cal.com/aurentia-agency` est un **placeholder**. À remplacer par la vraie URL de réservation (Calendly/Cal.com/autre) une fois configurée.

---

## 5. Types TypeScript

Dans `src/data/v2/types.ts`, ajouter :

```ts
export type BlogArticlePreview = {
  slug: string;
  category: string;       // ex: "IA", "Sites Web", "SaaS"
  title: string;
  excerpt: string;
  date: string;           // ISO : "2026-04-10"
  readingTime: string;    // ex: "5 min"
  imageUrl: string;
  href: string;
};

export type BookingCtaSignal = {
  icon: LucideIcon;
  label: string;
};
```

Étendre `HomeData` :

```ts
export type HomeData = {
  // ... existing fields ...
  blogPreview: {
    title: string;
    articles: BlogArticlePreview[];
    seeAllCta: CTA;
  };
  bookingCta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    signals: BookingCtaSignal[];
    cta: CTA;
    secondaryLink: CTA;
  };
  // ... contactCta remains ...
};
```

---

## 6. Fichiers à créer / modifier

**Créés** :
- `src/components/v2/home/HomeBlogPreview.tsx`
- `src/components/v2/home/HomeBookingCTA.tsx`
- `public/images/v2/blog/blog-1.svg`
- `public/images/v2/blog/blog-2.svg`
- `public/images/v2/blog/blog-3.svg`

**Modifiés** :
- `src/data/v2/types.ts` — nouveaux types
- `src/data/v2/home.ts` — données mock + import icônes lucide
- `src/app/v2/page.tsx` — imports + JSX + `subNavItems`

---

## 7. Responsive

- **Mobile (< 768px)** : grid blog en 1 colonne, cards full-width. RDV : stack vertical, boutons centrés, signals en flex-wrap.
- **Tablet (≥ 768px)** : grid blog en 3 cols (forcer 3 directement plutôt que 2→3, car seulement 3 articles).
- **Desktop (≥ 1024px)** : mêmes règles, padding naturel via `SectionContainer`.

Testé visuellement aux breakpoints 375px / 768px / 1280px (cf. skill `responsive-best-practices`).

---

## 8. Light / Dark theme

- Aucune couleur hardcodée. Tous les éléments utilisent `foreground`, `background`, `background-surface`, `accent-primary`.
- Bouton RDV solide : `bg-foreground text-background` → s'inverse automatiquement.
- Images SVG blog : utiliser les tokens de couleur via `currentColor` ou des gradients qui fonctionnent sur les deux thèmes (ou accepter un look légèrement différent vu qu'ils sont placeholder).

---

## 9. Transitions

- Tous les hovers : `duration-500 ease-in-out` minimum.
- `BlurReveal` gère les entrées scroll.
- Bouton CTA : translate-x flèche au hover.
- Pas d'animation instantanée nulle part.

---

## 10. Hors scope

- Implémentation réelle des pages `/blog/[slug]` — les liens mèneront à 404 tant que le système n'est pas construit.
- Intégration widget Calendly embed — on fait simplement un lien externe (choix A de l'utilisateur).
- Configuration réelle de l'outil de booking (URL placeholder).
- Modification de la page `/blog` elle-même (reste "Coming Soon").

---

## 11. Validation

Design validé avec l'utilisateur :
- Blog : 3 articles mock, thèmes IA / Sites Web / SaaS ✓
- RDV : CTA simple avec bouton vers Calendly (placeholder URL) ✓
- Placement : `… → Method → Blog → FAQ → RDV → Contact` ✓
- Titre RDV : "Prenons 15 minutes ensemble" ✓
- Images : SVG placeholder générés, ratio 16:9 ✓
