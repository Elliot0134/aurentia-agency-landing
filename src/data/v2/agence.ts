// src/data/agence.ts
// Hero + sub-nav data for /agence.
// Rich narrative content lives in agence-content.ts.

export const agenceData = {
  hero: {
    eyebrow: "L'équipe Aurentia",
    // Headline is rendered as JSX in AgenceHero.tsx (gradient spans).
    subHeadline:
      "On ne crée pas à partir de rien. On révèle le potentiel qui est déjà là. Trois profils complémentaires, un seul objectif : que votre business soit vu.",
    cta: {
      primary: { label: "Rencontrer l'équipe", href: "#equipe" },
      secondary: { label: "Travailler avec nous", href: "/contact" },
    },
  },
};
