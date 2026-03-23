import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Sites Vitrines — Aurentia Agency",
  description: "Création de sites vitrines professionnels sur-mesure par Aurentia Agency.",
};

export default function SitesVitrinesPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <ComingSoon
          title="Sites Vitrines"
          description="Nos offres de création de sites vitrines sur-mesure arrivent bientôt."
        />
      </main>
      <Footer />
    </>
  );
}
