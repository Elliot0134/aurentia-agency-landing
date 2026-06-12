import type { MeasurementStatus } from '../types';

export const COLORS = {
  accent: '#c96442',       // terracotta (BOUTONS / CTA : couleur de marque)
  accentDark: '#b05730',
  accentLight: '#d97757',
  tintBg: '#FBF4EF',       // tint terracotta très clair pour l'encart Pro
  tintBorder: '#EBDDD2',
  surface: '#F4F4F5',      // RETOUR neutre clair (fond)
  card: '#FFFFFF',         // carte blanche
  border: '#E5E5E5',       // bordure neutre
  text: '#0A0A0A',         // texte noir (retour avant)
  muted: '#767676',        // texte secondaire neutre
  dim: '#999999',          // texte tertiaire
  bad: '#C62828',
  mid: '#E8710A',
  good: '#2E7D32',
} as const;

export function statusColor(status: MeasurementStatus): string {
  switch (status) {
    case 'fail': return COLORS.bad;
    case 'warn': return COLORS.mid;
    case 'pass': return COLORS.good;
    default: return COLORS.muted;
  }
}
