// ─── Comparaison Claude vs ChatGPT ───────────────────────────────────────────

export const claudeVsChatgpt = [
  {
    feature: "Longueur des réponses",
    claude: "Très longues, détaillées, structurées",
    chatgpt: "Variables, parfois trop courtes",
    winner: "claude",
  },
  {
    feature: "Suivre des instructions complexes",
    claude: "Excellent — lit et respecte les contraintes",
    chatgpt: "Peut ignorer certaines consignes",
    winner: "claude",
  },
  {
    feature: "Ton et style d'écriture",
    claude: "Naturel, adaptable, fluide",
    chatgpt: "Parfois robotique ou générique",
    winner: "claude",
  },
  {
    feature: "Analyse de documents",
    claude: "Excellente compréhension de longs textes",
    chatgpt: "Bon mais limité sur les longs documents",
    winner: "claude",
  },
  {
    feature: "Plugins & intégrations",
    claude: "Claude Code, Projects, MCP",
    chatgpt: "GPT Store, DALL-E, navigation web",
    winner: "draw",
  },
  {
    feature: "Popularité / Écosystème",
    claude: "En forte croissance",
    chatgpt: "Très large, plus connu",
    winner: "chatgpt",
  },
];

export const claudeCapabilities = [
  { icon: "FileText", text: "Rédiger des emails, rapports et contenus" },
  { icon: "Code", text: "Écrire et débugger du code dans tous les langages" },
  { icon: "Search", text: "Analyser et résumer des documents longs" },
  { icon: "Lightbulb", text: "Brainstormer et générer des idées" },
  { icon: "BarChart", text: "Créer des analyses et modèles financiers" },
  { icon: "MessageSquare", text: "Rédiger des scripts, posts et séquences" },
  { icon: "Settings", text: "Automatiser des tâches répétitives" },
  { icon: "BookOpen", text: "Expliquer des concepts complexes simplement" },
];

export const claudeAccess = [
  {
    platform: "claude.ai",
    desc: "Interface web. Créez des Projects pour organiser vos conversations par contexte.",
    badge: "Recommandé pour débuter",
  },
  {
    platform: "App Desktop",
    desc: "Application Mac/Windows. Accès rapide, Skills personnalisables, conversations hors navigateur.",
    badge: "Pour usage quotidien",
  },
  {
    platform: "App Mobile",
    desc: "iOS et Android. Ideal pour les réponses rapides et les idées en déplacement.",
    badge: "Toujours avec vous",
  },
];

// ─── 5 règles d'or du prompting ──────────────────────────────────────────────

export const reglesOr = [
  {
    number: "01",
    rule: "Soyez précis",
    explanation: "Plus votre demande est précise, meilleure est la réponse. Vague = générique.",
    bad: "Écris-moi un email.",
    good: `Écris un email professionnel de 150 mots pour relancer un prospect qui n'a pas répondu à mon devis depuis 5 jours. Ton : chaleureux mais direct. CTA : prendre un appel de 20 min.`,
  },
  {
    number: "02",
    rule: "Donnez du contexte",
    explanation: "Claude ne vous connaît pas. Expliquez qui vous êtes, pour qui, et dans quel contexte.",
    bad: "Explique-moi le marketing de contenu.",
    good: `Je suis consultant indépendant, mes clients sont des PME artisanales de 5 à 20 salariés. Explique-moi le marketing de contenu comme si je devais le présenter à un artisan plombier qui n'a jamais entendu ce terme.`,
  },
  {
    number: "03",
    rule: "Précisez le format",
    explanation: "Dites à Claude comment vous voulez la réponse : liste, tableau, paragraphe, longueur...",
    bad: "Quels sont les avantages d'un site web ?",
    good: `Liste 5 avantages concrets d'avoir un site web pour un artisan plombier. Format : bullet points. Pour chaque point : 1 titre + 1 phrase d'explication. Pas d'intro ni de conclusion.`,
  },
  {
    number: "04",
    rule: "Itérez",
    explanation: "Le premier résultat est rarement le meilleur. Affinez, reformulez, demandez des variantes.",
    bad: "Ce n'est pas bien. Recommence.",
    good: `C'est bien mais trop formel. Garde la même structure mais rends le ton plus direct et moins corporate. Remplace les tournures passives par des tournures actives.`,
  },
  {
    number: "05",
    rule: "Donnez des exemples",
    explanation: "Montrer un exemple vaut mieux que 10 lignes de description. Claude apprend instantanément.",
    bad: "Écris dans mon style.",
    good: `Voici un exemple de post que j'ai écrit : [EXEMPLE]. Analyse mon style (ton, structure, longueur, ponctuation) et écris un nouveau post sur le sujet : [SUJET] en respectant exactement ce style.`,
  },
];

// ─── 10 prompts prêts à l'emploi ─────────────────────────────────────────────

export interface ReadyPrompt {
  id: string;
  number: string;
  title: string;
  useCase: string;
  content: string;
}

export const readyPrompts: ReadyPrompt[] = [
  {
    id: "email-pro",
    number: "01",
    title: "Email professionnel",
    useCase: "Relance, prise de contact, confirmation, réclamation",
    content: `Rédige un email professionnel avec ces informations :

Objectif : [ex: relancer un prospect / confirmer un rdv / répondre à une réclamation]
Destinataire : [NOM, POSTE ou RELATION — ex: "client fidèle depuis 2 ans"]
Contexte : [ce qui s'est passé avant — ex: "il a demandé un devis il y a 5 jours"]
Ton : [professionnel / chaleureux / ferme / conciliant]
CTA (action souhaitée) : [ex: "répondre avant vendredi" / "réserver un appel"]
Longueur max : [80 / 120 / 150 mots]

Écris uniquement l'email (objet + corps). Pas d'explication.`,
  },
  {
    id: "post-linkedin",
    number: "02",
    title: "Post LinkedIn",
    useCase: "Partage d'expérience, conseil, storytelling, lancement",
    content: `Écris un post LinkedIn qui performe. Informations :

Sujet : [LE SUJET DU POST]
Angle : [ex: leçon apprise / erreur commise / résultat obtenu / conseil contre-intuitif]
Mon profil : [POSTE + SECTEUR + CIBLE]
Ton : [expert / accessible / personnel / provocant]

Structure obligatoire :
- Ligne 1 : Hook qui stoppe le scroll (question, stat choc, ou affirmation audacieuse)
- Corps : développement en 3-5 points courts (1 idée = 1 ligne max)
- Conclusion : ce que le lecteur doit retenir ou faire
- CTA : question pour générer des commentaires

Longueur : 150-200 mots. Pas de hashtags dans le texte.
Donne 2 variantes avec des hooks différents.`,
  },
  {
    id: "analyse-swot",
    number: "03",
    title: "Analyse SWOT",
    useCase: "Évaluer une idée, un projet, ou une entreprise",
    content: `Fais une analyse SWOT complète pour :

Sujet : [ENTREPRISE / PROJET / IDÉE / PRODUIT]
Secteur : [SECTEUR D'ACTIVITÉ]
Contexte : [quelques phrases sur la situation actuelle]

Pour chaque quadrant, donne 4-5 points concrets et actionnables :

Forces (internes, positives) :
Faiblesses (internes, négatives) :
Opportunités (externes, positives) :
Menaces (externes, négatives) :

En conclusion :
- Le point fort à capitaliser en priorité
- La faiblesse critique à corriger en urgence
- L'opportunité à saisir dans les 6 prochains mois
- La menace à surveiller de près

Format : tableaux Markdown clairs.`,
  },
  {
    id: "resume-document",
    number: "04",
    title: "Résumé de document",
    useCase: "Rapport, article, contrat, email long, compte-rendu",
    content: `Résume ce document. Voici mes instructions :

Document :
"""
[COLLER LE TEXTE COMPLET ICI]
"""

Génère :
1. Résumé exécutif (3 phrases max — ce qu'il faut retenir)
2. Points clés (5-7 bullet points — les infos les plus importantes)
3. Chiffres et dates clés (si présents dans le document)
4. Actions requises (ce que je dois faire après lecture, si applicable)

Langue : [français / anglais]
Public : [moi seul / à partager avec mon équipe / pour un client]
Longueur totale du résumé : [une demi-page max]`,
  },
  {
    id: "brainstorm",
    number: "05",
    title: "Brainstorm d'idées",
    useCase: "Trouver des idées de contenu, de produits, de solutions",
    content: `Génère des idées pour [SUJET DU BRAINSTORM].

Contexte :
- Je suis : [POSTE / RÔLE]
- Pour : [CIBLE / CLIENT / MARCHÉ]
- Objectif : [ce que je veux accomplir]
- Contraintes : [budget / temps / ressources disponibles]

Génère 15 idées. Pour chaque idée :
- Titre de l'idée (< 10 mots)
- Description rapide (1-2 phrases)
- Niveau de difficulté : facile / moyen / complexe
- Impact estimé : faible / moyen / fort

Organise les idées du plus impactant au moins impactant.
À la fin, mets en évidence les 3 "quick wins" (impact fort + facilité d'exécution).`,
  },
  {
    id: "script-video",
    number: "06",
    title: "Script vidéo courte",
    useCase: "Reels, TikTok, YouTube Shorts, présentations",
    content: `Écris un script pour une vidéo courte de [DURÉE — ex: 60 secondes / 90 secondes].

Plateforme : [Instagram Reels / TikTok / YouTube Shorts / LinkedIn]
Sujet : [LE SUJET DE LA VIDÉO]
Objectif : [éduquer / divertir / convaincre / vendre]
Mon profil : [QUI JE SUIS, MON EXPERTISE]

Format du script :
- Hook (0-3s) : phrase d'accroche qui donne envie de regarder
- Corps ([DURÉE-10]s) : le contenu principal, découpé en temps (ex: "10s — ...")
- CTA (5-7s) : l'action à faire après la vidéo

Précise aussi :
- Les sous-titres clés à afficher à l'écran
- Les moments où montrer un exemple ou une démonstration
- Le ton : [naturel / dynamique / expert / accessible]`,
  },
  {
    id: "faq-client",
    number: "07",
    title: "FAQ client",
    useCase: "Page FAQ, base de connaissances, onboarding client",
    content: `Crée une FAQ complète pour [PRODUIT / SERVICE / ENTREPRISE].

Contexte :
- Ce que nous vendons : [DESCRIPTION]
- Nos clients typiques : [PERSONA]
- Leurs principales inquiétudes : [LISTE DES DOUTES FRÉQUENTS si tu les connais]

Génère 10 questions-réponses organisées en 3 catégories :
1. Avant l'achat (questions de décision)
2. Pendant l'utilisation (questions pratiques)
3. Support et garanties (questions rassurantes)

Pour chaque Q&R :
- La question formulée comme la poserait vraiment un client
- La réponse : directe, honnête, rassurante (80-120 mots max)
- Une phrase de fermeture qui encourage à passer à l'action

Ton : [professionnel et chaleureux / expert / simple et accessible]`,
  },
  {
    id: "planning-hebdo",
    number: "08",
    title: "Planning hebdomadaire",
    useCase: "Organiser sa semaine, prioriser, déléguer",
    content: `Aide-moi à planifier ma semaine de travail.

Mes priorités cette semaine :
1. [PRIORITÉ 1 — avec deadline si applicable]
2. [PRIORITÉ 2]
3. [PRIORITÉ 3]

Tâches en cours :
- [TÂCHE A — temps estimé]
- [TÂCHE B — temps estimé]
- [TÂCHE C — temps estimé]

Contraintes :
- Disponibilité : [ex: "disponible lun/mar/jeu, réunions mer matin"]
- Pic d'énergie : [matin / après-midi / soir]
- À éviter : [ex: "pas de tâches créatives après 15h"]

Génère :
1. Planning jour par jour (lun → ven) avec blocs de temps
2. Les 3 tâches absolument critiques (ne pas finir la semaine sans les faire)
3. Ce qui peut être reporté ou délégué
4. Un conseil pour rester focus sur les priorités`,
  },
  {
    id: "reformulation",
    number: "09",
    title: "Reformulation de texte",
    useCase: "Améliorer un texte existant, changer le ton, simplifier",
    content: `Reformule ce texte selon mes instructions :

Texte original :
"""
[COLLER LE TEXTE À REFORMULER]
"""

Instructions de reformulation :
- Objectif : [améliorer la clarté / changer le ton / simplifier / rendre plus percutant]
- Ton cible : [professionnel / accessible / direct / inspirant / technique]
- Public cible : [QUI VA LIRE CE TEXTE]
- Longueur : [même longueur / plus court de X% / plus long]
- À conserver absolument : [les chiffres clés / le CTA / les exemples]
- À supprimer : [les répétitions / le jargon / les formules de politesse excessives]

Donne 2 versions reformulées avec des approches légèrement différentes.
Pour chaque version, explique en 1 phrase ce qui a changé.`,
  },
  {
    id: "comparatif",
    number: "10",
    title: "Comparatif décisionnel",
    useCase: "Choisir entre plusieurs options, présenter une recommandation",
    content: `Aide-moi à choisir entre ces options :

Contexte de la décision : [QUE DOIS-JE DÉCIDER]
Mon profil : [QUI JE SUIS, MA SITUATION]
Mon budget : [BUDGET DISPONIBLE si pertinent]
Mes critères prioritaires (par ordre d'importance) :
1. [CRITÈRE 1]
2. [CRITÈRE 2]
3. [CRITÈRE 3]

Options à comparer :
- Option A : [NOM + description courte]
- Option B : [NOM + description courte]
- Option C : [NOM + description courte si applicable]

Génère :
1. Tableau comparatif avec score sur 10 par critère
2. Avantages et inconvénients clés de chaque option (3 de chaque)
3. Ma recommandation : quelle option pour quel profil
4. Les questions à se poser avant de décider
5. Ta recommandation finale pour mon cas spécifique`,
  },
];

// ─── 5 erreurs de débutant ────────────────────────────────────────────────────

export const erreursDébutant = [
  {
    title: "Poser des questions trop vagues",
    piège: "\"Aide-moi avec mon business\" — Claude ne sait pas par où commencer.",
    solution: "Soyez précis : quel problème, quel contexte, quel format de réponse. Plus vous détaillez, plus Claude est utile.",
  },
  {
    title: "Traiter Claude comme un moteur de recherche",
    piège: "Copier-coller une requête Google dans Claude. Résultat : une réponse générique.",
    solution: "Claude est un collaborateur, pas un moteur de recherche. Conversez avec lui, donnez du contexte, affinez.",
  },
  {
    title: "Accepter la première réponse sans itérer",
    piège: "Prendre le premier résultat comme final, même s'il est moyen.",
    solution: "La vraie puissance de Claude vient de l'itération. \"C'est bien mais trop long — réduis de 30%\" suffit souvent.",
  },
  {
    title: "Oublier de donner du contexte sur soi",
    piège: "Claude ne sait pas qui vous êtes, votre secteur, votre cible, votre niveau.",
    solution: "Commencez par vous présenter en 2 lignes. Ça change radicalement la qualité des réponses.",
  },
  {
    title: "Copier-coller sans vérifier",
    piège: "Claude peut se tromper sur des faits, des chiffres ou des dates récentes.",
    solution: "Utilisez Claude pour structurer et rédiger, pas comme source de faits. Vérifiez toujours les données critiques.",
  },
];

// ─── 3 astuces pro ────────────────────────────────────────────────────────────

export const astucesPro = [
  {
    number: "01",
    title: "Commencez chaque projet par un briefing",
    description: "Avant de demander quoi que ce soit, donnez à Claude un briefing complet de votre projet : qui vous êtes, votre cible, vos contraintes, votre style. Créez ce briefing une fois, collez-le en début de conversation. Claude devient instantanément expert de votre contexte.",
    example: "\"Je suis [NOM], consultant [SECTEUR]. Mes clients sont [CIBLE]. Mon ton habituel est [TON]. Garde ces éléments en tête pour toute notre conversation.\"",
  },
  {
    number: "02",
    title: "Utilisez les Projects sur claude.ai",
    description: "Les Projects permettent de donner à Claude des instructions permanentes et de conserver le contexte entre les conversations. Créez un Project par client, par domaine ou par type de tâche. Vos instructions sont mémorisées — pas besoin de tout répéter à chaque session.",
    example: "Créez un Project \"Marketing Client X\" avec les infos du client dans les instructions. Chaque conversation dans ce project part avec le bon contexte.",
  },
  {
    number: "03",
    title: "Sauvegardez vos meilleurs prompts",
    description: "Quand un prompt fonctionne parfaitement, sauvegardez-le. Créez votre bibliothèque personnelle de prompts dans Notion, une note ou un fichier texte. Ces prompts sont votre capital — ils s'améliorent avec le temps et vous font gagner des heures.",
    example: "Organisez vos prompts par catégorie (emails, social, analyse, code) avec une note sur quand et comment les utiliser.",
  },
];

// ─── Parcours de progression ──────────────────────────────────────────────────

export const progressionLevels = [
  {
    number: "01",
    level: "Bases",
    label: "Niveau 1",
    description: "Comprendre Claude, les fondamentaux du prompting, éviter les erreurs de débutant.",
    resource: "Ce guide",
    resourceLink: "/formation/guide-demarrage-claude",
    color: "text-emerald-400",
    borderColor: "border-emerald-400/30",
    bgColor: "bg-emerald-400/10",
    isCurrentPage: true,
  },
  {
    number: "02",
    level: "Productivité",
    label: "Niveau 2",
    description: "20 skills testés en production pour booster votre travail au quotidien.",
    resource: "20 Skills Claude AI",
    resourceLink: "/formation/20-skills-claude",
    color: "text-accent-primary",
    borderColor: "border-accent-primary/30",
    bgColor: "bg-accent-primary/10",
    isCurrentPage: false,
  },
  {
    number: "03",
    level: "Expert",
    label: "Niveau 3",
    description: "Formation complète : Claude Code, automatisation avancée, workflows pro, accompagnement.",
    resource: "Formation Aurentia",
    resourceLink: "/formation",
    color: "text-violet-400",
    borderColor: "border-violet-400/30",
    bgColor: "bg-violet-400/10",
    isCurrentPage: false,
  },
];
