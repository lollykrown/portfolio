'use client'
import { motion } from 'framer-motion';
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export function Glow({ style }) {
  return <div className="absolute rounded-full blur-[130px] pointer-events-none" style={style} />;
}

export function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.035]"
      style={{
        backgroundImage: `radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: "var(--color-dot-opacity)",
      }}
    />
  );
}

export function Lightbox({ photo, onClose, onPrev, onNext }) {
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const blurUrl = photo.src.replace("/upload/", "/upload/e_blur:1000,q_1,w_50/" );

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
 
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger if horizontal swipe is dominant and long enough
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };
 
  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPrev, onNext, onClose]);
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
 
      {/* Prev — hidden on mobile (use swipe instead) */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border items-center justify-center transition-all z-10 hidden md:flex"
        style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
 
      {/* Next — hidden on mobile */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border items-center justify-center transition-all z-10 hidden md:flex"
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
            className="relative w-full h-full bg-[#111] rounded-xl flex items-center justify-center"
          >
              <Image src={photo.src} 
              fill priority
              className="object-contain" 
              alt={photo.alt} 
              placeholder="blur"
              blurDataURL={blurUrl}
              // onLoad={(e) => e.currentTarget.dataset.loaded = "true"}
              sizes="100vw"/> 
          </div>
        </div>
 
        {/* Caption + swipe hint on mobile */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex items-center gap-3">
            <span className="text-white/70 text-sm">{photo.alt}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-white/40 text-sm">{photo.location}</span>
          </div>
          {/* Mobile swipe hint — only shown once via opacity fade */}
          <div className="flex items-center gap-2 md:hidden" style={{ color: "rgba(255,255,255,0.3)" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h4M8 7h4M10 5l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[11px] tracking-widest uppercase">Swipe to navigate</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H8M6 7H2M4 5L2 7l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {/* Mobile prev/next tap zones */}
          <div className="flex items-center gap-4 md:hidden mt-1">
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold transition-all"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Prev
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-semibold transition-all"
              style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
            >
              Next
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}