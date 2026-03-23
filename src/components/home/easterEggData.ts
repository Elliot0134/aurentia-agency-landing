export interface Prize {
  label: string;
  desc: string;
  icon: string;
  weight: number;
  isLoss: boolean;
  color: string;
}

export const PRIZES: Prize[] = [
  { label: "Skills Claude Code", desc: "30+ skills premium pour Claude Code", icon: "⚡", weight: 45, isLoss: false, color: "#c96442" },
  { label: "Perdu", desc: "Retente ta chance la prochaine fois", icon: "✕", weight: 10, isLoss: true, color: "#666" },
  { label: "Formation Claude", desc: "Maîtrise Claude Code de A à Z", icon: "🎓", weight: 40, isLoss: false, color: "#9c87f5" },
  { label: "50€ Crédits", desc: "Crédits Aurentia Agency", icon: "💰", weight: 0, isLoss: false, color: "#e8b931" },
  { label: "Skills Claude", desc: "30+ skills premium pour Claude Code", icon: "⚡", weight: 0, isLoss: false, color: "#d97757" },
  { label: "Perdu", desc: "Retente ta chance la prochaine fois", icon: "✕", weight: 5, isLoss: true, color: "#555" },
];

export const SHOWCASE = [
  { icon: "⚡", label: "Pack Skills Claude Code", desc: "30+ skills premium prêts à l'emploi pour automatiser ton workflow.", color: "#c96442" },
  { icon: "🎓", label: "Formation Claude IA", desc: "Maîtrise Claude Code de A à Z. Prompts, agents, MCP, skills.", color: "#9c87f5" },
];

export function pickPrize(): number {
  const weighted = PRIZES.map((p, i) => ({ index: i, weight: p.weight })).filter((p) => p.weight > 0);
  const total = weighted.reduce((s, p) => s + p.weight, 0);
  let rand = Math.random() * total;
  for (const p of weighted) {
    rand -= p.weight;
    if (rand <= 0) return p.index;
  }
  return 0;
}
