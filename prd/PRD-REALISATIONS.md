# PRD — Pages `/realisations` et `/realisations/[slug]`

---

# PARTIE 1 — Page `/realisations` (Portfolio)

---

## 1. Fiche page

```
Page : /realisations
Titre H1 : "Chaque projet raconte une transformation."
Title tag : "Nos réalisations — Sites & Apps sur-mesure | Aurentia Agency" (58 caractères)
Meta description : "Découvrez nos projets : sites vitrines, applications SaaS, landing pages. Chaque pixel est sur-mesure. Zéro template. Résultats concrets." (139 caractères)
Objectif principal : Prouver la qualité → amener au booking Cal.com ou à une page projet
Persona cible : Gérant d'entreprise locale (conciergerie, hôtel, commerce) qui veut voir des preuves avant de nous contacter. Aussi : décideur SaaS/startup cherchant une agence.
Pages liées :
  - Entrants : Home (navbar + footer + section portfolio), /a-propos, /conciergeries, toutes les pages /realisations/[slug]
  - Sortants : /realisations/[slug] (chaque projet), /a-propos, /conciergeries, booking Cal.com
```

---

## 2. SEO complet

### Mots-clés

| Type | Mots-clés |
|------|-----------|
| **Primaire** | portfolio agence web IA |
| **Secondaires** | réalisations agence digitale, sites créés par IA, portfolio création web, projets agence web France |
| **Longue traîne** | exemples sites vitrines créés avec l'intelligence artificielle, portfolio agence web conciergerie, sites sur-mesure IA Nice Cannes |

### Open Graph

```
og:title: "Nos réalisations — Aurentia Agency"
og:description: "Sites vitrines, SaaS, landing pages. Chaque projet est sur-mesure, propulsé par l'IA et forgé par 20 ans d'expertise. Zéro template."
og:image: /images/og/realisations.jpg (grille mockups projets)
og:type: website
```

### Schema markup JSON-LD

```json
[
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Nos réalisations — Aurentia Agency",
    "description": "Portfolio de projets web sur-mesure : sites vitrines, applications SaaS, landing pages haute conversion. Propulsés par l'IA, forgés par 20 ans d'expertise.",
    "url": "https://aurentia.agency/realisations",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Aurentia Agency",
      "url": "https://aurentia.agency"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Conciergerie Azur", "url": "https://aurentia.agency/realisations/conciergerie-azur" },
        { "@type": "ListItem", "position": 2, "name": "LuxStay Gestion", "url": "https://aurentia.agency/realisations/luxstay-gestion" },
        { "@type": "ListItem", "position": 3, "name": "Côte & Clés", "url": "https://aurentia.agency/realisations/cote-et-cles" },
        { "@type": "ListItem", "position": 4, "name": "Comparateur-IA-Facile", "url": "https://aurentia.agency/realisations/comparateur-ia-facile" },
        { "@type": "ListItem", "position": 5, "name": "Balto", "url": "https://aurentia.agency/realisations/balto" },
        { "@type": "ListItem", "position": 6, "name": "High Love", "url": "https://aurentia.agency/realisations/high-love" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
      { "@type": "ListItem", "position": 2, "name": "Réalisations", "item": "https://aurentia.agency/realisations" }
    ]
  }
]
```

---

## 3. Architecture des sections

---

### Section 1 — Hero

**Hauteur :** min-h-[85vh]
**Layout :** Centré, full-width. Titre oversize. Fond dark avec gradient mesh subtil (glow ambre/orange en bas à droite).
**Animations :**
- Page entry : fade-in + translateY(30px) -> 0, duree 800ms, ease-out
- H1 : TextReveal (GSAP SplitText, mot par mot, stagger 0.05s)
- Sous-titre : BlurReveal (blur 10px -> 0, delay 0.3s)
- Badge : fade-in + scale depuis 0.8, delay 0.5s
- Scroll indicator subtil (chevron anime en bas)

**Contenu textuel :**

- **Badge :** `NOS REALISATIONS`
- **H1 :** `Chaque projet raconte une transformation.`
- **Sous-titre :** `Sites vitrines, applications SaaS, landing pages. Zéro template. Chaque pixel a une intention. Voici ce qu'on a forgé pour nos clients.`

**Responsive :**
- Mobile (375px) : H1 en `text-3xl`, sous-titre en `text-base`, padding `px-6`
- Tablet (768px) : H1 en `text-4xl`
- Desktop (1280px+) : H1 en `text-5xl md:text-6xl`, max-w-4xl

**Assets :** Aucun — typographie pure + gradient mesh de fond.

---

### Section 2 — Compteurs (Social Proof Bar)

**Hauteur :** auto (py-16 md:py-20)
**Layout :** Row de 4 metriques (desktop) / grid 2x2 (mobile). Centré, max-w-5xl. Separateurs verticaux entre les metriques sur desktop.
**Animations :**
- NumberMorphing (slot machine vertical, chaque digit slide independamment), trigger au scroll quand visible, duree 1.5s, easing power2.out
- Labels : fade-in staggere (0.1s entre chaque)

**Contenu textuel :**

| Valeur | Suffix | Label |
|--------|--------|-------|
| 15 | + | projets livres |
| 48 | h | delai moyen de livraison |
| 100 | % | clients satisfaits |
| 0 | | template utilise |

**Responsive :**
- Mobile : Grid 2x2, chiffres en `text-4xl font-mono`, labels en `text-sm`
- Desktop : Row de 4, chiffres en `text-5xl font-mono`, labels en `text-base`, separateurs `w-px h-10 bg-foreground/10`

**Assets :** Aucun.

---

### Section 3 — Filtres + Grille Projets

**Hauteur :** auto (content-driven, min-h-[60vh])
**Layout :**
1. **Barre de filtres** : Row horizontale, scrollable sur mobile. Pills/tabs clickables.
2. **Grille projets** : Grid 3 colonnes desktop, 2 colonnes tablet, 1 colonne mobile. Gap genereux (gap-6).

**Animations :**
- Barre de filtres : BlurReveal au scroll, delay 0.1s
- Filtre actif : pill remplie avec gradient orange->ambre, transition 500ms
- Filtres inactifs : border-foreground/10 bg-transparent, hover: bg-foreground/5, transition 500ms
- Cards projets :
  - BlurReveal staggere (0.1s entre chaque card)
  - Quand on change de filtre : les cards sortantes font un fade-out + scale(0.95), les entrantes font un fade-in + scale(1), duree 500ms, layout animation (Framer Motion AnimatePresence + layoutId)
  - Hover card : translateY(-8px) + SpotlightCard (radial-gradient suit la souris) + border plus visible, transition 700ms
  - Image : scale(1.05) au hover, transition 700ms
- Texte "Tous les projets" avec compteur dynamique : "(6)" qui se met a jour au filtre

**Contenu textuel :**

**Filtres :**
- `Tous` (par defaut, affiche le compteur total)
- `Site vitrine`
- `SaaS`
- `Landing page`
- `Identite visuelle`

**Card projet — structure :**
Chaque card contient :
1. **Image/screenshot** du site (aspect 16:10, object-cover, border-radius 16px en haut)
2. **Badge type** (ex: "Site vitrine") — en haut a gauche de l'image, pill glassmorphism
3. **Badge statut** (optionnel, ex: "En cours") — en haut a droite de l'image, pill accent
4. **Nom du projet** — `text-xl font-bold`
5. **Ville / Localisation** — `text-sm text-foreground-muted font-mono`
6. **Tags services** — row de pills : "Design UI", "SEO", "Developpement", etc. — `text-sm border border-foreground/10`
7. **Lien "Decouvrir"** — fleche animee, apparait au hover, `text-accent-primary`

**Projets (data) :**

**Projet 1 — Conciergerie Azur**
- Type : `Site vitrine`
- Ville : `Nice`
- Image : `[PLACEHOLDER: /images/portfolio/conciergerie-azur-cover.webp]`
- Tags : `Design UI` · `Developpement` · `SEO` · `Responsive`
- Slug : `conciergerie-azur`
- Duree : `48h`
- Statut : Livre

**Projet 2 — LuxStay Gestion**
- Type : `SaaS`
- Ville : `Paris`
- Image : `[PLACEHOLDER: /images/portfolio/luxstay-gestion-cover.webp]`
- Tags : `Design UI` · `Developpement` · `Dashboard` · `Automatisation`
- Slug : `luxstay-gestion`
- Duree : `3 semaines`
- Statut : Livre

**Projet 3 — Cote & Cles**
- Type : `Site vitrine`
- Ville : `Cannes`
- Image : `[PLACEHOLDER: /images/portfolio/cote-et-cles-cover.webp]`
- Tags : `Design UI` · `Developpement` · `SEO` · `Identite visuelle`
- Slug : `cote-et-cles`
- Duree : `48h`
- Statut : Livre

**Projet 4 — Comparateur-IA-Facile**
- Type : `SaaS`
- Ville : `France`
- Image : `/images/portfolio/comparateur-ia-1.webp`
- Tags : `Charte graphique` · `Design UI` · `Developpement` · `SEO`
- Slug : `comparateur-ia-facile`
- Duree : `2 semaines`
- Statut : Livre

**Projet 5 — Balto**
- Type : `Landing page`
- Ville : `Nice`
- Image : `[PLACEHOLDER: /images/portfolio/balto-cover.webp]`
- Tags : `Design UI` · `Developpement` · `Landing page` · `Conversion`
- Slug : `balto`
- Duree : `72h`
- Statut : Livre

**Projet 6 — High Love**
- Type : `Identite visuelle`
- Ville : `Nice`
- Image : `[PLACEHOLDER: /images/portfolio/high-love-cover.webp]`
- Tags : `Identite visuelle` · `Charte graphique` · `Direction artistique`
- Slug : `high-love`
- Duree : `En cours`
- Statut : En cours

**Projet 7 — Maison Enileh**
- Type : `Site vitrine`
- Ville : `Avignon`
- Image : `/images/portfolio/maison-enileh-1.webp`
- Tags : `Charte graphique` · `Design UI` · `Developpement` · `SEO`
- Slug : `maison-enileh`
- Duree : `48h`
- Statut : Livre

**Projet 8 — Savistas**
- Type : `SaaS`
- Ville : `France`
- Image : `/images/portfolio/savistas-1.webp`
- Tags : `Charte graphique` · `Design UI` · `Developpement` · `Landing page`
- Slug : `savistas`
- Duree : `72h`
- Statut : Livre

**Projet 9 — Friend'iz**
- Type : `Site vitrine`
- Ville : `France`
- Image : `/images/portfolio/friendiz-1.webp`
- Tags : `Charte graphique` · `Design UI` · `Developpement`
- Slug : `friendiz`
- Duree : `2 semaines`
- Statut : Livre

**Projet 10 — Allo Restau**
- Type : `Landing page`
- Ville : `France`
- Image : `/images/portfolio/allo-restau-1.webp`
- Tags : `Charte graphique` · `Design UI` · `Developpement` · `SEO`
- Slug : `allo-restau`
- Duree : `72h`
- Statut : Livre

**Projet 11 — Golf Mentor**
- Type : `SaaS`
- Ville : `France`
- Image : `/images/portfolio/golf-mentor-1.webp`
- Tags : `Charte graphique` · `Design UI` · `Developpement` · `SEO`
- Slug : `golf-mentor`
- Duree : `48h`
- Statut : Livre

**Projet 12 — [Courtier immobilier]**
- Type : `Site vitrine`
- Ville : `Cote d'Azur`
- Image : `[PLACEHOLDER: /images/portfolio/courtier-immo-cover.webp]`
- Tags : `Design UI` · `Developpement` · `SEO` · `Responsive`
- Slug : `courtier-immobilier`
- Duree : `48h`
- Statut : Livre

**Responsive :**
- Mobile (375px) : 1 colonne, filtres scrollables horizontalement, `px-4`
- Tablet (768px) : 2 colonnes, filtres en row wrappee
- Desktop (1280px+) : 3 colonnes, max-w-7xl centre, gap-6

**Assets :** Screenshots/mockups de chaque projet. Images existantes dans `/images/portfolio/` + placeholders pour les nouveaux projets.

---

### Section 4 — Phrase de conviction (Interlude)

**Hauteur :** min-h-[40vh], centre verticalement
**Layout :** Centré, max-w-3xl. Fond dark avec glow orange subtil.
**Animations :**
- TextGradientReveal : chaque mot passe de foreground-dim a gradient orange->ambre au scroll
- Fond : gradient mesh subtil, glow qui pulse lentement (15s cycle)

**Contenu textuel :**

- **Citation :** `On ne livre pas des sites web. On revele des entreprises.`
- **Sous-texte :** `Chaque projet est unique. Chaque detail est delibere. Tant que c'est pas parfait, on ne lance pas.`

**Responsive :**
- Mobile : `text-2xl`, `px-6`
- Desktop : `text-4xl md:text-5xl`

**Assets :** Aucun.

---

### Section 5 — CTA Final

**Hauteur :** min-h-[50vh], centre verticalement
**Layout :** Centre, fond dark intense avec gradient mesh deploye (glow orange + ambre + rose subtil). Le "moment lumiere".
**Animations :**
- Titre : TextGradientReveal (chaque mot passe en gradient orange->ambre)
- Sous-titre : BlurReveal, delay 0.3s
- Bouton CTA : scale 0.9 -> 1, glow pulse (box-shadow), magnetic button (GSAP)
- Preuves : fade-in staggere (0.1s)
- Background : gradient mesh a intensite maximale

**Contenu textuel :**

- **Titre :** `Votre projet merite d'etre vu.`
- **Sous-titre :** `On vous prepare un apercu de votre futur site. Gratuit. 20 minutes. Sans engagement. Vous repartez avec un audit de vos concurrents et des recommandations strategiques.`
- **CTA Button :** `Reserver mon call gratuit` -> ouvre CalModal (cal.com/aurentia)
- **Preuves (en dessous du bouton) :**
  - `Gratuit et sans engagement`
  - `On vous montre VOTRE site`
  - `Vous gardez l'audit quoi qu'il arrive`

**Responsive :**
- Mobile : `text-2xl` pour le titre, `px-6`, bouton full-width
- Desktop : `text-4xl md:text-5xl`, bouton auto-width

**Assets :** Aucun.

---

## 4. Specifications techniques

### Composants React a creer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `RealisationsHero` | `src/components/realisations/RealisationsHero.tsx` | — | Badge + H1 + sous-titre. Utilise TextReveal, BlurReveal. |
| `RealisationsStats` | `src/components/realisations/RealisationsStats.tsx` | — | 4 compteurs NumberMorphing. Reutilise le pattern de AboutProof. |
| `RealisationsGrid` | `src/components/realisations/RealisationsGrid.tsx` | — | Filtres + grille de ProjectCard. Gere le state du filtre actif. |
| `ProjectCard` | `src/components/realisations/ProjectCard.tsx` | `project: Project` | Card individuelle. Lien vers `/realisations/[slug]`. SpotlightCard + hover animations. |
| `RealisationsInterlude` | `src/components/realisations/RealisationsInterlude.tsx` | — | Citation centrale. TextGradientReveal. |
| `RealisationsCTA` | `src/components/realisations/RealisationsCTA.tsx` | — | CTA final. Reutilise le pattern de HomeCTA/AboutCTA. |

### Page route

**Fichier :** `src/app/realisations/page.tsx`

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { RealisationsHero } from "@/components/realisations/RealisationsHero";
import { RealisationsStats } from "@/components/realisations/RealisationsStats";
import { RealisationsGrid } from "@/components/realisations/RealisationsGrid";
import { RealisationsInterlude } from "@/components/realisations/RealisationsInterlude";
import { RealisationsCTA } from "@/components/realisations/RealisationsCTA";

// Metadata export pour Next.js (title, description, openGraph, jsonLd)
```

### Data structures

```typescript
// src/data/projects.ts

export type ProjectType = "Site vitrine" | "SaaS" | "Landing page" | "Identite visuelle";
export type ProjectStatus = "Livre" | "En cours";

export interface Project {
  slug: string;
  name: string;
  type: ProjectType;
  city: string;
  coverImage: string;
  images: string[];         // Toutes les images/screenshots
  tags: string[];
  duration: string;
  status: ProjectStatus;
  // Champs pour la page detail (case study)
  clientName?: string;
  clientRole?: string;
  clientLogo?: string;
  context: string;          // Paragraphe de contexte
  problem: string;          // Le probleme du client
  solution: string;         // Ce qu'Aurentia a fait
  features: ProjectFeature[];
  results: ProjectResult[];
  testimonial?: ProjectTestimonial;
  technologies: string[];
  liveUrl?: string;         // URL du site en ligne
  year: number;
}

export interface ProjectFeature {
  icon: string;             // Nom icone Lucide
  title: string;
  description: string;
}

export interface ProjectResult {
  metric: string;
  value: string;
  context?: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}
```

### Composants existants reutilises

- `TextReveal` — animation mot par mot (GSAP SplitText)
- `TextGradientReveal` — mots passent de dim a gradient au scroll
- `BlurReveal` — blur 10px -> 0 au scroll
- `SpotlightCard` — radial-gradient suit la souris
- `NumberMorph` — compteurs animes slot machine
- `Section` — wrapper avec theme dark/light
- `MagneticButton` — bouton qui attire le curseur
- `CalModal` — modal de booking Cal.com
- `InfiniteMarquee` — bande defilante (pour la tech stack sur les pages projets)

### Dependances / integrations

- **Cal.com** : bouton CTA final ouvre la CalModal existante
- **Next.js Image** : optimisation images portfolio
- **Framer Motion AnimatePresence** : transitions filtrage (layout animations)
- **GSAP ScrollTrigger** : animations scroll sur toutes les sections
- **Lucide React** : icones

---

---

# PARTIE 2 — Page `/realisations/[slug]` (Case Study)

---

## 1. Fiche page

```
Page : /realisations/[slug]
Titre H1 : "[Nom du projet] — [Type de projet]" (dynamique selon le projet)
Title tag : "[Nom du projet] — Realisation Aurentia Agency" (dynamique, 40-55 caracteres)
Meta description : "[Description courte du projet et des resultats]" (dynamique, 150-160 caracteres)
Objectif principal : Prouver l'expertise sur un type de projet precis -> amener au booking Cal.com via "Un projet similaire ?"
Persona cible : Prospect qui a un besoin similaire au projet presente. Il veut voir le detail, les resultats, le process.
Pages liées :
  - Entrants : /realisations (grid portfolio), Home (si lien direct)
  - Sortants : /realisations (retour portfolio), projet precedent/suivant, /a-propos, booking Cal.com
```

---

## 2. SEO complet

### Mots-cles (dynamiques selon le projet)

| Type | Exemple (Conciergerie Azur) |
|------|-----------|
| **Primaire** | site vitrine conciergerie Nice |
| **Secondaires** | creation site conciergerie, agence web conciergerie, site pro conciergerie Airbnb |
| **Longue traine** | comment creer un site pour sa conciergerie a Nice, exemple site conciergerie professionnelle |

### Open Graph (dynamique)

```
og:title: "[Nom du projet] — Realisation Aurentia Agency"
og:description: "[Context court du projet]"
og:image: /images/portfolio/[slug]-og.jpg (screenshot principal du projet)
og:type: article
```

### Schema markup JSON-LD (dynamique)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "[Nom du projet]",
    "description": "[Description du projet]",
    "url": "https://aurentia.agency/realisations/[slug]",
    "dateCreated": "[Annee]",
    "creator": {
      "@type": "Organization",
      "name": "Aurentia Agency",
      "url": "https://aurentia.agency"
    },
    "genre": "[Type de projet]",
    "keywords": "[Tags du projet]"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
      { "@type": "ListItem", "position": 2, "name": "Realisations", "item": "https://aurentia.agency/realisations" },
      { "@type": "ListItem", "position": 3, "name": "[Nom du projet]", "item": "https://aurentia.agency/realisations/[slug]" }
    ]
  }
]
```

---

## 3. Architecture des sections

---

### Section 1 — Breadcrumb + Navigation

**Hauteur :** auto (py-6)
**Layout :** max-w-6xl centre. Breadcrumb a gauche.
**Animations :**
- Fade-in, duree 500ms

**Contenu textuel :**

- **Breadcrumb :** `Accueil` / `Realisations` / `[Nom du projet]`
  - Chaque element est un lien clickable sauf le dernier (actif, `text-foreground`)
  - Separateur : `/` en `text-foreground-muted`
  - Elements inactifs : `text-foreground-muted hover:text-foreground transition-colors duration-500`

**Responsive :**
- Mobile : `text-sm`, `px-6`, ellipsis si trop long
- Desktop : `text-base`

**Assets :** Aucun.

---

### Section 2 — Hero Projet

**Hauteur :** min-h-[80vh]
**Layout :** Deux sous-sections :
1. **Texte** (gauche desktop, full-width mobile) : Badge type + H1 nom du projet + description courte + metadata (ville, duree, annee) + bouton "Voir le site live" (si URL dispo)
2. **Screenshot principal** (droite desktop, en-dessous mobile) : Image du projet dans un browser mockup (barre d'adresse stylisee + screenshot)

**Animations :**
- Badge : fade-in + scale 0.8 -> 1, delay 0.2s
- H1 : TextReveal (GSAP SplitText, mot par mot, stagger 0.05s)
- Description : BlurReveal, delay 0.3s
- Metadata pills : fade-in staggere (0.1s)
- Browser mockup : slide-in depuis la droite (translateX(60px) -> 0) + BlurReveal, delay 0.4s, duree 800ms
- Bouton "Voir le site live" : MagneticButton, glow pulse

**Contenu textuel (template — rempli dynamiquement) :**

- **Badge :** `[TYPE DU PROJET]` (ex: "SITE VITRINE")
- **H1 :** `[Nom du projet]`
- **Description :** `[project.context — premiere phrase courte du contexte]`
- **Metadata pills :**
  - `[Ville]`
  - `[Duree]` (ex: "Livre en 48h")
  - `[Annee]`
- **CTA (si liveUrl)** : `Voir le site live` -> ouvre liveUrl dans un nouvel onglet
  - Icone ExternalLink (Lucide) a droite du texte

**Contenu textuel — Exemple Conciergerie Azur :**

- **Badge :** `SITE VITRINE`
- **H1 :** `Conciergerie Azur`
- **Description :** `Une conciergerie premium a Nice qui gerait 15 biens sans aucune presence en ligne. Invisible sur Google. Les proprietaires arrivaient uniquement par le bouche-a-oreille.`
- **Metadata pills :** `Nice` · `Livre en 48h` · `2025`
- **CTA :** `Voir le site live` -> `[PLACEHOLDER: https://conciergerie-azur.fr]`

**Responsive :**
- Mobile (375px) : Stack vertical, image en premier (aspect 16:10), puis texte. H1 en `text-3xl`, `px-6`
- Tablet (768px) : 2 colonnes 50/50
- Desktop (1280px+) : 2 colonnes 45/55 (texte/image), max-w-6xl, gap-12

**Assets :** Screenshot principal de chaque projet + browser mockup frame (composant reutilisable).

---

### Section 3 — Le Contexte & Le Probleme

**Hauteur :** auto (py-20 md:py-28)
**Layout :** max-w-3xl centre. Deux blocs textuels separes par un divider subtil.
**Animations :**
- Titres : TextReveal
- Paragraphes : BlurReveal staggere (0.15s)
- Divider : scale horizontale 0 -> 1, duree 800ms, ease-in-out
- Icone du probleme : scale bounce 0.5 -> 1.1 -> 1

**Contenu textuel (template) :**

**Bloc 1 — Le contexte**
- **Titre :** `Le contexte`
- **Texte :** `[project.context]`

**Bloc 2 — Le probleme**
- **Titre :** `Le defi`
- **Texte :** `[project.problem]`

**Contenu textuel — Exemple Conciergerie Azur :**

**Bloc 1 — Le contexte**
- **Titre :** `Le contexte`
- **Texte :** `Conciergerie Azur gere 15 biens en location saisonniere sur la Cote d'Azur. Services premium : accueil voyageurs, menage, maintenance, gestion des annonces. Une reputation solide aupres des proprietaires. Mais un probleme majeur : zero presence digitale.`

**Bloc 2 — Le defi**
- **Titre :** `Le defi`
- **Texte :** `Aucun site web. Aucune visibilite sur Google. Les concurrents de Nice et alentours captaient les recherches "conciergerie Airbnb Nice" et "gestion locative saisonniere Nice". Le bouche-a-oreille atteignait ses limites. Pour passer de 15 a 30 biens geres, il fallait etre visible la ou les proprietaires cherchent : en ligne.`

**Responsive :**
- Mobile : `px-6`, `text-base`, line-height 1.7
- Desktop : `max-w-3xl mx-auto`, `text-lg`, line-height 1.8

**Assets :** Aucun.

---

### Section 4 — La Solution

**Hauteur :** auto (py-20 md:py-28)
**Layout :** max-w-4xl centre. Titre + paragraphe introductif + grille de features.
**Animations :**
- Titre : TextGradientReveal (mots passent de dim a gradient orange->ambre au scroll)
- Paragraphe : BlurReveal, delay 0.2s
- Feature cards : BlurReveal staggere (0.12s), SpotlightCard
- Hover feature card : translateY(-4px) + border plus visible, transition 700ms
- Icones : scale 0.7 -> 1, delay

**Contenu textuel (template) :**

- **Titre :** `Ce qu'on a forge.`
- **Intro :** `[project.solution]`
- **Features :** grille de `[project.features]`, chaque feature = icone + titre + description

**Contenu textuel — Exemple Conciergerie Azur :**

- **Titre :** `Ce qu'on a forge.`
- **Intro :** `Un site vitrine sur-mesure qui positionne Conciergerie Azur comme la reference de la gestion locative premium a Nice. Design haut de gamme, contenu optimise SEO, experience mobile impeccable.`

**Features :**

| Icone | Titre | Description |
|-------|-------|-------------|
| Palette (Lucide) | Design sur-mesure | Un univers visuel premium qui reflete le positionnement haut de gamme de la conciergerie. Couleurs, typographie, mise en page — chaque element raconte la meme histoire. |
| Search (Lucide) | SEO local integre | Optimise pour "conciergerie Nice", "gestion locative saisonniere Cote d'Azur" et 12 autres mots-cles strategiques. Metadata, schema markup, contenu structure. |
| Smartphone (Lucide) | Responsive natif | Experience fluide sur mobile, tablette et desktop. 65% des visiteurs arrivent sur mobile — le site est concu pour eux d'abord. |
| Zap (Lucide) | Performance maximale | Score PageSpeed 95+ sur mobile. Chargement en moins de 1.5 seconde. Les visiteurs restent, ils ne rebondissent pas. |
| MessageCircle (Lucide) | Formulaire de contact intelligent | Formulaire qualifie qui capture le type de bien, la localisation et le besoin du proprietaire. Chaque lead arrive avec le contexte necessaire. |
| Shield (Lucide) | Hebergement et maintenance | Deploye sur Vercel. HTTPS, backups, mises a jour. Le client n'a rien a gerer. Ca tourne. |

**Responsive :**
- Mobile (375px) : 1 colonne de feature cards, gap-4, `px-6`
- Tablet (768px) : 2 colonnes, gap-6
- Desktop (1280px+) : 3 colonnes, gap-6, max-w-4xl

**Assets :** Icones Lucide.

---

### Section 5 — Screenshots / Galerie

**Hauteur :** auto (py-16 md:py-24)
**Layout :** Galerie de screenshots. Desktop : layout alternant (image large full-width, puis 2 images cote a cote, puis image large, etc.). Mobile : stack vertical.
**Animations :**
- Chaque screenshot : BlurReveal au scroll + leger parallax (translateY a vitesse reduite, facteur 0.05)
- Scale subtil au hover (1.02), transition 700ms
- Bordure arrondie (rounded-2xl) + ombre subtile (shadow-xl shadow-black/10)

**Contenu textuel :**

- **Titre (optionnel) :** `Le resultat en images.`
- **Images :** `[project.images]` — screenshots desktop, mobile, details UI

**Responsive :**
- Mobile : Stack vertical, gap-4, images full-width, `px-6`
- Desktop : Alternance 1 col / 2 cols, gap-6, max-w-6xl

**Assets :** Multiples screenshots par projet (3-6 images).

---

### Section 6 — Resultats & Metriques

**Hauteur :** auto (py-20 md:py-28)
**Layout :** max-w-4xl centre. Titre + grille de metriques (row de cards).
**Animations :**
- Titre : TextGradientReveal
- Metric cards : BlurReveal staggere (0.15s)
- Chiffres dans les cards : NumberMorphing, trigger au scroll, duree 1.5s
- Cards : SpotlightCard, hover translateY(-4px), transition 700ms

**Contenu textuel (template) :**

- **Titre :** `Les resultats parlent.`
- **Metriques :** `[project.results]` — chaque metrique = chiffre gros + label + contexte (optionnel)

**Contenu textuel — Exemple Conciergerie Azur :**

- **Titre :** `Les resultats parlent.`

| Metrique | Valeur | Contexte |
|----------|--------|----------|
| Biens geres | 15 -> 24 | En 3 mois apres le lancement du site |
| Position Google | Top 5 | Sur "conciergerie Nice" et 8 mots-cles locaux |
| Temps de chargement | 1.2s | Score PageSpeed mobile : 96 |
| Leads qualifies | +340% | Via le formulaire de contact en 3 mois |

**Responsive :**
- Mobile : 2 colonnes (grid 2x2), chiffres en `text-2xl font-mono`, `px-6`
- Desktop : Row de 4, chiffres en `text-4xl font-mono`, max-w-4xl

**Assets :** Aucun.

---

### Section 7 — Temoignage Client (optionnel)

**Hauteur :** auto (py-16 md:py-24), affiche uniquement si `project.testimonial` existe
**Layout :** max-w-3xl centre. Citation en grande typo, auteur en dessous.
**Animations :**
- Citation : TextReveal (stagger 0.03s)
- Guillemets decoratifs : scale 0 -> 1, delay 0.2s, accent orange, `text-6xl md:text-8xl`
- Auteur + role : fade-in, delay 0.5s

**Contenu textuel (template) :**

- **Guillemet ouvrant :** `"` (decoratif, accent orange, grande taille)
- **Citation :** `[project.testimonial.quote]`
- **Auteur :** `[project.testimonial.author]`
- **Role :** `[project.testimonial.role]`

**Contenu textuel — Exemple Conciergerie Azur :**

- **Citation :** `En 48h on avait un site qui ressemble enfin a ce qu'on fait. Les proprietaires nous trouvent sur Google maintenant. On a signe 9 nouveaux biens en 3 mois.`
- **Auteur :** `Thomas R.`
- **Role :** `Fondateur, Conciergerie Azur`

**Responsive :**
- Mobile : `text-xl`, `px-6`, guillemets en `text-5xl`
- Desktop : `text-2xl md:text-3xl`, guillemets en `text-8xl`, max-w-3xl

**Assets :** Avatar client optionnel.

---

### Section 8 — Technologies utilisees

**Hauteur :** auto (py-12 md:py-16)
**Layout :** max-w-4xl centre. Titre discret + row de pills technologies.
**Animations :**
- Titre : fade-in
- Pills : fade-in staggere (0.05s)

**Contenu textuel :**

- **Titre :** `Technologies`
- **Pills :** `[project.technologies]`

**Contenu textuel — Exemple Conciergerie Azur :**

- **Pills :** `Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Framer Motion` · `Vercel` · `Claude AI`

**Responsive :**
- Mobile : flex-wrap, gap-2, `px-6`
- Desktop : flex-wrap, gap-3, max-w-4xl

**Assets :** Aucun.

---

### Section 9 — Navigation Projets (Precedent / Suivant)

**Hauteur :** auto (py-12 md:py-16)
**Layout :** max-w-6xl centre. Deux cards cote a cote : projet precedent (gauche) et projet suivant (droite). Chaque card = image de couverture en fond + nom du projet + fleche directionnelle. La navigation boucle (le dernier projet pointe vers le premier).
**Animations :**
- Cards : BlurReveal staggere (0.15s)
- Hover : scale(1.02) + SpotlightCard, transition 700ms
- Fleche : translateX animation au hover (gauche pour precedent, droite pour suivant)
- Image : scale(1.05) au hover, transition 700ms

**Contenu textuel :**

- **Card gauche :**
  - Label : `Projet precedent`
  - Fleche : `<-`
  - Nom : `[prevProject.name]`
  - Image de fond : `[prevProject.coverImage]`

- **Card droite :**
  - Label : `Projet suivant`
  - Fleche : `->`
  - Nom : `[nextProject.name]`
  - Image de fond : `[nextProject.coverImage]`

**Responsive :**
- Mobile : Stack vertical, chaque card full-width, aspect 16:9, `px-6`
- Desktop : 2 colonnes 50/50, gap-6, max-w-6xl, aspect 16:10

**Assets :** Images de couverture des projets adjacents.

---

### Section 10 — CTA Final "Un projet similaire ?"

**Hauteur :** min-h-[50vh], centre verticalement
**Layout :** Centre, fond dark intense avec gradient mesh deploye.
**Animations :**
- Titre : TextGradientReveal
- Sous-titre : BlurReveal, delay 0.3s
- Bouton CTA : scale 0.9 -> 1, glow pulse, MagneticButton
- Preuves : fade-in staggere (0.1s)

**Contenu textuel :**

- **Titre :** `Un projet similaire ?`
- **Sous-titre :** `Vous gerez une [type d'activite similaire] et vous voulez le meme niveau de resultat ? On en parle. 20 minutes. Gratuit. On vous montre ce qu'on peut faire pour vous.`
- **CTA Button :** `Reserver mon call gratuit` -> ouvre CalModal (cal.com/aurentia)
- **Preuves :**
  - `Gratuit et sans engagement`
  - `On vous montre VOTRE site`
  - `Vous gardez l'audit quoi qu'il arrive`

**Contenu textuel — Exemple variantes dynamiques du sous-titre :**

- Pour un **site vitrine** : `Vous gerez une entreprise locale et vous voulez le meme niveau de resultat ? On en parle. 20 minutes. Gratuit. On vous montre ce qu'on peut faire pour vous.`
- Pour un **SaaS** : `Vous avez un produit a lancer et vous voulez une experience utilisateur de ce niveau ? On en parle. 20 minutes. Gratuit. On vous montre ce qu'on peut construire pour vous.`
- Pour une **landing page** : `Vous avez besoin d'une page qui convertit a ce niveau ? On en parle. 20 minutes. Gratuit. On vous montre ce qu'on peut creer pour vous.`

**Responsive :**
- Mobile : `text-2xl`, `px-6`, bouton full-width
- Desktop : `text-4xl md:text-5xl`, bouton auto-width

**Assets :** Aucun.

---

## 4. Specifications techniques

### Composants React a creer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `ProjectHero` | `src/components/realisations/ProjectHero.tsx` | `project: Project` | Badge type + H1 nom + description + metadata + browser mockup. |
| `ProjectBreadcrumb` | `src/components/realisations/ProjectBreadcrumb.tsx` | `projectName: string` | Breadcrumb Accueil > Realisations > [Nom]. |
| `ProjectContext` | `src/components/realisations/ProjectContext.tsx` | `context: string, problem: string` | 2 blocs textuels (contexte + defi). |
| `ProjectSolution` | `src/components/realisations/ProjectSolution.tsx` | `solution: string, features: ProjectFeature[]` | Intro + grille de feature cards. |
| `ProjectGallery` | `src/components/realisations/ProjectGallery.tsx` | `images: string[], projectName: string` | Galerie screenshots alternee. |
| `ProjectResults` | `src/components/realisations/ProjectResults.tsx` | `results: ProjectResult[]` | Grille de metriques avec NumberMorphing. |
| `ProjectTestimonial` | `src/components/realisations/ProjectTestimonial.tsx` | `testimonial?: ProjectTestimonial` | Citation client. N'affiche rien si pas de testimonial. |
| `ProjectTechStack` | `src/components/realisations/ProjectTechStack.tsx` | `technologies: string[]` | Row de pills technos. |
| `ProjectNavigation` | `src/components/realisations/ProjectNavigation.tsx` | `prevProject: Project, nextProject: Project` | Cards precedent/suivant. |
| `ProjectCTA` | `src/components/realisations/ProjectCTA.tsx` | `projectType: ProjectType` | CTA final contextualise selon le type de projet. |
| `BrowserMockup` | `src/components/shared/BrowserMockup.tsx` | `image: string, url?: string, className?: string` | Frame de navigateur stylise (barre d'adresse + screenshot). Reutilisable. |

### Page route

**Fichier :** `src/app/realisations/[slug]/page.tsx`

```tsx
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { ProjectBreadcrumb } from "@/components/realisations/ProjectBreadcrumb";
import { ProjectHero } from "@/components/realisations/ProjectHero";
import { ProjectContext } from "@/components/realisations/ProjectContext";
import { ProjectSolution } from "@/components/realisations/ProjectSolution";
import { ProjectGallery } from "@/components/realisations/ProjectGallery";
import { ProjectResults } from "@/components/realisations/ProjectResults";
import { ProjectTestimonial } from "@/components/realisations/ProjectTestimonial";
import { ProjectTechStack } from "@/components/realisations/ProjectTechStack";
import { ProjectNavigation } from "@/components/realisations/ProjectNavigation";
import { ProjectCTA } from "@/components/realisations/ProjectCTA";
import { projects } from "@/data/projects";

// generateStaticParams pour SSG
export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// generateMetadata dynamique (title, description, openGraph, jsonLd)
```

### Composants existants reutilises

- `TextReveal` — animation mot par mot
- `TextGradientReveal` — mots passent de dim a gradient au scroll
- `BlurReveal` — blur 10px -> 0 au scroll
- `SpotlightCard` — radial-gradient suit la souris
- `NumberMorph` — compteurs animes
- `Section` — wrapper avec theme dark/light
- `MagneticButton` — bouton magnetique
- `CalModal` — modal de booking
- `InfiniteMarquee` — bande defilante

### Points d'integration

- **Cal.com** : CTA final ouvre CalModal
- **generateStaticParams** : pre-render toutes les pages projets au build
- **generateMetadata** : metadata dynamique par projet (title, description, OG, JSON-LD)
- **Next.js Image** : optimisation de toutes les images portfolio
- **Lien live URL** : target="_blank" rel="noopener noreferrer"
- **Navigation projets** : calcul prev/next depuis le tableau `projects`, navigation circulaire

---

## 5. Donnees completes des projets (Case Studies)

Les projets deja presents dans `HomePortfolio.tsx` (Comparateur-IA-Facile, Maison Enileh, Savistas, Friend'iz, Allo Restau, Golf Mentor) doivent etre migres vers le fichier `src/data/projects.ts` avec leurs champs case study completes.

Voici les donnees completes des nouveaux projets + exemples de case study :

---

### Conciergerie Azur (exemple complet)

```typescript
{
  slug: "conciergerie-azur",
  name: "Conciergerie Azur",
  type: "Site vitrine",
  city: "Nice",
  coverImage: "[PLACEHOLDER: /images/portfolio/conciergerie-azur-cover.webp]",
  images: [
    "[PLACEHOLDER: /images/portfolio/conciergerie-azur-1.webp]",
    "[PLACEHOLDER: /images/portfolio/conciergerie-azur-2.webp]",
    "[PLACEHOLDER: /images/portfolio/conciergerie-azur-3.webp]",
    "[PLACEHOLDER: /images/portfolio/conciergerie-azur-mobile.webp]"
  ],
  tags: ["Design UI", "Developpement", "SEO", "Responsive"],
  duration: "48h",
  status: "Livre",
  clientName: "Thomas R.",
  clientRole: "Fondateur",
  context: "Conciergerie Azur gere 15 biens en location saisonniere sur la Cote d'Azur. Services premium : accueil voyageurs, menage, maintenance, gestion des annonces. Une reputation solide aupres des proprietaires. Mais un probleme majeur : zero presence digitale.",
  problem: "Aucun site web. Aucune visibilite sur Google. Les concurrents de Nice et alentours captaient les recherches 'conciergerie Airbnb Nice' et 'gestion locative saisonniere Nice'. Le bouche-a-oreille atteignait ses limites. Pour passer de 15 a 30 biens geres, il fallait etre visible la ou les proprietaires cherchent : en ligne.",
  solution: "Un site vitrine sur-mesure qui positionne Conciergerie Azur comme la reference de la gestion locative premium a Nice. Design haut de gamme, contenu optimise SEO, experience mobile impeccable.",
  features: [
    { icon: "Palette", title: "Design sur-mesure", description: "Un univers visuel premium qui reflete le positionnement haut de gamme de la conciergerie." },
    { icon: "Search", title: "SEO local integre", description: "Optimise pour 'conciergerie Nice' et 12 autres mots-cles strategiques." },
    { icon: "Smartphone", title: "Responsive natif", description: "Experience fluide sur tous les ecrans. 65% des visiteurs arrivent sur mobile." },
    { icon: "Zap", title: "Performance maximale", description: "Score PageSpeed 95+ mobile. Chargement en moins de 1.5 seconde." },
    { icon: "MessageCircle", title: "Formulaire intelligent", description: "Capture le type de bien, la localisation et le besoin. Chaque lead arrive qualifie." },
    { icon: "Shield", title: "Hebergement et maintenance", description: "Deploye sur Vercel. HTTPS, backups, mises a jour. Ca tourne." }
  ],
  results: [
    { metric: "Biens geres", value: "15 → 24", context: "En 3 mois apres le lancement" },
    { metric: "Position Google", value: "Top 5", context: "Sur 'conciergerie Nice' et 8 mots-cles locaux" },
    { metric: "Chargement", value: "1.2s", context: "Score PageSpeed mobile : 96" },
    { metric: "Leads qualifies", value: "+340%", context: "Via le formulaire de contact en 3 mois" }
  ],
  testimonial: {
    quote: "En 48h on avait un site qui ressemble enfin a ce qu'on fait. Les proprietaires nous trouvent sur Google maintenant. On a signe 9 nouveaux biens en 3 mois.",
    author: "Thomas R.",
    role: "Fondateur, Conciergerie Azur"
  },
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Claude AI"],
  liveUrl: "[PLACEHOLDER: https://conciergerie-azur.fr]",
  year: 2025
}
```

### LuxStay Gestion

```typescript
{
  slug: "luxstay-gestion",
  name: "LuxStay Gestion",
  type: "SaaS",
  city: "Paris",
  coverImage: "[PLACEHOLDER: /images/portfolio/luxstay-gestion-cover.webp]",
  images: [
    "[PLACEHOLDER: /images/portfolio/luxstay-gestion-1.webp]",
    "[PLACEHOLDER: /images/portfolio/luxstay-gestion-2.webp]",
    "[PLACEHOLDER: /images/portfolio/luxstay-gestion-3.webp]"
  ],
  tags: ["Design UI", "Developpement", "Dashboard", "Automatisation"],
  duration: "3 semaines",
  status: "Livre",
  clientName: "Sarah M.",
  clientRole: "CEO",
  context: "LuxStay gere un portefeuille de 45 biens haut de gamme a Paris. Reservations, check-in, menage, comptabilite — tout etait gere sur Excel et WhatsApp. 3 employes passaient 60% de leur temps sur des taches repetitives au lieu de developper le portefeuille.",
  problem: "Pas de vision centralisee. Les doubles reservations arrivaient 2 a 3 fois par mois. Le suivi financier etait approximatif. Les proprietaires recevaient leurs rapports en retard. L'equipe etait noyee dans l'operationnel. Impossible de scaler au-dela de 50 biens sans recruter.",
  solution: "Un tableau de bord SaaS sur-mesure qui centralise la gestion de tous les biens : calendrier de reservations, suivi financier en temps reel, rapports proprietaires automatises, gestion des prestataires de menage.",
  features: [
    { icon: "LayoutDashboard", title: "Dashboard centralise", description: "Vue d'ensemble de tous les biens, reservations et revenus. En un coup d'oeil." },
    { icon: "Calendar", title: "Calendrier synchronise", description: "Synchronisation avec Airbnb, Booking, et le channel manager. Zero double reservation." },
    { icon: "BarChart3", title: "Rapports proprietaires", description: "Generation automatique des rapports mensuels. Chaque proprietaire recoit le sien par email." },
    { icon: "Users", title: "Gestion prestataires", description: "Attribution automatique des menages selon le planning. Notifications en temps reel." },
    { icon: "CreditCard", title: "Suivi financier", description: "Revenus, commissions, charges — tout est trace. Export comptable en un clic." },
    { icon: "Bell", title: "Alertes intelligentes", description: "Notifications pour les check-in imminents, les problemes signales, les rapports en retard." }
  ],
  results: [
    { metric: "Temps admin", value: "-70%", context: "De 60% du temps a 18% du temps sur l'operationnel" },
    { metric: "Doubles reservations", value: "0", context: "Contre 2-3 par mois avant" },
    { metric: "Biens geres", value: "45 → 62", context: "Sans recrutement supplementaire" },
    { metric: "Satisfaction proprietaires", value: "98%", context: "Enquete apres 2 mois d'utilisation" }
  ],
  testimonial: {
    quote: "On est passes de 3 tableurs et 12 groupes WhatsApp a un seul outil. L'equipe respire. Les proprietaires nous font plus confiance que jamais.",
    author: "Sarah M.",
    role: "CEO, LuxStay Gestion"
  },
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Vercel", "Claude AI"],
  liveUrl: "[PLACEHOLDER: https://app.luxstay-gestion.fr]",
  year: 2025
}
```

### Cote & Cles

```typescript
{
  slug: "cote-et-cles",
  name: "Cote & Cles",
  type: "Site vitrine",
  city: "Cannes",
  coverImage: "[PLACEHOLDER: /images/portfolio/cote-et-cles-cover.webp]",
  images: [
    "[PLACEHOLDER: /images/portfolio/cote-et-cles-1.webp]",
    "[PLACEHOLDER: /images/portfolio/cote-et-cles-2.webp]",
    "[PLACEHOLDER: /images/portfolio/cote-et-cles-3.webp]"
  ],
  tags: ["Design UI", "Developpement", "SEO", "Identite visuelle"],
  duration: "48h",
  status: "Livre",
  clientName: "Julie et Marc D.",
  clientRole: "Co-fondateurs",
  context: "Cote & Cles est une conciergerie familiale a Cannes. Specialisee dans les villas de prestige pour le Festival de Cannes et la saison estivale. 8 biens exceptionnels, un service ultra-personnalise. Mais un site WordPress vieillissant qui ne reflétait plus le standing de leurs proprietes.",
  problem: "Le site existant datait de 2019. Design generique, non responsive, pas de SEO. Les proprietaires de villas haut de gamme jugeaient la conciergerie sur son site — et partaient voir ailleurs. Pendant le Festival de Cannes, les recherches 'location villa prestige Cannes' explosaient mais Cote & Cles n'apparaissait nulle part.",
  solution: "Refonte complete avec une identite visuelle premium qui respire le luxe mediterraneen. Site sur-mesure avec galerie immersive des proprietes, formulaire de reservation, et SEO local cible sur les periodes de forte demande.",
  features: [
    { icon: "Sparkles", title: "Identite visuelle premium", description: "Nouvelle charte graphique, palette mediterraneenne, typographie elegante. L'image de marque a la hauteur des proprietes." },
    { icon: "GalleryHorizontalEnd", title: "Galerie immersive", description: "Chaque propriete a sa page dediee avec photos plein ecran, equipements, et disponibilites." },
    { icon: "Search", title: "SEO evenementiel", description: "Strategie SEO ciblee sur le Festival de Cannes et la saison estivale. Contenus saisonniers pre-indexes." },
    { icon: "Globe", title: "Bilingue FR/EN", description: "Interface complete en francais et anglais pour capter la clientele internationale." },
    { icon: "Calendar", title: "Calendrier de disponibilite", description: "Chaque propriete affiche ses disponibilites en temps reel. Les visiteurs reservent directement." },
    { icon: "Palette", title: "Design sur-mesure", description: "Aucun template. Chaque page est dessinee et codee a la main pour cette conciergerie." }
  ],
  results: [
    { metric: "Reservations directes", value: "+180%", context: "Pendant la saison du Festival de Cannes" },
    { metric: "Position Google", value: "Top 3", context: "Sur 'location villa prestige Cannes'" },
    { metric: "Taux de rebond", value: "-45%", context: "Les visiteurs restent et explorent les proprietes" },
    { metric: "Nouveaux proprietaires", value: "+3", context: "Signes en 2 mois grace a la credibilite du nouveau site" }
  ],
  testimonial: {
    quote: "Nos proprietaires nous disent que le site est a la hauteur de leurs villas. C'est le plus beau compliment qu'on puisse recevoir.",
    author: "Julie D.",
    role: "Co-fondatrice, Cote & Cles"
  },
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Claude AI"],
  liveUrl: "[PLACEHOLDER: https://cote-et-cles.fr]",
  year: 2025
}
```

### Balto

```typescript
{
  slug: "balto",
  name: "Balto",
  type: "Landing page",
  city: "Nice",
  coverImage: "[PLACEHOLDER: /images/portfolio/balto-cover.webp]",
  images: [
    "[PLACEHOLDER: /images/portfolio/balto-1.webp]",
    "[PLACEHOLDER: /images/portfolio/balto-2.webp]"
  ],
  tags: ["Design UI", "Developpement", "Landing page", "Conversion"],
  duration: "72h",
  status: "Livre",
  clientName: "Alex P.",
  clientRole: "Fondateur",
  context: "Balto est une application de livraison locale a Nice. Le produit etait pret a lancer mais il manquait une page de lancement pour expliquer le concept, capturer les premiers utilisateurs et convaincre les commercants partenaires de rejoindre la plateforme.",
  problem: "Pas de presence web. Le pitch en face-a-face fonctionnait mais ne scalait pas. Les commercants demandaient un site a montrer a leur equipe avant de signer. Les premiers utilisateurs potentiels n'avaient nulle part ou s'inscrire en avance.",
  solution: "Une landing page haute conversion avec deux parcours distincts : un pour les utilisateurs (inscription early access) et un pour les commercants (formulaire de partenariat). Design moderne, animations premium, message clair.",
  features: [
    { icon: "Target", title: "Double funnel", description: "Deux parcours de conversion : utilisateurs early access et commercants partenaires. Chacun avec son propre CTA." },
    { icon: "Sparkles", title: "Design premium", description: "Animations fluides, micro-interactions, design qui inspire confiance avant meme que le produit soit lance." },
    { icon: "BarChart3", title: "Tracking conversion", description: "Chaque CTA, chaque scroll, chaque interaction est tracke. A/B test pret." },
    { icon: "Smartphone", title: "Mobile-first", description: "80% du trafic prevu sur mobile. La page est concue pour le pouce d'abord." }
  ],
  results: [
    { metric: "Inscrits early access", value: "320+", context: "En 2 semaines de lancement" },
    { metric: "Commercants partenaires", value: "12", context: "Signes via le formulaire en 1 mois" },
    { metric: "Taux de conversion", value: "8.4%", context: "Visiteurs vers inscrits early access" },
    { metric: "Temps sur page", value: "2min 40s", context: "Moyenne — le contenu engage" }
  ],
  testimonial: {
    quote: "Les commercants voient la landing page et signent. Avant, je devais faire un pitch de 30 minutes. Maintenant je leur envoie le lien.",
    author: "Alex P.",
    role: "Fondateur, Balto"
  },
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Claude AI"],
  liveUrl: "[PLACEHOLDER: https://balto.app]",
  year: 2025
}
```

### High Love

```typescript
{
  slug: "high-love",
  name: "High Love",
  type: "Identite visuelle",
  city: "Nice",
  coverImage: "[PLACEHOLDER: /images/portfolio/high-love-cover.webp]",
  images: [
    "[PLACEHOLDER: /images/portfolio/high-love-1.webp]",
    "[PLACEHOLDER: /images/portfolio/high-love-2.webp]"
  ],
  tags: ["Identite visuelle", "Charte graphique", "Direction artistique"],
  duration: "En cours",
  status: "En cours",
  context: "High Love est une marque lifestyle basee a Nice. L'identite visuelle existante ne correspondait plus au positionnement premium que la marque souhaitait incarner. Il fallait repenser l'ensemble : logo, palette, typographie, systeme visuel.",
  problem: "Une identite fragmentee, construite au fil du temps sans coherence. Le logo date de la creation. Les couleurs changent d'un support a l'autre. Les clients ne reconnaissent pas la marque d'un canal a l'autre. Impossible de construire une communaute fidele sans une image forte et coherente.",
  solution: "Refonte complete de l'identite visuelle. Un systeme de marque coherent, premium et adaptable a tous les supports : digital, print, packaging, reseaux sociaux.",
  features: [
    { icon: "Palette", title: "Nouvelle palette", description: "Des couleurs qui racontent l'histoire de la marque. Premium, chaleureuses, reconnaissables au premier regard." },
    { icon: "Type", title: "Systeme typographique", description: "Selection et hierarchie de fonts qui incarnent le ton de la marque. Du logo aux posts Instagram." },
    { icon: "Layers", title: "Systeme visuel modulaire", description: "Des composants visuels reutilisables sur tous les supports. Coherence sans rigidite." },
    { icon: "FileImage", title: "Brand guidelines", description: "Un document complet qui garantit que chaque creation respecte l'identite. Utilisable par n'importe quel designer." }
  ],
  results: [
    { metric: "Statut", value: "En cours", context: "Livraison prevue T2 2026" }
  ],
  technologies: ["Figma", "Claude AI", "Adobe Illustrator"],
  year: 2026
}
```

### Courtier Immobilier

```typescript
{
  slug: "courtier-immobilier",
  name: "Courtier Immobilier",
  type: "Site vitrine",
  city: "Cote d'Azur",
  coverImage: "[PLACEHOLDER: /images/portfolio/courtier-immo-cover.webp]",
  images: [
    "[PLACEHOLDER: /images/portfolio/courtier-immo-1.webp]",
    "[PLACEHOLDER: /images/portfolio/courtier-immo-2.webp]",
    "[PLACEHOLDER: /images/portfolio/courtier-immo-3.webp]"
  ],
  tags: ["Design UI", "Developpement", "SEO", "Responsive"],
  duration: "48h",
  status: "Livre",
  clientName: "Nicolas B.",
  clientRole: "Courtier independant",
  context: "Un courtier en prets immobiliers independant sur la Cote d'Azur. 8 ans d'experience, un reseau solide d'agences immobilieres partenaires, et un taux de reussite de 94% sur les dossiers traites. Mais aucune presence en ligne pour capter les particuliers directement.",
  problem: "100% des clients venaient par recommandation d'agences immobilieres. Aucun lead direct. Quand les particuliers cherchaient 'courtier immobilier Nice' ou 'courtier pret Cannes', ils trouvaient les grandes enseignes, pas lui. Un vivier de clients potentiels inexploite.",
  solution: "Un site vitrine professionnel qui etablit la credibilite, explique les avantages du courtage, et capture des leads qualifies via un simulateur de capacite d'emprunt et un formulaire de prise de rendez-vous.",
  features: [
    { icon: "Calculator", title: "Simulateur d'emprunt", description: "Outil interactif qui estime la capacite d'emprunt en 30 secondes. Capture du lead a la fin de la simulation." },
    { icon: "Search", title: "SEO local", description: "Cible sur 'courtier immobilier Nice', 'courtier pret Cannes', 'courtier Cote d'Azur' et 15 variantes." },
    { icon: "Award", title: "Page temoignages", description: "12 avis verifies de clients avec leur prenom, ville et montant finance. La preuve sociale qui convertit." },
    { icon: "Palette", title: "Design premium", description: "Un site qui inspire confiance des la premiere seconde. Sobre, professionnel, premium." },
    { icon: "Smartphone", title: "Click-to-call", description: "Bouton d'appel direct sur mobile. Le prospect contacte le courtier en un tap." },
    { icon: "Calendar", title: "Prise de rendez-vous", description: "Calendrier integre pour reserver un creneau directement depuis le site." }
  ],
  results: [
    { metric: "Leads directs", value: "18/mois", context: "Contre 0 avant le site — 100% de nouveaux leads" },
    { metric: "Position Google", value: "Top 5", context: "Sur 'courtier immobilier Nice' en 6 semaines" },
    { metric: "Taux de conversion", value: "12%", context: "Visiteurs qui remplissent le simulateur ou le formulaire" },
    { metric: "CA additionnel", value: "+35%", context: "Grace aux leads directs (sans commission agence)" }
  ],
  testimonial: {
    quote: "Je ne dependais que des agences. Maintenant les particuliers me trouvent directement. 18 nouveaux contacts par mois, sans lever le petit doigt.",
    author: "Nicolas B.",
    role: "Courtier en prets immobiliers"
  },
  technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel", "Claude AI"],
  liveUrl: "[PLACEHOLDER: https://courtier-nice.fr]",
  year: 2025
}
```

---

## 6. Recapitulatif — Checklist pre-implementation

### Page `/realisations`

```
[x] H1 accrocheur — pas de "Bienvenue" ou "Nos projets", attaque directe
[x] Compteurs animes avec chiffres concrets (15+, 48h, 100%, 0 template)
[x] Filtrage par type de projet (Site vitrine, SaaS, Landing page, Identite visuelle)
[x] Layout animations au filtrage (AnimatePresence)
[x] Cards projets avec image, nom, type, tags, ville, lien "Decouvrir"
[x] SpotlightCard sur chaque card projet
[x] Interlude citation entre la grille et le CTA
[x] CTA final avec booking Cal.com + preuves
[x] Voix "on" (equipe), premium, confiant, direct — ton Aurentia
[x] Aucun mot interdit (cheap, template, basique, robot, garanti, automatique)
[x] Mots de marque utilises (reveler, forge, sur-mesure, lumiere, potentiel, craft)
[x] Minimum text-sm partout, aucun text-xs
[x] Toutes transitions >= 500ms, ease-in-out
[x] Dark/Light : tokens semantiques uniquement
[x] Pas de position: sticky / pin: true
[x] Animations scroll-triggered sur chaque section
[x] Mobile-first responsive (375px -> 768px -> 1280px)
[x] 1 seul H1
[x] Schema JSON-LD (CollectionPage + BreadcrumbList)
[x] Liens internes : /realisations/[slug], /a-propos, home
```

### Page `/realisations/[slug]`

```
[x] Breadcrumb navigation (Accueil > Realisations > [Nom])
[x] Hero avec browser mockup du projet
[x] Section contexte + probleme (2 blocs textuels)
[x] Section solution avec grille de features
[x] Galerie screenshots (layout alterne)
[x] Section resultats avec metriques chiffrees et NumberMorphing
[x] Temoignage client (optionnel, conditionnel)
[x] Section technologies (pills)
[x] Navigation precedent/suivant (circulaire)
[x] CTA final contextualise selon le type de projet
[x] Lien "Voir le site live" si URL disponible
[x] generateStaticParams pour SSG
[x] generateMetadata dynamique par projet
[x] Voix "on" (equipe), premium, confiant, direct
[x] Aucun mot interdit
[x] Mots de marque utilises
[x] Minimum text-sm
[x] Toutes transitions >= 500ms
[x] Tokens semantiques dark/light
[x] Pas de position: sticky / pin: true
[x] Animations scroll-triggered sur chaque section
[x] Mobile-first responsive
[x] 1 seul H1 (le nom du projet)
[x] Schema JSON-LD (CreativeWork + BreadcrumbList)
[x] Liens internes : /realisations, projets prev/next, /a-propos, home
```
