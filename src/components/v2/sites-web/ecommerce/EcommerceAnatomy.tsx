"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { BlurReveal } from "@/components/animations/BlurReveal";

type Frame = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  side: "left" | "right";
};

const frames: Frame[] = [
  {
    number: "01",
    eyebrow: "L'accueil",
    title: "Une première page qui donne envie de rester.",
    description:
      "Quelques secondes pour convaincre : qui vous êtes, ce que vous vendez, pourquoi ça vaut le coup de regarder. Une vraie identité, de belles photos, des mots choisis. Pas du remplissage.",
    imageUrl: "/ecommerce/friendiz-hero.webp",
    imageAlt: "Page d'accueil d'une boutique en ligne",
    side: "right",
  },
  {
    number: "02",
    eyebrow: "La page produit",
    title: "Tout pour acheter, rien pour distraire.",
    description:
      "De belles photos, des options claires, des avis bien placés, des bénéfices expliqués simplement. La page produit, c'est là que la vente se joue — alors on la soigne autant que la vitrine.",
    imageUrl: "/ecommerce/friediz-product.webp",
    imageAlt: "Page produit d'une boutique en ligne",
    side: "left",
  },
  {
    number: "03",
    eyebrow: "La confiance",
    title: "Rassurer sans en faire trop.",
    description:
      "Avis clients, garanties, paiement sécurisé, livraison claire. On ne crie pas dessus. On les place exactement là où le doute pourrait stopper l'achat — au bon moment, au bon endroit.",
    imageUrl: "/ecommerce/friendiz-confiance.webp",
    imageAlt: "Avis clients et garanties sur une boutique en ligne",
    side: "right",
  },
  {
    number: "04",
    eyebrow: "Le paiement",
    title: "Un paiement simple. Une seule page. Parfait sur mobile.",
    description:
      "La majorité des paniers se perdent au moment de payer. On enlève tout ce qui ralentit : une seule page, paiement Apple Pay et Google Pay en un clic, formulaires courts, zéro prise de tête.",
    imageUrl: "/ecommerce/friendiz-paiement.webp",
    imageAlt: "Page de paiement simple et mobile-first",
    side: "left",
  },
  {
    number: "05",
    eyebrow: "Le sur-mesure",
    title: "Parce qu'on s'adapte vraiment à vos besoins.",
    description:
      "Une fonctionnalité Shopify qui n'existe pas ? On code l'extension. Un design qui sort des sentiers battus ? On le dessine. Un workflow custom, une intégration spécifique, un module métier ? On le construit. Votre boutique reste un produit, pas un thème.",
    imageUrl: "/ecommerce/friendiz-sur-mesure.webp",
    imageAlt: "Sur-mesure Shopify — code custom et design unique",
    side: "right",
  },
];

function ParallaxFrame({ frame, index }: { frame: Frame; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const isRight = frame.side === "right";

  // Image card glides against scroll — monotonic, fluid, no bounce
  const imageY = useTransform(scrollYProgress, [0, 1], ["35%", "-35%"]);

  // Text drifts in the opposite direction — slower, opposite axis
  const textY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);

  // Big background number drifts even harder for depth — sits on the TEXT side
  const numberY = useTransform(scrollYProgress, [0, 1], ["-45%", "45%"]);
  const numberX = useTransform(
    scrollYProgress,
    [0, 1],
    [isRight ? "-10%" : "10%", isRight ? "10%" : "-10%"],
  );
  const numberOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 0.1, 0.1, 0],
  );

  return (
    <div
      ref={ref}
      className="relative py-20 md:py-32"
    >
      {/* Editorial ghost number drifting in background */}
      <motion.span
        aria-hidden
        style={{ y: numberY, x: numberX, opacity: numberOpacity }}
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none text-[clamp(14rem,34vw,34rem)] font-bold leading-none tracking-tighter text-foreground ${
          isRight ? "left-[-4vw]" : "right-[-4vw]"
        }`}
      >
        {frame.number}
      </motion.span>

      <div className="container mx-auto px-6 md:px-12 relative">
        <div
          className={`grid items-center gap-10 md:gap-16 lg:gap-20 md:grid-cols-12`}
        >
          {/* Image column — the WHOLE CARD floats with parallax */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
            className={`md:col-span-7 ${
              isRight ? "md:order-2" : "md:order-1"
            }`}
          >
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-video overflow-hidden rounded-3xl"
            >
              <Image
                src={frame.imageUrl}
                alt={frame.imageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </motion.div>
          </motion.div>

          {/* Text column — the WHOLE block drifts in the opposite direction */}
          <motion.div
            style={{ y: textY }}
            className={`md:col-span-5 ${
              isRight ? "md:order-1" : "md:order-2"
            }`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.9,
                delay: 0.15,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <div className="mb-5 flex items-baseline gap-4">
                <span className="text-base font-bold text-accent-primary">
                  {frame.number}
                </span>
                <span className="text-sm font-medium uppercase tracking-widest text-foreground/60">
                  {frame.eyebrow}
                </span>
              </div>
              <h3 className="mb-5 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-foreground">
                {frame.title}
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-foreground/65">
                {frame.description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative connector line between frames (except last) */}
      {index < frames.length - 1 && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-30%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ originY: 0 }}
          className="absolute left-1/2 -translate-x-1/2 -bottom-12 hidden h-24 w-px bg-gradient-to-b from-foreground/20 to-transparent md:block"
        />
      )}
    </div>
  );
}

export function EcommerceAnatomy() {
  return (
    <section
      id="anatomy"
      className="relative w-full overflow-hidden py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-24">
          <BlurReveal>
            <p className="text-sm font-medium uppercase tracking-widest text-accent-primary mb-4">
              Le craft Aurentia
            </p>
          </BlurReveal>
          <TextReveal
            text="L'anatomie d'une boutique qui convertit."
            elementType="h2"
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 justify-center"
          />
          <BlurReveal delay={0.2}>
            <p className="text-base md:text-lg text-foreground/60 leading-relaxed">
              Chaque pixel raconte une histoire. Voilà comment on travaille
              chaque étape du parcours pour transformer un visiteur en client
              fidèle.
            </p>
          </BlurReveal>
        </div>
      </div>

      <div className="space-y-8 md:space-y-16">
        {frames.map((frame, i) => (
          <ParallaxFrame key={frame.number} frame={frame} index={i} />
        ))}
      </div>
    </section>
  );
}
