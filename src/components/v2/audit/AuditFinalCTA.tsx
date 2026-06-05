import { AuditLeadForm } from "./AuditLeadForm";
import { auditData } from "@/data/v2/audit";

const { finalCta } = auditData;

export function AuditFinalCTA() {
  return (
    <section className="w-full px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="overflow-hidden rounded-[2.5rem] bg-foreground px-6 py-14 text-center text-background md:px-14 md:py-20">
          <h2 className="mx-auto max-w-2xl font-heading text-3xl leading-tight md:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-background/75 md:text-lg">
            {finalCta.subtitle}
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <AuditLeadForm source="final-cta" tone="dark" />
          </div>
          <p className="mt-5 text-sm text-background/55">{finalCta.note}</p>
        </div>
      </div>
    </section>
  );
}
