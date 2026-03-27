"use client";

import { Section } from "@/components/ui/Section";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { conciergeriesComparisonContent } from "@/data/conciergeries-content";
import { Check, X } from "lucide-react";

function CellValue({
  val,
  isAurentia,
}: {
  val: string | boolean;
  isAurentia: boolean;
}) {
  if (typeof val === "boolean") {
    return val ? (
      <Check
        className={
          isAurentia
            ? "w-5 h-5 text-accent-primary mx-auto"
            : "w-5 h-5 text-foreground/40 mx-auto"
        }
      />
    ) : (
      <X className="w-5 h-5 text-red-500/50 mx-auto" />
    );
  }
  return (
    <span className={isAurentia ? "font-bold text-foreground" : ""}>
      {val}
    </span>
  );
}

export function ConciergerieComparison() {
  const { title, subtitle, columns, rows, note } =
    conciergeriesComparisonContent;
  const aurentiaIdx = columns.length - 1;

  return (
    <Section theme="dark-alt-2" className="py-32 relative">
      {/* Orbs — high luminosity */}
      <SectionBackground
        orbs={[
          { color: "orange", position: "top-[20%] right-[10%]", size: "w-[400px] h-[400px]", opacity: "[0.10]" },
          { color: "ambre", position: "bottom-[30%] left-[15%]", size: "w-[350px] h-[350px]", opacity: "[0.07]" },
        ]}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <TextReveal
            text={title}
            elementType="h2"
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 justify-center"
          />
          <BlurReveal delay={0.1}>
            <p className="text-foreground/60 text-lg">{subtitle}</p>
          </BlurReveal>
        </div>

        {/* Desktop table (hidden on mobile) */}
        <BlurReveal delay={0.2} className="hidden lg:block overflow-x-auto pb-8">
          <div className="min-w-[800px] w-full max-w-5xl mx-auto bg-background rounded-3xl border border-foreground/10 overflow-hidden">
            {/* Column headers */}
            <div className="grid grid-cols-5 p-6 border-b border-foreground/10 bg-foreground/5">
              <div className="col-span-1" />
              {columns.map((col, idx) => (
                <div
                  key={idx}
                  className={`col-span-1 text-center font-bold transition-colors duration-500 ${
                    idx === aurentiaIdx
                      ? "text-accent-primary text-lg"
                      : "text-foreground/50"
                  }`}
                >
                  {col}
                </div>
              ))}
            </div>

            {/* Rows — Aurentia column highlighted bg + row hover */}
            {rows.map((row, rIdx) => (
              <BlurReveal key={rIdx} delay={rIdx * 0.05}>
                <div
                  className={`grid grid-cols-5 p-6 border-b border-foreground/5 items-center transition-all duration-500 ease-in-out hover:bg-foreground/[0.04] ${
                    rIdx % 2 !== 0 ? "bg-foreground/[0.02]" : ""
                  }`}
                >
                  <div className="col-span-1 font-medium text-foreground/50">
                    {row.label}
                  </div>
                  {row.values.map((val, vIdx) => (
                    <div
                      key={vIdx}
                      className={`col-span-1 flex justify-center text-center transition-colors duration-500 ${
                        vIdx === aurentiaIdx
                          ? "font-bold text-foreground bg-accent-primary/5 rounded-lg py-1 -my-1"
                          : "text-foreground/40"
                      }`}
                    >
                      <CellValue val={val} isAurentia={vIdx === aurentiaIdx} />
                    </div>
                  ))}
                </div>
              </BlurReveal>
            ))}
          </div>
        </BlurReveal>

        {/* Mobile cards (visible only on mobile) */}
        <div className="lg:hidden flex flex-col gap-6">
          {columns.map((col, colIdx) => {
            const isAurentia = colIdx === aurentiaIdx;
            return (
              <BlurReveal key={colIdx} delay={colIdx * 0.1}>
                <div
                  className={`rounded-2xl border p-6 transition-all duration-500 ${
                    isAurentia
                      ? "border-accent-primary/40 bg-accent-primary/5"
                      : "border-foreground/10 bg-foreground/[0.02]"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold mb-4 ${
                      isAurentia ? "text-accent-primary" : "text-foreground"
                    }`}
                  >
                    {col}
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {rows.map((row, rIdx) => (
                      <li
                        key={rIdx}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-foreground/50 text-sm">
                          {row.label}
                        </span>
                        <span
                          className={`text-sm text-right ${
                            isAurentia
                              ? "font-bold text-foreground"
                              : "text-foreground/60"
                          }`}
                        >
                          <CellValue
                            val={row.values[colIdx]}
                            isAurentia={isAurentia}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurReveal>
            );
          })}
        </div>

        {/* Note */}
        {note && (
          <BlurReveal delay={0.4}>
            <p className="text-center text-foreground/40 mt-12 max-w-2xl mx-auto italic">
              {note}
            </p>
          </BlurReveal>
        )}
      </div>
    </Section>
  );
}
