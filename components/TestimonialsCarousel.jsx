'use client'
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotGrid, Glow } from "@/components/Cont"

// ─── Testimonials ─────────────────────────────────────────────────
const testimonials = [
  {
    quote: "The photos from our wedding day are beyond anything we could have imagined. Every emotion, every detail captured perfectly.",
    name: "Patrick & Debbie",
    role: "Wedding clients",
    initials: "PD",
  },
  {
    quote: "The portraits from our event felt cinematic. Guests were speechless when they saw the gallery.",
    name: "Maya Chen",
    role: "Events Manager, Soho House",
    initials: "MC",
  },
  {
    quote: "The newborn portraits are so tender and intimate. They truly capture the essence of those precious early moments.",
    name: "Olamide & Jaiye",
    role: "Parents",
    initials: "OJ",
  },
];

export default function TestimonialsCarousel({stagger, fadeUp}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const total = testimonials.length;
 
  const goTo = (index) => setActive((index + total) % total);
 
  // Auto-advance every 5s, pause on hover
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);
 
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="relative py-24 px-6 border-t overflow-hidden"
      style={{ borderColor: "var(--color-border)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <Glow style={{ width: 600, height: 300, top: 0, left: "25%", backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 10%, transparent)" }} />
        <DotGrid />
      </div>
 
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent-subtle)" }}>Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-black" style={{ color: "var(--color-text-primary)" }}>
              What clients <span className="text-accent-gradient-alt">say</span>
            </h2>
          </motion.div>
        </motion.div>
 
        {/* Card */}
        <div className="relative" style={{ minHeight: "240px" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 60, scale: 0.97 }}
              animate={{ opacity: 1, x: 0,  scale: 1    }}
              exit={{   opacity: 0, x: -60, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl p-10 border overflow-hidden"
              style={{ backgroundColor: "var(--color-bg-card-darker)", borderColor: "var(--color-border-card)" }}
            >
              {/* Large decorative quote */}
              <span
                className="absolute top-4 right-8 text-8xl font-black leading-none select-none pointer-events-none"
                style={{ color: "color-mix(in srgb, var(--color-accent) 10%, transparent)" }}
              >&ldquo;</span>
 
              <p className="text-base md:text-lg leading-relaxed mb-10 relative z-10 italic" style={{ color: "var(--color-text-secondary)" }}>
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
 
              <div className="flex items-center gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent-subtle)" }}
                >
                  {testimonials[active].initials}
                </div>
                <div>
                  <p className="font-black text-sm" style={{ color: "var(--color-text-primary)" }}>{testimonials[active].name}</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
 
        {/* Controls */}
        <div className="flex items-center justify-between mt-8">
          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => goTo(active - 1)}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200"
              style={{ borderColor: "var(--color-border-card)", color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent-subtle)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-card)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => goTo(active + 1)}
              className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200"
              style={{ borderColor: "var(--color-border-card)", color: "var(--color-text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent-subtle)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-card)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
 
          {/* Progress dots with timer ring */}
          <div className="flex items-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative flex items-center justify-center"
                style={{ width: 20, height: 20 }}
              >
                {/* Animated SVG ring — only on active */}
                {i === active && (
                  <svg
                    className="absolute inset-0"
                    width="20" height="20" viewBox="0 0 20 20"
                    style={{ transform: "rotate(-90deg)" }}
                  >
                    <circle cx="10" cy="10" r="8" fill="none" stroke="var(--color-border-card)" strokeWidth="1.5" />
                    <circle
                      cx="10" cy="10" r="8" fill="none"
                      stroke="var(--color-accent)" strokeWidth="1.5"
                      strokeDasharray={`${2 * Math.PI * 8}`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      style={{
                        animation: paused ? "none" : "drain 5s linear forwards",
                      }}
                    />
                  </svg>
                )}
                <span
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 6 : 5,
                    height: i === active ? 6 : 5,
                    backgroundColor: i === active ? "var(--color-accent)" : "var(--color-border-card)",
                  }}
                />
              </button>
            ))}
          </div>
 
          {/* Counter */}
          <span className="text-xs font-mono" style={{ color: "var(--color-text-muted)" }}>
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>
 
      {/* CSS for the ring drain animation */}
      <style>{`
        @keyframes drain {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: ${2 * Math.PI * 8}; }
        }
      `}</style>
    </motion.section>
  );
}