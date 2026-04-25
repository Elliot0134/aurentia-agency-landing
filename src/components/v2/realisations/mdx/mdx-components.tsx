import type { ComponentPropsWithoutRef } from "react";
import { MetricGrid } from "./MetricGrid";
import { Gallery } from "./Gallery";
import { BeforeAfter } from "./BeforeAfter";
import { SplitSection } from "./SplitSection";
import { Callout } from "./Callout";

export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="text-3xl font-semibold text-foreground mt-16 mb-6 scroll-mt-28"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="text-xl font-semibold text-foreground mt-10 mb-4"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p
      className="text-base leading-relaxed text-foreground/80 mb-5"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="list-disc pl-6 text-foreground/80 space-y-2 mb-5"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="list-decimal pl-6 text-foreground/80 space-y-2 mb-5"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l-2 border-foreground/30 pl-6 italic text-foreground/70 my-6"
      {...props}
    />
  ),
  MetricGrid,
  Gallery,
  BeforeAfter,
  SplitSection,
  Callout,
};
