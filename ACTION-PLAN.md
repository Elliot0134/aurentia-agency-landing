# Plan d'action SEO — aurentia.agency

> Priorisé Critique → Bas. Effort : **S** (≤1h) / **M** (1-4h) / **L** (≥4h).

---

## CRITIQUE (faire cette semaine)

| # | Action | Fichier | Effort | Pourquoi |
|---|---|---|---|---|
| C1 | Ajouter `metadata` racine complet (`metadataBase`, title.template, default OG, Twitter, icons, robots) | `src/app/layout.tsx` | S | Sans ça, toutes les pages enfants héritent du néant et les chemins relatifs OG sont cassés |
| C2 | Supprimer `public/robots.txt` (conflit avec `robots.ts`) | `public/robots.txt` | S | `Disallow: /realisations` contredit le sitemap |
| C3 | Server-ifier `src/app/page.tsx` (homepage) + extraire GSAP dans `<HomeClient />` + exporter `metadata` + injecter JSON-LD Organization/WebSite/FAQPage | `src/app/page.tsx` (+ nouveau `src/components/v2/home/HomeClient.tsx`) | M | Page la plus importante du site, actuellement sans titre, sans OG, full client |
| C4 | Convertir/supprimer les PNG géants (icons 15Mo, portfolio 13Mo) en WebP/AVIF, mettre à jour les références | `public/images/icons/*.png`, `public/images/portfolio/*.png` | M | Impact direct LCP + crawl budget |
| C5 | Ajouter `images.formats: ["image/avif", "image/webp"]` et `deviceSizes` dans `next.config.ts` | `next.config.ts` | S | Active l'optim auto pour toutes les `next/image` |

## HAUTE (semaine 2)

| # | Action | Fichier | Effort | Pourquoi |
|---|---|---|---|---|
| H1 | Server-ifier les pages services (`sites-web`, `saas`, `saas/agences`, `solutions-ia/formation-ia`, `solutions-ia/implementation-ia`) + ajouter metadata + canonical + Service JSON-LD | 5 fichiers `page.tsx` | L | Pages commerciales sans aucun signal SEO |
| H2 | Déplacer le redirect `/agence → /a-propos` dans `next.config.ts` (permanent: true) et supprimer `src/app/agence/page.tsx` | `next.config.ts`, `src/app/agence/page.tsx` | S | 301 propre vs 307 runtime |
| H3 | Étendre `sitemap.ts` pour couvrir toutes les routes publiques (~22 URLs) | `src/app/sitemap.ts` | S | Le sitemap actuel ignore 90% du site |
| H4 | Ajouter `alternates.canonical` sur chaque metadata page | toutes les `page.tsx` avec metadata | S | Anti-duplication |
| H5 | Décider du sort des case studies projets archivés (HiLove, AlloRestau, Golf Mentor, Savistas, Friendiz, Monservicecourtier) — supprimer ou assumer | `src/data/realisations/`, `public/images/portfolio/` | M | Cohérence narrative + brand |
| H6 | Ajouter `LocalBusiness` JSON-LD (NAP Avignon + areaServed PACA + telephone) | `src/lib/seo/schema.ts` + injection homepage/contact | M | SERP locale Avignon/Vaucluse |
| H7 | Étendre `robots.ts` : expliciter GPTBot/ClaudeBot/PerplexityBot/Google-Extended | `src/app/robots.ts` | S | Signal AI search positif |
| H8 | `noindex` sur `/blog` tant qu'il affiche un ComingSoon | `src/app/blog/page.tsx` | S | Évite thin content |

## MOYENNE (semaine 3)

| # | Action | Fichier | Effort |
|---|---|---|---|
| M1 | Ajouter Twitter Card par page (héritée du root + customisation) | toutes les pages metadata | S |
| M2 | BreadcrumbList JSON-LD sur toutes les pages internes (>1 niveau) | helper + injection | M |
| M3 | FAQPage JSON-LD sur la home + pages avec FAQ | `HomeFAQV2`, autres | M |
| M4 | Service JSON-LD sur chaque page service (`/sites-web/*`, `/solutions-ia/*`, `/saas/*`) | nouveau helper `serviceSchema()` + injection | M |
| M5 | Audit alt textes — vérifier que les 5 `alt=""` sont bien décoratifs sinon les remplir | NavbarV2Mobile, MegaMenu, SitesWebHero | S |
| M6 | Bundle analyzer + audit Three.js (lazy load via `next/dynamic` sur composants 3D) | `next.config.ts`, composants Secret3D | M |
| M7 | Créer `public/llms.txt` (pitch + liens canoniques) | `public/llms.txt` | S |
| M8 | Standardiser les titles via `title.template` (retirer suffixes manuels "— Aurentia") | toutes les pages metadata | S |

## BASSE (semaine 4 et après)

| # | Action | Fichier | Effort |
|---|---|---|---|
| L1 | Headers de sécurité (`headers()` dans `next.config.ts` : HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) | `next.config.ts` | S |
| L2 | Auditer les 4 familles de fonts (Geist + Plus_Jakarta + JetBrains + Recoleta) — supprimer celles non utilisées | `src/app/layout.tsx` | S |
| L3 | Migrer les 2 `<img>` restants vers `next/image` | scan `src/` | S |
| L4 | Vérifier `sizes` sur toutes les `next/image` (responsive) | scan composants images | M |
| L5 | Schema Markup Validator + Google Rich Results test sur chaque type | externe | S |
| L6 | Mettre en place GSC + soumettre sitemap | externe | S |
| L7 | Ajouter `alternates.languages` (même si FR-only, signal `x-default`) | layout metadata | S |

---

## Roadmap 4 semaines

### Semaine 1 — Fondations (Critique)
- Lundi : C1, C2, C5 (root metadata, robots.txt purge, next.config images)
- Mardi-Mercredi : C3 (homepage server-ifiée + JSON-LD)
- Jeudi-Vendredi : C4 (purge + conversion images)
- **Objectif** : score 42 → 60. La homepage est crawlable proprement, les images ne plombent plus le LCP.

### Semaine 2 — Pages services (Haute)
- Lundi-Mardi : H1 (server-ifier les 5 pages services + Service JSON-LD)
- Mercredi : H2, H3 (redirect /agence + sitemap complet)
- Jeudi : H4, H7, H8 (canonicals, robots IA, blog noindex)
- Vendredi : H5, H6 (décision portfolio + LocalBusiness)
- **Objectif** : score 60 → 75. Toutes les pages commerciales sont indexables avec signaux propres.

### Semaine 3 — Schema + AI (Moyenne)
- Lundi-Mardi : M2, M3, M4 (Breadcrumb, FAQ, Service partout)
- Mercredi : M7, M8 (llms.txt + harmonisation titles)
- Jeudi : M5, M1 (alts + Twitter cards)
- Vendredi : M6 (bundle analyzer + 3D lazy)
- **Objectif** : score 75 → 85. Rich snippets éligibles, GEO-ready.

### Semaine 4 — Polish + monitoring (Basse)
- Lundi : L1, L2 (headers, fonts cleanup)
- Mardi : L3, L4 (img migration + sizes)
- Mercredi : L5, L6, L7 (validators + GSC + hreflang)
- Jeudi-Vendredi : monitoring CWV + premier rapport baseline
- **Objectif** : score 85 → 92+. Site SEO-ready pour campagnes acquisition.

---

## Indicateurs à tracker post-chantier

- Pages indexées dans GSC (cible : ≥ 25 sur 30)
- LCP mobile < 2.5s sur `/`, `/realisations`, `/sites-web`
- 0 erreur dans Rich Results Test sur la homepage
- `llms.txt` accessible et référencé par au moins 1 LLM (test ChatGPT/Perplexity sur "agence web Avignon IA")
- 0 page critique sans canonical/title/OG
