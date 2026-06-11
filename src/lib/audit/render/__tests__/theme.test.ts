import { describe, it, expect } from 'vitest';
import { COLORS, statusColor } from '../theme';

describe('theme', () => {
  it('expose les couleurs de la charte v2 chaud', () => {
    expect(COLORS.accent).toBe('#c96442');
    expect(COLORS.text).toBe('#3d3929');
  });
  it('statusColor mappe les statuts de mesure', () => {
    expect(statusColor('fail')).toBe('#C62828');
    expect(statusColor('warn')).toBe('#E8710A');
    expect(statusColor('pass')).toBe('#2E7D32');
    expect(statusColor('info')).toBe('#5c5a50');
  });
});
