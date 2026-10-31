import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE.name}`,
  description: `Privacy policy for TradeCalc — what data we collect, how we use it, and your rights.`,
  alternates: { canonical: `${SITE.url}/privacy` },
  robots: { index: false },
};

const LAST_UPDATED = '2026-10-30';

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">Privacy Policy</span>
      </nav>

      <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="space-y-8 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">1. Who we are</h2>
          <p>
            TradeCalc ({SITE.url}) is a free collection of trading calculators and educational guides for forex, stock, and crypto traders. The site is operated by Foysal Mostafa.
          </p>
          <p className="mt-2">
            For privacy questions, contact us at: <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">tradecalcapp.com/contact</Link>.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">2. Data we collect</h2>
          <p className="mb-3">TradeCalc does not require an account. If you email us, we receive your email address and the information you choose to include. Our hosting provider may process technical request data, such as IP addresses, to deliver and secure the website.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-gray-800 dark:text-gray-200">Calculator inputs</strong> — Numbers you enter into calculators (account balance, risk %, lot size, etc.) are processed entirely in your browser. The application does not transmit calculator inputs to a server.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Usage data</strong> — Google Analytics and Microsoft Clarity are currently disabled. This version does not load their analytics or session-recording scripts. If enabled in the future, we will update this policy and configure appropriate consent controls first.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Advertising data</strong> — Google AdSense is not currently enabled. If advertising is introduced, third-party vendors, including Google, may use cookies based on prior visits to this or other websites. Google and its partners may use those cookies to personalize advertising. We will update vendor disclosures and configure applicable consent controls before enabling ads. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">Google&apos;s Privacy Policy</a> for details.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">3. Cookies and local storage</h2>
          <p className="mb-3">The current storage and tracking arrangements are:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-gray-800 dark:text-gray-200">Theme preference</strong> — Your light or dark theme choice is saved in browser local storage, not a cookie. You can remove it by clearing site data in your browser.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Analytics cookies</strong> — Google Analytics and Microsoft Clarity are disabled; this application does not currently set their tracking cookies. Cookies from earlier visits may remain until they expire or you clear site data.</li>
            <li><strong className="text-gray-800 dark:text-gray-200">Advertising cookies</strong> — AdSense is not currently enabled. If introduced, advertising cookies and available choices will be disclosed before activation.</li>
          </ul>
          <p className="mt-3">You can opt out of Google Analytics via the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">Google Analytics Opt-out Browser Add-on</a>, and manage ad personalisation at <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">adssettings.google.com</a>.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">4. How we use data</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To understand which calculators and articles are most useful, so we can improve the site</li>
            <li>To respond to messages you send us</li>
            <li>To diagnose technical issues</li>
          </ul>
          <p className="mt-3">We do not sell your data to third parties.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">5. Third-party links</h2>
          <p>Some blog posts contain links to broker websites and external resources. TradeCalc has no control over the privacy practices of those sites. We encourage you to review their privacy policies before providing any personal information.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">6. Your rights</h2>
          <p className="mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Access personal data we hold about you</li>
            <li>Request deletion of personal data</li>
            <li>Object to processing of your data</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">contact us</Link>.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">7. Children</h2>
          <p>TradeCalc is not directed at children under the age of 13, and we do not knowingly collect data from children.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">8. Changes to this policy</h2>
          <p>We may update this policy from time to time. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision. Where consent is required for a new use of data, we will request it before that use begins.</p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">9. Contact</h2>
          <p>
            If you have any questions about this privacy policy, please <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">contact us</Link>.
          </p>
        </section>

      </div>
    </main>
  );
}
