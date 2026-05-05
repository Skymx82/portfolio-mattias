"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ScreenQuad } from "@react-three/drei";
import { useMemo, useRef } from "react";
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
    float n = fbm(p * 2.5 + vec2(t, -t * 0.6));

    // Base : charcoal a peine teinte (presque invisible, juste un soupcon).
    vec3 col = mix(uBg, uAccent, 0.03);

    // Nuages accent : seuil un peu plus serre, intensite moderee.
    float accentMask = smoothstep(0.4, 0.78, n) * 0.32;
    col = mix(col, uAccent, accentMask);

    // Vignette : assombrit les bords (centre garde sa presence).
    float dist = distance(uv, vec2(0.5, 0.5));
    float vignette = 1.0 - smoothstep(0.3, 0.95, dist);
    col = mix(col * 0.65, col, vignette);

    // Grain.
    float grain = (hash(uv * uResolution + uTime * 60.0) - 0.5) * 0.025;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function ShaderPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const timeRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uBg: { value: new THREE.Color("#0a0a0b") },
      uAccent: { value: new THREE.Color("#ff4d2e") },
    }),
    [],
  );

  useFrame((state, delta) => {
    timeRef.current += delta;
    const m = matRef.current;
    if (!m) return;
    m.uniforms.uTime.value = timeRef.current;
    m.uniforms.uResolution.value.set(state.size.width, state.size.height);
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
      <ShaderPlane />
    </Canvas>
  );
}
