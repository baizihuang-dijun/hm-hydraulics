import Link from 'next/link';
import { CookieSettingsButton } from '@/components/cookie-settings-button';

export function Footer() {
  return (
    <footer className="bg-[#1B1E20] text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/images/hm-logo-white.png"
                alt="HM Hydraulics"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-sm">
              Technical sourcing partner for core hydraulic components.
              Lower risk, reliable delivery, meaningful cost savings.
            </p>
            <p className="text-[#6B7280] text-xs mt-4 font-label">
              Qingdao Hydraulic Machinery Co., Ltd.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-[#9CA3AF] mb-4">
              Products
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/products/rotary-actuators"
                  className="text-sm text-[#D1D5DB] hover:text-white no-underline transition-colors duration-150"
                >
                  Rotary Actuators
                </Link>
              </li>
              <li>
                <Link
                  href="/products/tilt-actuators"
                  className="text-sm text-[#D1D5DB] hover:text-white no-underline transition-colors duration-150"
                >
                  Tilt Actuators
                </Link>
              </li>
              <li>
                <Link
                  href="/products/slew-drives"
                  className="text-sm text-[#D1D5DB] hover:text-white no-underline transition-colors duration-150"
                >
                  Slew Drives
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-label text-xs uppercase tracking-widest text-[#9CA3AF] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/quality"
                  className="text-sm text-[#D1D5DB] hover:text-white no-underline transition-colors duration-150"
                >
                  Quality & Technical Validation
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-[#D1D5DB] hover:text-white no-underline transition-colors duration-150"
                >
                  Technical & After-Sales Support
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#D1D5DB] hover:text-white no-underline transition-colors duration-150"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[#D1D5DB] hover:text-white no-underline transition-colors duration-150"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trademark disclaimer */}
        <div className="mt-12">
          <p className="text-[10px] md:text-[11px] text-[#6B7280] leading-relaxed max-w-4xl">
            Helac&reg;, HKS&reg;, Moveco&reg;, Sungji&reg; and other manufacturer names and model/part numbers are trademarks or property of their respective owners, used solely to identify compatible alternatives. HM Hydraulics is an independent manufacturer and is not affiliated with, sponsored by, or endorsed by these owners.
          </p>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.08)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-[#6B7280]">
            &copy; {new Date().getFullYear()} HM Hydraulics. All rights reserved.{' '}
            <CookieSettingsButton className="underline decoration-[#4B5563] underline-offset-2 transition-colors hover:text-white" />
          </p>
          <div className="flex items-center gap-6">
            <a
              href="mailto:hm@hmhydraulics.com"
              className="text-xs text-[#9CA3AF] hover:text-white no-underline transition-colors duration-150"
            >
              hm@hmhydraulics.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
