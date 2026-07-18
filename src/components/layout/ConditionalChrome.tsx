'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useIsEmbed } from './useIsEmbed';

/**
 * Masque le chrome du site sur :
 *  - la zone /admin (page utilitaire brandée mais sans chrome) — toujours ;
 *  - le mode embed (`?embed=1`, site encastré en iframe dans l'app Aurentia)
 *    UNIQUEMENT pour les éléments passés avec `hideOnEmbed` (overlays redondants
 *    dans l'app : chatbot flottant, bandeau cookies). La navbar et le footer,
 *    eux, RESTENT en embed — ils portent la navigation entre les services.
 *
 * Composant CLIENT volontairement : décider côté serveur imposerait de lire
 * `headers()` dans le root layout, ce qui rendrait TOUT le site dynamique
 * (perte de la génération statique des pages marketing). usePathname /
 * useIsEmbed ne touchent pas au rendu serveur.
 */
export function ConditionalChrome({
  children,
  hideOnEmbed = false,
}: {
  children: ReactNode;
  /** Masquer aussi en mode embed (pour les overlays, pas pour la nav). */
  hideOnEmbed?: boolean;
}) {
  const pathname = usePathname();
  const isEmbed = useIsEmbed();
  if (pathname?.startsWith('/admin')) return null;
  if (hideOnEmbed && isEmbed) return null;
  return <>{children}</>;
}
