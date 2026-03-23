"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroEasterEgg } from "@/components/home/HeroEasterEgg";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeMarquee } from "@/components/home/HomeMarquee";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeProcess } from "@/components/home/HomeProcess";
import { HomeTeam } from "@/components/home/HomeTeam";
import { HomePortfolio } from "@/components/home/HomePortfolio";
import { HomeCTA } from "@/components/home/HomeCTA";
import { ScrollToTop } from "@/components/shared/ScrollToTop";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Auto-scroll past the easter egg section on mount
  useEffect(() => {
    const easterEgg = document.querySelector("[data-easter-egg]");
    if (easterEgg) {
      // Instant scroll (no animation) to skip past the hidden section
      window.scrollTo({ top: easterEgg.scrollHeight, behavior: "instant" });
      // Refresh ScrollTrigger after repositioning
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;

    gsap.fromTo(wrapperRef.current,
      { filter: "grayscale(0.15)" },
      {
        filter: "grayscale(0)",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=600",
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div ref={wrapperRef} className="will-change-[filter,opacity]" data-splash-content>
        <main className="flex min-h-screen flex-col w-full">
          <HeroEasterEgg />
          <HomeHero />
          <HomeMarquee />
          <HomeTeam />
          <HomeServices />
          <HomeProcess />
          <HomePortfolio />
          <HomeCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
