"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function Glow({ style }) {
  return <div className="absolute rounded-full blur-[120px] pointer-events-none" style={style} />;
}
function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.035] pointer-events-none"
      style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
    />
  );
}

const highlights = [
  { value: "3+", label: "Years building" },
  { value: "20+", label: "Projects shipped" },
  { value: "100%", label: "Remote friendly" },
];

export default function HomeAbout() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative py-28 px-6 overflow-hidden border-t"
      style={{ backgroundColor: "var(--color-bg-page)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Glow style={{ width: 600, height: 350, top: "0", left: "-5%", backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 12%, transparent)" }} />
        <Glow style={{ width: 400, height: 250, bottom: "0", right: "5%", backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 8%, transparent)" }} />
        <DotGrid />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Photo side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative">
            {/* Amber frame accent */}
            <div
              className="absolute -inset-3 rounded-3xl opacity-30 pointer-events-none"
              style={{ background: "linear-gradient(135deg, var(--color-accent), transparent 60%)" }}
            />
            {/* Photo card */}
            <div
              className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-white/10"
              style={{ backgroundColor: "var(--color-bg-card-darker)" }}
            >
              {/* Swap this div for <Image src="/your-photo.jpg" fill className="object-cover" alt="Your name" /> */}
              <div
                className="w-full h-full flex items-end p-6"
                style={{
                  background: "linear-gradient(135deg, color-mix(in srgb, var(--color-accent-muted) 55%, transparent) 0%, color-mix(in srgb, var(--color-accent-hover) 15%, #0c0c14) 100%)",
                }}
              >
                <div>
                  <p className="text-white font-black text-xl">Your Name</p>
                  <p className="text-[11px] tracking-widest uppercase mt-1" style={{ color: "var(--color-accent-subtle)" }}>
                    Freelance Developer
                  </p>
                </div>
              </div>
            </div>

            {/* Floating availability pill */}
            <div
              className="absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-sm"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-card-dark) 92%, transparent)" }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--color-accent)" }} />
              <span className="text-white text-xs font-semibold">Open to work</span>
            </div>

            {/* Mini stat pill */}
            <div
              className="absolute -top-4 -right-4 flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-sm"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-card-dark) 92%, transparent)" }}
            >
              <span className="font-black text-base" style={{ color: "var(--color-accent-subtle)" }}>20+</span>
              <span className="text-gray-400 text-xs">projects</span>
            </div>
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ color: "var(--color-accent-subtle)" }}
          >
            About me
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black text-white leading-[0.95] tracking-tight mb-6"
          >
            The developer
            <br />
            behind the{" "}
            <span className="text-accent-gradient">code</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-gray-400 text-base leading-relaxed mb-4">
            I&apos;m a freelance web developer who turns ideas into fast, beautiful,
            and purposeful digital products. I care deeply about the craft — and
            even more about the people I build for.
          </motion.p>

          <motion.p variants={fadeUp} className="text-gray-500 text-base leading-relaxed mb-8">
            Whether you need a polished marketing site, a full-stack web app, or
            someone to untangle messy legacy code — I can help. I work closely
            with founders, startups, and agencies to ship things that actually work.
          </motion.p>

          {/* Mini stats */}
          <motion.div variants={fadeUp} className="flex items-center gap-8 mb-10">
            {highlights.map((h, i) => (
              <div key={h.label} className="flex flex-col" style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingLeft: i > 0 ? "2rem" : 0 }}>
                <span className="text-2xl font-black" style={{ color: "var(--color-accent-subtle)" }}>{h.value}</span>
                <span className="text-gray-500 text-xs tracking-wide mt-0.5">{h.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
            <Link href="/about" className="btn-accent px-7 py-3 rounded-full inline-flex items-center gap-2">
              More about me
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 3l4 4-4 4" stroke="var(--color-arrow-stroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a
              href="/cv.pdf"
              download
              className="text-sm font-semibold text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-7 py-3 rounded-full transition-all duration-200"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}