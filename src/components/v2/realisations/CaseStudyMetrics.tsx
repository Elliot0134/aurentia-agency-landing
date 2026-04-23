"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import type { ProjectMetric } from "@/data/realisations/schemas";

type Props = {
  metrics: ProjectMetric[];
};

/**
 * Parses "150+", "12K+", "3min 20s" into a numeric part + prefix/suffix
 * so we can animate pure numbers but keep the original string when no
 * sensible number can be extracted.
 */
function splitMetric(value: string) {
  const match = value.match(/^([^\d-]*)(-?[\d.,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, rawNumber, suffix] = match;
  const num = Number(rawNumber.replace(/,/g, "."));
  if (!Number.isFinite(num)) return null;
  return { prefix, num, suffix };
}

function MetricCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const parsed = splitMetric(value);
  const [display, setDisplay] = useState<string>(parsed ? `${parsed.prefix}0${parsed.suffix}` : value);

  useEffect(() => {
    if (!parsed) return;
    if (!inView) return;
    const controls = animate(0, parsed.num, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const hasDecimal = parsed.num % 1 !== 0;
        const rendered = hasDecimal ? latest.toFixed(1) : Math.round(latest).toString();
        setDisplay(`${parsed.prefix}${rendered}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, parsed, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

export function CaseStudyMetrics({ metrics }: Props) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <section id="resultats" className="flex flex-col gap-10 scroll-mt-28">
      <header className="flex flex-col gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Résultats
        </p>
        <h2 className="font-heading text-3xl tracking-tight text-foreground md:text-4xl">
          Ce que ça a donné
        </h2>
      </header>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {metrics.map((metric, i) => (
          <div
            key={`${metric.label}-${i}`}
            className="flex flex-col gap-2 rounded-[1.5rem] bg-background-surface p-6 transition-all duration-700 ease-in-out hover:-translate-y-1"
          >
            <p className="font-heading text-4xl text-foreground md:text-5xl">
              <MetricCounter value={metric.value} />
            </p>
            <p className="text-sm font-medium text-foreground">{metric.label}</p>
            {metric.context && (
              <p className="text-sm text-foreground/60">{metric.context}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
