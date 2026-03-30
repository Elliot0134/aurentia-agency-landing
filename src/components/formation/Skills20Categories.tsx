"use client";

import { PenLine, TrendingUp, Settings, Sparkles } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { BlurReveal } from "@/components/animations/BlurReveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { AccordionSkill } from "./AccordionSkill";
import { SkillsDownload } from "./SkillsDownload";
import { skillCategories, type SkillCategory } from "@/data/skills-lead-magnet";

const iconMap = {
  PenLine,
  TrendingUp,
  Settings,
  Sparkles,
};

function CategoryBlock({ category }: { category: SkillCategory }) {
  const Icon = iconMap[category.icon];

  return (
    <BlurReveal className="flex flex-col gap-5">
      {/* Category header */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${category.colorBorder} ${category.colorBg}`}
        >
          <Icon className={`w-5 h-5 ${category.colorText}`} />
        </div>
        <div>
          <span className={`text-xs font-bold tracking-widest uppercase ${category.colorText}`}>
            Catégorie
          </span>
          <h2 className="text-xl font-black text-foreground/90 leading-tight">
            {category.title}
          </h2>
        </div>
        <div className={`ml-auto px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${category.colorBg} ${category.colorText} ${category.colorBorder} border`}>
          5 skills
        </div>
      </div>

      {/* Skill accordions */}
      <div className="flex flex-col gap-2.5">
        {category.skills.map((skill) => (
          <AccordionSkill key={skill.id} skill={skill} numberColor={category.colorText} />
        ))}
      </div>
    </BlurReveal>
  );
}

export function Skills20Categories() {
  return (
    <Section
      id="skills-categories"
      theme="dark"
      className="relative"
    >
      {/* Subtle decorative orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[180px] pointer-events-none opacity-[0.04]"
        style={{ background: "var(--accent)" }}
      />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-violet-500 rounded-full blur-[180px] pointer-events-none opacity-[0.04]" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Section header */}
        <div className="text-center mb-8">
          <BlurReveal className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-widest bg-foreground/5 text-foreground/60 border border-foreground/10">
              20 SKILLS
            </span>
          </BlurReveal>
          <TextReveal
            text="Les skills, par catégorie"
            elementType="h2"
            className="text-3xl md:text-4xl font-black tracking-tight justify-center"
          />
          <BlurReveal>
            <p className="text-foreground/40 mt-4 max-w-xl mx-auto">
              Cliquez sur un skill pour voir le contenu complet et le copier en un clic.
            </p>
          </BlurReveal>
        </div>

        {/* Categories grid — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {skillCategories.map((category) => (
            <CategoryBlock key={category.id} category={category} />
          ))}
        </div>

        {/* Download ZIP — bottom */}
        <BlurReveal className="flex justify-center mt-8">
          <SkillsDownload />
        </BlurReveal>
      </div>
    </Section>
  );
}
