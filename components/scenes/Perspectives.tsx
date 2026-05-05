"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Briefcase } from "lucide-react";
import { easings, prefersReducedMotion } from "@/lib/motion";

const BLOCS = [
  {
    kicker: "Poursuite d'etudes",
    icon: GraduationCap,
    title: "L3 MIAGE",
    subtitle: "Universite Toulouse 1 Capitole, rentree 2026",
    paragraphs: [
      "Integration en troisieme annee de licence MIAGE (Methodes Informatiques Appliquees a la Gestion des Entreprises) en formation initiale.",
      "Cursus pensé comme un prolongement direct des projets entrepreneuriaux deja en cours : croisement informatique, gestion et conduite de projet.",
    ],
  },
  {
    kicker: "Projet professionnel",
    icon: Briefcase,
    title: "Independance complete",
    subtitle: "Sans CDI intermediaire",
    paragraphs: [
      "Continuer AutoSoft et Tolarys en parallele du cursus pour consolider le chiffre d'affaires et l'effectif clients.",
      "Objectif : sortir du cursus universitaire en independance complete, sans transition par le salariat.",
    ],
  },
];

export default function Perspectives() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".perspective-bloc", { y: 28, autoAlpha: 0 });

      gsap.to(".perspective-bloc", {
        y: 0,
        autoAlpha: 1,
        stagger: 0.1,
        duration: 0.9,
        ease: easings.standard,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="perspectives"
      className="relative bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          07 / Apres
        </p>
        <h2 className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-fg text-[clamp(2.5rem,7vw,5rem)]">
          Perspectives.
        </h2>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
          La suite est plannifiee, sans rhetorique. Universitaire d&apos;un cote,
          entrepreneuriale de l&apos;autre.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-10">
          {BLOCS.map((bloc) => {
            const Icon = bloc.icon;
            return (
              <div
                key={bloc.kicker}
                className="perspective-bloc relative flex h-full flex-col rounded-lg border border-border bg-bg p-7 sm:p-9"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                    {bloc.kicker}
                  </p>
                </div>

                <h3 className="mt-7 font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">
                  {bloc.title}
                </h3>
                <p className="mt-2 text-sm text-accent">{bloc.subtitle}</p>

                <div className="mt-6 space-y-4 text-sm leading-relaxed text-fg/80 sm:text-base">
                  {bloc.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
