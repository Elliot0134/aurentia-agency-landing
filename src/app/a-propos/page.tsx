import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "À propos — Aurentia Agency",
  description: "Découvrez l'équipe et la vision d'Aurentia Agency.",
};

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <ComingSoon
          title="À propos"
          description="Découvrez notre équipe et notre vision — page en préparation."
        />
      </main>
      <Footer />
    </>
  );
}
