import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: Props) {
  return (
    <>
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
