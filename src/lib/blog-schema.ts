// ─── Schema generators for blog posts ────────────────────────────────────────

import type { BlogPost } from './blog';
import { SITE, AUTHOR } from './seo';

export function blogArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: `${post.publishedAt}T00:00:00.000Z`,
    dateModified: `${post.updatedAt}T00:00:00.000Z`,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
      description: AUTHOR.description,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/opengraph-image`,
      },
    },
    keywords: post.keywords.join(', '),
    articleBody: post.sections.map(s => s.body.join(' ')).join(' '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/blog/${post.slug}`,
    },
    image: {
      '@type': 'ImageObject',
      url: `${SITE.url}/blog/${post.slug}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  };
}

export function blogFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function blogHowToSchema(post: BlogPost) {
  if (!post.howToSteps || post.howToSteps.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: post.title,
    description: post.description,
    totalTime: 'PT5M',
    step: post.howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE.url}/blog/${post.slug}#step-${i + 1}`,
    })),
  };
}

export function blogBreadcrumbSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE.url}/blog/${post.slug}` },
    ],
  };
}

export function blogIndexSchema(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'TradeCalc Trading Blog',
    description: 'Step-by-step guides to forex calculations, position sizing, risk management, and trading tools.',
    url: `${SITE.url}/blog`,
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE.url}/blog/${p.slug}`,
      name: p.title,
    })),
  };
}
