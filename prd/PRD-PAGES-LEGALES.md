# PRD — Pages Légales (`/cgv`, `/mentions-legales`, `/politique-confidentialite`)

---

## Architecture commune

Les 3 pages partagent le même layout et les mêmes composants. Seul le contenu textuel change.

### Layout commun

- Navbar + Footer (existants)
- `max-w-3xl mx-auto`, padding `px-6 md:px-8`, `py-20 md:py-32`
- Typographie long-form : `text-base md:text-lg`, `leading-relaxed md:leading-loose`
- Titres de section : `text-xl md:text-2xl font-heading font-bold`
- H1 : `text-3xl md:text-4xl lg:text-5xl font-heading font-bold`
- Dernière mise à jour affichée sous le H1 : `text-sm text-foreground/50`
- Table des matières sticky sur desktop (sidebar gauche) ou inline sur mobile
- Tokens sémantiques dark/light uniquement (`text-foreground`, `bg-background`, etc.)
- Minimum `text-sm` partout

### Composants React à créer

| Composant | Fichier | Props | Notes |
|-----------|---------|-------|-------|
| `LegalPageLayout` | `src/components/legal/LegalPageLayout.tsx` | `title: string`, `lastUpdated: string`, `toc: TocItem[]`, `children: ReactNode` | Layout partagé : H1 + date + table des matières + contenu |
| `LegalSection` | `src/components/legal/LegalSection.tsx` | `id: string`, `title: string`, `children: ReactNode` | Section avec ancre, titre H2, contenu |
| `LegalToc` | `src/components/legal/LegalToc.tsx` | `items: TocItem[]` | Table des matières. Desktop : sidebar sticky `top-24`. Mobile : bloc inline sous le H1 avec disclosure (accordéon). |

```typescript
interface TocItem {
  id: string;
  label: string;
}
```

### Animations

- Page entry : fade-in + translateY(20px) → 0, durée 700ms, ease-in-out
- Chaque `LegalSection` : fade-in au scroll, durée 500ms
- Table des matières : highlight de l'item actif au scroll (IntersectionObserver), transition couleur 500ms
- Aucune animation complexe — ces pages sont informatives

### Responsive

- Mobile (375px) : `px-6`, ToC inline (accordéon replié par défaut), `text-base`
- Tablet (768px) : `px-8`, ToC inline ouvert
- Desktop (1280px+) : ToC sidebar sticky à gauche, contenu `max-w-3xl`, `text-lg`

### SEO commun

- `noindex, follow` recommandé (pages légales rarement utiles au SEO, mais les liens internes restent crawlables)
- Schema `BreadcrumbList` sur chaque page
- Liens internes vers les autres pages légales dans le footer

---

# PAGE 1 : `/cgv`

## 1. Fiche page

```
Page : /cgv
Titre H1 : "Conditions Générales de Vente"
Title tag : "Conditions Générales de Vente | Aurentia Agency" (52 caractères)
Meta description : "Consultez les conditions générales de vente d'Aurentia Agency : prestations web, paiement, livraison, propriété intellectuelle et garanties." (143 caractères)
Dernière mise à jour : Mars 2026
```

### Open Graph

```
og:title: "CGV — Aurentia Agency"
og:description: "Conditions générales de vente applicables aux prestations de création web et services numériques d'Aurentia Agency."
og:type: website
```

### Schema JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
    { "@type": "ListItem", "position": 2, "name": "Conditions Générales de Vente", "item": "https://aurentia.agency/cgv" }
  ]
}
```

## 2. Contenu textuel complet

---

### Table des matières

1. Objet et champ d'application
2. Définitions
3. Commandes et devis
4. Prix et modalités de paiement
5. Délais de livraison
6. Révisions et modifications
7. Propriété intellectuelle
8. Hébergement et maintenance
9. Résiliation
10. Droit de rétractation
11. Responsabilité et garanties
12. Données personnelles
13. Force majeure
14. Droit applicable et litiges
15. Dispositions générales

---

### Article 1 — Objet et champ d'application

Les présentes Conditions Générales de Vente (ci-après « CGV ») s'appliquent à l'ensemble des prestations de services numériques proposées par la société Aurentia Agency (ci-après « le Prestataire ») à ses clients professionnels ou particuliers (ci-après « le Client »).

Les prestations concernées incluent notamment :
- La conception et le développement de sites web vitrines sur-mesure
- La conception et le développement d'applications SaaS
- La conception et le développement de landing pages
- La création d'identité visuelle
- Les prestations de formation
- L'hébergement et la maintenance de sites web

Toute commande implique l'acceptation sans réserve des présentes CGV. Le Prestataire se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.

---

### Article 2 — Définitions

- **Prestataire** : Aurentia Agency, SAS au capital de [À COMPLÉTER] €, immatriculée au RCS de [À COMPLÉTER] sous le numéro SIRET [À COMPLÉTER], dont le siège social est situé au [À COMPLÉTER].
- **Client** : Toute personne physique ou morale qui passe commande d'une prestation auprès du Prestataire.
- **Devis** : Document contractuel détaillant la nature, le périmètre, le prix et les délais de la prestation.
- **Livrables** : L'ensemble des éléments produits par le Prestataire dans le cadre de la prestation (site web, maquettes, code source, contenus, etc.).
- **V1** : Première version fonctionnelle du site web, mise en ligne dans un environnement de prévisualisation.
- **Version finale** : Version définitive du site web après intégration des retours du Client, mise en ligne sur le domaine de production.

---

### Article 3 — Commandes et devis

#### 3.1. Processus de commande

Toute prestation fait l'objet d'un devis préalable, établi gratuitement par le Prestataire à la suite d'un échange avec le Client (appel téléphonique, visioconférence ou échange écrit).

Le devis précise :
- La nature et le périmètre détaillé de la prestation
- Le prix total hors taxes et toutes taxes comprises
- Les modalités et l'échéancier de paiement
- Les délais de livraison prévisionnels
- Le nombre de tours de révisions inclus
- Les éventuelles options (hébergement, maintenance, formation)

#### 3.2. Acceptation

La commande est considérée comme ferme et définitive après :
- Signature du devis par le Client (signature électronique ou manuscrite acceptée)
- Paiement du premier acompte conformément à l'échéancier prévu

#### 3.3. Éléments fournis par le Client

Le Client s'engage à fournir dans les délais convenus l'ensemble des éléments nécessaires à la réalisation de la prestation : textes, images, logos, accès aux outils existants, brief détaillé. Tout retard dans la transmission de ces éléments pourra entraîner un décalage des délais de livraison, sans que la responsabilité du Prestataire ne puisse être engagée.

---

### Article 4 — Prix et modalités de paiement

#### 4.1. Prix

Les prix sont indiqués en euros et hors taxes, sauf mention contraire. La TVA applicable est celle en vigueur au jour de la facturation.

À titre indicatif, les fourchettes de prix des prestations sont les suivantes :
- Sites vitrines sur-mesure : à partir de 900 € HT
- Landing pages haute conversion : à partir de 1 500 € HT
- Applications SaaS : à partir de 5 000 € HT (sur devis)

Les tarifs des abonnements d'hébergement et maintenance sont détaillés à l'article 8.

#### 4.2. Modalités de paiement

Le paiement s'effectue par virement bancaire ou par tout autre moyen accepté par le Prestataire.

**Option de paiement en 3 fois sans frais :**
Le Client peut opter pour un règlement en 3 échéances égales :
- 1ère échéance : à la signature du devis (avant le début de la prestation)
- 2ème échéance : à la livraison de la V1
- 3ème échéance : à la livraison de la version finale

#### 4.3. Retard de paiement

Tout retard de paiement entraîne de plein droit, et sans qu'une mise en demeure soit nécessaire :
- L'application de pénalités de retard au taux de trois fois le taux d'intérêt légal en vigueur
- Une indemnité forfaitaire de recouvrement de 40 euros, conformément aux articles L441-10 et D441-5 du Code de commerce

Le Prestataire se réserve le droit de suspendre l'exécution de la prestation en cas de non-paiement d'une échéance dans un délai de 15 jours après mise en demeure restée infructueuse.

#### 4.4. Premier mois d'abonnement offert

Pour toute souscription à un abonnement d'hébergement et maintenance concomitante à une prestation de création de site, le premier mois d'abonnement est offert.

---

### Article 5 — Délais de livraison

#### 5.1. Délais indicatifs

Les délais de livraison sont communiqués à titre indicatif et courent à compter de la réception de l'intégralité des éléments nécessaires fournis par le Client et du paiement du premier acompte.

Les délais standards sont les suivants :
- **V1 (première version fonctionnelle)** : 48 heures ouvrées à compter de la réception de tous les éléments
- **Version finale** : 7 jours ouvrés à compter de la validation de la V1 par le Client, incluant les tours de révisions

Ces délais s'entendent pour les prestations de création de sites vitrines. Les délais pour les applications SaaS et les projets complexes sont définis au cas par cas dans le devis.

#### 5.2. Validation et réception

La V1 est présentée au Client via un lien de prévisualisation. Le Client dispose de 7 jours calendaires pour formuler ses retours. Passé ce délai sans réponse, la V1 est réputée acceptée.

La livraison finale est considérée comme effective lors de la mise en ligne du site sur le domaine de production du Client. Un procès-verbal de réception pourra être établi à la demande de l'une ou l'autre des parties.

---

### Article 6 — Révisions et modifications

#### 6.1. Révisions incluses

Chaque prestation inclut **3 tours de révisions** à compter de la livraison de la V1. Chaque tour de révision correspond à un ensemble de modifications demandées par le Client et transmises en une seule fois.

Les révisions incluses couvrent :
- Les ajustements de contenu textuel
- Les modifications mineures de design (couleurs, espacements, typographie)
- Les corrections de bugs ou dysfonctionnements

#### 6.2. Modifications hors périmètre

Les demandes suivantes ne sont pas couvertes par les tours de révisions inclus et feront l'objet d'un devis complémentaire :
- Ajout de pages ou de fonctionnalités non prévues au devis initial
- Refonte significative du design ou de l'architecture
- Modification du périmètre fonctionnel initial

#### 6.3. Révisions supplémentaires

Au-delà des 3 tours de révisions inclus, toute modification supplémentaire sera facturée sur la base d'un taux horaire de [À COMPLÉTER] € HT/heure, après acceptation d'un devis complémentaire par le Client.

---

### Article 7 — Propriété intellectuelle

#### 7.1. Cession des droits

À compter du paiement intégral de la prestation, le Prestataire cède au Client l'ensemble des droits de propriété intellectuelle sur les Livrables, et notamment :
- Le code source du site web ou de l'application
- Les éléments graphiques créés spécifiquement pour le projet
- Les contenus rédactionnels produits par le Prestataire

Cette cession est consentie à titre exclusif, pour le monde entier et pour toute la durée de protection des droits de propriété intellectuelle.

#### 7.2. Exceptions

Sont exclus de la cession :
- Les outils, frameworks, bibliothèques et composants open source utilisés pour le développement (Next.js, React, Tailwind CSS, etc.), qui restent soumis à leurs licences respectives
- Le savoir-faire, les méthodologies et les processus internes du Prestataire
- Les éléments achetés auprès de tiers (polices, images de stock, icônes) qui restent soumis à leurs licences propres

#### 7.3. Droit de référence

Le Prestataire se réserve le droit de mentionner le projet réalisé dans son portfolio et ses supports de communication, sauf opposition écrite du Client.

#### 7.4. Garantie du Client

Le Client garantit qu'il dispose des droits nécessaires sur les éléments qu'il fournit (textes, images, logos, marques) et qu'il tiendra le Prestataire indemne de toute réclamation de tiers à ce titre.

---

### Article 8 — Hébergement et maintenance

#### 8.1. Abonnements

Le Prestataire propose des abonnements mensuels d'hébergement et de maintenance, souscrits en complément d'une prestation de création de site :

| Formule | Prix mensuel TTC | Inclut |
|---------|------------------|--------|
| **Essentiel** | 19 €/mois | Hébergement, certificat SSL, sauvegardes hebdomadaires, mises à jour de sécurité |
| **Croissance** | 35 €/mois | Hébergement, certificat SSL, sauvegardes quotidiennes, mises à jour de sécurité, support prioritaire, modifications mineures (1h/mois) |
| **Premium** | 75 €/mois | Hébergement, certificat SSL, sauvegardes quotidiennes, mises à jour de sécurité, support prioritaire, modifications (3h/mois), monitoring performance, rapport mensuel |

#### 8.2. Durée et renouvellement

Les abonnements sont souscrits pour une durée initiale d'un mois et sont renouvelés tacitement chaque mois. Le Client peut résilier son abonnement à tout moment, avec un préavis de 30 jours avant la date de renouvellement.

#### 8.3. Premier mois offert

Le premier mois d'abonnement est offert pour toute souscription concomitante à une prestation de création de site.

#### 8.4. Conséquences de la résiliation

En cas de résiliation de l'abonnement d'hébergement, le Prestataire s'engage à :
- Fournir au Client une copie complète du code source et des données du site
- Maintenir le site en ligne pendant 30 jours suivant la résiliation effective, afin de permettre la migration
- Accompagner le Client dans le transfert technique si celui-ci en fait la demande (prestation facturée séparément)

---

### Article 9 — Résiliation

#### 9.1. Résiliation par le Client

Le Client peut résilier la prestation en cours à tout moment par lettre recommandée avec accusé de réception ou par email à contact@aurentia.agency.

En cas de résiliation avant la livraison de la V1, les acomptes versés restent acquis au Prestataire au titre du travail déjà réalisé.

En cas de résiliation après la livraison de la V1, l'intégralité du prix de la prestation est due.

#### 9.2. Résiliation par le Prestataire

Le Prestataire peut résilier la prestation en cas de :
- Non-paiement d'une échéance après mise en demeure restée infructueuse pendant 15 jours
- Non-fourniture des éléments nécessaires par le Client après relance restée sans effet pendant 30 jours
- Comportement du Client contraire aux bonnes mœurs ou aux dispositions légales

#### 9.3. Conséquences

En cas de résiliation, quelle qu'en soit la cause, le Prestataire remettra au Client l'ensemble des Livrables produits à la date de résiliation, sous réserve du paiement intégral des sommes dues pour le travail réalisé.

---

### Article 10 — Droit de rétractation

Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les prestations de services pleinement exécutées avant la fin du délai de rétractation et dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.

Le Client reconnaît expressément, lors de l'acceptation du devis, que :
- L'exécution de la prestation commence dès la réception des éléments nécessaires et du premier acompte
- Il renonce à son droit de rétractation dès le début de l'exécution de la prestation

Pour les prestations qui n'ont pas encore commencé, le Client consommateur dispose d'un délai de rétractation de 14 jours à compter de l'acceptation du devis, conformément aux articles L221-18 et suivants du Code de la consommation.

---

### Article 11 — Responsabilité et garanties

#### 11.1. Obligation de moyens

Le Prestataire s'engage à exécuter les prestations avec diligence et selon les règles de l'art, dans le cadre d'une obligation de moyens.

#### 11.2. Limites de responsabilité

La responsabilité du Prestataire ne saurait être engagée en cas de :
- Non-respect par le Client de ses obligations (fourniture des éléments, validations dans les délais)
- Dysfonctionnement résultant d'une intervention d'un tiers sur les Livrables sans l'accord du Prestataire
- Dommages indirects tels que perte de chiffre d'affaires, perte de clientèle, perte de données
- Force majeure telle que définie à l'article 13

En tout état de cause, la responsabilité totale du Prestataire au titre d'une prestation est limitée au montant effectivement perçu pour ladite prestation.

#### 11.3. Garantie de conformité

Le Prestataire garantit la conformité des Livrables au périmètre défini dans le devis. En cas de non-conformité constatée dans un délai de 30 jours suivant la livraison finale, le Prestataire s'engage à corriger les éléments non conformes dans les meilleurs délais et sans frais supplémentaires.

---

### Article 12 — Données personnelles

Dans le cadre de l'exécution des prestations, le Prestataire peut être amené à collecter et traiter des données personnelles du Client. Le traitement de ces données est effectué conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés.

Pour plus d'informations sur le traitement des données personnelles, le Client est invité à consulter la [Politique de confidentialité](/politique-confidentialite) du Prestataire.

---

### Article 13 — Force majeure

Aucune des parties ne pourra être tenue responsable de l'inexécution ou du retard dans l'exécution de ses obligations résultant d'un cas de force majeure au sens de l'article 1218 du Code civil.

Sont notamment considérés comme cas de force majeure : les catastrophes naturelles, les pandémies, les guerres, les grèves générales, les pannes de réseau Internet ou d'électricité, les défaillances d'hébergeurs tiers.

En cas de force majeure, l'exécution des obligations est suspendue. Si le cas de force majeure perdure au-delà de 60 jours, chaque partie pourra résilier le contrat sans indemnité.

---

### Article 14 — Droit applicable et litiges

Les présentes CGV sont régies par le droit français.

En cas de litige relatif à l'interprétation ou à l'exécution des présentes CGV, les parties s'engagent à rechercher une solution amiable dans un délai de 30 jours.

À défaut de résolution amiable :
- **Client professionnel** : le litige sera soumis aux tribunaux compétents du ressort du siège social du Prestataire.
- **Client consommateur** : conformément aux articles L611-1 et suivants du Code de la consommation, le Client peut recourir gratuitement au service de médiation de la consommation. Le médiateur compétent est [À COMPLÉTER — nom et coordonnées du médiateur]. Le Client peut également saisir la plateforme européenne de règlement en ligne des litiges : https://ec.europa.eu/consumers/odr.

---

### Article 15 — Dispositions générales

Si l'une quelconque des stipulations des présentes CGV est déclarée nulle ou inapplicable, les autres stipulations restent en vigueur.

Le fait pour le Prestataire de ne pas se prévaloir d'une disposition des présentes CGV ne vaut pas renonciation à s'en prévaloir ultérieurement.

Les présentes CGV constituent l'intégralité de l'accord entre les parties, sous réserve des stipulations particulières figurant dans le devis.

---

*Dernière mise à jour : mars 2026*

---
---

# PAGE 2 : `/mentions-legales`

## 1. Fiche page

```
Page : /mentions-legales
Titre H1 : "Mentions Légales"
Title tag : "Mentions Légales | Aurentia Agency" (37 caractères)
Meta description : "Mentions légales du site aurentia.agency : éditeur, hébergeur, propriété intellectuelle et conditions d'utilisation." (118 caractères)
Dernière mise à jour : Mars 2026
```

### Open Graph

```
og:title: "Mentions Légales — Aurentia Agency"
og:description: "Informations légales relatives au site aurentia.agency conformément à la loi pour la confiance dans l'économie numérique (LCEN)."
og:type: website
```

### Schema JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
    { "@type": "ListItem", "position": 2, "name": "Mentions Légales", "item": "https://aurentia.agency/mentions-legales" }
  ]
}
```

## 2. Contenu textuel complet

---

### Table des matières

1. Éditeur du site
2. Directeur de la publication
3. Hébergeur
4. Propriété intellectuelle
5. Crédits
6. Conditions d'utilisation
7. Liens hypertextes
8. Contact

---

### Article 1 — Éditeur du site

Le site https://aurentia.agency est édité par :

**Aurentia Agency**
Société par actions simplifiée (SAS)
Capital social : [À COMPLÉTER] €
Siège social : [À COMPLÉTER — adresse complète]
RCS : [À COMPLÉTER — ville]
SIRET : [À COMPLÉTER]
Numéro de TVA intracommunautaire : [À COMPLÉTER]

Email : contact@aurentia.agency
Téléphone : [À COMPLÉTER]

---

### Article 2 — Directeur de la publication

Le directeur de la publication du site est **Elliot Estrade**, en sa qualité de Président de la société Aurentia Agency.

Contact : contact@aurentia.agency

---

### Article 3 — Hébergeur

Le site est hébergé par :

**Vercel Inc.**
340 S Lemon Ave #4133
Walnut, CA 91789
États-Unis

Site web : https://vercel.com
Email : privacy@vercel.com

---

### Article 4 — Propriété intellectuelle

L'ensemble du contenu du site aurentia.agency (textes, images, vidéos, graphismes, logo, icônes, sons, logiciels, mise en page, bases de données, code source) est la propriété exclusive d'Aurentia Agency ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.

Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit et sur quelque support que ce soit, est interdite sans l'autorisation écrite préalable d'Aurentia Agency.

Toute exploitation non autorisée du site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L335-2 et suivants du Code de la propriété intellectuelle.

---

### Article 5 — Crédits

**Conception et développement :** Aurentia Agency

**Design :** Aurentia Agency

**Photographies et visuels :**
- Photos d'équipe : Aurentia Agency
- Icônes : Lucide (licence MIT)
- Mockups et illustrations : créations originales Aurentia Agency
- Images tierces éventuelles : [À COMPLÉTER si applicable — source et licence]

**Technologies utilisées :** Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, Vercel

---

### Article 6 — Conditions d'utilisation

L'utilisation du site aurentia.agency implique l'acceptation pleine et entière des présentes mentions légales.

Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Aurentia Agency met tout en œuvre pour assurer la disponibilité du site, mais ne saurait être tenue responsable des interruptions, qu'elles soient dues à des opérations de maintenance, à des pannes techniques, ou à des cas de force majeure.

Aurentia Agency se réserve le droit de modifier, compléter ou supprimer tout ou partie du contenu du site à tout moment et sans préavis.

---

### Article 7 — Liens hypertextes

Le site aurentia.agency peut contenir des liens hypertextes vers d'autres sites web. Aurentia Agency n'exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur contenu ou aux éventuels collectes et traitements de données qu'ils effectuent.

La mise en place de liens hypertextes vers le site aurentia.agency est autorisée sans accord préalable, à condition que ces liens ne portent pas atteinte à l'image d'Aurentia Agency.

---

### Article 8 — Contact

Pour toute question relative aux présentes mentions légales, vous pouvez nous contacter :

- **Email :** contact@aurentia.agency
- **Formulaire de contact :** https://aurentia.agency/#contact
- **Rendez-vous :** https://cal.com/aurentia

---

*Mentions légales conformes à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).*

*Dernière mise à jour : mars 2026*

---
---

# PAGE 3 : `/politique-confidentialite`

## 1. Fiche page

```
Page : /politique-confidentialite
Titre H1 : "Politique de Confidentialité"
Title tag : "Politique de Confidentialité — RGPD | Aurentia Agency" (55 caractères)
Meta description : "Découvrez comment Aurentia Agency collecte, utilise et protège vos données personnelles. Politique conforme au RGPD." (118 caractères)
Dernière mise à jour : Mars 2026
```

### Open Graph

```
og:title: "Politique de Confidentialité — Aurentia Agency"
og:description: "Informations sur la collecte et le traitement de vos données personnelles par Aurentia Agency, conformément au RGPD."
og:type: website
```

### Schema JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://aurentia.agency" },
    { "@type": "ListItem", "position": 2, "name": "Politique de Confidentialité", "item": "https://aurentia.agency/politique-confidentialite" }
  ]
}
```

## 2. Contenu textuel complet

---

### Table des matières

1. Responsable du traitement
2. Données collectées
3. Finalités du traitement
4. Base légale du traitement
5. Destinataires des données
6. Durée de conservation
7. Droits des personnes
8. Cookies et traceurs
9. Transferts de données hors UE
10. Sécurité des données
11. Modification de la politique
12. Contact

---

### Article 1 — Responsable du traitement

Le responsable du traitement des données à caractère personnel collectées sur le site https://aurentia.agency est :

**Aurentia Agency**
Société par actions simplifiée (SAS)
Siège social : [À COMPLÉTER — adresse complète]
SIRET : [À COMPLÉTER]
Email : contact@aurentia.agency

**Délégué à la protection des données (DPO) :** [À COMPLÉTER — nom et coordonnées du DPO, ou indiquer « Le responsable du traitement fait office de DPO »]

---

### Article 2 — Données collectées

Aurentia Agency collecte et traite les données personnelles suivantes dans le cadre de l'utilisation du site et de ses services :

#### 2.1. Données collectées via les formulaires

- **Formulaire de contact :** nom, prénom, adresse email, numéro de téléphone (optionnel), nom de l'entreprise (optionnel), message
- **Prise de rendez-vous (Cal.com) :** nom, prénom, adresse email, créneau choisi

#### 2.2. Données collectées automatiquement

- **Données de navigation :** adresse IP (anonymisée), type de navigateur, système d'exploitation, pages visitées, durée de la visite, source de trafic
- **Cookies et traceurs :** voir article 8

#### 2.3. Données collectées dans le cadre d'une prestation

- **Données contractuelles :** nom, prénom, adresse email, adresse postale, numéro de téléphone, nom de l'entreprise, numéro SIRET, données de facturation
- **Données de projet :** éléments fournis par le Client pour la réalisation de la prestation (textes, images, accès)

---

### Article 3 — Finalités du traitement

Les données personnelles collectées sont traitées pour les finalités suivantes :

| Finalité | Données concernées |
|----------|-------------------|
| Répondre aux demandes de contact | Nom, email, téléphone, message |
| Gestion des rendez-vous | Nom, email, créneau |
| Exécution des prestations de services | Données contractuelles et de projet |
| Facturation et suivi comptable | Données de facturation |
| Amélioration du site et analyse d'audience | Données de navigation (anonymisées) |
| Envoi de communications commerciales (avec consentement) | Adresse email |
| Respect des obligations légales | Données contractuelles et de facturation |

---

### Article 4 — Base légale du traitement

Conformément au Règlement (UE) 2016/679 (RGPD), le traitement des données personnelles repose sur les bases légales suivantes :

- **Exécution d'un contrat** (article 6.1.b du RGPD) : pour le traitement des données nécessaires à la réalisation des prestations commandées par le Client
- **Consentement** (article 6.1.a du RGPD) : pour l'utilisation de cookies non essentiels et l'envoi de communications commerciales
- **Intérêt légitime** (article 6.1.f du RGPD) : pour l'amélioration du site, l'analyse d'audience et la prévention de la fraude
- **Obligation légale** (article 6.1.c du RGPD) : pour la conservation des données de facturation conformément aux obligations comptables et fiscales

---

### Article 5 — Destinataires des données

Les données personnelles collectées sont destinées à :

- **L'équipe Aurentia Agency** : pour la gestion des demandes, l'exécution des prestations et le support client
- **Sous-traitants techniques** :
  - **Vercel Inc.** (hébergement du site) — États-Unis
  - **Cal.com** (gestion des rendez-vous) — États-Unis
  - **Vercel Analytics** (analyse d'audience) — États-Unis
  - **PostHog** (analyse d'audience et comportement utilisateur, si activé) — Union Européenne / États-Unis
  - **Supabase** (base de données, si applicable) — États-Unis
  - **Stripe** (traitement des paiements, si applicable) — États-Unis

Aurentia Agency veille à ce que chaque sous-traitant présente des garanties suffisantes en matière de protection des données personnelles.

Aucune donnée personnelle n'est vendue, louée ou cédée à des tiers à des fins commerciales.

---

### Article 6 — Durée de conservation

Les données personnelles sont conservées pour une durée proportionnée à la finalité du traitement :

| Catégorie de données | Durée de conservation |
|---------------------|----------------------|
| Données de contact (formulaires) | 3 ans à compter du dernier contact |
| Données de rendez-vous | 1 an à compter du rendez-vous |
| Données contractuelles (clients) | Durée de la relation contractuelle + 5 ans (prescription civile) |
| Données de facturation | 10 ans (obligations comptables et fiscales) |
| Données de navigation (analytics) | 13 mois (recommandation CNIL) |
| Cookies | Voir article 8 |

À l'expiration de ces durées, les données sont supprimées ou anonymisées de manière irréversible.

---

### Article 7 — Droits des personnes

Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :

- **Droit d'accès** (article 15 du RGPD) : obtenir la confirmation du traitement de vos données et en obtenir une copie
- **Droit de rectification** (article 16 du RGPD) : corriger des données inexactes ou incomplètes
- **Droit à l'effacement** (article 17 du RGPD) : demander la suppression de vos données, sous réserve des obligations légales de conservation
- **Droit à la limitation du traitement** (article 18 du RGPD) : demander la suspension du traitement de vos données
- **Droit à la portabilité** (article 20 du RGPD) : recevoir vos données dans un format structuré, couramment utilisé et lisible par machine
- **Droit d'opposition** (article 21 du RGPD) : vous opposer au traitement de vos données pour des motifs légitimes, ou à des fins de prospection commerciale
- **Droit de retirer votre consentement** à tout moment pour les traitements fondés sur le consentement, sans remettre en cause la licéité du traitement effectué avant le retrait

#### Comment exercer vos droits

Vous pouvez exercer vos droits en adressant votre demande :
- **Par email :** contact@aurentia.agency
- **Par courrier :** Aurentia Agency — [À COMPLÉTER — adresse postale]

Nous nous engageons à répondre à votre demande dans un délai maximum d'un mois à compter de sa réception. Ce délai peut être prolongé de deux mois en cas de demande complexe, auquel cas vous en serez informé.

Une pièce d'identité pourra vous être demandée afin de vérifier votre identité.

#### Réclamation auprès de la CNIL

Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :

**CNIL**
3, Place de Fontenoy — TSA 80715
75334 Paris Cedex 07
Site web : https://www.cnil.fr
Téléphone : 01 53 73 22 22

---

### Article 8 — Cookies et traceurs

#### 8.1. Qu'est-ce qu'un cookie ?

Un cookie est un petit fichier texte stocké sur votre terminal (ordinateur, tablette, smartphone) lors de votre visite sur un site web. Il permet de mémoriser des informations relatives à votre navigation.

#### 8.2. Cookies utilisés sur le site

| Cookie / Traceur | Éditeur | Finalité | Type | Durée |
|-----------------|---------|----------|------|-------|
| Vercel Analytics | Vercel Inc. | Analyse d'audience (pages vues, source de trafic, pays). Données anonymisées, sans cookie persistant. | Analytique (privacy-friendly) | Session |
| Vercel Speed Insights | Vercel Inc. | Mesure de la performance du site (temps de chargement, Web Vitals). | Performance | Session |
| PostHog (si activé) | PostHog Inc. | Analyse comportementale (parcours utilisateur, clics, événements). | Analytique | 1 an |
| Cookies techniques | Aurentia Agency | Fonctionnement du site (préférence de thème clair/sombre). | Strictement nécessaire | 1 an |

#### 8.3. Consentement

Conformément à la recommandation de la CNIL sur les cookies (délibération n° 2020-091 du 17 septembre 2020) :

- **Cookies strictement nécessaires** : déposés sans consentement, car indispensables au fonctionnement du site
- **Cookies analytiques (Vercel Analytics)** : Vercel Analytics est conçu pour respecter la vie privée (pas de cookie persistant, données anonymisées). Conformément aux lignes directrices de la CNIL, ces traceurs exemptés de consentement sont limités à la mesure d'audience strictement nécessaire
- **Cookies analytiques (PostHog, si activé)** : soumis au consentement préalable de l'utilisateur

#### 8.4. Gestion des cookies

Vous pouvez à tout moment gérer vos préférences en matière de cookies :
- **Via le bandeau cookies** affiché lors de votre première visite sur le site
- **Via les paramètres de votre navigateur** : chaque navigateur propose des options pour accepter, refuser ou supprimer les cookies. Consultez la documentation de votre navigateur pour plus d'informations.

Le refus des cookies analytiques n'a aucune incidence sur votre navigation sur le site.

---

### Article 9 — Transferts de données hors Union Européenne

Certains de nos sous-traitants sont situés aux États-Unis (Vercel, Cal.com, Stripe). Ces transferts de données hors de l'Union Européenne sont encadrés par :

- Le **Data Privacy Framework (DPF) UE-États-Unis**, adopté par la Commission européenne le 10 juillet 2023 (décision d'adéquation), pour les entreprises certifiées
- Des **clauses contractuelles types (CCT)** adoptées par la Commission européenne, conformément à l'article 46.2.c du RGPD
- Des **mesures techniques complémentaires** (chiffrement des données en transit et au repos, pseudonymisation lorsque c'est possible)

Aurentia Agency vérifie régulièrement que ses sous-traitants maintiennent un niveau de protection adéquat des données personnelles.

---

### Article 10 — Sécurité des données

Aurentia Agency met en œuvre les mesures techniques et organisationnelles appropriées pour protéger les données personnelles contre la destruction accidentelle ou illicite, la perte, l'altération, la diffusion ou l'accès non autorisé, notamment :

- Chiffrement des communications (HTTPS / TLS)
- Contrôle d'accès strict aux données
- Sauvegardes régulières
- Mises à jour de sécurité
- Sensibilisation de l'équipe aux bonnes pratiques de protection des données

---

### Article 11 — Modification de la politique

Aurentia Agency se réserve le droit de modifier la présente politique de confidentialité à tout moment. Toute modification substantielle sera signalée sur le site. La date de dernière mise à jour est indiquée en haut de cette page.

Nous vous invitons à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.

---

### Article 12 — Contact

Pour toute question relative à la présente politique de confidentialité ou à l'exercice de vos droits, vous pouvez contacter :

**Aurentia Agency**
Email : contact@aurentia.agency
Adresse : [À COMPLÉTER — adresse postale]

DPO : [À COMPLÉTER — nom et coordonnées]

---

*Politique de confidentialité conforme au Règlement (UE) 2016/679 (RGPD) et à la loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.*

*Dernière mise à jour : mars 2026*

---
---

# SPÉCIFICATIONS TECHNIQUES (communes aux 3 pages)

## Composants React

| Composant | Fichier | Description |
|-----------|---------|-------------|
| `LegalPageLayout` | `src/components/legal/LegalPageLayout.tsx` | Layout wrapper : H1, date de mise à jour, table des matières, contenu. Reçoit `title`, `lastUpdated`, `toc: TocItem[]`, `children`. |
| `LegalSection` | `src/components/legal/LegalSection.tsx` | Section avec id (ancre), titre H2, children. Gère le fade-in au scroll. |
| `LegalToc` | `src/components/legal/LegalToc.tsx` | Table des matières. Desktop : sidebar sticky `top-24 left-0` dans une grid. Mobile : bloc inline replié (accordéon disclosure). Highlight actif via IntersectionObserver, transition couleur 500ms. |

### Pages routes

| Route | Fichier |
|-------|---------|
| `/cgv` | `src/app/cgv/page.tsx` |
| `/mentions-legales` | `src/app/mentions-legales/page.tsx` |
| `/politique-confidentialite` | `src/app/politique-confidentialite/page.tsx` |

Chaque page exporte ses `metadata` Next.js (title, description, openGraph) et le JSON-LD BreadcrumbList en script structuré.

### Structure de la page type

```tsx
<Navbar />
<main className="min-h-screen bg-background">
  <LegalPageLayout
    title="Conditions Générales de Vente"
    lastUpdated="Mars 2026"
    toc={[
      { id: "objet", label: "Objet et champ d'application" },
      // ...
    ]}
  >
    <LegalSection id="objet" title="Article 1 — Objet et champ d'application">
      <p>...</p>
    </LegalSection>
    {/* ... */}
  </LegalPageLayout>
</main>
<Footer />
<ScrollToTop />
```

## Layout détaillé

- **Desktop (1280px+)** : Grid 2 colonnes — sidebar ToC (w-64, sticky top-24) + contenu principal (max-w-3xl)
- **Tablet (768px)** : ToC inline en haut (ouverte), contenu full-width, `px-8`
- **Mobile (375px)** : ToC inline repliée (disclosure/accordéon), contenu full-width, `px-6`
- Fond : `bg-background`
- Texte : `text-foreground`, liens en `text-foreground/70 hover:text-foreground transition-colors duration-500`
- Titres H2 : `text-xl md:text-2xl font-heading font-bold text-foreground`
- Corps : `text-base md:text-lg text-foreground/80 leading-relaxed`
- Tableaux : `border-foreground/10`, header `bg-foreground/5`, cellules `text-sm md:text-base`
- Listes : `list-disc pl-6`, `marker:text-foreground/30`

## Animations

- Page entry : wrapper avec Framer Motion `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.7, ease: "easeInOut" }}`
- Chaque `LegalSection` : `whileInView={{ opacity: 1, y: 0 }}`, `initial={{ opacity: 0, y: 10 }}`, `transition={{ duration: 0.5 }}`, `viewport={{ once: true }}`
- ToC highlight : `transition-colors duration-500`
- Aucune animation complexe (pas de GSAP, pas de TextReveal, pas de parallax)

## Tokens sémantiques (rappel)

- `text-foreground` / `text-foreground/80` / `text-foreground/50`
- `bg-background`
- `border-foreground/10`
- `bg-foreground/5` (fond de tableau header)
- Jamais de `text-white`, `bg-white`, `bg-[#...]` hardcodé

## SEO

- `robots: "noindex, follow"` sur les 3 pages (recommandé — ces pages n'apportent pas de valeur SEO mais les liens internes restent crawlables)
- JSON-LD `BreadcrumbList` sur chaque page
- Liens croisés entre les 3 pages dans le contenu (ex. CGV renvoie vers politique de confidentialité)
- Liens dans le footer du site vers les 3 pages légales

## Checklist

```
[ ] 3 pages : /cgv, /mentions-legales, /politique-confidentialite
[ ] Layout partagé LegalPageLayout avec ToC
[ ] Table des matières avec ancres fonctionnelles
[ ] ToC sidebar sticky desktop, accordéon mobile
[ ] Highlight ToC item actif (IntersectionObserver)
[ ] Fade-in page entry (700ms)
[ ] Fade-in sections au scroll (500ms)
[ ] Minimum text-sm partout
[ ] Tokens sémantiques dark/light uniquement
[ ] Mobile-first responsive (375px → 768px → 1280px)
[ ] noindex, follow
[ ] JSON-LD BreadcrumbList
[ ] Metadata Next.js (title, description, openGraph)
[ ] Contenu juridique conforme droit français
[ ] Placeholders [À COMPLÉTER] pour infos manquantes
[ ] Liens croisés entre pages légales
[ ] Dernière mise à jour : mars 2026
```
