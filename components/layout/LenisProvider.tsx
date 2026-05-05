"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { lenisConfig, prefersReducedMotion } from "@/lib/motion";

export default function LenisProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis(lenisConfig);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
