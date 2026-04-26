import { Rocket, Clock, ShieldCheck, Heart } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type Stat = {
  icon: typeof Rocket;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sub: string;
};

const stats: Stat[] = [
  {
    icon: Rocket,
    value: 15,
    suffix: "+",
    label: "SaaS livrés",
    sub: "MVP, refontes, outils internes",
  },
  {
    icon: Clock,
    value: 2,
    suffix: " sem.",
    label: "Délai moyen MVP",
    sub: "Du brief à la production",
  },
  {
    icon: ShieldCheck,
    value: 100,
    suffix: "%",
    label: "Code propriétaire",
    sub: "Aucun vendor lock-in",
  },
  {
    icon: Heart,
    value: 0,
    label: "Client churné",
    sub: "Tous nos clients ont gardé leur prod",
  },
];

export function SaaSStatsV2() {
  return (
    <SectionContainer
      id="stats"
      eyebrow="Les chiffres qui parlent"
      title="Pas de promesses creuses. Que des résultats."
      className="py-20 md:py-24"
      titleClassName="text-3xl md:text-4xl lg:text-5xl mb-4 font-normal"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-3xl border border-transparent bg-background-surface dark:border-foreground/10 dark:bg-foreground/[0.04] p-8 transition-colors duration-500 ease-in-out hover:border-accent-primary/40"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 group-hover:bg-accent-primary group-hover:text-white">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-heading text-5xl font-bold leading-none tracking-tight text-foreground md:text-6xl">
                  {stat.value}
                  {stat.suffix ?? ""}
                </span>
                <span className="font-heading text-base font-semibold text-foreground/85 md:text-lg">
                  {stat.label}
                </span>
              </div>
              <p className="text-base text-foreground/55">{stat.sub}</p>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
