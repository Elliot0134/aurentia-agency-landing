// src/components/v2/sites-web/SitesWebExamples.tsx
"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { WipAwareLink } from "@/components/shared/WipModal";

type SitesWebExamplesProps = {
  data: SubPageData["examples"];
};

function Wrapper({ href, children }: { href?: string; children: ReactNode }) {
  if (href) {
    return (
      <WipAwareLink href={href} className="group block h-full">
        {children}
      </WipAwareLink>
    );
  }
  return <div className="group block h-full">{children}</div>;
}

export function SitesWebExamples({ data }: SitesWebExamplesProps) {
  if (data.items.length === 0) return null;

  return (
    <SectionContainer
      id="examples"
      title={data.title}
      subtitle="Quelques projets livrés récemment — cliquez pour voir le détail."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item, idx) => (
          <BlurReveal key={`${item.title}-${idx}`} delay={idx * 0.1}>
            <Wrapper href={item.href}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10 bg-background transition-all duration-500 ease-in-out group-hover:border-foreground/25">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Hover arrow */}
                <div className="pointer-events-none absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 backdrop-blur-sm transition-all duration-500 ease-in-out group-hover:opacity-100">
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
              <p className="mt-3 text-base font-medium text-foreground/80 transition-colors duration-500 ease-in-out group-hover:text-foreground">
                {item.title}
              </p>
            </Wrapper>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
