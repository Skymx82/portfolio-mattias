"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, FileDown } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import MagneticButton from "@/components/ui/MagneticButton";
import { easings, prefersReducedMotion } from "@/lib/motion";

const TITLE_WORDS = ["Mettons-nous", "en", "contact."] as const;
const EMAIL = "mattias.mathevon@gmail.com";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".contact-char", { yPercent: 110 });
      gsap.set([".contact-email", ".contact-cta"], { y: 24, autoAlpha: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: easings.cinematic },
        })
        .to(".contact-char", {
          yPercent: 0,
          stagger: 0.018,
          duration: 1.0,
        })
        .to(
          ".contact-email",
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: easings.standard,
          },
          "-=0.5",
        )
        .to(
          ".contact-cta",
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
      id="contact"
      className="relative bg-bg py-32 sm:py-40"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          09 / Contact
        </p>

        <h2 className="mt-6 font-display font-semibold leading-[0.95] tracking-tight text-fg text-[clamp(2.75rem,9vw,7rem)]">
          {TITLE_WORDS.map((word, wi) => (
            <Fragment key={wi}>
              <span className="inline-block whitespace-nowrap">
                {word.split("").map((char, ci) => (
                  <span
                    key={ci}
                    className="char-mask inline-block overflow-hidden align-bottom"
                  >
                    <span className="contact-char inline-block">{char}</span>
                  </span>
                ))}
              </span>
              {wi < TITLE_WORDS.length - 1 && " "}
            </Fragment>
          ))}
        </h2>

        <div className="contact-email mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            Email direct
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="group mt-4 inline-block font-display text-[clamp(1.5rem,5vw,3.5rem)] font-semibold leading-tight text-fg transition-colors hover:text-accent"
          >
            <span className="relative inline-block">
              {EMAIL}
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </span>
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-3">
          <MagneticButton strength={0.25}>
            <a
              href="/cv"
              className="contact-cta inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent/90"
            >
              <FileDown size={14} strokeWidth={1.5} />
              Telecharger le CV (PDF)
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <a
              href="https://github.com/Skymx82"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cta inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <GitHubIcon size={14} />
              GitHub
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <a
              href="https://www.linkedin.com/in/mattiasmathevon"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cta inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedInIcon size={14} />
              LinkedIn
            </a>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <a
              href={`mailto:${EMAIL}`}
              className="contact-cta inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={14} strokeWidth={1.5} />
              Email
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
