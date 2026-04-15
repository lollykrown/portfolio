'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { projects } from '@/data/projects';
import CountStat from '@/components/CountStat';
import { Projects } from '@/components/projects';

// ─── Animation variants ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const cardVar = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Ambient background (reused across sections) ──────────────────
function Glow({ left, top, size = 500, opacity = 12 }) {
  return (
    <div
      className="absolute rounded-full blur-[120px] pointer-events-none"
      style={{
        width: size,
        height: size * 0.6,
        left,
        top,
        backgroundColor: `color-mix(in srgb, var(--color-accent-muted) ${opacity}%, transparent)`,
      }}
    />
  );
}

// ─── Dot grid ─────────────────────────────────────────────────────
function DotGrid() {
  return (
    <div
      className="absolute inset-0 opacity-[0.035] pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    />
  );
}

// ─── All unique tech tags across projects ──────────────────────────
const allTags = [
  'All',
  ...Array.from(new Set(projects.flatMap((p) => p.tech ?? []))),
];

// ─── Stats ────────────────────────────────────────────────────────
const stats = [
  // { value: `${projects.length}+`, label: 'Projects shipped' },
  { value: '28+', label: 'Projects shipped' },
  { value: '100%', label: 'Client satisfaction' },
  { value: '11+', label: 'Years building' },
  { value: '30+', label: 'Happy clients' },
];

export default function ProjectsPage() {
  const [activeTag, setActiveTag] = useState('All');

  const filtered =
    activeTag === 'All'
      ? projects
      : projects.filter((p) => p.tech?.includes(activeTag));

  return (
    <main className="min-h-screen flex flex-col bg-(--color-bg-page) pt-20">
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Glow left="10%" top="20%" size={600} opacity={30} />
          <Glow left="60%" top="50%" size={500} opacity={18} />
          <DotGrid />
          {/* Horizontal rule accents */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/4" />
        </div>

        {/* Floating index numbers */}
        <span className="absolute left-[5%] top-[30%] text-[120px] font-black text-white/3 select-none leading-none hidden lg:block">
          01
        </span>
        <span className="absolute right-[5%] bottom-[20%] text-[120px] font-black text-white/3 select-none leading-none hidden lg:block">
          —
        </span>

        <motion.div
          className="relative z-10 text-center max-w-5xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            style={{ color: 'var(--color-accent-subtle)' }}
          >
            Portfolio
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-(--color-text-primary) leading-[0.95] tracking-tight mb-7"
          >
            Work that
            <br />
            <span className="var(--color-accent)">moves</span> the needle
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-(--color-text-secondary) text-lg max-w-lg mx-auto leading-relaxed mb-10"
          >
            A curated selection of projects — from idea to production, built
            with precision and purpose.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link
              href="#projects"
              className="btn-accent px-7 py-3 inline-flex items-center gap-2 rounded-full"
            >
              Explore work
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 2v10M3 8l4 4 4-4"
                  stroke="var(--color-arrow-stroke)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="/contact" className="btn-border" >
              Start a project
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-5 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0"
        >
          {/* <Link href="#projects"> */}
          <div
            className="w-px h-10"
            style={{
              background:
                'linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-accent) 50%, transparent))',
            }}
          />
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              border:
                '1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent) 15%, transparent)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 2v8M3 7l3 3 3-3"
                stroke="var(--color-scroll-stroke)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* </Link> */}
        </motion.div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        className="relative border-y overflow-hidden border-(--color-border)" >
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s,i) => (
           <CountStat key={s.label} stat={s} index={i} />
          ))}
        </div>
      </motion.section>

      {/* ── PROJECTS ──────────────────────────────────────────────── */}
      <section id="projects" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Glow left="50%" top="0" size={700} opacity={10} />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-end justify-between flex-wrap gap-4 mb-8"
            >
              <div>
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3 text-(--color-accent-subtle)">
                  Selected Work
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary)">
                  All projects
                </h2>
              </div>
              <p className="text-(--color-text-secondary) text-sm max-w-xs leading-relaxed">
                {filtered.length} project{filtered.length !== 1 ? 's' : ''} —
                filtered by{' '}
                <span className="text-(--color-accent-subtle) font-semibold">
                  {activeTag}
                </span>
              </p>
            </motion.div>

            {/* Filter pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className="text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200"
                  style={
                    activeTag === tag
                      ? {
                          backgroundColor: 'var(--color-accent)',
                          color: 'var(--color-arrow-stroke)',
                          borderColor: 'var(--color-accent)',
                        }
                      : {
                          backgroundColor: 'transparent',
                          color: 'var(--color-accent-subtle)',
                          borderColor:
                            'color-mix(in srgb, var(--color-accent) 30%, transparent)',
                        }
                  }
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Grid */}
          <Projects projects={filtered} stagger={stagger} cardVar={cardVar} activeTag={activeTag}/>

        </div>
      </section>

      {/* ── PROCESS ───────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-100px' }}
        className="relative py-24 px-6 overflow-hidden border-t border-['rgba(255,255,255,0.06)']"
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow left="0" top="0" size={500} opacity={8} />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              How I work
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-black text-(--color-text-primary) mb-14"
            >
              From idea to{' '}
              <span className="text-accent-gradient">live product</span>
            </motion.h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Discovery',
                  desc: 'Understanding your goals, audience, and constraints before writing a single line of code.',
                },
                {
                  step: '02',
                  title: 'Design',
                  desc: 'Wireframes and high-fidelity mockups that align on look, feel, and user flow early.',
                },
                {
                  step: '03',
                  title: 'Build',
                  desc: 'Clean, performant code using modern tooling — shipped in iterations with continuous feedback.',
                },
                {
                  step: '04',
                  title: 'Launch',
                  desc: 'Deployment, testing, and handoff. Plus ongoing support to keep things running smoothly.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  variants={cardVar}
                  className="relative group"
                >
                  {/* Connector line */}
                  {i < 3 && (
                    <div
                      className="absolute top-5 left-full w-full h-px hidden md:block -translate-x-3"
                      style={{
                        background:
                          'linear-gradient(to right, color-mix(in srgb, var(--color-accent) 30%, transparent), transparent)',
                      }}
                    />
                  )}
                  <div
                    className="rounded-2xl p-6 border border-white/8 h-full hover:border-white/20 transition-colors duration-300"
                    style={{ backgroundColor: 'var(--color-bg-card-darker)' }}
                  >
                    <span
                      className="text-4xl font-black block mb-4 leading-none"
                      style={{
                        color:
                          'color-mix(in srgb, var(--color-accent) 50%, transparent)',
                      }}
                    >
                      {item.step}
                    </span>
                    <h3 className="text-(--color-text-primary) font-black text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-(--color-text-secondary) text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── TECH STACK ────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative py-20 px-6 border-t overflow-hidden"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow left="50%" top="0" size={600} opacity={8} />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <span
            className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--color-accent-subtle)' }}
          >
            Tech stack
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary) mb-12">
            Tools of the <span className="var(--color-accent)">trade</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              'HTML/CSS',
              'Javascript',
              'Node.js',
              'React',
              'React Native',
              'Next.js',
              'TypeScript',
              'Tailwind CSS',
              'Framer Motion',
              'Prisma',
              'Vercel',
              'Figma',
              'Digital Ocean',
              'Git',
              'GitHub',
              'CI/CD',
              'Agile methodologies',
              'Test-driven development',
              'RESTful APIs',
              'GraphQL',
              'SEO',
              'Firebase',
              'Stripe',
              'Headless CMS',
              'Microservices',
              'WebSockets',
              'OAuth',
              'JWT',
              'Accessibility best practices',
              'Performance optimization techniques',  
              'Cross-browser compatibility strategies',
              'Progressive Web App (PWA) development',
              'Mobile-first design principles',
              'Cloud platforms (AWS, Azure, GCP)',
              'API design and development',
              'Database management (SQL and NoSQL)',
              'Testing frameworks (Jest, Cypress)',
              'Performance monitoring tools',
              'Collaboration tools (Slack, Jira, Trello)',
            ].map((tech) => (
              <span
                key={tech}
                className="text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-200 hover:border-amber-500/40 cursor-default"
                style={{
                  color: 'var(--color-accent-subtle)',
                  borderColor:
                    'color-mix(in srgb, var(--color-accent) 20%, transparent)',
                  backgroundColor:
                    'color-mix(in srgb, var(--color-accent) 5%, transparent)',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative py-28 px-6 overflow-hidden border-t"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow left="20%" top="0" size={700} opacity={15} />
          <Glow left="60%" top="30%" size={500} opacity={10} />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-5"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              Let's build together
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-(--color-text-primary) leading-tight mb-6"
            >
              Got a project
              <br />
              in <span className="var(--color-accent)">mind?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-(--color-text-secondary) text-lg leading-relaxed mb-10 max-w-md mx-auto"
            >
              I&apos;m open to freelance work and collaborations. Let&apos;s
              turn your idea into something real.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Link
                href="/contact"
                className="btn-accent px-8 py-3.5 rounded-full text-base inline-flex items-center gap-2"
              >
                Start a conversation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 7h10M7 3l4 4-4 4"
                    stroke="var(--color-arrow-stroke)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              {/* <Link
                href="mailto:hello@yourdomain.com"
                className="text-sm font-semibold text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
              >
                hello@yourdomain.com →
              </Link> */}
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
