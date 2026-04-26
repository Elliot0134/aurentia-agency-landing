// src/components/v2/sites-web/SitesWebFormulesSplits.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { WipAwareLink } from "@/components/shared/WipModal";
import { ArrowRight, Calendar, Check } from "lucide-react";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { sitesWebFormules } from "@/data/v2/sites-web-formules";
import { PriceHT } from "@/components/v2/shared/PriceHT";
import { cn } from "@/lib/utils";

export function SitesWebFormulesSplits() {
  return (
    <section id="formules-details" className="w-full">
      {sitesWebFormules.map((formule, idx) => {
        const reversed = idx % 2 === 1;
        const firstPrice =
          formule.priceRange.split("–")[0]?.trim() || formule.priceRange;
        const isSurface = idx % 2 === 0;
        return (
          <div
            key={formule.slug}
            id={formule.slug}
            className={cn(
              "w-full",
              isSurface
                ? "px-4 py-6 md:px-6 md:py-8"
                : "bg-background px-6 py-20 md:px-12 md:py-28",
            )}
          >
            <div
              className={cn(
                isSurface
                  ? "mx-auto w-full max-w-[1400px] rounded-[2.5rem] bg-background-surface px-6 py-20 md:px-12 md:py-28"
                  : "contents",
              )}
            >
              <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
              {/* Image */}
              <BlurReveal
                className={cn(
                  "order-first",
                  reversed ? "md:order-last" : "md:order-first",
                )}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-foreground/10">
                  <Image
                    src={formule.image.src}
                    alt={formule.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className={cn(
                      "object-cover transition-transform duration-700 ease-in-out hover:scale-[1.03]",
                      formule.comingSoon && "blur-sm scale-[1.02]",
                    )}
                  />
                  {formule.comingSoon && (
                    <>
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundColor:
                            "color-mix(in srgb, var(--background) 35%, transparent)",
                          backdropFilter: "blur(4px)",
                          WebkitBackdropFilter: "blur(4px)",
                        }}
                        aria-hidden
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded-full border border-foreground/15 bg-background-surface px-4 py-2 text-sm font-semibold tracking-wide text-foreground/80 shadow-sm">
                          Coming soon
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </BlurReveal>

              {/* Text */}
              <BlurReveal delay={0.1} className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                    À partir de <PriceHT value={firstPrice} />
                  </p>
                  <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
                    {formule.name}
                  </h2>
                  <p className="text-base text-foreground/70 md:text-lg">
                    {formule.subtitle}
                  </p>
                </div>

                <ul className="flex flex-col gap-3">
                  {formule.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm text-foreground/80 md:text-base"
                    >
                      <Check className="mt-0.5 size-5 shrink-0 text-accent-primary" />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-3">
                  <WipAwareLink
                    href={formule.href}
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
                  >
                    Découvrir
                    <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-0.5" />
                  </WipAwareLink>
                  <Link
                    href={formule.rdvHref}
                    className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-500 ease-in-out hover:bg-accent-primary/90"
                  >
                    <Calendar className="size-4" />
                    Prendre RDV
                  </Link>
                </div>
              </BlurReveal>
            </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
