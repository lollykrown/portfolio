'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import Icon from './Icon';
import { subscribeNewsletter } from '@/actions/mail';
// import { useAnalytics } from "@/hooks/useAnalytics";

function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        opacity: 'var(--color-dot-opacity)',
      }}
    />
  );
}
function ApertureIcon({ active }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      className="transition-transform duration-500 group-hover:rotate-90"
      style={{ color: active ? 'var(--color-accent)' : 'currentColor' }}
    >
      <circle
        cx="6.5"
        cy="6.5"
        r="5.5"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="6.5" cy="6.5" r="2" fill="currentColor" opacity="0.6" />
      {/* aperture blades */}
      <line
        x1="6.5"
        y1="1"
        x2="6.5"
        y2="4"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="6.5"
        y1="9"
        x2="6.5"
        y2="12"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="6.5"
        x2="4"
        y2="6.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="6.5"
        x2="12"
        y2="6.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Photography', href: '/photography', isPhoto: true },
];

const services = [
  { label: 'Web Design & Development', href: '/services' },
  { label: 'SaaS & Web App Development', href: '/services' },
  { label: 'UI / Component Development', href: '/services' },
  { label: 'Performance & Optimisation', href: '/services' },
  { label: 'Consulting & Code Review', href: '/services' },
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/lollykrown',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/kayodeagboola',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/lollykrown',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'Dribbble',
    href: 'https://dribbble.com/lollykrown',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const analytics = useAnalytics();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(email);
    if (!email) {
      setError('Email is required');
      return;
    }
    const res = await subscribeNewsletter({ email, website });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
      return;
    }

    // analytics.trackFormSubmission(email);
    setSubscribed(true);
    setLoading(false);
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden border-t bg-(--color-bg-page) border-(--color-border) shadow-(--shad)">
      <DotGrid />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-200 h-75 rounded-full blur-[130px]"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--color-accent-muted) 12%, transparent)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-100 h-50 rounded-full blur-[100px]"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--color-accent-muted) 7%, transparent)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* ── Top CTA banner ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative rounded-2xl px-8 md:px-12 py-10 my-14 overflow-hidden border flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            backgroundColor:
              'color-mix(in srgb, var(--color-accent-muted) 18%, var(--color-bg-card-darker))',
            borderColor:
              'color-mix(in srgb, var(--color-accent) 25%, transparent)',
          }}
        >
          {/* Glow inside banner */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 65%)',
            }}
          />
          {/* Top shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1.5px]"
            style={{
              background:
                'linear-gradient(to right, transparent, var(--color-accent), transparent)',
            }}
          />

          <div className="relative z-10 text-center md:text-left">
            <p
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              Available for work
            </p>
            <h3
              className="text-2xl md:text-3xl font-black leading-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Got a project in mind?
              <br />
              <span className="text-accent-gradient">
                Let&apos;s make it happen.
              </span>
            </h3>
          </div>

          <div className="relative z-10 flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              href="/contact"
              className="btn-accent px-7 py-3 rounded-full inline-flex items-center gap-2 text-sm"
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
            <Link href="mailto:admin@lollykrown.xyz" className="btn-border">
              Say hello →
            </Link>
          </div>
        </motion.div>

        {/* ── Main footer grid ────────────────────────────────────── */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-14 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <Link
              href="/"
              className="flex select-none justify-items-center items-center gap-2 group"
            >
              <Icon className="h-10 w-10 text-(--color-text-primary) group-hover:scale-105 group-hover:text-(--color-accent) group-hover:drop-shadow-[0_0_12px_var(--color-accent)]" />
              <span className="text-lg text-(--color-text-primary) group-hover:text-(--color-accent) uppercase font-medium group-hover:drop-shadow-[0_0_12px_var(--color-accent)]">
                Lollykrown
              </span>
            </Link>

            <p
              className="text-sm leading-relaxed mt-2 mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Freelance web developer crafting fast, beautiful, and purposeful
              digital products — pixel by pixel.
            </p>

            {/* Availability pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border mb-6
              bg-[color-mix(in_srgb,var(--color-accent)_8%,transparent)]
                borderColor: border-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-(--color-accent)" />
              <span className="text-xs font-semibold text-(--color-accent-subtle)">
                Open to new projects
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  title={s.label}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200
                    text-(--color-text-muted) border-(--color-border-card) bg-transparent
                  hover:text-(--color-accent-subtle) hover:border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)]
                    hover:bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)]"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-black tracking-[0.18em] uppercase mb-5 text-(--color-accent-subtle)">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => {
                if (link.isPhoto) {
                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors duration-200 flex items-center gap-1.5 group text-(--color-text-secondary)
                      hover:text-(--color-text-primary)"
                      >
                        <span className="w-0 group-hover:w-3 h-[1.125px] transition-all duration-200 rounded bg-(--color-accent)" />
                        <ApertureIcon />
                        <span className="italic tracking-wide">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 flex items-center gap-1.5 group text-(--color-text-secondary)
                    hover:text-(--color-text-primary)"
                    >
                      <span className="w-0 group-hover:w-3 h-[1.125px] transition-all duration-200 rounded bg-(--color-accent)" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p
              className="text-xs font-black tracking-[0.18em] uppercase mb-5"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              Services
            </p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm transition-colors duration-200 flex items-center gap-1.5 group leading-snug
                    text-(--color-text-secondary) hover:text-(--color-text-primary)"
                  >
                    <span className="w-0 group-hover:w-3 h-[1.125px] shrink-0 transition-all duration-200 rounded bg-(--color-accent)" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p
              className="text-xs font-black tracking-[0.18em] uppercase mb-5"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              Newsletter
            </p>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Tips on web dev, design, and freelancing — straight to your inbox.
              No spam.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col text-sm font-semibold text-(--color-accent-subtle)"
              >
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8l4 4 6-6"
                      stroke="var(--color-accent)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  You&apos;re in — thanks!
                </div>
                <p className="text-(--color-text-primary)">
                  Check your inbox soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm rounded-xl px-4 py-3 outline-none w-full transition-all duration-200 bg-(--color-bg-card-darker) text-(--color-text-primary)
                  border border-[color-mix(in_srgb,var(--color-accent)_25%,transparent)]"
                />
                {/* 🕵️ honeypot */}
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {error && <p className="text-red-500 text-xs">{error}</p>}
                <button
                  disabled={!email || loading}
                  type="submit"
                  className="text-sm font-bold py-2.5 rounded-xl transition-colors duration-200 bg-(--color-accent) text-(--color-arrow-stroke) hover:bg-(--color-accent-hover)"
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-7">
          <p className="text-xs text-(--color-text-muted) mx-auto md:ps-18">
            © {new Date().getFullYear()} Lollykrown. All rights reserved.
          </p>

          {/* Tech stack badges */}
          {/* <div className="flex items-center gap-2 flex-wrap justify-center">
            {["Next.js", "Tailwind", "Framer Motion"].map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full border"
                style={{
                  color: "var(--color-text-muted)",
                  borderColor: "var(--color-border-card)",
                  backgroundColor: "color-mix(in srgb, var(--color-accent) 4%, transparent)",
                }}
              >
                {tech}
              </span>
            ))}
          </div> */}

          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--color-text-primary)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--color-text-muted)')
              }
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-xs transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = 'var(--color-text-primary)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = 'var(--color-text-muted)')
              }
            >
              Terms
            </Link>
            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200"
              aria-label="Back to top"
              style={{
                borderColor: 'var(--color-border-card)',
                color: 'var(--color-text-muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor =
                  'color-mix(in srgb, var(--color-accent) 40%, transparent)';
                e.currentTarget.style.color = 'var(--color-accent-subtle)';
                e.currentTarget.style.backgroundColor =
                  'color-mix(in srgb, var(--color-accent) 10%, transparent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-card)';
                e.currentTarget.style.color = 'var(--color-text-muted)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 10V2M3 5l3-3 3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
