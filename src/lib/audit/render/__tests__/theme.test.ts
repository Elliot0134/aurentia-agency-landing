import { describe, it, expect } from 'vitest';
import { COLORS, statusColor } from '../theme';

describe('theme', () => {
  it('expose le neutre clair en fond/texte et le terracotta en accent', () => {
    expect(COLORS.accent).toBe('#c96442');
    expect(COLORS.surface).toBe('#F4F4F5');
    expect(COLORS.text).toBe('#0A0A0A');
  });
  it('statusColor mappe les statuts de mesure', () => {
    expect(statusColor('fail')).toBe('#C62828');
    expect(statusColor('warn')).toBe('#E8710A');
    expect(statusColor('pass')).toBe('#2E7D32');
    expect(statusColor('info')).toBe('#767676');
  });
});
