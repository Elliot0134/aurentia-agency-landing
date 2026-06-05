# GEO Analysis — /audit (aurentia.agency)

Date : 2026-06-05 · Page : https://www.aurentia.agency/audit

## GEO Readiness Score : ~74/100 (après correctifs on-page)

| Critère (poids) | Score | Note |
|---|---|---|
| Citability (25%) | 16/25 | FAQ citables ✓, mais pas de bloc définition « X, c'est… », stats non sourcées |
| Structural readability (20%) | 18/20 | H1 question ✓, H2/H3 propres, listes, FAQ ✓ |
| Multi-modal (15%) | 10/15 | Radar + carrousel PDF, pas de vidéo, charts sans données alt |
| Authority & brand (20%) | 12/20 | Org SSR ✓, mais pas d'auteur/dates sur la page ; mentions off-page faibles |
| Technical accessibility (20%) | 18/20 | SSR ✓, crawlers IA allow ✓, llms.txt ✓, schema Service+Offer+FAQ ✓ |

## Plateformes

- **Google AI Overviews** : bon socle (SSR + FAQ + schema). Dépend du ranking organique.
- **ChatGPT / Perplexity** : structure OK, mais ces plateformes citent surtout Wikipedia/Reddit → levier = mentions de marque off-page, pas la page elle-même.

## Forces (déjà en place)

- SSR complet (le contenu est dans le HTML serveur — les crawlers IA n'exécutent pas le JS).
- robots.txt autorise GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot.
- FAQ structurée (7 Q/R) + question-based H1.

## Correctifs appliqués (cette session)

1. `/audit` ajouté au **sitemap.xml** (priorité 0.9) — était absent.
2. `/audit` ajouté à **llms.txt** + section dédiée « Audit de site web ».
3. Schema enrichi : **Service + Offer (99 € EUR) + BreadcrumbList**, en plus de FAQPage.

## Top 5 améliorations restantes (par impact)

1. **Mentions de marque off-page** (levier #1 pour ChatGPT/Perplexity, corrèle 3× plus que les backlinks) : présence Reddit, YouTube, LinkedIn parlant d'« audit de site web Aurentia ». Stratégique, hors page.
2. **Bloc définition citable** en début de page : « Un audit de site web, c'est… » en 40-60 mots, self-contained (capte les requêtes informationnelles IA).
3. **Sourcer les stats** (90 %+, <0,2 %, manque à gagner) avec attribution → les IA préfèrent les chiffres sourcés.
4. **E-E-A-T sur la page** : byline auteur (Elliot/équipe) + date de mise à jour + lien vers la méthode/skill d'audit.
5. **OG image dédiée /audit** (actuellement OG par défaut du site).

## Hors scope page (mais à noter)

- Aucune présence Wikipedia/Wikidata pour la marque → plafonne la citabilité ChatGPT.
- Pas de vidéo (YouTube = signal le plus corrélé ~0.737 aux citations IA).
