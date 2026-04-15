'use client';

import { setConsent } from "@/lib/consent";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner({ onAccept, onReject }) {

  const accept = () => {
    setConsent("accepted");
    // setVisible(false);
    onAccept?.();
  };

  const decline = () => {
    setConsent("declined");
    // setVisible(false);
    onReject?.();
  };

  return (
    <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 md:right-20 z-50 w-full max-w-lg px-4"
          style={{ transform: "translateX(-50%)" }}
        >
          <div
            className="relative rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 overflow-hidden
            bg-(--color-bg-card-darker) border-(--color-grad-to) backdropFilter-blur[12px] shadow-[0 8px 40px rgba(0,0,0,0.25)]" >
            {/* Accent top line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2.5px]"
              style={{ background: "linear-gradient(to right, transparent, var(--color-accent), transparent)" }}
            />

            {/* Cookie icon */}
            <div
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-accent) 12%, transparent)" }}
            >
              🍪
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold mb-0.5" style={{ color: "var(--color-text-primary)" }}>
                We use cookies
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                To improve your experience on this site.{" "}
                <Link
                  href="/privacy"
                  className="underline transition-colors"
                  style={{ color: "var(--color-accent-subtle)", textDecorationColor: "var(--color-accent-subtle)" }}
                >
                  Privacy policy
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={decline}
                className="btn-border px-4 py-2 text-xs font-semibold"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200
                bg-(--color-accent) text-(--color-arrow-stroke) hover:bg-(--color-accent-hover)" >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
}