// src/components/v2/subpage/SubPageComparison.tsx
"use client";

import { Check, X } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

type Column = { label: string; highlight?: boolean };
type Row = { label: string; values: (string | true | false)[] };

type SubPageComparisonProps = {
  title: string;
  subtitle?: string;
  columns: Column[];
  rows: Row[];
};

function ValueCell({
  value,
  highlight,
}: {
  value: string | true | false;
  highlight?: boolean;
}) {
  if (value === true) {
    return (
      <Check
        className={cn(
          "mx-auto size-5",
          highlight ? "text-accent-primary" : "text-foreground/70",
        )}
        strokeWidth={2.5}
      />
    );
  }
  if (value === false) {
    return <X className="mx-auto size-5 text-foreground/25" strokeWidth={2} />;
  }
  return (
    <span
      className={cn(
        "text-sm md:text-base",
        highlight ? "font-semibold text-foreground" : "text-foreground/65",
      )}
    >
      {value}
    </span>
  );
}

export function SubPageComparison({
  title,
  subtitle,
  columns,
  rows,
}: SubPageComparisonProps) {
  return (
    <SectionContainer
      id="comparison"
      eyebrow="Comparatif"
      title={title}
      subtitle={subtitle}
    >
      {/* Desktop: 4-col grid table */}
      <BlurReveal className="hidden md:block">
        <div className="overflow-hidden rounded-3xl border border-foreground/10">
          {/* Header */}
          <div
            className="grid border-b border-foreground/10 bg-background-surface"
            style={{ gridTemplateColumns: `minmax(12rem,1.4fr) repeat(${columns.length}, 1fr)` }}
          >
            <div className="p-5" />
            {columns.map((col) => (
              <div
                key={col.label}
                className={cn(
                  "p-5 text-center font-heading text-base font-bold",
                  col.highlight
                    ? "bg-accent-primary/10 text-accent-primary"
                    : "text-foreground/70",
                )}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, rIdx) => (
            <div
              key={row.label}
              className={cn(
                "grid items-center border-b border-foreground/10 last:border-b-0",
                rIdx % 2 === 1 && "bg-foreground/[0.02]",
              )}
              style={{ gridTemplateColumns: `minmax(12rem,1.4fr) repeat(${columns.length}, 1fr)` }}
            >
              <div className="p-5 text-sm font-medium text-foreground/80 md:text-base">
                {row.label}
              </div>
              {row.values.map((value, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "p-5 text-center",
                    columns[idx]?.highlight && "bg-accent-primary/[0.04]",
                  )}
                >
                  <ValueCell value={value} highlight={columns[idx]?.highlight} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </BlurReveal>

      {/* Mobile: stacked cards per vendor */}
      <div className="flex flex-col gap-4 md:hidden">
        {columns.map((col, colIdx) => (
          <BlurReveal key={col.label} delay={colIdx * 0.08}>
            <div
              className={cn(
                "rounded-3xl border p-6",
                col.highlight
                  ? "border-accent-primary/40 bg-accent-primary/5"
                  : "border-foreground/10 bg-background-surface",
              )}
            >
              <h3
                className={cn(
                  "mb-4 font-heading text-xl font-bold",
                  col.highlight ? "text-accent-primary" : "text-foreground",
                )}
              >
                {col.label}
              </h3>
              <ul className="flex flex-col gap-3">
                {rows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-start justify-between gap-4"
                  >
                    <span className="text-sm text-foreground/65">
                      {row.label}
                    </span>
                    <span className="shrink-0 text-right">
                      <ValueCell
                        value={row.values[colIdx]!}
                        highlight={col.highlight}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
