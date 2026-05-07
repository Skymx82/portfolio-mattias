"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar,
  ChevronRight,
  FileDown,
  MapPin,
} from "lucide-react";
import {
  stagesBts,
  stagesSnee,
  stagesPreBts,
  type Stage,
} from "@/lib/stages";
import OralPlan from "@/components/ui/OralPlan";
import { easings, prefersReducedMotion } from "@/lib/motion";

const ORAL_POINTS = [
  "18 semaines BTS valides",
  "Voltier Erasmus Espagne",
  "Bourdelle Toulouse",
  "Odyssee Sucree Toulouse",
  "2 projets SNEE en parallele",
];

export default function Stages() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".stage-card", { y: 32, autoAlpha: 0 });

      const blocs = sectionRef.current?.querySelectorAll(".stage-bloc");
      blocs?.forEach((bloc) => {
        const cards = bloc.querySelectorAll(".stage-card");
        gsap.to(cards, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: easings.standard,
          scrollTrigger: {
            trigger: bloc,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stages"
      className="relative bg-bg py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          03 / Parcours
        </p>
        <h2 className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-fg text-[clamp(2.5rem,7vw,5rem)]">
          Stages &amp; terrain.
        </h2>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
          Dix-huit semaines d&apos;experiences professionnelles cumulees sur le
          BTS, plus deux projets entrepreneuriaux en parallele.
        </p>
        <OralPlan points={ORAL_POINTS} />

        {/* Bloc 1 : Stages BTS officiels */}
        <div className="stage-bloc mt-20">
          <BlocHeader
            kicker="Bloc 1"
            title="Stages BTS officiels"
            sub="18 semaines validees"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {stagesBts.map((s) => (
              <StageCard key={s.entreprise} stage={s} />
            ))}
          </div>
        </div>

        {/* Bloc 2 : Projets SNEE */}
        <div className="stage-bloc mt-24">
          <BlocHeader
            kicker="Bloc 2"
            title="Projets SNEE"
            sub="Statut Etudiant-Entrepreneur"
            accent
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {stagesSnee.map((s) => (
              <StageCard key={s.entreprise} stage={s} highlighted />
            ))}
          </div>
        </div>

        {/* Bloc 3 : Avant le BTS */}
        <div className="stage-bloc mt-24">
          <BlocHeader
            kicker="Bloc 3"
            title="Avant le BTS"
            sub="Premieres immersions techniques"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {stagesPreBts.map((s) => (
              <StageCard key={s.entreprise} stage={s} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlocHeader({
  kicker,
  title,
  sub,
  accent = false,
}: {
  kicker: string;
  title: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <div>
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.22em] ${accent ? "text-accent" : "text-muted"}`}
        >
          {kicker}
        </p>
        <h3 className="mt-2 font-display text-3xl font-semibold text-fg sm:text-4xl">
          {title}
        </h3>
      </div>
      <p className="font-mono text-xs text-muted">{sub}</p>
    </div>
  );
}

function StageCard({
  stage,
  highlighted = false,
  compact = false,
}: {
  stage: Stage;
  highlighted?: boolean;
  compact?: boolean;
}) {
  const Icon = stage.icon;

  return (
    <article
      className={`stage-card relative flex h-full flex-col overflow-hidden rounded-lg border bg-surface ${
        highlighted ? "border-accent/40 p-7" : "border-border p-6"
      } ${compact ? "p-5" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={`shrink-0 rounded-xl border p-2.5 ${
            highlighted
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-border bg-bg text-fg/80"
          }`}
        >
          <Icon size={18} strokeWidth={1.5} />
        </div>
        {stage.badge && (
          <span
            className={`rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.18em] ${
              highlighted
                ? "border-accent/40 bg-accent/15 text-accent"
                : "border-border bg-bg text-muted"
            }`}
          >
            {stage.badge}
          </span>
        )}
      </div>

      <h4 className="mt-5 font-display text-xl font-semibold text-fg">
        {stage.entreprise}
      </h4>
      <p className="mt-1 text-sm text-muted">{stage.poste}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Calendar size={12} strokeWidth={1.5} />
          {stage.periode}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={12} strokeWidth={1.5} />
          {stage.lieu}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-fg/80">
        {stage.description}
      </p>

      {!compact && (
        <ul className="mt-5 space-y-1.5">
          {stage.missions.map((m, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted">
              <ChevronRight
                size={13}
                strokeWidth={1.5}
                className="mt-0.5 shrink-0 text-accent"
              />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      )}

      {stage.rapport && (
        <a
          href={stage.rapport}
          className="mt-6 inline-flex items-center gap-2 self-start text-xs font-medium text-fg/70 transition-colors hover:text-accent"
        >
          <FileDown size={14} strokeWidth={1.5} />
          Telecharger le rapport
        </a>
      )}
    </article>
  );
}
