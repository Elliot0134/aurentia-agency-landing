import type { Prize } from "@/components/home/easterEggData";
import type { ShowcaseItem } from "@/components/home/SecretSlotMachine3D";

/* ─────────────────────────────────────────────
   Prizes — /v2/sites-web
   Mirrors the distribution of the root easterEggData: majority winning,
   two non-winning slots kept minimal as "Perdu".
   ───────────────────────────────────────────── */
export const PRIZES: Prize[] = [
  { label: "Audit SEO offert", desc: "Audit complet de ton site actuel", icon: "🔍", weight: 45, isLoss: false, color: "#c96442" },
  { label: "Perdu", desc: "Retente ta chance la prochaine fois", icon: "✕", weight: 10, isLoss: true, color: "#666" },
  { label: "Template Next.js", desc: "Boilerplate site vitrine production-ready", icon: "🎨", weight: 40, isLoss: false, color: "#9c87f5" },
  { label: "5% de réduction", desc: "Sur ton prochain projet Aurentia", icon: "💸", weight: 0, isLoss: false, color: "#e8b931" },
  { label: "30min conseils", desc: "Call stratégique avec Elliot", icon: "📞", weight: 0, isLoss: false, color: "#d97757" },
  { label: "Perdu", desc: "Retente ta chance la prochaine fois", icon: "✕", weight: 5, isLoss: true, color: "#555" },
];

export const SHOWCASE: ShowcaseItem[] = [
  { icon: "🔍", label: "Audit SEO offert", desc: "On passe ton site au crible — perf, SEO, conversion.", color: "#c96442" },
  { icon: "🎨", label: "Template Next.js + Tailwind", desc: "Boilerplate vitrine production-ready, à toi de jouer.", color: "#9c87f5" },
];

/* ─────────────────────────────────────────────
   Prize label → landing-page URL.
   `null` ⇒ fallback to email/contact flow.
   ───────────────────────────────────────────── */
export const PRIZE_URL_MAP: Record<string, string | null> = {
  "Audit SEO offert": null,
  "Template Next.js": null,
  "5% de réduction": null,
  "30min conseils": null,
  "Perdu": null,
};
