"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const stars = [1, 2, 3, 4, 5];

export default function ReviewForm({ onClose, onSubmit }) {
  const [form, setForm]     = useState({ name: "", role: "", rating: 0, review: "" });
  const [hover, setHover]   = useState(0);
  const [sending, setSending] = useState(false);
  const [done, setDone]     = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.rating) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1100)); // replace with real API call
    setSending(false);
    setDone(true);
  };

  const inputStyle = {
    backgroundColor: "color-mix(in srgb, var(--color-accent) 4%, var(--color-bg-page))",
    border: "1px solid var(--color-border-card)",
    color: "var(--color-text-primary)",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  if (done) return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-10 gap-4"
    >
      <div className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)", border: "1px solid color-mix(in srgb, var(--color-accent) 40%, transparent)" }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 className="text-lg font-black" style={{ color: "var(--color-text-primary)" }}>Thank you!</h3>
      <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--color-text-muted)" }}>
        Your review has been submitted and will appear after moderation.
      </p>
      <button onClick={onClose} className="text-sm font-semibold mt-1" style={{ color: "var(--color-accent-subtle)" }}>
        Close ×
      </button>
    </motion.div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: "var(--color-accent-subtle)" }}>Name</label>
          <input required type="text" placeholder="Your name" value={form.name}
            onChange={(e) => set("name", e.target.value)} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "color-mix(in srgb, var(--color-accent) 50%, transparent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border-card)")}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: "var(--color-accent-subtle)" }}>Role / Company</label>
          <input type="text" placeholder="e.g. CEO at Acme" value={form.role}
            onChange={(e) => set("role", e.target.value)} style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "color-mix(in srgb, var(--color-accent) 50%, transparent)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--color-border-card)")}
          />
        </div>
      </div>

      {/* Star rating */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: "var(--color-accent-subtle)" }}>Rating</label>
        <div className="flex items-center gap-1">
          {stars.map((s) => (
            <button
              key={s} type="button"
              onMouseEnter={() => setHover(s)}
              onMouseLeave={() => setHover(0)}
              onClick={() => set("rating", s)}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={(hover || form.rating) >= s ? "var(--color-accent)" : "transparent"}
                  stroke={(hover || form.rating) >= s ? "var(--color-accent)" : "var(--color-border-hover)"}
                  strokeWidth="1.5"
                  style={{ transition: "fill 0.15s, stroke 0.15s" }}
                />
              </svg>
            </button>
          ))}
          {form.rating > 0 && (
            <span className="text-sm ml-2" style={{ color: "var(--color-text-muted)" }}>
              {["","Poor","Fair","Good","Great","Excellent"][form.rating]}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-black tracking-[0.18em] uppercase" style={{ color: "var(--color-accent-subtle)" }}>Your review</label>
        <textarea required rows={4} placeholder="Share your experience working together..."
          value={form.review} onChange={(e) => set("review", e.target.value)}
          style={{ ...inputStyle, resize: "none" }}
          onFocus={(e) => (e.target.style.borderColor = "color-mix(in srgb, var(--color-accent) 50%, transparent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--color-border-card)")}
        />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button type="submit" disabled={sending || !form.rating}
          className="flex-1 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-60"
          style={{ backgroundColor: "var(--color-accent)", color: "var(--color-arrow-stroke)" }}
          onMouseEnter={(e) => !sending && (e.currentTarget.style.backgroundColor = "var(--color-accent-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
        >
          {sending ? (
            <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25"/>
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
            </svg> Submitting…</>
          ) : "Submit review"}
        </button>
        <button type="button" onClick={onClose}
          className="px-4 py-3 rounded-xl text-sm font-semibold border transition-all duration-200"
          style={{ color: "var(--color-text-muted)", borderColor: "var(--color-border-card)" }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; e.currentTarget.style.borderColor = "var(--color-border-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-muted)"; e.currentTarget.style.borderColor = "var(--color-border-card)"; }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
