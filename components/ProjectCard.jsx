'use client';
import Link from 'next/link';
import Image from 'next/image';

import { motion } from 'framer-motion';


export default function ProjectCard({ project, index, onClick, cardVar }) {
  return (
    <motion.div
      variants={cardVar}
      whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
      onClick={() => onClick(project)}
      className="group relative rounded-2xl overflow-hidden border cursor-pointer flex flex-col"
      style={{
        backgroundColor: index % 2 === 0 ? 'var(--color-bg-card-darker)' : 'var(--color-bg-card-dark)',
        borderColor: 'var(--color-border-card)',
      }}
    >
      {/* Top accent line on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to right, var(--color-accent), transparent)' }}
      />

      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill 
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            <span className="text-5xl font-black opacity-20 select-none" style={{ color: 'var(--color-accent-light)' }}>
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.35)' }}
        >   
          <span
            className="flex items-center gap-2 text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full backdrop-blur-sm border"
            style={{
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 6h4M6 4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            View details
          </span>
        </div>
        {project.live && (
          <Link href={project.live} target="_blank" rel="noopener noreferrer"
            className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-sm border border-white/20 bg-black/40 text-(--color-text-primary) hover:bg-(--color-accent)"
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-(--color-text-primary)" />
            Live
          </Link>
        )}
      </div>

      {/* Card body */}
      <div className="relative p-4 flex flex-col flex-1">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent 60%)' }}
        />
        <div className="relative flex items-start justify-between gap-4 mb-2">
          <h3 className="text-base font-black leading-snug" style={{ color: 'var(--color-text-primary)' }}>{project.title}</h3>
          <span className="shrink-0 text-[11px] font-bold mt-0.5" style={{ color: 'color-mix(in srgb, var(--color-accent) 50%, transparent)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <p className="text-xs leading-relaxed mb-4 flex-1 truncate" style={{ color: 'var(--color-text-secondary)' }}>{project.longDescription}</p>
        {project.tech && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-3 py-1 rounded-full border"
                style={{
                  color: 'color-mix(in srgb, var(--color-accent-subtle) 80%, #fff)',
                  borderColor: 'color-mix(in srgb, var(--color-accent) 25%, transparent)',
                  backgroundColor: 'color-mix(in srgb, var(--color-accent) 8%, transparent)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-xs font-semibold transition-colors duration-200" style={{ color: 'var(--color-text-muted)' }}>
            View details
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="transition-colors duration-200"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}