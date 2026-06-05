import Link from "next/link";
import { Check } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { cn } from "@/lib/utils";
import { auditData, STRIPE_PAYMENT_LINK } from "@/data/v2/audit";

const { pricing } = auditData;

function FeatureItem({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-foreground/75 md:text-base">
      <Check className="mt-0.5 size-4 shrink-0 text-accent-primary" strokeWidth={2.4} />
      {label}
    </li>
  );
}

export function AuditPricing() {
  return (
    <SectionContainer
      id="pricing"
      eyebrow={pricing.eyebrow}
      title={pricing.title}
      subtitle={pricing.subtitle}
    >
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {/* Pré-audit gratuit */}
        <Card className="relative flex flex-col p-8 ring-2 ring-accent-primary">
          <span className="absolute -top-3 left-8 rounded-full bg-accent-primary px-3 py-1 text-sm font-semibold uppercase tracking-[0.08em] text-accent-foreground">
            {pricing.free.ribbon}
          </span>
          <p className="font-heading text-xl text-foreground">{pricing.free.title}</p>
          <p className="mt-2 font-heading text-4xl text-accent-primary">{pricing.free.price}</p>
          <p className="mt-1 text-sm text-foreground/55">{pricing.free.subtitle}</p>
          <ul className="mt-6 flex flex-1 flex-col gap-3">
            {pricing.free.features.map((f) => (
              <FeatureItem key={f} label={f} />
            ))}
          </ul>
          <Link
            href="#preaudit"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-accent-primary px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-colors duration-500 ease-in-out hover:bg-accent-secondary md:text-base"
          >
            {pricing.free.ctaLabel}
          </Link>
        </Card>

        {/* Audit complet 99 € */}
        <Card className="flex flex-col p-8">
          <p className="font-heading text-xl text-foreground">{pricing.paid.title}</p>
          <p className="mt-2 font-heading text-4xl text-foreground">
            {pricing.paid.price}
            <span className="align-super text-2xl">{pricing.paid.currency}</span>
            <span className="ml-1 align-super text-base font-medium text-foreground/45">HT</span>
          </p>
          <p className="mt-1 text-sm text-foreground/55">{pricing.paid.subtitle}</p>
          <ul className="mt-6 flex flex-1 flex-col gap-3">
            {pricing.paid.features.map((f) => (
              <FeatureItem key={f} label={f} />
            ))}
          </ul>
          <a
            href={STRIPE_PAYMENT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-8 inline-flex w-full items-center justify-center rounded-full border border-foreground/20 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40 md:text-base",
            )}
          >
            {pricing.paid.ctaLabel}
          </a>
        </Card>
      </div>

      <p className="mt-8 text-center text-sm text-foreground/55">{pricing.reassurance}</p>
    </SectionContainer>
  );
}
