import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen, ListOrdered, Calculator } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import AdSlot from '@/components/AdSlot';
import { PUBLISHED_POSTS, getBlogPost, getRelatedBlogPosts, getRecentPosts } from '@/lib/blog';
import { blogArticleSchema, blogFaqSchema, blogHowToSchema, blogBreadcrumbSchema } from '@/lib/blog-schema';
import { getCalculatorBySlug } from '@/lib/calculators';
import Image from 'next/image';
import { SITE, AUTHOR } from '@/lib/seo';

const DATE_FORMAT: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

// ─── Inline link parser ────────────────────────────────────────────────────────
// Converts [anchor text](/path) or [anchor text](https://...) in body copy into
// <Link> (internal) or <a rel="noopener"> (external) elements.
function parseLinks(text: string): React.ReactNode {
  const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = LINK_RE.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, anchor, href] = m;
    const isInternal = href.startsWith('/');
    parts.push(
      isInternal
        ? <Link key={m.index} href={href}
            className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
            {anchor}
          </Link>
        : <a key={m.index} href={href} target="_blank" rel="noopener noreferrer"
            className="text-amber-600 dark:text-amber-400 hover:underline font-medium">
            {anchor}
          </a>
    );
    last = LINK_RE.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

// ─── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return PUBLISHED_POSTS.map(p => ({ slug: p.slug }));
}

// ─── Per-post metadata ─────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const canonicalUrl = `${SITE.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(', '),
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: `${post.publishedAt}T00:00:00.000Z`,
      modifiedTime: `${post.updatedAt}T00:00:00.000Z`,
      authors: [AUTHOR.name],
      images: [{
        url: `/blog/${post.slug}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: post.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`/blog/${post.slug}/opengraph-image`],
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts   = getRelatedBlogPosts(post.slug, post.relatedPosts);
  const recentPosts    = getRecentPosts(post.slug, 3);
  const sidebar        = relatedPosts.length ? relatedPosts : recentPosts;
  const primaryCalcSlug = post.relatedCalculators[0];
  const primaryCalc    = primaryCalcSlug ? getCalculatorBySlug(primaryCalcSlug) : undefined;

  // Build howTo schema (may be null)
  const howToJson = blogHowToSchema(post);

  return (
    <>
      {/* ── JSON-LD schemas ── */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogArticleSchema(post)) }} />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogFaqSchema(post.faqs)) }} />
      {howToJson && (
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJson) }} />
      )}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumbSchema(post)) }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16">

        {/* Breadcrumb */}
        <div className="mb-5">
          <Breadcrumb items={[
            { label: 'Blog', href: '/blog' },
            { label: post.shortTitle },
          ]} />
        </div>

        {/* Top ad */}
        <AdSlot format="horizontal" className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">

          {/* ── Main article ── */}
          <article
            aria-labelledby="post-title"
            itemScope
            itemType="https://schema.org/Article"
          >
            {/* Hidden machine-readable dates */}
            <meta itemProp="datePublished" content={`${post.publishedAt}T00:00:00.000Z`} />
            <meta itemProp="dateModified"  content={`${post.updatedAt}T00:00:00.000Z`} />

            {/* ── Header ── */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {post.tags.map(tag => (
                  <span key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                    {tag}
                  </span>
                ))}
              </div>

              <h1
                id="post-title"
                itemProp="headline"
                className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-balance"
              >
                {post.title}
              </h1>

              <p itemProp="description"
                className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-2xl mb-4">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                <Link
                  href="/about"
                  itemProp="author"
                  className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 font-medium hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <Image
                    src="/foysal-mostafa.jpeg"
                    alt={AUTHOR.name}
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  {AUTHOR.name}
                </Link>
                <span className="hidden sm:inline text-gray-300 dark:text-gray-700">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTimeMin} min read
                </span>
                <span>Published {new Date(post.publishedAt).toLocaleDateString('en-US', DATE_FORMAT)}</span>
                {post.updatedAt !== post.publishedAt && (
                  <span>Updated {new Date(post.updatedAt).toLocaleDateString('en-US', DATE_FORMAT)}</span>
                )}
              </div>
            </header>

            {/* ── Feature image ── */}
            {post.featuredImage && (
              <div className="mb-8 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <Image
                  src={post.featuredImage}
                  alt={post.featuredImageAlt ?? post.title}
                  width={800}
                  height={450}
                  className="w-full object-cover"
                  priority
                />
              </div>
            )}

            {/* ── Article body ── */}
            <div itemProp="articleBody">

              {post.sections.map((section, si) => (
                <section key={si} aria-labelledby={`section-${si}`} className="mb-8">
                  <h2
                    id={`section-${si}`}
                    className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                  >
                    <BookOpen className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    {section.heading}
                  </h2>

                  <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.body.map((para, pi) => (
                      <p key={pi}>{parseLinks(para)}</p>
                    ))}
                  </div>

                  {section.list && section.list.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {section.list.map((item, li) => (
                        <li key={li}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-amber-500 font-bold flex-shrink-0 mt-0.5">→</span>
                          <span>{parseLinks(item)}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Calculator CTA after section 2 (index 1) */}
                  {si === 1 && primaryCalc && (
                    <div className="mt-6 card p-5 border-l-4 border-amber-400 bg-amber-50/50 dark:bg-amber-900/10">
                      <div className="flex items-start gap-3">
                        <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            Skip the manual math
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            {post.callToAction.text}
                          </p>
                          <Link
                            href={post.callToAction.href}
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                          >
                            {post.callToAction.label}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              ))}

              {/* ── How-To Steps ── */}
              {post.howToSteps && post.howToSteps.length > 0 && (
                <section aria-labelledby="howto-heading" className="mb-8">
                  <h2
                    id="howto-heading"
                    className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                  >
                    <ListOrdered className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    {post.category === 'guide'
                      ? `How to ${post.shortTitle} — Step by Step`
                      : 'Step-by-Step Process'}
                  </h2>
                  <ol className="space-y-3">
                    {post.howToSteps.map((step, i) => (
                      <li key={i} id={`step-${i + 1}`} className="card p-4 flex gap-4">
                        <span className="w-7 h-7 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">
                            {step.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                            {parseLinks(step.text)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* ── Primary CTA (if not already shown mid-article) ── */}
              {post.sections.length <= 2 && primaryCalc && (
                <div className="card p-6 border-l-4 border-amber-400 mb-8">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    {post.callToAction.text}
                  </p>
                  <Link
                    href={post.callToAction.href}
                    className="inline-flex items-center gap-2 btn-primary text-sm"
                  >
                    <Calculator className="w-4 h-4" />
                    {post.callToAction.label}
                  </Link>
                </div>
              )}

              {/* ── Mid-article ad ── */}
              <AdSlot format="horizontal" className="my-8" />

              {/* ── FAQ section ── */}
              <section aria-labelledby="faq-heading" className="mb-8">
                <h2
                  id="faq-heading"
                  className="font-display text-xl font-bold text-gray-900 dark:text-white mb-5"
                >
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, i) => (
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

              {/* ── Bottom CTA ── */}
              <div className="card p-6 border-amber-400 border-2 text-center mb-8">
                <Calculator className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                <p className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Ready to calculate?
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm mx-auto">
                  {post.callToAction.text}
                </p>
                <Link
                  href={post.callToAction.href}
                  className="inline-flex items-center gap-2 btn-primary"
                >
                  {post.callToAction.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* ── Author bio ── */}
              <div className="card p-5 mb-8 flex items-start gap-4 border-gray-200 dark:border-gray-700">
                <Image
                  src="/foysal-mostafa.jpeg"
                  alt={AUTHOR.name}
                  width={48}
                  height={48}
                  className="flex-shrink-0 w-12 h-12 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">Written by</p>
                  <Link
                    href="/about"
                    className="font-display font-bold text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {AUTHOR.name}
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {AUTHOR.description}
                  </p>
                </div>
              </div>

              {/* ── Related calculators ── */}
              {post.relatedCalculators.length > 1 && (
                <section aria-labelledby="rel-calcs-heading" className="mb-8">
                  <h2
                    id="rel-calcs-heading"
                    className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4"
                  >
                    Related Calculators
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {post.relatedCalculators.map(cSlug => {
                      const calc = getCalculatorBySlug(cSlug);
                      if (!calc) return null;
                      return (
                        <Link
                          key={cSlug}
                          href={`/calculators/${cSlug}`}
                          className="card p-4 flex items-center gap-3 group hover:border-amber-400 dark:hover:border-amber-500 transition-colors"
                        >
                          <Calculator className="w-4 h-4 text-amber-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                              {calc.shortTitle} Calculator
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-auto flex-shrink-0 group-hover:text-amber-500 transition-colors" />
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside aria-label="Sidebar" className="space-y-6">

            {/* Sidebar ad */}
            <AdSlot format="rectangle" />

            {/* Primary calculator card */}
            {primaryCalc && (
              <div className="card p-5 border-amber-300 dark:border-amber-700 border">
                <p className="section-label mb-3">Use the Calculator</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  {primaryCalc.shortTitle} Calculator
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                  {primaryCalc.description}
                </p>
                <Link
                  href={`/calculators/${primaryCalc.slug}`}
                  className="btn-primary w-full text-center text-sm flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Open Calculator
                </Link>
              </div>
            )}

            {/* Related posts */}
            {sidebar.length > 0 && (
              <div className="card p-5">
                <p className="section-label mb-4">Related Guides</p>
                <div className="space-y-4">
                  {sidebar.map(related => (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group block"
                    >
                      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug">
                        {related.title}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {related.readingTimeMin} min read
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <strong className="block mb-1 text-gray-500 dark:text-gray-400">Disclaimer</strong>
              This content is for educational purposes only and does not constitute financial or investment advice. Always verify calculations with your broker before executing any trade.
            </div>

          </aside>
        </div>

        {/* Bottom ad */}
        <AdSlot format="horizontal" className="mt-10" />
      </div>
    </>
  );
}
