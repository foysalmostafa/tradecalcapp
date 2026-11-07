import Link from 'next/link';
import { CALCULATORS } from '@/lib/calculators';
import { SITE } from '@/lib/seo';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display font-bold text-gray-900 dark:text-white mb-3">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="32" height="32" rx="7" fill="#0F172A"/>
                <circle cx="16" cy="16" r="12" stroke="#F59E0B" strokeWidth="1.5" fill="none"/>
                <line x1="16" y1="9" x2="16" y2="23" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="10,15 16,9 22,15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              {SITE.name}
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Free professional trading calculators for forex, stocks, and crypto. No sign-up required.
            </p>
          </div>

          {/* Risk Tools */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">Risk Management</p>
            <ul className="space-y-2">
              {CALCULATORS.filter(c => c.category === 'risk' || c.category === 'position').slice(0, 5).map(c => (
                <li key={c.slug}>
                  <Link
                    href={`/calculators/${c.slug}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  >
                    {c.shortTitle} Calculator
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Profit Tools */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">Profit & Analysis</p>
            <ul className="space-y-2">
              {CALCULATORS.filter(c => c.category === 'profit' || c.category === 'utility').slice(0, 5).map(c => (
                <li key={c.slug}>
                  <Link
                    href={`/calculators/${c.slug}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  >
                    {c.shortTitle} Calculator
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Futures Tools */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">Futures Trading</p>
            <ul className="space-y-2">
              {CALCULATORS.filter(c => c.category === 'futures').slice(0, 5).map(c => (
                <li key={c.slug}>
                  <Link
                    href={`/calculators/${c.slug}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  >
                    {c.shortTitle} Calculator
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Prop Firm Tools */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">Prop Firm Tools</p>
            <ul className="space-y-2">
              {CALCULATORS.filter(c => c.category === 'propfirm').slice(0, 5).map(c => (
                <li key={c.slug}>
                  <Link
                    href={`/calculators/${c.slug}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
                  >
                    {c.shortTitle} Calculator
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">Company</p>
            <ul className="space-y-2">
              <li>
                <Link href="/calculators" className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  All Calculators
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {year} {SITE.name} · For educational purposes only · Not financial advice.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Privacy</Link>
            <Link href="/contact" className="text-xs text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">Contact</Link>
            <Link href="/about" className="text-xs text-gray-500 dark:text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
