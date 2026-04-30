// src/app/solutions-ia/formation-ia/page.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { FormationHeroV2 } from "@/components/v2/formation-ia/FormationHeroV2";
import { FormationTrainersV2 } from "@/components/v2/formation-ia/FormationTrainersV2";
import { FormationSkillsLibraryV2 } from "@/components/v2/formation-ia/FormationSkillsLibraryV2";
import { FormationModulesV2 } from "@/components/v2/formation-ia/FormationModulesV2";
import { FormationForWhoV2 } from "@/components/v2/formation-ia/FormationForWhoV2";
import { FormationUseCasesV2 } from "@/components/v2/formation-ia/FormationUseCasesV2";
import { FormationPricingV2 } from "@/components/v2/formation-ia/FormationPricingV2";
import { FormationFinalCtaV2 } from "@/components/v2/formation-ia/FormationFinalCtaV2";

import { MethodSection } from "@/components/v2/shared/MethodSection";
import { FAQSection } from "@/components/v2/shared/FAQSection";
import { HomeTestimonialsV2 } from "@/components/v2/home/HomeTestimonialsV2";
import { HomeRealisationsPreview } from "@/components/v2/home/HomeRealisationsPreview";
import { HomeBookingEmbed } from "@/components/v2/home/HomeBookingEmbed";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SubNavSetter } from "@/components/shared/SubNavContext";

import { solutionsIaFormationData } from "@/data/v2/solutions-ia-formation";

const subNavItems = [
  { label: "Formateurs", sectionId: "trainers" },
  { label: "Bibliothèque skills", sectionId: "skills-library" },
  { label: "Programme", sectionId: "modules" },
  { label: "Pour qui", sectionId: "for-who" },
  { label: "Méthode", sectionId: "method" },
  { label: "Cas d'usage", sectionId: "use-cases" },
  { label: "Réalisations", sectionId: "realisations" },
  { label: "Tarifs", sectionId: "pricing" },
  { label: "FAQ", sectionId: "faq" },
  { label: "RDV", sectionId: "rdv" },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FormationIaPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);

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
      <div
        ref={wrapperRef}
        className="will-change-[filter,opacity]"
        data-splash-content
      >
        <FormationHeroV2 />
        <FormationTrainersV2 />
        <FormationSkillsLibraryV2 />
        <FormationModulesV2 />
        <FormationForWhoV2 />
        <MethodSection
          title={solutionsIaFormationData.method.title}
          subtitle={solutionsIaFormationData.method.subtitle}
          steps={solutionsIaFormationData.method.steps}
        />
        <FormationUseCasesV2 />
        <HomeRealisationsPreview title="Des projets nés de cette expertise" subtitle="Ce qu'on enseigne, on l'a déjà déployé en production." />
        <HomeTestimonialsV2 />
        <FormationPricingV2 />
        <FAQSection
          items={solutionsIaFormationData.faq}
          title="Vos questions sur la formation"
        />
        <FormationFinalCtaV2 />
        <HomeBookingEmbed />
      </div>
    </>
  );
}
