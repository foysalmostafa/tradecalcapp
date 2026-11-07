'use client';

import { CalculatorForm, inputError } from './CalculatorForm';

import { useState } from 'react';

const PAIRS: Record<string, { pipSize: number; quoteIsUSD: boolean; note: string }> = {
  'EUR/USD': { pipSize: 0.0001, quoteIsUSD: true,  note: '$10 / std lot' },
  'GBP/USD': { pipSize: 0.0001, quoteIsUSD: true,  note: '$10 / std lot' },
  'AUD/USD': { pipSize: 0.0001, quoteIsUSD: true,  note: '$10 / std lot' },
  'NZD/USD': { pipSize: 0.0001, quoteIsUSD: true,  note: '$10 / std lot' },
  'USD/JPY': { pipSize: 0.01,   quoteIsUSD: false, note: 'Requires current JPY per USD rate' },
  'USD/CHF': { pipSize: 0.0001, quoteIsUSD: false, note: '≈$10.xx / std lot' },
  'USD/CAD': { pipSize: 0.0001, quoteIsUSD: false, note: '≈$7.xx / std lot' },
  'EUR/JPY': { pipSize: 0.01,   quoteIsUSD: false, note: 'Cross pair' },
  'GBP/JPY': { pipSize: 0.01,   quoteIsUSD: false, note: 'Cross pair' },
  'EUR/GBP': { pipSize: 0.0001, quoteIsUSD: false, note: 'Cross pair' },
  'XAU/USD': { pipSize: 0.01,   quoteIsUSD: true,  note: 'Gold: $1 per std lot' },
};

const LOT_SIZES = [
  { label: 'Standard (1.00)', value: 100000 },
  { label: 'Mini (0.10)',     value: 10000 },
  { label: 'Micro (0.01)',    value: 1000 },
  { label: 'Nano (0.001)',    value: 100 },
];

function fmt(n: number, dec = 4) {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function PipValueCalc() {
  const [pair,     setPair]     = useState('EUR/USD');
  const [lotSize,  setLotSize]  = useState('100000');
  const [exRate,   setExRate]   = useState('1.0850');  // current exchange rate
  const [numPips,  setNumPips]  = useState('10');

  const pairData = PAIRS[pair] || PAIRS['EUR/USD'];
  const lot      = Number(lotSize);
  const rate     = Number(exRate);
  const pips     = Number(numPips);

  // Pip value in quote currency = pipSize × lot
  // Pip value in USD depends on quote currency
  const pipValueQuote = pairData.pipSize * lot * (pair === 'XAU/USD' ? 0.001 : 1);
  const pipValueUSD   = pairData.quoteIsUSD
    ? pipValueQuote
    : pipValueQuote / rate;

  const totalValue = pipValueUSD * pips;

  const error = inputError([['lot units', lotSize, 1], ['pips', numPips, 0], ...(pairData.quoteIsUSD ? [] : [['quote units per USD', exRate, 0.00000001] as [string, string, number]])]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Pair</label>
          <select className="calc-select" aria-label="Currency pair" value={pair} onChange={e => { setPair(e.target.value); setExRate(e.target.value.endsWith('/JPY') ? '150' : e.target.value === 'EUR/GBP' ? '0.8' : e.target.value === 'USD/CHF' ? '0.9' : e.target.value === 'USD/CAD' ? '1.35' : '1'); }}>
            {Object.keys(PAIRS).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <p className="text-xs text-gray-400 mt-1">{pairData.note}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
          <select className="calc-select" aria-label="Lot size" value={lotSize} onChange={e => setLotSize(e.target.value)}>
            {LOT_SIZES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {pairData.quoteIsUSD ? 'Conversion not needed for USD quote' : `Quote-currency units per 1 USD (${pair.split('/')[1]} per USD)`}
          </label>
          <input
            className="calc-input"
            type="number"
            value={exRate}
            disabled={pairData.quoteIsUSD}
            onChange={e => setExRate(e.target.value)}
            step="0.0001"
            placeholder="1.0850"
          />
          {!pairData.quoteIsUSD && (
            <p className="text-xs text-gray-400 mt-1">Enter quote units per USD, not the pair price: JPY example 150; GBP example 0.80. These are hypothetical, not live quotes.</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Pips</label>
          <input className="calc-input" type="number" value={numPips} onChange={e => setNumPips(e.target.value)} placeholder="10" min="0" />
        </div>
      </div>

      {/* Results */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Value per 1 Pip</p>
            <p className="font-display text-2xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(pipValueUSD, 4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Value for {numPips} Pips</p>
            <p className="font-display text-2xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(totalValue, 2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Pip Size</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{pairData.pipSize}</p>
          </div>
        </div>

        {/* Quick reference */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">All lot sizes for {pair}:</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LOT_SIZES.map(l => {
              const v = (pairData.pipSize * l.value * (pair === 'XAU/USD' ? 0.001 : 1)) / (pairData.quoteIsUSD ? 1 : rate);
              return (
                <div key={l.value} className="text-xs">
                  <span className="text-gray-400">{l.label.split(' ')[0]}</span>
                  <br />
                  <span className="font-semibold text-gray-700 dark:text-gray-300 tabular">${fmt(v, v < 0.01 ? 4 : 2)}/pip</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500">Gold assumes 100 ounces per standard lot and a $0.01 pip. Currency presets are illustrative; confirm contract specifications and conversion rates with your broker.</p>

    </CalculatorForm>
  );
}
