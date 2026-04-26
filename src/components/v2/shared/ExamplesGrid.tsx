// src/components/v2/shared/ExamplesGrid.tsx
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "./SectionContainer";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { cn } from "@/lib/utils";

type ExamplesGridProps = {
  data: SubPageData["examples"];
  subtitle?: string;
  id?: string;
  className?: string;
};

type ItemWrapperProps = {
  href?: string;
  children: ReactNode;
};

function ItemWrapper({ href, children }: ItemWrapperProps) {
  if (href) {
    return (
      <Link href={href} className="group block">
        {children}
      </Link>
    );
  }
  return <div className="group block">{children}</div>;
}

export function ExamplesGrid({
  data,
  subtitle,
  id = "examples",
  className,
}: ExamplesGridProps) {
  return (
    <SectionContainer
      id={id}
      title={data.title}
      subtitle={subtitle}
      className={className}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item, idx) => (
          <BlurReveal key={idx} delay={idx * 0.08}>
            <ItemWrapper href={item.href}>
              <div
                className={cn(
                  "relative aspect-[4/3] overflow-hidden rounded-3xl border border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] transition-colors duration-500 ease-in-out group-hover:border-foreground/25"
                )}
              >
                {item.imageUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                    <div
                      aria-hidden
                      className="absolute -top-1/3 -left-1/4 h-[140%] w-[80%] rounded-full bg-accent/15 blur-3xl opacity-70 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                    />
                    <div
                      aria-hidden
                      className="absolute -bottom-1/3 -right-1/4 h-[120%] w-[70%] rounded-full bg-foreground/[0.06] blur-3xl"
                    />
                    <span className="relative px-6 text-center font-serif text-2xl leading-tight tracking-tight text-foreground/85 transition-transform duration-700 ease-in-out group-hover:scale-[1.02]">
                      {item.title.split(" — ")[0]}
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-3 text-base font-medium text-foreground/80">{item.title}</p>
            </ItemWrapper>
          </BlurReveal>
        ))}
      </div>
    </SectionContainer>
  );
}
