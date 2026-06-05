"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { auditData } from "@/data/v2/audit";

const card = auditData.hero.scoreCard;

export function AuditScoreCard() {
  return (
    <div className="rounded-3xl border border-foreground/[0.08] bg-background-surface p-7 dark:border-foreground/10 dark:bg-foreground/[0.04] md:p-9">
      {/* Header — minimal */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground/70">{card.siteName}</p>
        <span className="rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.1em] text-accent-primary">
          {card.tag}
        </span>
      </div>

      {/* Radar — dégradé orange */}
      <div className="mt-4 h-[260px] w-full md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={card.radar} outerRadius="72%" margin={{ top: 8, right: 16, bottom: 8, left: 16 }}>
            <defs>
              <linearGradient id="auditRadarFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--orange-400)" />
                <stop offset="100%" stopColor="var(--orange-600)" />
              </linearGradient>
            </defs>
            <PolarGrid stroke="var(--foreground)" strokeOpacity={0.1} />
            <PolarAngleAxis
              dataKey="axis"
              tick={{ fill: "var(--foreground)", fillOpacity: 0.6, fontSize: 14, fontWeight: 500 }}
            />
            <Radar
              dataKey="value"
              stroke="var(--orange-600)"
              strokeWidth={2}
              fill="url(#auditRadarFill)"
              fillOpacity={0.6}
              isAnimationActive
              animationDuration={900}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Stats — score réduit + manque à gagner */}
      <div className="mt-4 flex items-center justify-between border-t border-foreground/10 pt-5">
        <div>
          <p className="text-sm text-foreground/55">Score global</p>
          <p className="mt-0.5 font-heading text-2xl text-foreground">
            {card.score}
            <span className="text-base text-foreground/45">/100</span>
          </p>
        </div>
        <div className="text-right">
          <p className="font-heading text-2xl text-accent-primary md:text-3xl">{card.lossValue}</p>
          <p className="text-sm text-foreground/55">{card.lossLabel}</p>
        </div>
      </div>
    </div>
  );
}
