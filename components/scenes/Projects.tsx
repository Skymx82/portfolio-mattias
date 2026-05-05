"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  projects,
  STATUS_LABELS,
  TOLARYS_PROJECTS,
} from "@/lib/projects";
import { easings, prefersReducedMotion } from "@/lib/motion";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const btsProjects = projects.filter((p) => p.slug !== "autosoft");

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".project-card", { y: 32, autoAlpha: 0 });
      gsap.set(".tolarys-marquee", { autoAlpha: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        })
        .to(".project-card", {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: easings.standard,
        })
        .to(
          ".tolarys-marquee",
          {
            autoAlpha: 1,
            duration: 0.6,
            ease: easings.standard,
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const duplicatedTolarys = [...TOLARYS_PROJECTS, ...TOLARYS_PROJECTS];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-bg py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          03 / Projets
        </p>
        <h2 className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-fg text-[clamp(2.5rem,7vw,5rem)]">
          Au-dela d&apos;AutoSoft.
        </h2>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
          Trois projets BTS documentes pour le passage E6, et quatorze
          realisations livrees via Tolarys.
        </p>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {btsProjects.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.slug}
                href={`/projets/${project.slug}`}
                className="project-card group relative flex flex-col overflow-hidden rounded-lg border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl border border-border bg-bg p-3 text-accent transition-colors group-hover:border-accent/40">
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                    {STATUS_LABELS[project.status]}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-2xl font-semibold text-fg transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{project.tagline}</p>

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.techs.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-2 py-1 font-mono text-[10px] text-fg/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-1.5">
                  {project.competences.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-accent/30 bg-accent/10 px-2 py-1 font-mono text-[10px] text-accent"
                    >
                      C{c + 1}
                    </span>
                  ))}
                </div>

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-fg/70 transition-colors group-hover:text-accent">
                  Voir le projet
                  <ArrowRight
                    size={14}
                    strokeWidth={1.5}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            );
          })}

          <div className="project-card relative flex flex-col overflow-hidden rounded-lg border border-dashed border-border bg-surface/40 p-7 sm:col-span-2">
            <div className="flex items-start justify-between">
              <div className="rounded-xl border border-border bg-bg p-3 text-accent">
                <Sparkles size={20} strokeWidth={1.5} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                14 realisations
              </span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold text-fg">
              Et 14 sites livres via Tolarys.
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Sites e-commerce Medusa, vitrines metiers, applis multitenant.
              Chaque nom ci-dessous est un client reel accompagne en Next.js,
              Supabase et conformite RGAA 4.1.
            </p>
          </div>
        </div>

        <div
          id="tolarys"
          className="tolarys-marquee mt-12 space-y-3 overflow-hidden"
          aria-label="Liste des realisations Tolarys"
        >
          <div className="marquee-left flex gap-3 will-change-transform">
            {duplicatedTolarys.map((name, i) => (
              <span
                key={`top-${i}`}
                className="shrink-0 rounded-full border border-border bg-surface px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-fg/70"
              >
                {name}
              </span>
            ))}
          </div>
          <div className="marquee-right flex gap-3 will-change-transform">
            {duplicatedTolarys.map((name, i) => (
              <span
                key={`bot-${i}`}
                className="shrink-0 rounded-full border border-border bg-surface px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] text-fg/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
