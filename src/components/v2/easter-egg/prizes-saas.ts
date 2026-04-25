import type { Prize } from "./easterEggData";
import type { ShowcaseItem } from "./SecretSlotMachine3D";

/* ─────────────────────────────────────────────
   Prizes — /v2/saas
   Targeted at founders/tech leads looking to ship a SaaS fast.
   ───────────────────────────────────────────── */
export const PRIZES: Prize[] = [
  { label: "Audit architecture", desc: "Revue complète de ta codebase SaaS", icon: "🧪", weight: 45, isLoss: false, color: "#c96442" },
  { label: "Perdu", desc: "Retente ta chance la prochaine fois", icon: "✕", weight: 10, isLoss: true, color: "#666" },
  { label: "Starter kit SaaS", desc: "Boilerplate Next.js + Supabase + Stripe", icon: "🧰", weight: 40, isLoss: false, color: "#9c87f5" },
  { label: "200€ Crédits infra", desc: "Crédits hébergement offerts", icon: "💰", weight: 0, isLoss: false, color: "#e8b931" },
  { label: "30min conseils produit", desc: "Call produit avec Matthieu ou Elliot", icon: "📞", weight: 0, isLoss: false, color: "#d97757" },
  { label: "Perdu", desc: "Retente ta chance la prochaine fois", icon: "✕", weight: 5, isLoss: true, color: "#555" },
];

export const SHOWCASE: ShowcaseItem[] = [
  { icon: "🧪", label: "Audit architecture SaaS", desc: "Revue gratuite de ta codebase et de tes choix d'archi.", color: "#c96442" },
  { icon: "🧰", label: "Starter kit SaaS", desc: "Next.js + Supabase + Stripe, prêt à ship dès aujourd'hui.", color: "#9c87f5" },
];

/* ─────────────────────────────────────────────
   Prize label → landing-page URL.
   `null` ⇒ fallback to email/contact flow.
   ───────────────────────────────────────────── */
export const PRIZE_URL_MAP: Record<string, string | null> = {
  "Audit architecture": null,
  "Starter kit SaaS": null,
  "200€ Crédits infra": null,
  "30min conseils produit": null,
  "Perdu": null,
};
