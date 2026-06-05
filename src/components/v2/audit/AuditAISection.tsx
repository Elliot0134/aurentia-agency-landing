import { Check } from "lucide-react";
import { Card } from "@/components/v2/shared/Card";
import { auditData } from "@/data/v2/audit";

const { ai } = auditData;

export function AuditAISection() {
  return (
    <section id="ia" className="w-full px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-14 text-background md:px-14 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Démo chat IA */}
            <Card className="border-background/15 bg-background/[0.06] p-6 dark:border-background/15 dark:bg-background/[0.06] md:p-8">
              <div className="flex gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background/15 text-sm font-bold text-accent-primary">
                  Vous
                </span>
                <p className="rounded-2xl bg-accent-primary/15 px-4 py-3 text-sm text-background/85 md:text-base">
                  {ai.demo.question}
                </p>
              </div>
              <div className="mt-4 flex gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background/15 text-sm font-bold text-accent-primary">
                  IA
                </span>
                <div className="rounded-2xl bg-background/[0.08] px-4 py-3 text-sm text-background/80 md:text-base">
                  {ai.demo.answerIntro}
                  <br />
                  {ai.demo.competitors.map((c) => (
                    <span key={c} className="block">
                      → <b className="text-background">{c}</b>
                    </span>
                  ))}
                  <span className="mt-1 block text-red-300">{ai.demo.missing}</span>
                </div>
              </div>
              <p className="mt-5 border-t border-background/15 pt-4 text-sm text-background/55">
                {ai.demo.footnote}
              </p>
            </Card>

            {/* Texte */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
                {ai.eyebrow}
              </p>
              <h2 className="mt-4 font-heading text-3xl leading-tight md:text-4xl">{ai.title}</h2>
              <p className="mt-5 text-base text-background/75 md:text-lg">{ai.description}</p>
              <ul className="mt-6 flex flex-col gap-4">
                {ai.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-background/80 md:text-base">
                    <Check className="mt-0.5 size-5 shrink-0 text-accent-primary" strokeWidth={2.2} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
