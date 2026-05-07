"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { isMobileViewport, prefersReducedMotion } from "@/lib/motion";

const STATS = [
  { value: "4", label: "auto-ecoles utilisatrices" },
  { value: "30", label: "utilisateurs actifs" },
  { value: "1 an", label: "de developpement solo" },
] as const;

const CAPTURES = [
  {
    src: "/projets/autosoft/images/dashboard.png",
    alt: "Dashboard Autosoft",
    fit: "cover" as const,
  },
  {
    src: "/projets/autosoft/images/eleves.png",
    alt: "Gestion des eleves",
    fit: "cover" as const,
  },
  {
    src: "/projets/autosoft/images/planning.png",
    alt: "Planning des leçons",
    fit: "cover" as const,
  },
  {
    src: "/projets/autosoft/images/mobile.png",
    alt: "App mobile moniteur",
    fit: "contain" as const,
  },
];

const TECHS = [
  "Next.js",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Tailwind",
  "Stripe",
  "API ANTS",
];

const COMPETENCES = ["C3", "C4", "C5", "C6"];

const PHASE_BASE = "py-24 md:py-0 md:absolute md:inset-0 md:flex md:items-center";

export default function AutoSoft() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isMobileViewport()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set([".as-phase-2", ".as-phase-3", ".as-phase-4"], {
        autoAlpha: 0,
      });
      gsap.set(".as-stat", { y: 40, autoAlpha: 0 });
      gsap.set(".as-capture", { y: 60, autoAlpha: 0 });
      gsap.set(".as-outro > *", { y: 24, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%",
          pin: pinRef.current,
          scrub: 0.5,
          anticipatePin: 1,
          // Snap aux centres des 4 phases stables : evite de viser pile
          // une transition, le scroll s'arrete tout seul sur la phase la
          // plus proche.
          snap: {
            snapTo: [0.1, 0.38, 0.65, 0.93],
            duration: { min: 0.2, max: 0.55 },
            delay: 0.05,
            ease: "power2.inOut",
          },
        },
      });

      // Phase 1 stable 0 -> 0.20. Transition 0.20 -> 0.30. Phase 2 stable 0.30 -> 0.45.
      tl.to(".as-phase-1", { autoAlpha: 0, duration: 0.1 }, 0.2)
        .to(".as-phase-2", { autoAlpha: 1, duration: 0.1 }, 0.25)
        .to(
          ".as-stat",
          { y: 0, autoAlpha: 1, stagger: 0.025, duration: 0.06 },
          0.3,
        );

      // Transition 0.45 -> 0.55. Phase 3 stable 0.55 -> 0.75.
      tl.to(".as-phase-2", { autoAlpha: 0, duration: 0.1 }, 0.45)
        .to(".as-phase-3", { autoAlpha: 1, duration: 0.1 }, 0.5)
        .to(
          ".as-capture",
          { y: 0, autoAlpha: 1, stagger: 0.03, duration: 0.06 },
          0.55,
        );

      // Transition 0.75 -> 0.85. Phase 4 stable 0.85 -> 1.
      tl.to(".as-phase-3", { autoAlpha: 0, duration: 0.1 }, 0.75)
        .to(".as-phase-4", { autoAlpha: 1, duration: 0.1 }, 0.8)
        .to(
          ".as-outro > *",
          { y: 0, autoAlpha: 1, stagger: 0.025, duration: 0.06 },
          0.85,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="autosoft" className="relative bg-bg">
      <div
        ref={pinRef}
        className="relative w-full md:flex md:min-h-svh md:items-center md:overflow-hidden"
      >
        {/* Phase 1 : titre + accroche */}
        <div className={`as-phase-1 ${PHASE_BASE}`}>
          <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              04 / Projet phare
            </p>
            <h2 className="mt-6 font-display font-semibold leading-[0.92] tracking-tight text-fg text-[clamp(3rem,11vw,8rem)]">
              AutoSoft
            </h2>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-fg/85 leading-relaxed">
              ERP SaaS complet pour auto-ecoles.{" "}
              <span className="text-accent">En production.</span>
            </p>
            <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted leading-relaxed">
              Dashboard temps reel, planning multi-moniteurs, comptabilite,
              paiements Stripe et application mobile dediee, sur une
              architecture multitenant scalable.
            </p>
          </div>
        </div>

        {/* Phase 2 : 3 chiffres clés */}
        <div className={`as-phase-2 ${PHASE_BASE}`}>
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 sm:px-10 sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <div key={i} className="as-stat text-left">
                <p className="font-display font-semibold leading-none text-fg text-[clamp(3rem,8vw,6rem)]">
                  {stat.value}
                </p>
                <p className="mt-3 max-w-[14rem] text-sm sm:text-base text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Phase 3 : captures cascade */}
        <div className={`as-phase-3 ${PHASE_BASE}`}>
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CAPTURES.map((capture, i) => (
                <div
                  key={i}
                  className="as-capture relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-surface"
                >
                  <Image
                    src={capture.src}
                    alt={capture.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={
                      capture.fit === "contain"
                        ? "object-contain p-4"
                        : "object-cover"
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Phase 4 : techs + competences + CTA */}
        <div className={`as-phase-4 ${PHASE_BASE}`}>
          <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
            <div className="as-outro">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Stack technique
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {TECHS.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-3 py-1.5 rounded-full bg-surface border border-border text-fg/85"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                Competences BTS mobilisees
              </p>
              <div className="mt-5 flex gap-2">
                {COMPETENCES.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-xs px-3 py-1.5 rounded-full border border-accent/40 bg-accent/10 text-accent"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <Link
                href="/projets/autosoft"
                className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-bg font-medium hover:bg-accent/90 transition-colors"
              >
                Voir le projet en detail
                <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Indicateur progression (desktop only) */}
        <div
          className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-2"
          aria-hidden="true"
        >
          {[1, 2, 3, 4].map((n) => (
            <span key={n} className="h-1 w-8 rounded-full bg-border" />
          ))}
        </div>
      </div>
    </section>
  );
}
