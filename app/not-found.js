"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const links = [
  { label: "Home",        href: "/" },
  { label: "Projects",    href: "/projects" },
  { label: "Services",    href: "/services" },
  { label: "Photography", href: "/photography" },
  { label: "Contact",     href: "/contact" },
];

// Animated shutter blades
function ShutterIcon() {
  return (
    <motion.svg
      width="72" height="72" viewBox="0 0 72 72" fill="none"
      initial={{ rotate: 0, opacity: 0, scale: 0.7 }}
      animate={{ rotate: 360, opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ color: "var(--color-accent)" }}
    >
      <circle cx="36" cy="36" r="33" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.2" />
      <circle cx="36" cy="36" r="10" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" />
      {/* 6 aperture blades */}
      {[0,60,120,180,240,300].map((deg) => (
        <line
          key={deg}
          x1="36" y1="36"
          x2={36 + 22 * Math.cos((deg * Math.PI) / 180)}
          y2={36 + 22 * Math.sin((deg * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6"
        />
      ))}
      <circle cx="36" cy="36" r="4" fill="currentColor" />
    </motion.svg>
  );
}

// Typewriter for the subtitle
function Typewriter({ text, delay = 0.6 }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    const t = setTimeout(() => {
      let i = 0;
      const id = setInterval(() => {
        setShown(text.slice(0, ++i));
        if (i >= text.length) clearInterval(id);
      }, 38);
      return () => clearInterval(id);
    }, delay * 1000);
    return () => clearTimeout(t);
  }, [text, delay]);
  return (
    <span>
      {shown}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.9 }}
        className="inline-block w-0.5 h-5 ml-0.5 align-middle"
        style={{ backgroundColor: "var(--color-accent)" }}
      />
    </span>
  );
}

export default function NotFound() {
  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-page)" }}
    >
      <DotGrid />

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px]"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 14%, transparent)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-[120px]"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 7%, transparent)" }}
        />
      </div>

      {/* Ghost "404" behind everything */}
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute select-none font-black leading-none pointer-events-none"
        style={{
          fontSize: "clamp(180px, 30vw, 380px)",
          color: "color-mix(in srgb, var(--color-accent-muted) 18%, transparent)",
          letterSpacing: "-0.06em",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          WebkitTextStroke: "1px color-mix(in srgb, var(--color-accent) 12%, transparent)",
        }}
      >
        404
      </motion.span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl">

        {/* Shutter icon */}
        <div className="mb-8">
          <ShutterIcon />
        </div>

        {/* Label */}
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          style={{ color: "var(--color-accent-subtle)" }}
        >
          Page not found
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl font-black leading-tight mb-5"
          style={{ color: "var(--color-text-primary)" }}
        >
          This frame is{" "}
          <span className="text-accent-gradient">empty.</span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-base leading-relaxed mb-10 h-8"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Typewriter text="Looks like this shot didn't make the final cut." />
        </motion.p>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Link
            href="/"
            className="btn-accent px-8 py-3.5 rounded-full inline-flex items-center gap-2 text-sm"
          >
            Back to home
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 3l4 4-4 4" stroke="var(--color-arrow-stroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-24 h-px mb-8"
          style={{ backgroundColor: "var(--color-border)" }}
        />

        {/* Quick nav */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--color-text-muted)" }}>
            Or explore
          </span>
          {links.map((l, i) => (
            <motion.span
              key={l.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.65 + i * 0.07, duration: 0.4 }}
            >
              <Link
                href={l.href}
                className="text-sm font-semibold transition-colors duration-200 relative group"
                style={{ color: "var(--color-text-secondary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
              >
                {l.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-200"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              </Link>
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Film strip bottom decoration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-0 left-0 right-0 flex items-end overflow-hidden pointer-events-none"
        style={{ height: "60px" }}
      >
        <div className="w-full flex" style={{ borderTop: "2px solid var(--color-border)" }}>
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 border-r"
              style={{
                height: i % 3 === 0 ? "20px" : i % 3 === 1 ? "12px" : "16px",
                borderColor: "var(--color-border)",
                backgroundColor: i % 2 === 0 ? "color-mix(in srgb, var(--color-accent) 4%, transparent)" : "transparent",
              }}
            />
          ))}
        </div>
      </motion.div>
    </main>
  );
}