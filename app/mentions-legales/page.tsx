import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentions legales | Mattias Mathevon",
  description: "Mentions legales du portfolio de Mattias Mathevon.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="relative bg-bg pt-32 pb-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Retour au portfolio
        </Link>

        <h1 className="mt-10 font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-tight tracking-tight text-fg">
          Mentions legales.
        </h1>

        <div className="mt-12 space-y-10">
          <Section title="Editeur du site">
            <p>
              <strong className="text-fg">Mattias Mathevon</strong>
              <br />
              Etudiant en BTS SIO SLAM, statut National d&apos;Etudiant-Entrepreneur (SNEE)
              <br />
              Toulouse, France
              <br />
              Email :{" "}
              <a
                href="mailto:mattias.mathevon@gmail.com"
                className="text-accent hover:underline"
              >
                mattias.mathevon@gmail.com
              </a>
            </p>
          </Section>

          <Section title="Hebergement">
            <p>
              <strong className="text-fg">Vercel Inc.</strong>
              <br />
              340 S Lemon Ave #4133
              <br />
              Walnut, CA 91789, USA
              <br />
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                vercel.com
              </a>
            </p>
          </Section>

          <Section title="Propriete intellectuelle">
            <p>
              L&apos;ensemble du contenu de ce site (textes, images,
              captures d&apos;ecran de projets, logos, code source) est la
              propriete exclusive de Mattias Mathevon, sauf mention
              contraire. Toute reproduction sans autorisation prealable
              ecrite est interdite.
            </p>
            <p>
              Les marques tierces mentionnees (clients Tolarys,
              technologies utilisees) restent la propriete de leurs
              detenteurs respectifs.
            </p>
          </Section>

          <Section title="Donnees personnelles">
            <p>
              Ce site ne collecte aucune donnee personnelle a des fins
              commerciales. Aucun cookie de tracking n&apos;est utilise.
              Aucun service d&apos;analytics tiers n&apos;est integre.
            </p>
            <p>
              Les liens vers les reseaux sociaux (GitHub, LinkedIn)
              ouvrent simplement les pages publiques correspondantes
              dans un nouvel onglet.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Pour toute question relative a ces mentions legales ou au
              site, contactez Mattias Mathevon a l&apos;adresse :{" "}
              <a
                href="mailto:mattias.mathevon@gmail.com"
                className="text-accent hover:underline"
              >
                mattias.mathevon@gmail.com
              </a>
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-base leading-relaxed text-fg/85">
        {children}
      </div>
    </section>
  );
}
