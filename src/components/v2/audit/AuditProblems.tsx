import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { auditData } from "@/data/v2/audit";

const { problems } = auditData;

export function AuditProblems() {
  return (
    <SectionContainer
      id="probleme"
      eyebrow={problems.eyebrow}
      title={problems.title}
      subtitle={problems.subtitle}
    >
      <div className="grid gap-6 md:grid-cols-3">
        {problems.items.map((item) => (
          <Card key={item.title} className="p-7 md:p-8">
            <p className="font-heading text-4xl text-accent-primary md:text-5xl">{item.stat}</p>
            <h3 className="mt-4 font-heading text-xl text-foreground">{item.title}</h3>
            <p className="mt-3 text-sm text-foreground/65 md:text-base">{item.description}</p>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
