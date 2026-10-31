import type { MetadataRoute } from 'next';
import { CALCULATORS } from '@/lib/calculators';
import { PUBLISHED_POSTS } from '@/lib/blog';
import { SITE } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Home
    { url: SITE.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },

    // Main sections
    { url: `${SITE.url}/calculators`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },

    // Static pages
    { url: `${SITE.url}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE.url}/privacy`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    // Note: /contact is intentionally excluded — page is marked noindex

    // All calculators (dynamic — count from CALCULATORS array)
    ...CALCULATORS.map(calc => ({
      url: `${SITE.url}/calculators/${calc.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // All published blog posts
    ...PUBLISHED_POSTS.map(post => ({
      url: `${SITE.url}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
