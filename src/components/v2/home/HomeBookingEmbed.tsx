// src/components/home/HomeBookingEmbed.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlurReveal } from "@/components/animations/BlurReveal";

const CAL_LINK = "elliot-estrade-ixfuya/appel-decouverte";
const CAL_NAMESPACE = "appel-decouverte-home";

export function HomeBookingEmbed() {
  const embedWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    };
    init();
  }, []);

  // Refresh ScrollTrigger when the Cal embed resizes (calendar → booking form)
  // so triggers below this section stay aligned after the layout shift.
  useEffect(() => {
    const el = embedWrapperRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="rdv-embed"
      className="w-full px-4 py-6 md:px-6 md:py-8"
      style={{ scrollMarginTop: "96px" }}
    >
      <div className="mx-auto w-full max-w-[1400px] rounded-[2.5rem] bg-accent-primary px-4 pt-16 pb-8 sm:px-6 md:px-12 md:pt-24 md:pb-0">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <BlurReveal>
            <h2 className="font-heading text-4xl tracking-tight text-white md:text-5xl lg:text-6xl">
              Réservez votre appel découverte
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.05}>
            <p className="mt-5 text-base text-white/80 md:text-lg">
              Ou écrivez-nous via le{" "}
              <Link
                href="/contact"
                className="underline underline-offset-4 transition-opacity duration-500 ease-in-out hover:opacity-80"
              >
                formulaire de contact
              </Link>
              .
            </p>
          </BlurReveal>

          <div ref={embedWrapperRef} className="mt-8 w-full" style={{ minHeight: "640px" }}>
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              style={{ width: "100%", display: "block" }}
              config={{
                layout: "month_view",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
