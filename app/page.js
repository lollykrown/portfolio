"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import { Projects } from "@/components/projects";
import ProjectModal from "@/components/ProjectModal";
import { useState } from "react";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};


export default function Home() {
    const [selectedProject, setSelectedProject] = useState(null);
  
  return (
    <main className="min-h-screen flex flex-col bg-(--color-bg-page) shadow-(--shad) pt-20" >
      <Hero />
      <motion.section
        id="projects"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative py-24 px-6 overflow-hidden bg-(--color-bg-page)"
      >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full blur-[120px]"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 12%, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-100 h-75 rounded-full blur-[100px]"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 10%, transparent)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 text-(--color-accent-subtle)">
            Selected Work
          </span>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="text-4xl md:text-5xl font-black text-(--color-text-primary) leading-tight">
              Projects that{" "}
              <span className="text-accent-gradient">speak</span>
              <br />
              for themselves
            </h2>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-(--color-text-primary) hover:text-(--color-accent) transition-colors group mb-1"
            >
              View all
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--color-accent) 20%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5h6M5 2l3 3-3 3" stroke="var(--color-accent-subtle)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Project grid */}
        <Projects projects={projects.slice(0,3)} stagger={stagger} cardVar={cardVariants} onClick={setSelectedProject}/>

      </div>
      </motion.section>
      <About />
      <Skills />
      <Contact />
      {/* ── MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
