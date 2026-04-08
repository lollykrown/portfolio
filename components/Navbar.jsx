'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
import Icon from './Icon';

const navLinks = [
  { label: 'Home',         href: '/' },
  { label: 'About',        href: '/about' },
  { label: 'Projects',     href: '/projects' },
  { label: 'Services',     href: '/services' },
  { label: 'Photography',  href: '/photography', isPhoto: true },
];

// Tiny aperture SVG — rotates on hover, blades open/close feel
function ApertureIcon({ active }) {
  return (
    <svg
      width="13" height="13" viewBox="0 0 13 13" fill="none"
      className="transition-transform duration-500 group-hover:rotate-90"
      style={{ color: active ? 'var(--color-accent)' : 'currentColor' }}
    >
      <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="6.5" cy="6.5" r="2"   fill="currentColor" opacity="0.6" />
      {/* aperture blades */}
      <line x1="6.5" y1="1"   x2="6.5" y2="4"   stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="6.5" y1="9"   x2="6.5" y2="12"  stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="1"   y1="6.5" x2="4"   y2="6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <line x1="9"   y1="6.5" x2="12"  y2="6.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname  = usePathname();
  const menuRef   = useRef(null);
  const toggleRef = useRef(null);

  // ── Close on outside click ──────────────────────────────────────
  useEffect(() => {
    if (!menuOpen) return;

    function handleClick(e) {
      if (
        menuRef.current   && !menuRef.current.contains(e.target) &&
        toggleRef.current && !toggleRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  return (
    <nav className="fixed bg-bg/80 backdrop-blur w-full px-6 md:px-10 py-5 flex items-center gap-4 justify-between z-50">

      {/* Logo */}
      <Link href="/" className="flex select-none justify-items-center items-center gap-2 group">
        <Icon className="h-10 w-10 text-(--color-text-primary) group-hover:scale-105 group-hover:text-(--color-accent) group-hover:drop-shadow-[0_0_12px_var(--color-accent)]" />
        <span className="text-lg text-(--color-text-primary) group-hover:text-(--color-accent) uppercase font-medium group-hover:drop-shadow-[0_0_12px_var(--color-accent)]">
          Lollykrown
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8 ml-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          if (link.isPhoto) {
            return (
              <Link
                key={link.label}
                href={link.href}
                className="group relative flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--color-text-primary)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
              >
                <ApertureIcon active={isActive} />
                <span className="italic tracking-wide">{link.label}</span>
                {/* subtle animated underline */}
                <span
                  className="absolute -bottom-0.5 left-5 h-px transition-all duration-300 w-0 group-hover:w-[calc(100%-20px)]"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                />
              </Link>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium hover:text-(--color-text-primary) hover:border-b hover:border-amber-400 transition-border duration-200 ${isActive ? 'text-(--color-accent)' : 'text-(--color-text-secondary)'}`}
            >
              {link.label}
            </Link>
          );
        })}
        <ThemeToggle />
        <Link href="/contact" className="btn-accent">Contact</Link>
      </div>

      {/* Mobile toggle */}
      <div className="md:hidden flex items-center gap-3" ref={toggleRef}>
        <ThemeToggle />
        <button
          className="text-2xl text-(--color-text-primary) transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute backdrop-blur top-full left-0 right-0 bg-(--color-bg-mobile-menu) border-t border-(--color-border) flex flex-col items-start gap-4 px-6 py-6 md:hidden shadow-xl"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.isPhoto) {
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center gap-2 text-base font-medium transition-colors duration-200"
                  style={{ color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
                >
                  <ApertureIcon active={isActive} />
                  <span className="italic tracking-wide">{link.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium hover:border-b hover:text-(--color-text-primary) hover:border-amber-400 transition-border duration-200 ${isActive ? 'text-(--color-accent)' : 'text-(--color-text-secondary)'}`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn-accent">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}