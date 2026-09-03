'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/quality', label: 'Quality' },
  { href: '/support', label: 'Support' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAFAF7]/95 backdrop-blur-sm border-b border-[rgba(44,74,115,0.10)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-8 h-8 bg-[#2C4A73] rounded flex items-center justify-center">
              <span className="text-white font-heading font-semibold text-sm tracking-tight">
                HM
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-semibold text-[#1B1E20] text-base tracking-tight">
                HM Hydraulics
              </span>
            </div>
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
                  className={`nav-link text-sm font-medium no-underline transition-colors duration-150 ${
                    isActive
                      ? 'text-[#2C4A73] active'
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
            className="hidden md:inline-flex items-center px-4 py-2 bg-[#2C4A73] text-white text-sm font-medium rounded no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
          >
            Get in Touch
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-[#4A4E54] hover:text-[#2C4A73] transition-colors"
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
                className="mt-3 mx-3 px-4 py-2.5 bg-[#2C4A73] text-white text-sm font-medium rounded text-center no-underline hover:bg-[#1E3A5F] transition-colors duration-150"
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
