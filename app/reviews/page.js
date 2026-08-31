"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ReviewForm from "@/components/ReviewForm";
import { allReviews } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

const PER_PAGE = 6;

function DotGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none"
      style={{ backgroundImage: `radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)`, backgroundSize: "28px 28px", opacity: "var(--color-dot-opacity)" }}
    />
  );
}

function Stars({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24" fill="none">
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

// Rating breakdown
const breakdown = [5,4,3,2,1].map((star) => ({
  star,
  count: allReviews.filter((r) => r.rating === star).length,
}));
const avg = (allReviews.reduce((a, r) => a + r.rating, 0) / allReviews.length).toFixed(1);

export default function ReviewsPage() {
  const [page, setPage]         = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter]     = useState(0); // 0 = all

  const filtered = filter ? allReviews.filter((r) => r.rating === filter) : allReviews;
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleFilter = (star) => {
    setFilter((f) => (f === star ? 0 : star));
    setPage(1);
  };

  return (
    <main className="min-h-screen" style={{ backgroundColor: "var(--color-bg-page)" }}>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-6 border-b overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-75 rounded-full blur-[130px]"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 12%, transparent)" }}
          />
          <DotGrid />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.span variants={fadeUp} className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--color-accent-subtle)" }}
            >Client reviews</motion.span>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-black leading-tight mb-6"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  What clients <span className="text-accent-gradient">say</span>
                </motion.h1>

                {/* Summary row */}
                <motion.div variants={fadeUp} className="flex items-center gap-5 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black" style={{ color: "var(--color-accent-subtle)" }}>{avg}</span>
                    <div>
                      <Stars rating={5} size={16} />
                      <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>
                        {allReviews.length} reviews
                      </p>
                    </div>
                  </div>

                  {/* Star breakdown bars */}
                  <div className="flex flex-col gap-1.5">
                    {breakdown.map(({ star, count }) => (
                      <button key={star} onClick={() => handleFilter(star)}
                        className="flex items-center gap-2 group"
                      >
                        <span className="text-xs w-3 text-right font-semibold" style={{ color: "var(--color-text-muted)" }}>{star}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="var(--color-accent)" style={{ opacity: 0.7 }}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                        <div className="w-24 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border-card)" }}>
                          <div className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${(count / allReviews.length) * 100}%`,
                              backgroundColor: filter === star ? "var(--color-accent)" : "color-mix(in srgb, var(--color-accent) 50%, transparent)",
                            }}
                          />
                        </div>
                        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{count}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS GRID ──────────────────────────────────────────── */}
      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"><DotGrid /></div>

        <div className="relative z-10 max-w-6xl mx-auto">

          {/* Active filter chip */}
          {filter > 0 && (
            <div className="flex items-center gap-2 mb-8">
              <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>Showing:</span>
              <button
                onClick={() => handleFilter(filter)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent-subtle)", border: "1px solid color-mix(in srgb, var(--color-accent) 30%, transparent)" }}
              >
                {filter} star{filter !== 1 ? "s" : ""}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </button>
              <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            </div>
          )}

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${page}-${filter}`}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
              variants={stagger} initial="hidden" animate="show"
            >
              {paginated.map((r) => (
                <motion.div key={r.id}
                  variants={{ hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                  className="relative rounded-2xl p-7 border overflow-hidden"
                  style={{ backgroundColor: "var(--color-bg-card-darker)", borderColor: "var(--color-border-card)" }}
                >
                  <span className="absolute top-4 right-5 text-7xl font-black leading-none select-none pointer-events-none"
                    style={{ color: "color-mix(in srgb, var(--color-accent) 10%, transparent)" }}
                  >&ldquo;</span>

                  <div className="flex items-center justify-between mb-4">
                    <Stars rating={r.rating} />
                    <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>{r.date}</span>
                  </div>

                  <p className="text-sm leading-relaxed mb-6 relative z-10 italic" style={{ color: "var(--color-text-secondary)" }}>
                    &ldquo;{r.review}&rdquo;
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0"
                      style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)", color: "var(--color-accent-subtle)" }}
                    >{r.initials}</div>
                    <div>
                      <p className="font-black text-sm" style={{ color: "var(--color-text-primary)" }}>{r.name}</p>
                      <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{r.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              {/* Prev */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{ borderColor: "var(--color-border-card)", color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => { if (page > 1) { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent-subtle)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-card)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className="w-9 h-9 rounded-full border text-sm font-bold transition-all duration-200"
                  style={page === p
                    ? { backgroundColor: "var(--color-accent)", color: "var(--color-arrow-stroke)", borderColor: "var(--color-accent)" }
                    : { backgroundColor: "transparent", color: "var(--color-text-muted)", borderColor: "var(--color-border-card)" }
                  }
                  onMouseEnter={(e) => { if (page !== p) { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent-subtle)"; } }}
                  onMouseLeave={(e) => { if (page !== p) { e.currentTarget.style.borderColor = "var(--color-border-card)"; e.currentTarget.style.color = "var(--color-text-muted)"; } }}
                >
                  {p}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 disabled:opacity-30"
                style={{ borderColor: "var(--color-border-card)", color: "var(--color-text-muted)" }}
                onMouseEnter={(e) => { if (page < totalPages) { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent-subtle)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-card)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}

          {/* Page info */}
          {totalPages > 1 && (
            <p className="text-center text-xs mt-4" style={{ color: "var(--color-text-muted)" }}>
              Page {page} of {totalPages} — {filtered.length} reviews total
            </p>
          )}


              {/* Leave a review button */}
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
          {/* Review form — below grid */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <div className="max-w-2xl mx-auto mt-12">
                  <div
                    className="rounded-2xl p-6 md:p-8 border relative overflow-hidden"
                    style={{ backgroundColor: "var(--color-bg-card-darker)", borderColor: "var(--color-border-card)" }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[1.5px]"
                      style={{ background: "linear-gradient(to right, transparent, var(--color-accent), transparent)" }}
                    />
                    <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full blur-[60px] pointer-events-none"
                      style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-muted) 20%, transparent)" }}
                    />
                    <h3 className="text-lg font-black mb-5 relative" style={{ color: "var(--color-text-primary)" }}>
                      Share your experience
                    </h3>
                    <ReviewForm onClose={() => setShowForm(false)} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
