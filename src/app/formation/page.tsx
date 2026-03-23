import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Formation — Aurentia Agency",
  description: "Formations en développement web et IA par Aurentia Agency.",
};

export default function FormationPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <ComingSoon
          title="Formation"
          description="Nos formations en développement web et IA arrivent bientôt."
        />
      </main>
      <Footer />
    </>
  );
}
