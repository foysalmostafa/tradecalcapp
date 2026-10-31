import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen, ChevronDown } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import { PUBLISHED_POSTS as BLOG_POSTS } from '@/lib/blog';
import { blogIndexSchema } from '@/lib/blog-schema';
import { SITE } from '@/lib/seo';
import { webPageSchema, breadcrumbSchema, faqSchema } from '@/lib/schema';

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Forex Trading Blog — Calculation Guides & Risk Management | TradeCalc',
  description:
    'Step-by-step guides to position sizing, pip values, risk/reward, margin, drawdown, and every calculation active traders need. Free from TradeCalc.',
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: 'Forex Trading Blog — Calculation Guides & Risk Management | TradeCalc',
    description:
      'Step-by-step guides to position sizing, pip values, risk/reward, margin, drawdown, and every calculation active traders need.',
    url: `${SITE.url}/blog`,
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'TradeCalc Trading Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forex Trading Blog — Calculation Guides & Risk Management | TradeCalc',
    description:
      'Step-by-step guides to position sizing, pip values, risk/reward, margin, drawdown, and more.',
    images: ['/opengraph-image'],
  },
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const PAGE_FAQS = [
  {
    q: 'How do I calculate position size in forex?',
    a: 'Position size (lots) = (Account balance × Risk %) ÷ (Stop loss in pips × Pip value per lot). For example: $10,000 account risking 1% with a 20-pip stop on EUR/USD = ($10,000 × 0.01) ÷ (20 × $10) = 0.5 lots. The position size calculator on TradeCalc does this in one step for any pair.',
  },
  {
    q: 'What is the 1% rule in forex trading?',
    a: 'The 1% rule means never risking more than 1% of your account on a single trade. On a $10,000 account that is $100 at risk per trade. Combined with a fixed stop loss in pips and the pip value for your pair, the 1% rule determines exactly how many lots to trade. It is the foundation of professional position sizing.',
  },
  {
    q: 'What is risk/reward ratio and how do I use it?',
    a: 'Risk/reward ratio (R:R) compares how much you risk on a trade versus how much you stand to gain. A 1:2 R:R means risking $100 to make $200. You need a win rate above 33% to be profitable at 1:2. Combining your R:R with your actual win rate — using the win rate calculator — tells you your expected value per trade before you even open a position.',
  },
  {
    q: 'What is margin in forex and how is it calculated?',
    a: 'Margin is the deposit your broker requires to open a leveraged position. Required margin = (Lot size × Contract size × Current price) ÷ Leverage. On EUR/USD at 1.0850 with 1 standard lot (100,000 units) and 1:100 leverage: margin = (100,000 × 1.0850) ÷ 100 = $1,085. The margin calculator handles this for all pairs and leverage settings.',
  },
  {
    q: 'How do prop firm trailing drawdowns work?',
    a: 'A trailing drawdown means your account floor rises as your balance rises — but never falls back down if your balance drops. If you start at $100,000 with a 5% trailing drawdown ($5,000), your floor starts at $95,000. If you grow to $105,000, the floor moves up to $100,000 and stays there even if you lose money. The trailing drawdown calculator tracks your real-time floor so you always know your safety margin.',
  },
];

// ─── Category labels & colors ─────────────────────────────────────────────────
const CATEGORY_LABEL: Record<string, string> = {
  guide:      'How-To Guide',
  comparison: 'Comparison',
  pillar:     'Complete Guide',
};

const CATEGORY_COLOR: Record<string, string> = {
  guide:      'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  comparison: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  pillar:     'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function BlogIndexPage() {
  const [featured, ...rest] = BLOG_POSTS;

  const breadcrumbItems = [
    { name: 'Home', url: SITE.url },
    { name: 'Blog', url: `${SITE.url}/blog` },
  ];

  const pageSchemaData = webPageSchema({
    title:       'Forex Trading Blog — Calculation Guides & Risk Management | TradeCalc',
    description: 'Step-by-step guides to position sizing, pip values, risk/reward, margin, drawdown, and every calculation active traders need.',
    url:          `${SITE.url}/blog`,
    datePublished: '2026-08-07T00:00:00.000Z',
    dateModified:  '2026-09-06T00:00:00.000Z',
  });
  const breadcrumbData = breadcrumbSchema(breadcrumbItems);
  const faqSchemaData  = faqSchema(PAGE_FAQS.map(f => ({ q: f.q, a: f.a })));

  return (
    <>
      {/* ── JSON-LD schemas ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexSchema(BLOG_POSTS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">

        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }]} />
        </div>

        {/* ── Page header ── */}
        <div className="mb-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-3">
            Trading Education
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 text-balance">
            Forex &amp; Trading Calculation Guides
          </h1>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
            Step-by-step guides covering every calculation active traders rely on — position sizing,
            pip value, lot size, margin, risk/reward ratio, drawdown, prop firm rules, and futures
            tick value. Written for forex, stocks, crypto, and futures traders at every level.
          </p>
          {/* E-E-A-T author signal */}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
            Written by{' '}
            <Link href="/about" className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
              Foysal Mostafa
            </Link>
            , forex trader &amp; software developer — applying these concepts in live trading.
          </p>
        </div>

        <AdSlot format="horizontal" className="mb-10" />

        {/* ── Featured post ── */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group block card p-0 overflow-hidden mb-12 hover:border-amber-400 dark:hover:border-amber-500 transition-colors"
          aria-label={featured.title}
          itemScope
          itemType="https://schema.org/Article"
        >
          <meta itemProp="url"          content={`${SITE.url}/blog/${featured.slug}`} />
          <meta itemProp="headline"     content={featured.title} />
          <meta itemProp="description"  content={featured.description} />
          <meta itemProp="datePublished" content={featured.publishedAt} />
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-0">
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${CATEGORY_COLOR[featured.category]}`}>
                  {CATEGORY_LABEL[featured.category]}
                </span>
                {featured.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
              <h2
                className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 text-balance group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors"
                itemProp="name"
              >
                {featured.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-5 max-w-lg" itemProp="abstract">
                {featured.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readingTimeMin} min read
                </span>
                <span>{new Date(featured.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center pr-8">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 transition-colors">
                <ArrowRight className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </div>
        </Link>

        {/* ── All posts grid ── */}
        <section
          aria-labelledby="all-posts-heading"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <meta itemProp="name" content="All Trading Guides" />
          <h2
            id="all-posts-heading"
            className="font-display text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-amber-500 flex-shrink-0" />
            All Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((post, i) => (
              <div
                key={post.slug}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <meta itemProp="position" content={String(i + 2)} />
                <Link
                  href={`/blog/${post.slug}`}
                  className="group card p-5 flex flex-col hover:border-amber-400 dark:hover:border-amber-500 transition-colors h-full"
                  aria-label={post.title}
                  itemScope
                  itemType="https://schema.org/Article"
                  itemProp="item"
                >
                  <meta itemProp="url"          content={`${SITE.url}/blog/${post.slug}`} />
                  <meta itemProp="datePublished" content={post.publishedAt} />

                  {/* Category + reading time */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLOR[post.category]}`}>
                      {CATEGORY_LABEL[post.category]}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readingTimeMin} min
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-base font-bold text-gray-900 dark:text-white mb-2 text-balance group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug flex-1"
                    itemProp="headline"
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed"
                    itemProp="description"
                  >
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {post.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <AdSlot format="horizontal" className="mt-12 mb-14" />

        {/* ── FAQ ── */}
        <section
          className="mb-4"
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
