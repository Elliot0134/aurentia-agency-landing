// src/components/v2/ressources/ResourceArticleLayout.tsx
//
// Layout article-blog réutilisable par toutes les ressources :
//   - Hero (slot) en pleine largeur
//   - Cover image (slot) en-dessous, légèrement débordante
//   - 2 colonnes : TOC sticky à gauche, contenu à droite
//   - Footer (slot) en pleine largeur (ex. "Aller plus loin")
//
// Option `gate` : si fournie, le contenu central est gated par un email
// (le hero, la cover et la TOC restent visibles). Le gate utilise
// `ResourceContentGate` qui flotte un formulaire au-dessus du contenu flouté.

import type { ReactNode } from "react";
import { ResourceContentGate } from "./ResourceContentGate";

type ResourceArticleLayoutProps = {
  hero: ReactNode;
  cover?: ReactNode;
  toc: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Active l'email gate sur le contenu central. */
  gate?: {
    resourceId: string;
    resourceLabel?: string;
  };
};

export function ResourceArticleLayout({
  hero,
  cover,
  toc,
  children,
  footer,
  gate,
}: ResourceArticleLayoutProps) {
  const content = (
    <div className="flex flex-col gap-16 md:gap-20">{children}</div>
  );

  return (
    <>
      {hero}

      {cover && (
        <section className="w-full px-6 md:px-12">
          <div className="mx-auto w-full max-w-[1400px]">{cover}</div>
        </section>
      )}

      <section className="w-full px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-16">
            <div className="min-w-0">{toc}</div>
            <div className="min-w-0">
              {gate ? (
                <ResourceContentGate
                  resourceId={gate.resourceId}
                  resourceLabel={gate.resourceLabel}
                >
                  {content}
                </ResourceContentGate>
              ) : (
                content
              )}
            </div>
          </div>
        </div>
      </section>

      {footer}
    </>
  );
}
