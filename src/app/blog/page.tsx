import { ComingSoon } from "@/components/shared/ComingSoon";
import { pageMeta } from "@/lib/seo/metadata";

export const metadata = pageMeta({
  title: "Blog",
  description: "Articles et conseils sur le développement web, l'IA et le digital.",
  path: "/blog",
  noindex: true,
});

export default function BlogPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center w-full overflow-hidden pt-24">
        <ComingSoon
          title="Blog"
          description="Nos articles sur le web, l'IA et le digital arrivent bientôt."
        />
      </main>
    </>
  );
}
