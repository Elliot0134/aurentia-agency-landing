import { describe, it, expect } from 'vitest';
import { COLORS, statusColor } from '../theme';

describe('theme', () => {
  it('expose les couleurs de la charte orange', () => {
    expect(COLORS.accent).toBe('#F36F1C');
    expect(COLORS.text).toBe('#0A0A0A');
  });
  it('statusColor mappe les statuts de mesure', () => {
    expect(statusColor('fail')).toBe('#C62828');
    expect(statusColor('warn')).toBe('#E8710A');
    expect(statusColor('pass')).toBe('#2E7D32');
    expect(statusColor('info')).toBe('#767676');
  });
});
