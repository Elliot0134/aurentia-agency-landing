// src/components/v2/agence/HackathonCardContent.tsx
import { Trophy } from "lucide-react";
import { LinkedInEmbed } from "@/components/shared/LinkedInEmbed";
import type {
  AgenceHackathonCard,
  AgenceHackathonTeammate,
} from "@/data/v2/agence-content";

function DescriptionWithTeammates({
  description,
  teammates,
}: {
  description: string;
  teammates?: AgenceHackathonTeammate[];
}) {
  if (!teammates?.length || !description.includes("{teammates}")) {
    return <>{description}</>;
  }

  const teammateLinks = teammates.map((t, i) => (
    <span key={t.name}>
      {t.linkedinUrl ? (
        <a
          href={t.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-2 transition-colors duration-500 ease-in-out hover:text-accent-primary"
        >
          {t.name}
        </a>
      ) : (
        <span className="text-foreground">{t.name}</span>
      )}
      {i < teammates.length - 1 && (i === teammates.length - 2 ? " et " : ", ")}
    </span>
  ));

  const parts = description.split("{teammates}");
  return (
    <>
      {parts[0]}
      {teammateLinks}
      {parts[1]}
    </>
  );
}

export function HackathonCardContent({ card }: { card: AgenceHackathonCard }) {
  return (
    <div className="flex flex-col gap-5">
      <LinkedInEmbed url={card.linkedinEmbedUrl} />
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-primary/10 px-3 py-1 text-sm font-semibold text-accent-primary">
          <Trophy className="h-4 w-4" />
          {card.result}
        </span>
        <span className="text-sm text-foreground/50">{card.date}</span>
      </div>
      <h4 className="text-lg font-bold text-foreground md:text-xl">
        {card.title}
      </h4>
      <p className="text-base leading-relaxed text-foreground/65">
        <DescriptionWithTeammates
          description={card.description}
          teammates={card.teammates}
        />
      </p>
    </div>
  );
}
