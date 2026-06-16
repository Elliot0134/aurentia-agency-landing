'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Masque le chrome du site (navbar, footer, chatbot, bandeau cookies) sur la
 * zone /admin, qui est une page utilitaire brandée mais sans chrome.
 *
 * Composant CLIENT volontairement : décider côté serveur imposerait de lire
 * `headers()` dans le root layout, ce qui rendrait TOUT le site dynamique
 * (perte de la génération statique des pages marketing). usePathname ne touche
 * pas au rendu serveur.
 */
export function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
