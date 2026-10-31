import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <TrendingUp className="w-10 h-10 text-amber-500 mb-4" />
      <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">The calculator you&apos;re looking for doesn&apos;t exist yet.</p>
      <Link href="/calculators" className="btn-primary">Browse All Calculators</Link>
    </div>
  );
}
