# PRD — Pages `/sites-vitrines` et `/identite-visuelle`

---

# ═══════════════════════════════════════════════════════════════
# PAGE 1 : `/sites-vitrines`
# ═══════════════════════════════════════════════════════════════

---

## 1. Fiche page

```
Page : /sites-vitrines
Titre H1 : "Votre site vitrine sur-mesure. Livré en 48h. À partir de 900€."
Title tag : "Site Vitrine Sur-Mesure dès 900€ — Livré en 48h | Aurentia" (57 caractères)
Meta description : "Site vitrine professionnel, unique, optimisé SEO. Livré en 48h par notre équipe IA + 20 ans d'expertise web. Dès 900€. Zéro template." (137 caractères)
Objectif principal : Générer des bookings Cal.com pour un call découverte site vitrine
Persona cible : Gérant de PME / commerce / profession libérale qui veut un site pro sans y laisser 5 000€ ni 3 mois d'attente
Pages liées :
  - Entrants : Home (navbar + section services + niches), /conciergeries, /a-propos, Google (SEO)
  - Sortants : /conciergeries (niche spécifique), /identite-visuelle (service complémentaire), /a-propos (équipe), /realisations (portfolio), booking Cal.com/aurentia/site-vitrine
```

---

## 2. SEO complet

### Mots-clés

| Type | Mots-clés |
|------|-----------|
| **Primaire** | site vitrine sur-mesure |
| **Secondaires** | création site vitrine, site vitrine professionnel, site vitrine pas cher, agence site vitrine IA, site vitrine rapide |
| **Longue traîne** | créer un site vitrine en 48h, site vitrine professionnel prix, site vitrine sur-mesure pas cher, agence web qui livre vite |

### Open Graph

```
og:title: "Site Vitrine Sur-Mesure dès 900€ — Livré en 48h"
og:description: "Zéro template. SEO intégré. Design unique. Livré en 48h par 20 ans d'expertise web + IA."
og:image: /images/og/sites-vitrines.jpg (mockup de site vitrine sur device)
og:type: website
```

### Schema markup JSON-LD

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Création de Sites Vitrines Sur-Mesure",
    "description": "Sites vitrines professionnels, uniques, optimisés SEO. Livrés en 48h. À partir de 900€.",
    "provider": {
      "@type": "Organization",
      "name": "Aurentia Agency",
      "url": "https://aurentia.agency"
    },
    "serviceType": "Création de site web",
    "areaServed": {
      "@type": "Country",
      "name": "France"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": "900",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "EUR",
        "price": "900",
        "description": "À partir de 900€"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Sites Vitrines",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Site vitrine conciergerie" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Site vitrine restaurant" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Site vitrine hôtel" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Site vitrine commerce" } }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
      { "@type": "ListItem", "position": 2, "name": "Sites Vitrines", "item": "https://aurentia.agency/sites-vitrines" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien coûte un site vitrine chez Aurentia ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Nos sites vitrines démarrent à 900€. Le prix varie selon le nombre de pages, les fonctionnalités et le niveau de personnalisation." }
      },
      {
        "@type": "Question",
        "name": "En combien de temps est livré un site vitrine ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Votre première version est livrée en 48h après validation du brief. L'IA accélère le process, l'expertise humaine valide chaque détail." }
      },
      {
        "@type": "Question",
        "name": "Est-ce que vous utilisez des templates ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Jamais. Chaque site est conçu sur-mesure pour votre activité, votre identité et vos objectifs. Zéro template, zéro copier-coller." }
      },
      {
        "@type": "Question",
        "name": "Le SEO est-il inclus ?",
        "acceptedAnswer": { "@type": "Answer", "text": "Oui. Chaque site est optimisé SEO dès la livraison : structure technique, balises, vitesse, responsive, contenu indexable." }
      }
    ]
  }
]
```

### Internal Linking

- Vers `/conciergeries` : dans la section "Pour qui" (lien sur la card conciergerie)
- Vers `/identite-visuelle` : mention dans la section features ("Besoin d'un logo ? On fait aussi l'identité visuelle.")
- Vers `/a-propos` : dans la section "Pourquoi nous" (lien sur "20 ans d'expertise")
- Vers `/realisations` : dans la section Portfolio
- Depuis la Home : section Services (card sites vitrines) + section Niches

---

## 3. Architecture des sections

---

### Section 1 — Hero

**Hauteur :** min-h-[90vh]
**Layout :** Centré, full-width. Titre oversize. Fond dark avec gradient mesh subtil (glow orange en bas à droite). Badge au-dessus du titre. Sous-titre + CTA en dessous. Mockup device en bas ou à droite (desktop).
**Animations :**
- Page entry : fade-in + translateY(30px) → 0, durée 800ms, ease-out
- Badge : fade-in + scale depuis 0.8, delay 0.2s
- H1 : TextReveal (GSAP SplitText, mot par mot, stagger 0.05s)
- Sous-titre : BlurReveal (blur 10px → 0, delay 0.3s)
- CTA : scale 0.9 → 1, glow pulse, delay 0.5s
- Mockup device (si présent) : slide-in depuis le bas + léger parallax au scroll
- Scroll indicator subtil (chevron animé en bas)

**Contenu textuel :**

- **Badge :** `SITES VITRINES SUR-MESURE`
- **H1 :** `Votre site vitrine sur-mesure. Livré en 48h. À partir de 900€.`
- **Sous-titre :** `Design unique, SEO intégré, performance native. Propulsé par l'IA, forgé par 20 ans d'expertise web. On vous montre le résultat avant de facturer.`
- **CTA :** `Réserver mon call découverte` → cal.com/aurentia/site-vitrine
- **Preuve sous le CTA :** `Gratuit · 20 min · On vous montre VOTRE site`

**Responsive :**
- Mobile (375px) : H1 en `text-3xl`, sous-titre en `text-base`, padding `px-6`, CTA full-width, pas de mockup
- Tablet (768px) : H1 en `text-4xl`, CTA auto-width
- Desktop (1280px+) : H1 en `text-5xl md:text-6xl`, max-w-5xl, mockup device visible à droite ou en bas

**Assets :** Mockup device avec screenshot d'un site livré (optionnel — la typo seule fonctionne aussi).

---

### Section 2 — Ce qu'on propose (Features/Bénéfices)

**Hauteur :** auto
**Layout :** Titre centré + Bento grid 2x3 (desktop), 1 colonne (mobile). 6 cards feature avec icône, titre, description.
**Animations :**
- Titre : TextReveal
- Sous-titre : BlurReveal
- Cards : BlurReveal staggeré (0.15s entre chaque)
- SpotlightCard sur chaque card (radial-gradient suit la souris)
- Hover : translateY(-8px) + border plus visible, transition 700ms
- Icônes : scale 0.5 → 1 + rotation subtile (5deg → 0) au scroll

**Contenu textuel :**

- **Titre section :** `Tout ce qu'un site pro doit avoir. Rien de superflu.`
- **Sous-titre :** `Chaque site qu'on livre est complet, fonctionnel et prêt à convertir dès le jour 1.`

**Card 1**
- Icône : Paintbrush (Lucide) — accent orange
- Titre : `Design sur-mesure`
- Texte : `Zéro template. Chaque pixel est pensé pour votre activité, votre audience, votre marque. Un site qui ne ressemble à aucun autre.`

**Card 2**
- Icône : Search (Lucide) — accent ambre
- Titre : `SEO intégré dès le départ`
- Texte : `Structure technique, balises, vitesse, contenu optimisé. Vous êtes indexé et visible sur Google dès la mise en ligne.`

**Card 3**
- Icône : Smartphone (Lucide) — accent orange
- Titre : `Responsive natif`
- Texte : `Votre site est parfait sur mobile, tablette et desktop. 60% de vos visiteurs arrivent sur téléphone — on le sait.`

**Card 4**
- Icône : Zap (Lucide) — accent ambre
- Titre : `Performance maximale`
- Texte : `Temps de chargement inférieur à 2 secondes. Next.js, hébergement Vercel, images optimisées. Vos visiteurs ne patientent pas.`

**Card 5**
- Icône : ShieldCheck (Lucide) — accent orange
- Titre : `Sécurisé et maintenable`
- Texte : `HTTPS, headers sécurisés, code propre et documenté. Votre site est solide, protégé, facile à faire évoluer.`

**Card 6**
- Icône : Headphones (Lucide) — accent ambre
- Titre : `Accompagnement après livraison`
- Texte : `On ne disparaît pas après le lancement. Modifications mineures, questions, évolutions — on reste disponible.`

**Responsive :**
- Mobile : 1 colonne, gap-4
- Tablet : 2 colonnes, gap-6
- Desktop : 2x3 grid (ou 3x2), gap-6, max-w-6xl centré

**Assets :** Icônes Lucide React.

---

### Section 3 — Process (48h)

**Hauteur :** auto
**Layout :** Titre centré + timeline verticale (mobile) / horizontale (desktop). 4 étapes avec numéro, titre, description. Ligne connectrice animée entre les étapes.
**Animations :**
- Titre : TextGradientReveal (mots passent de dim à gradient orange→ambre)
- Timeline line : stroke-dashoffset animé au scroll (la ligne se dessine progressivement)
- Chaque étape : BlurReveal staggeré (0.3s)
- Numéros : NumberMorphing (slot machine, chaque digit slide)
- Badge "48h" : fade-in + scale depuis 0.8, pulse glow

**Contenu textuel :**

- **Badge :** `PROCESS EN 48H`
- **Titre section :** `De l'échange au lancement. En 48 heures.`
- **Sous-titre :** `Pas de devis qui traîne 3 semaines. Pas de réunions inutiles. Un process direct et efficace.`

**Étape 1**
- Numéro : `01`
- Titre : `L'échange`
- Durée : `20 min`
- Texte : `Un call de 20 minutes. On comprend votre activité, vos objectifs, votre audience. Vous nous envoyez votre contenu (textes, photos, logo). C'est tout ce dont on a besoin.`

**Étape 2**
- Numéro : `02`
- Titre : `La création`
- Durée : `24-48h`
- Texte : `L'IA accélère le design et le code. L'expertise humaine valide chaque choix. On forge votre site sur-mesure — design, contenu, SEO, responsive. Tout.`

**Étape 3**
- Numéro : `03`
- Titre : `Votre validation`
- Durée : `À votre rythme`
- Texte : `On vous montre le site terminé. Vous testez, vous regardez chaque page, chaque détail. Retours illimités jusqu'à ce que ce soit parfait. Vous ne payez qu'après validation.`

**Étape 4**
- Numéro : `04`
- Titre : `Lancement + suivi`
- Durée : `Jour J`
- Texte : `Mise en ligne sur votre domaine. Configuration email, analytics, Google Business. Et on reste là après — pour les ajustements, les questions, les évolutions.`

**Responsive :**
- Mobile : Timeline verticale, étapes en stack, numéros en `text-3xl font-mono`, `px-6`
- Tablet : Timeline horizontale, 2x2 grid
- Desktop : Timeline horizontale, 4 en row, max-w-6xl centré

**Assets :** Aucun.

---

### Section 4 — Pour qui (Niches)

**Hauteur :** auto
**Layout :** Titre centré + grid de cards niches (3 colonnes desktop, 2 colonnes tablet, 1 colonne mobile). Chaque card = icône métier + nom de la niche + phrase d'accroche. La card "Conciergeries" est mise en avant (border accent, badge "Offre dédiée") et linke vers `/conciergeries`.
**Animations :**
- Titre : TextReveal
- Cards : BlurReveal staggeré (0.1s)
- SpotlightCard sur chaque card
- Hover : translateY(-8px) + glow, transition 700ms
- Card "Conciergeries" : border gradient orange→ambre animé (shimmer subtil)

**Contenu textuel :**

- **Titre section :** `Un site sur-mesure. Quelle que soit votre activité.`
- **Sous-titre :** `On travaille niche par niche. Chaque site est pensé pour votre métier, vos clients, vos enjeux.`

**Card 1 — Conciergeries** (mise en avant)
- Icône : Key (Lucide)
- Titre : `Conciergeries`
- Texte : `Locations saisonnières, gestion de biens, accueil voyageurs. Un site qui inspire confiance aux propriétaires et aux locataires.`
- Badge : `OFFRE DÉDIÉE`
- Lien : `/conciergeries` → `Découvrir l'offre conciergeries →`

**Card 2 — Hôtels & Hébergements**
- Icône : Building (Lucide)
- Titre : `Hôtels & Hébergements`
- Texte : `Chambres d'hôtes, hôtels, gîtes. Un site qui donne envie de réserver avant même d'avoir vu les photos.`

**Card 3 — Restaurants & Bars**
- Icône : UtensilsCrossed (Lucide)
- Titre : `Restaurants & Bars`
- Texte : `Votre carte, votre ambiance, vos horaires. Un site qui fait saliver et qui convertit le passant curieux en client.`

**Card 4 — Commerces & Boutiques**
- Icône : Store (Lucide)
- Titre : `Commerces & Boutiques`
- Texte : `Artisans, commerçants, boutiques de quartier. Un site vitrine qui attire les clients locaux et renforce votre présence.`

**Card 5 — Professions libérales**
- Icône : Briefcase (Lucide)
- Titre : `Professions libérales`
- Texte : `Avocats, consultants, coachs, thérapeutes. Un site qui pose votre expertise et rassure vos futurs clients.`

**Card 6 — Salles de sport & Bien-être**
- Icône : Dumbbell (Lucide)
- Titre : `Salles de sport & Bien-être`
- Texte : `Studios, salles de sport, spas. Un site qui donne l'énergie de s'inscrire dès la première visite.`

**Phrase de closing :** `Votre niche n'est pas listée ? On s'adapte. Chaque site est conçu pour votre métier spécifique.`

**Responsive :**
- Mobile : 1 colonne, gap-4
- Tablet : 2 colonnes, gap-6
- Desktop : 3 colonnes, gap-6, max-w-6xl centré

**Assets :** Icônes Lucide React.

---

### Section 5 — Fourchette de prix

**Hauteur :** auto, min-h-[50vh]
**Layout :** Centré, max-w-4xl. Un bloc visuel principal avec le prix d'entrée en oversize, entouré d'une liste de ce qui est inclus. Pas de packs détaillés (ceux-ci sont sur les sous-pages niches). Un lien discret vers /conciergeries pour les packs complets.
**Animations :**
- Titre : TextGradientReveal
- Prix "900€" : NumberMorphing (slot machine), accent gradient orange→ambre, glow subtil
- "À partir de" : BlurReveal, delay 0.2s
- Liste inclus : slide-in depuis la gauche, stagger 0.1s, check icons scale bounce
- Bloc : SpotlightCard (radial-gradient suit la souris)

**Contenu textuel :**

- **Badge :** `TARIFS TRANSPARENTS`
- **Titre section :** `Un site pro. Pas un devis à 5 000€.`
- **Prix principal :** `À partir de 900€`
- **Sous-titre prix :** `Le prix varie selon le nombre de pages, les fonctionnalités et le niveau de personnalisation. On en parle pendant le call.`

**Ce qui est inclus (liste avec checks) :**
- ✓ Design sur-mesure — zéro template
- ✓ SEO technique optimisé
- ✓ Responsive mobile, tablette, desktop
- ✓ Hébergement premium (Vercel)
- ✓ Certificat SSL / HTTPS
- ✓ Analytics intégrés
- ✓ Livraison en 48h
- ✓ Retours illimités jusqu'à validation
- ✓ Accompagnement post-livraison

**Note discrète :** `Vous gérez une conciergerie ? On a des packs dédiés avec des fonctionnalités spécifiques.` → lien vers `/conciergeries`

**Responsive :**
- Mobile : Prix en `text-5xl font-mono`, liste en stack, `px-6`
- Desktop : Prix en `text-7xl font-mono`, liste en 2 colonnes, max-w-4xl centré

**Assets :** Aucun.

---

### Section 6 — Pourquoi nous (Différenciateurs)

**Hauteur :** auto
**Layout :** Titre centré + 3 colonnes (desktop), 1 colonne (mobile). Chaque colonne = un pilier avec icône, titre, texte.
**Animations :**
- Titre : TextGradientReveal
- Cards : BlurReveal staggeré (0.2s)
- SpotlightCard sur chaque pilier
- Icônes : scale 0.7 → 1 + rotation subtile au scroll

**Contenu textuel :**

- **Titre section :** `Pourquoi Aurentia. Pas une autre agence.`
- **Sous-titre :** `Trois raisons. Pas des slogans — des faits.`

**Pilier 1**
- Icône : Cpu (Lucide) — accent orange
- Titre : `L'IA qui accélère tout`
- Texte : `Design, code, contenu, SEO — l'IA propulse chaque étape. Pas pour remplacer l'humain. Pour amplifier 20 ans d'expertise. Résultat : 48h au lieu de 6 semaines.`

**Pilier 2**
- Icône : Hammer (Lucide) — accent ambre
- Titre : `20 ans de craft web`
- Texte : `Fabien a forgé des centaines de sites. Il sait ce qui convertit, ce qui dure, ce qui illumine un business. L'IA est un outil. L'œil, c'est 20 ans d'expérience.`
- Lien discret : `En savoir plus sur l'équipe →` vers `/a-propos`

**Pilier 3**
- Icône : Eye (Lucide) — accent orange
- Titre : `On montre avant de facturer`
- Texte : `Votre site est construit AVANT le call. Vous voyez le résultat, vous jugez. Pas de mockup flou, pas de promesse en l'air. Vous décidez en toute connaissance.`

**Responsive :**
- Mobile : Stack vertical, gap-6
- Desktop : Grid 3 colonnes, gap-8, max-w-5xl centré

**Assets :** Icônes Lucide.

---

### Section 7 — Portfolio

**Hauteur :** auto
**Layout :** Titre centré + grid de mockups (screenshots de sites livrés dans des devices). 2 colonnes desktop, 1 colonne mobile. Chaque item = screenshot dans un device frame + nom du client/niche + lien externe.
**Animations :**
- Titre : TextReveal
- Mockups : BlurReveal staggeré (0.2s) + léger tilt 3D au hover (rotation max 5deg)
- Hover : scale(1.02) + glow subtil, transition 700ms
- Compteur en dessous : NumberMorphing ("15+ sites livrés")

**Contenu textuel :**

- **Badge :** `NOS RÉALISATIONS`
- **Titre section :** `Ce qu'on a déjà forgé.`
- **Sous-titre :** `Chaque site est unique. Chaque client a une histoire. Voici quelques-unes de nos créations.`

**Portfolio items :** *(data-driven, les items seront ajoutés dynamiquement)*
- Item template : screenshot device, nom client, niche, URL externe
- Minimum 4 items affichés, idéalement 6

**Compteur :** `15+ sites livrés et comptés`

**Lien :** `Voir toutes nos réalisations →` vers `/realisations`

**Responsive :**
- Mobile : 1 colonne, gap-6
- Desktop : 2 colonnes (ou 3 si > 6 items), gap-8, max-w-6xl centré

**Assets :** Screenshots de sites livrés dans `/images/portfolio/`. Device frames CSS (pas d'images de device).

---

### Section 8 — FAQ

**Hauteur :** auto
**Layout :** Titre centré + accordéon (max-w-3xl centré). Questions/réponses en expand/collapse.
**Animations :**
- Titre : TextReveal
- Items accordéon : BlurReveal staggeré (0.1s)
- Open/close : height auto avec transition 700ms ease-in-out
- Icône chevron : rotation 180deg au toggle, transition 500ms

**Contenu textuel :**

- **Titre section :** `Vos questions. Nos réponses.`

**Q1 :** `Combien coûte un site vitrine chez Aurentia ?`
**R1 :** `Nos sites vitrines démarrent à 900€. Le prix dépend du nombre de pages, des fonctionnalités souhaitées et du niveau de personnalisation. On en parle ensemble pendant le call — c'est gratuit et sans engagement.`

**Q2 :** `Comment c'est possible de livrer en 48h ?`
**R2 :** `L'IA accélère le design, le code et le contenu. L'expertise humaine de 20 ans valide chaque choix. On ne bâcle rien — notre process est simplement redoutablement efficace. Là où une agence classique met 6 semaines, on met 48h.`

**Q3 :** `Est-ce que vous utilisez des templates ?`
**R3 :** `Jamais. Chaque site est conçu sur-mesure pour votre activité, votre identité et vos objectifs. On part de zéro à chaque fois. C'est la seule façon de créer un site qui vous ressemble vraiment.`

**Q4 :** `Le SEO est-il inclus ?`
**R4 :** `Oui, dans chaque site. Structure technique optimisée, balises meta, vitesse de chargement, responsive, données structurées. Votre site est prêt à être indexé et visible dès la mise en ligne.`

**Q5 :** `Je n'ai pas de contenu (textes, photos). Vous pouvez vous en charger ?`
**R5 :** `Oui. On rédige le contenu adapté à votre activité et optimisé SEO. Pour les photos, on peut utiliser des visuels professionnels ou vous accompagner pour un shooting. On s'occupe de tout.`

**Q6 :** `Que se passe-t-il après la livraison ?`
**R6 :** `On ne disparaît pas. Modifications mineures, questions techniques, évolutions — on reste votre interlocuteur. Et si votre activité grandit, on fait évoluer le site avec vous.`

**Q7 :** `Quelles technologies utilisez-vous ?`
**R7 :** `Next.js, React, Tailwind CSS, hébergement Vercel. Ce sont les technologies des plus grandes startups mondiales. Votre site est rapide, sécurisé, et techniquement à la pointe.`

**Q8 :** `Je veux aussi un logo / une identité visuelle. C'est possible ?`
**R8 :** `Oui. On propose aussi la création d'identité visuelle complète : logo, charte graphique, univers de marque. 20 ans de direction créative derrière chaque projet. Découvrez notre offre identité visuelle.`
- Lien dans R8 vers `/identite-visuelle`

**Responsive :**
- Mobile : Full-width, `px-6`, `text-base`
- Desktop : `max-w-3xl mx-auto`, `text-lg`

**Assets :** Aucun.

---

### Section 9 — CTA Final

**Hauteur :** min-h-[50vh], centré verticalement
**Layout :** Centré, fond dark intense avec gradient mesh déployé (glow orange + ambre). Le "moment lumière" de la page.
**Animations :**
- Titre : TextGradientReveal (chaque mot passe en gradient orange→ambre)
- Sous-titre : BlurReveal, delay 0.3s
- Bouton CTA : scale 0.9 → 1, glow pulse (box-shadow), magnetic button (GSAP)
- Preuves : fade-in staggeré (0.1s)
- Background : gradient mesh à intensité maximale

**Contenu textuel :**

- **Titre :** `Prêt à révéler votre business en ligne ?`
- **Sous-titre :** `On prépare un aperçu de votre futur site AVANT le call. Vous voyez le résultat, vous jugez. Gratuit. 20 minutes. Sans engagement.`
- **CTA Button :** `Réserver mon call découverte` → cal.com/aurentia/site-vitrine
- **Preuves (sous le bouton) :**
  - `Gratuit et sans engagement`
  - `On vous montre VOTRE site`
  - `Livraison en 48h après validation`

**Responsive :**
- Mobile : `text-2xl` pour le titre, `px-6`, bouton full-width
- Desktop : `text-4xl md:text-5xl`, bouton auto-width

**Assets :** Aucun.

---

## 4. Spécifications techniques

### Composants React à créer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `SitesVitrinesHero` | `src/components/sites-vitrines/SitesVitrinesHero.tsx` | — | Badge + H1 + sous-titre + CTA. Utilise TextReveal, BlurReveal, MagneticButton. |
| `SitesVitrinesFeatures` | `src/components/sites-vitrines/SitesVitrinesFeatures.tsx` | — | Bento grid 6 cards feature. Utilise SpotlightCard, BlurReveal. |
| `SitesVitrinesProcess` | `src/components/sites-vitrines/SitesVitrinesProcess.tsx` | — | Timeline 4 étapes. Utilise NumberMorphing, BlurReveal. |
| `SitesVitrinesNiches` | `src/components/sites-vitrines/SitesVitrinesNiches.tsx` | — | Grid 6 cards niches. Utilise SpotlightCard, BlurReveal. |
| `SitesVitrinesPricing` | `src/components/sites-vitrines/SitesVitrinesPricing.tsx` | — | Bloc prix + liste inclus. Utilise NumberMorphing, SpotlightCard. |
| `SitesVitrinesDiff` | `src/components/sites-vitrines/SitesVitrinesDiff.tsx` | — | 3 piliers différenciateurs. Utilise SpotlightCard, BlurReveal. |
| `SitesVitrinesPortfolio` | `src/components/sites-vitrines/SitesVitrinesPortfolio.tsx` | — | Grid mockups + compteur. Réutilise le pattern de HomePortfolio. |
| `SitesVitrinesFAQ` | `src/components/sites-vitrines/SitesVitrinesFAQ.tsx` | — | Accordéon FAQ. Réutilise le pattern de HomeFAQ / ConciergerieFAQ. |
| `SitesVitrinesCTA` | `src/components/sites-vitrines/SitesVitrinesCTA.tsx` | — | CTA final. Réutilise le pattern de HomeCTA. |

### Page route

**Fichier :** `src/app/sites-vitrines/page.tsx`

```tsx
// Structure
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SitesVitrinesHero } from "@/components/sites-vitrines/SitesVitrinesHero";
import { SitesVitrinesFeatures } from "@/components/sites-vitrines/SitesVitrinesFeatures";
import { SitesVitrinesProcess } from "@/components/sites-vitrines/SitesVitrinesProcess";
import { SitesVitrinesNiches } from "@/components/sites-vitrines/SitesVitrinesNiches";
import { SitesVitrinesPricing } from "@/components/sites-vitrines/SitesVitrinesPricing";
import { SitesVitrinesDiff } from "@/components/sites-vitrines/SitesVitrinesDiff";
import { SitesVitrinesPortfolio } from "@/components/sites-vitrines/SitesVitrinesPortfolio";
import { SitesVitrinesFAQ } from "@/components/sites-vitrines/SitesVitrinesFAQ";
import { SitesVitrinesCTA } from "@/components/sites-vitrines/SitesVitrinesCTA";

// Metadata export pour Next.js (title, description, openGraph, jsonLd)
```

### Composants existants réutilisés

- `TextReveal` — animation mot par mot (GSAP SplitText)
- `TextGradientReveal` — mots passent de dim à gradient au scroll
- `BlurReveal` — blur 10px → 0 au scroll
- `SpotlightCard` — radial-gradient suit la souris
- `MagneticButton` — bouton qui attire le curseur
- `CalModal` — modal de booking Cal.com
- `NumberMorphing` — slot machine chiffres (si existant, sinon à créer)

### Data structures

```typescript
// src/data/sites-vitrines-content.ts

export interface FeatureCard {
  icon: string; // nom Lucide
  title: string;
  text: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  duration: string;
  text: string;
}

export interface NicheCard {
  icon: string;
  title: string;
  text: string;
  badge?: string;
  link?: string;
  linkText?: string;
  highlighted?: boolean;
}

export interface PortfolioItem {
  screenshot: string; // path image
  clientName: string;
  niche: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  link?: { text: string; href: string };
}
```

### Dépendances / intégrations

- **Cal.com** : event type `cal.com/aurentia/site-vitrine`
- **Images** : mockups portfolio dans `/images/portfolio/`
- **Animations** : composants d'animation existants (`src/components/animations/`)
- **Lucide React** : icônes (Paintbrush, Search, Smartphone, Zap, ShieldCheck, Headphones, Key, Building, UtensilsCrossed, Store, Briefcase, Dumbbell, Cpu, Hammer, Eye, Check, ChevronDown)

---

## 5. Récapitulatif — Checklist pré-implémentation

```
[ ] Hero avec headline bénéfice + prix + CTA cal.com/aurentia/site-vitrine
[ ] 6 features/bénéfices en bento grid avec SpotlightCards
[ ] Process 48h en 4 étapes avec timeline animée
[ ] 6 niches avec card conciergerie mise en avant (lien /conciergeries)
[ ] Fourchette de prix "à partir de 900€" — PAS de packs détaillés
[ ] 3 différenciateurs (IA + craft + preuve avant paiement)
[ ] Portfolio avec mockups de sites livrés
[ ] FAQ 8 questions avec liens internes (/identite-visuelle, /conciergeries)
[ ] CTA final avec magnetic button et preuves
[ ] Voix "on" (équipe), premium, confiant, direct
[ ] Aucun mot interdit (cheap, template, basique, robot, garanti, automatique)
[ ] Mots de marque : révéler, forger, sur-mesure, propulsé, lumière, craft
[ ] Minimum text-sm, aucun text-xs
[ ] Transitions ≥ 500ms, ease-in-out
[ ] Dark/Light : tokens sémantiques uniquement
[ ] Pas de position: sticky / pin: true
[ ] Animations scroll-triggered sur chaque section
[ ] Mobile-first responsive (375px → 768px → 1280px)
[ ] 1 seul H1
[ ] Schema JSON-LD (Service + BreadcrumbList + FAQPage)
[ ] Liens internes : /conciergeries, /identite-visuelle, /a-propos, /realisations
[ ] Chaque paragraphe < 4 lignes
```

---
---

# ═══════════════════════════════════════════════════════════════
# PAGE 2 : `/identite-visuelle`
# ═══════════════════════════════════════════════════════════════

---

## 1. Fiche page

```
Page : /identite-visuelle
Titre H1 : "Votre identité visuelle. Forgée par 20 ans de direction créative."
Title tag : "Identité Visuelle — Logo, Charte & Univers de Marque | Aurentia" (60 caractères)
Meta description : "Logo, charte graphique, univers de marque. 20 ans de direction créative + IA. Une identité qui révèle votre potentiel. Sur devis." (131 caractères)
Objectif principal : Générer des demandes de devis / bookings Cal.com pour identité visuelle
Persona cible : Entrepreneur, créateur de marque, gérant qui lance ou repositionne son activité et veut une identité forte
Pages liées :
  - Entrants : Home (navbar + footer), /sites-vitrines (FAQ, lien interne), /a-propos
  - Sortants : /sites-vitrines (service complémentaire), /a-propos (équipe/craft), booking Cal.com/aurentia
```

---

## 2. SEO complet

### Mots-clés

| Type | Mots-clés |
|------|-----------|
| **Primaire** | identité visuelle création |
| **Secondaires** | création logo professionnel, charte graphique sur-mesure, identité de marque, direction créative, branding agence |
| **Longue traîne** | créer une identité visuelle pour son entreprise, agence identité visuelle et site web, logo et charte graphique sur-mesure |

### Open Graph

```
og:title: "Identité Visuelle — Logo, Charte & Univers de Marque"
og:description: "20 ans de direction créative. L'IA comme accélérateur. Une identité qui révèle votre potentiel."
og:image: /images/og/identite-visuelle.jpg (composition de logos/chartes graphiques créés)
og:type: website
```

### Schema markup JSON-LD

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Création d'Identité Visuelle",
    "description": "Logo, charte graphique, univers de marque. 20 ans de direction créative combinés à l'IA pour une identité unique.",
    "provider": {
      "@type": "Organization",
      "name": "Aurentia Agency",
      "url": "https://aurentia.agency"
    },
    "serviceType": "Design graphique et identité visuelle",
    "areaServed": {
      "@type": "Country",
      "name": "France"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
      { "@type": "ListItem", "position": 2, "name": "Identité Visuelle", "item": "https://aurentia.agency/identite-visuelle" }
    ]
  }
]
```

### Internal Linking

- Vers `/sites-vitrines` : "Besoin d'un site en plus de votre identité ? On forge aussi des sites vitrines sur-mesure."
- Vers `/a-propos` : dans la section "Pourquoi Aurentia" (lien vers le profil de Fabien)
- Depuis `/sites-vitrines` : FAQ Q8 + mention dans les features
- Depuis la Home : navbar

---

## 3. Architecture des sections

---

### Section 1 — Hero

**Hauteur :** min-h-[90vh]
**Layout :** Centré, full-width. Titre oversize. Fond dark avec gradient mesh subtil (glow ambre/rose en bas). Tonalité plus "craft/artisanale" que les pages tech — typo expressive, espace respirant.
**Animations :**
- Page entry : fade-in + translateY(30px) → 0, durée 800ms, ease-out
- Badge : fade-in + scale depuis 0.8, delay 0.2s
- H1 : TextReveal (GSAP SplitText, mot par mot, stagger 0.05s)
- Sous-titre : BlurReveal (blur 10px → 0, delay 0.3s)
- CTA : scale 0.9 → 1, glow pulse, delay 0.5s
- Éléments décoratifs : formes géométriques abstraites flottantes (cercles, lignes) — rappel du craft visuel
- Scroll indicator subtil

**Contenu textuel :**

- **Badge :** `IDENTITÉ VISUELLE & DIRECTION CRÉATIVE`
- **H1 :** `Votre identité visuelle. Forgée par 20 ans de direction créative.`
- **Sous-titre :** `Logo, charte graphique, univers de marque. On ne décore pas — on révèle l'essence de votre business. Chaque trait a une intention.`
- **CTA :** `Discuter de mon projet` → cal.com/aurentia
- **Preuve sous le CTA :** `Sur devis · Gratuit · 20 min`

**Responsive :**
- Mobile (375px) : H1 en `text-3xl`, sous-titre en `text-base`, `px-6`, CTA full-width
- Tablet (768px) : H1 en `text-4xl`
- Desktop (1280px+) : H1 en `text-5xl md:text-6xl`, max-w-5xl

**Assets :** Éléments décoratifs CSS/SVG (formes géométriques abstraites, pas d'images lourdes).

---

### Section 2 — Ce qu'on crée (Prestations)

**Hauteur :** auto
**Layout :** Titre centré + grid 2x2 (desktop), 1 colonne (mobile). 4 blocs prestation, chacun avec un visuel/icône expressif, titre, description.
**Animations :**
- Titre : TextReveal
- Blocs : BlurReveal staggeré (0.2s)
- SpotlightCard sur chaque bloc
- Hover : translateY(-8px) + border accent, transition 700ms
- Icônes : scale 0.5 → 1 au scroll

**Contenu textuel :**

- **Titre section :** `Ce qu'on forge pour vous.`
- **Sous-titre :** `Chaque élément de votre identité est pensé comme une pièce d'un ensemble cohérent.`

**Bloc 1 — Logo**
- Icône : Pen (Lucide) — accent orange
- Titre : `Création de logo`
- Texte : `Un symbole qui vous identifie en un clin d'œil. Recherches, concepts, itérations. Votre logo est testé sur tous les supports avant validation. Déclinaisons couleur, monochrome, favicon incluses.`

**Bloc 2 — Charte graphique**
- Icône : Palette (Lucide) — accent ambre
- Titre : `Charte graphique complète`
- Texte : `Couleurs, typographies, espacements, règles d'usage. Un document de référence pour que chaque support — web, print, réseaux — soit cohérent. Votre marque parle d'une seule voix.`

**Bloc 3 — Univers visuel**
- Icône : Layers (Lucide) — accent orange
- Titre : `Univers visuel & Direction artistique`
- Texte : `Au-delà du logo et de la charte : le style photographique, les textures, les motifs, le ton visuel global. L'atmosphère qui fait que votre marque se reconnaît sans même lire le nom.`

**Bloc 4 — Papeterie digitale**
- Icône : FileText (Lucide) — accent ambre
- Titre : `Papeterie & Supports digitaux`
- Texte : `Cartes de visite, signatures email, templates réseaux sociaux, en-têtes de documents. Chaque point de contact avec vos clients porte votre identité.`

**Responsive :**
- Mobile : 1 colonne, gap-4
- Tablet : 2 colonnes, gap-6
- Desktop : 2x2 grid, gap-8, max-w-5xl centré

**Assets :** Icônes Lucide React.

---

### Section 3 — Process

**Hauteur :** auto
**Layout :** Titre centré + timeline verticale (mobile) / horizontale (desktop). 4 étapes. Ligne connectrice animée.
**Animations :**
- Titre : TextGradientReveal
- Timeline : stroke-dashoffset animé au scroll
- Étapes : BlurReveal staggeré (0.3s)
- Numéros : NumberMorphing

**Contenu textuel :**

- **Badge :** `NOTRE PROCESS`
- **Titre section :** `De la première idée à votre marque. Étape par étape.`
- **Sous-titre :** `Un process structuré, transparent, et collaboratif. Vous êtes impliqué à chaque décision.`

**Étape 1**
- Numéro : `01`
- Titre : `Immersion`
- Texte : `On plonge dans votre univers. Votre histoire, votre marché, vos concurrents, votre audience. On identifie ce qui vous rend unique. C'est la fondation de tout.`

**Étape 2**
- Numéro : `02`
- Titre : `Exploration créative`
- Texte : `Recherches, moodboards, pistes graphiques. On explore plusieurs directions. L'IA accélère l'idéation, l'œil de 20 ans de direction créative sélectionne. Vous choisissez la direction qui vous parle.`

**Étape 3**
- Numéro : `03`
- Titre : `Création & Itération`
- Texte : `On développe la direction choisie. Logo, couleurs, typographies, applications. Retours illimités à chaque étape. On affine jusqu'à ce que chaque détail soit juste.`

**Étape 4**
- Numéro : `04`
- Titre : `Livraison`
- Texte : `Fichiers sources, charte graphique documentée, déclinaisons tous formats. Tout est prêt pour être utilisé — web, print, réseaux sociaux. Votre marque est prête à briller.`

**Responsive :**
- Mobile : Timeline verticale, stack, `px-6`
- Tablet : Timeline horizontale, 2x2 grid
- Desktop : 4 en row, max-w-6xl centré

**Assets :** Aucun.

---

### Section 4 — Portfolio Identités Visuelles

**Hauteur :** auto
**Layout :** Titre centré + grid de visuels (identités visuelles créées). Chaque item = composition visuelle (logo + couleurs + typo) dans un cadre élégant. 2 colonnes desktop, 1 colonne mobile.
**Animations :**
- Titre : TextReveal
- Items : BlurReveal staggeré (0.2s)
- Hover : scale(1.03) + glow subtil, transition 700ms
- Léger parallax au scroll sur les visuels

**Contenu textuel :**

- **Badge :** `NOS CRÉATIONS`
- **Titre section :** `Des identités qui marquent.`
- **Sous-titre :** `Chaque marque a sa propre lumière. Voici celles qu'on a révélées.`

**Portfolio items :** *(data-driven, les items seront ajoutés dynamiquement)*
- Item template : composition visuelle (mockup logo sur supports), nom de la marque, secteur d'activité, description courte (1 phrase)
- Minimum 3 items, idéalement 6

**Note :** Si pas assez de réalisations identité visuelle propres, utiliser les identités créées par Fabien chez Le Prisme (avec mention "Direction créative : Fabien Estrade — Le Prisme").

**Responsive :**
- Mobile : 1 colonne, gap-6
- Desktop : 2 colonnes (ou masonry layout), gap-8, max-w-6xl centré

**Assets :** Visuels d'identités créées dans `/images/identite-visuelle/portfolio/`.

---

### Section 5 — Pourquoi Aurentia (Craft + IA)

**Hauteur :** auto
**Layout :** Titre centré + 2 colonnes (desktop) avec texte à gauche et éléments visuels à droite, stack vertical mobile.
**Animations :**
- Titre : TextGradientReveal
- Blocs texte : BlurReveal staggeré (0.2s)
- Citation Fabien : fade-in + scale depuis 0.95, delay, border-left accent
- Photo/visuel : parallax léger au scroll

**Contenu textuel :**

- **Titre section :** `20 ans de direction créative. L'IA en plus.`
- **Sous-titre :** `Ce qui fait la différence entre un logo et une identité.`

**Bloc 1 — L'expertise**
- Titre : `L'œil qui forge`
- Texte : `Fabien a dirigé l'agence Le Prisme pendant 20 ans. Des centaines de marques créées, forgées, accompagnées. Il sait reconnaître le trait qui fonctionne, la couleur qui convertit, l'identité qui dure. Ce n'est pas un algorithme qui valide — c'est 20 ans de craft.`

**Bloc 2 — L'IA**
- Titre : `L'IA qui accélère l'exploration`
- Texte : `L'intelligence artificielle multiplie les pistes créatives. Plus de concepts explorés, plus vite. Mais chaque choix passe par l'œil humain. L'IA propose, l'expertise dispose. Le résultat : un process plus riche, sans compromis sur la qualité.`

**Citation (highlight visuel, grande typo) :**
`"Une identité visuelle, c'est pas un joli logo. C'est le premier contact entre votre business et le monde. Il doit être parfait."` — Fabien Estrade, 20 ans de direction créative

**Lien discret :** `Découvrir toute l'équipe →` vers `/a-propos`

**Responsive :**
- Mobile : Stack vertical, `px-6`, `text-base`
- Desktop : 2 colonnes (texte 60% / visuel 40%), max-w-5xl centré, `text-lg`

**Assets :** Photo de Fabien (`/images/team/fabien.webp`) ou composition visuelle.

---

### Section 6 — Tarifs

**Hauteur :** auto, min-h-[40vh]
**Layout :** Centré, max-w-3xl. Pas de packs détaillés — c'est sur devis. Un bloc explicatif avec ce qui influence le prix + CTA.
**Animations :**
- Titre : TextGradientReveal
- Bloc : SpotlightCard, BlurReveal
- Items liste : slide-in staggeré depuis la gauche

**Contenu textuel :**

- **Badge :** `TARIFS`
- **Titre section :** `Sur devis. Parce que chaque projet est unique.`
- **Texte :** `Le prix dépend de l'ampleur du projet. Un logo seul, une charte complète, un univers de marque total — chaque besoin est différent. On en discute ensemble, on cadre le périmètre, on vous fait un devis clair.`

**Ce qui influence le prix :**
- Nombre de pistes créatives explorées
- Étendue de la charte (logo seul vs. charte complète vs. univers total)
- Nombre de supports déclinés (cartes de visite, réseaux, papeterie...)
- Création de contenu complémentaire (shooting photo, rédaction)

**Garantie :** `Retours illimités jusqu'à validation. On ne livre que du parfait.`

**CTA secondaire :** `Demander un devis` → cal.com/aurentia

**Mention cross-sell :** `Identité visuelle + site vitrine ? On propose des offres combinées. Parlez-en lors du call.` → lien vers `/sites-vitrines`

**Responsive :**
- Mobile : `px-6`, `text-base`
- Desktop : `max-w-3xl mx-auto`, `text-lg`

**Assets :** Aucun.

---

### Section 7 — FAQ

**Hauteur :** auto
**Layout :** Titre centré + accordéon (max-w-3xl centré).
**Animations :**
- Titre : TextReveal
- Items : BlurReveal staggeré (0.1s)
- Open/close : height auto, transition 700ms ease-in-out
- Chevron rotation 180deg, transition 500ms

**Contenu textuel :**

- **Titre section :** `Questions fréquentes.`

**Q1 :** `Combien coûte une identité visuelle ?`
**R1 :** `Ça dépend du périmètre. Un logo seul, une charte complète ou un univers de marque total — chaque projet est différent. On cadre ensemble vos besoins et on vous fait un devis clair, sans surprise.`

**Q2 :** `Combien de temps prend la création ?`
**R2 :** `Comptez 1 à 3 semaines selon le périmètre. La phase d'exploration prend le temps nécessaire — on ne précipite pas la direction créative. L'IA accélère l'idéation, mais c'est l'œil humain qui tranche.`

**Q3 :** `Combien de propositions de logo recevrai-je ?`
**R3 :** `Minimum 3 pistes créatives distinctes. On explore des directions variées pour être sûr de trouver celle qui vous correspond. Retours et itérations illimités sur la piste choisie.`

**Q4 :** `Je n'ai aucune idée de ce que je veux. C'est un problème ?`
**R4 :** `C'est même mieux. La phase d'immersion est faite pour ça. On explore votre marché, vos concurrents, vos valeurs. On vous propose des directions que vous n'auriez pas imaginées. C'est notre métier depuis 20 ans.`

**Q5 :** `Quels fichiers recevrai-je à la fin ?`
**R5 :** `Fichiers vectoriels (AI, SVG, PDF), formats web (PNG, WEBP), déclinaisons couleur et monochrome, favicon, charte graphique documentée en PDF. Tout est organisé et prêt à l'emploi.`

**Q6 :** `Vous pouvez aussi créer mon site web ?`
**R6 :** `Oui. C'est même notre spécialité. On propose des offres combinées identité visuelle + site vitrine. Votre site est forgé dans la continuité directe de votre identité — cohérence totale.`
- Lien dans R6 vers `/sites-vitrines`

**Responsive :**
- Mobile : Full-width, `px-6`, `text-base`
- Desktop : `max-w-3xl mx-auto`, `text-lg`

**Assets :** Aucun.

---

### Section 8 — CTA Final

**Hauteur :** min-h-[50vh], centré verticalement
**Layout :** Centré, fond dark intense avec gradient mesh déployé (glow ambre + rose subtil). Tonalité plus "craft" que les autres CTA du site.
**Animations :**
- Titre : TextGradientReveal
- Sous-titre : BlurReveal, delay 0.3s
- Bouton CTA : scale 0.9 → 1, glow pulse, magnetic button (GSAP)
- Preuves : fade-in staggeré (0.1s)
- Background : gradient mesh intensité maximale

**Contenu textuel :**

- **Titre :** `Prêt à forger votre identité ?`
- **Sous-titre :** `20 minutes pour comprendre votre projet, votre vision, vos ambitions. On vous présente notre approche et un premier cadrage. Gratuit, sans engagement.`
- **CTA Button :** `Discuter de mon projet` → cal.com/aurentia
- **Preuves (sous le bouton) :**
  - `Gratuit et sans engagement`
  - `20 ans de direction créative`
  - `Retours illimités jusqu'à perfection`

**Responsive :**
- Mobile : `text-2xl` pour le titre, `px-6`, bouton full-width
- Desktop : `text-4xl md:text-5xl`, bouton auto-width

**Assets :** Aucun.

---

## 4. Spécifications techniques

### Composants React à créer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `IdentiteVisuelleHero` | `src/components/identite-visuelle/IdentiteVisuelleHero.tsx` | — | Badge + H1 + sous-titre + CTA. Utilise TextReveal, BlurReveal, MagneticButton. Éléments décoratifs géométriques. |
| `IdentiteVisuellePrestations` | `src/components/identite-visuelle/IdentiteVisuellePrestations.tsx` | — | Grid 2x2 prestations. Utilise SpotlightCard, BlurReveal. |
| `IdentiteVisuelleProcess` | `src/components/identite-visuelle/IdentiteVisuelleProcess.tsx` | — | Timeline 4 étapes. Utilise NumberMorphing, BlurReveal. |
| `IdentiteVisuellePortfolio` | `src/components/identite-visuelle/IdentiteVisuellePortfolio.tsx` | — | Grid de réalisations identité visuelle. BlurReveal, parallax. |
| `IdentiteVisuelleDiff` | `src/components/identite-visuelle/IdentiteVisuelleDiff.tsx` | — | Expertise Fabien + IA. BlurReveal, citation highlight. |
| `IdentiteVisuelleTarifs` | `src/components/identite-visuelle/IdentiteVisuelleTarifs.tsx` | — | Bloc tarifs sur devis. SpotlightCard, BlurReveal. |
| `IdentiteVisuelleFAQ` | `src/components/identite-visuelle/IdentiteVisuelleFAQ.tsx` | — | Accordéon FAQ. Réutilise le pattern de HomeFAQ. |
| `IdentiteVisuelleCTA` | `src/components/identite-visuelle/IdentiteVisuelleCTA.tsx` | — | CTA final. Réutilise le pattern de HomeCTA. |

### Page route

**Fichier :** `src/app/identite-visuelle/page.tsx`

```tsx
// Structure
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { IdentiteVisuelleHero } from "@/components/identite-visuelle/IdentiteVisuelleHero";
import { IdentiteVisuellePrestations } from "@/components/identite-visuelle/IdentiteVisuellePrestations";
import { IdentiteVisuelleProcess } from "@/components/identite-visuelle/IdentiteVisuelleProcess";
import { IdentiteVisuellePortfolio } from "@/components/identite-visuelle/IdentiteVisuellePortfolio";
import { IdentiteVisuelleDiff } from "@/components/identite-visuelle/IdentiteVisuelleDiff";
import { IdentiteVisuelleTarifs } from "@/components/identite-visuelle/IdentiteVisuelleTarifs";
import { IdentiteVisuelleFAQ } from "@/components/identite-visuelle/IdentiteVisuelleFAQ";
import { IdentiteVisuelleCTA } from "@/components/identite-visuelle/IdentiteVisuelleCTA";

// Metadata export pour Next.js (title, description, openGraph, jsonLd)
```

### Composants existants réutilisés

- `TextReveal` — animation mot par mot (GSAP SplitText)
- `TextGradientReveal` — mots passent de dim à gradient au scroll
- `BlurReveal` — blur 10px → 0 au scroll
- `SpotlightCard` — radial-gradient suit la souris
- `MagneticButton` — bouton qui attire le curseur
- `CalModal` — modal de booking Cal.com

### Data structures

```typescript
// src/data/identite-visuelle-content.ts

export interface PrestationBlock {
  icon: string; // nom Lucide
  title: string;
  text: string;
}

export interface IdentiteProcessStep {
  number: string;
  title: string;
  text: string;
}

export interface IdentitePortfolioItem {
  image: string; // path composition visuelle
  brandName: string;
  sector: string;
  description: string;
  credit?: string; // ex: "Direction créative : Fabien Estrade — Le Prisme"
}

export interface IdentiteFAQItem {
  question: string;
  answer: string;
  link?: { text: string; href: string };
}
```

### Dépendances / intégrations

- **Cal.com** : event type général `cal.com/aurentia` (pas de type spécifique identité visuelle pour l'instant)
- **Images** : portfolio identité visuelle dans `/images/identite-visuelle/portfolio/`, photo Fabien dans `/images/team/fabien.webp`
- **Animations** : composants existants (`src/components/animations/`)
- **Lucide React** : icônes (Pen, Palette, Layers, FileText, ChevronDown, Check)

---

## 5. Récapitulatif — Checklist pré-implémentation

```
[ ] Hero avec headline craft/artisanal + CTA cal.com/aurentia
[ ] 4 prestations en grid (logo, charte, univers, papeterie digitale)
[ ] Process en 4 étapes (immersion, exploration, création, livraison)
[ ] Portfolio d'identités visuelles (data-driven, min 3 items)
[ ] Section "Pourquoi nous" orientée craft + 20 ans + IA
[ ] Citation Fabien en highlight visuel
[ ] Tarifs sur devis (pas de prix fixe) avec facteurs de prix
[ ] Cross-sell vers /sites-vitrines (offres combinées)
[ ] FAQ 6 questions avec lien interne vers /sites-vitrines
[ ] CTA final avec magnetic button et preuves
[ ] Tonalité plus "craft/direction artistique" que les pages tech
[ ] Voix "on" (équipe), premium, confiant, direct
[ ] Aucun mot interdit
[ ] Mots de marque : forger, révéler, craft, sur-mesure, lumière, potentiel
[ ] Minimum text-sm, aucun text-xs
[ ] Transitions ≥ 500ms, ease-in-out
[ ] Dark/Light : tokens sémantiques uniquement
[ ] Pas de position: sticky / pin: true
[ ] Animations scroll-triggered sur chaque section
[ ] Mobile-first responsive (375px → 768px → 1280px)
[ ] 1 seul H1
[ ] Schema JSON-LD (Service + BreadcrumbList)
[ ] Liens internes : /sites-vitrines, /a-propos
[ ] Chaque paragraphe < 4 lignes
```

---

*PRD — Pages /sites-vitrines et /identite-visuelle — Aurentia Agency — Mars 2026*
