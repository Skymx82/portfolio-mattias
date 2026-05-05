"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { lenisConfig, prefersReducedMotion } from "@/lib/motion";

export default function LenisProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis(lenisConfig);

    // Bridge Lenis -> ScrollTrigger : sans ca, certains triggers (sans pin
    // ni scrub) ne recoivent pas les updates de scroll smoothes par Lenis.
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
