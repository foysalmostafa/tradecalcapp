import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { breadcrumbSchema } from '@/lib/schema';
import { SITE } from '@/lib/seo';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: Props) {
  const schemaItems = [
    { name: 'Home', url: SITE.url },
    ...items.map(item => ({
      name: item.label,
      url: item.href ? `${SITE.url}${item.href}` : SITE.url,
    })),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(schemaItems)) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 flex-wrap">
        <Link href="/" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
          Home
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-600 dark:text-gray-300 font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
