'use client';

import { motion } from 'framer-motion';
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

const services = [
  {
    number: '01',
    title: 'Web Design & Development',
    desc: 'End-to-end websites built with Next.js and Tailwind — from blank canvas to live URL. Fast, responsive, and built to convert.',
    features: [
      'Custom design in Figma',
      'Next.js / React build',
      'Mobile-first responsive',
      'SEO optimised',
      'Performance audited',
    ],
    tag: 'Most popular',
    highlighted: true,
  },
  {
    number: '02',
    title: 'SaaS & Web App Development',
    desc: 'Full-stack web applications with auth, dashboards, databases, and APIs. Built for scale from day one.',
    features: [
      'User authentication',
      'Database design',
      'REST or tRPC APIs',
      'Admin dashboards',
      'Stripe integration',
    ],
    tag: null,
    highlighted: false,
  },
  {
    number: '03',
    title: 'UI / Component Development',
    desc: 'Design systems, reusable component libraries, and polished UI work for existing codebases and design teams.',
    features: [
      'Component libraries',
      'Storybook setup',
      'Design token systems',
      'Accessibility (WCAG)',
      'Animation & motion',
    ],
    tag: null,
    highlighted: false,
  },
  {
    number: '04',
    title: 'Performance & Optimisation',
    desc: 'Audit, diagnose, and fix slow websites. Core Web Vitals improvements, bundle size reduction, and rendering strategy.',
    features: [
      'Core Web Vitals audit',
      'Lighthouse to 90+',
      'Bundle optimisation',
      'Image & font strategy',
      'Caching & CDN',
    ],
    tag: null,
    highlighted: false,
  },
  {
    number: '05',
    title: 'Consulting & Code Review',
    desc: 'Architecture advice, tech stack decisions, and code review for teams building their own products.',
    features: [
      'Architecture review',
      'Tech stack advice',
      'Code quality review',
      'Team onboarding',
      '1:1 sessions',
    ],
    tag: null,
    highlighted: false,
  },
  {
    number: '06',
    title: 'Retainer / Ongoing Support',
    desc: 'Monthly retainer for ongoing development, feature work, bug fixes, and technical support.',
    features: [
      'Dedicated hours/month',
      'Priority response',
      'Feature development',
      'Bug fixes & updates',
      'Monthly reporting',
    ],
    tag: 'Flexible',
    highlighted: false,
  },
];

const packages = [
  {
    name: 'Starter',
    price: '£1,500',
    desc: 'Perfect for landing pages, portfolios, and small business sites.',
    features: [
      'Up to 5 pages',
      'Mobile-first design',
      'Contact form',
      'Basic SEO setup',
      '1 revision round',
    ],
    cta: 'Get started',
  },
  {
    name: 'Growth',
    price: '£4,000',
    desc: 'For businesses that need a full website with more pages and functionality.',
    features: [
      'Up to 12 pages',
      'Custom design',
      'CMS integration',
      'Full SEO setup',
      'Analytics setup',
      '3 revision rounds',
      '2 weeks support',
    ],
    cta: 'Most popular',
    featured: true,
  },
  {
    name: 'Product',
    price: 'Custom',
    desc: 'Full-stack web apps, SaaS products, and complex builds scoped individually.',
    features: [
      'Unlimited scope',
      'Auth & database',
      'Custom integrations',
      'Admin dashboard',
      'Ongoing retainer option',
      'Priority support',
    ],
    cta: "Let's talk",
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery call',
    desc: 'We talk through your goals, timeline, and budget. No commitment required.',
  },
  {
    step: '02',
    title: 'Proposal & scope',
    desc: 'I send a detailed proposal with timeline, deliverables, and a fixed price.',
  },
  {
    step: '03',
    title: 'Design phase',
    desc: 'Wireframes and mockups in Figma — you approve before anything is built.',
  },
  {
    step: '04',
    title: 'Build & review',
    desc: 'Development in short sprints with regular check-ins and previews.',
  },
  {
    step: '05',
    title: 'Launch',
    desc: 'Deployment, final testing, and a smooth handoff with full documentation.',
  },
];

const faqs = [
  {
    q: 'Do you work with clients outside the UK?',
    a: "Yes — I work remotely with clients worldwide. Time zones haven't been a problem.",
  },
  {
    q: 'Can I see examples of your work first?',
    a: 'Absolutely — check out the projects page for a selection of recent work across different industries.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. I typically ask for 50% upfront and 50% on completion. For larger projects, milestone-based payments work well.',
  },
  {
    q: 'What if I need changes after launch?',
    a: 'Minor tweaks are included for two weeks post-launch. For ongoing work, a retainer package makes the most sense.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = require('react').useState(false);
  return (
    <div
      className="border-b cursor-pointer border-(--color-border-card)"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <p className="text-(--color-text-primary) font-semibold text-sm md:text-base">
          {q}
        </p>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300"
          style={{
            borderColor: open
              ? 'var(--color-accent)'
              : 'rgba(255,255,255,0.15)',
            backgroundColor: open
              ? 'color-mix(in srgb, var(--color-accent) 15%, transparent)'
              : 'transparent',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 2v8M2 6h8"
              stroke={open ? 'var(--color-accent)' : 'white'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p className="text-(--color-text-secondary) text-sm leading-relaxed pb-5">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen flex flex-col bg-(--color-bg-page) pt-20">
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Glow
            style={{
              width: 700,
              height: 400,
              top: '5%',
              left: '10%',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 14%, transparent)',
            }}
          />
          <Glow
            style={{
              width: 400,
              height: 300,
              bottom: 0,
              right: '5%',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 8%, transparent)',
            }}
          />
          <DotGrid />
          <span className="absolute left-[3%] bottom-[5%] text-[140px] font-black text-white/2 select-none leading-none hidden xl:block tracking-tighter">
            SVC.
          </span>
        </div>

        <motion.div
          className="relative z-10 text-center max-w-5xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-5"
            style={{ color: 'var(--color-accent-subtle)' }}
          >
            What I do
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-(--color-text-primary) leading-[0.92] tracking-tight mb-7"
          >
            Services built
            <br />
            for <span className="var(--color-accent)">real results</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-(--color-text-secondary) text-lg max-w-lg mx-auto leading-relaxed mb-10"
          >
            From a single landing page to a full SaaS product — I help
            businesses and founders ship better software, faster.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link
              href="/contact"
              className="btn-accent px-7 py-3 rounded-full inline-flex items-center gap-2"
            >
              Start a project
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
              href="#pricing"
              className="btn-border py-2.5" >
              View pricing
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────────────── */}
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
                className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3"
                style={{ color: 'var(--color-accent-subtle)' }}
              >
                Services
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary)">
                Everything you{' '}
                <span className="text-accent-gradient">need to ship</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <motion.div
                  key={s.number}
                  variants={cardVar}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative rounded-2xl p-7 border overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: s.highlighted
                      ? 'color-mix(in srgb, var(--color-accent-muted) 20%, var(--color-bg-card-darker))'
                      : 'var(--color-bg-card-darker)',
                    borderColor: s.highlighted
                      ? 'color-mix(in srgb, var(--color-accent) 35%, transparent)'
                      : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {/* Top accent line on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(to right, var(--color-accent), transparent)',
                      opacity: s.highlighted ? 1 : 0,
                    }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'linear-gradient(to right, var(--color-accent), transparent)',
                    }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent 65%)',
                    }}
                  />

                  <div className="relative flex items-start justify-between mb-5">
                    <span
                      className="text-3xl font-black leading-none"
                      style={{
                        color:
                          'color-mix(in srgb, var(--color-accent) 30%, transparent)',
                      }}
                    >
                      {s.number}
                    </span>
                    {s.tag && (
                      <span
                        className="text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor:
                            'color-mix(in srgb, var(--color-accent) 15%, transparent)',
                          color: 'var(--color-accent-subtle)',
                          border:
                            '1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)',
                        }}
                      >
                        {s.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-(--color-text-primary) font-black text-lg mb-3 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-(--color-text-secondary) text-sm leading-relaxed mb-6 flex-1">
                    {s.desc}
                  </p>

                  <ul className="flex flex-col gap-2">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm text-(--color-text-secondary)"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="shrink-0"
                        >
                          <path
                            d="M2 7l4 4 6-6"
                            stroke="var(--color-accent)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── PRICING ───────────────────────────────────────────────── */}
      <motion.section
        id="pricing"
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
              width: 700,
              height: 400,
              top: 0,
              left: '30%',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 12%, transparent)',
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
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span
                className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ color: 'var(--color-accent-subtle)' }}
              >
                Pricing
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary) mb-3">
                Transparent{' '}
                <span className="text-accent-gradient">pricing</span>
              </h2>
              <p className="text-(--color-text-secondary) text-sm max-w-md mx-auto">
                No surprises. Fixed prices on standard projects, custom scopes
                for everything else.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.name}
                  variants={cardVar}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="relative rounded-2xl p-8 border overflow-hidden flex flex-col"
                  style={{
                    backgroundColor: pkg.featured
                      ? 'color-mix(in srgb, var(--color-accent-muted) 18%, var(--color-bg-card-darker))'
                      : 'var(--color-bg-card-darker)',
                    borderColor: pkg.featured
                      ? 'color-mix(in srgb, var(--color-accent) 40%, transparent)'
                      : 'rgba(255,255,255,0.08)',
                  }}
                >
                  {pkg.featured && (
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{
                        background:
                          'linear-gradient(to right, transparent, var(--color-accent), transparent)',
                      }}
                    />
                  )}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      background: pkg.featured
                        ? 'radial-gradient(ellipse at top, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 60%)'
                        : 'none',
                    }}
                  />

                  <div className="relative mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <p
                        className="text-xs font-black tracking-[0.18em] uppercase"
                        style={{ color: 'var(--color-accent-subtle)' }}
                      >
                        {pkg.name}
                      </p>
                      {pkg.featured && (
                        <span
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                          style={{
                            backgroundColor:
                              'color-mix(in srgb, var(--color-accent) 20%, transparent)',
                            color: 'var(--color-accent-subtle)',
                            border:
                              '1px solid color-mix(in srgb, var(--color-accent) 35%, transparent)',
                          }}
                        >
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-4xl font-black text-(--color-text-primary) mb-2">
                      {pkg.price}
                    </p>
                    <p className="text-(--color-text-secondary) text-sm leading-relaxed">
                      {pkg.desc}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm text-(--color-text-secondary)"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="shrink-0"
                        >
                          <path
                            d="M2 7l4 4 6-6"
                            stroke="var(--color-accent)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all duration-200"
                    style={
                      pkg.featured
                        ? {
                            backgroundColor: 'var(--color-accent)',
                            color: 'var(--color-arrow-stroke)',
                          }
                        : {
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            color: 'white',
                            border: '1px solid rgba(255,255,255,0.1)',
                          }
                    }
                  >
                    {pkg.cta}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M2 7h10M7 3l4 4-4 4"
                        stroke={
                          pkg.featured ? 'var(--color-arrow-stroke)' : 'white'
                        }
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── PROCESS ───────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative py-24 px-6 border-t overflow-hidden border-[rgba(255,255,255,0.06)]"
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

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              variants={fadeUp}
              className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
            >
              <div>
                <span
                  className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 text-(--color-accent-subtle)">
                  Process
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary)">
                  How we&apos;ll{' '}
                  <span className="text-accent-gradient-alt">
                    work together
                  </span>
                </h2>
              </div>
              <p className="text-(--color-text-secondary) text-sm max-w-xs leading-relaxed">
                A clear, structured approach so you always know what&apos;s
                happening and what comes next.
              </p>
            </motion.div>

            <div className="relative">
              {/* Horizontal connector line on desktop */}
              <div
                className="absolute top-8 left-8 right-8 h-px hidden lg:block"
                style={{
                  background: `linear-gradient(to right, var(--color-accent), color-mix(in srgb, var(--color-accent) 20%, transparent))`,
                }}
              />

              <div className="grid md:grid-cols-5 gap-5">
                {process.map((item) => (
                  <motion.div
                    key={item.step}
                    variants={cardVar}
                    className="relative flex flex-col items-start lg:items-center lg:text-center"
                  >
                    <div
                      className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border"
                      style={{
                        backgroundColor: 'var(--color-bg-page)',
                        borderColor:
                          'color-mix(in srgb, var(--color-accent) 40%, transparent)',
                        boxShadow: `0 0 20px color-mix(in srgb, var(--color-accent) 15%, transparent)`,
                      }}
                    >
                      <span
                        className="font-black text-lg"
                        style={{ color: 'var(--color-accent-subtle)' }}
                      >
                        {item.step}
                      </span>
                    </div>
                    <h3 className="text-(--color-text-primary) font-black text-base mb-2">
                      {item.title}
                    </h3>
                    <p className="text-(--color-text-secondary) text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: '-80px' }}
        className="relative py-24 px-6 border-t overflow-hidden border-(--color-border)"
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow
            style={{
              width: 500,
              height: 300,
              top: 0,
              right: 0,
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 8%, transparent)',
            }}
          />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-16 items-start">
          <div>
            <span
              className="inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary) leading-tight">
              Common <span className="text-accent-gradient">questions</span>
            </h2>
            <p className="text-(--color-text-secondary) text-sm leading-relaxed mt-4">
              Still have questions?{' '}
              <Link
                href="/contact"
                className="underline"
                style={{
                  color: 'var(--color-accent-subtle)',
                  textDecorationColor: 'var(--color-accent-subtle)',
                }}
              >
                Let&apos;s talk.
              </Link>
            </p>
          </div>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
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
        className="relative py-28 px-6 border-t overflow-hidden border-(--color-border)"
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
              Ready to start?
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-(--color-text-primary) leading-tight mb-6"
            >
              Let&apos;s turn your{' '}
              <span className="text-accent-gradient">idea</span>
              <br />
              into reality
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-(--color-text-secondary) text-lg mb-10 max-w-md mx-auto leading-relaxed"
            >
              Book a free 30-minute discovery call. No commitment, no pitch —
              just a conversation about what you need.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Link
                href="/contact"
                className="btn-accent px-8 py-4 rounded-full text-base inline-flex items-center gap-2"
              >
                Book a free call
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
                className="btn-border"
              >
                See past work →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
