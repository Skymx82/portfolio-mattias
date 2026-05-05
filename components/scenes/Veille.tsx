"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { veille } from "@/lib/veille";
import { easings, prefersReducedMotion } from "@/lib/motion";

export default function Veille() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".veille-reveal", { y: 24, autoAlpha: 0 });

      gsap.to(".veille-reveal", {
        y: 0,
        autoAlpha: 1,
        stagger: 0.08,
        duration: 0.8,
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
      id="veille"
      className="relative bg-bg py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          06 / Veille
        </p>
        <h2 className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-fg text-[clamp(2.5rem,7vw,5rem)]">
          Veille technologique.
        </h2>
        <p className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed">
          Sujet suivi en continu pendant le BTS. Plus qu&apos;une lecture
          passive : test, integration, retour terrain.
        </p>

        <div className="mt-16 grid gap-8 rounded-lg border border-border bg-surface p-8 sm:p-10 lg:grid-cols-12 lg:gap-12">
          {/* Sujet + methode */}
          <div className="veille-reveal lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Sujet de veille
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-fg sm:text-4xl">
              {veille.topic}
            </h3>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Methode
            </p>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-fg/80 sm:text-base">
              {veille.method.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Derniere mise a jour : {veille.updatedAt}
            </p>
          </div>

          {/* Sources */}
          <div className="veille-reveal lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
              Sources suivies
            </p>
            <ul className="mt-3 space-y-3">
              {veille.sources.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-lg border border-border bg-bg p-4 transition-all hover:border-accent/50 hover:bg-bg/50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface text-fg/80 transition-colors group-hover:border-accent/40 group-hover:text-accent">
                        <Icon size={16} />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-fg group-hover:text-accent transition-colors">
                          {s.name}
                        </span>
                        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                          {s.type}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.5}
                        className="shrink-0 text-muted transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
