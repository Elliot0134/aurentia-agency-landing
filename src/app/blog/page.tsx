import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ComingSoon } from "@/components/shared/ComingSoon";

export const metadata: Metadata = {
  title: "Blog — Aurentia Agency",
  description: "Articles et conseils sur le développement web, l'IA et le digital.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <ComingSoon
          title="Blog"
          description="Nos articles sur le web, l'IA et le digital arrivent bientôt."
        />
      </main>
      <Footer />
    </>
  );
}
