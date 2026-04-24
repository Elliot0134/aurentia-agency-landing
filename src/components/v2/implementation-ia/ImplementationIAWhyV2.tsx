// src/components/v2/implementation-ia/ImplementationIAWhyV2.tsx
import {
  Target,
  Zap,
  TrendingUp,
  ShieldCheck,
  GraduationCap,
  Headphones,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";

type WhyItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const ITEMS: WhyItem[] = [
  {
    icon: Target,
    title: "Cas d'usage pragmatiques",
    description:
      "On n'implante pas de l'IA pour faire joli. Chaque skill livré répond à un problème concret de votre équipe — qualifié au cadrage, mesurable après livraison.",
  },
  {
    icon: Zap,
    title: "Livraison en 2 à 6 semaines",
    description:
      "On découpe en sprints courts et on livre vite. Un cas d'usage simple tourne en production sous 2 semaines, un agent complet sous 6.",
  },
  {
    icon: TrendingUp,
    title: "ROI mesurable",
    description:
      "Métriques de succès définies en amont — temps gagné, taux d'automatisation, satisfaction — et reporting partagé après livraison. Vous saurez si ça marche.",
  },
  {
    icon: ShieldCheck,
    title: "Données privées & RGPD",
    description:
      "API keys privées, intégrations chiffrées, respect RGPD. Déploiement Claude Enterprise possible pour les besoins les plus stricts. Vos données restent sous votre contrôle.",
  },
  {
    icon: GraduationCap,
    title: "Équipe formée, pas captive",
    description:
      "On forme vos utilisateurs ET vos admins, documentation complète, code sur votre infra. Vous pouvez faire évoluer en interne — aucun enfermement.",
  },
  {
    icon: Headphones,
    title: "Support 3 mois inclus",
    description:
      "3 mois de support prioritaire post-livraison — ajustements, bugs, questions. Au-delà, retainers ou interventions à la demande selon vos besoins.",
  },
];

export function ImplementationIAWhyV2() {
  return (
    <SectionContainer
      id="why"
      title="Pourquoi choisir Aurentia pour votre implémentation"
      subtitle="Ce qui nous différencie des autres agences IA. Pas des promesses — des engagements concrets."
      className="py-32 md:py-40"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="group flex flex-col gap-4 rounded-2xl p-7 transition-all duration-500 ease-in-out dark:hover:border-foreground/20 hover:shadow-sm"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-accent-primary/10 text-accent-primary transition-colors duration-500 ease-in-out group-hover:bg-accent-primary group-hover:text-white">
                <Icon className="size-5" strokeWidth={1.8} />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="text-base text-foreground/65">{item.description}</p>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
