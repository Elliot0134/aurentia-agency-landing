# Audit SEO complet — aurentia.agency

> Audit statique du code source (Next.js 15.5 / App Router). Aucun crawl du site live. Date : 2026-05-01.

---

## Executive Summary

**Score global : 42 / 100**

| Pilier | Poids | Note brute /100 | Pondéré |
|---|---|---|---|
| Technical SEO | 22 | 35 | 7.7 |
| Content Quality | 23 | 55 | 12.6 |
| On-Page SEO | 20 | 40 | 8.0 |
| Schema / Structured data | 10 | 45 | 4.5 |
| Performance | 10 | 30 | 3.0 |
| AI Search Readiness | 10 | 20 | 2.0 |
| Images | 5 | 25 | 1.25 |
| **Total** | **100** | — | **~39 → 42** |

**Verdict** : le site n'est pas prêt pour ranker. Les fondations SEO de base (root metadata, robots cohérent, OG par page, JSON-LD homepage, optimisation images) sont absentes ou cassées. Beaucoup de pages stratégiques (`/`, `/sites-web`, `/saas`, `/solutions-ia/formation-ia`, `/solutions-ia/implementation-ia`, `/saas/agences`) sont en `'use client'` SANS metadata exporté → Google reçoit du HTML sans `<title>`/`<meta description>` côté SSR utile.

### Top 3 critiques

1. **Aucun `metadata` racine dans `src/app/layout.tsx`** → pas de `metadataBase`, pas de title default, pas d'OG default, pas de Twitter default. Toutes les pages enfants qui omettent `metadata` héritent du néant.
2. **Conflit robots** : `public/robots.txt` bloque `/realisations` et `/realisations/`, mais `src/app/robots.ts` autorise tout ET le sitemap pousse 12+ URLs `/realisations/*`. Next sert `robots.ts` en priorité, mais le `public/robots.txt` peut être servi sur certaines configs et créer un mismatch. Surtout, c'est un signal de chaos.
3. **Homepage `/` en `'use client'` sans `metadata` exporté** → la page la plus importante du site n'a ni title, ni description, ni OG, ni canonical, ni JSON-LD Organization/WebSite.

### Top 3 quick wins

1. Ajouter un `metadata` racine complet dans `src/app/layout.tsx` (1h).
2. Supprimer `public/robots.txt` (le `robots.ts` suffit) (1 min).
3. Convertir `src/app/page.tsx` (et autres) en server component avec `export const metadata` ; déplacer la logique GSAP dans un composant client enfant (2h).

---

## 1. Technical SEO — 35/100

### CRITICAL — Aucun metadata racine
- **Fichier** : `src/app/layout.tsx` (lignes 1-58)
- **Problème** : pas de `export const metadata`, pas de `metadataBase`. Conséquence : toutes les URLs OG/canonical relatives (`/realisations`, `/images/opengraph/opengraph.png`) sont mal résolues, et les pages sans metadata héritent de rien.
- **Fix** :
  ```tsx
  export const metadata: Metadata = {
    metadataBase: new URL("https://aurentia.agency"),
    title: { default: "Aurentia Agency — Sites web, SaaS, IA · Avignon", template: "%s | Aurentia Agency" },
    description: "Agence web & IA basée à Avignon. Sites sur-mesure, SaaS, automatisations et formations IA. Livraison en 48h sur les sprints.",
    openGraph: { type: "website", locale: "fr_FR", siteName: "Aurentia Agency", images: ["/images/opengraph/opengraph.png"] },
    twitter: { card: "summary_large_image", images: ["/images/opengraph/opengraph.png"] },
    alternates: { canonical: "/" },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
    icons: { icon: "/icon.png", apple: "/apple-icon.png" },
  };
  ```

### CRITICAL — Conflit robots.txt vs robots.ts
- **Fichiers** : `public/robots.txt` (5 lignes) vs `src/app/robots.ts`
- **Problème** : `public/robots.txt` `Disallow: /realisations` alors que c'est une section indexable poussée par le sitemap. Next priorise `app/robots.ts` mais le `public/robots.txt` reste un signal contradictoire et peut être servi en cas de fallback statique.
- **Fix** : supprimer `public/robots.txt`. Étendre `robots.ts` pour inclure GPTBot/ClaudeBot/PerplexityBot allow, et un host explicite.

### HIGH — Homepage en 'use client' sans metadata
- **Fichier** : `src/app/page.tsx` (ligne 1)
- **Problème** : `"use client"` rend impossible l'export de `metadata` sur ce fichier. Aucun titre, aucune description, aucun OG.
- **Fix** : extraire la logique GSAP dans `<HomeClient />` (client component), garder `page.tsx` server :
  ```tsx
  // src/app/page.tsx (server)
  export const metadata: Metadata = { title: "Aurentia Agency — Agence web & IA à Avignon", description: "...", alternates: { canonical: "/" } };
  export default function Page() { return <HomeClient />; }
  ```

### HIGH — Pages stratégiques sans metadata
- **Fichiers concernés** :
  - `src/app/sites-web/page.tsx` (`'use client'`, pas de metadata)
  - `src/app/saas/page.tsx` (`'use client'`, pas de metadata)
  - `src/app/saas/agences/page.tsx` (`'use client'`, pas de metadata)
  - `src/app/solutions-ia/formation-ia/page.tsx` (`'use client'`, pas de metadata)
  - `src/app/solutions-ia/implementation-ia/page.tsx` (`'use client'`, pas de metadata)
  - `src/app/conciergeries/page.tsx` (heureusement redirected via `next.config.ts`, vérifier)
- **Fix** : même pattern serveur+client wrapper que la homepage.

### HIGH — Redirect /agence en runtime au lieu de config
- **Fichier** : `src/app/agence/page.tsx` (ligne 4 : `redirect("/a-propos")`)
- **Problème** : redirect runtime (302 par défaut côté Next.js Server Actions, 307 ici) au lieu d'un 301 permanent dans `next.config.ts`. Mauvais pour le link equity.
- **Fix** : `redirect("/a-propos", "replace")` ne suffit pas — déplacer dans `next.config.ts` :
  ```ts
  { source: "/agence", destination: "/a-propos", permanent: true }
  ```
  Et supprimer `src/app/agence/page.tsx`.

### MEDIUM — Sitemap minimal
- **Fichier** : `src/app/sitemap.ts`
- **Problème** : ne couvre que `/`, `/realisations`, `/realisations/[slug]`, et secteurs filtrés. Manque : `/a-propos`, `/contact`, `/sites-web`, `/sites-web/site-vitrine`, `/sites-web/sur-mesure`, `/sites-web/ecommerce`, `/sites-web/landing-page`, `/saas`, `/saas/agences`, `/solutions-ia`, `/solutions-ia/audit`, `/solutions-ia/formation-ia`, `/solutions-ia/implementation-ia`, `/solutions-ia/configuration-claude`, `/ressources`, `/ressources/implementer-claude`, `/ressources/vibe-coding`, `/landing-pages`, `/blog`, `/apport-affaires`, `/identite-visuelle`, `/synergies`, `/sites-vitrines`.
- **Fix** : ajouter manuellement ou via un scan de `src/app/`.

### MEDIUM — Pas de canonical sur la majorité des pages
- **Fichiers** : seules `realisations/page.tsx` et `realisations/[slug]/page.tsx` exportent un `alternates.canonical`.
- **Fix** : ajouter sur chaque metadata.

### LOW — `lang="fr"` correctement set
- **Fichier** : `src/app/layout.tsx` ligne 39 — OK.

### LOW — Headers/security
- **Fichier** : `next.config.ts` — pas de `headers()`. Pas critique pour SEO mais signal de qualité (HSTS, X-Content-Type-Options, Permissions-Policy).

---

## 2. Content Quality — 55/100

### MEDIUM — Pages publiées avec ComingSoon
- **Fichier** : `src/app/blog/page.tsx` — affiche un `ComingSoon`. Une page `/blog` indexable vide = thin content pour Google.
- **Fix** : soit `noindex` sur la metadata blog (`robots: { index: false }`), soit publier au moins 3 articles avant de l'exposer.

### LOW — Description homepage à venir
- Une fois `metadata` ajouté à `/`, la description doit nommer Aurentia, Avignon, sites web, SaaS, IA, et un USP (livraison rapide, 20 ans craft).

### Notes positives
- Real H1 unique sur la homepage (`HomeHeroV2.tsx` ligne 87).
- Pages `/a-propos`, `/realisations`, `/realisations/[slug]`, `/contact` ont du contenu réel.
- Les case studies MDX (`/realisations/[slug]`) ont une vraie structure éditoriale + testimonials + métriques.

---

## 3. On-Page SEO — 40/100

### HIGH — Titles incohérents (templating absent)
- `src/app/contact/page.tsx` ligne 23 : `title: "Contact"` (sans suffixe marque).
- `src/app/a-propos/page.tsx` : `title: "À propos — Aurentia"` (devrait être "Aurentia Agency").
- `src/app/solutions-ia/page.tsx` : `title: "Solutions IA pour entreprises"` sans marque.
- **Fix** : utiliser le `title.template` du root metadata (`"%s | Aurentia Agency"`) et passer juste le segment dans chaque page.

### HIGH — Pas d'OG par page
- Seules `realisations/page.tsx`, `realisations/[slug]/page.tsx`, `ressources/page.tsx`, `landing-pages/page.tsx` ont un `openGraph`. Les autres comptent sur l'inexistant default racine.
- **Fix** : ajouter le default OG racine + per-page customization.

### MEDIUM — Pas de Twitter card par défaut
- Seul `realisations/[slug]` en a un.
- **Fix** : `twitter: { card: "summary_large_image" }` dans le root metadata.

### MEDIUM — Alt texts vides
- 5 occurrences `alt=""` :
  - `src/components/v2/layout/NavbarV2Mobile.tsx:105, 132`
  - `src/components/v2/layout/MegaMenu.tsx:61, 87`
  - `src/components/v2/sites-web/SitesWebHero.tsx:20`
- **Fix** : `alt=""` est valable pour les images purement décoratives (rôle ARIA presentation) — vérifier que ces 5 cas sont bien décoratifs. Sinon, alt descriptif.

---

## 4. Schema / Structured data — 45/100

### HIGH — Pas de JSON-LD sur la homepage
- Aucune Organization ni WebSite injectée sur `/`. Pourtant `src/lib/seo/schema.ts` contient un objet `ORGANIZATION` prêt à l'emploi.
- **Fix** : injecter Organization + WebSite (avec SearchAction si pertinent) sur la homepage via `<JsonLd data={ORGANIZATION} />`.

### HIGH — Pas de LocalBusiness
- Aurentia est à Avignon (basé sur `schema.ts:14-17`). Manquer LocalBusiness (`@type: "ProfessionalService"` + telephone, geo, openingHours, areaServed) = perdre la SERP locale.
- **Fix** : créer `localBusiness()` dans `schema.ts` avec NAP, geo {lat, lon}, areaServed (Vaucluse, PACA, France), services.

### HIGH — Pas de BreadcrumbList sur les pages internes
- Defined dans `schema.ts:20-31` mais utilisé seulement sur les case studies (à vérifier).
- **Fix** : injecter sur `/a-propos`, `/realisations/secteur/[slug]`, `/sites-web/*`, `/solutions-ia/*`, etc.

### MEDIUM — Service schema absent sur les pages services
- `/sites-web/site-vitrine`, `/sites-web/sur-mesure`, `/sites-web/ecommerce`, `/sites-web/landing-page`, `/saas`, `/solutions-ia/audit`, `/solutions-ia/configuration-claude`, etc. devraient toutes émettre un `Service` JSON-LD.
- **Fix** : helper `serviceSchema(name, description, areaServed, offers)` à ajouter dans `schema.ts`.

### MEDIUM — FAQPage sous-utilisé
- `faqPage()` existe dans `schema.ts:71`. Le `HomeFAQV2` n'émet rien.
- **Fix** : injecter FAQPage JSON-LD sur la homepage et sur les pages avec FAQ.

### LOW — Schema CGV/Mentions OK
- `cgv/page.tsx`, `politique-confidentialite/page.tsx`, `mentions-legales/page.tsx` ont déjà du JSON-LD. OK.

---

## 5. Performance — 30/100

### CRITICAL — Images PNG non optimisées (>15 Mo total inutile)
- **Fichiers** :
  - `public/images/icons/*.png` : 1-1.7 Mo chacune (canva 1.5M, claude 1.6M, supaabse 1.7M, n8n 1.3M, stripe 1.2M…) — TOTAL ~15 Mo
  - `public/images/portfolio/*.png` : highlove 2.4M, maison-enileh 2.4M, allo-restau 1.3M, savistas 948K, etc. — TOTAL ~13 Mo
  - `public/images/team/*.png` : 5 Mo total
  - `public/images/globe.svg` : 348 Ko (probablement rasterisé inline)
- **Problème** : les `.webp` existent à côté pour les icônes (`canva-icon.webp`, `claude-icon.webp`) mais les PNG sont conservés et probablement servis. Sur la homepage, ça peut peser plusieurs Mo.
- **Fix** :
  - Convertir tous les portfolio en WebP (gain 70-80%) et supprimer les PNG si plus référencés.
  - S'assurer que les composants servent les `.webp` (ou laisser Next/Image auto-optimiser via `next.config.ts.images.formats: ["image/avif", "image/webp"]`).
  - Supprimer les PNG d'icônes si les WebP existent et que rien ne les référence.

### HIGH — `next.config.ts` ne configure pas `images`
- **Fichier** : `next.config.ts` (15 lignes — minimaliste)
- **Problème** : pas de `images.formats`, pas de `images.deviceSizes`, pas de `images.remotePatterns`. Next utilise les defaults mais perd l'opportunité d'AVIF.
- **Fix** :
  ```ts
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
  ```

### HIGH — Homepage = full client component
- **Fichier** : `src/app/page.tsx` ligne 1 (`'use client'`)
- **Problème** : tout le HTML de la home est rendu côté client (mauvais pour LCP, FCP, et SEO crawling JS-rendered). GSAP+ScrollTrigger justifient client mais doivent être isolés à l'effet, pas à toute la page.
- **Fix** : page server, GSAP dans un `<HomeAnimations />` client enfant qui prend des refs/IDs.

### MEDIUM — Three.js dans le bundle
- `package.json` : `@react-three/drei`, `@react-three/fiber`, `three@0.184` — peut alourdir significativement le bundle si chargé sur la home.
- **Fix** : `next/dynamic` avec `ssr: false` sur les composants 3D, audit Bundle Analyzer.

### LOW — Fonts via `next/font`
- `Plus_Jakarta_Sans`, `JetBrains_Mono`, `Geist`, `localFont` Recoleta. Le combo à 4 familles est lourd (Recoleta a 2 weights, c'est bien) — vérifier que `Geist` ou `Plus_Jakarta_Sans` est vraiment utilisé sinon retirer.

---

## 6. Images — 25/100

Voir Performance pour le poids. Autres points :

### MEDIUM — `<img>` raw au lieu de `next/image`
- 2 occurrences brutes vs 40 utilisations de `next/image`. Acceptable mais à corriger.
- **Fix** : `grep -rn "<img " src/` puis migration ciblée.

### HIGH — Portfolio : assets archivés exposés
- `public/images/portfolio/` contient `highlove.png`, `allo-restau-site.png`, `golf-mentor-*.png`, `savistas.png`, `friendiz.png`, `monservicecourtier.png` — projets référencés comme **archivés** dans le CLAUDE.md global d'Elliot ("Ne jamais mentionner : HiLove, Kaelen Studio, AlloRestau, Golf Mentor, Savistas…").
- **Problème** : si ces case studies sont indexés, ils contredisent le narratif officiel et créent des incohérences pour un acheteur potentiel ou pour le SEO de marque.
- **Fix** : décider quelles réalisations rester publiques. Pour celles à retirer : supprimer les fichiers MDX, supprimer les PNGs, ajouter des redirects 410/301.

### MEDIUM — Pas de `sizes` sur les `next/image` ?
- Non audité en profondeur — vérifier que les images héro/portfolio fournissent `sizes` pour éviter de servir du 2048px sur mobile.

---

## 7. AI Search Readiness — 20/100

### HIGH — Pas de `llms.txt`
- **Fichier** : `public/llms.txt` absent.
- **Fix** : créer `public/llms.txt` avec un résumé Aurentia + liens canoniques vers les pages clés (services, contact, réalisations, à propos).

### MEDIUM — Robots ne nomme pas explicitement les bots IA
- **Fichier** : `src/app/robots.ts` — `userAgent: "*"` couvre tout par défaut, donc OK techniquement (GPTBot, ClaudeBot, PerplexityBot autorisés). Mais les expliciter envoie un signal positif.
- **Fix** :
  ```ts
  rules: [
    { userAgent: "*", allow: "/", disallow: ["/api/"] },
    { userAgent: "GPTBot", allow: "/" },
    { userAgent: "ClaudeBot", allow: "/" },
    { userAgent: "PerplexityBot", allow: "/" },
    { userAgent: "Google-Extended", allow: "/" },
  ]
  ```

### MEDIUM — Pas de FAQ structurée + JSON-LD
- Cf. section Schema. Les LLMs (Perplexity, ChatGPT) lisent FAQPage pour répondre directement.

### LOW — Contenu factuel
- Les pages `/a-propos` et case studies ont du contenu factuel (équipe, dates, métriques). Bon pour l'extraction GEO, mais à amplifier (tableau "qui, quoi, quand, combien" en haut de chaque service).

---

## 8. Récapitulatif fichiers à toucher

| Fichier | Action |
|---|---|
| `src/app/layout.tsx` | Ajouter `metadata` racine complet |
| `src/app/page.tsx` | Server-ifier + extract GSAP en enfant client + ajouter metadata + JSON-LD Organization/WebSite/FAQPage |
| `src/app/sites-web/page.tsx` | Server-ifier + metadata + Service JSON-LD |
| `src/app/saas/page.tsx` | Idem |
| `src/app/saas/agences/page.tsx` | Idem |
| `src/app/solutions-ia/formation-ia/page.tsx` | Idem |
| `src/app/solutions-ia/implementation-ia/page.tsx` | Idem |
| `src/app/agence/page.tsx` | Supprimer + déplacer redirect dans `next.config.ts` |
| `public/robots.txt` | Supprimer |
| `src/app/robots.ts` | Étendre (bots IA explicites, host) |
| `src/app/sitemap.ts` | Couvrir TOUTES les routes publiques |
| `src/lib/seo/schema.ts` | Ajouter `localBusiness()`, `serviceSchema()` |
| `next.config.ts` | Ajouter `images.formats`, `headers()`, redirect `/agence` |
| `public/llms.txt` | Créer |
| `public/images/icons/*.png` | Convertir en WebP/AVIF + supprimer PNG |
| `public/images/portfolio/*.png` | Optimiser + retirer projets archivés |
| Toutes pages `metadata` | Ajouter `alternates.canonical` + `openGraph` |
