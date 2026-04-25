@AGENTS.md

## Typographie

- **JAMAIS de `text-xs` ni de tailles custom inférieures à `text-sm` (pas de `text-[9px]`, `text-[10px]`, `text-[11px]`, etc.).** La taille minimum est `text-sm`. Aucun texte ne doit être plus petit que `text-sm`, nulle part.

## Transitions & Fluidité

- **RIEN ne doit être instantané.** Toutes les transitions (hover, apparition, disparition, changement d'état) doivent être progressives et fluides. Durée minimum : 500ms, idéalement 700ms. Easing : `ease-in-out` par défaut.
- Les changements de couleur, opacité, taille, position doivent TOUJOURS avoir une `transition` ou une animation. Jamais de changement brut sans transition.
- Pour les dégradés qui changent au hover : ne pas animer les gradient stops (non animable en CSS). Utiliser deux couches superposées et animer l'`opacity` de la couche hover.

## Light / Dark Theme

- **JAMAIS de couleurs hardcodées** (`text-white`, `bg-white/...`, `bg-[#1a1a18]`, `border-white/...`) dans les composants. Utiliser les tokens sémantiques : `text-foreground/...`, `bg-foreground/...`, `border-foreground/...`, `bg-background`, `bg-background-surface`.
- **Boutons solides** : utiliser `bg-foreground text-background` pour qu'ils s'inversent automatiquement (noir en light, blanc en dark).
- **Boutons ghost** : utiliser `border-foreground/... text-foreground/...`.
- **Seule exception** : les éléments décoratifs purement visuels (shimmer `via-white/15` sur fond orange, etc.) peuvent rester en `white`.
- **Chaque composant doit être visuellement parfait dans les DEUX thèmes.** Toujours vérifier.

## Scroll & Animations

- **Toutes les animations scroll doivent être lentes, douces et modernes.** Les sections pinnées/sticky doivent avoir assez de hauteur pour que le scroll soit confortable et progressif, jamais brusque.
- Privilégier des transitions fluides et des easings doux. L'utilisateur doit avoir le temps de lire et apprécier chaque étape.
- Les effets de parallax, fade, scale doivent se dérouler sur une distance de scroll confortable — ne jamais aller trop vite.
- **Il ne doit JAMAIS y avoir de moment mort au scroll.** À chaque pixel scrollé, quelque chose doit bouger ou se transformer. Pas de zone vide où rien ne se passe — les animations doivent se chevaucher et s'enchaîner sans interruption.
- **JAMAIS de `position: sticky` ou de `pin: true` sur les sections full-screen.** Ces techniques créent un "gel" perceptible au scroll quand le contenu se fixe. Utiliser des sections `h-screen` normales avec des animations scroll-triggered (`scrub`) à la place. Le contenu doit toujours scroller naturellement — jamais de moment où le scroll avance mais rien ne bouge à l'écran. Exception : le HomeHero qui a un système de parallax scroll spécifique bien calibré.

## Layout sections (surface vs. non-surface)

Deux types de sections coexistent sur les pages v2 :
- **Sections surface** (`SectionContainer surface={true}`) : le contenu vit dans une card `bg-background-surface` aux coins arrondis (`rounded-[2.5rem]`), détachée des bords de la page. Le **frame extérieur** de la card fait `max-w-[1400px]`, et son **contenu intérieur** est à `max-w-6xl` (plus resserré, pour contraster avec la card).
- **Sections non-surface** (bg default, pas de card) : le contenu doit matcher la **largeur du frame extérieur** des sections surface — donc `max-w-[1400px]`, et **NON** la largeur du contenu intérieur des surface (`max-w-6xl`).

**Règle** : le contenu des sections hors surface doit toujours s'aligner à la même "ligne visuelle extérieure" que les cards surface. Cela crée un rythme cohérent : les surface ont leur card bien délimitée, les non-surface respirent plus large pour matcher cette ligne. Ne jamais confondre "contenu intérieur d'une surface" et "contenu d'une non-surface" — ce sont deux largeurs différentes.

Exception : les sections avec `innerClassName` custom (ex : FAQ à `max-w-3xl`) override cette règle pour des cas de lisibilité spécifiques.
