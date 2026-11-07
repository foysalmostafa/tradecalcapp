import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronDown, TrendingUp, Globe, Zap } from 'lucide-react';
import CalculatorCard from '@/components/CalculatorCard';
import AdSlot from '@/components/AdSlot';
import PositionSizeCalc from '@/components/calculators/PositionSizeCalc';
import { CALCULATORS, getCalculatorBySlug } from '@/lib/calculators';
import { SITE } from '@/lib/seo';
import {
  webPageSchema,
  faqSchema,
  itemListSchema,
  webApplicationSchema,
} from '@/lib/schema';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Free Trading Calculators for Forex, Stocks & Crypto | TradeCalc',
  description:
    'Free trading calculators for forex, stocks, crypto, futures, and prop firm traders. Calculate position size, pip value, lot size, margin, risk/reward, and more. No sign-up required.',
  alternates: { canonical: SITE.url },
  openGraph: {
    title: 'Free Trading Calculators for Forex, Stocks & Crypto | TradeCalc',
    description:
      'Free trading calculators for forex, stocks, crypto, futures, and prop firm traders. Calculate position size, pip value, lot size, margin, risk/reward, and more.',
    url: SITE.url,
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'TradeCalc — Free Trading Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Trading Calculators for Forex, Stocks & Crypto | TradeCalc',
    description:
      'Free trading calculators for forex, stocks, crypto, futures, and prop firm traders. Calculate position size, pip value, lot size, margin, and more.',
    images: ['/opengraph-image'],
  },
};

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const HOME_FAQS = [
  {
    q: 'What is a position size calculator?',
    a: 'A position size calculator tells you exactly how many lots, units, or shares to trade based on your account balance, the percentage you are willing to risk, and your stop loss distance. It removes guesswork from trade sizing and enforces consistent risk management on every trade — whether you trade forex, stocks, crypto, or futures.',
  },
  {
    q: 'How do I calculate lot size in forex?',
    a: 'Lot size = (Account Balance × Risk %) ÷ (Stop Loss in pips × Pip Value per lot). For example, with a $10,000 account risking 1% ($100), a 20-pip stop loss, and a pip value of $10 per standard lot: Lot size = $100 ÷ (20 × $10) = 0.5 standard lots. The position size calculator above does this instantly as you type.',
  },
  {
    q: 'What is pip value and why does it matter?',
    a: 'Pip value is the monetary value of a one-pip price movement per lot size. For EUR/USD at one standard lot (100,000 units), one pip equals approximately $10. For a mini lot (10,000 units), one pip equals $1. Pip value differs by currency pair and account currency — using the wrong pip value leads to incorrect position sizing and unintended risk exposure.',
  },
  {
    q: 'How much should I risk per trade?',
    a: 'Professional traders typically risk 1–2% of their account per trade. If each loss is 1% of the remaining balance, 50 consecutive losses reduce the account by approximately 39.5% (1 − 0.99^50). This illustration excludes fees and slippage and does not guarantee that losses will stay within a planned stop. Risking more than 2% per trade dramatically increases the probability of deep drawdowns that are difficult to recover from psychologically and mathematically.',
  },
  {
    q: 'Are all TradeCalc calculators free to use?',
    a: 'Yes — every calculator on TradeCalc is completely free with no account, no subscription, and no hidden fees. All calculations run instantly in your browser. No data is sent to any server.',
  },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: 'Prop Firm Ready',
    desc: '7 dedicated calculators for FTMO, TopStep, and Apex — trailing drawdown, daily loss limit, consistency rule, and challenge pass rate.',
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: 'Every Market, One Tool',
    desc: 'Forex pairs, US stocks, crypto, and ES/NQ futures. Switch asset classes without switching sites.',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Zero Friction',
    desc: 'No account. No loading screen. Open any calculator, type your numbers, get your answer in under 5 seconds.',
  },
];

// ─── Calculator categories ────────────────────────────────────────────────────
const CATEGORIES = [
  {
    label: 'Forex',
    slugs: [
      'position-size-calculator',
      'pip-value-calculator',
      'margin-calculator',
      'risk-reward-calculator',
    ],
  },
  {
    label: 'Prop Firm',
    slugs: [
      'prop-firm-trailing-drawdown-calculator',
      'prop-firm-daily-loss-limit-calculator',
      'prop-firm-profit-target-calculator',
      'prop-firm-position-size-calculator',
    ],
  },
  {
    label: 'Futures',
    slugs: [
      'futures-position-size-calculator',
      'futures-tick-value-calculator',
      'futures-profit-loss-calculator',
      'futures-margin-requirement-calculator',
    ],
  },
  {
    label: 'Crypto & Stocks',
    slugs: [
      'crypto-profit-calculator',
      'liquidation-price-calculator',
      'stock-profit-calculator',
      'funding-rate-calculator',
    ],
  },
];

// ─── Trust pills ──────────────────────────────────────────────────────────────
const TRUST_PILLS = [
  '100% Free',
  'No Sign-up',
  'Instant Results',
  'Mobile Friendly',
];

// ─── Blog links (homepage → blog internal linking for PageRank flow) ──────────
const BLOG_LINKS = [
  {
    slug: 'how-to-calculate-position-size-forex',
    category: 'Guide',
    title: 'How to Calculate Position Size in Forex',
    desc: 'Step-by-step formula with worked examples for any account size, currency pair, and stop loss.',
  },
  {
    slug: 'forex-risk-management-complete-guide',
    category: 'Guide',
    title: 'Forex Risk Management: The Complete Guide',
    desc: 'Risk per trade, stop loss placement, drawdown limits, and position sizing — everything in one place.',
  },
  {
    slug: 'forex-lot-sizes-explained',
    category: 'Guide',
    title: 'Forex Lot Sizes Explained',
    desc: 'Standard, mini, micro, and nano lots — what they mean, how they affect pip value and margin.',
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const posCalc = getCalculatorBySlug('position-size-calculator');

  const pageSchema  = webPageSchema({
    title:         'Free Trading Calculators for Forex, Stocks, Crypto & Futures | TradeCalc',
    description:   'Free trading calculators for forex, stocks, crypto, futures, and prop firm traders. Calculate position size, pip value, lot size, margin, risk/reward, and more.',
    url:            SITE.url,
    datePublished: '2026-08-07T00:00:00.000Z',
    dateModified:  '2026-09-07T00:00:00.000Z',
  });
  const faqSchemaData = faqSchema(HOME_FAQS.map(f => ({ q: f.q, a: f.a })));
  const itemListData  = itemListSchema(
    CALCULATORS.map(c => ({
      name:        c.title,
      url:         `${SITE.url}/calculators/${c.slug}`,
      description: c.description,
    }))
  );
  const appSchemaData = posCalc ? webApplicationSchema(posCalc, '2026-09-07') : null;

  return (
    <>
      {/* ── JSON-LD schemas ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }} />
      {appSchemaData && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchemaData) }} />
      )}

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="max-w-2xl">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-700 dark:text-amber-400 mb-4">
            Built for Active Traders
          </span>

          {/* FIX 1 — H1 now includes Futures */}
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4 text-balance">
            Free Trading Calculators for Forex, Stocks, Crypto & Futures
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
            Calculate your exact position size, pip value, margin, and risk in seconds.
            Covers forex, stocks, crypto, futures, and prop firm rules — no sign-up required.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/calculators" className="btn-primary">
              All Calculators
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/calculators/position-size-calculator" className="btn-secondary">
              Position Size ↗
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust bar + E-E-A-T author (FIX 2) ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="flex flex-wrap gap-3">
          {TRUST_PILLS.map(pill => (
            <span
              key={pill}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1.5"
            >
              <span className="text-green-500 font-bold">✓</span>
              {pill}
            </span>
          ))}
        </div>
        {/* FIX 2 — Visible E-E-A-T author signal */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
          Built by{' '}
          <Link href="/about" className="text-amber-700 dark:text-amber-400 hover:underline font-medium">
            Foysal Mostafa
          </Link>
          , forex trader &amp; software developer — using the same tools in his own live trading.
        </p>
      </div>

      {/* ── Embedded Position Size Calculator ── */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 mb-14"
        aria-label="Position Size Calculator"
        itemScope
        itemType="https://schema.org/WebApplication"
      >
        <meta itemProp="name"                content="Position Size Calculator" />
        <meta itemProp="applicationCategory" content="FinanceApplication" />
        <meta itemProp="isAccessibleForFree" content="true" />
        <div className="card p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                Position Size Calculator
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Enter your account balance, risk %, and stop loss — get your exact lot size
              </p>
            </div>
            <Link
              href="/calculators/position-size-calculator"
              className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 shrink-0"
            >
              Full page <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <PositionSizeCalc />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-14 mb-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Why Traders Choose TradeCalc
          </h2>
          <p className="text-sm text-gray-500 text-center mb-10">
            Built by a forex trader, for traders who want accurate answers fast
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {FEATURES.map(f => (
              <div key={f.title} className="flex flex-col gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                  {f.icon}
                </span>
                <h3 className="font-semibold text-gray-900 dark:text-white">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Calculator Categories ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-14" aria-labelledby="categories-heading">
        <div className="flex items-center justify-between mb-8">
          <h2 id="categories-heading" className="font-display text-2xl font-bold text-gray-900 dark:text-white">
            Browse by Market
          </h2>
          <Link href="/calculators" className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-10">
          {CATEGORIES.map(cat => {
            const calcs = cat.slugs
              .map(slug => CALCULATORS.find(c => c.slug === slug))
              .filter(Boolean) as typeof CALCULATORS;

            return (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                    {cat.label}
                  </h3>
                  <Link href="/calculators" className="text-xs text-amber-700 dark:text-amber-400 hover:underline">
                    More tools →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {calcs.map(calc => (
                    <CalculatorCard key={calc.slug} calc={calc} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Ad slot ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
        <AdSlot format="horizontal" />
      </div>

      {/* ── All calculators (SEO hub) ── */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 mb-14"
        aria-labelledby="all-heading"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <meta itemProp="name"        content="Free Trading Calculators" />
        <meta itemProp="description" content="Complete list of free trading calculators for forex, stocks, crypto, futures, and prop firm traders." />
        <div className="flex items-center justify-between mb-6">
          <h2 id="all-heading" className="font-display text-2xl font-bold text-gray-900 dark:text-white">
            All Trading Calculators
          </h2>
          <Link href="/calculators" className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1">
            Full list <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CALCULATORS.map((calc, i) => (
            <div key={calc.slug} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <meta itemProp="position"    content={String(i + 1)} />
              <meta itemProp="name"        content={calc.title} />
              <meta itemProp="url"         content={`${SITE.url}/calculators/${calc.slug}`} />
              <CalculatorCard calc={calc} />
            </div>
          ))}
        </div>
      </section>

      {/* ── FIX 3 — Blog links (internal linking + PageRank flow) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-14" aria-labelledby="blog-heading">
        <div className="flex items-center justify-between mb-6">
          <h2 id="blog-heading" className="font-display text-2xl font-bold text-gray-900 dark:text-white">
            Learn Risk Management
          </h2>
          <Link href="/blog" className="text-sm font-medium text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1">
            All articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BLOG_LINKS.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card p-5 hover:border-amber-300 dark:hover:border-amber-700 transition-colors group block"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-2 block">
                {post.category}
              </span>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                {post.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="max-w-6xl mx-auto px-4 sm:px-6 mb-14"
        aria-labelledby="faq-heading"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <h2 id="faq-heading" className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {HOME_FAQS.map(({ q, a }) => (
            <details
              key={q}
              className="group py-5"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <h3
                  className="font-semibold text-gray-900 dark:text-white text-base"
                  itemProp="name"
                >
                  {q}
                </h3>
                <ChevronDown className="w-4 h-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
              </summary>
              <div
                className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p itemProp="text">{a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
        <div className="card p-8 sm:p-10 text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Ready to Trade Smarter?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm">
            Every calculator is free, instant, and works on any device. No account needed.
          </p>
          <Link href="/calculators" className="btn-primary inline-flex">
            Explore All Calculators
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Bottom ad ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-14">
        <AdSlot format="horizontal" />
      </div>
    </>
  );
}
