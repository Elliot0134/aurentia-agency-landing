"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { apportCTA } from "@/data/apport-affaires-content";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

const PRIMARY_HREF = "/contact?subject=apporteur-d-affaires";

export function ApportFinalCTA() {
  return (
    <SectionContainer
      id="cta"
      title={apportCTA.title}
      subtitle={apportCTA.subtitle}
      alignHeader="center"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href={PRIMARY_HREF}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-base font-semibold text-background transition-colors duration-500 ease-in-out hover:bg-foreground/90"
          >
            {apportCTA.ctaPrimary}
            <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </Link>

          <a
            href={apportCTA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-base font-semibold text-foreground transition-colors duration-500 ease-in-out hover:border-foreground/40"
          >
            {apportCTA.ctaSecondary}
          </a>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-foreground/65">
          {apportCTA.proofs.map((proof) => (
            <li key={proof} className="inline-flex items-center gap-1.5">
              <Check
                className="size-3.5 text-accent-primary"
                strokeWidth={2.5}
              />
              {proof}
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  );
}
