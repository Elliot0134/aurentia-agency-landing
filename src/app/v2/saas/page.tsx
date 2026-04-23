"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EasterEggSaaS } from "@/components/v2/easter-egg/EasterEggSaaS";
import { SaaSHeroV2 } from "@/components/v2/saas/SaaSHeroV2";
import { SaaSSubOffersV2 } from "@/components/v2/saas/SaaSSubOffersV2";
import { SaaSRealisationsV2 } from "@/components/v2/saas/SaaSRealisationsV2";
import { SaaSWhyV2 } from "@/components/v2/saas/SaaSWhyV2";
import { SaaSMethodV2 } from "@/components/v2/saas/SaaSMethodV2";
import { SaaSFAQV2 } from "@/components/v2/saas/SaaSFAQV2";
import { HomeTeamV2 } from "@/components/v2/home/HomeTeamV2";
import { HomeTestimonialsV2 } from "@/components/v2/home/HomeTestimonialsV2";
import { HomeContactV2 } from "@/components/v2/home/HomeContactV2";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SubNavSetter } from "@/components/shared/SubNavContext";

const subNavItems = [
  { label: "Offres", sectionId: "offers" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Équipe", sectionId: "equipe" },
  { label: "Pourquoi", sectionId: "why" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "Méthode", sectionId: "method" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Contact", sectionId: "contact" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeSaaS() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Auto-scroll past the easter-egg section on mount
  useEffect(() => {
    const easterEgg = document.querySelector("[data-easter-egg]");
    if (easterEgg) {
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
        <EasterEggSaaS />
        <SaaSHeroV2 />
        <SaaSSubOffersV2 />
        <SaaSRealisationsV2 />
        <HomeTeamV2 />
        <SaaSWhyV2 />
        <HomeTestimonialsV2 />
        <SaaSMethodV2 />
        <SaaSFAQV2 />
        <HomeContactV2 />
      </div>
    </>
  );
}
