// src/components/v2/ressources/sections/claude/SectionRisquesClaude.tsx
import { redZones } from "@/data/v2/implementer-claude";

export function SectionRisquesClaude() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-base text-foreground/70 md:text-lg">
        Les <strong className="text-[var(--destructive)]">6 erreurs</strong> qu&apos;on voit le plus chez les
        clients qui se mettent à Claude sans cadre. Lis-les avant de scaler ton usage à toute l&apos;équipe.
      </p>

      <ul className="grid gap-3 md:grid-cols-2">
        {redZones.map((z) => {
          const Icon = z.icon;
          return (
            <li
              key={z.title}
              className="flex items-start gap-3 rounded-2xl border border-[var(--destructive)]/25 bg-[var(--destructive)]/[0.04] p-5"
            >
              <Icon className="mt-0.5 size-5 shrink-0 text-[var(--destructive)]" aria-hidden />
              <div className="flex flex-col gap-1">
                <p className="text-base font-semibold text-foreground">{z.title}</p>
                <p className="text-sm leading-relaxed text-foreground/65">{z.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
