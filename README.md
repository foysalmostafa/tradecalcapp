# TradeCalc — Free Trading Calculators

**Live site:** https://tradecalcapp.com  
**Cloudflare project:** tradecalcapp (tradecalcapp.pages.dev)  
**Author:** Foysal Mostafa  
**Contact email:** contact.tradecalc@gmail.com  

---

## Tech Stack

- **Framework:** Next.js 16.3.0 (App Router, SSG/Static Export)
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Deployment:** Cloudflare Pages (drag & drop `out` folder)
- **Analytics:** Google Analytics 4 — ID: `G-H7SKCMXRYL`

---

## How to Run Locally

```bash
cd "C:\Users\mdarafatgazi\Desktop\trading-calculator"
npm run dev
```
Site runs at http://localhost:3001 (port 3000 may conflict — Next.js auto-switches to 3001)

---

## How to Build & Deploy

### 1. Build
```bash
npm run build
```
Creates the `out` folder (static export, 152 pages).

### 2. Deploy to Cloudflare Pages
1. Go to https://dash.cloudflare.com
2. Workers & Pages → `tradecalcapp` → **Create deployment**
3. Upload the `out` folder → Save and deploy

> `public/_redirects` is automatically copied into `out/` on every build — no manual step needed.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home page
│   ├── layout.tsx          # Root layout (GA4 included)
│   ├── about/              # About page
│   ├── blog/               # Blog listing + posts
│   ├── calculators/        # Calculators hub + [slug] pages
│   ├── contact/            # Contact page (noindex — intentional)
│   ├── privacy/            # Privacy policy
│   ├── sitemap.ts          # Auto-generates sitemap.xml
│   └── robots.ts           # Auto-generates robots.txt
├── components/             # Reusable components
│   ├── Header.tsx          # Mega dropdown nav
│   ├── Footer.tsx          # Footer with links
│   └── calculators/        # Calculator widgets
│       ├── GenericCalc.tsx       # All 46 generic calculator components
│       ├── PositionSizeCalc.tsx  # Position size (forex/stocks/crypto)
│       ├── ProfitLossCalc.tsx    # Profit & loss (forex/stocks/crypto)
│       └── PipValueCalc.tsx      # Pip value with reference table
└── lib/
    ├── seo.ts              # SITE + AUTHOR constants
    ├── blog.ts             # All blog posts (live + drafts)
    ├── calculators.ts      # All 53 calculator metadata entries
    └── schema.ts           # JSON-LD schemas
public/
├── _redirects              # Cloudflare Pages redirect rules (HTTP → HTTPS canonical)
├── foysal-mostafa.jpeg     # Author photo
└── blog/                   # Blog post images
```

---

## Redirects (Canonical URL Enforcement)

`public/_redirects` forces all traffic to `https://tradecalcapp.com` (no www, HTTPS only):

```
http://tradecalcapp.com/*      → https://tradecalcapp.com/:splat  301
http://www.tradecalcapp.com/*  → https://tradecalcapp.com/:splat  301
https://www.tradecalcapp.com/* → https://tradecalcapp.com/:splat  301
```

This file is picked up automatically by Cloudflare Pages. No extra configuration needed.

---

## 53 Calculators

All formulas verified correct — Sep 2026 logic audit.

### Original 12 — Forex Core
1. Position Size Calculator
2. Pip Value Calculator
3. Profit / Loss Calculator
4. Margin Calculator
5. Risk / Reward Calculator
6. Lot Size Calculator
7. Compounding Calculator
8. Drawdown Calculator
9. Average Down Calculator
10. Break-Even Calculator
11. Currency Converter
12. Pip to Dollar Calculator

### Batch 1 — Risk & Utility (Added Aug 2026)
13. Swap / Rollover Calculator
14. Pivot Point Calculator
15. Fibonacci Calculator
16. Leverage Calculator
17. Risk of Ruin Calculator
18. Kelly Criterion Calculator
19. Win Rate Calculator
20. Gain & Loss % Calculator
21. Consistency Rule Calculator (prop firm)

### Batch 2 — Multi-Asset (Added Aug 2026)
22. XAU/USD Pip Calculator
23. Rebate Calculator
24. Stock Profit Calculator
25. Crypto Profit Calculator
26. Martingale Calculator
27. Liquidation Price Calculator
28. Funding Rate Calculator
29. Spread Cost Calculator
30. Profit Factor Calculator
31. ATR Stop Loss Calculator
32. Options Profit Calculator
33. Pip Difference Calculator
34. CAGR Calculator
35. Daily Loss Limit Calculator
36. Dividend Yield Calculator

### Batch 3 — Futures (Added Aug 2026)
37. Futures Tick Value Calculator
38. Futures Position Size Calculator
39. Futures Profit / Loss Calculator
40. Futures Margin Requirement Calculator
41. Futures Take Profit & Stop Loss Calculator
42. Futures Contract Value Calculator
43. Futures Roll Cost Calculator
44. Futures Commission Calculator
45. Futures Break-Even Calculator
46. Futures Risk / Reward Calculator

### Batch 4 — Prop Firm Tools (Added Aug 2026)
47. Prop Firm Trailing Drawdown Calculator
48. Prop Firm Daily Loss Limit Calculator
49. Prop Firm Profit Target Calculator
50. Prop Firm Consistency Rule Calculator
51. Prop Firm Challenge Pass Rate Calculator
52. Prop Firm Position Size Calculator
53. Prop Firm Account Size Finder

> **To add a new calculator:** add metadata to `src/lib/calculators.ts` → add component to `src/components/calculators/GenericCalc.tsx` → register in `src/app/calculators/[slug]/page.tsx` → rebuild.

---

## Blog Posts

### 17 LIVE posts
- how-to-calculate-position-size-forex
- what-is-pip-value-how-to-calculate
- how-to-calculate-profit-loss-forex
- how-to-calculate-risk-reward-ratio *(GSC-optimized 2026-08-29)*
- how-to-calculate-forex-margin
- lot-size-calculator-guide
- forex-compounding-calculator-guide
- how-to-calculate-drawdown-trading
- best-forex-position-size-calculators
- what-is-spread-in-forex
- mt4-position-size-calculator
- what-is-a-stop-loss-in-forex
- what-is-a-pip-in-forex *(GSC-optimized 2026-08-29)*
- forex-lot-sizes-explained *(GSC-optimized 2026-08-29)*
- break-even-calculator-guide
- currency-converter-for-traders
- pip-to-dollar-how-much-is-a-pip-worth

### 45 DRAFT posts (hidden — publish gradually)
Located in `src/lib/blog.ts`, each marked `draft: true`.

**To publish a draft:**
1. Open `src/lib/blog.ts`
2. Find the post by slug
3. Remove the `draft: true` line
4. Set `publishedAt` and `updatedAt` to today's date (e.g. `'2026-09-07'`)
5. Run `npm run build` → upload new `out` folder to Cloudflare Pages

---

## GSC Optimization Log

Pages optimized using Google Search Console data (striking distance: pos 4–50).  
All changes are in `src/lib/calculators.ts`, `src/lib/blog.ts`, or `src/app/calculators/page.tsx`.

| Date | Page | File |
|---|---|---|
| Aug 2026 | `/calculators/pip-to-dollar-calculator` | calculators.ts |
| Aug 2026 | `/calculators/compounding-calculator` | calculators.ts |
| Aug 2026 | `/calculators/pip-value-calculator` | calculators.ts |
| Aug 2026 | `/calculators/lot-size-calculator` | calculators.ts |
| 2026-08-29 | `/blog/how-to-calculate-risk-reward-ratio` | blog.ts |
| 2026-08-29 | `/blog/forex-lot-sizes-explained` | blog.ts |
| 2026-08-29 | `/blog/what-is-a-pip-in-forex` | blog.ts |
| 2026-08-29 | `/calculators` (hub page) | calculators/page.tsx |
| 2026-08-29 | `/calculators/risk-reward-calculator` | calculators.ts |
| 2026-08-29 | `/calculators/dividend-yield-calculator` | calculators.ts |
| Sep 2026 | All 53 `longDescription` fields rewritten | calculators.ts |

**GSC workflow:** Drop Excel export in `C:\Users\mdarafatgazi\Downloads\Tradecalc\` → Claude parses it → analyzes striking distance → implements → verify on localhost:3001 → deploy.

---

## Important URLs

| Service | URL |
|---|---|
| Live site | https://tradecalcapp.com |
| Sitemap | https://tradecalcapp.com/sitemap.xml |
| Robots | https://tradecalcapp.com/robots.txt |
| Cloudflare Dashboard | https://dash.cloudflare.com |
| Google Search Console | https://search.google.com/search-console |
| Google Analytics | https://analytics.google.com |
| Bing Webmaster | https://bing.com/webmasters |

---

## SEO Setup

- **Domain:** tradecalcapp.com (canonical — no www, HTTPS only)
- **Sitemap:** https://tradecalcapp.com/sitemap.xml
- **Robots:** https://tradecalcapp.com/robots.txt
- **Google Search Console:** Verified ✅
- **Bing Webmaster:** Verified ✅
- **Google Analytics:** G-H7SKCMXRYL ✅
- **Contact page:** noindex (intentional — no SEO value)
- **Redirects:** HTTP and www variants all 301 → canonical (via `public/_redirects`)

---

## Key Files to Know

| File | Purpose |
|---|---|
| `src/lib/seo.ts` | Site name, URL, author info |
| `src/lib/blog.ts` | All blog posts (17 live + 45 drafts) |
| `src/lib/calculators.ts` | All 53 calculator metadata entries |
| `src/components/calculators/GenericCalc.tsx` | 46 generic calculator React components |
| `src/components/calculators/PositionSizeCalc.tsx` | Position size calculator (multi-asset) |
| `src/components/calculators/ProfitLossCalc.tsx` | Profit/loss calculator (multi-asset) |
| `src/components/calculators/PipValueCalc.tsx` | Pip value calculator with reference table |
| `src/app/calculators/[slug]/page.tsx` | Calculator page template + CALC_COMPONENT map |
| `src/app/calculators/[slug]/opengraph-image.tsx` | OG image for each calculator |
| `src/app/calculators/page.tsx` | Calculators hub — title, description, Most Used row |
| `src/app/page.tsx` | Homepage |
| `src/app/layout.tsx` | GA4 tracking code |
| `src/app/sitemap.ts` | Sitemap generation |
| `public/_redirects` | Cloudflare Pages redirect rules (canonical enforcement) |
| `public/foysal-mostafa.jpeg` | Author photo |
| `src/app/icon.svg` | Favicon |

---

## Changelog

| Date | Change |
|---|---|
| Sep 2026 | All 53 `longDescription` fields rewritten — varied opening patterns, concise 2–3 sentences |
| Sep 2026 | H1 font size reduced to `text-xl sm:text-2xl` — prevents long titles wrapping to two lines |
| Sep 2026 | `public/_redirects` added — enforces canonical HTTPS non-www for all URL variants |
| Sep 2026 | Full logic audit of all 53 calculators — all formulas verified correct |
| Aug 2026 | Batch 4: 7 Prop Firm calculators added |
| Aug 2026 | Batch 3: 10 Futures calculators added |
| Aug 2026 | Batch 2: 15 Multi-Asset calculators added |
| Aug 2026 | Batch 1: 9 Risk & Utility calculators added |
