'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { DotGrid } from '@/components/Cont';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

function Section({ title, children }) {
  return (
    <motion.div variants={fadeUp} className="mb-12">
      <h2
        className="text-xl font-black mb-4 pb-3 border-b"
        style={{
          color: 'var(--color-text-primary)',
          borderColor: 'var(--color-border)',
        }}
      >
        {title}
      </h2>
      <div
        className="flex flex-col gap-3"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

function P({ children }) {
  return <p className="text-sm leading-relaxed">{children}</p>;
}

function Ul({ items }) {
  return (
    <ul className="flex flex-col gap-2 ml-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-sm leading-relaxed"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

const lastUpdated = '15 April 2026';

export default function PrivacyPage() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-bg-page)' }}
    >
      {/* Hero */}
      <section
        className="relative pt-32 pb-16 px-6 border-b overflow-hidden"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full blur-[120px]"
            style={{
              backgroundColor:
                'color-mix(in srgb, var(--color-accent-muted) 10%, transparent)',
            }}
          />
          <DotGrid />
        </div>
        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: 'var(--color-accent-subtle)' }}
          >
            Legal
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl font-black mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Last updated: {lastUpdated}
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Section title="1. Who we are">
            <P>
              This website is operated by Lollykrown ("we", "us", "our"). We are
              a freelance web development and photography business based in
              Sunderland, UK.
            </P>
            <P>
              If you have any questions about this privacy policy or how we
              handle your data, please contact us at{' '}
              <a
                href="mailto:admin@lollykrown.xyz"
                className="underline"
                style={{ color: 'var(--color-accent-subtle)' }}
              >
                admin@lollykrown.xyz
              </a>
              .
            </P>
          </Section>

          <Section title="2. What data we collect">
            <P>We collect the following categories of personal data:</P>
            <Ul
              items={[
                'Contact information you provide voluntarily — name, email address, and any message content submitted via our contact form.',
                'Usage data collected automatically via Google Analytics — pages visited, time spent, browser type, device type, approximate geographic location (country/city level), and referring website.',
                'Cookie data — small text files stored on your device by your browser. See Section 5 for details.',
              ]}
            />
          </Section>

          <Section title="3. How we use your data">
            <P>We use the data we collect for the following purposes:</P>
            <Ul
              items={[
                'To respond to enquiries submitted through our contact form.',
                'To understand how visitors interact with our website so we can improve it (via Google Analytics).',
                'To monitor website performance and diagnose technical issues.',
                'We do not use your data for automated decision-making or profiling.',
              ]}
            />
          </Section>

          <Section title="4. Google Analytics">
            <P>
              We use Google Analytics 4 (GA4), provided by Google LLC, to
              collect anonymised usage statistics about how visitors use this
              website.
            </P>
            <P>Google Analytics uses cookies to collect information such as:</P>
            <Ul
              items={[
                'Pages you visit and how long you spend on each page.',
                'How you arrived at the site (e.g. search engine, direct, referral).',
                'Your approximate location (country and city — not street-level).',
                'Device and browser information.',
              ]}
            />
            <P>
              We have enabled IP anonymisation in Google Analytics, which means
              your full IP address is never stored. The data collected is
              aggregated and does not identify you personally.
            </P>
            <P>
              Google's data processing is governed by{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: 'var(--color-accent-subtle)' }}
              >
                Google's Privacy Policy
              </a>
              . You can opt out of Google Analytics tracking across all websites
              by installing the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: 'var(--color-accent-subtle)' }}
              >
                Google Analytics Opt-out Browser Add-on
              </a>
              .
            </P>
            <P>
              We only activate Google Analytics after you have accepted cookies
              via our cookie banner. If you decline, no analytics data is
              collected.
            </P>
          </Section>

          <Section title="5. Cookies">
            <P>We use the following cookies on this website:</P>
            <div
              className="rounded-xl overflow-hidden border text-sm"
              style={{ borderColor: 'var(--color-border-card)' }}
            >
              {[
                {
                  name: 'cookie-consent',
                  type: 'Essential',
                  purpose:
                    'Stores your cookie preference (accepted/declined). Expires after 1 year.',
                  provider: 'This site',
                },
                {
                  name: '_ga',
                  type: 'Analytics',
                  purpose: 'Distinguishes unique users. Expires after 2 years.',
                  provider: 'Google',
                },
                {
                  name: '_ga_*',
                  type: 'Analytics',
                  purpose:
                    'Maintains session state for Google Analytics 4. Expires after 2 years.',
                  provider: 'Google',
                },
              ].map((c, i) => (
                <div
                  key={c.name}
                  className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 px-5 py-4"
                  style={{
                    borderTop: i > 0 ? `1px solid var(--color-border)` : 'none',
                    backgroundColor:
                      i % 2 === 0
                        ? 'var(--color-bg-card-darker)'
                        : 'transparent',
                  }}
                >
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: 'var(--color-accent-subtle)' }}
                  >
                    {c.name}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)' }}>
                    {c.provider}
                  </span>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full w-fit"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                      color: 'var(--color-accent-subtle)',
                    }}
                  >
                    {c.type}
                  </span>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {c.purpose}
                  </span>
                </div>
              ))}
            </div>
            <P>
              You can control cookies through your browser settings. Disabling
              all cookies may affect the functionality of this website.
            </P>
          </Section>

          <Section title="6. Legal basis for processing (UK GDPR)">
            <P>
              We process your personal data under the following legal bases:
            </P>
            <Ul
              items={[
                'Legitimate interests — for responding to contact form enquiries and operating the website.',
                'Consent — for Google Analytics cookies. You may withdraw your consent at any time by clearing your cookies and declining via the cookie banner.',
              ]}
            />
          </Section>

          <Section title="7. Data retention">
            <Ul
              items={[
                'Contact form enquiries are retained for up to 12 months and then deleted.',
                'Google Analytics data is retained for 14 months as configured in our GA4 property.',
                'Cookie consent records are stored locally in your browser for 1 year.',
              ]}
            />
          </Section>

          <Section title="8. Data sharing">
            <P>
              We do not sell, rent, or trade your personal data. We share data
              only with the following third parties:
            </P>
            <Ul
              items={[
                'Google LLC — for analytics purposes, as described in Section 4.',
                "Our hosting provider (Vercel) — for the technical operation of this website. Vercel's privacy policy is available at vercel.com/legal/privacy-policy.",
              ]}
            />
            <P>
              Both Google and Vercel may process data outside the UK/EEA. They
              do so under standard contractual clauses approved by the UK ICO.
            </P>
          </Section>

          <Section title="9. Your rights">
            <P>Under UK GDPR, you have the right to:</P>
            <Ul
              items={[
                'Access the personal data we hold about you.',
                'Request correction of inaccurate data.',
                "Request deletion of your data ('right to be forgotten').",
                'Object to or restrict processing of your data.',
                'Withdraw consent at any time (where processing is based on consent).',
                "Lodge a complaint with the UK Information Commissioner's Office (ICO) at ico.org.uk.",
              ]}
            />
            <P>
              To exercise any of these rights, contact us at{' '}
              <Link
                href="mailto:admin@lollykrown.xyz"
                className="underline"
                style={{ color: 'var(--color-accent-subtle)' }}
              >
                admin@lollykrown.xyz
              </Link>
              . We will respond within 30 days.
            </P>
          </Section>

          <Section title="10. Changes to this policy">
            <P>
              We may update this privacy policy from time to time. The "Last
              updated" date at the top of this page will reflect any changes. We
              encourage you to review this page periodically.
            </P>
          </Section>

          {/* Footer nav */}
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-4 pt-8 border-t"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <Link
              href="/terms"
              className="text-sm font-semibold transition-colors"
              style={{ color: 'var(--color-accent-subtle)' }}
            >
              Terms of Service →
            </Link>
            <span className="text-(--color-border-hover)">|</span>
            <Link
              href="/"
              className="text-sm transition-colors text-(--color-text-secondary) hover:text-(--color-text-primary) hover:underline"
            >
              Back to home
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
