'use client';
import { useState } from 'react';
import Link from 'next/link';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';
import { usePathname } from 'next/navigation';

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
    <nav className="fixed bg-bg/80 backdrop-blur w-full px-6 md:px-10 py-3 flex items-center gap-4 justify-between z-50">
      {/* Logo */}
      <Link href="/" className="flex flex-col leading-none select-none">
        {/* <span className="text-2xl font-black text-white tracking-tight">
          Code<span className="var(--color-subtle)">&gt;</span>
        </span> */}
        <span className="text-[11px] text-gray-400 tracking-[0.2em] uppercase font-medium -mt-0.5 ml-0.5">
          Crafted
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 ml-auto">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`text-sm font-medium hover:text-white hover:border-b
               hover:border-amber-400 transition-border duration-200 
               ${pathname === link.href ? 'text-(--color-accent)' : 'text-gray-300'}`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="bg-linear-to-r from-orange-400 to-amber-300 hover:bg-orange-800 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
        >
          Contact
        </Link>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden text-white text-2xl ml-auto"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#111118] border-t border-white/10 flex flex-col items-start gap-4 px-6 py-6 md:hidden shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-base font-medium hover:text-white hover:border-b
                 hover:border-amber-400 transition-border duration-200 ${pathname === link.href ? 'text-(--color-accent)' : 'text-gray-300'}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200 mt-2"
          >
            Contact
          </Link>
        </div>
      )}
      <ThemeToggle className="cursor-pointer" />
    </nav>
  );
}
