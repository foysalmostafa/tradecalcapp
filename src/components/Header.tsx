'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { CALCULATORS } from '@/lib/calculators';

const CALC_GROUPS = [
  {
    label: 'Position Sizing',
    calcs: CALCULATORS.filter(c => c.category === 'position'),
  },
  {
    label: 'Risk Management',
    calcs: CALCULATORS.filter(c => c.category === 'risk'),
  },
  {
    label: 'Profit & Analysis',
    calcs: CALCULATORS.filter(c => c.category === 'profit'),
  },
  {
    label: 'Futures Trading',
    calcs: CALCULATORS.filter(c => c.category === 'futures'),
  },
  {
    label: 'Prop Firm',
    calcs: CALCULATORS.filter(c => c.category === 'propfirm'),
  },
  {
    label: 'Utilities',
    calcs: CALCULATORS.filter(c => c.category === 'utility'),
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const nav = [
    { href: '/calculators/position-size-calculator', label: 'Position Size' },
    { href: '/calculators/pip-value-calculator', label: 'Pip Value' },
    { href: '/calculators/profit-loss-calculator', label: 'P&L' },
    { href: '/blog', label: 'Blog' },
  ];

  const isCalcsActive = pathname === '/calculators' || pathname?.startsWith('/calculators/');

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-bold text-lg text-gray-900 dark:text-white hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect width="32" height="32" rx="7" fill="#0F172A"/>
              <circle cx="16" cy="16" r="12" stroke="#F59E0B" strokeWidth="1.5" fill="none"/>
              <line x1="16" y1="9" x2="16" y2="23" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
              <polyline points="10,15 16,9 22,15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            TradeCalc
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">

            {/* All Calculators — with dropdown */}
            <div
              className="relative"
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
            >
              <Link
                href="/calculators"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isCalcsActive
                    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                All Calculators
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </Link>

              {/* Mega dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-[1020px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden"
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleClose}
                >
                  {/* Scrollable body — capped at 70vh so it never overflows the screen */}
                  <div className="p-4 grid grid-cols-6 gap-3 max-h-[70vh] overflow-y-auto">
                    {CALC_GROUPS.map(group => (
                      <div key={group.label}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 px-1">
                          {group.label}
                        </p>
                        <ul className="space-y-0.5">
                          {group.calcs.map(c => (
                            <li key={c.slug}>
                              <Link
                                href={`/calculators/${c.slug}`}
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                                {c.shortTitle}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Sticky footer — always visible */}
                  <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50">
                    <Link
                      href="/calculators"
                      onClick={() => setDropdownOpen(false)}
                      className="text-xs text-amber-600 dark:text-amber-400 font-medium hover:underline"
                    >
                      View all calculators →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Other nav items */}
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === href || pathname?.startsWith(href + '/')
                    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 max-h-[80vh] overflow-y-auto">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {/* All Calculators section on mobile */}
            <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              Calculators
            </p>
            {CALC_GROUPS.map(group => (
              <div key={group.label}>
                <p className="px-3 py-1 text-xs font-semibold text-gray-400 dark:text-gray-500">
                  {group.label}
                </p>
                {group.calcs.map(c => (
                  <Link
                    key={c.slug}
                    href={`/calculators/${c.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className={`px-5 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                      pathname === `/calculators/${c.slug}`
                        ? 'text-amber-600 dark:text-amber-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    {c.shortTitle}
                  </Link>
                ))}
              </div>
            ))}

            <div className="border-t border-gray-100 dark:border-gray-800 mt-2 pt-2">
              <Link
                href="/blog"
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors block ${
                  pathname === '/blog' || pathname?.startsWith('/blog/')
                    ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Blog
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
