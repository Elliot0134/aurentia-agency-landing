# Spec — Page `/sites-web/sur-mesure`

**Date** : 2026-04-26
**Statut** : Validé, prêt pour plan d'implémentation
**Owner** : Elliot

## 1. Contexte & objectif

Ajouter la 4ème (et dernière) sous-page de l'offre **Sites Web**, dédiée au **sur-mesure**, au même niveau que `/sites-web/landing-page`, `/sites-web/site-vitrine` et `/sites-web/ecommerce`.

La formule "Sur-mesure" existe déjà dans `src/data/v2/sites-web-formules.ts` (slug `sur-mesure`, `href: "/sites-web/sur-mesure"`, `comingSoon: true`) mais ni la route ni le fichier data n'existent. Il faut créer les deux et désactiver le flag `comingSoon`.

Objectif : capter les leads sur projets premium / hors-cadre (apps web, marketplaces, plateformes, expériences brand fortes), pricer haut, qualifier en amont via un floor à **6 000 €** affiché.

## 2. Architecture (réplication 1-pour-1 du pattern existant)

**Aucune nouvelle abstraction, aucun nouveau composant.** Le pattern `SitesWebSubPage` lit la data dans un `DATA_MAP` indexé par slug. Cette page se branche dessus :

- **Route** : `src/app/sites-web/sur-mesure/page.tsx` (~13 lignes, calque exact de `site-vitrine/page.tsx`, slug `"sur-mesure"`, metadata SEO custom)
- **Data** : `src/data/v2/sites-web-sur-mesure.ts` (nouveau fichier conforme au type `SubPageData` de `src/data/v2/types.ts`)
- **Map** : ajout `"sur-mesure": sitesWebSurMesureData` au `DATA_MAP` de `src/components/v2/sites-web/SitesWebSubPage.tsx`
- **Formules** : retirer `comingSoon: true` de la formule sur-mesure dans `src/data/v2/sites-web-formules.ts`
- **Navbar / Footer** : ajouter le lien `{ label: "Sur-mesure", href: "/sites-web/sur-mesure" }` dans `src/data/v2/navbar.ts` (sous la section Sites Web) et `src/data/v2/footer.ts` (colonne Sites Web)
- **Sitemap** : pas de modif — `src/app/sitemap.ts` ne liste pas les sous-pages individuelles

**Pas de nouveau composant à créer.** Toutes les sections sont rendues par les composants existants utilisés par vitrine et landing : `SitesWebHero`, `SubPageTrustBand`, `SubPageForWho`, `SitesWebExamples`, `SitesWebTestimonials`, `HomeBookingCTA`, `SitesWebWhatYouGet`, `SitesWebPricing`, `SubPageGuarantees`, `SitesWebMethod`, `SubPageComparison`, `SitesWebFAQ`, `HomeBookingEmbed`.

La section "Stack & Architecture" évoquée en brainstorm est **explicitement retirée du scope** (décision Elliot).

## 3. Positionnement & contenu

### Promesse hero
Headline orienté "projets qui sortent du cadre" : marketplace, app web, SaaS sur-mesure, plateforme expérientielle. Sous-titre rassurant sur l'exigence (architecture, code remis 100%, scalable).

### Pricing affiché
**Floor unique : "À partir de 6 000 €"** + mention "sur devis selon scope". Une seule pricing card (pas de 3-tiers — ce serait faux sur du sur-mesure).

### 2 personas (forWho)
1. **Founders SaaS / marketplaces / apps web** — besoin d'un partenaire tech pour MVP, plateforme B2B, marketplace, app interne, intégrations API, back-office
2. **Marques & projets expérientiels / plateformes custom** — site brand-strong avec parcours sur-mesure, contenus interactifs, intégrations métier (ex: HighLove)

### 2 exemples réels (examples)
1. **Friendiz** — marketplace, image existante `/public/images/portfolio/friendiz-1.webp`
2. **HighLove** (highlove.fr) — marque expérientielle bien-être, image **à fournir** dans `/public/images/portfolio/highlove-1.webp`

> ⚠️ **Asset manquant** : si l'image `highlove-1.webp` n'est pas fournie au moment du dev, utiliser temporairement `friendiz-1.webp` ou un placeholder neutre. À remplacer impérativement avant mise en prod.

### Sections livrées (séquence identique vitrine/landing, **sans testimonials**)
Hero → TrustBand → ForWho → Examples → BookingCTA → WhatYouGet → Pricing → ContextualHelpCTA → Guarantees → Method → Comparison → FAQ → BookingEmbed.

> ⚠️ **Section Testimonials retirée pour cette sub-page** (décision Elliot : pas de témoignages réels disponibles, on n'invente pas). Si `SitesWebSubPage.tsx` ne gère pas déjà un tableau `testimonials` vide proprement, le rendre conditionnel : `{data.testimonials.length > 0 && <SitesWebTestimonials items={data.testimonials} />}`. Le champ `testimonials: []` reste présent dans la data (typé requis), juste vide.

### Contenu rédactionnel par section

- **trustStats** : 3-4 stats type "Projets sur-mesure livrés", "Stack maîtrisée", "Code remis 100%", "Délai moyen scoping"
- **whatYouGet** : adapté custom — architecture Next.js + Supabase + Stripe, back-office admin, intégrations API, tests, documentation, code remis, formation
- **process** : 5 étapes — Call découverte (gratuit) → Cahier des charges chiffré → Design / wireframes → Dev itératif → Livraison + handover
- **guarantees** : code remis 100%, propriété intellectuelle, scope verrouillé en début, pas de surprise, support 30j
- **comparison** : Aurentia sur-mesure vs Agence classique vs No-code (Webflow/Bubble) — colonnes type "Code remis", "Scalabilité", "Délai", "Custom intégrations", "Tarif"
- **faq** : 5-7 questions — délais réels, propriété code, scope changes en cours de route, intégrations possibles, TMA / maintenance, démarrage, qui code, technos
- **finalCta** : pousse vers `/contact` pour scoping gratuit

### SEO
- `metadata.title` : ex. "Sites web sur-mesure — Apps, marketplaces, plateformes | Aurentia"
- `metadata.description` : courte, mentionne "à partir de 6 000 €", scoping gratuit
- Pas de structured data spécifique au-delà du pattern existant

## 4. Hors scope

- Section "Stack & Architecture" (composant dédié) — droppée volontairement
- Inventer un 3ème exemple réel — assumé, on reste sur 2 cards solides
- Refonte du composant `SitesWebSubPage` — uniquement ajout au `DATA_MAP`
- Modif du sitemap — sous-pages non listées individuellement
- Modif de la page parent `/sites-web` — la formule sur-mesure y figure déjà via `SitesWebFormulesHub` / `SitesWebFormulesSplits`

## 5. Pré-requis externes (Elliot)

- À fournir plus tard : `public/images/portfolio/highlove-1.webp` (screenshot highlove.fr). Le path est référencé en dur dans la data dès maintenant — Next/Image cassera tant que le fichier n'est pas déposé. **Assumé temporairement par Elliot.**
- Optionnel : fournir une image hero dédiée `public/images/sites-web/sur-mesure-hero.jpg` — sinon réutiliser un visuel existant
- Témoignages : aucun fourni pour le moment, section retirée (cf. §3)

## 6. Critères d'acceptation

- `pnpm build` passe sans erreur TypeScript
- La route `/sites-web/sur-mesure` rend toutes les sections sans erreur runtime
- Les liens navbar et footer pointent vers la nouvelle page
- La carte "Sur-mesure" dans la hub `SitesWebFormulesHub` n'affiche plus le badge "Bientôt disponible"
- Le rendu visuel est conforme aux deux thèmes (light + dark) — pas de couleur hardcodée
- Mobile-first OK (vérifier sur 375px, 768px, 1280px)
- Tous les textes ≥ `text-sm`, transitions ≥ 500ms (cf. CLAUDE.md projet)
