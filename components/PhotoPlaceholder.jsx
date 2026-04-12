export default function PhotoPlaceholder({ photo, index }) {
  const colors = [
    ["#1a1a2e","#16213e"], ["#0d1b2a","#1b2838"],
    ["#1a0a00","#2d1a0a"], ["#0a1a0a","#0d2b0d"],
    ["#1a0a1a","#2b0d2b"], ["#0a0a1a","#0d0d2b"],
  ];
  const [bg1, bg2] = colors[index % colors.length];
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{ background: `linear-gradient(135deg, ${bg1}, ${bg2})` }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.3 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="1.5"/>
        <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
        <path d="M21 15l-5-5L5 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <span className="text-white/20 text-xs font-medium text-center px-4 leading-snug">{photo.alt}</span>
    </div>
  );
}