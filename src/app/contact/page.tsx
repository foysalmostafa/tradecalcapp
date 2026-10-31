import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, Bug, AlertTriangle } from 'lucide-react';
import { SITE } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description: `Get in touch with the TradeCalc team. Report a calculator error, suggest a feature, or ask a question.`,
  alternates: { canonical: `${SITE.url}/contact` },
  robots: { index: false },
};

const reasons = [
  {
    icon: Bug,
    title: 'Calculator Error',
    body: 'Found a calculation that doesn\'t match your broker? Please include the pair, account currency, lot size, and what result you expected.',
  },
  {
    icon: MessageSquare,
    title: 'Feature Request',
    body: 'Want a calculator or guide that doesn\'t exist yet? Describe your use case and we\'ll consider it for a future update.',
  },
  {
    icon: AlertTriangle,
    title: 'Content Issue',
    body: 'Spotted incorrect information in a blog post or guide? We take accuracy seriously — please let us know so we can fix it.',
  },
  {
    icon: Mail,
    title: 'General Question',
    body: 'Anything else — trading questions, partnership enquiries, or general feedback. We read every message.',
  },
];

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">Contact</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
        Have a question about a calculator, found an error, or want to suggest something? Use the email below — I personally read and respond to every message.
      </p>

      {/* Email card */}
      <div className="card p-6 border-amber-200 dark:border-amber-800/50 border mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Email</p>
        <a
          href="mailto:contact.tradecalc@gmail.com"
          className="font-display text-xl font-bold text-amber-600 dark:text-amber-400 hover:underline"
        >
          contact.tradecalc@gmail.com
        </a>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Typical response time: 1–3 business days</p>
      </div>

      {/* Common reasons */}
      <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4">What people contact us about</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {reasons.map(({ icon: Icon, title, body }) => (
          <div key={title} className="card p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-md bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <Icon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 dark:text-gray-600 text-center leading-relaxed">
        TradeCalc is a one-person project. We don&apos;t offer personalised financial or investment advice. For trading questions beyond calculator usage, consult a licensed financial adviser.
      </p>
    </main>
  );
}
