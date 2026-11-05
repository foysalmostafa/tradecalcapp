import { CalculatorMeta } from './calculators';
import { SITE, AUTHOR } from './seo';

const PUBLISHED = '2026-08-07T00:00:00.000Z';

export function webApplicationSchema(calc: CalculatorMeta, dateModified?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.title,
    description: calc.description,
    url: `${SITE.url}/calculators/${calc.slug}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    datePublished: PUBLISHED,
    dateModified: dateModified ? `${dateModified}T00:00:00.000Z` : PUBLISHED,
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: calc.keywords.join(', '),
    creator: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
  };
}

export function howToSchema(calc: CalculatorMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Use the ${calc.shortTitle} Calculator`,
    description: calc.description,
    totalTime: 'PT1M',
    tool: {
      '@type': 'HowToTool',
      name: `${calc.shortTitle} Calculator`,
    },
    step: calc.howToSteps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE.url}/calculators/${calc.slug}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
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

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webPageSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.title,
    description: opts.description,
    url: opts.url,
    inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', url: SITE.url, name: SITE.name },
    about: {
      '@type': 'Thing',
      name: 'Trading Calculators',
      description: 'Free professional calculators for forex, stocks, crypto, futures, and prop firm traders.',
    },
    datePublished: opts.datePublished ?? '2026-08-07T00:00:00.000Z',
    dateModified:  opts.dateModified  ?? '2026-09-07T00:00:00.000Z',
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
      description: AUTHOR.description,
      knowsAbout: ['Forex trading', 'Risk management', 'Position sizing', 'Trading calculators'],
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE.url}/opengraph-image`,
      width: 1200,
      height: 630,
    },
  };
}

export function itemListSchema(items: { name: string; url: string; description: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Trading Calculators',
    description: 'Complete list of free trading calculators for forex, stocks, crypto, futures, and prop firm traders.',
    url: `${SITE.url}/calculators`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      description: item.description,
    })),
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    foundingDate: '2026',
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE.url}/calculators?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function articleSchema(calc: CalculatorMeta, dateModified?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: calc.title,
    description: calc.description,
    url: `${SITE.url}/calculators/${calc.slug}`,
    datePublished: PUBLISHED,
    dateModified: dateModified ? `${dateModified}T00:00:00.000Z` : PUBLISHED,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
      description: AUTHOR.description,
      knowsAbout: ['Forex trading', 'Risk management', 'Position sizing', 'Trading calculators'],
    },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    keywords: calc.keywords.join(', '),
    articleBody: calc.longDescription,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE.url}/calculators/${calc.slug}`,
    },
  };
}
