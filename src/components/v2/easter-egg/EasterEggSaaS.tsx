"use client";

import { HomeEasterEggV2 } from "@/components/v2/home/HomeEasterEggV2";
import { PRIZES, SHOWCASE, PRIZE_URL_MAP } from "./prizes-saas";

/**
 * Easter egg variant for `/v2/saas`.
 * Prize pool targets founders/tech leads: audit archi, starter kit, crédits
 * infra, call produit.
 */
export function EasterEggSaaS() {
  return (
    <HomeEasterEggV2
      prizes={PRIZES}
      showcase={SHOWCASE}
      prizeUrlMap={PRIZE_URL_MAP}
      title="Un boost pour ton SaaS, tente ta chance"
      tagline="Audit, starter kit ou crédits infra. 3 rouleaux, 1 chance."
    />
  );
}
