# Design — Port du contenu `/a-propos` initial vers `/v2/agence`

**Date :** 2026-04-16
**Branche :** feat/v2-redesign-phase1
**Type :** refonte de page (content + layout port)

---

## 1. Contexte

La page initiale `/a-propos` (hors v2) contient une narration riche en 10 sections : Hero éditorial, Story en 3 paragraphes, Team détaillée avec bios longues, 5 Valeurs, Hackathons origin story avec LinkedIn embeds, Stats (proof), Stack interactive par phase, 3 Piliers (approach), Audience checklist, CTA avec Cal modal.

La page `/v2/agence/page.tsx` actuelle est structurée en "hub d'agence" (sous-pages, why, method, FAQ) et ne transmet pas l'épaisseur narrative de la page initiale.

**Objectif :** faire de `/v2/agence` LA page "à propos" riche, en portant le contenu et l'esprit de design de la version initiale, mais en utilisant le langage visuel v2 déjà en place (SectionContainer, BlurReveal, icônes Lucide, `bg-background-surface`, transitions 500-700ms, tokens sémantiques light/dark).

**Hors scope :**
- `/v2/agence/a-propos` — laissée telle quelle pour l'instant, on décidera après si on la supprime / redirige.
- Création de nouveaux composants shared ou système de design — on réutilise ceux déjà en place.
- Modification des composants `/about/*` d'origine (ils restent intouchés pour la page `/a-propos` existante).

---

## 2. Architecture des fichiers

### Nouveaux composants à créer

Tous dans `src/components/v2/agence/` :

| Fichier | Rôle | S'inspire de |
|---------|------|--------------|
| `AgenceStoryV2.tsx` | 3 paragraphes "Le constat / Le déclic / La mission" | `AboutStory` |
| `AgenceStats.tsx` | 4 compteurs (20 ans / 48h / 15+ / 100%) | `AboutProof` |
| `AgenceTeamFull.tsx` | 4 membres, 1/ligne, photo bleed 55% + texte 45%, alternance L/R | `AboutTeam` (MemberCard) |
| `AgenceValuesV2.tsx` | 5 convictions en bento grid | `AboutValues` |
| `AgenceHackathons.tsx` | Origin story solo → bridge → duo avec LinkedIn embeds | `AboutHackathons` |
| `AgenceStack.tsx` | Pipeline interactif par phase (Design/Dev/Intelligence/Business) | `AboutStack` |
| `AgenceApproach.tsx` | 3 piliers avec accents (orange/ambre/cyan) | `AboutApproach` |
| `AgenceAudience.tsx` | Checklist "Pour qui on travaille" + conclusion | `AboutAudience` |
| `AgenceFinalCTA.tsx` | CTA final avec Cal modal | `AboutCTA` |

### Composants existants modifiés

| Fichier | Modification |
|---------|--------------|
| `src/app/v2/agence/page.tsx` | Recomposition complète de l'ordre des sections |
| `src/components/v2/agence/AgenceHero.tsx` | Injection du wording initial ("20 ans d'expertise. L'IA en plus.") |
| `src/data/v2/agence.ts` | Refonte du `hero.headline` / `subHeadline` / sub-nav |

### Nouveau fichier de données

`src/data/v2/agence-content.ts` — contient tout le contenu textuel riche (story, stats, team, values, hackathons, stack, approach, audience, CTA) porté depuis `src/data/about-content.ts`, adapté au shape v2.

### Composants retirés de `/v2/agence/page.tsx`

Les fichiers restent en place (au cas où), mais ne sont plus importés :
- `AgenceComposition` (sous-pages agency hub)
- `AgenceWhy` (remplacé par `AgenceApproach` + `AgenceValuesV2`)
- `AgenceMethod`
- `AgenceFAQ`
- `AgenceTeamPreview` (remplacé par `AgenceTeamFull`)
- `AgenceStory` (remplacé par `AgenceStoryV2`)
- `HomeTestimonialsV2` (retiré — cohérence narrative)
- `HomeRealisationsPreview` (retiré — la page devient "about", pas "portfolio")

---

## 3. Structure finale de `/v2/agence/page.tsx`

```tsx
<SubNavSetter items={subNavItems} />
<ScrollToTop />
<AgenceHero />           {/* "20 ans d'expertise. L'IA en plus." */}
<AgenceStoryV2 />        {/* id="histoire" — 3 paragraphes */}
<AgenceStats />          {/* id="stats" — 4 compteurs */}
<AgenceTeamFull />       {/* id="equipe" — 1/ligne, bios longues */}
<AgenceValuesV2 />       {/* id="valeurs" — 5 convictions */}
<AgenceHackathons />     {/* id="hackathons" — origin story */}
<AgenceStack />          {/* id="stack" — pipeline */}
<AgenceApproach />       {/* id="approche" — 3 piliers */}
<AgenceAudience />       {/* id="pour-qui" — checklist */}
<AgenceFinalCTA />       {/* id="contact" — CTA Cal */}
```

**Sub-nav items :**
```ts
const subNavItems = [
  { label: "Histoire", sectionId: "histoire" },
  { label: "Stats", sectionId: "stats" },
  { label: "Équipe", sectionId: "equipe" },
  { label: "Valeurs", sectionId: "valeurs" },
  { label: "Hackathons", sectionId: "hackathons" },
  { label: "Stack", sectionId: "stack" },
  { label: "Approche", sectionId: "approche" },
  { label: "Pour qui", sectionId: "pour-qui" },
  { label: "Contact", sectionId: "contact" },
];
```

---

## 4. Design par section — langage v2

### Conventions globales v2 appliquées partout

- Container : `SectionContainer` (padding `px-6 py-20 md:px-12 md:py-24`, max-width `max-w-6xl`).
- Headers : `title` + `subtitle` via props de SectionContainer, pas de `TextReveal` custom.
- Révélations : `BlurReveal` avec `delay` par item (0.08 à 0.2s).
- Tokens couleurs sémantiques : `bg-background-surface`, `bg-foreground/[0.04]`, `text-foreground/65`, `border-foreground/10`, `text-accent-primary`. JAMAIS `text-white`, `bg-white/…`, ni `bg-[#xxxxxx]`.
- Icônes : Lucide dans carrés arrondis `size-11 rounded-xl bg-accent-primary/10 text-accent-primary`, avec hover `group-hover:bg-accent-primary group-hover:text-white`.
- Cartes : `border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] rounded-2xl p-7`, hover `border-foreground/20 shadow-sm`.
- Transitions : `transition-all duration-500 ease-in-out` minimum partout.
- Typographie : minimum `text-sm` ; headings `font-heading font-bold tracking-tight`.
- Light mode : bordures `border-foreground/10` en dark seulement — en light, pas de bordures visibles sur les cartes (cf. commit `521659d`).

### 4.1 `AgenceHero` (modification)

Reprend la structure existante (halo orange top, pill eyebrow, H1, subhead, tags, CTAs). **Changement** : injection du wording initial.

- `hero.eyebrow` : `"L'équipe Aurentia"`
- `hero.headline` : `"20 ans d'expertise.\nL'IA en plus."` (gradient sur "20 ans" et "plus" comme dans l'initial, via span avec classe `bg-gradient-to-r from-accent-secondary to-accent-primary bg-clip-text text-transparent`).
- `hero.subHeadline` : `"On ne crée pas à partir de rien. On révèle le potentiel qui est déjà là. Trois profils complémentaires, un seul objectif : que votre business soit vu."`
- Tags → adaptés au nouveau sub-nav.
- CTA primary : `"Rencontrer l'équipe"` → `#equipe`.
- CTA secondary : `"Travailler avec nous"` → `/v2/contact`.

### 4.2 `AgenceStoryV2` (nouveau)

**Layout :** `SectionContainer` avec `innerClassName="max-w-3xl"`.

Pour chaque paragraphe (3 total) :
- `BlurReveal` avec `delay={index * 0.15}`.
- Bloc avec `border-l-2 border-accent-primary/30 pl-6`.
- Label en `text-sm font-mono tracking-wider text-accent-primary uppercase` : "Le constat" / "Le déclic" / "La mission".
- Texte du paragraphe : la première phrase est en `font-semibold text-foreground`, le reste en `text-foreground/65`. Splitter manuellement la première phrase via une fonction helper locale au composant (split sur `". "`). Pas d'animation de gradient — on reste sur BlurReveal simple pour rester v2.
- Taille : `text-base md:text-lg leading-relaxed md:leading-[1.8]`.

**Titre section** : `"Comment Aurentia est née"` — subtitle `"20 ans de constat, 6 mois de R&D, une seule conviction."`.

### 4.3 `AgenceStats` (nouveau)

**Layout :** `SectionContainer` sur `bg-background-surface` (alterner surfaces).

- Titre : `"Les chiffres parlent."`.
- Pas de subtitle — ou subtitle courte : `"Ce qu'on a construit en quelques mois."`.
- Grid `grid-cols-2 md:grid-cols-4 gap-8`.
- Pour chaque stat :
  - `NumberMorph` (composant existant) sur `value` + `suffix` → `text-5xl md:text-6xl font-mono font-black text-foreground`.
  - Label en `text-sm md:text-base text-foreground/60`.
  - Glow décoratif `bg-accent-primary/20 blur-2xl` derrière (comme dans `AboutProof`).

Stats :
- `{ value: 20, suffix: "ans", label: "d'expertise web cumulée" }`
- `{ value: 48, suffix: "h", label: "pour livrer votre V1" }`
- `{ value: 15, suffix: "+", label: "sites livrés" }`
- `{ value: 100, suffix: "%", label: "de clients satisfaits" }`

### 4.4 `AgenceTeamFull` (nouveau — **section critique**)

**Layout :** `SectionContainer` standard, children = `<div className="flex flex-col gap-10 md:gap-14">`.

**1 carte par ligne** (validation explicite utilisateur). Chaque carte :

- Hauteur mobile `auto`, desktop `md:min-h-[480px]`.
- Wrapper : `relative overflow-hidden rounded-3xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04]` (pas de bordure visible en light, OK avec convention v2).
- `isEven = index % 2 === 0` → alternance image droite / image gauche.

**Mobile (< md) :** image stacked au-dessus (h-[320px]) + contenu texte en dessous (p-5).

**Desktop (md+) :** side-by-side.
- Image en absolute, 55% width, bottom-0, `object-contain object-bottom`.
- Gradient fade depuis le côté texte vers l'image (cf. MemberCard de l'initial, lignes 218-225).
- Contenu à 55% width opposé :
  - Badge pill `bg-accent-primary/10 text-accent-primary font-mono text-sm tracking-wider uppercase`.
  - `h3` name en `text-3xl lg:text-4xl font-bold`.
  - Role en `text-base text-foreground/50`.
  - Bio `text-base lg:text-lg text-foreground/70 leading-relaxed`.
  - Tags : pills `border border-foreground/10 bg-foreground/[0.03]`, hover `border-accent-primary/30 text-accent-primary/80`.
  - LinkedIn : icône + label, hover `text-accent-primary`.

**Animations :** `BlurReveal` autour de la carte + entrée `x: isEven ? -80 : 80` avec `filter: blur(8px)` qui se résout sur ScrollTrigger.
**Pas de 3D tilt** (lourd, spécifique à l'initial) — on reste sur scale hover simple pour l'image.

**Titre section :** `"Trois regards. Une seule exigence."` (reprend le wording initial mais cohérent avec les 4 membres — à ajuster → `"Quatre profils. Une seule exigence."`).
**Subtitle :** `"20 ans de craft web, l'IA comme superpouvoir, et une ingénierie sans compromis."`

Données : les 4 membres (Elliot / Matthieu / Fabien / Olivier) avec bios longues, tags, LinkedIn, images. Reprise exacte de `teamMembers` dans `src/data/about-content.ts`.

### 4.5 `AgenceValuesV2` (nouveau)

**Layout :** Bento grid `grid-cols-1 md:grid-cols-2 gap-4 md:gap-6`, card avec `span: 2` = `md:col-span-2` pour la première.

Pour chaque carte :
- Icône Lucide dans carré `size-11 rounded-xl bg-accent-primary/10 text-accent-primary` (convention v2), hover `bg-accent-primary text-white`.
- `h3` en `text-lg md:text-xl font-semibold tracking-tight`.
- Paragraphe `text-sm md:text-base text-foreground/60 leading-relaxed`.

Valeurs (5) — reprise de `valueCards` dans `about-content.ts` :
1. **Révéler, pas créer** (Sun) — span 2
2. **48h. Pas 6 semaines.** (Zap)
3. **Tant que c'est pas parfait, on ne lance pas.** (Shield)
4. **On montre avant de facturer.** (Eye)
5. **Un interlocuteur. Pas un ticket.** (Users)

**Titre section :** `"Ce en quoi on croit."` — subtitle `"Cinq convictions. Pas des slogans — des règles qu'on applique sur chaque projet."`.

### 4.6 `AgenceHackathons` (nouveau)

**Layout :** `SectionContainer` standard, `innerClassName="max-w-5xl"`.

Structure reproduite de `AboutHackathons` :
- Header section avec badge eyebrow `"ORIGIN STORY"`, titre `"Séparés, on gagne. Ensemble, on domine."`, subtitle.
- **Phase solo** : header avec icône Zap dans rond + ligne de séparation horizontale.
- Grid `md:grid-cols-2 gap-12` avec les 2 cards solo (Matthieu / Elliot).
  - Chaque card = LinkedIn embed (iframe, height 520) + badge résultat (Trophy) + date + titre + description avec teammates liens.
- **Bridge** : "La rencontre. Le déclic." — pill centrée sur ligne gradient.
- **Phase duo** : header avec icône Users.
- Card duo layout horizontal md (LinkedIn 45% + content 55%).
- Closing quote en italique `text-foreground/50`.

Données : reprise exacte de `hackathonCards` et `hackathonSectionContent`.
**Simplification v2** : pas de `TextReveal` ou animations d'icônes bouncy, on reste sur `BlurReveal`.

### 4.7 `AgenceStack` (nouveau)

**Layout :** `SectionContainer` sur `bg-background-surface`.

Même structure que `AboutStack` :
- Header avec eyebrow `"Nos outils"` + titre `"Notre stack."`.
- Pipeline workflow :
  - **Mobile** : stacked vertical par phase (Design / Développement / Intelligence / Business). Icons cliquables dans une ligne, description de la tech sélectionnée en dessous. Flèche verticale entre phases.
  - **Desktop** : 4 colonnes horizontales avec icônes empilées, tooltip latéral sur hover, flèche horizontale entre phases.
- Interaction : state React `activeId` (hover desktop) et `mobileSelected` (tap mobile).

Données : reprise de `proofSectionContent.stackTechnologies` et des phases.

### 4.8 `AgenceApproach` (nouveau)

**Layout :** `SectionContainer` standard.

- Titre : `"L'IA comme instrument de précision. Pas comme raccourci."`.
- Subtitle : `"Ce qui nous sépare du reste."`.
- Grid `md:grid-cols-3 gap-6 md:gap-8`.
- Chaque carte (3 piliers) :
  - Icône Lucide (Cpu / Hammer / Handshake) dans carré `size-12 rounded-2xl`.
  - Accent color par pilier : orange / ambre / cyan → `bg-orange-500/10 text-orange-500`, etc.
  - Glow orb derrière la carte `w-40 h-40 rounded-full blur-3xl` avec la couleur correspondante.
  - Titre `text-xl md:text-2xl font-bold`.
  - Texte `text-sm md:text-base text-foreground/65`.

Données : reprise de `approachPillars`.

### 4.9 `AgenceAudience` (nouveau)

**Layout :** `SectionContainer` sur `bg-background-surface`, `innerClassName="max-w-3xl"`.

- Titre : `"Pour qui on travaille."`.
- Paragraphe intro `text-base md:text-lg text-foreground/65`.
- Checklist `ul` avec `space-y-5`.
- Chaque item :
  - Icône Check dans rond `bg-accent-primary/15 size-6 rounded-full`.
  - Texte `text-base md:text-lg text-foreground/80`.
  - Hover de l'item : `bg-foreground/[0.02]`.
- Conclusion en bas avec `border-l-2 border-accent-primary/40 pl-6 font-medium`.

Données : reprise de `audienceItems` et `audienceSectionContent`.

### 4.10 `AgenceFinalCTA` (nouveau)

**Layout :** `SectionContainer` avec `innerClassName="max-w-2xl"`, texte centré, `className="py-28 md:py-40 relative overflow-hidden"`.

- Titre gradient sur `text-4xl md:text-5xl lg:text-6xl font-bold`.
- Subtitle `text-base md:text-lg text-foreground/60`.
- Bouton principal `rounded-full bg-accent-primary text-white px-8 py-3.5` qui ouvre `CalModal`.
- 3 pills "proof" en dessous : `flex items-center gap-2` avec icône Check orange + texte `text-sm text-foreground/50`.
- Background orbs orange décoratifs (reprise de la logique `AboutCTA`).

Données : reprise de `aboutCtaContent`.

---

## 5. Data flow

**Nouveau fichier :** `src/data/v2/agence-content.ts`

Export typé de tout le contenu riche nécessaire aux nouveaux composants :

```ts
export const agenceContentData = {
  story: { title, subtitle, paragraphs: [...] },
  stats: [{ value, suffix, label }, ...],
  team: [{ name, role, badge, bio, tags, image, linkedin }, ...],
  values: { title, subtitle, cards: [{ icon, title, text, span? }, ...] },
  hackathons: { section, cards: [...] },
  stack: { technologies: [...], phases: [...] },
  approach: { title, subtitle, pillars: [...] },
  audience: { title, paragraph, items: [...], conclusion },
  finalCTA: { title, subtitle, cta, proofs: [...] },
};
```

Source : copie directe de `src/data/about-content.ts`, adaptée au shape ci-dessus. **Pas de ré-import** depuis `about-content.ts` car on veut que les deux pages (initiale `/a-propos` et v2 `/agence`) puissent évoluer indépendamment à l'avenir.

`src/data/v2/agence.ts` est conservé pour le hero + sub-nav, mais on supprime `subPages`, `teamPreview`, `finalCta` qui ne servent plus.

---

## 6. Responsive

- Mobile-first sur chaque composant.
- Breakpoints : `sm: 640` / `md: 768` / `lg: 1024`.
- Tests mentaux à prévoir sur 375px, 768px, 1280px.
- Team cards (section critique) : layout stacked sur mobile (image-top + texte-bas), side-by-side sur md+.
- Stack pipeline : layout vertical par phase sur mobile, horizontal 4-colonnes sur md+.
- Valeurs bento : `grid-cols-1` sur mobile, `md:grid-cols-2` avec span-2 sur la première.

---

## 7. Light / Dark

Strict respect de la convention v2 (cf. CLAUDE.md) :
- Tokens sémantiques partout : `bg-background-surface`, `bg-foreground/[0.04]`, `text-foreground/65`, `border-foreground/10`, `text-accent-primary`.
- Icônes qui doivent être visibles en light et dark : couleur `text-accent-primary` (orange), `text-orange-500`, `text-amber-500`, `text-cyan-500` pour les accents de pilliers.
- Boutons solides : `bg-accent-primary text-white` OK (le white est sur fond orange, contraste garanti). OU `bg-foreground text-background` si on veut inversion auto.
- Pas de `text-white` isolé sur fond qui change de thème.
- En light, les bordures `border-foreground/10` sont quasi-invisibles — c'est voulu (commit `521659d`).

---

## 8. Animations

- Toutes les révélations scroll via `BlurReveal` (existant, utilise ScrollTrigger en interne).
- `NumberMorph` pour les stats.
- Transitions `duration-500 ease-in-out` minimum sur hover.
- Pas de `position: sticky` ni `pin: true` (cf. CLAUDE.md).
- Pas de 3D tilt sur les team cards (trop custom, pas nécessaire).
- Animations staggered via `delay={index * 0.08}` à `0.2` sur les grids.

---

## 9. Accessibilité

- LinkedIn iframes : `title` prop sur chaque iframe.
- Boutons sans label visible : `aria-label`.
- `aria-pressed` sur les boutons tech phase (mobile) du `AgenceStack`.
- `role="tooltip"` + `aria-hidden={!isActive}` sur les tooltips.
- `min-h-11 min-w-11` sur les touch targets mobile.
- Alt text sur toutes les images d'équipe : `"Portrait de {member.name}"`.

---

## 10. Test plan

- [ ] Dev server : `bun dev` puis naviguer sur `/v2/agence` et vérifier chaque section.
- [ ] Tester les 10 sections en light + dark mode.
- [ ] Mobile 375px : toutes les sections rendent correctement, team cards en stacked, stack en vertical.
- [ ] Tablette 768px : grids passent en 2-col, stack bascule en horizontal.
- [ ] Desktop 1280px : team cards alternent L/R correctement.
- [ ] Sub-nav : les 9 items scrollent aux bonnes sections.
- [ ] Stats counter : NumberMorph tourne bien au scroll.
- [ ] Hackathons : iframes LinkedIn chargent.
- [ ] Stack : hover desktop montre tooltip, tap mobile switche la description.
- [ ] Final CTA : modal Cal s'ouvre.
- [ ] `/v2/agence/a-propos` : toujours accessible et fonctionnelle (non touchée).
- [ ] `/a-propos` (initiale, hors v2) : toujours accessible et fonctionnelle (non touchée).

---

## 11. Questions résolues

- ✅ `/v2/agence/a-propos` = laissée telle quelle, on décidera après.
- ✅ Sections hub actuelles (`AgenceComposition`, `AgenceWhy`, `AgenceMethod`, `AgenceFAQ`) = retirées du fichier page mais composants conservés.
- ✅ Sub-nav = Histoire / Stats / Équipe / Valeurs / Hackathons / Stack / Approche / Pour qui / Contact.
- ✅ Team cards = 1/ligne, photo bleed 55% + texte 45%, alternance L/R (option B).

---

## 12. Risques / Points d'attention

- **Longueur de page** : 10 sections riches = page très longue. Mitigation via sub-nav visible et ancres propres.
- **Duplication contenu** avec `/a-propos` initiale : intentionnelle pour l'instant. L'ancienne page pourra être supprimée dans une phase ultérieure.
- **Iframes LinkedIn** : CSP / cookies. Vérifier que `X-Frame-Options` de LinkedIn permet toujours l'embed (ça marche déjà sur l'initial).
- **Stack interactif** : complexité state. À tester soigneusement — une régression ici passerait inaperçue.
- **Wording "Trois regards"** dans AboutTeam original → ajuster en "Quatre profils" car on a 4 membres (Olivier inclus).
