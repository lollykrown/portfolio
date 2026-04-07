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
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <path d="M4 6l6-4 6 4v8l-6 4-6-4V6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M4 6l6 4m6-4l-6 4m0 0v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    skills: [
      { name: "Next.js", level: 95 },
      { name: "React", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 98 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <rect x="2" y="3" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="2" y="12" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <circle cx="5.5" cy="5.5" r="1" fill="currentColor"/>
        <circle cx="5.5" cy="14.5" r="1" fill="currentColor"/>
      </svg>
    ),
    skills: [
      { name: "Node.js", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "Prisma", level: 82 },
      { name: "Supabase", level: 85 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    category: "Design",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10 6v4l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    skills: [
      { name: "Figma", level: 88 },
      { name: "Responsive design", level: 96 },
      { name: "Design systems", level: 80 },
      { name: "Prototyping", level: 78 },
      { name: "Accessibility", level: 82 },
    ],
  },
  {
    category: "Tools",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <path d="M11.5 3.5L16.5 8.5L8 17L3 17L3 12L11.5 3.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M9 6L14 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Vercel", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Docker basics", level: 65 },
      { name: "Performance auditing", level: 80 },
    ],
  },
];

function SkillBar({ name, level, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="flex flex-col gap-1.5"
    >
      <div className="flex justify-between items-center">
        <span className="text-(--color-text-secondary) text-sm font-medium">{name}</span>
        <span className="text-xs font-bold" style={{ color: "color-mix(in srgb, var(--color-accent-hover) 60%, transparent)" }}>
          {level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 0.9, delay: index * 0.06 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, var(--color-accent), var(--color-accent-light))` }}
        />
      </div>
    </motion.div>
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
          {skillGroups.map((group) => (
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
                <div className="flex items-center gap-3 mb-6 pb-4 border-b" style={{ borderColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" }}>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 12%, transparent)", color: "var(--color-accent-subtle)" }}
                  >
                    {group.icon}
                  </div>
                  <span className="text-xs font-black tracking-[0.18em] uppercase" style={{ color: "var(--color-accent-subtle)" }}>
                    {group.category}
                  </span>
                </div>

                {/* Skill bars */}
                <div className="flex flex-col gap-4">
                  {group.skills.map((skill, i) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
                  ))}
                </div>
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