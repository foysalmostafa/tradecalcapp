/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { load, deps } = require('./loader.cjs');
const { renderToStaticMarkup } = deps('react-dom/server');
const generic = 'src/components/calculators/GenericCalc.tsx';
const near = (actual, expected, label) => assert.ok(Math.abs(actual - expected) <= 1e-8 * Math.max(1, Math.abs(expected)), `${label}: ${actual} != ${expected}`);
function calc(name, values = {}) {
  const file = ['PositionSizeCalc','PipValueCalc','ProfitLossCalc'].includes(name) ? `src/components/calculators/${name}.tsx` : generic;
  const m = load(file, values, true);
  return (m[name] || m.default)();
}
// Expected values are independently worked examples, not stored snapshots.
const examples = {
 MarginCalc: { margin: 1085, notional: 108500 },
 RiskRewardCalc: { rr: 2, winRate: 100/3 },
 CompoundingCalc: { finalBal: 10000 * 1.05**24 },
 DrawdownCalc: { afterDD: 7000, recovery: 3000/7000*100, consec: 18 },
 LotSizeCalc: { stdLots: 0.4, riskAmt: 100 },
 AverageDownCalc: { newAvg: 46, totalCost: 9200 },
 BreakEvenCalc: { pipsNeeded: 2.7, bePrice: 1.08527 },
 CurrencyConverterCalc: { converted: 92.2 },
 LeverageCalc: { effLev: 10.85 },
 RiskOfRuinCalc: { ev: 37.5 },
 KellyCalc: { fullKelly: 0.25, quarterAmt: 625 },
 WinRateCalc: { breakEven: 100/3, ev: 35 },
 GainLossCalc: { pct: 25 },
 ConsistencyCalc: { score: 36 },
 OptionsProfitCalc: { pnl: 700, maxLoss: -300, breakEven: 153 },
 PipDifferenceCalc: { pipDiff: 130, dollarVal: 1300 },
 CAGRCalc: { cagr: (2.5**(1/3)-1)*100 },
 DailyLossLimitCalc: { dailyLimit: 500, riskPerTrade: 100 },
 FuturesTickCalc: { totalPnL: 125, pointsMoved: 2.5 },
 DividendYieldCalc: { yield_: 4, annualInc: 400 },
 FundingRateCalc: { totalFee: 3, weeklyFee: 21 },
 SpreadCostCalc: { costPerTrade: 12, costPerYear: 15120 },
 ProfitFactorCalc: { pf: 2, netProfit: 4100 },
 AtrStopLossCalc: { sl: 1.089, tp2: 1.137 },
 StockProfitCalc: { netProfit: 1500, roi: 30 },
 CryptoProfitCalc: { netProfit: 297.7, roi: 297.7/1001*100 },
 MartingaleCalc: { lvl: 8 },
 LiquidationCalc: { liqPrice: 58500/0.995 },
 XauusdPipCalc: { pipValue: 1, totalPnL: 100 },
 RebateCalc: { monthly: 500, daily: 25 },
 SwapCalc: { total: -19.5 },
 PivotPointCalc: { PP: 1.089, R1: 1.096, S1: 1.083 },
 FibonacciCalc: { diff: 0.04 },
 PipToDollarCalc: { total: 500 },
 FuturesPositionSizeCalc: { contracts: 4, actualRisk: 500 },
 FuturesPLCalc: { grossPL: 500, netPL: 496 },
 FuturesMarginCalc: { initTotal: 15000, maintTotal: 12000 },
 FuturesTPSLCalc: { slPrice: 4997.5, tpPrice: 5005, dollarRisk: 125 },
 FuturesContractValueCalc: { notionalAll: 250000 },
 FuturesRollCostCalc: { rollCost: 750 },
 FuturesCommissionCalc: { roundTrip: 3, monthlyCost: 315 },
 FuturesBreakEvenCalc: { beTicks: 1, beDollars: 12.5 },
 FuturesRiskRewardCalc: { rr: 2, dollarRisk: 125 },
 PropFirmTrailingDrawdownCalc: { floor: 92000, distance: 8500 },
 PropFirmDailyLossCalc: { remaining: 5000 },
 PropFirmProfitTargetCalc: { target: 10000, remaining: 7000, needPerDay: 350 },
 PropFirmConsistencyCalc: { actualPct: 37.5, moreNeeded: 2000 },
 PropFirmPassRateCalc: { ev: 35, minWR: 100/3 },
 PropFirmPositionSizeCalc: { riskable: 3500, maxLots: 17.5 },
 PropFirmAccountSizeFinderCalc: { requiredAccount: 50000, recommended: 50000 },
 PositionSizeCalc: { riskAmt: 100 },
 PipValueCalc: { pipValueUSD: 10, totalValue: 100 },
 ProfitLossCalc: { pnl: 2000, pips: 200 },
};
const exported = Object.keys(load(generic, {}, true));
test('all 53 calculator components have an independent example', () => {
 assert.equal(Object.keys(examples).length,53);
 assert.equal(exported.length,50);
 for (const name of exported) assert.ok(examples[name], name);
});
for (const [name, expected] of Object.entries(examples)) {
 test(`${name}: worked example and rendered results`, () => {
  const result = calc(name);
  assert.equal(result.error,undefined);
  for (const [key,value] of Object.entries(expected)) near(result[key],value,`${name}.${key}`);
  const file = exported.includes(name) ? generic : `src/components/calculators/${name}.tsx`;
  const m = load(file);
  const html = renderToStaticMarkup((m[name] || m.default)());
  assert.ok(html.includes('<input'),name);
  assert.ok(!/\bNaN\b|>Infinity<|role="alert"/.test(html),name);
 });
}
// Exercise every numeric input state in the generic forms. Invalid numbers must
// produce an error rather than a plausible substituted result.
const source = fs.readFileSync(path.resolve(__dirname,'../'+generic),'utf8');
for (const block of source.split(/(?=export function )/).slice(1)) {
 const name = block.match(/export function (\w+)/)[1];
 const prefix=block.split('  return (')[0];
 const states=[...prefix.matchAll(/const \[(\w+),\s*\w+\]\s*= useState(?:<[^;]+?>)?\('(-?[\d.]*?)'\)/g)].map(m=>m[1]);
 for(const state of states.filter(s=>s!=='purchasePrice')) {
  test(`${name}: rejects blank and nonfinite ${state}`,()=>{
   for(const value of ['', 'Infinity', 'not-a-number']) assert.ok(calc(name,{[state]:value}).error, `${state}=${value}`);
  });
 }
 test(`${name}: invalid fields remain editable; results withheld`,()=>{
  const state=states.find(s=>s!=='purchasePrice');
  const m=load(generic,{[state]:''});
  const html=renderToStaticMarkup(m[name]());
  assert.ok(html.includes('role="alert"'));
  assert.ok(html.includes('<input'));
  assert.ok(!html.includes('font-display'), 'result should be withheld');
 });
}
test('gold and cross-currency pip conversion, including zero movement',()=>{
 near(calc('PipValueCalc',{pair:'XAU/USD'}).pipValueUSD,1,'100-ounce gold lot');
 near(calc('PipValueCalc',{pair:'XAU/USD',lotSize:'1000'}).pipValueUSD,0.01,'micro gold');
 near(calc('PipValueCalc',{pair:'EUR/GBP',exRate:'0.8'}).pipValueUSD,12.5,'GBP conversion');
 near(calc('PipValueCalc',{pair:'EUR/JPY',exRate:'150'}).pipValueUSD,1000/150,'JPY cross');
 assert.equal(calc('PipValueCalc',{numPips:'0'}).totalValue,0);
 assert.ok(calc('PipValueCalc',{pair:'USD/JPY',exRate:'0'}).error);
});
test('position quantities round down instead of exceeding budget',()=>{
 const r=calc('PositionSizeCalc',{stopLoss:'15'});
 assert.equal(r.result.find(x=>x.label==='Standard Lots').value,'0.66');
 assert.equal(calc('PositionSizeCalc',{mode:'stocks',stopLoss:'3'}).result.find(x=>x.label==='Shares to Buy').value,'33');
 assert.equal(calc('PositionSizeCalc',{balance:'500',stopLoss:'100'}).result.find(x=>x.label==='Standard Lots').value,'0.00');
 assert.equal(calc('LotSizeCalc',{slPips:'15'}).stdLots,0.66);
 assert.ok(calc('PositionSizeCalc',{pipVal:'0'}).error);
});
test('long/short P&L and JPY pip size',()=>{
 near(calc('ProfitLossCalc',{entry:'150',exit:'150.5',pipSize:'0.01',pipVal:'6.6666666667'}).pnl,1000/3,'JPY P&L');
 near(calc('ProfitLossCalc',{direction:'short'}).pnl,-2000,'short');
 near(calc('ProfitLossCalc',{mode:'stocks',entry:'50',exit:'65',shares:'100',commission:'10'}).pnl,1490,'stock fees');
 near(calc('ProfitLossCalc',{mode:'crypto',entry:'50000',exit:'60000',coins:'0.1'}).pnl,1000,'crypto');
});
test('zero is retained; empty and invalid ranges are rejected',()=>{
 assert.equal(calc('FundingRateCalc',{fundingRate:'0'}).totalFee,0);
 assert.equal(calc('DailyLossLimitCalc',{usePct:'0'}).riskPerTrade,0);
 assert.equal(calc('PropFirmPositionSizeCalc',{bufferPct:'0'}).maxLots,0);
 assert.equal(calc('KellyCalc',{winRate:'0'}).fullAmt,0);
 for(const [name,values] of [['MarginCalc',{leverage:'0'}],['LotSizeCalc',{slPips:'0'}],['KellyCalc',{winRate:'101'}],['FuturesPLCalc',{contracts:'1.5'}],['MartingaleCalc',{levels:'16'}],['CompoundingCalc',{months:'121'}],['RiskRewardCalc',{sl:'1.09'}],['FibonacciCalc',{low:'2'}],['LiquidationCalc',{maintMargin:'20'}]]) assert.ok(calc(name,values).error,name);
});
test('compounding includes actual withdrawals and handles depletion',()=>{
 let r=calc('CompoundingCalc',{startBal:'1000',monthly:'1',months:'12',withdraw:'10'});
 near(r.finalBal,1000,'balance');near(r.withdrawals,120,'withdrawals');near(r.totalGain,120,'gain');
 r=calc('CompoundingCalc',{startBal:'100',monthly:'0',months:'12',withdraw:'60'});
 assert.equal(r.finalBal,0);assert.equal(r.withdrawals,100);assert.equal(r.totalGain,0);
});
test('total loss is not zero recovery or zero CAGR',()=>{
 assert.equal(calc('DrawdownCalc',{drawdown:'100'}).recovery,Infinity);
 assert.equal(calc('DrawdownCalc',{drawdown:'0',lossPerTrade:'0'}).consec,0);
 assert.equal(calc('GainLossCalc',{endBal:'0'}).recoveryNeeded,Infinity);
 assert.equal(calc('CAGRCalc',{endBal:'0'}).cagr,-100);
});
test('options four expiry directions and zero underlying',()=>{
 assert.equal(calc('OptionsProfitCalc',{type:'short-call'}).pnl,-700);
 assert.equal(calc('OptionsProfitCalc',{type:'long-put',target:'140'}).pnl,700);
 assert.equal(calc('OptionsProfitCalc',{type:'short-put',target:'140'}).pnl,-700);
 assert.equal(calc('OptionsProfitCalc',{type:'long-put',target:'0'}).pnl,14700);
 assert.equal(calc('OptionsProfitCalc',{target:'150'}).pnl,-300);
});
test('risk threshold probabilities agree with enumerated two-trade paths',()=>{
 near(calc('RiskOfRuinCalc',{winRate:'50',rr:'1',risk:'1',ruin:'1',horizon:'2'}).ror,50,'one-R floor');
 near(calc('RiskOfRuinCalc',{winRate:'50',rr:'1',risk:'1',ruin:'2',horizon:'2'}).ror,25,'two-R floor');
 assert.equal(calc('RiskOfRuinCalc',{winRate:'0',risk:'1',ruin:'2',horizon:'2'}).ror,100);
 assert.equal(calc('RiskOfRuinCalc',{risk:'0'}).ror,0);
});
test('Kelly correction, break-even expectancy, and no-loss profit factor',()=>{
 near(calc('KellyCalc',{winRate:'45',rr:'2'}).fullKelly,0.175,'Kelly');
 near(calc('WinRateCalc',{winRate:'25',rr:'3'}).ev,0,'break-even');
 assert.equal(calc('ProfitFactorCalc',{grossLoss:'0',lossTrades:'0'}).pf,Infinity);
 assert.ok(Number.isNaN(calc('ProfitFactorCalc',{grossProfit:'0',grossLoss:'0',winTrades:'0',lossTrades:'0'}).pf));
});
test('ATR and pip distance support correct JPY units',()=>{
 near(calc('AtrStopLossCalc',{entry:'150',atr:'20',multiplier:'2',pipSize:'0.01'}).sl,149.6,'JPY stop');
 near(calc('AtrStopLossCalc',{entry:'100',atr:'2',multiplier:'2',pipSize:'1',direction:'short'}).sl,104,'short price units');
 near(calc('PipDifferenceCalc',{pairType:'jpy',price1:'150',price2:'150.5',pipVal:'6.6666666667'}).pipDiff,50,'JPY pips');
});
test('classic, Fibonacci, Camarilla and prior-close Woodie pivot conventions',()=>{
 const v={high:'110',low:'100',close:'105'};
 const classic=calc('PivotPointCalc',v);near(classic.R2,115,'classic R2');near(classic.S3,90,'classic S3');
 near(calc('PivotPointCalc',{...v,type:'fibonacci'}).R1,108.82,'fib R1');
 near(calc('PivotPointCalc',{...v,type:'camarilla'}).R3,107.75,'camarilla R3');
 near(calc('PivotPointCalc',{...v,type:'woodie'}).PP,105,'woodie');
 const up=calc('FibonacciCalc',{high:'120',low:'100'});
 near(up.retraceLevels[4].value,107.64,'retracement');near(up.extendLevels[1].value,132.36,'extension');
 near(calc('FibonacciCalc',{high:'120',low:'100',trend:'down'}).retraceLevels[4].value,112.36,'down');
});
test('futures integer sizing, micro units, direction and zero fees',()=>{
 assert.equal(calc('FuturesPositionSizeCalc',{account:'25000',slTicks:'20'}).contracts,1);
 assert.equal(calc('FuturesPositionSizeCalc',{account:'100',slTicks:'20'}).contracts,0);
 assert.equal(calc('FuturesTickCalc',{contract:'MES'}).totalPnL,12.5);
 assert.equal(calc('FuturesPLCalc',{direction:'short'}).netPL,-504);
 assert.equal(calc('FuturesTPSLCalc',{direction:'short'}).slPrice,5002.5);
 assert.equal(calc('FuturesRollCostCalc',{direction:'short'}).rollCost,-750);
 assert.equal(calc('FuturesBreakEvenCalc',{commPerSide:'0'}).beTicks,0);
});
test('prop models handle boundaries, custom targets and unavailable account sizes',()=>{
 assert.equal(calc('PropFirmTrailingDrawdownCalc',{floorMode:'fixed'}).floor,90000);
 assert.equal(calc('PropFirmDailyLossCalc',{lostToday:'5001'}).remaining,0);
 near(calc('PropFirmProfitTargetCalc',{customTgt:'7'}).target,7000,'custom target');
 assert.equal(calc('PropFirmProfitTargetCalc',{earnedSoFar:'10000',avgDaily:'0'}).onTrack,true);
 assert.equal(calc('PropFirmConsistencyCalc',{totalProfit:'0',bestDay:'0'}).passes,false);
 assert.equal(calc('PropFirmAccountSizeFinderCalc',{monthlyTarget:'100000'}).recommended,undefined);
 const v={winRate:'100',avgWin:'1000',targetPct:'1'};
 assert.equal(calc('PropFirmPassRateCalc',v).passRate,100);
 assert.equal(calc('PropFirmPassRateCalc',{winRate:'0'}).passRate,0);
 assert.equal(calc('PropFirmPassRateCalc').passRate,calc('PropFirmPassRateCalc').passRate);
});
test('manual rates and signed funding/swap inputs',()=>{
 near(calc('CurrencyConverterCalc',{manualRate:'0.8'}).converted,80,'manual FX');
 assert.equal(calc('SwapCalc',{swapRate:'2',lots:'0.5',days:'3'}).total,3);
 assert.equal(calc('FundingRateCalc',{fundingRate:'-0.01',direction:'short'}).youPay,true);
 assert.equal(calc('FundingRateCalc',{periodsDay:'1'}).weeklyFee,7);
 assert.equal(calc('MartingaleCalc').maxExposure,'2.55');
});
for (const [name,state] of [['PositionSizeCalc','stopLoss'],['PipValueCalc','numPips'],['ProfitLossCalc','entry']]) {
 test(`${name}: invalid core input hides result and retains editable controls`,()=>{
  const m=load(`src/components/calculators/${name}.tsx`,{[state]:''});
  const html=renderToStaticMarkup(m.default());
  assert.ok(html.includes('role="alert"'));
  assert.ok(html.includes('<input'));
  assert.ok(!html.includes('font-display'));
 });
}
