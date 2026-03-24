# PRD — Pages `/saas` et `/landing-pages`

---

# PARTIE 1 — PAGE `/saas`

---

## 1. Fiche page

```
Page : /saas
Titre H1 : "Votre vision. Notre ingénierie. Propulsé par l'IA."
Title tag : "Développement SaaS & Logiciels Métier | Aurentia Agency" (57 caractères)
Meta description : "MVP en 1 à 2 semaines à partir de 5 000€. Architecture, design et déploiement inclus. L'IA accélère, l'expertise humaine garantit la qualité." (144 caractères)
Objectif principal : Qualifier des leads high-ticket → booking Cal.com/aurentia/saas
Persona cible :
  - Fondateur tech/startup qui veut un MVP rapide et solide
  - Dirigeant d'entreprise qui veut un outil métier sur-mesure (back-office, portail client, dashboard)
  - CTO/Product Manager qui cherche un partenaire technique fiable
Pages liées :
  - Entrants : Home (section Services bento), Navbar, Footer
  - Sortants : /landing-pages, /realisations, booking Cal.com/aurentia/saas
```

---

## 2. SEO complet

### Mots-clés

| Type | Mots-clés |
|------|-----------|
| **Primaire** | développement SaaS France, agence développement application web |
| **Secondaires** | développement MVP startup, logiciel métier sur-mesure, agence SaaS IA, créer application web, développement portail client |
| **Longue traîne** | agence qui développe des SaaS avec IA, MVP application web rapide, développement logiciel métier sur-mesure France |

### Open Graph

```
og:title: "Développement SaaS & Logiciels Métier — Aurentia Agency"
og:description: "MVP en 1 à 2 semaines. Architecture, design et déploiement inclus. À partir de 5 000€."
og:image: /images/og/saas.jpg (mockup dashboard SaaS sur fond branded)
og:type: website
```

### Schema markup JSON-LD

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Développement SaaS & Logiciels Métier",
    "provider": {
      "@type": "Organization",
      "name": "Aurentia Agency",
      "url": "https://aurentia.agency"
    },
    "description": "Développement d'applications SaaS, logiciels métier, dashboards et portails clients. MVP livré en 1 à 2 semaines avec architecture, design et déploiement inclus.",
    "url": "https://aurentia.agency/saas",
    "areaServed": "FR",
    "offers": {
      "@type": "Offer",
      "price": "5000",
      "priceCurrency": "EUR",
      "description": "À partir de 5 000€ pour un MVP pré-fonctionnel"
    },
    "serviceType": ["Développement SaaS", "Logiciel métier", "Application web sur-mesure"]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
      { "@type": "ListItem", "position": 2, "name": "SaaS & Logiciels Métier", "item": "https://aurentia.agency/saas" }
    ]
  }
]
```

---

## 3. Architecture des sections

---

### Section 1 — Hero (High-Ticket Opening)

**Hauteur :** min-h-[90vh]
**Layout :** Centré, full-width. Titre oversize. Fond dark avec gradient mesh subtil (glow orange/ambre). Badge en haut, H1 massif, sous-titre, deux CTAs.
**Animations :**
- Page entry : fade-in + translateY(30px) → 0, durée 800ms, ease-out
- Badge : fade-in + scale depuis 0.8, delay 0.2s
- H1 : TextReveal (GSAP SplitText, mot par mot, stagger 0.05s)
- Sous-titre : BlurReveal (blur 10px → 0, delay 0.3s)
- CTAs : fade-in + translateY(20px) → 0, delay 0.5s
- Scroll indicator subtil (chevron animé en bas)
- Fond : gradient mesh avec orbes orange/ambre qui ondulent lentement (cycle 15-20s)

**Contenu textuel :**

- **Badge :** `DÉVELOPPEMENT SAAS & LOGICIELS MÉTIER`
- **H1 :** `Votre vision. Notre ingénierie. Propulsé par l'IA.`
- **Sous-titre :** `On conçoit des applications SaaS et des logiciels métier sur-mesure. Du brief au déploiement en 1 à 2 semaines. Architecture, design et mise en production inclus.`
- **CTA primaire :** `Réserver un call stratégique` → cal.com/aurentia/saas
- **CTA secondaire (ghost) :** `Voir nos réalisations` → ancre #portfolio

**Responsive :**
- Mobile (375px) : H1 en `text-3xl`, sous-titre en `text-base`, CTAs en stack vertical full-width, `px-6`
- Tablet (768px) : H1 en `text-4xl`, CTAs en row
- Desktop (1280px+) : H1 en `text-5xl md:text-6xl`, max-w-4xl centré

**Assets :** Aucun — typographie pure + gradient mesh de fond.

---

### Section 2 — Ce qu'on construit

**Hauteur :** auto
**Layout :** Titre centré + Bento grid asymétrique (2 colonnes desktop, 1 colonne mobile). 4 cards représentant les types de produits qu'on développe.
**Animations :**
- Titre : TextReveal
- Sous-titre : BlurReveal, delay 0.2s
- Cards : BlurReveal staggeré (0.15s entre chaque)
- SpotlightCard sur chaque card (radial-gradient suit la souris)
- Hover : translateY(-8px) + border plus visible, transition 700ms
- Icônes : scale 0.5 → 1 au scroll, delay incrémental

**Contenu textuel :**

- **Titre section :** `Des applications qui propulsent votre business.`
- **Sous-titre :** `SaaS, logiciels métier, portails, dashboards — on forge l'outil dont vous avez besoin.`

**Card 1 — Grande (span 2 cols desktop)**
- Icône : Rocket (Lucide)
- Titre : `Applications SaaS`
- Texte : `Votre produit, de l'idée au premier utilisateur. Authentification, billing, dashboard, API — tout est inclus. On construit des SaaS qui tiennent la charge et qui scalent.`
- Tags : `Auth` · `Billing` · `API` · `Dashboard` · `Multi-tenant`

**Card 2**
- Icône : Building2 (Lucide)
- Titre : `Logiciels métier`
- Texte : `Votre activité mérite un outil taillé sur-mesure. Gestion de stocks, CRM interne, suivi de production — on digitalise vos process.`
- Tags : `Sur-mesure` · `Process métier` · `Intégrations`

**Card 3**
- Icône : LayoutDashboard (Lucide)
- Titre : `Dashboards & Back-offices`
- Texte : `Des interfaces d'administration claires et puissantes. Vos données deviennent lisibles. Vos décisions deviennent rapides.`
- Tags : `Data visualization` · `Admin panels` · `Analytics`

**Card 4**
- Icône : Users (Lucide)
- Titre : `Portails clients`
- Texte : `Offrez à vos clients un espace dédié. Suivi de commandes, facturation, support — une expérience pro qui renforce la confiance.`
- Tags : `Espace client` · `Self-service` · `Notifications`

**Responsive :**
- Mobile : 1 colonne, toutes les cards en full-width, gap-4, `px-6`
- Tablet : 2 colonnes, card 1 en span-2
- Desktop : 2 colonnes, card 1 en span-2, gap-6

**Assets :** Icônes Lucide React.

---

### Section 3 — Stack Technique

**Hauteur :** auto, min-h-[40vh]
**Layout :** Titre centré + grille de logos/noms technos en 2 rows avec des cards minimalistes. Fond avec gradient mesh subtil.
**Animations :**
- Titre : TextReveal
- Sous-titre : BlurReveal
- Cards technos : BlurReveal staggeré (0.08s entre chaque), apparition cascade
- Hover cards : glow subtil (box-shadow accent orange), transition 700ms
- Marquee en bas avec les noms des technos en défilement infini

**Contenu textuel :**

- **Titre section :** `Forgé avec les outils de demain.`
- **Sous-titre :** `On ne choisit pas nos technos pour la hype. On les choisit pour le résultat.`

**Technologies affichées (cards avec icône + nom + description courte) :**

| Techno | Description courte |
|--------|-------------------|
| Next.js | Framework React. SSR, SSG, App Router. |
| TypeScript | Typage strict. Zéro surprise en production. |
| React | Composants réutilisables. UI réactive. |
| Tailwind CSS | Styling rapide. Design system cohérent. |
| Supabase | Base de données, auth, storage, realtime. |
| Vercel | Déploiement instantané. Edge network mondial. |
| Stripe | Paiements, abonnements, facturation. |
| Claude AI | Intelligence artificielle. Accélération du dev. |

**Marquee :** `Next.js` · `TypeScript` · `React` · `Tailwind CSS` · `Supabase` · `Vercel` · `Stripe` · `Claude AI` · `Framer Motion` · `GSAP` · `PostgreSQL` · `Zod`

**Responsive :**
- Mobile : Grid 2 colonnes pour les cards technos, `px-6`
- Tablet : Grid 3 colonnes
- Desktop : Grid 4 colonnes, max-w-5xl centré

**Assets :** Logos/icônes des technos en SVG (dans `/public/images/icons/`).

---

### Section 4 — Process (Du brief au déploiement)

**Hauteur :** auto
**Layout :** Titre centré + 5 étapes en timeline verticale (mobile) / horizontale (desktop). Chaque étape = numéro + titre + description.
**Animations :**
- Titre : TextGradientReveal (mots passent de dim à gradient orange→ambre au scroll)
- Timeline line : stroke-dashoffset animation au scroll (la ligne se dessine progressivement)
- Étapes : BlurReveal staggeré (0.2s), chaque étape apparaît quand la ligne atteint son point
- Numéros : NumberMorphing (slot machine, 0 → valeur)
- Icônes étapes : scale 0.5 → 1 + rotation subtile

**Contenu textuel :**

- **Badge :** `NOTRE PROCESS`
- **Titre section :** `Du brief au déploiement. En 5 étapes.`
- **Sous-titre :** `Chaque projet suit un process éprouvé. Pas de surprises, pas de zones grises.`

**Étape 1**
- Numéro : `01`
- Icône : PhoneCall (Lucide)
- Titre : `Call stratégique`
- Texte : `20 minutes pour comprendre votre vision, votre marché, vos contraintes. On identifie le scope du MVP et on estime le budget.`
- Durée : `20 min`

**Étape 2**
- Numéro : `02`
- Icône : FileText (Lucide)
- Titre : `Spécifications & Architecture`
- Texte : `On traduit votre vision en specs techniques. Architecture de la base de données, user flows, wireframes. Vous validez avant qu'on code.`
- Durée : `2 à 3 jours`

**Étape 3**
- Numéro : `03`
- Icône : Paintbrush (Lucide)
- Titre : `Design & Charte graphique`
- Texte : `Identité visuelle intégrée. Design system cohérent, composants réutilisables, responsive natif. Votre produit a une identité dès le premier jour.`
- Durée : `2 à 3 jours`

**Étape 4**
- Numéro : `04`
- Icône : Code (Lucide)
- Titre : `Développement`
- Texte : `L'IA accélère. L'expertise humaine valide. Chaque feature est testée, chaque ligne de code est review. On avance vite sans sacrifier la qualité.`
- Durée : `1 à 2 semaines`

**Étape 5**
- Numéro : `05`
- Icône : Rocket (Lucide)
- Titre : `Déploiement & Lancement`
- Texte : `Mise en production sur Vercel. Configuration DNS, SSL, monitoring. Votre application est live, sécurisée, et prête à accueillir vos premiers utilisateurs.`
- Durée : `1 jour`

**Responsive :**
- Mobile (375px) : Timeline verticale, étapes en stack, `px-6`
- Tablet (768px) : Timeline verticale, contenu plus large
- Desktop (1280px+) : Timeline horizontale, 5 colonnes, max-w-6xl centré

**Assets :** Icônes Lucide React.

---

### Section 5 — Portfolio / Screenshots

**Hauteur :** auto, min-h-[60vh]
**Layout :** Titre centré + grid de mockups/screenshots de SaaS développés. 2 colonnes desktop, 1 colonne mobile. Chaque card = screenshot + nom du projet + description courte + tags.
**Animations :**
- Titre : TextReveal
- Cards : BlurReveal staggeré (0.2s)
- Screenshots : léger parallax au scroll (translateY à vitesse réduite)
- SpotlightCard sur chaque card
- Hover : translateY(-8px) + glow subtil + scale(1.01), transition 700ms

**Contenu textuel :**

- **Badge :** `RÉALISATIONS`
- **Titre section :** `Ce qu'on a forgé.`
- **Sous-titre :** `Des applications en production. Pas des maquettes.`

**Card 1 — Projet SaaS**
- Screenshot : `[PLACEHOLDER — /images/saas/projet-1.webp]`
- Titre : `[Nom du projet 1]`
- Description : `[Description courte du SaaS, problème résolu, résultat obtenu]`
- Tags : `SaaS` · `Dashboard` · `Billing`
- Lien : `[URL ou ancre vers page détaillée]`

**Card 2 — Logiciel métier**
- Screenshot : `[PLACEHOLDER — /images/saas/projet-2.webp]`
- Titre : `[Nom du projet 2]`
- Description : `[Description courte du logiciel métier, process digitalisé]`
- Tags : `Logiciel métier` · `Back-office` · `Intégrations`
- Lien : `[URL ou ancre vers page détaillée]`

**Card 3 — Dashboard / Portail**
- Screenshot : `[PLACEHOLDER — /images/saas/projet-3.webp]`
- Titre : `[Nom du projet 3]`
- Description : `[Description courte du dashboard ou portail client]`
- Tags : `Portail client` · `Analytics` · `Realtime`
- Lien : `[URL ou ancre vers page détaillée]`

- **Note :** Prévoir 3 à 6 slots. Commencer avec les projets disponibles, ajouter au fur et à mesure.

**Responsive :**
- Mobile (375px) : 1 colonne, screenshots en aspect 16:9, `px-6`
- Tablet (768px) : 2 colonnes, gap-6
- Desktop (1280px+) : 2 colonnes, max-w-5xl centré, gap-8

**Assets :** Screenshots/mockups des projets — `[PLACEHOLDER IMAGES]`.

---

### Section 6 — Tarification

**Hauteur :** auto, min-h-[50vh]
**Layout :** Titre centré + une card pricing unique centrée (pas de tiers multiples — offre sur devis). Fond avec gradient mesh subtil.
**Animations :**
- Titre : TextGradientReveal
- Card : BlurReveal + scale 0.95 → 1, delay 0.2s
- SpotlightCard
- Prix "5 000€" : NumberMorphing (slot machine)
- Hover card : glow orange subtil, transition 700ms
- CTA button : magnetic button + glow pulse

**Contenu textuel :**

- **Badge :** `INVESTISSEMENT`
- **Titre section :** `Investir dans un outil qui travaille pour vous.`
- **Sous-titre :** `Chaque projet est unique. Le prix aussi.`

**Card Pricing :**

- **Label supérieur :** `MVP PRÉ-FONCTIONNEL`
- **Prix :** `À partir de 5 000€`
- **Mention :** `Sur devis — selon la complexité du projet`
- **Inclus dans le MVP :**
  - `Charte graphique intégrée`
  - `Architecture technique complète`
  - `Développement front-end + back-end`
  - `Base de données & authentification`
  - `Déploiement en production`
  - `1 mois de support post-lancement`
- **Délai :** `Livraison en 1 à 2 semaines`
- **CTA :** `Discuter de votre projet` → cal.com/aurentia/saas

- **Texte sous la card :** `Pas de surprise. On définit le scope ensemble, on s'engage sur un prix fixe avant de commencer. Vous savez exactement ce que vous payez.`

**Responsive :**
- Mobile (375px) : Card full-width, `px-6`, prix en `text-3xl`
- Tablet (768px) : Card centrée, max-w-md
- Desktop (1280px+) : Card centrée, max-w-lg

**Assets :** Aucun.

---

### Section 7 — FAQ

**Hauteur :** auto
**Layout :** Titre centré + accordéon (max-w-3xl centré). 7 questions.
**Animations :**
- Titre : TextReveal
- Questions : BlurReveal staggeré (0.1s)
- Ouverture/fermeture accordéon : height auto-animate + opacity, durée 500ms, ease-in-out
- Icône chevron : rotation 0 → 180deg, transition 500ms

**Contenu textuel :**

- **Titre section :** `Questions fréquentes.`

**Q1 :** `Combien de temps pour développer un MVP ?`
**R1 :** `Entre 1 et 2 semaines pour un MVP pré-fonctionnel. Ça dépend de la complexité : nombre de features, intégrations tierces, volume de données. On définit le scope ensemble lors du call stratégique.`

**Q2 :** `Qu'est-ce qui est inclus dans le prix ?`
**R2 :** `Tout ce qu'il faut pour lancer : charte graphique, architecture technique, développement front + back, base de données, authentification, déploiement en production. Pas de coûts cachés.`

**Q3 :** `Et après le MVP ? Qui maintient l'application ?`
**R3 :** `On reste. 1 mois de support est inclus. Ensuite, on propose un contrat de maintenance ou on vous accompagne pour scaler. Si vous avez une équipe technique, on fait le handover proprement.`

**Q4 :** `Pourquoi si rapide ? La qualité est-elle au rendez-vous ?`
**R4 :** `L'IA accélère les tâches répétitives : scaffolding, composants, tests, documentation. L'expertise humaine — 20 ans de craft web + un CTO formateur Epitech — valide chaque décision. Rapide ne veut pas dire bâclé.`

**Q5 :** `Quelles technologies utilisez-vous ?`
**R5 :** `Next.js, TypeScript, React, Tailwind CSS, Supabase (PostgreSQL), Vercel, Stripe pour le billing. Des technologies éprouvées, maintenues, qui scalent. Pas de stack exotique qui disparaît dans 6 mois.`

**Q6 :** `Je n'ai pas de specs techniques. C'est un problème ?`
**R6 :** `Non. On part de votre vision, pas d'un cahier des charges. Lors du call stratégique, on identifie ensemble les features essentielles, les user flows, et on traduit ça en specs. C'est notre métier.`

**Q7 :** `Vous travaillez avec des startups ou aussi des entreprises établies ?`
**R7 :** `Les deux. Startups qui veulent un MVP pour lever des fonds ou valider un marché. Entreprises qui veulent digitaliser un process avec un logiciel métier sur-mesure. Le point commun : un besoin d'aller vite sans sacrifier la qualité.`

**Responsive :**
- Mobile (375px) : Full-width, `px-6`, texte `text-base`
- Desktop (1280px+) : `max-w-3xl mx-auto`

**Assets :** Aucun.

---

### Section 8 — CTA Final

**Hauteur :** min-h-[50vh], centré verticalement
**Layout :** Centré, fond dark intense avec gradient mesh déployé (glow orange + ambre). Le "moment lumière".
**Animations :**
- Titre : TextGradientReveal (chaque mot passe en gradient orange→ambre)
- Sous-titre : BlurReveal, delay 0.3s
- Bouton CTA : scale 0.9 → 1, glow pulse (box-shadow), magnetic button
- Preuves : fade-in staggeré (0.1s)
- Background : gradient mesh à intensité maximale

**Contenu textuel :**

- **Titre :** `Votre application mérite d'exister.`
- **Sous-titre :** `20 minutes pour comprendre votre vision, estimer le scope et le budget. On vous dit franchement si on est les bons pour votre projet.`
- **CTA Button :** `Réserver un call stratégique` → cal.com/aurentia/saas
- **Preuves (en dessous du bouton) :**
  - `Gratuit et sans engagement`
  - `Scope et budget estimés en 20 min`
  - `On vous dit non si le projet n'est pas pour nous`

**Responsive :**
- Mobile : `text-2xl` pour le titre, `px-6`, bouton full-width
- Desktop : `text-4xl md:text-5xl`, bouton auto-width

**Assets :** Aucun.

---

## 4. Spécifications techniques

### Composants React à créer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `SaasHero` | `src/components/saas/SaasHero.tsx` | — | Badge + H1 + sous-titre + 2 CTAs. Utilise TextReveal, BlurReveal. |
| `SaasProducts` | `src/components/saas/SaasProducts.tsx` | — | Bento grid 4 cards. Utilise SpotlightCard, BlurReveal. |
| `SaasStack` | `src/components/saas/SaasStack.tsx` | — | Grid technos + marquee. |
| `SaasProcess` | `src/components/saas/SaasProcess.tsx` | — | Timeline 5 étapes. Utilise NumberMorphing, BlurReveal. |
| `SaasPortfolio` | `src/components/saas/SaasPortfolio.tsx` | — | Grid screenshots projets. Utilise SpotlightCard, BlurReveal. |
| `SaasPricing` | `src/components/saas/SaasPricing.tsx` | — | Card pricing unique. Utilise NumberMorphing, SpotlightCard, MagneticButton. |
| `SaasFAQ` | `src/components/saas/SaasFAQ.tsx` | — | Accordéon 7 questions. |
| `SaasCTA` | `src/components/saas/SaasCTA.tsx` | — | CTA final. Réutilise le pattern de HomeCTA. |

### Page route

**Fichier :** `src/app/saas/page.tsx`

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SaasHero } from "@/components/saas/SaasHero";
import { SaasProducts } from "@/components/saas/SaasProducts";
import { SaasStack } from "@/components/saas/SaasStack";
import { SaasProcess } from "@/components/saas/SaasProcess";
import { SaasPortfolio } from "@/components/saas/SaasPortfolio";
import { SaasPricing } from "@/components/saas/SaasPricing";
import { SaasFAQ } from "@/components/saas/SaasFAQ";
import { SaasCTA } from "@/components/saas/SaasCTA";

// Metadata export pour Next.js (title, description, openGraph, jsonLd)
```

### Data structures

```typescript
// src/data/saas-content.ts

export interface SaasProductCard {
  icon: string; // nom Lucide
  title: string;
  text: string;
  tags: string[];
  span?: number; // 1 ou 2
}

export interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  text: string;
  duration: string;
}

export interface SaasProject {
  screenshot: string; // path image
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface TechCard {
  name: string;
  description: string;
  icon?: string; // path logo SVG
}
```

### Composants existants réutilisés

- `TextReveal` — animation mot par mot (GSAP SplitText)
- `TextGradientReveal` — mots passent de dim à gradient au scroll
- `BlurReveal` — blur 10px → 0 au scroll
- `SpotlightCard` — radial-gradient suit la souris
- `MagneticButton` — bouton qui attire le curseur
- `CalModal` — modal de booking Cal.com
- `NumberMorphing` — slot machine vertical pour les chiffres

### Dépendances / intégrations

- **Cal.com** : CTA → cal.com/aurentia/saas (pas la CalModal générique — URL spécifique)
- **Images** : screenshots projets en placeholder dans `/images/saas/`
- **Animations** : composants existants dans `src/components/animations/`
- **Lucide React** : icônes (Rocket, Building2, LayoutDashboard, Users, PhoneCall, FileText, Paintbrush, Code)

---

## 5. Récapitulatif — Checklist pré-implémentation

```
[x] Opening hook high-ticket : transformation, pas description produit
[x] Framework : Problem → Solution → Proof → CTA
[x] "Ce qu'on construit" nomme les 4 types de produits avec détails
[x] Stack technique visible (confiance technique pour le persona CTO/fondateur)
[x] Process clair en 5 étapes avec durées
[x] Portfolio avec slots pour screenshots (placeholders prévus)
[x] Pricing transparent : à partir de 5 000€, sur devis, tout inclus listé
[x] FAQ couvre les 7 objections principales
[x] CTA final avec action claire (book Cal.com/aurentia/saas)
[x] Voix "on" (équipe), premium, confiant, direct — ton Aurentia
[x] Aucun mot interdit (cheap, template, basique, robot, garanti, automatique)
[x] Mots de marque utilisés (forger, propulser, sur-mesure, craft, potentiel)
[x] PAS de mention "Aurentia for Agencies"
[x] Minimum text-sm partout, aucun text-xs
[x] Toutes transitions ≥ 500ms, ease-in-out
[x] Dark/Light : tokens sémantiques uniquement
[x] Pas de position: sticky / pin: true
[x] Animations scroll-triggered sur chaque section
[x] Mobile-first responsive (375px → 768px → 1280px)
[x] 1 seul H1
[x] Schema JSON-LD (Service + BreadcrumbList)
[x] Liens internes : /landing-pages, /realisations, home
```

---
---
---

# PARTIE 2 — PAGE `/landing-pages`

---

## 1. Fiche page

```
Page : /landing-pages
Titre H1 : "Des landing pages qui convertissent. Pas qui décorent."
Title tag : "Landing Pages Haute Conversion pour SaaS | Aurentia Agency" (58 caractères)
Meta description : "Design spectaculaire, animations premium, optimisées conversion. Landing pages SaaS sur-mesure dès 1 500€. Ce site est notre carte de visite." (146 caractères)
Objectif principal : Qualifier des leads → booking Cal.com/aurentia/landing-page
Persona cible :
  - Fondateur SaaS qui veut une landing page qui convertit
  - Product Manager qui prépare un lancement produit
  - Growth Marketer qui veut une page d'acquisition performante
Pages liées :
  - Entrants : Home (section Services bento), Navbar, Footer
  - Sortants : /saas, /realisations, booking Cal.com/aurentia/landing-page
```

---

## 2. SEO complet

### Mots-clés

| Type | Mots-clés |
|------|-----------|
| **Primaire** | landing page SaaS, agence landing page |
| **Secondaires** | landing page haute conversion, création landing page, design landing page premium, landing page startup, page de vente SaaS |
| **Longue traîne** | agence création landing page SaaS France, landing page animée premium, landing page conversion optimisée |

### Open Graph

```
og:title: "Landing Pages Haute Conversion — Aurentia Agency"
og:description: "Design spectaculaire, animations premium, optimisées conversion. Dès 1 500€. Ce site est notre carte de visite."
og:image: /images/og/landing-pages.jpg (screenshot du site aurentia.agency sur fond branded)
og:type: website
```

### Schema markup JSON-LD

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Landing Pages Haute Conversion",
    "provider": {
      "@type": "Organization",
      "name": "Aurentia Agency",
      "url": "https://aurentia.agency"
    },
    "description": "Création de landing pages haute conversion pour SaaS et produits tech. Design premium, animations GSAP/Framer Motion, responsive, SEO, performance.",
    "url": "https://aurentia.agency/landing-pages",
    "areaServed": "FR",
    "offers": {
      "@type": "Offer",
      "price": "1500",
      "priceCurrency": "EUR",
      "description": "À partir de 1 500€ sur devis"
    },
    "serviceType": ["Landing Page", "Page de conversion", "Design web premium"]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
      { "@type": "ListItem", "position": 2, "name": "Landing Pages", "item": "https://aurentia.agency/landing-pages" }
    ]
  }
]
```

---

## 3. Architecture des sections

---

### Section 1 — Hero

**Hauteur :** min-h-[90vh]
**Layout :** Centré, full-width. Titre oversize. Fond dark avec gradient mesh (glow orange/ambre/rose subtil). Badge + H1 + sous-titre + mention "Ce site est notre carte de visite" + CTAs.
**Animations :**
- Page entry : fade-in + translateY(30px) → 0, durée 800ms, ease-out
- Badge : fade-in + scale depuis 0.8, delay 0.2s
- H1 : TextReveal (GSAP SplitText, mot par mot, stagger 0.05s)
- Sous-titre : BlurReveal (blur 10px → 0, delay 0.3s)
- Mention vitrine : fade-in + pulse subtil (opacity 0.7 → 1, loop), delay 0.5s
- CTAs : fade-in + translateY(20px) → 0, delay 0.6s
- Fond : gradient mesh avec orbes orange/ambre qui ondulent

**Contenu textuel :**

- **Badge :** `LANDING PAGES HAUTE CONVERSION`
- **H1 :** `Des landing pages qui convertissent. Pas qui décorent.`
- **Sous-titre :** `Design spectaculaire. Animations premium. Optimisées pour transformer vos visiteurs en clients. Chaque pixel a une intention.`
- **Mention vitrine :** `Ce site est notre carte de visite. Vous êtes en train de naviguer sur notre travail.`
- **CTA primaire :** `Discuter de votre landing page` → cal.com/aurentia/landing-page
- **CTA secondaire (ghost) :** `Voir des exemples` → ancre #exemples

**Responsive :**
- Mobile (375px) : H1 en `text-3xl`, sous-titre en `text-base`, CTAs en stack vertical full-width, `px-6`
- Tablet (768px) : H1 en `text-4xl`, CTAs en row
- Desktop (1280px+) : H1 en `text-5xl md:text-6xl`, max-w-4xl centré

**Assets :** Aucun — typographie pure + gradient mesh de fond.

---

### Section 2 — Ce qu'on livre

**Hauteur :** auto
**Layout :** Titre centré + Bento grid (3 colonnes desktop, 1 colonne mobile). 6 cards features.
**Animations :**
- Titre : TextReveal
- Sous-titre : BlurReveal
- Cards : BlurReveal staggeré (0.12s entre chaque)
- SpotlightCard sur chaque card
- Hover : translateY(-8px) + border plus visible, transition 700ms
- Icônes : scale 0.5 → 1 avec rotation subtile (5deg → 0)

**Contenu textuel :**

- **Titre section :** `Chaque détail est une arme de conversion.`
- **Sous-titre :** `On ne livre pas juste une page. On livre une machine à convertir.`

**Card 1**
- Icône : Paintbrush (Lucide)
- Titre : `Design sur-mesure`
- Texte : `Zéro template. Chaque landing page est forgée pour votre produit, votre audience, votre marché. Un design qui impressionne et qui convertit.`

**Card 2**
- Icône : Sparkles (Lucide)
- Titre : `Animations premium`
- Texte : `GSAP, Framer Motion, scroll animations, parallax, blur reveals. Des micro-interactions qui captivent l'attention et guident vers l'action.`

**Card 3**
- Icône : Smartphone (Lucide)
- Titre : `Responsive natif`
- Texte : `Mobile-first. Chaque breakpoint est pensé. 375px, 768px, 1280px — votre page est parfaite sur chaque écran.`

**Card 4**
- Icône : Search (Lucide)
- Titre : `SEO technique`
- Texte : `Metadata, Schema.org, Open Graph, Core Web Vitals. Votre page est indexée, rapide, et prête à ranker.`

**Card 5**
- Icône : Gauge (Lucide)
- Titre : `Performance`
- Texte : `PageSpeed 90+ mobile, 95+ desktop. Chaque animation est GPU-accelerated. Zéro Three.js lourd. Ça tourne sur n'importe quel appareil.`

**Card 6**
- Icône : Moon (Lucide)
- Titre : `Dark & Light mode`
- Texte : `Deux thèmes, zéro compromis. Chaque composant fonctionne dans les deux modes. Tokens sémantiques, pas de couleurs hardcodées.`

**Responsive :**
- Mobile : 1 colonne, gap-4, `px-6`
- Tablet : 2 colonnes, gap-6
- Desktop : 3 colonnes, gap-6, max-w-5xl centré

**Assets :** Icônes Lucide React.

---

### Section 3 — La vitrine (Ce site = Exemple)

**Hauteur :** auto, min-h-[60vh]
**Layout :** Titre centré + showcase interactif. Un "browser frame" mockup affichant le site aurentia.agency lui-même. En dessous, des callouts pointant vers des features spécifiques du site.
**Animations :**
- Titre : TextGradientReveal (mots passent de dim à gradient orange→ambre)
- Browser frame : BlurReveal + scale 0.95 → 1, delay 0.3s
- Tilt 3D sur le browser frame (rotation max 5deg au mouvement souris)
- Callouts : fade-in staggeré (0.15s), apparaissent un par un comme des annotations
- Lignes connectant callouts au frame : stroke-dashoffset animation

**Contenu textuel :**

- **Badge :** `NOTRE VITRINE`
- **Titre section :** `Vous êtes en train de naviguer sur notre meilleur argument.`
- **Sous-titre :** `Ce site a été conçu avec les mêmes standards que ceux qu'on applique à vos projets. Chaque animation, chaque transition, chaque pixel — c'est exactement ce qu'on livre.`

**Callouts (annotations autour du browser frame) :**
- `Magnetic buttons` — pointant vers un CTA
- `Scroll animations GSAP` — pointant vers une section
- `Spotlight cards` — pointant vers une card
- `Text reveal au scroll` — pointant vers un titre
- `Curseur personnalisé` — pointant vers le curseur
- `Gradient mesh animé` — pointant vers le fond

- **Phrase de closing :** `Imaginez ça. Mais pour votre produit.`

**Responsive :**
- Mobile (375px) : Browser frame en full-width, callouts en liste sous le frame, `px-6`
- Tablet (768px) : Browser frame centré, callouts positionnés autour
- Desktop (1280px+) : Browser frame max-w-4xl, callouts flottants autour

**Assets :** Screenshot du site aurentia.agency `/images/landing-pages/vitrine-aurentia.webp` `[PLACEHOLDER]` ou iframe/screenshot dynamique.

---

### Section 4 — Exemples (Portfolio)

**Hauteur :** auto, min-h-[50vh]
**Layout :** Titre centré + grid de screenshots. 2 colonnes desktop, 1 mobile. Slots pour futurs projets.
**Animations :**
- Titre : TextReveal
- Cards : BlurReveal staggeré (0.2s)
- Screenshots : parallax léger au scroll
- SpotlightCard
- Hover : translateY(-8px) + glow + scale(1.01), transition 700ms

**Contenu textuel :**

- **Badge :** `EXEMPLES`
- **Titre section :** `Des pages qui marquent les esprits.`
- **Sous-titre :** `Chaque projet est unique. Voici ce qu'on a forgé.`

**Card 1 — aurentia.agency (ce site)**
- Screenshot : `[PLACEHOLDER — /images/landing-pages/exemple-aurentia.webp]`
- Titre : `Aurentia Agency`
- Description : `Notre propre site. Next.js, GSAP, Framer Motion, scroll narratif, gradient mesh, magnetic buttons, dark/light mode. La vitrine de ce qu'on sait faire.`
- Tags : `Next.js` · `GSAP` · `Framer Motion` · `Scroll narratif`
- Lien : `https://aurentia.agency`

**Card 2 — Projet client**
- Screenshot : `[PLACEHOLDER — /images/landing-pages/exemple-2.webp]`
- Titre : `[Nom du projet]`
- Description : `[Description de la landing page, produit, résultats conversion]`
- Tags : `[Tags technos/features]`
- Lien : `[URL]`

**Card 3 — Projet client (slot futur)**
- Screenshot : `[PLACEHOLDER — /images/landing-pages/exemple-3.webp]`
- Titre : `[Nom du projet]`
- Description : `[Description]`
- Tags : `[Tags]`
- Lien : `[URL]`

- **Note :** Commencer avec aurentia.agency comme exemple principal. Ajouter les projets clients au fur et à mesure.

**Responsive :**
- Mobile (375px) : 1 colonne, `px-6`
- Tablet (768px) : 2 colonnes, gap-6
- Desktop (1280px+) : 2 colonnes, max-w-5xl, gap-8

**Assets :** Screenshots — `[PLACEHOLDER IMAGES]`.

---

### Section 5 — Process

**Hauteur :** auto
**Layout :** Titre centré + 4 étapes en timeline verticale (mobile) / horizontale (desktop).
**Animations :**
- Titre : TextGradientReveal
- Timeline : stroke-dashoffset au scroll
- Étapes : BlurReveal staggeré (0.2s)
- Numéros : NumberMorphing
- Icônes : scale 0.5 → 1

**Contenu textuel :**

- **Badge :** `NOTRE PROCESS`
- **Titre section :** `De la vision au pixel. En 4 étapes.`
- **Sous-titre :** `Un process direct. Pas de réunions inutiles.`

**Étape 1**
- Numéro : `01`
- Icône : PhoneCall (Lucide)
- Titre : `Brief créatif`
- Texte : `On comprend votre produit, votre audience, vos objectifs de conversion. On analyse vos concurrents. On définit la direction créative.`
- Durée : `30 min`

**Étape 2**
- Numéro : `02`
- Icône : Layers (Lucide)
- Titre : `Design & Copywriting`
- Texte : `Wireframe, direction artistique, rédaction des textes. Chaque section a un objectif de conversion. Vous validez le design avant qu'on code.`
- Durée : `3 à 5 jours`

**Étape 3**
- Numéro : `03`
- Icône : Code (Lucide)
- Titre : `Développement & Animations`
- Texte : `Next.js, GSAP, Framer Motion. Responsive pixel-perfect. Animations scroll-triggered. Performance optimisée. SEO technique intégré.`
- Durée : `3 à 5 jours`

**Étape 4**
- Numéro : `04`
- Icône : Rocket (Lucide)
- Titre : `Lancement`
- Texte : `Déploiement Vercel, configuration DNS, tests cross-browser, PageSpeed validé. Votre page est live et prête à convertir.`
- Durée : `1 jour`

**Responsive :**
- Mobile (375px) : Timeline verticale, `px-6`
- Desktop (1280px+) : Timeline horizontale, 4 colonnes, max-w-5xl

**Assets :** Icônes Lucide React.

---

### Section 6 — Tarification

**Hauteur :** auto, min-h-[50vh]
**Layout :** Titre centré + une card pricing unique centrée.
**Animations :**
- Titre : TextGradientReveal
- Card : BlurReveal + scale 0.95 → 1
- SpotlightCard
- Prix : NumberMorphing
- CTA : magnetic button + glow pulse

**Contenu textuel :**

- **Badge :** `INVESTISSEMENT`
- **Titre section :** `Un investissement qui se mesure en conversions.`
- **Sous-titre :** `Chaque page est sur-mesure. Le prix aussi.`

**Card Pricing :**

- **Label supérieur :** `LANDING PAGE HAUTE CONVERSION`
- **Prix :** `À partir de 1 500€`
- **Mention :** `Sur devis — selon la complexité et les animations`
- **Inclus :**
  - `Design sur-mesure`
  - `Copywriting orienté conversion`
  - `Animations premium (GSAP / Framer Motion)`
  - `Responsive pixel-perfect`
  - `SEO technique & metadata`
  - `Dark & Light mode`
  - `Déploiement Vercel`
- **Délai :** `Livraison en 1 à 2 semaines`
- **CTA :** `Discuter de votre projet` → cal.com/aurentia/landing-page

- **Texte sous la card :** `Le prix dépend du nombre de sections, de la complexité des animations, et du volume de contenu. On vous fait un devis précis après le brief créatif.`

**Responsive :**
- Mobile (375px) : Card full-width, `px-6`, prix en `text-3xl`
- Tablet (768px) : Card centrée, max-w-md
- Desktop (1280px+) : Card centrée, max-w-lg

**Assets :** Aucun.

---

### Section 7 — FAQ

**Hauteur :** auto
**Layout :** Titre centré + accordéon (max-w-3xl centré). 6 questions.
**Animations :**
- Titre : TextReveal
- Questions : BlurReveal staggeré (0.1s)
- Ouverture/fermeture : height auto-animate + opacity, durée 500ms, ease-in-out
- Chevron : rotation 0 → 180deg, transition 500ms

**Contenu textuel :**

- **Titre section :** `Questions fréquentes.`

**Q1 :** `Quelle est la différence entre vos landing pages et un site vitrine ?`
**R1 :** `Un site vitrine présente votre activité (plusieurs pages, navigation). Une landing page a un seul objectif : convertir un visiteur en lead ou en client. Pas de menu, pas de distraction. Chaque section pousse vers l'action.`

**Q2 :** `Combien de temps pour livrer une landing page ?`
**R2 :** `Entre 1 et 2 semaines. Brief créatif + design + copywriting + développement + déploiement. On peut aller plus vite si le scope est serré. On peut prendre plus de temps si les animations sont complexes.`

**Q3 :** `Vous faites aussi le copywriting ?`
**R3 :** `Oui. On rédige les textes orientés conversion. Si vous avez déjà du contenu, on l'optimise. L'IA nous aide à itérer vite — l'expertise humaine valide chaque mot.`

**Q4 :** `Est-ce que je peux modifier la page après livraison ?`
**R4 :** `Oui. On développe avec Next.js — le code est propre, documenté, et déployé sur votre compte Vercel. Vous pouvez modifier le contenu ou nous demander des ajustements.`

**Q5 :** `Pourquoi pas Webflow ou Framer ?`
**R5 :** `Webflow et Framer sont bons pour prototyper. Pour des animations complexes (GSAP, scroll narratif, parallax multi-couches), du SEO technique poussé, et une performance 90+ mobile, Next.js n'a pas d'équivalent. C'est aussi ce qui fait la différence en conversion.`

**Q6 :** `Quel est le ROI d'une landing page premium ?`
**R6 :** `Une landing page bien conçue convertit entre 3% et 12% selon l'offre et le trafic. Si votre produit coûte 50€/mois et que vous envoyez 1 000 visiteurs, même un gain de 2 points de conversion = 1 000€/mois de revenus supplémentaires. L'investissement se rembourse vite.`

**Responsive :**
- Mobile (375px) : Full-width, `px-6`, `text-base`
- Desktop (1280px+) : `max-w-3xl mx-auto`

**Assets :** Aucun.

---

### Section 8 — CTA Final

**Hauteur :** min-h-[50vh], centré verticalement
**Layout :** Centré, fond dark intense avec gradient mesh déployé (glow orange + ambre + rose subtil).
**Animations :**
- Titre : TextGradientReveal
- Sous-titre : BlurReveal, delay 0.3s
- Bouton CTA : scale 0.9 → 1, glow pulse, magnetic button
- Preuves : fade-in staggeré (0.1s)
- Background : gradient mesh à intensité maximale

**Contenu textuel :**

- **Titre :** `Votre produit mérite une page à la hauteur.`
- **Sous-titre :** `30 minutes pour comprendre votre produit, votre audience, et vos objectifs de conversion. On vous montre ce qu'on peut faire pour vous.`
- **CTA Button :** `Réserver un brief créatif` → cal.com/aurentia/landing-page
- **Preuves (en dessous du bouton) :**
  - `Gratuit et sans engagement`
  - `On analyse votre marché et vos concurrents`
  - `Direction créative proposée dès le call`

**Responsive :**
- Mobile : `text-2xl` pour le titre, `px-6`, bouton full-width
- Desktop : `text-4xl md:text-5xl`, bouton auto-width

**Assets :** Aucun.

---

## 4. Spécifications techniques

### Composants React à créer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `LandingHero` | `src/components/landing-pages/LandingHero.tsx` | — | Badge + H1 + sous-titre + mention vitrine + 2 CTAs. |
| `LandingFeatures` | `src/components/landing-pages/LandingFeatures.tsx` | — | Bento grid 6 cards features. SpotlightCard, BlurReveal. |
| `LandingShowcase` | `src/components/landing-pages/LandingShowcase.tsx` | — | Browser frame + callouts annotations. Tilt 3D. |
| `LandingExamples` | `src/components/landing-pages/LandingExamples.tsx` | — | Grid screenshots portfolio. SpotlightCard, BlurReveal. |
| `LandingProcess` | `src/components/landing-pages/LandingProcess.tsx` | — | Timeline 4 étapes. NumberMorphing, BlurReveal. |
| `LandingPricing` | `src/components/landing-pages/LandingPricing.tsx` | — | Card pricing unique. NumberMorphing, SpotlightCard, MagneticButton. |
| `LandingFAQ` | `src/components/landing-pages/LandingFAQ.tsx` | — | Accordéon 6 questions. |
| `LandingCTA` | `src/components/landing-pages/LandingCTA.tsx` | — | CTA final. Pattern HomeCTA. |

### Page route

**Fichier :** `src/app/landing-pages/page.tsx`

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { LandingHero } from "@/components/landing-pages/LandingHero";
import { LandingFeatures } from "@/components/landing-pages/LandingFeatures";
import { LandingShowcase } from "@/components/landing-pages/LandingShowcase";
import { LandingExamples } from "@/components/landing-pages/LandingExamples";
import { LandingProcess } from "@/components/landing-pages/LandingProcess";
import { LandingPricing } from "@/components/landing-pages/LandingPricing";
import { LandingFAQ } from "@/components/landing-pages/LandingFAQ";
import { LandingCTA } from "@/components/landing-pages/LandingCTA";

// Metadata export pour Next.js (title, description, openGraph, jsonLd)
```

### Data structures

```typescript
// src/data/landing-pages-content.ts

export interface FeatureCard {
  icon: string; // nom Lucide
  title: string;
  text: string;
}

export interface ShowcaseCallout {
  label: string;
  position: { x: string; y: string }; // position relative au browser frame
}

export interface LandingExample {
  screenshot: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface LandingProcessStep {
  number: string;
  icon: string;
  title: string;
  text: string;
  duration: string;
}
```

### Composants existants réutilisés

- `TextReveal` — animation mot par mot (GSAP SplitText)
- `TextGradientReveal` — mots passent de dim à gradient au scroll
- `BlurReveal` — blur 10px → 0 au scroll
- `SpotlightCard` — radial-gradient suit la souris
- `MagneticButton` — bouton qui attire le curseur
- `CalModal` — modal de booking Cal.com
- `NumberMorphing` — slot machine vertical pour les chiffres

### Dépendances / intégrations

- **Cal.com** : CTA → cal.com/aurentia/landing-page (URL spécifique)
- **Images** : screenshots en placeholder dans `/images/landing-pages/`
- **Animations** : composants existants dans `src/components/animations/`
- **Lucide React** : icônes (Paintbrush, Sparkles, Smartphone, Search, Gauge, Moon, PhoneCall, Layers, Code, Rocket)

---

## 5. Récapitulatif — Checklist pré-implémentation

```
[x] Opening hook : conversion > décoration, affirmation forte
[x] Framework : Features → Showcase → Examples → Process → Price → CTA
[x] "Ce qu'on livre" détaille 6 features concrètes
[x] Section vitrine : le site Aurentia comme preuve vivante
[x] Portfolio avec aurentia.agency + slots futurs projets
[x] Process clair en 4 étapes avec durées
[x] Pricing transparent : à partir de 1 500€, sur devis, tout inclus listé
[x] FAQ couvre 6 objections (dont "pourquoi pas Webflow" et ROI)
[x] CTA final avec action claire (book Cal.com/aurentia/landing-page)
[x] Voix "on" (équipe), premium, confiant, direct — ton Aurentia
[x] Aucun mot interdit (cheap, template, basique, robot, garanti, automatique)
[x] Mots de marque utilisés (forger, sur-mesure, craft, convertir, révéler)
[x] Minimum text-sm partout, aucun text-xs
[x] Toutes transitions ≥ 500ms, ease-in-out
[x] Dark/Light : tokens sémantiques uniquement
[x] Pas de position: sticky / pin: true
[x] Animations scroll-triggered sur chaque section
[x] Mobile-first responsive (375px → 768px → 1280px)
[x] 1 seul H1
[x] Schema JSON-LD (Service + BreadcrumbList)
[x] Liens internes : /saas, /realisations, home
```

---

*PRD — Pages /saas et /landing-pages — Aurentia Agency — Mars 2026*
