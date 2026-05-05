"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (prefersReducedMotion()) return;

    const overlay = overlayRef.current;
    const accent = accentRef.current;
    if (!overlay || !accent) return;

    gsap.killTweensOf([overlay, accent]);

    const tl = gsap.timeline();

    // Slide in : bande noire qui monte du bas, surmontee d'une fine bande accent.
    tl.set([overlay, accent], { yPercent: 100, autoAlpha: 1 })
      .to(overlay, { yPercent: 0, duration: 0.55, ease: "expo.inOut" })
      .to(
        accent,
        { yPercent: 0, duration: 0.55, ease: "expo.inOut" },
        "-=0.5",
      )
      // Pause breve pour masquer le mount
      .to({}, { duration: 0.15 })
      // Slide out : meme bande qui sort par le haut
      .to(overlay, { yPercent: -100, duration: 0.7, ease: "expo.inOut" })
      .to(
        accent,
        { yPercent: -100, duration: 0.7, ease: "expo.inOut" },
        "-=0.6",
      )
      .set([overlay, accent], { autoAlpha: 0 });
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[90] bg-bg"
        style={{ opacity: 0, transform: "translateY(100%)" }}
        aria-hidden="true"
      />
      <div
        ref={accentRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-[91] h-[3px] bg-accent"
        style={{ opacity: 0, transform: "translateY(100%)" }}
        aria-hidden="true"
      />
    </>
  );
}
