import type { Metadata } from 'next';
import CalculatorCard from '@/components/CalculatorCard';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { CALCULATORS } from '@/lib/calculators';
import { SITE } from '@/lib/seo';
import { webPageSchema, itemListSchema, faqSchema, breadcrumbSchema } from '@/lib/schema';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Free Forex & Trading Calculators — All Tools',
  description:
    'All free trading calculators in one place — position size, pip value, lot size, margin, risk/reward, drawdown, prop firm rules, futures, and more. No sign-up required.',
  alternates: { canonical: `${SITE.url}/calculators` },
  openGraph: {
    title: 'Free Forex & Trading Calculators — All Tools | TradeCalc',
    description:
      'All free trading calculators in one place — position size, pip value, lot size, margin, risk/reward, drawdown, prop firm rules, futures, and more.',
    url: `${SITE.url}/calculators`,
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'TradeCalc — Free Trading Calculators' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Forex & Trading Calculators — All Tools | TradeCalc',
    description:
      'All free trading calculators in one place — position size, pip value, lot size, margin, risk/reward, drawdown, and more.',
    images: ['/opengraph-image'],
  },
};

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'position', label: 'Position Sizing' },
  { id: 'risk',     label: 'Risk Management' },
  { id: 'profit',   label: 'Profit & P&L' },
  { id: 'futures',  label: 'Futures Trading' },
  { id: 'propfirm', label: 'Prop Firm Tools' },
  { id: 'utility',  label: 'Utilities' },
] as const;

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const PAGE_FAQS = [
  {
    q: 'What is the most important forex calculator for beginners?',
    a: 'The position size calculator is the most critical tool for any trader. It tells you exactly how many lots to buy or sell based on your account balance, your risk percentage, and your stop loss in pips. Without correct position sizing, even a profitable strategy will blow your account due to inconsistent risk exposure.',
  },
  {
    q: 'How do I calculate pip value in forex?',
    a: 'Pip value in the quote currency = Pip size × Position units. For EUR/USD at 100,000 units, 0.0001 × 100,000 = $10 per pip. At EUR/USD 1.0850, that is approximately €9.22 for an account denominated in EUR, not $9.22. Convert the quote-currency value to your account currency using the relevant exchange rate.',
  },
  {
    q: 'What calculators do prop firm traders need?',
    a: 'Prop firm traders need 4 core calculators: (1) Trailing Drawdown Calculator — to know exactly where your floor is at any account peak, (2) Daily Loss Limit Calculator — to track how much room you have left today, (3) Consistency Rule Calculator — to ensure no single day exceeds the allowed percentage of total profits, and (4) Position Size Calculator — to size trades so a single loss cannot breach the daily limit.',
  },
  {
    q: 'Are these calculators accurate for all brokers?',
    a: 'Yes — all calculators use universal industry-standard formulas that apply regardless of broker. Pip values, lot sizes, margin requirements, and drawdown calculations are based on standard contract specifications (100,000 units per standard lot for forex, exchange-defined tick sizes for futures). The only broker-specific variable is swap/rollover rates, which you should enter manually from your broker\'s contract specifications.',
  },
  {
    q: 'Do I need to create an account to use these calculators?',
    a: 'No. Every calculator on TradeCalc is completely free with no account, no sign-up, and no subscription. All calculations run instantly in your browser — nothing is sent to a server. Open a calculator, enter your numbers, get your answer.',
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function CalculatorsPage() {
  const breadcrumbItems = [
    { name: 'Home',            url: SITE.url },
    { name: 'All Calculators', url: `${SITE.url}/calculators` },
  ];

  const pageSchema     = webPageSchema({
    title:       'Free Forex & Trading Calculators — All Tools | TradeCalc',
    description: 'All free trading calculators in one place — position size, pip value, lot size, margin, risk/reward, drawdown, prop firm rules, futures, and more.',
    url:          `${SITE.url}/calculators`,
    datePublished: '2026-08-07T00:00:00.000Z',
    dateModified:  '2026-09-06T00:00:00.000Z',
  });
  const breadcrumb     = breadcrumbSchema(breadcrumbItems);
  const itemList       = itemListSchema(
    CALCULATORS.map(c => ({
      name:        c.title,
      url:         `${SITE.url}/calculators/${c.slug}`,
      description: c.description,
    }))
  );
  const faqSchemaData  = faqSchema(PAGE_FAQS.map(f => ({ q: f.q, a: f.a })));

  return (
    <>
      {/* ── JSON-LD schemas ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">

        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'All Calculators', href: '/calculators' }]} />
        </div>

        {/* ── Page header ── */}
        <div className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Free Forex &amp; Trading Calculators
          </h1>
          {/* LSI-rich intro paragraph */}
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
            Every tool you need for professional risk management in one place — position size, pip
            value, lot size, margin requirement, risk/reward ratio, drawdown, compounding, swap,
            prop firm rules, and futures tick value. Works for forex pairs, US stocks, crypto
            assets, and ES/NQ futures contracts. No login. No spreadsheet. Just answers.
          </p>
          {/* E-E-A-T author signal */}
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            Built by{' '}
            <Link href="/about" className="text-amber-700 dark:text-amber-400 hover:underline font-medium">
              Foysal Mostafa
            </Link>
            , forex trader &amp; software developer — using these tools in live trading.
          </p>
        </div>

        {/* ── Most-Used Calculators ── */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-3">
            Most Used
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['pip-value-calculator', 'pip-to-dollar-calculator', 'position-size-calculator'] as const).map(slug => {
              const calc = CALCULATORS.find(c => c.slug === slug);
              if (!calc) return null;
              return (
                <a
                  key={slug}
                  href={`/calculators/${slug}`}
                  className="flex items-center gap-3 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-900/10 px-4 py-3 hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors"
                >
                  <span className="text-2xl">🧮</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{calc.shortTitle}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{calc.description.slice(0, 60)}…</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <AdSlot format="horizontal" className="mb-10" />

        {/* ── Calculator categories with ItemList microdata ── */}
        {CATEGORIES.map(cat => {
          const items = CALCULATORS.filter(c => c.category === cat.id);
          if (!items.length) return null;
          return (
            <section
              key={cat.id}
              className="mb-12"
              aria-labelledby={`cat-${cat.id}`}
              itemScope
              itemType="https://schema.org/ItemList"
            >
              <meta itemProp="name" content={cat.label} />
              <h2
                id={`cat-${cat.id}`}
                className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800"
              >
                {cat.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((calc, i) => (
                  <div
                    key={calc.slug}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position"    content={String(i + 1)} />
                    <meta itemProp="name"        content={calc.title} />
                    <meta itemProp="url"         content={`${SITE.url}/calculators/${calc.slug}`} />
                    <CalculatorCard calc={calc} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <AdSlot format="horizontal" className="mb-14" />

        {/* ── FAQ ── */}
        <section
          className="mb-14"
          aria-labelledby="faq-heading"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <h2
            id="faq-heading"
            className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {PAGE_FAQS.map(({ q, a }) => (
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
                  <ChevronDown className="w-4 h-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
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

      </div>
    </>
  );
}
