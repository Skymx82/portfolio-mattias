"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

const TITLE_WORDS = ["Mattias", "Mathevon"] as const;

export default function IntroLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShow(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setShow(false);
          document.body.style.overflow = "";
        },
      });

      tl.set(".intro-char", { yPercent: 110 })
        .set(".intro-meta", { y: 16, autoAlpha: 0 })
        .to(
          ".intro-char",
          {
            yPercent: 0,
            stagger: 0.025,
            duration: 0.9,
            ease: "expo.out",
          },
          0.25,
        )
        .to(
          ".intro-meta",
          { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
          "-=0.2",
        )
        .to({}, { duration: 0.7 })
        .to(".intro-char", {
          yPercent: -110,
          stagger: 0.018,
          duration: 0.7,
          ease: "expo.in",
        })
        .to(
          ".intro-meta",
          { autoAlpha: 0, duration: 0.3, ease: "power2.in" },
          "<",
        )
        .to(
          containerRef.current,
          {
            yPercent: -100,
            duration: 0.9,
            ease: "expo.inOut",
          },
          "-=0.2",
        );
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      aria-hidden="true"
    >
      <h1 className="font-display text-[clamp(2.5rem,9vw,7rem)] font-semibold leading-[0.95] tracking-tight text-fg">
        {TITLE_WORDS.map((word, wi) => (
          <Fragment key={wi}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="inline-block overflow-hidden align-bottom"
                >
                  <span className="intro-char inline-block">{char}</span>
                </span>
              ))}
            </span>
            {wi < TITLE_WORDS.length - 1 && " "}
          </Fragment>
        ))}
      </h1>
      <p className="intro-meta mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
        Portfolio &middot; BTS SIO SLAM &middot; 2026
      </p>
    </div>
  );
}
