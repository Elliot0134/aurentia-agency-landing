# PRD — Pages `/formation` et `/apport-affaires`

---

# PARTIE 1 — PAGE `/formation`

---

## 1. Fiche page

```
Page : /formation
Titre H1 : "Maîtrisez Claude AI. Avant tout le monde."
Title tag : "Formation Claude AI — Aurentia Formation" (48 caractères)
Meta description : "Vidéos, cours et skills pour maîtriser Claude Code, le prompting avancé et l'automatisation IA. Par des formateurs qui l'utilisent au quotidien." (147 caractères)
Objectif principal : Collecter des inscrits waitlist → conversion future en acheteurs
Persona cible : Développeurs, entrepreneurs, équipes tech qui veulent intégrer Claude AI dans leur workflow
Pages liées :
  - Entrants : Home (navbar + footer), /a-propos (crédibilité équipe)
  - Sortants : Waitlist (formulaire), /a-propos (profils formateurs), WhatsApp
```

---

## 2. SEO complet

### Mots-clés

| Type | Mots-clés |
|------|-----------|
| **Primaire** | formation Claude AI |
| **Secondaires** | cours Claude Code, formation prompting IA, apprendre Claude Anthropic, formation intelligence artificielle |
| **Longue traîne** | formation Claude Code pour développeurs, apprendre à utiliser Claude AI en entreprise, cours automatisation IA Claude |

### Open Graph

```
og:title: "Aurentia Formation — Maîtrisez Claude AI"
og:description: "Vidéos, cours et skills pour maîtriser Claude Code, le prompting avancé et l'automatisation IA. Waitlist ouverte."
og:image: /images/og/formation.jpg
og:type: website
```

### Schema markup JSON-LD

```json
[
  {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Aurentia Formation — Maîtrisez Claude AI",
    "description": "Formation complète sur Claude AI : Claude Code, prompting avancé, skills, automatisation. Vidéos, cours et bundles par des formateurs IA professionnels.",
    "provider": {
      "@type": "Organization",
      "name": "Aurentia Agency",
      "url": "https://aurentia.agency"
    },
    "instructor": [
      {
        "@type": "Person",
        "name": "Elliot Estrade",
        "jobTitle": "CEO, Formateur IA en entreprise"
      },
      {
        "@type": "Person",
        "name": "Mathieu Bousquet",
        "jobTitle": "CTO, Formateur Epitech Marseille"
      }
    ],
    "coursePrerequisites": "Aucun prérequis technique spécifique",
    "availableLanguage": "fr",
    "isAccessibleForFree": false
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
      { "@type": "ListItem", "position": 2, "name": "Formation", "item": "https://aurentia.agency/formation" }
    ]
  }
]
```

---

## 3. Architecture des sections

---

### Section 1 — Hero (Teaser Premium)

**Hauteur :** min-h-[90vh]
**Layout :** Centré, full-width. Badge "coming soon" + titre oversize + sous-titre + CTA waitlist. Fond dark avec gradient mesh (glow violet subtil + orange — univers "formation/savoir").
**Animations :**
- Page entry : fade-in + translateY(30px) -> 0, duree 800ms, ease-out
- Badge : fade-in + scale depuis 0.8, delay 0.2s, pulse subtil continu (opacity 0.8 -> 1, cycle 3s)
- H1 : TextReveal (GSAP SplitText, mot par mot, stagger 0.05s)
- Sous-titre : BlurReveal (blur 10px -> 0, delay 0.3s)
- CTA : scale 0.9 -> 1, glow pulse, magnetic button, delay 0.6s
- Background : particules de code flottantes (snippets Claude Code en monospace, tres subtiles, opacity 0.05-0.1, mouvement lent)

**Contenu textuel :**

- **Badge :** `AURENTIA FORMATION · BIENTOT DISPONIBLE`
- **H1 :** `Maitrisez Claude AI. Avant tout le monde.`
- **Sous-titre :** `Videos, cours et skills en bundle. Par des formateurs qui utilisent Claude au quotidien — pas des theoriciens qui ont lu la doc.`
- **CTA Button :** `Rejoindre la waitlist` -> ouvre le formulaire waitlist (ancre ou modal)
- **Micro-preuve sous le CTA :** `Inscription gratuite · Acces prioritaire au lancement · Tarif early bird`

**Responsive :**
- Mobile (375px) : H1 en `text-3xl`, sous-titre en `text-base`, padding `px-6`, CTA full-width
- Tablet (768px) : H1 en `text-4xl`
- Desktop (1280px+) : H1 en `text-5xl md:text-6xl`, max-w-4xl

**Assets :** Aucun media — typographie pure + gradient mesh + snippets de code decoratifs.

---

### Section 2 — La Vision (Pourquoi on forme sur Claude)

**Hauteur :** auto (content-driven)
**Layout :** max-w-3xl centre. Texte long-form, marges genereses (py-24 md:py-32).
**Animations :**
- Titre : TextReveal
- Paragraphes : BlurReveal staggere (delay incremental 0.15s)
- TextGradientReveal sur les phrases cles (mots passent de gris dim a foreground au scroll)

**Contenu textuel :**

- **Badge :** `POURQUOI CLAUDE`
- **Titre section :** `L'IA qui change tout. Et personne ne vous l'enseigne vraiment.`

> **Paragraphe 1 — Le constat :**
> Claude AI est le modele le plus avance du marche. Claude Code reecrit les regles du developpement. Les skills transforment un LLM en outil sur-mesure. Mais 95% des utilisateurs effleurent a peine la surface.

> **Paragraphe 2 — Le probleme :**
> Les tutos YouTube font 10 minutes et survolent tout. Les formations generiques parlent de "l'IA" sans jamais entrer dans le concret. Resultat : des devs et des entrepreneurs qui utilisent Claude comme un ChatGPT glorifie. Du potentiel gache.

> **Paragraphe 3 — Notre reponse :**
> Aurentia Formation, c'est different. On utilise Claude pour livrer des sites en 48h, automatiser des workflows entiers, construire des SaaS complets. On enseigne ce qu'on pratique. Chaque jour. Chaque projet. Pas de theorie creuse — du craft reel.

**Responsive :**
- Mobile : `text-base`, line-height 1.7, `px-6`
- Desktop : `text-lg`, line-height 1.8, `max-w-3xl mx-auto`

**Assets :** Aucun.

---

### Section 3 — Ce qu'on enseigne (Apercu des modules)

**Hauteur :** auto
**Layout :** Titre centre + Bento grid (2 colonnes desktop, 1 colonne mobile). 5 cards de modules. Chaque card = icone + titre + description + badge niveau.
**Animations :**
- Titre : TextReveal
- Cards : BlurReveal staggere (0.15s entre chaque)
- SpotlightCard sur chaque card (radial-gradient suit la souris)
- Hover : translateY(-8px) + border plus visible, transition 700ms
- Icones : scale 0.5 -> 1 au scroll, delay incremental
- Badges niveau : fade-in staggere

**Contenu textuel :**

- **Titre section :** `Ce que vous allez maitriser.`
- **Sous-titre :** `Un programme concu par des praticiens. Chaque module est forge dans des projets reels.`

**Card 1 — Grande (span 2 cols desktop)**
- Icone : Terminal (Lucide) — accent orange
- Badge : `MODULE PHARE`
- Titre : `Claude Code`
- Texte : `L'outil qui a change notre facon de developper. Setup, configuration, workflows, skills personnalises, debug avance. De zero a expert.`

**Card 2**
- Icone : MessageSquare (Lucide) — accent ambre
- Badge : `FONDAMENTAL`
- Titre : `Prompting avance`
- Texte : `Les techniques de prompting qui font la difference entre un resultat moyen et un resultat exceptionnel. System prompts, chain-of-thought, few-shot.`

**Card 3**
- Icone : Blocks (Lucide) — accent orange
- Badge : `AVANCE`
- Titre : `Skills & CLAUDE.md`
- Texte : `Creer vos propres skills. Structurer votre CLAUDE.md. Transformer Claude en assistant sur-mesure pour votre metier.`

**Card 4**
- Icone : Workflow (Lucide) — accent ambre
- Badge : `PRATIQUE`
- Titre : `Automatisation`
- Texte : `Connecter Claude a vos outils. Automatiser les taches repetitives. Construire des workflows IA qui tournent sans vous.`

**Card 5**
- Icone : Rocket (Lucide) — accent orange
- Badge : `PROJET`
- Titre : `Projet de A a Z`
- Texte : `Construire un projet complet avec Claude. Du brief au deploiement. Vous repartez avec une realisation concrete, pas un certificat vide.`

- **Note sous la grid :** `Le catalogue detaille arrive bientot. Les modules presentes ici sont un apercu — le programme complet sera encore plus dense.`

**Responsive :**
- Mobile : 1 colonne, toutes les cards en full-width, gap-4
- Tablet : 2 colonnes, card 1 en span-2
- Desktop : 2 colonnes, card 1 en span-2, gap-6

**Assets :** Icones Lucide React (Terminal, MessageSquare, Blocks, Workflow, Rocket).

---

### Section 4 — Pour qui (Personas cibles)

**Hauteur :** auto
**Layout :** max-w-4xl centre. 3 cards persona en row (desktop) / stack vertical (mobile).
**Animations :**
- Titre : TextReveal
- Cards : BlurReveal staggere (0.2s entre chaque)
- SpotlightCard sur chaque card
- Hover : translateY(-8px) + glow subtil, transition 700ms
- Emojis/icones : scale bounce 0.7 -> 1.1 -> 1

**Contenu textuel :**

- **Titre section :** `Pour qui.`
- **Sous-titre :** `Que vous codiez depuis 10 ans ou que vous decouvriez l'IA, il y a un parcours pour vous.`

**Card 1**
- Icone : Code (Lucide) — accent orange
- Titre : `Developpeurs`
- Texte : `Vous codez deja. Vous voulez coder 10x plus vite. Claude Code, skills, automatisation — vous allez changer de dimension.`
- Badge : `Tous niveaux`

**Card 2**
- Icone : Briefcase (Lucide) — accent ambre
- Titre : `Entrepreneurs`
- Texte : `Vous n'etes pas dev, mais vous voulez utiliser l'IA pour propulser votre business. Prompting, automatisation, gains de productivite.`
- Badge : `Debutant OK`

**Card 3**
- Icone : Users (Lucide) — accent orange
- Titre : `Equipes tech`
- Texte : `Vous voulez former votre equipe a Claude. On a forme des equipes en entreprise. On sait ce qui fonctionne a l'echelle.`
- Badge : `Sur-mesure`

**Responsive :**
- Mobile : Stack vertical, gap-4, `px-6`
- Tablet : 3 colonnes
- Desktop : 3 colonnes, gap-6, max-w-4xl

**Assets :** Icones Lucide.

---

### Section 5 — L'equipe formatrice

**Hauteur :** auto
**Layout :** Titre centre + 2 cards formateur (desktop : 2 colonnes cote a cote, mobile : stack vertical). Chaque card = photo + role + badges credibilite + bio courte.
**Animations :**
- Titre : TextReveal
- Cards : slide-in depuis la gauche (Elliot) et la droite (Mathieu), BlurReveal, stagger 0.3s
- Photos : leger parallax au scroll
- Hover : glow subtil (box-shadow accent), transition 700ms
- Badges : fade-in staggere (0.05s chacun)

**Contenu textuel :**

- **Badge :** `VOS FORMATEURS`
- **Titre section :** `On enseigne ce qu'on pratique. Chaque jour.`
- **Sous-titre :** `Pas des theoriciens. Pas des influenceurs IA. Des praticiens qui construisent avec Claude au quotidien.`

**Card Elliot**
- Photo : `/images/team/elliot.webp`
- Nom : `Elliot Estrade`
- Role : `CEO Aurentia · Formateur IA en entreprise`
- Badges : `Formateur IA` · `Claude Code daily user` · `5+ projets IA livres` · `23 ans`
- Bio : `Forme des equipes en entreprise a integrer l'IA dans leurs process. A concu le workflow IA d'Aurentia qui permet de livrer un site pro en 48h. Utilise Claude Code sur chaque projet, chaque jour, depuis le premier jour.`
- LinkedIn : `https://www.linkedin.com/in/elliot-estrade/`

**Card Mathieu**
- Photo : `/images/team/mathieu.webp`
- Nom : `Mathieu Bousquet`
- Role : `CTO Aurentia · Formateur Epitech Marseille`
- Badges : `Formateur Epitech` · `Pionnier Claude Code` · `Architecte technique` · `2 hackathons gagnes`
- Bio : `Formateur a Epitech Marseille, il enseigne le developpement a la prochaine generation de devs. Premier de l'equipe a integrer Claude Code dans son workflow quotidien. Architecte technique de chaque projet Aurentia.`
- LinkedIn : `https://www.linkedin.com/in/mathieu-bousquet-178454315/`

**Responsive :**
- Mobile (375px) : Stack vertical, photo en haut (aspect 4:3, object-cover), texte en dessous, `px-6`
- Tablet (768px) : 2 colonnes cote a cote
- Desktop (1280px+) : 2 colonnes, max-w-4xl centre

**Assets :** Photos equipe existantes (`/images/team/elliot.webp`, `/images/team/mathieu.webp`).

---

### Section 6 — Format de la formation

**Hauteur :** auto
**Layout :** Titre centre + 3 blocs horizontaux (desktop) / stack vertical (mobile). Chaque bloc = icone + titre + description.
**Animations :**
- Titre : TextReveal
- Blocs : BlurReveal staggere (0.2s)
- Icones : scale 0.5 -> 1 + rotation subtile (10deg -> 0)

**Contenu textuel :**

- **Titre section :** `Comment ca se passe.`
- **Sous-titre :** `Un format concu pour des professionnels qui n'ont pas le temps de perdre du temps.`

**Bloc 1**
- Icone : Play (Lucide) — accent orange
- Titre : `Videos structurees`
- Texte : `Des modules video courts et denses. Pas de remplissage, pas de "bon alors aujourd'hui on va voir...". Chaque minute compte.`

**Bloc 2**
- Icone : FileText (Lucide) — accent ambre
- Titre : `Cours ecrits + skills`
- Texte : `Chaque module est accompagne de cours ecrits et de skills prets a l'emploi. Copier, coller, adapter a votre contexte. Directement actionnable.`

**Bloc 3**
- Icone : Package (Lucide) — accent orange
- Titre : `Bundles thematiques`
- Texte : `Achetez ce dont vous avez besoin. Un module, un parcours complet, ou le bundle integral. Pas d'abonnement — acces a vie.`

**Responsive :**
- Mobile : Stack vertical, gap-6
- Desktop : Grid 3 colonnes, gap-8

**Assets :** Icones Lucide.

---

### Section 7 — FAQ

**Hauteur :** auto
**Layout :** max-w-3xl centre. Accordeon (details/summary ou composant custom).
**Animations :**
- Titre : TextReveal
- Accordeons : BlurReveal staggere (0.1s)
- Ouverture/fermeture : height auto + opacity, transition 700ms, ease-in-out
- Icone chevron : rotation 0 -> 180deg, transition 500ms

**Contenu textuel :**

- **Titre section :** `Questions frequentes.`

**Q1 : C'est quoi Aurentia Formation exactement ?**
Un produit de formation dedie a Claude AI. Videos, cours ecrits et skills en bundle. Concu par des formateurs qui utilisent Claude au quotidien sur des projets reels.

**Q2 : Quand est-ce que ca sort ?**
Le lancement est en preparation. Rejoignez la waitlist pour etre notifie en premier et beneficier du tarif early bird.

**Q3 : Faut-il savoir coder pour suivre la formation ?**
Certains modules sont accessibles sans competence technique (prompting, automatisation basique). Les modules Claude Code s'adressent aux developpeurs de tous niveaux.

**Q4 : C'est different d'un tuto YouTube ?**
Oui. Les tutos survolent. Ici, chaque module est forge dans des projets reels, avec des skills prets a l'emploi et un accompagnement structure. On va en profondeur.

**Q5 : Il y aura un abonnement ?**
Non. Achat unique avec acces a vie. Pas de mensualite, pas de surprise.

**Q6 : Et si je veux former mon equipe ?**
On propose des formules sur-mesure pour les equipes. Rejoignez la waitlist en precisant "equipe" et on vous recontactera.

**Q7 : Pourquoi Claude et pas GPT ou un autre modele ?**
Claude est le modele qu'on utilise au quotidien pour livrer des projets reels. Claude Code est l'outil qui a transforme notre facon de travailler. On enseigne ce qu'on maitrise — pas ce qui fait du buzz.

**Responsive :**
- Mobile : `px-6`, full-width
- Desktop : `max-w-3xl mx-auto`

**Assets :** Aucun.

---

### Section 8 — CTA Waitlist Final

**Hauteur :** min-h-[50vh], centre verticalement
**Layout :** Centre, fond dark intense avec gradient mesh deploye (glow orange + violet subtil). Formulaire inline (email + bouton).
**Animations :**
- Titre : TextGradientReveal (chaque mot passe en gradient orange -> ambre)
- Sous-titre : BlurReveal, delay 0.3s
- Formulaire : fade-in + translateY(20px), delay 0.5s
- Bouton CTA : glow pulse, magnetic button
- Background : gradient mesh a intensite maximale

**Contenu textuel :**

- **Titre :** `Soyez les premiers a maitriser Claude AI.`
- **Sous-titre :** `Rejoignez la waitlist. Acces prioritaire. Tarif early bird. On vous previent des que c'est pret.`
- **Input placeholder :** `Votre email`
- **CTA Button :** `Rejoindre la waitlist`
- **Preuves sous le formulaire :**
  - `Gratuit et sans engagement`
  - `Pas de spam — juste le lancement`
  - `Tarif early bird pour les premiers inscrits`

**Responsive :**
- Mobile : `text-2xl` pour le titre, `px-6`, formulaire en stack vertical (input full-width + bouton full-width)
- Desktop : `text-4xl md:text-5xl`, formulaire en row (input + bouton inline)

**Assets :** Aucun.

---

## 4. Specifications techniques

### Composants React a creer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `FormationHero` | `src/components/formation/FormationHero.tsx` | — | Badge + H1 + sous-titre + CTA waitlist. TextReveal, BlurReveal. |
| `FormationVision` | `src/components/formation/FormationVision.tsx` | — | 3 paragraphes vision. BlurReveal, TextGradientReveal. |
| `FormationModules` | `src/components/formation/FormationModules.tsx` | — | Bento grid 5 cards modules. SpotlightCard, BlurReveal. |
| `FormationAudience` | `src/components/formation/FormationAudience.tsx` | — | 3 cards persona. SpotlightCard, BlurReveal. |
| `FormationTeam` | `src/components/formation/FormationTeam.tsx` | — | 2 cards formateur avec photo, bio, badges. |
| `FormationFormat` | `src/components/formation/FormationFormat.tsx` | — | 3 blocs format. BlurReveal. |
| `FormationFAQ` | `src/components/formation/FormationFAQ.tsx` | — | Accordeon 7 questions. |
| `FormationCTA` | `src/components/formation/FormationCTA.tsx` | — | Formulaire waitlist (email + submit). MagneticButton. |
| `WaitlistForm` | `src/components/shared/WaitlistForm.tsx` | `source: string` | Formulaire reutilisable : input email + bouton. Server Action pour stocker en DB. |

### Page route

**Fichier :** `src/app/formation/page.tsx`

```tsx
import { FormationHero } from "@/components/formation/FormationHero";
import { FormationVision } from "@/components/formation/FormationVision";
import { FormationModules } from "@/components/formation/FormationModules";
import { FormationAudience } from "@/components/formation/FormationAudience";
import { FormationTeam } from "@/components/formation/FormationTeam";
import { FormationFormat } from "@/components/formation/FormationFormat";
import { FormationFAQ } from "@/components/formation/FormationFAQ";
import { FormationCTA } from "@/components/formation/FormationCTA";

// Metadata export pour Next.js (title, description, openGraph, jsonLd)
```

### Composants existants reutilises

- `TextReveal` — animation mot par mot (GSAP SplitText)
- `TextGradientReveal` — mots passent de dim a gradient au scroll
- `BlurReveal` — blur 10px -> 0 au scroll
- `SpotlightCard` — radial-gradient suit la souris
- `MagneticButton` — bouton qui attire le curseur
- `Section` — wrapper avec theme dark/light

### Data structures

```typescript
// src/data/formation-content.ts

export interface FormationModule {
  icon: string; // nom Lucide
  badge: string; // "MODULE PHARE" | "FONDAMENTAL" | "AVANCE" | "PRATIQUE" | "PROJET"
  title: string;
  text: string;
  span?: number; // colonne span (1 ou 2)
}

export interface FormationPersona {
  icon: string;
  title: string;
  text: string;
  badge: string;
}

export interface FormationTrainer {
  name: string;
  photo: string;
  role: string;
  badges: string[];
  bio: string;
  linkedin: string;
}

export interface FormationFAQItem {
  question: string;
  answer: string;
}

export interface FormationFormatItem {
  icon: string;
  title: string;
  text: string;
}
```

### Dependances / integrations

- **Waitlist form** : Server Action qui enregistre l'email en Supabase (table `waitlist` avec colonnes `email`, `source`, `created_at`)
- **Images** : photos equipe existantes dans `/images/team/`
- **Animations** : composants d'animation existants (`src/components/animations/`)
- **Lucide React** : icones (Terminal, MessageSquare, Blocks, Workflow, Rocket, Code, Briefcase, Users, Play, FileText, Package)

---

## 5. Recapitulatif — Checklist pre-implementation

```
[x] Opening hook : teaser premium "coming soon", pas de "Bienvenue"
[x] Framework : Vision + Modules + Credibilite (adapte a un produit en pre-lancement)
[x] Vision claire : pourquoi Claude, pourquoi nous, pourquoi maintenant
[x] Modules avec contenu reel (apercu) — pas de lorem ipsum
[x] Credibilite formateurs : Elliot (formateur IA entreprise) + Mathieu (formateur Epitech)
[x] FAQ qui gere les objections (quand, pour qui, vs YouTube, pricing)
[x] CTA waitlist clair avec preuves (gratuit, early bird, pas de spam)
[x] Voix "on" (equipe), premium, confiant, direct — ton Aurentia
[x] Aucun mot interdit (cheap, template, basique, robot, garanti, automatique)
[x] Mots de marque utilises (forge, sur-mesure, craft, potentiel, propulser)
[x] Minimum text-sm partout, aucun text-xs
[x] Toutes transitions >= 500ms, ease-in-out
[x] Dark/Light : tokens semantiques uniquement
[x] Pas de position: sticky / pin: true
[x] Animations scroll-triggered sur chaque section
[x] Mobile-first responsive (375px -> 768px -> 1280px)
[x] 1 seul H1
[x] Schema JSON-LD (Course + BreadcrumbList)
[x] Liens internes : /a-propos (equipe), home
[x] Chaque paragraphe < 4 lignes
```

---
---
---

# PARTIE 2 — PAGE `/apport-affaires`

---

## 1. Fiche page

```
Page : /apport-affaires
Titre H1 : "Recommandez. Encaissez. C'est aussi simple que ca."
Title tag : "Programme Apport d'Affaires — 10% de commission | Aurentia" (58 caracteres)
Meta description : "Recommandez Aurentia a votre reseau et touchez 10% de commission sur chaque projet signe. Ouvert a tous. Inscription en 2 minutes." (133 caracteres)
Objectif principal : Inscrire des apporteurs d'affaires -> activer un reseau de recommandation
Persona cible : Freelances, agences complementaires, clients existants satisfaits, tout professionnel avec un reseau
Pages liees :
  - Entrants : Home (footer), /a-propos, bouche-a-oreille / partage direct
  - Sortants : Formulaire inscription, WhatsApp, /conciergeries (pour comprendre les offres)
```

---

## 2. SEO complet

### Mots-cles

| Type | Mots-cles |
|------|-----------|
| **Primaire** | apport affaires agence web |
| **Secondaires** | programme parrainage agence, commission apporteur affaires, gagner argent recommandation |
| **Longue traine** | programme apport affaires agence web IA, commission recommandation creation site, devenir apporteur affaires web |

### Open Graph

```
og:title: "Programme Apport d'Affaires Aurentia — 10% de commission"
og:description: "Recommandez Aurentia et touchez 10% sur chaque projet signe. Freelances, agences, particuliers — ouvert a tous."
og:image: /images/og/apport-affaires.jpg
og:type: website
```

### Schema markup JSON-LD

```json
[
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Programme Apport d'Affaires — Aurentia Agency",
    "description": "Recommandez Aurentia Agency et touchez 10% de commission sur chaque projet signe. Programme ouvert a tous : freelances, agences, particuliers.",
    "url": "https://aurentia.agency/apport-affaires",
    "publisher": {
      "@type": "Organization",
      "name": "Aurentia Agency",
      "url": "https://aurentia.agency"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Combien je touche en tant qu'apporteur d'affaires Aurentia ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "10% du montant HT de chaque projet signe grace a votre recommandation. Pas de plafond."
        }
      },
      {
        "@type": "Question",
        "name": "Qui peut devenir apporteur d'affaires Aurentia ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tout le monde. Freelances, agences, clients existants, particuliers. Aucun statut juridique requis pour commencer."
        }
      },
      {
        "@type": "Question",
        "name": "Comment fonctionne le programme d'apport d'affaires ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Inscrivez-vous, recommandez Aurentia a votre reseau, et touchez 10% de commission quand le projet est signe. Paiement sous 30 jours apres la signature du client."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
      { "@type": "ListItem", "position": 2, "name": "Apport d'affaires", "item": "https://aurentia.agency/apport-affaires" }
    ]
  }
]
```

---

## 3. Architecture des sections

---

### Section 1 — Hero (Le gain potentiel)

**Hauteur :** min-h-[85vh]
**Layout :** Centre, full-width. Titre oversize + sous-titre + CTA. Fond dark avec gradient mesh (glow ambre/orange — univers "valeur/or").
**Animations :**
- Page entry : fade-in + translateY(30px) -> 0, duree 800ms, ease-out
- Badge : fade-in + scale depuis 0.8, delay 0.2s
- H1 : TextReveal (GSAP SplitText, mot par mot, stagger 0.05s)
- Sous-titre : BlurReveal (blur 10px -> 0, delay 0.3s)
- Chiffre "10%" : NumberMorphing (slot machine, highlight orange, tres grand, `text-7xl md:text-9xl font-mono`)
- CTA : scale 0.9 -> 1, glow pulse, magnetic button, delay 0.5s

**Contenu textuel :**

- **Badge :** `PROGRAMME APPORT D'AFFAIRES`
- **Chiffre hero :** `10%` (tres grand, gradient orange -> ambre, au-dessus du H1)
- **H1 :** `Recommandez. Encaissez. C'est aussi simple que ca.`
- **Sous-titre :** `Vous connaissez quelqu'un qui a besoin d'un site ? Recommandez Aurentia. On signe le projet, vous touchez 10% de commission. Ouvert a tout le monde.`
- **CTA Button :** `Devenir apporteur d'affaires` -> ancre vers formulaire ou WhatsApp
- **Micro-preuve sous le CTA :** `Inscription gratuite · Pas de statut requis · Commission versee sous 30 jours`

**Responsive :**
- Mobile (375px) : Chiffre "10%" en `text-6xl`, H1 en `text-3xl`, sous-titre en `text-base`, padding `px-6`, CTA full-width
- Tablet (768px) : Chiffre en `text-8xl`, H1 en `text-4xl`
- Desktop (1280px+) : Chiffre en `text-9xl`, H1 en `text-5xl`, max-w-4xl

**Assets :** Aucun.

---

### Section 2 — Comment ca marche (3 etapes)

**Hauteur :** auto
**Layout :** Titre centre + 3 blocs numerotes en row (desktop) / stack vertical (mobile). Ligne de connexion entre les blocs (trait horizontal desktop, vertical mobile, anime au scroll).
**Animations :**
- Titre : TextReveal
- Blocs : BlurReveal staggere (0.25s entre chaque)
- Numeros : NumberMorphing + scale bounce
- Ligne de connexion : stroke-dashoffset animation au scroll (se dessine progressivement)
- Hover cards : translateY(-4px), transition 700ms

**Contenu textuel :**

- **Titre section :** `3 etapes. Zero prise de tete.`
- **Sous-titre :** `Pas de formation. Pas de process complique. Pas de CRM a remplir.`

**Etape 1**
- Numero : `01`
- Titre : `Inscrivez-vous`
- Texte : `2 minutes. Un formulaire. C'est fait. On vous envoie votre lien d'apporteur et les infos essentielles.`

**Etape 2**
- Numero : `02`
- Titre : `Recommandez`
- Texte : `Quelqu'un de votre reseau a besoin d'un site, d'une landing page ou d'un SaaS ? Parlez-lui d'Aurentia. Envoyez-nous son contact ou donnez-lui le votre.`

**Etape 3**
- Numero : `03`
- Titre : `Encaissez`
- Texte : `Le client signe. On livre. Vous touchez 10% du montant du projet. Virement sous 30 jours. Pas de plafond.`

**Responsive :**
- Mobile : Stack vertical, ligne de connexion verticale a gauche, gap-8, `px-6`
- Desktop : Row de 3, ligne de connexion horizontale, gap-6, max-w-4xl

**Assets :** Aucun.

---

### Section 3 — Combien vous gagnez (Simulateur / Exemples)

**Hauteur :** auto
**Layout :** Titre centre + grille d'exemples concrets (3-4 cards) + note "pas de plafond".
**Animations :**
- Titre : TextGradientReveal
- Cards : BlurReveal staggere (0.15s)
- Montants commission : NumberMorphing (count up de 0 a valeur), highlight gradient orange -> ambre
- SpotlightCard sur chaque card
- Hover : translateY(-8px) + glow, transition 700ms

**Contenu textuel :**

- **Titre section :** `Vos gains. En vrai.`
- **Sous-titre :** `Des exemples concrets sur nos offres reelles. Pas de scenario fictif.`

**Card 1**
- Type : `Site vitrine Essentiel`
- Prix projet : `900 EUR`
- Votre commission : `90 EUR` (highlight orange, `text-3xl font-mono`)
- Detail : `Votre contact lance sa conciergerie et a besoin d'un site pro.`

**Card 2**
- Type : `Site vitrine Croissance`
- Prix projet : `1 490 EUR`
- Votre commission : `149 EUR` (highlight orange, `text-3xl font-mono`)
- Detail : `Un restaurant de votre quartier veut enfin exister sur Google.`

**Card 3**
- Type : `Site vitrine Premium`
- Prix projet : `2 200 EUR`
- Votre commission : `220 EUR` (highlight orange, `text-3xl font-mono`)
- Detail : `Un hotel veut un site sur-mesure avec booking integre.`

**Card 4 — Grande (span 2 cols si desktop)**
- Type : `Application SaaS`
- Prix projet : `10 000 EUR`
- Votre commission : `1 000 EUR` (highlight gradient orange -> ambre, `text-4xl font-mono`)
- Detail : `Un entrepreneur de votre reseau a un projet de plateforme. Vous faites l'intro. Vous touchez 1 000 EUR.`

- **Note sous la grille :** `Pas de plafond. 3 recommandations par mois = 450 EUR a 3 000 EUR de revenus passifs. Sans rien produire.`

**Responsive :**
- Mobile : 1 colonne, cards full-width, gap-4, `px-6`
- Tablet : 2 colonnes, card 4 en span-2
- Desktop : 2 colonnes, card 4 en span-2, gap-6, max-w-4xl

**Assets :** Aucun.

---

### Section 4 — Pour qui (Ouvert a tous)

**Hauteur :** auto
**Layout :** max-w-3xl centre, texte + liste avec checks.
**Animations :**
- Titre : TextReveal
- Items de la liste : slide-in depuis la gauche, stagger 0.1s
- Check icons : scale bounce 0.5 -> 1.1 -> 1

**Contenu textuel :**

- **Titre section :** `Ouvert a tout le monde. Vraiment.`
- **Sous-titre :** `Pas besoin d'etre dans le web. Pas besoin de statut. Juste un reseau et l'envie de le monetiser.`

**Liste :**
- Check — `Freelances` — Vous faites du graphisme, du marketing, du consulting ? Vos clients ont souvent besoin d'un site. Touchez votre part.
- Check — `Agences complementaires` — Vous faites du SEA, du social media, de la photo ? On fait le site, vous prenez la commission.
- Check — `Clients existants` — Votre site Aurentia vous plait ? Recommandez-nous. C'est la meilleure pub — et elle vous rapporte.
- Check — `Commercants & entrepreneurs` — Vous connaissez des collegues, des partenaires, des amis qui ont besoin d'un site ? Parlez-en.
- Check — `Tout le monde` — Litteralement. Votre voisin, votre coiffeur, le restaurant du coin. Si quelqu'un a besoin d'un site, vous pouvez gagner de l'argent.

**Responsive :**
- Mobile : `px-6`, items en stack, `text-base`
- Desktop : `max-w-3xl mx-auto`, `text-lg`

**Assets :** Aucun.

---

### Section 5 — FAQ

**Hauteur :** auto
**Layout :** max-w-3xl centre. Accordeon.
**Animations :**
- Titre : TextReveal
- Accordeons : BlurReveal staggere (0.1s)
- Ouverture/fermeture : height auto + opacity, transition 700ms, ease-in-out
- Icone chevron : rotation 0 -> 180deg, transition 500ms

**Contenu textuel :**

- **Titre section :** `Questions frequentes.`

**Q1 : Combien je touche exactement ?**
10% du montant HT de chaque projet signe grace a votre recommandation. Pas de plafond. Un projet a 900 EUR = 90 EUR pour vous. Un projet a 10 000 EUR = 1 000 EUR.

**Q2 : Quand est-ce que je suis paye ?**
Sous 30 jours apres la signature du client. Virement bancaire classique. Pas de delai cache.

**Q3 : Faut-il un statut d'auto-entrepreneur ?**
Non, pas pour commencer. On travaille avec vous quel que soit votre statut. Pour les commissions regulieres, on vous accompagnera sur les demarches si besoin.

**Q4 : Est-ce que la commission est recurrente ?**
La commission porte sur le premier projet du client que vous apportez. Si le client revient pour un second projet, on en discute au cas par cas.

**Q5 : Comment je recommande quelqu'un ?**
Trois options : envoyez-nous le contact par WhatsApp, par email, ou partagez notre lien directement. On prend le relais.

**Q6 : Qu'est-ce qui se passe si le client ne signe pas ?**
Rien. Pas de commission, mais pas de penalite non plus. Vous ne risquez rien. Zero engagement.

**Q7 : Combien de personnes je peux recommander ?**
Aucune limite. Plus vous recommandez, plus vous gagnez. C'est aussi simple que ca.

**Q8 : Comment je sais si mon contact a signe ?**
On vous tient informe a chaque etape. Quand le client signe, vous recevez une notification et le detail de votre commission.

**Responsive :**
- Mobile : `px-6`, full-width
- Desktop : `max-w-3xl mx-auto`

**Assets :** Aucun.

---

### Section 6 — CTA Inscription Final

**Hauteur :** min-h-[50vh], centre verticalement
**Layout :** Centre, fond dark intense avec gradient mesh deploye (glow ambre/orange). Deux options de CTA : formulaire OU WhatsApp.
**Animations :**
- Titre : TextGradientReveal (chaque mot passe en gradient orange -> ambre)
- Sous-titre : BlurReveal, delay 0.3s
- Boutons CTA : scale 0.9 -> 1, glow pulse, magnetic button, delay 0.5s
- Background : gradient mesh a intensite maximale

**Contenu textuel :**

- **Titre :** `Pret a monetiser votre reseau ?`
- **Sous-titre :** `Inscription en 2 minutes. On vous explique tout. Et des votre premiere recommandation, vous gagnez de l'argent.`
- **CTA Button principal :** `S'inscrire au programme` -> formulaire (modal ou page)
- **CTA Button secondaire (ghost) :** `Poser une question sur WhatsApp` -> lien WhatsApp
- **Preuves sous les boutons :**
  - `Gratuit et sans engagement`
  - `10% de commission — pas de plafond`
  - `Paiement sous 30 jours`

**Responsive :**
- Mobile : `text-2xl` pour le titre, `px-6`, boutons en stack vertical full-width
- Desktop : `text-4xl md:text-5xl`, boutons en row, auto-width

**Assets :** Aucun.

---

## 4. Specifications techniques

### Composants React a creer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `ApportHero` | `src/components/apport/ApportHero.tsx` | — | Chiffre 10% + H1 + sous-titre + CTA. NumberMorphing, TextReveal, MagneticButton. |
| `ApportSteps` | `src/components/apport/ApportSteps.tsx` | — | 3 etapes numerotees avec ligne de connexion animee. BlurReveal, NumberMorphing. |
| `ApportGains` | `src/components/apport/ApportGains.tsx` | — | Grille 4 cards exemples de gains. SpotlightCard, NumberMorphing. |
| `ApportAudience` | `src/components/apport/ApportAudience.tsx` | — | Liste "pour qui" avec checks. |
| `ApportFAQ` | `src/components/apport/ApportFAQ.tsx` | — | Accordeon 8 questions. |
| `ApportCTA` | `src/components/apport/ApportCTA.tsx` | — | CTA final double (formulaire + WhatsApp). MagneticButton. |

### Page route

**Fichier :** `src/app/apport-affaires/page.tsx`

```tsx
import { ApportHero } from "@/components/apport/ApportHero";
import { ApportSteps } from "@/components/apport/ApportSteps";
import { ApportGains } from "@/components/apport/ApportGains";
import { ApportAudience } from "@/components/apport/ApportAudience";
import { ApportFAQ } from "@/components/apport/ApportFAQ";
import { ApportCTA } from "@/components/apport/ApportCTA";

// Metadata export pour Next.js (title, description, openGraph, jsonLd)
```

### Composants existants reutilises

- `TextReveal` — animation mot par mot (GSAP SplitText)
- `TextGradientReveal` — mots passent de dim a gradient au scroll
- `BlurReveal` — blur 10px -> 0 au scroll
- `SpotlightCard` — radial-gradient suit la souris
- `MagneticButton` — bouton qui attire le curseur
- `NumberMorphing` — slot machine vertical pour les chiffres
- `Section` — wrapper avec theme dark/light

### Data structures

```typescript
// src/data/apport-content.ts

export interface ApportStep {
  number: string; // "01" | "02" | "03"
  title: string;
  text: string;
}

export interface ApportGainExample {
  type: string; // "Site vitrine Essentiel", etc.
  projectPrice: number;
  commission: number;
  detail: string;
  span?: number; // colonne span (1 ou 2)
}

export interface ApportAudienceItem {
  label: string; // "Freelances", etc.
  text: string;
}

export interface ApportFAQItem {
  question: string;
  answer: string;
}
```

### Dependances / integrations

- **Formulaire inscription** : Server Action qui enregistre en Supabase (table `apporteurs` avec colonnes `name`, `email`, `phone`, `context`, `created_at`) OU redirection vers WhatsApp
- **WhatsApp** : lien pre-rempli avec message type "Bonjour, je souhaite rejoindre le programme apporteur d'affaires Aurentia."
- **Animations** : composants d'animation existants (`src/components/animations/`)
- **Lucide React** : icones (Check, ArrowRight, MessageCircle, Users, Briefcase, Store, UserPlus)

---

## 5. Recapitulatif — Checklist pre-implementation

```
[x] Opening hook : chiffre 10% massif + headline directe, pas de "Bienvenue"
[x] Framework : Gain potentiel + Process + Preuve + CTA (adapte a un programme d'affiliation)
[x] 3 etapes ultra simples — zero friction
[x] Exemples de gains concrets bases sur les vrais prix Aurentia
[x] "Ouvert a tous" — liste exhaustive des profils
[x] FAQ complete qui gere les objections (paiement, statut, recurrence, tracking)
[x] Double CTA (formulaire + WhatsApp) — flexibilite maximale
[x] Ton decontracte mais premium — "de l'argent facile" sans etre racoleur
[x] Voix "on" (equipe), confiant, direct — ton Aurentia
[x] Aucun mot interdit (cheap, template, basique, robot, garanti, automatique)
[x] Mots de marque utilises (sur-mesure, craft, potentiel)
[x] Minimum text-sm partout, aucun text-xs
[x] Toutes transitions >= 500ms, ease-in-out
[x] Dark/Light : tokens semantiques uniquement
[x] Pas de position: sticky / pin: true
[x] Animations scroll-triggered sur chaque section
[x] Mobile-first responsive (375px -> 768px -> 1280px)
[x] 1 seul H1
[x] Schema JSON-LD (WebPage + FAQPage + BreadcrumbList)
[x] Liens internes : /conciergeries (pour comprendre les offres), home
[x] Chaque paragraphe < 4 lignes
```

---

*PRD — Pages /formation et /apport-affaires — Aurentia Agency — Mars 2026*
