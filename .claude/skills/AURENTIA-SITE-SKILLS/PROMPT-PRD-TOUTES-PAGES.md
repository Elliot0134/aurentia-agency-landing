# MEGA-PROMPT — PRD Complet : Toutes les pages du site Aurentia Agency

## Contexte

Tu travailles sur le site **Aurentia Agency** (`aurentia-agency-landing`), une agence tech IA qui crée des sites vitrines, des applications SaaS et des landing pages.

Le site actuel a une **home page complète** (Hero, Marquee, Services, Process, Team, Portfolio, CTA, Testimonials, Advantages, FAQ, Contact) et une **page /conciergeries** qui a des composants existants (Hero, Problem, Solution, Innovation, Process, Portfolio, Pricing, Comparison, FAQ, LeadMagnet, CTA) mais qui doit être **entièrement repensée et mise au niveau de la home** — mêmes standards d'animations, de design, de contenu. La route `/sites-vitrines/conciergeries` redirige vers `/conciergeries`. Toutes les autres pages affichent un composant `<ComingSoon />` — elles sont vides.

**L'objectif : créer un PRD (Product Requirements Document) ultra-détaillé pour CHAQUE page du site**, avec le contenu textuel, les sections, les animations, le layout, les composants, et les spécifications responsive. Chaque page doit être aussi spectaculaire que la home. Rien de générique. Rien de bâclé. Le PRD doit être suffisamment détaillé pour qu'un développeur puisse implémenter chaque page directement, sans poser de questions.

---

## Pages à créer (par priorité)

### Priorité 1 — Pages vitrine de l'agence + niche principale
1. **`/a-propos`** — L'équipe, l'origin story, les valeurs, la vision
2. **`/realisations`** — Portfolio, case studies, mockups, avant/après
3. **`/conciergeries`** — **REFONTE COMPLÈTE.** La page existe avec des composants (ConciergerieHero, ConciergerieProblem, ConciergerieSolution, ConciergerieInnovation, ConciergeriePricing, ConciergerieComparison, ConciergerieFAQ, ConciergerieLeadMagnet, ConciergerieCTA) mais elle n'est PAS au niveau de la home. Elle doit être entièrement repensée : animations spectaculaires, contenu revu, layout repensé, même qualité que la home. C'est LA page de vente principale de l'agence — elle convertit les prospects conciergeries en clients. Route `/sites-vitrines/conciergeries` redirige déjà vers `/conciergeries`. Les composants existants dans `src/components/conciergerie/` servent de base mais doivent être réécrits.
4. **`/blog`** — Système blog complet avec articles SEO, catégories, filtrage

### Priorité 2 — Pages services (autres niches + offres)
5. **`/sites-vitrines`** — Page mère présentant l'offre sites vitrines (toutes niches confondues). Pas de packs spécifiques ici — fourchettes de prix génériques + liens vers les sous-pages niches.
6. **`/sites-vitrines/hotels`** — Page niche hôtels (même structure que /conciergeries mais adaptée aux hôteliers : douleurs différentes, pricing adapté, personas différents)
7. **`/saas`** — Offre développement d'applications SaaS (high-ticket, sur devis, preuves = notre propre produit "Aurentia for Agencies")
8. **`/landing-pages`** — Offre landing pages haute conversion pour SaaS/tech (dès 1 500€, design spectaculaire, optimisées conversion)

### Priorité 3 — Pages écosystème
9. **`/formation`** — Espace formation (formations IA, web, Claude, etc.)
10. **`/apport-affaires`** — Programme d'apport d'affaires / parrainage (déjà partiellement fait — 145 lignes, à compléter/refondre)
11. **`/blog/[slug]`** — Template d'article de blog individuel

### Priorité 4 — Pages légales & support
12. **`/faq`** — Page FAQ dédiée (au-delà de la section FAQ de la home)
13. **`/cgv`** — Conditions générales de vente
14. **`/mentions-legales`** — Mentions légales obligatoires
15. **`/politique-confidentialite`** — Politique de confidentialité / RGPD

---

## Skills disponibles

Tu as accès à des skills spécialisés dans `.claude/skills/AURENTIA-SITE-SKILLS/`. **Lis-les AVANT de rédiger chaque page.** Voici comment les utiliser :

### Pour chaque page, lis les skills pertinents :

| Page | Skills à lire en priorité |
|------|--------------------------|
| `/a-propos` | `about-page.md`, `brand-voice-guide.md`, `customer-persona.md` |
| `/realisations` | `case-study.md`, `landing-page-copy.md`, `hook-generator.md` |
| `/conciergeries` | `sales-page.md`, `landing-page-copy.md`, `hook-generator.md`, `headline-generator.md`, `pricing-page-copy.md`, `customer-persona.md`, `value-proposition-canvas.md`, `faq-generator.md`, `keyword-research.md` |
| `/blog` | `blog-post.md`, `seo-content-brief.md`, `content-style-guide.md` |
| `/sites-vitrines` | `landing-page-copy.md`, `value-proposition-canvas.md`, `headline-generator.md` |
| `/sites-vitrines/hotels` | `landing-page-copy.md`, `sales-page.md`, `customer-persona.md`, `keyword-research.md` |
| `/saas` | `high-ticket-sales-page.md`, `pricing-page-copy.md`, `value-proposition-canvas.md` |
| `/landing-pages` | `high-ticket-sales-page.md`, `hook-generator.md`, `case-study.md` |
| `/formation` | `landing-page-copy.md`, `pricing-page-copy.md`, `faq-generator.md` |
| `/apport-affaires` | `sales-page.md`, `hook-generator.md`, `faq-generator.md` |
| `/faq` | `faq-generator.md`, `schema-markup-guide.md` |
| `/cgv`, `/mentions-legales`, `/politique-confidentialite` | Contenu juridique standard FR |
| **Toutes les pages** | `meta-tag-optimizer.md`, `schema-markup-guide.md`, `seo-audit.md`, `keyword-research.md` |

---

## Références du projet

Avant de commencer, lis ces fichiers de référence qui contiennent TOUT sur la marque :

1. **`BRIEF_MARQUE.md`** — Positionnement, ton de voix, valeurs, différenciants, structure de la home
2. **`AURENTIA-AGENCY-BRAND-BOOK.md`** — Brand book complet (étymologie, mission, palette visuelle, typographie)
3. **`CLAUDE.md`** et **`AGENTS.md`** — Règles techniques strictes (typo, transitions, thèmes, scroll, animations)
4. **`src/data/content.ts`** — Contenu actuel de la home et /conciergeries (exemples de ton et structure)
5. **`src/app/page.tsx`** — Structure de la home actuelle (les composants, leur ordre)
6. **`src/app/conciergeries/page.tsx`** — Structure de la page conciergeries (page existante à refondre)
7. **`src/components/conciergerie/*.tsx`** — Composants actuels de /conciergeries (ConciergerieHero, ConciergerieProblem, ConciergerieSolution, ConciergerieInnovation, ConciergeriePricing, ConciergerieComparison, ConciergerieFAQ, ConciergerieLeadMagnet, ConciergerieCTA). Lis-les pour comprendre la structure actuelle, mais le PRD doit les repenser entièrement.
8. **`src/data/content.ts`** — Contenu existant de la page conciergeries (problemContent, solutionContent, etc.) — à réécrire dans le PRD avec un contenu plus percutant et dans le ton Aurentia

---

## Exigences globales — CHAQUE page doit respecter ceci

### Design & Layout
- **Mobile-first responsive** : 375px → 768px → 1024px → 1280px → 1536px
- **Cohérence avec la home** : même Navbar, Footer, même design system, mêmes fonts (Recoleta headings, Plus Jakarta Sans body, JetBrains Mono code)
- **Dark/Light mode parfait** : utiliser les tokens sémantiques (`text-foreground`, `bg-background`, etc.). JAMAIS de couleurs hardcodées. Chaque composant doit être visuellement parfait dans les DEUX thèmes.
- **Minimum `text-sm`** : aucun texte plus petit que `text-sm`, nulle part (pas de `text-xs`, pas de `text-[10px]`)
- **Whitespace généreux** : le design respire. Pas de sections surchargées.

### Animations & Transitions
- **RIEN n'est instantané** : toutes les transitions durent minimum 500ms, idéalement 700ms, en `ease-in-out`
- **Scroll-triggered animations** : chaque section a des animations au scroll (fade-in, slide-up, stagger, scale, blur-reveal). Utiliser Framer Motion `useInView` ou GSAP `ScrollTrigger`
- **Pas de moment mort au scroll** : à chaque pixel scrollé, quelque chose bouge ou se transforme
- **JAMAIS de `position: sticky` ou `pin: true`** sur les sections full-screen (sauf HomeHero)
- **Hover states fluides** : tous les boutons, cards, liens ont des hover states avec transitions douces
- **Page transitions** : chaque page a une animation d'entrée (fade + translateY)

### SEO — Chaque page
- **1 H1 unique** par page, contenant le mot-clé principal
- **Title tag** : `[Mot-clé principal] | Aurentia Agency` — 50-60 caractères
- **Meta description** : 150-160 caractères, avec mot-clé + CTA
- **Open Graph tags** : title, description, image pour chaque page
- **Schema markup JSON-LD** : adapté au type de page (Organization, Service, FAQ, Article, BreadcrumbList)
- **Alt text descriptif** sur chaque image
- **Liens internes** : minimum 2 liens vers d'autres pages du site par page
- **URL propres** : pas de trailing slash, lowercase, tirets

### Composants partagés
- `<Navbar />` — identique sur toutes les pages (déjà fait)
- `<Footer />` — identique sur toutes les pages (déjà fait)
- `<CalModal />` — modal de booking Cal.com (CTA principal)
- `<ScrollToTop />` — bouton retour en haut
- Système d'animations existant : `LenisProvider`, `CustomCursor`, `ScrollProgress`, `SplashWrapper`

---

## Format du PRD — Pour CHAQUE page, produire :

### 1. Fiche page
```
Page : /[route]
Titre H1 : "..."
Title tag : "..."
Meta description : "..."
Objectif principal : [ce que le visiteur doit faire]
Persona cible : [qui visite cette page]
Pages liées : [liens internes entrants/sortants]
```

### 2. Architecture des sections
Pour chaque section de la page :
```
Section [N] — [Nom]
- Hauteur : [ex: 100vh, auto, min-h-[80vh]]
- Layout : [ex: grid 2 cols, centered, bento grid]
- Contenu textuel EXACT : titre, sous-titre, paragraphes, CTAs, labels
- Composants : [ex: cards, accordéon, carousel, compteurs]
- Animations : [détail des animations scroll-triggered, hover, stagger]
- Responsive : [comportement mobile vs desktop]
- Assets : [images, icônes, illustrations nécessaires]
```

### 3. Contenu textuel complet
Rédiger TOUT le texte de chaque section : headlines, sous-titres, descriptions, CTAs, labels, badges, métriques. Rien en placeholder. Tout en français. Ton Aurentia (premium, confiant, direct, phrases courtes, chiffres > mots).

### 4. Spécifications techniques
- Composants React à créer (noms, props)
- Structure des fichiers (`/components/[page]/[Component].tsx`)
- Data structures (types TypeScript)
- Points d'intégration (formulaires, API, Supabase, Cal.com)

### 5. SEO complet
- Mots-clés primaires et secondaires
- Schema markup JSON-LD complet
- Internal linking strategy

---

## Ton & Contenu — Rappels critiques

### Le ton Aurentia
- **Premium + confiant + direct.** On sait ce qu'on vaut.
- **Chiffres > mots** : "48h" pas "rapidement", "900€" pas "prix compétitif"
- **Phrases courtes** : 15 mots max. Direct.
- **Humain** : on parle comme des humains, pas comme un chatbot corporate
- **On affirme** : "On fait X", pas "On peut peut-être vous aider à X"

### Mots à utiliser
révéler, illuminer, propulser, sur-mesure, accessible, forger, potentiel, l'aube, naître, lumière, craft, artisan

### Mots interdits
cheap, automatique, template, basique, robot, garanti

### Infos clés à intégrer dans le contenu
- **Équipe** : Elliot (CEO, IA & Design, 23 ans), Fabien (Production Lead, 20 ans web, père d'Elliot), Mathieu (Dev Senior)
- **Vitesse** : V1 en 24-48h pour les sites vitrines
- **Prix** : dès 900€ (sites vitrines), dès 1 500€ (landing pages), sur devis (SaaS)
- **Packs détaillés (niches uniquement)** : Essentiel 900€, Croissance 1 490€, Premium dès 2 200€
- **Innovation** : on génère le site du prospect AVANT le call de closing
- **Booking** : cal.com/aurentia
- **Stack** : Next.js, React, Tailwind, Framer Motion, GSAP, Vercel, Supabase, Claude

---

## Process de travail

1. **Lis les skills pertinents** pour la page en cours (voir tableau ci-dessus)
2. **Lis les références du projet** (BRIEF_MARQUE.md, CLAUDE.md, content.ts)
3. **Rédige le PRD de la page** en suivant le format ci-dessus
4. **Vérifie** : le contenu est-il dans le ton Aurentia ? Le SEO est-il complet ? Les animations sont-elles spécifiées ? Le responsive est-il couvert ? Les deux thèmes sont-ils gérés ?
5. **Passe à la page suivante**

Procède page par page, dans l'ordre de priorité. Ne saute aucune section. Ne laisse aucun placeholder. Chaque page doit être un PRD complet, prêt à être implémenté tel quel par un développeur.

---

## IMPORTANT — Ce qu'on attend de toi

Tu ne codes PAS. Tu produis le **PRD complet** de chaque page : contenu textuel final, architecture des sections, animations, spécifications techniques, SEO. Le développeur (Claude Code dans un second temps) prendra ce PRD et l'implémentera directement.

**Commence par la page `/a-propos`.** Lis d'abord les skills `about-page.md`, `brand-voice-guide.md` et `customer-persona.md`, puis rédige le PRD complet.
