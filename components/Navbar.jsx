'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Icon from './Icon';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Services', href: '/services' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
  

  return (
    <nav className="fixed bg-bg/80 backdrop-blur w-full px-6 md:px-10 py:3 md:py-5  flex items-center gap-4 justify-between z-50">
      {/* Logo */}
      <Link
        href="/"
        className="flex select-none justify-items-center items-center gap-2 group"
      >
        <Icon className="h-10 w-10 text-(--color-text-primary) group-hover:scale-105 group-hover:text-(--color-accent) group-hover:drop-shadow-[0_0_12px_var(--color-accent)]" />
        <span className="text-lg text-(--color-text-primary) group-hover:text-(--color-accent) uppercase font-medium group-hover:drop-shadow-[0_0_12px_var(--color-accent)]">
          Lollykrown
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 ml-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
          <Link
            key={link.label}
            href={link.href}
            className={`text-sm font-medium hover:text-(--color-text-primary) hover:border-b
               hover:border-amber-400 transition-border duration-200  ${isActive ? 'text-(--color-accent)' : 'text-(--color-text-secondary)'}`}
          >
            {link.label}
          </Link>
        )})}
        <ThemeToggle />
        <Link href="/contact" className="btn-accent">
          Contact
        </Link>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center gap-3">
        <ThemeToggle />
        <button
          className="text-2xl text-(--color-text-primary) transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-(--color-bg-mobile-menu) border-t border-(--color-border) flex flex-col items-start gap-4 px-6 py-6 md:hidden shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-medium hover:border-b hover:text-(--color-text-primary)
                 hover:border-amber-400 transition-border duration-200 ${pathname === link.href ? 'text-(--color-accent)' : 'text-(--color-text-secondary)'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-accent"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
