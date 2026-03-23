import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Apport d'affaires — Aurentia Agency",
  description:
    "Devenez apporteur d'affaires pour Aurentia Agency. Recommandez nos services et gagnez une commission sur chaque client signé.",
  openGraph: {
    title: "Apport d'affaires — Aurentia Agency",
    description:
      "Recommandez Aurentia Agency et touchez une commission attractive sur chaque projet signé.",
    url: "https://aurentia.agency/apport-affaires",
    siteName: "Aurentia Agency",
    locale: "fr_FR",
    type: "website",
  },
};

export default function ApportAffairesPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden">
        {/* Hero */}
        <section className="w-full min-h-[60vh] flex items-center justify-center pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Apport d&apos;affaires
            </h1>
            <p className="text-lg sm:text-xl text-foreground/60 max-w-2xl mx-auto">
              Recommandez Aurentia Agency à votre réseau et touchez une commission attractive sur chaque projet signé.
            </p>
          </div>
        </section>

        {/* Comment ça marche */}
        <section className="w-full py-20 px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center">
              Comment ça marche
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Recommandez",
                  description:
                    "Parlez de nos services à un contact qui a besoin d'un site web ou d'une solution digitale.",
                },
                {
                  step: "02",
                  title: "On s'occupe du reste",
                  description:
                    "Nous prenons contact, présentons notre offre et gérons tout le projet de A à Z.",
                },
                {
                  step: "03",
                  title: "Touchez votre commission",
                  description:
                    "Une fois le projet signé, vous recevez votre commission. Simple et transparent.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative p-8 rounded-3xl border space-y-4"
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  <span className="text-sm font-mono text-foreground/30 font-bold">
                    {item.step}
                  </span>
                  <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="w-full py-20 px-4">
          <div className="max-w-5xl mx-auto space-y-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center">
              Pourquoi devenir apporteur d&apos;affaires ?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Commission attractive",
                  description: "Un pourcentage compétitif sur chaque projet signé grâce à votre recommandation.",
                },
                {
                  title: "Aucun engagement",
                  description: "Pas de contrat, pas d'exclusivité. Recommandez quand vous voulez, à votre rythme.",
                },
                {
                  title: "Suivi transparent",
                  description: "Suivez l'avancement de vos recommandations et vos commissions en toute transparence.",
                },
                {
                  title: "Réseau qui rapporte",
                  description: "Transformez votre réseau professionnel en source de revenus complémentaires.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-8 rounded-3xl border space-y-3"
                  style={{ borderColor: "var(--glass-border)" }}
                >
                  <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-20 px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">
              Ça vous intéresse ?
            </h2>
            <p className="text-foreground/60 text-lg">
              Contactez-nous pour en savoir plus sur notre programme d&apos;apport d&apos;affaires et commencer à gagner des commissions.
            </p>
            <a
              href="https://wa.me/33612345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-2xl bg-foreground text-background hover:opacity-90 transition-all duration-200"
            >
              Nous contacter
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
