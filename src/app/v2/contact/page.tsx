// src/app/v2/contact/page.tsx
import type { Metadata } from "next";
import { HomeContactV2 } from "@/components/v2/home/HomeContactV2";

export const metadata: Metadata = {
  title: "Contact",
  description: "Discutons de votre projet. Réponse en moins de 24h.",
};

export default function ContactV2Page() {
  return (
    <>
      <section className="border-b border-foreground/10">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center md:px-12 md:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-primary">
            Contact
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Parlons de votre projet
          </h1>
          <p className="max-w-2xl text-base text-foreground/70 md:text-lg">
            Réponse en moins de 24h. Pas de SDR, pas de pitch — directement avec l&apos;équipe technique.
          </p>
        </div>
      </section>
      <HomeContactV2 />
    </>
  );
}
