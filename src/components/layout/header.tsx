'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' },
  { label: 'Quality', href: '/quality' },
  { label: 'About', href: '/about' },
  { label: 'Support', href: '/support' },
  { label: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#FAFAF7]/95 backdrop-blur-md shadow-[0_1px_3px_rgba(15,15,15,0.06)]'
          : 'bg-[#FAFAF7]'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/hm-hydraulics/images/hm-logo.png"
              alt="HM Hydraulics"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded no-underline transition-colors duration-150 ${
                    isActive
                      ? 'text-[#2C4A73] bg-[rgba(44,74,115,0.06)]'
                      : 'text-[#4A4E54] hover:text-[#2C4A73] hover:bg-[rgba(44,74,115,0.04)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded no-underline transition-colors duration-150 bg-[#2C4A73] text-white hover:bg-[#1E3A5F]"
          >
            Get in Touch
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 transition-colors text-[#4A4E54] hover:text-[#2C4A73]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-6 pt-2 border-t border-[rgba(44,74,115,0.10)]">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2.5 text-sm font-medium rounded no-underline transition-colors duration-150 ${
                      isActive
                        ? 'text-[#2C4A73] bg-[rgba(44,74,115,0.05)]'
                        : 'text-[#4A4E54] hover:text-[#2C4A73] hover:bg-[rgba(44,74,115,0.03)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 mx-3 px-4 py-2.5 text-sm font-medium rounded text-center no-underline transition-colors duration-150 bg-[#2C4A73] text-white hover:bg-[#1E3A5F]"
              >
                Get in Touch
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
