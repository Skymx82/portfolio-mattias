import Hero from "@/components/scenes/Hero";
import AutoSoft from "@/components/scenes/AutoSoft";
import About from "@/components/scenes/About";
import Projects from "@/components/scenes/Projects";
import Stages from "@/components/scenes/Stages";
import E5 from "@/components/scenes/E5";
import Veille from "@/components/scenes/Veille";
import Perspectives from "@/components/scenes/Perspectives";
import Contact from "@/components/scenes/Contact";
import TransitionShaderMount from "@/components/scenes/TransitionShaderMount";

export default function Home() {
  return (
    <main>
      <TransitionShaderMount />
      <Hero />
      <AutoSoft />
      <About />
      <Projects />
      <Stages />
      <E5 />
      <Veille />
      <Perspectives />
      <Contact />
    </main>
  );
}
