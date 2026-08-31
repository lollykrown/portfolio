"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import ReviewForm from "@/components/ReviewForm";
import { allReviews } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: `radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)`, backgroundSize: "28px 28px", opacity: "var(--color-dot-opacity)" }}
    />
  );
}

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={s <= rating ? "var(--color-accent)" : "transparent"}
            stroke={s <= rating ? "var(--color-accent)" : "var(--color-border-hover)"}
            strokeWidth="1.5"
          />
        </svg>
      ))}
    </div>
  );
}

// Average rating
const avg = (allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length).toFixed(1);

export default function ReviewsSection() {
  const [showForm, setShowForm] = useState(false);
  const featured = allReviews.slice(0, 3);

  return (
    <motion.section
      id="reviews"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className="relative py-24 px-6 border-t overflow-hidden"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-page)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full blur-[130px]"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 10%, transparent)" }}
        />
        <DotGrid />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-3"
              style={{ color: "var(--color-accent-subtle)" }}
            >Client reviews</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black leading-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              What people <span className="text-accent-gradient">say</span>
            </motion.h2>

            {/* Rating summary */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-black" style={{ color: "var(--color-accent-subtle)" }}>{avg}</span>
              <div>
                <Stars rating={5} />
                <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted)" }}>
                  Based on {allReviews.length} reviews
                </p>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-full text-(--color-text-primary) hover:text-(--color-accent) transition-colors group mb-1 border border-(--color-border-card)"
            >
              See all reviews
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
        </motion.div>

        {/* Review cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-5"
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
        >
          {featured.map((r) => (
            <motion.div key={r.id} variants={fadeUp}
              className="relative rounded-2xl p-7 border overflow-hidden"
              style={{ backgroundColor: "var(--color-bg-card-darker)", borderColor: "var(--color-border-card)" }}
            >
              <span className="absolute top-4 right-5 text-7xl font-black leading-none select-none pointer-events-none"
                style={{ color: "color-mix(in srgb, var(--color-accent) 10%, transparent)" }}
              >&ldquo;</span>
              <div className="flex items-center gap-2 mb-4">
                <Stars rating={r.rating} />
                <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{r.date}</span>
              </div>
              <p className="text-sm leading-relaxed mb-6 relative z-10 italic" style={{ color: "var(--color-text-secondary)" }}>
                &ldquo;{r.review}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent-subtle)" }}
                >
                  {r.initials}
                </div>
                <div>
                  <p className="font-black text-sm" style={{ color: "var(--color-text-primary)" }}>{r.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <button
              onClick={() => setShowForm((v) => !v)}
              className={`inline-flex cursor-pointer items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border transition-all duration-200
                ${showForm?"bg-transparent text-(--color-accent) hover:bg-(--color-accent) hover:text-(--color-arrow-stroke)":
                  "bg-(--color-accent) hover:bg-transparent hover:text-(--color-accent)"}`}>
              {showForm ? "Hide the form" : "Leave a review"}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                style={{ transform: showForm ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
              >
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
        </motion.div>

        {/* Inline review form — below reviews */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                className="max-w-2xl mx-auto rounded-2xl p-6 md:p-8 border border-(--color-border-card) mt-10 relative overflow-hidden bg-(--color-bg-card-darker)"
              >
                <div
                  className=" absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-(--color-accent) to-transparent"/>

                <div
                  className=" absolute -top-12 -left-12 w-40 h-40 rounded-full blur-[60px] pointer-events-none bg-(--color-accent-muted)/20" />
                <h3 className="text-lg font-black mb-5 relative" style={{ color: "var(--color-text-primary)" }}>
                  Share your experience
                </h3>
                <ReviewForm onClose={() => setShowForm(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
