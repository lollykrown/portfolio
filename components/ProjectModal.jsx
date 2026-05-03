"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    // Prevent body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
        style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full md:max-w-3xl max-h-[92vh] md:max-h-[88vh] flex flex-col overflow-hidden"
          style={{
            backgroundColor: "var(--color-bg-card-darker)",
            border: "1px solid var(--color-border-card)",
            borderRadius: "20px 20px 0 0",
          }}
          // Mobile: rounded top only; desktop: fully rounded
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle — mobile only */}
          <div className="flex justify-center pt-3 pb-1 md:hidden">
            <div
              className="w-10 h-1 rounded-full"
              style={{ backgroundColor: "var(--color-border-hover)" }}
            />
          </div>

          {/* Accent top shimmer */}
          <div
            className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-[20px]"
            style={{ background: "linear-gradient(to right, transparent, var(--color-accent), transparent)" }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200"
            style={{
              backgroundColor: "color-mix(in srgb, var(--color-bg-page) 80%, transparent)",
              borderColor: "var(--color-border-card)",
              color: "var(--color-text-muted)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; e.currentTarget.style.color = "var(--color-accent-subtle)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--color-border-card)"; e.currentTarget.style.color = "var(--color-text-muted)"; }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1">

            {/* Thumbnail */}
            <div
              className="relative w-full overflow-hidden"
              style={{ height: "240px", flexShrink: 0 }}
            >
              {project.thumbnail ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg,
                      color-mix(in srgb, var(--color-accent-muted) 60%, transparent),
                      color-mix(in srgb, var(--color-accent-hover) 20%, transparent))`,
                  }}
                >
                  <span
                    className="text-7xl font-black opacity-15 select-none"
                    style={{ color: "var(--color-accent-light)" }}
                  >
                    {project.title.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
              {/* Bottom fade into card */}
              <div
                className="absolute bottom-0 left-0 right-0 h-20"
                style={{ background: `linear-gradient(to top, var(--color-bg-card-darker), transparent)` }}
              />
            </div>

            {/* Body */}
            <div className="px-6 md:px-8 pb-8 -mt-4 relative">

              {/* Title + index */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <h2
                  className="text-2xl md:text-3xl font-black leading-tight"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {project.title}
                </h2>
                <span
                  className="text-xs font-black tracking-[0.15em] shrink-0 mt-1.5"
                  style={{ color: "color-mix(in srgb, var(--color-accent) 45%, transparent)" }}
                >
                  PROJECT
                </span>
              </div>

              {/* Description */}
              {/* <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {project.description}
              </p> */}

              {/* Long description — if available */}
              {project.longDescription && (
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {project.longDescription}
                </p>
              )}

              {/* Divider */}
              <div className="h-px mb-6" style={{ backgroundColor: "var(--color-border)" }} />

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {project.year && (
                  <div>
                    <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-1" style={{ color: "var(--color-accent-subtle)" }}>Year</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{project.year}</p>
                  </div>
                )}
                {project.role && (
                  <div>
                    <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-1" style={{ color: "var(--color-accent-subtle)" }}>Role</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{project.role}</p>
                  </div>
                )}
                {project.client && (
                  <div>
                    <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-1" style={{ color: "var(--color-accent-subtle)" }}>Client</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{project.client}</p>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-1" style={{ color: "var(--color-accent-subtle)" }}>Duration</p>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{project.duration}</p>
                  </div>
                )}
              </div>

              {/* Features / highlights */}
              {project.features && project.features.length > 0 && (
                <div className="mb-6">
                  <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-3" style={{ color: "var(--color-accent-subtle)" }}>Key features</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {project.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                          <path d="M2 7l4 4 6-6" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech stack */}
              {project.tech && project.tech.length > 0 && (
                <div className="mb-8">
                  <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-3" style={{ color: "var(--color-accent-subtle)" }}>Tech stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-medium px-3 py-1.5 rounded-full border"
                        style={{
                          color: "color-mix(in srgb, var(--color-accent-subtle) 80%, #fff)",
                          borderColor: "color-mix(in srgb, var(--color-accent) 25%, transparent)",
                          backgroundColor: "color-mix(in srgb, var(--color-accent) 8%, transparent)",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                {project.live && (
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black transition-colors duration-200"
                    style={{ backgroundColor: "var(--color-accent)", color: "var(--color-arrow-stroke)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-accent-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-accent)")}
                  >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" />
                    Live site
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                )}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200"
                    style={{
                      color: "var(--color-text-secondary)",
                      borderColor: "var(--color-border-card)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-text-primary)"; e.currentTarget.style.borderColor = "var(--color-border-hover)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--color-text-secondary)"; e.currentTarget.style.borderColor = "var(--color-border-card)"; }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    GitHub
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}


        // {project.live && (
        //   <Link href={project.live} target="_blank" rel="noopener noreferrer"
        //     className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-sm border border-white/20 bg-black/40 text-white"
        //   >
        //     <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
        //     Live
        //   </Link>
        // )}