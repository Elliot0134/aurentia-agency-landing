# Spec — Page `/audit` (Audit de site web · lead magnet + 99 €)

Date : 2026-06-05 · Projet : aurentia-agency-landing

## Objectif

Page de conversion `/audit` qui (1) capte un max de leads via un **pré-audit gratuit**
(lead magnet pour la refonte de site avec l'agence) et (2) vend l'**audit complet à 99 €**.
Audit = SEO + site web, livré en PDF. Sert d'entrée de funnel vers les prestations site web.

Ne pas confondre avec `/solutions-ia/audit` (audit IA de business, process/roadmap 90j) — produit distinct.

## Décisions validées

- **Offre** : deux paliers — pré-audit GRATUIT (capture email) + audit complet 99 €.
- **Paiement 99 €** : `STRIPE_PAYMENT_LINK` en placeholder (constante à remplacer). Pas d'intégration Stripe backend.
- **Navbar** : nouveau groupe « Audit & SEO » dans le méga-menu « Nos expertises », entrée → `/audit`.
- **Leads** : `POST /api/audit` → webhook n8n dédié (`AUDIT_WEBHOOK`), même pattern que `api/ressources/request`.
- **Exemple PDF** : section dédiée, aperçu + bouton télécharger → `public/audit/exemple-audit-casa-pavoni.pdf` (Casa Pavoni, autorisé).
- **Hero cas réel** : anonymisé (restaurant générique), score 30/100, ≈ 1 500 €/mois.
- **Domaines** : 7 (SEO technique, Performance/CWV, UX/navigation, Copy & preuve, AI Readiness/GEO, Accessibilité, Local SEO).

## Visuel & contraintes (CLAUDE.md projet)

- Crème + corail, **tokens sémantiques uniquement** (`foreground`, `background`, `accent-primary`,
  `background-surface`) — parfait en light/dark. Pas de couleur hardcodée.
- Transitions ≥ 500ms, `ease-in-out`. Pas de `text-xs` (`text-sm` minimum).
- Composants v2 existants réutilisés : `SectionContainer`, `Card`, `FAQAccordion`, `RadialScoreRing`, `DualCTA`.

## Architecture fichiers

- `src/app/audit/page.tsx` — metadata SEO + `<AuditPage />`
- `src/app/api/audit/route.ts` — capture lead → webhook n8n
- `src/data/v2/audit.ts` — toute la copy typée + placeholders (`STRIPE_PAYMENT_LINK`, `AUDIT_WEBHOOK`)
- `src/components/v2/audit/`
  - `AuditPage.tsx` — assemble les sections (+ SubNav + ScrollToTop)
  - `AuditLeadForm.tsx` (client) — form URL+email, POST `/api/audit`, état succès inline
  - `AuditHero.tsx` — titre + form + carte score (RadialScoreRing)
  - `AuditProblems.tsx` — 3 fuites
  - `AuditDomains.tsx` — 7 domaines (AI Readiness mis en avant)
  - `AuditDeliverables.tsx` — livrables + mock barres par axe
  - `AuditReportExample.tsx` — preview PDF + download
  - `AuditAISection.tsx` — démo IA (ChatGPT/Perplexity)
  - `AuditSteps.tsx` — 3 étapes
  - `AuditPricing.tsx` — 2 paliers (gratuit / 99 €)
  - `AuditFinalCTA.tsx` — DualCTA vers pré-audit

## Sections (ordre)

Hero → Problème → 7 domaines → Livrables → Exemple de rapport (PDF) → Section IA →
Comment ça marche → Pricing 2 paliers → FAQ → CTA final.

## API

`POST /api/audit` body `{ site, email, source? }` → valide email → POST vers `AUDIT_WEBHOOK`
`{ site, email, source, date }`. Renvoie `{ ok: true }`. Si webhook = placeholder, ne POST pas mais renvoie ok (mode démo).

## Placeholders à remplacer par Elliot

1. `STRIPE_PAYMENT_LINK` dans `audit.ts`
2. `AUDIT_WEBHOOK` dans `api/audit/route.ts`
3. (optionnel) chiffres du cas réel hero

## Hors scope (itérations futures)

- Génération automatique du PDF d'audit (le placeholder Casa Pavoni tient le rôle).
- Intégration Stripe Checkout native.
- A/B testing des titres.
