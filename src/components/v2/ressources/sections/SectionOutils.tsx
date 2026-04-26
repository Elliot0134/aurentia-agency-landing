// src/components/v2/ressources/sections/SectionOutils.tsx
import { ExternalLink, Star } from "lucide-react";
import { tools } from "@/data/v2/vibe-coding";
import { cn } from "@/lib/utils";

export function SectionOutils() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-foreground/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-foreground/10 bg-foreground/[0.04]">
            <th className="px-4 py-3 font-semibold text-foreground">Outil</th>
            <th className="px-4 py-3 font-semibold text-foreground">Paradigme</th>
            <th className="px-4 py-3 font-semibold text-foreground">Prix</th>
            <th className="px-4 py-3 font-semibold text-foreground">Sweet spot</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((t) => (
            <tr
              key={t.name}
              className={cn(
                "border-b border-foreground/10 transition-colors duration-500 ease-in-out last:border-0 hover:bg-foreground/[0.03]",
                t.hero && "bg-accent-primary/[0.06]"
              )}
            >
              <td className="px-4 py-3.5">
                <a
                  href={t.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-foreground transition-colors duration-500 ease-in-out hover:text-accent-primary"
                >
                  {t.name}
                  {t.hero && <Star className="size-3.5 fill-accent-primary text-accent-primary" aria-hidden />}
                  <ExternalLink className="size-3 opacity-50" aria-hidden />
                </a>
              </td>
              <td className="px-4 py-3.5 text-foreground/65">{t.paradigm}</td>
              <td className="px-4 py-3.5 text-foreground/65">{t.pricing}</td>
              <td className="px-4 py-3.5 text-foreground/75">{t.strength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
