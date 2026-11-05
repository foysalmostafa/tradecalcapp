import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import RelatedCalculators from '@/components/RelatedCalculators';
import { CALCULATORS, getCalculatorBySlug, getRelatedCalculators } from '@/lib/calculators';
import { getBlogPostsByCalculator } from '@/lib/blog';
import { SITE, AUTHOR } from '@/lib/seo';
import { webApplicationSchema, faqSchema, howToSchema, articleSchema, breadcrumbSchema } from '@/lib/schema';
import { HelpCircle, ListOrdered, Lightbulb, BarChart3, BookOpen, ArrowRight } from 'lucide-react';
import { ASSET_BADGE } from '@/components/CalculatorCard';

// ─── Dynamic imports ─────────────────────────────────────────────────────────
const PositionSizeCalc = dynamic(() => import('@/components/calculators/PositionSizeCalc'));
const PipValueCalc     = dynamic(() => import('@/components/calculators/PipValueCalc'));
const ProfitLossCalc   = dynamic(() => import('@/components/calculators/ProfitLossCalc'));
import {
  MarginCalc, RiskRewardCalc, LotSizeCalc, CompoundingCalc,
  DrawdownCalc, AverageDownCalc, BreakEvenCalc,
  CurrencyConverterCalc, PipToDollarCalc,
  SwapCalc, PivotPointCalc, FibonacciCalc,
  LeverageCalc, RiskOfRuinCalc, KellyCalc, WinRateCalc,
  GainLossCalc, ConsistencyCalc,
  XauusdPipCalc, RebateCalc,
  StockProfitCalc, CryptoProfitCalc, MartingaleCalc, LiquidationCalc,
  FundingRateCalc, SpreadCostCalc, ProfitFactorCalc, AtrStopLossCalc,
  OptionsProfitCalc, PipDifferenceCalc, CAGRCalc, DailyLossLimitCalc,
  FuturesTickCalc, DividendYieldCalc,
  FuturesPositionSizeCalc, FuturesPLCalc, FuturesMarginCalc, FuturesTPSLCalc,
  FuturesContractValueCalc, FuturesRollCostCalc, FuturesCommissionCalc,
  FuturesBreakEvenCalc, FuturesRiskRewardCalc,
  PropFirmTrailingDrawdownCalc, PropFirmDailyLossCalc, PropFirmProfitTargetCalc,
  PropFirmConsistencyCalc, PropFirmPassRateCalc, PropFirmPositionSizeCalc,
  PropFirmAccountSizeFinderCalc,
} from '@/components/calculators/GenericCalc';

const CALC_COMPONENT: Record<string, React.ComponentType> = {
  'position-size-calculator':  PositionSizeCalc,
  'pip-value-calculator':      PipValueCalc,
  'profit-loss-calculator':    ProfitLossCalc,
  'margin-calculator':         MarginCalc,
  'risk-reward-calculator':    RiskRewardCalc,
  'lot-size-calculator':       LotSizeCalc,
  'compounding-calculator':    CompoundingCalc,
  'drawdown-calculator':       DrawdownCalc,
  'average-down-calculator':   AverageDownCalc,
  'break-even-calculator':     BreakEvenCalc,
  'currency-converter':        CurrencyConverterCalc,
  'pip-to-dollar-calculator':  PipToDollarCalc,
  'swap-calculator':           SwapCalc,
  'pivot-point-calculator':    PivotPointCalc,
  'fibonacci-calculator':      FibonacciCalc,
  'leverage-calculator':       LeverageCalc,
  'risk-of-ruin-calculator':   RiskOfRuinCalc,
  'kelly-criterion-calculator': KellyCalc,
  'win-rate-calculator':        WinRateCalc,
  'gain-loss-calculator':       GainLossCalc,
  'consistency-calculator':     ConsistencyCalc,
  'xauusd-pip-calculator':      XauusdPipCalc,
  'rebate-calculator':          RebateCalc,
  'stock-profit-calculator':    StockProfitCalc,
  'crypto-profit-calculator':   CryptoProfitCalc,
  'martingale-calculator':      MartingaleCalc,
  'liquidation-price-calculator': LiquidationCalc,
  'funding-rate-calculator':      FundingRateCalc,
  'spread-cost-calculator':       SpreadCostCalc,
  'profit-factor-calculator':     ProfitFactorCalc,
  'atr-stop-loss-calculator':       AtrStopLossCalc,
  'options-profit-calculator':      OptionsProfitCalc,
  'pip-difference-calculator':      PipDifferenceCalc,
  'cagr-calculator':                CAGRCalc,
  'daily-loss-limit-calculator':    DailyLossLimitCalc,
  'futures-tick-value-calculator':  FuturesTickCalc,
  'dividend-yield-calculator':      DividendYieldCalc,
  'futures-position-size-calculator':   FuturesPositionSizeCalc,
  'futures-profit-loss-calculator':     FuturesPLCalc,
  'futures-margin-requirement-calculator': FuturesMarginCalc,
  'futures-take-profit-stop-loss-calculator': FuturesTPSLCalc,
  'futures-contract-value-calculator':  FuturesContractValueCalc,
  'futures-roll-cost-calculator':       FuturesRollCostCalc,
  'futures-commission-calculator':      FuturesCommissionCalc,
  'futures-break-even-calculator':      FuturesBreakEvenCalc,
  'futures-risk-reward-calculator':          FuturesRiskRewardCalc,
  'prop-firm-trailing-drawdown-calculator':  PropFirmTrailingDrawdownCalc,
  'prop-firm-daily-loss-limit-calculator':   PropFirmDailyLossCalc,
  'prop-firm-profit-target-calculator':      PropFirmProfitTargetCalc,
  'prop-firm-consistency-rule-calculator':   PropFirmConsistencyCalc,
  'prop-firm-challenge-pass-rate-calculator': PropFirmPassRateCalc,
  'prop-firm-position-size-calculator':      PropFirmPositionSizeCalc,
  'prop-firm-account-size-finder':           PropFirmAccountSizeFinderCalc,
};

const DATE_PUBLISHED  = '2026-08-07';
const DATE_MODIFIED   = '2026-10-30';

// ─── Static params ────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return CALCULATORS.map(c => ({ slug: c.slug }));
}

// ─── Per-page metadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) return {};

  const canonicalUrl = `${SITE.url}/calculators/${calc.slug}`;

  return {
    title: calc.metaTitle ?? calc.title,
    description: calc.description,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: calc.title,
      description: calc.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: DATE_PUBLISHED,
      modifiedTime: DATE_MODIFIED,
      authors: [AUTHOR.name],
      images: [{
        url: `/calculators/${calc.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: calc.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.title,
      description: calc.description,
      images: [`/calculators/${calc.slug}/opengraph-image`],
    },
    other: {
      'article:published_time': DATE_PUBLISHED,
      'article:modified_time':  DATE_MODIFIED,
      'article:author': AUTHOR.url,
    },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);
  if (!calc) notFound();

  const CalcComponent = CALC_COMPONENT[slug];
  const related = getRelatedCalculators(slug, 4);
  const relatedGuides = getBlogPostsByCalculator(slug);

  const breadcrumbItems = [
    { name: 'Home', url: SITE.url },
    { name: 'Calculators', url: `${SITE.url}/calculators` },
    { name: `${calc.shortTitle} Calculator`, url: `${SITE.url}/calculators/${calc.slug}` },
  ];

  return (
    <>
      {/* ── JSON-LD schemas ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema(calc, DATE_MODIFIED)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(calc.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema(calc)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(calc, DATE_MODIFIED)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbItems)) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16">

        {/* Breadcrumb */}
        <div className="mb-5">
          <Breadcrumb items={[
            { label: 'Calculators', href: '/calculators' },
            { label: `${calc.shortTitle} Calculator` },
          ]} />
        </div>

        {/* Top ad */}
        <AdSlot format="horizontal" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

          {/* ── Main article ── */}
          <article
            aria-labelledby="calc-title"
            itemScope
            itemType="https://schema.org/Article"
          >
            {/* Hidden machine-readable dates + author */}
            <meta itemProp="datePublished" content={DATE_PUBLISHED} />
            <meta itemProp="dateModified"  content={DATE_MODIFIED} />
            <meta itemProp="author"        content={AUTHOR.name} />

            {/* ── Header ── */}
            <header className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {calc.assets.map(a => (
                  <span key={a} className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${ASSET_BADGE[a]}`}>
                    {a.charAt(0).toUpperCase() + a.slice(1)}
                  </span>
                ))}
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Free
                </span>
              </div>

              <h1
                id="calc-title"
                itemProp="headline"
                className="font-display text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3"
              >
                {calc.title}
              </h1>

              <p itemProp="description" className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-2xl">
                {calc.longDescription}
              </p>

              {/* Last updated — Priority 10: semantic <time> element */}
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                Updated <time dateTime={DATE_MODIFIED}>{new Date(DATE_MODIFIED).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                {' · '}Reviewed by <Link href="/about" className="text-amber-600 dark:text-amber-400 hover:underline">{AUTHOR.name}</Link>
              </p>
            </header>

            {/* ── Calculator widget ── */}
            <section aria-label={`${calc.shortTitle} Calculator tool`} className="card p-6 sm:p-8 mb-8">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="flex-shrink-0">
                  <rect width="32" height="32" rx="7" fill="#0F172A"/>
                  <circle cx="16" cy="16" r="12" stroke="#F59E0B" strokeWidth="1.5" fill="none"/>
                  <line x1="16" y1="9" x2="16" y2="23" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
                  <polyline points="10,15 16,9 22,15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                  {calc.shortTitle} Calculator
                </span>
                <span className="ml-auto text-xs text-gray-400 dark:text-gray-500">Results update instantly</span>
              </div>
              {CalcComponent ? <CalcComponent /> : (
                <p className="text-gray-400 text-sm">Calculator coming soon.</p>
              )}
            </section>

            {/* ── Why Use — Priority 2 ── */}
            {calc.whyUse && (
              <section aria-labelledby="why-use-heading" className="mb-8">
                <h2
                  id="why-use-heading"
                  className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                >
                  <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  Why Use the {calc.shortTitle} Calculator?
                </h2>
                <div className="card p-5 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <p>{calc.whyUse}</p>
                </div>
              </section>
            )}

            {/* ── Formula + Worked Example — Priority 3 ── */}
            <div className="mb-8 space-y-3">
              <div className="card p-5 border-l-4 border-amber-400">
                <p className="section-label mb-2">Formula Used</p>
                <code className="text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed block">
                  {calc.formula}
                </code>
              </div>
              {calc.workedExample && (
                <div className="card p-5 border-l-4 border-green-400 bg-green-50/30 dark:bg-green-900/10">
                  <p className="section-label mb-2 text-green-700 dark:text-green-400">Worked Example</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-mono">
                    {calc.workedExample}
                  </p>
                </div>
              )}
            </div>

            {/* ── How to Use — keyword-rich H2 ── */}
            <section aria-labelledby="how-to-heading" className="mb-8">
              <h2
                id="how-to-heading"
                className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
              >
                <ListOrdered className="w-5 h-5 text-amber-500 flex-shrink-0" />
                How to Use the {calc.shortTitle} Calculator — Step by Step
              </h2>

              <ol className="space-y-3">
                {calc.howToSteps.map((step, i) => (
                  <li key={i} className="card p-4 flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{step.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* ── Results Explained — Priority 8 ── */}
            {calc.resultsExplained && calc.resultsExplained.length > 0 && (
              <section aria-labelledby="results-heading" className="mb-8">
                <h2
                  id="results-heading"
                  className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                >
                  <BarChart3 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  What Your {calc.shortTitle} Calculator Results Mean
                </h2>
                <div className="space-y-3">
                  {calc.resultsExplained.map((field, i) => (
                    <div key={i} className="card p-4 flex gap-4">
                      <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 mt-2" />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{field.label}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{field.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ── FAQ — visible for full Google indexing ── */}
            <section aria-labelledby="faq-heading" className="mb-8">
              <h2
                id="faq-heading"
                className="font-display text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2"
              >
                <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                {calc.shortTitle} Calculator — Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {calc.faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="card p-5"
                    itemScope
                    itemType="https://schema.org/Question"
                  >
                    <h3
                      itemProp="name"
                      className="font-semibold text-gray-900 dark:text-white text-sm mb-2 flex items-start gap-2"
                    >
                      <span className="text-amber-500 font-bold flex-shrink-0">Q.</span>
                      {faq.q}
                    </h3>
                    <div itemScope itemType="https://schema.org/Answer">
                      <p
                        itemProp="text"
                        className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed pl-5"
                      >
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── Author bio — Priority 1: E-E-A-T signal for YMYL ── */}
            <section aria-labelledby="author-heading" className="mb-8">
              <div className="card p-5 border border-amber-200/50 dark:border-amber-800/30 bg-amber-50/20 dark:bg-amber-900/5">
                <p className="section-label mb-3 text-amber-600 dark:text-amber-400">About the Author</p>
                <div className="flex items-start gap-4">
                  <Image
                    src="/foysal-mostafa.jpeg"
                    alt={AUTHOR.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">
                      <Link href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                        {AUTHOR.name}
                      </Link>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Forex Trader &amp; Software Developer · Founder, TradeCalc</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      Active forex trader since 2019, specializing in risk management and systematic position sizing. Built TradeCalc to replace manual spreadsheets used in live trading. Calculator formulas are checked with worked examples and automated regression tests. Broker-specific rules and execution outcomes still need independent confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ── Related calculators (inline — helps internal linking) ── */}
            <RelatedCalculators
              calculators={related}
              title={`More ${calc.assets.includes('forex') ? 'Forex' : calc.assets[0].charAt(0).toUpperCase() + calc.assets[0].slice(1)} Calculators`}
            />

            {/* ── Related guides — blog → calculator internal linking ── */}
            {relatedGuides.length > 0 && (
              <section aria-labelledby="related-guides-heading" className="mt-8">
                <h2 id="related-guides-heading" className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  Related Guides
                </h2>
                <ul className="space-y-2">
                  {relatedGuides.map(post => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-start gap-2 text-sm text-amber-600 dark:text-amber-400 hover:underline"
                      >
                        <ArrowRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>{post.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside aria-label="Sidebar" className="space-y-6">

            {/* Sidebar ad */}
            <AdSlot format="rectangle" />

            {/* Quick info */}
            <div className="card p-5">
              <p className="section-label mb-4">About This Tool</p>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Asset Classes</dt>
                  <dd className="font-semibold text-gray-700 dark:text-gray-300 capitalize">{calc.assets.join(', ')}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Category</dt>
                  <dd className="font-semibold text-gray-700 dark:text-gray-300 capitalize">{calc.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Last Updated</dt>
                  <dd className="font-semibold text-gray-700 dark:text-gray-300">
                    <time dateTime={DATE_MODIFIED}>{DATE_MODIFIED}</time>
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Cost</dt>
                  <dd className="font-semibold text-green-600 dark:text-green-400">100% Free</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-gray-400">Reviewed by</dt>
                  <dd className="font-semibold text-gray-700 dark:text-gray-300">
                    <Link href="/about" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                      {AUTHOR.name}
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <strong className="block mb-1 text-gray-500 dark:text-gray-400">Disclaimer</strong>
              All calculator results are for educational purposes only and do not constitute financial advice. Always verify calculations with your broker before executing any trade.
            </div>
          </aside>
        </div>

        {/* Bottom ad */}
        <AdSlot format="horizontal" className="mt-10" />
      </div>
    </>
  );
}
