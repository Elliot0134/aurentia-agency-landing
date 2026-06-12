import { describe, expect, it } from 'vitest';
import { statutFunnelFromStatutHumain } from '../statut-humain';

describe('statutFunnelFromStatutHumain', () => {
  it("mappe 'Gagné' / 'Perdu' / 'À appeler' (accents et casse ignorés)", () => {
    expect(statutFunnelFromStatutHumain('Gagné')).toBe('gagne');
    expect(statutFunnelFromStatutHumain('gagne')).toBe('gagne');
    expect(statutFunnelFromStatutHumain(' GAGNÉ ')).toBe('gagne');
    expect(statutFunnelFromStatutHumain('Perdu')).toBe('perdu');
    expect(statutFunnelFromStatutHumain('PERDU')).toBe('perdu');
    expect(statutFunnelFromStatutHumain('À appeler')).toBe('a_appeler');
    expect(statutFunnelFromStatutHumain('a appeler')).toBe('a_appeler');
    expect(statutFunnelFromStatutHumain('A APPELER')).toBe('a_appeler');
  });

  it('null pour un statut non reconnu (le funnel ne bouge pas)', () => {
    expect(statutFunnelFromStatutHumain('En discussion')).toBeNull();
    expect(statutFunnelFromStatutHumain('')).toBeNull();
    expect(statutFunnelFromStatutHumain('gagnée')).toBeNull();
  });
});
