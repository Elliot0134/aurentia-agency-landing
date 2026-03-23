# PROMPT ANTIGRAVITY -- Site Aurentia Agency

Copie-colle le prompt ci-dessous dans Antigravity. Il contient TOUT.

---

```
Tu es un developpeur front-end expert en creation de sites web spectaculaires, specialise en Next.js, GSAP, Framer Motion, et Tailwind CSS. Tu vas creer le site web d'Aurentia Agency -- une agence tech qui cree des sites vitrines, des applications SaaS, et des landing pages, propulses par l'IA.

---

## CONTEXTE DU PROJET

### L'entreprise
Aurentia Agency est une agence tech IA fondee par 3 personnes :
- **Elliot** (CEO, IA & Design) -- specialiste IA, visage commercial
- **Fabien** (Production Lead) -- 20 ans de creation web, pere d'Elliot
- **Mathieu** (Dev Senior) -- developpeur, co-decisionnaire

### Ce que fait l'agence (3 offres)
1. **Sites vitrines** -- Sites uniques livres en 48h, zero template, SEO integre, pour differentes niches (conciergeries, restaurants, salles de sport, hotels, etc.)
2. **Applications SaaS** -- Developpement d'apps web completes (dashboards, portails clients, outils metier)
3. **Landing pages SaaS** -- Pages de conversion haute performance pour des produits SaaS

### Le positionnement
"On cree des experiences digitales uniques -- sites vitrines, applications SaaS, et landing pages -- propulsees par l'IA et 20 ans d'expertise web. Livre en 48h pour les sites vitrines. Zero template. Design sur-mesure."

### L'innovation cle (pour les sites vitrines)
Aurentia genere automatiquement le site du prospect AVANT le call de closing. Le prospect voit SON site (design personnalise, fonctionnel) + un audit de ses concurrents + des recommandations SEO -- le tout AVANT de payer un centime. Aucune agence ne fait ca.

### Le nom "Aurentia"
Le nom se decompose en 3 racines : AUR (du latin aurum/aurora = lumiere, qualite) + ENT (entreprise, croissance) + IA (Intelligence Artificielle). Tagline : "Du potentiel a la lumiere." Il y a une section dediee dans la landing page pour expliquer cette etymologie de maniere spectaculaire.

---

## ARCHITECTURE DU SITE

```
aurentia.agency/                -> HOME (presentation agence tech globale)
aurentia.agency/conciergeries   -> Sous-page niche conciergeries (ONE-PAGE)
aurentia.agency/restaurants     -> Sous-page niche restaurants (plus tard)
aurentia.agency/saas            -> Sous-page offre SaaS (plus tard)
```

### A CONSTRUIRE MAINTENANT :
1. **La HOME** (aurentia.agency/) -- Presentation de l'agence, les 3 offres, l'equipe, le process, portfolio, CTA
2. **La page /conciergeries** -- One-page dediee a la niche conciergeries avec contenu specifique

Les deux pages partagent le meme design system, la meme navbar, le meme footer. Mais le contenu et les angles sont differents :
- **HOME** = "on est une agence tech qui fait des trucs de fou" (impression tech, SaaS, premium)
- **/conciergeries** = "votre site pro en 48h pour moins de 1 000E" (angle ROI, commissions, visibilite)

---

## DIRECTION ARTISTIQUE -- "AURORA WORKSPACE"

### Le concept
Le site utilise le concept "Aurora Workspace" -- un mix de deux univers :
1. **L'Aurore Abstraite** -- gradient mesh fluides et abstraits (style Stripe/Raycast), representant l'energie de l'IA
2. **Le Workspace 3D** -- objets 3D legers, composants UI flottants, formes geometriques abstraites qui reagissent au scroll et a la souris

### Le scroll narratif (CRUCIAL)
La page raconte une histoire en 3 actes au scroll :

**Acte 1 -- Le Noir (Hero + Probleme)** : Fond sombre, gradient mesh minimal, composants grisatres/fade/monochromes, objets 3D statiques et a peine visibles. Le business est invisible.

**Acte 2 -- L'Aube (Solution + Innovation + Process)** : Le gradient mesh se deploie, les couleurs emergent progressivement, les composants prennent vie, les objets 3D commencent a flotter et reagir. Le blur reveal s'active -- les elements passent de flous a nets.

**Acte 3 -- La Lumiere (Portfolio + Pricing + CTA)** : Gradient mesh spectaculaire, tout est colore et vivant, bento grid animee, spotlight cards, parallax total, objets 3D en mouvement complet. La transformation est accomplie.

### Dark mode / Light mode (OBLIGATOIRE)
Le site DOIT supporter les deux themes. Prepare un systeme complet avec :
- Toggle dark/light dans la navbar (icone soleil/lune)
- Variables CSS pour TOUTES les couleurs (via CSS custom properties)
- `prefers-color-scheme` comme detection initiale
- Stockage de la preference en localStorage
- Transition douce (0.3s) entre les themes
- Dark mode par defaut

**Structure des variables CSS (le proprietaire fournira ses couleurs exactes via tw-cn plus tard) :**
```css
:root {
  /* Light mode */
  --background: #ffffff;
  --background-alt: #f8f9fa;
  --foreground: #111111;
  --foreground-muted: #666666;
  --accent-primary: #ff592b;
  --accent-secondary: #ffa101;
  --glass-bg: rgba(0, 0, 0, 0.03);
  --glass-border: rgba(0, 0, 0, 0.06);
  --card-bg: rgba(0, 0, 0, 0.02);
  /* ... etc */
}

[data-theme="dark"] {
  /* Dark mode */
  --background: #0a0a0a;
  --background-alt: #111111;
  --foreground: #ffffff;
  --foreground-muted: #a1a1a1;
  --accent-primary: #ff592b;
  --accent-secondary: #ffa101;
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.06);
  --card-bg: rgba(255, 255, 255, 0.03);
  /* ... etc */
}
```

**IMPORTANT** : TOUTES les couleurs doivent passer par ces variables. Jamais de couleur en dur dans les composants.

### Couleurs
- **Accent primaire** : Orange (#ff592b) -- CTA, highlights (identique dans les 2 themes)
- **Accent secondaire** : Dore/ambre (#ffa101) -- badges, etoiles
- **Couleurs Aurora (fond uniquement)** : Rose (#ff2d7c), Violet (#7c3aed), Cyan (#06b6d4) -- JAMAIS dans les composants UI
- **Typographie** : Inter (bold/black pour headlines, regular pour body), JetBrains Mono pour chiffres/metriques

---

## EFFETS ET ANIMATIONS (TOUS OBLIGATOIRES)

### Animations principales

**1. Smooth scroll (Lenis)**
- Lenis pour un defilement butter-smooth
- Integre avec GSAP ScrollTrigger

**2. Curseur personnalise (GSAP)**
- Cercle lumineux ~20px qui suit la souris avec un leger delay (lerp 0.15)
- Sur les CTA : s'agrandit a ~60px, devient semi-transparent accent
- Mix-blend-mode: difference
- DESACTIVE sur mobile/tablette tactile

**3. Magnetic Buttons (GSAP)**
- Les boutons CTA "attirent" le curseur quand il s'approche (~100px de rayon d'influence)
- Le bouton se deforme/translate subtilement vers la position de la souris
- Retour elastique quand la souris s'eloigne
- Ajoute une sensation ultra-premium aux interactions

**4. Spotlight Cards (CSS radial-gradient)**
- Un effet de lumiere (radial-gradient clair) qui suit la souris a l'interieur des cards
- Comme une lampe torche qui eclaire la surface -- metaphore "reveler/lumiere"
- Subtil en dark mode (radial-gradient blanc a 5-8% opacite), plus marque en light mode
- Reference : Raycast.com, Stripe.com

**5. Staggered Blur Reveal (GSAP ScrollTrigger)**
- Les elements qui apparaissent au scroll passent de flou a net
- filter: blur(10px) -> blur(0) combine avec un leger scale(0.95->1) et translate
- Effet cinematique, comme si la vision se focalisait sur l'element
- Stagger entre elements d'un meme groupe (0.1-0.15s)

**6. Text Gradient Reveal (GSAP ScrollTrigger)**
- Les headlines se "remplissent" de couleur mot par mot au scroll
- Le texte commence en gris dim (#666), puis chaque mot passe en gradient orange->ambre ou en blanc au fur et a mesure du scroll
- Effet hypnotisant, renforce le concept "fade -> colore"
- Reference : Apple product pages

**7. Text Reveal (GSAP SplitText)**
- Headlines : chaque mot apparait un par un (stagger 0.05s)
- Underline animee sous les mots-cles importants

**8. Parallax Depth Layers (GSAP ScrollTrigger)**
- 3 a 4 couches a des vitesses differentes dans chaque section
- Couche 1 (fond) : gradient mesh aurora -- bouge lentement
- Couche 2 (mid) : objets 3D flottants, formes geometriques -- vitesse moyenne
- Couche 3 (front) : contenu texte et cards -- vitesse normale
- Cree une vraie sensation de profondeur sans Three.js

**9. Objets 3D flottants (CSS 3D + GSAP)**
- Formes geometriques abstraites : spheres, cubes arrondis, tores, anneaux
- En CSS 3D (transform: rotateX/Y/Z, perspective) ou SVG anime
- Flottent avec une animation douce (translateY oscillant, rotation lente)
- Reagissent au scroll (rotation s'accelere) et a la souris (parallax leger)
- Couleurs : monochromes dans l'Acte 1, prennent les couleurs accent dans l'Acte 3

**10. Gradient Mesh anime (CSS ou Canvas leger)**
- Background : 3-4 orbes de couleur qui se deplacent lentement (cycle 15-20s)
- S'intensifie au scroll (Acte 1 = subtil, Acte 3 = spectaculaire)
- Couleurs aurora : rose, violet, cyan (jamais dans les composants)

**11. Animated Bento Grid**
- Pour la section Services ou Features
- Grille style Apple ou chaque cellule a des tailles differentes
- Chaque cellule a sa propre micro-animation au hover ou a l'entree en viewport :
  - Une cellule montre du code qui s'ecrit en live (typing effect)
  - Une autre un design qui passe de gris a colore
  - Une autre un graphique/chart qui monte
  - Une autre un mockup avec tilt effect
- Stagger a l'entree, hover effect par cellule

**12. Number Morphing**
- Au lieu de simples counters qui montent, les chiffres "morphent" avec un effet slot machine vertical
- Chaque digit slide independamment de haut en bas
- Plus sophistique qu'un countUp classique

**13. Marquee infini**
- Bande horizontale qui defile en continu avec les technos utilisees OU les mots-cles de marque
- "Sur-mesure . Propulse par l'IA . 48h . Perfection . Accessible . Zero template"
- Glassmorphism leger sur la bande + blur/fade aux extremites (mask-image)
- Vitesse constante, pause au hover

**14. Smooth Section Transitions**
- Entre certaines sections, une forme SVG animee fait la transition
- Wave, curtain, ou diagonale -- pas juste un cut brutal entre deux fonds differents
- Donne une fluidite organique a la page

**15. Navbar glassmorphism progressif**
- Au top : COMPLETEMENT transparente
- Au scroll : glassmorphism progressif (backdrop-blur + bg semi-transparent)
- Active state sur le lien de la section courante

**16. Hover Effects Premium**
- Cards : translateY(-8px) + spotlight effect + border plus visible, transition 0.3s
- Boutons CTA : glow intensifie + scale(1.02) + magnetic
- Liens : underline qui se dessine de gauche a droite

**17. Micro-interactions**
- Scroll indicator (chevron anime en bas du hero)
- Progress bar en haut de page (fine ligne accent qui avance avec le scroll)
- Bouton retour en haut (glassmorphism, apparait a 50% scroll)
- Toggle dark/light mode avec animation de transition

---

## GLASSMORPHISM -- REGLE D'UTILISATION

Le glassmorphism est un ACCENT, pas un systeme. Il est utilise par touches :

**OUI (glassmorphism)** :
- Navbar (au scroll)
- Pricing card "Recommande" (celle qui doit ressortir)
- Certains badges premium
- Sections avec gradient aurora en fond (la transparence revele les couleurs)
- Le marquee

**NON (pas de glassmorphism, utiliser spotlight cards ou solid)** :
- Pas TOUTES les cards de la page
- Pas les accordeons FAQ
- Pas tous les inputs
- Pas les sections sur fond uni sans aurora

---

## INSPIRATIONS (OBLIGATOIRE : viser ce niveau de qualite)

**References Awwwards :**
- https://www.awwwards.com/sites/phantom-land -- transitions fluides, dark, scroll storytelling
- https://www.awwwards.com/sites/studio-null -- dark theme agency, typographie bold
- https://www.awwwards.com/sites/leoleo -- animations scroll avancees GSAP
- https://www.awwwards.com/sites/fiddle-digital-design-agency -- agency portfolio interactif
- https://www.awwwards.com/websites/parallax/ -- Collection parallax
- https://www.awwwards.com/websites/gsap/ -- Collection GSAP

**References SaaS/Tech (pour le style) :**
- https://linear.app -- dark theme ultra-clean, bento grid, animations subtiles
- https://vercel.com -- hero impactant, gradients mesh, parallax
- https://stripe.com -- gradient mesh, spotlight cards, animations fluides
- https://framer.com -- scroll animations, magnetic buttons, composants animes
- https://raycast.com -- dark, glassmorphism, glow effects, spotlight hover
- https://resend.com -- dark minimaliste, gradients, typo forte

**References Interactions :**
- https://ui.aceternity.com -- Aurora background, spotlight effect, bento grid, animated components
- Apple.com (pages produit) -- bento grid, text reveal au scroll, parallax multi-couches

**Galeries :**
- https://saaspo.com/ -- sites SaaS
- https://madewithgsap.com/ -- animations GSAP
- https://www.dark.design/ -- dark mode design

Le resultat doit etre niveau Awwwards. Un site qui fait dire "putain c'est beau" ET qui ne crash pas les PC.

---

## PAGE 1 -- HOME (aurentia.agency/)

La home presente l'agence dans sa globalite. L'ambiance est TECH, PREMIUM, pas "petite agence locale".

### SECTION 0 -- NAVBAR (sticky, partagee entre toutes les pages)
- Logo Aurentia Agency (gauche)
- Navigation : Services . Process . Equipe . Portfolio . Contact (smooth scroll)
- Toggle dark/light mode (icone soleil/lune)
- CTA bouton accent : "Reserver un call ->" (magnetic button)
- Glassmorphism progressif au scroll

### SECTION 1 -- HERO (100vh)
**ACTE 1 DU SCROLL NARRATIF : tout est fade, grisatre, minimal**

Headline (text-reveal + text gradient reveal au scroll) :
"On cree des experiences digitales. Propulsees par l'IA."

Sous-titre :
"Sites vitrines, applications SaaS, landing pages -- design sur-mesure, zero template, livres a une vitesse qui n'existe nulle part ailleurs. Et on vous montre le resultat AVANT que vous payiez."

CTA principal : "Decouvrir nos services ->" (accent, glow, magnetic)
CTA secondaire : "Voir nos realisations" (fleche animee)

Visuels :
- 3 mockups en perspective 3D (un site vitrine + un dashboard SaaS + une landing page) avec tilt effect
- Les mockups commencent GRIS/FADE et se colorent au scroll (Living Blueprint)
- Gradient mesh anime en background (subtil, Acte 1)
- Objets 3D geometriques flottants (subtils, monochromes)
- Badges glassmorphism : "Livre en 48h" . "IA + 20 ans d'expertise" . "Zero template"
- Stats avec number morphing : "X projets livres . 48h livraison . 100% satisfaction"
- Parallax depth layers (fond aurora / objets 3D mid / contenu front)

### SECTION 2 -- MARQUEE
Bande defilante infinie : "Sur-mesure . Propulse par l'IA . 48h . Perfection . Accessible . Zero template . Design unique . SEO integre"

### SECTION 3 -- SERVICES (Animated Bento Grid)
Titre : "Tout ce dont votre business a besoin."

Bento Grid animee avec cellules de tailles differentes :

**Grande cellule -- Sites Vitrines**
"Un site professionnel unique, livre en 48h. SEO integre, responsive, animations."
Micro-animation : mockup qui passe de wireframe gris a site colore
CTA : "Voir l'offre Sites ->" | A partir de 900E

**Grande cellule -- Applications SaaS**
"Votre application web sur-mesure. Dashboards, portails clients, outils metier."
Micro-animation : code qui s'ecrit en live (typing effect)
CTA : "Discutons de votre projet ->" | Sur devis

**Cellule moyenne -- Landing Pages**
"Des pages de conversion qui transforment les visiteurs en clients."
Micro-animation : graphique de conversion qui monte
CTA : "Voir des exemples ->" | A partir de 1 500E

**Petites cellules** : Stats / technos / badges animes

### SECTION 4 -- L'INNOVATION (le differenciateur)
**Transition vers ACTE 2 : les couleurs commencent a emerger**

Titre (sticky gauche, scroll droit) : "On vous montre le resultat AVANT que vous payiez."
Sous-titre : "Aucune agence ne fait ca."

3 elements en scroll horizontal avec blur reveal :
1. Votre projet -- design personnalise, fonctionnel, deja en ligne
2. Votre audit -- analyse de votre marche + benchmark concurrents
3. Vos recommandations -- strategie + actions prioritaires

"Vous ne reflechissez plus a 'est-ce que ca vaut le coup'. Vous reflechissez a 'qu'est-ce que je veux changer'."

### SECTION 5 -- EXPLICATION DU NOM "AURENTIA"
**Section spectaculaire et unique**

Animation : les 3 composantes du nom apparaissent separement avec des effets 3D, puis se rejoignent :
- **AUR** s'illumine avec un glow dore (lumiere, qualite premium)
- **ENT** se construit piece par piece (entreprise, croissance)
- **IA** pulse avec une energie aurora (intelligence artificielle)

Les 3 se combinent pour former "AURENTIA" avec un flash lumineux.
Sous-titre : "L'aube doree de l'entreprise, propulsee par l'Intelligence Artificielle."
Tagline en grand : "Du potentiel a la lumiere."

### SECTION 6 -- COMMENT CA MARCHE
Titre : "Du brief au lancement. Voici comment."

Timeline visuelle (ligne qui se dessine au scroll) :
1. "On echange" -- call gratuit, on comprend vos besoins, on prepare un apercu
2. "On cree" -- design unique, developpement, iterations. 48h pour les sites vitrines.
3. "On lance" -- mise en production, domaine, SEO, formation si besoin
4. "On accompagne" -- maintenance, support, evolutions, rapports

### SECTION 7 -- L'EQUIPE
**ACTE 2 en plein deploiement : couleurs presentes, elements vivants**

Titre : "L'alliance de l'IA et de 20 ans d'expertise."

3 cartes avec spotlight effect :
- Fabien -- "20 ans de creation web. La rigueur, le craft, l'experience."
- Elliot -- "IA et design. La vitesse, l'innovation, la vision."
- Mathieu -- "Developpement senior. La securite, la performance, la fiabilite."

Promesse (oversize, text gradient) : "Tant que c'est pas parfait, on ne lance pas."

### SECTION 8 -- PORTFOLIO
**ACTE 3 : tout est colore, vivant, spectaculaire**

Titre : "Nos dernieres realisations."
- Grid de projets (mockups avec hover zoom + tilt + spotlight + tag : "Site Vitrine", "SaaS", "Landing Page")
- Counters avec number morphing : projets livres, delai moyen, satisfaction

### SECTION 9 -- NICHES (liens vers les sous-pages)
Titre : "On parle votre langue."
Cards pour chaque niche avec CTA vers la sous-page :
- Conciergeries -> /conciergeries
- Restaurants -> (bientot)
- Salles de sport -> (bientot)
- SaaS -> (bientot)

### SECTION 10 -- CTA FINAL
Titre (oversize, text gradient reveal) : "Pret a voir ce qu'on peut faire pour vous ?"
Sous-titre : "Apercu personnalise + audit + recommandations. 100% gratuit."
CTA : "Reserver mon call gratuit ->" (glow pulsant, magnetic button)
Preuves : Gratuit . On vous montre VOTRE projet . Vous gardez l'audit
Gradient mesh aurora a son maximum d'intensite

### SECTION 11 -- FOOTER
Logo + Services + Niches + Mentions legales + CGV + Confidentialite + Instagram + LinkedIn + Email + Telephone
"(c) 2026 Aurentia Agency"

---

## PAGE 2 -- /conciergeries (one-page niche)

Meme design system que la home, mais contenu 100% oriente conciergeries. L'angle change : ici c'est ROI, commissions Airbnb, visibilite Google, credibilite proprietaires.

### SECTION 0 -- NAVBAR (identique a la home)

### SECTION 1 -- HERO
Headline : "Votre site professionnel en 48h. Par l'IA. Moins de 1 000E."
Sous-titre : "Un site unique pour votre conciergerie -- pas un template. Design sur-mesure, SEO integre, livre en 48h. Et on vous le montre AVANT que vous payiez."
CTA : "Voir ce qu'on peut faire pour vous ->"
Mockup site conciergerie (tilt 3D) + badges + stats (number morphing)

### SECTION 2 -- LE PROBLEME
Titre : "Vous etes un excellent gestionnaire. Mais sur Google, vous etes invisible."
3 pain points avec blur reveal :
1. Commissions Airbnb/Booking (15-20% = 7 500-10 000E/an perdus) -> counter morphing anime
2. Invisibilite Google -> faux resultat Google
3. Credibilite proprietaires -> pas de site = pas de nouveau bien
Conclusion : "Ce n'est pas un probleme de competences. C'est un probleme de visibilite."

### SECTION 3 -- LA SOLUTION (l'equipe)
Titre : "On a cree exactement ce qu'il vous manque."
3 cartes equipe (spotlight effect) + promesse oversize

### SECTION 4 -- L'INNOVATION
Titre : "On vous montre votre site AVANT que vous payiez."
Les 3 elements : site + audit + recommandations (blur reveal)

### SECTION 5 -- PROCESS
Titre : "48h du brief au site en ligne."
Timeline 3 etapes : echange -> creation -> en ligne

### SECTION 6 -- PORTFOLIO
Titre : "Ils nous ont fait confiance."
Mockups (tilt + spotlight) + counters (number morphing) + temoignages

### SECTION 7 -- PRICING
Titre : "Choisissez votre formule."
3 cartes (la "Recommande" en glassmorphism avec glow) :

**ESSENTIEL -- 900E**
Site 5 pages, design unique, responsive, animations, SEO base, lead magnet, charte graphique offerte, analyse marche offerte, livraison 48h. Abo 19E/mois.

**CROISSANCE -- 1 490E** (Recommande)
Tout l'Essentiel + blog + 4 articles SEO/mois, chatbot IA, multilingue FR/EN, integrations Airbnb/Booking, CRM Aurentia offert. Abo 35E/mois.

**PREMIUM -- Sur devis**
Tout le Croissance + reservation en ligne + back-office, logo, module avis, formation visio 1h. Abo 75E/mois.

"Paiement en 3 fois possible . 1er mois offert . Payez quand vous etes satisfait"

### SECTION 8 -- COMPARATIF
Titre : "Pourquoi pas une agence classique ?"
Tableau : Agence classique vs Freelance vs Template DIY vs Aurentia
(Prix, Delai, Design unique, SEO, Support, Voir avant de payer)

### SECTION 9 -- FAQ
8 accordeons : IA?, 48h?, prix?, Airbnb suffisant?, refonte?, satisfaction?, abonnement?, RGPD?

### SECTION 10 -- LEAD MAGNET
"Le Guide de la Visibilite en Ligne pour les Conciergeries" -- formulaire email + mockup PDF

### SECTION 11 -- CTA FINAL
"Pret a voir votre futur site ?" -- CTA booking (magnetic + glow) + preuves

### SECTION 12 -- FOOTER (identique a la home)

---

## SPECS TECHNIQUES

- **Framework** : Next.js 15+ (App Router, React 19)
- **Animations** : GSAP (ScrollTrigger, SplitText) + Framer Motion
- **Smooth scroll** : Lenis
- **Styling** : Tailwind CSS v4
- **Fonts** : Inter (via next/font/google) + JetBrains Mono
- **Theme** : Dark/Light mode via CSS custom properties + data-theme attribute + toggle
- **Performance** : PageSpeed > 90 mobile / > 95 desktop
- **SEO** : Schema markup, Open Graph, canonical URLs, sitemap
- **Responsive** : Mobile-first, animations simplifiees sur mobile, curseur custom desactive sur tactile
- **Accessibilite** : prefers-reduced-motion, contraste WCAG AA, focus states, alt texts
- **3D** : CSS transforms + GSAP uniquement. ZERO Three.js, ZERO WebGL, ZERO canvas lourd.

---

## REGLES NON-NEGOCIABLES

1. **Niveau Awwwards** -- Le design doit etre SPECTACULAIRE. Un site qui fait dire "putain c'est beau".
2. **Dark + Light mode** -- Les deux themes doivent etre beaux. TOUTES les couleurs via CSS variables.
3. **Scroll narratif** -- La page commence fade/grisatre et se colore au scroll. C'est le coeur du concept.
4. **Tous les effets listes** -- Magnetic buttons, spotlight cards, blur reveal, text gradient reveal, parallax layers, bento grid, objets 3D, marquee, number morphing, section transitions. TOUS.
5. **Glassmorphism par touches** -- Utilise uniquement sur navbar, pricing recommande, badges premium, sections avec aurora. PAS partout.
6. **60fps** -- Animations fluides. GPU-accelerated (transform + opacity only).
7. **Pas de Three.js/WebGL** -- Tout en CSS 3D + GSAP. Doit tourner sur un PC a 200 euros.
8. **Mobile-first** -- 60%+ du trafic. Parallax/tilt simplifies. Curseur custom desactive. L'effet wow reste.
9. **Ton direct** -- Pas corporate. Chiffres > mots. Phrases courtes. Humain.
10. **Modulaire** -- Les sous-pages niches partagent le meme layout/design system. On duplique /conciergeries pour /restaurants en changeant juste le contenu.
11. **CTA 3x minimum** -- "Reserver un call" dans : navbar, hero, CTA final (+ pricing sur /conciergeries).
12. **Couleurs via variables** -- JAMAIS de couleur en dur. Tout passe par les CSS custom properties.
13. **Section "Aurentia"** -- La page HOME doit contenir une section qui explique le nom (AUR+ENT+IA) de maniere spectaculaire.

---

## FICHIERS DEJA PRETS DANS LE PROJET

Le projet Next.js est deja scaffolde dans `aurentia-agency-landing/`. Tu peux t'appuyer sur :

| Fichier | Ce qu'il contient |
|---|---|
| `src/app/globals.css` | Design system complet (variables CSS, glassmorphism, glow, curseur, gradient mesh, animations) |
| `src/data/content.ts` | TOUT le texte de la page /conciergeries structure en objets TypeScript |
| `src/components/animations/LenisProvider.tsx` | Provider Lenis smooth scroll + GSAP ScrollTrigger sync |
| `src/components/animations/CustomCursor.tsx` | Curseur personnalise GSAP |
| `src/components/animations/ScrollProgress.tsx` | Barre de progression scroll |
| `src/app/layout.tsx` | Layout root avec metadata SEO, fonts Inter + JetBrains Mono |
| `package.json` | Dependances : gsap, lenis, framer-motion, lucide-react deja installees |

Tu peux reutiliser ces fichiers ou les reecrire si tu preferes -- mais le contenu texte dans `content.ts` est la source de verite pour la page /conciergeries.
```

---

*Prompt prepare le 21 mars 2026 -- Aurentia Agency*
