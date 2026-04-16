// src/components/v2/subpage/SubPageExamples.tsx
import Link from "next/link";
import type { ReactNode } from "react";
import type { SubPageData } from "@/data/v2/types";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";

type SubPageExamplesProps = {
  data: SubPageData["examples"];
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

export function SubPageExamples({ data }: SubPageExamplesProps) {
  return (
    <SectionContainer id="examples" eyebrow="Exemples" title={data.title} className="bg-background-surface">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.items.map((item, idx) => (
          <ItemWrapper key={idx} href={item.href}>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-transparent dark:border-foreground/10 bg-background-surface dark:bg-foreground/[0.04] transition-colors duration-500 ease-in-out dark:group-hover:border-foreground/25">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-base font-medium text-foreground/80">{item.title}</p>
          </ItemWrapper>
        ))}
      </div>
    </SectionContainer>
  );
}
