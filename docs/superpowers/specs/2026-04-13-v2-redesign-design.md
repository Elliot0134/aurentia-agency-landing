# Refonte v2 — Aurentia Agency

**Date :** 2026-04-13
**Statut :** Design validé, prêt pour planification d'implémentation
**Auteur :** Elliot Estrade (brainstorm assisté Claude)

---

## 1. Contexte & problème

Le site actuel d'Aurentia Agency confond les visiteurs : 8 routes services, 3 cibles différentes mélangées sur la home, navigation lourde avec une sub-nav qui change sur chaque page, animations scroll-trigger immersives qui donnent un effet "landing page géante" plutôt qu'un site d'agence pro.

Retours clients récurrents : « trop d'animations, trop landing-page, je ne sais pas ce que vous faites vraiment ».

**Objectif de la refonte :** transformer Aurentia en un **vrai site corporate multi-pages** clair, dense, lisible — où chaque visiteur comprend en 30 secondes ce qu'on propose et où aller selon son besoin.

---

## 2. Stratégie de positionnement

### Parapluie unique
Les offres d'Aurentia se rangent sous **un seul fil rouge** : l'IA, à deux endroits dans la vie d'une entreprise.

> **« L'IA dans vos produits. L'IA dans votre quotidien. »**

- **Dans vos produits** → on construit vos sites et SaaS (avec l'IA comme accélérateur de production, et potentiellement comme feature intégrée)
- **Dans votre quotidien** → on forme vos équipes, on configure Claude, on audite, on déploie des skills custom chez vous

> ⚠️ Le wording exact du headline reste à valider en phase d'implémentation. Le concept de dualité « produits / quotidien » est en revanche acté.

### Trois cibles, quatre piliers
Quatre piliers de navigation au lieu des 8 services actuels. Chaque pilier a une porte d'entrée claire pour une cible identifiable.

| Pilier | Cible primaire | Sous-pages |
|---|---|---|
| **Sites Web** | TPE / artisans / commerces / startups | Site vitrine · Landing page |
| **SaaS sur-mesure** | Startups / PMEs avec budget produit | (page unique) |
| **Solutions IA** | Entreprises / freelances / équipes | Formation IA · Configuration Claude · Audit · Implémentation IA |
| **L'agence** | Tous (corporate / preuve sociale) | À propos · Réalisations · Le blog · Ressources · Affiliation |

---

## 3. Architecture du site

### 3.1 Sitemap complet

```
/
├── /sites-web                                  ← pillar commercial
│   ├── /sites-web/site-vitrine
│   └── /sites-web/landing-page
│
├── /saas                                       ← pillar commercial (page unique)
│
├── /solutions-ia                               ← pillar commercial
│   ├── /solutions-ia/formation-ia
│   ├── /solutions-ia/configuration-claude
│   ├── /solutions-ia/audit
│   └── /solutions-ia/implementation-ia
│
├── /agence                                     ← pillar corporate (template séparé)
│   ├── /agence/a-propos
│   ├── /agence/realisations                    ← Phase 2
│   │   └── /agence/realisations/[slug]         ← Phase 2
│   ├── /agence/blog                            ← Phase 2
│   │   └── /agence/blog/[slug]                 ← Phase 2
│   ├── /agence/ressources                      ← Phase 3
│   │   └── /agence/ressources/[slug]           ← Phase 3
│   └── /agence/affiliation                     ← Phase 3
│
├── /contact
│
└── footer
    ├── /cgv
    ├── /mentions-legales
    └── /politique-confidentialite
```

### 3.2 Navbar finale

```
[Aurentia.]   Sites Web ▾   SaaS   Solutions IA ▾   L'agence ▾   |   Contact   [Prendre RDV]
```

- **5 entrées** au lieu de 8+
- Mega-menus desktop au survol pour les piliers à sous-pages (Sites Web, Solutions IA, L'agence)
- SaaS = entrée simple, pas de menu (page unique)
- Mobile : menu hamburger classique avec accordéons
- Sticky en haut, fond `bg-background/80` avec backdrop-blur léger
- CTA "Prendre RDV" en pill `bg-foreground text-background` (s'inverse en dark mode automatiquement)

### 3.3 Footer

4 colonnes :
1. **Aurentia.** — logo, baseline, réseaux sociaux
2. **Offres** — liens vers les 4 piliers et leurs sous-pages
3. **L'agence** — liens vers À propos / Réalisations / Blog / Ressources / **Affiliation** / Contact
4. **Légal** — CGV / Mentions légales / Politique de confidentialité

---

## 4. Stratégie de routing & déploiement

### Approche : `/v2` dans le projet existant
On crée une route parallèle `/v2/...` dans le projet actuel. Le site live continue de tourner sur `/`. La v2 vit en parallèle jusqu'à validation complète, puis on swap.

**Avantages :**
- Pas de risque pour la prod
- Possibilité de partager `aurentia.agency/v2` à des clients-test pour feedback avant le swap
- Réutilisation de toute l'infra déjà câblée (N8N webhooks, contact form, lucky-spin, Supabase, déploiement Vercel)
- Pas de duplication de stack, de configs, de dépendances

**Phase de bascule :**
Quand la Phase 1 est validée :
1. Les routes `/v2/*` deviennent `/*`
2. Les anciennes routes `/*` sont déplacées en `/legacy/*` (ou supprimées si on est sûrs)
3. Redirections 301 mises en place pour préserver le SEO existant
4. Une seule action de routing dans le code Next.js (pas de migration DB, pas de rebuild d'infra)

### Phasage

| Phase | Périmètre | Critère shippable |
|---|---|---|
| **Phase 1** | Home + 3 pillars commerciaux + leurs sous-pages + /agence (light) + /agence/a-propos + /contact + Navbar + Footer | Le visiteur comprend l'offre, peut s'auto-qualifier, peut prendre contact. C'est le minimum corporate vendable. |
| **Phase 2** | /agence/realisations (liste + détail) + /agence/blog (liste + détail) | Preuve sociale détaillée + moteur SEO actif |
| **Phase 3** | /agence/ressources (liste + détail) + /agence/affiliation | Lead magnets + programme partenaire |

**Phase 1 — pages incluses :**
- `/v2`
- `/v2/sites-web`, `/v2/sites-web/site-vitrine`, `/v2/sites-web/landing-page`
- `/v2/saas`
- `/v2/solutions-ia`, `/v2/solutions-ia/formation-ia`, `/v2/solutions-ia/configuration-claude`, `/v2/solutions-ia/audit`, `/v2/solutions-ia/implementation-ia`
- `/v2/agence` (version light, à enrichir plus tard)
- `/v2/agence/a-propos`
- `/v2/contact`
- Navbar + Footer v2

**Hors scope Phase 1 :** Réalisations, Blog, Ressources, Affiliation. Les liens depuis la nav et le footer pointent vers ces routes mais elles sont en "Coming soon" ou redirigées vers Contact.

---

## 5. Design des pages

### 5.1 Home (`/v2`)

Home plate, dense, lisible en 30 secondes. Pas de scroll narratif animé. Chaque section a un job précis, tient en un écran ou moins, et utilise des animations légères (fade-in 700ms ease-in-out max).

**Sections, dans l'ordre :**

| # | Section | Job |
|---|---|---|
| 1 | **Hero** | Promesse claire (parapluie « L'IA dans vos produits. L'IA dans votre quotidien. ») + dual CTA + visuel droite + badges réassurance au-dessus du headline |
| 2 | **Bandeau logos clients/partenaires** | Crédibilité immédiate. Logos en niveaux de gris, statiques ou marquee très lent |
| 3 | **Les 4 piliers en grille** | Sites Web / SaaS / Solutions IA / L'agence avec icône, baseline courte, prix d'entrée (si applicable), lien "Découvrir →" |
| 4 | **Pourquoi Aurentia** | 3-4 différenciateurs (vitesse IA, expertise, accompagnement, sur-mesure) en grille |
| 5 | **Réalisations en aperçu** | 3-4 cas clients en grille (image + nom + résultat clé). En Phase 1 : cards statiques, le lien "Voir toutes" pointe vers /agence (placeholder). En Phase 2 : lien actif vers /agence/realisations |
| 6 | **Témoignages** | 2-3 vrais témoignages avec photo, nom, rôle, entreprise |
| 7 | **Notre méthode en 4 étapes** | Briefing → Devis → Production → Livraison & support. Schéma horizontal simple, **pas une animation pinned** |
| 8 | **FAQ** | 6-8 questions clés, accordéon classique |
| 9 | **CTA final** | « Discutons de votre projet » + form contact court (réutilise composant existant + webhook N8N) ou bouton vers /contact |
| 10 | **Footer** | (composant global) |

**Composants supprimés vs home actuelle :**
- HeroEasterEgg (roulette cachée)
- HomeAurentiaName, HomeManifeste, HomeInnovation, HomeMarquee, HomeNiches
- HomeAdvantages (fusionné dans "Pourquoi Aurentia")
- HomeProcessV2 (on garde une seule version simple du process)
- HomeTeam (déplacé dans /agence/a-propos)
- Toutes les animations GSAP scroll-trigger lourdes / pinned sections / parallax

**Composants ré-écrits ou conservés :**
- HomeHero → réécrit (style corporate, 2 colonnes, plus simple)
- HomePortfolio → "Réalisations en aperçu", simplifié
- HomeTestimonials → conservé, allégé
- HomeProcess → version simple, pas animée
- HomeFAQ → conservé
- HomeContact → conservé, branché sur N8N comme aujourd'hui
- Footer → refait

### 5.2 Pillar pages commerciales (Sites Web, SaaS, Solutions IA)

Une pillar page commerciale est une **page d'aiguillage** : elle présente le pilier, ses sous-offres, et envoie le visiteur vers la bonne sous-page. Elle peut aussi convertir directement.

**Composant React unique :** `<CommercialPillarPage>` avec props pour titre, sous-offres, méthode, FAQ, etc. Une seule source de vérité pour la structure des 3 piliers commerciaux.

**Sections type :**

| # | Section | Job |
|---|---|---|
| 1 | **Mini-hero du pilier** | Headline résumant le pilier. Sub-titre. Dual CTA. Visuel droite. ~60 vh |
| 2 | **Bandeau réassurance** | 3-4 chiffres clés (projets livrés, délai moyen, satisfaction, etc.) |
| 3 | **Sous-offres en grille** | Cartes des sous-pages : icône + nom + 1 ligne pitch + à partir de X€ + lien "Découvrir →". Pour SaaS : remplacé par "Ce qu'on construit" (MVP, refonte, intégration IA, SaaS internes) |
| 4 | **Pour qui c'est** | 3-4 profils types pour auto-qualification |
| 5 | **Notre méthode** | Process en 4 étapes reformulé pour ce pilier |
| 6 | **Réalisations filtrées** | 2-3 cas clients pertinents (Phase 1 : cards statiques, Phase 2 : filtrage depuis /agence/realisations) |
| 7 | **Témoignages filtrés** | 1-2 témoignages clients de ce pilier |
| 8 | **FAQ spécifique** | 5-7 questions propres au pilier |
| 9 | **CTA final** | Vers /contact pré-rempli avec le pilier en sujet |

**Spécificité `/saas` :**
- Pas de sous-menu donc pas de section "sous-offres en grille"
- À la place : section "Ce qu'on construit" (MVP / Refonte / Intégration IA / SaaS internes)
- Ajout d'une section "Notre stack" (logos techno : Next.js, Supabase, etc.)

### 5.3 Pillar page corporate (`/agence`)

Template **distinct** des pillar pages commerciales. À finaliser plus tard, mais en Phase 1 on commence simple :

- Hero court (présentation de l'agence)
- Grille des 5 sous-pages (À propos / Réalisations / Blog / Ressources / Affiliation)
- Notre histoire en 1 paragraphe
- Équipe en aperçu (3-4 personnes, lien vers /agence/a-propos)
- CTA contact

**Composant React :** `<AgencyPillarPage>`, séparé de `<CommercialPillarPage>`.

> ⚠️ La structure définitive de `/agence` est à raffiner quand on aura plus de matière (réalisations, blog, etc.).

### 5.4 Sous-pages (`/sites-web/site-vitrine`, `/solutions-ia/audit`, etc.)

C'est le bout de la chaîne — la page qui doit faire signer. Remplace les pages services actuelles, mais cette fois :
- **Même navbar partout** (pas de sub-nav qui change)
- **Pas d'identité visuelle dérivante** (pas de couleur/typo qui change selon la page)
- **Contenu plat, lisible** — animations légères uniquement
- **Tarifs affichés** (sauf si vraiment "sur devis", auquel cas on l'écrit clairement)

**Composant React unique :** `<SubPage>` avec props.

**Sections type :**

| # | Section | Job |
|---|---|---|
| 1 | **Hero offre** | Headline ultra-spécifique. Sub-titre. Prix d'entrée. Dual CTA. Visuel droite |
| 2 | **Pour qui c'est** | 2-3 profils types très concrets |
| 3 | **Ce que vous obtenez** | Liste claire (5-8 lignes), style checklist |
| 4 | **Le processus** | Étapes spécifiques à cette offre |
| 5 | **Tarifs détaillés** | 1 à 3 packs avec prix clairs, pack recommandé en avant. Réutilise la skill `billing-sdk` |
| 6 | **Exemples de réalisations** | 2-4 mockups/screenshots de projets passés correspondant à cette offre |
| 7 | **Témoignages filtrés** | 1-2 témoignages spécifiques |
| 8 | **FAQ spécifique** | 6-10 questions propres à l'offre (objections, modalités, délais, paiement) |
| 9 | **CTA final** | Form contact pré-rempli OU bouton calendly/RDV |

**Sub-nav sticky identique sur toutes les sous-pages** : `Pour qui · Inclus · Process · Tarifs · Exemples · FAQ · Devis`. Toujours les mêmes ancres, le visiteur s'oriente sans réfléchir.

**Données :** chaque sous-page lit ses données depuis `src/data/[offre].ts` (pattern existant).

---

## 6. Architecture composants

```
src/
├── app/
│   └── v2/                                     ← Toute la v2 vit ici
│       ├── layout.tsx                          ← layout v2 (NavbarV2 + FooterV2)
│       ├── page.tsx                            ← Home v2
│       ├── sites-web/
│       │   ├── page.tsx                        ← <CommercialPillarPage data={sitesWebData} />
│       │   ├── site-vitrine/page.tsx           ← <SubPage data={siteVitrineData} />
│       │   └── landing-page/page.tsx           ← <SubPage data={landingPageData} />
│       ├── saas/page.tsx                       ← <CommercialPillarPage data={saasData} variant="single" />
│       ├── solutions-ia/
│       │   ├── page.tsx                        ← <CommercialPillarPage data={solutionsIaData} />
│       │   ├── formation-ia/page.tsx
│       │   ├── configuration-claude/page.tsx
│       │   ├── audit/page.tsx
│       │   └── implementation-ia/page.tsx
│       ├── agence/
│       │   ├── page.tsx                        ← <AgencyPillarPage />
│       │   └── a-propos/page.tsx
│       └── contact/page.tsx
│
├── components/
│   └── v2/                                     ← Tous les composants v2 isolés
│       ├── layout/
│       │   ├── NavbarV2.tsx                    ← navbar avec mega-menus
│       │   └── FooterV2.tsx
│       ├── home/
│       │   ├── HomeHeroV2.tsx
│       │   ├── HomePillarsGrid.tsx
│       │   ├── HomeWhyAurentia.tsx
│       │   ├── HomeRealisationsPreview.tsx
│       │   ├── HomeTestimonialsV2.tsx
│       │   ├── HomeMethodV2.tsx
│       │   ├── HomeFAQV2.tsx
│       │   └── HomeContactV2.tsx
│       ├── pillar/
│       │   ├── CommercialPillarPage.tsx        ← template commercial
│       │   ├── AgencyPillarPage.tsx            ← template corporate
│       │   ├── PillarHero.tsx
│       │   ├── PillarSubOffersGrid.tsx
│       │   └── PillarMethod.tsx
│       ├── subpage/
│       │   ├── SubPage.tsx                     ← template sous-page
│       │   ├── SubPageHero.tsx
│       │   ├── SubPagePricing.tsx              ← utilise billing-sdk
│       │   ├── SubPageStickyNav.tsx
│       │   └── SubPageFAQ.tsx
│       └── shared/
│           ├── TestimonialCard.tsx
│           ├── RealisationCard.tsx
│           ├── ServiceBadge.tsx
│           └── DualCTA.tsx
│
└── data/
    └── v2/                                     ← Toutes les données v2 ici
        ├── home.ts
        ├── sites-web.ts                        ← données pillar
        ├── sites-web-vitrine.ts                ← données sous-page
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

**Principe :** isolation totale de la v2 dans `app/v2/`, `components/v2/`, `data/v2/`. Aucune modification du code existant pendant le développement de la v2. Au moment du swap, on déplace ou on supprime l'ancien, et on déplace `app/v2/*` → `app/*`.

**Réutilisation autorisée depuis l'existant :**
- Hooks et utils (`src/hooks/`, `src/lib/`)
- Composants UI shadcn (`src/components/ui/`)
- Webhooks N8N déjà câblés (lucky spin, contact form)
- Tokens design (variables CSS dans `globals.css`)

---

## 7. Règles transversales (héritées de CLAUDE.md)

### Typographie
- **JAMAIS de `text-xs` ni de tailles inférieures à `text-sm`.** Min absolu = `text-sm`.

### Transitions & fluidité
- **Rien d'instantané.** Toutes les transitions ≥ 500ms (idéalement 700ms), `ease-in-out` par défaut.
- Pas d'animations scroll-trigger lourdes, pas de pinned sections, pas de parallax brutal.
- Animations autorisées : fade-in léger des sections au scroll, hover sur cards, transitions de mega-menu.

### Light / Dark
- **Aucune couleur hardcodée** (`text-white`, `bg-[#xxx]`, etc.). Tokens sémantiques uniquement : `bg-foreground`, `text-foreground`, `bg-background`, `border-foreground/...`.
- Boutons solides : `bg-foreground text-background` (s'inversent automatiquement).
- Boutons ghost : `border-foreground/20 text-foreground/80`.
- Chaque composant doit être visuellement parfait dans **les deux thèmes**. À tester.

### Responsive
- Mobile-first systématique. Tester 375px / 768px / 1280px.
- Popups avec marges (min 16px des bords).
- Touch targets respectés.
- Mega-menus desktop → accordéons mobile.

### Accessibilité
- Skill `accessibility` à appliquer : navigation clavier, ARIA, contraste, focus visible.
- Skill `responsive-best-practices` à appliquer.

### Performance
- Pas de bundle gonflé. Lazy-loading des composants lourds (TestimonialCarousel, Realisations grid en Phase 2).
- Images optimisées via `next/image`.
- Skill `performance` à appliquer en fin de Phase 1.

### SEO
- Skill `seo-checklist` à appliquer pour chaque page : metadata, OG, sitemap.ts, robots.ts, structured data si pertinent.
- Sitemap.ts à mettre à jour pour inclure les routes `/v2/*` (puis swap au moment de la bascule).

---

## 8. Choses qui restent à décider

| Sujet | À décider quand |
|---|---|
| **Wording exact du headline hero** (« L'IA dans vos produits. L'IA dans votre quotidien. » est une proposition, pas une décision finale) | Au moment d'attaquer la Home |
| **Direction visuelle exacte du hero** (style corporate type BGB validé en intention, mais le mockup précis n'a pas été itéré) | Au moment d'attaquer la Home |
| **Couleurs / thème** : on garde les tokens actuels (crème nacré + terracotta) ou on revoit ? | Avant d'attaquer le code |
| **Structure définitive de `/agence`** (template AgencyPillarPage à raffiner) | Quand on aura plus de matière (Phase 2) |
| **Copy de chaque sous-page** : qui l'écrit, quand | Avant de coder chaque sous-page (sinon Lorem ipsum partout) |
| **Sort de `synergies.jsx` et `aurentia-synergies.jsx`** (fichiers untracked à la racine) | Avant le swap final |

---

## 9. Critères de succès

La refonte est réussie si :
- ✅ Un visiteur qui débarque sur la home comprend en 30 secondes ce que fait Aurentia
- ✅ Il sait immédiatement vers quel pilier se diriger selon son besoin
- ✅ La navigation est cohérente sur toutes les pages (même navbar, même footer, même style)
- ✅ Aucune page ne donne l'impression d'une "landing page autonome qui sort du site"
- ✅ Les retours clients « trop d'animations, trop landing-page, trop flou » disparaissent
- ✅ Le site charge vite (Lighthouse ≥ 90 sur toutes les pages) et fonctionne parfaitement en light et dark

---

## 10. Prochaines étapes

1. **Validation utilisateur** de ce design doc
2. **Plan d'implémentation détaillé** via la skill `superpowers:writing-plans` — découper la Phase 1 en tâches granulaires, identifier les dépendances, estimer
3. **Décisions visuelles bloquantes** (wording headline, mockup hero) avant d'attaquer le code
4. **Implémentation Phase 1** dans une branche dédiée (ex: `feat/v2-redesign-phase1`)
