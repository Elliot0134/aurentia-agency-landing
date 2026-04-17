// src/components/v2/home/HomeEasterEggV2.tsx
"use client";

import { HeroEasterEgg } from "@/components/home/HeroEasterEgg";
import type { ShowcaseItem } from "@/components/home/SecretSlotMachine3D";
import type { Prize } from "@/components/home/easterEggData";

export interface HomeEasterEggV2Props {
  /** Override default prize pool (client-side display only). */
  prizes?: Prize[];
  /** Override default showcase cards shown below the machine. */
  showcase?: ShowcaseItem[];
  /** Override the prize-label → landing-page URL map. */
  prizeUrlMap?: Record<string, string | null>;
  /** Custom slot-machine headline. */
  title?: string;
  /** Custom slot-machine tagline. */
  tagline?: string;
}

/**
 * V2 wrapper around the root HeroEasterEgg.
 *
 * Strips the pattern background and dampens bold titles via globals.css rules
 * scoped to `[data-v2-easter-egg]`, and paints a mirrored accent gradient at
 * the very bottom (under "La curiosité paie toujours") — creates visual
 * continuity with the hero's top gradient just below.
 *
 * Optional props let service-specific pages (sites-web, saas,
 * implementation-ia, …) swap the prize pool, showcase, and URL map without
 * duplicating the component.
 */
export function HomeEasterEggV2({
  prizes,
  showcase,
  prizeUrlMap,
  title,
  tagline,
}: HomeEasterEggV2Props = {}) {
  return (
    <div className="relative" data-v2-easter-egg>
      <HeroEasterEgg
        prizes={prizes}
        showcase={showcase}
        prizeUrlMap={prizeUrlMap}
        title={title}
        tagline={tagline}
      />
    </div>
  );
}
