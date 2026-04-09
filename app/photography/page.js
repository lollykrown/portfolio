"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import CountStat from "@/components/CountStat";
import portrait1 from "@/public/photos/portrait-1.jpg";
import portrait2 from "@/public/photos/portrait-2.jpg";


// ─── Shared helpers ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: "var(--color-dot-opacity)",
      }}
    />
  );
}

function Glow({ style }) {
  return <div className="absolute rounded-full blur-[130px] pointer-events-none" style={style} />;
}

// ─── Categories ───────────────────────────────────────────────────
const categories = [
  { id: "all",       label: "All Work" },
  { id: "portraits", label: "Portraits" },
  { id: "weddings",  label: "Weddings" },
  { id: "events",    label: "Events" },
  { id: "travel",    label: "Travel" },
  { id: "editorial", label: "Editorial" },
  { id: "nature",     label: "Nature" },
  { id: "product",    label: "Product" },
  { id: "baby",      label: "Baby" },
  { id: "other",     label: "Other" },
];

// ─── Photo data ───────────────────────────────────────────────────
// Replace src with real image paths. aspectRatio controls grid cell height.
const photos = [
  { id: 1,  category: "portraits", src: portrait1,  alt: "Newborn Baby Portrait",     aspectRatio: "tall",   location: "London, UK" },
  { id: 2,  category: "weddings",  src: "/photos/wedding-1.jpg",   alt: "Wedding ceremony arch",     aspectRatio: "wide",   location: "Tuscany, Italy" },
  { id: 3,  category: "travel",    src: "/photos/travel-1.jpg",    alt: "Mountain sunrise",          aspectRatio: "square", location: "Dolomites, Italy" },
  { id: 4,  category: "events",    src: "/photos/event-1.jpg",     alt: "Concert crowd energy",      aspectRatio: "tall",   location: "Manchester, UK" },
  { id: 5,  category: "editorial", src: "/photos/editorial-1.jpg", alt: "High fashion editorial",    aspectRatio: "square", location: "Paris, France" },
  { id: 6,  category: "nature",    src: "/photos/nature-1.jpg",    alt: "Misty forest path",         aspectRatio: "wide",   location: "Scottish Highlands" },
  { id: 7,  category: "portraits", src: portrait2,  alt: "Studio chiaroscuro",        aspectRatio: "square", location: "London, UK" },
  { id: 8,  category: "weddings",  src: "/photos/wedding-2.jpg",   alt: "First dance moment",        aspectRatio: "tall",   location: "Cotswolds, UK" },
  { id: 9,  category: "travel",    src: "/photos/travel-2.jpg",    alt: "Desert dune shadows",       aspectRatio: "wide",   location: "Sahara, Morocco" },
  { id: 10, category: "events",    src: "/photos/event-2.jpg",     alt: "Corporate gala evening",    aspectRatio: "square", location: "London, UK" },
  { id: 11, category: "nature",    src: "/photos/nature-2.jpg",    alt: "Coastal cliff at dusk",     aspectRatio: "tall",   location: "Cornwall, UK" },
  { id: 12, category: "editorial", src: "/photos/editorial-2.jpg", alt: "Minimalist product shoot",  aspectRatio: "square", location: "Berlin, Germany" },
  { id: 13, category: "portraits", src: "/photos/portrait-3.jpg",  alt: "Environmental portrait",    aspectRatio: "wide",   location: "New York, USA" },
  { id: 14, category: "weddings",  src: "/photos/wedding-3.jpg",   alt: "Bridal prep candid",        aspectRatio: "square", location: "Lake Como, Italy" },
  { id: 15, category: "travel",    src: "/photos/travel-3.jpg",    alt: "City lights reflection",    aspectRatio: "tall",   location: "Tokyo, Japan" },
  { id: 16, category: "events",    src: "/photos/event-3.jpg",     alt: "Awards night emotion",      aspectRatio: "wide",   location: "Edinburgh, UK" },
  { id: 17, category: "nature",    src: "/photos/nature-3.jpg",    alt: "Aurora over lake",          aspectRatio: "square", location: "Iceland" },
  { id: 18, category: "editorial", src: "/photos/editorial-3.jpg", alt: "Street style editorial",    aspectRatio: "tall",   location: "Milan, Italy" },
];

// ─── Aspect ratio → CSS height ────────────────────────────────────
const heightMap = { tall: "420px", wide: "260px", square: "320px" };

// ─── Stats ────────────────────────────────────────────────────────
const stats = [
  { value: "1,200+", label: "Pictures Delivered" },
  { value: "2+",     label: "Countries captured" },
  { value: "40+",    label: "Locations explored" },
  { value: "99%",    label: "Client satisfaction" },
];

// ─── Testimonials ─────────────────────────────────────────────────
const testimonials = [
  {
    quote: "The photos from our wedding day are beyond anything we could have imagined. Every emotion, every detail captured perfectly.",
    name: "Sophie & James",
    role: "Wedding clients",
    initials: "SJ",
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

// ─── Lightbox ─────────────────────────────────────────────────────
function Lightbox({ photo, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full border border-stone-600 hover:border-white hover:text-white flex items-center justify-center transition-colors z-10 text-stone-600" >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-stone-600 hover:border-white hover:text-white rounded-full flex items-center justify-center transition-all z-10  text-stone-600">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-stone-600 hover:border-white hover:text-white flex items-center justify-center transition-all z-10 text-stone-600"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "70vh" }}>
          <div className="w-full h-full rounded-xl flex items-center justify-center bg-[#111]">
            <Image src={photo.src} fill className="object-contain" alt={photo.alt} sizes="100vw"/> 
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-sm">{photo.alt}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-white/40 text-sm">{photo.location}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Placeholder image card ───────────────────────────────────────
function PhotoPlaceholder({ photo, index }) {
  const colors = [
    ["#1a1a2e","#16213e"], ["#0d1b2a","#1b2838"],
    ["#1a0a00","#2d1a0a"], ["#0a1a0a","#0d2b0d"],
    ["#1a0a1a","#2b0d2b"], ["#0a0a1a","#0d0d2b"],
  ];
  const [bg1, bg2] = colors[index % colors.length];
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(135deg, ${bg1}, ${bg2})` }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
        <path d="M21 15l-5-5L5 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <span className="text-white/20 text-xs font-medium text-center px-4 leading-snug">{photo.alt}</span>
    </div>
  );
}
// ─── Testimonials carousel ────────────────────────────────────────
function TestimonialsCarousel() {
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
// ─── Main page ────────────────────────────────────────────────────
export default function Photography() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeCategory === "all"
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i - 1 + filtered.length) % filtered.length);
  const nextPhoto = () => setLightboxIndex((i) => (i + 1) % filtered.length);

  return (
    <main className="min-h-screen flex flex-col bg-(--color-bg-page) pt-20" >

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-end px-6 pb-20 overflow-hidden">
        {/* Full-bleed background collage */}
        <div className="absolute inset-0">
          {/* Simulated collage — replace with real hero image */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #0a0a12 0%, #12100e 50%, #0a0c0a 100%)" }}
          />
          {/* Floating image tiles */}
          {[
            { top: "5%", left: "55%", w: "28%", h: "45%", rot: "2deg",  bg: "#1a1206" },
            { top: "10%", left: "75%", w: "22%", h: "55%", rot: "-3deg", bg: "#06120a" },
            { top: "35%", left: "58%", w: "20%", h: "38%", rot: "1deg",  bg: "#12060a" },
            { top: "2%",  left: "82%", w: "16%", h: "30%", rot: "4deg",  bg: "#060a12" },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, rotate: t.rot }}
              animate={{ opacity: 1, y: 0, rotate: t.rot }}
              transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="absolute rounded-xl overflow-hidden border border-white/5"
              style={{ top: t.top, left: t.left, width: t.w, height: t.h, backgroundColor: t.bg }}
            >
              <div className="w-full h-full flex items-center justify-center opacity-20">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
                  <path d="M21 15l-5-5L5 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
          {/* Dark vignette over right side */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(10,10,18,1) 40%, rgba(10,10,18,0.6) 70%, rgba(10,10,18,0.2) 100%)" }} />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "linear-gradient(to top, var(--color-bg-page), transparent)" }} />
          <DotGrid />
        </div>

        {/* Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <Glow style={{ width: 500, height: 300, top: "20%", left: "5%", backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 10%, transparent)" }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: "var(--color-accent-subtle)" }}>
                Photography
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.88] tracking-tight mb-8 text-white"
            >
              Moments
              <br />
              <span className="text-accent-gradient">preserved</span>
              <br />
              <span style={{ color: "var(--color-text-secondary)", fontStyle: "italic", fontWeight: 900 }}>forever.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg max-w-md leading-relaxed mb-10"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Documentary, editorial, and portrait photography that tells your story with honesty and artistry.
            </motion.p>

            <motion.div variants={fadeUp} className="flex items-center gap-4 flex-wrap">
              <a href="#gallery" className="btn-accent px-7 py-3 rounded-full inline-flex items-center gap-2">
                View portfolio
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M3 8l4 4 4-4" stroke="var(--color-arrow-stroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <Link
                href="/contact"
                className="btn-border" >
                Book a session
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="relative border-y overflow-hidden"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <CountStat key={s.label} stat={s} index={i} />
          ))}
        </div>
      </motion.section>

      {/* ── GALLERY ───────────────────────────────────────────────── */}
      <section id="gallery" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <Glow style={{ width: 600, height: 300, top: 0, left: "50%", transform: "translateX(-50%)", backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 8%, transparent)" }} />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase block mb-3" style={{ color: "var(--color-accent-subtle)" }}>Portfolio</span>
                <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ color: "var(--color-text-primary)" }}>
                  Selected <span className="text-accent-gradient">work</span>
                </h2>
                <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {filtered.length} {activeCategory === "all" ? "photographs" : activeCategory} — click any image to explore
                </p>
              </div>
              <Link
                href="https://lollykrown.pixieset.com"
                className="inline-flex self-center items-center gap-2 text-sm font-semibold text-(--color-text-primary) hover:text-(--color-accent) transition-colors group"
              >
                View all
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-accent) 20%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5h6M5 2l3 3-3 3" stroke="var(--color-accent-subtle)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </motion.div>

            {/* Category filter pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-250"
                  style={
                    activeCategory === cat.id
                      ? { backgroundColor: "var(--color-accent)", color: "var(--color-arrow-stroke)", borderColor: "var(--color-accent)" }
                      : { backgroundColor: "transparent", color: "var(--color-accent-subtle)", borderColor: "color-mix(in srgb, var(--color-accent) 30%, transparent)" }
                  }
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Staggered masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial="hidden"
              animate="show"
              variants={stagger}
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-0"
            >
              {filtered.map((photo, i) => (
                <motion.div
                  key={photo.id}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.96 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  className="break-inside-avoid mb-4 group relative overflow-hidden rounded-xl cursor-pointer"
                  style={{ height: heightMap[photo.aspectRatio] }}
                  onClick={() => openLightbox(i)}
                  whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                >
                  {/* Image / placeholder */}
                  <div className="w-full h-full relative overflow-hidden rounded-xl">
                    {/* <PhotoPlaceholder photo={photo} index={i} /> */}
                    {photo.id===1||photo.id===7? 
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      placeholder="blur"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />:
                    <PhotoPlaceholder photo={photo} index={i} />}

                    {/* Overlay */}
                    <div
                      className="absolute inset-0 transition-opacity duration-400 flex flex-col justify-between p-4"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)", opacity: 0 }}
                      ref={(el) => {
                        if (el) {
                          el.parentElement.parentElement.addEventListener("mouseenter", () => { el.style.opacity = "1"; });
                          el.parentElement.parentElement.addEventListener("mouseleave", () => { el.style.opacity = "0"; });
                        }
                      }}
                    >
                      <div className="flex justify-end">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 2h4M2 2v4M12 2h-4M12 2v4M2 12h4M2 12v-4M12 12h-4M12 12v-4" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold leading-snug mb-1">{photo.alt}</p>
                        <div className="flex items-center gap-1.5">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M5 1C3.343 1 2 2.343 2 4c0 2.5 3 5 3 5s3-2.5 3-5c0-1.657-1.343-3-3-3zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="rgba(255,255,255,0.6)"/>
                          </svg>
                          <span className="text-white/60 text-[11px]">{photo.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── ABOUT / APPROACH ──────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative py-28 px-6 border-t overflow-hidden"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow style={{ width: 600, height: 350, top: 0, left: 0, backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 10%, transparent)" }} />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: large feature image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main photo */}
            {/* <div
              className="relative w-full rounded-2xl overflow-hidden border"
              style={{ height: "520px", backgroundColor: "var(--color-bg-card-darker)", borderColor: "var(--color-border-card)" }}
            >
              <PhotoPlaceholder photo={{ alt: "Photographer at work — behind the lens" }} index={4} />
              <Image src="/pp.png" fill className="object-cover" alt="Photographer at work — behind the lens" />
            </div> */}
{/* Polaroid mood board */}
<div
  className="relative w-full rounded-2xl overflow-hidden border"
  style={{
    height: "520px",
    backgroundColor: "var(--color-bg-card-darker)",
    borderColor: "var(--color-border-card)",
  }}
>
  {/* Subtle linen texture background */}
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage: `repeating-linear-gradient(
        0deg, transparent, transparent 2px,
        rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px
      ), repeating-linear-gradient(
        90deg, transparent, transparent 2px,
        rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px
      )`,
    }}
  />

  {/* Ambient warm centre glow */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background: "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(--color-accent-muted) 12%, transparent) 0%, transparent 70%)",
    }}
  />

  {/* ── Polaroids ── */}
  {[
    { rotate: "-7deg",  top: "6%",  left: "4%",   w: "34%", h: "200px", caption: "golden hour",   delay: 0    },
    { rotate: "4deg",   top: "4%",  left: "34%",  w: "30%", h: "185px", caption: "ceremony arch", delay: 0.07 },
    { rotate: "-2deg",  top: "5%",  left: "62%",  w: "34%", h: "195px", caption: "first dance",   delay: 0.14 },
    { rotate: "6deg",   top: "48%", left: "6%",   w: "28%", h: "175px", caption: "candid joy",    delay: 0.21 },
    { rotate: "-5deg",  top: "50%", left: "32%",  w: "36%", h: "190px", caption: "behind the lens",delay: 0.28 },
    { rotate: "3deg",   top: "47%", left: "65%",  w: "30%", h: "180px", caption: "the highlands", delay: 0.35 },
  ].map((p, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 24, rotate: p.rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
      whileHover={{ scale: 1.06, rotate: "0deg", zIndex: 30, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      transition={{ duration: 0.65, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="absolute cursor-pointer"
      style={{ top: p.top, left: p.left, width: p.w, zIndex: i + 1 }}
    >
      {/* Polaroid frame */}
      <div
        className="flex flex-col shadow-2xl"
        style={{
          backgroundColor: "var(--color-bg-card-dark)",
          border: "1px solid color-mix(in srgb, var(--color-text-primary) 8%, transparent)",
          padding: "8px 8px 28px 8px",
          borderRadius: "3px",
        }}
      >
        {/* Photo area */}
        <div
          className="w-full rounded-xs overflow-hidden"
          style={{
            height: p.h,
            background: [
              "linear-gradient(135deg, #1a1206 0%, #0d1a0a 100%)",
              "linear-gradient(135deg, #0d0a1a 0%, #1a0a0d 100%)",
              "linear-gradient(135deg, #0a1a12 0%, #1a1206 100%)",
              "linear-gradient(135deg, #0d1206 0%, #060d1a 100%)",
              "linear-gradient(135deg, #1a0612 0%, #0d1a0a 100%)",
              "linear-gradient(135deg, #06121a 0%, #1a0a06 100%)",
            ][i],
          }}
        >
          {/* Replace with <Image src={...} fill className="object-cover" alt={p.caption} /> */}
          <div className="w-full h-full flex items-center justify-center opacity-15">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
              <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
              <path d="M21 15l-5-5L5 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Handwritten caption */}
        <p
          className="text-center mt-1.5 text-[11px] tracking-wide"
          style={{
            fontFamily: "cursive",
            color: "var(--color-text-muted)",
            lineHeight: 1.2,
          }}
        >
          {p.caption}
        </p>
      </div>

      {/* Washi tape strip */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-5 rounded-[2px] opacity-40"
        style={{
          backgroundColor: ["var(--color-accent)", "rgba(255,255,255,0.3)", "var(--color-accent)", "rgba(255,255,255,0.3)", "var(--color-accent)", "rgba(255,255,255,0.3)"][i],
          transform: `translateX(-50%) rotate(${[-3,2,-1,4,-2,3][i]}deg)`,
        }}
      />
    </motion.div>
  ))}
</div>
            {/* Floating accent card */}
            <div
              className="absolute -bottom-16 -right-6 rounded-2xl p-5 border z-50"
              style={{ backgroundColor: "var(--color-bg-card-dark)", borderColor: "var(--color-border-card)", width: "200px" }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--color-accent-subtle)" }}>Based in</p>
              <p className="font-black text-lg" style={{ color: "var(--color-text-primary)" }}>Sunderland, UK</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Available worldwide</p>
            </div>
            {/* Small accent photo */}
            <div
              className="absolute -top-6 -left-6 w-32 h-40 rounded-xl overflow-hidden border z-50"
              style={{ backgroundColor: "var(--color-bg-card-darker)", borderColor: "var(--color-border-card)" }}
            >
              <PhotoPlaceholder photo={{ alt: "Camera detail" }} index={2} />
              {/* <Image src="/pp.png" fill className="object-cover" alt="Photographer at work — behind the lens" />  */}
            </div>
          </motion.div>

          {/* Right: text */}
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-5" style={{ color: "var(--color-accent-subtle)" }}>
              The photographer
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black leading-[0.95] mb-6" style={{ color: "var(--color-text-primary)" }}>
              Light, story,
              <br />
              <span className="text-accent-gradient">truth.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base leading-relaxed mb-5" style={{ color: "var(--color-text-secondary)" }}>
              I believe every photograph is a collaboration between the subject and the light. My job is simply to be ready when that moment arrives — and patient enough to wait for it.
            </motion.p>
            <motion.p variants={fadeUp} className="text-base leading-relaxed mb-10" style={{ color: "var(--color-text-muted)" }}>
              With over 4 years shooting across 40+ locations — from intimate portrait sessions to big events — I bring the same intentionality to every project, regardless of size.
            </motion.p>

            {/* Approach pillars */}
            <motion.div variants={stagger} className="flex flex-col gap-4 mb-10">
              {[
                { title: "Documentary instinct", desc: "Real moments over posed perfection, always." },
                { title: "Obsessive with light", desc: "Golden hour, studio, overcast — every light has a mood." },
                { title: "Minimal footprint", desc: "Small kit, less disruption, more authentic images." },
              ].map((p) => (
                <motion.div key={p.title} variants={fadeUp} className="flex items-start gap-4">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l3 3 4-4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <div>
                    <p className="font-black text-sm mb-0.5" style={{ color: "var(--color-text-primary)" }}>{p.title}</p>
                    <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link href="https://wa.me/+447425932661" className="btn-accent px-7 py-3 rounded-full inline-flex items-center gap-2">
                Book a session
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 3l4 4-4 4" stroke="var(--color-arrow-stroke)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── SERVICES / PACKAGES ───────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative py-24 px-6 border-t overflow-hidden"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow style={{ width: 700, height: 350, top: 0, right: 0, backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 8%, transparent)" }} />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent-subtle)" }}>Sessions</span>
              <h2 className="text-4xl md:text-5xl font-black" style={{ color: "var(--color-text-primary)" }}>
                What I <span className="text-accent-gradient">shoot</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: "👤", category: "Portraits", desc: "Individual, couple, and family sessions. Studio or location. Relaxed, natural, and always you.", price: "From £150", tag: null },
                { icon: "💍", category: "Weddings", desc: "Full-day documentary coverage from prep to dance floor. No missed moments, no forced smiles.", price: "On request", tag: "Most booked" },
                { icon: "🎉", category: "Events & Special Occasions", desc: "Photography for birthdays, anniversaries, and other special life events. Capturing joy and celebration.", price: "From £250", tag: null },
                { icon: "👶", category: "Baby & Maternity", desc: "Capturing the beauty and emotion of pregnancy, newborns, and family milestones.", price: "From £150", tag: null },
                { icon: "✈️", category: "Travel",   desc: "Destination shoots, travel editorial, and commercial location photography worldwide.", price: "On request", tag: null },
                { icon: "📸", category: "Commercial", desc: "Brand, product, and lifestyle photography. Clean, compelling images that sell.", price: "From £200", tag: null },
                { icon: "📅", category: "Others", desc: "Specialized photography services for unique projects and creative endeavors.", price: "On request", tag: null },

                // { icon: "🎓", category: "Senior & Graduation", desc: "Personalized sessions celebrating academic milestones with style and authenticity.", price: "From £150", tag: null },
                // { icon: "🎨", category: "Editorial", desc: "Magazine, brand, and fashion editorial work. Concept to final retouched images.", price: "From £900", tag: null },
                // { icon: "🌿", category: "Nature",   desc: "Landscape, wildlife, and botanical photography. Patience is part of the process.", price: "From £500", tag: null },
                // { icon: "📷", category: "Photojournalism", desc: "Documentary photography for news, NGOs, and storytelling projects worldwide.", price: "On request", tag: null },
                // { icon: "🎬", category: "Film & Video", desc: "Cinematic video production and photography for brands, events, and personal projects.", price: "On request", tag: null },
                // { icon: "🖼️", category: "Fine Art Prints", desc: "Limited edition prints of my work, available for purchase and worldwide shipping.", price: "From £100", tag: null },
                // { icon: "📚", category: "Workshops & Mentoring", desc: "In-person and virtual photography workshops, portfolio reviews, and one-on-one mentoring.", price: "From £200", tag: null },
                // { icon: "🤝", category: "Collaborations", desc: "Open to creative collaborations, brand partnerships, and pro bono work for causes I care about.", price: "Varies", tag: null },
                // { icon: "🖌️", category: "Retouching & Editing", desc: "Professional photo retouching, color grading, and editing services for photographers and clients.", price: "From £50 per image", tag: null },
                // { icon: "📅", category: "Event Coverage", desc: "Comprehensive photography coverage for corporate events, conferences, and private parties.", price: "From £300", tag: null },
                // { icon: "🌟", category: "Personal Branding", desc: "Tailored photo sessions to elevate your personal brand and online presence.", price: "From £250", tag: null },
                // { icon: "🎭", category: "Theatrical & Performance", desc: "Dynamic photography capturing the energy and emotion of live performances and theater productions.", price: "On request", tag: null },
                // { icon: "📸", category: "Headshots", desc: "Professional headshot sessions for actors, corporate professionals, and creatives.", price: "From £120", tag: null },
                // { icon: "🏞️", category: "Real Estate & Architecture", desc: "High-quality photography showcasing properties, architecture, and interior design.", price: "From £200", tag: null } ,
                // { icon: "🎨", category: "Creative Projects", desc: "Open to unique and experimental photography projects that push creative boundaries.", price: "Varies", tag: null },
                // { icon: "📖", category: "Photo Books & Zines", desc: "Design and production of custom photo books and zines, perfect for personal projects or gifts.", price: "From £50", tag: null },
                // { icon: "🌍", category: "Environmental & Conservation", desc: "Photography projects focused on environmental issues, conservation efforts, and nature's beauty.", price: "On request", tag: null },
                // { icon: "📸", category: "Virtual Photoshoots", desc: "Remote photography sessions conducted via video call, perfect for clients worldwide.", price: "From £100", tag: null },

              ].map((s, i) => (
                <motion.div
                  key={s.category}
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.97 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative rounded-2xl p-7 border overflow-hidden"
                  style={{ backgroundColor: i % 2 === 0 ? "var(--color-bg-card-darker)" : "var(--color-bg-card-dark)", borderColor: "var(--color-border-card)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent 65%)" }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to right, var(--color-accent), transparent)" }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{s.icon}</span>
                      {s.tag && (
                        <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent-subtle)", border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)" }}>
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-black mb-2" style={{ color: "var(--color-text-primary)" }}>{s.category}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-text-muted)" }}>{s.desc}</p>
                    <p className="text-sm font-black" style={{ color: "var(--color-accent-subtle)" }}>{s.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      {/* <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative py-24 px-6 border-t overflow-hidden"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow style={{ width: 600, height: 300, top: 0, left: "25%", backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 10%, transparent)" }} />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent-subtle)" }}>Kind words</span>
              <h2 className="text-4xl md:text-5xl font-black" style={{ color: "var(--color-text-primary)" }}>
                What clients <span className="text-accent-gradient-alt">say</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
                  className="relative rounded-2xl p-8 border overflow-hidden"
                  style={{ backgroundColor: "var(--color-bg-card-darker)", borderColor: "var(--color-border-card)" }}
                >
                  <span
                    className="absolute top-4 right-6 text-7xl font-black leading-none select-none pointer-events-none"
                    style={{ color: "color-mix(in srgb, var(--color-accent) 12%, transparent)" }}
                  >&ldquo;</span>

                  <p className="text-sm leading-relaxed mb-8 relative z-10" style={{ color: "var(--color-text-secondary)" }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                      style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent-subtle)" }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-black text-sm" style={{ color: "var(--color-text-primary)" }}>{t.name}</p>
                      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section> */}
      {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
      <TestimonialsCarousel />
      
      {/* ── CTA ───────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="relative py-32 px-6 border-t overflow-hidden"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <Glow style={{ width: 800, height: 450, top: 0, left: "50%", transform: "translateX(-50%)", backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 14%, transparent)" }} />
          <DotGrid />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: "var(--color-accent-subtle)" }}>
              Let&apos;s create together
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-black leading-[0.92] mb-8" style={{ color: "var(--color-text-primary)" }}>
              Your story
              <br />
              <span className="text-accent-gradient">deserves</span>
              <br />
              to be told.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-12 max-w-md mx-auto" style={{ color: "var(--color-text-secondary)" }}>
              Whether it&apos;s a wedding, editorial shoot, or something entirely different — I&apos;d love to hear about it.
            </motion.p>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/contact" className="btn-accent px-9 py-4 rounded-full text-base inline-flex items-center gap-2">
                Book a session
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h12M9 4l4 4-4 4" stroke="var(--color-arrow-stroke)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a
                href="mailto:hello@yourdomain.com"
                className="text-sm font-semibold px-9 py-4 rounded-full border transition-all duration-200"
                style={{ color: "var(--color-text-secondary)", borderColor: "var(--color-border-card)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; e.currentTarget.style.borderColor = "var(--color-border-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; e.currentTarget.style.borderColor = "var(--color-border-card)"; }}
              >
                hello@yourdomain.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── LIGHTBOX ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photo={filtered[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </main>
  );
}