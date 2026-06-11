import { isIP } from 'node:net';
import { resolve4, resolve6 } from 'node:dns/promises';

export class UnsafeUrlError extends Error {}

export interface DnsResolver {
  resolve4: (host: string) => Promise<string[]>;
  resolve6: (host: string) => Promise<string[]>;
}

const defaultResolver: DnsResolver = { resolve4, resolve6 };

const PRIVATE_V4 = [
  /^0\./,
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
];

export function isPrivateIp(ip: string): boolean {
  if (isIP(ip) === 6) {
    const low = ip.toLowerCase();
    return low === '::1' || low.startsWith('fc') || low.startsWith('fd') || low.startsWith('fe80');
  }
  return PRIVATE_V4.some((re) => re.test(ip));
}

const BLOCKED_HOSTS = ['localhost'];
const BLOCKED_SUFFIXES = ['.local', '.internal', '.localhost'];

/**
 * Valide qu'une URL fournie par un visiteur est publique et auditable.
 * Lève UnsafeUrlError sinon. Retourne l'URL normalisée (https par défaut).
 */
export async function assertSafeUrl(raw: string, resolver: DnsResolver = defaultResolver): Promise<URL> {
  const trimmed = raw.trim();
  // Rejeter tout schéma explicite qui n'est pas http(s) avant normalisation
  if (/^[a-z][a-z0-9+\-.]*:\/\//i.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    throw new UnsafeUrlError(`Schéma non autorisé : ${trimmed.split(':')[0]}`);
  }
  let url: URL;
  try {
    url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    throw new UnsafeUrlError(`URL invalide : ${raw}`);
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new UnsafeUrlError(`Schéma non autorisé : ${url.protocol}`);
  }
  const host = url.hostname.toLowerCase();
  if (BLOCKED_HOSTS.includes(host) || BLOCKED_SUFFIXES.some((s) => host.endsWith(s))) {
    throw new UnsafeUrlError(`Hôte interne interdit : ${host}`);
  }
  if (isIP(host)) {
    if (isPrivateIp(host)) throw new UnsafeUrlError(`IP privée interdite : ${host}`);
    return url;
  }
  let addrs: string[] = [];
  try {
    addrs = await resolver.resolve4(host);
  } catch {
    try {
      addrs = await resolver.resolve6(host);
    } catch {
      throw new UnsafeUrlError(`Domaine introuvable : ${host}`);
    }
  }
  if (addrs.length === 0) throw new UnsafeUrlError(`Domaine introuvable : ${host}`);
  if (addrs.some(isPrivateIp)) {
    throw new UnsafeUrlError(`Le domaine résout vers une IP privée : ${host}`);
  }
  return url;
}
