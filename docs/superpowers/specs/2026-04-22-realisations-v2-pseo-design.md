# Réalisations V2 — Programmatic SEO + Case Studies enrichis

**Date** : 2026-04-22
**Status** : Approved (design) → awaiting implementation plan
**Branch** : `feat/v2-redesign-phase1`

---

## Objectif

Rebuild la section "Réalisations" pour la V2 avec une archi pensée **SEO maximal** : case studies premium, pages programmatiques par secteur/type/croisement, maillage interne dense, schémas structurés complets. Remplace l'actuelle `/realisations` (V1) en la portant sous `/v2/realisations` avec un niveau de finition ×10.

## Contraintes & principes

- Stack existante : Next.js 14 App Router, TypeScript strict, Tailwind, shadcn, pnpm 10.26.2
- Respect CLAUDE.md projet : light/dark tokens sémantiques, pas de `text-xs`, transitions ≥500ms, pas de `sticky` full-screen sauf cas validés
- Content-as-code (MDX + Zod), pas de CMS DB pour l'instant
- Build SSG complet (pas d'ISR sauf nécessité)
- Mobile-first, accessibilité WCAG AA

## Architecture fichiers

```
src/content/realisations/
  [slug].mdx                               ← narratif + composants inline

src/data/realisations/
  secteurs.ts                              ← 6-7 secteurs + métadonnées + copy pages secteur
  types.ts                                 ← 4 types + métadonnées
  schemas.ts                               ← Zod schemas pour frontmatter
  index.ts                                 ← helpers typés

src/components/v2/realisations/
  ReaHero.tsx                              ← hero index
  ReaSectorBlock.tsx                       ← bloc secteur sur l'index
  ReaTypeBlock.tsx                         ← bloc type sur l'index
  ReaProjectGrid.tsx                       ← grid complète filtrable
  ReaProjectCard.tsx                       ← card projet
  CaseStudyLayout.tsx                      ← layout 2 colonnes (rail + scroll)
  CaseStudyRail.tsx                        ← rail sticky gauche (méta + sommaire scroll-spy)
  CaseStudyHero.tsx
  CaseStudySections.tsx                    ← wrapper pour sections scroll-spy
  CaseStudyMetrics.tsx
  CaseStudyGallery.tsx
  CaseStudyTestimonial.tsx
  CaseStudyRelated.tsx                     ← projets similaires auto
  CaseStudyCTA.tsx                         ← CTA pré-rempli
  mdx/                                     ← composants embarquables dans MDX
    BeforeAfter.tsx
    MetricGrid.tsx
    Gallery.tsx
    SplitSection.tsx
    Callout.tsx
  SectorPageLayout.tsx
  SectorFAQ.tsx
  TypePageLayout.tsx

src/app/v2/realisations/
  page.tsx                                 ← index hub pSEO
  [slug]/page.tsx                          ← case study
  secteur/[secteur]/page.tsx               ← page secteur (phase 1)
  type/[type]/page.tsx                     ← page type (phase 2)
  [secteur]/[type]/page.tsx                ← croisée conditionnelle (phase 2)
  opengraph-image.tsx                      ← OG dynamique index
  [slug]/opengraph-image.tsx               ← OG dynamique case study
  secteur/[secteur]/opengraph-image.tsx    ← OG dynamique secteur
```

Migration : les ~10 projets de `src/data/projects.ts` (V1) sont portés en MDX, puis l'ancien fichier TS est supprimé.

## Données

### Frontmatter MDX (Zod)

```ts
{
  slug: string,
  name: string,
  type: "Site vitrine" | "SaaS" | "Landing page" | "Identite visuelle",
  secteur: Secteur,            // enum depuis secteurs.ts
  city: string,
  year: number,
  duration: string,
  status: "Livre" | "En cours",
  featured?: boolean,          // mise en avant index
  clientName?: string,
  clientRole?: string,
  clientLogo?: string,
  tags: string[],
  technos: string[],
  liveUrl?: string,
  coverImage: string,
  images: string[],
  metrics: { value: string, label: string, context?: string }[],
  testimonial?: { quote: string, author: string, role: string, avatar?: string },
  seo?: { title?: string, description?: string }
}
```

Parsing via `gray-matter` + `next-mdx-remote/rsc` (RSC-compatible). Validation stricte, build fail si non conforme.

### Corps MDX

Sections narratives libres en markdown + composants React embarqués (`<BeforeAfter>`, `<MetricGrid>`, `<Gallery>`, `<SplitSection>`, `<Callout>`). Les headings `##` deviennent les ancres du scroll-spy.

## Pages

### 1. Index `/v2/realisations` (hub pSEO)

1. Hero éditorial (titre + sous-titre + compteur projets)
2. Grille featured (3-4 projets phares)
3. Blocs secteurs : un bloc par secteur (titre + 2-3 projets + lien "Voir tous les projets [secteur]")
4. Blocs types : un bloc par type (lien "Voir tous les [type]")
5. Grid complète filtrable (filtres type + secteur + année, client-side)
6. CTA final

Maillage : chaque carte projet → case study. Chaque bloc secteur → page secteur. Chaque bloc type → page type (phase 2) ou fallback vers grid filtrée (phase 1).

### 2. Case study `/v2/realisations/[slug]`

**Layout desktop** : 2 colonnes, rail sticky gauche (320px) + contenu (1fr).
**Layout mobile** : rail devient drawer accessible via FAB, contenu pleine largeur.

**Rail gauche (sticky)** :
- Métadonnées figées (client, rôle, année, durée, ville, type, secteur, technos chips, lien live)
- Sommaire scroll-spy des 9 sections narratives (section active highlightée, clic = scroll smooth). Le bloc "Projets similaires" et le CTA final ne sont pas des cibles d'ancre.
- Logo Aurentia bas du rail

**Contenu droite — 9 sections narratives + bloc de clôture** :
1. Hero cinématique (nom, tagline, cover animée)
2. Contexte
3. Défi
4. Solution
5. Features (liste iconographiée)
6. Galerie immersive (zoom fullscreen, before/after si refonte)
7. Stack technique (logos + justifications)
8. Résultats (compteurs animés au scroll)
9. Témoignage

Bloc de clôture (hors sommaire) : Projets similaires (auto, filtre secteur + type, 3 cartes) → CTA contextuel ("Vous avez un projet similaire ?" avec pré-remplissage form contact : type, secteur).

Animations : scroll-triggered via Framer Motion, transitions ≥500ms, easing `ease-in-out`, zéro layout shift.

### 3. Page secteur `/v2/realisations/secteur/[secteur]` *(phase 1)*

1. Hero sectoriel (titre H1 "Création de [type principal] pour [secteur]")
2. Argumentaire métier 800-1500 mots uniques (enjeux, spécificités, notre approche)
3. Projets du secteur (grid)
4. Process adapté au secteur
5. FAQ métier (5-8 Q/R, schema FAQPage)
6. CTA

Contenu rédigé par Elliot (à partir du code + URLs + retours clients fournis, pas d'invention IA).

### 4. Page type `/v2/realisations/type/[type]` *(phase 2)*

Portfolio orienté type (liste exhaustive + filtres secteur). Différenciée des pillar pages (`/v2/sites-web/site-vitrine`, `/v2/saas`, etc.) par orientation **portfolio** (cas réels) vs **offre commerciale**. Canonical prudent.

### 5. Pages croisées `/v2/realisations/[secteur]/[type]` *(phase 2, conditionnelles)*

Générées via `generateStaticParams` uniquement pour combinaisons avec ≥1 projet match. Sinon pas de page (404 naturel). Contenu : 500-800 mots unique + projets matching + CTA. Si <1 projet ou contenu trop mince → `noindex` auto en safety.

## Stack SEO (10/10 points validés)

1. **Schema.org** : `CreativeWork` + `Organization` + `Review` sur case studies ; `CollectionPage` + `ItemList` sur pages secteur/type ; `BreadcrumbList` partout.
2. **Sitemap XML dynamique** (`src/app/sitemap.ts`) incluant toutes les URL générées avec `lastModified` et `priority`.
3. **Breadcrumbs JSON-LD** visibles (composant UI) + structurés.
4. **OG images dynamiques** via `ImageResponse` (@vercel/og intégré à Next) : template case study (nom projet + metric + logo client), template secteur (titre + nb projets), template index.
5. **Maillage interne** :
   - Case study → page secteur + page type + 3 projets similaires + home agence
   - Page secteur → ses projets + types représentés + FAQ + secteur voisin
   - Index → tous secteurs + tous types + featured
6. **FAQ Schema** par page secteur (`FAQPage` JSON-LD).
7. **Contenu unique par page** : Elliot fournit matière (code, URLs, briefs clients), Claude rédige drafts, Elliot valide. Zéro duplicate.
8. **Core Web Vitals** : Next/Image avec AVIF, lazy, `sizes` précis, `priority` uniquement sur hero, pas d'images au-dessus de la fold en layout shift, fonts préchargées.
9. **Canonical + robots** : canonical explicite sur chaque page, `hreflang="fr"`, pas de duplicate entre pillar et page type.
10. **noindex auto** sur croisées à contenu pauvre (seuil : <400 mots uniques + <1 projet).

## Navigation & intégration

- **MegaMenu V2** : ajouter lien "Réalisations" pointant vers `/v2/realisations`, + sous-liens vers top 3 secteurs
- **Footer V2** : section "Réalisations" avec liens vers top secteurs et types
- **HomeRealisationsPreview** : refacto pour consommer la nouvelle source MDX (plus `src/data/projects.ts`)
- **Breadcrumbs** visibles en haut des pages (hors home index)

## Light/Dark theme

Tous composants utilisent les tokens sémantiques (`text-foreground`, `bg-background-surface`, `border-foreground/…`). Rail sticky, chips technos, compteurs, cartes projet : vérifiés dans les 2 thèmes avant merge. Aucune couleur hardcodée sauf éléments décoratifs (shimmer, overlays).

## Phasage

**Phase 1 (ship d'abord — feat/v2-realisations-phase1)**
- Archi MDX + Zod + helpers
- Migration des ~10 projets `src/data/projects.ts` vers MDX
- Index hub `/v2/realisations`
- Case studies `/v2/realisations/[slug]` avec rail sticky complet
- Pages secteur `/v2/realisations/secteur/[secteur]`
- Stack SEO 1-10 (schémas, sitemap, OG, maillage, CWV, canonical, noindex, breadcrumbs)
- Update MegaMenu + Footer + HomeRealisationsPreview
- Suppression ancienne V1 `/realisations` + `/realisations/[slug]` + `src/data/projects.ts`

**Phase 2 (après validation utilisateur phase 1)**
- Pages type `/v2/realisations/type/[type]`
- Pages croisées conditionnelles `/v2/realisations/[secteur]/[type]`
- FAQ Schema enrichi par secteur
- Rédactions sectorielles complètes (800-1500 mots chacune)

## Succès / critères de validation

- Tous les case studies V1 migrés en MDX sans perte de contenu
- Lighthouse SEO ≥ 95 et Performance ≥ 90 sur mobile, sur index + case study + page secteur
- Sitemap contient toutes les URL générées
- OG images renderent correctement (test sur X/LinkedIn preview)
- Google Search Console : aucune erreur "discovered not indexed" au bout de 4 semaines
- Rail sticky fonctionne proprement sur desktop Chrome/Safari/Firefox, drawer mobile OK iOS/Android
- Pas d'erreur de type au build (Zod + TS strict)
- Pages secteur ont du contenu unique validé par Elliot avant merge

## Risques / points ouverts

- **Rédaction sectorielle** dépend de la matière fournie par Elliot (code + URLs + briefs). Phase 1 peut ship avec pages secteur en "draft protected" (`noindex`) si rédaction non finie, à retirer au fil de l'eau.
- **Volume images** : certains projets ont peu de visuels exploitables. Option : générer des mockups desktop/mobile automatiques depuis `liveUrl` via un service (Shot API, Urlbox) en fallback.
- **Différenciation pillar vs page type** : à travailler finement en phase 2 pour éviter cannibalisation SEO. Canonical à arbitrer projet par projet.
- **Performance du rail sticky** sur case studies très longs : monitorer CLS et smooth-scroll cross-browser.

## Hors scope

- Admin UI / CMS (pas de Supabase pour ce contenu)
- Versioning multilingue EN (FR only pour l'instant)
- Commentaires / ratings clients publics
- Analytics d'attribution par page pSEO (à voir post-phase 2 avec l'existant Vercel Analytics)
