import type { MeasurementStatus } from '../types';

export const COLORS = {
  accent: '#F36F1C',
  accentDark: '#BD3F11',
  tintBg: '#FFF7ED',
  tintBorder: '#FBE2C8',
  surface: '#F4F4F5',
  card: '#FFFFFF',
  border: '#E5E5E5',
  text: '#0A0A0A',
  muted: '#767676',
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
