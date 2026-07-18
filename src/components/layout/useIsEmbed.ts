"use client";

import { useSyncExternalStore } from "react";

/**
 * True quand la page est chargée en mode embed (`?embed=1`) — utilisé pour
 * masquer le chrome du site (navbar, footer, chatbot, bandeau cookies) quand le
 * site est encastré en iframe dans l'app Aurentia (univers « Aurentia Agency »).
 *
 * Pattern `useSyncExternalStore` (comme `AnimationContext`) : valeur client
 * synchrone (pas de flash après hydratation), `false` côté serveur pour ne pas
 * rendre les pages marketing dynamiques. L'état embed est figé pour la durée du
 * chargement → pas d'abonnement réel.
 */
function getSnapshot(): boolean {
  return new URLSearchParams(window.location.search).get("embed") === "1";
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(): () => void {
  return () => {};
}

export function useIsEmbed(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
