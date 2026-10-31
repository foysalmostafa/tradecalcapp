import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CalculatorMeta } from '@/lib/calculators';
import { ASSET_BADGE } from '@/components/CalculatorCard';

interface Props {
  calculators: CalculatorMeta[];
  title?: string;
}

export default function RelatedCalculators({ calculators, title = 'Related Calculators' }: Props) {
  if (!calculators.length) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-lg font-display font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {calculators.map(calc => (
          <Link
            key={calc.slug}
            href={`/calculators/${calc.slug}`}
            className="card p-4 flex items-start gap-3 hover:border-amber-400 dark:hover:border-amber-500 group transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {calc.shortTitle} Calculator
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{calc.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {calc.assets.map(a => (
                  <span key={a} className={`${ASSET_BADGE[a]} text-2xs px-1.5 py-0.5 rounded font-medium`}>
                    {a.charAt(0).toUpperCase() + a.slice(1)}
                  </span>
                ))}
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-500 transition-colors flex-shrink-0 mt-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
