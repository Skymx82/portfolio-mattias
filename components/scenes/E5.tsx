"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, FileDown } from "lucide-react";
import { projects } from "@/lib/projects";
import OralPlan from "@/components/ui/OralPlan";
import { easings, prefersReducedMotion } from "@/lib/motion";

const ORAL_POINTS = [
  "6 competences couvertes",
  "C1 + C2 par C# et GLPI",
  "C3 a C6 par AutoSoft et Android",
  "Tableau de mapping complet",
  "Dossier E5 PDF telechargeable",
];

const COMPETENCES = [
  { code: "C1", label: "Gerer le patrimoine informatique" },
  {
    code: "C2",
    label: "Repondre aux incidents et demandes d'assistance et d'evolution",
  },
  {
    code: "C3",
    label: "Developper la presence en ligne de l'organisation",
  },
  { code: "C4", label: "Travailler en mode projet" },
  {
    code: "C5",
    label: "Mettre a disposition des utilisateurs un service informatique",
  },
  { code: "C6", label: "Organiser son developpement professionnel" },
];

export default function E5() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".e5-row", { y: 24, autoAlpha: 0 });
      gsap.set(".e5-cta", { y: 16, autoAlpha: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        })
        .to(".e5-row", {
          y: 0,
          autoAlpha: 1,
          stagger: 0.06,
          duration: 0.7,
          ease: easings.standard,
        })
        .to(
          ".e5-cta",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.6,
            ease: easings.standard,
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="e5"
      className="relative bg-bg py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          06 / Competences
        </p>
        <h2 className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-fg text-[clamp(2.5rem,7vw,5rem)]">
          Epreuve E5.
        </h2>
        <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
          Tableau de mapping entre les six competences BTS SIO et les projets
          documentes. Chaque competence est couverte par au moins deux projets.
        </p>
        <OralPlan points={ORAL_POINTS} />

        <div className="mt-16 overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-5 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Competence
                </th>
                {projects.map((p) => (
                  <th
                    key={p.slug}
                    className="px-3 py-5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
                  >
                    {p.title.split(" ")[0].replace(",", "")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPETENCES.map((comp, ci) => (
                <tr
                  key={comp.code}
                  className="e5-row border-b border-border/60 last:border-b-0"
                >
                  <td className="px-6 py-5 align-middle">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 w-7 font-mono text-xs font-medium text-accent">
                        {comp.code}
                      </span>
                      <span className="text-sm leading-relaxed text-fg/85">
                        {comp.label}
                      </span>
                    </div>
                  </td>
                  {projects.map((p) => {
                    const active = p.competences.includes(ci);
                    return (
                      <td
                        key={p.slug}
                        className="px-3 py-5 text-center align-middle"
                      >
                        {active ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent">
                            <Check size={13} strokeWidth={2.5} />
                          </span>
                        ) : (
                          <span
                            className="inline-block h-7 w-7 rounded-full border border-border/60"
                            aria-hidden="true"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="e5-cta mt-12 flex flex-col gap-5 rounded-lg border border-border bg-surface p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-fg">
              Dossier E5 complet
            </h3>
            <p className="mt-1 max-w-lg text-sm text-muted">
              Tableaux de synthese activites, fiches descriptives par
              competence, annexes des projets documentes. Format PDF imprimable.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent/90"
          >
            <FileDown size={14} strokeWidth={1.5} />
            Telecharger (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
