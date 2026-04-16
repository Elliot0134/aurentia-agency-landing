# V2 Chatbot Widget — Design Doc

**Date:** 2026-04-15
**Branch:** `feat/v2-redesign-phase1`

## Goal

Transplant the savistas chatbot widget (`landing savistas` project) into the `/v2` section of `aurentia-agency-landing`. Preserve identical animations, positioning and opening behavior. Adapt styling to `/v2`'s semantic-token design system (light/dark aware) and adapt content to Aurentia (agence web à Avignon).

## Non-goals

- No chatbot outside `/v2` routes (the v1 landing at `/` does not get the chatbot).
- No translation / i18n: French-only, like savistas.
- No persistence: chat history is in-memory, lost on reload.
- No Calendly integration (deferred — CTAs scroll to `#contact`).

## Architecture

### New files

| File | Role |
|------|------|
| `src/components/v2/chatbot/ChatbotWidget.tsx` | Main client component — trigger, panel, messages, input, qualification, CTAs |
| `src/app/api/chat/route.ts` | POST streaming endpoint — OpenRouter + Gemini |

### Modified files

| File | Change |
|------|--------|
| `src/app/v2/layout.tsx` | Mount `<ChatbotWidget />` after `<FooterV2 />` |
| `src/components/shared/ScrollToTop.tsx` | Offset to `bottom-24 right-6` when pathname starts with `/v2` (stack above chatbot) |

### Dependencies to install

```bash
npm i @ai-sdk/react @ai-sdk/openai ai
```

Version targets (matching savistas, verified compatible with Next 15):
- `@ai-sdk/react`: `^3.0.118`
- `@ai-sdk/openai`: `^3.0.41`
- `ai`: `^6.0.116`

Already present: `framer-motion ^12.38.0`, `lucide-react ^0.577.0`, `next 15.5.14`, `react 19.2.4`.

### Environment

- `OPENROUTER_API_KEY` — confirmed present in `.env.local` per user.

## Backend — `/api/chat`

POST endpoint that streams AI replies. Direct copy of savistas route with Aurentia system prompt.

### Request

```ts
{
  messages: UIMessage[],        // from @ai-sdk/react (via DefaultChatTransport)
  audience: "web" | "ecommerce" | "autre" | null
}
```

### Response

Streamed UI message stream via `result.toUIMessageStreamResponse()`.

### Model

`google/gemini-2.5-flash` via OpenRouter (`baseURL: https://openrouter.ai/api/v1`). `maxOutputTokens: 300`.

### System prompt (Aurentia)

Content:
- Persona: assistante virtuelle Aurentia (agence web à Avignon).
- Équipe : Elliot Estrade (fondateur), Matthieu, Fabien, Olivier. ~20 ans de craft + IA.
- Livraison express : 48h sur les projets standards.
- Ton : pro mais direct, concis (2-4 phrases max), français uniquement.
- Refus hors-sujet : poliment redirige vers les services Aurentia.
- CTA markers injectés sur nouvelle ligne en fin de message quand pertinent :
  - `[CTA:CONTACT]` → ouvre un bouton "Prendre contact" qui scroll smooth vers `#contact`
  - `[CTA:APPEL]` → même comportement que `[CTA:CONTACT]` pour l'instant (scroll vers `#contact` ; changera vers Calendly plus tard)

### Audience context injection

Appended to system prompt based on `audience` field :

- `"web"` — Projet site vitrine / refonte. Pousse vers la prise de contact. Insiste sur le craft, la rapidité 48h, l'expérience premium, la performance SEO.
- `"ecommerce"` — Projet boutique en ligne. Pousse vers la prise de contact. Insiste sur la conversion, le design, l'intégration paiement, l'expérience shopping.
- `"autre"` — Besoin sur-mesure / conseil / intégration IA. Pousse vers la prise de contact pour un échange personnalisé. Insiste sur l'expertise IA et la capacité à sortir des sentiers battus.

## Component — `ChatbotWidget`

Direct port of `chatbot-widget.tsx` from savistas. Structural identity preserved. Changes :

### Removed
- `CalendlyModal` + `useCalendlyModal` — deferred. CTA handlers scroll to `#contact` instead.
- Image avatar `/img/welcome-modal.webp` (Maryse) — replaced by `Sparkles` icon from `lucide-react` in a circle.
- `usePathname` "home-only" scroll-gating — user chose "always visible" (option 2b). Widget always renders on `/v2`.

### Kept (identical)
- All framer-motion animations (durations, easings, transform origins).
- All structural JSX and logic flow (qualification, CTA parsing, auto-scroll, typing indicator, keyboard handler).
- `DefaultChatTransport` pattern with audience ref to avoid stale closures.
- `AnimatePresence` wrapping the panel and the toggle icon swap.

### Content adaptations

- `WELCOME_MESSAGE` = `"Bonjour ! Je suis l'assistante Aurentia. Pour mieux vous aider, dites-moi ce qui vous amène :"`
- `QUICK_REPLIES` :
  - `{ label: "J'ai un projet web", value: "web" }`
  - `{ label: "J'ai un projet e-commerce", value: "ecommerce" }`
  - `{ label: "Besoin d'échanger", value: "autre" }`
- Header title : `"Aurentia"` / subtitle : `"En ligne"` (both `text-sm`).
- Input placeholder pré-qualif : `"Choisissez une option ci-dessus"`.
- Input placeholder post-qualif : `"Posez votre question..."`.
- Proactive tooltip label : `"Besoin d'aide ? 💬"` (inchangé).

### CTA handling (simplified)

Both `[CTA:CONTACT]` and `[CTA:APPEL]` render the same button :

```tsx
<button onClick={handleCtaClick} className="...">
  Prendre contact
  <ArrowRight className="w-3.5 h-3.5" />
</button>
```

The `#contact` anchor only exists on `/v2` (HomeContactV2). Sub-pages (`/v2/agency`, `/v2/commercial`, etc.) do not have it. Handler behavior :

1. `setIsOpen(false)` — close the panel.
2. If on `/v2` and `document.getElementById("contact")` exists → call `lenis.scrollTo("#contact")` if Lenis is available (prefer Lenis for consistent smooth scroll), else fall back to `scrollIntoView({ behavior: "smooth" })`.
3. Otherwise → `router.push("/v2#contact")`. Next.js handles the anchor-on-nav.

## Animations (identiques savistas)

Preserved verbatim from source :

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Panel open | `scale 0.92→1`, `opacity 0→1` | 250ms | `[0.25, 0.1, 0.25, 1]` |
| Panel close | `scale 1→0.92`, `opacity 1→0` | 250ms | `[0.25, 0.1, 0.25, 1]` |
| Panel transform origin | `bottom right` | — | — |
| Panel size change | `transition-[width,height]` | 300ms | `ease-out` |
| Trigger hover | `scale 1.1` | framer default | — |
| Trigger tap | `scale 0.95` | framer default | — |
| Trigger icon swap | `rotate ±90°` (X) / `scale 0.5→1` (icon) | 200ms | `easeInOut` |
| Typing dots | `animate-bounce` stagger `0 / 0.2s / 0.4s` | CSS default | — |
| Widget show/hide | `opacity + translate-y` | 300ms (kept for consistency) | tailwind default |

**Note :** CLAUDE.md rule states "transitions min 500ms, ideally 700ms". User explicitly requested "mêmes animations" — savistas timings (200-250ms snappy feel for chat UX) override the general rule per his instruction.

## Positioning & z-index

- Chatbot container : `fixed bottom-6 right-6 z-50 flex flex-col items-end`
- Widget visibility : always visible on `/v2` routes (ignore the scrollY>30 check savistas uses).
- Size (mobile, default) : `w-[calc(100vw-48px)] h-[80vh]`
- Size (desktop, default) : `sm:w-[380px] sm:h-[520px]`
- Size (expanded, mobile) : `w-[calc(100vw-48px)] h-[calc(100vh-120px)]`
- Size (expanded, desktop) : `sm:w-[700px] sm:h-[80vh]`

### Stacking with ScrollToTop

`ScrollToTop.tsx` currently at `bottom-6 right-6 z-[9999]`. Add pathname check :

```tsx
import { usePathname } from "next/navigation";
// ...
const pathname = usePathname();
const isV2 = pathname?.startsWith("/v2") ?? false;
// className: ...cn("fixed right-6", isV2 ? "bottom-24" : "bottom-6")
```

When on `/v2` :
- Chatbot : `bottom-6 right-6` z-50
- ScrollToTop : `bottom-24 right-6` z-[9999] (stacks ~40px above chatbot when visible)

Outside `/v2` : ScrollToTop stays at `bottom-6 right-6` (no chatbot there).

## Tokens adaptation (light + dark aware)

Per project rules : no hardcoded colors, semantic tokens only, glassy subtle borders.

| Role | Savistas (hex) | Aurentia /v2 (token) |
|------|---------------|---------------------|
| Panel bg | `bg-white` | `bg-background` |
| Panel border | `border-border-light` | `border border-foreground/10` |
| Panel shadow | `shadow-2xl` | `shadow-2xl` (kept) |
| Header bg | `bg-primary` | `bg-foreground` |
| Header text | `text-white` | `text-background` |
| Header subtitle | `text-xs text-white/80` | `text-sm text-background/70` (bump from xs to sm per project rule) |
| Header icon buttons | `hover:bg-white/20` | `hover:bg-background/10` |
| Messages area bg | `bg-surface` | `bg-foreground/[0.02]` |
| User bubble bg | `bg-primary` | `bg-foreground` |
| User bubble text | `text-white` | `text-background` |
| User avatar bg | `bg-primary/10 text-primary` | `bg-foreground/10 text-foreground` |
| AI bubble bg | `bg-white border border-border-light` | `bg-background border border-foreground/10` |
| AI bubble text | `text-foreground` | `text-foreground` (same semantic, different resolved value) |
| AI avatar | `<Image>` Maryse | `Sparkles` icon on `bg-foreground text-background` circle |
| Input bg | `bg-surface` | `bg-foreground/5` |
| Input focus bg | `focus-visible:bg-white` | `focus-visible:bg-background` |
| Input border | `border-transparent` | `border border-foreground/10` |
| Send button bg | `bg-primary hover:bg-primary/90` | `bg-foreground hover:bg-foreground/90` |
| Send icon | `text-white` | `text-background` |
| Typing dots | `bg-muted-foreground/40` | `bg-foreground/40` |
| Quick reply button | `border-primary text-primary` | `border border-foreground/15 text-foreground hover:bg-foreground hover:text-background` |
| CTA button | `bg-primary text-white` | `bg-foreground text-background` |
| Trigger bg | `bg-white` | `bg-foreground` |
| Trigger border | `border-2 border-primary` | `border border-foreground/10` (more minimalist) |
| Trigger icon content | Image Maryse / X | `Sparkles` / `X` — color `text-background` |
| Trigger shadow | `shadow-xl shadow-primary/20` | `shadow-xl shadow-foreground/20` |
| Tooltip bg | `bg-white border border-border-light` | `bg-background border border-foreground/10` |

**Result :** chatbot auto-inverts in dark mode via the `[data-v2-root]` + `[data-theme="dark"]` token resolution.

## Text size compliance

Project rule : minimum `text-sm`. Savistas chatbot uses `text-xs` in two places (header subtitle, CTA icon). Bump both to `text-sm` in the v2 port.

## Mount strategy

`V2Layout` is a server component. `ChatbotWidget` is a client component. Import + render directly — Next 15 handles the boundary.

```tsx
// src/app/v2/layout.tsx
import { ChatbotWidget } from "@/components/v2/chatbot/ChatbotWidget";
// ...
return (
  <div data-v2-root>
    <NavbarV2 />
    <main>{children}</main>
    <FooterV2 />
    <ChatbotWidget />
  </div>
);
```

## Error handling

- No explicit error UI : `useChat` hook from `@ai-sdk/react` surfaces errors in its `status`. If the stream fails, typing dots stop and no message appears. For V1 this is acceptable (same as savistas).
- OpenRouter key missing → 500 from route. User sees typing dots forever then nothing. Acceptable for V1.
- Network offline → same behavior.

Future enhancement (not in scope) : toast or inline error message on failure.

## Testing plan

1. **Visual** : on `/v2`, chatbot visible bottom-right. Click → panel opens with scale-from-bottom-right anim. Click X → closes.
2. **Qualification** : click "J'ai un projet web" → user message appears, AI streams response, input unlocks.
3. **CTA** : after qualification, ask "comment vous contacter ?" or similar → AI should respond with `[CTA:CONTACT]` marker → button "Prendre contact" renders → click → panel closes + smooth scroll to `#contact`.
4. **Expand** : click maximize → panel grows to 700×80vh. Click minimize → back to 380×520.
5. **Mobile** (viewport 375px) : panel takes full width minus 48px margins. Input not covered by keyboard.
6. **Dark theme** : toggle theme → chatbot auto-adapts via semantic tokens.
7. **ScrollToTop coexistence** : scroll past one viewport → both buttons visible, ScrollToTop at `bottom-24`, chatbot at `bottom-6`, no overlap.
8. **Other /v2 pages** (`/v2/agency`, `/v2/commercial`, etc.) : chatbot visible on all.
9. **Non-v2 routes** (`/`) : chatbot NOT visible (layout scoped to `/v2`).

## Risks & open questions

- **Next 15 vs Next 16** : savistas on Next 16, aurentia on Next 15. `@ai-sdk/react` v3 and `ai` v6 support Next 15.5+. If install fails, fallback to latest v3-compatible versions.
- **Bundle size** : `@ai-sdk/react` + `ai` adds ~50-80 KB gzipped. Acceptable.
- **Lenis compat** : scroll area uses `data-lenis-prevent` attribute to prevent Lenis hijacking inner scroll. Already compatible (aurentia uses Lenis via `LenisProvider`).
- **Text streaming perceived latency** : Gemini 2.5 Flash typically starts streaming in ~500ms. Typing dots cover the gap.

## Out of scope (follow-ups)

- Calendly modal integration (deferred).
- Proactive tooltip timing tuning (currently 10s show / 5s hide — same as savistas).
- Conversation persistence across reloads.
- Analytics events (open/close, message sent, CTA click).
- Rate limiting on `/api/chat`.
- i18n.
