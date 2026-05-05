import Hero from "@/components/scenes/Hero";
import AutoSoft from "@/components/scenes/AutoSoft";
import About from "@/components/scenes/About";
import Projects from "@/components/scenes/Projects";
import Stages from "@/components/scenes/Stages";
import E5 from "@/components/scenes/E5";
import Veille from "@/components/scenes/Veille";

export default function Home() {
  return (
    <main>
      <Hero />
      <AutoSoft />
      <About />
      <Projects />
      <Stages />
      <E5 />
      <Veille />
    </main>
  );
}
