"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HomeEasterEggV2 } from "@/components/v2/home/HomeEasterEggV2";
import { HomeHeroV2 } from "@/components/v2/home/HomeHeroV2";
import { HomeServicesV2 } from "@/components/v2/home/HomeServicesV2";
import { HomeWhyAurentia } from "@/components/v2/home/HomeWhyAurentia";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";
import { HomeTeamV2 } from "@/components/v2/home/HomeTeamV2";
import { HomeTestimonialsV2 } from "@/components/v2/home/HomeTestimonialsV2";
import { HomeMethodV2 } from "@/components/v2/home/HomeMethodV2";
import { HomeFAQV2 } from "@/components/v2/home/HomeFAQV2";
import { HomeRessourcesPreview } from "@/components/v2/home/HomeRessourcesPreview";
import { HomeBookingCTA } from "@/components/v2/home/HomeBookingCTA";
import { HomeBookingEmbed } from "@/components/v2/home/HomeBookingEmbed";
import { HomeQuoteV2 } from "@/components/v2/home/HomeQuoteV2";
import { SubNavSetter } from "@/components/shared/SubNavContext";
import { SectionDivider } from "@/components/v2/shared/SectionDivider";

const subNavItems = [
  { label: "Services", sectionId: "pillars" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Pourquoi", sectionId: "why" },
  { label: "Équipe", sectionId: "equipe" },
  { label: "Témoignages", sectionId: "testimonials" },
  { label: "Méthode", sectionId: "method" },
  { label: "Ressources", sectionId: "ressources" },
  { label: "FAQ", sectionId: "faq" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeV2() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Land on the hero on mount (skip the easter-egg section above it)
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (hero) {
      window.scrollTo({ top: hero.offsetTop, behavior: "instant" });
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, []);

  // Grayscale-on-scroll fade (0.15 → 0 over the first 600px of scroll)
  useGSAP(() => {
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
  }, { scope: wrapperRef });

  return (
    <>
      <SubNavSetter items={subNavItems} />
      <div ref={wrapperRef} className="will-change-[filter,opacity]" data-splash-content>
        {/* <HomeEasterEggV2 /> — désactivé temporairement, on réactivera plus tard */}
        <HomeHeroV2 />
        <HomeServicesV2 />
        <HomeRealisationsPreview />
        <HomeBookingCTA />
        <HomeWhyAurentia />
        <HomeQuoteV2 />
        <HomeTeamV2 />
        <HomeTestimonialsV2 />
        <HomeMethodV2 />
        <HomeRessourcesPreview />
        <HomeFAQV2 />
        <HomeBookingEmbed />
      </div>
    </>
  );
}
