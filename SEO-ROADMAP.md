# SEO / Impressions Roadmap — Goal: 10,000 impressions/day

> Audit + plan to grow Google Search impressions from ~50/day (June 2026) to 10k/day.
> Source of truth for the SEO growth effort. Update as milestones land.

## Where we are (June 2026)

From `/journey` (real Search Console data):

- **~40–60 impressions/day**, trending up from ~10–15/day in March
- **Avg position ~14.2** (page 2) — the core bottleneck
- **CTR ~0.4%** — abnormally low, driven largely by truncated titles
- **77 blog posts** (avg ~2,200 words), 8 playbooks, 3 interactive tools
- Site age ~4 months

## The impressions math

Impressions = (indexed pages) × (queries each page ranks for) × (rank position). A page on **page 1 typically earns 50–300 impressions/day** because it surfaces for dozens of long-tail variants; a page-2 page earns almost none. The dominant lever is **moving page-2 posts to page 1**, not raw page count. Realistic path to 10k/day is ~12 months and depends on rankings + backlinks improving, not content volume alone.

## Done ✅

- **De-truncated titles.** Added optional `seoTitle` frontmatter (≤60 chars). `BlogLayout.astro` uses `seoTitle` when present and only appends the ` | CodeToCash` suffix when the title fits in ~60 chars. Backfilled `seoTitle` on all **30 posts** whose titles exceeded 60 chars (keyword front-loaded).
- **Sitemap `lastmod`.** `astro.config.mjs` now emits accurate per-post `lastmod` from frontmatter (`updatedDate` ?? `pubDate`) plus `changefreq`/`priority` for all 71 original posts.
- **GEO cluster published** (6 posts targeting the AI-search content gap):
  - `generative-engine-optimization-dev-tools` (pillar)
  - `get-cited-by-chatgpt`
  - `google-ai-overviews-saas`
  - `llms-txt-developer-products`
  - `schema-markup-for-ai-search`
  - `geo-vs-seo`
- Tools pages already carry correct `WebApplication` schema (verified — no change needed).

## Next up (highest leverage first)

### 1. Internal-linking discipline (cheap ranking lift)

Links/post currently range 3–10, inconsistent. Standardize: every post links **up** to its cluster pillar and **sideways** to 3–5 siblings. Pillars: `/drm-101` (global hub), plus per-cluster hubs (GEO → `generative-engine-optimization-dev-tools`; SEO → `seo-for-developer-blogs`). This pushes page-2 posts toward page 1 with no new content.

### 2. Expand the starved SEO cluster

"SEO for indie hackers / dev tools" is one of the highest-demand topics in the niche; we have only ~3 posts. Add: keyword research for devs, topical clusters explained, technical SEO for static/Next sites, backlink building for indie hackers, "find your first SaaS customers via SEO."

### 3. Ship `public/llms.txt`

We now have a post teaching it — practice what we preach. Curated Markdown index: H1 + one-line blockquote + H2 sections linking `/drm-101`, top playbooks, top guides, the tools, and the GEO cluster.

### 4. Long-tail surface expansion

- **Marketing glossary** (definition pages rank fast and broad for "what is X").
- **Comparison / "X alternative" pages** (high commercial intent).
- 1–2 more free interactive tools (existing tools already have schema and pull impressions).

### 5. Off-platform (the ceiling — not code)

Backlinks are the #1 reason rankings stall on page 2.

- Syndicate posts to dev.to / Hashnode with `rel=canonical` back to us.
- Launch tools on Product Hunt + Show HN.
- Get into indie-hacker / dev newsletters and roundups.
- Distribute in r/SaaS, r/indiehackers (value-first, not spam).

## Measurement

- **Weekly:** Search Console impressions, avg position, CTR by page. Watch the 30 retitled posts for CTR lift first.
- **Monthly:** GEO citation audit — prompt ChatGPT / Perplexity / Google AI Overviews with target questions; note citations. Track AI referral traffic (`chatgpt.com`, `perplexity.ai`).
- Keep `/journey` updated as the canonical honest dashboard.

## Notes / honesty constraints

- `/journey` is the source of truth for real metrics — no page may contradict it with fabricated stats.
- Per publishing cadence preference: publish in batches, don't drip-space posts.
