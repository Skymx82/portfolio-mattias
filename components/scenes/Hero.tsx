"use client";

import dynamic from "next/dynamic";
import HeroText from "./HeroText";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-bg">
      <div className="absolute inset-0 hidden md:block" aria-hidden="true">
        <HeroCanvas />
      </div>
      <div
        className="absolute inset-0 md:hidden bg-gradient-to-b from-bg via-surface to-bg"
        aria-hidden="true"
      />
      <HeroText />
    </section>
  );
}
