"use client";

import { LowPolyMountainCard } from "./LowPolyMountainCard";
import { LowPolyCrystalCard } from "./LowPolyCrystalCard";
import { LowPolyMeshCard } from "./LowPolyMeshCard";
import { LowPolyObject } from "./LowPolyObject";
import { LowPolyBookingCTA } from "./LowPolyBookingCTA";
import { LowPolyBookingCTAMid } from "./LowPolyBookingCTAMid";
import { LowPolyBookingCTALab } from "./LowPolyBookingCTALab";

export function LowPolyPlayground() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Page-level ambient triangles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1600 900">
          <polygon points="0,0 320,0 0,260" fill="currentColor" className="text-foreground" />
          <polygon points="1600,900 1280,900 1600,640" fill="currentColor" className="text-foreground" />
        </svg>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        {/* Header */}
        <header className="mb-20 max-w-3xl">
          <p className="mb-4 inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-primary">
            <span className="block h-px w-10 bg-accent-primary" />
            Playground · Low-Poly
          </p>
          <h1 className="font-heading text-5xl tracking-tight text-foreground md:text-7xl md:leading-[1.02]">
            Surfaces facettées, ombrées par triangle.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-foreground/65 md:text-lg">
            Cartes et containers où chaque facette est un triangle ombré. Direction
            lumineuse cohérente, palette brand alignée sur l&apos;orange du bouton
            « Prendre RDV », interactions au hover qui simulent un basculement de la lumière.
          </p>
        </header>

        {/* Section 00 — Validated version */}
        <Section
          number="00"
          title="Section CTA — validée"
          note="La booking CTA de la home avec mesh facetté brand. Graph-coloring : aucun triangle adjacent ne partage sa nuance. Version de référence à ne plus toucher."
        >
          <LowPolyBookingCTA />
        </Section>

        {/* Section 00a — Mid : version intermédiaire, delta ~6% */}
        <Section
          number="00a"
          title="Section CTA — mid"
          note="Version intermédiaire entre la validée et la smooth. Delta ~6% de luminance entre nuances. Facettes visibles, surface coral dominante."
        >
          <LowPolyBookingCTAMid />
        </Section>

        {/* Section 00b — Lab : version smooth, delta ~3% */}
        <Section
          number="00b"
          title="Section CTA — smooth"
          note="Version la plus douce. Delta ~3% de luminance. Surface presque unie au premier coup d'œil, facettes uniquement visibles à la lecture proche."
        >
          <LowPolyBookingCTALab />
        </Section>

        {/* Section 1 — Mountain landscape cards */}
        <Section
          number="01"
          title="Paysages low-poly"
          note="Crêtes triangulées avec deux faces par segment (lit / shadow). Soleil hexagonal à 6 facettes. Parallaxe au hover : la crête de premier plan descend, le soleil glisse."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <LowPolyMountainCard
              meta="01 — Sites sur-mesure"
              title="Conçus comme des paysages."
              description="Profondeur, hiérarchie, repères. On dessine d'abord le terrain, ensuite on l'habille."
              palette="aurentia"
            />
            <LowPolyMountainCard
              meta="02 — Solutions IA"
              title="Cartographier l'inconnu."
              description="Audit des process, détection des reliefs, priorisation des sommets à conquérir."
              palette="aurentia"
            />
            <LowPolyMountainCard
              meta="03 — SaaS & plateformes"
              title="Architectures qui tiennent debout."
              description="Fondations posées, montées progressives, lignes de crête maîtrisées."
              palette="provence"
            />
          </div>
        </Section>

        {/* Section 2 — Crystal cards */}
        <Section
          number="02"
          title="Cristaux"
          note="Hexagones taillés en facettes : 12 triangles couronne + 6 triangles table. Shading pré-calculé selon une lumière haut-gauche. Léger tilt 3D au hover."
        >
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <LowPolyCrystalCard
              index="I"
              title="Cadrage"
              description="Audit du contexte, des contraintes et des ambitions. Arbitrages partagés."
              palette="aurentia"
            />
            <LowPolyCrystalCard
              index="II"
              title="Build"
              description="Itérations rapides, livraisons hebdomadaires, équipe senior en direct."
              palette="aurentia"
            />
            <LowPolyCrystalCard
              index="III"
              title="Croissance"
              description="Mesure, optimisation, dépassement. La lumière qui traverse la facette."
              palette="aurentia"
            />
          </div>
        </Section>

        {/* Section 3 — Mesh cards */}
        <Section
          number="03"
          title="Maillages"
          note="Mesh Trianglify : grille jitterée, chaque triangle peint d'une nuance d'un dégradé. Lecture du texte garantie par overlay sombre en bas."
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <LowPolyMeshCard
              meta="Article featured"
              title="L'IA est devenue un terrain, pas un outil."
              description="Lecture des reliefs, choix des chemins, résultats mesurables."
              palette="aurentia"
              seed={31}
            />
            <LowPolyMeshCard
              meta="Cas client"
              title="48 heures pour un premier livrable."
              description="On part du contexte. On revient avec une démo qui tient debout."
              palette="aurentia"
              seed={47}
              bias="tr-bl"
            />
          </div>
        </Section>

        {/* Section 4 — Standalone objects */}
        <Section
          number="04"
          title="Objets isolés"
          note="Volumes faceted utilisables en accent : icônes de section, ornements, repères de listes. Chaque objet a une lumière haut-gauche cohérente."
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
            {[
              { shape: "diamond", label: "Diamant", palette: "aurentia" },
              { shape: "octahedron", label: "Octaèdre", palette: "aurentia" },
              { shape: "cube", label: "Cube", palette: "aurentia" },
              { shape: "prism", label: "Prisme", palette: "aurentia" },
              { shape: "peak", label: "Sommet", palette: "aurentia" },
              { shape: "shard", label: "Éclat", palette: "aurentia" },
            ].map((o) => (
              <div
                key={o.shape}
                className="group flex flex-col items-center gap-4 rounded-2xl bg-foreground/[0.03] p-6 ring-1 ring-foreground/10 transition-all duration-700 ease-in-out hover:bg-foreground/[0.06] hover:ring-foreground/20"
              >
                <LowPolyObject
                  shape={o.shape as "diamond" | "octahedron" | "cube" | "prism" | "peak" | "shard"}
                  palette={o.palette as "aurentia"}
                  size={88}
                />
                <p className="text-sm uppercase tracking-[0.16em] text-foreground/60">
                  {o.label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 5 — Reading note */}
        <div className="mt-32 max-w-3xl rounded-[1.5rem] border border-foreground/10 bg-foreground/[0.03] p-8 md:p-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent-primary">
            Note de lecture
          </p>
          <p className="text-foreground/75 md:text-lg">
            Le low-poly fonctionne quand chaque facette porte sa propre nuance —
            pas une texture posée par-dessus. Ici, toutes les triangulations sont
            calculées : crêtes, mesh, gemmes. Couleurs hardcodées pour les
            illustrations (palette artistique cohérente), tokens sémantiques pour
            le chrome (texte, fond, bordures). Compatible light/dark.
          </p>
        </div>
      </div>
    </main>
  );
}

function Section({
  number,
  title,
  note,
  children,
}: {
  number: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-32">
      <div className="mb-10 grid gap-6 md:grid-cols-[auto_1fr] md:items-end md:gap-12">
        <div className="flex items-baseline gap-4">
          <span className="font-heading text-5xl text-accent-primary md:text-6xl">
            {number}
          </span>
          <h2 className="font-heading text-3xl text-foreground md:text-4xl">
            {title}
          </h2>
        </div>
        <p className="max-w-xl text-sm text-foreground/60 md:text-base md:justify-self-end md:text-right">
          {note}
        </p>
      </div>
      {children}
    </section>
  );
}
