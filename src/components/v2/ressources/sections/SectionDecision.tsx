// src/components/v2/ressources/sections/SectionDecision.tsx
"use client";

import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { decisionTree, tools } from "@/data/v2/vibe-coding";
import { cn } from "@/lib/utils";

export function SectionDecision() {
  const [path, setPath] = useState<string[]>(["q1"]);
  const nodes = useMemo(
    () =>
      path
        .map((id) => decisionTree.find((n) => n.id === id))
        .filter((n): n is (typeof decisionTree)[number] => Boolean(n)),
    [path]
  );
  const reset = () => setPath(["q1"]);

  return (
    <div className="flex flex-col gap-3">
      {nodes.map((node, idx) => {
        if (node.type === "question") {
          return (
            <div key={node.id} className="rounded-2xl border border-foreground/10 p-5">
              <p className="mb-3 text-sm text-foreground/55">
                <span className="font-mono text-accent-primary/70">Q{idx + 1}.</span>{" "}
                {node.prompt}
              </p>
              <div className="flex flex-wrap gap-2">
                {node.options.map((opt) => {
                  const isSelected =
                    idx < nodes.length - 1 && nodes[idx + 1] && opt.nextId === nodes[idx + 1].id;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      disabled={idx < nodes.length - 1}
                      onClick={() => setPath([...path.slice(0, idx + 1), opt.nextId])}
                      className={cn(
                        "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-500 ease-in-out",
                        isSelected
                          ? "border-accent-primary bg-accent-primary text-accent-foreground"
                          : "border-foreground/15 bg-background text-foreground/80 hover:border-foreground/40 hover:text-foreground",
                        idx < nodes.length - 1 && !isSelected && "opacity-40"
                      )}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }
        const resultTools = tools.filter((t) => node.tools.includes(t.name));
        return (
          <div
            key={node.id}
            className="flex flex-col gap-4 rounded-2xl border border-accent-primary/40 bg-accent-primary/[0.06] p-5"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
              Notre reco
            </p>
            <h3 className="font-heading text-2xl text-foreground">{node.title}</h3>
            <p className="text-sm leading-relaxed text-foreground/75">{node.reasoning}</p>
            <div className="flex flex-wrap gap-2">
              {resultTools.map((t) => (
                <a
                  key={t.name}
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background transition-opacity duration-500 ease-in-out hover:opacity-85"
                >
                  Aller sur {t.name}
                  <ArrowRight className="size-4" aria-hidden />
                </a>
              ))}
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-sm font-medium text-foreground/70 transition-colors duration-500 ease-in-out hover:text-foreground"
              >
                <RotateCcw className="size-3.5" aria-hidden />
                Recommencer
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
