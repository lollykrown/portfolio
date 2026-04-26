"use client";

import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    //   style={{
    //     backgroundColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
    //     border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
    //   }}
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
        text-(--color-accent-subtle) hover:text-(--color-accent) hover:scale-105"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)",
        border: "1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Moon icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
            style={{ color: "var(--color-accent-subtle)" }}>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {/* Sun icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" 
            className=""
            style={{ color: "var(--color-accent-subtle)" }}>
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}