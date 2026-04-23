"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EasterEggImplementationIA } from "@/components/v2/easter-egg/EasterEggImplementationIA";
import { ImplementationIAHeroV2 } from "@/components/v2/implementation-ia/ImplementationIAHeroV2";
import { ImplementationIAWhatYouGetV2 } from "@/components/v2/implementation-ia/ImplementationIAWhatYouGetV2";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";
import { ImplementationIAPricingV2 } from "@/components/v2/implementation-ia/ImplementationIAPricingV2";
import { HomeTeamV2 } from "@/components/v2/home/HomeTeamV2";
import { ImplementationIAWhyV2 } from "@/components/v2/implementation-ia/ImplementationIAWhyV2";
import { HomeTestimonialsV2 } from "@/components/v2/home/HomeTestimonialsV2";
import { ImplementationIAMethodV2 } from "@/components/v2/implementation-ia/ImplementationIAMethodV2";
import { ImplementationIAExamplesV2 } from "@/components/v2/implementation-ia/ImplementationIAExamplesV2";
import { ImplementationIAFAQV2 } from "@/components/v2/implementation-ia/ImplementationIAFAQV2";
import { HomeContactV2 } from "@/components/v2/home/HomeContactV2";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SubNavSetter } from "@/components/shared/SubNavContext";

const subNavItems = [
  { label: "Inclus", sectionId: "what-you-get" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "Équipe", sectionId: "equipe" },
  { label: "Pourquoi", sectionId: "why" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "Méthode", sectionId: "method" },
  { label: "Exemples", sectionId: "examples" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Contact", sectionId: "contact" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ImplementationIAPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Auto-scroll past the easter-egg section on mount
  useEffect(() => {
    const easterEgg = document.querySelector("[data-easter-egg]");
    if (easterEgg) {
      // Instant scroll (no animation) to skip past the hidden section
      window.scrollTo({ top: easterEgg.scrollHeight, behavior: "instant" });
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, []);

  // Grayscale-on-scroll fade (0.15 → 0 over the first 600px of scroll)
  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.fromTo(
      wrapperRef.current,
      { filter: "grayscale(0.15)" },
      {
        filter: "grayscale(0)",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=600",
          scrub: true,
        },
      },
    );
  }, []);

  return (
    <>
      <SubNavSetter items={subNavItems} />
      <ScrollToTop />
      <div ref={wrapperRef} className="will-change-[filter,opacity]" data-splash-content>
        <EasterEggImplementationIA />
        <ImplementationIAHeroV2 />
        <ImplementationIAWhatYouGetV2 />
        <HomeRealisationsPreview />
        <ImplementationIAPricingV2 />
        <HomeTeamV2 />
        <ImplementationIAWhyV2 />
        <HomeTestimonialsV2 />
        <ImplementationIAMethodV2 />
        <ImplementationIAExamplesV2 />
        <ImplementationIAFAQV2 />
        <HomeContactV2 />
      </div>
    </>
  );
}
