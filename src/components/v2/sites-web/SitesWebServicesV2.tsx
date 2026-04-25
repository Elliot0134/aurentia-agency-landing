// src/components/sites-web/SitesWebServicesV2.tsx
"use client";

import { useCallback, useEffect, useRef, type ComponentType } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import {
  VitrineMockup,
  LandingMockup,
} from "@/components/v2/home/ServiceMockups";

type Offer = {
  title: string;
  desc: string;
  tags: string[];
  priceFrom: string;
  href: string;
  Visual: ComponentType;
};

const OFFERS: Offer[] = [
  {
    title: "Site vitrine",
    desc: "Présence pro pour TPE, artisans, commerces. SEO, responsive, rapide.",
    tags: ["SEO", "Responsive", "Animations", "Sur-mesure"],
    priceFrom: "1 200 €",
    href: "/sites-web/site-vitrine",
    Visual: VitrineMockup,
  },
  {
    title: "Landing page",
    desc: "Une page, un objectif. Pages haute conversion pour startups et SaaS.",
    tags: ["Conversion", "A/B Testing", "Analytics", "Performance"],
    priceFrom: "1 500 €",
    href: "/sites-web/landing-page",
    Visual: LandingMockup,
  },
];

/**
 * Sites Web services — mirrors HomeServicesV2 card layout (Offer cards with
 * animated mockups) without the tab system. Two site types, same visual
 * language as the homepage services tab panel.
 */
export function SitesWebServicesV2() {
  // Auto-scroll on hover (desktop) — mirrored from HomeServicesV2
  const hoverTweens = useRef<Map<HTMLElement, gsap.core.Tween>>(new Map());

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const scrollArea = card.querySelector(".mockup-scroll-area") as HTMLElement | null;
    const inner = card.querySelector(".mockup-inner") as HTMLElement | null;
    if (!scrollArea || !inner) return;
    const scrollDistance = inner.scrollHeight - scrollArea.clientHeight;
    if (scrollDistance <= 0) return;

    hoverTweens.current.get(card)?.kill();
    const tween = gsap.to(inner, {
      y: -scrollDistance,
      duration: scrollDistance / 80,
      ease: "none",
    });
    hoverTweens.current.set(card, tween);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024) return;
    const card = e.currentTarget;
    const inner = card.querySelector(".mockup-inner") as HTMLElement | null;
    if (!inner) return;

    hoverTweens.current.get(card)?.kill();
    const tween = gsap.to(inner, {
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    hoverTweens.current.set(card, tween);
  }, []);

  useEffect(() => {
    const tweens = hoverTweens.current;
    return () => {
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <SectionContainer
      id="services"
      title="Deux formats, un même niveau d'exigence"
      subtitle="Selon votre objectif — inspirer confiance ou convertir un lancement — on choisit le format adapté. Aucun template recyclé."
      alignHeader="center"
      className="py-20 md:py-24"
      innerClassName="max-w-6xl"
      titleClassName="text-4xl md:text-5xl lg:text-6xl mb-4 font-normal"
    >
      <div className="flex flex-wrap items-start justify-center gap-5 md:gap-6">
        {OFFERS.map((offer) => (
          <div
            key={offer.title}
            className="flex w-full max-w-[420px] md:w-[380px] lg:w-[400px]"
          >
            <OfferCard
              offer={offer}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center md:mt-10">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-all duration-500 ease-in-out hover:gap-3"
        >
          Besoin d&apos;un site sur-mesure{" "}
          <span className="font-bold text-[var(--orange-600)] transition-colors duration-500 ease-in-out">
            Parlons-en
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-in-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </SectionContainer>
  );
}

/* Offer card — same look & behaviour as HomeServicesV2's OfferCard */
function OfferCard({
  offer,
  onMouseEnter,
  onMouseLeave,
}: {
  offer: Offer;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const { Visual, title, desc, priceFrom, href } = offer;
  return (
    <Card className="group relative flex w-full flex-col overflow-hidden rounded-2xl transition-all duration-500 ease-in-out hover:-translate-y-1">
      <div className="flex flex-col p-4 md:p-5">
        <h3 className="mb-3 font-heading text-xl leading-tight text-foreground md:text-2xl">
          {title}
        </h3>

        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="mockup-viewport relative aspect-[16/11] w-full shrink-0 overflow-hidden rounded-xl border border-foreground/[0.08] bg-white transition-all duration-700 ease-in-out group-hover:border-foreground/20 group-hover:shadow-[0_0_50px_rgba(228,85,18,0.08)] group-hover:scale-[1.02] dark:bg-background-surface"
        >
          <Visual />
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>

          <div className="flex items-end justify-between gap-3 pt-1">
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-sm uppercase tracking-widest text-foreground/30">
                À partir de
              </span>
              <span className="font-mono text-base font-bold text-[var(--orange-600)]">
                {priceFrom}
              </span>
            </div>
            <Link
              href={href}
              className="group/cta inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-foreground px-3.5 py-2 text-sm font-medium text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
            >
              Découvrir
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 ease-in-out group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
