'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


export const Projects = ({projects, stagger, cardVar,activeTag}) => {

  return (
    <motion.div
            key={activeTag}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={stagger}
            initial="hidden"
            animate="show"
            // viewport={{ once: true, margin: "-80px" }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                variants={cardVar}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2, ease: 'easeOut' },
                }}
                className={`group/parent relative rounded-2xl overflow-hidden border border-(--color-border-hover) cursor-pointer flex flex-col
                ${i % 2 === 0 } ? "bg-(--color-bg-card-darker)" : "bg-(--color-bg-card-dark)"`}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 z-10 opacity-0 group-hover/parent:opacity-100 transition-opacity duration-300
                  bg-[linear-gradient(to_right,var(--color-accent),transparent)]" />
                  {/* Thumbnail */}
                <div className="relative w-full aspect-video overflow-hidden">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover/parent:scale-105"
                    />
                  ) : (
                    // Fallback placeholder when no thumbnail provided
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg,
                          color-mix(in srgb, var(--color-accent-muted) 60%, transparent),
                          color-mix(in srgb, var(--color-accent-hover) 20%, transparent))`,
                      }}
                    >
                      <span
                        className="text-5xl font-black opacity-20 select-none tracking-tighter text-(--color-accent)"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover/parent:opacity-100 transition-opacity duration-400 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-bg-page)_80%,transparent)_0%,transparent_60%)]"
                  />
                  {/* Live / case study badge */}
                  {project.live && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="group/child absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-sm border border-white/20 bg-black/40 text-(--color-text-primary) opacity-0 group-hover/parent:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 hover:bg-(--color-accent)"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse bg-(--color-accent) group-hover/child:bg-(--color-text-primary)"
                        // style={{ backgroundColor: 'var(--color-accent)' }}
                      />
                      Live site
                    </Link>
                  )}
                </div>

                <div className="relative p-4 flex flex-col flex-1">
                  <div
                    className="absolute inset-0 opacity-0 group-hover/parent:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at top left, color-mix(in srgb, var(--color-accent) 6%, transparent), transparent 60%)',
                    }}
                  />
                  <div className="relative flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-base font-black text-(--color-text-primary) leading-snug">
                      {project.title}
                    </h3>
                    <span
                      className="shrink-0 text-[11px] font-bold mt-0.5"
                      style={{
                        color:
                          'color-mix(in srgb, var(--color-accent) 50%, transparent)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-(--color-text-secondary) text-xs leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  {project.tech && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((tag, t) => (
                        <span
                          key={t}
                          className="text-[11px] font-medium px-3 py-1 rounded-full border"
                          style={{
                            color:
                              'color-mix(in srgb, var(--color-accent-subtle) 80%, #fff)',
                            borderColor:
                              'color-mix(in srgb, var(--color-accent) 25%, transparent)',
                            backgroundColor:
                              'color-mix(in srgb, var(--color-accent) 8%, transparent)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-gray-500  transition-colors duration-200">
                      View project
                      <svg
                        className="w-3.5 h-3.5 -translate-x-1 group-hover/parent:translate-x-0 transition-transform duration-200 group-hover/parent:text-(--color-text-primary)"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-600 group-hover/parent:text-(--color-text-primary) transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>  
          )
}
