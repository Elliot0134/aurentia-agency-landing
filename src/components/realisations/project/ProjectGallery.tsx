"use client";

import { BlurReveal } from "@/components/animations/BlurReveal";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { SafeImage } from "@/components/ui/SafeImage";

interface ProjectGalleryProps {
  images: string[];
  projectName: string;
}

export function ProjectGallery({ images, projectName }: ProjectGalleryProps) {
  if (!images.length) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Optional title */}
        <BlurReveal className="mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground/90">
            Le resultat en images.
          </h2>
        </BlurReveal>

        {/* Alternating layout */}
        <div className="flex flex-col gap-4 md:gap-6">
          {images.map((image, index) => {
            // Alternating: full-width for even, side-by-side pairs for odd groups
            const isFullWidth =
              index === 0 || (index > 0 && index % 3 === 0);
            const isPairStart =
              !isFullWidth && index % 3 === 1;
            const isPairEnd =
              !isFullWidth && index % 3 === 2;

            // If it's the second of a pair, skip (handled in pair start)
            if (isPairEnd) return null;

            if (isPairStart && images[index + 1]) {
              // Render two side-by-side
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                >
                  <BlurReveal delay={0}>
                    <ParallaxLayer speed={0.95}>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl shadow-foreground/5 border border-foreground/5 group">
                        <SafeImage
                          src={image}
                          alt={`${projectName} — capture ${index + 1}`}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          fallbackAspectRatio="16/10"
                        />
                      </div>
                    </ParallaxLayer>
                  </BlurReveal>
                  <BlurReveal delay={0.1}>
                    <ParallaxLayer speed={0.95}>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl shadow-foreground/5 border border-foreground/5 group">
                        <SafeImage
                          src={images[index + 1]}
                          alt={`${projectName} — capture ${index + 2}`}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          fallbackAspectRatio="16/10"
                        />
                      </div>
                    </ParallaxLayer>
                  </BlurReveal>
                </div>
              );
            }

            // Full-width image
            return (
              <BlurReveal key={index}>
                <ParallaxLayer speed={0.95}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl shadow-foreground/5 border border-foreground/5 group">
                    <SafeImage
                      src={image}
                      alt={`${projectName} — capture ${index + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 100vw"
                      fallbackAspectRatio="16/10"
                    />
                  </div>
                </ParallaxLayer>
              </BlurReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
