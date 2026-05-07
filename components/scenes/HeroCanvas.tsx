"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/motion";

const vertexShader = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform vec2  uMouseVel;
  uniform vec3  uBg;
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

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.04;

    // Deux halos distincts :
    // - mouseHalo (large) : boost de visibilite des nuages autour du curseur
    // - pushHalo (serre) : zone ou le fluide est pousse par la velocite
    float mouseDist = distance(uv, uMouse);
    float mouseHalo = 1.0 - smoothstep(0.0, 0.18, mouseDist);
    float pushHalo = 1.0 - smoothstep(0.0, 0.09, mouseDist);

    // Effet fluide : on decale le sample fbm dans la direction OPPOSEE
    // a la velocite souris, sur une zone serree (pushHalo).
    vec2 fluidPush = uMouseVel * pushHalo * 14.0;
    vec2 displacedP = p - fluidPush;

    // Sample fbm sur le point deplace : intacte loin du curseur, distordu
    // dans le halo selon le mouvement de la souris.
    float n = fbm(displacedP * 2.5 + vec2(t, -t * 0.6));

    // Boost local du noise dans le halo : les nuages s'intensifient
    // autour du curseur.
    float boostedN = n + mouseHalo * 0.22;

    // Base : charcoal a peine teinte.
    vec3 col = mix(uBg, uAccent, 0.03);

    // Nuages accent.
    float accentMask = smoothstep(0.4, 0.78, boostedN) * 0.32;
    col = mix(col, uAccent, accentMask);

    // Vignette : assombrit les bords.
    float dist = distance(uv, vec2(0.5, 0.5));
    float vignette = 1.0 - smoothstep(0.3, 0.95, dist);
    col = mix(col * 0.65, col, vignette);

    // Grain.
    float grain = (hash(uv * uResolution + uTime * 60.0) - 0.5) * 0.025;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

type MouseState = {
  // Position cible (set par mousemove listener) en uv 0-1.
  tx: number;
  ty: number;
  // Position actuelle (lerp vers cible).
  x: number;
  y: number;
  // Inertie : accumule la velocite, se dissipe avec damping.
  velX: number;
  velY: number;
};

type Uniforms = {
  uTime: { value: number };
  uResolution: { value: THREE.Vector2 };
  uMouse: { value: THREE.Vector2 };
  uMouseVel: { value: THREE.Vector2 };
  uBg: { value: THREE.Color };
  uAccent: { value: THREE.Color };
};

function ShaderPlane({
  uniforms,
  mouseRef,
}: {
  uniforms: Uniforms;
  mouseRef: React.RefObject<MouseState>;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = timeRef.current;

    // Resolution en pixels physiques (buffer) pour matcher gl_FragCoord.
    const dpr = state.gl.getPixelRatio();
    m.uniforms.uResolution.value.set(
      state.size.width * dpr,
      state.size.height * dpr,
    );

    // Lerp position vers cible + inertie sur la velocite.
    const mr = mouseRef.current;
    if (mr) {
      const prevX = mr.x;
      const prevY = mr.y;
      const lerp = 0.08;
      mr.x += (mr.tx - mr.x) * lerp;
      mr.y += (mr.ty - mr.y) * lerp;

      // Inertie : accumule (mr.x - prevX) puis damping. Effet "fluide"
      // qui continue de bouger apres l'arret de la souris.
      const damping = 0.85;
      mr.velX = mr.velX * damping + (mr.x - prevX) * 0.6;
      mr.velY = mr.velY * damping + (mr.y - prevY) * 0.6;

      m.uniforms.uMouse.value.set(mr.x, mr.y);
      m.uniforms.uMouseVel.value.set(mr.velX, mr.velY);
    }
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

export default function HeroCanvas() {
  const mouseRef = useRef<MouseState>({
    tx: 0.5,
    ty: 0.5,
    x: 0.5,
    y: 0.5,
    velX: 0,
    velY: 0,
  });

  const uniforms = useMemo<Uniforms>(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVel: { value: new THREE.Vector2(0, 0) },
      uBg: { value: new THREE.Color("#0a0a0b") },
      uAccent: { value: new THREE.Color("#ff4d2e") },
    }),
    [],
  );

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const onMouseMove = (e: MouseEvent) => {
      const mr = mouseRef.current;
      mr.tx = e.clientX / window.innerWidth;
      mr.ty = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  if (prefersReducedMotion()) {
    return (
      <div
        className="absolute inset-0 z-0 bg-gradient-to-b from-bg via-surface to-bg"
        aria-hidden="true"
      />
    );
  }

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: false, antialias: false, powerPreference: "low-power" }}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    >
      <ShaderPlane uniforms={uniforms} mouseRef={mouseRef} />
    </Canvas>
  );
}
