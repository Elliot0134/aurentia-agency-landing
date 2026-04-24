// src/components/v2/saas/SaaSWhyV2.tsx
import {
  Rocket,
  ShieldCheck,
  Layers,
  Code2,
  Sparkles,
  GitBranch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { Card } from "@/components/v2/shared/Card";

type Item = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const ITEMS: Item[] = [
  {
    icon: Rocket,
    title: "MVP en 1 à 2 semaines",
    description:
      "Pas de roadmap à 6 mois. On livre un MVP utilisable et déployé en production dès la deuxième semaine — prêt à signer vos premiers utilisateurs.",
  },
  {
    icon: ShieldCheck,
    title: "Production-ready dès J1",
    description:
      "Auth, base de données, paiements, emails, monitoring, sécurité : tout est en place dès la première version. Pas de bricolage à refaire ensuite.",
  },
  {
    icon: Layers,
    title: "Stack moderne et pérenne",
    description:
      "Next.js, TypeScript, Supabase, Stripe, Vercel. Une stack éprouvée, rapide à itérer, facile à reprendre par n'importe quel développeur sénior.",
  },
  {
    icon: Code2,
    title: "Code source à 100% à vous",
    description:
      "Votre GitHub, vos comptes Supabase/Vercel/Stripe. Aucun lock-in, aucune dépendance à nous. Vous partez avec tout du jour au lendemain si besoin.",
  },
  {
    icon: Sparkles,
    title: "Delivery augmenté par l'IA",
    description:
      "Claude dans notre flow quotidien. C'est ce qui nous permet de livrer 3× plus vite qu'une agence classique sans compromis sur la qualité de code.",
  },
  {
    icon: GitBranch,
    title: "Sécurité & scalabilité",
    description:
      "RLS Supabase, rate-limiting, validation côté serveur, logs. On écrit le code que vous espérez trouver en prod — pas celui qui va casser à 100 users.",
  },
];

export function SaaSWhyV2() {
  return (
    <SectionContainer
      id="why"
      title="Pourquoi confier votre SaaS à Aurentia"
      subtitle="Ce qui nous différencie des freelances, des agences classiques et des no-code. Pas des promesses — des engagements concrets."
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
                <Icon className="size-5" strokeWidth={1.5} />
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
