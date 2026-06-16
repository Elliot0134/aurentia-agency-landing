import { describe, it, expect, vi, afterEach } from 'vitest';
import { verifyAdminPassword, makeAdminCookieValue, verifyAdminCookieValue } from '../auth';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('verifyAdminPassword', () => {
  it('accepte le bon mot de passe, rejette les autres', () => {
    vi.stubEnv('ADMIN_PASSWORD', 's3cret-aurentia');
    expect(verifyAdminPassword('s3cret-aurentia')).toBe(true);
    expect(verifyAdminPassword('mauvais')).toBe(false);
    expect(verifyAdminPassword('s3cret-aurenti')).toBe(false); // longueur différente
  });
  it('rejette tout si ADMIN_PASSWORD absente (gate fermée)', () => {
    vi.stubEnv('ADMIN_PASSWORD', '');
    expect(verifyAdminPassword('peu importe')).toBe(false);
  });
});

describe('cookie admin', () => {
  it('un cookie fraîchement signé est vérifié', () => {
    vi.stubEnv('ADMIN_PASSWORD', 's3cret-aurentia');
    expect(verifyAdminCookieValue(makeAdminCookieValue())).toBe(true);
  });
  it('rejette un cookie absent, falsifié, ou signé avec un autre mot de passe', () => {
    vi.stubEnv('ADMIN_PASSWORD', 's3cret-aurentia');
    const good = makeAdminCookieValue();
    expect(verifyAdminCookieValue(undefined)).toBe(false);
    expect(verifyAdminCookieValue('')).toBe(false);
    expect(verifyAdminCookieValue(good.slice(0, -2) + 'ff')).toBe(false); // falsifié
    vi.stubEnv('ADMIN_PASSWORD', 'autre-mot-de-passe');
    expect(verifyAdminCookieValue(good)).toBe(false); // rotation du mot de passe invalide l'ancien cookie
  });
});
