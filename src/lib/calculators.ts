// ─── Calculator metadata & logic ───────────────────────────────────────────

export type AssetClass = 'forex' | 'stocks' | 'crypto' | 'futures';

export interface HowToStep {
  name: string;
  text: string;
}

export interface ResultField {
  label: string;
  text: string;
}

export interface CalculatorMeta {
  slug: string;
  title: string;         // H1 heading on the page
  metaTitle?: string;    // <title> tag override (use when title is too long for SEO)
  shortTitle: string;
  description: string;
  longDescription: string;
  keywords: string[];
  assets: AssetClass[];
  searchVolume: string;
  category: 'risk' | 'profit' | 'position' | 'utility' | 'futures' | 'propfirm';
  formula: string;
  workedExample?: string;        // Real numbers worked example e.g. "$5,000 × 1% ÷ (25 × $10) = 0.20 lots"
  whyUse?: string;               // "Why Use This Calculator?" paragraph
  resultsExplained?: ResultField[]; // What each output field means
  howToSteps: HowToStep[];
  faqs: { q: string; a: string }[];
}

export const CALCULATORS: CalculatorMeta[] = [
  {
    "slug": "position-size-calculator",
    "title": "Position Size Calculator — Forex, Stocks & Crypto",
    "shortTitle": "Position Size",
    "description": "Position size connects the money you plan to risk with the distance between entry and stop. Choose the stop from the trade setup first, then calculate…",
    "longDescription": "Position size connects the money you plan to risk with the distance between entry and stop. Choose the stop from the trade setup first, then calculate quantity. Available leverage is a separate constraint, not a risk budget. TradeCalc rounds forex quantities down to 0.01 lots, stocks to whole shares and crypto to six decimal places. Verify the actual instrument step. A standard EUR/USD lot is 100,000 EUR; its USD notional changes with the exchange rate. Stops do not guarantee fills, and simultaneous correlated positions can lose together.",
    "keywords": [
      "position size calculator",
      "lot size calculator forex",
      "how many shares to buy calculator",
      "forex position sizing",
      "position sizing tool",
      "how to calculate position size",
      "risk per trade calculator",
      "position size formula trading",
      "forex position size calculator free",
      "trading unit size calculator",
      "position sizing calculator online",
      "how much to risk per trade"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto"
    ],
    "searchVolume": "22,000/mo",
    "category": "position",
    "formula": "Risk budget = equity × risk % / 100; lots = floor to 0.01 of budget / (stop pips × USD pip value per lot)",
    "workedExample": "With $10,000 equity, 1% planned risk, a 15-pip stop and $10 per pip per lot, the unrounded answer is 100 / 150 = 0.6667 lots. A 0.01-lot step permits 0.66 lots, with $99 price-movement risk before costs. On a $500 account, 1% risk and a 100-pip stop give 0.005 lots. A 0.01 minimum would exceed that budget; skip the trade or use a smaller contract.",
    "whyUse": "Position size connects the money you plan to risk with the distance between entry and stop. Choose the stop from the trade setup first, then calculate quantity. Available leverage is a separate constraint, not a risk budget. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Risk budget = equity × risk % / 100; lots = floor to 0.01 of budget / (stop pips × USD pip value per lot)"
      },
      {
        "label": "Interpretation and limits",
        "text": "TradeCalc rounds forex quantities down to 0.01 lots, stocks to whole shares and crypto to six decimal places. Verify the actual instrument step. A standard EUR/USD lot is 100,000 EUR; its USD notional changes with the exchange rate. Stops do not guarantee fills, and simultaneous correlated positions can lose together."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "With $10,000 equity, 1% planned risk, a 15-pip stop and $10 per pip per lot, the unrounded answer is 100 / 150 = 0.6667 lots. A 0.01-lot step permits 0.66 lots, with $99 price-movement risk before costs. On a $500 account, 1% risk and a 100-pip stop give 0.005 lots. A 0.01 minimum would exceed that budget; skip the trade or use a smaller contract."
      },
      {
        "name": "Interpret the result",
        "text": "TradeCalc rounds forex quantities down to 0.01 lots, stocks to whole shares and crypto to six decimal places. Verify the actual instrument step. A standard EUR/USD lot is 100,000 EUR; its USD notional changes with the exchange rate. Stops do not guarantee fills, and simultaneous correlated positions can lose together."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Risk budget = equity × risk % / 100; lots = floor to 0.01 of budget / (stop pips × USD pip value per lot)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "With $10,000 equity, 1% planned risk, a 15-pip stop and $10 per pip per lot, the unrounded answer is 100 / 150 = 0.6667 lots. A 0.01-lot step permits 0.66 lots, with $99 price-movement risk before costs. On a $500 account, 1% risk and a 100-pip stop give 0.005 lots. A 0.01 minimum would exceed that budget; skip the trade or use a smaller contract."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "TradeCalc rounds forex quantities down to 0.01 lots, stocks to whole shares and crypto to six decimal places. Verify the actual instrument step. A standard EUR/USD lot is 100,000 EUR; its USD notional changes with the exchange rate. Stops do not guarantee fills, and simultaneous correlated positions can lose together."
      }
    ]
  },
  {
    "slug": "pip-value-calculator",
    "title": "Pip Value Calculator — Forex Pip Calculator for All Pairs",
    "metaTitle": "Pip Value Calculator — Forex Pip Calculator",
    "shortTitle": "Pip Value",
    "description": "Pip value is the money gained or lost for a one-pip price movement at a specified position size. It depends on pip size, contract units and the…",
    "longDescription": "Pip value is the money gained or lost for a one-pip price movement at a specified position size. It depends on pip size, contract units and the conversion from quote currency into account currency. For a fixed EUR/GBP quantity, USD pip value depends on GBP-to-USD conversion, not directly on the EUR/GBP price. The calculator requires quote units per USD, so do not enter GBP/USD in the opposite direction. Presets are examples, not live quotes. Gold uses a separate assumed contract size of 100 ounces.",
    "keywords": [
      "pip value calculator",
      "forex pip calculator",
      "pip calculator",
      "pip calculator forex",
      "pip value forex",
      "forex pips calculator",
      "fx pip calculator",
      "cfd pip calculator",
      "eur usd pip value",
      "how to calculate pip value for eur/usd",
      "pip value per lot",
      "calculate pip value",
      "pip value eurusd",
      "usdjpy pip value",
      "forex pip value calculation",
      "pip movement calculator",
      "what is a pip worth",
      "pip value in dollars"
    ],
    "assets": [
      "forex"
    ],
    "searchVolume": "27,000/mo",
    "category": "utility",
    "formula": "USD pip value = pip size × contract units / quote-currency units per USD",
    "workedExample": "One standard EUR/USD lot gives 0.0001 × 100,000 = $10 per pip. At a hypothetical USD/JPY rate of 150, one standard USD/JPY or EUR/JPY lot gives 0.01 × 100,000 / 150 = $6.6667 per pip. For EUR/GBP, a hypothetical 0.80 GBP per USD gives 10 / 0.80 = $12.50 per pip.",
    "whyUse": "Pip value is the money gained or lost for a one-pip price movement at a specified position size. It depends on pip size, contract units and the conversion from quote currency into account currency. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "USD pip value = pip size × contract units / quote-currency units per USD"
      },
      {
        "label": "Interpretation and limits",
        "text": "For a fixed EUR/GBP quantity, USD pip value depends on GBP-to-USD conversion, not directly on the EUR/GBP price. The calculator requires quote units per USD, so do not enter GBP/USD in the opposite direction. Presets are examples, not live quotes. Gold uses a separate assumed contract size of 100 ounces."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "One standard EUR/USD lot gives 0.0001 × 100,000 = $10 per pip. At a hypothetical USD/JPY rate of 150, one standard USD/JPY or EUR/JPY lot gives 0.01 × 100,000 / 150 = $6.6667 per pip. For EUR/GBP, a hypothetical 0.80 GBP per USD gives 10 / 0.80 = $12.50 per pip."
      },
      {
        "name": "Interpret the result",
        "text": "For a fixed EUR/GBP quantity, USD pip value depends on GBP-to-USD conversion, not directly on the EUR/GBP price. The calculator requires quote units per USD, so do not enter GBP/USD in the opposite direction. Presets are examples, not live quotes. Gold uses a separate assumed contract size of 100 ounces."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "USD pip value = pip size × contract units / quote-currency units per USD"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "One standard EUR/USD lot gives 0.0001 × 100,000 = $10 per pip. At a hypothetical USD/JPY rate of 150, one standard USD/JPY or EUR/JPY lot gives 0.01 × 100,000 / 150 = $6.6667 per pip. For EUR/GBP, a hypothetical 0.80 GBP per USD gives 10 / 0.80 = $12.50 per pip."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "For a fixed EUR/GBP quantity, USD pip value depends on GBP-to-USD conversion, not directly on the EUR/GBP price. The calculator requires quote units per USD, so do not enter GBP/USD in the opposite direction. Presets are examples, not live quotes. Gold uses a separate assumed contract size of 100 ounces."
      }
    ]
  },
  {
    "slug": "profit-loss-calculator",
    "title": "Profit & Loss Calculator — Forex, Stocks & Crypto",
    "shortTitle": "Profit / Loss",
    "description": "Trading profit or loss comes from the signed price movement multiplied by quantity, with costs then deducted. Use the instrument’s contract units and…",
    "longDescription": "Trading profit or loss comes from the signed price movement multiplied by quantity, with costs then deducted. Use the instrument’s contract units and the account currency consistently. Actual bid/ask entry and exit fills already reflect spread: subtracting it again double-counts the cost. For JPY pairs choose a 0.01 pip size and supply the correct USD pip value. Cross-currency conversion can change over the holding period. Funding, swap and taxes require separate treatment if not included in the fee input.",
    "keywords": [
      "trading profit loss calculator",
      "forex profit calculator",
      "stock profit calculator",
      "crypto profit calculator",
      "trade P&L calculator",
      "how to calculate profit in forex",
      "trading pl calculator",
      "trade profit percentage calculator",
      "forex trade outcome calculator",
      "buy sell profit calculator",
      "profit loss formula trading",
      "calculate profit on a trade"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto"
    ],
    "searchVolume": "18,000/mo",
    "category": "profit",
    "formula": "Gross P&L = signed price movement × quantity; forex P&L = signed pips × USD pip value × lots; net = gross − total fees",
    "workedExample": "Buy 0.5 standard EUR/USD lots at 1.1000 and sell at 1.1020: 20 pips × $10 × 0.5 = $100 gross. With $7 total round-trip commission, net P&L is $93. A short opened at 1.1020 and closed at 1.1000 has the same gross profit.",
    "whyUse": "Trading profit or loss comes from the signed price movement multiplied by quantity, with costs then deducted. Use the instrument’s contract units and the account currency consistently. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Gross P&L = signed price movement × quantity; forex P&L = signed pips × USD pip value × lots; net = gross − total fees"
      },
      {
        "label": "Interpretation and limits",
        "text": "Actual bid/ask entry and exit fills already reflect spread: subtracting it again double-counts the cost. For JPY pairs choose a 0.01 pip size and supply the correct USD pip value. Cross-currency conversion can change over the holding period. Funding, swap and taxes require separate treatment if not included in the fee input."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Buy 0.5 standard EUR/USD lots at 1.1000 and sell at 1.1020: 20 pips × $10 × 0.5 = $100 gross. With $7 total round-trip commission, net P&L is $93. A short opened at 1.1020 and closed at 1.1000 has the same gross profit."
      },
      {
        "name": "Interpret the result",
        "text": "Actual bid/ask entry and exit fills already reflect spread: subtracting it again double-counts the cost. For JPY pairs choose a 0.01 pip size and supply the correct USD pip value. Cross-currency conversion can change over the holding period. Funding, swap and taxes require separate treatment if not included in the fee input."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Gross P&L = signed price movement × quantity; forex P&L = signed pips × USD pip value × lots; net = gross − total fees"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Buy 0.5 standard EUR/USD lots at 1.1000 and sell at 1.1020: 20 pips × $10 × 0.5 = $100 gross. With $7 total round-trip commission, net P&L is $93. A short opened at 1.1020 and closed at 1.1000 has the same gross profit."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Actual bid/ask entry and exit fills already reflect spread: subtracting it again double-counts the cost. For JPY pairs choose a 0.01 pip size and supply the correct USD pip value. Cross-currency conversion can change over the holding period. Funding, swap and taxes require separate treatment if not included in the fee input."
      }
    ]
  },
  {
    "slug": "margin-calculator",
    "title": "Margin Calculator — Forex & CFD Trading",
    "shortTitle": "Margin",
    "description": "Margin is collateral required to open and maintain a leveraged position. It is different from the loss planned at a stop and can change with broker…",
    "longDescription": "Margin is collateral required to open and maintain a leveraged position. It is different from the loss planned at a stop and can change with broker rules, prices or volatility. This tool estimates required margin, not the exact number of pips until forced closure. Cross pairs, tiered margins and different account currencies need conversion or additional rules. Percentage-based stop sizing does not automatically ensure sufficient free margin. Losses consume equity even though margin itself is not a transaction fee.",
    "keywords": [
      "margin calculator forex",
      "required margin calculator",
      "forex margin calculator",
      "trading margin calculator",
      "CFD margin calculator",
      "how to calculate margin in forex",
      "margin requirement calculator",
      "forex leverage margin calculator",
      "margin call calculator",
      "free margin calculator",
      "used margin calculator",
      "margin level calculator forex"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto"
    ],
    "searchVolume": "9,000/mo",
    "category": "position",
    "formula": "USD notional = lots × units per lot × USD price; margin = notional / leverage",
    "workedExample": "One standard EUR/USD lot at 1.1000 has $110,000 notional. At 10:1 leverage the required margin is $11,000. An account with $15,000 equity has a $4,000 buffer above used margin. At $10 per pip, that corresponds to 400 adverse pips under constant-margin, no-cost assumptions—not 36 pips.",
    "whyUse": "Margin is collateral required to open and maintain a leveraged position. It is different from the loss planned at a stop and can change with broker rules, prices or volatility. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "USD notional = lots × units per lot × USD price; margin = notional / leverage"
      },
      {
        "label": "Interpretation and limits",
        "text": "This tool estimates required margin, not the exact number of pips until forced closure. Cross pairs, tiered margins and different account currencies need conversion or additional rules. Percentage-based stop sizing does not automatically ensure sufficient free margin. Losses consume equity even though margin itself is not a transaction fee."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "One standard EUR/USD lot at 1.1000 has $110,000 notional. At 10:1 leverage the required margin is $11,000. An account with $15,000 equity has a $4,000 buffer above used margin. At $10 per pip, that corresponds to 400 adverse pips under constant-margin, no-cost assumptions—not 36 pips."
      },
      {
        "name": "Interpret the result",
        "text": "This tool estimates required margin, not the exact number of pips until forced closure. Cross pairs, tiered margins and different account currencies need conversion or additional rules. Percentage-based stop sizing does not automatically ensure sufficient free margin. Losses consume equity even though margin itself is not a transaction fee."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "USD notional = lots × units per lot × USD price; margin = notional / leverage"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "One standard EUR/USD lot at 1.1000 has $110,000 notional. At 10:1 leverage the required margin is $11,000. An account with $15,000 equity has a $4,000 buffer above used margin. At $10 per pip, that corresponds to 400 adverse pips under constant-margin, no-cost assumptions—not 36 pips."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "This tool estimates required margin, not the exact number of pips until forced closure. Cross pairs, tiered margins and different account currencies need conversion or additional rules. Percentage-based stop sizing does not automatically ensure sufficient free margin. Losses consume equity even though margin itself is not a transaction fee."
      }
    ]
  },
  {
    "slug": "risk-reward-calculator",
    "title": "Risk Reward Ratio Calculator — Free Forex R:R Tool",
    "shortTitle": "Risk / Reward",
    "description": "A planned risk/reward ratio compares the distance to the stop with the distance to the target. It does not establish whether a strategy is profitable…",
    "longDescription": "A planned risk/reward ratio compares the distance to the stop with the distance to the target. It does not establish whether a strategy is profitable without information about realized wins, losses and costs. Stop and target belong on opposite sides of entry. Moving a target farther away can reduce the chance of reaching it; it does not improve expectancy automatically. Measure realized average payoff after partial exits and costs. Exactly one-third wins at 2:1 breaks even before costs; rounded 33% is slightly below that threshold.",
    "keywords": [
      "risk reward calculator",
      "risk reward ratio calculator",
      "risk to reward calculator",
      "risk/reward ratio calculator",
      "forex risk reward calculator",
      "rr calculator",
      "rr win rate calculator",
      "win rate rr calculator",
      "options risk reward calculator",
      "risk reward calculator online",
      "risk to reward ratio calculator",
      "trade planning calculator",
      "rr ratio forex",
      "trading risk reward ratio",
      "how to calculate risk reward ratio",
      "risk reward ratio 1 to 2 calculator",
      "good risk reward ratio calculator",
      "stop loss take profit calculator",
      "minimum win rate calculator rr",
      "risk reward ratio formula"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "6,500/mo",
    "category": "risk",
    "formula": "Reward multiple = target distance / stop distance; break-even win % = 100 / (1 + reward multiple)",
    "workedExample": "For a long entry at 100, stop at 95 and target at 110, risk is 5 and reward is 10: risk:reward is 1:2. One +2R winner and two −1R losers sum to zero before costs. A 40% win rate at the same realized payoff gives 0.4 × 2 − 0.6 = +0.2R per trade before costs.",
    "whyUse": "A planned risk/reward ratio compares the distance to the stop with the distance to the target. It does not establish whether a strategy is profitable without information about realized wins, losses and costs. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Reward multiple = target distance / stop distance; break-even win % = 100 / (1 + reward multiple)"
      },
      {
        "label": "Interpretation and limits",
        "text": "Stop and target belong on opposite sides of entry. Moving a target farther away can reduce the chance of reaching it; it does not improve expectancy automatically. Measure realized average payoff after partial exits and costs. Exactly one-third wins at 2:1 breaks even before costs; rounded 33% is slightly below that threshold."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "For a long entry at 100, stop at 95 and target at 110, risk is 5 and reward is 10: risk:reward is 1:2. One +2R winner and two −1R losers sum to zero before costs. A 40% win rate at the same realized payoff gives 0.4 × 2 − 0.6 = +0.2R per trade before costs."
      },
      {
        "name": "Interpret the result",
        "text": "Stop and target belong on opposite sides of entry. Moving a target farther away can reduce the chance of reaching it; it does not improve expectancy automatically. Measure realized average payoff after partial exits and costs. Exactly one-third wins at 2:1 breaks even before costs; rounded 33% is slightly below that threshold."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Reward multiple = target distance / stop distance; break-even win % = 100 / (1 + reward multiple)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "For a long entry at 100, stop at 95 and target at 110, risk is 5 and reward is 10: risk:reward is 1:2. One +2R winner and two −1R losers sum to zero before costs. A 40% win rate at the same realized payoff gives 0.4 × 2 − 0.6 = +0.2R per trade before costs."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Stop and target belong on opposite sides of entry. Moving a target farther away can reduce the chance of reaching it; it does not improve expectancy automatically. Measure realized average payoff after partial exits and costs. Exactly one-third wins at 2:1 breaks even before costs; rounded 33% is slightly below that threshold."
      }
    ]
  },
  {
    "slug": "lot-size-calculator",
    "title": "Lot Size Calculator — Forex Lot Size & Position Sizing",
    "metaTitle": "Lot Size Calculator — Forex Lot Size Calculator",
    "shortTitle": "Lot Size",
    "description": "Lot sizing converts a planned dollar risk into a tradable forex quantity. Standard, mini and micro lots describe units, not which account sizes they…",
    "longDescription": "Lot sizing converts a planned dollar risk into a tradable forex quantity. Standard, mini and micro lots describe units, not which account sizes they are suitable for. Recalculate when equity or stop distance changes. A smaller lot can still carry excessive risk with a wide stop. The calculator rounds down to 0.01 standard lots; if the result is zero, the budget does not support that step. Mini and micro outputs are equivalent quantities, not additional positions to open.",
    "keywords": [
      "lot size calculator",
      "forex lot size calculator",
      "lot size calculator forex",
      "eur usd lot size calculator",
      "eurusd lot size calculator",
      "cent account lot size calculator",
      "nas100 lot size calculator",
      "us30 lot size calculator",
      "cfd lot size calculator",
      "0.01 lot size in dollars",
      "lot calculator",
      "forex calculator lot size",
      "calculate lot size",
      "lot size calculation",
      "mini lot calculator",
      "micro lot calculator forex",
      "lot size forex calculator",
      "best lot size for $1000 account"
    ],
    "assets": [
      "forex"
    ],
    "searchVolume": "14,000/mo",
    "category": "position",
    "formula": "Standard lots = floor to 0.01 of risk budget / (stop pips × USD pip value per lot)",
    "workedExample": "At 0.5 EUR/USD lots, a 20-pip stop represents 0.5 × 20 × $10 = $100 before costs. A 100-pip move at the same size is $500. For a $100 budget and 30-pip stop, the raw quantity is 0.3333 lots; rounding down to 0.33 gives $99 price risk.",
    "whyUse": "Lot sizing converts a planned dollar risk into a tradable forex quantity. Standard, mini and micro lots describe units, not which account sizes they are suitable for. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Standard lots = floor to 0.01 of risk budget / (stop pips × USD pip value per lot)"
      },
      {
        "label": "Interpretation and limits",
        "text": "Recalculate when equity or stop distance changes. A smaller lot can still carry excessive risk with a wide stop. The calculator rounds down to 0.01 standard lots; if the result is zero, the budget does not support that step. Mini and micro outputs are equivalent quantities, not additional positions to open."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At 0.5 EUR/USD lots, a 20-pip stop represents 0.5 × 20 × $10 = $100 before costs. A 100-pip move at the same size is $500. For a $100 budget and 30-pip stop, the raw quantity is 0.3333 lots; rounding down to 0.33 gives $99 price risk."
      },
      {
        "name": "Interpret the result",
        "text": "Recalculate when equity or stop distance changes. A smaller lot can still carry excessive risk with a wide stop. The calculator rounds down to 0.01 standard lots; if the result is zero, the budget does not support that step. Mini and micro outputs are equivalent quantities, not additional positions to open."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Standard lots = floor to 0.01 of risk budget / (stop pips × USD pip value per lot)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At 0.5 EUR/USD lots, a 20-pip stop represents 0.5 × 20 × $10 = $100 before costs. A 100-pip move at the same size is $500. For a $100 budget and 30-pip stop, the raw quantity is 0.3333 lots; rounding down to 0.33 gives $99 price risk."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Recalculate when equity or stop distance changes. A smaller lot can still carry excessive risk with a wide stop. The calculator rounds down to 0.01 standard lots; if the result is zero, the budget does not support that step. Mini and micro outputs are equivalent quantities, not additional positions to open."
      }
    ]
  },
  {
    "slug": "compounding-calculator",
    "title": "Trading Compounding Calculator — Forex & Binary",
    "shortTitle": "Compounding",
    "description": "Compounding applies each period’s return to the balance remaining from the previous period. A calculator can explore assumptions, but it cannot…",
    "longDescription": "Compounding applies each period’s return to the balance remaining from the previous period. A calculator can explore assumptions, but it cannot establish a realistic income target or predict a trading record. Variable returns require multiplying the actual period factors. A +10% month followed by −10% leaves $990 from $1,000: the arithmetic average is zero but the compounded result is −1%. Use a geometric growth rate for a constant-rate equivalent. Fees, taxes, losses and withdrawal timing can materially change the path; no monthly return range is guaranteed.",
    "keywords": [
      "trading compounding calculator",
      "binary compounding calculator",
      "binary options compounding calculator",
      "compound calculator trading",
      "compounding calculator trading",
      "binary trading compounding calculator",
      "trading compound calculator",
      "forex compounding calculator",
      "account growth calculator trading",
      "compound interest calculator trading",
      "trading account growth calculator",
      "how to compound trading profits",
      "monthly compounding calculator forex",
      "compound return calculator trading"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "5,800/mo",
    "category": "profit",
    "formula": "Period balance = prior balance × (1 + monthly return) − actual withdrawal; total gain = final balance + withdrawals − start",
    "workedExample": "Starting with $1,000 at a hypothetical 1% monthly return gives $1,126.83 after 12 months without withdrawals. With $10 withdrawn at the end of each month, the balance stays $1,000 and total withdrawals are $120. These are arithmetic scenarios, not expected performance.",
    "whyUse": "Compounding applies each period’s return to the balance remaining from the previous period. A calculator can explore assumptions, but it cannot establish a realistic income target or predict a trading record. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Period balance = prior balance × (1 + monthly return) − actual withdrawal; total gain = final balance + withdrawals − start"
      },
      {
        "label": "Interpretation and limits",
        "text": "Variable returns require multiplying the actual period factors. A +10% month followed by −10% leaves $990 from $1,000: the arithmetic average is zero but the compounded result is −1%. Use a geometric growth rate for a constant-rate equivalent. Fees, taxes, losses and withdrawal timing can materially change the path; no monthly return range is guaranteed."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Starting with $1,000 at a hypothetical 1% monthly return gives $1,126.83 after 12 months without withdrawals. With $10 withdrawn at the end of each month, the balance stays $1,000 and total withdrawals are $120. These are arithmetic scenarios, not expected performance."
      },
      {
        "name": "Interpret the result",
        "text": "Variable returns require multiplying the actual period factors. A +10% month followed by −10% leaves $990 from $1,000: the arithmetic average is zero but the compounded result is −1%. Use a geometric growth rate for a constant-rate equivalent. Fees, taxes, losses and withdrawal timing can materially change the path; no monthly return range is guaranteed."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Period balance = prior balance × (1 + monthly return) − actual withdrawal; total gain = final balance + withdrawals − start"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Starting with $1,000 at a hypothetical 1% monthly return gives $1,126.83 after 12 months without withdrawals. With $10 withdrawn at the end of each month, the balance stays $1,000 and total withdrawals are $120. These are arithmetic scenarios, not expected performance."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Variable returns require multiplying the actual period factors. A +10% month followed by −10% leaves $990 from $1,000: the arithmetic average is zero but the compounded result is −1%. Use a geometric growth rate for a constant-rate equivalent. Fees, taxes, losses and withdrawal timing can materially change the path; no monthly return range is guaranteed."
      }
    ]
  },
  {
    "slug": "drawdown-calculator",
    "title": "Drawdown Calculator — Max Drawdown, Recovery % & Consecutive Losses",
    "shortTitle": "Drawdown",
    "description": "A 30% drawdown needs a 42.9% gain to recover — not 30%. Enter your drawdown to see the exact recovery percentage and how many consecutive losses it takes.",
    "longDescription": "Drawdown measures the decline from an account’s peak balance. The critical insight is asymmetry: losses are calculated on a larger number than gains are earned back on. A 30% drawdown leaves you with 70% of your capital, so you need 30/70 = 42.9% on the remaining balance just to get back to flat — not 30%. A 50% drawdown requires a 100% gain to recover. This calculator shows the exact recovery percentage for any drawdown size and models how many consecutive losing trades at a fixed risk percentage trigger that decline. Use it to set maximum drawdown rules before you start trading, not after.",
    "keywords": [
      "drawdown calculator trading",
      "forex drawdown calculator",
      "max drawdown calculator",
      "trading loss recovery calculator",
      "drawdown recovery calculator",
      "maximum drawdown calculator",
      "how to calculate drawdown trading",
      "account drawdown calculator",
      "drawdown percentage recovery needed",
      "gain needed to recover drawdown",
      "trading drawdown recovery percentage",
      "what return needed after drawdown",
      "drawdown calculator forex",
      "how many losses to cause drawdown",
      "drawdown recovery percentage formula"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "3,100/mo",
    "category": "risk",
    "formula": "Recovery % = drawdown % / (100 − drawdown %) × 100",
    "workedExample": "A fall from $10,000 to $7,000 is a 30% drawdown. Recovering $3,000 on the remaining $7,000 requires 42.8571%. At 2% of remaining equity lost per trade, 18 consecutive losses first exceed a 30% decline; 17 do not.",
    "whyUse": "Drawdown measures the decline from an account’s prior peak. The gain needed to recover is larger than the percentage loss because recovery starts from a smaller balance. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Recovery % = drawdown % / (100 − drawdown %) × 100"
      },
      {
        "label": "Interpretation and limits",
        "text": "A total loss has no finite percentage recovery without new capital. Deposits and withdrawals distort drawdown if treated as trading results. The calculator explores a chosen decline and a repeated-loss scenario; it does not calculate the probability of that sequence or how long a strategy will take to recover."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A fall from $10,000 to $7,000 is a 30% drawdown. Recovering $3,000 on the remaining $7,000 requires 42.8571%. At 2% of remaining equity lost per trade, 18 consecutive losses first exceed a 30% decline; 17 do not."
      },
      {
        "name": "Interpret the result",
        "text": "A total loss has no finite percentage recovery without new capital. Deposits and withdrawals distort drawdown if treated as trading results. The calculator explores a chosen decline and a repeated-loss scenario; it does not calculate the probability of that sequence or how long a strategy will take to recover."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Recovery % = drawdown % / (100 − drawdown %) × 100"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A fall from $10,000 to $7,000 is a 30% drawdown. Recovering $3,000 on the remaining $7,000 requires 42.8571%. At 2% of remaining equity lost per trade, 18 consecutive losses first exceed a 30% decline; 17 do not."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "A total loss has no finite percentage recovery without new capital. Deposits and withdrawals distort drawdown if treated as trading results. The calculator explores a chosen decline and a repeated-loss scenario; it does not calculate the probability of that sequence or how long a strategy will take to recover."
      }
    ]
  },
  {
    "slug": "average-down-calculator",
    "title": "Average Down Calculator — Stocks & Crypto",
    "shortTitle": "Average Down",
    "description": "Averaging down lowers the weighted purchase price when additional units are bought below the existing average. It also increases exposure and the money…",
    "longDescription": "Averaging down lowers the weighted purchase price when additional units are bought below the existing average. It also increases exposure and the money at risk; a lower average is not evidence that the investment is better. At a market price of $40, those 300 shares are worth $12,000, leaving a $3,000 unrealized loss before fees. Adding shares did not erase the existing dollar loss. The tool has two purchase inputs and no automatic tax-lot, split or fee processing. Check available capital and concentration before increasing a position.",
    "keywords": [
      "average down calculator",
      "average down stock calculator",
      "cost average calculator",
      "dca calculator crypto",
      "dollar cost average calculator",
      "how to calculate average entry price",
      "average down shares calculator",
      "averaging down calculator",
      "bitcoin dca calculator",
      "stock averaging calculator",
      "how many shares to buy to average down",
      "blended average cost calculator"
    ],
    "assets": [
      "stocks",
      "crypto"
    ],
    "searchVolume": "8,400/mo",
    "category": "position",
    "formula": "Average purchase price = total purchase cost / total units",
    "whyUse": "Averaging down lowers the weighted purchase price when additional units are bought below the existing average. It also increases exposure and the money at risk; a lower average is not evidence that the investment is better. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "Buying 100 shares at $60, 100 at $50 and 100 at $40 costs $6,000 + $5,000 + $4,000 = $15,000 for 300 shares: average $50. The two-purchase calculator can combine the first two trades as 200 shares at $55, then add 100 at $40.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Average purchase price = total purchase cost / total units"
      },
      {
        "label": "Interpretation and limits",
        "text": "At a market price of $40, those 300 shares are worth $12,000, leaving a $3,000 unrealized loss before fees. Adding shares did not erase the existing dollar loss. The tool has two purchase inputs and no automatic tax-lot, split or fee processing. Check available capital and concentration before increasing a position."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Buying 100 shares at $60, 100 at $50 and 100 at $40 costs $6,000 + $5,000 + $4,000 = $15,000 for 300 shares: average $50. The two-purchase calculator can combine the first two trades as 200 shares at $55, then add 100 at $40."
      },
      {
        "name": "Interpret the result",
        "text": "At a market price of $40, those 300 shares are worth $12,000, leaving a $3,000 unrealized loss before fees. Adding shares did not erase the existing dollar loss. The tool has two purchase inputs and no automatic tax-lot, split or fee processing. Check available capital and concentration before increasing a position."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Average purchase price = total purchase cost / total units"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Buying 100 shares at $60, 100 at $50 and 100 at $40 costs $6,000 + $5,000 + $4,000 = $15,000 for 300 shares: average $50. The two-purchase calculator can combine the first two trades as 200 shares at $55, then add 100 at $40."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "At a market price of $40, those 300 shares are worth $12,000, leaving a $3,000 unrealized loss before fees. Adding shares did not erase the existing dollar loss. The tool has two purchase inputs and no automatic tax-lot, split or fee processing. Check available capital and concentration before increasing a position."
      }
    ]
  },
  {
    "slug": "break-even-calculator",
    "title": "Break-Even Calculator — Win Rate, Break-Even Price & Pips",
    "shortTitle": "Break-Even",
    "description": "Two break-even tools in one: find the win rate you need to break even at any R:R ratio, and calculate the exact break-even price after spread, commission and swap.",
    "longDescription": "Traders need two different break-even numbers. The first is the break-even win rate: the minimum percentage of winning trades required to avoid losing money at a given risk-to-reward ratio. At 1:1 R:R you need to win 50% of trades. At 2:1 R:R you need only 33.3%. At 3:1 you need 25%. The formula is: break-even win rate = 1 / (1 + R:R ratio). The second is the break-even price: the exact exit price that covers entry cost, spread, commission and swap so the trade closes at zero net profit or loss. Both numbers are essential for any systematic trading approach — the win rate tells you whether your strategy is theoretically viable, and the break-even price tells you exactly where to move your stop to protect your entry.",
    "keywords": [
      "break even calculator trading",
      "break even win rate calculator",
      "what win rate do I need to break even",
      "break even price calculator",
      "trading break even calculator",
      "break even win rate formula",
      "forex break even calculator",
      "how to calculate break even win rate",
      "minimum win rate to be profitable",
      "break even pips calculator",
      "break even point forex trading",
      "commission break even calculator",
      "spread and commission break even",
      "trade break even formula",
      "what price do I need to break even"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "4,200/mo",
    "category": "profit",
    "formula": "Long break-even price = reference entry + [spread pips + total commission / (pip value × lots)] × pip size",
    "whyUse": "A break-even exit aims to cover entry price and trading costs. A stop placed at that level is an instruction, not a guarantee that the trade will finish without a loss. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At a reference entry of 1.1000, 1 lot, $10 per pip, a 2-pip spread and $7 total commission, costs are $27. The long break-even reference exit is 1.10027. A stop at 1.0997 is three pips below 1.1000, so it is not a cost-covering long exit.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Long break-even price = reference entry + [spread pips + total commission / (pip value × lots)] × pip size"
      },
      {
        "label": "Interpretation and limits",
        "text": "TradeCalc’s break-even price is a long-position estimate. If entry and exit are actual executable bid/ask fills, set additional spread to zero. Supply 0.01 for a JPY pip. Slippage, gaps, swap and changing conversion rates can prevent the planned outcome. Options break-even at expiry is a separate calculation; it does not describe a pre-expiry option valuation."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At a reference entry of 1.1000, 1 lot, $10 per pip, a 2-pip spread and $7 total commission, costs are $27. The long break-even reference exit is 1.10027. A stop at 1.0997 is three pips below 1.1000, so it is not a cost-covering long exit."
      },
      {
        "name": "Interpret the result",
        "text": "TradeCalc’s break-even price is a long-position estimate. If entry and exit are actual executable bid/ask fills, set additional spread to zero. Supply 0.01 for a JPY pip. Slippage, gaps, swap and changing conversion rates can prevent the planned outcome. Options break-even at expiry is a separate calculation; it does not describe a pre-expiry option valuation."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Long break-even price = reference entry + [spread pips + total commission / (pip value × lots)] × pip size"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At a reference entry of 1.1000, 1 lot, $10 per pip, a 2-pip spread and $7 total commission, costs are $27. The long break-even reference exit is 1.10027. A stop at 1.0997 is three pips below 1.1000, so it is not a cost-covering long exit."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "TradeCalc’s break-even price is a long-position estimate. If entry and exit are actual executable bid/ask fills, set additional spread to zero. Supply 0.01 for a JPY pip. Slippage, gaps, swap and changing conversion rates can prevent the planned outcome. Options break-even at expiry is a separate calculation; it does not describe a pre-expiry option valuation."
      }
    ]
  },
  {
    "slug": "currency-converter",
    "title": "Currency Converter — Sample Exchange Rates",
    "shortTitle": "Currency Converter",
    "description": "Currency conversion puts values expressed in different currencies on the same basis. The direction of the exchange-rate quote matters as much as its…",
    "longDescription": "Currency conversion puts values expressed in different currencies on the same basis. The direction of the exchange-rate quote matters as much as its numerical value. The converter contains illustrative presets and a manual rate input; it does not fetch live quotes. Enter the rate offered by your provider and account for conversion charges separately. Bid and ask differ, so a real round trip can lose money even if the mid-market rate is unchanged. Tax reporting rules depend on jurisdiction and reporting date.",
    "keywords": [
      "currency converter",
      "forex currency converter",
      "sample exchange rate calculator",
      "usd to eur calculator",
      "currency exchange calculator",
      "online currency converter",
      "best currency converter",
      "educational exchange rate converter",
      "mid market rate calculator",
      "foreign exchange calculator",
      "convert dollars to euros",
      "currency rate calculator free"
    ],
    "assets": [
      "forex"
    ],
    "searchVolume": "1,500,000/mo",
    "category": "utility",
    "formula": "Converted amount = amount × destination units per source unit",
    "whyUse": "Currency conversion puts values expressed in different currencies on the same basis. The direction of the exchange-rate quote matters as much as its numerical value. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At a hypothetical 0.80 GBP per USD, $100 converts to £80. Converting £80 back requires 1 / 0.80 = 1.25 USD per GBP, giving $100 before fees. A 0.0015 move in a standard four-decimal forex pair is 15 pips, not 1.5.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Converted amount = amount × destination units per source unit"
      },
      {
        "label": "Interpretation and limits",
        "text": "The converter contains illustrative presets and a manual rate input; it does not fetch live quotes. Enter the rate offered by your provider and account for conversion charges separately. Bid and ask differ, so a real round trip can lose money even if the mid-market rate is unchanged. Tax reporting rules depend on jurisdiction and reporting date."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At a hypothetical 0.80 GBP per USD, $100 converts to £80. Converting £80 back requires 1 / 0.80 = 1.25 USD per GBP, giving $100 before fees. A 0.0015 move in a standard four-decimal forex pair is 15 pips, not 1.5."
      },
      {
        "name": "Interpret the result",
        "text": "The converter contains illustrative presets and a manual rate input; it does not fetch live quotes. Enter the rate offered by your provider and account for conversion charges separately. Bid and ask differ, so a real round trip can lose money even if the mid-market rate is unchanged. Tax reporting rules depend on jurisdiction and reporting date."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Converted amount = amount × destination units per source unit"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At a hypothetical 0.80 GBP per USD, $100 converts to £80. Converting £80 back requires 1 / 0.80 = 1.25 USD per GBP, giving $100 before fees. A 0.0015 move in a standard four-decimal forex pair is 15 pips, not 1.5."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The converter contains illustrative presets and a manual rate input; it does not fetch live quotes. Enter the rate offered by your provider and account for conversion charges separately. Bid and ask differ, so a real round trip can lose money even if the mid-market rate is unchanged. Tax reporting rules depend on jurisdiction and reporting date."
      }
    ]
  },
  {
    "slug": "pip-to-dollar-calculator",
    "title": "Pip to Dollar Calculator — 1 Pip to USD Converter",
    "shortTitle": "Pip to Dollar",
    "description": "A pip-to-dollar conversion answers a narrow question: what is a specified pip movement worth for this quantity? It does not decide how many lots should…",
    "longDescription": "A pip-to-dollar conversion answers a narrow question: what is a specified pip movement worth for this quantity? It does not decide how many lots should be traded. The tool converts a supplied movement; it does not infer whether a long or short position made money, and it does not subtract fees. Use the published pip-value guide for currency conversion details and the position-size guide for a risk budget. The default $10 pip value is not universal.",
    "keywords": [
      "pip to dollar calculator",
      "pips to dollars calculator",
      "1 pip is equal to how many dollars",
      "pips to usd",
      "pip to usd calculator",
      "pips to dollars",
      "pip converter",
      "how much is 1 pip in dollars",
      "100 pips in dollars",
      "how many pips in one dollar",
      "pip dollar conversion calculator",
      "how much is 50 pips in dollars",
      "forex pip dollar value",
      "convert pips to dollars",
      "pips into dollars",
      "pip to money calculator forex"
    ],
    "assets": [
      "forex"
    ],
    "searchVolume": "5,200/mo",
    "category": "utility",
    "formula": "USD movement value = signed pips × USD pip value per standard lot × lots",
    "whyUse": "A pip-to-dollar conversion answers a narrow question: what is a specified pip movement worth for this quantity? It does not decide how many lots should be traded. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "A 50-pip movement at 0.20 EUR/USD lots is 50 × $10 × 0.20 = $100. At a hypothetical 150 JPY per USD, one standard JPY-pair lot is worth about $6.6667 per pip, so the same 50 pips and 0.20 lots are about $66.67.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "USD movement value = signed pips × USD pip value per standard lot × lots"
      },
      {
        "label": "Interpretation and limits",
        "text": "The tool converts a supplied movement; it does not infer whether a long or short position made money, and it does not subtract fees. Use the published pip-value guide for currency conversion details and the position-size guide for a risk budget. The default $10 pip value is not universal."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A 50-pip movement at 0.20 EUR/USD lots is 50 × $10 × 0.20 = $100. At a hypothetical 150 JPY per USD, one standard JPY-pair lot is worth about $6.6667 per pip, so the same 50 pips and 0.20 lots are about $66.67."
      },
      {
        "name": "Interpret the result",
        "text": "The tool converts a supplied movement; it does not infer whether a long or short position made money, and it does not subtract fees. Use the published pip-value guide for currency conversion details and the position-size guide for a risk budget. The default $10 pip value is not universal."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "USD movement value = signed pips × USD pip value per standard lot × lots"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A 50-pip movement at 0.20 EUR/USD lots is 50 × $10 × 0.20 = $100. At a hypothetical 150 JPY per USD, one standard JPY-pair lot is worth about $6.6667 per pip, so the same 50 pips and 0.20 lots are about $66.67."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The tool converts a supplied movement; it does not infer whether a long or short position made money, and it does not subtract fees. Use the published pip-value guide for currency conversion details and the position-size guide for a risk budget. The default $10 pip value is not universal."
      }
    ]
  },
  {
    "slug": "swap-calculator",
    "title": "Forex Swap Calculator — Overnight Rollover Cost",
    "shortTitle": "Swap / Rollover",
    "description": "Forex swap is an overnight financing debit or credit under a broker’s settlement rules. Quotes may be expressed in money, points or annual percentages;…",
    "longDescription": "Forex swap is an overnight financing debit or credit under a broker’s settlement rules. Quotes may be expressed in money, points or annual percentages; these conventions cannot be mixed without conversion. TradeCalc provides editable example rates, not live swap quotes. Confirm long versus short rates, rollover time, holiday adjustments and account currency directly. A JPY swap quoted in points must use the correct point size and JPY-to-USD conversion; do not assume a 0.0001 forex pip for a JPY quote.",
    "keywords": [
      "forex swap calculator",
      "rollover calculator forex",
      "overnight fee calculator forex",
      "swap rate calculator",
      "carry trade calculator",
      "forex rollover fee calculator",
      "overnight swap cost calculator",
      "how to calculate swap in forex",
      "swap cost per lot calculator",
      "positive swap pairs calculator",
      "weekly swap calculator forex",
      "swap charge calculator trading"
    ],
    "assets": [
      "forex"
    ],
    "searchVolume": "8,200/mo",
    "category": "utility",
    "formula": "Swap = USD per lot per charged day × lots × charged days",
    "whyUse": "Forex swap is an overnight financing debit or credit under a broker’s settlement rules. Quotes may be expressed in money, points or annual percentages; these conventions cannot be mixed without conversion. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At a hypothetical −$6.50 per standard lot per charged day, a 0.40-lot position held for five charged days incurs −6.50 × 0.40 × 5 = −$13. The five charged days could differ from the number of calendar nights because of weekends or holidays.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Swap = USD per lot per charged day × lots × charged days"
      },
      {
        "label": "Interpretation and limits",
        "text": "TradeCalc provides editable example rates, not live swap quotes. Confirm long versus short rates, rollover time, holiday adjustments and account currency directly. A JPY swap quoted in points must use the correct point size and JPY-to-USD conversion; do not assume a 0.0001 forex pip for a JPY quote."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At a hypothetical −$6.50 per standard lot per charged day, a 0.40-lot position held for five charged days incurs −6.50 × 0.40 × 5 = −$13. The five charged days could differ from the number of calendar nights because of weekends or holidays."
      },
      {
        "name": "Interpret the result",
        "text": "TradeCalc provides editable example rates, not live swap quotes. Confirm long versus short rates, rollover time, holiday adjustments and account currency directly. A JPY swap quoted in points must use the correct point size and JPY-to-USD conversion; do not assume a 0.0001 forex pip for a JPY quote."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Swap = USD per lot per charged day × lots × charged days"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At a hypothetical −$6.50 per standard lot per charged day, a 0.40-lot position held for five charged days incurs −6.50 × 0.40 × 5 = −$13. The five charged days could differ from the number of calendar nights because of weekends or holidays."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "TradeCalc provides editable example rates, not live swap quotes. Confirm long versus short rates, rollover time, holiday adjustments and account currency directly. A JPY swap quoted in points must use the correct point size and JPY-to-USD conversion; do not assume a 0.0001 forex pip for a JPY quote."
      }
    ]
  },
  {
    "slug": "pivot-point-calculator",
    "title": "Pivot Point Calculator — Daily Support & Resistance Levels",
    "shortTitle": "Pivot Point",
    "description": "Pivot points derive reference prices from a prior period’s high, low and close. The chosen session and calculation variant matter; the levels are not a…",
    "longDescription": "Pivot points derive reference prices from a prior period’s high, low and close. The chosen session and calculation variant matter; the levels are not a forecast of the next period. TradeCalc offers classic, Fibonacci, Camarilla and a prior-close-weighted Woodie variant. Some platforms use a current-session-open Woodie convention, so outputs may differ. Align the timezone and daylight-saving treatment before comparing platforms. No 60–70% reaction rate is claimed without a documented test.",
    "keywords": [
      "pivot point calculator",
      "forex pivot point calculator",
      "daily pivot points calculator",
      "support resistance calculator",
      "camarilla pivot calculator",
      "how to calculate pivot points",
      "pivot point levels calculator",
      "classic pivot point calculator",
      "fibonacci pivot calculator",
      "woodie pivot point calculator",
      "daily support resistance levels calculator",
      "pivot point trading tool"
    ],
    "assets": [
      "forex",
      "stocks",
      "futures"
    ],
    "searchVolume": "12,000/mo",
    "category": "utility",
    "formula": "Classic pivot P = (high + low + close) / 3; R1 = 2P − low; S1 = 2P − high",
    "whyUse": "Pivot points derive reference prices from a prior period’s high, low and close. The chosen session and calculation variant matter; the levels are not a forecast of the next period. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "If H = 110, L = 100 and C = 105, the classic pivot is 105. R1 is 110, S1 is 100, R2 is 115 and S2 is 95. High must exceed low, and close should be within the period’s range.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Classic pivot P = (high + low + close) / 3; R1 = 2P − low; S1 = 2P − high"
      },
      {
        "label": "Interpretation and limits",
        "text": "TradeCalc offers classic, Fibonacci, Camarilla and a prior-close-weighted Woodie variant. Some platforms use a current-session-open Woodie convention, so outputs may differ. Align the timezone and daylight-saving treatment before comparing platforms. No 60–70% reaction rate is claimed without a documented test."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "If H = 110, L = 100 and C = 105, the classic pivot is 105. R1 is 110, S1 is 100, R2 is 115 and S2 is 95. High must exceed low, and close should be within the period’s range."
      },
      {
        "name": "Interpret the result",
        "text": "TradeCalc offers classic, Fibonacci, Camarilla and a prior-close-weighted Woodie variant. Some platforms use a current-session-open Woodie convention, so outputs may differ. Align the timezone and daylight-saving treatment before comparing platforms. No 60–70% reaction rate is claimed without a documented test."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Classic pivot P = (high + low + close) / 3; R1 = 2P − low; S1 = 2P − high"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "If H = 110, L = 100 and C = 105, the classic pivot is 105. R1 is 110, S1 is 100, R2 is 115 and S2 is 95. High must exceed low, and close should be within the period’s range."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "TradeCalc offers classic, Fibonacci, Camarilla and a prior-close-weighted Woodie variant. Some platforms use a current-session-open Woodie convention, so outputs may differ. Align the timezone and daylight-saving treatment before comparing platforms. No 60–70% reaction rate is claimed without a documented test."
      }
    ]
  },
  {
    "slug": "fibonacci-calculator",
    "title": "Fibonacci Retracement Calculator — Key Trading Levels",
    "shortTitle": "Fibonacci",
    "description": "Fibonacci retracement levels divide a chosen price swing by conventional ratios. They provide chart reference prices; the calculation itself supplies…",
    "longDescription": "Fibonacci retracement levels divide a chosen price swing by conventional ratios. They provide chart reference prices; the calculation itself supplies no evidence that the market will reverse there. Different anchor choices produce different levels, so record the timeframe and swing-selection rule before testing. Multiple indicators agreeing at a level does not prove a high probability. TradeCalc uses two anchors; do not confuse its extensions with a three-point projection convention.",
    "keywords": [
      "fibonacci calculator",
      "fibonacci retracement calculator",
      "fib levels calculator",
      "fibonacci trading levels",
      "fibonacci extension calculator",
      "how to calculate fibonacci retracement",
      "fibonacci 61.8 level calculator",
      "fib retracement tool",
      "fibonacci levels forex",
      "golden ratio trading calculator",
      "fibonacci pullback calculator",
      "fibonacci swing high low calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "15,000/mo",
    "category": "utility",
    "formula": "Upswing retracement = high − (high − low) × ratio; downswing retracement = low + (high − low) × ratio",
    "whyUse": "Fibonacci retracement levels divide a chosen price swing by conventional ratios. They provide chart reference prices; the calculation itself supplies no evidence that the market will reverse there. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "For an upswing from 100 to 120, the 38.2% retracement is 120 − 20 × 0.382 = 112.36. The 61.8% level is 107.64. The 161.8% extension is 100 + 20 × 1.618 = 132.36. The 50% midpoint is commonly plotted but is not itself a Fibonacci ratio.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Upswing retracement = high − (high − low) × ratio; downswing retracement = low + (high − low) × ratio"
      },
      {
        "label": "Interpretation and limits",
        "text": "Different anchor choices produce different levels, so record the timeframe and swing-selection rule before testing. Multiple indicators agreeing at a level does not prove a high probability. TradeCalc uses two anchors; do not confuse its extensions with a three-point projection convention."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "For an upswing from 100 to 120, the 38.2% retracement is 120 − 20 × 0.382 = 112.36. The 61.8% level is 107.64. The 161.8% extension is 100 + 20 × 1.618 = 132.36. The 50% midpoint is commonly plotted but is not itself a Fibonacci ratio."
      },
      {
        "name": "Interpret the result",
        "text": "Different anchor choices produce different levels, so record the timeframe and swing-selection rule before testing. Multiple indicators agreeing at a level does not prove a high probability. TradeCalc uses two anchors; do not confuse its extensions with a three-point projection convention."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Upswing retracement = high − (high − low) × ratio; downswing retracement = low + (high − low) × ratio"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "For an upswing from 100 to 120, the 38.2% retracement is 120 − 20 × 0.382 = 112.36. The 61.8% level is 107.64. The 161.8% extension is 100 + 20 × 1.618 = 132.36. The 50% midpoint is commonly plotted but is not itself a Fibonacci ratio."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Different anchor choices produce different levels, so record the timeframe and swing-selection rule before testing. Multiple indicators agreeing at a level does not prove a high probability. TradeCalc uses two anchors; do not confuse its extensions with a three-point projection convention."
      }
    ]
  },
  {
    "slug": "leverage-calculator",
    "title": "Leverage Calculator — Effective Leverage & Exposure",
    "shortTitle": "Leverage",
    "description": "Leverage compares exposure with the capital supporting it. Broker maximum leverage and your effective account leverage are different: choosing a…",
    "longDescription": "Leverage compares exposure with the capital supporting it. Broker maximum leverage and your effective account leverage are different: choosing a smaller position can keep effective exposure below the available maximum. Low leverage alone does not guarantee safety, and stop-based sizing can still create large notional exposure when stops are tight. Financing charges, gaps and other positions matter. Regulations and broker leverage limits vary by location, client status and instrument; confirm the applicable agreement.",
    "keywords": [
      "leverage calculator forex",
      "effective leverage calculator",
      "trading leverage calculator",
      "forex exposure calculator",
      "leverage ratio calculator",
      "how to calculate leverage in forex",
      "effective leverage trading",
      "notional value calculator forex",
      "leverage and margin calculator",
      "true leverage calculator",
      "1:100 leverage calculator",
      "forex risk exposure calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto"
    ],
    "searchVolume": "9,500/mo",
    "category": "risk",
    "formula": "Effective leverage = USD notional / USD equity",
    "whyUse": "Leverage compares exposure with the capital supporting it. Broker maximum leverage and your effective account leverage are different: choosing a smaller position can keep effective exposure below the available maximum. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At EUR/USD 1.1000, one standard lot has $110,000 notional. Against $10,000 equity that is 11:1 effective leverage. Reducing the position to 0.20 lots lowers notional to $22,000 and effective leverage to 2.2:1. A 50-pip stop at 0.20 lots represents $100 before costs.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Effective leverage = USD notional / USD equity"
      },
      {
        "label": "Interpretation and limits",
        "text": "Low leverage alone does not guarantee safety, and stop-based sizing can still create large notional exposure when stops are tight. Financing charges, gaps and other positions matter. Regulations and broker leverage limits vary by location, client status and instrument; confirm the applicable agreement."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At EUR/USD 1.1000, one standard lot has $110,000 notional. Against $10,000 equity that is 11:1 effective leverage. Reducing the position to 0.20 lots lowers notional to $22,000 and effective leverage to 2.2:1. A 50-pip stop at 0.20 lots represents $100 before costs."
      },
      {
        "name": "Interpret the result",
        "text": "Low leverage alone does not guarantee safety, and stop-based sizing can still create large notional exposure when stops are tight. Financing charges, gaps and other positions matter. Regulations and broker leverage limits vary by location, client status and instrument; confirm the applicable agreement."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Effective leverage = USD notional / USD equity"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At EUR/USD 1.1000, one standard lot has $110,000 notional. Against $10,000 equity that is 11:1 effective leverage. Reducing the position to 0.20 lots lowers notional to $22,000 and effective leverage to 2.2:1. A 50-pip stop at 0.20 lots represents $100 before costs."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Low leverage alone does not guarantee safety, and stop-based sizing can still create large notional exposure when stops are tight. Financing charges, gaps and other positions matter. Regulations and broker leverage limits vary by location, client status and instrument; confirm the applicable agreement."
      }
    ]
  },
  {
    "slug": "risk-of-ruin-calculator",
    "title": "Risk of Ruin Calculator — Probability of Blowing Your Account",
    "shortTitle": "Risk of Ruin",
    "description": "Risk of ruin is meaningful only after defining the loss threshold, trade horizon and outcome model. A percentage based on risk size alone is not a…",
    "longDescription": "Risk of ruin is meaningful only after defining the loss threshold, trade horizon and outcome model. A percentage based on risk size alone is not a reliable probability of losing an account. The tool excludes costs and assumes independent, unchanged outcomes. Real returns can cluster and gap, so a small model value is not evidence of safety. A fixed-fraction strategy has a different process from this fixed-dollar model. Changing the horizon changes the question; always report it alongside the result.",
    "keywords": [
      "risk of ruin calculator",
      "trading risk of ruin",
      "prop firm risk calculator",
      "probability of ruin trading",
      "forex risk of ruin",
      "trading account ruin probability",
      "risk of ruin formula trading",
      "probability of blowing trading account",
      "trading drawdown ruin calculator",
      "risk ruin percentage calculator",
      "how to calculate risk of ruin trading",
      "account survival probability calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "4,800/mo",
    "category": "risk",
    "formula": "Finite-horizon threshold-hit probability = sum of absorbed independent win/loss path probabilities",
    "whyUse": "Risk of ruin is meaningful only after defining the loss threshold, trade horizon and outcome model. A percentage based on risk size alone is not a reliable probability of losing an account. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "With a 50% win chance, 1R win and 1R loss, and a loss threshold of 1R, the chance of touching the floor within two trades is 50%: an immediate loss hits it, while a win followed by a loss returns to zero. If the threshold is 2R, only two losses hit it within two trades, with probability 25%.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Finite-horizon threshold-hit probability = sum of absorbed independent win/loss path probabilities"
      },
      {
        "label": "Interpretation and limits",
        "text": "The tool excludes costs and assumes independent, unchanged outcomes. Real returns can cluster and gap, so a small model value is not evidence of safety. A fixed-fraction strategy has a different process from this fixed-dollar model. Changing the horizon changes the question; always report it alongside the result."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "With a 50% win chance, 1R win and 1R loss, and a loss threshold of 1R, the chance of touching the floor within two trades is 50%: an immediate loss hits it, while a win followed by a loss returns to zero. If the threshold is 2R, only two losses hit it within two trades, with probability 25%."
      },
      {
        "name": "Interpret the result",
        "text": "The tool excludes costs and assumes independent, unchanged outcomes. Real returns can cluster and gap, so a small model value is not evidence of safety. A fixed-fraction strategy has a different process from this fixed-dollar model. Changing the horizon changes the question; always report it alongside the result."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Finite-horizon threshold-hit probability = sum of absorbed independent win/loss path probabilities"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "With a 50% win chance, 1R win and 1R loss, and a loss threshold of 1R, the chance of touching the floor within two trades is 50%: an immediate loss hits it, while a win followed by a loss returns to zero. If the threshold is 2R, only two losses hit it within two trades, with probability 25%."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The tool excludes costs and assumes independent, unchanged outcomes. Real returns can cluster and gap, so a small model value is not evidence of safety. A fixed-fraction strategy has a different process from this fixed-dollar model. Changing the horizon changes the question; always report it alongside the result."
      }
    ]
  },
  {
    "slug": "kelly-criterion-calculator",
    "title": "Kelly Criterion Calculator — Optimal Position Sizing",
    "shortTitle": "Kelly Criterion",
    "description": "The Kelly criterion gives a growth-optimal risk fraction for an idealized repeated binary bet with known probabilities and payoffs. Trading estimates…",
    "longDescription": "The Kelly criterion gives a growth-optimal risk fraction for an idealized repeated binary bet with known probabilities and payoffs. Trading estimates are uncertain, so the calculated fraction is not a recommendation or proof of an edge. The probability of a losing run anywhere in a longer sequence differs from the probability of one specified block. Costs, variable losses, correlated trades and estimation error violate the simple model. Large Kelly fractions can create severe drawdowns; fractional Kelly reduces exposure but cannot remove model error or gap risk.",
    "keywords": [
      "kelly criterion calculator",
      "kelly criterion forex",
      "optimal position sizing calculator",
      "kelly formula trading",
      "kelly bet calculator",
      "how to use kelly criterion trading",
      "fractional kelly calculator",
      "kelly criterion optimal position size",
      "kelly percentage calculator",
      "trading position size kelly",
      "kelly criterion stocks",
      "kelly formula win rate calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "5,600/mo",
    "category": "position",
    "formula": "Full Kelly fraction = p − (1 − p) / b, where b is net win per unit lost",
    "whyUse": "The Kelly criterion gives a growth-optimal risk fraction for an idealized repeated binary bet with known probabilities and payoffs. Trading estimates are uncertain, so the calculated fraction is not a recommendation or proof of an edge. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At p = 45% and b = 2, f = 0.45 − 0.55 / 2 = 0.175, or 17.5%. Separately, at a 60% win probability, one specified seven-loss block has probability 0.4^7 = 0.16384%. Losing 40% of remaining wealth seven times leaves 0.6^7 = 2.79936% of initial wealth; these are different calculations.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Full Kelly fraction = p − (1 − p) / b, where b is net win per unit lost"
      },
      {
        "label": "Interpretation and limits",
        "text": "The probability of a losing run anywhere in a longer sequence differs from the probability of one specified block. Costs, variable losses, correlated trades and estimation error violate the simple model. Large Kelly fractions can create severe drawdowns; fractional Kelly reduces exposure but cannot remove model error or gap risk."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At p = 45% and b = 2, f = 0.45 − 0.55 / 2 = 0.175, or 17.5%. Separately, at a 60% win probability, one specified seven-loss block has probability 0.4^7 = 0.16384%. Losing 40% of remaining wealth seven times leaves 0.6^7 = 2.79936% of initial wealth; these are different calculations."
      },
      {
        "name": "Interpret the result",
        "text": "The probability of a losing run anywhere in a longer sequence differs from the probability of one specified block. Costs, variable losses, correlated trades and estimation error violate the simple model. Large Kelly fractions can create severe drawdowns; fractional Kelly reduces exposure but cannot remove model error or gap risk."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Full Kelly fraction = p − (1 − p) / b, where b is net win per unit lost"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At p = 45% and b = 2, f = 0.45 − 0.55 / 2 = 0.175, or 17.5%. Separately, at a 60% win probability, one specified seven-loss block has probability 0.4^7 = 0.16384%. Losing 40% of remaining wealth seven times leaves 0.6^7 = 2.79936% of initial wealth; these are different calculations."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The probability of a losing run anywhere in a longer sequence differs from the probability of one specified block. Costs, variable losses, correlated trades and estimation error violate the simple model. Large Kelly fractions can create severe drawdowns; fractional Kelly reduces exposure but cannot remove model error or gap risk."
      }
    ]
  },
  {
    "slug": "win-rate-calculator",
    "title": "Win Rate Calculator — Minimum Win Rate to Be Profitable",
    "shortTitle": "Win Rate",
    "description": "Win rate is the fraction of trades classified as wins. It needs the average size of wins, losses and costs to say anything about profitability.",
    "longDescription": "Win rate is the fraction of trades classified as wins. It needs the average size of wins, losses and costs to say anything about profitability. A fixed number of historical trades does not prove an edge; uncertainty depends on sample size, dependence and selection bias. Use realized average outcomes, account for costs and test on data not used to design the strategy. A high win rate can coexist with large occasional losses.",
    "keywords": [
      "win rate calculator trading",
      "minimum win rate calculator",
      "trading win rate break even",
      "expected value trading calculator",
      "win loss ratio calculator",
      "how to calculate win rate trading",
      "trading win rate formula",
      "win rate percentage calculator",
      "break even win rate forex",
      "trading edge calculator",
      "win rate needed to be profitable",
      "risk reward win rate calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "4,200/mo",
    "category": "risk",
    "formula": "Break-even win % = 100 / (1 + reward multiple); expectancy = p × reward multiple − (1 − p)",
    "whyUse": "Win rate is the fraction of trades classified as wins. It needs the average size of wins, losses and costs to say anything about profitability. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At 3:1 payoff, exactly 25% wins gives 0.25 × 3 − 0.75 = 0R before costs. At 4:1, exactly 20% also breaks even. A 45% win rate with 2:1 payoff gives 0.45 × 2 − 0.55 = +0.35R before costs.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Break-even win % = 100 / (1 + reward multiple); expectancy = p × reward multiple − (1 − p)"
      },
      {
        "label": "Interpretation and limits",
        "text": "A fixed number of historical trades does not prove an edge; uncertainty depends on sample size, dependence and selection bias. Use realized average outcomes, account for costs and test on data not used to design the strategy. A high win rate can coexist with large occasional losses."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At 3:1 payoff, exactly 25% wins gives 0.25 × 3 − 0.75 = 0R before costs. At 4:1, exactly 20% also breaks even. A 45% win rate with 2:1 payoff gives 0.45 × 2 − 0.55 = +0.35R before costs."
      },
      {
        "name": "Interpret the result",
        "text": "A fixed number of historical trades does not prove an edge; uncertainty depends on sample size, dependence and selection bias. Use realized average outcomes, account for costs and test on data not used to design the strategy. A high win rate can coexist with large occasional losses."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Break-even win % = 100 / (1 + reward multiple); expectancy = p × reward multiple − (1 − p)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At 3:1 payoff, exactly 25% wins gives 0.25 × 3 − 0.75 = 0R before costs. At 4:1, exactly 20% also breaks even. A 45% win rate with 2:1 payoff gives 0.45 × 2 − 0.55 = +0.35R before costs."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "A fixed number of historical trades does not prove an edge; uncertainty depends on sample size, dependence and selection bias. Use realized average outcomes, account for costs and test on data not used to design the strategy. A high win rate can coexist with large occasional losses."
      }
    ]
  },
  {
    "slug": "gain-loss-calculator",
    "title": "Gain & Loss Calculator — % Return & Gain Needed to Recover a Loss",
    "shortTitle": "Gain & Loss %",
    "description": "Calculate your trading account gain or loss percentage. Also shows the exact gain needed to recover any loss — a 20% loss requires a 25% gain to get back to flat.",
    "longDescription": "This calculator measures two things: the percentage gain or loss on your trading account between two balance points, and the exact percentage gain required to recover from any loss. The recovery side is the number most traders get wrong — because recovery is calculated on a smaller balance, the percentage needed is always larger than the loss. A 10% loss needs 11.1% to recover. A 20% loss needs 25%. A 50% loss needs 100%. Enter your starting balance and current balance to see both numbers instantly. The calculation assumes no external deposits or withdrawals; adjust your starting balance if cash flows occurred during the period.",
    "keywords": [
      "gain loss percentage calculator trading",
      "gain needed to recover loss calculator",
      "trading account percentage calculator",
      "account gain calculator forex",
      "trading profit percentage calculator",
      "account growth percentage calculator",
      "how to calculate percentage gain trading",
      "trading account loss percentage",
      "percentage gain needed after loss",
      "forex account gain loss calculator",
      "percentage change calculator trading",
      "trading return percentage calculator",
      "how much gain to recover loss trading",
      "account balance gain calculator",
      "percentage profit calculator forex"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "6,800/mo",
    "category": "profit",
    "formula": "Gain/loss % = (end − start) / start × 100; no external cash flows",
    "whyUse": "Gain/loss percentage measures change relative to starting capital. Meaningful performance tracking also needs cash flows, drawdown, exposure and consistent treatment of fees. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "An account moving from $10,000 to $12,500 without deposits has a 25% gain. If $2,000 was deposited during the period, the raw 25% is not purely trading performance. A fall from $10,000 to $8,000 is −20%, requiring a 25% gain on $8,000 to recover.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Gain/loss % = (end − start) / start × 100; no external cash flows"
      },
      {
        "label": "Interpretation and limits",
        "text": "Account return differs from profit per unit of trade risk. One bad month may reflect noise or a changed strategy; it should be investigated rather than dismissed automatically. No annual or monthly target range is assumed. Keep a dated record of equity, flows, costs and positions so comparisons use the same basis."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "An account moving from $10,000 to $12,500 without deposits has a 25% gain. If $2,000 was deposited during the period, the raw 25% is not purely trading performance. A fall from $10,000 to $8,000 is −20%, requiring a 25% gain on $8,000 to recover."
      },
      {
        "name": "Interpret the result",
        "text": "Account return differs from profit per unit of trade risk. One bad month may reflect noise or a changed strategy; it should be investigated rather than dismissed automatically. No annual or monthly target range is assumed. Keep a dated record of equity, flows, costs and positions so comparisons use the same basis."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Gain/loss % = (end − start) / start × 100; no external cash flows"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "An account moving from $10,000 to $12,500 without deposits has a 25% gain. If $2,000 was deposited during the period, the raw 25% is not purely trading performance. A fall from $10,000 to $8,000 is −20%, requiring a 25% gain on $8,000 to recover."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Account return differs from profit per unit of trade risk. One bad month may reflect noise or a changed strategy; it should be investigated rather than dismissed automatically. No annual or monthly target range is assumed. Keep a dated record of equity, flows, costs and positions so comparisons use the same basis."
      }
    ]
  },
  {
    "slug": "consistency-calculator",
    "title": "Consistency Calculator — Prop Firm Trading Rules",
    "shortTitle": "Consistency",
    "description": "A consistency rule limits how much one day or trade can contribute to a qualifying profit measure. The exact numerator, denominator and consequence…",
    "longDescription": "A consistency rule limits how much one day or trade can contribute to a qualifying profit measure. The exact numerator, denominator and consequence depend on the account agreement. Some products use net total profit while others use positive-day totals, and rules may change by start date. Exceeding a ratio is not universally an account breach or reduced-payout penalty. Check official conditions and all other payout requirements. One large winning day does not by itself prove poor discipline or oversized risk.",
    "keywords": [
      "prop firm consistency calculator",
      "FTMO consistency rule calculator",
      "prop trading consistency score",
      "funded account consistency checker",
      "consistency rule prop firm",
      "how to check FTMO consistency",
      "best day rule prop firm calculator",
      "prop firm best day violation calculator",
      "FTMO payout consistency calculator",
      "trading consistency percentage calculator",
      "funded account payout rule checker",
      "prop firm challenge consistency tool"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "5,200/mo",
    "category": "risk",
    "formula": "Consistency % = best-day profit / qualifying profit total × 100",
    "whyUse": "A consistency rule limits how much one day or trade can contribute to a qualifying profit measure. The exact numerator, denominator and consequence depend on the account agreement. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "Under a hypothetical 30% rule with $3,000 best-day profit and $8,000 qualifying total, score is 37.5%. The required total is $10,000, so $2,000 additional qualifying profit would be needed if the best day stays unchanged. This does not predict how many trades or days are needed.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Consistency % = best-day profit / qualifying profit total × 100"
      },
      {
        "label": "Interpretation and limits",
        "text": "Some products use net total profit while others use positive-day totals, and rules may change by start date. Exceeding a ratio is not universally an account breach or reduced-payout penalty. Check official conditions and all other payout requirements. One large winning day does not by itself prove poor discipline or oversized risk."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Under a hypothetical 30% rule with $3,000 best-day profit and $8,000 qualifying total, score is 37.5%. The required total is $10,000, so $2,000 additional qualifying profit would be needed if the best day stays unchanged. This does not predict how many trades or days are needed."
      },
      {
        "name": "Interpret the result",
        "text": "Some products use net total profit while others use positive-day totals, and rules may change by start date. Exceeding a ratio is not universally an account breach or reduced-payout penalty. Check official conditions and all other payout requirements. One large winning day does not by itself prove poor discipline or oversized risk."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Consistency % = best-day profit / qualifying profit total × 100"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Under a hypothetical 30% rule with $3,000 best-day profit and $8,000 qualifying total, score is 37.5%. The required total is $10,000, so $2,000 additional qualifying profit would be needed if the best day stays unchanged. This does not predict how many trades or days are needed."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Some products use net total profit while others use positive-day totals, and rules may change by start date. Exceeding a ratio is not universally an account breach or reduced-payout penalty. Check official conditions and all other payout requirements. One large winning day does not by itself prove poor discipline or oversized risk."
      }
    ]
  },
  {
    "slug": "xauusd-pip-calculator",
    "title": "XAUUSD Pip Calculator — Gold Pip Value in USD",
    "shortTitle": "XAUUSD Pip",
    "description": "Gold trading calculations depend on the product. Spot-style XAU/USD CFDs, gold futures and physical gold do not share one universal lot or pip definition.",
    "longDescription": "Gold trading calculations depend on the product. Spot-style XAU/USD CFDs, gold futures and physical gold do not share one universal lot or pip definition. Check contract size, tick size and minimum volume with the broker. Do not transfer XAU/USD CFD assumptions to COMEX futures. Typical daily ranges and relationships with currencies or interest rates can change; they are not guarantees. ATR is one way to describe volatility, not a mandatory or sufficient risk rule.",
    "keywords": [
      "XAUUSD pip calculator",
      "gold pip calculator",
      "XAUUSD pip value",
      "gold pip value calculator",
      "XAU USD pip calculator",
      "how much is a pip in gold",
      "gold trading pip value",
      "XAUUSD lot size calculator",
      "pip value gold trading",
      "gold forex pip calculator",
      "XAUUSD position size calculator",
      "how to calculate pip value for gold"
    ],
    "assets": [
      "forex",
      "futures"
    ],
    "searchVolume": "9,900/mo",
    "category": "utility",
    "formula": "Assumed XAU/USD pip value = lots × 100 ounces × $0.01 per ounce",
    "whyUse": "Gold trading calculations depend on the product. Spot-style XAU/USD CFDs, gold futures and physical gold do not share one universal lot or pip definition. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At 0.50 lots under that convention, each pip is $0.50. A 100-pip move is a $1 move per ounce and is worth $50. If a broker instead calls a $0.10 move one pip, the reported pip count changes even though the dollar exposure does not.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Assumed XAU/USD pip value = lots × 100 ounces × $0.01 per ounce"
      },
      {
        "label": "Interpretation and limits",
        "text": "Check contract size, tick size and minimum volume with the broker. Do not transfer XAU/USD CFD assumptions to COMEX futures. Typical daily ranges and relationships with currencies or interest rates can change; they are not guarantees. ATR is one way to describe volatility, not a mandatory or sufficient risk rule."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At 0.50 lots under that convention, each pip is $0.50. A 100-pip move is a $1 move per ounce and is worth $50. If a broker instead calls a $0.10 move one pip, the reported pip count changes even though the dollar exposure does not."
      },
      {
        "name": "Interpret the result",
        "text": "Check contract size, tick size and minimum volume with the broker. Do not transfer XAU/USD CFD assumptions to COMEX futures. Typical daily ranges and relationships with currencies or interest rates can change; they are not guarantees. ATR is one way to describe volatility, not a mandatory or sufficient risk rule."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Assumed XAU/USD pip value = lots × 100 ounces × $0.01 per ounce"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At 0.50 lots under that convention, each pip is $0.50. A 100-pip move is a $1 move per ounce and is worth $50. If a broker instead calls a $0.10 move one pip, the reported pip count changes even though the dollar exposure does not."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Check contract size, tick size and minimum volume with the broker. Do not transfer XAU/USD CFD assumptions to COMEX futures. Typical daily ranges and relationships with currencies or interest rates can change; they are not guarantees. ATR is one way to describe volatility, not a mandatory or sufficient risk rule."
      }
    ]
  },
  {
    "slug": "rebate-calculator",
    "title": "Forex Rebate Calculator — Cashback Per Lot",
    "shortTitle": "Rebate",
    "description": "Forex rebates return part of eligible trading charges under a broker or intermediary agreement. They are conditional cost offsets, not risk-free…",
    "longDescription": "Forex rebates return part of eligible trading charges under a broker or intermediary agreement. They are conditional cost offsets, not risk-free investment returns. Account markups, execution terms, eligibility and intermediary incentives can differ. Do not assume signing up leaves spreads and fills unchanged. TradeCalc’s rate examples are not current broker offers. Trading additional volume just for cashback can increase net losses, and payment depends on the agreement being honored.",
    "keywords": [
      "forex rebate calculator",
      "broker rebate calculator",
      "cashback per lot calculator",
      "forex cashback calculator",
      "trading rebate calculator",
      "how to calculate forex rebates",
      "cashback trading calculator",
      "rebate per lot forex",
      "IB rebate calculator",
      "forex cashback per trade calculator",
      "broker cashback calculator",
      "trading commission rebate calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto"
    ],
    "searchVolume": "5,400/mo",
    "category": "profit",
    "formula": "Rebate = eligible lots × rebate per lot",
    "whyUse": "Forex rebates return part of eligible trading charges under a broker or intermediary agreement. They are conditional cost offsets, not risk-free investment returns. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At a hypothetical $3 per qualifying round-trip lot, 20 eligible lots would produce $60. If the trades incurred $140 in spread and commission, the rebate reduces those costs to $80; it does not make the trades profitable if price losses exceed gains.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Rebate = eligible lots × rebate per lot"
      },
      {
        "label": "Interpretation and limits",
        "text": "Account markups, execution terms, eligibility and intermediary incentives can differ. Do not assume signing up leaves spreads and fills unchanged. TradeCalc’s rate examples are not current broker offers. Trading additional volume just for cashback can increase net losses, and payment depends on the agreement being honored."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At a hypothetical $3 per qualifying round-trip lot, 20 eligible lots would produce $60. If the trades incurred $140 in spread and commission, the rebate reduces those costs to $80; it does not make the trades profitable if price losses exceed gains."
      },
      {
        "name": "Interpret the result",
        "text": "Account markups, execution terms, eligibility and intermediary incentives can differ. Do not assume signing up leaves spreads and fills unchanged. TradeCalc’s rate examples are not current broker offers. Trading additional volume just for cashback can increase net losses, and payment depends on the agreement being honored."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Rebate = eligible lots × rebate per lot"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At a hypothetical $3 per qualifying round-trip lot, 20 eligible lots would produce $60. If the trades incurred $140 in spread and commission, the rebate reduces those costs to $80; it does not make the trades profitable if price losses exceed gains."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Account markups, execution terms, eligibility and intermediary incentives can differ. Do not assume signing up leaves spreads and fills unchanged. TradeCalc’s rate examples are not current broker offers. Trading additional volume just for cashback can increase net losses, and payment depends on the agreement being honored."
      }
    ]
  },
  {
    "slug": "stock-profit-calculator",
    "title": "Stock Profit Calculator — Shares Gain & Loss",
    "shortTitle": "Stock Profit",
    "description": "Stock profit compares sale proceeds with acquisition cost and transaction charges. A holding-period return is different from an annualized return, and…",
    "longDescription": "Stock profit compares sale proceeds with acquisition cost and transaction charges. A holding-period return is different from an annualized return, and neither automatically includes taxes or dividends. The stock calculator does not automatically process taxes, dividends, splits, short borrowing or multiple tax lots. Adjust quantity and prices consistently for a split before calculating. Tax treatment and broker execution quality need jurisdiction-specific and dated evidence rather than a universal assumption.",
    "keywords": [
      "stock profit calculator",
      "stock gain loss calculator",
      "share profit calculator",
      "stock trade profit calculator",
      "stock investment return calculator",
      "how to calculate stock profit",
      "buy sell stock profit calculator",
      "equity trade profit calculator",
      "shares profit percentage calculator",
      "stock roi calculator",
      "profit from selling shares calculator",
      "stock trading pl calculator"
    ],
    "assets": [
      "stocks"
    ],
    "searchVolume": "18,000/mo",
    "category": "profit",
    "formula": "Net stock P&L = (sell − buy) × shares − buy commission − sell commission",
    "whyUse": "Stock profit compares sale proceeds with acquisition cost and transaction charges. A holding-period return is different from an annualized return, and neither automatically includes taxes or dividends. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "Buy 100 shares at $50 and sell at $65 with $5 commission on each side. Gross profit is $1,500, net profit $1,490 and cash invested $5,005. ROI is about 29.7702%. A 21% total return over two years annualizes to 10%, not 10.5%.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Net stock P&L = (sell − buy) × shares − buy commission − sell commission"
      },
      {
        "label": "Interpretation and limits",
        "text": "The stock calculator does not automatically process taxes, dividends, splits, short borrowing or multiple tax lots. Adjust quantity and prices consistently for a split before calculating. Tax treatment and broker execution quality need jurisdiction-specific and dated evidence rather than a universal assumption."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Buy 100 shares at $50 and sell at $65 with $5 commission on each side. Gross profit is $1,500, net profit $1,490 and cash invested $5,005. ROI is about 29.7702%. A 21% total return over two years annualizes to 10%, not 10.5%."
      },
      {
        "name": "Interpret the result",
        "text": "The stock calculator does not automatically process taxes, dividends, splits, short borrowing or multiple tax lots. Adjust quantity and prices consistently for a split before calculating. Tax treatment and broker execution quality need jurisdiction-specific and dated evidence rather than a universal assumption."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Net stock P&L = (sell − buy) × shares − buy commission − sell commission"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Buy 100 shares at $50 and sell at $65 with $5 commission on each side. Gross profit is $1,500, net profit $1,490 and cash invested $5,005. ROI is about 29.7702%. A 21% total return over two years annualizes to 10%, not 10.5%."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The stock calculator does not automatically process taxes, dividends, splits, short borrowing or multiple tax lots. Adjust quantity and prices consistently for a split before calculating. Tax treatment and broker execution quality need jurisdiction-specific and dated evidence rather than a universal assumption."
      }
    ]
  },
  {
    "slug": "crypto-profit-calculator",
    "title": "Crypto Profit Calculator — Bitcoin & Altcoin P&L",
    "shortTitle": "Crypto Profit",
    "description": "A spot crypto profit calculation needs the quantity acquired, sale proceeds and fees on both sides. Derivatives require additional funding, leverage…",
    "longDescription": "A spot crypto profit calculation needs the quantity acquired, sale proceeds and fees on both sides. Derivatives require additional funding, leverage and liquidation modelling. This assumes fees are paid in cash, not deducted in coins, and excludes network charges, funding and tax. Exchange fees depend on product, account tier and jurisdiction; the example is not a current fee quote. For leveraged contracts, liquidation can occur before all initial margin is lost.",
    "keywords": [
      "crypto profit calculator",
      "bitcoin profit calculator",
      "cryptocurrency profit calculator",
      "crypto trade calculator",
      "altcoin profit calculator",
      "how to calculate crypto profit",
      "bitcoin buy sell profit calculator",
      "ethereum profit calculator",
      "crypto investment return calculator",
      "crypto gain loss calculator",
      "digital asset profit calculator",
      "crypto trading roi calculator"
    ],
    "assets": [
      "crypto"
    ],
    "searchVolume": "12,000/mo",
    "category": "profit",
    "formula": "Net spot P&L = coins × sale price − purchase notional − both fees; ROI denominator includes purchase fee",
    "whyUse": "A spot crypto profit calculation needs the quantity acquired, sale proceeds and fees on both sides. Derivatives require additional funding, leverage and liquidation modelling. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "A $1,000 purchase at $50,000 acquires 0.02 coins. Selling at $65,000 produces $1,300 before fees. At 0.1% per side, buy fee is $1 and sell fee $1.30, leaving $297.70 net profit and about 29.7403% ROI on $1,001 paid.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Net spot P&L = coins × sale price − purchase notional − both fees; ROI denominator includes purchase fee"
      },
      {
        "label": "Interpretation and limits",
        "text": "This assumes fees are paid in cash, not deducted in coins, and excludes network charges, funding and tax. Exchange fees depend on product, account tier and jurisdiction; the example is not a current fee quote. For leveraged contracts, liquidation can occur before all initial margin is lost."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A $1,000 purchase at $50,000 acquires 0.02 coins. Selling at $65,000 produces $1,300 before fees. At 0.1% per side, buy fee is $1 and sell fee $1.30, leaving $297.70 net profit and about 29.7403% ROI on $1,001 paid."
      },
      {
        "name": "Interpret the result",
        "text": "This assumes fees are paid in cash, not deducted in coins, and excludes network charges, funding and tax. Exchange fees depend on product, account tier and jurisdiction; the example is not a current fee quote. For leveraged contracts, liquidation can occur before all initial margin is lost."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Net spot P&L = coins × sale price − purchase notional − both fees; ROI denominator includes purchase fee"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A $1,000 purchase at $50,000 acquires 0.02 coins. Selling at $65,000 produces $1,300 before fees. At 0.1% per side, buy fee is $1 and sell fee $1.30, leaving $297.70 net profit and about 29.7403% ROI on $1,001 paid."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "This assumes fees are paid in cash, not deducted in coins, and excludes network charges, funding and tax. Exchange fees depend on product, account tier and jurisdiction; the example is not a current fee quote. For leveraged contracts, liquidation can occur before all initial margin is lost."
      }
    ]
  },
  {
    "slug": "martingale-calculator",
    "title": "Martingale Calculator — Forex Grid Position Sizing",
    "shortTitle": "Martingale",
    "description": "A martingale increases the next stake after losses, often by doubling. It concentrates exposure in losing sequences and does not turn a…",
    "longDescription": "A martingale increases the next stake after losses, often by doubling. It concentrates exposure in losing sequences and does not turn a negative-expectancy process into a reliable source of income. The calculator shows lot growth and spacing, not a full price-path or margin simulation. Finite capital, minimum balances and broker limits eventually constrain escalation. Overlapping streak windows are not independent events, and fixed-fraction sizing also remains exposed to extreme losses.",
    "keywords": [
      "martingale calculator forex",
      "martingale position size calculator",
      "martingale grid calculator",
      "forex martingale calculator",
      "martingale trading strategy calculator",
      "how to calculate martingale lot size",
      "martingale progression calculator",
      "double down trading calculator",
      "martingale risk calculator",
      "martingale system forex",
      "anti-martingale calculator",
      "martingale lot multiplier calculator"
    ],
    "assets": [
      "forex",
      "crypto"
    ],
    "searchVolume": "8,100/mo",
    "category": "risk",
    "formula": "Level n lot size = initial lots × multiplier^(n − 1)",
    "whyUse": "A martingale increases the next stake after losses, often by doubling. It concentrates exposure in losing sequences and does not turn a negative-expectancy process into a reliable source of income. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "Starting at $1, ten successive losses consume $1 + $2 + … + $512 = $1,023. The next stake is $1,024, not $512. For a lot grid starting at 0.01 and doubling through eight levels, total open lots would be 0.01 × (2^8 − 1) = 2.55 if every level remains open.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Level n lot size = initial lots × multiplier^(n − 1)"
      },
      {
        "label": "Interpretation and limits",
        "text": "The calculator shows lot growth and spacing, not a full price-path or margin simulation. Finite capital, minimum balances and broker limits eventually constrain escalation. Overlapping streak windows are not independent events, and fixed-fraction sizing also remains exposed to extreme losses."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Starting at $1, ten successive losses consume $1 + $2 + … + $512 = $1,023. The next stake is $1,024, not $512. For a lot grid starting at 0.01 and doubling through eight levels, total open lots would be 0.01 × (2^8 − 1) = 2.55 if every level remains open."
      },
      {
        "name": "Interpret the result",
        "text": "The calculator shows lot growth and spacing, not a full price-path or margin simulation. Finite capital, minimum balances and broker limits eventually constrain escalation. Overlapping streak windows are not independent events, and fixed-fraction sizing also remains exposed to extreme losses."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Level n lot size = initial lots × multiplier^(n − 1)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Starting at $1, ten successive losses consume $1 + $2 + … + $512 = $1,023. The next stake is $1,024, not $512. For a lot grid starting at 0.01 and doubling through eight levels, total open lots would be 0.01 × (2^8 − 1) = 2.55 if every level remains open."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The calculator shows lot growth and spacing, not a full price-path or margin simulation. Finite capital, minimum balances and broker limits eventually constrain escalation. Overlapping streak windows are not independent events, and fixed-fraction sizing also remains exposed to extreme losses."
      }
    ]
  },
  {
    "slug": "liquidation-price-calculator",
    "title": "Liquidation Price Calculator — Crypto Futures & Leverage",
    "shortTitle": "Liquidation Price",
    "description": "Liquidation occurs when collateral no longer satisfies a venue’s maintenance requirement. The liquidation trigger differs from bankruptcy price, where…",
    "longDescription": "Liquidation occurs when collateral no longer satisfies a venue’s maintenance requirement. The liquidation trigger differs from bankruptcy price, where the position’s collateral would be exhausted under a simplified model. This is not a cross-margin or inverse-contract model. Real venues may use mark prices, maintenance tiers, deductions, funding, close-out fees and other balances. Use the exchange’s own estimate for an actual position. No leverage range is inherently safe, and a stop may fail to execute before liquidation during a fast move.",
    "keywords": [
      "liquidation price calculator",
      "crypto liquidation calculator",
      "futures liquidation price calculator",
      "bybit liquidation calculator",
      "binance futures liquidation price",
      "how to calculate liquidation price",
      "crypto futures liquidation calculator",
      "long liquidation price calculator",
      "short liquidation price calculator",
      "leverage liquidation price crypto",
      "avoid liquidation crypto calculator",
      "margin liquidation level calculator"
    ],
    "assets": [
      "crypto",
      "futures"
    ],
    "searchVolume": "5,400/mo",
    "category": "risk",
    "formula": "Isolated linear model: long = entry × (1 − 1/leverage) / (1 − maintenance fraction); short uses plus signs",
    "whyUse": "Liquidation occurs when collateral no longer satisfies a venue’s maintenance requirement. The liquidation trigger differs from bankruptcy price, where the position’s collateral would be exhausted under a simplified model. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "For E = $65,000, L = 10 and m = 0.005, the long estimate is $58,793.97. The zero-maintenance bankruptcy reference is $58,500, a different price. Extra fees or other venue rules can change the actual trigger.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Isolated linear model: long = entry × (1 − 1/leverage) / (1 − maintenance fraction); short uses plus signs"
      },
      {
        "label": "Interpretation and limits",
        "text": "This is not a cross-margin or inverse-contract model. Real venues may use mark prices, maintenance tiers, deductions, funding, close-out fees and other balances. Use the exchange’s own estimate for an actual position. No leverage range is inherently safe, and a stop may fail to execute before liquidation during a fast move."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "For E = $65,000, L = 10 and m = 0.005, the long estimate is $58,793.97. The zero-maintenance bankruptcy reference is $58,500, a different price. Extra fees or other venue rules can change the actual trigger."
      },
      {
        "name": "Interpret the result",
        "text": "This is not a cross-margin or inverse-contract model. Real venues may use mark prices, maintenance tiers, deductions, funding, close-out fees and other balances. Use the exchange’s own estimate for an actual position. No leverage range is inherently safe, and a stop may fail to execute before liquidation during a fast move."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Isolated linear model: long = entry × (1 − 1/leverage) / (1 − maintenance fraction); short uses plus signs"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "For E = $65,000, L = 10 and m = 0.005, the long estimate is $58,793.97. The zero-maintenance bankruptcy reference is $58,500, a different price. Extra fees or other venue rules can change the actual trigger."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "This is not a cross-margin or inverse-contract model. Real venues may use mark prices, maintenance tiers, deductions, funding, close-out fees and other balances. Use the exchange’s own estimate for an actual position. No leverage range is inherently safe, and a stop may fail to execute before liquidation during a fast move."
      }
    ]
  },
  {
    "slug": "funding-rate-calculator",
    "title": "Crypto Funding Rate Calculator — Binance, Bybit & MEXC",
    "shortTitle": "Funding Rate",
    "description": "Perpetual-futures funding transfers money between sides according to the contract’s funding rate. At a positive rate, longs commonly pay shorts; at a…",
    "longDescription": "Perpetual-futures funding transfers money between sides according to the contract’s funding rate. At a positive rate, longs commonly pay shorts; at a negative rate, the direction reverses under that convention. A spot-long/perpetual-short hedge can still face basis, collateral and exchange risk. Rising prices can pressure the short derivative’s margin even while spot gains elsewhere. Funding can change sign, and fees can exceed receipts. Do not describe a hedge as pure income or assume every contract settles three times per day.",
    "keywords": [
      "funding rate calculator",
      "crypto funding rate calculator",
      "funding fee calculator binance",
      "perpetual futures funding calculator",
      "how to calculate funding rate crypto",
      "binance funding fee calculator",
      "bybit funding rate calculator",
      "funding rate impact on trade",
      "long short funding fee calculator",
      "crypto perpetual swap funding",
      "funding rate cost per hour",
      "positive negative funding rate calculator"
    ],
    "assets": [
      "crypto",
      "futures"
    ],
    "searchVolume": "6,600/mo",
    "category": "utility",
    "formula": "Funding per settlement = notional × funding % / 100; total = per-settlement funding × settlements",
    "whyUse": "Perpetual-futures funding transfers money between sides according to the contract’s funding rate. At a positive rate, longs commonly pay shorts; at a negative rate, the direction reverses under that convention. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "A $10,000 notional position at +0.01% pays or receives $1 per settlement. Three settlements give $3. A long pays under this convention, while a short receives. At −0.01%, the signs reverse. Zero rate means no funding transfer.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Funding per settlement = notional × funding % / 100; total = per-settlement funding × settlements"
      },
      {
        "label": "Interpretation and limits",
        "text": "A spot-long/perpetual-short hedge can still face basis, collateral and exchange risk. Rising prices can pressure the short derivative’s margin even while spot gains elsewhere. Funding can change sign, and fees can exceed receipts. Do not describe a hedge as pure income or assume every contract settles three times per day."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A $10,000 notional position at +0.01% pays or receives $1 per settlement. Three settlements give $3. A long pays under this convention, while a short receives. At −0.01%, the signs reverse. Zero rate means no funding transfer."
      },
      {
        "name": "Interpret the result",
        "text": "A spot-long/perpetual-short hedge can still face basis, collateral and exchange risk. Rising prices can pressure the short derivative’s margin even while spot gains elsewhere. Funding can change sign, and fees can exceed receipts. Do not describe a hedge as pure income or assume every contract settles three times per day."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Funding per settlement = notional × funding % / 100; total = per-settlement funding × settlements"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A $10,000 notional position at +0.01% pays or receives $1 per settlement. Three settlements give $3. A long pays under this convention, while a short receives. At −0.01%, the signs reverse. Zero rate means no funding transfer."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "A spot-long/perpetual-short hedge can still face basis, collateral and exchange risk. Rising prices can pressure the short derivative’s margin even while spot gains elsewhere. Funding can change sign, and fees can exceed receipts. Do not describe a hedge as pure income or assume every contract settles three times per day."
      }
    ]
  },
  {
    "slug": "spread-cost-calculator",
    "title": "Forex Spread Cost Calculator — True Cost Per Trade",
    "shortTitle": "Spread Cost",
    "description": "Spread costs accumulate with volume and frequency. To compare accounts, use total round-trip cost under the same price, size and execution assumptions.",
    "longDescription": "Spread costs accumulate with volume and frequency. To compare accounts, use total round-trip cost under the same price, size and execution assumptions. TradeCalc’s spread tool calculates spread only; it has no broker-commission comparison input. Its monthly projection uses 22 trading days and yearly projection uses 252; these are separate calendar assumptions. Real spreads vary, so test several scenarios and avoid counting spread twice when working from actual fills.",
    "keywords": [
      "forex spread calculator",
      "spread cost calculator",
      "forex spread cost per trade",
      "pip spread calculator",
      "trading spread calculator",
      "how to calculate spread cost forex",
      "spread impact on profit calculator",
      "broker spread cost calculator",
      "annual spread cost calculator trading",
      "spread vs commission calculator",
      "ecn vs standard account spread calculator",
      "total trading cost spread calculator"
    ],
    "assets": [
      "forex",
      "crypto",
      "stocks"
    ],
    "searchVolume": "4,400/mo",
    "category": "utility",
    "formula": "Spread cost = spread pips × USD pip value per lot × lots × trade count",
    "whyUse": "Spread costs accumulate with volume and frequency. To compare accounts, use total round-trip cost under the same price, size and execution assumptions. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "Account A with a hypothetical 1.2-pip EUR/USD spread and no commission costs $12 per standard lot. Account B with 0.2 pips plus $7 round-trip commission costs $9 per lot. At 0.10 lots, the costs are $1.20 and $0.90; at 1 lot they are $12 and $9. Minimum fees or volume tiers could change this.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Spread cost = spread pips × USD pip value per lot × lots × trade count"
      },
      {
        "label": "Interpretation and limits",
        "text": "TradeCalc’s spread tool calculates spread only; it has no broker-commission comparison input. Its monthly projection uses 22 trading days and yearly projection uses 252; these are separate calendar assumptions. Real spreads vary, so test several scenarios and avoid counting spread twice when working from actual fills."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Account A with a hypothetical 1.2-pip EUR/USD spread and no commission costs $12 per standard lot. Account B with 0.2 pips plus $7 round-trip commission costs $9 per lot. At 0.10 lots, the costs are $1.20 and $0.90; at 1 lot they are $12 and $9. Minimum fees or volume tiers could change this."
      },
      {
        "name": "Interpret the result",
        "text": "TradeCalc’s spread tool calculates spread only; it has no broker-commission comparison input. Its monthly projection uses 22 trading days and yearly projection uses 252; these are separate calendar assumptions. Real spreads vary, so test several scenarios and avoid counting spread twice when working from actual fills."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Spread cost = spread pips × USD pip value per lot × lots × trade count"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Account A with a hypothetical 1.2-pip EUR/USD spread and no commission costs $12 per standard lot. Account B with 0.2 pips plus $7 round-trip commission costs $9 per lot. At 0.10 lots, the costs are $1.20 and $0.90; at 1 lot they are $12 and $9. Minimum fees or volume tiers could change this."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "TradeCalc’s spread tool calculates spread only; it has no broker-commission comparison input. Its monthly projection uses 22 trading days and yearly projection uses 252; these are separate calendar assumptions. Real spreads vary, so test several scenarios and avoid counting spread twice when working from actual fills."
      }
    ]
  },
  {
    "slug": "profit-factor-calculator",
    "title": "Profit Factor Calculator — Trading Strategy Evaluation",
    "shortTitle": "Profit Factor",
    "description": "Profit factor compares aggregate winning P&L with the magnitude of aggregate losing P&L. It summarizes a sample and does not establish that the same…",
    "longDescription": "Profit factor compares aggregate winning P&L with the magnitude of aggregate losing P&L. It summarizes a sample and does not establish that the same relationship will persist. If there are wins but no losses, the sample ratio is unbounded; it is not a verified low-risk strategy. With no trades, it is undefined. A few large winners or a short backtest can dominate the ratio. Review drawdown, exposure, sample selection and out-of-sample results instead of sizing up from a single threshold.",
    "keywords": [
      "profit factor calculator",
      "trading profit factor",
      "profit factor trading strategy",
      "strategy profit factor calculator",
      "forex profit factor",
      "how to calculate profit factor",
      "profit factor formula trading",
      "backtest profit factor calculator",
      "good profit factor score",
      "gross profit gross loss ratio calculator",
      "trading strategy quality calculator",
      "profit factor expected value calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "3,600/mo",
    "category": "profit",
    "formula": "Profit factor = aggregate winning P&L / absolute aggregate losing P&L",
    "whyUse": "Profit factor compares aggregate winning P&L with the magnitude of aggregate losing P&L. It summarizes a sample and does not establish that the same relationship will persist. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "If winning trades total $8,200 and losing trades total −$4,100, profit factor is 2 and net profit is $4,100 under that accounting convention. With 60 wins and 40 losses, average win is $136.67 and average loss is $102.50.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Profit factor = aggregate winning P&L / absolute aggregate losing P&L"
      },
      {
        "label": "Interpretation and limits",
        "text": "If there are wins but no losses, the sample ratio is unbounded; it is not a verified low-risk strategy. With no trades, it is undefined. A few large winners or a short backtest can dominate the ratio. Review drawdown, exposure, sample selection and out-of-sample results instead of sizing up from a single threshold."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "If winning trades total $8,200 and losing trades total −$4,100, profit factor is 2 and net profit is $4,100 under that accounting convention. With 60 wins and 40 losses, average win is $136.67 and average loss is $102.50."
      },
      {
        "name": "Interpret the result",
        "text": "If there are wins but no losses, the sample ratio is unbounded; it is not a verified low-risk strategy. With no trades, it is undefined. A few large winners or a short backtest can dominate the ratio. Review drawdown, exposure, sample selection and out-of-sample results instead of sizing up from a single threshold."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Profit factor = aggregate winning P&L / absolute aggregate losing P&L"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "If winning trades total $8,200 and losing trades total −$4,100, profit factor is 2 and net profit is $4,100 under that accounting convention. With 60 wins and 40 losses, average win is $136.67 and average loss is $102.50."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "If there are wins but no losses, the sample ratio is unbounded; it is not a verified low-risk strategy. With no trades, it is undefined. A few large winners or a short backtest can dominate the ratio. Review drawdown, exposure, sample selection and out-of-sample results instead of sizing up from a single threshold."
      }
    ]
  },
  {
    "slug": "atr-stop-loss-calculator",
    "title": "ATR Stop Loss Calculator — Volatility-Based Stop Loss",
    "shortTitle": "ATR Stop Loss",
    "description": "Average True Range measures recent price movement, including gaps relative to the prior close. An ATR-based stop scales a chosen distance with…",
    "longDescription": "Average True Range measures recent price movement, including gaps relative to the prior close. An ATR-based stop scales a chosen distance with volatility; it does not predict direction. The ATR tool accepts ATR, multiplier, entry, direction, target multiple and price change per ATR unit. It calculates levels, not account-based position size. Use 0.01 for JPY pips or 1 for ATR already expressed in price units. A multiplier has no universal safety guarantee; compare volatility estimates and gap exposure.",
    "keywords": [
      "ATR stop loss calculator",
      "ATR calculator stop loss",
      "volatility stop loss calculator",
      "average true range stop loss",
      "ATR based stop loss",
      "how to set ATR stop loss",
      "ATR trailing stop calculator",
      "ATR risk calculator trading",
      "volatility adjusted stop loss",
      "ATR multiplier stop loss calculator",
      "dynamic stop loss ATR",
      "average true range trading calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "2,800/mo",
    "category": "risk",
    "formula": "Stop distance = ATR × multiplier × price change per ATR unit; long stop = entry − distance; short stop = entry + distance",
    "whyUse": "Average True Range measures recent price movement, including gaps relative to the prior close. An ATR-based stop scales a chosen distance with volatility; it does not predict direction. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "An ATR of 80 pips and multiplier of 2 gives a 160-pip stop. For EUR/USD entry 1.1050, the long stop is 1.0890. If a separate sizing calculation gives 0.0588 lots, a 0.01 step requires rounding down to 0.05, not up to 0.06.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Stop distance = ATR × multiplier × price change per ATR unit; long stop = entry − distance; short stop = entry + distance"
      },
      {
        "label": "Interpretation and limits",
        "text": "The ATR tool accepts ATR, multiplier, entry, direction, target multiple and price change per ATR unit. It calculates levels, not account-based position size. Use 0.01 for JPY pips or 1 for ATR already expressed in price units. A multiplier has no universal safety guarantee; compare volatility estimates and gap exposure."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "An ATR of 80 pips and multiplier of 2 gives a 160-pip stop. For EUR/USD entry 1.1050, the long stop is 1.0890. If a separate sizing calculation gives 0.0588 lots, a 0.01 step requires rounding down to 0.05, not up to 0.06."
      },
      {
        "name": "Interpret the result",
        "text": "The ATR tool accepts ATR, multiplier, entry, direction, target multiple and price change per ATR unit. It calculates levels, not account-based position size. Use 0.01 for JPY pips or 1 for ATR already expressed in price units. A multiplier has no universal safety guarantee; compare volatility estimates and gap exposure."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Stop distance = ATR × multiplier × price change per ATR unit; long stop = entry − distance; short stop = entry + distance"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "An ATR of 80 pips and multiplier of 2 gives a 160-pip stop. For EUR/USD entry 1.1050, the long stop is 1.0890. If a separate sizing calculation gives 0.0588 lots, a 0.01 step requires rounding down to 0.05, not up to 0.06."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The ATR tool accepts ATR, multiplier, entry, direction, target multiple and price change per ATR unit. It calculates levels, not account-based position size. Use 0.01 for JPY pips or 1 for ATR already expressed in price units. A multiplier has no universal safety guarantee; compare volatility estimates and gap exposure."
      }
    ]
  },
  {
    "slug": "options-profit-calculator",
    "title": "Options Profit Calculator — Calls & Puts P&L",
    "shortTitle": "Options Profit",
    "description": "An option’s expiry payoff depends on the underlying price, strike, premium and contract multiplier. A payoff calculation at expiry is different from…",
    "longDescription": "An option’s expiry payoff depends on the underlying price, strike, premium and contract multiplier. A payoff calculation at expiry is different from the option’s theoretical market value before expiry. The calculator supports long and short calls and puts at expiry, with a fixed 100 multiplier. It does not price time value or implied volatility, model multi-leg positions, or include fees and taxes. Adjusted contracts can have other deliverables. Exercise and assignment can create a stock position with additional exposure; an uncovered short call has unbounded loss in this model.",
    "keywords": [
      "options profit calculator",
      "call option profit calculator",
      "put option calculator",
      "options break even calculator",
      "options trading profit calculator",
      "how to calculate options profit",
      "call put option pl calculator",
      "options premium calculator",
      "options expiry profit calculator",
      "long call short put calculator",
      "options trade outcome calculator",
      "stock options profit loss calculator"
    ],
    "assets": [
      "stocks",
      "crypto"
    ],
    "searchVolume": "8,100/mo",
    "category": "profit",
    "formula": "Long call expiry P&L = [max(underlying − strike, 0) − premium] × 100 × contracts; put reverses intrinsic price difference",
    "whyUse": "An option’s expiry payoff depends on the underlying price, strike, premium and contract multiplier. A payoff calculation at expiry is different from the option’s theoretical market value before expiry. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "A call with strike $150 and premium $3 has break-even $153 at expiry before fees. At an underlying price of $160, one 100-share contract returns ($10 − $3) × 100 = $700 P&L. At or below $150, the long option loses the $300 premium.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Long call expiry P&L = [max(underlying − strike, 0) − premium] × 100 × contracts; put reverses intrinsic price difference"
      },
      {
        "label": "Interpretation and limits",
        "text": "The calculator supports long and short calls and puts at expiry, with a fixed 100 multiplier. It does not price time value or implied volatility, model multi-leg positions, or include fees and taxes. Adjusted contracts can have other deliverables. Exercise and assignment can create a stock position with additional exposure; an uncovered short call has unbounded loss in this model."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A call with strike $150 and premium $3 has break-even $153 at expiry before fees. At an underlying price of $160, one 100-share contract returns ($10 − $3) × 100 = $700 P&L. At or below $150, the long option loses the $300 premium."
      },
      {
        "name": "Interpret the result",
        "text": "The calculator supports long and short calls and puts at expiry, with a fixed 100 multiplier. It does not price time value or implied volatility, model multi-leg positions, or include fees and taxes. Adjusted contracts can have other deliverables. Exercise and assignment can create a stock position with additional exposure; an uncovered short call has unbounded loss in this model."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Long call expiry P&L = [max(underlying − strike, 0) − premium] × 100 × contracts; put reverses intrinsic price difference"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A call with strike $150 and premium $3 has break-even $153 at expiry before fees. At an underlying price of $160, one 100-share contract returns ($10 − $3) × 100 = $700 P&L. At or below $150, the long option loses the $300 premium."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The calculator supports long and short calls and puts at expiry, with a fixed 100 multiplier. It does not price time value or implied volatility, model multi-leg positions, or include fees and taxes. Adjusted contracts can have other deliverables. Exercise and assignment can create a stock position with additional exposure; an uncovered short call has unbounded loss in this model."
      }
    ]
  },
  {
    "slug": "pip-difference-calculator",
    "title": "Pip Difference Calculator — Pips Between Any Two Prices",
    "shortTitle": "Pip Difference",
    "description": "Enter any two forex prices and get the exact pip distance in one click. Works for EUR/USD, USD/JPY, XAU/USD and all major pairs. Use it to measure stop loss distance before every trade.",
    "longDescription": "This calculator counts the exact number of pips between any two price levels — entry to stop, entry to target, support to resistance, or any two chart prices. Enter the two prices and select your pair type (standard 4-decimal, JPY 2-decimal, or XAU/USD gold). The result is the pip distance used directly in position size calculation: Lots = Dollar Risk ÷ (Stop Pips × Pip Value per Lot). Measuring stop distance in pips before sizing is the step most retail traders skip, which is why their dollar risk varies wildly from trade to trade even when they think they’re risking a fixed percentage. Use this tool for every trade entry: it takes 10 seconds and eliminates guesswork from your risk calculation entirely.",
    "keywords": [
      "pip difference calculator",
      "pips between two prices calculator",
      "pip distance calculator forex",
      "pips from entry to stop loss calculator",
      "how many pips between prices",
      "forex pip difference",
      "how many pips calculator",
      "pip count calculator forex",
      "how to calculate pips between prices",
      "price to pip calculator",
      "entry to stop loss pip calculator",
      "number of pips between two prices",
      "pips calculator forex trading",
      "entry to target pips calculator",
      "stop loss pip distance calculator"
    ],
    "assets": [
      "forex"
    ],
    "searchVolume": "3,600/mo",
    "category": "utility",
    "formula": "Pip difference = absolute price difference / pip size",
    "whyUse": "To count pips between two prices, divide their absolute difference by the instrument’s pip size. Direction and money value are separate questions. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "EUR/USD from 1.1050 to 1.1180 moves 130 pips. USD/JPY from 150.00 to 150.50 moves 50 pips. Multiplying that JPY difference by 10,000 would give 5,000, which is 100 times too large—not too small.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Pip difference = absolute price difference / pip size"
      },
      {
        "label": "Interpretation and limits",
        "text": "Dollar movement additionally requires pip value and quantity. Position sizing needs stop pips in the denominator: lots = risk budget / (stop pips × pip value per lot). The pip-distance tool uses a manually supplied USD pip value. See the published [pip-value guide](/blog/what-is-pip-value-how-to-calculate) for conversion examples."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "EUR/USD from 1.1050 to 1.1180 moves 130 pips. USD/JPY from 150.00 to 150.50 moves 50 pips. Multiplying that JPY difference by 10,000 would give 5,000, which is 100 times too large—not too small."
      },
      {
        "name": "Interpret the result",
        "text": "Dollar movement additionally requires pip value and quantity. Position sizing needs stop pips in the denominator: lots = risk budget / (stop pips × pip value per lot). The pip-distance tool uses a manually supplied USD pip value. See the published [pip-value guide](/blog/what-is-pip-value-how-to-calculate) for conversion examples."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Pip difference = absolute price difference / pip size"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "EUR/USD from 1.1050 to 1.1180 moves 130 pips. USD/JPY from 150.00 to 150.50 moves 50 pips. Multiplying that JPY difference by 10,000 would give 5,000, which is 100 times too large—not too small."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Dollar movement additionally requires pip value and quantity. Position sizing needs stop pips in the denominator: lots = risk budget / (stop pips × pip value per lot). The pip-distance tool uses a manually supplied USD pip value. See the published [pip-value guide](/blog/what-is-pip-value-how-to-calculate) for conversion examples."
      }
    ]
  },
  {
    "slug": "cagr-calculator",
    "title": "CAGR Calculator — Compound Annual Growth Rate for Traders",
    "shortTitle": "CAGR",
    "description": "Compound annual growth rate expresses the constant annual rate that connects two values over a stated time. Raw account endpoints only support this…",
    "longDescription": "Compound annual growth rate expresses the constant annual rate that connects two values over a stated time. Raw account endpoints only support this calculation when external deposits and withdrawals are absent or properly adjusted. Do not divide total return by years and call it compound annual growth. If cash was added or withdrawn, consider cash-flow-aware methods such as time-weighted or money-weighted return. CAGR hides the path and drawdowns. Hypothetical comparison rates are not realistic income benchmarks or promises.",
    "keywords": [
      "CAGR calculator trading",
      "compound annual growth rate calculator",
      "trading account CAGR",
      "annualized return calculator",
      "investment CAGR calculator",
      "how to calculate CAGR trading",
      "annual return calculator",
      "trading account annual growth rate",
      "CAGR formula calculator",
      "compound growth rate calculator",
      "trading account annualized return",
      "portfolio CAGR calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "4,400/mo",
    "category": "profit",
    "formula": "CAGR % = [(end / start)^(1 / years) − 1] × 100; no external cash flows",
    "whyUse": "Compound annual growth rate expresses the constant annual rate that connects two values over a stated time. Raw account endpoints only support this calculation when external deposits and withdrawals are absent or properly adjusted. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "Growing from $10,000 to $18,000 over 2.5 years gives 1.8^0.4 − 1 = about 26.5054% per year. A +10% year followed by −10% leaves a 1% cumulative loss, even though the arithmetic average annual return is zero.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "CAGR % = [(end / start)^(1 / years) − 1] × 100; no external cash flows"
      },
      {
        "label": "Interpretation and limits",
        "text": "Do not divide total return by years and call it compound annual growth. If cash was added or withdrawn, consider cash-flow-aware methods such as time-weighted or money-weighted return. CAGR hides the path and drawdowns. Hypothetical comparison rates are not realistic income benchmarks or promises."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Growing from $10,000 to $18,000 over 2.5 years gives 1.8^0.4 − 1 = about 26.5054% per year. A +10% year followed by −10% leaves a 1% cumulative loss, even though the arithmetic average annual return is zero."
      },
      {
        "name": "Interpret the result",
        "text": "Do not divide total return by years and call it compound annual growth. If cash was added or withdrawn, consider cash-flow-aware methods such as time-weighted or money-weighted return. CAGR hides the path and drawdowns. Hypothetical comparison rates are not realistic income benchmarks or promises."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "CAGR % = [(end / start)^(1 / years) − 1] × 100; no external cash flows"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Growing from $10,000 to $18,000 over 2.5 years gives 1.8^0.4 − 1 = about 26.5054% per year. A +10% year followed by −10% leaves a 1% cumulative loss, even though the arithmetic average annual return is zero."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Do not divide total return by years and call it compound annual growth. If cash was added or withdrawn, consider cash-flow-aware methods such as time-weighted or money-weighted return. CAGR hides the path and drawdowns. Hypothetical comparison rates are not realistic income benchmarks or promises."
      }
    ]
  },
  {
    "slug": "daily-loss-limit-calculator",
    "title": "Daily Loss Limit Calculator — Prop Firm Max Risk Per Trade",
    "shortTitle": "Daily Loss Limit",
    "description": "Allocate a chosen portion of a daily loss allowance across a specified number of planned trades.",
    "longDescription": "Allocate a chosen portion of a daily loss allowance across a specified number of planned trades. A universal 5% rule is unreliable: account products and phases differ. Confirm the current provider terms, reset timezone, equity treatment and overall drawdown rule. A result of zero remaining room means no positive budget under the model. Planned stop losses and buffers cannot guarantee compliance through slippage.",
    "keywords": [
      "daily loss limit calculator",
      "prop firm daily drawdown calculator",
      "FTMO daily loss calculator",
      "max risk per trade calculator",
      "daily drawdown limit calculator",
      "how to calculate daily loss limit",
      "prop firm daily limit checker",
      "daily risk budget calculator trading",
      "maximum daily loss prop firm",
      "funded account daily drawdown tool",
      "FTMO 5 percent daily loss calculator",
      "trading daily risk calculator"
    ],
    "assets": [
      "forex",
      "stocks",
      "crypto",
      "futures"
    ],
    "searchVolume": "2,800/mo",
    "category": "risk",
    "formula": "Planned risk per trade = reference balance × daily limit fraction × allocation fraction / planned trades",
    "whyUse": "Allocate a chosen portion of a daily loss allowance across a specified number of planned trades. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "On $10,000 with an illustrative 5% daily allowance, allocating 80% across four trades gives $100 per trade. This is a planning budget before existing exposure and costs.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Planned risk per trade = reference balance × daily limit fraction × allocation fraction / planned trades"
      },
      {
        "label": "Interpretation and limits",
        "text": "A universal 5% rule is unreliable: account products and phases differ. Confirm the current provider terms, reset timezone, equity treatment and overall drawdown rule. A result of zero remaining room means no positive budget under the model. Planned stop losses and buffers cannot guarantee compliance through slippage."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "On $10,000 with an illustrative 5% daily allowance, allocating 80% across four trades gives $100 per trade. This is a planning budget before existing exposure and costs."
      },
      {
        "name": "Interpret the result",
        "text": "A universal 5% rule is unreliable: account products and phases differ. Confirm the current provider terms, reset timezone, equity treatment and overall drawdown rule. A result of zero remaining room means no positive budget under the model. Planned stop losses and buffers cannot guarantee compliance through slippage."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Planned risk per trade = reference balance × daily limit fraction × allocation fraction / planned trades"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "On $10,000 with an illustrative 5% daily allowance, allocating 80% across four trades gives $100 per trade. This is a planning budget before existing exposure and costs."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "A universal 5% rule is unreliable: account products and phases differ. Confirm the current provider terms, reset timezone, equity treatment and overall drawdown rule. A result of zero remaining room means no positive budget under the model. Planned stop losses and buffers cannot guarantee compliance through slippage."
      }
    ]
  },
  {
    "slug": "futures-tick-value-calculator",
    "title": "Futures Tick Value Calculator — ES, NQ, CL, GC & More",
    "shortTitle": "Futures Tick Value",
    "description": "A futures tick is the minimum quoted price increment for a contract. Tick value turns that increment into money per contract, and differs substantially…",
    "longDescription": "A futures tick is the minimum quoted price increment for a contract. Tick value turns that increment into money per contract, and differs substantially between mini and micro versions. If the budget must include commission, even that one ES contract may exceed it; a micro contract can provide finer sizing. Exchange and broker margin requirements are separate from tick risk and can change. Verify the exact symbol, expiry, multiplier and current contract specification before trading.",
    "keywords": [
      "futures tick value calculator",
      "ES tick value calculator",
      "NQ futures calculator",
      "futures contract value calculator",
      "how to calculate futures tick value",
      "emini futures tick value",
      "ES futures pip value",
      "futures point value calculator",
      "CL crude oil tick calculator",
      "futures tick size calculator",
      "futures dollar per tick calculator",
      "NQ nasdaq tick value"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "3,200/mo",
    "category": "utility",
    "formula": "Tick value = tick size × multiplier; movement value = ticks × tick value × contracts",
    "whyUse": "A futures tick is the minimum quoted price increment for a contract. Tick value turns that increment into money per contract, and differs substantially between mini and micro versions. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "For ES, a 0.25-point tick with a $50 multiplier is $12.50. For MES, the same 0.25-point tick with a $5 multiplier is $1.25. On a $25,000 account, an illustrative 1% budget is $250. A 20-tick ES stop costs $250 per contract, supporting one contract before fees—not two or three.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Tick value = tick size × multiplier; movement value = ticks × tick value × contracts"
      },
      {
        "label": "Interpretation and limits",
        "text": "If the budget must include commission, even that one ES contract may exceed it; a micro contract can provide finer sizing. Exchange and broker margin requirements are separate from tick risk and can change. Verify the exact symbol, expiry, multiplier and current contract specification before trading."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "For ES, a 0.25-point tick with a $50 multiplier is $12.50. For MES, the same 0.25-point tick with a $5 multiplier is $1.25. On a $25,000 account, an illustrative 1% budget is $250. A 20-tick ES stop costs $250 per contract, supporting one contract before fees—not two or three."
      },
      {
        "name": "Interpret the result",
        "text": "If the budget must include commission, even that one ES contract may exceed it; a micro contract can provide finer sizing. Exchange and broker margin requirements are separate from tick risk and can change. Verify the exact symbol, expiry, multiplier and current contract specification before trading."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Tick value = tick size × multiplier; movement value = ticks × tick value × contracts"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "For ES, a 0.25-point tick with a $50 multiplier is $12.50. For MES, the same 0.25-point tick with a $5 multiplier is $1.25. On a $25,000 account, an illustrative 1% budget is $250. A 20-tick ES stop costs $250 per contract, supporting one contract before fees—not two or three."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "If the budget must include commission, even that one ES contract may exceed it; a micro contract can provide finer sizing. Exchange and broker margin requirements are separate from tick risk and can change. Verify the exact symbol, expiry, multiplier and current contract specification before trading."
      }
    ]
  },
  {
    "slug": "dividend-yield-calculator",
    "title": "Dividend Yield Calculator — Monthly Income & Payout",
    "shortTitle": "Dividend Yield",
    "description": "Dividend yield compares annual dividend per share with share price. Yield on cost compares the same dividend with purchase price. Neither measure…",
    "longDescription": "Dividend yield compares annual dividend per share with share price. Yield on cost compares the same dividend with purchase price. Neither measure includes capital gains or proves a payout is sustainable. The growth comparison excludes reinvestment, price changes and taxes. Dividends can be cut or suspended. The calculator uses whole shares for a new investment and treats monthly or quarterly amounts as averages, not an actual payment calendar. Payout ratios need sector-appropriate interpretation.",
    "keywords": [
      "dividend yield calculator",
      "dividend calculator",
      "stock dividend calculator",
      "monthly dividend calculator",
      "monthly dividend income calculator",
      "dividend income calculator",
      "annual dividend calculator",
      "calculating dividend payout",
      "calculator for dividends",
      "how much dividends will i get",
      "dividend calculation",
      "calculate dividend yield calculator",
      "dividend yield percentage calculator",
      "how to calculate dividend yield",
      "stock yield calculator",
      "dividend payout calculator",
      "dividend per share calculator",
      "stock dividend return calculator"
    ],
    "assets": [
      "stocks"
    ],
    "searchVolume": "6,600/mo",
    "category": "profit",
    "formula": "Dividend yield % = annual dividend per share / share price × 100",
    "whyUse": "Dividend yield compares annual dividend per share with share price. Yield on cost compares the same dividend with purchase price. Neither measure includes capital gains or proves a payout is sustainable. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "A $4 annual dividend on a $100 share gives 4% yield. Buying 100 shares produces $400 annual income if the dividend is maintained. Separately, a 2% initial yield growing 10% each year reaches 2% × 1.1^7 = 3.8974% after seven increases; it first exceeds a flat 5% after ten increases on equal initial capital.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Dividend yield % = annual dividend per share / share price × 100"
      },
      {
        "label": "Interpretation and limits",
        "text": "The growth comparison excludes reinvestment, price changes and taxes. Dividends can be cut or suspended. The calculator uses whole shares for a new investment and treats monthly or quarterly amounts as averages, not an actual payment calendar. Payout ratios need sector-appropriate interpretation."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A $4 annual dividend on a $100 share gives 4% yield. Buying 100 shares produces $400 annual income if the dividend is maintained. Separately, a 2% initial yield growing 10% each year reaches 2% × 1.1^7 = 3.8974% after seven increases; it first exceeds a flat 5% after ten increases on equal initial capital."
      },
      {
        "name": "Interpret the result",
        "text": "The growth comparison excludes reinvestment, price changes and taxes. Dividends can be cut or suspended. The calculator uses whole shares for a new investment and treats monthly or quarterly amounts as averages, not an actual payment calendar. Payout ratios need sector-appropriate interpretation."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Dividend yield % = annual dividend per share / share price × 100"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A $4 annual dividend on a $100 share gives 4% yield. Buying 100 shares produces $400 annual income if the dividend is maintained. Separately, a 2% initial yield growing 10% each year reaches 2% × 1.1^7 = 3.8974% after seven increases; it first exceeds a flat 5% after ten increases on equal initial capital."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The growth comparison excludes reinvestment, price changes and taxes. Dividends can be cut or suspended. The calculator uses whole shares for a new investment and treats monthly or quarterly amounts as averages, not an actual payment calendar. Payout ratios need sector-appropriate interpretation."
      }
    ]
  },
  {
    "slug": "futures-position-size-calculator",
    "title": "Futures Position Size Calculator — ES, NQ, MNQ, MES & More",
    "shortTitle": "Futures Position Size",
    "description": "Size whole futures contracts from a dollar risk budget and a stop measured in ticks.",
    "longDescription": "Size whole futures contracts from a dollar risk budget and a stop measured in ticks. If the budget must include commission, even that one ES contract may exceed it; a micro contract can provide finer sizing. Exchange and broker margin requirements are separate from tick risk and can change. Verify the exact symbol, expiry, multiplier and current contract specification before trading.",
    "keywords": [
      "futures position size calculator",
      "ES position size calculator",
      "NQ position size calculator",
      "MNQ MES position size calculator",
      "how many futures contracts to trade",
      "futures contract sizing calculator",
      "futures risk calculator ES NQ",
      "position size futures trading",
      "futures lot size calculator",
      "CME futures position calculator",
      "micro futures position size",
      "futures contracts per trade calculator"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "5,400/mo",
    "category": "futures",
    "formula": "Contracts = floor(risk budget / (stop ticks × tick value)); before costs",
    "whyUse": "Size whole futures contracts from a dollar risk budget and a stop measured in ticks. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "For ES, a 0.25-point tick with a $50 multiplier is $12.50. For MES, the same 0.25-point tick with a $5 multiplier is $1.25. On a $25,000 account, an illustrative 1% budget is $250. A 20-tick ES stop costs $250 per contract, supporting one contract before fees—not two or three.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Contracts = floor(risk budget / (stop ticks × tick value)); before costs"
      },
      {
        "label": "Interpretation and limits",
        "text": "If the budget must include commission, even that one ES contract may exceed it; a micro contract can provide finer sizing. Exchange and broker margin requirements are separate from tick risk and can change. Verify the exact symbol, expiry, multiplier and current contract specification before trading."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "For ES, a 0.25-point tick with a $50 multiplier is $12.50. For MES, the same 0.25-point tick with a $5 multiplier is $1.25. On a $25,000 account, an illustrative 1% budget is $250. A 20-tick ES stop costs $250 per contract, supporting one contract before fees—not two or three."
      },
      {
        "name": "Interpret the result",
        "text": "If the budget must include commission, even that one ES contract may exceed it; a micro contract can provide finer sizing. Exchange and broker margin requirements are separate from tick risk and can change. Verify the exact symbol, expiry, multiplier and current contract specification before trading."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Contracts = floor(risk budget / (stop ticks × tick value)); before costs"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "For ES, a 0.25-point tick with a $50 multiplier is $12.50. For MES, the same 0.25-point tick with a $5 multiplier is $1.25. On a $25,000 account, an illustrative 1% budget is $250. A 20-tick ES stop costs $250 per contract, supporting one contract before fees—not two or three."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "If the budget must include commission, even that one ES contract may exceed it; a micro contract can provide finer sizing. Exchange and broker margin requirements are separate from tick risk and can change. Verify the exact symbol, expiry, multiplier and current contract specification before trading."
      }
    ]
  },
  {
    "slug": "futures-profit-loss-calculator",
    "title": "Futures Profit & Loss Calculator — ES, NQ, CL, GC by Tick and Point",
    "shortTitle": "Futures P&L",
    "description": "Calculate long or short futures P&L from actual entry and exit prices, the contract tick value and round-trip commission.",
    "longDescription": "Calculate long or short futures P&L from actual entry and exit prices, the contract tick value and round-trip commission. Use the exact contract specification and actual fills. Spread is already reflected in those fills; do not subtract it again. The commission input is round-trip per contract, not a single total for all contracts.",
    "keywords": [
      "futures profit loss calculator",
      "futures PnL calculator",
      "ES NQ futures P&L calculator",
      "futures trade calculator ticks",
      "how to calculate futures profit",
      "futures gain calculator",
      "futures trade outcome calculator",
      "ES futures profit calculator",
      "NQ futures PnL",
      "futures dollar gain loss calculator",
      "CME futures P&L tool",
      "futures points to dollars calculator"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "4,400/mo",
    "category": "futures",
    "formula": "Net futures P&L = signed price difference / tick size × tick value × contracts − round-trip commission per contract × contracts",
    "whyUse": "Calculate long or short futures P&L from actual entry and exit prices, the contract tick value and round-trip commission. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "One long ES contract from 5000 to 5010 gains 40 ticks × $12.50 = $500 gross. With $4 round-trip commission, net P&L is $496.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Net futures P&L = signed price difference / tick size × tick value × contracts − round-trip commission per contract × contracts"
      },
      {
        "label": "Interpretation and limits",
        "text": "Use the exact contract specification and actual fills. Spread is already reflected in those fills; do not subtract it again. The commission input is round-trip per contract, not a single total for all contracts."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "One long ES contract from 5000 to 5010 gains 40 ticks × $12.50 = $500 gross. With $4 round-trip commission, net P&L is $496."
      },
      {
        "name": "Interpret the result",
        "text": "Use the exact contract specification and actual fills. Spread is already reflected in those fills; do not subtract it again. The commission input is round-trip per contract, not a single total for all contracts."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Net futures P&L = signed price difference / tick size × tick value × contracts − round-trip commission per contract × contracts"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "One long ES contract from 5000 to 5010 gains 40 ticks × $12.50 = $500 gross. With $4 round-trip commission, net P&L is $496."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Use the exact contract specification and actual fills. Spread is already reflected in those fills; do not subtract it again. The commission input is round-trip per contract, not a single total for all contracts."
      }
    ]
  },
  {
    "slug": "futures-margin-requirement-calculator",
    "title": "Futures Margin Requirement Calculator — Initial and Maintenance Margin by Contract",
    "shortTitle": "Futures Margin",
    "description": "Estimate initial and maintenance collateral from the current per-contract figures supplied by your broker.",
    "longDescription": "Estimate initial and maintenance collateral from the current per-contract figures supplied by your broker. Presets are illustrative, not live exchange margins. Broker intraday and overnight requirements can differ. A 20% cushion is a scenario, not a safe account recommendation.",
    "keywords": [
      "futures margin calculator",
      "futures margin requirement calculator",
      "ES margin requirement",
      "NQ margin requirement",
      "CME futures margin calculator",
      "how much margin for ES futures",
      "futures initial margin calculator",
      "futures maintenance margin calculator",
      "futures account size requirement",
      "how much to trade ES NQ futures",
      "futures margin call calculator",
      "futures capital requirement calculator"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "3,600/mo",
    "category": "futures",
    "formula": "Total initial or maintenance margin = entered margin per contract × contract count",
    "whyUse": "Estimate initial and maintenance collateral from the current per-contract figures supplied by your broker. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "If initial margin is $15,000 and maintenance is $12,000 per contract, two contracts require $30,000 initial and $24,000 maintenance margin.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Total initial or maintenance margin = entered margin per contract × contract count"
      },
      {
        "label": "Interpretation and limits",
        "text": "Presets are illustrative, not live exchange margins. Broker intraday and overnight requirements can differ. A 20% cushion is a scenario, not a safe account recommendation."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "If initial margin is $15,000 and maintenance is $12,000 per contract, two contracts require $30,000 initial and $24,000 maintenance margin."
      },
      {
        "name": "Interpret the result",
        "text": "Presets are illustrative, not live exchange margins. Broker intraday and overnight requirements can differ. A 20% cushion is a scenario, not a safe account recommendation."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Total initial or maintenance margin = entered margin per contract × contract count"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "If initial margin is $15,000 and maintenance is $12,000 per contract, two contracts require $30,000 initial and $24,000 maintenance margin."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Presets are illustrative, not live exchange margins. Broker intraday and overnight requirements can differ. A 20% cushion is a scenario, not a safe account recommendation."
      }
    ]
  },
  {
    "slug": "futures-take-profit-stop-loss-calculator",
    "title": "Futures Take Profit & Stop Loss Calculator in Ticks, Points and Dollars",
    "shortTitle": "Futures TP/SL",
    "description": "Convert chosen futures stop and target tick distances into order-reference prices and dollar exposure.",
    "longDescription": "Convert chosen futures stop and target tick distances into order-reference prices and dollar exposure. Use whole ticks and contracts. Check permitted price increments. Prices are planned references; fills, gaps and fees can change realized P&L.",
    "keywords": [
      "futures take profit stop loss calculator",
      "futures TP SL calculator",
      "ES stop loss calculator in ticks",
      "futures stop loss in dollars",
      "NQ take profit calculator",
      "futures risk reward calculator",
      "futures SL TP ticks to price",
      "futures trade planner calculator",
      "how to set stop loss futures",
      "futures tick to dollar stop loss",
      "ES NQ stop loss target calculator",
      "futures trade setup calculator"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "2,900/mo",
    "category": "futures",
    "formula": "Long stop = entry − stop ticks × tick size; long target = entry + target ticks × tick size; short signs reverse",
    "whyUse": "Convert chosen futures stop and target tick distances into order-reference prices and dollar exposure. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "For long ES entry 5000, a 10-tick stop and 20-tick target produce 4997.50 and 5005.00. One contract has $125 planned price risk and $250 reward.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Long stop = entry − stop ticks × tick size; long target = entry + target ticks × tick size; short signs reverse"
      },
      {
        "label": "Interpretation and limits",
        "text": "Use whole ticks and contracts. Check permitted price increments. Prices are planned references; fills, gaps and fees can change realized P&L."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "For long ES entry 5000, a 10-tick stop and 20-tick target produce 4997.50 and 5005.00. One contract has $125 planned price risk and $250 reward."
      },
      {
        "name": "Interpret the result",
        "text": "Use whole ticks and contracts. Check permitted price increments. Prices are planned references; fills, gaps and fees can change realized P&L."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Long stop = entry − stop ticks × tick size; long target = entry + target ticks × tick size; short signs reverse"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "For long ES entry 5000, a 10-tick stop and 20-tick target produce 4997.50 and 5005.00. One contract has $125 planned price risk and $250 reward."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Use whole ticks and contracts. Check permitted price increments. Prices are planned references; fills, gaps and fees can change realized P&L."
      }
    ]
  },
  {
    "slug": "futures-contract-value-calculator",
    "title": "Futures Contract Notional Value Calculator — ES, NQ, CL, GC All Major Contracts",
    "shortTitle": "Contract Value",
    "description": "Calculate futures notional exposure using the selected contract multiplier.",
    "longDescription": "Calculate futures notional exposure using the selected contract multiplier. Margin leverage is not account-wide effective leverage. Enter current broker collateral for the comparison; preset margin is not a live quote.",
    "keywords": [
      "futures contract value calculator",
      "futures notional value calculator",
      "ES contract value",
      "NQ contract notional value",
      "how much does one ES contract control",
      "futures leverage calculator",
      "futures position notional value",
      "CME contract value calculator",
      "futures contract size calculator",
      "how much is one futures contract worth",
      "futures exposure calculator",
      "futures dollar value per contract"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "2,400/mo",
    "category": "futures",
    "formula": "Contract notional = price × multiplier × contracts",
    "whyUse": "Calculate futures notional exposure using the selected contract multiplier. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "One ES contract at 5000 with a $50 multiplier represents $250,000 notional. With manually entered $15,000 margin, notional-to-margin leverage is about 16.67.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Contract notional = price × multiplier × contracts"
      },
      {
        "label": "Interpretation and limits",
        "text": "Margin leverage is not account-wide effective leverage. Enter current broker collateral for the comparison; preset margin is not a live quote."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "One ES contract at 5000 with a $50 multiplier represents $250,000 notional. With manually entered $15,000 margin, notional-to-margin leverage is about 16.67."
      },
      {
        "name": "Interpret the result",
        "text": "Margin leverage is not account-wide effective leverage. Enter current broker collateral for the comparison; preset margin is not a live quote."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Contract notional = price × multiplier × contracts"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "One ES contract at 5000 with a $50 multiplier represents $250,000 notional. With manually entered $15,000 margin, notional-to-margin leverage is about 16.67."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Margin leverage is not account-wide effective leverage. Enter current broker collateral for the comparison; preset margin is not a live quote."
      }
    ]
  },
  {
    "slug": "futures-roll-cost-calculator",
    "title": "Futures Contract Roll Cost Calculator — Near Month to Far Month Rollover",
    "shortTitle": "Roll Cost",
    "description": "Compare near- and far-contract exposure at a proposed futures roll.",
    "longDescription": "Compare near- and far-contract exposure at a proposed futures roll. The futures spread is not an immediate cash purchase cost or guaranteed realized loss. Closing P&L, later convergence, commissions and slippage are separate. Short exposure reverses the sign.",
    "keywords": [
      "futures roll cost calculator",
      "futures contract rollover calculator",
      "futures roll calculator",
      "ES futures roll cost",
      "NQ futures rollover",
      "how to roll futures contracts",
      "futures expiration rollover calculator",
      "quarterly futures roll calculator",
      "futures contango backwardation calculator",
      "cost to roll futures position",
      "futures near far month spread calculator",
      "futures expiry roll calculator"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "1,800/mo",
    "category": "futures",
    "formula": "Long roll exposure difference = (far price − near price) × multiplier × contracts; reverse sign for short",
    "whyUse": "Compare near- and far-contract exposure at a proposed futures roll. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "A long ES roll from a near price of 5000 to a far price of 5015 has a signed exposure difference of 15 × $50 = $750 per contract.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Long roll exposure difference = (far price − near price) × multiplier × contracts; reverse sign for short"
      },
      {
        "label": "Interpretation and limits",
        "text": "The futures spread is not an immediate cash purchase cost or guaranteed realized loss. Closing P&L, later convergence, commissions and slippage are separate. Short exposure reverses the sign."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A long ES roll from a near price of 5000 to a far price of 5015 has a signed exposure difference of 15 × $50 = $750 per contract."
      },
      {
        "name": "Interpret the result",
        "text": "The futures spread is not an immediate cash purchase cost or guaranteed realized loss. Closing P&L, later convergence, commissions and slippage are separate. Short exposure reverses the sign."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Long roll exposure difference = (far price − near price) × multiplier × contracts; reverse sign for short"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A long ES roll from a near price of 5000 to a far price of 5015 has a signed exposure difference of 15 × $50 = $750 per contract."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The futures spread is not an immediate cash purchase cost or guaranteed realized loss. Closing P&L, later convergence, commissions and slippage are separate. Short exposure reverses the sign."
      }
    ]
  },
  {
    "slug": "futures-commission-calculator",
    "title": "Futures Commission Calculator — Round Trip Cost for ES, NQ, CL, GC and All CME Contracts",
    "shortTitle": "Futures Commission",
    "description": "Project commissions from a per-side contract charge and a chosen trading schedule.",
    "longDescription": "Project commissions from a per-side contract charge and a chosen trading schedule. Enter all per-side charges you want included. Spread, slippage, data subscriptions and volume tiers are not automatically included. A round trip includes entry and exit.",
    "keywords": [
      "futures commission calculator",
      "futures trading commission calculator",
      "ES commission calculator",
      "NQ commission per trade",
      "futures round trip cost calculator",
      "how much commission for futures",
      "futures broker fee calculator",
      "CME futures commission cost",
      "futures trading cost calculator",
      "futures commission per contract",
      "daily futures commission calculator",
      "futures transaction cost calculator"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "2,200/mo",
    "category": "futures",
    "formula": "Round-trip commission = per-side commission × 2 × contracts; monthly cost = round-trip × trades/day × trading days",
    "whyUse": "Project commissions from a per-side contract charge and a chosen trading schedule. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At $1.50 per side, one contract costs $3 per round trip. Five round trips per day over 21 days cost $315.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Round-trip commission = per-side commission × 2 × contracts; monthly cost = round-trip × trades/day × trading days"
      },
      {
        "label": "Interpretation and limits",
        "text": "Enter all per-side charges you want included. Spread, slippage, data subscriptions and volume tiers are not automatically included. A round trip includes entry and exit."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At $1.50 per side, one contract costs $3 per round trip. Five round trips per day over 21 days cost $315."
      },
      {
        "name": "Interpret the result",
        "text": "Enter all per-side charges you want included. Spread, slippage, data subscriptions and volume tiers are not automatically included. A round trip includes entry and exit."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Round-trip commission = per-side commission × 2 × contracts; monthly cost = round-trip × trades/day × trading days"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At $1.50 per side, one contract costs $3 per round trip. Five round trips per day over 21 days cost $315."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Enter all per-side charges you want included. Spread, slippage, data subscriptions and volume tiers are not automatically included. A round trip includes entry and exit."
      }
    ]
  },
  {
    "slug": "futures-break-even-calculator",
    "title": "Futures Break-Even Calculator — Ticks Needed to Cover Commission and Fees",
    "shortTitle": "Futures Break-Even",
    "description": "Find the minimum whole futures tick movement that covers the entered commission.",
    "longDescription": "Find the minimum whole futures tick movement that covers the entered commission. The unrounded cost-equivalent can be fractional, but executable price increments use whole ticks. No spread or slippage is included. Multiple identical contracts scale both fees and tick value.",
    "keywords": [
      "futures break even calculator",
      "futures ticks to break even",
      "ES break even ticks calculator",
      "NQ break even point calculator",
      "futures commission break even",
      "how many ticks to cover commission futures",
      "futures minimum profit ticks",
      "ES NQ break even after fees",
      "futures scalping break even calculator",
      "futures trade break even point",
      "ticks needed to profit futures",
      "futures net zero calculator"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "1,900/mo",
    "category": "futures",
    "formula": "Minimum whole break-even ticks = ceiling(round-trip commission / total tick value)",
    "whyUse": "Find the minimum whole futures tick movement that covers the entered commission. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "At $1.50 per side, an ES contract costs $3 round trip. Its $12.50 tick means one whole favorable tick covers the commission before other costs.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Minimum whole break-even ticks = ceiling(round-trip commission / total tick value)"
      },
      {
        "label": "Interpretation and limits",
        "text": "The unrounded cost-equivalent can be fractional, but executable price increments use whole ticks. No spread or slippage is included. Multiple identical contracts scale both fees and tick value."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "At $1.50 per side, an ES contract costs $3 round trip. Its $12.50 tick means one whole favorable tick covers the commission before other costs."
      },
      {
        "name": "Interpret the result",
        "text": "The unrounded cost-equivalent can be fractional, but executable price increments use whole ticks. No spread or slippage is included. Multiple identical contracts scale both fees and tick value."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Minimum whole break-even ticks = ceiling(round-trip commission / total tick value)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "At $1.50 per side, an ES contract costs $3 round trip. Its $12.50 tick means one whole favorable tick covers the commission before other costs."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The unrounded cost-equivalent can be fractional, but executable price increments use whole ticks. No spread or slippage is included. Multiple identical contracts scale both fees and tick value."
      }
    ]
  },
  {
    "slug": "futures-risk-reward-calculator",
    "title": "Futures Risk Reward Ratio Calculator — Ticks, Points and Dollars for ES, NQ and All CME Contracts",
    "shortTitle": "Futures Risk/Reward",
    "description": "Compare futures stop and target distances in ticks and dollars.",
    "longDescription": "Compare futures stop and target distances in ticks and dollars. Tick distances and contract count must be whole numbers. Targets do not imply realized win probability. The ratio excludes commissions and slippage.",
    "keywords": [
      "futures risk reward calculator",
      "futures risk reward ratio calculator",
      "ES risk reward calculator",
      "NQ risk reward ratio",
      "futures RR calculator ticks",
      "futures trade risk reward",
      "futures stop loss take profit ratio",
      "CME futures risk reward tool",
      "futures trading R ratio calculator",
      "futures risk return calculator",
      "futures win rate break even calculator",
      "futures trade quality calculator"
    ],
    "assets": [
      "futures"
    ],
    "searchVolume": "2,100/mo",
    "category": "futures",
    "formula": "Reward multiple = target ticks / stop ticks; dollar risk = stop ticks × tick value × contracts",
    "whyUse": "Compare futures stop and target distances in ticks and dollars. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "For one ES contract, a 10-tick stop risks $125 before costs and a 20-tick target represents $250: planned risk:reward 1:2.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Reward multiple = target ticks / stop ticks; dollar risk = stop ticks × tick value × contracts"
      },
      {
        "label": "Interpretation and limits",
        "text": "Tick distances and contract count must be whole numbers. Targets do not imply realized win probability. The ratio excludes commissions and slippage."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "For one ES contract, a 10-tick stop risks $125 before costs and a 20-tick target represents $250: planned risk:reward 1:2."
      },
      {
        "name": "Interpret the result",
        "text": "Tick distances and contract count must be whole numbers. Targets do not imply realized win probability. The ratio excludes commissions and slippage."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Reward multiple = target ticks / stop ticks; dollar risk = stop ticks × tick value × contracts"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "For one ES contract, a 10-tick stop risks $125 before costs and a 20-tick target represents $250: planned risk:reward 1:2."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Tick distances and contract count must be whole numbers. Targets do not imply realized win probability. The ratio excludes commissions and slippage."
      }
    ]
  },
  {
    "slug": "prop-firm-trailing-drawdown-calculator",
    "title": "Prop Firm Trailing Drawdown Calculator — FTMO, TopStep, Apex",
    "shortTitle": "Trailing Drawdown",
    "description": "Compare current equity with a chosen fixed or uncapped trailing loss floor.",
    "longDescription": "Compare current equity with a chosen fixed or uncapped trailing loss floor. This does not model capped or locked trailing floors, payouts, or provider-specific intraday/EOD marks. Enter the high-water value recognized by your account agreement and include open P&L where required.",
    "keywords": [
      "prop firm trailing drawdown calculator",
      "FTMO trailing drawdown calculator",
      "TopStep trailing drawdown calculator",
      "Apex trailing drawdown calculator",
      "prop firm drawdown floor calculator",
      "funded account trailing drawdown",
      "prop firm max drawdown calculator",
      "trailing drawdown prop firm tool",
      "FTMO drawdown calculator free",
      "prop firm balance floor calculator"
    ],
    "assets": [
      "forex",
      "futures"
    ],
    "searchVolume": "3,200/mo",
    "category": "propfirm",
    "formula": "Trailing floor = qualifying peak − initial balance × loss fraction; fixed floor = initial balance − same allowance",
    "whyUse": "Compare current equity with a chosen fixed or uncapped trailing loss floor. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "For a $100,000 start and $10,000 allowance, a qualifying peak of $102,000 gives an uncapped trailing floor of $92,000. A fixed floor remains $90,000.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Trailing floor = qualifying peak − initial balance × loss fraction; fixed floor = initial balance − same allowance"
      },
      {
        "label": "Interpretation and limits",
        "text": "This does not model capped or locked trailing floors, payouts, or provider-specific intraday/EOD marks. Enter the high-water value recognized by your account agreement and include open P&L where required."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "For a $100,000 start and $10,000 allowance, a qualifying peak of $102,000 gives an uncapped trailing floor of $92,000. A fixed floor remains $90,000."
      },
      {
        "name": "Interpret the result",
        "text": "This does not model capped or locked trailing floors, payouts, or provider-specific intraday/EOD marks. Enter the high-water value recognized by your account agreement and include open P&L where required."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Trailing floor = qualifying peak − initial balance × loss fraction; fixed floor = initial balance − same allowance"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "For a $100,000 start and $10,000 allowance, a qualifying peak of $102,000 gives an uncapped trailing floor of $92,000. A fixed floor remains $90,000."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "This does not model capped or locked trailing floors, payouts, or provider-specific intraday/EOD marks. Enter the high-water value recognized by your account agreement and include open P&L where required."
      }
    ]
  },
  {
    "slug": "prop-firm-daily-loss-limit-calculator",
    "title": "Prop Firm Daily Loss Limit Calculator — Track Your Remaining Room",
    "shortTitle": "Daily Loss Limit",
    "description": "Subtract already-counted losses from a manually specified daily allowance.",
    "longDescription": "Subtract already-counted losses from a manually specified daily allowance. A universal 5% rule is unreliable: account products and phases differ. Confirm the current provider terms, reset timezone, equity treatment and overall drawdown rule. A result of zero remaining room means no positive budget under the model. Planned stop losses and buffers cannot guarantee compliance through slippage.",
    "keywords": [
      "prop firm daily loss limit calculator",
      "FTMO daily loss limit calculator",
      "prop firm daily drawdown calculator",
      "funded account daily loss tracker",
      "prop firm max daily loss calculator",
      "daily loss limit prop trading",
      "FTMO 5% daily loss calculator",
      "prop firm breach calculator daily",
      "daily trading loss limit tool",
      "prop firm how much can I lose today"
    ],
    "assets": [
      "forex",
      "futures"
    ],
    "searchVolume": "2,800/mo",
    "category": "propfirm",
    "formula": "Remaining daily room = max(0, reference balance × limit fraction − counted losses)",
    "whyUse": "Subtract already-counted losses from a manually specified daily allowance. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "For an illustrative $100,000 reference balance and 3% daily allowance, the limit is $3,000. If $1,200 is already counted as lost, $1,800 remains before other exposure. Allocating 50% of that leaves $900 rather than using the entire hard boundary.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Remaining daily room = max(0, reference balance × limit fraction − counted losses)"
      },
      {
        "label": "Interpretation and limits",
        "text": "A universal 5% rule is unreliable: account products and phases differ. Confirm the current provider terms, reset timezone, equity treatment and overall drawdown rule. A result of zero remaining room means no positive budget under the model. Planned stop losses and buffers cannot guarantee compliance through slippage."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "For an illustrative $100,000 reference balance and 3% daily allowance, the limit is $3,000. If $1,200 is already counted as lost, $1,800 remains before other exposure. Allocating 50% of that leaves $900 rather than using the entire hard boundary."
      },
      {
        "name": "Interpret the result",
        "text": "A universal 5% rule is unreliable: account products and phases differ. Confirm the current provider terms, reset timezone, equity treatment and overall drawdown rule. A result of zero remaining room means no positive budget under the model. Planned stop losses and buffers cannot guarantee compliance through slippage."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Remaining daily room = max(0, reference balance × limit fraction − counted losses)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "For an illustrative $100,000 reference balance and 3% daily allowance, the limit is $3,000. If $1,200 is already counted as lost, $1,800 remains before other exposure. Allocating 50% of that leaves $900 rather than using the entire hard boundary."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "A universal 5% rule is unreliable: account products and phases differ. Confirm the current provider terms, reset timezone, equity treatment and overall drawdown rule. A result of zero remaining room means no positive budget under the model. Planned stop losses and buffers cannot guarantee compliance through slippage."
      }
    ]
  },
  {
    "slug": "prop-firm-profit-target-calculator",
    "title": "Prop Firm Profit Target Calculator — FTMO 8%, 10% Challenge Tracker",
    "shortTitle": "Profit Target",
    "description": "Calculate the remaining profit target and a hypothetical daily pace.",
    "longDescription": "Calculate the remaining profit target and a hypothetical daily pace. Targets are independent of loss allowances. Custom target input overrides phase examples. A projected average is not expected income, and reaching the target does not satisfy every evaluation rule.",
    "keywords": [
      "prop firm profit target calculator",
      "FTMO profit target calculator",
      "prop firm challenge calculator",
      "FTMO 8 percent profit calculator",
      "FTMO 10 percent target calculator",
      "prop firm pass calculator",
      "funded account profit target tracker",
      "prop firm challenge how many days",
      "FTMO phase 1 calculator",
      "TopStep profit target calculator",
      "prop firm challenge completion calculator",
      "funded account target calculator"
    ],
    "assets": [
      "forex",
      "futures"
    ],
    "searchVolume": "2,800/mo",
    "category": "propfirm",
    "formula": "Remaining target = max(0, account size × target fraction − earned profit); required daily pace = remaining / days",
    "whyUse": "Calculate the remaining profit target and a hypothetical daily pace. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "A $100,000 account with a 10% target needs $10,000. After $3,000 earned, $7,000 remains; across 20 days that is $350 per day.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Remaining target = max(0, account size × target fraction − earned profit); required daily pace = remaining / days"
      },
      {
        "label": "Interpretation and limits",
        "text": "Targets are independent of loss allowances. Custom target input overrides phase examples. A projected average is not expected income, and reaching the target does not satisfy every evaluation rule."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A $100,000 account with a 10% target needs $10,000. After $3,000 earned, $7,000 remains; across 20 days that is $350 per day."
      },
      {
        "name": "Interpret the result",
        "text": "Targets are independent of loss allowances. Custom target input overrides phase examples. A projected average is not expected income, and reaching the target does not satisfy every evaluation rule."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Remaining target = max(0, account size × target fraction − earned profit); required daily pace = remaining / days"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A $100,000 account with a 10% target needs $10,000. After $3,000 earned, $7,000 remains; across 20 days that is $350 per day."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Targets are independent of loss allowances. Custom target input overrides phase examples. A projected average is not expected income, and reaching the target does not satisfy every evaluation rule."
      }
    ]
  },
  {
    "slug": "prop-firm-consistency-rule-calculator",
    "title": "Prop Firm Consistency Rule Calculator — FTMO & FundedNext Check",
    "shortTitle": "Consistency Rule",
    "description": "Calculate a best-day consistency ratio and the additional qualifying profit needed under an entered percentage rule.",
    "longDescription": "Calculate a best-day consistency ratio and the additional qualifying profit needed under an entered percentage rule. Some products use net total profit while others use positive-day totals, and rules may change by start date. Exceeding a ratio is not universally an account breach or reduced-payout penalty. Check official conditions and all other payout requirements. One large winning day does not by itself prove poor discipline or oversized risk.",
    "keywords": [
      "prop firm consistency rule calculator",
      "FTMO consistency rule calculator",
      "FundedNext consistency rule calculator",
      "prop firm consistency check",
      "funded account consistency calculator",
      "prop firm 30 percent rule calculator",
      "prop firm best day rule calculator",
      "consistency rule prop trading tool",
      "FTMO pass consistency rule",
      "prop firm payout consistency calculator"
    ],
    "assets": [
      "forex",
      "futures"
    ],
    "searchVolume": "1,900/mo",
    "category": "propfirm",
    "formula": "Minimum qualifying total = best-day profit / rule fraction; additional needed = max(0, minimum total − current qualifying total)",
    "whyUse": "Calculate a best-day consistency ratio and the additional qualifying profit needed under an entered percentage rule. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "Under a hypothetical 30% rule with $3,000 best-day profit and $8,000 qualifying total, score is 37.5%. The required total is $10,000, so $2,000 additional qualifying profit would be needed if the best day stays unchanged. This does not predict how many trades or days are needed.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Minimum qualifying total = best-day profit / rule fraction; additional needed = max(0, minimum total − current qualifying total)"
      },
      {
        "label": "Interpretation and limits",
        "text": "Some products use net total profit while others use positive-day totals, and rules may change by start date. Exceeding a ratio is not universally an account breach or reduced-payout penalty. Check official conditions and all other payout requirements. One large winning day does not by itself prove poor discipline or oversized risk."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Under a hypothetical 30% rule with $3,000 best-day profit and $8,000 qualifying total, score is 37.5%. The required total is $10,000, so $2,000 additional qualifying profit would be needed if the best day stays unchanged. This does not predict how many trades or days are needed."
      },
      {
        "name": "Interpret the result",
        "text": "Some products use net total profit while others use positive-day totals, and rules may change by start date. Exceeding a ratio is not universally an account breach or reduced-payout penalty. Check official conditions and all other payout requirements. One large winning day does not by itself prove poor discipline or oversized risk."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Minimum qualifying total = best-day profit / rule fraction; additional needed = max(0, minimum total − current qualifying total)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Under a hypothetical 30% rule with $3,000 best-day profit and $8,000 qualifying total, score is 37.5%. The required total is $10,000, so $2,000 additional qualifying profit would be needed if the best day stays unchanged. This does not predict how many trades or days are needed."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Some products use net total profit while others use positive-day totals, and rules may change by start date. Exceeding a ratio is not universally an account breach or reduced-payout penalty. Check official conditions and all other payout requirements. One large winning day does not by itself prove poor discipline or oversized risk."
      }
    ]
  },
  {
    "slug": "prop-firm-challenge-pass-rate-calculator",
    "title": "Prop Firm Challenge Pass Rate Calculator — Monte Carlo Simulator",
    "shortTitle": "Challenge Pass Rate",
    "description": "Explore how assumed independent trade outcomes interact with simplified challenge limits.",
    "longDescription": "Explore how assumed independent trade outcomes interact with simplified challenge limits. Fixed initial-capital floor, daily closed-P&L limits, 30 days and target checked at day-end. Touching a loss boundary fails. No trailing floor, costs, correlation, consistency or minimum days. Reproducible simulation estimates are not actual provider pass probabilities.",
    "keywords": [
      "prop firm challenge pass rate calculator",
      "FTMO pass rate calculator",
      "prop firm Monte Carlo simulator",
      "prop firm probability calculator",
      "FTMO challenge success probability",
      "prop firm win rate calculator",
      "funded account pass probability",
      "prop firm challenge simulator",
      "FTMO statistics calculator",
      "prop firm risk of blowout calculator",
      "prop firm challenge outcome calculator",
      "TopStep pass rate calculator"
    ],
    "assets": [
      "forex",
      "futures"
    ],
    "searchVolume": "2,400/mo",
    "category": "propfirm",
    "formula": "Seeded simulation: 500 independent paths × 30 days; fixed-dollar outcomes, fixed total loss floor and daily closed-P&L limit",
    "whyUse": "Explore how assumed independent trade outcomes interact with simplified challenge limits. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "A model winning every trade can reach a target if the stated horizon allows enough gains; a model losing every trade cannot. Intermediate cases are estimated from 500 seeded paths.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Seeded simulation: 500 independent paths × 30 days; fixed-dollar outcomes, fixed total loss floor and daily closed-P&L limit"
      },
      {
        "label": "Interpretation and limits",
        "text": "Fixed initial-capital floor, daily closed-P&L limits, 30 days and target checked at day-end. Touching a loss boundary fails. No trailing floor, costs, correlation, consistency or minimum days. Reproducible simulation estimates are not actual provider pass probabilities."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A model winning every trade can reach a target if the stated horizon allows enough gains; a model losing every trade cannot. Intermediate cases are estimated from 500 seeded paths."
      },
      {
        "name": "Interpret the result",
        "text": "Fixed initial-capital floor, daily closed-P&L limits, 30 days and target checked at day-end. Touching a loss boundary fails. No trailing floor, costs, correlation, consistency or minimum days. Reproducible simulation estimates are not actual provider pass probabilities."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Seeded simulation: 500 independent paths × 30 days; fixed-dollar outcomes, fixed total loss floor and daily closed-P&L limit"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A model winning every trade can reach a target if the stated horizon allows enough gains; a model losing every trade cannot. Intermediate cases are estimated from 500 seeded paths."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Fixed initial-capital floor, daily closed-P&L limits, 30 days and target checked at day-end. Touching a loss boundary fails. No trailing floor, costs, correlation, consistency or minimum days. Reproducible simulation estimates are not actual provider pass probabilities."
      }
    ]
  },
  {
    "slug": "prop-firm-position-size-calculator",
    "title": "Prop Firm Position Size Calculator — Stay Within Daily Loss Limit",
    "shortTitle": "Prop Firm Position Size",
    "description": "Estimate a forex quantity from remaining daily loss room and an entered allocation percentage.",
    "longDescription": "Estimate a forex quantity from remaining daily loss room and an entered allocation percentage. Rules differ by firm, product, phase and start date, including whether open P&L, commissions and swaps count. Reset times and trailing floors matter. TradeCalc’s prop sizing tool estimates daily capacity, not a recommended position or a guarantee of compliance. Check your current agreement before trading. The displayed quantity uses a 0.01-lot step and must be reduced further if per-trade or overall risk limits require it.",
    "keywords": [
      "prop firm position size calculator",
      "FTMO position size calculator",
      "funded account lot size calculator",
      "prop firm max lot size calculator",
      "prop firm daily loss position sizing",
      "FTMO max position size calculator",
      "prop firm risk management calculator",
      "funded account position size tool",
      "prop firm lot size risk calculator",
      "TopStep position size calculator",
      "prop firm contracts per trade calculator",
      "funded trader position sizing tool"
    ],
    "assets": [
      "forex",
      "futures"
    ],
    "searchVolume": "3,100/mo",
    "category": "propfirm",
    "formula": "Daily-capacity lots = floor to 0.01 of [(daily allowance − counted losses) × allocation fraction] / (stop pips × pip value)",
    "whyUse": "Estimate a forex quantity from remaining daily loss room and an entered allocation percentage. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "Suppose an illustrative daily allowance is $500 and counted losses are $150: remaining room is $350. Allocating 50% of that leaves $175 for further planned risk. At a 20-pip EUR/USD stop and $10 per pip per lot, 0.87 lots represents $174 before costs. An overall limit or lower personal cap could require less.",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Daily-capacity lots = floor to 0.01 of [(daily allowance − counted losses) × allocation fraction] / (stop pips × pip value)"
      },
      {
        "label": "Interpretation and limits",
        "text": "Rules differ by firm, product, phase and start date, including whether open P&L, commissions and swaps count. Reset times and trailing floors matter. TradeCalc’s prop sizing tool estimates daily capacity, not a recommended position or a guarantee of compliance. Check your current agreement before trading. The displayed quantity uses a 0.01-lot step and must be reduced further if per-trade or overall risk limits require it."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "Suppose an illustrative daily allowance is $500 and counted losses are $150: remaining room is $350. Allocating 50% of that leaves $175 for further planned risk. At a 20-pip EUR/USD stop and $10 per pip per lot, 0.87 lots represents $174 before costs. An overall limit or lower personal cap could require less."
      },
      {
        "name": "Interpret the result",
        "text": "Rules differ by firm, product, phase and start date, including whether open P&L, commissions and swaps count. Reset times and trailing floors matter. TradeCalc’s prop sizing tool estimates daily capacity, not a recommended position or a guarantee of compliance. Check your current agreement before trading. The displayed quantity uses a 0.01-lot step and must be reduced further if per-trade or overall risk limits require it."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Daily-capacity lots = floor to 0.01 of [(daily allowance − counted losses) × allocation fraction] / (stop pips × pip value)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "Suppose an illustrative daily allowance is $500 and counted losses are $150: remaining room is $350. Allocating 50% of that leaves $175 for further planned risk. At a 20-pip EUR/USD stop and $10 per pip per lot, 0.87 lots represents $174 before costs. An overall limit or lower personal cap could require less."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "Rules differ by firm, product, phase and start date, including whether open P&L, commissions and swaps count. Reset times and trailing floors matter. TradeCalc’s prop sizing tool estimates daily capacity, not a recommended position or a guarantee of compliance. Check your current agreement before trading. The displayed quantity uses a 0.01-lot step and must be reduced further if per-trade or overall risk limits require it."
      }
    ]
  },
  {
    "slug": "prop-firm-account-size-finder",
    "title": "Prop Firm Account Size Finder — Which Funded Account Fits Your Trading?",
    "shortTitle": "Account Size Finder",
    "description": "Explore nominal account sizes under a hypothetical return and payout split.",
    "longDescription": "Explore nominal account sizes under a hypothetical return and payout split. The return is not a forecast or realistic-income claim. Fees, taxes, loss limits and payout eligibility are excluded. If the calculated requirement exceeds all listed tiers, the tool says so rather than recommending an insufficient account.",
    "keywords": [
      "prop firm account size finder",
      "which prop firm account size should I choose",
      "prop firm account size calculator",
      "FTMO account size calculator",
      "funded account size recommender",
      "prop firm $10k vs $100k calculator",
      "prop firm account size quiz",
      "what size prop firm account do I need",
      "funded trading account size tool",
      "prop firm income calculator",
      "FTMO $50k vs $100k calculator",
      "prop firm challenge size calculator"
    ],
    "assets": [
      "forex",
      "futures"
    ],
    "searchVolume": "1,700/mo",
    "category": "propfirm",
    "formula": "Required nominal account = hypothetical monthly payout / (hypothetical return fraction × payout fraction)",
    "whyUse": "Explore nominal account sizes under a hypothetical return and payout split. Compare the displayed result with the worked example and confirm the assumptions before using it.",
    "workedExample": "A $2,000 hypothetical monthly payout at a 5% scenario return and 80% payout requires $50,000 nominal capital: 2000 / (0.05 × 0.8).",
    "resultsExplained": [
      {
        "label": "Calculation basis",
        "text": "Required nominal account = hypothetical monthly payout / (hypothetical return fraction × payout fraction)"
      },
      {
        "label": "Interpretation and limits",
        "text": "The return is not a forecast or realistic-income claim. Fees, taxes, loss limits and payout eligibility are excluded. If the calculated requirement exceeds all listed tiers, the tool says so rather than recommending an insufficient account."
      }
    ],
    "howToSteps": [
      {
        "name": "Enter the stated inputs",
        "text": "Use the units shown next to each field. Replace sample rates and rules with values applicable to your instrument and account."
      },
      {
        "name": "Check a worked example",
        "text": "A $2,000 hypothetical monthly payout at a 5% scenario return and 80% payout requires $50,000 nominal capital: 2000 / (0.05 × 0.8)."
      },
      {
        "name": "Interpret the result",
        "text": "The return is not a forecast or realistic-income claim. Fees, taxes, loss limits and payout eligibility are excluded. If the calculated requirement exceeds all listed tiers, the tool says so rather than recommending an insufficient account."
      }
    ],
    "faqs": [
      {
        "q": "How is this calculated?",
        "a": "Required nominal account = hypothetical monthly payout / (hypothetical return fraction × payout fraction)"
      },
      {
        "q": "What example can I use to check the arithmetic?",
        "a": "A $2,000 hypothetical monthly payout at a 5% scenario return and 80% payout requires $50,000 nominal capital: 2000 / (0.05 × 0.8)."
      },
      {
        "q": "What assumptions or limitations matter?",
        "a": "The return is not a forecast or realistic-income claim. Fees, taxes, loss limits and payout eligibility are excluded. If the calculated requirement exceeds all listed tiers, the tool says so rather than recommending an insufficient account."
      }
    ]
  }
];

export function getCalculatorBySlug(slug: string): CalculatorMeta | undefined {
  return CALCULATORS.find(c => c.slug === slug);
}

export function getRelatedCalculators(slug: string, limit = 4): CalculatorMeta[] {
  const current = getCalculatorBySlug(slug);
  if (!current) return CALCULATORS.slice(0, limit);
  return CALCULATORS
    .filter(c => c.slug !== slug)
    .sort((a, b) => {
      const aShare = a.assets.filter(x => current.assets.includes(x)).length;
      const bShare = b.assets.filter(x => current.assets.includes(x)).length;
      const aCat = a.category === current.category ? 1 : 0;
      const bCat = b.category === current.category ? 1 : 0;
      return (bShare + bCat) - (aShare + aCat);
    })
    .slice(0, limit);
}
