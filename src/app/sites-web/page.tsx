// src/app/v2/sites-web/page.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SitesWebHeroV2 } from "@/components/v2/sites-web/SitesWebHeroV2";
import { SitesWebFeaturesV2 } from "@/components/v2/sites-web/SitesWebFeaturesV2";
import { SitesWebMethodV2 } from "@/components/v2/sites-web/SitesWebMethodV2";
import { SitesWebFormulesHub } from "@/components/v2/sites-web/SitesWebFormulesHub";
import { SitesWebFormulesSplits } from "@/components/v2/sites-web/SitesWebFormulesSplits";
import { SitesWebWhyV2 } from "@/components/v2/sites-web/SitesWebWhyV2";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";
import { HomeTestimonialsV2 } from "@/components/v2/home/HomeTestimonialsV2";
import { HomeBookingCTA } from "@/components/v2/home/HomeBookingCTA";
import { HomeBookingEmbed } from "@/components/v2/home/HomeBookingEmbed";
import { SitesWebFAQV2 } from "@/components/v2/sites-web/SitesWebFAQV2";
import { SitesWebFinalCtaV2 } from "@/components/v2/sites-web/SitesWebFinalCtaV2";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SubNavSetter } from "@/components/shared/SubNavContext";
import { SectionDivider } from "@/components/v2/shared/SectionDivider";

const subNavItems = [
  { label: "Services", sectionId: "services" },
  { label: "Inclus", sectionId: "features" },
  { label: "Processus", sectionId: "method" },
  { label: "Pourquoi", sectionId: "why" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Contact", sectionId: "contact" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SitesWebPillarPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Auto-scroll past the easter-egg section on mount
  useEffect(() => {
    const easterEgg = document.querySelector("[data-easter-egg]");
    if (easterEgg) {
      window.scrollTo({ top: easterEgg.scrollHeight, behavior: "instant" });
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, []);

  // Grayscale-on-scroll fade
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
      <ScrollToTop />
      <div ref={wrapperRef} className="will-change-[filter,opacity]" data-splash-content>
        <SitesWebHeroV2 />
        <SectionDivider />
        <SitesWebFormulesHub />
        <SitesWebFormulesSplits />
        <SectionDivider />
        <HomeBookingCTA />
        <SectionDivider />
        <SitesWebFeaturesV2 />
        <SectionDivider />
        <HomeTestimonialsV2 />
        <SectionDivider />
        <SitesWebMethodV2 />
        <SectionDivider />
        <SitesWebWhyV2 />
        <SectionDivider />
        <HomeRealisationsPreview />
        <SectionDivider />
        <SitesWebFAQV2 />
        <SectionDivider />
        <HomeBookingEmbed />
        <SectionDivider />
        <SitesWebFinalCtaV2 />
      </div>
    </>
  );
}
