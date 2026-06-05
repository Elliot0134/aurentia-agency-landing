import { Check } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";
import { auditData } from "@/data/v2/audit";

const { deliverables } = auditData;

export function AuditDeliverables() {
  return (
    <SectionContainer
      id="livrables"
      eyebrow={deliverables.eyebrow}
      title={deliverables.title}
      subtitle={deliverables.subtitle}
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Liste livrables */}
        <ul className="flex flex-col">
          {deliverables.items.map((item) => (
            <li
              key={item.title}
              className="flex gap-4 border-b border-dashed border-foreground/10 py-4 last:border-b-0"
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-primary/10">
                <Check className="size-4 text-accent-primary" strokeWidth={2.4} />
              </span>
              <div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 text-sm text-foreground/60">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Mock barres par axe */}
        <Card className="p-7 md:p-8">
          <div className="mb-5 flex items-center justify-between border-b border-foreground/10 pb-3 text-sm text-foreground/55">
            <span>
              <span className="font-semibold text-foreground">Score par axe</span> — état actuel
            </span>
            <span>/10</span>
          </div>
          <div className="flex flex-col gap-4">
            {deliverables.axes.map((axis) => (
              <div key={axis.label} className="flex items-center gap-3 text-sm">
                <span className="w-28 shrink-0 font-medium text-foreground">{axis.label}</span>
                <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                  <span
                    className="block h-full rounded-full bg-accent-primary transition-[width] duration-700 ease-in-out"
                    style={{ width: `${axis.current * 10}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right tabular-nums text-foreground/55">
                  {axis.current.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-foreground/10 pt-3 text-sm text-foreground/50">
            Extrait reconstitué d&apos;un audit réel Aurentia.
          </p>
        </Card>
      </div>
    </SectionContainer>
  );
}
