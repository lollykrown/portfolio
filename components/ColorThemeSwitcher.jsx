"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const colorThemes = {
  amber: {
    label: "Amber",
    swatch: "#f59e0b",
    vars: {
      "--color-accent":        "#f59e0b",
      "--color-accent-light":  "#fcd34d",
      "--color-accent-hover":  "#d97706",
      "--color-accent-muted":  "#92400e",
      "--color-accent-subtle": "#fbbf24",
      "--color-grad-from":     "#f59e0b",
      "--color-grad-via":      "#fbbf24",
      "--color-grad-to":       "#fcd34d",
      "--color-grad-alt-to":   "#fb923c",
      "--color-arrow-stroke":  "#1c1917",
      "--color-scroll-stroke": "#fbbf24",
    },
  },
  emerald: {
    label: "Emerald",
    swatch: "#10b981",
    vars: {
      "--color-accent":        "#10b981",
      "--color-accent-light":  "#6ee7b7",
      "--color-accent-hover":  "#059669",
      "--color-accent-muted":  "#064e3b",
      "--color-accent-subtle": "#34d399",
      "--color-grad-from":     "#10b981",
      "--color-grad-via":      "#34d399",
      "--color-grad-to":       "#6ee7b7",
      "--color-grad-alt-to":   "#14b8a6",
      "--color-arrow-stroke":  "#022c22",
      "--color-scroll-stroke": "#34d399",
    },
  },
  rose: {
    label: "Rose",
    swatch: "#f43f5e",
    vars: {
      "--color-accent":        "#f43f5e",
      "--color-accent-light":  "#fda4af",
      "--color-accent-hover":  "#e11d48",
      "--color-accent-muted":  "#881337",
      "--color-accent-subtle": "#fb7185",
      "--color-grad-from":     "#f43f5e",
      "--color-grad-via":      "#fb7185",
      "--color-grad-to":       "#fda4af",
      "--color-grad-alt-to":   "#fb923c",
      "--color-arrow-stroke":  "#fff1f2",
      "--color-scroll-stroke": "#fb7185",
    },
  },
  blue: {
    label: "Blue",
    swatch: "#3b82f6",
    vars: {
      "--color-accent":        "#3b82f6",
      "--color-accent-light":  "#93c5fd",
      "--color-accent-hover":  "#2563eb",
      "--color-accent-muted":  "#1e3a8a",
      "--color-accent-subtle": "#60a5fa",
      "--color-grad-from":     "#3b82f6",
      "--color-grad-via":      "#60a5fa",
      "--color-grad-to":       "#93c5fd",
      "--color-grad-alt-to":   "#22d3ee",
      "--color-arrow-stroke":  "#eff6ff",
      "--color-scroll-stroke": "#60a5fa",
    },
  },
  violet: {
    label: "Violet",
    swatch: "#8b5cf6",
    vars: {
      "--color-accent":        "#8b5cf6",
      "--color-accent-light":  "#c4b5fd",
      "--color-accent-hover":  "#7c3aed",
      "--color-accent-muted":  "#4c1d95",
      "--color-accent-subtle": "#a78bfa",
      "--color-grad-from":     "#8b5cf6",
      "--color-grad-via":      "#a78bfa",
      "--color-grad-to":       "#c4b5fd",
      "--color-grad-alt-to":   "#818cf8",
      "--color-arrow-stroke":  "#f5f3ff",
      "--color-scroll-stroke": "#a78bfa",
    },
  },
  lime: {
    label: "Lime",
    swatch: "#84cc16",
    vars: {
      "--color-accent":        "#84cc16",
      "--color-accent-light":  "#d9f99d",
      "--color-accent-hover":  "#65a30d",
      "--color-accent-muted":  "#1a2e05",
      "--color-accent-subtle": "#a3e635",
      "--color-grad-from":     "#84cc16",
      "--color-grad-via":      "#a3e635",
      "--color-grad-to":       "#d9f99d",
      "--color-grad-alt-to":   "#4ade80",
      "--color-arrow-stroke":  "#1a2e05",
      "--color-scroll-stroke": "#a3e635",
    },
  },
  sky: {
    label: "Sky",
    swatch: "#0ea5e9",
    vars: {
      "--color-accent":        "#0ea5e9",
      "--color-accent-light":  "#bae6fd",
      "--color-accent-hover":  "#0284c7",
      "--color-accent-muted":  "#0c4a6e",
      "--color-accent-subtle": "#38bdf8",
      "--color-grad-from":     "#0ea5e9",
      "--color-grad-via":      "#38bdf8",
      "--color-grad-to":       "#bae6fd",
      "--color-grad-alt-to":   "#a5f3fc",
      "--color-arrow-stroke":  "#f0f9ff",
      "--color-scroll-stroke": "#38bdf8",
    },
  },
};

function applyColorTheme(key) {
  const theme = colorThemes[key];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  localStorage.setItem("color-theme", key);
}

export function useColorTheme() {
  useEffect(() => {
    const saved = localStorage.getItem("color-theme") || "amber";
    applyColorTheme(saved);
  }, []);
}

export default function ColorThemeSwitcher() {
  const [open, setOpen]     = useState(false);
  const [active, setActive] = useState("amber");
  const ref = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("color-theme") || "amber";
    setActive(saved);
    applyColorTheme(saved);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const select = (key) => {
    setActive(key);
    applyColorTheme(key);
    setOpen(false);
  };

  const current = colorThemes[active];

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change color theme"
        className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200"
        style={{
          borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)",
          backgroundColor: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
        }}
      >
        {/* Swatch dot */}
        <span
          className="w-4 h-4 rounded-full border-2 border-white/20"
          style={{ backgroundColor: current.swatch }}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 rounded-2xl border p-3 z-50 shadow-xl"
            style={{
              backgroundColor: "var(--color-bg-mobile-menu)",
              borderColor: "var(--color-border-card)",
              minWidth: "180px",
            }}
          >
            {/* Shimmer top line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-2xl"
              style={{ background: "linear-gradient(to right, transparent, var(--color-accent), transparent)" }}
            />

            <p
              className="text-[10px] font-black tracking-[0.2em] uppercase mb-3 px-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              Colour theme
            </p>

            <div className="flex flex-col gap-1">
              {Object.entries(colorThemes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => select(key)}
                  className="flex items-center gap-3 px-2 py-2 rounded-xl transition-all duration-150 w-full text-left"
                  style={{
                    backgroundColor: active === key
                      ? "color-mix(in srgb, var(--color-accent) 10%, transparent)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (active !== key) e.currentTarget.style.backgroundColor = "color-mix(in srgb, var(--color-text-primary) 5%, transparent)";
                  }}
                  onMouseLeave={(e) => {
                    if (active !== key) e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {/* Swatch */}
                  <span
                    className="w-5 h-5 rounded-full shrink-0 border-2"
                    style={{
                      backgroundColor: theme.swatch,
                      borderColor: active === key ? "var(--color-text-primary)" : "transparent",
                    }}
                  />
                  <span
                    className="text-sm font-medium flex-1"
                    style={{ color: active === key ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
                  >
                    {theme.label}
                  </span>
                  {/* Active tick */}
                  {active === key && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-6" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {/* Default badge */}
                  {key === "amber" && active !== "amber" && (
                    <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--color-text-muted) 15%, transparent)",
                        color: "var(--color-text-muted)",
                      }}
                    >default</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
