"use client";

import Link from "next/link";

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <section className="w-full min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-foreground/5 text-foreground/60">
          Bientôt disponible
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-foreground/60 max-w-md mx-auto">
            {description}
          </p>
        )}
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-2xl bg-foreground text-background hover:opacity-90 transition-all duration-200"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
