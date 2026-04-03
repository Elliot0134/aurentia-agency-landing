# PATCH — Réécriture complète des skills du lead magnet

## Contexte

Le fichier `BRIEF-LEAD-MAGNETS.md` contient 20 "skills" qui ne sont en réalité que des templates de prompts à trous. Ce n'est pas le niveau de qualité attendu.

Un **vrai skill Claude** c'est un fichier `.md` autonome qui :
- A un frontmatter YAML (`name`, `description`)
- Définit un **rôle** pour Claude (persona spécialisée)
- A une **méthodologie structurée** (phases, étapes, frameworks)
- Contient des **règles** et des **contraintes**
- Spécifie un **format de sortie** précis
- Est auto-suffisant — on le colle et Claude devient cet agent

Regarde les exemples dans `/sessions/elegant-eloquent-mendel/mnt/.claude/skills/` pour comprendre le format (operating-partner, ambassador-program, agency-marketing-system). Ce sont de vrais skills professionnels.

---

## Ce qui change

### 1. Les 20 skills doivent être de VRAIS fichiers SKILL.md

Chaque skill doit faire entre 80 et 200 lignes. Format :

```markdown
---
name: nom-du-skill
description: "Description pour le triggering. 2-3 phrases qui expliquent quand utiliser ce skill."
---

# [Nom du Skill]

Tu es [RÔLE]. Tu [EXPERTISE]. Tu sais [CAPACITÉS].

## Quand utiliser ce skill
- [cas d'usage 1]
- [cas d'usage 2]
- [cas d'usage 3]

## Méthodologie

### Phase 1 — [Nom]
[Instructions détaillées de ce que Claude doit faire]

### Phase 2 — [Nom]
[Suite de la méthodologie]

### Phase 3 — [Nom]
[Livrable final]

## Règles
- [Règle 1]
- [Règle 2]
- [Règle 3]

## Format de sortie
[Description précise du format attendu]
```

### 2. Nouvelle liste des 20 skills (remplace l'ancienne)

Réduis à **3 catégories de 5 skills** (15 total) + **5 skills bonus** = 20.
Chaque skill doit être **utile à un entrepreneur, freelance ou PME** — pas juste aux devs.

---

#### CATÉGORIE 1 — PRODUCTIVITÉ & RÉDACTION (orange/accent)

**Skill 01 — Email Strategist**
Claude devient un expert en communication email. Il ne rédige pas juste un email — il analyse le contexte (qui écrit, à qui, quel objectif, quel historique), propose une stratégie de ton, anticipe les réactions du destinataire, et produit l'email + 2 variantes. Gère : emails de relance, négociation, annonce, réclamation, remerciement. Avec des règles précises sur la longueur, l'objet, le CTA.

**Skill 02 — Content Machine**
Claude devient un créateur de contenu multi-plateforme. Phase 1 : brief (audience, objectif, contraintes). Phase 2 : génération d'un "content pack" — le même message décliné pour LinkedIn (post long), Instagram (caption + structure carrousel), Twitter/X (thread), newsletter (paragraphe), et blog (article SEO). Le tout à partir d'une seule idée. Avec les hooks, CTA, hashtags adaptés à chaque plateforme.

**Skill 03 — Meeting Alchemist**
Claude transforme n'importe quelles notes de réunion (même en vrac, abréviations, phrases incomplètes) en : résumé exécutif, décisions prises, actions assignées (QUI → QUOI → DEADLINE), points en suspens, et email de suivi prêt à envoyer. Avec détection automatique des actions implicites ("il faudrait qu'on..." → action assignée).

**Skill 04 — Proposal Architect**
Claude crée des propositions commerciales complètes. Phase 1 : qualification (poser les bonnes questions). Phase 2 : structure la proposition (contexte client, diagnostic, solution, livrables, planning, pricing, conditions). Phase 3 : rédaction dans un ton qui vend sans être pushy. Inclut les techniques de pricing (ancrage, 3 options, valeur vs prix).

**Skill 05 — Report Generator**
Claude produit des rapports professionnels structurés (rapports mensuels, études de marché, bilans trimestriels, rapports d'avancement). Phase 1 : collecte des données/infos. Phase 2 : analyse et insights. Phase 3 : rédaction avec executive summary, corps structuré, recommandations, et annexes. Format prêt pour PDF ou Word.

---

#### CATÉGORIE 2 — STRATÉGIE & BUSINESS (bleu)

**Skill 06 — Business Diagnostician**
Claude fait un diagnostic complet de n'importe quel business en posant 10 questions clés (inspiré du framework Operating Partner). Couvre : proposition de valeur, unit economics, concurrence, moat, équipe, runway. Produit un score santé, identifie le bottleneck #1, et propose un plan d'action 30 jours avec 3 priorités maximum. Avec les frameworks Hormozi (Value Equation) et Porter (Five Forces) intégrés.

**Skill 07 — Customer Research Lab**
Claude mène une étude client complète. Phase 1 : définir le persona (démographie, psychographie, jobs-to-be-done, pain stack). Phase 2 : générer un script d'interview client (15 questions qui révèlent les vrais problèmes). Phase 3 : analyser les réponses et en extraire les insights actionnables (patterns, verbatims, opportunités). Basé sur les frameworks JTBD et Mom Test.

**Skill 08 — Offer Engineer**
Claude construit une offre irrésistible en utilisant le framework Grand Slam Offer de Hormozi. Phase 1 : identifier le dream outcome du client. Phase 2 : lister les obstacles et solutions. Phase 3 : emballer dans une offre avec nom, pricing (ancrage + justification), bonus, garantie, urgence. Phase 4 : générer la page de vente et le pitch verbal associés. Avec la Value Equation comme grille de score.

**Skill 09 — Competitive Intel Agent**
Claude devient un analyste concurrentiel. Input : votre entreprise + 3-5 concurrents. Output structuré : matrice de positionnement, analyse forces/faiblesses par concurrent, carte perceptuelle du marché, opportunités de différenciation, menaces à surveiller, et plan d'action en 3 moves stratégiques. Utilise Blue Ocean Strategy Canvas et Porter's Five Forces.

**Skill 10 — Financial Modeler**
Claude crée des modèles financiers en tableaux Markdown. Input : type de business, prix, coûts, hypothèses. Output : P&L sur 12 mois (3 scénarios), break-even analysis, CAC vs LTV, cash flow prévisionnel, et les 3 métriques à surveiller en priorité. Avec des alertes si les ratios sont dangereux (burn multiple > 2, LTV/CAC < 3, etc.).

---

#### CATÉGORIE 3 — ORGANISATION & PROCESS (vert)

**Skill 11 — SOP Factory**
Claude documente n'importe quel processus en procédure opérationnelle standard. Input : description brute du process (même en vrac). Output : SOP complète avec titre/version, objectif, prérequis, étapes numérotées (action + outil + résultat + temps), checklist de vérification, erreurs fréquentes, et temps total. Format prêt pour Notion/Google Docs. Demande toujours "qui d'autre que toi exécutera ce process ?" pour adapter le niveau de détail.

**Skill 12 — Onboarding Designer**
Claude conçoit un parcours d'onboarding complet (client ou employé). Phase 1 : qualifier le type d'onboarding. Phase 2 : mapper les 7 premiers jours heure par heure. Phase 3 : créer tous les supports (emails de bienvenue, checklist jour 1, messages de suivi J+3/J+7/J+14, formulaire de feedback). Avec un "success metric" clair pour savoir si l'onboarding a fonctionné.

**Skill 13 — Project Planner**
Claude structure n'importe quel projet en plan actionnable. Phase 1 : définir l'objectif et les contraintes (budget, deadline, équipe). Phase 2 : découper en milestones avec dépendances. Phase 3 : générer le planning détaillé (tâches, responsables, deadlines, livrables). Phase 4 : identifier les risques et créer un plan de mitigation. Output en tableau Markdown compatible avec tout outil de gestion de projet.

**Skill 14 — Automation Finder**
Claude audite vos tâches quotidiennes pour identifier ce qui est automatisable. Phase 1 : vous listez vos tâches de la semaine avec le temps passé. Phase 2 : Claude évalue chaque tâche (répétitive ? basée sur des règles ? nécessite du jugement ?). Phase 3 : scoring ROI de l'automatisation (gain de temps vs effort de mise en place). Phase 4 : plan d'implémentation pour les top 3, avec les outils recommandés (Zapier, Make, Claude, scripts) et les prompts de démarrage.

**Skill 15 — Decision Matrix**
Claude structure vos décisions complexes de manière rigoureuse. Phase 1 : clarifier la décision et les options. Phase 2 : identifier les critères d'évaluation avec pondération. Phase 3 : évaluer chaque option sur chaque critère (avec justification). Phase 4 : matrice de décision avec score pondéré. Phase 5 : recommandation + test d'inversion ("si on choisissait l'inverse, qu'est-ce qu'on risque ?"). Anti-biais intégré : jouer l'avocat du diable sur l'option favorite.

---

#### BONUS — 5 SKILLS AVANCÉS (violet)

**Skill 16 — Brand Voice Codifier**
Claude analyse vos contenus existants (emails, posts, site web) et en extrait un guide de ton de marque complet : personnalité (3 adjectifs), registre, vocabulaire (mots à utiliser / à éviter), longueur typique, exemples de formulations. Produit un document de référence que vous pouvez coller dans n'importe quel outil IA pour que votre ton de marque soit toujours respecté.

**Skill 17 — Sales Objection Crusher**
Claude devient un coach de vente spécialisé dans le traitement des objections. Input : l'objection du prospect (verbatim ou résumé). Output : analyse de l'objection (vraie raison vs raison déclarée), 3 réponses possibles (douce, directe, recadrage), script exact à dire, et la question de relance à poser après la réponse. Basé sur les techniques Straight Line de Belfort et le framework "feel-felt-found".

**Skill 18 — SEO Content Strategist**
Claude crée une stratégie SEO complète pour votre site. Phase 1 : analyse de niche et identification des clusters de mots-clés (head terms + long tail). Phase 2 : plan de contenu sur 3 mois (articles, titres, mots-clés cibles, intent). Phase 3 : brief détaillé par article (outline, H1/H2/H3, mots-clés à intégrer, internal linking, meta description). Phase 4 : rédaction complète d'un article pilier comme exemple.

**Skill 19 — Customer Journey Mapper**
Claude cartographie le parcours client de A à Z. Pour chaque étape (découverte → considération → achat → onboarding → usage → fidélisation → recommandation) : ce que le client fait, pense, ressent, le point de contact, l'opportunité d'amélioration, et le risque. Produit : la carte visuelle (tableau), les 3 moments de vérité, le plus gros point de friction, et 5 quick wins ordonnés par impact/effort.

**Skill 20 — AI Strategy Advisor**
Claude fait un audit de maturité IA de votre entreprise. Phase 1 : inventaire de vos tâches et outils actuels. Phase 2 : scoring de maturité IA (0-10) sur 5 dimensions (automatisation, données, culture, outils, stratégie). Phase 3 : les 5 quick wins IA classés par ROI (temps économisé par semaine × facilité d'implémentation). Phase 4 : roadmap 90 jours semaine par semaine pour intégrer l'IA. Avec le calcul du ROI projeté sur 6 mois.

---

### 3. Structure des fichiers

Chaque skill doit exister en tant que fichier `.md` complet dans `public/skills/` :
```
public/skills/
├── 01-email-strategist.md
├── 02-content-machine.md
├── 03-meeting-alchemist.md
├── ...
├── 20-ai-strategy-advisor.md
└── README.md (guide d'installation)
```

Le data file `src/data/skills-lead-magnet.ts` doit contenir :
- Les métadonnées de chaque skill (nom, catégorie, description courte, couleur)
- Le chemin vers le fichier `.md` complet
- Un preview (les 5-10 premières lignes du skill)

### 4. Fonctionnalités de la page

**Accordéons :**
- Click → ouvre l'accordéon → montre le SKILL.md complet dans un bloc code stylisé
- Bouton "Copier le skill" → copie le contenu complet du .md dans le clipboard
- Feedback : "Copié !" pendant 2 secondes

**Download ZIP :**
- Bouton en haut de page et en bas : "Télécharger les 20 skills (.zip)"
- Le ZIP contient les 20 fichiers .md + le README avec le guide d'installation
- Générer le ZIP côté client (JSZip) ou le pré-builder en static dans `public/`
- Mettre aussi un lien de téléchargement individuel par skill

**Guide d'installation (README.md dans le ZIP + section sur la page) :**
```markdown
# 20 Skills Claude AI — Guide d'installation

## Sur claude.ai (Projects)
1. Allez sur claude.ai
2. Cliquez sur "Projects" dans la sidebar
3. Créez un nouveau projet (ou ouvrez un existant)
4. Dans les "Project Instructions", collez le contenu du fichier .md du skill
5. Toutes les conversations dans ce projet utiliseront automatiquement le skill

## Sur Claude Desktop (Cowork mode)
1. Ouvrez Claude Desktop
2. Allez dans Settings → Skills
3. Cliquez sur "Add custom skill"
4. Collez le contenu du fichier .md
5. Le skill est actif dans toutes vos sessions

## Avec Claude Code (terminal)
1. À la racine de votre projet, créez ou ouvrez le fichier `CLAUDE.md`
2. Collez le contenu du skill dans ce fichier
3. Claude Code le lira automatiquement à chaque session
4. Vous pouvez aussi créer un dossier `.claude/skills/nom-du-skill/SKILL.md`

## Conseils
- Vous pouvez combiner plusieurs skills dans un même projet
- Adaptez les [PLACEHOLDERS] à votre contexte avant d'installer
- Les skills sont conçus pour être utilisés tels quels — pas besoin de modifier la structure
```

### 5. Ce que Claude Code doit faire

1. **Rédiger les 20 fichiers SKILL.md complets** (80-200 lignes chacun, format professionnel comme les exemples du projet)
2. Les placer dans `public/skills/`
3. Créer le data file `src/data/skills-lead-magnet.ts` avec les métadonnées
4. Créer le composant `AccordionSkill` avec preview + contenu complet + bouton copier
5. Créer le bouton "Télécharger ZIP" (avec JSZip en client-side)
6. Mettre à jour la page `/formation/20-skills-claude` avec les vrais skills

**IMPORTANT :** Chaque skill doit être substantiel — pas un template à trous. Un vrai skill transforme Claude en agent spécialisé. Lis les exemples dans `.claude/skills/` si tu as un doute sur le niveau de qualité attendu.
