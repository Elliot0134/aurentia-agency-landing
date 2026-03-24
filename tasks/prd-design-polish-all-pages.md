# PRD — Design Polish & Pixel-Perfect Refonte — Toutes les pages

---

## 1. Introduction / Overview

Les 13 pages ont été implémentées fonctionnellement, mais le **niveau de design, d'animation et de polish est très en dessous de la homepage**. Les composants sont "corrects" mais génériques — il manque la personnalité visuelle Aurora Workspace, les micro-interactions, la profondeur visuelle, et la cohérence avec le standard de la home.

**Problème principal :** Les agents ont produit du code qui fonctionne mais qui ressemble à un site SaaS générique. On veut du **Linear.app / Raycast.com / Stripe.com** — moderne, épuré, des sections qui claquent, zéro zone morte.

### Écarts identifiés (code review)

| Problème | Homepage (référence) | Nouvelles pages (actuel) |
|----------|---------------------|--------------------------|
| **Hero** | Parallax multi-couches, syllabes animées, mouse tracking, marquee | Texte centré basique, 1 glow statique |
| **Sections bg** | Alternance dark/dark-alt, hero-grid, colored orbs, gradient mesh animé | Fond plat uniforme, pas de variation |
| **Profondeur** | 3-4 couches visuelles (grid, orbs, contenu, blur) | 1 seule couche (contenu) |
| **Transitions entre sections** | Gradient qui évolue, intensité qui monte au scroll | Sections juxtaposées sans transition |
| **Cards** | SpotlightCard + glassmorphism + glow + hover complexe | SpotlightCard basique, hover minimal |
| **Typographie** | Tailles massives (text-7xl), tracking tight, leading [0.95] | Tailles timides (text-5xl max), spacing standard |
| **Micro-interactions** | Magnetic buttons, cursor custom, tilt 3D, hover glow | Boutons simples, pas de tilt |
| **Espacement** | py-32 md:py-40, gap généreux, sections respirent | py-24 standard, sections serrées |

---

## 2. Goals

- Chaque page atteint le **même niveau visuel que la homepage** — on ne doit pas sentir de "drop" quand on navigue
- **Layout pixel-perfect** : tout est centré, aligné, espacé avec des marges généreuses
- **Animations continues** : pas de moment mort au scroll — chaque section a de la vie
- **Profondeur visuelle** : gradient mesh, orbs colorés, hero-grid pattern, glassmorphism dosé
- **Typographie impactante** : titres massifs (text-5xl à text-7xl), tracking tight, accents de couleur
- **Micro-interactions premium** : hover glow, tilt 3D sur les cards, magnetic buttons partout, icon animations
- **Cohérence cross-page** : même palette d'orbs, même pattern de sections, même rythme
- **Zéro bug visuel** : dark/light parfait, responsive 375→1536, pas de débordement, pas de texte coupé

---

## 3. User Stories

---

### US-D01: Design System — Shared Visual Patterns
**Description:** As a developer, I want reusable visual building blocks so that every page has consistent premium quality.

**Acceptance Criteria:**
- [ ] Créer `src/components/ui/SectionBackground.tsx` — composant réutilisable pour les fonds de section avec : colored orbs (positions, couleurs, opacité configurables), hero-grid pattern optionnel, gradient mesh optionnel
- [ ] Créer `src/components/ui/SectionDivider.tsx` — divider visuel entre sections (ligne gradient, wave SVG, ou simple fade)
- [ ] Mettre à jour les constantes visuelles dans un fichier `src/lib/design-tokens.ts` : orb colors, blur amounts, glow intensities, standard spacings
- [ ] Chaque composant fonctionne en dark ET light mode
- [ ] Typecheck passes
- [ ] **Verify in browser** : les composants s'affichent correctement isolément

---

### US-D02: /a-propos — Hero & Story polish
**Description:** As a visitor, I want the about page hero to feel as immersive as the homepage hero.

**Acceptance Criteria:**
- [ ] Hero : ajouter hero-grid pattern en arrière-plan (même que HomeTeam)
- [ ] Hero : ajouter 2-3 orbs colorés subtils (orange, ambre, violet dim)
- [ ] Hero : titre en `text-4xl md:text-5xl lg:text-6xl xl:text-7xl` avec `tracking-tighter leading-[0.95]`
- [ ] Hero : ajouter un mot accentué en gradient orange→ambre dans le H1
- [ ] Story : ajouter un divider visuel entre le hero et la story
- [ ] Story : ajouter une barre accent à gauche des paragraphes (border-l-2 accent-primary)
- [ ] Story : augmenter le spacing `py-28 md:py-36`
- [ ] **Verify in browser** : la page respire, les sections s'enchaînent avec fluidité

---

### US-D03: /a-propos — Values, Team, FatherSon polish
**Description:** As a visitor, I want the about page middle sections to feel rich and layered.

**Acceptance Criteria:**
- [ ] Values bento : ajouter des orbs colorés derrière la grille (comme HomeTeam)
- [ ] Values : icônes avec accent color (pas foreground/70 — utiliser accent-primary ou un soft glow)
- [ ] Values : card 1 (span 2) doit avoir un traitement visuel différent (glassmorphism plus prononcé, ou gradient border)
- [ ] Team : ajouter hero-grid ou orbs derrière les cards
- [ ] Team cards : ajouter tilt 3D on hover (rotation max 3-5deg, comme les cards home)
- [ ] FatherSon : la citation highlight doit avoir un fond glassmorphism + gradient border, pas juste du texte
- [ ] FatherSon : augmenter la taille de la citation (text-2xl md:text-3xl lg:text-4xl)
- [ ] Spacing entre chaque section : minimum `py-28 md:py-36`
- [ ] **Verify in browser**

---

### US-D04: /a-propos — Hackathons, Proof, Approach, Audience, CTA polish
**Description:** As a visitor, I want the about page final sections to build to a powerful crescendo.

**Acceptance Criteria:**
- [ ] Hackathons : cards avec glassmorphism + glow ambre subtil
- [ ] Proof counters : chiffres en `text-5xl md:text-6xl lg:text-7xl font-black` (plus imposants)
- [ ] Proof counters : ajouter un subtle glow/underline sous chaque chiffre
- [ ] Marquee : augmenter la taille du texte, ajouter des séparateurs visuels (dot ou slash)
- [ ] Approach : les 3 piliers doivent avoir une couleur d'accent distincte (orange, ambre, cyan) visible sur l'icône ET un subtle glow
- [ ] Audience : checkmarks avec animation bounce plus prononcée + couleur accent-primary
- [ ] CTA : gradient mesh plus intense (opacité orbs x2), titre en text-4xl md:text-5xl lg:text-6xl
- [ ] CTA : preuves avec icônes plus visibles, spacing plus généreux
- [ ] **Verify in browser** : le crescendo visuel est perceptible — les sections deviennent plus "lumineuses"

---

### US-D05: /realisations — Portfolio page polish
**Description:** As a visitor, I want the portfolio page to feel like a gallery premium.

**Acceptance Criteria:**
- [ ] Hero : ajouter hero-grid + orbs, titre en text-6xl/7xl
- [ ] Counters : chiffres massifs (text-6xl md:text-7xl), glow accent sous chaque
- [ ] Filter pills : plus gros (px-5 py-2.5), font-medium, spacing entre eux plus large
- [ ] Project cards : augmenter l'image ratio à aspect-[16/9], border-radius rounded-2xl
- [ ] Project cards : ajouter un overlay gradient au hover (du bas, pour lire le nom)
- [ ] Project cards : le texte "Découvrir →" doit avoir une animation de slide-in plus prononcée
- [ ] Interlude quote : text-4xl md:text-5xl lg:text-6xl, italic, avec guillemets décoratifs accent
- [ ] Ajouter des orbs/glows entre la grille et l'interlude
- [ ] **Verify in browser**

---

### US-D06: /realisations/[slug] — Case study polish
**Description:** As a visitor, I want each case study to feel like une pièce de portfolio premium.

**Acceptance Criteria:**
- [ ] Hero : BrowserMockup avec shadow-2xl + subtle glow accent autour
- [ ] Hero : metadata pills plus stylées (glassmorphism, icon + text)
- [ ] Context section : les 2 blocs avec des cards glassmorphism, pas du texte nu
- [ ] Solution features : icônes avec background accent/5 + glow, pas juste foreground
- [ ] Gallery : images avec shadow-xl, rounded-2xl, subtle border
- [ ] Results metrics : cards avec NumberMorph, glow accent, text-4xl md:text-5xl
- [ ] Testimonial : guillemets décoratifs en text-8xl accent, card glassmorphism
- [ ] Navigation prev/next : plus grande, avec image de couverture visible + hover scale
- [ ] **Verify in browser**

---

### US-D07: /conciergeries — Full page polish
**Description:** As a visitor, I want the main sales page to be the most impressive page du site.

**Acceptance Criteria:**
- [ ] Hero : hero-grid + orbs animés, stat cards avec glassmorphism, titre text-6xl/7xl
- [ ] Problem : cards avec glow rouge/danger subtil, icônes plus grandes (w-10 h-10)
- [ ] Solution : mockup avec tilt 3D on hover, features list avec check icons animés
- [ ] Innovation : 3 cards avec numérotation grande (01, 02, 03) + accent glow
- [ ] Process : timeline avec nodes animés (scale bounce quand ils entrent en vue)
- [ ] Pricing : card Croissance avec glassmorphism prononcé + pulsing border accent
- [ ] Comparison : Aurentia column avec background accent/5, hover row highlight
- [ ] FAQ : accordéon avec transition fluide (height + opacity), icône rotation smooth
- [ ] CTA final : gradient mesh MAXIMUM intensity, plus de glows, plus de couleur
- [ ] **Verify in browser** : la page raconte visuellement le passage du noir à la lumière

---

### US-D08: /sites-vitrines — Full page polish
**Description:** As a visitor, I want the sites vitrines page to clearly communicate "on fait du premium pour pas cher".

**Acceptance Criteria:**
- [ ] Hero : hero-grid + orbs, title accent gradient sur "sur-mesure" et "48h"
- [ ] Features bento : cards avec tailles variées (pas toutes identiques), card 1 span-2 avec micro-animation interne
- [ ] Process : timeline avec ligne animée au scroll (draw effect), nodes avec bounce
- [ ] Niches : card conciergeries avec border gradient animé (shimmer), les autres avec hover glow
- [ ] Pricing : card avec big number "900€" en gradient, glow pulse, glassmorphism
- [ ] Différenciateurs : icônes colorées (pas monotone), subtle glow behind each
- [ ] Portfolio : si pas d'images, utiliser des placeholder gradient cards avec le nom du projet
- [ ] FAQ : spacing plus généreux entre items, dividers visuels
- [ ] Sections alternent entre fond base et fond alt (comme la home)
- [ ] **Verify in browser**

---

### US-D09: /identite-visuelle — Full page polish
**Description:** As a visitor, I want the visual identity page to feel artisanal and craft-oriented.

**Acceptance Criteria:**
- [ ] Hero : tonalité plus warm (ambre dominant au lieu d'orange), formes géométriques flottantes
- [ ] Prestations : 4 cards avec illustrations/icônes plus grandes, layout 2x2 avec gap généreux
- [ ] Process : style différent des autres pages (plus organique, moins tech)
- [ ] Portfolio : masonry/pinterest layout plutôt que grid uniforme
- [ ] Pourquoi : photo de Fabien avec tilt 3D, quote en glassmorphism card
- [ ] Tarifs : card "sur devis" avec traitement premium, liste des facteurs avec icônes
- [ ] Couleurs section : palette plus chaude (ambre, or) vs les pages tech (orange, cyan)
- [ ] **Verify in browser**

---

### US-D10: /saas — Full page polish
**Description:** As a visitor, I want the SaaS page to feel high-tech et high-ticket.

**Acceptance Criteria:**
- [ ] Hero : gradient mesh plus intense (violet + orange), orbs animés, titre text-6xl/7xl
- [ ] Services bento : cards avec micro-animations internes (code qui scroll, dashboard qui s'anime)
- [ ] Stack : tech items avec logos SVG si possible, hover glow, grid plus aéré
- [ ] Process : timeline horizontale desktop avec ligne qui se dessine, vertical mobile
- [ ] Portfolio : BrowserMockup pour chaque screenshot, tilt 3D hover
- [ ] Pricing : "5 000€" en gradient text massif (text-6xl), card glassmorphism premium
- [ ] Différenciateur visuel : cette page doit "sentir" le high-ticket (plus de padding, typo plus grosse, plus de breathing room)
- [ ] **Verify in browser**

---

### US-D11: /landing-pages — Full page polish
**Description:** As a visitor, I want the landing pages service page to BE a landing page qui convertit.

**Acceptance Criteria:**
- [ ] Hero : le site Aurentia mentionné comme preuve → ajouter un mini BrowserMockup en floating element
- [ ] Features : cards avec gradient borders animés, icônes colorées
- [ ] Vitrine : BrowserMockup plus grand, callout annotations avec connecting lines (style Figma annotations)
- [ ] Exemples : hover cards avec preview expand (scale 1.02 → 1.05 with glow)
- [ ] Process : plus compact et punchy que les autres pages (c'est une landing page après tout)
- [ ] Pricing : même traitement premium que SaaS mais plus compact
- [ ] La page elle-même doit ÊTRE une démonstration de ce qu'on sait faire
- [ ] **Verify in browser**

---

### US-D12: /formation — Teaser page polish
**Description:** As a visitor, I want the formation page to create excitement and FOMO.

**Acceptance Criteria:**
- [ ] Hero : badge "COMING SOON" avec glow pulse continu + particle effect subtil
- [ ] Hero : gradient mesh avec touche de violet (formation/savoir, pas business)
- [ ] Modules : bento cards avec icônes terminal/code animées (cursor blink, etc.)
- [ ] Team : cards Elliot + Mathieu avec glassmorphism premium, credential badges lumineux
- [ ] Waitlist CTA : formulaire email avec gradient border animé, micro-interaction on submit (confetti ou success glow)
- [ ] Ton global : exclusif, early-access, "tu vas avoir un avantage"
- [ ] **Verify in browser**

---

### US-D13: /apport-affaires — Conversion page polish
**Description:** As a visitor, I want the referral page to make earning money feel exciting and easy.

**Acceptance Criteria:**
- [ ] Hero : "10%" massif (text-8xl md:text-9xl) en gradient text animé
- [ ] Steps : 3 étapes avec connecting line animée, numéros en glassmorphism circles
- [ ] Gains : cards avec le montant en big gradient text, hover glow, "montant" qui pulse au hover
- [ ] Audience : cards avec icônes plus expressives, couleurs variées
- [ ] CTA : dual button layout plus clair (primary CTA vraiment proéminent, secondary discret)
- [ ] WhatsApp button : vert branded, icon animé
- [ ] **Verify in browser**

---

### US-D14: Pages légales — Minimal polish
**Description:** As a visitor, I want the legal pages to be clean and readable, not ugly.

**Acceptance Criteria:**
- [ ] ToC sidebar : smooth scroll on click, active item avec accent underline (pas juste couleur)
- [ ] Section headers : subtle left border accent, pas juste du texte
- [ ] Links dans le contenu : underline accent on hover, transition smooth
- [ ] Spacing entre articles : plus généreux (mb-16 au lieu de mb-8)
- [ ] Mobile : ToC accordion avec chevron animé, smooth open/close
- [ ] Fond : subtle gradient ou orb en haut de page (pas un fond plat mort)
- [ ] **Verify in browser**

---

### US-D15: Cross-page — Consistency pass
**Description:** As a developer, I want all pages to share the same visual DNA.

**Acceptance Criteria:**
- [ ] TOUTES les pages utilisent `SectionBackground` pour au moins 2 sections (hero + CTA minimum)
- [ ] Hero de chaque page a le hero-grid pattern
- [ ] CTA de chaque page a le gradient mesh avec orbs
- [ ] Alternance de fonds entre sections (base → alt → base) sur chaque page
- [ ] Transitions fluides entre sections (pas de coupure brute)
- [ ] Tous les boutons CTA principaux sont des MagneticButton avec `glow`
- [ ] Spacing cohérent : `py-28 md:py-36` sur les sections content, `py-20 md:py-28` sur les sections compactes
- [ ] Homepage n'est PAS cassée — vérifier page par page
- [ ] **Verify in browser** : naviguer entre home → chaque page → retour, la transition visuelle est fluide

---

## 4. Functional Requirements

**FR-1:** Créer les composants partagés `SectionBackground` et `SectionDivider` avant de toucher aux pages
**FR-2:** Chaque hero de page doit avoir minimum : hero-grid pattern + 2 orbs colorés + titre text-6xl+ avec accent
**FR-3:** Chaque CTA final doit avoir minimum : gradient mesh (3 orbs) + MagneticButton glow + proof points
**FR-4:** Les sections doivent alterner entre `theme="dark"` et `theme="dark-alt"` (ou equivalent)
**FR-5:** Les cards SpotlightCard doivent toutes avoir : hover translateY(-8px) + border-glow + transition 700ms
**FR-6:** Les compteurs/chiffres doivent être en `font-mono font-black text-5xl+` avec subtle glow
**FR-7:** Les FAQ accordéons doivent avoir : height transition smooth (pas display none), icon rotation, spacing généreux
**FR-8:** Les images/mockups doivent avoir : shadow-xl, rounded-2xl, subtle border, hover scale
**FR-9:** Tout doit fonctionner en dark ET light mode — vérifier chaque page dans les deux thèmes
**FR-10:** Responsive parfait : 375px (vérifier chaque section), 768px, 1280px, 1536px

---

## 5. Non-Goals (Out of Scope)

- Ne PAS modifier le contenu textuel (déjà validé)
- Ne PAS changer la structure des pages (ordre des sections)
- Ne PAS toucher à la homepage (sauf pour vérifier qu'elle n'est pas cassée)
- Ne PAS ajouter de nouvelles sections
- Ne PAS changer les URLs/routes
- Ne PAS modifier les data files

---

## 6. Design Considerations

### Références visuelles (le standard)
- **Linear.app** : clean, espacement généreux, animations subtiles mais omniprésentes, gradient meshes
- **Raycast.com** : glassmorphism dosé, spotlight hover, glow effects
- **La homepage Aurentia** : hero-grid, orbs colorés, SpotlightCard, magnetic buttons, NumberMorph, parallax

### Palette d'orbs par page
| Page | Orb 1 | Orb 2 | Orb 3 |
|------|-------|-------|-------|
| /a-propos | orange/8 | violet/5 | cyan/4 |
| /realisations | ambre/8 | orange/5 | rose/4 |
| /conciergeries | orange/10 | ambre/6 | rose/4 |
| /sites-vitrines | orange/8 | ambre/5 | — |
| /identite-visuelle | ambre/10 | or/6 | rose/4 |
| /saas | violet/8 | orange/6 | cyan/4 |
| /landing-pages | orange/8 | violet/5 | ambre/4 |
| /formation | violet/10 | orange/5 | cyan/4 |
| /apport-affaires | ambre/8 | orange/5 | — |

---

## 7. Technical Considerations

- Utiliser les composants d'animation existants (TextReveal, BlurReveal, SpotlightCard, etc.)
- Le hero-grid CSS class existe déjà (`.hero-grid` dans globals.css)
- Les orbs colored existent déjà dans HomeTeam — réutiliser le pattern
- Les MagneticButton avec `glow` existent déjà
- `SectionBackground` sera le composant clé — il factorise les orbs + grid + gradient
- Performance : toutes les animations en `transform` + `opacity` uniquement (GPU accelerated)
- `prefers-reduced-motion` : toutes les animations désactivées

---

## 8. Success Metrics

- **Chaque page "passe le test Linear"** — on peut mettre la page à côté de Linear.app et ne pas avoir honte
- **Zéro zone morte au scroll** — chaque pixel scrollé fait bouger quelque chose
- **La homepage n'a aucune régression** — même comportement exact qu'avant
- **Dark + Light mode parfaits** — chaque page vérifiée dans les deux thèmes
- **Responsive parfait** — chaque page vérifiée à 375px, 768px, 1280px

---

## 9. Open Questions

- Les images de portfolio/mockups sont des placeholders — faut-il créer des gradient cards en attendant les vraies images ?
- Le hero-grid pattern doit-il être identique sur toutes les pages ou légèrement varié (opacité, couleur) ?
- Faut-il ajouter des page transitions (fade entre les pages) avec Next.js View Transitions ?
