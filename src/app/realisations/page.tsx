import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Réalisations — Aurentia Agency",
  description: "Découvrez nos projets et réalisations — sites web, SaaS et landing pages.",
};

export default function RealisationsPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <ComingSoon
          title="Réalisations"
          description="Notre portfolio de projets arrive bientôt."
        />
      </main>
      <Footer />
    </>
  );
}
