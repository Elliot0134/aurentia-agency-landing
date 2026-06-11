import type { MeasurementStatus } from '../types';

export const COLORS = {
  accent: '#c96442',       // terracotta (bouton "Prendre RDV", CTA primaire)
  accentDark: '#b05730',   // terracotta foncé (hover)
  accentLight: '#d97757',  // coral clair
  tintBg: '#f5efe7',       // tint crème chaud pour encarts
  tintBorder: '#e7dccf',   // bordure d'encart
  surface: '#ede9de',      // fond crème (bg-base)
  card: '#faf9f6',         // carte (warm off-white)
  border: '#e3dfd4',       // bordure
  text: '#3d3929',         // texte principal (brun chaud foncé)
  muted: '#5c5a50',        // texte secondaire
  dim: '#83827d',          // texte tertiaire
  bad: '#C62828',          // mauvais (inchangé, feu rouge universel)
  mid: '#E8710A',          // moyen
  good: '#2E7D32',         // bon
} as const;

export function statusColor(status: MeasurementStatus): string {
  switch (status) {
    case 'fail': return COLORS.bad;
    case 'warn': return COLORS.mid;
    case 'pass': return COLORS.good;
    default: return COLORS.muted;
  }
}
