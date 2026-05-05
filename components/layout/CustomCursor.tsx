"use client";

import { useEffect, useRef } from "react";
import { isMobileViewport, prefersReducedMotion } from "@/lib/motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isMobileViewport()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("custom-cursor-on");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    // Le ring lerp vers la souris (effet de trainage doux).
    let rx = mx;
    let ry = my;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Le dot suit instantanement.
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
    };

    const onMouseEnterInteractive = () => {
      ring.classList.add("ring-hover");
    };
    const onMouseLeaveInteractive = () => {
      ring.classList.remove("ring-hover");
    };

    const interactiveSelectors = "a, button, [role='button'], input, textarea";
    const interactives =
      document.querySelectorAll<HTMLElement>(interactiveSelectors);
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    const tick = () => {
      const lerp = 0.18;
      rx += (mx - rx) * lerp;
      ry += (my - ry) * lerp;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-accent"
        style={{
          willChange: "transform",
          transform: "translate3d(-100px, -100px, 0)",
        }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[199] h-8 w-8 rounded-full border border-accent/60 transition-[width,height,border-color,background-color] duration-200"
        style={{
          willChange: "transform",
          transform: "translate3d(-100px, -100px, 0)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
