import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { TrendingUp, BookOpen, Code2, ShieldCheck } from 'lucide-react';
import { SITE, AUTHOR } from '@/lib/seo';

export const metadata: Metadata = {
  title: `About ${AUTHOR.name} | ${SITE.name}`,
  description: `${AUTHOR.name} is a forex trader and software developer who built TradeCalc to solve his own trading calculation problems. Learn about the person behind the tools.`,
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title: `About ${AUTHOR.name} | ${SITE.name}`,
    description: `${AUTHOR.name} is a forex trader and software developer who built TradeCalc to solve his own trading calculation problems.`,
    url: `${SITE.url}/about`,
    type: 'profile',
  },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: AUTHOR.name,
  url: AUTHOR.url,
  description: AUTHOR.description,
  knowsAbout: [
    'Forex trading',
    'Position sizing',
    'Risk management',
    'Software development',
    'Trading calculators',
  ],
  sameAs: [],
};

const highlights = [
  {
    icon: TrendingUp,
    title: 'Active Forex Trader',
    body: 'Trading forex markets since 2019. Focus areas include risk management, position sizing, and systematic rule-based approaches to entries and exits.',
  },
  {
    icon: Code2,
    title: 'Software Developer',
    body: 'Full-stack developer with experience in React, Next.js, and TypeScript. Builds tools that solve real problems — starting with the ones he faces in his own trading.',
  },
  {
    icon: BookOpen,
    title: 'Why TradeCalc',
    body: 'After years of using clunky spreadsheets to calculate position sizes, pip values, and risk-reward ratios before every trade, Foysal built TradeCalc to make those calculations instant and error-free.',
  },
  {
    icon: ShieldCheck,
    title: 'Commitment to Accuracy',
    body: 'TradeCalc uses worked examples and automated regression tests to check its calculator formulas. Read each tool’s assumptions and verify broker-specific contract values and rules before using the result.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white">About</span>
        </nav>

        {/* Hero */}
        <div className="flex items-center gap-5 mb-10">
          <Image
            src="/foysal-mostafa.jpeg"
            alt={AUTHOR.name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
            priority
          />
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {AUTHOR.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Forex Trader &amp; Software Developer</p>
            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium mt-0.5">Founder, TradeCalc</p>
          </div>
        </div>

        {/* Bio */}
        <div className="prose prose-gray dark:prose-invert max-w-none mb-10 space-y-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I&apos;m Foysal Mostafa — a forex trader and software developer. I started trading forex in 2019 and quickly learned that the difference between profitable and unprofitable traders often comes down to one thing: consistent position sizing and risk management.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            For years I relied on spreadsheets I built myself — one for position size, one for pip value, another for risk-reward. They worked, but every time I switched pairs or changed my account balance I had to re-enter everything manually. One wrong cell reference and my risk calculations would be off.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I built TradeCalc to replace those spreadsheets. The goal was simple: a set of fast, accurate calculators that any trader can use before placing a trade, with no account required and no fluff. Every calculator on this site is something I use in my own trading.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            The guides explain formulas through hypothetical worked examples and identify their assumptions. Calculator checks cover example inputs and boundary cases; they do not certify every broker, account product or execution outcome.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {highlights.map(({ icon: Icon, title, body }) => (
            <div key={title} className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="font-display font-semibold text-gray-900 dark:text-white text-sm">{title}</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="card p-5 border-amber-200 dark:border-amber-800/50 border bg-amber-50/50 dark:bg-amber-900/10">
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <strong className="text-gray-800 dark:text-gray-200">Important:</strong> All calculators and guides on TradeCalc are for educational purposes only and do not constitute financial advice. Trading involves significant risk of loss and is not suitable for all investors. Always verify calculations with your broker before placing a trade, and consider your risk tolerance carefully. Past trading experience does not guarantee future results.
          </p>
        </div>

        {/* Contact prompt */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
            Questions, feedback, or found an error in a calculator?
          </p>
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            Get in touch
          </Link>
        </div>
      </main>
    </>
  );
}
