// src/components/v2/home/HomeBookingCTA.tsx
"use client";

import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { BlurReveal } from "@/components/animations/BlurReveal";

export function HomeBookingCTA() {
  const { bookingCta } = homeData;

  return (
    <section id="rdv" className="w-full px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-[1400px] rounded-[2.5rem] bg-background-surface px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <BlurReveal>
          <h2 className="font-heading text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {bookingCta.title}
          </h2>
        </BlurReveal>

        <BlurReveal delay={0.05}>
          <p className="mt-5 max-w-2xl text-base text-foreground/70 md:text-lg">
            {bookingCta.subtitle}
          </p>
        </BlurReveal>

        <BlurReveal delay={0.1}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {bookingCta.signals.map((signal) => {
              const Icon = signal.icon;
              return (
                <li
                  key={signal.label}
                  className="flex items-center gap-2 text-sm text-foreground/70"
                >
                  <Icon className="size-4 text-foreground/50" aria-hidden />
                  <span>{signal.label}</span>
                </li>
              );
            })}
          </ul>
        </BlurReveal>

        <BlurReveal delay={0.15}>
          <a
            href={bookingCta.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-accent-primary px-7 py-3.5 text-base font-semibold text-white transition-all duration-500 ease-in-out hover:bg-accent-primary/90"
          >
            {bookingCta.cta.label}
            <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </a>
        </BlurReveal>
        </div>
      </div>
    </section>
  );
}
