"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
  { id: "nature",    label: "Nature" },
  { id: "baby",      label: "Baby" },
  { id: "other",     label: "Other" },
];

// ─── Photo data ───────────────────────────────────────────────────
// Replace src with real image paths. aspectRatio controls grid cell height.
const photos = [
  { id: 1,  category: "portraits", src: "/photos/portrait-1.jpg",  alt: "Newborn Baby Portrait",     aspectRatio: "tall",   location: "London, UK" },
  { id: 2,  category: "weddings",  src: "/photos/wedding-1.jpg",   alt: "Wedding ceremony arch",     aspectRatio: "wide",   location: "Tuscany, Italy" },
  { id: 3,  category: "travel",    src: "/photos/travel-1.jpg",    alt: "Mountain sunrise",          aspectRatio: "square", location: "Dolomites, Italy" },
  { id: 4,  category: "events",    src: "/photos/event-1.jpg",     alt: "Concert crowd energy",      aspectRatio: "tall",   location: "Manchester, UK" },
  { id: 5,  category: "editorial", src: "/photos/editorial-1.jpg", alt: "High fashion editorial",    aspectRatio: "square", location: "Paris, France" },
  { id: 6,  category: "nature",    src: "/photos/nature-1.jpg",    alt: "Misty forest path",         aspectRatio: "wide",   location: "Scottish Highlands" },
  { id: 7,  category: "portraits", src: "/photos/portrait-2.jpg",  alt: "Studio chiaroscuro",        aspectRatio: "square", location: "London, UK" },
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
  { value: "1,200+", label: "Shoots completed" },
  { value: "8+",     label: "Years of experience" },
  { value: "40+",    label: "Countries captured" },
  { value: "98%",    label: "Client satisfaction" },
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
    quote: "Working with this photographer transformed our brand. The editorial series stopped people mid-scroll every time.",
    name: "Aria Mondelli",
    role: "Creative Director, Lumène",
    initials: "AM",
  },
  {
    quote: "The portraits from our event felt cinematic. Guests were speechless when they saw the gallery.",
    name: "Marcus Chen",
    role: "Events Manager, Soho House",
    initials: "MC",
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
        className="absolute top-5 right-5 w-10 h-10 rounded-full border flex items-center justify-center transition-colors z-10"
        style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border flex items-center justify-center transition-all z-10"
        style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border flex items-center justify-center transition-all z-10"
        style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
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
          <div
            className="w-full h-full rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#111" }}
          >
            {/* Replace with <Image src={photo.src} fill className="object-contain" alt={photo.alt} /> */}
            <div className="flex flex-col items-center gap-3 opacity-30">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
                <path d="M21 15l-5-5L5 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-white text-sm">{photo.alt}</span>
            </div>
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
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-black mb-1" style={{ color: "var(--color-accent-subtle)" }}>{s.value}</p>
              <p className="text-sm tracking-wide" style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
            </motion.div>
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
              </div>
              <p className="text-sm max-w-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                {filtered.length} {activeCategory === "all" ? "photographs" : activeCategory} — click any image to explore
              </p>
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
                    {photo.id===1? <Image src={photo.src} fill className="object-cover transition-transform duration-700 group-hover:scale-105" alt={photo.alt} />:
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
            <div
              className="relative w-full rounded-2xl overflow-hidden border"
              style={{ height: "520px", backgroundColor: "var(--color-bg-card-darker)", borderColor: "var(--color-border-card)" }}
            >
              <PhotoPlaceholder photo={{ alt: "Photographer at work — behind the lens" }} index={4} />
              {/* <Image src="/pp.png" fill className="object-cover" alt="Photographer at work — behind the lens" /> */}
            </div>
            {/* Floating accent card */}
            <div
              className="absolute -bottom-6 -right-6 rounded-2xl p-5 border"
              style={{ backgroundColor: "var(--color-bg-card-dark)", borderColor: "var(--color-border-card)", width: "200px" }}
            >
              <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--color-accent-subtle)" }}>Based in</p>
              <p className="font-black text-lg" style={{ color: "var(--color-text-primary)" }}>London, UK</p>
              <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Available worldwide</p>
            </div>
            {/* Small accent photo */}
            <div
              className="absolute -top-6 -left-6 w-32 h-40 rounded-xl overflow-hidden border"
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
              With over 8 years shooting across 40+ countries — from intimate portrait sessions to large-scale editorial commissions — I bring the same intentionality to every project, regardless of size.
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
              <Link href="/contact" className="btn-accent px-7 py-3 rounded-full inline-flex items-center gap-2">
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
                { icon: "👤", category: "Portraits", desc: "Individual, couple, and family sessions. Studio or location. Relaxed, natural, and always you.", price: "From £350", tag: null },
                { icon: "💍", category: "Weddings", desc: "Full-day documentary coverage from prep to dance floor. No missed moments, no forced smiles.", price: "From £2,200", tag: "Most booked" },
                { icon: "🎉", category: "Events", desc: "Corporate, private, and cultural events. Discreet, fast-moving, and always delivering.", price: "From £600", tag: null },
                { icon: "✈️", category: "Travel",   desc: "Destination shoots, travel editorial, and commercial location photography worldwide.", price: "On request", tag: null },
                { icon: "🎨", category: "Editorial", desc: "Magazine, brand, and fashion editorial work. Concept to final retouched images.", price: "From £900", tag: null },
                { icon: "🌿", category: "Nature",   desc: "Landscape, wildlife, and botanical photography. Patience is part of the process.", price: "From £500", tag: null },
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
      <motion.section
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
                  {/* Large quote mark */}
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
      </motion.section>

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