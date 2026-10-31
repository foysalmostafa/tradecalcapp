import Link from 'next/link';
import { ArrowRight, TrendingUp, DollarSign, Activity, Repeat, BarChart2, Building2 } from 'lucide-react';
import { CalculatorMeta } from '@/lib/calculators';

export const ASSET_BADGE: Record<string, string> = {
  forex:   'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  stocks:  'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  crypto:  'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  futures: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
};

const CATEGORY_ICON = {
  risk:     <Activity className="w-4 h-4" />,
  profit:   <DollarSign className="w-4 h-4" />,
  position: <TrendingUp className="w-4 h-4" />,
  utility:  <Repeat className="w-4 h-4" />,
  futures:  <BarChart2 className="w-4 h-4" />,
  propfirm: <Building2 className="w-4 h-4" />,
};

const CATEGORY_COLOR = {
  risk:     'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  profit:   'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  position: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  utility:  'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  futures:  'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
  propfirm: 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400',
};

interface Props {
  calc: CalculatorMeta;
}

export default function CalculatorCard({ calc }: Props) {
  return (
    <Link
      href={`/calculators/${calc.slug}`}
      className="card p-5 flex flex-col gap-3 hover:border-amber-400 dark:hover:border-amber-500 group transition-colors"
    >
      {/* Icon + category */}
      <div className="flex items-center justify-between">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${CATEGORY_COLOR[calc.category]}`}>
          {CATEGORY_ICON[calc.category]}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {calc.shortTitle} Calculator
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{calc.description}</p>
      </div>

      {/* Asset badges */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {calc.assets.map(a => (
          <span key={a} className={`text-2xs px-2 py-0.5 rounded font-medium ${ASSET_BADGE[a]}`}>
            {a.charAt(0).toUpperCase() + a.slice(1)}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 group-hover:gap-2 transition-all">
        Open Calculator
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
