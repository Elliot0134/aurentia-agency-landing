"use client";

import { useState } from "react";
import { ListIcon } from "lucide-react";
import type { ProjectFrontmatter } from "@/data/realisations/schemas";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CaseStudyRail } from "./CaseStudyRail";

type Props = {
  project: ProjectFrontmatter;
};

export function CaseStudyRailMobile({ project }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Ouvrir le sommaire"
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background shadow-lg transition-all duration-500 ease-in-out hover:scale-105 lg:hidden"
      >
        <ListIcon className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto">
        <CaseStudyRail
          project={project}
          onNavigate={() => setOpen(false)}
          className="mt-6"
        />
      </SheetContent>
    </Sheet>
  );
}
