'use client';

import { CalculatorForm, inputError } from './CalculatorForm';

import { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

const PAIRS = [
  'EUR/USD','GBP/USD','USD/JPY','USD/CHF','AUD/USD','USD/CAD','NZD/USD',
  'EUR/GBP','EUR/JPY','GBP/JPY','Custom',
];

type AssetMode = 'forex' | 'stocks' | 'crypto';

function fmt(n: number, dec = 2) {
  if (!isFinite(n)) return '—';
  return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

export default function PositionSizeCalc() {
  const [mode, setMode]         = useState<AssetMode>('forex');
  const [balance, setBalance]   = useState('10000');
  const [risk, setRisk]         = useState('1');
  const [stopLoss, setStopLoss] = useState('20');
  const [pair, setPair]         = useState('EUR/USD');
  const [pipVal, setPipVal]     = useState('10');    // $ per pip per standard lot
  const [price, setPrice]       = useState('50');    // stock price
  const [cryptoPrice, setCryptoPrice] = useState('30000');

  const reset = useCallback(() => {
    setBalance('10000'); setRisk('1'); setStopLoss('20');
    setPair('EUR/USD'); setPipVal('10'); setPrice('50'); setCryptoPrice('30000');
  }, []);

  // ─── Calculations ───────────────────────────────────────────────────────
  const bal  = Number(balance);
  const rPct = Number(risk);
  const sl   = Number(stopLoss);
  const pv   = Number(pipVal);
  const px   = Number(price);
  const cp   = Number(cryptoPrice);

  const riskAmt = bal * (rPct / 100);

  let result: { label: string; value: string; unit: string }[] = [];

  if (mode === 'forex') {
    const lots = sl > 0 ? Math.floor(riskAmt / (sl * pv) * 100 + 1e-10) / 100 : 0;
    const miniLots  = lots * 10;
    const microLots = lots * 100;
    const units     = lots * 100000;
    result = [
      { label: 'Risk Amount',    value: fmt(riskAmt),   unit: 'USD' },
      { label: 'Standard Lots',  value: fmt(lots, 2),   unit: 'lots' },
      { label: 'Mini Lots',      value: fmt(miniLots, 2), unit: 'mini' },
      { label: 'Micro Lots',     value: fmt(microLots, 1), unit: 'micro' },
      { label: 'Units',          value: fmt(units, 0),  unit: 'units' },
    ];
  } else if (mode === 'stocks') {
    const slAmt  = px > 0 ? sl / px * 100 : 0;  // stop loss as % of price
    const shares = sl > 0 && px > 0 ? Math.floor(riskAmt / sl + 1e-10) : 0;
    const total  = shares * px;
    result = [
      { label: 'Risk Amount',  value: fmt(riskAmt),  unit: 'USD' },
      { label: 'Shares to Buy', value: fmt(shares, 0), unit: 'shares' },
      { label: 'Total Exposure', value: fmt(total, 2), unit: 'USD' },
      { label: 'Stop Loss %',  value: fmt(slAmt, 2),  unit: '%' },
    ];
  } else {
    const slAmt = sl;
    const coins  = slAmt > 0 ? Math.floor(riskAmt / slAmt * 1e6 + 1e-8) / 1e6 : 0;
    const total  = coins * cp;
    result = [
      { label: 'Risk Amount',  value: fmt(riskAmt),  unit: 'USD' },
      { label: 'Coins/Units',  value: fmt(coins, 6),  unit: 'units' },
      { label: 'Total Cost',   value: fmt(total, 2),  unit: 'USD' },
    ];
  }

  const error = inputError([['balance', balance, 0.00000001], ['risk percent', risk, 0, 100], ['stop distance', stopLoss, 0.00000001], ...(mode === 'forex' ? [['USD pip value', pipVal, 0.00000001] as [string, string, number]] : mode === 'stocks' ? [['share price', price, 0.00000001] as [string, string, number]] : [['coin price', cryptoPrice, 0.00000001] as [string, string, number]])]);

  return (
    <CalculatorForm error={error}>
      {/* Mode selector */}
      <div>
        <p className="section-label mb-2">Asset Class</p>
        <div className="flex gap-2 flex-wrap">
          {(['forex','stocks','crypto'] as AssetMode[]).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                mode === m
                  ? 'bg-amber-500 border-amber-500 text-white'
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-amber-400'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Account balance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Account Balance (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="10000" min="0" />
          </div>
        </div>

        {/* Risk % */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Risk Per Trade (%)
          </label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={risk} onChange={e => setRisk(e.target.value)} placeholder="1" min="0.01" max="100" step="0.1" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>

        {/* Mode-specific inputs */}
        {mode === 'forex' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Currency Pair
              </label>
              <select className="calc-select" aria-label="Currency pair" value={pair} onChange={e => setPair(e.target.value)}>
                {PAIRS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stop Loss (pips)
              </label>
              <input className="calc-input" type="number" value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder="20" min="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pip Value per Std Lot (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input className="calc-input pl-7" type="number" value={pipVal} onChange={e => setPipVal(e.target.value)} placeholder="10" min="0" step="0.01" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Enter the current USD pip value. Pair selection is a label only; it does not update this input. Forex results round down to 0.01 lots; check your broker’s minimum and step.</p>
            </div>
          </>
        )}

        {mode === 'stocks' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock Entry Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input className="calc-input pl-7" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="50" min="0" step="0.01" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stop Loss Distance (USD per share)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input className="calc-input pl-7" type="number" value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder="2" min="0" step="0.01" />
              </div>
            </div>
          </>
        )}

        {mode === 'crypto' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Coin Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input className="calc-input pl-7" type="number" value={cryptoPrice} onChange={e => setCryptoPrice(e.target.value)} placeholder="30000" min="0" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stop Loss Distance (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input className="calc-input pl-7" type="number" value={stopLoss} onChange={e => setStopLoss(e.target.value)} placeholder="500" min="0" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Results */}
      <button onClick={reset} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-amber-500 transition-colors">
        <RefreshCw className="w-3.5 h-3.5" /> Reset
      </button>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <p className="section-label">Results</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {result.map(r => (
            <div key={r.label}>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">{r.label}</p>
              <p className="font-display text-xl font-bold text-amber-500 dark:text-amber-400 tabular">{r.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{r.unit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Risk Level</span>
          <span>{rPct}% of account</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              rPct <= 1 ? 'bg-green-500' : rPct <= 2 ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(rPct * 10, 100)}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Planned price risk before costs and slippage. Choose a budget appropriate to your circumstances and combined open positions.
        </p>
      </div>
    </CalculatorForm>
  );
}
