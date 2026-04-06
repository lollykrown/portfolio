"use client";
import Link from 'next/link';
import { FaCss3Alt } from 'react-icons/fa';
import { DiReact } from 'react-icons/di';
import { motion } from "framer-motion";

//purple and fuschia
//emerald and teal
//rose and coral or pink
//amber and orange
//cyan and sky
//lime and green


export default function Hero() {
  return (
    <section className="relative min-h-[90vh] mt-14 flex flex-col items-center justify-center px-6 overflow-hidden bg-[#0c0c14] shadow-[inset_0_0_1000px_1000px_rgba(0,0,0,0.747)]">

      {/* Ambient amber glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 rounded-full bg-amber-700/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-125h-50 bg-amber-900/30 blur-[80px]" />
      </div>  

      {/* Floating icons */}
      <div className="absolute left-[8%] top-[38%] text-blue-400 opacity-60 text-4xl select-none pointer-events-none hidden md:block">
        <FaCss3Alt />
      </div>
      <div className="absolute right-[8%] top-[36%] text-cyan-400 opacity-60 text-4xl select-none pointer-events-none hidden md:block">
        <DiReact className="animate-spin" style={{ animationDuration: '10s' }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white tracking-tight mb-6">
          {/* building building fast, scalable web apps with Next.js.
          I specialize in authentication systems, responsive UI, and performance optimization. */}
          Building building fast,{' '}<br/>
          <span className="bg-linear-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
            scalable web apps {''}
          </span>
          for your {' '}
          <span className="bg-linear-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
            business
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-xs md:text-base max-w-xl mx-auto leading-relaxed mb-10">
          Hi, I&apos;m Kay, a Frontend Developer building fast, scalable web apps with Next.js<br/>

          I specialize in authentication systems, API integration, and clean  and responsive UI.

          <br />
          Let&apos;s get started by clicking on the button below.
        </motion.p>

        <Link
          href="/contact"
          className="inline-flex items-center mr-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 backdrop-blur-sm group"
        >
          View my Work
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3 rounded-full transition-all duration-200 backdrop-blur-sm group"
        >
          Hire Me
          <span className="w-7 h-7 rounded-full bg-amber-600 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M7 3l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Project Cards */}
      <div className="relative z-10 mt-16 w-full max-w-5xl mx-auto grid grid-cols-3 gap-4 px-4">
        {/* Card 1 */}
        <div className="rounded-xl overflow-hidden border border-white/10 bg-linear-to-br from-amber-900/60 to-blue-900/40 aspect-video flex items-center justify-center shadow-2xl hover:scale-[1.02] transition-transform duration-300">
          <div className="w-full h-full bg-linear-to-br from-amber-600/30 to-pink-600/20 flex items-center justify-center p-4">
            <div className="text-center">
              <p className="text-amber-300 text-[10px] uppercase tracking-widest font-bold mb-1">SEO</p>
              <p className="text-white text-sm font-black uppercase leading-tight">Optimisation</p>
              <p className="text-white text-sm font-black uppercase leading-tight">Maximise</p>
              <p className="text-amber-300 text-sm font-black uppercase leading-tight">Your Online</p>
              <p className="text-white text-sm font-black uppercase leading-tight">Visibility</p>
            </div>
          </div>
        </div>

        {/* Card 2 — center, slightly raised */}
        <div className="-mt-4 rounded-xl overflow-hidden border border-white/10 bg-[#111] aspect-video flex items-center justify-center shadow-2xl hover:scale-[1.02] transition-transform duration-300 z-10">
          <div className="text-center px-4">
            <p className="text-gray-500 text-[9px] tracking-[0.3em] uppercase mb-2">THE WEB IS THE</p>
            <p className="text-white text-2xl font-black tracking-widest uppercase">FUTURE</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0e0e1a] aspect-video flex items-center justify-center shadow-2xl hover:scale-[1.02] transition-transform duration-300">
          <div className="px-4 text-center">
            <p className="text-white text-sm font-bold leading-snug mb-1">Smarter Workflows with</p>
            <p className="text-amber-400 text-sm font-bold">Ai-Powered Strategies</p>
          </div>
        </div>
      </div>
  {/* .arrow{
      margin:0 auto 1.75rem auto;
      padding: 1rem;
  }
  .arrow:hover {
    background-color:rgba(255, 255, 255, 0.3);
    border-radius: 3rem;   
    cursor:grab;   
} */}
      {/* Scroll indicator — sits between cards and bottom */}
      <Link href='/#projects' className="relative p-4 hover:scale-110 transition z-10 mt-8 flex flex-col items-center gap-0">
        <div className="w-px h-8 bg-linear-to-b from-transparent to-amber-500/60" />
        <div className="w-10 h-10 rounded-full border border-amber-500/50 bg-amber-600/20 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M3 8l4 4 4-4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </Link>
    </section>
  );
}
