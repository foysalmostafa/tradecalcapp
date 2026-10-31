'use client';

import { useState } from 'react';
import { CalculatorForm, NumberField, inputError } from './CalculatorForm';

function fmt(n: number, dec = 2) {
  if (!isFinite(n) || isNaN(n)) return '—';
  return n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

// ─── Margin Calculator ───────────────────────────────────────────────────────
export function MarginCalc() {
  const [lotSize,   setLotSize]   = useState('1');
  const [price,     setPrice]     = useState('1.0850');
  const [leverage,  setLeverage]  = useState('100');
  const [contracts, setContracts] = useState('100000');

  const lot  = Number(lotSize);
  const pr   = Number(price);
  const lev  = Number(leverage);
  const cont = Number(contracts);

  const notional = lot * cont * pr;
  const margin   = notional / lev;

  const error = inputError([["lot Size", lotSize, 0, 1000000000000.0], ["price", price, 0, 1000000000000.0], ["leverage", leverage, 1, 1000000.0], ["contracts", contracts, 1, 1000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
          <input className="calc-input" type="number" value={lotSize} onChange={e => setLotSize(e.target.value)} step="0.01" placeholder="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contract Size (units/lot)</label>
          <select className="calc-select" value={contracts} onChange={e => setContracts(e.target.value)}>
            <option value="100000">100,000 (Forex standard)</option>
            <option value="10000">10,000 (Forex mini)</option>
            <option value="1000">1,000 (Forex micro)</option>
            <option value="1">1 (Stocks / Crypto)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Market Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={price} onChange={e => setPrice(e.target.value)} step="0.0001" placeholder="1.0850" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leverage (e.g. 100 for 1:100)</label>
          <input className="calc-input" type="number" value={leverage} onChange={e => setLeverage(e.target.value)} placeholder="100" min="1" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Required Margin</p>
            <p className="font-display text-3xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(margin, 2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Notional Value</p>
            <p className="font-display text-3xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(notional, 2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Margin %</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300 tabular">{fmt(100 / lev, 2)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Leverage Ratio</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300">1:{lev}</p>
          </div>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Risk/Reward Calculator ──────────────────────────────────────────────────
export function RiskRewardCalc() {
  const [entry, setEntry] = useState('1.0850');
  const [sl,    setSl]    = useState('1.0800');
  const [tp,    setTp]    = useState('1.0950');

  const en = Number(entry);
  const s  = Number(sl);
  const t  = Number(tp);

  const risk   = Math.abs(en - s);
  const reward = Math.abs(t - en);
  const rr     = risk > 0 ? reward / risk : 0;
  const winRate = rr > 0 ? (1 / (1 + rr)) * 100 : 0;

  const rrColor = rr >= 2 ? 'text-green-600 dark:text-green-400' : rr >= 1 ? 'text-amber-500 dark:text-amber-400' : 'text-red-600 dark:text-red-400';

  const error = inputError([["entry", entry, 1e-12, 1000000000000.0], ["sl", sl, 1e-12, 1000000000000.0], ["tp", tp, 1e-12, 1000000000000.0]]) || ((s - en) * (t - en) >= 0 ? 'Stop and target must be on opposite sides of entry.' : undefined);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entry Price</label>
          <input className="calc-input" type="number" value={entry} onChange={e => setEntry(e.target.value)} step="0.0001" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stop Loss</label>
          <input className="calc-input border-red-200 dark:border-red-900 focus:ring-red-400" type="number" value={sl} onChange={e => setSl(e.target.value)} step="0.0001" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Take Profit</label>
          <input className="calc-input border-green-200 dark:border-green-900 focus:ring-green-400" type="number" value={tp} onChange={e => setTp(e.target.value)} step="0.0001" />
        </div>
      </div>

      {/* Visual R:R bar */}
      <div>
        <div className="flex gap-0 h-6 rounded-lg overflow-hidden text-xs font-medium">
          <div
            className="bg-red-500/80 flex items-center justify-center text-white"
            style={{ width: `${risk > 0 || reward > 0 ? (risk / (risk + reward)) * 100 : 50}%` }}
          >
            Risk
          </div>
          <div
            className="bg-green-500/80 flex items-center justify-center text-white"
            style={{ width: `${risk > 0 || reward > 0 ? (reward / (risk + reward)) * 100 : 50}%` }}
          >
            Reward
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">R:R Ratio</p>
            <p className={`font-display text-3xl font-bold tabular ${rrColor}`}>1:{fmt(rr, 2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Risk (pts)</p>
            <p className="font-display text-2xl font-bold text-red-500 dark:text-red-400 tabular">{fmt(risk, 4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Reward (pts)</p>
            <p className="font-display text-2xl font-bold text-green-500 dark:text-green-400 tabular">{fmt(reward, 4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Min Win Rate to Break Even</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(winRate, 1)}%</p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          {'Planned payoff before costs. Profitability also depends on realized win rate and execution.'}
        </p>
      </div>
    </CalculatorForm>
  );
}

// ─── Compounding Calculator ──────────────────────────────────────────────────
export function CompoundingCalc() {
  const [startBal,  setStartBal]  = useState('10000');
  const [monthly,   setMonthly]   = useState('5');
  const [months,    setMonths]    = useState('24');
  const [withdraw,  setWithdraw]  = useState('0');

  const bal  = Number(startBal);
  const rate = parseFloat(monthly)  / 100 || 0;
  const mo   = parseInt(months)     || 0;
  const wd   = Number(withdraw);

  const rows: { month: number; balance: number; gain: number; total: number }[] = [];
  let current = bal;
  let withdrawals = 0;
  for (let i = 1; i <= Math.min(mo, 120); i++) {
    const gain    = current * rate;
    const paid = Math.min(wd, Math.max(0, current + gain));
    withdrawals += paid;
    const afterWd = Math.max(current + gain - paid, 0);
    rows.push({ month: i, balance: afterWd, gain, total: afterWd - bal });
    current = afterWd;
  }

  const finalBal = rows[rows.length - 1]?.balance ?? bal;
  const totalGain = finalBal + withdrawals - bal;
  const totalReturn = bal > 0 ? (totalGain / bal) * 100 : 0;

  const error = inputError([["start Bal", startBal, 1e-12, 1000000000000.0], ["monthly", monthly, -100, 1000], ["months", months, 1, 120, true], ["withdraw", withdraw, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Starting Balance (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={startBal} onChange={e => setStartBal(e.target.value)} placeholder="10000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Return (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={monthly} onChange={e => setMonthly(e.target.value)} step="0.1" placeholder="5" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Months</label>
          <input className="calc-input" type="number" value={months} onChange={e => setMonths(e.target.value)} placeholder="24" min="1" max="120" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Withdrawal (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={withdraw} onChange={e => setWithdraw(e.target.value)} placeholder="0" />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results after {months} months</p>
        <p className="text-xs text-gray-500 mb-3">Withdrawn: ${fmt(withdrawals, 2)}. Total gain includes withdrawals. Constant-return scenario; not a forecast.</p>
        <div className="grid grid-cols-3 gap-5 mb-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Final Balance</p>
            <p className="font-display text-2xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(finalBal, 0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Gain</p>
            <p className="font-display text-2xl font-bold text-green-600 dark:text-green-400 tabular">{totalGain >= 0 ? '+' : ''}${fmt(totalGain, 0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Return</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(totalReturn, 1)}%</p>
          </div>
        </div>

        {/* Growth table — first 12 & last row */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-400 border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-1 pr-3">Month</th>
                <th className="text-right py-1 pr-3 tabular">Monthly Gain</th>
                <th className="text-right py-1 tabular">Balance</th>
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 12).map(r => (
                <tr key={r.month} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-1 pr-3 text-gray-500">{r.month}</td>
                  <td className="py-1 pr-3 text-right text-green-600 dark:text-green-400 tabular">{r.gain >= 0 ? '+' : ''}${fmt(r.gain, 2)}</td>
                  <td className="py-1 text-right font-medium text-gray-700 dark:text-gray-300 tabular">${fmt(r.balance, 2)}</td>
                </tr>
              ))}
              {mo > 12 && (
                <tr className="border-b border-gray-100 dark:border-gray-800 opacity-50">
                  <td colSpan={3} className="py-1 text-center text-gray-400">· · ·</td>
                </tr>
              )}
              {mo > 12 && rows[rows.length - 1] && (
                <tr className="font-semibold">
                  <td className="py-1 pr-3 text-gray-700 dark:text-gray-300">{rows[rows.length - 1].month}</td>
                  <td className="py-1 pr-3 text-right text-green-600 dark:text-green-400 tabular">{rows[rows.length - 1].gain >= 0 ? '+' : ''}${fmt(rows[rows.length - 1].gain, 2)}</td>
                  <td className="py-1 text-right text-amber-500 dark:text-amber-400 tabular">${fmt(rows[rows.length - 1].balance, 2)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Drawdown Calculator ─────────────────────────────────────────────────────
export function DrawdownCalc() {
  const [startBal, setStartBal] = useState('10000');
  const [drawdown, setDrawdown] = useState('30');
  const [lossPerTrade, setLossPerTrade] = useState('2');

  const bal = Number(startBal);
  const dd  = parseFloat(drawdown) / 100 || 0;
  const lt  = parseFloat(lossPerTrade) / 100 || 0;

  const afterDD  = bal * (1 - dd);
  const lostAmt  = bal - afterDD;
  const recovery = dd === 1 ? Infinity : (dd / (1 - dd)) * 100;
  // consecutive losses
  const consec = dd === 0 ? 0 : lt === 1 ? 1 : lt === 0 || dd === 1 ? Infinity : Math.ceil(Math.log1p(-dd) / Math.log1p(-lt) - 1e-10);

  const ddColor = dd <= 0.1 ? 'text-green-600 dark:text-green-400' : dd <= 0.25 ? 'text-amber-500 dark:text-amber-400' : 'text-red-600 dark:text-red-400';

  const error = inputError([["start Bal", startBal, 0, 1000000000000.0], ["drawdown", drawdown, 0, 100], ["loss Per Trade", lossPerTrade, 0, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Starting Balance (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={startBal} onChange={e => setStartBal(e.target.value)} placeholder="10000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Drawdown (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={drawdown} onChange={e => setDrawdown(e.target.value)} step="0.5" min="0" max="99" placeholder="30" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk Per Trade (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={lossPerTrade} onChange={e => setLossPerTrade(e.target.value)} step="0.1" min="0.1" placeholder="2" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Drawdown Analysis</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Balance After DD</p>
            <p className={`font-display text-2xl font-bold tabular ${ddColor}`}>${fmt(afterDD, 0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Amount Lost</p>
            <p className="font-display text-2xl font-bold text-red-600 dark:text-red-400 tabular">-${fmt(lostAmt, 0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Recovery Needed</p>
            <p className="font-display text-2xl font-bold text-amber-500 dark:text-amber-400 tabular">{fmt(recovery, 1)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Consecutive Losses</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{consec}</p>
          </div>
        </div>

        {/* DD severity bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Drawdown Severity</span>
            <span>{drawdown}%</span>
          </div>
          <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${dd <= 0.1 ? 'bg-green-500' : dd <= 0.25 ? 'bg-amber-500' : dd <= 0.5 ? 'bg-orange-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(dd * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-2xs text-gray-400 mt-1">
            <span>Healthy (0–10%)</span>
            <span>Moderate (10–25%)</span>
            <span>Danger (50%+)</span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">A 100% loss has no finite percentage recovery. Consecutive-loss estimates assume a fixed fraction of remaining equity; an em dash means no finite result.</p>
    </CalculatorForm>
  );
}

// ─── Lot Size Calculator ─────────────────────────────────────────────────────
export function LotSizeCalc() {
  const [balance,  setBalance]  = useState('10000');
  const [risk,     setRisk]     = useState('1');
  const [slPips,   setSlPips]   = useState('25');
  const [pipValue, setPipValue] = useState('10');

  const bal = Number(balance);
  const rPct = Number(risk);
  const sl   = Number(slPips);
  const pv   = Number(pipValue);

  const riskAmt = bal * (rPct / 100);
  const stdLots  = Math.floor(riskAmt / (sl * pv) * 100 + 1e-10) / 100;
  const miniLots = stdLots * 10;
  const microLots= stdLots * 100;

  const error = inputError([["balance", balance, 0, 1000000000000.0], ["risk", risk, 0, 100], ["sl Pips", slPips, 1e-12, 1000000000000.0], ["pip Value", pipValue, 1e-12, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Balance (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="10000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk Per Trade (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={risk} onChange={e => setRisk(e.target.value)} step="0.1" placeholder="1" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stop Loss (pips)</label>
          <input className="calc-input" type="number" value={slPips} onChange={e => setSlPips(e.target.value)} placeholder="25" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pip Value per Std Lot (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={pipValue} onChange={e => setPipValue(e.target.value)} step="0.01" placeholder="10" />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Lot Size Results</p>
        <div className="grid grid-cols-3 gap-5">
          {[
            { label: 'Standard Lots', value: fmt(stdLots, 2), note: '100K units' },
            { label: 'Mini Lots',     value: fmt(miniLots, 2), note: '10K units' },
            { label: 'Micro Lots',    value: fmt(microLots, 1), note: '1K units' },
          ].map(r => (
            <div key={r.label}>
              <p className="text-xs text-gray-400 mb-0.5">{r.label}</p>
              <p className="font-display text-2xl font-bold text-amber-500 dark:text-amber-400 tabular">{r.value}</p>
              <p className="text-xs text-gray-400">{r.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500">
          Risk amount: <strong className="text-gray-700 dark:text-gray-300">${fmt(riskAmt, 2)}</strong> &nbsp;·&nbsp;
          Max loss at stop: <strong className="text-red-500">${fmt(riskAmt, 2)}</strong>
        </div>
      </div>

      {/* ── Lot Size in Dollars Reference Table ── */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">Lot Size in Dollars — EUR/USD Reference</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">Lot Size</th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">Type</th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">Units</th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">Pip Value (USD)</th>
                <th className="text-right px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">20-pip loss</th>
              </tr>
            </thead>
            <tbody>
              {([
                { lot: '0.01', type: 'Micro',    units: '1,000',   pip: '$0.10',  loss: '$2.00'   },
                { lot: '0.05', type: 'Micro ×5', units: '5,000',   pip: '$0.50',  loss: '$10.00'  },
                { lot: '0.10', type: 'Mini',     units: '10,000',  pip: '$1.00',  loss: '$20.00'  },
                { lot: '0.20', type: 'Mini ×2',  units: '20,000',  pip: '$2.00',  loss: '$40.00'  },
                { lot: '0.50', type: 'Mini ×5',  units: '50,000',  pip: '$5.00',  loss: '$100.00' },
                { lot: '1.00', type: 'Standard', units: '100,000', pip: '$10.00', loss: '$200.00' },
                { lot: '2.00', type: 'Std ×2',   units: '200,000', pip: '$20.00', loss: '$400.00' },
                { lot: '5.00', type: 'Std ×5',   units: '500,000', pip: '$50.00', loss: '$1,000'  },
              ] as const).map((row, i) => (
                <tr key={row.lot} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
                  <td className="px-3 py-2 font-bold text-amber-600 dark:text-amber-400 border border-gray-200 dark:border-gray-700 tabular">{row.lot}</td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 text-xs">{row.type}</td>
                  <td className="px-3 py-2 text-right text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 tabular font-mono text-xs">{row.units}</td>
                  <td className="px-3 py-2 text-right font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 tabular">{row.pip}</td>
                  <td className="px-3 py-2 text-right text-red-500 dark:text-red-400 border border-gray-200 dark:border-gray-700 tabular">{row.loss}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">Based on EUR/USD ($10/pip per standard lot). JPY pairs and other pairs differ slightly.</p>
      </div>
    </CalculatorForm>
  );
}

// ─── Average Down Calculator ─────────────────────────────────────────────────
export function AverageDownCalc() {
  const [qty1,   setQty1]   = useState('100');
  const [price1, setPrice1] = useState('50');
  const [qty2,   setQty2]   = useState('100');
  const [price2, setPrice2] = useState('42');

  const q1 = Number(qty1);
  const p1 = Number(price1);
  const q2 = Number(qty2);
  const p2 = Number(price2);

  const totalShares = q1 + q2;
  const totalCost   = q1 * p1 + q2 * p2;
  const newAvg      = totalShares > 0 ? totalCost / totalShares : 0;
  const oldAvg      = p1;
  const reduction   = oldAvg > 0 ? ((oldAvg - newAvg) / oldAvg) * 100 : 0;

  const error = inputError([["qty1", qty1, 0, 1000000000000.0], ["price1", price1, 0, 1000000000000.0], ["qty2", qty2, 0, 1000000000000.0], ["price2", price2, 0, 1000000000000.0]]) || (totalShares <= 0 ? 'Enter a positive quantity for at least one purchase.' : undefined);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-4">
          <p className="text-xs font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-3">Original Position</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shares / Coins Held</label>
              <input className="calc-input" type="number" value={qty1} onChange={e => setQty1(e.target.value)} placeholder="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Average Buy Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input className="calc-input pl-7" type="number" value={price1} onChange={e => setPrice1(e.target.value)} step="0.01" placeholder="50" />
              </div>
            </div>
          </div>
        </div>
        <div className="card p-4 border-amber-200 dark:border-amber-900">
          <p className="text-xs font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400 mb-3">Additional Buy</p>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shares / Coins to Buy</label>
              <input className="calc-input" type="number" value={qty2} onChange={e => setQty2(e.target.value)} placeholder="100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Buy Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input className="calc-input pl-7" type="number" value={price2} onChange={e => setPrice2(e.target.value)} step="0.01" placeholder="42" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">New Average Cost</p>
            <p className="font-display text-2xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(newAvg, 4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Shares</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(totalShares, 0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Cost</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(totalCost, 2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Avg Reduced By</p>
            <p className="font-display text-2xl font-bold text-green-600 dark:text-green-400 tabular">{fmt(reduction, 2)}%</p>
          </div>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Break-Even Calculator ───────────────────────────────────────────────────
export function BreakEvenCalc() {
  const [pipSize, setPipSize] = useState('0.0001');
  const [entry,      setEntry]      = useState('1.0850');
  const [spread,     setSpread]     = useState('2');
  const [commission, setCommission] = useState('7');
  const [lotSize,    setLotSize]    = useState('1');
  const [pipVal,     setPipVal]     = useState('10');

  const en  = Number(entry);
  const sp  = Number(spread);
  const com = Number(commission);
  const lot = Number(lotSize);
  const pv  = Number(pipVal);

  // Spread cost in dollars
  const spreadCost = sp * pv * lot;
  // Total cost
  const totalCost  = spreadCost + com;
  // Pips needed to break even
  const pipsNeeded = pv > 0 && lot > 0 ? totalCost / (pv * lot) : 0;
  // Break-even price (for long)
  const bePrice    = en + (pipsNeeded * Number(pipSize));

  const error = inputError([["pip Size", pipSize, 1e-12, 1000000000000.0], ["entry", entry, 0, 1000000000000.0], ["spread", spread, 0, 1000000000000.0], ["commission", commission, 0, 1000000000000.0], ["lot Size", lotSize, 1e-12, 1000000000000.0], ["pip Val", pipVal, 1e-12, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <NumberField label="Price change per pip (0.01 for JPY)" value={pipSize} onChange={setPipSize} min={1e-08} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entry Price</label>
          <input className="calc-input" type="number" value={entry} onChange={e => setEntry(e.target.value)} step="0.0001" placeholder="1.0850" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Spread (pips)</label>
          <input className="calc-input" type="number" value={spread} onChange={e => setSpread(e.target.value)} step="0.1" placeholder="2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Commission per Lot (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={commission} onChange={e => setCommission(e.target.value)} step="0.01" placeholder="7" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
          <input className="calc-input" type="number" value={lotSize} onChange={e => setLotSize(e.target.value)} step="0.01" placeholder="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pip Value per Std Lot (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={pipVal} onChange={e => setPipVal(e.target.value)} step="0.01" placeholder="10" />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Break-Even Analysis</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Break-Even Price</p>
            <p className="font-display text-2xl font-bold text-amber-500 dark:text-amber-400 tabular">{fmt(bePrice, 5)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Pips to Break Even</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(pipsNeeded, 1)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Cost</p>
            <p className="font-display text-2xl font-bold text-red-500 dark:text-red-400 tabular">${fmt(totalCost, 2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Spread Cost</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300 tabular">${fmt(spreadCost, 2)}</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Long-position estimate before slippage. Entry is the reference price before the entered spread. If entry and exit are actual bid/ask fills, set spread to zero to avoid counting it twice. Commission is the total round-trip cost for this position.</p>
    </CalculatorForm>
  );
}

// ─── Currency Converter ──────────────────────────────────────────────────────
export function CurrencyConverterCalc() {
  const [manualRate, setManualRate] = useState('0.922');
  // Static mid-market rates vs USD (representative — real app would use API)
  const RATES: Record<string, number> = {
    USD: 1, EUR: 0.922, GBP: 0.788, JPY: 149.5, AUD: 1.532, CAD: 1.362,
    CHF: 0.895, CNY: 7.24, HKD: 7.82, SGD: 1.337, NZD: 1.633, SEK: 10.45,
    NOK: 10.52, DKK: 6.88, MXN: 17.15, BRL: 4.97, INR: 83.1, KRW: 1325,
    TRY: 32.2, ZAR: 18.7, SAR: 3.75, AED: 3.67, THB: 35.1, MYR: 4.69,
  };

  const [amount, setAmount] = useState('100');
  const [from,   setFrom]   = useState('USD');
  const [to,     setTo]     = useState('EUR');

  const currencies = Object.keys(RATES);
  const amt = Number(amount);
  const converted = amt * Number(manualRate);
  const rate = Number(manualRate);

  const error = inputError([["manual Rate", manualRate, 1e-12, 1000000000000.0], ["amount", amount, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <NumberField label="Conversion rate: destination units per source unit" value={manualRate} onChange={setManualRate} min={1e-08} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
          <input className="calc-input" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
          <select className="calc-select" value={from} onChange={e => { setFrom(e.target.value); setManualRate(String(RATES[to] / RATES[e.target.value])); }}>
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
          <select className="calc-select" value={to} onChange={e => { setTo(e.target.value); setManualRate(String(RATES[e.target.value] / RATES[from])); }}>
            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm text-gray-400 mb-2">{fmt(amt, 2)} {from} =</p>
        <p className="font-display text-4xl font-bold text-amber-500 dark:text-amber-400 tabular mb-2">
          {fmt(converted, 4)} {to}
        </p>
        <p className="text-xs text-gray-400">1 {from} = {fmt(rate, 6)} {to} &nbsp;·&nbsp; 1 {to} = {fmt(1/rate, 6)} {from}</p>
        <p className="text-xs text-gray-400 mt-1">Illustrative sample rates only — not live market quotes. Verify current rates with your provider before making a transaction.</p>
      </div>

      {/* Quick compare grid */}
      <div>
        <p className="section-label mb-3">Illustrative sample comparison (does not use your manual rate): {fmt(amt, 2)} {from}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['EUR','GBP','JPY','AUD','CAD','CHF','CNY','INR']
            .filter(c => c !== from)
            .map(c => (
              <div key={c} className="card px-3 py-2">
                <p className="text-xs text-gray-400">{c}</p>
                <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 tabular">
                  {fmt(amt * (RATES[c] / RATES[from]), 2)}
                </p>
              </div>
            ))}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Currency selections load illustrative sample rates, not live quotes. Replace the conversion rate with your provider’s current rate before using the result; fees are excluded.</p>
    </CalculatorForm>
  );
}

// ─── Leverage Calculator ─────────────────────────────────────────────────────
export function LeverageCalc() {
  const [balance,   setBalance]   = useState('10000');
  const [lotSize,   setLotSize]   = useState('1');
  const [contracts, setContracts] = useState('100000');
  const [price,     setPrice]     = useState('1.0850');

  const bal  = Number(balance);
  const lot  = Number(lotSize);
  const cont = Number(contracts);
  const pr   = Number(price);

  const notional   = lot * cont * pr;
  const effLev     = bal > 0 ? notional / bal : 0;
  const exposure   = bal > 0 ? (notional / bal) * 100 : 0;

  const levColor = effLev <= 5 ? 'text-green-600 dark:text-green-400'
    : effLev <= 10 ? 'text-amber-500 dark:text-amber-400'
    : 'text-red-600 dark:text-red-400';
  const levLabel = effLev <= 5 ? 'Lower exposure — losses remain possible'
    : effLev <= 10 ? 'Moderate exposure — assess stop distance and costs'
    : '✗ High — reduce position size';

  const error = inputError([["balance", balance, 1e-12, 1000000000000.0], ["lot Size", lotSize, 0, 1000000000000.0], ["contracts", contracts, 0, 1000000000000.0], ["price", price, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Balance (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="10000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
          <input className="calc-input" type="number" value={lotSize} onChange={e => setLotSize(e.target.value)} step="0.01" placeholder="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contract Size</label>
          <select className="calc-select" value={contracts} onChange={e => setContracts(e.target.value)}>
            <option value="100000">100,000 (Forex standard)</option>
            <option value="10000">10,000 (Forex mini)</option>
            <option value="1000">1,000 (Forex micro)</option>
            <option value="1">1 (Stocks / Crypto)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Market Price</label>
          <input className="calc-input" type="number" value={price} onChange={e => setPrice(e.target.value)} step="0.0001" placeholder="1.0850" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Leverage Analysis</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Effective Leverage</p>
            <p className={`font-display text-3xl font-bold tabular ${levColor}`}>1:{fmt(effLev, 1)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Notional Value</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(notional, 0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Exposure</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(exposure, 0)}%</p>
          </div>
        </div>
        <p className={`text-xs mt-3 font-medium ${levColor}`}>{levLabel}</p>
        <div className="mt-3 h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all ${effLev <= 5 ? 'bg-green-500' : effLev <= 10 ? 'bg-amber-500' : 'bg-red-500'}`}
            style={{ width: `${Math.min((effLev / 20) * 100, 100)}%` }} />
        </div>
        <div className="flex justify-between text-2xs text-gray-400 mt-1">
          <span>Safe (1–5×)</span><span>Moderate (5–10×)</span><span>Danger (10×+)</span>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Risk of Ruin Calculator ──────────────────────────────────────────────────
export function RiskOfRuinCalc() {
  const [horizon, setHorizon] = useState('100');
  const [winRate, setWinRate] = useState('55');
  const [rr,      setRr]      = useState('1.5');
  const [risk,    setRisk]    = useState('1');
  const [ruin,    setRuin]    = useState('20');

  const wr  = (Number(winRate)) / 100;
  const lr  = 1 - wr;
  const rrV = Number(rr);
  const rp  = (Number(risk)) / 100;
  const rd  = Number(ruin);

  // Edge per trade
  const edge = wr * rrV - lr;
  // Absorbing binomial paths: fixed-dollar risk, loss threshold from initial balance.
  const count = Math.min(500, Math.max(1, Math.floor(Number(horizon) || 1)));
  const threshold = rp > 0 ? rd / (rp * 100) : Infinity;
  let alive = [1];
  let breached = 0;
  for (let trade = 1; trade <= count; trade++) {
    const next = Array<number>(trade + 1).fill(0);
    for (let wins = 0; wins < alive.length; wins++) {
      const lossPath = alive[wins] * lr;
      const winPath = alive[wins] * wr;
      if (wins * rrV - (trade - wins) <= -threshold + 1e-10) breached += lossPath;
      else next[wins] += lossPath;
      if ((wins + 1) * rrV - (trade - wins - 1) <= -threshold + 1e-10) breached += winPath;
      else next[wins + 1] += winPath;
    }
    alive = next;
  }
  const ror = Math.min(100, Math.max(0, breached * 100));
  const ev  = (wr * rrV - lr) * 100; // EV per $100 risked

  const rorColor = ror < 1 ? 'text-green-600 dark:text-green-400'
    : ror < 5 ? 'text-amber-500 dark:text-amber-400'
    : 'text-red-600 dark:text-red-400';
  const rorLabel = ror < 1 ? 'Low modelled threshold-hit probability; assumptions may fail'
    : ror < 5 ? '⚠ Caution — reduce risk per trade'
    : '✗ Danger — high chance of account blowup';

  const error = inputError([["horizon", horizon, 1, 500, true], ["win Rate", winRate, 0, 100], ["rr", rr, 0, 1000], ["risk", risk, 0, 100], ["ruin", ruin, 1e-12, 100]]);

  return (
    <CalculatorForm error={error}>
      <NumberField label="Number of trades in model" value={horizon} onChange={setHorizon} min={1} max={500} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Win Rate (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={winRate} onChange={e => setWinRate(e.target.value)} step="1" min="1" max="99" placeholder="55" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avg Risk:Reward Ratio</label>
          <input className="calc-input" type="number" value={rr} onChange={e => setRr(e.target.value)} step="0.1" placeholder="1.5" />
          <p className="text-xs text-gray-400 mt-1">e.g. 1.5 means risk 1 to make 1.5</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk Per Trade (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={risk} onChange={e => setRisk(e.target.value)} step="0.1" min="0.1" placeholder="1" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loss threshold (% of initial balance)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={ruin} onChange={e => setRuin(e.target.value)} step="1" min="1" placeholder="20" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Prop firm max DD or personal limit</p>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Risk Analysis</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Risk of Ruin</p>
            <p className={`font-display text-3xl font-bold tabular ${rorColor}`}>{fmt(ror, 2)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Edge Per Trade</p>
            <p className={`font-display text-2xl font-bold tabular ${edge > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {edge >= 0 ? '+' : ''}{fmt(edge * 100, 2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">EV per $100 Risked</p>
            <p className={`font-display text-2xl font-bold tabular ${ev > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {ev >= 0 ? '+$' : '-$'}{fmt(Math.abs(ev), 2)}
            </p>
          </div>
        </div>
        <p className={`text-xs mt-3 font-medium ${rorColor}`}>{rorLabel}</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Finite-horizon model: independent trades, constant win probability and payoff, fixed dollar risk based on initial balance, no costs. Measures touching the stated loss threshold from initial capital, not a trailing drawdown or a forecast.</p>
    </CalculatorForm>
  );
}

// ─── Kelly Criterion Calculator ───────────────────────────────────────────────
export function KellyCalc() {
  const [winRate, setWinRate] = useState('55');
  const [rr,      setRr]      = useState('1.5');
  const [balance, setBalance] = useState('10000');

  const wr  = (Number(winRate)) / 100;
  const lr  = 1 - wr;
  const rrV = Number(rr);
  const bal = Number(balance);

  const fullKelly = wr - (lr / rrV);
  const halfKelly = fullKelly / 2;
  const quarterKelly = fullKelly / 4;

  const fullAmt    = bal * Math.max(fullKelly,    0);
  const halfAmt    = bal * Math.max(halfKelly,    0);
  const quarterAmt = bal * Math.max(quarterKelly, 0);

  const hasEdge = fullKelly > 0;

  const error = inputError([["win Rate", winRate, 0, 100], ["rr", rr, 1e-12, 1000], ["balance", balance, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Win Rate (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={winRate} onChange={e => setWinRate(e.target.value)} step="1" min="1" max="99" placeholder="55" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avg Risk:Reward</label>
          <input className="calc-input" type="number" value={rr} onChange={e => setRr(e.target.value)} step="0.1" placeholder="1.5" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Balance (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="10000" />
          </div>
        </div>
      </div>

      {!hasEdge ? (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400 font-semibold text-sm">✗ No Edge Detected</p>
          <p className="text-red-500 dark:text-red-400 text-xs mt-1">Your current win rate and R:R produce a negative expected value. Kelly recommends not trading this system. Improve win rate or increase your R:R ratio.</p>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <p className="section-label mb-4">Kelly Position Sizes</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Full Kelly', pct: fullKelly, amt: fullAmt, note: 'Maximum growth — high volatility', color: 'text-amber-500 dark:text-amber-400' },
              { label: 'Half Kelly', pct: halfKelly, amt: halfAmt, note: 'Recommended for most traders', color: 'text-green-600 dark:text-green-400' },
              { label: '¼ Kelly',    pct: quarterKelly, amt: quarterAmt, note: 'Ultra conservative', color: 'text-blue-500 dark:text-blue-400' },
            ].map(k => (
              <div key={k.label} className={k.label === 'Half Kelly' ? 'bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800' : ''}>
                <p className="text-xs text-gray-400 mb-0.5">{k.label}</p>
                <p className={`font-display text-2xl font-bold tabular ${k.color}`}>{fmt(k.pct * 100, 2)}%</p>
                <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 tabular">${fmt(k.amt, 2)}</p>
                <p className="text-xs text-gray-400 mt-1">{k.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </CalculatorForm>
  );
}

// ─── Win Rate Calculator ──────────────────────────────────────────────────────
export function WinRateCalc() {
  const [rr,      setRr]      = useState('2');
  const [winRate, setWinRate] = useState('45');

  const rrV    = Number(rr);
  const wr     = (Number(winRate)) / 100;
  const lr     = 1 - wr;

  const breakEven = (1 / (1 + rrV)) * 100;
  const edge      = wr - (1 / (1 + rrV));
  const ev        = (wr * rrV - lr) * 100; // per $100 risked

  const edgeColor  = edge > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const evColor    = ev > 0    ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const edgeLabel  = Math.abs(edge) < 1e-10 ? 'Break-even before costs' : edge > 0 ? 'Positive modelled expectancy before costs' : 'Negative modelled expectancy';

  const error = inputError([["rr", rr, 0, 1000], ["win Rate", winRate, 0, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk:Reward Ratio</label>
          <input className="calc-input" type="number" value={rr} onChange={e => setRr(e.target.value)} step="0.1" min="0.1" placeholder="2" />
          <p className="text-xs text-gray-400 mt-1">e.g. 2 = risk 1 to make 2</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Actual Win Rate (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={winRate} onChange={e => setWinRate(e.target.value)} step="1" min="1" max="99" placeholder="45" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Win Rate Analysis</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Break-Even Win Rate</p>
            <p className="font-display text-2xl font-bold text-amber-500 dark:text-amber-400 tabular">{fmt(breakEven, 1)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Your Win Rate</p>
            <p className={`font-display text-2xl font-bold tabular ${edgeColor}`}>{winRate}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Your Edge</p>
            <p className={`font-display text-2xl font-bold tabular ${edgeColor}`}>{edge >= 0 ? '+' : ''}{fmt(edge * 100, 1)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">EV per $100 Risked</p>
            <p className={`font-display text-2xl font-bold tabular ${evColor}`}>{ev >= 0 ? '+$' : '-$'}{fmt(Math.abs(ev), 2)}</p>
          </div>
        </div>
        <p className={`text-xs mt-3 font-medium ${edgeColor}`}>{edgeLabel}</p>

        {/* Visual bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Break-Even: {fmt(breakEven, 1)}%</span>
            <span>Your Rate: {winRate}%</span>
          </div>
          <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
            <div className="h-full bg-amber-200 dark:bg-amber-900 rounded-full" style={{ width: `${Math.min(breakEven, 100)}%` }} />
            <div className={`absolute top-0 h-full rounded-full transition-all ${edge > 0 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ left: `${Math.min(breakEven, 100)}%`, width: `${Math.max(Math.min(parseFloat(winRate), 100) - breakEven, 0)}%` }} />
          </div>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Gain & Loss % Calculator ─────────────────────────────────────────────────
export function GainLossCalc() {
  const [startBal, setStartBal] = useState('10000');
  const [endBal,   setEndBal]   = useState('12500');

  const start  = Number(startBal);
  const end    = Number(endBal);
  const diff   = end - start;
  const pct    = start > 0 ? (diff / start) * 100 : 0;
  const isGain = diff >= 0;

  // Recovery % needed to get back to start from end (if loss)
  const recoveryNeeded = !isGain ? (end > 0 ? ((start - end) / end) * 100 : Infinity) : 0;

  const pctColor      = isGain ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const bgColor       = isGain ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  const statusLabel   = isGain ? '✓ Account Gain' : '✗ Account Loss';

  const error = inputError([["start Bal", startBal, 1e-12, 1000000000000.0], ["end Bal", endBal, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Starting Balance (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={startBal} onChange={e => setStartBal(e.target.value)} placeholder="10000" min="0" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ending Balance (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={endBal} onChange={e => setEndBal(e.target.value)} placeholder="12500" min="0" />
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${bgColor}`}>
        <p className={`text-xs font-semibold mb-4 ${pctColor}`}>{statusLabel}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Gain / Loss %</p>
            <p className={`font-display text-2xl font-bold tabular ${pctColor}`}>
              {isGain ? '+' : ''}{fmt(pct, 2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Dollar Amount</p>
            <p className={`font-display text-2xl font-bold tabular ${pctColor}`}>
              {isGain ? '+$' : '-$'}{fmt(Math.abs(diff), 2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Ending Balance</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">
              ${fmt(end, 2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">
              {isGain ? 'Starting Balance' : 'Recovery Needed'}
            </p>
            <p className={`font-display text-2xl font-bold tabular ${isGain ? 'text-gray-800 dark:text-gray-200' : 'text-red-600 dark:text-red-400'}`}>
              {isGain ? `$${fmt(start, 2)}` : `${fmt(recoveryNeeded, 2)}%`}
            </p>
          </div>
        </div>

        {/* Recovery asymmetry insight */}
        {!isGain && end > 0 && (
          <div className="mt-4 pt-4 border-t border-red-200 dark:border-red-800">
            <p className="text-xs text-red-500 dark:text-red-400">
              ⚠ Recovery asymmetry: A {fmt(Math.abs(pct), 1)}% loss requires a <strong>{fmt(recoveryNeeded, 1)}%</strong> gain to return to your starting balance — because the base is now smaller.
            </p>
          </div>
        )}
      </div>
    </CalculatorForm>
  );
}

// ─── Consistency Calculator ───────────────────────────────────────────────────
export function ConsistencyCalc() {
  const [totalProfit, setTotalProfit] = useState('5000');
  const [bestDay,     setBestDay]     = useState('1800');
  const [limit,       setLimit]       = useState('30');

  const total  = Number(totalProfit);
  const best   = Number(bestDay);
  const lim    = Number(limit);

  const score     = total > 0 ? (best / total) * 100 : 0;
  const passes    = score <= lim && total > 0 && best > 0;
  const headroom  = Math.max(lim - score, 0);
  const maxBestDay = total * (lim / 100);

  // Color logic
  const scoreColor = passes
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400';
  const bgColor = passes
    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  const verdict = passes ? '✓ PASS — Consistent' : '✗ FAIL — Best day too large';

  // Progress bar fill (capped at 100%)
  const barWidth = Math.min(score, 100);
  const limitPos = Math.min(lim, 100);

  const error = inputError([["total Profit", totalProfit, 0, 1000000000000.0], ["best Day", bestDay, 0, 1000000000000.0], ["limit", limit, 1e-12, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Profit (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={totalProfit} onChange={e => setTotalProfit(e.target.value)} placeholder="5000" min="0" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Best Single Day Profit (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={bestDay} onChange={e => setBestDay(e.target.value)} placeholder="1800" min="0" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prop Firm Limit (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={limit} onChange={e => setLimit(e.target.value)} step="1" min="1" max="100" placeholder="30" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Enter the actual rule and profit denominator for your account.</p>
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${bgColor}`}>
        <p className={`text-xs font-semibold mb-4 ${scoreColor}`}>{verdict}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Consistency Score</p>
            <p className={`font-display text-2xl font-bold tabular ${scoreColor}`}>
              {fmt(score, 1)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Firm Limit</p>
            <p className="font-display text-2xl font-bold tabular text-amber-500 dark:text-amber-400">
              {fmt(lim, 0)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">{passes ? 'Headroom Left' : 'Over Limit By'}</p>
            <p className={`font-display text-2xl font-bold tabular ${scoreColor}`}>
              {passes ? `${fmt(headroom, 1)}%` : `${fmt(score - lim, 1)}%`}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Max Allowed Best Day</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">
              ${fmt(maxBestDay, 2)}
            </p>
          </div>
        </div>

        {/* Visual consistency bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>0%</span>
            <span>Limit: {fmt(lim, 0)}%</span>
            <span>100%</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
            {/* Safe zone */}
            <div className="absolute top-0 left-0 h-full bg-green-200 dark:bg-green-900 rounded-full"
              style={{ width: `${limitPos}%` }} />
            {/* Score bar */}
            <div className={`absolute top-0 left-0 h-full rounded-full transition-all ${passes ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${barWidth}%` }} />
            {/* Limit line */}
            <div className="absolute top-0 h-full w-0.5 bg-amber-500"
              style={{ left: `${limitPos}%` }} />
          </div>
          {!passes && total > 0 && (
            <p className="text-xs text-red-500 dark:text-red-400 mt-2">
              ⚠ Reduce your best day to under ${fmt(maxBestDay, 2)} to pass the consistency rule.
            </p>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Supply the profit denominator required by your account agreement. This ratio is a calculation, not an automatic account-breach decision.</p>
    </CalculatorForm>
  );
}

// ─── Options Profit Calculator ───────────────────────────────────────────────
export function OptionsProfitCalc() {
  const [type,      setType]      = useState<'long-call'|'long-put'|'short-call'|'short-put'>('long-call');
  const [strike,    setStrike]    = useState('150');
  const [premium,   setPremium]   = useState('3');
  const [contracts, setContracts] = useState('1');
  const [target,    setTarget]    = useState('160');

  const str = Number(strike);
  const pre = Number(premium);
  const con = Number(contracts);
  const tgt = Number(target);

  const totalCost = pre * 100 * con;

  let breakEven = 0, pnl = 0, maxLoss = 0, maxProfit = 0;

  if (type === 'long-call') {
    breakEven = str + pre;
    maxLoss   = -totalCost;
    maxProfit = Infinity;
    pnl       = tgt > str ? (tgt - str - pre) * 100 * con : -totalCost;
  } else if (type === 'long-put') {
    breakEven = str - pre;
    maxLoss   = -totalCost;
    maxProfit = (str - pre) * 100 * con;
    pnl       = tgt < str ? (str - tgt - pre) * 100 * con : -totalCost;
  } else if (type === 'short-call') {
    breakEven = str + pre;
    maxProfit = totalCost;
    maxLoss   = -Infinity;
    pnl       = tgt > str ? -(tgt - str - pre) * 100 * con : totalCost;
  } else { // short-put
    breakEven = str - pre;
    maxProfit = totalCost;
    maxLoss   = -(str - pre) * 100 * con;
    pnl       = tgt < str ? -(str - tgt - pre) * 100 * con : totalCost;
  }

  const isGain  = pnl >= 0;
  const pnlColor = isGain ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const bgColor  = isGain ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';

  const typeLabels: Record<string,string> = {
    'long-call':'Long Call (Buy Call)','long-put':'Long Put (Buy Put)',
    'short-call':'Short Call (Sell Call)','short-put':'Short Put (Sell Put)',
  };

  const error = inputError([["strike", strike, 0, 1000000000000.0], ["premium", premium, 0, 1000000000000.0], ["contracts", contracts, 1, 1000000, true], ["target", target, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      {/* Type selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Option Type</label>
        <div className="grid grid-cols-2 gap-2">
          {(['long-call','long-put','short-call','short-put'] as const).map(t => (
            <button key={t} onClick={() => setType(t)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-colors ${
                type === t ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600'
              }`}>
              {typeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Strike Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={strike} onChange={e => setStrike(e.target.value)} placeholder="150" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Premium (per share)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={premium} onChange={e => setPremium(e.target.value)} step="0.01" placeholder="3" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contracts</label>
          <input className="calc-input" type="number" value={contracts} onChange={e => setContracts(e.target.value)} step="1" min="1" placeholder="1" />
          <p className="text-xs text-gray-400 mt-1">1 contract = 100 shares</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stock Price at Expiry</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={target} onChange={e => setTarget(e.target.value)} step="0.01" placeholder="160" />
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${bgColor}`}>
        <p className={`text-xs font-semibold mb-4 ${pnlColor}`}>{typeLabels[type]} — {isGain ? 'Profitable' : 'Loss'} at ${target}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">P&L at ${target}</p>
            <p className={`font-display text-2xl font-bold tabular ${pnlColor}`}>{isGain?'+$':'-$'}{fmt(Math.abs(pnl),2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Break-Even Price</p>
            <p className="font-display text-2xl font-bold tabular text-amber-500 dark:text-amber-400">${fmt(breakEven,2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Max Loss</p>
            <p className="font-display text-2xl font-bold tabular text-red-600 dark:text-red-400">
              {isFinite(maxLoss) ? `-$${fmt(Math.abs(maxLoss),2)}` : 'Unlimited'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Cost / Credit</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">${fmt(totalCost,2)}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">Maximum expiry P&amp;L: {Number.isFinite(maxProfit) ? `$${fmt(maxProfit, 2)}` : 'Unlimited'}. Assumes 100 shares per contract; excludes fees and exercise/assignment effects.</p>
      </div>
    </CalculatorForm>
  );
}

// ─── Pip Difference Calculator ────────────────────────────────────────────────
export function PipDifferenceCalc() {
  const [pipVal, setPipVal] = useState('10');
  const [price1,    setPrice1]    = useState('1.1050');
  const [price2,    setPrice2]    = useState('1.1180');
  const [pairType,  setPairType]  = useState<'standard'|'jpy'>('standard');
  const [lots,      setLots]      = useState('1');

  const p1   = Number(price1);
  const p2   = Number(price2);
  const lo   = Number(lots);
  const mult = pairType === 'jpy' ? 100 : 10000;

  const pipDiff   = Math.abs(p1 - p2) * mult;
  const direction = p2 > p1 ? '▲ Price 2 is higher' : p2 < p1 ? '▼ Price 1 is higher' : '= Prices are equal';
  const pipValue  = Number(pipVal); // user-supplied quote-to-USD conversion
  const dollarVal = pipDiff * pipValue * lo;

  const error = inputError([["pip Val", pipVal, 0, 1000000000000.0], ["price1", price1, 0, 1000000000000.0], ["price2", price2, 0, 1000000000000.0], ["lots", lots, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <NumberField label="USD pip value per standard lot" value={pipVal} onChange={setPipVal} min={1e-08} />
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pair Type</label>
        <div className="flex gap-2">
          {(['standard','jpy'] as const).map(t => (
            <button key={t} onClick={() => setPairType(t)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold border transition-colors ${
                pairType === t ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600'
              }`}>
              {t === 'standard' ? 'Standard (EUR/USD, GBP/USD…)' : 'JPY Pairs (USD/JPY, EUR/JPY…)'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price 1 (Entry / Level A)</label>
          <input className="calc-input" type="number" value={price1} onChange={e => setPrice1(e.target.value)} step={pairType==='jpy'?'0.01':'0.0001'} placeholder="1.1050" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price 2 (Exit / Level B)</label>
          <input className="calc-input" type="number" value={price2} onChange={e => setPrice2(e.target.value)} step={pairType==='jpy'?'0.01':'0.0001'} placeholder="1.1180" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
          <input className="calc-input" type="number" value={lots} onChange={e => setLots(e.target.value)} step="0.01" min="0.01" placeholder="1" />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Pip Distance</p>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Pip Difference</p>
            <p className="font-display text-3xl font-bold tabular text-amber-500 dark:text-amber-400">{fmt(pipDiff,1)}</p>
            <p className="text-xs text-gray-400 mt-0.5">pips</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Dollar Value</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">${fmt(dollarVal,2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">at {lots} lot{parseFloat(lots)!==1?'s':''}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Direction</p>
            <p className="font-semibold text-sm text-gray-700 dark:text-gray-300 mt-1">{direction}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm">
          <span className="text-gray-400">Formula</span>
          <span className="text-gray-600 dark:text-gray-400 font-mono text-xs">|{price1} − {price2}| × {mult} = {fmt(pipDiff,1)} pips</span>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Dollar value is an unsigned movement estimate. Supply the current USD pip value for the selected pair; JPY pip size alone does not determine its USD value.</p>
    </CalculatorForm>
  );
}

// ─── CAGR Calculator ──────────────────────────────────────────────────────────
export function CAGRCalc() {
  const [startBal, setStartBal] = useState('10000');
  const [endBal,   setEndBal]   = useState('25000');
  const [years,    setYears]    = useState('3');

  const start = Number(startBal);
  const end   = Number(endBal);
  const yrs   = Number(years);

  const cagr       = start > 0 && end >= 0 && yrs > 0 ? (Math.pow(end / start, 1 / yrs) - 1) * 100 : 0;
  const totalGain  = start > 0 ? ((end - start) / start) * 100 : 0;
  const netProfit  = end - start;
  const isGain     = cagr >= 0;

  const cagrColor = isGain ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const bgColor   = isGain ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                           : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';

  const BENCHMARKS = [
    { name: 'Hypothetical 10%', cagr: 10 },
    { name: 'Hypothetical 20%', cagr: 20 },
    { name: 'Hypothetical 30%', cagr: 30 },
  ];

  const error = inputError([["start Bal", startBal, 1e-12, 1000000000000.0], ["end Bal", endBal, 0, 1000000000000.0], ["years", years, 1e-06, 1000]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Starting Balance (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={startBal} onChange={e => setStartBal(e.target.value)} placeholder="10000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ending Balance (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={endBal} onChange={e => setEndBal(e.target.value)} placeholder="25000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Years</label>
          <input className="calc-input" type="number" value={years} onChange={e => setYears(e.target.value)} step="0.5" min="0.25" placeholder="3" />
          <p className="text-xs text-gray-400 mt-1">6 months = 0.5 · 18 months = 1.5</p>
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${bgColor}`}>
        <p className={`text-xs font-semibold mb-4 ${cagrColor}`}>{isGain ? '✓ Growing Account' : '✗ Declining Account'}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">CAGR</p>
            <p className={`font-display text-3xl font-bold tabular ${cagrColor}`}>{isGain?'+':''}{fmt(cagr,2)}%</p>
            <p className="text-xs text-gray-400 mt-0.5">per year</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Gain</p>
            <p className={`font-display text-2xl font-bold tabular ${cagrColor}`}>{isGain?'+':''}{fmt(totalGain,2)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Net Profit</p>
            <p className={`font-display text-2xl font-bold tabular ${cagrColor}`}>{netProfit>=0?'+$':'-$'}{fmt(Math.abs(netProfit),2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Years</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">{yrs}</p>
          </div>
        </div>
      </div>

      {/* Benchmark comparison */}
      <div>
        <p className="section-label mb-3">vs Benchmarks</p>
        <div className="space-y-2">
          {BENCHMARKS.map(b => {
            const beats = cagr > b.cagr;
            return (
              <div key={b.name} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800/50 rounded-lg px-4 py-2.5 border border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">{b.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{b.cagr}%/yr</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${beats ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                    {beats ? '✓ Beating' : '✗ Below'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Valid for positive starting capital and no external deposits or withdrawals. Comparison rates are illustrations, not forecasts or verified benchmarks.</p>
    </CalculatorForm>
  );
}

// ─── Daily Loss Limit Calculator ──────────────────────────────────────────────
export function DailyLossLimitCalc() {
  const [balance,    setBalance]    = useState('10000');
  const [limitPct,   setLimitPct]   = useState('5');
  const [trades,     setTrades]     = useState('4');
  const [usePct,     setUsePct]     = useState('80');

  const bal   = Number(balance);
  const lim   = (Number(limitPct)) / 100;
  const tr    = Number(trades);
  const use   = (Number(usePct)) / 100;

  const dailyLimit     = bal * lim;
  const safeLimit      = dailyLimit * use;
  const riskPerTrade   = safeLimit / tr;
  const riskPct        = bal > 0 ? (riskPerTrade / bal) * 100 : 0;
  const maxConsecLoss  = riskPerTrade > 0 ? Math.floor(safeLimit / riskPerTrade + 1e-10) : 0;

  const FIRMS = [
    { name: 'Illustrative 5% limit', limit: 5 },
    { name: 'Illustrative 5% limit', limit: 5 },
    { name: 'Illustrative 4% limit', limit: 4 },
    { name: 'Illustrative 4% limit', limit: 4 },
  ];

  const error = inputError([["balance", balance, 0, 1000000000000.0], ["limit Pct", limitPct, 0, 100], ["trades", trades, 1, 100000, true], ["use Pct", usePct, 0, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Balance</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={balance} onChange={e => setBalance(e.target.value)} placeholder="10000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daily Loss Limit (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={limitPct} onChange={e => setLimitPct(e.target.value)} step="0.5" min="0.5" placeholder="5" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trades per Day</label>
          <input className="calc-input" type="number" value={trades} onChange={e => setTrades(e.target.value)} step="1" min="1" placeholder="4" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Use % of Limit</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={usePct} onChange={e => setUsePct(e.target.value)} step="5" min="10" max="100" placeholder="80" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Safety buffer</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Your Daily Risk Plan</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Max Risk per Trade</p>
            <p className="font-display text-2xl font-bold tabular text-amber-500 dark:text-amber-400">${fmt(riskPerTrade,2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{fmt(riskPct,2)}% of account</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Daily Limit ($)</p>
            <p className="font-display text-2xl font-bold tabular text-red-600 dark:text-red-400">${fmt(dailyLimit,2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">hard limit</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Safe Budget</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">${fmt(safeLimit,2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{usePct}% of limit</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Max Losing Streak</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">{maxConsecLoss}</p>
            <p className="text-xs text-gray-400 mt-0.5">before hitting budget</p>
          </div>
        </div>
      </div>

      {/* Prop firm quick reference */}
      <div>
        <p className="section-label mb-3">Prop Firm Daily Limits</p>
        <div className="grid grid-cols-2 gap-2">
          {FIRMS.map(f => (
            <div key={f.name} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 rounded-lg px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-sm">
              <span className="text-gray-600 dark:text-gray-400">{f.name}</span>
              <span className="font-semibold text-red-600 dark:text-red-400">{f.limit}%</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Planning allocation only. Enter your account’s current rule; include open P&L, fees, reset time and existing exposure separately. A buffer does not guarantee compliance.</p>
    </CalculatorForm>
  );
}

// ─── Futures Tick Value Calculator ────────────────────────────────────────────
export function FuturesTickCalc() {
  const CONTRACTS: Record<string,{name:string,tick:number,tickValue:number,pointValue:number,currency:string}> = {
    'ES':  { name:'E-mini S&P 500',    tick:0.25, tickValue:12.50, pointValue:50,    currency:'USD' },
    'MES': { name:'Micro E-mini S&P',  tick:0.25, tickValue:1.25,  pointValue:5,     currency:'USD' },
    'NQ':  { name:'E-mini Nasdaq-100', tick:0.25, tickValue:5.00,  pointValue:20,    currency:'USD' },
    'MNQ': { name:'Micro E-mini NQ',   tick:0.25, tickValue:0.50,  pointValue:2,     currency:'USD' },
    'RTY': { name:'E-mini Russell 2000',tick:0.10, tickValue:5.00, pointValue:50,    currency:'USD' },
    'CL':  { name:'Crude Oil',         tick:0.01, tickValue:10.00, pointValue:1000,  currency:'USD' },
    'GC':  { name:'Gold (COMEX)',       tick:0.10, tickValue:10.00, pointValue:100,   currency:'USD' },
    'SI':  { name:'Silver (COMEX)',     tick:0.005,tickValue:25.00, pointValue:5000,  currency:'USD' },
    'NG':  { name:'Natural Gas',        tick:0.001,tickValue:10.00, pointValue:10000, currency:'USD' },
    'ZB':  { name:'30-Yr T-Bond',      tick:0.03125,tickValue:31.25,pointValue:1000, currency:'USD' },
    '6E':  { name:'Euro FX',           tick:0.00005,tickValue:6.25,pointValue:125000,currency:'USD' },
  };

  const [contract,   setContract]   = useState('ES');
  const [ticks,      setTicks]      = useState('10');
  const [contracts,  setContracts]  = useState('1');

  const spec = CONTRACTS[contract];
  const tk   = Number(ticks);
  const con  = Number(contracts);

  const totalPnL   = tk * spec.tickValue * con;
  const pointsMoved = tk * spec.tick;

  const error = inputError([["ticks", ticks, -1000000000.0, 1000000000.0, true], ["contracts", contracts, 1, 1000000, true]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Futures Contract</label>
          <select className="calc-input" value={contract} onChange={e => setContract(e.target.value)}>
            {Object.entries(CONTRACTS).map(([key, val]) => (
              <option key={key} value={key}>{key} — {val.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Ticks</label>
          <input className="calc-input" type="number" value={ticks} onChange={e => setTicks(e.target.value)} step="1" min="0" placeholder="10" />
          <p className="text-xs text-gray-400 mt-1">Tick size: {spec.tick} points each</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Contracts</label>
          <input className="calc-input" type="number" value={contracts} onChange={e => setContracts(e.target.value)} step="1" min="1" placeholder="1" />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">{contract} — {spec.name}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total P&L</p>
            <p className={`font-display text-2xl font-bold tabular ${totalPnL>=0?'text-green-600 dark:text-green-400':'text-red-600 dark:text-red-400'}`}>
              {totalPnL>=0?'+$':'-$'}{fmt(Math.abs(totalPnL),2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Points Moved</p>
            <p className="font-display text-2xl font-bold tabular text-amber-500 dark:text-amber-400">{fmt(pointsMoved,4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Per Tick Value</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">${spec.tickValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Per Point Value</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">${spec.pointValue}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs">
          {[
            {label:'Tick Size', val:spec.tick+' pts'},
            {label:'Tick Value', val:'$'+spec.tickValue},
            {label:'Point Value', val:'$'+spec.pointValue},
          ].map(i=>(
            <div key={i.label} className="bg-white dark:bg-gray-900 rounded-lg p-2.5 border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-400">{i.label}</p>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{i.val}</p>
            </div>
          ))}
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Dividend Yield Calculator ────────────────────────────────────────────────
export function DividendYieldCalc() {
  const [sharePrice,   setSharePrice]   = useState('100');
  const [annualDiv,    setAnnualDiv]    = useState('4');
  const [investment,   setInvestment]   = useState('10000');
  const [purchasePrice,setPurchasePrice]= useState('');

  const sp  = Number(sharePrice);
  const div = Number(annualDiv);
  const inv = Number(investment);
  const pp  = purchasePrice.trim() === '' ? sp : Number(purchasePrice);

  const yield_      = sp > 0 ? (div / sp) * 100 : 0;
  const yieldOnCost = pp > 0 ? (div / pp) * 100 : 0;
  const shares      = sp > 0 ? Math.floor(inv / sp) : 0;
  const annualInc   = shares * div;
  const monthlyInc  = annualInc / 12;
  const quarterlyInc= annualInc / 4;

  const yieldColor = yield_ >= 4 ? 'text-green-600 dark:text-green-400'
    : yield_ >= 2 ? 'text-amber-500 dark:text-amber-400'
    : 'text-gray-600 dark:text-gray-400';

  const error = inputError([["share Price", sharePrice, 1e-12, 1000000000000.0], ["annual Div", annualDiv, 0, 1000000000000.0], ["investment", investment, 0, 1000000000000.0], ["purchase Price", purchasePrice, 1e-12, 1000000000000.0, false, true]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Share Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={sharePrice} onChange={e => setSharePrice(e.target.value)} step="0.01" placeholder="100" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Dividend / Share</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={annualDiv} onChange={e => setAnnualDiv(e.target.value)} step="0.01" placeholder="4" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Quarterly × 4 = annual</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Investment Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={investment} onChange={e => setInvestment(e.target.value)} placeholder="10000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Purchase Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} step="0.01" placeholder="Same as share price" />
          </div>
          <p className="text-xs text-gray-400 mt-1">For yield on cost</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Dividend Income</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Dividend Yield</p>
            <p className={`font-display text-3xl font-bold tabular ${yieldColor}`}>{fmt(yield_,2)}%</p>
            <p className="text-xs text-gray-400 mt-0.5">current yield</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Annual Income</p>
            <p className="font-display text-2xl font-bold tabular text-green-600 dark:text-green-400">${fmt(annualInc,2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{shares} shares × ${div}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Monthly Income</p>
            <p className="font-display text-2xl font-bold tabular text-green-600 dark:text-green-400">${fmt(monthlyInc,2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Quarterly Income</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">${fmt(quarterlyInc,2)}</p>
          </div>
        </div>
        {purchasePrice && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm">
            <span className="text-gray-400">Yield on Cost (your purchase price ${pp})</span>
            <span className={`font-semibold tabular ${yieldColor}`}>{fmt(yieldOnCost,2)}%</span>
          </div>
        )}
      </div>
    </CalculatorForm>
  );
}

// ─── Funding Rate Calculator ──────────────────────────────────────────────────
export function FundingRateCalc() {
  const [periodsDay, setPeriodsDay] = useState('3');
  const [posSize,      setPosSize]      = useState('10000');
  const [fundingRate,  setFundingRate]  = useState('0.01');
  const [periods,      setPeriods]      = useState('3');
  const [direction,    setDirection]    = useState<'long'|'short'>('long');

  const pos  = Number(posSize);
  const rate = (Number(fundingRate)) / 100;
  const per  = Number(periods);
  const ratePos = Number(fundingRate);

  const feePerPeriod = pos * rate;
  const totalFee     = feePerPeriod * per;
  const dailyFee     = feePerPeriod * Number(periodsDay);
  const weeklyFee    = dailyFee * 7;

  // positive rate: longs pay shorts. negative rate: shorts pay longs.
  const youPay = (ratePos > 0 && direction === 'long') || (ratePos < 0 && direction === 'short');
  const absRate = Math.abs(ratePos);

  const resultColor = youPay ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
  const bgColor     = youPay
    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
    : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
  const verdict = ratePos === 0 || pos === 0 ? 'No funding transfer' : youPay ? '↑ You PAY funding' : '↓ You RECEIVE funding';

  const error = inputError([["periods per day", periodsDay, 1, 24, true], ["pos Size", posSize, 0, 1000000000000.0], ["funding Rate", fundingRate, -100, 100], ["periods", periods, 0, 100000, true]]);

  return (
    <CalculatorForm error={error}>
      <NumberField label="Funding periods per day" value={periodsDay} onChange={setPeriodsDay} min={1} max={24} step={1} />
      {/* Direction toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Position</label>
        <div className="flex gap-2">
          {(['long','short'] as const).map(d => (
            <button key={d} onClick={() => setDirection(d)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold border transition-colors ${
                direction === d
                  ? d === 'long' ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600'
              }`}>
              {d === 'long' ? '▲ Long' : '▼ Short'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position Size (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={posSize} onChange={e => setPosSize(e.target.value)} placeholder="10000" min="0" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Notional value (leverage × margin)</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Funding Rate (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={fundingRate} onChange={e => setFundingRate(e.target.value)} step="0.001" placeholder="0.01" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Negative = shorts pay longs</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of funding settlements</label>
          <input className="calc-input" type="number" value={periods} onChange={e => setPeriods(e.target.value)} step="1" min="1" placeholder="3" />
          <p className="text-xs text-gray-400 mt-1">Daily projection uses the funding periods per day entered above.</p>
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${bgColor}`}>
        <p className={`text-xs font-semibold mb-4 ${resultColor}`}>{verdict} — {absRate}% per settlement</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Per Settlement</p>
            <p className={`font-display text-2xl font-bold tabular ${resultColor}`}>${fmt(Math.abs(feePerPeriod), 4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total ({per} periods)</p>
            <p className={`font-display text-2xl font-bold tabular ${resultColor}`}>${fmt(Math.abs(totalFee), 4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Daily (selected frequency)</p>
            <p className={`font-display text-2xl font-bold tabular ${resultColor}`}>${fmt(Math.abs(dailyFee), 4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Weekly</p>
            <p className={`font-display text-2xl font-bold tabular ${resultColor}`}>${fmt(Math.abs(weeklyFee), 2)}</p>
          </div>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Spread Cost Calculator ───────────────────────────────────────────────────
export function SpreadCostCalc() {
  const [spread,      setSpread]      = useState('1.2');
  const [lots,        setLots]        = useState('1');
  const [pipValue,    setPipValue]    = useState('10');
  const [tradesDay,   setTradesDay]   = useState('5');

  const sp  = Number(spread);
  const lo  = Number(lots);
  const pv  = Number(pipValue);
  const td  = Number(tradesDay);

  const costPerTrade  = sp * lo * pv;
  const costPerDay    = costPerTrade * td;
  const costPerMonth  = costPerDay * 22;
  const costPerYear   = costPerDay * 252;

  const error = inputError([["spread", spread, 0, 1000000000000.0], ["lots", lots, 0, 1000000000000.0], ["pip Value", pipValue, 0, 1000000000000.0], ["trades Day", tradesDay, 0, 100000, true]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Spread (pips)</label>
          <input className="calc-input" type="number" value={spread} onChange={e => setSpread(e.target.value)} step="0.1" min="0" placeholder="1.2" />
          <p className="text-xs text-gray-400 mt-1">EUR/USD ECN ≈ 0.1–0.5</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
          <input className="calc-input" type="number" value={lots} onChange={e => setLots(e.target.value)} step="0.01" min="0.01" placeholder="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pip Value (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={pipValue} onChange={e => setPipValue(e.target.value)} step="0.1" min="0" placeholder="10" />
          </div>
          <p className="text-xs text-gray-400 mt-1">EUR/USD 1 lot = $10</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trades per Day</label>
          <input className="calc-input" type="number" value={tradesDay} onChange={e => setTradesDay(e.target.value)} step="1" min="1" placeholder="5" />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Spread Cost Breakdown</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {[
            { label: 'Per Trade',  value: costPerTrade,  note: `${sp} pip × ${lo} lot × $${pv}` },
            { label: 'Per Day',    value: costPerDay,    note: `${td} trades/day` },
            { label: 'Per Month',  value: costPerMonth,  note: '22 trading days' },
            { label: 'Per Year',   value: costPerYear,   note: '252 trading days' },
          ].map(item => (
            <div key={item.label}>
              <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
              <p className="font-display text-2xl font-bold tabular text-red-600 dark:text-red-400">${fmt(item.value, 2)}</p>
              <p className="text-xs text-gray-400 mt-0.5">{item.note}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 At {sp} pips spread, you need the market to move <strong className="text-gray-700 dark:text-gray-300">{sp} pips</strong> in your favour just to break even on each trade. Over a year of {td} trades/day, spread costs <strong className="text-red-600 dark:text-red-400">${fmt(costPerYear, 2)}</strong>.
          </p>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Profit Factor Calculator ─────────────────────────────────────────────────
export function ProfitFactorCalc() {
  const [grossProfit, setGrossProfit] = useState('8200');
  const [grossLoss,   setGrossLoss]   = useState('4100');
  const [winTrades,   setWinTrades]   = useState('60');
  const [lossTrades,  setLossTrades]  = useState('40');

  const gp  = Number(grossProfit);
  const gl  = Number(grossLoss);
  const wt  = Number(winTrades);
  const lt  = Number(lossTrades);

  const pf         = gl > 0 ? gp / gl : gp > 0 ? Infinity : NaN;
  const totalTrades = wt + lt;
  const winRate    = totalTrades > 0 ? (wt / totalTrades) * 100 : 0;
  const avgWin     = wt > 0 ? gp / wt : 0;
  const avgLoss    = lt > 0 ? gl / lt : 0;
  const netProfit  = gp - gl;

  // Rating
  const rating = pf >= 3 ? { label: 'Excellent', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' }
    : pf >= 2  ? { label: 'Good',      color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' }
    : pf >= 1.5? { label: 'Acceptable',color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' }
    : pf >= 1  ? { label: 'Marginal',  color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800' }
    : { label: 'Losing Strategy', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' };

  const error = inputError([["gross Profit", grossProfit, 0, 1000000000000.0], ["gross Loss", grossLoss, 0, 1000000000000.0], ["win Trades", winTrades, 0, 1000000000.0, true], ["loss Trades", lossTrades, 0, 1000000000.0, true]]) || ((wt === 0 && gp > 0) || (lt === 0 && gl > 0) || (wt > 0 && gp === 0) || (lt > 0 && gl === 0) ? 'Trade counts must match the winning and losing P&L totals.' : undefined);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gross Profit (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={grossProfit} onChange={e => setGrossProfit(e.target.value)} placeholder="8200" min="0" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Sum of all winning trades</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gross Loss (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={grossLoss} onChange={e => setGrossLoss(e.target.value)} placeholder="4100" min="0" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Sum of all losing trades</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Winning Trades</label>
          <input className="calc-input" type="number" value={winTrades} onChange={e => setWinTrades(e.target.value)} step="1" min="0" placeholder="60" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Losing Trades</label>
          <input className="calc-input" type="number" value={lossTrades} onChange={e => setLossTrades(e.target.value)} step="1" min="0" placeholder="40" />
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${rating.bg}`}>
        <p className={`text-xs font-semibold mb-4 ${rating.color}`}>Strategy Rating: {rating.label}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Profit Factor</p>
            <p className={`font-display text-3xl font-bold tabular ${rating.color}`}>{pf === Infinity ? '∞ (no losses)' : fmt(pf, 2)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Net Profit</p>
            <p className={`font-display text-2xl font-bold tabular ${netProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {netProfit >= 0 ? '+$' : '-$'}{fmt(Math.abs(netProfit), 2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Win Rate</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">{fmt(winRate, 1)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Trades</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">{totalTrades}</p>
          </div>
        </div>
        {wt > 0 && lt > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Avg Win</span>
              <span className="font-semibold tabular text-green-600 dark:text-green-400">+${fmt(avgWin, 2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Avg Loss</span>
              <span className="font-semibold tabular text-red-600 dark:text-red-400">-${fmt(avgLoss, 2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Rating scale */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        {[
          { range: '< 1.0', label: 'Losing',     color: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
          { range: '1.0–1.5', label: 'Marginal',  color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
          { range: '1.5–2.0', label: 'Acceptable',color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
          { range: '> 2.0',  label: 'Good+',      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
        ].map(r => (
          <div key={r.range} className={`rounded-lg p-2 ${r.color}`}>
            <p className="font-bold">{r.range}</p>
            <p className="opacity-75">{r.label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">No losing trades means an unbounded sample ratio, not proof of a reliable strategy. Use winning and losing P&L measured consistently after costs, or label both before costs.</p>
    </CalculatorForm>
  );
}

// ─── ATR Stop Loss Calculator ─────────────────────────────────────────────────
export function AtrStopLossCalc() {
  const [pipSize, setPipSize] = useState('0.0001');
  const [atr,        setAtr]        = useState('80');
  const [multiplier, setMultiplier] = useState('2');
  const [entry,      setEntry]      = useState('1.1050');
  const [direction,  setDirection]  = useState<'long'|'short'>('long');
  const [rrRatio,    setRrRatio]    = useState('2');

  const atrV  = Number(atr);
  const mul   = Number(multiplier);
  const ep    = Number(entry);
  const rr    = Number(rrRatio);

  const stopDist = atrV * mul;
  const sl = direction === 'long' ? ep - stopDist * Number(pipSize) : ep + stopDist * Number(pipSize);
  const tp1 = direction === 'long' ? ep + (stopDist * Number(pipSize)) * 1 : ep - (stopDist * Number(pipSize)) * 1;
  const tp2 = direction === 'long' ? ep + (stopDist * Number(pipSize)) * rr : ep - (stopDist * Number(pipSize)) * rr;
  const tp3 = direction === 'long' ? ep + (stopDist * Number(pipSize)) * 3 : ep - (stopDist * Number(pipSize)) * 3;

  const slColor = direction === 'long' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
  const tpColor = direction === 'long' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';

  const error = inputError([["pip Size", pipSize, 1e-12, 1000000000000.0], ["atr", atr, 1e-12, 1000000000000.0], ["multiplier", multiplier, 1e-12, 1000], ["entry", entry, 0, 1000000000000.0], ["rr Ratio", rrRatio, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <NumberField label="Price change per ATR unit (JPY pip: 0.01; price units: 1)" value={pipSize} onChange={setPipSize} min={1e-08} />
      {/* Direction toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trade Direction</label>
        <div className="flex gap-2">
          {(['long','short'] as const).map(d => (
            <button key={d} onClick={() => setDirection(d)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold border transition-colors ${
                direction === d
                  ? d === 'long' ? 'bg-green-600 text-white border-green-600' : 'bg-red-600 text-white border-red-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600'
              }`}>
              {d === 'long' ? '▲ Long' : '▼ Short'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ATR Value (pips)</label>
          <input className="calc-input" type="number" value={atr} onChange={e => setAtr(e.target.value)} step="1" min="0" placeholder="80" />
          <p className="text-xs text-gray-400 mt-1">14-period ATR from chart</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ATR Multiplier</label>
          <input className="calc-input" type="number" value={multiplier} onChange={e => setMultiplier(e.target.value)} step="0.5" min="0.5" placeholder="2" />
          <p className="text-xs text-gray-400 mt-1">1.5 tight · 2 standard · 3 wide</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entry Price</label>
          <input className="calc-input" type="number" value={entry} onChange={e => setEntry(e.target.value)} step="0.0001" placeholder="1.1050" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">R:R for TP2</label>
          <input className="calc-input" type="number" value={rrRatio} onChange={e => setRrRatio(e.target.value)} step="0.5" min="0.5" placeholder="2" />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">ATR Stop Loss Levels</p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-400">Stop Loss ({fmt(mul,1)}× ATR)</p>
              <p className="text-xs text-gray-400 mt-0.5">{fmt(stopDist, 1)} pips from entry</p>
            </div>
            <p className={`font-display text-xl font-bold tabular ${slColor}`}>{fmt(sl, 4)}</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-400">Take Profit 1 (1R)</p>
              <p className="text-xs text-gray-400 mt-0.5">{fmt(stopDist, 1)} pips from entry</p>
            </div>
            <p className={`font-display text-xl font-bold tabular ${tpColor}`}>{fmt(tp1, 4)}</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div>
              <p className="text-xs text-gray-400">Take Profit 2 ({rr}R)</p>
              <p className="text-xs text-gray-400 mt-0.5">{fmt(stopDist * rr, 1)} pips from entry</p>
            </div>
            <p className={`font-display text-xl font-bold tabular ${tpColor}`}>{fmt(tp2, 4)}</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-xs text-gray-400">Take Profit 3 (3R)</p>
              <p className="text-xs text-gray-400 mt-0.5">{fmt(stopDist * 3, 1)} pips from entry</p>
            </div>
            <p className={`font-display text-xl font-bold tabular ${tpColor}`}>{fmt(tp3, 4)}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm">
          <span className="text-gray-400">ATR × Multiplier</span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">{atrV} × {mul} = <strong>{fmt(stopDist, 1)} pips</strong></span>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Enter ATR in the same units as the conversion above. ATR is based on true range, including gaps. These are planned levels, not guaranteed fills or position sizes.</p>
    </CalculatorForm>
  );
}

// ─── Stock Profit Calculator ──────────────────────────────────────────────────
export function StockProfitCalc() {
  const [buyPrice,    setBuyPrice]    = useState('50');
  const [sellPrice,   setSellPrice]   = useState('65');
  const [shares,      setShares]      = useState('100');
  const [buyComm,     setBuyComm]     = useState('0');
  const [sellComm,    setSellComm]    = useState('0');

  const bp    = Number(buyPrice);
  const sp    = Number(sellPrice);
  const sh    = Number(shares);
  const bc    = Number(buyComm);
  const sc    = Number(sellComm);

  const totalCost    = bp * sh + bc;
  const grossProc    = sp * sh;
  const totalComm    = bc + sc;
  const grossProfit  = (sp - bp) * sh;
  const netProfit    = grossProfit - totalComm;
  const roi          = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
  const isGain       = netProfit >= 0;

  const pnlColor = isGain ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const bgColor  = isGain ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';

  const error = inputError([["buy Price", buyPrice, 0, 1000000000000.0], ["sell Price", sellPrice, 0, 1000000000000.0], ["shares", shares, 0, 1000000000000.0], ["buy Comm", buyComm, 0, 1000000000000.0], ["sell Comm", sellComm, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Buy Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} step="0.01" placeholder="50" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sell Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={sellPrice} onChange={e => setSellPrice(e.target.value)} step="0.01" placeholder="65" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Shares</label>
          <input className="calc-input" type="number" value={shares} onChange={e => setShares(e.target.value)} step="1" min="1" placeholder="100" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Buy Commission (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={buyComm} onChange={e => setBuyComm(e.target.value)} step="0.01" min="0" placeholder="0" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Leave 0 for zero-commission brokers</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sell Commission (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={sellComm} onChange={e => setSellComm(e.target.value)} step="0.01" min="0" placeholder="0" />
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${bgColor}`}>
        <p className={`text-xs font-semibold mb-4 ${pnlColor}`}>{isGain ? '✓ Profitable Trade' : '✗ Losing Trade'}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Net Profit</p>
            <p className={`font-display text-2xl font-bold tabular ${pnlColor}`}>
              {isGain ? '+$' : '-$'}{fmt(Math.abs(netProfit), 2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">ROI</p>
            <p className={`font-display text-2xl font-bold tabular ${pnlColor}`}>
              {isGain ? '+' : ''}{fmt(roi, 2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Invested</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">
              ${fmt(totalCost, 2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Commission</p>
            <p className="font-display text-2xl font-bold tabular text-gray-500 dark:text-gray-400">
              ${fmt(totalComm, 2)}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Gross Profit</span>
            <span className={`font-semibold tabular ${pnlColor}`}>{grossProfit >= 0 ? '+$' : '-$'}{fmt(Math.abs(grossProfit), 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Gross Proceeds</span>
            <span className="font-semibold tabular text-gray-700 dark:text-gray-300">${fmt(grossProc, 2)}</span>
          </div>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Crypto Profit Calculator ─────────────────────────────────────────────────
export function CryptoProfitCalc() {
  const [investment, setInvestment] = useState('1000');
  const [buyPrice,   setBuyPrice]   = useState('50000');
  const [sellPrice,  setSellPrice]  = useState('65000');
  const [fee,        setFee]        = useState('0.1');

  const inv  = Number(investment);
  const bp   = Number(buyPrice);
  const sp   = Number(sellPrice);
  const feeP = (Number(fee)) / 100;

  const coins        = inv / bp;
  const buyFee       = inv * feeP;
  const grossProc    = coins * sp;
  const sellFee      = grossProc * feeP;
  const totalFees    = buyFee + sellFee;
  const netProfit    = grossProc - inv - totalFees;
  const roi          = inv > 0 ? (netProfit / (inv + buyFee)) * 100 : 0;
  const isGain       = netProfit >= 0;

  const pnlColor = isGain ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  const bgColor  = isGain ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                          : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';

  const error = inputError([["investment", investment, 0, 1000000000000.0], ["buy Price", buyPrice, 1e-12, 1000000000000.0], ["sell Price", sellPrice, 0, 1000000000000.0], ["fee", fee, 0, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Investment Amount (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={investment} onChange={e => setInvestment(e.target.value)} placeholder="1000" min="0" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exchange Fee (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={fee} onChange={e => setFee(e.target.value)} step="0.01" min="0" placeholder="0.1" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Binance 0.1% · Coinbase 0.5% · Kraken 0.26%</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Buy Price (USD per coin)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={buyPrice} onChange={e => setBuyPrice(e.target.value)} placeholder="50000" min="0" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sell Price (USD per coin)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={sellPrice} onChange={e => setSellPrice(e.target.value)} placeholder="65000" min="0" />
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${bgColor}`}>
        <p className={`text-xs font-semibold mb-4 ${pnlColor}`}>{isGain ? '✓ Profitable Trade' : '✗ Losing Trade'}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Net Profit</p>
            <p className={`font-display text-2xl font-bold tabular ${pnlColor}`}>
              {isGain ? '+$' : '-$'}{fmt(Math.abs(netProfit), 2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">ROI</p>
            <p className={`font-display text-2xl font-bold tabular ${pnlColor}`}>
              {isGain ? '+' : ''}{fmt(roi, 2)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Coins Bought</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">
              {fmt(coins, 6)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Fees</p>
            <p className="font-display text-2xl font-bold tabular text-gray-500 dark:text-gray-400">
              ${fmt(totalFees, 2)}
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Gross Proceeds</span>
            <span className="font-semibold tabular text-gray-700 dark:text-gray-300">${fmt(grossProc, 2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Price Change</span>
            <span className={`font-semibold tabular ${isGain ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {isGain ? '+' : ''}{fmt(((sp - bp) / bp) * 100, 2)}%
            </span>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Investment is purchase notional; the buy fee is paid in addition. ROI uses total cash paid including the buy fee. Spot only; no leverage, funding or tax modelling.</p>
    </CalculatorForm>
  );
}

// ─── Martingale Calculator ────────────────────────────────────────────────────
export function MartingaleCalc() {
  const [startLot,    setStartLot]    = useState('0.01');
  const [multiplier,  setMultiplier]  = useState('2');
  const [levels,      setLevels]      = useState('8');
  const [pipSpacing,  setPipSpacing]  = useState('50');

  const sl  = Number(startLot);
  const mul = Number(multiplier);
  const lvl = Math.min(Math.max(parseInt(levels) || 1, 1), 15);
  const ps  = Number(pipSpacing);

  // Build grid
  const grid = Array.from({ length: lvl }, (_, i) => {
    const lot        = sl * Math.pow(mul, i);
    const cumLots    = Array.from({ length: i + 1 }, (_, j) => sl * Math.pow(mul, j))
                           .reduce((a, b) => a + b, 0);
    const pipOffset  = ps * i;
    return { level: i + 1, lot: fmt(lot, 2), cumLots: fmt(cumLots, 2), pipOffset };
  });

  const maxExposure = grid[grid.length - 1].cumLots;
  const isAggressive = mul >= 2;

  const error = inputError([["start Lot", startLot, 1e-12, 1000000.0], ["multiplier", multiplier, 1, 10], ["levels", levels, 1, 15, true], ["pip Spacing", pipSpacing, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Starting Lot</label>
          <input className="calc-input" type="number" value={startLot} onChange={e => setStartLot(e.target.value)} step="0.01" min="0.01" placeholder="0.01" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Multiplier</label>
          <input className="calc-input" type="number" value={multiplier} onChange={e => setMultiplier(e.target.value)} step="0.1" min="1.1" placeholder="2" />
          <p className="text-xs text-gray-400 mt-1">Classic = 2.0</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Levels</label>
          <input className="calc-input" type="number" value={levels} onChange={e => setLevels(e.target.value)} step="1" min="1" max="15" placeholder="8" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pip Spacing</label>
          <input className="calc-input" type="number" value={pipSpacing} onChange={e => setPipSpacing(e.target.value)} step="1" min="1" placeholder="50" />
        </div>
      </div>

      {isAggressive && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
          <p className="text-xs font-semibold text-red-600 dark:text-red-400">⚠ High Risk Strategy</p>
          <p className="text-xs text-red-500 dark:text-red-400 mt-1">Martingale with a 2x multiplier grows exponentially. A {lvl}-level grid requires {maxExposure} total lots of exposure. Ensure your account can support the full grid before trading.</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">Level</th>
              <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">Lot Size</th>
              <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">Cumulative Lots</th>
              <th className="text-right py-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400">Pip Offset</th>
            </tr>
          </thead>
          <tbody>
            {grid.map((row, i) => (
              <tr key={row.level} className={`border-b border-gray-100 dark:border-gray-800 ${i === grid.length - 1 ? 'bg-red-50 dark:bg-red-900/10' : i % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/20' : ''}`}>
                <td className="py-2 px-3 font-semibold text-gray-700 dark:text-gray-300">L{row.level}</td>
                <td className="py-2 px-3 text-right tabular text-amber-600 dark:text-amber-400 font-semibold">{row.lot}</td>
                <td className="py-2 px-3 text-right tabular text-gray-700 dark:text-gray-300">{row.cumLots}</td>
                <td className="py-2 px-3 text-right tabular text-gray-500 dark:text-gray-400">{row.pipOffset} pips</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CalculatorForm>
  );
}

// ─── Liquidation Price Calculator ─────────────────────────────────────────────
export function LiquidationCalc() {
  const [side,        setSide]        = useState<'long' | 'short'>('long');
  const [entryPrice,  setEntryPrice]  = useState('65000');
  const [leverage,    setLeverage]    = useState('10');
  const [maintMargin, setMaintMargin] = useState('0.5');

  const ep   = Number(entryPrice);
  const lev  = Number(leverage);
  const mm   = (Number(maintMargin)) / 100;

  // Liquidation price formula (isolated linear model)
  const liqPrice = side === 'long'
    ? ep * (1 - 1 / lev) / (1 - mm)
    : ep * (1 + 1 / lev) / (1 + mm);

  const distancePct = ep > 0 ? Math.abs((liqPrice - ep) / ep) * 100 : 0;
  const distancePips = Math.abs(liqPrice - ep);

  // Risk rating
  const isHighRisk = lev >= 20;
  const isVeryHighRisk = lev >= 50;
  const riskColor = isVeryHighRisk ? 'text-red-600 dark:text-red-400'
    : isHighRisk ? 'text-orange-500 dark:text-orange-400'
    : 'text-green-600 dark:text-green-400';
  const riskLabel = isVeryHighRisk ? '⚠ Extreme Risk' : isHighRisk ? '⚠ High Risk' : '✓ Moderate Risk';

  const error = inputError([["entry Price", entryPrice, 1e-12, 1000000000000.0], ["leverage", leverage, 1, 100000], ["maint Margin", maintMargin, 0, 99.99]]) || (mm >= 1 / lev ? 'Maintenance margin must be lower than initial margin (100 / leverage).' : undefined);

  return (
    <CalculatorForm error={error}>
      {/* Side toggle */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position Side</label>
        <div className="flex gap-2">
          {(['long', 'short'] as const).map(s => (
            <button
              key={s}
              onClick={() => setSide(s)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold border transition-colors ${
                side === s
                  ? s === 'long'
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-red-600 text-white border-red-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600'
              }`}
            >
              {s === 'long' ? '▲ Long' : '▼ Short'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entry Price (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={entryPrice} onChange={e => setEntryPrice(e.target.value)} placeholder="65000" min="0" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Leverage</label>
          <div className="relative">
            <input className="calc-input pr-7" type="number" value={leverage} onChange={e => setLeverage(e.target.value)} step="1" min="1" max="125" placeholder="10" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">x</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Max 125x on Binance Futures</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Maintenance Margin (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={maintMargin} onChange={e => setMaintMargin(e.target.value)} step="0.1" min="0" placeholder="0.5" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Binance ≈ 0.5% · Bybit ≈ 0.5%</p>
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${isVeryHighRisk ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'}`}>
        <p className={`text-xs font-semibold mb-4 ${riskColor}`}>{riskLabel} — {lev}x {side.toUpperCase()}</p>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Liquidation Price</p>
            <p className={`font-display text-2xl font-bold tabular ${side === 'long' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
              ${fmt(liqPrice, 2)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{side === 'long' ? 'below' : 'above'} entry</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Distance from Entry</p>
            <p className="font-display text-2xl font-bold tabular text-amber-500 dark:text-amber-400">
              {fmt(distancePct, 2)}%
            </p>
            <p className="text-xs text-gray-400 mt-0.5">${fmt(distancePips, 2)} move</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Entry Price</p>
            <p className="font-display text-2xl font-bold tabular text-gray-800 dark:text-gray-200">
              ${fmt(ep, 2)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{lev}x leverage</p>
          </div>
        </div>

        {isHighRisk && (
          <p className="text-xs mt-4 text-red-500 dark:text-red-400">
            ⚠ At {lev}x leverage, a {fmt(distancePct, 1)}% adverse move liquidates your position. Always set a stop-loss well above your liquidation price.
          </p>
        )}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Model: isolated, linear USD-settled contract; initial collateral = entry notional / leverage and maintenance = current notional × maintenance rate. No extra collateral, fees, funding, tiers or maintenance deductions. Use your exchange’s mark-price trigger for actual orders.</p>
    </CalculatorForm>
  );
}

// ─── XAUUSD Pip Calculator ────────────────────────────────────────────────────
export function XauusdPipCalc() {
  const [lots, setLots]   = useState('1');
  const [pips, setPips]   = useState('100');

  const lotsV  = Number(lots);
  const pipsV  = Number(pips);

  // XAUUSD: 1 lot = 100 oz, 1 pip = $0.01, so pip value = lots × 100 × 0.01 = lots × 1
  const pipValue  = lotsV * 100 * 0.01;   // $ per pip
  const totalPnL  = pipValue * pipsV;

  // Lot breakdown
  const LOT_SIZES = [
    { label: 'Standard (1.0)', multiplier: 1 },
    { label: 'Mini (0.10)',     multiplier: 0.1 },
    { label: 'Micro (0.01)',    multiplier: 0.01 },
  ];

  const error = inputError([["lots", lots, 0, 1000000000000.0], ["pips", pips, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
          <input className="calc-input" type="number" value={lots} onChange={e => setLots(e.target.value)} step="0.01" min="0.01" placeholder="1" />
          <p className="text-xs text-gray-400 mt-1">1 lot = 100 oz of gold</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pip Movement</label>
          <input className="calc-input" type="number" value={pips} onChange={e => setPips(e.target.value)} step="1" min="0" placeholder="100" />
          <p className="text-xs text-gray-400 mt-1">1 pip = $0.01 price change in XAUUSD</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Gold Pip Calculation</p>
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Pip Value (per pip)</p>
            <p className="font-display text-2xl font-bold tabular text-amber-500 dark:text-amber-400">
              ${fmt(pipValue, 2)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">per pip at {lots} lot{parseFloat(lots) !== 1 ? 's' : ''}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total P&L ({pips} pips)</p>
            <p className={`font-display text-2xl font-bold tabular ${totalPnL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              ${fmt(Math.abs(totalPnL), 2)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">for {pips} pip move</p>
          </div>
        </div>

        {/* Lot size reference */}
        <p className="section-label mb-3">Pip Value Reference</p>
        <div className="grid grid-cols-3 gap-3">
          {LOT_SIZES.map(ls => (
            <div key={ls.label} className="bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700 text-center">
              <p className="text-xs text-gray-400 mb-1">{ls.label}</p>
              <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 tabular">${fmt(ls.multiplier * 100 * 0.01, 2)}/pip</p>
            </div>
          ))}
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Rebate Calculator ────────────────────────────────────────────────────────
export function RebateCalc() {
  const [lotsPerMonth, setLotsPerMonth]     = useState('100');
  const [rebatePerLot, setRebatePerLot]     = useState('5');
  const [tradingDays,  setTradingDays]      = useState('20');

  const lots     = Number(lotsPerMonth);
  const rebate   = Number(rebatePerLot);
  const days     = Number(tradingDays);

  const monthly  = lots * rebate;
  const annual   = monthly * 12;
  const daily    = monthly / days;
  const lotsDay  = lots / days;

  // Popular rates reference
  const RATES = [
    { broker: 'Illustrative rate', rate: 3.50 },
    { broker: 'Illustrative rate', rate: 3.00 },
    { broker: 'Illustrative rate', rate: 3.00 },
    { broker: 'Illustrative rate', rate: 2.00 },
  ];

  const error = inputError([["lots Per Month", lotsPerMonth, 0, 1000000000000.0], ["rebate Per Lot", rebatePerLot, 0, 1000000000000.0], ["trading Days", tradingDays, 1, 366, true]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lots per Month</label>
          <input className="calc-input" type="number" value={lotsPerMonth} onChange={e => setLotsPerMonth(e.target.value)} step="1" min="0" placeholder="100" />
          <p className="text-xs text-gray-400 mt-1">Standard lots traded monthly</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rebate per Lot (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={rebatePerLot} onChange={e => setRebatePerLot(e.target.value)} step="0.10" min="0" placeholder="5" />
          </div>
          <p className="text-xs text-gray-400 mt-1">Typical range: $2–$8/lot</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trading Days / Month</label>
          <input className="calc-input" type="number" value={tradingDays} onChange={e => setTradingDays(e.target.value)} step="1" min="1" max="31" placeholder="20" />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Rebate Earnings</p>
        <div className="grid grid-cols-3 gap-5 mb-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Daily</p>
            <p className="font-display text-2xl font-bold tabular text-green-600 dark:text-green-400">${fmt(daily, 2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{fmt(lotsDay, 1)} lots/day</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 dark:border-amber-800 -m-1">
            <p className="text-xs text-gray-400 mb-0.5">Monthly</p>
            <p className="font-display text-2xl font-bold tabular text-amber-600 dark:text-amber-400">${fmt(monthly, 2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">{lots} lots × ${rebate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Annual</p>
            <p className="font-display text-2xl font-bold tabular text-green-600 dark:text-green-400">${fmt(annual, 2)}</p>
            <p className="text-xs text-gray-400 mt-0.5">monthly × 12</p>
          </div>
        </div>

        {/* Broker rates reference */}
        <p className="section-label mb-3">Illustrative Rebate Rates</p>
        <div className="space-y-2">
          {RATES.map(r => {
            const est = lots * r.rate;
            return (
              <div key={r.broker} className="flex items-center justify-between text-sm bg-white dark:bg-gray-900 rounded-lg px-4 py-2.5 border border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">{r.broker}</span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">${r.rate.toFixed(2)}/lot</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200 tabular">${fmt(est, 2)}/mo</span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-400 mt-2">* Rates are approximate. Actual rebates vary by volume tier and account type.</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Rebates are conditional cost offsets. Check eligibility, spreads, commission, volume terms and intermediary conflicts; trading more to earn rebates can increase losses.</p>
    </CalculatorForm>
  );
}

// ─── Swap / Rollover Calculator ─────────────────────────────────────────────
export function SwapCalc() {
  const [swapRate, setSwapRate] = useState('-6.5');
  // Swap rates per standard lot per night (in USD, approximate)
  const SWAP_RATES: Record<string, { long: number; short: number }> = {
    'EUR/USD': { long: -6.50,  short:  0.80 },
    'GBP/USD': { long: -4.20,  short: -1.10 },
    'USD/JPY': { long:  2.30,  short: -8.40 },
    'USD/CHF': { long:  0.70,  short: -6.20 },
    'AUD/USD': { long: -1.80,  short: -3.40 },
    'USD/CAD': { long: -2.10,  short: -2.80 },
    'NZD/USD': { long: -1.50,  short: -3.20 },
    'EUR/GBP': { long: -2.80,  short:  0.30 },
    'EUR/JPY': { long: -1.20,  short: -5.60 },
    'GBP/JPY': { long:  0.40,  short: -8.90 },
    'AUD/JPY': { long:  3.10,  short: -9.20 },
    'EUR/CHF': { long: -5.40,  short: -0.60 },
    'USD/MXN': { long: 45.00,  short: -62.00 },
    'USD/ZAR': { long: 28.00,  short: -45.00 },
  };

  const pairs = Object.keys(SWAP_RATES);
  const [pair,      setPair]      = useState('EUR/USD');
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [lots,      setLots]      = useState('1');
  const [days,      setDays]      = useState('3');

  const l      = Number(lots);
  const d      = Number(days);
  const rate   = Number(swapRate);
  const total  = rate * l * d;
  const perNight = rate * l;

  const isPositive = total >= 0;

  const error = inputError([["swap Rate", swapRate, -1000000.0, 1000000.0], ["lots", lots, 0, 1000000000000.0], ["days", days, 0, 100000, true]]);

  return (
    <CalculatorForm error={error}>
      <NumberField label="Broker swap: USD per lot per charged day" value={swapRate} onChange={setSwapRate} min={-1000000} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Currency Pair</label>
          <select className="calc-select" value={pair} onChange={e => { setPair(e.target.value); setSwapRate(String(SWAP_RATES[e.target.value][direction])); }}>
            {pairs.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position Direction</label>
          <div className="grid grid-cols-2 gap-2">
            {(['long', 'short'] as const).map(d => (
              <button
                key={d}
                onClick={() => { setDirection(d); setSwapRate(String(SWAP_RATES[pair][d])); }}
                className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${direction === d
                  ? d === 'long' ? 'bg-green-500 text-white border-green-500' : 'bg-red-500 text-white border-red-500'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}
              >
                {d === 'long' ? '▲ Long (Buy)' : '▼ Short (Sell)'}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
          <input className="calc-input" type="number" value={lots} onChange={e => setLots(e.target.value)} step="0.01" placeholder="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Nights</label>
          <input className="calc-input" type="number" value={days} onChange={e => setDays(e.target.value)} min="1" placeholder="3" />
          <p className="text-xs text-gray-400 mt-1">Wednesday = 3 nights (triple swap)</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Swap Result</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Total Swap ({d} nights)</p>
            <p className={`font-display text-3xl font-bold tabular ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {isPositive ? '+' : ''}{fmt(total, 2)} <span className="text-sm">USD</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Per Night</p>
            <p className={`font-display text-2xl font-bold tabular ${perNight >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {perNight >= 0 ? '+' : ''}{fmt(perNight, 2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Swap Type</p>
            <p className={`font-semibold text-lg ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
              {isPositive ? '✓ Credit' : '✗ Debit'}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Swap rate for {pair} {direction}: {rate >= 0 ? '+' : ''}{fmt(rate, 2)} USD/lot/night · Rates are indicative and vary by broker.
        </p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Pair presets are sample values, not live broker quotes. Enter the actual USD swap per lot and charged settlement days: a triple rollover counts as three. If your broker quotes points or annual percent, convert first.</p>
    </CalculatorForm>
  );
}

// ─── Pivot Point Calculator ───────────────────────────────────────────────────
export function PivotPointCalc() {
  const [high,  setHigh]  = useState('1.0950');
  const [low,   setLow]   = useState('1.0820');
  const [close, setClose] = useState('1.0900');
  const [type,  setType]  = useState<'classic' | 'fibonacci' | 'camarilla' | 'woodie'>('classic');

  const H = Number(high);
  const L = Number(low);
  const C = Number(close);

  let PP = 0, R1 = 0, R2 = 0, R3 = 0, S1 = 0, S2 = 0, S3 = 0;
  const range = H - L;

  if (type === 'classic') {
    PP = (H + L + C) / 3;
    R1 = 2 * PP - L;  R2 = PP + range;  R3 = H + 2 * (PP - L);
    S1 = 2 * PP - H;  S2 = PP - range;  S3 = L - 2 * (H - PP);
  } else if (type === 'fibonacci') {
    PP = (H + L + C) / 3;
    R1 = PP + 0.382 * range;  R2 = PP + 0.618 * range;  R3 = PP + range;
    S1 = PP - 0.382 * range;  S2 = PP - 0.618 * range;  S3 = PP - range;
  } else if (type === 'camarilla') {
    PP = (H + L + C) / 3;
    R1 = C + range * 1.1 / 12;  R2 = C + range * 1.1 / 6;  R3 = C + range * 1.1 / 4;
    S1 = C - range * 1.1 / 12;  S2 = C - range * 1.1 / 6;  S3 = C - range * 1.1 / 4;
  } else { // woodie
    PP = (H + L + 2 * C) / 4;
    R1 = 2 * PP - L;  R2 = PP + range;  R3 = R1 + range;
    S1 = 2 * PP - H;  S2 = PP - range;  S3 = S1 - range;
  }

  const dec = Math.min(12, Math.max(String(close).split('.')[1]?.length ?? 4, 4));
  const levels = [
    { label: 'R3', value: R3, color: 'text-red-700 dark:text-red-300' },
    { label: 'R2', value: R2, color: 'text-red-500 dark:text-red-400' },
    { label: 'R1', value: R1, color: 'text-red-400 dark:text-red-500' },
    { label: 'PP', value: PP, color: 'text-amber-500 dark:text-amber-400 font-bold text-base' },
    { label: 'S1', value: S1, color: 'text-green-400 dark:text-green-500' },
    { label: 'S2', value: S2, color: 'text-green-500 dark:text-green-400' },
    { label: 'S3', value: S3, color: 'text-green-700 dark:text-green-300' },
  ];

  const error = inputError([["high", high, 0, 1000000000000.0], ["low", low, 0, 1000000000000.0], ["close", close, 0, 1000000000000.0]]) || (H <= L || C < L || C > H ? 'High must exceed low, and close must be within that range.' : undefined);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Previous High</label>
          <input className="calc-input" type="number" value={high} onChange={e => setHigh(e.target.value)} step="0.0001" placeholder="1.0950" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Previous Low</label>
          <input className="calc-input" type="number" value={low} onChange={e => setLow(e.target.value)} step="0.0001" placeholder="1.0820" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Previous Close</label>
          <input className="calc-input" type="number" value={close} onChange={e => setClose(e.target.value)} step="0.0001" placeholder="1.0900" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pivot Type</label>
        <div className="grid grid-cols-4 gap-2">
          {(['classic', 'fibonacci', 'camarilla', 'woodie'] as const).map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-colors capitalize ${type === t
                ? 'bg-amber-500 text-white border-amber-500'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4 capitalize">{type} Pivot Points</p>
        <div className="space-y-2">
          {levels.map(lv => (
            <div key={lv.label} className={`flex items-center justify-between py-2 px-3 rounded-lg ${lv.label === 'PP' ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800' : ''}`}>
              <span className="font-mono text-sm font-bold text-gray-500 dark:text-gray-400 w-8">{lv.label}</span>
              <span className={`font-mono font-semibold tabular ${lv.color}`}>{fmt(lv.value, dec)}</span>
              <span className="text-xs text-gray-400 w-24 text-right">
                {lv.label === 'PP' ? 'Pivot Point' : lv.label.startsWith('R') ? 'Resistance' : 'Support'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Fibonacci Calculator ─────────────────────────────────────────────────────
export function FibonacciCalc() {
  const [high,  setHigh]  = useState('1.1200');
  const [low,   setLow]   = useState('1.0800');
  const [trend, setTrend] = useState<'up' | 'down'>('up');

  const H = Number(high);
  const L = Number(low);
  const diff = H - L;
  const dec = Math.min(12, Math.max(String(high).split('.')[1]?.length ?? 4, 4));

  const RETRACE = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
  const EXTEND  = [1.272, 1.618, 2.618];

  const retraceLevels = RETRACE.map(r => ({
    label: `${(r * 100).toFixed(1)}%`,
    value: trend === 'up' ? H - diff * r : L + diff * r,
    isKey: [0.382, 0.5, 0.618].includes(r),
  }));

  const extendLevels = EXTEND.map(r => ({
    label: `${(r * 100).toFixed(1)}%`,
    value: trend === 'up' ? L + diff * r : H - diff * r,
  }));

  const error = inputError([["high", high, 0, 1000000000000.0], ["low", low, 0, 1000000000000.0]]) || (H <= L ? 'High must exceed low.' : undefined);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Swing High</label>
          <input className="calc-input" type="number" value={high} onChange={e => setHigh(e.target.value)} step="0.0001" placeholder="1.1200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Swing Low</label>
          <input className="calc-input" type="number" value={low} onChange={e => setLow(e.target.value)} step="0.0001" placeholder="1.0800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trend Direction</label>
          <div className="grid grid-cols-2 gap-2">
            {(['up', 'down'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTrend(t)}
                className={`py-2 rounded-lg text-sm font-semibold border transition-colors ${trend === t
                  ? t === 'up' ? 'bg-green-500 text-white border-green-500' : 'bg-red-500 text-white border-red-500'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'}`}
              >
                {t === 'up' ? '▲ Uptrend' : '▼ Downtrend'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Retracement levels */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <p className="section-label mb-3">Retracement Levels</p>
          <div className="space-y-1.5">
            {retraceLevels.map(lv => (
              <div key={lv.label} className={`flex justify-between items-center py-1.5 px-2 rounded-lg ${lv.isKey ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}>
                <span className={`text-xs font-mono font-bold ${lv.isKey ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'}`}>{lv.label}</span>
                <span className={`font-mono text-sm font-semibold tabular ${lv.isKey ? 'text-amber-600 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'}`}>
                  {fmt(lv.value, dec)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">Highlighted = key levels</p>
        </div>

        {/* Extension levels */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
          <p className="section-label mb-3">Extension Levels (Targets)</p>
          <div className="space-y-1.5">
            {extendLevels.map(lv => (
              <div key={lv.label} className="flex justify-between items-center py-1.5 px-2 rounded-lg">
                <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400">{lv.label}</span>
                <span className="font-mono text-sm font-semibold text-blue-600 dark:text-blue-400 tabular">{fmt(lv.value, dec)}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">Use for take-profit targets</p>

          {/* Range info */}
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Swing Range</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300 tabular">{fmt(Math.abs(diff), dec)}</span>
            </div>
          </div>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Pip to Dollar Calculator ────────────────────────────────────────────────
export function PipToDollarCalc() {
  const [pips,    setPips]    = useState('50');
  const [pipVal,  setPipVal]  = useState('10');
  const [lots,    setLots]    = useState('1');

  const p  = Number(pips);
  const pv = Number(pipVal);
  const l  = Number(lots);

  const total = p * pv * l;

  const LOT_TABLE = [
    { label: 'Standard (1.0)', value: 1 },
    { label: 'Mini (0.1)',     value: 0.1 },
    { label: 'Micro (0.01)',   value: 0.01 },
  ];

  const error = inputError([["pips", pips, -1000000000000.0, 1000000000000.0], ["pip Val", pipVal, 1e-12, 1000000000000.0], ["lots", lots, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Pips</label>
          <input className="calc-input" type="number" value={pips} onChange={e => setPips(e.target.value)} placeholder="50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pip Value per Std Lot (USD)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={pipVal} onChange={e => setPipVal(e.target.value)} step="0.01" placeholder="10" />
          </div>
          <p className="text-xs text-gray-400 mt-1">EUR/USD = $10 · USD/JPY ≈ $9.50</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lot Size</label>
          <input className="calc-input" type="number" value={lots} onChange={e => setLots(e.target.value)} step="0.01" placeholder="1" />
        </div>
      </div>

      {/* Result */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Dollar Value</p>
        <p className="font-display text-4xl font-bold text-amber-500 dark:text-amber-400 tabular mb-4">
          ${fmt(total, 2)}
        </p>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-xs text-gray-400 mb-2">For {pips} pips at ${pipVal}/pip:</p>
          <div className="grid grid-cols-3 gap-3">
            {LOT_TABLE.map(lt => (
              <div key={lt.label}>
                <p className="text-xs text-gray-400">{lt.label}</p>
                <p className="font-semibold text-gray-700 dark:text-gray-300 tabular">${fmt(p * pv * lt.value, 2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Quick Answer: 1 pip = how many dollars ── */}
      <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-2">Quick Answer</p>
        <p className="font-semibold text-gray-900 dark:text-white text-sm mb-3">1 pip is equal to how many dollars?</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            { label: 'Standard lot', sub: '1.0 lot',  val: '$10.00' },
            { label: 'Mini lot',     sub: '0.1 lot',  val: '$1.00'  },
            { label: 'Micro lot',    sub: '0.01 lot', val: '$0.10'  },
            { label: 'USD/JPY std',  sub: '1.0 lot',  val: '≈$9.50' },
          ] as const).map(r => (
            <div key={r.label} className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="font-bold text-amber-600 dark:text-amber-400 text-lg tabular">{r.val}</p>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mt-0.5">{r.label}</p>
              <p className="text-xs text-gray-400">{r.sub}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">For EUR/USD and GBP/USD. JPY pairs ≈ $9.50/pip at standard lot. Gold (XAU/USD) = $1.00/pip at standard lot.</p>
      </div>

      {/* ── Pips to USD Reference Table ── */}
      <div>
        <p className="section-label mb-3">Pips to USD Reference Table — Standard Lot (1.0)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">Pips</th>
                {([
                  { pair: 'EUR/USD', pv: 10,   note: '$10/pip'   },
                  { pair: 'GBP/USD', pv: 10,   note: '$10/pip'   },
                  { pair: 'USD/JPY', pv: 9.50, note: '≈$9.50/pip' },
                  { pair: 'XAU/USD', pv: 1,    note: '$1/pip'    },
                ] as const).map(pp => (
                  <th key={pp.pair} className="text-right px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                    {pp.pair}<br /><span className="font-normal text-gray-400">{pp.note}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {([1, 10, 50, 100, 500, 900] as const).map((pip, i) => (
                <tr key={pip} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800/50'}>
                  <td className="px-3 py-2 font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 tabular">{pip}</td>
                  {([10, 10, 9.50, 1] as const).map((pv, j) => (
                    <td key={j} className="px-3 py-2 text-right text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 tabular font-mono">
                      ${fmt(pip * pv, 2)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-400 mt-2">Values for 1 standard lot. Mini lot = ÷10. Micro lot = ÷100. JPY pip value varies with exchange rate.</p>
      </div>
    </CalculatorForm>
  );
}

// ─── Shared futures contract specs ──────────────────────────────────────────
const FUTURES_CONTRACTS = [
  { label: 'ES — E-mini S&P 500',       value: 'ES',  tickSize: 0.25, tickValue: 12.50, multiplier: 50,   marginInit: 15000, marginMaint: 12000 },
  { label: 'NQ — E-mini Nasdaq 100',    value: 'NQ',  tickSize: 0.25, tickValue: 5.00,  multiplier: 20,   marginInit: 21000, marginMaint: 17000 },
  { label: 'MES — Micro E-mini S&P',    value: 'MES', tickSize: 0.25, tickValue: 1.25,  multiplier: 5,    marginInit: 1500,  marginMaint: 1200  },
  { label: 'MNQ — Micro E-mini Nasdaq', value: 'MNQ', tickSize: 0.25, tickValue: 0.50,  multiplier: 2,    marginInit: 2100,  marginMaint: 1700  },
  { label: 'YM — E-mini Dow',           value: 'YM',  tickSize: 1,    tickValue: 5.00,  multiplier: 5,    marginInit: 13000, marginMaint: 10500 },
  { label: 'CL — Crude Oil',            value: 'CL',  tickSize: 0.01, tickValue: 10.00, multiplier: 1000, marginInit: 7000,  marginMaint: 6000  },
  { label: 'GC — Gold',                 value: 'GC',  tickSize: 0.10, tickValue: 10.00, multiplier: 100,  marginInit: 12000, marginMaint: 10800 },
  { label: 'RTY — Russell 2000',        value: 'RTY', tickSize: 0.10, tickValue: 5.00,  multiplier: 50,   marginInit: 8000,  marginMaint: 6500  },
];

// ─── Futures Position Size Calculator ───────────────────────────────────────
export function FuturesPositionSizeCalc() {
  const [contract, setContract] = useState('ES');
  const [account,  setAccount]  = useState('50000');
  const [risk,     setRisk]     = useState('1');
  const [slTicks,  setSlTicks]  = useState('10');

  const spec            = FUTURES_CONTRACTS.find(c => c.value === contract)!;
  const acc             = Number(account);
  const riskPct         = Number(risk);
  const sl              = Number(slTicks);
  const dollarRisk      = (acc * riskPct) / 100;
  const riskPerContract = sl * spec.tickValue;
  const contracts       = riskPerContract > 0 ? Math.floor(dollarRisk / riskPerContract) : 0;
  const actualRisk      = contracts * riskPerContract;

  const error = inputError([["account", account, 0, 1000000000000.0], ["risk", risk, 0, 100], ["sl Ticks", slTicks, 1, 1000000000.0, true]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Futures Contract</label>
          <select className="calc-select" value={contract} onChange={e => setContract(e.target.value)}>
            {FUTURES_CONTRACTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Balance ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={account} onChange={e => setAccount(e.target.value)} placeholder="50000" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk Per Trade (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={risk} onChange={e => setRisk(e.target.value)} step="0.1" placeholder="1" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stop Loss (ticks)</label>
          <input className="calc-input" type="number" value={slTicks} onChange={e => setSlTicks(e.target.value)} placeholder="10" min="1" />
          <p className="text-xs text-gray-400 mt-1">1 tick = {spec.tickSize} points = ${fmt(spec.tickValue, 2)} for {contract}</p>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Contracts to Trade</p>
            <p className="font-display text-4xl font-bold text-amber-500 dark:text-amber-400 tabular">{contracts}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Max Dollar Risk</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(dollarRisk, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Actual Risk</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(actualRisk, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Risk Per Contract</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(riskPerContract, 2)}</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Stop = {sl} ticks x ${spec.tickValue}/tick = ${fmt(riskPerContract, 2)} per contract</p>
      </div>
    </CalculatorForm>
  );
}

// ─── Futures P&L Calculator ──────────────────────────────────────────────────
export function FuturesPLCalc() {
  const [contract,   setContract]   = useState('ES');
  const [direction,  setDirection]  = useState('long');
  const [entry,      setEntry]      = useState('5000');
  const [exit,       setExit]       = useState('5010');
  const [contracts,  setContracts]  = useState('1');
  const [commission, setCommission] = useState('4');

  const spec       = FUTURES_CONTRACTS.find(c => c.value === contract)!;
  const en         = Number(entry);
  const ex         = Number(exit);
  const numC       = Number(contracts);
  const comm       = Number(commission);
  const pointMove  = direction === 'long' ? ex - en : en - ex;
  const ticks      = pointMove / spec.tickSize;
  const grossPL    = ticks * spec.tickValue * numC;
  const totalComm  = comm * numC;
  const netPL      = grossPL - totalComm;
  const plColor    = netPL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';

  const error = inputError([["entry", entry, 0, 1000000000000.0], ["exit", exit, 0, 1000000000000.0], ["contracts", contracts, 1, 1000000, true], ["commission", commission, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Futures Contract</label>
          <select className="calc-select" value={contract} onChange={e => setContract(e.target.value)}>
            {FUTURES_CONTRACTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Direction</label>
          <select className="calc-select" value={direction} onChange={e => setDirection(e.target.value)}>
            <option value="long">Long (Buy)</option>
            <option value="short">Short (Sell)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entry Price</label>
          <input className="calc-input" type="number" value={entry} onChange={e => setEntry(e.target.value)} step="0.25" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Exit Price</label>
          <input className="calc-input" type="number" value={exit} onChange={e => setExit(e.target.value)} step="0.25" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Contracts</label>
          <input className="calc-input" type="number" value={contracts} onChange={e => setContracts(e.target.value)} min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Commission round-trip per contract ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={commission} onChange={e => setCommission(e.target.value)} step="0.5" />
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Net P&L</p>
            <p className={`font-display text-4xl font-bold tabular ${plColor}`}>{netPL >= 0 ? '+' : ''}${fmt(netPL, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Gross P&L</p>
            <p className={`font-display text-2xl font-bold tabular ${grossPL >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>${fmt(grossPL, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Move (ticks)</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(ticks, 1)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Move (points)</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(pointMove, 2)}</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Commission: ${fmt(totalComm, 2)} total | Tick value: ${spec.tickValue} per tick</p>
      </div>
    </CalculatorForm>
  );
}

// ─── Futures Margin Calculator ───────────────────────────────────────────────
export function FuturesMarginCalc() {
  const [maintenanceMargin, setMaintenanceMargin] = useState('12000');
  const [initialMargin, setInitialMargin] = useState('15000');
  const [contract, setContract] = useState('ES');
  const [numC,     setNumC]     = useState('1');

  const n           = Number(numC);
  const initTotal   = Number(initialMargin) * n;
  const maintTotal  = Number(maintenanceMargin) * n;
  const recommended = initTotal * 1.2;

  const error = inputError([["maintenance Margin", maintenanceMargin, 1e-12, 1000000000000.0], ["initial Margin", initialMargin, 1e-12, 1000000000000.0], ["num C", numC, 1, 1000000, true]]) || (Number(maintenanceMargin) > Number(initialMargin) ? 'Maintenance margin cannot exceed initial margin in this model.' : undefined);

  return (
    <CalculatorForm error={error}>
      <NumberField label="Current maintenance margin per contract (USD)" value={maintenanceMargin} onChange={setMaintenanceMargin} min={1e-08} />
      <NumberField label="Current initial margin per contract (USD)" value={initialMargin} onChange={setInitialMargin} min={1e-08} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Futures Contract</label>
          <select className="calc-select" value={contract} onChange={e => { setContract(e.target.value); const selected = FUTURES_CONTRACTS.find(c => c.value === e.target.value)!; setInitialMargin(String(selected.marginInit)); setMaintenanceMargin(String(selected.marginMaint)); }}>
            {FUTURES_CONTRACTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Contracts</label>
          <input className="calc-input" type="number" value={numC} onChange={e => setNumC(e.target.value)} min="1" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Margin Requirements</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Initial Margin (total)</p>
            <p className="font-display text-3xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(initTotal, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Maintenance Margin</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(maintTotal, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Illustrative 20% Cushion</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(recommended, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Per Contract (initial)</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(Number(initialMargin), 0)}</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Enter current broker margins above. Cushion example = initial margin + 20%; it is not a recommended account size.</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Presets are hypothetical margin examples, not current exchange or broker requirements. Enter the actual initial and maintenance margin. The 20% cushion is illustrative and does not bound losses.</p>
    </CalculatorForm>
  );
}

// ─── Futures TP/SL Calculator ────────────────────────────────────────────────
export function FuturesTPSLCalc() {
  const [contract,  setContract]  = useState('ES');
  const [direction, setDirection] = useState('long');
  const [entry,     setEntry]     = useState('5000');
  const [slTicks,   setSlTicks]   = useState('10');
  const [tpTicks,   setTpTicks]   = useState('20');
  const [numC,      setNumC]      = useState('1');

  const spec       = FUTURES_CONTRACTS.find(c => c.value === contract)!;
  const en         = Number(entry);
  const sl         = Number(slTicks);
  const tp         = Number(tpTicks);
  const n          = Number(numC);
  const slPrice    = direction === 'long' ? en - sl * spec.tickSize : en + sl * spec.tickSize;
  const tpPrice    = direction === 'long' ? en + tp * spec.tickSize : en - tp * spec.tickSize;
  const dollarRisk = sl * spec.tickValue * n;
  const dollarRew  = tp * spec.tickValue * n;
  const rr         = sl > 0 ? tp / sl : 0;
  const minWinRate = rr > 0 ? (1 / (1 + rr)) * 100 : 0;
  const rrColor    = rr >= 2 ? 'text-green-600 dark:text-green-400' : rr >= 1 ? 'text-amber-500 dark:text-amber-400' : 'text-red-600 dark:text-red-400';

  const error = inputError([["entry", entry, 0, 1000000000000.0], ["sl Ticks", slTicks, 1, 1000000000.0, true], ["tp Ticks", tpTicks, 0, 1000000000.0, true], ["num C", numC, 1, 1000000, true]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contract</label>
          <select className="calc-select" value={contract} onChange={e => setContract(e.target.value)}>
            {FUTURES_CONTRACTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Direction</label>
          <select className="calc-select" value={direction} onChange={e => setDirection(e.target.value)}>
            <option value="long">Long (Buy)</option>
            <option value="short">Short (Sell)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Entry Price</label>
          <input className="calc-input" type="number" value={entry} onChange={e => setEntry(e.target.value)} step="0.25" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contracts</label>
          <input className="calc-input" type="number" value={numC} onChange={e => setNumC(e.target.value)} min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stop Loss (ticks)</label>
          <input className="calc-input border-red-200 dark:border-red-900" type="number" value={slTicks} onChange={e => setSlTicks(e.target.value)} min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Take Profit (ticks)</label>
          <input className="calc-input border-green-200 dark:border-green-900" type="number" value={tpTicks} onChange={e => setTpTicks(e.target.value)} min="1" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">R:R Ratio</p>
            <p className={`font-display text-4xl font-bold tabular ${rrColor}`}>{fmt(rr, 2)}:1</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Dollar Risk</p>
            <p className="font-display text-2xl font-bold text-red-500 tabular">${fmt(dollarRisk, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Dollar Reward</p>
            <p className="font-display text-2xl font-bold text-green-600 dark:text-green-400 tabular">${fmt(dollarRew, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Stop Loss Price</p>
            <p className="font-semibold text-red-500 tabular">{fmt(slPrice, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Take Profit Price</p>
            <p className="font-semibold text-green-600 dark:text-green-400 tabular">{fmt(tpPrice, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Min Win Rate</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300 tabular">{fmt(minWinRate, 1)}%</p></div>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Futures Contract Value Calculator ──────────────────────────────────────
export function FuturesContractValueCalc() {
  const [margin, setMargin] = useState('15000');
  const [contract, setContract] = useState('ES');
  const [price,    setPrice]    = useState('5000');
  const [numC,     setNumC]     = useState('1');

  const spec        = FUTURES_CONTRACTS.find(c => c.value === contract)!;
  const pr          = Number(price);
  const n           = Number(numC);
  const notionalOne = pr * spec.multiplier;
  const notionalAll = notionalOne * n;
  const leverage    = Number(margin) > 0 ? notionalOne / Number(margin) : 0;

  const error = inputError([["margin", margin, 1e-12, 1000000000000.0], ["price", price, 0, 1000000000000.0], ["num C", numC, 1, 1000000, true]]);

  return (
    <CalculatorForm error={error}>
      <NumberField label="Current margin per contract for leverage comparison (USD)" value={margin} onChange={setMargin} min={1e-08} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Futures Contract</label>
          <select className="calc-select" value={contract} onChange={e => setContract(e.target.value)}>
            {FUTURES_CONTRACTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Price</label>
          <input className="calc-input" type="number" value={price} onChange={e => setPrice(e.target.value)} step="0.25" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contracts</label>
          <input className="calc-input" type="number" value={numC} onChange={e => setNumC(e.target.value)} min="1" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Total Notional Value</p>
            <p className="font-display text-3xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(notionalAll, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Per Contract</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(notionalOne, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Effective Leverage</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(leverage, 1)}:1</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Multiplier</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${spec.multiplier}/pt</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Notional = Price x ${spec.multiplier} multiplier x {n} contracts</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Contract value uses the selected multiplier. Margin is manually supplied; it is collateral, not a maximum loss.</p>
    </CalculatorForm>
  );
}

// ─── Futures Roll Cost Calculator ────────────────────────────────────────────
export function FuturesRollCostCalc() {
  const [contract,  setContract]  = useState('ES');
  const [nearPrice, setNearPrice] = useState('5000');
  const [farPrice,  setFarPrice]  = useState('5015');
  const [numC,      setNumC]      = useState('1');
  const [direction, setDirection] = useState('long');

  const spec        = FUTURES_CONTRACTS.find(c => c.value === contract)!;
  const near        = Number(nearPrice);
  const far         = Number(farPrice);
  const n           = Number(numC);
  const spread      = far - near;
  const spreadTicks = spread / spec.tickSize;
  const rollCost    = direction === 'long' ? spread * spec.multiplier * n : -spread * spec.multiplier * n;
  const rollCostOne = direction === 'long' ? spread * spec.multiplier : -spread * spec.multiplier;
  const market      = spread > 0 ? 'Contango' : spread < 0 ? 'Backwardation' : 'Flat';
  const costColor   = rollCost > 0 ? 'text-red-500' : rollCost < 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500';

  const error = inputError([["near Price", nearPrice, 0, 1000000000000.0], ["far Price", farPrice, 0, 1000000000000.0], ["num C", numC, 1, 1000000, true]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Futures Contract</label>
          <select className="calc-select" value={contract} onChange={e => setContract(e.target.value)}>
            {FUTURES_CONTRACTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position Direction</label>
          <select className="calc-select" value={direction} onChange={e => setDirection(e.target.value)}>
            <option value="long">Long</option>
            <option value="short">Short</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Near Month Price</label>
          <input className="calc-input" type="number" value={nearPrice} onChange={e => setNearPrice(e.target.value)} step="0.25" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Far Month Price</label>
          <input className="calc-input" type="number" value={farPrice} onChange={e => setFarPrice(e.target.value)} step="0.25" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contracts</label>
          <input className="calc-input" type="number" value={numC} onChange={e => setNumC(e.target.value)} min="1" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Total Roll Cost</p>
            <p className={`font-display text-3xl font-bold tabular ${costColor}`}>{rollCost > 0 ? '-' : '+'}${fmt(Math.abs(rollCost), 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Per Contract</p>
            <p className={`font-display text-2xl font-bold tabular ${costColor}`}>{rollCostOne > 0 ? '-' : '+'}${fmt(Math.abs(rollCostOne), 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Spread (ticks)</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(spreadTicks, 1)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Market Structure</p>
            <p className={`font-semibold ${spread > 0 ? 'text-red-500' : spread < 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>{market}</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">{rollCost > 0 ? 'Cost to roll' : 'Credit received on roll'} — Far: {far} vs Near: {near}</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Signed difference in contract exposure when replacing the near contract with the far contract. This is not an immediate cash charge or a guaranteed realized loss/profit; commissions and slippage are additional.</p>
    </CalculatorForm>
  );
}

// ─── Futures Commission Calculator ──────────────────────────────────────────
export function FuturesCommissionCalc() {
  const [commPerSide,  setCommPerSide]  = useState('1.50');
  const [numContracts, setNumContracts] = useState('1');
  const [tradesPerDay, setTradesPerDay] = useState('5');
  const [tradingDays,  setTradingDays]  = useState('21');

  const cps         = Number(commPerSide);
  const numC        = Number(numContracts);
  const tpd         = Number(tradesPerDay);
  const days        = Number(tradingDays);
  const roundTrip   = cps * 2 * numC;
  const dailyCost   = roundTrip * tpd;
  const weeklyCost  = dailyCost * 5;
  const monthlyCost = dailyCost * days;

  const error = inputError([["comm Per Side", commPerSide, 0, 1000000000000.0], ["num Contracts", numContracts, 1, 1000000, true], ["trades Per Day", tradesPerDay, 0, 1000000000000.0], ["trading Days", tradingDays, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Commission Per Side, Per Contract ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={commPerSide} onChange={e => setCommPerSide(e.target.value)} step="0.01" placeholder="1.50" />
          </div>
          <p className="text-xs text-gray-400 mt-1">IB: ~$0.85 | Tradovate: ~$0.10 | TD Ameritrade: ~$2.25</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contracts Per Trade</label>
          <input className="calc-input" type="number" value={numContracts} onChange={e => setNumContracts(e.target.value)} min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Round-Trip Trades Per Day</label>
          <input className="calc-input" type="number" value={tradesPerDay} onChange={e => setTradesPerDay(e.target.value)} min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trading Days Per Month</label>
          <input className="calc-input" type="number" value={tradingDays} onChange={e => setTradingDays(e.target.value)} placeholder="21" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Commission Costs</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Per Trade (round-trip)</p>
            <p className="font-display text-3xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(roundTrip, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Per Day</p>
            <p className="font-display text-2xl font-bold text-red-500 tabular">${fmt(dailyCost, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Per Week</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(weeklyCost, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Per Month</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(monthlyCost, 2)}</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Round-trip = ${cps}/side x 2 sides x {numC} contracts = ${fmt(roundTrip, 2)} per trade</p>
      </div>
    </CalculatorForm>
  );
}

// ─── Futures Break-Even Calculator ──────────────────────────────────────────
export function FuturesBreakEvenCalc() {
  const [contract,    setContract]    = useState('ES');
  const [commPerSide, setCommPerSide] = useState('1.50');
  const [numC,        setNumC]        = useState('1');

  const spec      = FUTURES_CONTRACTS.find(c => c.value === contract)!;
  const cps       = Number(commPerSide);
  const n         = Number(numC);
  const roundTrip = cps * 2 * n;
  const beTicks   = spec.tickValue > 0 && n > 0 ? Math.max(0, Math.ceil(roundTrip / (spec.tickValue * n) - 1e-10)) : 0;
  const bePoints  = beTicks * spec.tickSize;
  const beDollars = beTicks * spec.tickValue;

  const error = inputError([["comm Per Side", commPerSide, 0, 1000000000000.0], ["num C", numC, 1, 1000000, true]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Futures Contract</label>
          <select className="calc-select" value={contract} onChange={e => setContract(e.target.value)}>
            {FUTURES_CONTRACTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Commission Per Side ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={commPerSide} onChange={e => setCommPerSide(e.target.value)} step="0.01" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contracts</label>
          <input className="calc-input" type="number" value={numC} onChange={e => setNumC(e.target.value)} min="1" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Break-Even Point</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Break-Even Ticks</p>
            <p className="font-display text-4xl font-bold text-amber-500 dark:text-amber-400 tabular">{fmt(beTicks, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Break-Even Points</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(bePoints, 4)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Break-Even ($)</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(beDollars, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Total Round-Trip Cost</p>
            <p className="font-display text-2xl font-bold text-red-500 tabular">${fmt(roundTrip, 2)}</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">{contract} needs to move {fmt(beTicks, 2)} ticks to cover commissions. Tick value = ${spec.tickValue} per tick.</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Minimum executable whole ticks needed to cover the entered round-trip commission. Spread, slippage and other fees are excluded.</p>
    </CalculatorForm>
  );
}

// ─── Futures Risk/Reward Calculator ─────────────────────────────────────────
export function FuturesRiskRewardCalc() {
  const [contract, setContract] = useState('ES');
  const [slTicks,  setSlTicks]  = useState('10');
  const [tpTicks,  setTpTicks]  = useState('20');
  const [numC,     setNumC]     = useState('1');

  const spec         = FUTURES_CONTRACTS.find(c => c.value === contract)!;
  const sl           = Number(slTicks);
  const tp           = Number(tpTicks);
  const n            = Number(numC);
  const dollarRisk   = sl * spec.tickValue * n;
  const dollarReward = tp * spec.tickValue * n;
  const rr           = sl > 0 ? tp / sl : 0;
  const minWinRate   = rr > 0 ? (1 / (1 + rr)) * 100 : 0;
  const rrColor      = rr >= 2 ? 'text-green-600 dark:text-green-400' : rr >= 1 ? 'text-amber-500 dark:text-amber-400' : 'text-red-600 dark:text-red-400';

  const error = inputError([["sl Ticks", slTicks, 1, 1000000000.0, true], ["tp Ticks", tpTicks, 0, 1000000000.0, true], ["num C", numC, 1, 1000000, true]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Futures Contract</label>
          <select className="calc-select" value={contract} onChange={e => setContract(e.target.value)}>
            {FUTURES_CONTRACTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stop Loss (ticks)</label>
          <input className="calc-input border-red-200 dark:border-red-900" type="number" value={slTicks} onChange={e => setSlTicks(e.target.value)} min="1" />
          <p className="text-xs text-gray-400 mt-1">${fmt(sl * spec.tickValue, 2)} risk per contract</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Take Profit (ticks)</label>
          <input className="calc-input border-green-200 dark:border-green-900" type="number" value={tpTicks} onChange={e => setTpTicks(e.target.value)} min="1" />
          <p className="text-xs text-gray-400 mt-1">${fmt(tp * spec.tickValue, 2)} reward per contract</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Contracts</label>
          <input className="calc-input" type="number" value={numC} onChange={e => setNumC(e.target.value)} min="1" />
        </div>
      </div>
      <div className="flex gap-0 h-6 rounded-lg overflow-hidden text-xs font-medium">
        <div className="bg-red-500/80 flex items-center justify-center text-white" style={{ width: `${sl + tp > 0 ? (sl / (sl + tp)) * 100 : 50}%` }}>Risk</div>
        <div className="bg-green-500/80 flex items-center justify-center text-white" style={{ width: `${sl + tp > 0 ? (tp / (sl + tp)) * 100 : 50}%` }}>Reward</div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Results</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">R:R Ratio</p>
            <p className={`font-display text-4xl font-bold tabular ${rrColor}`}>{fmt(rr, 2)}:1</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Dollar Risk</p>
            <p className="font-display text-2xl font-bold text-red-500 tabular">${fmt(dollarRisk, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Dollar Reward</p>
            <p className="font-display text-2xl font-bold text-green-600 dark:text-green-400 tabular">${fmt(dollarReward, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Min Win Rate</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(minWinRate, 1)}%</p></div>
        </div>
      </div>
    </CalculatorForm>
  );
}

// ─── Prop Firm Trailing Drawdown Calculator ──────────────────────────────────
const PROP_FIRMS = [
  { label: 'Example $100K: 10% overall, 5% daily', value: 'example100', start: 100000, maxDD: 10, dailyDD: 5, target1: 10, target2: 5 },
  { label: 'Custom rules', value: 'custom', start: 100000, maxDD: 10, dailyDD: 5, target1: 10, target2: 5 },
];

export function PropFirmTrailingDrawdownCalc() {
  const [floorMode, setFloorMode] = useState('trailing');
  const [firm,    setFirm]    = useState('custom');
  const [peak,    setPeak]    = useState('102000');
  const [current, setCurrent] = useState('100500');
  const [customStart, setCustomStart] = useState('100000');
  const [customDD,    setCustomDD]    = useState('10');

  const spec     = PROP_FIRMS.find(f => f.value === firm)!;
  const startBal = firm === 'custom' ? (Number(customStart)) : spec.start;
  const ddPct    = firm === 'custom' ? (Number(customDD)) : spec.maxDD;
  const peakBal  = parseFloat(peak)    || startBal;
  const currBal  = parseFloat(current) || startBal;
  const maxLoss  = startBal * (ddPct / 100);
  const floor    = (floorMode === 'trailing' ? Math.max(startBal, peakBal) : startBal) - maxLoss;
  const distance = currBal - floor;
  const pctUsed  = maxLoss > 0 ? Math.max(0, ((maxLoss - distance) / maxLoss) * 100) : 0;
  const safe     = pctUsed >= 100;
  const barColor = pctUsed >= 80 ? 'bg-red-500' : pctUsed >= 50 ? 'bg-amber-400' : 'bg-green-500';

  const error = inputError([["peak", peak, 0, 1000000000000.0], ["current", current, 0, 1000000000000.0], ["custom Start", customStart, 0, 1000000000000.0], ["custom DD", customDD, 1e-12, 100]]);

  return (
    <CalculatorForm error={error}>
      <label>Loss-floor model<select className="calc-select" value={floorMode} onChange={e => setFloorMode(e.target.value)}><option value="trailing">Uncapped trailing floor</option><option value="fixed">Fixed initial-balance floor</option></select></label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rule Profile / Account</label>
          <select className="calc-select" value={firm} onChange={e => setFirm(e.target.value)}>
            {PROP_FIRMS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
        {firm === 'custom' && <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Starting Balance ($)</label>
            <input className="calc-input" type="number" value={customStart} onChange={e => setCustomStart(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Drawdown (%)</label>
            <input className="calc-input" type="number" value={customDD} onChange={e => setCustomDD(e.target.value)} step="0.1" />
          </div>
        </>}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Peak Balance Reached ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={peak} onChange={e => setPeak(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Balance ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={current} onChange={e => setCurrent(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Risk meter */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Safe</span>
          <span className={pctUsed >= 80 ? 'text-red-500 font-semibold' : ''}>{fmt(pctUsed, 1)}% of drawdown used</span>
          <span>Breached</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div className={`${barColor} h-3 rounded-full transition-all`} style={{ width: `${Math.min(pctUsed, 100)}%` }} />
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${safe ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'}`}>
        <p className="section-label mb-4">Drawdown Status</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Drawdown Floor</p>
            <p className="font-display text-3xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(floor, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Distance to Breach</p>
            <p className={`font-display text-2xl font-bold tabular ${distance <= 0 ? 'text-red-500' : distance < maxLoss * 0.2 ? 'text-amber-500' : 'text-green-600 dark:text-green-400'}`}>${fmt(distance, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Max Allowed Loss</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(maxLoss, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Starting Balance</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(startBal, 0)}</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">Floor = Peak (${fmt(peakBal, 0)}) − Max Loss (${fmt(maxLoss, 0)}) = ${fmt(floor, 0)}. Trailing drawdown follows your peak balance.</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Choose the model that matches your rules. Trailing mode has no floor lock or cap; use the qualifying high-water mark under your provider’s intraday or end-of-day policy. Equity includes open P&L and charges.</p>
    </CalculatorForm>
  );
}

// ─── Prop Firm Daily Loss Limit Calculator ───────────────────────────────────
export function PropFirmDailyLossCalc() {
  const [firm,       setFirm]       = useState('custom');
  const [lostToday,  setLostToday]  = useState('0');
  const [customBal,  setCustomBal]  = useState('100000');
  const [customDDPct,setCustomDDPct]= useState('5');

  const spec    = PROP_FIRMS.find(f => f.value === firm)!;
  const balance = firm === 'custom' ? (Number(customBal)) : spec.start;
  const ddPct   = firm === 'custom' ? (Number(customDDPct)) : spec.dailyDD;
  const dailyLimit = balance * (ddPct / 100);
  const lost       = Number(lostToday);
  const remaining  = Math.max(0, dailyLimit - lost);
  const pctUsed    = dailyLimit > 0 ? Math.min((lost / dailyLimit) * 100, 100) : 0;
  const barColor   = pctUsed >= 80 ? 'bg-red-500' : pctUsed >= 50 ? 'bg-amber-400' : 'bg-green-500';

  const error = inputError([["lost Today", lostToday, 0, 1000000000000.0], ["custom Bal", customBal, 0, 1000000000000.0], ["custom DDPct", customDDPct, 1e-12, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rule Profile / Account</label>
          <select className="calc-select" value={firm} onChange={e => setFirm(e.target.value)}>
            {PROP_FIRMS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
        {firm === 'custom' && <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Balance ($)</label>
            <input className="calc-input" type="number" value={customBal} onChange={e => setCustomBal(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daily Loss Limit (%)</label>
            <input className="calc-input" type="number" value={customDDPct} onChange={e => setCustomDDPct(e.target.value)} step="0.1" />
          </div>
        </>}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Losses So Far Today ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={lostToday} onChange={e => setLostToday(e.target.value)} placeholder="0" />
          </div>
        </div>
      </div>

      {/* Risk meter */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Day Start</span>
          <span className={pctUsed >= 80 ? 'text-red-500 font-semibold' : ''}>{fmt(pctUsed, 1)}% used</span>
          <span>Daily Limit</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div className={`${barColor} h-3 rounded-full transition-all`} style={{ width: `${pctUsed}%` }} />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Today&apos;s Loss Room</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Remaining Room</p>
            <p className={`font-display text-4xl font-bold tabular ${remaining === 0 ? 'text-red-500' : remaining < dailyLimit * 0.3 ? 'text-amber-500' : 'text-green-600 dark:text-green-400'}`}>${fmt(remaining, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Daily Loss Limit</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(dailyLimit, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Lost Today</p>
            <p className="font-display text-2xl font-bold text-red-500 tabular">${fmt(lost, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Rule</p>
            <p className="font-semibold text-gray-700 dark:text-gray-300">{ddPct}% / day</p></div>
        </div>
        {pctUsed >= 80 && <p className="text-xs text-red-500 mt-3 font-medium">⚠ You are close to the daily limit. Consider stopping trading for today.</p>}
        {pctUsed < 80 && <p className="text-xs text-gray-400 mt-3">Stop trading voluntarily at 50–60% of the daily limit to protect your account.</p>}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Enter the loss already counted under your account’s rule, including open P&L and charges where required. This does not model resets, daily profit offsets or overall drawdown limits.</p>
    </CalculatorForm>
  );
}

// ─── Prop Firm Profit Target Calculator ─────────────────────────────────────
export function PropFirmProfitTargetCalc() {
  const [firm,       setFirm]       = useState('custom');
  const [phase,      setPhase]      = useState('1');
  const [daysLeft,   setDaysLeft]   = useState('20');
  const [earnedSoFar,setEarnedSoFar]= useState('3000');
  const [avgDaily,   setAvgDaily]   = useState('500');
  const [customAcc,  setCustomAcc]  = useState('100000');
  const [customTgt,  setCustomTgt]  = useState('10');

  const spec       = PROP_FIRMS.find(f => f.value === firm)!;
  const accountSz  = firm === 'custom' ? (Number(customAcc)) : spec.start;
  const tgtPct     = firm === 'custom' ? (Number(customTgt)) : phase === '1' ? spec.target1 : spec.target2;
  const target     = accountSz * (tgtPct / 100);
  const earned     = Number(earnedSoFar);
  const remaining  = Math.max(0, target - earned);
  const days       = Number(daysLeft);
  const daily      = Number(avgDaily);
  const onTrack    = earned >= target || (daily > 0 && earned + (daily * days) >= target);
  const needPerDay = days > 0 ? remaining / days : remaining;
  const pctDone    = target > 0 ? Math.max(0, Math.min((earned / target) * 100, 100)) : 0;

  const error = inputError([["phase", phase, 0, 1000000000000.0], ["days Left", daysLeft, 1, 100000, true], ["earned So Far", earnedSoFar, -1000000000000.0, 1000000000000.0], ["avg Daily", avgDaily, -1000000000000.0, 1000000000000.0], ["custom Acc", customAcc, 0, 1000000000000.0], ["custom Tgt", customTgt, 1e-12, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rule Profile / Account</label>
          <select className="calc-select" value={firm} onChange={e => setFirm(e.target.value)}>
            {PROP_FIRMS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
        {firm !== 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phase</label>
            <select className="calc-select" value={phase} onChange={e => setPhase(e.target.value)}>
              <option value="1">Phase 1 (Challenge)</option>
              <option value="2">Phase 2 (Verification)</option>
            </select>
          </div>
        )}
        {firm === 'custom' && <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Size ($)</label>
            <input className="calc-input" type="number" value={customAcc} onChange={e => setCustomAcc(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profit Target (%)</label>
            <input className="calc-input" type="number" value={customTgt} onChange={e => setCustomTgt(e.target.value)} step="0.5" />
          </div>
        </>}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Earned So Far ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={earnedSoFar} onChange={e => setEarnedSoFar(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trading Days Remaining</label>
          <input className="calc-input" type="number" value={daysLeft} onChange={e => setDaysLeft(e.target.value)} min="1" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Avg Daily Profit ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={avgDaily} onChange={e => setAvgDaily(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>$0</span>
          <span>{fmt(pctDone, 1)}% complete</span>
          <span>${fmt(target, 0)} target</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div className="bg-amber-400 h-3 rounded-full transition-all" style={{ width: `${pctDone}%` }} />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <p className="section-label">Target Tracker</p>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${onTrack ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>{onTrack ? '✓ On Track' : '✗ Behind Pace'}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Profit Target</p>
            <p className="font-display text-3xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(target, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Still Needed</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(remaining, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Required Daily</p>
            <p className={`font-display text-2xl font-bold tabular ${needPerDay > daily && daily > 0 ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>${fmt(needPerDay, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Your Avg Daily</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(daily, 0)}</p></div>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Hypothetical pace calculation. Profit targets are independent of loss limits. Meeting a target alone does not satisfy all evaluation or payout conditions.</p>
    </CalculatorForm>
  );
}

// ─── Prop Firm Consistency Rule Calculator ───────────────────────────────────
export function PropFirmConsistencyCalc() {
  const [rulePct,    setRulePct]    = useState('30');
  const [totalProfit,setTotalProfit]= useState('8000');
  const [bestDay,    setBestDay]    = useState('3000');

  const rule        = Number(rulePct);
  const total       = Number(totalProfit);
  const best        = Number(bestDay);
  const maxAllowed  = total * (rule / 100);
  const passes      = total > 0 && best > 0 && best <= maxAllowed;
  const minTotal    = rule > 0 ? best / (rule / 100) : 0;
  const moreNeeded  = Math.max(0, minTotal - total);
  const actualPct   = total > 0 ? (best / total) * 100 : 0;

  const error = inputError([["rule Pct", rulePct, 1e-12, 100], ["total Profit", totalProfit, 0, 1000000000000.0], ["best Day", bestDay, 0, 1000000000000.0]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Consistency Rule (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={rulePct} onChange={e => setRulePct(e.target.value)} step="5" placeholder="30" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Enter your account’s actual rule; definitions vary by product and start date.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Profit Earned ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={totalProfit} onChange={e => setTotalProfit(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Best Single Day Profit ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={bestDay} onChange={e => setBestDay(e.target.value)} />
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-5 border ${passes ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-800'}`}>
        <div className="flex items-center gap-3 mb-4">
          <p className="section-label">Consistency Check</p>
          <span className={`text-sm font-bold px-3 py-0.5 rounded-full ${passes ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>{passes ? '✓ PASS' : '✗ FAIL'}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Max Allowed Best Day</p>
            <p className="font-display text-3xl font-bold text-amber-500 dark:text-amber-400 tabular">${fmt(maxAllowed, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Your Best Day</p>
            <p className={`font-display text-2xl font-bold tabular ${passes ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>${fmt(best, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Best Day % of Total</p>
            <p className={`font-display text-2xl font-bold tabular ${passes ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>{fmt(actualPct, 1)}%</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">More Profit Needed</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(moreNeeded, 0)}</p></div>
        </div>
        {!passes && <p className="text-xs text-red-600 dark:text-red-400 mt-3">Keep trading to earn ${fmt(moreNeeded, 0)} more so your best day (${fmt(best, 0)}) is under {rule}% of total profits (${fmt(minTotal, 0)} needed).</p>}
        {passes && <p className="text-xs text-green-600 dark:text-green-400 mt-3">Your best day (${fmt(actualPct, 1)}% of total) is within the {rule}% consistency rule. ✓</p>}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Use the exact profit denominator required by your agreement (net total or positive-day total). This ratio alone does not determine payout eligibility.</p>
    </CalculatorForm>
  );
}

// ─── Prop Firm Challenge Pass Rate Calculator ────────────────────────────────
export function PropFirmPassRateCalc() {
  const [winRate,   setWinRate]   = useState('45');
  const [avgWin,    setAvgWin]    = useState('200');
  const [avgLoss,   setAvgLoss]   = useState('100');
  const [tradesDay, setTradesDay] = useState('5');
  const [accountSz, setAccountSz] = useState('100000');
  const [targetPct, setTargetPct] = useState('10');
  const [ddPct,     setDdPct]     = useState('10');
  const [dailyPct,  setDailyPct]  = useState('5');

  const wr      = (Number(winRate)) / 100;
  const lr      = 1 - wr;
  const win     = Number(avgWin);
  const loss    = Number(avgLoss);
  const tpd     = Number(tradesDay);
  const acc     = Number(accountSz);
  const tgt     = acc * ((Number(targetPct)) / 100);
  const maxDD   = acc * ((Number(ddPct)) / 100);
  const dailyDD = acc * ((Number(dailyPct)) / 100);
  const ev      = (wr * win) - (lr * loss);
  const rr      = loss > 0 ? win / loss : 0;
  const minWR   = rr > 0 ? (1 / (1 + rr)) * 100 : 50;

  // Simple simulation (500 runs × 30 days × tpd trades)
  const RUNS = 500; const DAYS = 30;
  let passes = 0;
  let seed = 123456789;
  for (let r = 0; r < RUNS; r++) {
    let bal = acc; let todayStart = acc; let passed = false; let failed = false;
    for (let d = 0; d < DAYS && !failed; d++) {
      todayStart = bal;
      for (let t = 0; t < Math.min(100, tpd) && !failed; t++) {
        seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
        const trade = seed / 4294967296 < wr ? win : -loss;
        bal += trade;
        if (bal - todayStart <= -dailyDD || acc - bal >= maxDD || bal <= 0) { failed = true; }
      }
      if (!failed && bal - acc >= tgt) { passed = true; break; }
    }
    if (passed && !failed) passes++;
  }
  const passRate = (passes / RUNS) * 100;
  const rateColor = passRate >= 60 ? 'text-green-600 dark:text-green-400' : passRate >= 30 ? 'text-amber-500' : 'text-red-500';

  const error = inputError([["win Rate", winRate, 0, 100], ["avg Win", avgWin, 0, 1000000000000.0], ["avg Loss", avgLoss, 1e-12, 1000000000000.0], ["trades Day", tradesDay, 1, 100, true], ["account Sz", accountSz, 1e-12, 1000000000000.0], ["target Pct", targetPct, 1e-12, 100], ["dd Pct", ddPct, 1e-12, 100], ["daily Pct", dailyPct, 1e-12, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Win Rate (%)</label>
          <input className="calc-input" type="number" value={winRate} onChange={e => setWinRate(e.target.value)} step="1" min="1" max="99" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Average Win ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={avgWin} onChange={e => setAvgWin(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Average Loss ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={avgLoss} onChange={e => setAvgLoss(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trades Per Day</label>
          <input className="calc-input" type="number" value={tradesDay} onChange={e => setTradesDay(e.target.value)} min="1" max="50" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Size ($)</label>
          <input className="calc-input" type="number" value={accountSz} onChange={e => setAccountSz(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Profit Target (%)</label>
          <input className="calc-input" type="number" value={targetPct} onChange={e => setTargetPct(e.target.value)} step="0.5" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Drawdown (%)</label>
          <input className="calc-input" type="number" value={ddPct} onChange={e => setDdPct(e.target.value)} step="0.5" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daily Loss Limit (%)</label>
          <input className="calc-input" type="number" value={dailyPct} onChange={e => setDailyPct(e.target.value)} step="0.5" />
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Simulation Results (500 runs × 30 days)</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Est. Pass Rate</p>
            <p className={`font-display text-4xl font-bold tabular ${rateColor}`}>{fmt(passRate, 1)}%</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Expectancy / Trade</p>
            <p className={`font-display text-2xl font-bold tabular ${ev >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>{ev >= 0 ? '+' : ''}${fmt(ev, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">R:R Ratio</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(rr, 2)}:1</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Min Win Rate Needed</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">{fmt(minWR, 1)}%</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">{ev < 0 ? '⚠ Negative expectancy — this system loses money long-term regardless of pass rate.' : ev === 0 ? 'Break-even system. Commissions will make it a loser.' : `Positive expectancy of $${fmt(ev, 2)}/trade. ${tpd} trades/day = ~$${fmt(ev * tpd, 0)} expected daily profit.`}</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Illustrative seeded simulation: 500 paths, 30 days, independent fixed-dollar outcomes, fixed initial-capital loss floor, daily closed-P&L limit and target checked at day-end. Touching either loss limit fails. No costs, trailing floor, consistency rules or minimum-day rules. Results are reproducible estimates, not actual pass probabilities.</p>
    </CalculatorForm>
  );
}

// ─── Prop Firm Position Size Calculator ─────────────────────────────────────
export function PropFirmPositionSizeCalc() {
  const [firm,      setFirm]      = useState('custom');
  const [lostToday, setLostToday] = useState('0');
  const [bufferPct, setBufferPct] = useState('70');
  const [slPips,    setSlPips]    = useState('20');
  const [pipVal,    setPipVal]    = useState('10');
  const [customBal, setCustomBal] = useState('100000');
  const [customDD,  setCustomDD]  = useState('5');

  const spec      = PROP_FIRMS.find(f => f.value === firm)!;
  const balance   = firm === 'custom' ? (Number(customBal)) : spec.start;
  const ddPct     = firm === 'custom' ? (Number(customDD)) : spec.dailyDD;
  const dailyLimit= balance * (ddPct / 100);
  const lost      = Number(lostToday);
  const remaining = Math.max(0, dailyLimit - lost);
  const buffer    = (Number(bufferPct)) / 100;
  const riskable  = remaining * buffer;
  const sl        = Number(slPips);
  const pv        = Number(pipVal);
  const maxLots   = Math.floor((riskable / (sl * pv)) * 100 + 1e-10) / 100;
  const lossIfHit = maxLots * sl * pv;

  const error = inputError([["lost Today", lostToday, 0, 1000000000000.0], ["buffer Pct", bufferPct, 0, 100], ["sl Pips", slPips, 1e-12, 1000000000000.0], ["pip Val", pipVal, 1e-12, 1000000000000.0], ["custom Bal", customBal, 0, 1000000000000.0], ["custom DD", customDD, 1e-12, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rule Profile / Account</label>
          <select className="calc-select" value={firm} onChange={e => setFirm(e.target.value)}>
            {PROP_FIRMS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
        {firm === 'custom' && <>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Account Balance ($)</label>
            <input className="calc-input" type="number" value={customBal} onChange={e => setCustomBal(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Daily Loss Limit (%)</label>
            <input className="calc-input" type="number" value={customDD} onChange={e => setCustomDD(e.target.value)} step="0.1" />
          </div>
        </>}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Losses So Far Today ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={lostToday} onChange={e => setLostToday(e.target.value)} placeholder="0" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk Buffer (% of remaining room)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={bufferPct} onChange={e => setBufferPct(e.target.value)} step="5" min="10" max="100" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">This allocates a percentage of remaining daily room; apply your own smaller per-trade cap.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Stop Loss (pips or ticks)</label>
          <input className="calc-input" type="number" value={slPips} onChange={e => setSlPips(e.target.value)} min="1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pip/Tick Value per Standard Lot ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={pipVal} onChange={e => setPipVal(e.target.value)} step="0.1" placeholder="10" />
          </div>
          <p className="text-xs text-gray-400 mt-1">EUR/USD = $10 | GBP/USD = $10 | USD/JPY ≈ $9.10</p>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Max Safe Position Size</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div><p className="text-xs text-gray-400 mb-0.5">Max Lots / Contracts</p>
            <p className="font-display text-4xl font-bold text-amber-500 dark:text-amber-400 tabular">{fmt(maxLots, 2)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Riskable Room</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(riskable, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Remaining Daily Room</p>
            <p className="font-display text-2xl font-bold text-gray-700 dark:text-gray-300 tabular">${fmt(remaining, 0)}</p></div>
          <div><p className="text-xs text-gray-400 mb-0.5">Loss if Stopped Out</p>
            <p className="font-display text-2xl font-bold text-red-500 tabular">${fmt(lossIfHit, 0)}</p></div>
        </div>
        <p className="text-xs text-gray-400 mt-3">At {sl} pips SL × ${pv}/pip × {fmt(maxLots, 2)} lots = ${fmt(lossIfHit, 0)} max loss if stopped out ({fmt(buffer * 100, 0)}% of remaining daily room used).</p>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Daily-limit capacity only, rounded down to 0.01 lots. Also cap size by your per-trade budget, remaining overall loss allowance, other positions and costs. This is not a recommended trade size.</p>
    </CalculatorForm>
  );
}

// ─── Prop Firm Account Size Finder ───────────────────────────────────────────
const ACCOUNT_SIZES = [10000, 25000, 50000, 100000, 150000, 200000];

export function PropFirmAccountSizeFinderCalc() {
  const [monthlyTarget, setMonthlyTarget] = useState('2000');
  const [monthlyReturn, setMonthlyReturn] = useState('5');
  const [payoutSplit,   setPayoutSplit]   = useState('80');
  const [riskPerTrade,  setRiskPerTrade]  = useState('1');

  const target   = Number(monthlyTarget);
  const ret      = (Number(monthlyReturn)) / 100;
  const payout   = (Number(payoutSplit)) / 100;
  const riskPct  = (Number(riskPerTrade)) / 100;

  const requiredAccount = payout > 0 && ret > 0 ? target / (ret * payout) : 0;
  const recommended = ACCOUNT_SIZES.find(s => s >= requiredAccount);

  const error = inputError([["monthly Target", monthlyTarget, 0, 1000000000000.0], ["monthly Return", monthlyReturn, 1e-12, 1000], ["payout Split", payoutSplit, 1e-12, 100], ["risk Per Trade", riskPerTrade, 0, 100]]);

  return (
    <CalculatorForm error={error}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Monthly Income Target ($)</label>
          <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input className="calc-input pl-7" type="number" value={monthlyTarget} onChange={e => setMonthlyTarget(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Avg Monthly Return (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={monthlyReturn} onChange={e => setMonthlyReturn(e.target.value)} step="0.5" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Use a hypothetical return scenario; monthly profits are uncertain.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payout Split (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={payoutSplit} onChange={e => setPayoutSplit(e.target.value)} step="5" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Enter the payout percentage in your own agreement.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Risk Per Trade (%)</label>
          <div className="relative">
            <input className="calc-input pr-8" type="number" value={riskPerTrade} onChange={e => setRiskPerTrade(e.target.value)} step="0.1" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <p className="section-label mb-4">Hypothetical Account Size</p>
        <div className="mb-5">
          <p className="text-xs text-gray-400 mb-0.5">Best Fit Account</p>
          <p className="font-display text-5xl font-bold text-amber-500 dark:text-amber-400 tabular">{recommended ? `$${(recommended / 1000).toFixed(0)}K` : 'Above listed sizes'}</p>
          <p className="text-xs text-gray-400 mt-1">Minimum calculated: ${fmt(requiredAccount, 0)}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {ACCOUNT_SIZES.map(size => {
            const gross  = size * ret;
            const income = gross * payout;
            const riskDollar = size * riskPct;
            const isRec  = size === recommended;
            return (
              <div key={size} className={`rounded-lg p-3 border ${isRec ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                <p className={`text-xs font-bold mb-1 ${isRec ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500'}`}>${(size / 1000).toFixed(0)}K {isRec ? '← Best Fit' : ''}</p>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">${fmt(income, 0)}/mo income</p>
                <p className="text-xs text-gray-400">${fmt(riskDollar, 0)} risk/trade at {riskPerTrade}%</p>
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">Scenario only, before fees and taxes. Account nominal size is not necessarily usable risk capital; payouts and profits are not guaranteed.</p>
    </CalculatorForm>
  );
}
