"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SaaSHeroV2 } from "@/components/v2/saas/SaaSHeroV2";
import { SaaSStatsV2 } from "@/components/v2/saas/SaaSStatsV2";
import { SaaSAntiPitchV2 } from "@/components/v2/saas/SaaSAntiPitchV2";
import { SaaSSubOffersV2 } from "@/components/v2/saas/SaaSSubOffersV2";
import { SaaSIntegrationsV2 } from "@/components/v2/saas/SaaSIntegrationsV2";
import { SaaSPricingV2 } from "@/components/v2/saas/SaaSPricingV2";
import { SaaSComparisonV2 } from "@/components/v2/saas/SaaSComparisonV2";
import { SaaSDeliverableV2 } from "@/components/v2/saas/SaaSDeliverableV2";
import { SaaSUseCasesV2 } from "@/components/v2/saas/SaaSUseCasesV2";
import { SaaSWhyV2 } from "@/components/v2/saas/SaaSWhyV2";
import { SaaSMethodV2 } from "@/components/v2/saas/SaaSMethodV2";
import { SaaSFAQV2 } from "@/components/v2/saas/SaaSFAQV2";
import { HomeTeamV2 } from "@/components/v2/home/HomeTeamV2";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";
import { HomeTestimonialsV2 } from "@/components/v2/home/HomeTestimonialsV2";
import { HomeBookingCTA } from "@/components/v2/home/HomeBookingCTA";
import { HomeBookingEmbed } from "@/components/v2/home/HomeBookingEmbed";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SubNavSetter } from "@/components/shared/SubNavContext";

const subNavItems = [
  { label: "Chiffres", sectionId: "stats" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "Notre ligne", sectionId: "anti-pitch" },
  { label: "Offres", sectionId: "offers" },
  { label: "Intégrations", sectionId: "integrations" },
  { label: "Comparaison", sectionId: "comparison" },
  { label: "Livrable", sectionId: "deliverable" },
  { label: "Cas concrets", sectionId: "use-cases" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Méthode", sectionId: "method" },
  { label: "FAQ", sectionId: "faq" },
  { label: "RDV", sectionId: "rdv" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeSaaS() {
  const wrapperRef = useRef<HTMLDivElement>(null);

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
        <SaaSHeroV2 />
        <SaaSStatsV2 />
        <SaaSPricingV2 />
        <SaaSAntiPitchV2 />
        <SaaSSubOffersV2 />
        <SaaSIntegrationsV2 />
        <SaaSComparisonV2 />
        <SaaSDeliverableV2 />
        <SaaSUseCasesV2 />
        <HomeRealisationsPreview filterTags={["SaaS"]} title="Nos derniers SaaS livrés" subtitle="Des plateformes pensées pour scaler — cliquez pour voir le détail." />
        <HomeBookingCTA />
        <HomeTeamV2 />
        <SaaSWhyV2 />
        <HomeTestimonialsV2 />
        <SaaSMethodV2 />
        <SaaSPricingV2 />
        <SaaSFAQV2 />
        <HomeBookingEmbed />
      </div>
    </>
  );
}
