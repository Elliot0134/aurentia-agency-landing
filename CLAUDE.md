@AGENTS.md

## Typographie

- **JAMAIS de `text-xs` ni de tailles custom inférieures à `text-sm` (pas de `text-[9px]`, `text-[10px]`, `text-[11px]`, etc.).** La taille minimum est `text-sm`. Aucun texte ne doit être plus petit que `text-sm`, nulle part.

## Transitions & Fluidité

- **RIEN ne doit être instantané.** Toutes les transitions (hover, apparition, disparition, changement d'état) doivent être progressives et fluides. Durée minimum : 500ms, idéalement 700ms. Easing : `ease-in-out` par défaut.
- Les changements de couleur, opacité, taille, position doivent TOUJOURS avoir une `transition` ou une animation. Jamais de changement brut sans transition.
- Pour les dégradés qui changent au hover : ne pas animer les gradient stops (non animable en CSS). Utiliser deux couches superposées et animer l'`opacity` de la couche hover.

## Scroll & Animations

- **Toutes les animations scroll doivent être lentes, douces et modernes.** Les sections pinnées/sticky doivent avoir assez de hauteur pour que le scroll soit confortable et progressif, jamais brusque.
- Privilégier des transitions fluides et des easings doux. L'utilisateur doit avoir le temps de lire et apprécier chaque étape.
- Les effets de parallax, fade, scale doivent se dérouler sur une distance de scroll confortable — ne jamais aller trop vite.
- **Il ne doit JAMAIS y avoir de moment mort au scroll.** À chaque pixel scrollé, quelque chose doit bouger ou se transformer. Pas de zone vide où rien ne se passe — les animations doivent se chevaucher et s'enchaîner sans interruption.
- **JAMAIS de `position: sticky` ou de `pin: true` sur les sections full-screen.** Ces techniques créent un "gel" perceptible au scroll quand le contenu se fixe. Utiliser des sections `h-screen` normales avec des animations scroll-triggered (`scrub`) à la place. Le contenu doit toujours scroller naturellement — jamais de moment où le scroll avance mais rien ne bouge à l'écran. Exception : le HomeHero qui a un système de parallax scroll spécifique bien calibré.
