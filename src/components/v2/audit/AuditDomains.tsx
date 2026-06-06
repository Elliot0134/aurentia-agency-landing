import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card, cardClasses, cardInteractiveClasses } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";
import { auditData } from "@/data/v2/audit";

const { domains } = auditData;

export function AuditDomains() {
  return (
    <SectionContainer
      id="domaines"
      eyebrow={domains.eyebrow}
      title={domains.title}
      subtitle={domains.subtitle}
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {domains.items.map((domain) => {
          const Icon = domain.icon;
          if (domain.featured) {
            return (
              <div
                key={domain.title}
                className="flex flex-col rounded-3xl bg-foreground p-7 text-background md:p-8"
              >
                {domain.badge && (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-accent-primary/25 px-3 py-1 text-sm font-semibold uppercase tracking-[0.1em] text-accent-primary">
                    {domain.badge}
                  </span>
                )}
                <span className="flex size-12 items-center justify-center rounded-2xl bg-background/15">
                  <Icon className="size-6 text-accent-primary" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-heading text-xl">{domain.title}</h3>
                <p className="mt-3 text-sm text-background/75 md:text-base">{domain.description}</p>
              </div>
            );
          }
          return (
            <Card
              key={domain.title}
              className={cn(cardClasses, cardInteractiveClasses, "flex flex-col p-7 md:p-8")}
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-foreground/5">
                <Icon className="size-6 text-foreground/80" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 font-heading text-xl text-foreground">{domain.title}</h3>
              <p className="mt-3 text-sm text-foreground/65 md:text-base">{domain.description}</p>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
