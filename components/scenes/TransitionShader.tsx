"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isMobileViewport, prefersReducedMotion } from "@/lib/motion";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec3  uAccent;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;

    // Decoupage en bandes horizontales avec offset chromatique pseudo-aleatoire.
    float bandY = floor(uv.y * 32.0);
    float bandRand = hash(vec2(bandY, floor(uTime * 8.0)));
    float bandShift = (bandRand - 0.5) * 0.05;
    vec2 sampleUv = vec2(uv.x + bandShift, uv.y);

    // Couleur dominante : vermillon vif.
    vec3 col = uAccent;

    // Variations de luminosite via fbm-like noise.
    float n = noise(sampleUv * 60.0 + uTime * 1.5);
    col *= 0.55 + n * 0.7;

    // Scanlines fines (180 lignes / hauteur).
    float scan = step(0.5, fract(uv.y * 180.0 + uTime * 30.0));
    col *= 0.55 + scan * 0.5;

    // Rolling shutter : bande noire mobile horizontale.
    float roll = smoothstep(0.0, 0.04, abs(fract(uv.y - uTime * 0.3) - 0.5));
    col *= roll * 0.4 + 0.6;

    // RGB shift par canal R / B.
    float rN = noise(vec2(sampleUv.x * 80.0 + 5.0, sampleUv.y * 60.0 + uTime));
    float bN = noise(vec2(sampleUv.x * 80.0 - 5.0, sampleUv.y * 60.0 + uTime));
    col.r += rN * 0.3;
    col.b -= bN * 0.18;

    // Flash central blanc (simulation de surexposition sporadique).
    float dist = distance(uv, vec2(0.5, 0.5));
    float flash = 1.0 - smoothstep(0.0, 0.45, dist);
    float flashPulse = step(0.85, fract(uTime * 1.7));
    col = mix(col, vec3(1.0, 1.0, 1.0), flash * 0.45 * flashPulse);

    // Vignette : assombrit les bords pour concentrer l'attention.
    float vign = 1.0 - smoothstep(0.4, 1.1, dist) * 0.65;
    col *= vign;

    // Grain prononce.
    float grain = (hash(uv * uResolution + uTime * 100.0) - 0.5) * 0.18;
    col += grain;

    // Canvas opaque : alpha = 1.0, la visibilite est geree par le container DIV.
    gl_FragColor = vec4(col, 1.0);
  }
`;

type Uniforms = {
  uTime: { value: number };
  uResolution: { value: THREE.Vector2 };
  uAccent: { value: THREE.Color };
};

function TransitionMesh({ uniforms }: { uniforms: Uniforms }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((_, delta) => {
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
  });

  return (
    <ScreenQuad>
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </ScreenQuad>
  );
}

export default function TransitionShader() {
  const containerRef = useRef<HTMLDivElement>(null);

  const uniforms = useMemo<Uniforms>(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uAccent: { value: new THREE.Color("#ff4d2e") },
    }),
    [],
  );

  useEffect(() => {
    if (prefersReducedMotion() || isMobileViewport()) return;

    gsap.registerPlugin(ScrollTrigger);

    const updateResolution = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    updateResolution();
    window.addEventListener("resize", updateResolution);

    const trigger = ScrollTrigger.create({
      trigger: "#hero",
      start: "bottom 90%",
      end: "bottom 20%",
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const p = self.progress;
        // Triangle : pic a p=0.5
        const intensity = 1 - Math.abs(p - 0.5) * 2;
        const eased = Math.max(0, intensity);
        if (containerRef.current) {
          containerRef.current.style.opacity = String(eased);
          containerRef.current.style.visibility =
            eased < 0.005 ? "hidden" : "visible";
        }
      },
    });

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("resize", updateResolution);
      trigger.kill();
    };
  }, [uniforms]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ opacity: 0, visibility: "hidden" }}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: false, antialias: false, powerPreference: "low-power" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <TransitionMesh uniforms={uniforms} />
      </Canvas>
    </div>
  );
}
