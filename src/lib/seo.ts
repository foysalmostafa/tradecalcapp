import { CalculatorMeta } from './calculators';

export const SITE = {
  name: 'TradeCalc',
  tagline: 'Free Trading Calculators for Forex, Stocks & Crypto',
  url: 'https://tradecalcapp.com',
  description: 'Free trading calculators for forex, stocks, crypto and futures. Calculate position size, pip value, profit/loss, and more — instantly, no sign-up required.',
  twitterHandle: '@tradecalc',
};

export const AUTHOR = {
  name: 'Foysal Mostafa',
  url: 'https://tradecalcapp.com/about',
  description: 'Forex trader and software developer. Built TradeCalc to replace the manual spreadsheets I used for position sizing and risk management in my own trading.',
};

export function buildCalculatorMeta(calc: CalculatorMeta) {
  return {
    title: `${calc.title} | ${SITE.name}`,
    description: calc.description,
    canonical: `${SITE.url}/calculators/${calc.slug}`,
    openGraph: {
      title: calc.title,
      description: calc.description,
      url: `${SITE.url}/calculators/${calc.slug}`,
      type: 'website',
    },
    keywords: calc.keywords.join(', '),
  };
}

export function buildPageTitle(title: string) {
  return `${title} | ${SITE.name}`;
}
