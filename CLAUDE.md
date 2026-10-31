@AGENTS.md

# TradeCalc — Project Context for Claude

## What this project is
Free professional trading calculators at **https://tradecalcapp.com** — forex, stocks, crypto, futures. No sign-up required. Author: Foysal Mostafa (forex trader & software developer).

**Stack:** Next.js 16.3.0 (App Router), TypeScript, Tailwind CSS v4, static export (`output: 'export'`)
**Hosting:** Cloudflare Pages (drag-and-drop `out/` folder)
**Dev server:** `npm run dev --port 3001` → http://localhost:3001

---

## Build & Deploy

```bash
# 1. Build
npm run build
# → creates out/ folder (static export)

# 2. Deploy
# Go to: dash.cloudflare.com → Workers & Pages → tradecalcapp → Create deployment
# Upload the out/ folder → Save and deploy
```

**Static export rules (must not break):**
- `next.config.ts` → `output: 'export'`, `images: { unoptimized: true }`
- All `opengraph-image.tsx` → `export const dynamic = 'force-static'`
- `robots.ts` and `sitemap.ts` → `export const dynamic = 'force-static'`

---

## Key Source Files

| File | Purpose |
|---|---|
| `src/lib/blog.ts` | All blog posts; `PUBLISHED_POSTS` filters out `draft: true` entries |
| `src/lib/calculators.ts` | All 53 calculator metadata (description, keywords, whyUse, workedExample) |
| `src/lib/seo.ts` | `SITE.url`, `SITE.description`, `AUTHOR` constants |
| `src/lib/blog-schema.ts` | Auto-injects Article, FAQPage, HowTo, BreadcrumbList schemas |
| `src/app/layout.tsx` | Root layout — GA4 + Microsoft Clarity script tags |
| `src/app/sitemap.ts` | Generates sitemap.xml |
| `src/app/robots.ts` | Generates robots.txt |
| `next.config.ts` | Static export config |
| `submit-indexnow.js` | Script to submit all URLs to IndexNow after every deploy |

---

## Blog Post Publishing Workflow

1. Find a draft post in `src/lib/blog.ts` (marked `draft: true`)
2. **Before publishing** — check `relatedPosts` array: every slug must be a published post (no drafts). `getRelatedBlogPosts()` silently drops drafts and leaves blank spots.
3. **Research first** — search competitor posts, map content gaps, build semantic SEO framework
4. **Implement** — expand to 12+ sections, 15+ FAQs, 20+ keywords, 18–20 min read
5. Remove `draft: true`
6. Set `publishedAt` and `updatedAt` to today's date
7. Build → deploy → run IndexNow script

### Semantic SEO checklist for each blog post
- [ ] 12+ sections with 3–5 paragraphs each (~4,000+ words total)
- [ ] 15+ FAQs with detailed answers
- [ ] 20+ keywords (LSI, long-tail, related terms)
- [ ] readingTimeMin reflects actual word count (250 wpm)
- [ ] `howToSteps` array filled if post is procedural
- [ ] `relatedCalculators` links to relevant calculator slugs
- [ ] `relatedPosts` uses only published (non-draft) slugs
- [ ] Meta description front-loads primary keyword, includes "Free", "instantly", or "no sign-up"

---

## Calculator Meta Description Rules (from Bing CTR data)
- Front-load the primary keyword in first 5 words
- Include action words: "instantly", "Free", "no sign-up required"
- Mention specific inputs/outputs (e.g. "Enter strike price, premium, and contracts to instantly see...")
- Keep under 155 characters

---

## Monetization

**Current status:** No ads running (Adsterra removed 2026-09-25).

**Adsterra account (approved, paused):**
- Social Bar: Placement ID `31391494` — add to `layout.tsx` as `<script src="https://pl31491993.profitableratecpmnetwork.com/b1/03/87/b10387789bb1154acfe62ef3331a267d.js" />`
- Native Banner: Placement ID `31391493` — add script to `AdSlot.tsx` (see git history for full code)

**AdSlot component** (`src/components/AdSlot.tsx`) — empty placeholder currently. Already placed in:
- Homepage — 2 slots
- Blog listing — top + bottom
- Blog post — top + mid-article + sidebar + bottom (4 slots)
- Calculators listing — top + bottom
- Calculator page — top + sidebar + bottom (3 slots)

**Google AdSense (pending):**
- Apply once Google Search traffic improves
- Do NOT add Social Bar before AdSense is approved (can hurt approval)
- Native Banner (AdSlot) is safe to enable any time

---

## SEO Setup (all complete)

| Tool | Status | ID/Key |
|---|---|---|
| Google Search Console | Verified ✅ | sitemap at /sitemap.xml |
| Bing Webmaster Tools | Verified ✅ | CNAME method (Cloudflare proxy must be OFF) |
| Google Analytics 4 | Live ✅ | `G-H7SKCMXRYL` |
| Microsoft Clarity | Live ✅ | `yh98wspaas` |
| IndexNow | Key file live ✅ | `ecb1f8f56b334ef5bb44c4a8edfadb5d` |

### After every deploy — run IndexNow
```bash
node submit-indexnow.js
```

### IndexNow 403 issue (unresolved)
The key file is accessible at `tradecalcapp.com/ecb1f8f56b334ef5bb44c4a8edfadb5d.txt` but Bing returns `UserForbiddedToAccessSite`. Fix: go to Bing Webmaster Tools → IndexNow → verify/match keys.

---

## Live Blog Posts (20 published as of 2026-09-18)

- best-forex-position-size-calculators
- break-even-calculator-guide *(published 2026-09-12)*
- forex-compounding-calculator-guide
- forex-lot-sizes-explained
- forex-risk-management-complete-guide
- how-to-calculate-drawdown-trading
- how-to-calculate-forex-margin
- how-to-calculate-pips-between-prices
- how-to-calculate-position-size-forex
- how-to-calculate-profit-loss-forex
- how-to-calculate-risk-reward-ratio
- kelly-criterion-trading-guide *(published 2026-09-18)*
- lot-size-calculator-guide
- mt4-position-size-calculator
- tradecalc-vs-myfxbook-calculator
- what-is-a-pip-in-forex
- what-is-a-stop-loss-in-forex
- what-is-leverage-in-forex
- what-is-pip-value-how-to-calculate
- what-is-spread-in-forex

**41 drafts remain** — publish gradually, 1–2 at a time with full semantic SEO treatment.

---

## Calculator Description Updates (done 2026-09-18)
These 5 were optimized for Bing CTR based on Webmaster Tools data:
- Homepage (`src/lib/seo.ts`) — front-loads "forex, stocks, crypto and futures"
- Options Profit Calculator
- Profit-Loss Calculator
- Risk-Reward Calculator
- Futures Tick Value Calculator
- Kelly Criterion Calculator

---

## Bing vs Google Traffic
- Bing is currently outperforming Google for this site (22 clicks, 858 impressions as of Sep 2026)
- Bing and Google are completely separate traffic sources — Bing performance does not affect Google AdSense eligibility
- Google AdSense requires Google Search traffic + original content + good UX — not Bing traffic

---

## Roadmap

- [ ] Fix IndexNow 403 — match key in Bing Webmaster Tools → IndexNow settings
- [ ] Publish remaining 41 draft blog posts (semantic SEO treatment per post)
- [ ] Apply for Google AdSense once Google traffic improves
- [ ] Add broker affiliate links to platform/broker blog posts
- [ ] Address www. vs non-www duplicate URL issue in Bing
