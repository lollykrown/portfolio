'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { sendContactForm } from '@/actions/mail';

// ─── Shared animation variants ────────────────────────────────────
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
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Reusable ambient elements ────────────────────────────────────
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

// ─── Contact info items ───────────────────────────────────────────
const contactInfo = [
  {
    label: 'Email',
    value: 'hello@lollykrown.xyz',
    href: 'mailto:joe_kayu@yahoo.com',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <path
          d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M2 7l8 5 8-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: 'Location',
    value: 'Available worldwide — remote friendly',
    href: null,
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <path
          d="M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 2C6.686 2 4 4.686 4 8c0 4.5 6 10 6 10s6-5.5 6-10c0-3.314-2.686-6-6-6z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    label: 'Response time',
    value: 'Within 24 hours',
    href: null,
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 6v4l3 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

// ─── Social links ──────────────────────────────────────────────────
const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/lollykrown',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/kay-agboola',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/lollykrown',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'What types of projects do you take on?',
    a: 'I work on web apps, marketing sites, dashboards, and SaaS products — primarily with Next.js, React, and Tailwind. If it lives in a browser, I can build it.',
  },
  {
    q: 'How does the process work?',
    a: "We start with a discovery call, I scope the project, and we agree on a timeline and price. I work in short feedback loops so you're never in the dark.",
  },
  {
    q: 'Do you do design as well?',
    a: "Yes — I can design from scratch in Figma, or build from your existing designs. I'm comfortable working with both.",
  },
  {
    q: "What's your typical timeline?",
    a: "Small sites take 1–2 weeks. Larger products are scoped individually. I'll give you a clear estimate before we start.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: 'rgba(255,255,255,0.07)' }}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <p className="text-(--color-text-primary) font-semibold text-sm md:text-base">
          {q}
        </p>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300
            ${open ? 'border-(--color-accent) text-(--color-accent) bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] rotate-45' : 'border-(--color-border) bg-transparent rotate-0 text-(--color-text-primary)'}`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 2v8M2 6h8"
              stroke={open ? 'var(--color-accent)' : 'var(--color-text-primary) '}
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

// ─── Main page ────────────────────────────────────────────────────
export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    budget: '',
    message: '',
    website: '', // honeypot field
    token: '', // CAPTCHA token
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // expose function globally for Turnstile
    window.onTurnstileSuccess = (t) => {
      setFormState({ ...formState, token: t });
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted with data:', formState);

    setSending(true);
    const res = await sendContactForm(JSON.stringify(formState));
    console.log('Form submission response:', res);

    if (!res.success) {
      setSending(false);
      setError(res.error || { message: 'An unknown error occurred' });
      return;
    }
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-(--color-bg-page) pt-20">
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Glow
            style={{
              width: 600,
              height: 350,
              top: '10%',
              left: '15%',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 14%, transparent)',
            }}
          />
          <Glow
            style={{
              width: 400,
              height: 300,
              bottom: 0,
              right: '10%',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 8%, transparent)',
            }}
          />
          <DotGrid />
          {/* Ghost text */}
          <span className="absolute right-[4%] top-1/2 -translate-y-1/2 text-[140px] font-black text-white/2.5 select-none leading-none hidden xl:block tracking-tighter">
            HI.
          </span>
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-bold tracking-[0.25em] uppercase mb-5"
            style={{ color: 'var(--color-accent-subtle)' }}
          >
            Get in touch
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-(--color-text-primary) leading-[0.92] tracking-tight mb-7"
          >
            Let&apos;s build
            <br />
            something <span className="var(--color-accent)">great</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-(--color-text-secondary) text-lg max-w-md mx-auto leading-relaxed"
          >
            Have a project in mind, a question, or just want to say hello?
            I&apos;d love to hear from you.
          </motion.p>
        </motion.div>
      </section>

      {/* ── MAIN CONTENT: FORM + INFO ─────────────────────────────── */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr_420px] gap-10 items-start">
          {/* ── Contact form ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <div
              className="rounded-2xl p-8 md:p-10 border border-(--color-border) relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-bg-card-darker)' }}
            >
              {/* Subtle corner glow inside card */}
              <div
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-[80px] pointer-events-none"
                style={{
                  backgroundColor:
                    'color-mix(in srgb, var(--color-accent-muted) 20%, transparent)',
                }}
              />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 flex flex-col items-center justify-center text-center py-16 gap-5"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--color-accent) 15%, transparent)',
                      border:
                        '1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-(--color-text-primary)">
                    Message sent!
                  </h3>
                  <p className="text-(--color-text-secondary) text-sm max-w-xs leading-relaxed">
                    Thanks for reaching out. I&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: '',
                        email: '',
                        budget: '',
                        message: '',
                      });
                    }}
                    className="text-sm font-semibold mt-2 transition-colors"
                    style={{ color: 'var(--color-accent-subtle)' }}
                  >
                    Send another →
                  </button>
                </motion.div>
              ) : (
                <>
                  <Script
                    src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                    async
                    defer
                  />
                  <form
                    onSubmit={handleSubmit}
                    className="relative z-10 flex flex-col gap-5"
                  >
                    <div>
                      <p className="text-(--color-text-primary) font-black text-2xl mb-1">
                        Send a message
                      </p>
                      <p className="text-(--color-text-secondary) text-sm">
                        Fill in the form and I&apos;ll be in touch shortly.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-xs font-bold tracking-wide uppercase ${error?.message?.includes('name') ? 'text-red-600' : 'text-(--color-accent-subtle)'}`}
                        >
                          Name {error?.message?.includes('name') && '*'}
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Your name"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className={`w-full rounded-xl px-4 py-3.25 text-[14px] text-(--color-text-primary) outline-none transition-colors placeholder:text-(--color-text-muted)
                            duration-200 bg-[color-mix(in_srgb,var(--color-accent)_4%,var(--color-bg-card-darker))] border ${error?.message?.includes('name') ? 'border-red-600' : 'border-(--color-border-card)'}`}
                          onFocus={(e) =>
                            (e.target.style.borderColor =
                              'color-mix(in srgb, var(--color-accent) 50%, transparent)')
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor =
                              'rgba(255,255,255,0.08)')
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          className={`text-xs font-semibold tracking-wide uppercase ${error?.message?.includes('email') ? 'text-red-600' : 'text-(--color-accent-subtle)'}`}
                        >
                          Email{error?.message?.includes('email') && '*'}
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="you@example.com"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              email: e.target.value,
                            })
                          }
                          className={`w-full rounded-xl px-4 py-3.25 text-[14px] text-(--color-text-primary) outline-none transition-colors placeholder:text-(--color-text-muted)
                            duration-200 bg-[color-mix(in_srgb,var(--color-accent)_4%,var(--color-bg-card-darker))] border ${error?.message?.includes('email') ? 'border-red-600' : 'border-(--color-border-card)'}`}
                          onFocus={(e) =>
                            (e.target.style.borderColor =
                              'color-mix(in srgb, var(--color-accent) 50%, transparent)')
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor =
                              'rgba(255,255,255,0.08)')
                          }
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        className={`text-xs font-semibold tracking-wide uppercase ${error?.message?.includes('budget') ? 'text-red-600' : 'text-(--color-accent-subtle)'}`}
                      >
                        Budget range {error?.message?.includes('budget') && '*'}
                      </label>
                      <select
                        value={formState.budget}
                        onChange={(e) =>
                          setFormState({ ...formState, budget: e.target.value })
                        }
                        className={`w-full rounded-xl px-4 py-3.25 text-[14px] text-(--color-text-primary) outline-none transition-colors 
                            duration-200 bg-[color-mix(in_srgb,var(--color-accent)_4%,var(--color-bg-card-darker))] border ${error?.message?.includes('budget') ? 'border-red-600' : 'border-(--color-border-card)'}`}
                        onFocus={(e) =>
                          (e.target.style.borderColor =
                            'color-mix(in srgb, var(--color-accent) 50%, transparent)')
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            'rgba(255,255,255,0.08)')
                        }
                      >
                        <option value="" style={{ backgroundColor: '#0e0e1a' }}>
                          Select a range...
                        </option>
                        <option
                          value="under-1k"
                          style={{ backgroundColor: '#0e0e1a' }}
                        >
                          Under £1,000
                        </option>
                        <option
                          value="1k-3k"
                          style={{ backgroundColor: '#0e0e1a' }}
                        >
                          £1,000 – £3,000
                        </option>
                        <option
                          value="3k-7k"
                          style={{ backgroundColor: '#0e0e1a' }}
                        >
                          £3,000 – £7,000
                        </option>
                        <option
                          value="7k-plus"
                          style={{ backgroundColor: '#0e0e1a' }}
                        >
                          £7,000+
                        </option>
                        <option
                          value="not-sure"
                          style={{ backgroundColor: '#0e0e1a' }}
                        >
                          Not sure yet
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className={`text-xs font-semibold tracking-wide uppercase ${error?.message?.includes('message') ? 'text-red-600' : 'text-(--color-accent-subtle)'}`}
                      >
                        Message {error?.message?.includes('message') && '*'}
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Tell me about your project..."
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        className={`w-full rounded-xl px-4 py-3.25 text-[14px] text-(--color-text-primary) outline-none transition-colors placeholder:text-(--color-text-muted)
                            duration-200 bg-[color-mix(in_srgb,var(--color-accent)_4%,var(--color-bg-card-darker))] border ${error?.message?.includes('message') ? 'border-red-600' : 'border-(--color-border-card)'}`}
                        onFocus={(e) =>
                          (e.target.style.borderColor =
                            'color-mix(in srgb, var(--color-accent) 50%, transparent)')
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor =
                            'rgba(255,255,255,0.08)')
                        }
                      />
                    </div>

                    {/* Honeypot (hidden) */}
                    <input
                      name="website"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.website}
                      onChange={(e) =>
                        setFormState({ ...formState, website: e.target.value })
                      }
                    />
                    <p className="text-red-600 -mt-5 bg-blur text-xs">
                      {error && error.message}
                    </p>

                    {/* 🤖 CAPTCHA */}
                    <div
                      className="cf-turnstile"
                      data-sitekey="0x4AAAAAAC1tQHw5OOyNOzLd"
                      data-callback="onTurnstileSuccess"
                    ></div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 rounded-xl font-black text-base flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-70"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-arrow-stroke)',
                      }}
                    >
                      {sending ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeOpacity="0.25"
                            />
                            <path
                              d="M12 2a10 10 0 0 1 10 10"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M2 8h12M9 4l4 4-4 4"
                              stroke="var(--color-arrow-stroke)"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>

          {/* ── Info sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Availability badge */}
            <div
              className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/8"
              style={{ backgroundColor: 'var(--color-bg-card-dark)' }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <div>
                <p className="text-(--color-text-primary) font-semibold text-sm">
                  Available for projects
                </p>
                <p className="text-gray-500 text-xs">
                  Currently taking on new work
                </p>
              </div>
            </div>

            {/* Contact info */}
            <div
              className="rounded-2xl border border-white/8 overflow-hidden"
              style={{ backgroundColor: 'var(--color-bg-card-darker)' }}
            >
              {contactInfo.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 px-6 py-5"
                  style={{
                    borderBottom:
                      i < contactInfo.length - 1
                        ? '1px solid rgba(255,255,255,0.06)'
                        : 'none',
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                      color: 'var(--color-accent-subtle)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs tracking-wide uppercase font-semibold mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-(--color-text-primary) text-sm font-medium hover:underline"
                        style={{ textDecorationColor: 'var(--color-accent)' }}
                      >
                        {item.value}
                      </Link>
                    ) : (
                      <p className="text-(--color-text-primary) text-sm font-medium">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div
              className="rounded-2xl border border-white/8 p-6"
              style={{ backgroundColor: 'var(--color-bg-card-dark)' }}
            >
              <p
                className="text-xs font-semibold tracking-[0.18em] uppercase mb-4"
                style={{ color: 'var(--color-accent-subtle)' }}
              >
                Find me online
              </p>
              <div className="flex flex-col gap-3">
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-(--color-text-secondary) hover:text-(--color-text-primary) group transition-colors duration-200"
                  >
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-white/25 transition-colors"
                      style={{
                        backgroundColor:
                          'color-mix(in srgb, var(--color-accent) 5%, transparent)',
                      }}
                    >
                      {s.icon}
                    </span>
                    <span className="text-sm font-medium">{s.label}</span>
                    <svg
                      className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M2 7h10M7 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
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
              left: '30%',
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 10%, transparent)',
            }}
          />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-16 items-start">
          <div>
            <span
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-(--color-text-primary) leading-tight">
              Common
              <br />
              <span className="text-accent-gradient">questions</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mt-4">
              Don&apos;t see your question?{' '}
              <Link
                href="mailto:hello@yourdomain.com"
                className="underline"
                style={{
                  color: 'var(--color-accent-subtle)',
                  textDecorationColor: 'var(--color-accent-subtle)',
                }}
              >
                Just ask.
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

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
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
              top: '0',
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
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              Ready when you are
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black text-(--color-text-primary) leading-tight mb-6"
            >
              Your next project
              <br />
              starts with a <span className="var(--color-accent)">message</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-(--color-text-secondary) text-lg mb-10 max-w-md mx-auto leading-relaxed"
            >
              No long forms. No waiting weeks for a reply. Just a conversation
              about what you need.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="mailto:hello@yourdomain.com"
                className="inline-flex items-center gap-3 btn-accent px-8 py-4 rounded-full text-base"
              >
                hello@yourdomain.com
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
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
