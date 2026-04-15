// src/app/v2/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NavbarV2 } from "@/components/v2/layout/NavbarV2";
import { FooterV2 } from "@/components/v2/layout/FooterV2";

export const metadata: Metadata = {
  title: {
    default: "Aurentia Agency",
    template: "%s | Aurentia Agency",
  },
  description: "L'IA dans vos produits. L'IA dans votre quotidien.",
};

export default function V2Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased" data-v2-root>
      <NavbarV2 />
      <main className="flex flex-col">{children}</main>
      <FooterV2 />
    </div>
  );
}
