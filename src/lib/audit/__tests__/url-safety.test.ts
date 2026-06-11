import { describe, it, expect } from 'vitest';
import { assertSafeUrl, isPrivateIp, UnsafeUrlError } from '../url-safety';

const fakeResolver = (ips: string[]) => ({
  resolve4: async () => ips,
  resolve6: async () => [] as string[],
});

describe('isPrivateIp', () => {
  it('détecte les plages privées v4', () => {
    for (const ip of ['127.0.0.1', '10.0.0.5', '192.168.1.1', '172.16.0.1', '169.254.1.1']) {
      expect(isPrivateIp(ip)).toBe(true);
    }
  });
  it('laisse passer les IP publiques', () => {
    expect(isPrivateIp('142.250.74.110')).toBe(false);
  });
  it('détecte ::1 et fc00::/7 en v6', () => {
    expect(isPrivateIp('::1')).toBe(true);
    expect(isPrivateIp('fd12:3456::1')).toBe(true);
  });
});

describe('assertSafeUrl', () => {
  it('normalise une URL sans schéma en https', async () => {
    const url = await assertSafeUrl('exemple.fr', fakeResolver(['1.2.3.4']));
    expect(url.href).toBe('https://exemple.fr/');
  });
  it('rejette les schémas non-http', async () => {
    await expect(assertSafeUrl('ftp://exemple.fr', fakeResolver(['1.2.3.4']))).rejects.toThrow(UnsafeUrlError);
  });
  it('rejette localhost et les IP privées littérales', async () => {
    await expect(assertSafeUrl('http://localhost:3000', fakeResolver(['1.2.3.4']))).rejects.toThrow(UnsafeUrlError);
    await expect(assertSafeUrl('http://192.168.1.10', fakeResolver([]))).rejects.toThrow(UnsafeUrlError);
  });
  it('rejette un domaine qui résout vers une IP privée (DNS rebinding)', async () => {
    await expect(assertSafeUrl('https://evil.example', fakeResolver(['10.0.0.1']))).rejects.toThrow(UnsafeUrlError);
  });
});
