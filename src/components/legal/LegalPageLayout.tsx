"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { SectionBackground } from "@/components/ui/SectionBackground";
import { LegalToc, type TocItem } from "./LegalToc";

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  toc: TocItem[];
  children: React.ReactNode;
  className?: string;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  toc,
  children,
  className,
}: LegalPageLayoutProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current.children,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.inOut",
        stagger: 0.15,
      }
    );
  }, { scope: headerRef });

  return (
    <div className={cn("py-20 md:py-32", className)}>
      {/* Decorative background — subtle ambre orb + grid */}
      <div className="relative">
        <SectionBackground
          orbs={[
            {
              color: "ambre",
              position: "top-[5%] right-[10%]",
              size: "w-[500px] h-[500px]",
              opacity: "[0.04]",
            },
          ]}
          showGrid gridOpacity={0.2} gridFadeDirection="bottom"
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-8 lg:max-w-5xl">
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {title}
          </h1>
          <p className="text-sm text-foreground/50 mt-3">
            Dernière mise à jour : {lastUpdated}
          </p>
        </div>

        {/* Mobile ToC */}
        <div className="lg:hidden">
          <LegalToc items={toc} />
        </div>

        {/* Desktop layout: sidebar + content */}
        <div className="lg:flex lg:gap-12">
          {/* Desktop ToC sidebar */}
          <div className="hidden lg:block">
            <LegalToc items={toc} />
          </div>

          {/* Content */}
          <div className="flex-1 max-w-3xl space-y-16">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export type { TocItem };
