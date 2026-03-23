import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Landing Pages — Aurentia Agency",
  description: "Création de landing pages optimisées conversion par Aurentia Agency.",
};

export default function LandingPagesPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <ComingSoon
          title="Landing Pages"
          description="Des landing pages pensées pour convertir — bientôt disponible."
        />
      </main>
      <Footer />
    </>
  );
}
