# BRIEF — Deux pages Lead Magnet sur aurentia.agency

## Contexte

On crée deux pages one-page sur le site Aurentia Agency (Next.js 15 / App Router / Tailwind v4 / GSAP / Framer Motion). Ces pages servent de **lead magnets** : elles apportent de la valeur gratuite pour capturer des emails et positionner Aurentia comme expert Claude AI.

Les deux pages doivent respecter le design system existant (globals.css, tokens sémantiques, animations), réutiliser les composants existants (Section, SpotlightCard, BlurReveal, TextReveal, MagneticButton, etc.), et avoir le même niveau de qualité que les pages existantes.

---

## ROUTES

1. `/formation/20-skills-claude` → **20 Skills Claude AI**
2. `/formation/guide-demarrage-claude` → **Guide de Démarrage Claude AI**

Créer les dossiers sous `src/app/formation/`.

---

## PAGE 1 — 20 Skills Claude AI

### Objectif

Page one-page interactive avec les 20 meilleurs skills Claude AI, présentés en accordéons par catégorie. Chaque skill contient le contenu complet (le prompt/template réel, pas juste une description) avec un bouton "Copier". En haut : guide d'installation des skills dans Claude Desktop.

### Structure de la page (sections de haut en bas)

#### Section 1 — Hero
- Badge : `GUIDE GRATUIT · AURENTIA FORMATION`
- Titre : **"20 Skills Claude AI prêts à l'emploi"**
- Sous-titre : "Des prompts et templates testés en production. Copiez, collez, transformez votre façon de travailler."
- CTA : scroll vers la section skills
- Stats : "20 skills · 4 catégories · Testés en prod · Accès libre"

#### Section 2 — Guide d'installation (mini-tutoriel)
- Titre : **"Comment utiliser ces skills"**
- 3 étapes visuelles en cards (SpotlightCard) :
  1. **Sur claude.ai** — "Créez un nouveau Project. Dans les instructions du projet, collez le skill. Claude l'utilisera automatiquement dans chaque conversation du projet."
  2. **Sur Claude Desktop (Cowork)** — "Ouvrez les réglages → Skills → Ajoutez un skill personnalisé. Collez le contenu. Claude l'applique dans toutes vos sessions."
  3. **Dans Claude Code** — "Créez un fichier `CLAUDE.md` à la racine de votre projet. Collez les instructions du skill dedans. Claude Code les lira automatiquement."
- Note en bas : "Chaque méthode fonctionne immédiatement. Pas besoin de configurer quoi que ce soit d'autre."

#### Section 3 — Skills par catégorie (accordéons)
- 4 catégories, chacune avec 5 skills
- Chaque catégorie est un bloc avec un header coloré + un accordéon qui s'ouvre
- Chaque skill dans l'accordéon contient :
  - Nom du skill
  - Description courte (1-2 lignes)
  - **Le contenu complet du skill** (le prompt/template dans un bloc code)
  - **Bouton "Copier"** qui copie le contenu dans le clipboard avec feedback visuel
  - Un exemple d'usage en italique

**Les 4 catégories et 20 skills :**

---

### CATÉGORIE 1 — PROMPTING AVANCÉ (couleur : accent/orange)

**Skill 01 — System Prompt Builder**
Description : Créez des instructions système qui transforment Claude en expert de votre domaine.
```
Tu es un expert en [DOMAINE]. Tu travailles pour [ENTREPRISE], qui [DESCRIPTION ACTIVITÉ].

Ton rôle : [RÔLE PRÉCIS — ex: rédacteur, analyste, consultant, assistant].

Règles :
- Ton : [professionnel / amical / expert / décalé]
- Format par défaut : [paragraphes / bullet points / tableaux]
- Longueur : [concis / détaillé / adapté au sujet]
- Toujours inclure : [exemples concrets / chiffres / sources]
- Ne jamais : [jargon technique sans explication / réponses génériques]

Contexte clé :
- Nos clients sont : [DESCRIPTION CIBLE]
- Nos produits/services : [LISTE]
- Notre différenciation : [CE QUI NOUS REND UNIQUE]

Quand tu ne sais pas, dis-le. Propose toujours une alternative.
```
Exemple d'usage : "Idéal pour créer un assistant marketing, un rédacteur de contenu ou un analyste financier sur-mesure."

**Skill 02 — Chain-of-Thought Solver**
Description : Guidez Claude pour résoudre des problèmes complexes étape par étape.
```
Résous ce problème en suivant cette méthode :

Problème : [DÉCRIS LE PROBLÈME EN DÉTAIL]

Instructions :
1. Commence par reformuler le problème dans tes propres mots
2. Identifie les données clés et les contraintes
3. Liste 3 approches possibles pour résoudre le problème
4. Évalue chaque approche (avantages / inconvénients / faisabilité)
5. Choisis la meilleure approche et justifie ton choix
6. Détaille la solution étape par étape
7. Vérifie ta solution : est-ce qu'elle répond bien au problème initial ?
8. Résume en 3 bullet points : le problème, la solution, la prochaine action

Important : montre ton raisonnement à chaque étape. Si tu hésites, explique pourquoi.
```
Exemple d'usage : "Parfait pour des décisions stratégiques, des diagnostics business, ou tout problème qui nécessite une réflexion structurée."

**Skill 03 — Few-Shot Adapter**
Description : Donnez des exemples à Claude pour qu'il reproduise parfaitement votre style ou format.
```
Je vais te donner des exemples de [TYPE DE CONTENU]. Analyse le style, le ton, la structure et les patterns récurrents. Ensuite, crée un nouveau [TYPE DE CONTENU] en respectant exactement ces patterns.

Exemple 1 :
"""
[COLLER EXEMPLE 1]
"""

Exemple 2 :
"""
[COLLER EXEMPLE 2]
"""

Exemple 3 (optionnel) :
"""
[COLLER EXEMPLE 3]
"""

Maintenant, crée un nouveau [TYPE DE CONTENU] sur le sujet suivant : [SUJET].
Respecte exactement : le ton, la longueur, la structure, le niveau de détail et le style des exemples ci-dessus.
```
Exemple d'usage : "Indispensable pour reproduire le ton de votre marque, le format de vos newsletters ou le style de vos rapports."

**Skill 04 — Prompt Chain Architect**
Description : Découpez un projet complexe en étapes séquentielles pour un résultat pro.
```
Je veux accomplir cet objectif : [OBJECTIF FINAL]

Contexte : [CONTEXTE]

Aide-moi à découper ce projet en étapes séquentielles. Pour chaque étape :
1. Donne un titre clair
2. Décris ce qui doit être fait (2-3 phrases max)
3. Précise quel livrable est produit à cette étape
4. Indique ce dont l'étape suivante aura besoin

Format :
ÉTAPE 1 — [Titre]
→ Action : [ce qui est fait]
→ Livrable : [ce qui est produit]
→ Input pour la suite : [ce qui est transmis]

Commence par l'étape 1 seulement. Quand je dis "suivant", passe à l'étape suivante en utilisant le livrable de l'étape précédente.
```
Exemple d'usage : "Idéal pour structurer la rédaction d'un business plan, la création d'un site web, ou le lancement d'un produit."

**Skill 05 — Structured Output Generator**
Description : Obtenez des réponses structurées dans le format exact dont vous avez besoin.
```
Génère les données suivantes au format [JSON / CSV / Tableau Markdown / XML] :

Sujet : [SUJET]
Nombre d'éléments : [NOMBRE]

Pour chaque élément, inclus ces champs :
- [champ_1] : [description et type — ex: "titre (string, max 60 caractères)"]
- [champ_2] : [description et type]
- [champ_3] : [description et type]
- [champ_4] : [description et type]

Contraintes :
- [ex: pas de doublons sur champ_1]
- [ex: champ_3 doit être un nombre entre 1 et 100]
- [ex: trié par champ_4 décroissant]

Donne UNIQUEMENT le résultat formaté, sans explication avant ou après.
```
Exemple d'usage : "Parfait pour alimenter des spreadsheets, des bases de données, des CRM ou des outils d'automatisation."

---

### CATÉGORIE 2 — CLAUDE CODE (couleur : bleu #3B82F6)

**Skill 06 — CLAUDE.md Generator**
Description : Générez un fichier CLAUDE.md adapté à votre projet en quelques secondes.
```
Génère un fichier CLAUDE.md pour mon projet. Voici les informations :

Projet : [NOM DU PROJET]
Type : [site web / app mobile / SaaS / API / script / autre]
Stack : [langages, frameworks, outils — ex: Next.js, Tailwind, Supabase]
Architecture : [monorepo / single app / microservices]

Conventions de code :
- Nommage : [camelCase / snake_case / PascalCase pour les composants]
- Style : [tabs vs spaces, largeur ligne, etc.]
- Tests : [Jest / Vitest / Playwright / aucun]
- Linting : [ESLint / Prettier / Biome]

Règles métier importantes :
- [ex: "Toujours utiliser les tokens sémantiques, jamais de couleurs hardcodées"]
- [ex: "Les animations GSAP uniquement, pas de CSS animations"]
- [ex: "Toutes les données dans /src/data/, jamais en dur dans les composants"]

Génère un CLAUDE.md structuré avec les sections : ## Stack, ## Architecture, ## Conventions, ## Règles, ## Workflow.
```
Exemple d'usage : "Le premier fichier à créer dans tout projet Claude Code. Définit les règles que Claude respectera automatiquement."

**Skill 07 — Debug Detective**
Description : Transformez Claude Code en détective de bugs ultra-efficace.
```
J'ai un bug. Aide-moi à le résoudre de manière méthodique.

Symptôme : [ce qui se passe — ex: "le bouton ne fait rien au clic"]
Comportement attendu : [ce qui devrait se passer]
Contexte : [page, composant, ou fichier concerné]
Dernière modification : [ce qui a changé récemment, si tu sais]
Message d'erreur (si disponible) : [copier-coller l'erreur]

Instructions :
1. Analyse le symptôme et liste 3 hypothèses probables (de la plus à la moins probable)
2. Pour chaque hypothèse, indique quel fichier/ligne vérifier
3. Commence par l'hypothèse #1 : vérifie et corrige si c'est le problème
4. Si ce n'est pas ça, passe à l'hypothèse #2
5. Quand le bug est trouvé, explique POURQUOI il se produisait en 1 phrase
6. Propose le fix et vérifie qu'il n'introduit pas de régression
```
Exemple d'usage : "Pour tout bug, du plus trivial au plus obscur. La méthode systématique évite de tourner en rond."

**Skill 08 — Component Factory**
Description : Générez des composants propres et réutilisables en un prompt.
```
Crée un composant [React/Vue/Svelte] avec ces spécifications :

Nom : [NomDuComposant]
Rôle : [ce que fait le composant en 1 phrase]

Props :
- [prop1] : [type] — [description] — [requis/optionnel] — [valeur par défaut si optionnel]
- [prop2] : [type] — [description] — [requis/optionnel]
- [prop3] : [type] — [description] — [requis/optionnel]

Comportement :
- [ex: "Affiche un loader pendant le chargement"]
- [ex: "Au hover, le background change avec une transition de 300ms"]
- [ex: "Au clic, appelle la prop onClick avec l'id de l'élément"]

Style : [Tailwind / CSS Modules / styled-components]
Contraintes :
- [ex: "Responsive : stack vertical sur mobile, horizontal sur desktop"]
- [ex: "Accessible : aria-labels, focus visible, keyboard navigation"]
- [ex: "Animations : Framer Motion pour le mount/unmount"]

Inclus : TypeScript types + export default.
```
Exemple d'usage : "Pour créer des composants propres, typés et documentés sans réinventer la roue à chaque fois."

**Skill 09 — Code Reviewer**
Description : Obtenez une revue de code professionnelle de votre fichier.
```
Fais une code review de ce fichier. Évalue sur 5 critères :

1. **Lisibilité** (nommage, structure, commentaires)
2. **Performance** (complexité, renders inutiles, memory leaks)
3. **Sécurité** (injection, XSS, données sensibles)
4. **Maintenabilité** (couplage, DRY, séparation des responsabilités)
5. **Bonnes pratiques** (patterns du framework, conventions, accessibilité)

Pour chaque critère :
- Note sur 10
- 1 point fort
- 1 amélioration concrète (avec le code corrigé)

En conclusion :
- Score global sur 50
- Les 3 changements les plus impactants à faire en priorité

Fichier à reviewer :
```
[COLLER LE CODE]
```
```
Exemple d'usage : "Avant chaque PR ou mise en production. Attrape les problèmes qu'on ne voit plus quand on est dedans."

**Skill 10 — Refactoring Pilot**
Description : Refactorisez du code legacy de manière sûre et progressive.
```
Refactorise ce code en suivant cette approche sécurisée :

Code actuel :
```
[COLLER LE CODE]
```

Objectif du refactoring : [ex: "séparer la logique métier de l'UI", "réduire la complexité", "moderniser vers les hooks React"]

Contraintes :
- Le comportement final DOIT être identique (pas de changement fonctionnel)
- Procéder par petites étapes (chaque étape doit compiler et fonctionner)
- Expliquer chaque transformation en 1 phrase

Format de sortie :
ÉTAPE 1 : [description de la transformation]
→ Code modifié

ÉTAPE 2 : [description]
→ Code modifié

...

RÉSULTAT FINAL : code complet refactorisé
DIFF : résumé des changements (avant → après)
```
Exemple d'usage : "Pour nettoyer du code legacy, migrer vers une nouvelle architecture, ou simplifier un fichier devenu trop complexe."

---

### CATÉGORIE 3 — AUTOMATISATION (couleur : vert #10B981)

**Skill 11 — Email Sequence Builder**
Description : Créez des séquences d'emails automatisées complètes.
```
Crée une séquence de [NOMBRE] emails pour [OBJECTIF — ex: onboarding, nurturing, relance, lancement].

Contexte :
- Entreprise : [NOM] — [CE QUE VOUS FAITES]
- Cible : [PERSONA — ex: "gérants de conciergeries, 30-50 ans, peu digitaux"]
- Produit/offre : [CE QUE VOUS VENDEZ]
- CTA final : [ACTION SOUHAITÉE — ex: "réserver un appel", "acheter", "s'inscrire"]

Pour chaque email :
- **Timing** : Jour d'envoi (J+0, J+1, J+3, etc.)
- **Objet** : 2 variantes A/B (< 50 caractères)
- **Preview text** : La phrase visible avant l'ouverture
- **Corps** : Le texte complet, prêt à copier
- **CTA** : Le bouton/lien avec le texte exact
- **Logique** : Condition pour envoyer le suivant (ouvert ? cliqué ? pas répondu ?)

Ton : [professionnel / amical / direct / storytelling]
Longueur max par email : [100 / 150 / 200 mots]
```
Exemple d'usage : "Pour créer un onboarding client, une séquence de relance prospect, ou un lancement produit — en 5 minutes."

**Skill 12 — Data Transformer**
Description : Nettoyez, transformez et analysez des données brutes instantanément.
```
Voici des données brutes. Transforme-les selon ces instructions :

Données :
"""
[COLLER LES DONNÉES — CSV, JSON, texte brut, tableau, etc.]
"""

Transformations à appliquer :
1. [ex: "Supprime les doublons sur la colonne email"]
2. [ex: "Normalise les numéros de téléphone au format +33 6 XX XX XX XX"]
3. [ex: "Calcule une colonne 'CA_annuel' = prix_mensuel × 12"]
4. [ex: "Trie par CA_annuel décroissant"]
5. [ex: "Filtre uniquement les entrées où statut = 'actif'"]

Format de sortie : [CSV / JSON / Tableau Markdown / texte]
Inclus un résumé statistique : nombre de lignes, min/max/moyenne des valeurs numériques, top 5 par [critère].
```
Exemple d'usage : "Pour nettoyer une liste de prospects, préparer des données pour un CRM, ou analyser un export Excel."

**Skill 13 — Meeting Notes Processor**
Description : Transformez des notes de réunion brutes en compte-rendu actionnable.
```
Transforme ces notes de réunion en compte-rendu structuré :

Notes brutes :
"""
[COLLER VOS NOTES — même en vrac, avec des abréviations, c'est OK]
"""

Participants : [LISTE DES NOMS]
Date : [DATE]
Sujet : [SUJET DE LA RÉUNION]

Génère :
1. **Résumé exécutif** (3 phrases max)
2. **Décisions prises** (liste numérotée)
3. **Actions à faire** — format : [QUI] → [QUOI] → [DEADLINE]
4. **Points en suspens** (questions non résolues)
5. **Prochaine étape** (1 phrase)

Ton : professionnel mais concis. Pas de blabla.
Si une information manque dans les notes (ex: pas de deadline mentionnée), mets [À DÉFINIR].
```
Exemple d'usage : "Après chaque réunion. Transforme un chaos de notes en actions claires. Vos équipes vous remercieront."

**Skill 14 — Social Media Batch Creator**
Description : Générez une semaine entière de contenu social en un seul prompt.
```
Crée [NOMBRE] posts pour [PLATEFORME — LinkedIn / Instagram / Twitter/X] :

Entreprise : [NOM] — [ACTIVITÉ]
Audience cible : [PERSONA]
Objectif : [notoriété / engagement / conversion / éducation]
Ton : [expert / accessible / provocant / inspirant]

Thèmes à couvrir :
1. [THÈME 1]
2. [THÈME 2]
3. [THÈME 3]

Pour chaque post :
- **Hook** (première ligne — doit stopper le scroll)
- **Corps** (valeur, storytelling ou insight — max [NOMBRE] mots)
- **CTA** (action demandée au lecteur)
- **Hashtags** (5-8 pertinents, si plateforme le permet)
- **Format recommandé** : [carrousel / image / texte seul / vidéo courte]

Contrainte : chaque post doit être autonome (pas besoin d'avoir vu les précédents).
Alterner les formats : 1 éducatif, 1 storytelling, 1 polarisant/débat.
```
Exemple d'usage : "Planifiez votre contenu du lundi au vendredi en 10 minutes. Plus d'excuse pour ne pas publier."

**Skill 15 — SOP Generator**
Description : Documentez n'importe quel processus en procédure opérationnelle standard.
```
Crée une SOP (Standard Operating Procedure) pour ce processus :

Processus : [NOM — ex: "Onboarding d'un nouveau client"]
Contexte : [dans quelle entreprise / équipe]
Fréquence : [quotidien / hebdomadaire / par événement]
Responsable : [qui exécute ce process]

Décris le process tel que tu le fais aujourd'hui (même en vrac) :
"""
[DÉCRIRE LES ÉTAPES COMME ELLES VIENNENT]
"""

Génère une SOP avec :
1. **Titre et version** (v1.0 + date)
2. **Objectif** du process (1 phrase)
3. **Prérequis** (outils, accès, informations nécessaires avant de commencer)
4. **Étapes détaillées** — numérotées, avec sous-étapes si nécessaire
   - Pour chaque étape : action + outil utilisé + résultat attendu + temps estimé
5. **Checklist finale** (points de vérification avant de considérer le process terminé)
6. **Erreurs fréquentes** et comment les éviter
7. **Temps total estimé**

Format : prêt à copier dans Notion / Google Docs / Wiki interne.
```
Exemple d'usage : "Pour documenter tout process que vous faites plus de 2 fois. Indispensable avant de déléguer ou recruter."

---

### CATÉGORIE 4 — BUSINESS & STRATÉGIE (couleur : violet #8B5CF6)

**Skill 16 — Competitive Analysis**
Description : Analyse concurrentielle complète en 5 minutes.
```
Fais une analyse concurrentielle de mon entreprise :

Mon entreprise : [NOM] — [ACTIVITÉ] — [POSITIONNEMENT]
Mon offre : [CE QUE JE VENDS, À QUEL PRIX]
Ma cible : [PERSONA CLIENT]

Concurrents à analyser :
1. [NOM — URL si possible]
2. [NOM — URL si possible]
3. [NOM — URL si possible]

Analyse chaque concurrent sur :
- **Positionnement** : comment ils se présentent (1 phrase)
- **Offre** : ce qu'ils vendent et à quel prix (si trouvable)
- **Forces** : ce qu'ils font bien (2-3 points)
- **Faiblesses** : ce qu'ils font moins bien (2-3 points)
- **Menace pour moi** : faible / moyenne / forte — pourquoi

En conclusion :
1. **Mon avantage compétitif** le plus fort
2. **Ma plus grosse vulnérabilité**
3. **3 actions concrètes** pour me différencier davantage
```
Exemple d'usage : "Avant de lancer une offre, avant un call de vente, ou pour votre business plan. Vue claire en 5 minutes."

**Skill 17 — Sales Page Writer**
Description : Rédigez une page de vente complète basée sur les frameworks qui convertissent.
```
Rédige une page de vente pour :

Produit/Service : [NOM] — [DESCRIPTION EN 1 PHRASE]
Prix : [PRIX]
Cible : [QUI ACHÈTE — persona détaillé]
Problème principal : [LE PROBLÈME QUE LE PRODUIT RÉSOUT]
Résultat promis : [CE QUE LE CLIENT OBTIENT]

Structure (framework PAS + Value Equation) :

1. **Headline** — Résultat + Temporalité + Objection killer (< 15 mots)
2. **Sous-titre** — Développe la promesse (1-2 phrases)
3. **Section Problème** — 3 pain points détaillés, avec empathie
4. **Agitation** — Les conséquences de ne rien faire
5. **Solution** — Présentation du produit comme la réponse naturelle
6. **Comment ça marche** — 3 étapes simples
7. **Ce qui est inclus** — Liste des features avec bénéfices (pas juste les features)
8. **Preuves** — Témoignages, chiffres, garantie
9. **Prix** — Avec ancrage (comparer à une alternative plus chère)
10. **FAQ** — 5-6 objections déguisées en questions
11. **CTA final** — Urgence + rappel de la promesse

Ton : [direct / storytelling / expert]. Max [1500 / 2000 / 2500] mots.
```
Exemple d'usage : "Pour n'importe quelle page de vente, landing page ou email de lancement. Framework éprouvé."

**Skill 18 — Financial Model Express**
Description : Modèle financier simplifié pour valider une idée ou un projet.
```
Crée un modèle financier simplifié pour ce projet :

Projet : [NOM ET DESCRIPTION]
Modèle de revenus : [abonnement / one-shot / commission / freemium / autre]
Prix : [PRIX UNITAIRE ou grille tarifaire]
Marché cible : [TAILLE ESTIMÉE — nombre de clients potentiels]

Hypothèses à modéliser :
- Taux de conversion : [X%] ou "propose 3 scénarios"
- Coût d'acquisition client : [montant] ou "estime-le"
- Churn mensuel (si abo) : [X%] ou "propose 3 scénarios"
- Coûts fixes mensuels : [LISTE — loyer, outils, salaires, etc.]
- Coûts variables par client : [LISTE]

Génère :
1. **Tableau Mois 1 à Mois 12** avec : clients, CA, coûts, marge
2. **3 scénarios** : pessimiste / réaliste / optimiste
3. **Break-even** : à quel mois on est rentable dans chaque scénario
4. **CAC vs LTV** : le ratio pour vérifier la viabilité
5. **Recommandation** : go / no-go / pivot — avec justification

Format : tableaux Markdown lisibles.
```
Exemple d'usage : "Avant de lancer un projet, lever des fonds, ou convaincre un associé. Les chiffres parlent."

**Skill 19 — Customer Journey Mapper**
Description : Cartographiez le parcours client de votre entreprise étape par étape.
```
Cartographie le parcours client pour :

Entreprise : [NOM] — [ACTIVITÉ]
Produit/Service : [CE QUE LE CLIENT ACHÈTE]
Persona : [DESCRIPTION DU CLIENT TYPE]

Pour chaque étape du parcours (Découverte → Considération → Achat → Onboarding → Usage → Fidélisation → Recommandation) :

1. **Ce que le client fait** (action concrète)
2. **Ce que le client pense** (question ou doute principal)
3. **Ce que le client ressent** (émotion dominante)
4. **Point de contact** (où ça se passe — site, email, téléphone, etc.)
5. **Opportunité** (ce que vous pouvez faire pour améliorer cette étape)
6. **Risque** (ce qui peut mal tourner — et comment l'éviter)

En conclusion :
- Les 3 moments critiques (où on gagne ou perd le client)
- Le plus gros point de friction actuel
- 3 quick wins pour améliorer l'expérience
```
Exemple d'usage : "Pour comprendre votre client, identifier les points de friction, et augmenter la satisfaction à chaque étape."

**Skill 20 — AI Strategy Advisor**
Description : Diagnostic IA personnalisé pour votre entreprise.
```
Fais un diagnostic de mon utilisation de l'IA et recommande des améliorations :

Entreprise : [NOM] — [TAILLE — solo / 2-10 / 11-50 / 50+] — [SECTEUR]
Mon rôle : [POSTE]
Budget mensuel IA : [MONTANT ou "pas encore défini"]

Tâches actuelles que je fais manuellement :
1. [TÂCHE 1 — ex: "rédiger les emails clients"]
2. [TÂCHE 2 — ex: "faire les rapports mensuels"]
3. [TÂCHE 3 — ex: "créer du contenu social"]
4. [TÂCHE 4]
5. [TÂCHE 5]

Temps estimé par semaine sur ces tâches : [HEURES]

Outils IA que j'utilise déjà : [LISTE ou "aucun"]

Génère :
1. **Score de maturité IA** (0-10) avec justification
2. **Les 3 tâches à automatiser en priorité** (plus gros ROI temps)
3. **Pour chaque tâche** : outil recommandé + prompt de démarrage + gain estimé en heures/semaine
4. **Plan d'action 30 jours** : semaine par semaine, quoi mettre en place
5. **ROI projeté** : temps économisé + coût évité sur 6 mois

Important : sois concret. Pas de "il faudrait explorer l'IA" — des actions précises.
```
Exemple d'usage : "Le point de départ idéal pour toute entreprise qui veut intégrer l'IA sans se perdre."

---

#### Section 4 — Présentation Aurentia
- Brève présentation d'Aurentia Agency (2-3 phrases)
- Les 3 fondateurs en mini-cards (réutiliser le pattern de HomeTeam)
- Mention de la formation et de l'agence web

#### Section 5 — CTA Final
- Titre : "Envie d'aller plus loin ?"
- Deux cards côte à côte :
  - **Formation Claude AI** → lien vers /formation + waitlist
  - **Guide de Démarrage** → lien vers l'autre lead magnet
- Email capture pour la newsletter (réutiliser le pattern ConciergerieLeadMagnet)

---

## PAGE 2 — Guide de Démarrage Claude AI

### Objectif

Page one-page éducative et progressive. Formation basique pour prendre en main Claude en 30 minutes. Avec des exemples interactifs de prompts (bouton copier).

### Structure de la page

#### Section 1 — Hero
- Badge : `GUIDE GRATUIT · AURENTIA FORMATION`
- Titre : **"Maîtrisez Claude AI en 30 minutes"**
- Sous-titre : "Les bases essentielles pour être opérationnel. Zéro prérequis. Que du concret."
- Stats : "5 chapitres · 10 prompts prêts à l'emploi · 30 min"

#### Section 2 — C'est quoi Claude AI
- Explication simple et accessible
- Comparaison Claude vs ChatGPT (en cards)
- Ce que Claude sait faire (liste avec icônes)
- Comment y accéder (claude.ai, app desktop, app mobile)

#### Section 3 — Les 5 règles d'or du prompting
- 5 cards numérotées avec : règle + mauvais exemple → bon exemple
  1. Soyez précis
  2. Donnez du contexte
  3. Précisez le format
  4. Itérez
  5. Donnez des exemples

#### Section 4 — 10 prompts prêts à l'emploi
- Grille de prompts dans des blocs code avec bouton "Copier"
- Chaque prompt a un titre, un cas d'usage, et le template complet
- Les 10 prompts :
  1. Email professionnel
  2. Post LinkedIn
  3. Analyse SWOT
  4. Résumé de document
  5. Brainstorm d'idées
  6. Script vidéo courte
  7. FAQ client
  8. Planning hebdomadaire
  9. Reformulation de texte
  10. Comparatif décisionnel

(Reprendre le contenu complet du PDF 2 créé précédemment, mais avec les prompts complets en bloc code, pas juste les descriptions courtes)

#### Section 5 — 5 erreurs de débutant
- Cards avec icône "×" rouge
- Pour chaque erreur : le piège + comment l'éviter

#### Section 6 — 3 astuces pro
- Cards highlight avec contenu actionnable
  1. Commencez chaque projet par un briefing
  2. Utilisez les Projects (claude.ai)
  3. Sauvegardez vos meilleurs prompts

#### Section 7 — Parcours de progression
- 3 niveaux visuels (Bases → Productivité → Expert)
- Le niveau 1 = ce guide
- Le niveau 2 = lead magnet 20 skills
- Le niveau 3 = Formation Aurentia

#### Section 8 — Présentation Aurentia + CTA
- Même pattern que la page 1 : mini-présentation + email capture

---

## DIRECTIVES TECHNIQUES

### Composants à réutiliser
- `Section` (thèmes : dark, dark-alt, transparent)
- `SpotlightCard` pour les cards interactives
- `BlurReveal` pour les entrées au scroll
- `TextReveal` pour les titres
- `MagneticButton` pour les CTA
- `InfiniteMarquee` si besoin de bande défilante
- `SectionBackground` et `SectionDivider`

### Composants à créer
1. **`AccordionSkill`** — Accordéon pour les skills avec :
   - Header clickable (titre + description + icône chevron)
   - Body avec le contenu du skill en bloc code
   - Bouton "Copier" avec feedback (icône check + texte "Copié !")
   - Animation d'ouverture fluide (Framer Motion `AnimatePresence` + `motion.div`)
2. **`CopyBlock`** — Bloc de code avec bouton copier
   - Fond sombre (`bg-foreground/5`)
   - Texte monospace (`font-mono`)
   - Bouton "Copier" en haut à droite
   - État "Copié !" pendant 2s avec icône Check
3. **`ProgressionPath`** — Les 3 niveaux visuels connectés par une ligne

### Data files à créer
- `src/data/skills-lead-magnet.ts` — Les 20 skills avec tout le contenu
- `src/data/guide-demarrage-content.ts` — Le contenu du guide de démarrage

### Design
- Respecter CLAUDE.md : tokens sémantiques, pas de couleurs hardcodées
- Transitions minimum 500ms, ease-in-out
- Thème dark par défaut pour ces pages (sections dark-alt principalement)
- Responsive : accordéons full-width sur mobile, grille 2 colonnes sur desktop pour les prompts

### SEO
- Metadata complètes (title, description, og:image)
- Schema.org (Article ou HowTo)
- H1 unique par page, hiérarchie H2/H3 cohérente

---

## RÉSUMÉ POUR CLAUDE CODE

Pour lancer le build, donner ce prompt à Claude Code :

```
Lis BRIEF-LEAD-MAGNETS.md à la racine du projet. Il contient le brief complet pour créer deux pages lead magnet sur le site Aurentia Agency :
1. /formation/20-skills-claude → 20 Skills avec accordéons et boutons copier
2. /formation/guide-demarrage-claude → Guide de démarrage basique

Commence par la page 1. Crée d'abord les data files, puis les composants (AccordionSkill, CopyBlock), puis la page.

Respecte CLAUDE.md et le design system existant. Réutilise les composants du projet (Section, SpotlightCard, BlurReveal, TextReveal, MagneticButton).
```
