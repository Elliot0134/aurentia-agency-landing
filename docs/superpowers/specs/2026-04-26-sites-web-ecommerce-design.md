# Spec — Page `/sites-web/ecommerce`

**Date** : 2026-04-26
**Statut** : Validé, prêt pour plan d'implémentation
**Owner** : Elliot

## 1. Contexte & objectif

Ajouter une nouvelle sous-page de l'offre **Sites Web** dédiée à l'**ecommerce**, au même niveau que `/sites-web/landing-page` et `/sites-web/site-vitrine`. Aurentia Agency positionne Shopify comme stack par défaut, avec ouverture sur du sur-mesure Next.js + Stripe pour les besoins avancés.

Objectif : capter le trafic SEO long-tail "agence shopify", "création boutique ecommerce", "site shopify sur-mesure", générer des leads qualifiés vers le formulaire de contact, et pricer le service au-dessus du vitrine (panier moyen ecommerce > vitrine).

## 2. Architecture (réplication du pattern existant)

Le pattern existant `SitesWebSubPage` accepte un `slug` et lit la data dans un `DATA_MAP`. La page ecommerce est donc :

- **Route** : `src/app/sites-web/ecommerce/page.tsx` (13 lignes, calque `site-vitrine/page.tsx`, slug `"ecommerce"`, metadata SEO custom)
- **Data** : `src/data/v2/sites-web-ecommerce.ts` (nouveau fichier, type `SubPageData`)
- **Map** : ajout `"ecommerce": sitesWebEcommerceData` dans `DATA_MAP` de `src/components/v2/sites-web/SitesWebSubPage.tsx`
- **Sitemap** : ajout de l'URL dans `src/app/sitemap.ts`
- **Liens internes** : vérifier la navbar/footer/page parent `sites-web/page.tsx` pour ajouter le lien vers la nouvelle sous-page si applicable

### Sections custom (3 nouveaux composants)

`SitesWebSubPage` est étendu pour pouvoir injecter, **uniquement quand `slug === "ecommerce"`**, trois sections supplémentaires :

1. `EcommerceAnatomy` — l'anatomie d'une boutique qui convertit (mockup desktop + mobile + annotations scroll-révélées)
2. `EcommerceStack` — grille type SaaS Integrations (Shopify, Stripe, Klaviyo, etc.)
3. `EcommerceShowcase` — carrousel cinématique de boutiques (parallax + crossfade)

Ces composants vivent dans `src/components/v2/sites-web/ecommerce/`.

## 3. Positionnement & contenu

- **Promesse hero** : "La boutique Shopify qui vend dès la mise en ligne. Livrée en 7 jours."
- **Stack par défaut** : Shopify ; mention sur-mesure Next.js + Stripe en pack premium
- **3 ForWho** :
  1. Marque mono-produit qui lance sa première boutique
  2. Boutique existante qui ne convertit pas (refonte)
  3. Volume de commandes manuel à automatiser (intégrations stock, expédition, support)

### Pricing (validé)

| Pack | Prix | Cible |
|---|---|---|
| **One-Product** | 2 500 € | Shopify, 1 produit / collection courte, thème custom, paiement + livraison + emails |
| **Boutique Croissance** *(POPULAIRE)* | à partir de 3 900 € | Shopify, catalogue complet, multi-devises, blog SEO, email marketing (Klaviyo/Brevo), GA4 |
| **Premium** | sur devis (à partir de 6 500 €) | Shopify Plus OU sur-mesure Next + Stripe, agent IA support/reco, ERP/stock, automatisations n8n |

### Examples
**Friend'iz en featured** (`/images/portfolio/friendiz-1.webp`). Compléments : `maison-enileh`, `comparateur-ia` (à valider à l'implémentation, ou placeholders neutres si jugés hors-sujet).

### Method (4 étapes)
Brief & catalogue → Design boutique → Build & intégrations (paiement, livraison, emails, analytics) → Lancement & formation back-office

### Comparison
Aurentia vs Freelance Shopify vs Agence Shopify Plus. Axes : prix, délai, design custom, intégrations email/livraison/analytics, formation back-office, propriété.

### FAQ (7 questions)
1. Délai de livraison
2. Gestion catalogue & photos produits
3. Frais Shopify (à part, gérés sur le compte client)
4. TVA & facturation
5. Livraison & transporteurs supportés (Mondial Relay, Colissimo, Chronopost, etc.)
6. Multi-langues / multi-devises
7. Migration depuis WooCommerce / Wix / Prestashop

### TrustStats
`7 j` délai moyen · `100 %` Shopify expert · `1` interlocuteur dédié · `100 %` propriétaire de la boutique

## 4. Sections custom — détails

### 4.1 `EcommerceAnatomy` — "L'anatomie d'une boutique qui convertit"

**Position** : entre `WhatYouGet` et `Pricing` (sell le craft avant le prix).

**Comportement** :
- Mockup éditorial split desktop + mobile, centré, large.
- Au scroll, **annotations animées** apparaissent par-dessus le mockup (pointeurs avec lignes guide), révélant 4-5 zones design clés : Hero éditorial, Fiche produit (galerie + UGC), Trust badges discrets, Panier sticky, Checkout en 1 page.
- Chaque annotation = `<h3>` court + 1 phrase descriptive (= SEO clean).
- Animations scroll-triggered (GSAP scrub OU framer-motion `whileInView` selon ce qui matche les patterns du projet).
- **Aucun `position: sticky` ni `pin: true`** (interdit par CLAUDE.md). Section `h-screen` simple avec scrub progressif.

**SEO** : section `<section>` avec `<h2>L'anatomie d'une boutique qui convertit</h2>` + `<h3>` par annotation.

**Asset** : 1 mockup hero ultra-soigné (à fournir/générer — peut s'inspirer de Friend'iz). Annotations en pur CSS/SVG.

### 4.2 `EcommerceStack` — Grille intégrations type SaaS

**Position** : après `EcommerceAnatomy`, avant `Pricing`.

**Comportement** : réplique exacte du pattern `SaaSIntegrationsV2` (grille 12×9 desktop, 4 colonnes mobile, mask gradient, center text, motion scale-in stagger).

**Outils ecommerce** (~18-20 logos, à puiser dans `/public/images/integrations/`, ajouter ce qui manque) :
Shopify, Stripe, Klaviyo, Brevo, Mailchimp, Mondial Relay, Colissimo, Chronopost, Zapier, n8n, Notion, Google Shopping, Meta Pixel (Facebook), GA4 (Google Analytics), TikTok Pixel, Pinterest, Trustpilot, OpenAI, WhatsApp, Gmail.

**Center text** : `<h2>Connecté à tous vos outils ecommerce.</h2>` + sous-titre + CTA "Réserver un appel".

### 4.3 `EcommerceShowcase` — Carrousel cinématique de boutiques

**Position** : après `Method`, avant `Comparison` (closer "agency portfolio").

**Comportement** :
- 3-4 slides full-bleed (frame `max-w-[1400px]` non-surface).
- Chaque slide : mockup boutique grand format (desktop + mobile cohabitant) + nom de la marque + 1 stat punch ("Livré en 6 jours", "+34 % conversion").
- Transitions : crossfade + parallax léger sur le mockup ; autoplay doux (5-7 s par slide) avec pause au hover, indicateurs cliquables.
- Animations toutes >= 700 ms `ease-in-out`.
- Mobile : carrousel swipeable.

**SEO** : `<h2>Des boutiques qui font la différence.</h2>` + `<h3>` (nom marque) par slide.

**Slides initiales** :
1. **Friend'iz** (asset existant `/images/portfolio/friendiz-1.webp`)
2-4. À définir : autres réfs réelles si dispo, sinon 2-3 mockups stylés génériques en attendant (placeholder honnête, pas de fake stats fabriquées).

## 5. Ordre final des sections

```
1.  Hero
2.  TrustBand
3.  ForWho
4.  Examples (Friend'iz featured)
5.  Testimonials
6.  HomeBookingCTA
7.  WhatYouGet
8.  EcommerceAnatomy        ← NEW
9.  EcommerceStack          ← NEW (style SaaS)
10. Pricing
11. ContextualHelpCTA
12. Guarantees
13. Method
14. EcommerceShowcase       ← NEW
15. Comparison
16. FAQ
17. HomeBookingEmbed
```

`SUB_NAV` étendu pour exposer "Anatomie", "Outils", "Showcase".

## 6. Règles transverses (rappel CLAUDE.md projet)

- TypeScript strict, pas de `any`, pas de `text-xs` ni de tailles `< text-sm`
- Tokens sémantiques (`text-foreground`, `bg-background`, `bg-foreground`/`text-background` pour boutons solides) — jamais de `text-white` hardcodé hors décoration pure
- Toutes les transitions ≥ 500 ms (700 ms idéal), `ease-in-out`
- `bg-foreground/X` pour boutons solides (light/dark auto-inversés)
- Mobile-first, parfait dans les deux thèmes
- Pas de `position: sticky` ni `pin: true` sur sections full-screen (sauf HomeHero exception)
- Sections non-surface = `max-w-[1400px]` ; sections surface = `max-w-[1400px]` extérieur, `max-w-6xl` intérieur

## 7. SEO & métadonnées

```ts
title: "Création de boutique Shopify sur-mesure dès 2 500 €"
description: "Agence Shopify : boutique ecommerce livrée en 7 jours. Design sur-mesure, paiement + livraison + email marketing inclus. Sur-mesure Next.js + Stripe possible."
```

Ajout au `sitemap.ts`. Vérifier que `robots.ts` n'exclut pas `/sites-web/ecommerce`.

## 8. Hors scope

- Vraies études de cas ecommerce supplémentaires : à produire en parallèle, pas bloquant pour la mise en ligne (placeholders honnêtes acceptés sur Showcase).
- Pages enfants additionnelles (ex : `/sites-web/ecommerce/shopify-plus`, `/sites-web/ecommerce/migration`) : pas dans cette itération.
- Refonte du parent `/sites-web` pour mentionner ecommerce : ajout d'un simple lien suffit ; pas de refonte de la page hub.
- Lead magnet ecommerce dédié : voir `BRIEF-LEAD-MAGNETS.md`, hors scope ici.

## 9. Critères d'acceptation

- [ ] `/sites-web/ecommerce` accessible et indexable
- [ ] Toutes les sections du `SubPageData` rendues correctement
- [ ] 3 sections custom (`EcommerceAnatomy`, `EcommerceStack`, `EcommerceShowcase`) intégrées et fonctionnelles desktop + mobile
- [ ] Pricing exact : 2 500 € / dès 3 900 € / sur devis dès 6 500 €
- [ ] Friend'iz featured dans Examples ET dans Showcase
- [ ] Light + dark mode parfaits
- [ ] Sub-nav fonctionnelle avec scroll vers les sections
- [ ] Métadonnées SEO + sitemap à jour
- [ ] Aucune transition instantanée, aucun `text-xs`, aucun `text-white` non-décoratif
- [ ] Lighthouse SEO ≥ 95, Performance ≥ 90 sur cette page
