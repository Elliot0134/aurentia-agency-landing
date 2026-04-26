"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BlurReveal } from "@/components/animations/BlurReveal";

const BAD_HOOK = "Bienvenue sur notre site web.";
const GOOD_HOOK = "Vendez en 7 jours. Ou on vous rembourse.";

export function LandingHookCraft() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Bad hook lifecycle — visible early, fades during the morph window
  const beforeOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.3, 0.5],
    [1, 1, 0],
  );
  const beforeY = useTransform(scrollYProgress, [0.4, 0.5], ["0%", "-22%"]);
  const beforeBlur = useTransform(
    scrollYProgress,
    [0.4, 0.5],
    ["blur(0px)", "blur(14px)"],
  );

  // Strike-through line: draws AFTER the visitor has read the bad hook
  const strikeWidth = useTransform(
    scrollYProgress,
    [0.3, 0.42],
    ["0%", "100%"],
  );
  const strikeOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.32, 0.45, 0.52],
    [0, 1, 1, 0],
  );

  // Good hook lifecycle — settles SHARP and CENTERED well before the
  // headline drifts toward the top of the viewport (≈ progress 0.65+)
  const afterOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.95],
    [0, 1, 1],
  );
  const afterY = useTransform(scrollYProgress, [0.45, 0.58], ["22%", "0%"]);
  const afterBlur = useTransform(
    scrollYProgress,
    [0.45, 0.58],
    ["blur(14px)", "blur(0px)"],
  );

  return (
    <section
      ref={ref}
      id="hook-craft"
      className="relative w-full overflow-hidden"
    >
      {/* Tight height — content stays in viewport during the full morph */}
      <div className="relative min-h-[100vh] flex flex-col items-center justify-center py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center">
            <BlurReveal>
              <p className="mb-8 text-sm font-medium uppercase tracking-widest text-accent-primary">
                Le craft du copywriting
              </p>
            </BlurReveal>

            {/* Headline morph stage — fixed-height area so the layout stays calm */}
            <div className="relative mx-auto flex h-[10rem] max-w-5xl items-center justify-center sm:h-[12rem] md:h-[16rem] lg:h-[20rem]">
              {/* BAD hook */}
              <motion.span
                aria-hidden
                style={{
                  opacity: beforeOpacity,
                  y: beforeY,
                  filter: beforeBlur,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="relative inline-block px-2 text-2xl font-medium italic text-foreground/45 sm:text-3xl md:text-5xl lg:text-6xl">
                  {BAD_HOOK}
                  {/* Animated strike-through */}
                  <motion.span
                    aria-hidden
                    style={{
                      width: strikeWidth,
                      opacity: strikeOpacity,
                    }}
                    className="absolute left-0 top-[55%] h-[3px] origin-left -translate-y-1/2 rounded-full bg-accent-primary md:h-[5px]"
                  />
                </span>
              </motion.span>

              {/* GOOD hook — the real H2 */}
              <motion.h2
                style={{
                  opacity: afterOpacity,
                  y: afterY,
                  filter: afterBlur,
                }}
                className="absolute inset-0 flex items-center justify-center px-2 text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-6xl lg:text-7xl"
              >
                {GOOD_HOOK}
              </motion.h2>
            </div>

            <BlurReveal delay={0.3}>
              <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-foreground/60 md:mt-14 md:text-lg">
                Le hook fait 80% du job. C&apos;est la première seconde qui
                décide si le visiteur reste ou ferme l&apos;onglet. On le
                travaille avec vous, mot après mot, jusqu&apos;à ce qu&apos;il
                claque.
              </p>
            </BlurReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
