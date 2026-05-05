export const easings = {
  standard: "power3.out",
  enter: "power2.out",
  exit: "power3.in",
  cinematic: "expo.out",
  scrub: "none",
} as const;

export const durations = {
  fast: 0.2,
  base: 0.6,
  scene: 1.2,
  cinematic: 2.4,
} as const;

export const lenisConfig = {
  lerp: 0.08,
  duration: 1.2,
  smoothWheel: true,
  syncTouch: false,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 768;
}
