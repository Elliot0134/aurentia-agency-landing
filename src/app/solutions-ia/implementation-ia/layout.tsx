// src/app/v2/solutions-ia/implementation-ia/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Implémentation IA — skills custom déployés chez vous",
  description:
    "Skills Claude personnalisés développés et déployés dans votre workflow. Atelier, dev, déploiement, formation, support.",
};

export default function ImplementationIALayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
