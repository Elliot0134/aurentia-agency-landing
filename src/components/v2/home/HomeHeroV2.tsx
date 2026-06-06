// src/components/v2/home/HomeHeroV2.tsx
"use client";

import Image from "next/image";
import { WipAwareLink as Link } from "@/components/shared/WipModal";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { LowPolyCoralBg } from "@/components/v2/shared/LowPolyCoralBg";

type ClientLogo = {
  name: string;
  src: string;
  /** Tailwind height override (defaults to h-10 md:h-12). Use for logos that look visually smaller. */
  heightClass?: string;
  /** Wrap the logo in a dark pill — for logos with white/light text that would be invisible on the marquee's light background. */
  needsDarkBg?: boolean;
};

const CLIENT_LOGOS: ClientLogo[] = [
  { name: "Comparateur IA Facile", src: "/partenaires/ciaf.png" },
  { name: "French Tech Grande Provence", src: "/partenaires/ftgp.png" },
  { name: "AlloRestau", src: "/partenaires/allo-resto.png", heightClass: "h-16 md:h-20" },
  { name: "Friend'iz", src: "/partenaires/friendiz.webp" },
  { name: "HiLove", src: "/partenaires/hilove.png" },
  { name: "Maison Enileh", src: "/partenaires/maison-enileh.avif" },
  { name: "Golf Mentor", src: "/partenaires/golf-mentor.avif" },
  { name: "Mon Service Courtier", src: "/partenaires/mon-service-courtier.png", needsDarkBg: true },
];

function LogoItem({ logo, mobile }: { logo: ClientLogo; mobile?: boolean }) {
  const heightCls = mobile
    ? (logo.heightClass?.replace(/md:\S+/g, "") ?? "h-8") // smaller on mobile rows
    : (logo.heightClass ?? "h-10 md:h-12");
  const img = (
    <Image
      src={logo.src}
      alt={logo.name}
      width={96}
      height={48}
      className={`${heightCls} w-auto object-contain`}
    />
  );
  return logo.needsDarkBg ? (
    <div className="flex shrink-0 items-center rounded-xl bg-zinc-900 px-4 py-2 transition-transform duration-500 ease-in-out hover:scale-110">
      {img}
    </div>
  ) : (
    <div className="shrink-0 transition-transform duration-500 ease-in-out hover:scale-110">
      {img}
    </div>
  );
}

export function HomeHeroV2() {
  const { hero } = homeData;

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* ══════════════════════════════════════════════
           DECOR — top halo matching the easter-egg bottom halo.
           Radial centered at the very top edge → peak intensity at the
           boundary with the easter-egg above, fades downward.
           ══════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[500px]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(
              ellipse 130% 100% at 50% 0%,
              color-mix(in srgb, var(--orange-500) 45%, transparent) 0%,
              color-mix(in srgb, var(--orange-500) 36%, transparent) 12%,
              color-mix(in srgb, var(--orange-500) 26%, transparent) 25%,
              color-mix(in srgb, var(--orange-500) 18%, transparent) 38%,
              color-mix(in srgb, var(--orange-500) 11%, transparent) 52%,
              color-mix(in srgb, var(--orange-500) 6%, transparent) 66%,
              color-mix(in srgb, var(--orange-500) 2%, transparent) 82%,
              transparent 100%
            )`,
          }}
        />
      </div>


      {/* ══════════════════════════════════════════════
           MAIN — centered hero
           ══════════════════════════════════════════════ */}
      <div className="relative z-10 pt-20 md:pt-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-7 px-6 py-12 text-center md:px-12 md:py-20">
          {/* Pill — only thing above h1 */}
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-3.5 py-1.5 text-sm uppercase tracking-[0.18em] text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange-500)] opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--orange-500)]" />
            </span>
            Agence Web &amp; IA
          </span>

          {/* H1 */}
          <h1 className="max-w-5xl whitespace-pre-line leading-[1.05] text-foreground !text-[2.25rem] sm:!text-[2.75rem] md:!text-[3.25rem] lg:!text-[3.75rem] xl:!text-[4rem]">
            {hero.headline}
          </h1>

          {/* Subhead */}
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {hero.subHeadline}
          </p>

          {/* CTAs — primary = same bg-accent-primary as navbar "Prendre RDV" */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={hero.cta.primary.href}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
            >
              <LowPolyCoralBg />
              <span className="relative">{hero.cta.primary.label}</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-500 ease-in-out" />
            </Link>
            <Link
              href={hero.cta.secondary.href}
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40"
            >
              {hero.cta.secondary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
           CLIENTS — marquee logos
           Desktop: single row right-to-left
           Mobile: two rows, opposite directions
           ══════════════════════════════════════════════ */}
      <div className="relative z-10 py-8 md:py-10">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <p className="mb-5 text-center text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Ils nous font confiance
          </p>
          <div className="relative overflow-hidden transition-colors duration-500 ease-in-out dark:rounded-2xl dark:bg-foreground/95 dark:py-4">
            {/* Left fade mask */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background via-background/85 to-transparent dark:from-foreground/95 dark:via-foreground/80 md:w-32"
              aria-hidden
            />
            {/* Right fade mask */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background via-background/85 to-transparent dark:from-foreground/95 dark:via-foreground/80 md:w-32"
              aria-hidden
            />

            {/* Desktop: single row */}
            <div className="hidden md:block">
              <div className="marquee-track flex items-center gap-x-16">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                  <LogoItem key={`${logo.name}-d-${i}`} logo={logo} />
                ))}
              </div>
            </div>

            {/* Mobile: two rows with different logos, opposite scroll directions */}
            {(() => {
              const mid = Math.ceil(CLIENT_LOGOS.length / 2);
              const row1 = CLIENT_LOGOS.slice(0, mid);
              const row2 = CLIENT_LOGOS.slice(mid);
              return (
                <div className="flex flex-col gap-4 md:hidden">
                  <div className="marquee-track flex items-center gap-x-10">
                    {[...row1, ...row1, ...row1].map((logo, i) => (
                      <LogoItem key={`${logo.name}-m1-${i}`} logo={logo} mobile />
                    ))}
                  </div>
                  <div className="marquee-track-reverse flex items-center gap-x-10">
                    {[...row2, ...row2, ...row2].map((logo, i) => (
                      <LogoItem key={`${logo.name}-m2-${i}`} logo={logo} mobile />
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
