import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { auditData } from "@/data/v2/audit";

const { whatIs } = auditData;

export function AuditWhatIs() {
  return (
    <SectionContainer
      id="comprendre"
      eyebrow={whatIs.eyebrow}
      title={whatIs.title}
      innerClassName="max-w-5xl"
    >
      {/* Bloc définition — mis en avant, citable */}
      <div className="rounded-3xl border-l-4 border-accent-primary bg-background-surface p-7 dark:bg-foreground/[0.04] md:p-9">
        <p className="text-lg leading-relaxed text-foreground md:text-xl">{whatIs.definition}</p>
      </div>

      {/* Réponses courtes self-contained */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {whatIs.blocks.map((block) => (
          <Card key={block.question} className="p-7">
            <h3 className="font-heading text-lg text-foreground">{block.question}</h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground/70 md:text-base">
              {block.answer}
            </p>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm text-foreground/45">{whatIs.sourceNote}</p>
    </SectionContainer>
  );
}
