"use client";

import dynamic from "next/dynamic";

const TransitionShader = dynamic(() => import("./TransitionShader"), {
  ssr: false,
});

export default function TransitionShaderMount() {
  return <TransitionShader />;
}
