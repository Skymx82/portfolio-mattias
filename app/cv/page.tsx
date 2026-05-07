"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export default function CVPage() {
  return (
    <main className="relative bg-bg pt-32 pb-32 print:bg-white print:pt-0 print:pb-0">
      {/* Actions bar */}
      <div className="no-print mx-auto mb-10 flex max-w-4xl items-center justify-between px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Retour au portfolio
        </Link>
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent/90"
        >
          <Printer size={14} strokeWidth={1.5} />
          Imprimer / PDF
        </button>
      </div>

      <article className="cv-paper mx-auto max-w-4xl rounded-lg border border-border bg-surface p-10 sm:p-14 print:max-w-none print:rounded-none print:border-none print:bg-white print:p-8 print:text-black">
        {/* Header */}
        <header className="flex flex-col gap-4 border-b border-border pb-8 print:border-gray-300 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-fg print:text-black">
              Mattias Mathevon
            </h1>
            <p className="mt-2 text-lg text-accent">
              Developpeur fullstack &middot; Fondateur AutoSoft &middot;
              Cofondateur Tolarys
            </p>
          </div>
          <div className="space-y-1.5 text-sm text-muted print:text-gray-700">
            <div className="flex items-center gap-2">
              <Mail size={13} strokeWidth={1.5} className="text-accent" />
              <a
                href="mailto:mattias.mathevon@gmail.com"
                className="hover:text-accent"
              >
                mattias.mathevon@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} strokeWidth={1.5} className="text-accent" />
              <span>Toulouse, France</span>
            </div>
            <div className="flex items-center gap-2">
              <GitHubIcon size={13} />
              <a
                href="https://github.com/Skymx82"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                github.com/Skymx82
              </a>
            </div>
            <div className="flex items-center gap-2">
              <LinkedInIcon size={13} />
              <a
                href="https://www.linkedin.com/in/mattiasmathevon"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                linkedin.com/in/mattiasmathevon
              </a>
            </div>
          </div>
        </header>

        {/* Profil */}
        <Section title="Profil">
          <p className="text-sm leading-relaxed text-fg/85 print:text-gray-800">
            Etudiant en BTS SIO option SLAM (2e annee) a Toulouse, je code
            en parallele de mes etudes depuis le lycee. Statut SNEE avec
            l&apos;Universite Toulouse 1 Capitole. Fondateur d&apos;AutoSoft,
            ERP SaaS pour auto-ecoles en production avec 4 clients, et
            cofondateur de Tolarys, agence Next.js + Supabase a 5 clients.
          </p>
        </Section>

        {/* Experiences */}
        <Section title="Experiences">
          <div className="space-y-6">
            <Entry
              title="Fondateur, developpeur full stack"
              company="AutoSoft"
              period="Mai 2025 - present"
              location="Toulouse"
              description="Conception et developpement d'un ERP SaaS pour auto-ecoles. 4 auto-ecoles utilisatrices, 30 utilisateurs actifs, architecture multitenant Supabase RLS, Stripe, API ANTS, app mobile dediee."
            />
            <Entry
              title="Cofondateur, developpeur web"
              company="Tolarys"
              period="Mars 2025 - present"
              location="Toulouse"
              description="Agence de developpement web. 5 clients accompagnes en Next.js + Supabase, conformite RGAA 4.1 / EN 301 549, e-commerce Medusa, applications multitenant."
            />
            <Entry
              title="Stagiaire developpeur"
              company="Odyssee Sucree"
              period="Mai - Juin 2025"
              location="Toulouse"
              description="Application web de gestion de stock et comptabilite pour evenements (marches gourmands). Supabase Auth, suivi temps reel, dashboard KPIs."
            />
          </div>
        </Section>

        {/* Formation */}
        <Section title="Formation">
          <div className="space-y-5">
            <Entry
              title="L3 MIAGE (vise)"
              company="Universite Toulouse 1 Capitole"
              period="Rentree 2026"
              description="Formation initiale, Methodes Informatiques Appliquees a la Gestion des Entreprises."
            />
            <Entry
              title="BTS SIO option SLAM (2e annee)"
              company="Toulouse"
              period="2024 - 2026"
              description="Solutions Logicielles et Applications Metiers. Passage E6 oral portfolio mai 2026."
            />
          </div>
        </Section>

        {/* Stages */}
        <Section title="Stages BTS">
          <div className="space-y-5">
            <Entry
              title="Stagiaire developpeur"
              company="Voltier Electronics (Erasmus)"
              period="Janv. - Fev. 2024"
              location="Saint-Jacques-de-Compostelle, Espagne"
              description="6 semaines. Automatisation WordPress (script AutoIt), optimisation SQL, plugin WordPress."
            />
            <Entry
              title="Stagiaire informatique"
              company="Lycee Antoine Bourdelle"
              period="Mai - Juin 2024"
              location="Montauban"
              description="6 semaines. Installation et configuration de serveurs Microsoft, gestion centralisee."
            />
          </div>
        </Section>

        {/* Stack */}
        <Section title="Stack technique">
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3 print:text-gray-800">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                Front
              </p>
              <p className="mt-2 text-fg/85">
                Next.js, React, TypeScript, Tailwind CSS, GSAP
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                Back
              </p>
              <p className="mt-2 text-fg/85">
                Supabase, PostgreSQL, REST API, Stripe, Node.js, PHP
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                Autres
              </p>
              <p className="mt-2 text-fg/85">
                C#, .NET, Java, Android, SQL Server, Git, Vercel
              </p>
            </div>
          </div>
        </Section>

        {/* Langues */}
        <Section title="Langues">
          <div className="flex gap-8 text-sm">
            <div>
              <p className="font-medium text-fg print:text-black">Francais</p>
              <p className="text-muted print:text-gray-700">Langue maternelle</p>
            </div>
            <div>
              <p className="font-medium text-fg print:text-black">Anglais</p>
              <p className="text-muted print:text-gray-700">B2 (technique)</p>
            </div>
            <div>
              <p className="font-medium text-fg print:text-black">Espagnol</p>
              <p className="text-muted print:text-gray-700">A2 (Erasmus)</p>
            </div>
          </div>
        </Section>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-border pt-6 first:border-0 first:pt-0 print:border-gray-300">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Entry({
  title,
  company,
  period,
  location,
  description,
}: {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-medium text-fg print:text-black">
          {title} <span className="text-muted print:text-gray-700">— {company}</span>
        </p>
        <p className="font-mono text-[11px] text-muted print:text-gray-700">
          {period}
          {location ? ` · ${location}` : ""}
        </p>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-fg/80 print:text-gray-800">
        {description}
      </p>
    </div>
  );
}
