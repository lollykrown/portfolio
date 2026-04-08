'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const cardVar = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

function Glow({ style }) {
  return (
    <div
      className="absolute rounded-full blur-[120px] pointer-events-none"
      style={style}
    />
  );
}
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

const values = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Craft over speed',
    desc: 'I take time to get things right. Clean code, thoughtful design, and attention to detail are non-negotiables.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Clients as partners',
    desc: 'The best results come from genuine collaboration. I keep you in the loop at every stage.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <polyline
          points="22 12 18 12 15 21 9 3 6 12 2 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Performance first',
    desc: 'Fast sites rank better, convert better, and keep users engaged. Speed is a feature, not a bonus.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Honest communication',
    desc: "No jargon, no overpromising. I tell you what's realistic and deliver on what I commit to.",
  },
];

const timeline = [
  {
    year: '2020',
    title: 'Started freelancing',
    desc: 'Took on first client projects while building skills in React and Next.js.',
  },
  {
    year: '2021',
    title: 'First SaaS product',
    desc: 'Built and launched a full-stack SaaS product from scratch — learned everything from auth to deployment.',
  },
  {
    year: '2022',
    title: 'Scaled to 10+ clients',
    desc: 'Expanded into design systems, performance optimisation, and complex data-heavy applications.',
  },
  {
    year: '2023',
    title: 'Specialised in Next.js',
    desc: 'Went deep on the App Router, server components, and modern full-stack patterns.',
  },
  {
    year: '2024',
    title: '20+ projects shipped',
    desc: 'Working with startups, agencies, and founders to turn ideas into production-ready products.',
  },
];

const skills = [
  {
    category: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Prisma', 'PostgreSQL', 'Supabase', 'REST APIs'],
  },
  {
    category: 'Design',
    items: ['Figma', 'Component systems', 'Responsive design', 'Prototyping'],
  },
  {
    category: 'DevOps',
    items: [
      'Vercel',
      'GitHub Actions',
      'Docker basics',
      'Performance auditing',
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-(--color-bg-page) pt-12">
      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Glow
            style={{
              width: 700,
              height: 400,
              top: '0%',
              left: '-5%',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 14%, transparent)',
            }}
          />
          <Glow
            style={{
              width: 400,
              height: 300,
              bottom: '0',
              right: '5%',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 8%, transparent)',
            }}
          />
          <DotGrid />
          <span className="absolute right-[3%] bottom-[10%] text-[160px] font-black text-white/2 select-none leading-none hidden xl:block tracking-tighter">
            ME.
          </span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center py-20">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-5"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              About me
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-(--color-text-primary) leading-[0.92] tracking-tight mb-7"
            >
              The developer
              <br />
              behind the <span className="var(--color-accent)">code</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-(--color-text-secondary) text-lg leading-relaxed mb-8 max-w-md"
            >
              I&apos;m a freelance web developer who turns ideas into fast,
              beautiful, and purposeful digital products. I care deeply about
              the craft and even more about the people I build for.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 flex-wrap"
            >
              <Link
                href="/contact"
                className="btn-accent px-7 py-3 rounded-full inline-flex items-center gap-2"
              >
                Work with me
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
              <Link
                href="/Kayode_Agboola_Resume.pdf"
                download
                className="btn-border py-2.5"
              >
                Download CV
              </Link>
            </motion.div>
          </motion.div>

          {/* Photo card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div
                className="absolute -inset-3 rounded-3xl opacity-40"
                style={{
                  background: `linear-gradient(135deg, var(--color-accent), transparent 60%)`,
                  borderRadius: '24px',
                }}
              />
              <div
                className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-white/10"
                style={{ backgroundColor: 'var(--color-bg-card-darker)' }}
              >
                <div
                  className="w-full h-full flex items-end pb-6 "
                  style={{
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--color-accent-muted) 60%, transparent) 0%, color-mix(in srgb, var(--color-accent-hover) 20%, #0c0c14) 100%)`,
                  }}
                >
                  <Image
                    src="/pp.jpg"
                    alt="Kayode Agboola"
                    fill
                    className=" inset-0 object-cover"
                    priority
                  />
                  <div className="z-50 bg-blur rounded-xl px-4 py-3 ">
                    {' '}
                    {/* style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-card-dark) 90%, transparent)" }} */}
                    <p className="text-black font-black text-xl">Kay</p>
                    <p
                      className="text-xs tracking-widest uppercase mt-1 shadow"
                      style={{ color: 'var(--color-accent-subtle)' }}
                    >
                      Freelance Developer
                    </p>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div
                className="absolute -bottom-4 -left-4 flex items-center gap-2 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-sm"
                style={{
                  backgroundColor:
                    'color-mix(in srgb, var(--color-bg-card-dark) 90%, transparent)',
                }}
              >
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
                <span className="text-(--color-text-primary) text-xs font-semibold">
                  Open to work
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ──────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative py-24 px-6 border-t overflow-hidden border-['rgba(255,255,255,0.06)']"
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow
            style={{
              width: 600,
              height: 300,
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 10%, transparent)',
            }}
          />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <span
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 text-(--color-accent-subtle)"
              >
                What I stand for
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary) ">
                How I approach{' '}
                <span className="text-accent-gradient">the work</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map((v) => (
                <motion.div
                  key={v.title}
                  variants={cardVar}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group rounded-2xl p-6 border border-(--color-border-hover) hover:border-(--color-border-card) transition-colors duration-300 relative overflow-hidden"
                  style={{ backgroundColor: 'var(--color-bg-card-darker)' }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 8%, transparent), transparent 65%)',
                    }}
                  />
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--color-accent) 12%, transparent)',
                      color: 'var(--color-accent-subtle)',
                    }}
                  >
                    {v.icon}
                  </div>
                  <h3 className="text-(--color-text-primary) font-black text-base mb-2">
                    {v.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── TIMELINE ────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative py-24 px-6 border-t overflow-hidden"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow
            style={{
              width: 500,
              height: 300,
              top: 0,
              left: 0,
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 8%, transparent)',
            }}
          />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[300px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              Journey
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary) leading-tight mb-4">
              How I got <span className="text-accent-gradient-alt">here</span>
            </h2>
            <p className="text-(--color-text-secondary) text-sm leading-relaxed">
              A few years of learning, building, shipping, and growing. Every
              project taught me something new.
            </p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Vertical line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-px"
              style={{
                background:
                  'linear-gradient(to bottom, var(--color-accent), transparent)',
              }}
            />

            <div className="flex flex-col gap-0">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  variants={cardVar}
                  className="relative flex gap-8 pb-10 last:pb-0"
                >
                  {/* Dot */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border"
                      style={{
                        backgroundColor: 'var(--color-bg-page)',
                        borderColor:
                          'color-mix(in srgb, var(--color-accent) 50%, transparent)',
                        boxShadow: `0 0 12px color-mix(in srgb, var(--color-accent) 25%, transparent)`,
                      }}
                    >
                      <span
                        className="text-[10px] font-black"
                        style={{ color: 'var(--color-accent-subtle)' }}
                      >
                        {item.year.slice(2)}
                      </span>
                    </div>
                  </div>

                  <div
                    className="flex-1 rounded-2xl p-6 border border-(--color-border) hover:border-(--color-border-hover) transition-colors duration-300"
                    style={{ backgroundColor: 'var(--color-bg-card-darker)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="text-xs font-bold tracking-[0.15em]"
                        style={{ color: 'var(--color-accent-subtle)' }}
                      >
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-(--color-text-primary) font-black text-lg mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SKILLS ──────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative py-24 px-6 border-t overflow-hidden"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow
            style={{
              width: 600,
              height: 300,
              top: 0,
              right: 0,
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 10%, transparent)',
            }}
          />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeUp} className="mb-12">
              <span
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 text-(--color-accent-subtle)"
              >
                Skills
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary)">
                Tools I work{' '}
                <span className="text-accent-gradient">with daily</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {skills.map((group) => (
                <motion.div
                  key={group.category}
                  variants={cardVar}
                  className="rounded-2xl p-6 border border-(--color-border) hover:border-(--color-border-hover) transition-colors duration-300 bg-(--color-bg-card-darker)">
                  <div
                    className="text-xs font-black tracking-[0.18em] uppercase mb-4 pb-3 border-b"
                    style={{
                      color: 'var(--color-accent-subtle)',
                      borderColor:
                        'color-mix(in srgb, var(--color-accent) 20%, transparent)',
                    }}
                  >
                    {group.category}
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2.5 text-sm text-(--color-text-secondary)"
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-(--color-accent)" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative py-28 px-6 border-t overflow-hidden"
        style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow
            style={{
              width: 700,
              height: 400,
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 16%, transparent)',
            }}
          />
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
              Let's connect
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-(--color-text-primary) leading-tight mb-6"
            >
              Liked what you <span className="text-accent-gradient">read?</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-(--color-text-secondary) text-lg mb-10 max-w-md mx-auto leading-relaxed"
            >
              Let&apos;s build something together. I&apos;m always open to
              interesting projects and good conversations.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Link
                href="/contact"
                className="btn-accent px-8 py-4 rounded-full text-base inline-flex items-center gap-2"
              >
                Get in touch
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 8h12M9 4l4 4-4 4"
                    stroke="var(--color-arrow-stroke)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/projects"
                className="btn-border py-3.5"
              >
                See my work →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
