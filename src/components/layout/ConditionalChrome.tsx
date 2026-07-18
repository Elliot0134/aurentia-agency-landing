'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useIsEmbed } from './useIsEmbed';

/**
 * Masque le chrome du site (navbar, footer, chatbot, bandeau cookies) sur :
 *  - la zone /admin (page utilitaire brandée mais sans chrome) ;
 *  - le mode embed (`?embed=1`), quand le site est encastré en iframe dans
 *    l'app Aurentia (univers « Aurentia Agency ») — on ne veut que le contenu,
 *    sans double navbar/footer.
 *
 * Composant CLIENT volontairement : décider côté serveur imposerait de lire
 * `headers()` dans le root layout, ce qui rendrait TOUT le site dynamique
 * (perte de la génération statique des pages marketing). usePathname /
 * useIsEmbed ne touchent pas au rendu serveur.
 */
export function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isEmbed = useIsEmbed();
  if (pathname?.startsWith('/admin') || isEmbed) return null;
  return <>{children}</>;
}
