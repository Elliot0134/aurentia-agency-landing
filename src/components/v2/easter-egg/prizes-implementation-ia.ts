import type { Prize } from "@/components/home/easterEggData";
import type { ShowcaseItem } from "@/components/home/SecretSlotMachine3D";

/* ─────────────────────────────────────────────
   Prizes — /v2/implementation-ia
   Reuses the "Skills Claude Code" & "Formation Claude" labels from the
   root data so their dedicated landing pages remain reachable.
   ───────────────────────────────────────────── */
export const PRIZES: Prize[] = [
  { label: "Skills Claude Code", desc: "30+ skills premium pour Claude Code", icon: "⚡", weight: 45, isLoss: false, color: "#c96442" },
  { label: "Perdu", desc: "Retente ta chance la prochaine fois", icon: "✕", weight: 10, isLoss: true, color: "#666" },
  { label: "Formation Claude", desc: "Maîtrise Claude Code de A à Z", icon: "🎓", weight: 40, isLoss: false, color: "#9c87f5" },
  { label: "250€ Crédits", desc: "Crédits Aurentia Agency", icon: "💰", weight: 0, isLoss: false, color: "#e8b931" },
  { label: "30min atelier IA", desc: "Audit use-case IA avec l'équipe", icon: "🧠", weight: 0, isLoss: false, color: "#d97757" },
  { label: "Perdu", desc: "Retente ta chance la prochaine fois", icon: "✕", weight: 5, isLoss: true, color: "#555" },
];

export const SHOWCASE: ShowcaseItem[] = [
  { icon: "⚡", label: "Pack Skills Claude Code", desc: "30+ skills premium prêts à l'emploi pour automatiser ton workflow.", color: "#c96442" },
  { icon: "🎓", label: "Formation Claude IA", desc: "Maîtrise Claude Code de A à Z. Prompts, agents, MCP, skills.", color: "#9c87f5" },
];

/* ─────────────────────────────────────────────
   Prize label → landing-page URL.
   `null` ⇒ fallback to email/contact flow.
   ───────────────────────────────────────────── */
export const PRIZE_URL_MAP: Record<string, string | null> = {
  "Skills Claude Code": "/formation/20-skills-claude",
  "Formation Claude": "/formation/guide-demarrage-claude",
  "250€ Crédits": null,
  "30min atelier IA": null,
  "Perdu": null,
};
