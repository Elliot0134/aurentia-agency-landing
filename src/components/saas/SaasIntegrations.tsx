"use client";

import Image from "next/image";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { motion } from "framer-motion";

const integrations = [
  { name: "Google Sheets", icon: "/images/integrations/google-sheets.png" },
  { name: "Excel", icon: "/images/integrations/excel.png" },
  { name: "Airtable", icon: "/images/integrations/airtable.png" },
  { name: "Notion", icon: "/images/integrations/notion.png" },
  { name: "Google Drive", icon: "/images/integrations/google-drive.png" },
  { name: "Supabase", icon: "/images/integrations/supabase.png" },
  { name: "Stripe", icon: "/images/integrations/stripe.png" },
  { name: "Slack", icon: "/images/integrations/slack.png" },
  { name: "HubSpot", icon: "/images/integrations/hubspot.png" },
  { name: "Gmail", icon: "/images/integrations/gmail.png" },
  { name: "Google Calendar", icon: "/images/integrations/google-calendar.png" },
  { name: "Zapier", icon: "/images/integrations/zapier.png" },
  { name: "Shopify", icon: "/images/integrations/shopify.png" },
  { name: "WordPress", icon: "/images/integrations/wordpress.png" },
  { name: "WhatsApp", icon: "/images/integrations/whatsapp.png" },
  { name: "Discord", icon: "/images/integrations/discord.png" },
  { name: "OpenAI", icon: "/images/integrations/openai.png" },
  { name: "Salesforce", icon: "/images/integrations/salesforce.png" },
  { name: "Figma", icon: "/images/integrations/figma.png" },
  { name: "N8N", icon: "/images/integrations/n8n.png" },
];

// 12 cols x 9 rows
// Center text: cols 3-8, rows 3-5 (3 rows tall)
const COLS = 12;
const ROWS = 9;

interface IconPlacement {
  col: number;
  row: number;
  idx: number;
}

// 14 icons, well spread, no duplicates
const iconPlacements: IconPlacement[] = [
  // Row 0
  { col: 3, row: 0, idx: 0 },
  { col: 9, row: 0, idx: 1 },
  // Row 1
  { col: 1, row: 1, idx: 2 },
  { col: 6, row: 1, idx: 3 },
  { col: 11, row: 1, idx: 4 },
  // Row 2
  { col: 4, row: 2, idx: 5 },
  { col: 10, row: 2, idx: 6 },
  // Row 3 (sides — center is text)
  { col: 1, row: 3, idx: 7 },
  { col: 10, row: 3, idx: 8 },
  // Row 5 (sides — center is text)
  { col: 0, row: 5, idx: 9 },
  { col: 11, row: 5, idx: 10 },
  // Row 6
  { col: 3, row: 6, idx: 11 },
  { col: 8, row: 6, idx: 12 },
  // Row 7
  { col: 1, row: 7, idx: 13 },
  { col: 6, row: 7, idx: 14 },
  { col: 10, row: 7, idx: 15 },
  // Row 8
  { col: 4, row: 8, idx: 16 },
  { col: 9, row: 8, idx: 17 },
];

const iconMap = new Map(
  iconPlacements.map((p) => [`${p.col}-${p.row}`, p])
);

export function SaasIntegrations() {
  const cells: React.ReactNode[] = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const key = `${col}-${row}`;
      const isCenterArea = col >= 3 && col <= 8 && row >= 3 && row <= 5;
      const placement = iconMap.get(key);

      const isFirstCol = col === 0;
      const isFirstRow = row === 0;
      const borderClasses = `${isFirstCol ? "border-l " : ""}${isFirstRow ? "border-t " : ""}border-r border-b border-foreground/[0.07]`;

      // Center text block
      if (col === 3 && row === 3) {
        cells.push(
          <div
            key="center-text"
            className="flex flex-col items-center justify-center text-center px-6 md:px-10 border-r border-b border-foreground/[0.07]"
            style={{
              gridColumn: "4 / 10",
              gridRow: "4 / 7",
            }}
          >
            <TextReveal
              text="Connecté à tous vos outils."
              elementType="h2"
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4 justify-center"
            />
            <BlurReveal delay={0.3}>
              <p className="text-sm md:text-base text-foreground/60 leading-relaxed mb-6 max-w-md">
                Notion, Stripe, Slack… Votre application se branche à vos outils
                en quelques clics et commence à exécuter à votre place.
              </p>
            </BlurReveal>
            <BlurReveal delay={0.5}>
              <a
                href="https://cal.com/aurentia/saas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-5 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-700 ease-in-out hover:bg-foreground/10 hover:border-foreground/30 hover:text-foreground"
              >
                Réserver un appel
              </a>
            </BlurReveal>
          </div>
        );
        continue;
      }

      if (isCenterArea) continue;

      // Icon cell
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
              className="w-7 h-7 md:w-8 md:h-8 object-contain opacity-70 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-110"
            />
          </motion.div>
        );
        continue;
      }

      // Empty cell
      cells.push(
        <div key={key} className={`aspect-square ${borderClasses}`} />
      );
    }
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative">
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
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            }}
          >
            {cells}
          </div>
        </div>
      </div>
    </section>
  );
}
