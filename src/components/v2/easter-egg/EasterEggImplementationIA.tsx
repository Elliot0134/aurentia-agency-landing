"use client";

import { HomeEasterEggV2 } from "@/components/v2/home/HomeEasterEggV2";
import { PRIZES, SHOWCASE, PRIZE_URL_MAP } from "./prizes-implementation-ia";

/**
 * Easter egg variant for `/v2/implementation-ia`.
 * Reuses the "Skills Claude Code" / "Formation Claude" landing pages plus
 * service-specific lots (atelier IA, crédits Aurentia).
 */
export function EasterEggImplementationIA() {
  return (
    <HomeEasterEggV2
      prizes={PRIZES}
      showcase={SHOWCASE}
      prizeUrlMap={PRIZE_URL_MAP}
      title="Accélère ton implémentation IA"
      tagline="Skills, formation ou atelier sur-mesure. 3 rouleaux, 1 chance."
    />
  );
}
