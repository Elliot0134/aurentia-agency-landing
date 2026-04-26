// src/components/v2/ressources/sections/SectionTips.tsx
import { tips } from "@/data/v2/vibe-coding";
import { cn } from "@/lib/utils";
import { CopyableBlock } from "../CopyableBlock";

export function SectionTips() {
  return (
    <div className="flex flex-col gap-4">
      {tips.map((tip) => {
        const Icon = tip.icon;
        return (
          <article
            key={tip.number}
            className="flex flex-col gap-4 rounded-2xl border border-foreground/10 p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
                <Icon className="size-4" strokeWidth={1.7} aria-hidden />
              </div>
              <h3 className="text-base font-bold text-foreground md:text-lg">{tip.title}</h3>
            </div>

            {tip.extra?.kind === "table" && (
              <div className="overflow-x-auto rounded-xl border border-foreground/10">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-foreground/10 bg-foreground/[0.04]">
                      {tip.extra.headers.map((h) => (
                        <th key={h} className="px-3 py-2.5 font-semibold text-foreground">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tip.extra.rows.map((row, i) => (
                      <tr key={i} className="border-b border-foreground/10 last:border-0">
                        {row.map((cell, j) => (
                          <td
                            key={j}
                            className={cn(
                              "px-3 py-2.5",
                              j === 0 ? "font-semibold text-foreground" : "text-foreground/70"
                            )}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tip.extra?.kind === "list" && (
              <div className="overflow-hidden rounded-xl border border-foreground/10 font-mono">
                {tip.extra.items.map((item, i) => (
                  <div
                    key={item.key}
                    className={cn(
                      "flex flex-col gap-1 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-4",
                      i !== 0 && "border-t border-foreground/10"
                    )}
                  >
                    <span className="inline-flex w-fit items-center rounded-md bg-accent-primary/10 px-2 py-0.5 text-sm font-bold text-accent-primary sm:w-40">
                      {item.key}
                    </span>
                    <span className="text-sm text-foreground/75">{item.value}</span>
                  </div>
                ))}
              </div>
            )}

            {tip.extra?.kind === "code" && (
              <CopyableBlock language={tip.extra.snippet.language} content={tip.extra.snippet.content} />
            )}
          </article>
        );
      })}
    </div>
  );
}
