// src/components/v2/ressources/sections/SectionMethode.tsx
import { methodSteps } from "@/data/v2/vibe-coding";

export function SectionMethode() {
  return (
    <ol className="relative flex flex-col gap-3">
      {methodSteps.map((step) => {
        const Icon = step.icon;
        return (
          <li
            key={step.number}
            className="group flex gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 transition-all duration-500 ease-in-out hover:-translate-y-0.5 hover:border-accent-primary/30"
          >
            <div className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary">
              <Icon className="size-5" strokeWidth={1.6} aria-hidden />
              <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border border-foreground/15 bg-background font-mono text-sm font-bold text-foreground/70">
                {step.number.replace("0", "")}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-1.5 pt-0.5">
              <h3 className="text-base font-bold text-foreground md:text-lg">{step.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/65">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
