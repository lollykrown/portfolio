"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };

function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        opacity: "var(--color-dot-opacity)",
      }}
    />
  );
}

function Section({ title, children }) {
  return (
    <motion.div variants={fadeUp} className="mb-12">
      <h2
        className="text-xl font-black mb-4 pb-3 border-b"
        style={{ color: "var(--color-text-primary)", borderColor: "var(--color-border)" }}
      >
        {title}
      </h2>
      <div className="flex flex-col gap-3" style={{ color: "var(--color-text-secondary)" }}>
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
        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: "var(--color-accent)" }} />
          {item}
        </li>
      ))}
    </ul>
  );
}

const lastUpdated = "15 April 2026";

export default function TermsPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--color-bg-page)" }}>

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 border-b overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px]"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 10%, transparent)" }}
          />
          <DotGrid />
        </div>
        <motion.div
          className="relative z-10 max-w-3xl mx-auto"
          variants={stagger} initial="hidden" animate="show"
        >
          <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: "var(--color-accent-subtle)" }}>
            Legal
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--color-text-primary)" }}>
            Terms of Service
          </motion.h1>
          <motion.p variants={fadeUp} className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Last updated: {lastUpdated}
          </motion.p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          <Section title="1. Agreement to terms">
            <P>By accessing or using this website (codecrafted.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.</P>
            <P>These terms apply to all visitors, clients, and anyone who accesses or uses the website or our services.</P>
          </Section>

          <Section title="2. Services">
            <P>CodeCrafted offers freelance web development, UI design, and photography services. Specific terms for client projects — including scope, deliverables, timeline, payment, and intellectual property — are set out in individual project agreements or proposals issued separately.</P>
            <P>Nothing on this website constitutes a binding offer to provide services. Engagement begins only when a written agreement or proposal has been accepted by both parties.</P>
          </Section>

          <Section title="3. Intellectual property">
            <P>All content on this website — including but not limited to text, design, code, photography, and graphics — is owned by CodeCrafted or its licensors and is protected by UK and international copyright law.</P>
            <Ul items={[
              "You may not reproduce, distribute, modify, or republish any content from this website without prior written permission.",
              "Portfolio items displayed on this website may be subject to third-party ownership. Client work is shown with permission.",
              "Photography displayed on this website remains the intellectual property of CodeCrafted unless explicitly transferred in a written agreement.",
            ]} />
          </Section>

          <Section title="4. Client work and project terms">
            <P>For commissioned projects, the following applies unless otherwise agreed in writing:</P>
            <Ul items={[
              "A 50% deposit is required before work begins. The remaining balance is due on completion.",
              "Ownership of final deliverables transfers to the client only upon receipt of full payment.",
              "We retain the right to display completed work in our portfolio unless the client requests otherwise in writing.",
              "Revision rounds are as specified in the project proposal. Additional revisions may incur additional charges.",
              "We are not liable for delays caused by the client's failure to provide required materials, feedback, or approvals.",
            ]} />
          </Section>

          <Section title="5. Photography licensing">
            <P>All photographs produced under commission are subject to the following unless a separate licence agreement is provided:</P>
            <Ul items={[
              "The client receives a perpetual, non-exclusive licence to use the delivered images for the agreed purpose.",
              "Commercial usage rights must be explicitly agreed in writing before the shoot.",
              "The photographer retains the right to use images for portfolio, editorial, and promotional purposes unless a confidentiality clause is agreed.",
              "Raw, unedited files are not included in the delivery unless explicitly agreed.",
            ]} />
          </Section>

          <Section title="6. Acceptable use">
            <P>You agree not to use this website to:</P>
            <Ul items={[
              "Violate any applicable law or regulation.",
              "Transmit any unsolicited or unauthorised advertising or promotional material.",
              "Attempt to gain unauthorised access to any part of the website or its infrastructure.",
              "Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website.",
            ]} />
          </Section>

          <Section title="7. Disclaimer of warranties">
            <P>This website and its content are provided on an "as is" basis. We make no warranties, expressed or implied, including but not limited to:</P>
            <Ul items={[
              "That the website will be available uninterrupted or error-free.",
              "That any information on the website is accurate, complete, or current.",
              "That the website is free from viruses or other harmful components.",
            ]} />
          </Section>

          <Section title="8. Limitation of liability">
            <P>To the fullest extent permitted by law, CodeCrafted shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website or our services, including but not limited to loss of revenue, data, or business opportunities.</P>
            <P>Our total liability to you in connection with any project or service shall not exceed the total fees paid by you to us in the three months preceding the claim.</P>
          </Section>

          <Section title="9. Third-party links">
            <P>This website may contain links to third-party websites. These links are provided for convenience only. We have no control over the content or practices of third-party sites and accept no responsibility for them. Visiting linked sites is at your own risk.</P>
          </Section>

          <Section title="10. Governing law">
            <P>These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</P>
          </Section>

          <Section title="11. Changes to these terms">
            <P>We reserve the right to update these terms at any time. The "Last updated" date will reflect the most recent revision. Continued use of this website after changes are posted constitutes acceptance of the updated terms.</P>
          </Section>

          <Section title="12. Contact">
            <P>For any questions about these terms, please contact us at <Link href="mailto:joe_kayu@yahoo.com" className="underline" style={{ color: "var(--color-accent-subtle)" }}>hello@lollykrown.xyz</Link>.</P>
          </Section>

          {/* Footer nav */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 pt-8 border-t" style={{ borderColor: "var(--color-border)" }}>
            <Link href="/privacy" className="text-sm font-semibold transition-colors" style={{ color: "var(--color-accent-subtle)" }}>
              Privacy Policy →
            </Link>
            <span style={{ color: "var(--color-border-card)" }}>|</span>
            <Link href="/" className="text-sm transition-colors" style={{ color: "var(--color-text-muted)" }}>
              Back to home
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}