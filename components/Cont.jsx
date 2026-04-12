export function Glow({ style }) {
  return <div className="absolute rounded-full blur-[130px] pointer-events-none" style={style} />;
}

export function DotGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.035]"
      style={{
        backgroundImage: `radial-gradient(circle, var(--color-dot-grid) 1px, transparent 1px)`,
        backgroundSize: "32px 32px",
        opacity: "var(--color-dot-opacity)",
      }}
    />
  );
}
export function Lightbox({ photo, onClose, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full border border-stone-600 hover:border-white hover:text-white flex items-center justify-center transition-colors z-10 text-stone-600" >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-stone-600 hover:border-white hover:text-white rounded-full flex items-center justify-center transition-all z-10  text-stone-600">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-stone-600 hover:border-white hover:text-white flex items-center justify-center transition-all z-10 text-stone-600"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl w-full max-h-[80vh] flex flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "70vh" }}>
          <div className="w-full h-full rounded-xl flex items-center justify-center bg-[#111]">
            <Image src={photo.src} fill className="object-contain" alt={photo.alt} sizes="100vw"/> 
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/70 text-sm">{photo.alt}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="text-white/40 text-sm">{photo.location}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}