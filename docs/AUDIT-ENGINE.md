# Moteur d'audit — contrat d'interface

> Document de référence pour les intégrateurs (n8n, Stripe, Vercel Workflow).  
> Source de vérité : le code dans `src/app/api/audit/`, `src/workflows/`, `supabase/migrations/`.

---

## 1. Vue d'ensemble

Le moteur d'audit produit deux livrables :

- **Flash** (gratuit) : email HTML diagnostiquant les principaux défauts du site (Lighthouse, capture annotée, concurrents). Canal `inbound` → envoi direct par Resend. Canal `cold` → brouillon stocké dans la DB, n8n dépose en draft Gmail.
- **Pro** (99 EUR HT) : rapport PDF complet (crawl multi-pages, a11y, AI Readiness, constats visuels, rédaction LLM sous contrat) stocké dans le bucket privé Supabase, avec gate humain de relecture avant envoi.

**Où tourne le code.** Vercel Workflow (WDK — directive `'use workflow'`) : les workflows sont durables, chaque step est retryé 3 fois automatiquement. `FatalError` = pas de retry. Les jobs sont persistés dans la table Supabase `audit_jobs` (source de vérité du statut).

**Qui appelle quoi.**

| Appelant | Endpoint / mécanisme |
|---|---|
| Formulaire site (inbound) | `POST /api/audit/jobs` via backend |
| Stripe (paiement Pro) | `POST /api/stripe/webhook` |
| n8n (cold Flash) | `POST /api/audit/jobs` + polling `GET /api/audit/jobs?id=` |
| Elliot (relecture Pro) | `/audit/review/<jobId>?token=<hmac>` + `POST /api/audit/review/<jobId>/send` |

---

## 2. Cycle de vie d'un job

```
POST /api/audit/jobs
        |
        v
    [queued]  ← créé en DB, workflow enqueué
        |
        | moteur démarre
        v
    [running]
        |
        |--- Flash inbound ──→ sendResend ──→ [delivered]
        |
        |--- Flash cold ─────→ saveDraft ──→ [ready_to_send]
        |                                        |
        |                                        | n8n lit subject+html,
        |                                        | dépose draft Gmail,
        |                                        | marque delivered (Supabase direct)
        |                                        v
        |                                   [delivered]
        |
        |--- Pro ────────────→ runPro + PDF → [ready_for_review]
        |                                        |
        |                                        | Slack notifie Elliot
        |                                        | /audit/review/<jobId>?token=
        |                                        | Elliot relecte le PDF
        |                                        | POST /api/audit/review/<jobId>/send
        |                                        v
        |                                   [delivered]
        |
        |--- Echec definitif (retries epuises ou FatalError)
                |
                |--- Pro avec stripe_session_id ──→ refund auto Stripe ──→ [refunded]
                |
                └──→ [failed]  (+ escalade Slack dans tous les cas)
```

**Qui fait quelle transition.**

| Transition | Acteur |
|---|---|
| `queued` → `running` | Moteur (step `markRunning`) |
| `running` → `ready_to_send` | Moteur (step `saveDraft`, Flash cold) |
| `running` → `delivered` | Moteur (step `markDelivered`, Flash inbound) |
| `running` → `ready_for_review` | Moteur (step `markReadyForReview`, Pro) |
| `ready_for_review` → `delivered` | Moteur (via `POST /api/audit/review/<jobId>/send`, déclenché par Elliot) |
| `ready_to_send` → `delivered` | **n8n** (écriture directe Supabase `status='delivered'` après envoi Gmail réussi — voir section 4) |
| `running` → `failed` | Moteur (catch workflow, step `handleFlashFailure` / `handleProFailure`) |
| `running` → `refunded` | Moteur (catch Pro, refund Stripe auto réussi) |

---

## 3. Endpoints

### 3.1 `POST /api/audit/jobs` — créer un job

**Auth** : header `x-audit-secret: <AUDIT_JOBS_SECRET>`. Si la variable d'env est absente, l'endpoint renvoie systématiquement 401 (jamais ouvert par oubli de config).

**Body JSON**

```json
{
  "url": "https://example.com",
  "email": "prospect@example.com",
  "tier": "flash",
  "channel": "cold"
}
```

| Champ | Type | Requis | Valeurs |
|---|---|---|---|
| `url` | string | oui | URL publique, http(s), IP privées rejetées (anti-SSRF) |
| `email` | string (email) | oui | |
| `tier` | enum | oui | `flash` \| `pro` |
| `channel` | enum | non | `inbound` (défaut) \| `cold` |

**Réponses**

| Code | Corps | Signification |
|---|---|---|
| 202 | `{"jobId": "<uuid>"}` | Job créé, workflow enqueué |
| 400 | `{"error": "invalid_body", "details": [...]}` | Validation Zod échouée |
| 400 | `{"error": "unsafe_url", "message": "..."}` | URL privée ou invalide |
| 401 | `{"error": "unauthorized"}` | Secret absent ou incorrect |
| 500 | `{"error": "server_error"}` | Erreur interne |

**Exemple curl**

```bash
curl -X POST https://www.aurentia.agency/api/audit/jobs \
  -H "Content-Type: application/json" \
  -H "x-audit-secret: $AUDIT_JOBS_SECRET" \
  -d '{"url":"https://example.com","email":"contact@example.com","tier":"flash","channel":"cold"}'
# → {"jobId":"550e8400-e29b-41d4-a716-446655440000"}
```

---

### 3.2 `GET /api/audit/jobs?id=<jobId>` — consulter un job

**Auth** : même header `x-audit-secret`.

**Réponses**

| Code | Corps | Signification |
|---|---|---|
| 200 | objet `AuditJob` complet | Job trouvé |
| 400 | `{"error": "missing_id"}` | Paramètre `id` absent |
| 401 | `{"error": "unauthorized"}` | |
| 404 | `{"error": "not_found"}` | |

**Champs utiles pour n8n** (voir section 4)

| Champ | Type | Présent quand |
|---|---|---|
| `status` | string | toujours |
| `subject` | string \| null | `ready_to_send` |
| `html` | string \| null | `ready_to_send` |
| `score` | int \| null | après `running` |
| `impactPercent` | int \| null | après `running` |
| `email` | string | toujours |
| `url` | string | toujours |

**Exemple curl**

```bash
curl "https://www.aurentia.agency/api/audit/jobs?id=550e8400-e29b-41d4-a716-446655440000" \
  -H "x-audit-secret: $AUDIT_JOBS_SECRET"
```

---

### 3.3 `POST /api/stripe/webhook` — webhook Stripe

**Auth** : signature Stripe (header `stripe-signature` + `STRIPE_WEBHOOK_SECRET`). Endpoint fermé si l'une des deux variables est absente.

**Event traité** : `checkout.session.completed` (Payment Link du Pro 99 EUR HT).

**Comportements**

| Situation | Résultat |
|---|---|
| Event déjà traité (`stripe_session_id` connu) | 200, rien refait (idempotence) |
| Email absent dans la session | Job non créé, alerte Slack, 200 |
| Email connu, URL récupérable depuis le dernier job | Job `pro` créé + workflow lancé |
| Email connu, aucune URL connue | Job créé (url vide, statut `queued`), workflow NON lancé, alerte Slack |
| Erreur interne | 500 → Stripe retentera la livraison |

L'URL auditée n'est pas transmise par le Payment Link : elle est récupérée depuis `findLatestJobByEmail`. Si impossible, un humain (alerte Slack) complète l'URL et relance le workflow manuellement.

---

### 3.4 `POST /api/audit/review/[jobId]/send` — livrer l'audit Pro

**Auth** : token HMAC dans le body (`token=<hmac>` form-encoded ou `{"token":"<hmac>"}` JSON). Signé avec `AUDIT_REVIEW_SECRET`.

**Précondition** : `status === 'ready_for_review'` et `pdfPath` renseigné.

**Ce que fait l'endpoint** : télécharge le PDF depuis le bucket privé `audit-pdfs`, envoie au client via Resend avec le PDF en pièce jointe, passe le job en `delivered`.

**Idempotence** : si `status === 'delivered'`, répond 409 `already_sent` sans rien refaire.

**En cas d'échec Resend** : répond 502, le statut reste `ready_for_review` (Elliot peut recliquer depuis la page review).

---

## 4. Contrat n8n

### Créer un job Flash cold

```
POST /api/audit/jobs
Header: x-audit-secret: <secret>
Body: { "url": "<url>", "email": "<email>", "tier": "flash", "channel": "cold" }
→ 202 { "jobId": "<uuid>" }
```

Stocker le `jobId` pour le polling.

### Poller jusqu'à ready_to_send

```
GET /api/audit/jobs?id=<jobId>
Header: x-audit-secret: <secret>
```

Répéter toutes les 30-60 s. Arrêter quand `status` vaut `ready_to_send`, `delivered`, `failed` ou `refunded`.

**Intervalles recommandés** : Flash ~2-4 min, Pro ~8-15 min. Un statut `running` depuis plus de 30 min signale un blocage à investiguer.

### Récupérer le brouillon Gmail

Quand `status === 'ready_to_send'`, lire directement dans la réponse :

```json
{
  "subject": "Votre site example.com perd des clients...",
  "html": "<!doctype html>..."
}
```

Passer ces deux champs au nœud n8n de création de draft Gmail (webhook Aurentia — voir `docs/superpowers/ids.md`).

### Marquer delivered après envoi Gmail

Il n'existe pas d'endpoint dédié pour passer `ready_to_send → delivered`. **n8n écrit directement dans Supabase** (service role) :

```sql
UPDATE audit_jobs
SET status = 'delivered', updated_at = now()
WHERE id = '<jobId>' AND status = 'ready_to_send';
```

Ou via le client Supabase JS :

```js
await supabase
  .from('audit_jobs')
  .update({ status: 'delivered' })
  .eq('id', jobId)
  .eq('status', 'ready_to_send'); // guard idempotence
```

Supabase est la source de vérité des statuts. La clause `.eq('status', 'ready_to_send')` garantit qu'une double exécution n8n ne réécrase pas un statut ultérieur.

### Ce que n8n ne doit jamais faire

- **Envoyer un Flash cold directement** : le mail part uniquement depuis la boîte Gmail d'Elliot, en brouillon puis envoi manuel. Jamais d'envoi automatique sur un job `cold`.
- **Déclencher un job dont `status !== 'ready_to_send'`** : poller jusqu'au bon statut, ne pas envoyer sur `running` ou `queued`.
- **Modifier d'autres colonnes** que `status` lors de la transition `delivered` : le moteur est propriétaire du reste.
- **Appeler `POST /api/audit/review/<jobId>/send`** : cet endpoint est réservé au gate humain Pro (Elliot depuis Slack).
- **Créer des jobs Pro** : les jobs Pro naissent exclusivement du webhook Stripe ou d'une création manuelle via `/api/audit/jobs`.

---

## 5. Variables d'environnement

| Variable | Consommée par | Rôle |
|---|---|---|
| `AUDIT_JOBS_SECRET` | `/api/audit/jobs` | Secret du header `x-audit-secret`. Absent = endpoint fermé. |
| `AUDIT_REVIEW_SECRET` | `/api/audit/review/[jobId]/send`, page review | Signe les tokens HMAC des liens de review. Absent = endpoint fermé. |
| `STRIPE_SECRET_KEY` | `/api/stripe/webhook`, step `handleProFailure` | Vérification de session + refund auto Pro. |
| `STRIPE_WEBHOOK_SECRET` | `/api/stripe/webhook` | Vérifie la signature des events Stripe. |
| `RESEND_API_KEY` | Step `sendResend`, `/api/audit/review/.../send` | Envoi des mails Flash inbound et livraison Pro. |
| `AUDIT_FROM_EMAIL` | Step `sendResend`, livraison Pro | Adresse expéditeur (ex. `audit@aurentia.fr`). |
| `AUDIT_REPLY_TO` | Step `sendResend`, livraison Pro | Reply-to (défaut : `contact@aurentia.fr`). |
| `SLACK_AUDIT_WEBHOOK_URL` | Steps `handleFlashFailure`, `handleProFailure`, webhook Stripe | Alertes escalade. Absent = log console uniquement. |
| `NEXT_PUBLIC_SITE_URL` | Step `buildReviewMessage` | Base des liens de review postés sur Slack. |
| `PSI_API_KEY` | Step `runFlash`, `runPro` | Google PageSpeed Insights. |
| `BROWSERLESS_TOKEN` | Step `runFlash`, `runPro` | Captures Playwright via Browserless. |
| `BROWSERLESS_URL` | Step `runFlash`, `runPro` | Défaut : `https://production-sfo.browserless.io`. |
| `EXA_API_KEY` | Step `runFlash`, `runPro` | Recherche de concurrents (Exa). |
| `OPENROUTER_API_KEY` | Rendu LLM (Flash + Pro) | Modèle rédacteur via OpenRouter. |
| `OPENROUTER_MODEL` | Rendu LLM | Ex. `google/gemini-3.5-flash`. |
| `NEXT_PUBLIC_SUPABASE_URL` | Client Supabase admin | URL du projet Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Client Supabase admin | Clé service-role (jamais exposée côté client). |
| `PROSPECTION_API_SECRET` | Routes `/api/prospection/*` | Secret du header `x-webhook-token` (auth M2M n8n). Absent = endpoints fermés (503). |

---

## 6. Storage

Bucket Supabase : **`audit-pdfs`** (privé, RLS sans policy anon — accès service-role uniquement).

| Chemin | Contenu | Produit par |
|---|---|---|
| `pro/<jobId>/audit.pdf` | PDF audit Pro | Step `runPro` (via `runProAudit`) |

Les captures Flash (screenshots annotés) sont intégrées dans le HTML du mail, pas stockées dans le bucket.

**URLs signées** : générées à la demande par la page de review (`/audit/review/[jobId]`) avec un TTL de 3600 s (1h). Aucune URL publique permanente n'est créée.

---

## 7. Limites connues

- **Browserless free tier mono-session** : une seule session Playwright à la fois. Côté n8n, espacer les créations de jobs cold — pas de rafale simultanée. Recommandation : 1 job toutes les 3-5 min minimum.
- **PSI variable** : les sites lourds ou protégés (o2switch/Tiger Protect, HTTP 429 sur bots) donnent des scores Lighthouse instables. Le moteur retente automatiquement (WDK), mais un score bas peut être un artefact.
- **Coût indicatif** : Flash ~0,05-0,07 EUR (PSI + Browserless + LLM). Pro ~0,12-0,20 EUR (collecte multi-pages + PDF + LLM Pro).
- **URL manquante après paiement Stripe** : si le client paie sans avoir soumis de Flash au préalable, le job Pro est créé sans URL, le workflow n'est pas lancé, et une alerte Slack demande intervention manuelle.
- **Lead cold = `nouveau` jusqu'à /touches/confirm** : relancer `/api/prospection/intake/run` avant la confirmation d'envoi recrée un job Flash pour le même lead (pas de garde anti-doublon côté intake). En production, n8n doit confirmer (ou marquer le lead) avant le run d'intake suivant.

---

## 8. Smoke E2E 2026-06-12

Smoke test réel exécuté en local (`pnpm dev`, port 3002, workflows WDK exécutés par le runtime dev) contre les vraies APIs (PSI, Browserless, Exa, OpenRouter/Gemini, Resend, Supabase). Tout vert.

| Scénario | Résultat | Durée |
|---|---|---|
| Flash inbound (`aurentia.agency`) | `delivered`, score 76, mail Resend parti | ~3 min 45 |
| Pro inbound (`aurentia.agency`) | `ready_for_review` (pdf_path + review_token + Slack) puis `delivered` via `POST /review/<jobId>/send` (PDF joint) | ~6 min 15 + envoi |
| Flash cold via `/api/prospection/intake/run` | `ready_to_send`, subject + html (15,8 ko, captures score + page présentes), zéro tiret long | ~4 min |
| Kill switch `sequences_paused` | intake → `{started: [], paused: true}` | — |
| `/touches/confirm` | lead → `flash_envoye`, rejeu idempotent (pas de 2e touche) | — |
| `/replies/classify` (Gemini réel) | `interesse` (confiance 0.98) → `a_appeler` + Slack, rejeu idempotent | ~2 s |
| `/events/resend` (`email.bounced`) | `bounce=true`, statut `perdu` | — |
| `/leads/changed?since=` | 200, `{leads, serverTime}`, lead modifié présent | — |
| Auth | header absent → 401, mauvais token → 401 | — |

Notes : `html` est volontairement null en DB pour un Flash inbound `delivered` (le mail est parti, seul le cold persiste le brouillon). `impact_percent` peut être null sur un Flash (non bloquant). Coût estimé du smoke : ~0,25-0,30 EUR (2 Flash + 1 Pro + 1 classification LLM). Données de test purgées, `sequences_paused` remis à `true`.
