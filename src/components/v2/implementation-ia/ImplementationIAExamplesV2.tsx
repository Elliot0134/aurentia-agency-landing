// src/components/v2/implementation-ia/ImplementationIAExamplesV2.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { solutionsIaImplementationData } from "@/data/v2/solutions-ia-implementation";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

type WrapperProps = {
  href?: string;
  children: ReactNode;
};

function Wrapper({ href, children }: WrapperProps) {
  if (href) {
    return (
      <Link href={href} className="group block">
        {children}
      </Link>
    );
  }
  return <div className="group block">{children}</div>;
}

/**
 * Examples grid — 4-column image grid showcasing recent implementations.
 * Cards use the v2 chrome (bg-background, theme-aware border) with a soft
 * hover scale on the image.
 */
export function ImplementationIAExamplesV2() {
  const { examples } = solutionsIaImplementationData;

  if (!examples.items.length) return null;

  return (
    <SectionContainer
      id="examples"
      title={examples.title}
      subtitle="Quelques missions récentes — équipes, process, résultats."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {examples.items.map((item, idx) => (
          <BlurReveal key={`${item.title}-${idx}`} delay={idx * 0.08}>
            <Wrapper href={item.href}>
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10 bg-background transition-colors duration-500 ease-in-out group-hover:border-foreground/25",
                )}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <p className="mt-3 text-base font-medium text-foreground/80">
                {item.title}
              </p>
            </Wrapper>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
