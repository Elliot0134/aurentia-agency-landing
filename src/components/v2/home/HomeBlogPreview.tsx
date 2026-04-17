// src/components/v2/home/HomeBlogPreview.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeData } from "@/data/v2/home";
import { SectionContainer } from "@/components/v2/shared/SectionContainer";
import { SpotlightCard } from "@/components/animations/SpotlightCard";
import { BlurReveal } from "@/components/animations/BlurReveal";
import type { BlogArticlePreview } from "@/data/v2/types";

function formatDateFr(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ArticleCard({ article }: { article: BlogArticlePreview }) {
  return (
    <Link
      href={article.href}
      className="block h-full"
      data-cursor="click"
    >
      <SpotlightCard className="group flex h-full flex-col overflow-hidden p-0 border-0 dark:border hover:translate-y-0">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
          <div className="flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60">
            <span>{article.category}</span>
            <span className="text-foreground/30">·</span>
            <span>{article.readingTime}</span>
          </div>

          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-foreground md:text-xl">
            {article.title}
          </h3>

          <p className="line-clamp-2 text-sm text-foreground/70">
            {article.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between pt-2 text-sm font-mono">
            <span className="text-foreground/50">{formatDateFr(article.date)}</span>
            <span className="flex items-center gap-1 text-foreground/60 transition-all duration-500 ease-in-out group-hover:text-accent-primary group-hover:translate-x-0.5">
              Lire
              <ArrowRight className="size-3.5" />
            </span>
          </div>
        </div>
      </SpotlightCard>
    </Link>
  );
}

export function HomeBlogPreview() {
  const { blogPreview } = homeData;

  return (
    <SectionContainer id="blog" title={blogPreview.title}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5">
        {blogPreview.articles.map((article, idx) => (
          <BlurReveal key={article.slug} delay={idx * 0.1} className="h-full">
            <ArticleCard article={article} />
          </BlurReveal>
        ))}
      </div>

      <BlurReveal delay={0.35}>
        <div className="mt-12 flex justify-center">
          <Link
            href={blogPreview.seeAllCta.href}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background transition-all duration-500 ease-in-out hover:bg-foreground/90"
          >
            {blogPreview.seeAllCta.label}
            <ArrowRight className="size-4 transition-transform duration-500 ease-in-out group-hover:translate-x-1" />
          </Link>
        </div>
      </BlurReveal>
    </SectionContainer>
  );
}
