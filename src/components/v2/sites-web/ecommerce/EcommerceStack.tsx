"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";

const integrations = [
  { name: "Shopify", icon: "/images/integrations/shopify.png" },
  { name: "Stripe", icon: "/images/integrations/stripe.png" },
  { name: "Gmail", icon: "/images/integrations/gmail.png" },
  { name: "WhatsApp", icon: "/images/integrations/whatsapp.png" },
  { name: "OpenAI", icon: "/images/integrations/openai.png" },
  { name: "Notion", icon: "/images/integrations/notion.png" },
  { name: "n8n", icon: "/images/integrations/n8n.png" },
  { name: "Zapier", icon: "/images/integrations/zapier.png" },
  { name: "HubSpot", icon: "/images/integrations/hubspot.png" },
  { name: "Slack", icon: "/images/integrations/slack.png" },
  { name: "Google Sheets", icon: "/images/integrations/google-sheets.png" },
  { name: "Google Drive", icon: "/images/integrations/google-drive.png" },
  { name: "Google Calendar", icon: "/images/integrations/google-calendar.png" },
  { name: "Airtable", icon: "/images/integrations/airtable.png" },
  { name: "Supabase", icon: "/images/integrations/supabase.png" },
  { name: "WordPress", icon: "/images/integrations/wordpress.png" },
  { name: "Salesforce", icon: "/images/integrations/salesforce.png" },
  { name: "Excel", icon: "/images/integrations/excel.png" },
  { name: "Figma", icon: "/images/integrations/figma.png" },
  { name: "Discord", icon: "/images/integrations/discord.png" },
];

const COLS = 12;
const ROWS = 9;

interface IconPlacement {
  col: number;
  row: number;
  idx: number;
}

const iconPlacements: IconPlacement[] = [
  { col: 3, row: 0, idx: 0 },
  { col: 9, row: 0, idx: 1 },
  { col: 1, row: 1, idx: 2 },
  { col: 6, row: 1, idx: 3 },
  { col: 11, row: 1, idx: 4 },
  { col: 4, row: 2, idx: 5 },
  { col: 10, row: 2, idx: 6 },
  { col: 1, row: 3, idx: 7 },
  { col: 10, row: 3, idx: 8 },
  { col: 0, row: 5, idx: 9 },
  { col: 11, row: 5, idx: 10 },
  { col: 3, row: 6, idx: 11 },
  { col: 8, row: 6, idx: 12 },
  { col: 1, row: 7, idx: 13 },
  { col: 6, row: 7, idx: 14 },
  { col: 10, row: 7, idx: 15 },
  { col: 4, row: 8, idx: 16 },
  { col: 9, row: 8, idx: 17 },
];

const iconMap = new Map(iconPlacements.map((p) => [`${p.col}-${p.row}`, p]));

export function EcommerceStack() {
  const cells: React.ReactNode[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${col}-${row}`;
      const isCenterArea = col >= 3 && col <= 8 && row >= 3 && row <= 5;
      const placement = iconMap.get(key);

      const isFirstCol = col === 0;
      const isFirstRow = row === 0;
      const borderClasses = `${isFirstCol ? "border-l " : ""}${isFirstRow ? "border-t " : ""}border-r border-b border-foreground/[0.07]`;

      if (col === 3 && row === 3) {
        cells.push(
          <div
            key="center-text"
            className="flex flex-col items-center justify-center text-center px-6 md:px-10 border-r border-b border-foreground/[0.07]"
            style={{ gridColumn: "4 / 10", gridRow: "4 / 7" }}
          >
            <TextReveal
              text="Connecté à tous vos outils e-commerce."
              elementType="h2"
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4 justify-center"
            />
            <BlurReveal delay={0.3}>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed mb-6 max-w-md">
                Shopify, Stripe, Klaviyo, n8n… On connecte votre boutique à
                tout votre stack pour que les commandes, les emails et le
                support tournent sans vous.
              </p>
            </BlurReveal>
            <BlurReveal delay={0.5}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-5 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-700 ease-in-out hover:bg-foreground/10 hover:border-foreground/30 hover:text-foreground"
              >
                Réserver un appel
              </Link>
            </BlurReveal>
          </div>,
        );
        continue;
      }

      if (isCenterArea) continue;

      if (placement) {
        const tool = integrations[placement.idx];
        cells.push(
          <motion.div
            key={key}
            className={`group aspect-square flex items-center justify-center ${borderClasses} cursor-default relative bg-foreground/[0.03] transition-colors duration-700 ease-in-out hover:bg-foreground/[0.06]`}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{
              duration: 0.7,
              delay: placement.idx * 0.04,
              ease: "easeOut",
            }}
          >
            <Image
              src={tool.icon}
              alt={tool.name}
              width={128}
              height={128}
              className="w-8 h-8 object-contain opacity-70 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-110"
            />
          </motion.div>,
        );
        continue;
      }

      cells.push(<div key={key} className={`aspect-square ${borderClasses}`} />);
    }
  }

  return (
    <section
      id="stack"
      className="relative w-full overflow-hidden py-20 md:py-24"
    >
      {/* Mobile */}
      <div className="md:hidden container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <TextReveal
            text="Connecté à tous vos outils e-commerce."
            elementType="h2"
            className="text-2xl font-bold tracking-tight text-foreground mb-4 justify-center"
          />
          <BlurReveal delay={0.3}>
            <p className="text-sm text-foreground/60 leading-relaxed mb-6 max-w-md">
              Shopify, Stripe, Klaviyo, n8n… On connecte votre boutique à tout
              votre stack pour que les commandes, les emails et le support
              tournent sans vous.
            </p>
          </BlurReveal>
          <BlurReveal delay={0.5}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-5 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-700 ease-in-out hover:bg-foreground/10 hover:border-foreground/30 hover:text-foreground"
            >
              Réserver un appel
            </Link>
          </BlurReveal>
        </div>
        <div
          className="grid grid-cols-4 gap-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
          }}
        >
          {integrations.slice(0, 20).map((tool, i) => (
            <motion.div
              key={tool.name}
              className="group aspect-square flex items-center justify-center border-r border-b border-foreground/[0.07] cursor-default relative bg-foreground/[0.03] transition-colors duration-700 ease-in-out"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: "easeOut" }}
            >
              <Image
                src={tool.icon}
                alt={tool.name}
                width={128}
                height={128}
                className="w-8 h-8 object-contain opacity-70"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block container mx-auto px-12 relative">
        <div
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        >
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
          >
            {cells}
          </div>
        </div>
      </div>
    </section>
  );
}
