"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { easings, prefersReducedMotion } from "@/lib/motion";

const PARAGRAPHS = [
  "Etudiant en deuxieme annee de BTS SIO option SLAM a Toulouse. J'ai commence a coder pendant le lycee et j'ai monte mes premieres applications en parallele des etudes.",
  "Statut National d'Etudiant-Entrepreneur (SNEE) avec l'Universite Federale Toulouse Midi-Pyrenees. C'est dans ce cadre qu'AutoSoft, mon ERP SaaS pour auto-ecoles, est passe du prototype a la production en moins d'un an.",
  "En parallele, je cofonde Tolarys, agence de developpement web Next.js + Supabase. Cinq clients accompagnes a date, conformite accessibilite RGAA 4.1, e-commerce Medusa, multitenant. La theorie BTS et le terrain entrepreneurial avancent ensemble.",
];

const STATS = [
  { value: "19", label: "ans" },
  { value: "2", label: "entreprises" },
  { value: "5+", label: "clients" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".about-photo", { y: 40, autoAlpha: 0 });
      gsap.set(".about-paragraph", { y: 24, autoAlpha: 0 });
      gsap.set(".about-stat", { y: 20, autoAlpha: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        })
        .to(".about-photo", {
          y: 0,
          autoAlpha: 1,
          duration: 1.0,
          ease: easings.standard,
        })
        .to(
          ".about-paragraph",
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.8,
            ease: easings.enter,
          },
          "-=0.7",
        )
        .to(
          ".about-stat",
          {
            y: 0,
            autoAlpha: 1,
            stagger: 0.06,
            duration: 0.6,
            ease: easings.standard,
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-bg py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-16">
          {/* Photo */}
          <div className="md:col-span-5">
            <div className="about-photo relative aspect-[4/5] overflow-hidden rounded-lg border border-border bg-surface">
              <Image
                src="/photo.jpg"
                alt="Portrait de Mattias Mathevon"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                style={{ filter: "grayscale(0.6) contrast(1.05)" }}
              />
            </div>
          </div>

          {/* Texte */}
          <div className="md:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              02 / Profil
            </p>
            <h2 className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-fg text-[clamp(2.5rem,7vw,5rem)]">
              A propos.
            </h2>
            <div className="mt-8 max-w-xl space-y-5">
              {PARAGRAPHS.map((p, i) => (
                <p
                  key={i}
                  className="about-paragraph text-base sm:text-lg text-fg/85 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bandeau chiffres */}
        <div className="mt-20 sm:mt-28 grid grid-cols-3 border-t border-border pt-10">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="about-stat flex flex-col gap-2 px-2 sm:px-6"
            >
              <p className="font-display font-semibold leading-none text-fg text-[clamp(2rem,5vw,3.5rem)]">
                {stat.value}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
