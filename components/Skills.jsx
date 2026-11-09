"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const cardVar = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

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

const skillGroups = [
  {
    category: "Frontend",
    description: "Fast, accessible interfaces built with modern tooling.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <path d="M4 6l6-4 6 4v8l-6 4-6-4V6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M4 6l6 4m6-4l-6 4m0 0v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    skills: [
      "Html/css & Javascript",
      "React & Next.js",
      "TypeScript",
      "Responsive UI",
      "State management",
      "Animation & motion",
      "Performance optimisation",
    ],
  },
  {
    category: "Backend",
    description: "Reliable APIs and data layers that scale.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <rect x="2" y="3" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="2" y="12" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="5.5" cy="5.5" r="1" fill="currentColor"/>
        <circle cx="5.5" cy="14.5" r="1" fill="currentColor"/>
      </svg>
    ),
    skills: [
      "REST API design",
      "Authentication & authorisation",
      "SQL & NoSQL databases",
      "Cloud services",
      "Serverless functions",
      "Third-party integrations",
    ],
  },
  {
    category: "Design",
    description: "Thoughtful, consistent experiences across devices.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    skills: [
      "UI/UX design",
      "Design systems",
      "Prototyping",
      "Wireframing",
      "Accessibility (WCAG)",
      "Responsive layouts",
      "Typography & colour",
    ],
  },
  {
    category: "Tools",
    description: "A workflow that ships quickly and stays maintainable.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <path d="M11.5 3.5L16.5 8.5L8 17L3 17L3 12L11.5 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M9 6L14 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    skills: [
      "Version control",
      "CI/CD & deployment",
      "Containers",
      "Testing & debugging",
      "Performance auditing",
      "Monitoring & analytics",
    ],
  },
];

function SkillTag({ name, index }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="px-3 py-1.5 rounded-lg text-[13px] font-medium text-(--color-text-secondary) border transition-colors duration-200 hover:text-(--color-text-primary)"
      style={{
        backgroundColor: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {name}
    </motion.li>
  );
}

export default function HomeSkills() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative py-28 px-6 overflow-hidden border-t"
      style={{ backgroundColor: "var(--color-bg-page)", borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Glow style={{ width: 650, height: 350, top: 0, left: "50%", transform: "translateX(-50%)", backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 10%, transparent)" }} />
        <Glow style={{ width: 400, height: 250, bottom: 0, right: 0, backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 7%, transparent)" }} />
        <DotGrid />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--color-accent-subtle)" }}
            >
              Skills & expertise
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-black text-(--color-text-primary) leading-[0.95] tracking-tight"
            >
              Tools I use
              <br />
              <span className="text-accent-gradient">every day</span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="text-(--color-text-secondary) text-sm max-w-xs leading-relaxed md:text-right">
            A snapshot of my current stack. Always learning, always adding to the list.
          </motion.p>
        </motion.div>

        {/* Skill cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              variants={cardVar}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl p-6 border border-(--color-border-hover) hover:border-white/18 transition-colors duration-300 overflow-hidden"
              style={{ backgroundColor: "var(--color-bg-card-darker)" }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent 65%)" }}
              />
              {/* Top accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to right, var(--color-accent), transparent)" }}
              />

              <div className="relative">
                {/* Category header */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 12%, transparent)", color: "var(--color-accent-subtle)" }}
                  >
                    {group.icon}
                  </div>
                  <span className="text-xs font-semibold tabular-nums tracking-widest" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-(--color-text-primary) mb-1.5">{group.category}</h3>
                <p className="text-(--color-text-secondary) text-sm leading-relaxed mb-5 pb-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  {group.description}
                </p>

                {/* Skill tags */}
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <SkillTag key={skill} name={skill} index={i} />
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/about" className="btn-border"
          >
            Full background & experience
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}