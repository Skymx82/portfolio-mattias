"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { easings, prefersReducedMotion } from "@/lib/motion";

const NAME_WORDS = ["Mattias", "Mathevon"] as const;

const LINKS = [
  {
    href: "https://github.com/Skymx82",
    label: "GitHub",
    Icon: GitHubIcon,
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/mattiasmathevon",
    label: "LinkedIn",
    Icon: LinkedInIcon,
    external: true,
  },
  {
    href: "mailto:mattias.mathevon@gmail.com",
    label: "Email",
    Icon: Mail,
    external: false,
  },
] as const;

export default function HeroText() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.set(".hero-char", { yPercent: 110 });
      gsap.set([".hero-tagline", ".hero-meta", ".hero-link"], {
        opacity: 0,
        y: 16,
      });

      const tl = gsap.timeline({ defaults: { ease: easings.cinematic } });

      tl.to(".hero-char", {
        yPercent: 0,
        stagger: 0.025,
        duration: 1.1,
        delay: 0.25,
      })
        .to(
          ".hero-tagline",
          { opacity: 1, y: 0, duration: 0.9, ease: easings.standard },
          "-=0.5",
        )
        .to(
          ".hero-meta",
          { opacity: 1, y: 0, duration: 0.7, ease: easings.standard },
          "-=0.6",
        )
        .to(
          ".hero-link",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.07,
            ease: easings.standard,
          },
          "-=0.5",
        );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10"
    >
      <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-fg text-[clamp(2.75rem,9.5vw,7rem)]">
        {NAME_WORDS.map((word, wi) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="char-mask inline-block overflow-hidden align-bottom"
                >
                  <span className="hero-char inline-block">{char}</span>
                </span>
              ))}
            </span>
            {wi < NAME_WORDS.length - 1 && " "}
          </Fragment>
        ))}
      </h1>

      <p className="hero-tagline mt-8 max-w-2xl text-lg sm:text-xl text-fg/85 leading-relaxed">
        Developpeur fullstack 19 ans. Fondateur d&apos;
        <span className="text-accent">AutoSoft</span>, cofondateur Tolarys.
      </p>

      <p className="hero-meta mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        BTS SIO SLAM &middot; Candidat E6 mai 2026 &middot; Toulouse
      </p>

      <div className="mt-10 flex items-center gap-3">
        {LINKS.map(({ href, label, Icon, external }) => (
          <a
            key={label}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={label}
            className="hero-link inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-fg/70 transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <Icon size={16} strokeWidth={1.5} />
          </a>
        ))}
      </div>
    </div>
  );
}
