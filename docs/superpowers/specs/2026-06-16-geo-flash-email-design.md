# Section GEO dans le mail Flash — design

> 2026-06-16. Ajouter au pré-audit Flash (cold) un encart sur la visibilité du
> site auprès des moteurs IA (GEO/AEO), comme le Pro l'a déjà via `checkAiReadiness`.

## Contexte

- `checkAiReadiness` (`src/lib/audit/ai-readiness.ts`) produit 8-9 mesures GEO
  vérifiables (llms.txt, accès crawlers IA dans robots.txt, richesse schema,
  sameAs, FAQ schema, titres en question, citabilité, mentions externes via Exa).
- Il ne dépend **pas** du crawl multi-pages : homepage seule (`$`, robots.txt,
  brand, Exa). Coût : 1 recherche Exa + 2 fetch (llms.txt, robots.txt) par lead.
- Aujourd'hui il est enfermé dans `if (tier === 'pro')` de `collectAudit`
  (`src/lib/audit/collect.ts`). Le Flash n'a donc aucune donnée GEO.
- Le mail Flash (`src/lib/audit/render/email-flash.ts`) est construit à partir des
  mesures (jamais du texte LLM pour les chiffres). Pattern existant : tableau perf
  vs concurrents, bloc annotations.
- Règle projet (rappel `contract.ts:7`) : parler de la visibilité GEO du prospect
  est légitime ; révéler que l'audit est produit par une IA est interdit. Ce design
  ne touche aucune surface LLM, donc aucun risque côté contrat de véracité.

## Décisions

1. **GEO en Flash ET Pro.** Extraire le fetch robots.txt + `checkAiReadiness` du
   bloc pro-only vers une étape partagée qui tourne pour les deux tiers. Crawl,
   a11y, local SEO restent pro-only.
2. **GEO compte dans le score Flash.** Les mesures GEO entrent dans
   l'agrégation du score (décalage assumé des scores Flash existants : un défaut
   GEO réel doit peser). Pas de traitement hors-score.
3. **Bloc mail piloté par les mesures, déterministe, zéro LLM.** Un helper
   `buildGeoBlock(audit)` sélectionne les mesures `module === 'ai-readiness'`,
   garde les 2-3 plus parlantes (priorité `fail` puis `warn`), rend un encart
   court : titre "Visibilité sur les moteurs IA (ChatGPT, Perplexity)", une phrase
   fixe d'intro, 2-3 puces factuelles tirées des `label`/`status` des mesures.

## Hors scope (non négociable)

- Pas de claim "vous n'apparaissez pas dans ChatGPT" : non mesuré.
- Pas de ligne GEO dans le tableau concurrents : la donnée GEO concurrents n'existe pas.
- Pas de nouvelle surface LLM.

## Composants touchés

| Fichier | Changement |
|---|---|
| `src/lib/audit/collect.ts` | Sortir robots.txt + `checkAiReadiness` du bloc pro → étape partagée flash+pro. |
| `src/lib/audit/render/email-flash.ts` | Helper `buildGeoBlock(audit)` + insertion dans `buildFlashEmailHtml`. |
| Tests | `collect.test.ts` : GEO présent en flash. `email-flash.test.ts` : bloc rendu / masqué selon mesures. |

## Cas limites

- **Donnée GEO absente** (Exa down, fetch échoue) : `checkAiReadiness` dégrade déjà
  ses mesures ; si aucune mesure `fail`/`warn` exploitable → bloc masqué, pas de
  fausse alerte.
- **Tout au vert** : bloc masqué (rien à reprocher, pas de remplissage).
- **Cohérence Pro** : le Pro continue d'utiliser les mêmes mesures, aucun double
  appel (l'étape partagée tourne une fois).

## Vérification

- `npm run test` vert (dont collect + email-flash).
- Mail Flash de contrôle : grep absence de tiret long, absence du lexique
  d'auto-attribution IA (`IA_LEXICON`), valeurs du bloc = valeurs des mesures.
