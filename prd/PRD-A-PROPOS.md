# PRD — Page `/a-propos`

---

## 1. Fiche page

```
Page : /a-propos
Titre H1 : "L'IA comme instrument de précision. 20 ans d'expertise comme fondation."
Title tag : "À propos d'Aurentia — Agence Web IA | Aurentia Agency" (55 caractères)
Meta description : "3 profils, 20 ans de craft web et l'IA comme superpouvoir. Découvrez l'équipe qui livre votre site pro en 48h pour moins de 1 000€." (134 caractères)
Objectif principal : Créer la confiance → amener au booking Cal.com
Persona cible : Gérant de conciergerie / hôtel / commerce local qui hésite encore, veut savoir "c'est qui ces gens ?"
Pages liées :
  - Entrants : Home (navbar + footer + section équipe), /conciergeries, /realisations
  - Sortants : /realisations (portfolio), /conciergeries (offre niche), booking Cal.com
```

---

## 2. SEO complet

### Mots-clés

| Type | Mots-clés |
|------|-----------|
| **Primaire** | agence web IA France |
| **Secondaires** | équipe agence web, création site IA, agence digitale nouvelle génération, site web intelligence artificielle |
| **Longue traîne** | agence qui crée des sites avec l'IA, équipe derrière aurentia agency |

### Open Graph

```
og:title: "L'équipe Aurentia — 20 ans de craft web + IA"
og:description: "3 profils. 20 ans d'expertise. L'IA comme superpouvoir. On révèle le potentiel digital de chaque business."
og:image: /images/og/a-propos.jpg (photo d'équipe ou mockup branded)
og:type: website
```

### Schema markup JSON-LD

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aurentia Agency",
    "url": "https://aurentia.agency",
    "logo": "https://aurentia.agency/images/logo.png",
    "description": "Agence web IA qui révèle le potentiel digital de chaque business. Sites vitrines sur-mesure, applications SaaS, landing pages haute conversion.",
    "foundingDate": "2025",
    "knowsAbout": ["Intelligence Artificielle", "Création de sites web", "Design UI/UX", "SEO"],
    "founders": [
      {
        "@type": "Person",
        "name": "Elliot Estrade",
        "jobTitle": "CEO, IA & Design"
      },
      {
        "@type": "Person",
        "name": "Fabien Estrade",
        "jobTitle": "Production Lead"
      }
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Mathieu Bousquet",
        "jobTitle": "CTO, Lead Technique"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/aurentia-agency",
      "https://instagram.com/aurentia.agency"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "url": "https://cal.com/aurentia"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
      { "@type": "ListItem", "position": 2, "name": "À propos", "item": "https://aurentia.agency/a-propos" }
    ]
  }
]
```

---

## 3. Architecture des sections

---

### Section 1 — Hero / Opening Hook

**Hauteur :** min-h-[85vh]
**Layout :** Centré, full-width. Titre oversize. Fond dark avec gradient mesh subtil (glow ambre/orange en bas).
**Animations :**
- Page entry : fade-in + translateY(30px) → 0, durée 800ms, ease-out
- H1 : TextReveal (GSAP SplitText, mot par mot, stagger 0.05s)
- Sous-titre : BlurReveal (blur 10px → 0, delay 0.3s)
- Badge "L'équipe" : fade-in + scale depuis 0.8, delay 0.5s
- Scroll indicator subtil (chevron animé en bas)

**Contenu textuel :**

- **Badge :** `L'ÉQUIPE AURENTIA`
- **H1 :** `L'IA comme instrument de précision. 20 ans d'expertise comme fondation.`
- **Sous-titre :** `On ne crée pas à partir de rien. On révèle le potentiel qui est déjà là. Trois profils complémentaires, un seul objectif : que votre business soit vu.`

**Responsive :**
- Mobile (375px) : H1 en `text-3xl`, sous-titre en `text-base`, padding `px-6`
- Tablet (768px) : H1 en `text-4xl`
- Desktop (1280px+) : H1 en `text-5xl md:text-6xl`, max-w-4xl

**Assets :** Aucun — typographie pure + gradient mesh de fond.

---

### Section 2 — L'Origin Story

**Hauteur :** auto (content-driven)
**Layout :** max-w-3xl centré. Texte long-form, marges généreuses (py-24 md:py-32).
**Animations :**
- Chaque paragraphe : BlurReveal staggeré au scroll (delay incrémental 0.15s)
- TextGradientReveal sur la première phrase de chaque paragraphe (mots passent de gris dim à foreground au scroll)
- Fond : transition subtile du gradient mesh — le glow s'intensifie légèrement

**Contenu textuel :**

> **Paragraph 1 — Le Before :**
> Pendant 20 ans, Fabien a construit des sites web. Des centaines. Pour des PME, des artisans, des commerçants. Il a vu passer WordPress, les templates, les agences à 5 000€ le site. Et un constat qui ne changeait jamais : la majorité des entreprises n'avaient toujours pas de site digne de ce nom.

> **Paragraph 2 — Le Turning Point :**
> En 2025, Elliot — son fils, 23 ans, spécialiste IA et design — lui montre un truc. Un site vitrine complet, généré en quelques heures avec l'intelligence artificielle. Pas un template. Un vrai site sur-mesure, avec du contenu pensé, du SEO intégré, un design qui tient la route. Fabien regarde, vérifie chaque détail. Sa réaction : "C'est exactement ce que je mettais 3 semaines à produire."

> **Paragraph 3 — La Mission :**
> Aurentia est née de cette collision. 20 ans de craft web + l'IA comme accélérateur + l'exigence technique de Mathieu, dev senior et garde-fou de chaque ligne de code. Le résultat : des sites professionnels livrés en 48h, pour moins de 1 000€. Pas parce qu'on bâcle. Parce que le process est redoutablement efficace.

**Responsive :**
- Mobile : `text-base`, line-height 1.7, `px-6`
- Desktop : `text-lg`, line-height 1.8, `max-w-3xl mx-auto`

**Assets :** Aucun.

---

### Section 3 — Les Valeurs (Bento Grid)

**Hauteur :** auto
**Layout :** Bento grid asymétrique. 2 colonnes desktop, 1 colonne mobile. 5 cards de tailles variables.
**Animations :**
- Titre section : TextReveal
- Cards : BlurReveal staggeré (0.15s entre chaque)
- Chaque card a un SpotlightCard (radial-gradient suit la souris)
- Hover : translateY(-8px) + border plus visible, transition 700ms
- Icônes : animation subtile d'apparition (scale 0.5 → 1, delay)

**Contenu textuel :**

- **Titre section :** `Ce en quoi on croit.`
- **Sous-titre :** `Cinq convictions. Pas des slogans — des règles qu'on applique sur chaque projet.`

**Card 1 — Grande (span 2 cols desktop)**
- Icône : Sun (Lucide) — glow ambre
- Titre : `Révéler, pas créer`
- Texte : `Votre business a déjà un potentiel. On ne part pas de zéro — on met en lumière ce qui est déjà là. Vous êtes le héros. On est la lumière.`

**Card 2**
- Icône : Zap (Lucide)
- Titre : `48h. Pas 6 semaines.`
- Texte : `L'IA nous donne un superpouvoir : la vitesse. Pas parce qu'on bâcle — parce que notre process est redoutablement efficace.`

**Card 3**
- Icône : Shield (Lucide)
- Titre : `Tant que c'est pas parfait, on ne lance pas.`
- Texte : `Chaque pixel compte. Chaque ligne de code est propre. On ne fait pas de compromis sur la qualité.`

**Card 4**
- Icône : Eye (Lucide)
- Titre : `On montre avant de facturer.`
- Texte : `Vous voyez votre site AVANT de payer. Pas de mockup flou — un vrai site, fonctionnel, avec votre contenu. Vous jugez, vous décidez.`

**Card 5**
- Icône : Users (Lucide)
- Titre : `Un interlocuteur. Pas un ticket.`
- Texte : `Pas de chef de projet qui transmet à un dev qui transmet à un designer. Vous parlez directement à l'équipe qui construit.`

**Responsive :**
- Mobile : 1 colonne, toutes les cards en full-width, gap-4
- Tablet : 2 colonnes, card 1 en span-2
- Desktop : 2 colonnes, card 1 en span-2, gap-6

**Assets :** Icônes Lucide React (Sun, Zap, Shield, Eye, Users).

---

### Section 4 — L'Équipe (version approfondie)

**Hauteur :** auto
**Layout :** Titre centré + 3 cards horizontales (desktop : stack vertical de cards pleine largeur avec image à gauche/droite alternée, mobile : stack vertical image au-dessus du texte).
**Animations :**
- Titre : TextReveal
- Chaque card membre : slide-in depuis la gauche (pair) ou la droite (impair), BlurReveal, stagger 0.3s
- Photos : léger parallax au scroll (translateY à vitesse réduite)
- Hover sur la card : glow subtil (box-shadow accent), transition 700ms
- Tags compétences : fade-in staggeré (0.05s chacun)

**Contenu textuel :**

- **Titre section :** `Trois regards. Une seule exigence.`
- **Sous-titre :** `20 ans de craft web, l'IA comme superpouvoir, et une ingénierie sans compromis.`

**Member 1 — Fabien Estrade**
- Photo : `/images/team/fabien.webp`
- Rôle : `Production Lead`
- Badge : `20 ans de création web`
- Bio : `Fondateur de l'agence Le Prisme à Avignon. 20 ans à forger des sites, des identités visuelles, des marques pour des PME, artisans et commerçants. Direction créative, stratégie de marque, accompagnement client — il a traversé chaque vague du web. WordPress, Flash, le responsive, les frameworks modernes. Il sait ce qui convertit. Ce qui dure. Ce qui illumine un business. Chez Aurentia, il est le pilier qualité. Rien ne sort sans son feu vert.`
- Tags : `Direction créative` · `Identité visuelle` · `Stratégie de marque` · `Accompagnement client` · `20 ans de craft web`
- LinkedIn : `https://www.linkedin.com/in/fabienestrade/`

**Member 2 — Elliot Estrade**
- Photo : `/images/team/elliot.webp`
- Rôle : `CEO, IA & Design`
- Badge : `Architecte IA · 23 ans`
- Bio : `23 ans, entrepreneur serial. Fondateur d'ESST Solutions (consulting IA & dev). Co-fondateur de Kaelen Studio (jeux Roblox). Créateur de Comparateur-IA-Facile.com. Avant Aurentia : Friend'iz, un e-commerce qu'il a lancé et opéré. Formateur IA en entreprise — il forme des équipes à intégrer l'intelligence artificielle dans leurs process. C'est lui qui a forgé le workflow IA d'Aurentia — le système sur-mesure qui permet de livrer un site pro en 48h. La vision, l'innovation, la vitesse.`
- Tags : `Intelligence Artificielle` · `Design UI/UX` · `Automatisation` · `Stratégie produit` · `Formation IA` · `E-commerce`
- LinkedIn : `https://www.linkedin.com/in/elliot-estrade/`

**Member 3 — Mathieu Bousquet**
- Photo : `/images/team/mathieu.webp`
- Rôle : `CTO, Lead Technique`
- Badge : `Dev Senior & Formateur Epitech`
- Bio : `Développeur full-stack et formateur à Epitech Marseille. Pionnier Claude Code au sein de l'équipe — il a été le premier à intégrer l'IA dans son workflow de développement quotidien. Architecte technique, il conçoit les fondations de chaque projet. Chaque site est sécurisé, rapide, et techniquement irréprochable. Code review, performance, scalabilité — rien ne lui échappe. Avec Elliot, il a remporté 2 hackathons. Le craft technique, c'est son terrain.`
- Tags : `Architecture technique` · `Sécurité` · `Performance` · `Code review` · `Formation Epitech` · `Claude Code`
- LinkedIn : `https://www.linkedin.com/in/mathieu-bousquet-178454315/`

**Responsive :**
- Mobile (375px) : Cards en stack vertical, image en haut (aspect 4:3, object-cover), texte en dessous, `px-6`
- Tablet (768px) : Image à gauche (40%) / texte à droite (60%), alternance gauche/droite
- Desktop (1280px+) : Même layout tablet, max-w-5xl centré, images plus grandes

**Assets :** Photos d'équipe existantes (`/images/team/fabien.webp`, `elliot.webp`, `mathieu.webp`).

---

### Section 5 — L'Histoire Père-Fils (Origin Story Émotionnelle)

**Hauteur :** auto (content-driven)
**Layout :** max-w-4xl centré. Deux colonnes desktop (photo à gauche, texte à droite), stack vertical mobile. Photo : les deux ensemble (ou deux photos côte à côte). Fond avec gradient mesh subtil, ton chaud.
**Animations :**
- Titre : TextReveal
- Photo : parallax léger au scroll (translateY à vitesse réduite) + BlurReveal
- Paragraphes : BlurReveal staggeré (delay incrémental 0.15s)
- Timeline verticale entre les deux "ères" : trait animé qui se dessine au scroll (stroke-dashoffset)
- Badge "20 ans + nouvelle génération" : fade-in + scale depuis 0.8

**Contenu textuel :**

- **Badge :** `L'ORIGIN STORY`
- **Titre section :** `Le père. Le fils. Deux générations, une exigence.`
- **Sous-titre :** `20 ans de craft artisanal + l'IA comme accélérateur. C'est rare. C'est notre force.`

> **Bloc 1 — L'héritage (Fabien)**
> Fabien crée des sites web depuis 2005. Des centaines de projets. Des PME, des artisans, des commerçants qui comptaient sur lui pour exister en ligne. Il a forgé un œil. Il sait en 3 secondes si un site va convertir ou pas. 20 ans de craft, ça ne s'invente pas.

> **Bloc 2 — La nouvelle vague (Elliot)**
> Elliot, 23 ans, a grandi en regardant son père coder. À 19 ans, il lance son premier e-commerce. À 21, il fonde ESST Solutions. À 22, il forme des entreprises à l'IA. Quand il montre à Fabien un site complet généré en quelques heures — sur-mesure, pas un template — Fabien comprend que le jeu vient de changer.

> **Bloc 3 — La collision**
> Aurentia, c'est cette collision. L'exigence artisanale de 20 ans + la puissance de l'IA nouvelle génération. Le père valide chaque pixel. Le fils propulse chaque process. Ensemble, ils livrent en 48h ce qui prenait 3 semaines. Pas parce que c'est bâclé. Parce que le duo est redoutablement complémentaire.

- **Citation (highlight visuel, grande typo) :** `"C'est exactement ce que je mettais 3 semaines à produire."` — Fabien, la première fois qu'il a vu le workflow IA d'Elliot.

**Responsive :**
- Mobile (375px) : Stack vertical, photo en haut (aspect 16:9, object-cover), texte en dessous, `px-6`, `text-base`
- Tablet (768px) : Photo à gauche (40%), texte à droite (60%)
- Desktop (1280px+) : Même layout, max-w-4xl centré, `text-lg`

**Assets :** Photo père-fils `/images/about/pere-fils.webp` (ou deux photos séparées `/images/about/fabien-story.webp` + `/images/about/elliot-story.webp`).

---

### Section 6 — Hackathons (Preuve par l'action)

**Hauteur :** auto
**Layout :** Titre centré + 2 cards hackathon en stack vertical (desktop : image à gauche, contenu à droite, alternance). Chaque card contient photo, description, embed LinkedIn.
**Animations :**
- Titre : TextReveal
- Badge : fade-in + scale depuis 0.8, delay 0.3s
- Cards : BlurReveal staggeré (0.3s entre chaque)
- SpotlightCard sur chaque card (radial-gradient suit la souris)
- Photos : léger parallax au scroll
- Hover : translateY(-4px) + glow subtil, transition 700ms
- Embeds LinkedIn : fade-in avec delay supplémentaire (0.5s après la card)

**Contenu textuel :**

- **Badge :** `ON CODE AUSSI POUR LE SPORT`
- **Titre section :** `2 hackathons. 2 victoires.`
- **Sous-titre :** `Elliot et Mathieu ne se contentent pas de livrer des projets clients. Ils forgent leurs armes en compétition. 48h pour coder, pitcher, convaincre — et gagner.`

**Card Hackathon 1 :**
- Photo : `/images/about/hackathon-1.webp`
- Titre : `[Nom du Hackathon 1]` *(placeholder)*
- Date : `[Date]` *(placeholder)*
- Description : `[Description du projet, du défi relevé et de la solution construite en 48h. Mettre en avant la complémentarité Elliot (IA/design) + Mathieu (architecture technique).]` *(placeholder)*
- Résultat : `🏆 1ère place`
- Embed LinkedIn : `[URL_POST_LINKEDIN_HACKATHON_1]` *(placeholder — composant iframe ou oEmbed)*

**Card Hackathon 2 :**
- Photo : `/images/about/hackathon-2.webp`
- Titre : `[Nom du Hackathon 2]` *(placeholder)*
- Date : `[Date]` *(placeholder)*
- Description : `[Description du projet, du défi relevé et de la solution construite. Même angle : vitesse + craft + IA.]` *(placeholder)*
- Résultat : `🏆 1ère place`
- Embed LinkedIn : `[URL_POST_LINKEDIN_HACKATHON_2]` *(placeholder — composant iframe ou oEmbed)*

- **Phrase de closing :** `Ce qu'on fait en hackathon, on le fait pour vous. La même intensité, la même rigueur, le même craft — mais avec votre business au centre.`

**Responsive :**
- Mobile (375px) : Cards en stack vertical, photo en haut (aspect 16:9, object-cover), contenu en dessous, `px-6`. Embeds LinkedIn en full-width.
- Tablet (768px) : Image à gauche (40%), contenu à droite (60%), alternance gauche/droite
- Desktop (1280px+) : Même layout tablet, max-w-5xl centré

**Assets :**
- Photos : `/images/about/hackathon-1.webp`, `/images/about/hackathon-2.webp`
- Embeds LinkedIn : composant `LinkedInEmbed` à créer (iframe responsive ou screenshot + lien)

---

### Section 7 — La Preuve (Chiffres + Stack)

**Hauteur :** auto, min-h-[60vh]
**Layout :** Deux sous-sections :
1. **Compteurs** : 4 métriques en row (desktop) / grid 2x2 (mobile)
2. **Stack technique** : Marquee défilant avec les logos/noms des technos

**Animations :**
- Compteurs : NumberMorphing (slot machine vertical, chaque digit slide indépendamment), trigger au scroll quand visible, durée 1.5s, easing power2.out
- Labels sous les chiffres : fade-in staggeré
- Marquee stack : défilement infini horizontal, vitesse constante, blur aux extrémités (fade edges)
- Fond : gradient mesh légèrement plus intense (on est dans "l'acte 3" — la lumière)

**Contenu textuel :**

- **Titre section :** `Les chiffres parlent.`

**Compteurs :**

| Valeur | Suffix | Label |
|--------|--------|-------|
| 20 | ans | d'expertise web cumulée |
| 48 | h | pour livrer votre V1 |
| 15 | + | sites livrés |
| 100 | % | de clients satisfaits |

**Stack technique (Marquee) :**
`Next.js` · `React` · `TypeScript` · `Tailwind CSS` · `Framer Motion` · `GSAP` · `Supabase` · `Vercel` · `Claude AI` · `Figma`

- **Phrase sous le marquee :** `Des outils de pointe. Pas pour la hype — pour le résultat.`

**Responsive :**
- Mobile : Grid 2x2 pour les compteurs, chiffres en `text-4xl`, labels en `text-sm`
- Desktop : Row de 4, chiffres en `text-5xl font-mono`, labels en `text-base`

**Assets :** Logos des technos en SVG (optionnel, le texte suffit pour le marquee).

---

### Section 8 — Notre Approche (Différenciateur)

**Hauteur :** auto
**Layout :** 3 colonnes desktop, 1 colonne mobile. Chaque colonne = un pilier visuel avec icône, titre, texte.
**Animations :**
- Titre : TextGradientReveal (mots passent de dim à gradient orange→ambre au scroll)
- Cards 3 piliers : BlurReveal staggeré (0.2s)
- SpotlightCard sur chaque pilier
- Icônes : scale 0.7 → 1 + rotation subtile (5deg → 0) au scroll

**Contenu textuel :**

- **Titre section :** `L'IA comme instrument de précision. Pas comme raccourci.`
- **Sous-titre :** `Ce qui nous sépare du reste.`

**Pilier 1**
- Icône : Cpu (Lucide) — accent orange
- Titre : `L'IA qui amplifie`
- Texte : `L'IA accélère le design, le code, le SEO, le contenu. Mais elle ne décide de rien. C'est l'expertise humaine qui valide. Chaque pixel, chaque mot, chaque choix technique.`

**Pilier 2**
- Icône : Hammer (Lucide) — accent ambre
- Titre : `Le craft qui dure`
- Texte : `20 ans de création web, ça forge un œil. On sait ce qui fonctionne, ce qui convertit, ce qui tient dans le temps. Le site qu'on livre aujourd'hui sera encore pertinent dans 3 ans.`

**Pilier 3**
- Icône : Handshake (Lucide) — accent cyan
- Titre : `L'humain au centre`
- Texte : `Un seul interlocuteur du brief au lancement. Pas de process kafkaïen. Vous parlez à ceux qui construisent. On avance ensemble, à votre rythme.`

**Responsive :**
- Mobile : Stack vertical, gap-6
- Desktop : Grid 3 colonnes, gap-8

**Assets :** Icônes Lucide.

---

### Section 9 — Qui on aide (Persona)

**Hauteur :** auto
**Layout :** max-w-3xl centré, texte + liste.
**Animations :**
- Titre : TextReveal
- Paragraphe : BlurReveal
- Items de la liste : slide-in depuis la gauche, stagger 0.1s
- Check icons : scale bounce 0.5 → 1.1 → 1, stagger

**Contenu textuel :**

- **Titre :** `Pour qui on travaille.`
- **Paragraphe :** `Si vous vous reconnaissez dans une de ces situations, on est faits pour bosser ensemble.`

**Liste :**
- ✓ Vous gérez une conciergerie, un hôtel, un commerce — et vous n'avez pas de site. Ou il date de 2018.
- ✓ Vous perdez des clients parce que vos concurrents apparaissent sur Google et pas vous.
- ✓ Vous avez contacté des agences. Devis : 5 000€. Délai : 2 mois. Vous avez laissé tomber.
- ✓ Vous avez essayé Wix, WordPress, Squarespace. Le résultat ne ressemble pas à ce que vous aviez en tête.
- ✓ Vous voulez un site pro, unique, qui ramène des clients — sans y passer vos soirées.

- **Conclusion :** `On a construit Aurentia pour vous. Pas pour les startups de la Silicon Valley. Pour les entreprises qui méritent d'être vues.`

**Responsive :**
- Mobile : `px-6`, items en stack, `text-base`
- Desktop : `max-w-3xl mx-auto`, `text-lg`

**Assets :** Aucun.

---

### Section 10 — CTA Final

**Hauteur :** min-h-[50vh], centré verticalement
**Layout :** Centré, fond dark intense avec gradient mesh déployé (glow orange + ambre + rose subtil). Le "moment lumière".
**Animations :**
- Titre : TextGradientReveal (chaque mot passe en gradient orange→ambre)
- Sous-titre : BlurReveal, delay 0.3s
- Bouton CTA : scale 0.9 → 1, glow pulse (box-shadow), magnetic button (GSAP — le bouton attire le curseur)
- Preuves : fade-in staggeré (0.1s)
- Background : gradient mesh à intensité maximale — c'est la section la plus "lumineuse" de la page

**Contenu textuel :**

- **Titre :** `Envie de voir ce qu'on peut faire pour vous ?`
- **Sous-titre :** `On vous prépare un aperçu de votre futur site, un audit de vos concurrents, et des recommandations stratégiques. Gratuit. 20 minutes. Sans engagement.`
- **CTA Button :** `Réserver mon call gratuit` → ouvre CalModal (cal.com/aurentia)
- **Preuves (en dessous du bouton) :**
  - `Gratuit et sans engagement`
  - `On vous montre VOTRE site`
  - `Vous gardez l'audit quoi qu'il arrive`

**Responsive :**
- Mobile : `text-2xl` pour le titre, `px-6`, bouton full-width
- Desktop : `text-4xl md:text-5xl`, bouton auto-width

**Assets :** Aucun.

---

## 4. Spécifications techniques

### Composants React à créer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `AboutHero` | `src/components/about/AboutHero.tsx` | — | Badge + H1 + sous-titre. Utilise TextReveal, BlurReveal. |
| `AboutStory` | `src/components/about/AboutStory.tsx` | — | 3 paragraphes origin story. Utilise BlurReveal, TextGradientReveal. |
| `AboutValues` | `src/components/about/AboutValues.tsx` | — | Bento grid 5 cards. Utilise SpotlightCard, BlurReveal. |
| `AboutTeam` | `src/components/about/AboutTeam.tsx` | — | 3 member cards avec photo, bio enrichie, tags. Layout alterné. |
| `AboutFatherSon` | `src/components/about/AboutFatherSon.tsx` | — | Section histoire père-fils. Photo + 3 blocs texte + citation. BlurReveal, TextReveal, parallax. |
| `AboutHackathons` | `src/components/about/AboutHackathons.tsx` | — | 2 cards hackathon avec photo, description, embed LinkedIn. SpotlightCard, BlurReveal. |
| `LinkedInEmbed` | `src/components/shared/LinkedInEmbed.tsx` | `url: string` | Iframe responsive pour embed post LinkedIn (ou fallback screenshot + lien). |
| `AboutProof` | `src/components/about/AboutProof.tsx` | — | 4 compteurs NumberMorphing + marquee stack technique. |
| `AboutApproach` | `src/components/about/AboutApproach.tsx` | — | 3 piliers. Utilise SpotlightCard, BlurReveal. |
| `AboutAudience` | `src/components/about/AboutAudience.tsx` | — | Texte + checklist "pour qui on travaille". |
| `AboutCTA` | `src/components/about/AboutCTA.tsx` | — | CTA final. Réutilise le pattern de HomeCTA. |

### Page route

**Fichier :** `src/app/a-propos/page.tsx`

```tsx
// Structure
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutFatherSon } from "@/components/about/AboutFatherSon";
import { AboutHackathons } from "@/components/about/AboutHackathons";
import { AboutProof } from "@/components/about/AboutProof";
import { AboutApproach } from "@/components/about/AboutApproach";
import { AboutAudience } from "@/components/about/AboutAudience";
import { AboutCTA } from "@/components/about/AboutCTA";

// Metadata export pour Next.js (title, description, openGraph, jsonLd)
```

### Composants existants réutilisés

- `TextReveal` — animation mot par mot (GSAP SplitText)
- `TextGradientReveal` — mots passent de dim à gradient au scroll
- `BlurReveal` — blur 10px → 0 au scroll
- `SpotlightCard` — radial-gradient suit la souris
- `Section` — wrapper avec theme dark/light
- `MagneticButton` — bouton qui attire le curseur
- `CalModal` — modal de booking Cal.com

### Data structures

```typescript
// src/data/about-content.ts

export interface TeamMember {
  name: string;
  role: string;
  badge: string;
  bio: string;
  tags: string[];
  image: string;
  linkedin: string;
}

export interface ValueCard {
  icon: string; // nom Lucide
  title: string;
  text: string;
  span?: number; // colonne span (1 ou 2)
}

export interface ProofStat {
  value: number;
  suffix: string;
  label: string;
}

export interface ApproachPillar {
  icon: string;
  title: string;
  text: string;
  accentColor: string; // 'orange' | 'amber' | 'cyan'
}

export interface HackathonCard {
  photo: string;
  title: string;
  date: string;
  description: string;
  result: string;
  linkedinEmbed: string; // URL du post LinkedIn
}

export interface FatherSonBlock {
  label: string; // "L'héritage" | "La nouvelle vague" | "La collision"
  text: string;
}
```

### Dépendances / intégrations

- **Cal.com** : bouton CTA final ouvre la CalModal existante
- **Images** : photos équipe déjà existantes dans `/images/team/`
- **Animations** : utiliser les composants d'animation existants (`src/components/animations/`)
- **Lucide React** : icônes (Sun, Zap, Shield, Eye, Users, Cpu, Hammer, Handshake, Check, Trophy, Heart)
- **LinkedIn Embeds** : iframe responsive pour les posts LinkedIn (ou fallback avec screenshot + lien externe)
- **Images hackathons** : `/images/about/hackathon-1.webp`, `/images/about/hackathon-2.webp`
- **Image père-fils** : `/images/about/pere-fils.webp`

---

## 5. Récapitulatif — Checklist pré-implémentation

```
[x] Opening hook : pas de "Bienvenue", attaque avec une affirmation forte
[x] Framework : Credentials + Origin Story (hybrid — adapté à une agence)
[x] Origin story avec turning point clair (Fabien voit le site généré par Elliot)
[x] "Pour qui on travaille" nomme une audience spécifique + leurs douleurs
[x] Section preuve avec chiffres concrets (20 ans, 48h, 15+ sites, 100%)
[x] CTA final avec une action claire (book Cal.com) + preuves
[x] Voix "on" (équipe), premium, confiant, direct — ton Aurentia
[x] Aucun mot interdit (cheap, template, basique, robot, garanti, automatique)
[x] Mots de marque utilisés (révéler, craft, sur-mesure, lumière, potentiel)
[x] Minimum text-sm partout, aucun text-xs
[x] Toutes transitions ≥ 500ms, ease-in-out
[x] Dark/Light : tokens sémantiques uniquement (text-foreground, bg-background, etc.)
[x] Pas de position: sticky / pin: true
[x] Animations scroll-triggered sur chaque section
[x] Mobile-first responsive (375px → 768px → 1280px)
[x] 1 seul H1
[x] Schema JSON-LD (Organization + BreadcrumbList)
[x] Liens internes : /realisations, /conciergeries, home
[x] Chaque paragraphe < 4 lignes
[x] Section "Histoire père-fils" — origin story émotionnelle, différenciateur fort
[x] Section "Hackathons" — 2 victoires, embeds LinkedIn, photos, ton fier mais accessible
[x] Bios fondateurs enrichies — parcours complet Elliot/Fabien/Mathieu
[x] Ordre des sections : Hero → Story → Valeurs → Équipe → Père-Fils → Hackathons → Preuve → Approche → Audience → CTA
[x] 10 sections au total (vs 8 précédemment)
```
