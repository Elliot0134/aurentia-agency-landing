import { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Sites web pour Hôtels — Aurentia Agency",
  description: "Création de sites web professionnels pour hôtels et hébergements touristiques.",
};

export default function HotelsPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <ComingSoon
          title="Hôtels"
          description="Notre offre dédiée aux hôtels et hébergements touristiques arrive bientôt."
        />
      </main>
      <Footer />
    </>
  );
}
