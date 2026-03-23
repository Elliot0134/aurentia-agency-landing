import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Création de SaaS — Aurentia Agency",
  description: "Développement de SaaS sur-mesure avec IA, de l'idée au produit déployé.",
};

export default function SaasPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <ComingSoon
          title="Création de SaaS"
          description="Du concept au produit déployé — notre offre SaaS arrive bientôt."
        />
      </main>
      <Footer />
    </>
  );
}
