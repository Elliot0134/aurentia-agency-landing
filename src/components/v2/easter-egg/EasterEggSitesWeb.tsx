"use client";

import { HomeEasterEggV2 } from "@/components/v2/home/HomeEasterEggV2";
import { PRIZES, SHOWCASE, PRIZE_URL_MAP } from "./prizes-sites-web";

/**
 * Easter egg variant for `/v2/sites-web`.
 * Same mechanics as the homepage slot machine, different prize pool tuned for
 * visitors shopping for a vitrine / site web project.
 */
export function EasterEggSitesWeb() {
  return (
    <HomeEasterEggV2
      prizes={PRIZES}
      showcase={SHOWCASE}
      prizeUrlMap={PRIZE_URL_MAP}
      title="Gagne un avantage pour ton projet web"
      tagline="Un coup de main ou un pack prêt à l'emploi. 3 rouleaux, 1 chance."
    />
  );
}
