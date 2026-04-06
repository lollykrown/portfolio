import Hero from "@/components/Hero";
import FeaturedProject from "@/components/FeaturedProjects";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <FeaturedProject /> */}
      <Projects />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}