'use client';

import { CalculatorForm, NumberField, inputError } from './CalculatorForm';

import { useState } from 'react';

type Mode = 'forex' | 'stocks' | 'crypto';
type Direction = 'long' | 'short';

function fmt(n: number, dec = 2) {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function ProfitLossCalc() {
  const [pipSize, setPipSize] = useState('0.0001');
  const [mode,      setMode]      = useState<Mode>('forex');
  const [direction, setDirection] = useState<Direction>('long');
  const [entry,     setEntry]     = useState('1.0850');
  const [exit,      setExit]      = useState('1.1050');
  const [lots,      setLots]      = useState('1');
  const [shares,    setShares]    = useState('100');
  const [coins,     setCoins]     = useState('0.5');
  const [pipVal,    setPipVal]    = useState('10');
  const [commission, setCommission] = useState('0');

  const en = Number(entry);
  const ex = Number(exit);
  const pv = Number(pipVal);
  const cm = Number(commission);

  let pnl = 0;
  let pips = 0;
  let extraInfo: { label: string; value: string }[] = [];

  if (mode === 'forex') {
    const l  = Number(lots);
    const diff = direction === 'long' ? ex - en : en - ex;
    pips = diff / Number(pipSize);  // simplified: works for major pairs
    pnl  = pips * pv * l - cm;
    extraInfo = [
      { label: 'Pips', value: fmt(pips, 1) },
      { label: 'Lots', value: fmt(l, 2) },
      { label: 'Gross P&L', value: `$${fmt(pips * pv * l, 2)}` },
    ];
  } else if (mode === 'stocks') {
    const sh = Number(shares);
    const diff = direction === 'long' ? ex - en : en - ex;
    pnl = diff * sh - cm;
    const pct = en > 0 ? (diff / en) * 100 : 0;
    extraInfo = [
      { label: 'Per Share', value: `$${fmt(diff, 4)}` },
      { label: 'Shares', value: fmt(sh, 0) },
      { label: 'Return %', value: `${fmt(pct, 2)}%` },
    ];
  } else {
    const co = Number(coins);
    const diff = direction === 'long' ? ex - en : en - ex;
    pnl = diff * co - cm;
    const pct = en > 0 ? (diff / en) * 100 : 0;
    extraInfo = [
      { label: 'Per Coin', value: `$${fmt(diff, 4)}` },
      { label: 'Coins', value: fmt(co, 6) },
      { label: 'Return %', value: `${fmt(pct, 2)}%` },
    ];
  }

  const isProfit = pnl > 0;
  const isLoss   = pnl < 0;

  const error = inputError([['entry', entry, 0.00000001], ['exit', exit, 0], ['fees', commission, 0], ...(mode === 'forex' ? [['lots', lots, 0], ['pip value', pipVal, 0.00000001], ['pip size', pipSize, 0.00000001]] : mode === 'stocks' ? [['shares', shares, 0]] : [['coins', coins, 0]]) as [string, string, number][]]);

  return (
    <CalculatorForm error={error}>
      {mode === 'forex' && <NumberField label="Price change per pip (0.01 for JPY)" value={pipSize} onChange={setPipSize} min={0.00000001} />}
      <p className="text-xs text-gray-500">Use actual entry and exit fills; spread is already reflected in those prices. Fees are the total for the whole trade. Forex pip value must be in USD per standard lot.</p>
      {/* Mode + Direction */}
      <div className="flex flex-wrap gap-4">
        <div>
          <p className="section-label mb-2">Asset</p>
          <div className="flex gap-2">
            {(['forex','stocks','crypto'] as Mode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  mode === m ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-amber-400'
                }`}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="section-label mb-2">Direction</p>
          <div className="flex gap-2">
            {(['long','short'] as Direction[]).map(d => (
              <button
                key={d}
                onClick={() => setDirection(d)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                  direction === d
                    ? d === 'long' ? 'bg-green-500 border-green-500 text-white' : 'bg-red-500 border-red-500 text-white'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-amber-400'
                }`}
              >
                {d === 'long' ? '↑ Long' : '↓ Short'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entry Price</label>
          <input className="calc-input" type="number" value={entry} onChange={e => setEntry(e.target.value)} step="0.0001" placeholder="1.0850" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exit Price</label>
          <input className="calc-input" type="number" value={exit} onChange={e => setExit(e.target.value)} step="0.0001" placeholder="1.1050" />
        </div>

        {mode === 'forex' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
              <input className="calc-input" type="number" value={lots} onChange={e => setLots(e.target.value)} step="0.01" placeholder="1" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pip Value per Lot (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input className="calc-input pl-7" type="number" value={pipVal} onChange={e => setPipVal(e.target.value)} step="0.01" placeholder="10" />
              </div>
            </div>
          </>
        )}
        {mode === 'stocks' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Shares</label>
            <input className="calc-input" type="number" value={shares} onChange={e => setShares(e.target.value)} placeholder="100" min="0" />
          </div>
        )}
        {mode === 'crypto' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Coins/Units</label>
            <input className="calc-input" type="number" value={coins} onChange={e => setCoins(e.target.value)} step="0.0001" placeholder="0.5" />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Commission / Fees (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={commission} onChange={e => setCommission(e.target.value)} placeholder="0" step="0.01" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className={`rounded-xl p-5 border ${
        isProfit ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
        : isLoss  ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
        : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
      }`}>
        <p className="section-label mb-4">Net Result</p>
        <div className="flex items-end gap-2 mb-4">
          <span className={`font-display text-4xl font-bold tabular ${
            isProfit ? 'text-green-600 dark:text-green-400'
            : isLoss  ? 'text-red-600 dark:text-red-400'
            : 'text-gray-600 dark:text-gray-300'
          }`}>
            {pnl >= 0 ? '+' : ''}{fmt(pnl, 2)}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm mb-1">USD</span>
          {isProfit && <span className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">PROFIT ✓</span>}
          {isLoss   && <span className="text-red-600 dark:text-red-400 text-sm font-medium mb-1">LOSS ✗</span>}
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          {extraInfo.map(i => (
            <div key={i.label}>
              <p className="text-xs text-gray-400 mb-0.5">{i.label}</p>
              <p className="font-semibold text-gray-700 dark:text-gray-200 tabular">{i.value}</p>
            </div>
          ))}
        </div>
      </div>
    </CalculatorForm>
  );
}
