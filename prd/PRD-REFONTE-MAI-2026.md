# PRD — Refonte post-réunion associés (mai 2026)

> **Date** : 2026-05-20
> **Source** : Notes de réunion Elliot × associés
> **Objectif** : Tranche d'ajustements transversaux sur la home, le footer, les pages `/a-propos`, `/contact`, `/ressources`, la navbar et le chatbot.
> **Branche cible** : `refonte-mai-2026` (à créer depuis `main`)
> **Format PR** : 1 PR par bloc (HomePage / Footer / A-propos / Contact / Ressources / Navbar / Global) pour relectures atomiques. Ne **pas** monolithe.

---

## 0. Principes transverses

1. **Aucune régression visuelle** sur le dark mode. Chaque modif texte/icône → vérifier light + dark.
2. **Pas d'instantané** — toute nouvelle transition ≥ 500ms, easing `ease-in-out` (cf. `CLAUDE.md`).
3. **Texte minimum `text-sm`** — interdit de descendre en dessous nulle part.
4. **Pas de hardcoded color** — tokens sémantiques (`text-foreground`, `bg-foreground/...`, etc.).
5. **Conventional commits** : un commit = un bullet du PRD. Ex : `feat(home): swap services / trust order`, `chore(footer): rename copyright to Aurentia`, `fix(home): cap realisations card hover scale`.

---

## 1. HomePage — `/`

### 1.1 Hero — nouvelle H1 + nouveau title SEO

**Décision (Q1, validée 2026-05-20)** : aligner le `<title>` SEO sur la nouvelle baseline marque.

**Fichier copy** : `src/data/v2/home.ts` (key `hero.headline`)
**Avant** :
```
"On construit vos sites,\nSaaS et outils IA."
```
**Après** :
```
"L'agence web / IA qui ne lance pas\ntant que ce n'est pas parfait."
```

**Fichier metadata** : `src/app/page.tsx` (`metadata.title`)
**Avant** : `"Agence web & IA à Avignon — Sites, SaaS, automatisations"`
**Après (proposition)** : `"Aurentia Agency — L'agence web & IA qui ne lance pas tant que ce n'est pas parfait"`

⚠️ **Garde-fou SEO** : Google tronque autour de 60-65 caractères. La proposition est longue (~95 car). Versions plus courtes possibles :
- A (courte, marque forte) : `"L'agence web & IA qui ne lance pas tant que ce n'est pas parfait"` (62 car.)
- B (hybride mots-clés + marque) : `"Aurentia Agency — Sites, SaaS & IA, livrés parfaits"` (52 car.)

Je pars sur **A** par défaut sauf override. La `metadata.description` reste comme aujourd'hui (mots-clés SEO conservés).

### 1.2 Hero — ajout du logo Aurentia (SVG fourni par Elliot)

**Fichier** : `src/components/v2/home/HomeHeroV2.tsx`
**Intent** : afficher le logo Aurentia entre la pill "Agence Web & IA" et la H1, taille ≈ 48–64px, fade-in / blur-in à l'apparition.

**Asset** : 🟡 **En attente** — Elliot fournira le SVG. Le placer dans `public/images/logo-aurentia.svg` (ou alternative).

**Implémentation côté composant** :
- Si SVG inline → composant React dédié `<AurentiaLogo />` pour scaler proprement (couleur via `currentColor` pour s'adapter au theme).
- Sinon → `<Image src="/images/logo-aurentia.svg" width={56} height={56} priority />`.
- Le logo doit être visible en light **et** dark mode → si l'asset est monochrome avec couleur fixe, créer 2 variantes ou utiliser `currentColor`.

### 1.3 Section "Nos services" — `Sites Web` doit lister TOUTES les offres

**Fichier** : `src/components/v2/home/HomeServicesV2.tsx` constante `TABS[0]` (key `sites-web`)
**Avant** : 2 offres (Site vitrine, Landing page)
**Après** : 4 offres alignées sur la navbar :
- Site vitrine — `/sites-web/site-vitrine` — Visual `VitrineMockup` — 1 500 €
- Landing page — `/sites-web/landing-page` — Visual `LandingMockup` — 1 500 €
- **E-commerce** — `/sites-web/ecommerce` — Visual à définir (probablement `VitrineMockup` ou nouveau) — dès 2 500 €
- **Site sur-mesure** — `/sites-web/sur-mesure` — Visual à définir — dès 6 000 €

> Le layout `md:w-[340px] lg:w-[360px]` + `flex-wrap` doit gérer 4 cartes sans casser.

### 1.4 Inverser ordre "Nos services" ↔ "Ils nous font confiance"

**Décision (validée 2026-05-20)** : extraire le marquee du hero, le rendre via `<HomeLogoStrip />` et l'insérer **après** `<HomeServicesV2 />`.

**Fichiers** : `src/components/v2/home/HomeClient.tsx` + `src/components/v2/home/HomeHeroV2.tsx`

**État actuel** :
- Le marquee "Ils nous font confiance" est **intégré au hero** (`HomeHeroV2`, lignes 99–129).
- `HomeServicesV2` vient juste après dans `HomeClient`.

**Implémentation** :
1. Supprimer le bloc marquee de `HomeHeroV2.tsx` (lignes ~99–129 + constante `CLIENT_LOGOS` qui doit migrer vers `HomeLogoStrip` ou rester en data si pas déjà).
2. Vérifier que `HomeLogoStrip.tsx` (composant existant) affiche bien la même liste / animation. Sinon, l'aligner.
3. Insérer `<HomeLogoStrip />` dans `HomeClient` après `<HomeServicesV2 />`.

Ordre final dans `HomeClient` :
```
HomeHeroV2 (sans marquee)
HomeServicesV2
HomeLogoStrip            ← déplacé ici
HomeRealisationsPreview
HomeBookingCTA
HomeWhyAurentia
…
```

### 1.5 Bug d'agrandissement des réalisations

**Fichier** : `src/components/v2/home/HomeRealisationsPreview.tsx`, ligne 114
**Symptôme** : sur hover d'une carte du carrousel, l'image scale à `1.10` + translate `-1` et **sort du conteneur** (le wrapper `aspect-[16/10] overflow-hidden` est OK mais l'image en `object-contain` agrandit son bounding box ressenti et chevauche les cartes voisines à cause du `flex-shrink-0` sans clipping de la slide).

**Fix** :
1. Ajouter `overflow-hidden` sur le wrapper `<div className="flex-shrink-0 px-4 md:px-6">` (ligne 192) → empêche tout débordement latéral.
2. Réduire `group-hover:scale-[1.10]` → `group-hover:scale-[1.04]` (ligne 114) pour une animation plus discrète.
3. Vérifier que `transition-transform duration-[900ms]` est conservé (cf. règle transitions ≥ 500ms).

> À tester sur mobile (1 carte visible) ET desktop (3 cartes visibles) avant validation.

### 1.6 Section "Pourquoi faire le choix Aurentia" — uniformiser le logo WhatsApp

**Décision (Q4, validée 2026-05-20)** : icône Lucide comme les autres, **mais en vert** (couleur WhatsApp préservée).

**Fichier** : `src/components/v2/home/HomeWhyAurentia.tsx`, lignes 27–35 + `src/data/v2/home.ts` ligne 85.

**État actuel** : WhatsApp rendu via `<Image src="/images/icons/whatsapp-icon.webp" />` avec drop-shadow vert, **différent** des autres items (icône Lucide dans `<div>` cercle orange).

**Fix** :
1. `src/data/v2/home.ts` ligne 85 : remplacer `image: "/images/icons/whatsapp-icon.webp"` par `icon: MessageCircle` (import Lucide) + flag `accent: "green"` (nouveau champ optionnel dans le type `WhyAurentiaItem`).
2. `HomeWhyAurentia.tsx` : adapter le rendu pour appliquer la couleur verte sur le cercle + l'icône quand `accent === "green"`. Sinon couleur orange par défaut.
3. Couleurs vertes recommandées (alignées sur la palette WhatsApp officielle, sans hardcoder en hex) :
   - Cercle : `bg-[#25D366]/10` (équivalent du `bg-accent-primary/10` mais en vert)
   - Icône : `text-[#25D366]` au repos, `text-white` + `bg-[#25D366]` au hover (miroir du comportement orange actuel)
4. Garde le même `size-11 rounded-xl` que les autres items pour uniformité.
5. Supprimer le rendu `<Image>` (lignes 27–35) → tout passe par le path `Icon ? <div>…</div>`.

> Variante propre : créer une couche `accentClasses(accent)` qui mappe `"orange" | "green"` vers les bonnes classes Tailwind. Évolutif si on ajoute d'autres accents plus tard.

### 1.7 Supprimer les tirets cadratins "—" sur toutes les pages

**Scope** : toutes les pages, copy uniquement (pas les commentaires de code, pas les frontières `// ───` dans le code).

**Fichiers principaux concernés** (audit grep `" — "` dans `src/data/v2/*.ts`) :
- `src/data/v2/home.ts` (multiples)
- `src/data/v2/agence-content.ts` (multiples)
- `src/data/v2/agence-a-propos.ts`
- `src/data/v2/footer.ts` (legalLine + `"Formation IA — bientôt"`)
- Composants avec copy inline : `HomeHeroV2`, `HomeServicesV2`, `AgenceHero`, `ContactSplitForm`, etc.

**Règle de remplacement** :
- `" — "` (espace tiret cadratin espace) → `", "` ou `" · "` selon le sens.
- Choix par défaut : `", "` pour les énumérations, `"."` (nouvelle phrase) si ça sépare deux idées indépendantes.
- Aucun em-dash résiduel dans les `data/v2/*.ts`.

**Garde-fous** :
- Ne **pas** toucher aux JSDoc / commentaires / séparateurs ASCII (`// ─────`).
- Garder les apostrophes typographiques (`'`).
- Ne pas remplacer les tirets demi-cadratins `–` (différents) sauf si Elliot le confirme.

### 1.8 Section "Ressources" — supprimer les illustrations

**Fichier** : `src/components/v2/home/HomeRessourcesPreview.tsx`, lignes 76–102
**Intent** : supprimer le bloc cover (radial gradient + cercle icône + grid pattern) — ne laisser que la partie texte (catégorie, titre, excerpt, "Lire le guide").

**Implémentation** :
- Supprimer le bloc `<div className="relative aspect-[16/9] …">` jusqu'à sa fermeture.
- Adapter le padding de la card pour compenser (la card devient plus aérée, padding `p-7` recommandé).
- Conserver le composant `SpotlightCard`.
- Le hover scale de l'icône disparaît avec la cover — c'est OK, on garde un hover plus sobre sur le titre/excerpt.

### 1.9 Ajouter les "wins LinkedIn hackathon" sous "Nos services" — version compacte

**Décision (Q5, validée 2026-05-20)** : version **compacte** sur la home (la full version reste sur `/a-propos`).

**Fichier** : `src/components/v2/home/HomeClient.tsx` + nouveau composant `src/components/v2/home/HomeHackathonsCompact.tsx` (à créer).

**Pourquoi compact** : la home est déjà longue et le full layout (solo + bridge + duo + closing) double la longueur de la section. Sur la home on garde l'essentiel : le social proof brut.

**Structure compacte proposée** :
- `SectionContainer` avec eyebrow "Reconnaissance" + title (court, ex: `"3 podiums en hackathons IA"`) + subtitle (1 ligne max).
- Grille horizontale des cartes — toutes les `agenceHackathons` (3 entrées : 2 solo + 1 duo) alignées en `grid-cols-1 md:grid-cols-3`.
- Réutiliser le composant `HackathonCardContent` (le sortir dans un fichier partagé `src/components/v2/agence/HackathonCardContent.tsx` pour mutualisation).
- **Pas de bridge, pas de closing italic, pas de phase labels** sur la home.
- CTA en bas : `"Voir le détail →"` qui pointe vers `/a-propos#hackathons`.

**Implémentation pratique** :
1. Extraire `HackathonCardContent` de `AgenceHackathons.tsx` dans un fichier dédié et l'exporter.
2. Créer `HomeHackathonsCompact` qui consomme `agenceHackathons` + `HackathonCardContent`.
3. L'importer dans `HomeClient` entre `HomeServicesV2` et `HomeLogoStrip`.

Ordre final mis à jour dans `HomeClient` :
```
HomeHeroV2 (sans marquee)
HomeServicesV2
HomeHackathonsCompact    ← nouveau
HomeLogoStrip
HomeRealisationsPreview
…
```

---

## 2. Footer

**Fichier** : `src/data/v2/footer.ts` + `src/components/v2/layout/FooterV2.tsx`

### 2.1 Colonne "Légal" — vérifier 3 entrées

État actuel **conforme** : CGV, Mentions légales, Politique de confidentialité (lignes 38–44 de `footer.ts`). ✅ Rien à faire.

### 2.2 Copyright bas-droite — "Aurentia" sans "Agency"

**Avant** : `legalLine: "© Aurentia Agency — Tous droits réservés"`
**Après** : `legalLine: "© Aurentia, Tous droits réservés"` (et déplacer en **bas à droite** au lieu de **bas à gauche**).

**Fichier composant** : `FooterV2.tsx` lignes 55–60 — actuellement `legalLine` est à gauche et "Construit avec amour…" à droite. **Inverser** : swap des deux `<p>`.

### 2.3 Lien "Ressources" → URL absolue

**Avant** : `{ label: "Ressources", href: "/agence" }` (ligne 32)
**Après** : `{ label: "Ressources", href: "/ressources" }` (relatif, Next gère le préfixe ; pas besoin de URL absolue `https://www.aurentia.agency/ressources` car SSR + canonical OK).

### 2.4 Lien "Blog" et "Réalisations" → popup "en cours"

**État actuel** :
- `/blog` est déjà dans `WIP_PATHS` de `src/components/shared/WipModal.tsx` (ligne 23) ✅
- `/realisations` est dans `WIP_PREFIXES` (ligne 30) ✅
- Le composant `WipAwareLink` est déjà utilisé partout via `FooterV2.tsx`.

**Décision (Q6, validée 2026-05-20)** : ajouter explicitement un lien "Réalisations" dans la colonne "L'agence" du footer.

**Fichier** : `src/data/v2/footer.ts`, colonne `L'agence` (lignes 27–36)
**Ajouter** :
```ts
{ label: "Réalisations", href: "/realisations" },
```
(à insérer entre "À propos" et "Blog" — ordre logique de la nav). Le `WipAwareLink` ouvrira automatiquement le modal "en cours" puisque `/realisations` est dans `WIP_PREFIXES`.

---

## 3. Page `/a-propos`

### 3.1 Hero — passer à "25 ans d'expertise"

**Fichier** : `src/components/v2/agence/AgenceHero.tsx`, ligne 65
**Avant** : `<span>20 ans</span>{" d'expertise."}`
**Après** : `<span>25 ans</span>{" d'expertise."}`

> Le hero `/a-propos` utilise `AgenceHero`, pas `AProposHero` (cf. `src/app/a-propos/page.tsx:46`). On modifie **AgenceHero**.

### 3.2 Section chiffres + alignement global `20 ans` → `25 ans`

**Décision (validée 2026-05-20)** : aligner **partout** dans le repo. Sinon incohérence visible (un coup 20, un coup 25, selon la section).

**Scope** : grep `"20 ans"` côté UI/data → ~11 occurrences à mettre à jour.

**Fichiers concernés (audit complet à refaire avant exécution)** :
- `src/data/v2/agence-content.ts` :
  - L77 — stat `{ value: 20, suffix: "ans", … }` → `25`
  - L59 — `subtitle: "20 ans de constat, …"` → `25 ans`
  - L63 — `"En 20 ans de création web, …"` → `25 ans`
  - L71 — `"20 ans d'expertise comme garde-fou"` → `25 ans`
  - L124 — `badge: "20 ans de création web"` → `25 ans`
  - L125 — bio Olivier `"20 ans à forger…"` → `25 ans` (⚠️ **à valider** : si la bio fait référence à un fait biographique réel daté, peut-être garder `20 ans` côté bio individuelle. Voir note ci-dessous.)
  - L131 — `"20 ans de craft web"` → `25 ans`
  - L170 — `subtitle: "20 ans de craft web, …"` → `25 ans`
  - L295 — `"20 ans de création web, ça forge un œil…"` → `25 ans`
- `src/data/v2/agence-a-propos.ts` — auditer
- `src/components/v2/agence/AgenceHero.tsx` L65 — `<span>20 ans</span>` → `25 ans` (cf. §3.1)

> ⚠️ **Note sur les bios individuelles** : si "25 ans" sort d'une logique factuelle (Olivier serial entrepreneur 25 ans → cf. L155 "4 sociétés créées et cédées en 25 ans"), alors le "20 ans" de bio Olivier L125 est une **incohérence interne du data déjà présente**. Le passage à 25 ans le règle automatiquement. ✅ Pas de blocage.

### 3.3 Manifeste — reformatage du titre + suppression du sous-titre

**Fichier** : `src/data/v2/agence-content.ts`, lignes 306–309
**Avant** :
```ts
export const agenceApproachSection = {
  title: "L'IA comme instrument de précision. Pas comme raccourci.",
  subtitle: "Ce qui nous sépare du reste.",
};
```
**Après** :
```ts
export const agenceApproachSection = {
  title: "L'IA comme instrument de précision.\nPas comme raccourci.",
  subtitle: "",
};
```

**Côté rendu** (`src/components/v2/agence/AgenceApproach.tsx`) : vérifier que la H2 supporte `\n` via `whitespace-pre-line` ; sinon découper en deux `<span>` avec `<br />` ou stylé. Le composant `SectionContainer` injecte le title — confirmer que les `\n` passent.

> Si `subtitle === ""` cause un rendu vide indésirable, conditionner l'affichage dans `SectionContainer` (`{subtitle && <p>…</p>}`).

---

## 4. Page `/contact`

### 4.1 Vérifier que le formulaire fonctionne

**Fichier** : `src/components/v2/contact/ContactSplitForm.tsx` + endpoint API.
**Tâche** : test end-to-end manuel en dev (`pnpm dev`), soumettre un formulaire valide + un formulaire invalide, vérifier :
1. Validation Zod (champs requis, email valide).
2. Endpoint POST (à identifier — probablement `/api/contact/*` ou n8n webhook).
3. État UX : loading, success (l'animation success-panel a été ajoutée commit `2569d3e`), erreur.
4. Aucune erreur console.

→ **Livrable** : court rapport "OK" / liste de bugs si trouvés. **Si bug** : créer un sous-PR `fix(contact): …`.

### 4.2 Disponibilités — "24/24, 7/7"

**Fichier** : `src/app/contact/page.tsx`, ligne 59
**Avant** : `value: "Lun – Ven · 9h – 19h"`
**Après** : `value: "24h / 24, 7j / 7"`

> Mettre à jour aussi le schema `localBusiness` dans `src/lib/seo/schema.ts` si `openingHoursSpecification` est renseigné. À auditer.

---

## 5. Page `/ressources`

### 5.1 Email gate au clic de la carte ressource

**Décision (validée 2026-05-20)** : liste publique + **gate au clic de la carte** (modal email qui débloque la nav vers la page détail).

**Pourquoi ce choix** :
- SEO préservé : `/ressources` reste indexable (titres + excerpts des guides).
- Lead capture en haut de funnel : on capture le mail **avant** que l'utilisateur consomme, pas après.
- Le gate actuel sur le bouton de copie (page détail, fin de page) est trop tard — l'utilisateur a lu, screenshoté, repompé à la main. Conversion mail pourrie.
- Tracking propre : un mail = une intention claire d'accéder à au moins une ressource.

**Fichiers à modifier** :
- `src/components/v2/ressources/RessourcesIndexPage.tsx` : intercepter le clic sur chaque carte ressource ; si pas d'auth en `localStorage` (clé `aurentia:ressources:auth`, déjà gérée par `EmailGate.tsx`), ouvrir un **modal email** au lieu de naviguer.
- Modal : réutiliser le visuel et la logique de `EmailGate.tsx` (form, validation, POST `/api/ressources/request`, écriture localStorage). Extraire la partie form dans un composant partagé `EmailGateForm` que `EmailGate` (page détail) et `RessourcesIndexPage` (modal) consomment tous les deux.
- Après validation du mail : fermer le modal et `router.push(resource.href)`.
- `EmailGate.tsx` (page détail) reste en place comme **safety net** : un utilisateur qui arrive directement sur `/ressources/vibe-coding` (lien externe, partage) voit toujours le gate au moment de consommer.

**Implémentation côté UX** :
- Animation modal : fade + slide-up, durée ≥ 500ms (cf. règles transitions globales).
- Le modal doit être fermable (X + clic en dehors + Escape).
- Si l'utilisateur ferme sans valider : aucune navigation, on reste sur la liste.
- Mémorisation `localStorage` : un seul mail à filer, ensuite les futures cartes débloquent sans modal.

**Hors scope** : ne pas re-prompter les utilisateurs déjà validés (lecture `aurentia:ressources:auth` au mount).

### 5.2 Email gate — connecter le webhook n8n

Confirmer que `/api/ressources/request` envoie bien vers le webhook n8n (cf. commit `f6baa14` qui a remplacé un appel RPC par un webhook n8n côté ressources). À tester manuellement.

---

## 6. Navbar

**Fichier** : `src/data/v2/navbar.ts`

### 6.1 Réduire à 3 onglets

**Décision (Q9 + Q10, validée 2026-05-20)** :
- Méga-menu "Nos expertises" : **3 colonnes groupées + headers** ("Sites Web", "SaaS", "Solutions IA").
- CTA primaire navbar : **statu quo "Prendre RDV"** (pas de bascule vers "Audit gratuit").

**Avant** : `Sites Web`, `SaaS`, `Solutions IA`, `L'agence` (4 entrées top-level)
**Après** : `Nos expertises`, `Nos réalisations`, `L'agence` (3 entrées)

**Structure proposée** — avec champ `group` sur chaque enfant pour le rendu en colonnes :

```ts
sections: [
  {
    label: "Nos expertises",
    href: "/#pillars",
    children: [
      // === Sites Web ===
      { group: "Sites Web", label: "Site vitrine", href: "/sites-web/site-vitrine", description: "…" },
      { group: "Sites Web", label: "Landing page", href: "/sites-web/landing-page", description: "…" },
      { group: "Sites Web", label: "E-commerce", href: "/sites-web/ecommerce", description: "…" },
      { group: "Sites Web", label: "Site sur-mesure", href: "/sites-web/sur-mesure", description: "…" },
      // === SaaS ===
      { group: "SaaS", label: "SaaS sur-mesure", href: "/saas", description: "…" },
      { group: "SaaS", label: "Marque blanche pour agences", href: "/saas/agences", description: "…" },
      // === Solutions IA ===
      { group: "Solutions IA", label: "Audit IA", href: "/solutions-ia/audit", description: "…" },
      { group: "Solutions IA", label: "Implémentation IA", href: "/solutions-ia/implementation-ia", description: "…" },
      { group: "Solutions IA", label: "Configuration Claude", href: "/solutions-ia/configuration-claude", description: "…" },
      { group: "Solutions IA", label: "Formation IA", href: "/solutions-ia/formation-ia", description: "…", comingSoon: true },
    ],
  },
  {
    label: "Nos réalisations",
    href: "/realisations", // ouvre WIP modal (déjà géré par WipAwareLink)
    children: [], // ou : liste de quelques cas client emblématiques quand prêtes
  },
  {
    label: "L'agence",
    href: "/agence",
    children: [ /* identique à l'état actuel */ ],
  },
],
```

**Implémentation MegaMenu** :
1. Ajouter `group?: string` au type des `children` dans `src/data/v2/types.ts`.
2. Dans `src/components/v2/layout/MegaMenu.tsx` : quand l'item a des `children` avec `group`, grouper par `group` et rendre en colonnes (`grid-cols-3` desktop) avec un header par groupe (style `text-sm font-semibold uppercase tracking-[0.12em] text-foreground/55`).
3. Si pas de `group` sur les children (cas "L'agence"), garder le rendu actuel en liste simple.
4. Mobile (`NavbarV2Mobile.tsx`) : accordion classique, les groupes deviennent des sous-headers dans l'accordion. Vérifier que la profondeur reste navigable.

### 6.2 Mobile

`NavbarV2Mobile.tsx` doit aussi être adapté (accordion par section). À vérifier.

---

## 7. Toutes les pages — modifs globales

### 7.1 Chatbot — objectif "Audit business / SaaS / site web offert"

**Fichier** : `src/components/v2/chatbot/ChatbotWidget.tsx` + `src/app/api/chat/route.ts` (system prompt)

**Intent** : reframer le chatbot et le booking CTA pour proposer **3 types d'audit gratuit** :
1. Audit business
2. Audit SaaS
3. Audit site web

**Changements à prévoir** :
- **System prompt** (`route.ts`) : injecter l'objectif "Qualifier le besoin + proposer un audit gratuit (business / SaaS / site web) au lieu d'un simple RDV".
- **Welcome message** / suggested prompts du chatbot : "Audit business gratuit", "Audit SaaS gratuit", "Audit site web gratuit".
- **CTA primaire** : peut basculer de "Prendre RDV" à "Réserver mon audit gratuit". *Voir Q10.*
- **Booking embed** (`HomeBookingEmbed`) : si le Cal.com est segmenté par type d'audit, créer 3 event types et router selon la conversation. Sinon, garder un seul créneau "Audit gratuit".

### 7.2 Supprimer "Avignon" du visible — garder dans la meta data

**Règle** :
- ✅ Conserver dans : `metadata` (`description`, `title` côté SEO), `JsonLd` (`localBusiness.address.addressLocality`), `areaServed` ; tous les contextes invisibles utilisateur.
- ❌ Retirer du **rendu visible** : pills hero, body copy, hero subhead, etc.

**Fichiers concernés (audit grep `Avignon` côté UI)** :
- `src/components/v2/agence/AgenceHero.tsx` ligne 59 — retirer `· Avignon`
- `src/components/v2/agence/AProposHero.tsx` ligne 58 — idem
- `src/components/v2/home/HomeHeroV2.tsx` ligne 63 — `Agence Web & IA · Avignon` → `Agence Web & IA`
- `src/components/v2/agence/AgenceTeamFull.tsx` + `src/components/v2/agence/AgenceStoryV2.tsx` — vérifier copy
- `src/components/v2/sites-web/SitesWebHeroV2.tsx`, `SaaSAntiPitchV2.tsx`, `ImplementationIAHeroV2.tsx`, `FormationTrainersV2.tsx` — auditer
- `src/data/v2/home.ts`, `agence-content.ts`, `solutions-ia-formation.ts`, `sites-web-vitrine.ts`, `sites-web-sur-mesure.ts` — auditer chaque occurrence

**Fichiers à NE PAS toucher** :
- `src/lib/seo/schema.ts` (LocalBusiness JSON-LD)
- `src/app/*/page.tsx` `metadata.description` SEO
- `src/data/projects.ts`, `realisations/generated.ts` (data source)
- `src/content/realisations/maison-enileh.mdx` (contenu éditorial)
- `src/app/contact/page.tsx` ligne 54 (`MapPin` coordonnées) — **Décision Q11 : on garde** "Avignon · interventions partout en France". Seul endroit visible où la ville reste affichée, pour transparence/confiance.

---

## 8. Tableau récap — fichiers principaux modifiés

| Bloc | Fichiers principaux |
|---|---|
| 1 HomePage | `src/data/v2/home.ts`, `HomeHeroV2.tsx`, `HomeClient.tsx`, `HomeServicesV2.tsx`, `HomeRealisationsPreview.tsx`, `HomeWhyAurentia.tsx`, `HomeRessourcesPreview.tsx` |
| 2 Footer | `src/data/v2/footer.ts`, `FooterV2.tsx` |
| 3 A-propos | `AgenceHero.tsx`, `src/data/v2/agence-content.ts`, `AgenceApproach.tsx` |
| 4 Contact | `src/app/contact/page.tsx`, `ContactSplitForm.tsx` |
| 5 Ressources | `RessourcesIndexPage.tsx`, `EmailGate.tsx` |
| 6 Navbar | `src/data/v2/navbar.ts`, `MegaMenu.tsx`, `NavbarV2Mobile.tsx` |
| 7 Global | `ChatbotWidget.tsx`, `src/app/api/chat/route.ts`, multiples (grep Avignon), grep em-dash |

---

## 9. Critères de validation (DoD)

Avant merge sur `main` :

- [ ] Tous les changements de copy validés par Elliot (relecture).
- [ ] `pnpm typecheck` ✅
- [ ] `pnpm lint` ✅
- [ ] `pnpm build` ✅ (no SSR errors)
- [ ] Smoke test manuel desktop + mobile :
  - Home : hero, services x4 sites web, ordre swap services/clients, hackathons sous services, réalisations sans bug d'agrandissement, ressources sans illustration, WhatsApp uniformisé.
  - Footer : copyright "Aurentia" en bas à droite, Ressources lien correct, Blog popup, Realisations popup.
  - `/a-propos` : 25 ans hero + stats, manifeste reformaté.
  - `/contact` : formulaire OK end-to-end, 24/7 affiché.
  - `/ressources` : gate cohérent avec décision Q8.
  - Navbar : 3 onglets desktop + mobile.
  - Chatbot : pitch "audit gratuit" cohérent.
  - Pas d'« Avignon » visible nulle part hors meta.
- [ ] Dark mode visuellement parfait pour chaque modif.
- [ ] Aucun em-dash résiduel dans `src/data/v2/*.ts`.
- [ ] `pnpm dev` testé sur Chrome + Safari mobile.

---

## 10. Décisions actées au 2026-05-20

Toutes les questions sont tranchées. ✅

| # | Sujet | Décision | Section |
|---|---|---|---|
| Q1 | Title SEO home | Aligner sur la nouvelle baseline marque (proposition A — `"L'agence web & IA qui ne lance pas tant que ce n'est pas parfait"`, ~62 car.). | §1.1 |
| Q2 | Logo hero | Logo Aurentia, **SVG fourni par Elliot** (en attente de l'asset avant intégration). | §1.2 |
| Q3 | Ordre clients/services | Marquee extrait du hero → rendu via `HomeLogoStrip` après `HomeServicesV2`. | §1.4 |
| Q4 | Icône WhatsApp | Lucide `MessageCircle` dans le même cercle que les autres, mais en **vert** (`#25D366`). | §1.6 |
| Q5 | Hackathons sur la home | Version **compacte** (nouveau composant `HomeHackathonsCompact`). Full version reste sur `/a-propos`. | §1.9 |
| Q6 | Lien "Réalisations" footer | Ajouter dans la colonne "L'agence" (WIP modal automatique). | §2.4 |
| Q7 | Alignement 20 → 25 ans | Aligner partout dans le repo (~11 occurrences). | §3.2 |
| Q8 | Email gate `/ressources` | Liste publique + gate au clic carte (option C). Refactor `EmailGateForm` partagé. | §5.1 |
| Q9 | Méga-menu "Nos expertises" | 3 colonnes groupées avec headers ("Sites Web", "SaaS", "Solutions IA"). | §6.1 |
| Q10 | CTA navbar | **Statu quo "Prendre RDV"**. Pas de bascule vers "Audit gratuit". | §6.1 |
| Q11 | Avignon sur `/contact` | Garder (seul endroit visible). | §7.2 |

### Dépendances avant exécution

- 🟡 **Asset bloquant** : SVG du logo Aurentia à fournir par Elliot (cf. §1.2). Sans ça, on peut tout faire sauf le hero. → On peut commencer le code en parallèle et ajouter le logo en dernier.

---

## 11. Hors scope (à traiter dans un autre PRD)

- Création du contenu réel des pages `/realisations` détaillées (toujours en WIP).
- Refonte du page `/blog` (WIP).
- Création des 3 event types Cal.com pour les audits si choix de segmentation (Q10).
- Refonte de la stack page `/a-propos` (commentée actuellement dans le code).
