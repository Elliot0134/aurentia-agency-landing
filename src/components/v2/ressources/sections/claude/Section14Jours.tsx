// src/components/v2/ressources/sections/claude/Section14Jours.tsx
import { Check } from "lucide-react";
import { timeline14Days } from "@/data/v2/implementer-claude";

export function Section14Jours() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-3">
        <PhaseCard
          number="Sem. 1"
          title="Setup perso"
          description="Plan, install, CLAUDE.md, Memory, MCP, Skills, premier custom skill. À J+7 tu es équipé."
        />
        <PhaseCard
          number="Sem. 2"
          title="Rollout équipe"
          description="Onboarding, premier projet en mode Claude-augmenté, mesure ROI, garde-fous sécurité."
          highlighted
        />
        <PhaseCard
          number="J14"
          title="Bilan + plan mois 2"
          description="Économie horaire calculée, 3 wins concrets, 3 frustrations identifiées. Décision : solo ou accompagnement."
        />
      </div>

      {/* Timeline list */}
      <div className="relative pl-6 md:pl-8">
        {/* Vertical line */}
        <div
          className="absolute left-2 top-2 bottom-2 w-px bg-foreground/15 md:left-3"
          aria-hidden
        />

        <ol className="flex flex-col gap-6">
          {timeline14Days.map((d) => (
            <li key={d.day} className="relative">
              {/* Dot */}
              <span
                className="absolute -left-[18px] top-1 size-3 rounded-full border-2 border-background bg-accent-primary md:-left-[22px] md:size-4"
                aria-hidden
              />
              <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5 transition-colors duration-500 ease-in-out hover:border-foreground/20">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-heading text-base font-bold text-accent-primary">{d.day}</span>
                  <h4 className="font-heading text-base text-foreground md:text-lg">{d.title}</h4>
                </div>
                <ul className="mt-3 flex flex-col gap-2">
                  {d.tasks.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-foreground/75 md:text-base">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" aria-hidden />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-accent-primary/30 bg-accent-primary/[0.06] p-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
          Tu veux pas le faire seul ?
        </p>
        <p className="mt-2 text-base text-foreground/80 md:text-lg">
          On déploie ce kit chez toi en 14 jours. Audit, install, formation équipe, mesure ROI. Tu repars
          opérationnel.
        </p>
        <a
          href="/contact"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:gap-3 hover:opacity-90"
        >
          Discuter d&apos;un accompagnement
        </a>
      </div>
    </div>
  );
}

function PhaseCard({
  number,
  title,
  description,
  highlighted,
}: {
  number: string;
  title: string;
  description: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        highlighted
          ? "flex flex-col gap-2 rounded-2xl border border-accent-primary/30 bg-accent-primary/[0.05] p-5"
          : "flex flex-col gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-5"
      }
    >
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">{number}</p>
      <h4 className="font-heading text-lg text-foreground">{title}</h4>
      <p className="text-sm leading-relaxed text-foreground/65">{description}</p>
    </div>
  );
}
