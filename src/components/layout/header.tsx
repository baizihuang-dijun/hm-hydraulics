'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/products', label: 'Products' },
  { href: '/quality', label: 'Quality' },
  { href: '/about', label: 'About' },
  { href: '/support', label: 'Support' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';
  const isHeroMode = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ease ${
        isHeroMode
          ? 'bg-transparent border-b border-transparent'
          : 'bg-[#FAFAF7]/95 backdrop-blur-sm border-b border-[rgba(44,74,115,0.10)]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center no-underline">
            <img
              src={isHeroMode ? '/images/hm-logo-white.png' : '/images/hm-logo.png'}
              alt="HM Hydraulics"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium no-underline transition-colors duration-150 ${
                    isHeroMode
                      ? isActive
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                      : isActive
                        ? 'text-[#2C4A73]'
                        : 'text-[#4A4E54] hover:text-[#2C4A73]'
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
            className={`hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded no-underline transition-colors duration-150 ${
              isHeroMode
                ? 'bg-[#A31919] text-white hover:bg-[#8A1515]'
                : 'bg-[#2C4A73] text-white hover:bg-[#1E3A5F]'
            }`}
          >
            Get in Touch
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={`md:hidden p-2 transition-colors ${
              isHeroMode
                ? 'text-white hover:text-white/80'
                : 'text-[#4A4E54] hover:text-[#2C4A73]'
            }`}
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
          <nav
            className={`md:hidden pb-6 pt-2 border-t ${
              isHeroMode
                ? 'border-white/10 bg-[#0F0F0F]/90'
                : 'border-[rgba(44,74,115,0.10)]'
            }`}
          >
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
                      isHeroMode
                        ? isActive
                          ? 'text-white bg-white/10'
                          : 'text-white/80 hover:text-white hover:bg-white/5'
                        : isActive
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
                className={`mt-3 mx-3 px-4 py-2.5 text-sm font-medium rounded text-center no-underline transition-colors duration-150 ${
                  isHeroMode
                    ? 'bg-[#A31919] text-white hover:bg-[#8A1515]'
                    : 'bg-[#2C4A73] text-white hover:bg-[#1E3A5F]'
                }`}
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
