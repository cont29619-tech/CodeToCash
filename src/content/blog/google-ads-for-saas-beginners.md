---
title: "How to Run Google Ads for Your SaaS on a $100 Budget"
description: "A step-by-step guide to Google Ads for SaaS beginners: keyword strategy, ad copy templates, budget allocation, and conversion tracking setup."
pubDate: 2026-03-08
author: "CodeToCash Team"
category: "ads"
tags: ["google ads", "paid ads", "saas marketing", "ppc", "advertising"]
readingTime: "9 min read"
featured: false
draft: false
faq:
  - question: "How much should I spend on Google Ads when starting out?"
    answer: "Start with $5-10/day ($100-300/month). Enough data to optimize, low enough to limit losses while learning."
  - question: "What's a good conversion rate for SaaS Google Ads?"
    answer: "2-5% is typical. Developer tools often see higher because search intent is strong."
  - question: "Should I use broad match or exact match keywords?"
    answer: "Start with phrase match for control. Add exact match for your best-performing terms after 2-3 weeks of data."
  - question: "How long before I see results from Google Ads?"
    answer: "Give it 2-4 weeks minimum. Google's algorithm needs ~50 conversions to optimize effectively."
  - question: "Can I run Google Ads without a big budget?"
    answer: "Yes. Focus on long-tail, high-intent keywords with lower CPCs. 'buy [your tool type]' beats 'project management'."
---

Google Ads for SaaS beginners has a reputation problem. Developers open Google Ads, see a dashboard full of unfamiliar metrics, set a campaign live, spend $80, get zero signups, and conclude that ads don't work. The actual problem isn't ads — it's that developers approach campaigns the way they approach code: write it once, deploy it, expect it to work. Ads are more like a feedback loop than a function call. You write a hypothesis, run it, measure the output, and iterate.

This guide walks you through running your first Google Ads campaign on a $100 budget without wasting it. If you want to understand where ads fit in your broader marketing system, read the [DRM 101 guide](/drm-101) first. If you already know the system and just need the playbook, let's go.

---

## Why Google Ads Actually Work for Dev Tools

Most marketing channels are interrupt-based. You're scrolling Twitter, you weren't thinking about deployment tools, and an ad shows up. Interrupt-based channels require you to create demand — you have to convince someone they have a problem before you can solve it.

Google Search is different. Someone types "automated code review tool for teams" into Google. That person already knows they have a problem, they're already researching solutions, and they're probably close to making a buying decision. You're not interrupting — you're answering. This is called **pull marketing**, and for niche dev tools with small budgets, it's almost always the right channel to start with.

The math works in your favor at small scale too. You don't need thousands of clicks. If your tool converts at 3% and your MRR per customer is $49, you need roughly 33 trial signups to break even on a $100 ad spend at a $3 CPC. Long-tail keywords for developer tools regularly hit $1–5 CPCs while broad SaaS terms cost $10–30+. Pick the right keywords and $100 is actually useful data.

---

## Setting Up Your First Campaign (Step by Step)

When you create a new campaign in Google Ads, Google will push you toward "Performance Max" — a campaign type that uses machine learning to show your ads across Search, YouTube, Gmail, and Display simultaneously. Ignore it. Performance Max requires significant conversion data to optimize, which you don't have yet, and it gives you almost no visibility into what's working.

**Choose Search campaigns.** Search only. You control exactly which keywords trigger your ads, you see exactly which search terms converted, and you can iterate with precision. Think of Performance Max as a black-box neural network you can't inspect — Search campaigns are the interpretable model you can actually debug.

Step-by-step setup:

```
1. Create account at ads.google.com
2. Skip the "Smart campaign" prompt (click "Switch to Expert Mode")
3. New Campaign → Search → Website traffic (ignore the conversion goal for now)
4. Uncheck "Display Network" and "Search Network partners"
5. Location: target your country only (or city for local)
6. Language: English
7. Bidding: start with "Maximize clicks" with a max CPC limit of $3-5
8. Daily budget: $5/day
9. Ad schedule: Mon–Fri, 8am–8pm (when buyers are working)
```

Create one ad group per theme. If your tool does code review and also does CI/CD, those are two separate ad groups — each with their own keywords and ads. Mixing themes in one ad group makes optimization nearly impossible.

---

## Keyword Targeting: Finding Buyers, Not Browsers

This is where most beginners bleed budget. They add broad keywords like "developer tools" or "project management" — high-volume, high-CPC, low-intent terms that attract everyone except buyers.

Keyword match types work exactly like type-checking in programming:

```
Broad match     → like JavaScript's == (loose coercion, matches almost anything)
                   "code review" might show for "what is peer review at work"

Phrase match    → like === (strict on word order, allows prefix/suffix)
                   "code review tool" shows for "best code review tool for teams"
                   but not for "review my code for free"

Exact match     → like Object.is() (identical match only)
                   [code review tool] shows only for "code review tool"
```

Start with phrase match. It gives you enough volume to gather data while keeping you away from completely irrelevant traffic. After 2–3 weeks, look at your Search Terms report (the actual queries that triggered your ads), promote the best ones to exact match, and add the irrelevant ones as negative keywords.

**High-intent keyword patterns for dev tools:**

```
"[your tool type] for [team size/use case]"     → "code review tool for startups"
"best [your tool type]"                          → "best deployment automation tool"
"[competitor name] alternative"                  → "GitHub Actions alternative"
"[your tool type] pricing"                       → "code review software pricing"
"how to [problem your tool solves]"              → "how to automate code reviews"
```

The "pricing" and "alternative" keywords are gold. Someone searching "[competitor] alternative" is actively evaluating options and has buying intent. Someone searching "[tool type] pricing" is even closer to a decision.

**Negative keywords to add from day one:**

```
free, open source, github, tutorial, course,
how to learn, certification, definition, wiki,
reddit, forum, stackoverflow
```

These filter out students, researchers, and people who want free solutions. Every click from this audience is wasted budget.

---

## Writing Ad Copy That Converts (Templates)

A Google Search ad has three headlines (30 chars each), two descriptions (90 chars each), and a display URL. That's your entire canvas. Every character has to earn its place.

The formula that works for dev tools:

```
Headline 1: [Main outcome or hook]          — "Ship Code Without Breaking Things"
Headline 2: [Specific feature or proof]     — "Auto Rollback · 2-Min Setup"
Headline 3: [CTA or qualifier]              — "Try Free — No Credit Card"

Description 1: [Problem + solution in 90 chars]
  "Stop debugging failed deployments at 2am. DeployBot handles rollbacks automatically."

Description 2: [Social proof or specificity]
  "Used by 1,200+ dev teams. Connects to GitHub in 90 seconds. Free 14-day trial."
```

Fill-in-the-blank template:

```
H1: [Verb] [Thing You Fear] Without [Painful Trade-off]
H2: [Key Feature] · [Key Feature] · [Key Proof Point]
H3: [CTA] — [Risk Reducer]

D1: [Problem statement in their words]. [Product name] [how it solves it, specifically].
D2: [Social proof number] + [key differentiator]. [Trial/pricing offer].
```

Example filled in for a monitoring tool:

```
H1: Catch Production Bugs Before Users Do
H2: Real-Time Alerts · Zero Config · 99.9% Uptime
H3: Start Free — No Credit Card Required

D1: You shouldn't learn about downtime from angry users. StatusWatch alerts your
    Slack the moment something breaks.
D2: Trusted by 800+ indie devs. Works with any stack. Free forever for 1 project.
```

Write at least 3 variations per ad group and let Google rotate them. After 2 weeks and ~100 clicks per variant, pause the lowest-performing ones and write new challengers. This is A/B testing — you already know how to do it, you're just doing it on copy instead of UI.

---

## Budget Allocation: How to Spend $100 Wisely

$100 is tight but usable if you don't spread it across too many fronts. The most common mistake is running three campaigns simultaneously and getting 10 clicks each — not enough data to conclude anything. Better to run one campaign, one ad group, 3–5 tightly themed keywords, and get 40–60 clicks on a theme you actually care about.

Spend allocation for a $100 test:

```
Week 1–2: $40
  → One ad group, phrase match only
  → 3–5 high-intent keywords
  → Goal: identify which search terms are actually triggering your ads
  → Action: review Search Terms report, add negatives daily

Week 3–4: $60
  → Add exact match versions of your 2–3 best-performing terms
  → Pause keywords with zero clicks after 20+ impressions
  → Test a second ad variant if you have enough data
  → Goal: find one keyword + ad combination with >2% CTR
```

Your goal with a $100 budget is not revenue — it's a **validated hypothesis**. You want to exit this test knowing: which keyword intent converts, what headline your audience responds to, and what your cost-per-click looks like for your niche. That data is worth more than the clicks themselves.

On bidding: start with "Maximize clicks" with a $3–5 max CPC cap. Don't use "Target CPA" or "Target ROAS" until you have 30+ conversions recorded — Google's smart bidding is a machine learning model that performs poorly with insufficient training data. Under-trained smart bidding will either overbid and drain your budget or underbid and show your ads to nobody.

Landing page alignment matters for budget efficiency too. A good Quality Score (Google's 1–10 rating of your ad relevance) lowers your actual CPC. Quality Score is determined by: expected CTR, ad relevance to the keyword, and landing page experience. If your landing page says "DeployBot" but your keyword is "automated deployment tool", Google sees a mismatch and charges you more per click. [A well-structured SaaS landing page](/playbooks/saas-landing-page) that mirrors your ad's language directly improves Quality Score and stretches your budget further.

---

## Tracking Conversions So You Know What Works

Running Google Ads without conversion tracking is like running a function with no return value. You know it executed, but you have no idea what it produced.

Set up conversion tracking before you spend a cent:

**Option A: Google Tag Manager (recommended)**

```
1. Create a GTM account and container at tagmanager.google.com
2. Add the GTM snippet to your site's <head> and <body>
3. In Google Ads → Tools → Conversions → New conversion action
4. Choose "Website" → enter your /welcome or /dashboard URL
5. Select "Use Google Tag Manager"
6. Copy the Conversion ID and Conversion Label
7. In GTM: New Tag → Google Ads Conversion Tracking
   → Enter the ID and Label
   → Trigger: Page View → URL contains "/welcome"
8. Publish the GTM container
```

**Option B: Direct Google tag (simpler for static sites)**

```
1. In Google Ads → Tools → Conversions → New conversion action
2. Choose "Website" → set up the tag
3. Google gives you a <script> snippet
4. Add it to your /welcome page only (the post-signup thank-you page)
```

Track trial signups as your primary conversion. Track newsletter signups as a secondary micro-conversion — useful signal even if it doesn't directly correlate with revenue. Don't track page views or time-on-site as conversions; Google will optimize for the wrong thing.

Once conversion data flows in, the Search Terms report becomes your most valuable tool. Sort by conversions. The search queries that drove signups are your validated keywords — promote them to exact match, increase bids on them, and build new ad copy specifically around the intent they reveal.

---

## Common Mistakes Developers Make With Google Ads

**1. Setting it and forgetting it.**
Google Ads is not a cron job. The first two weeks require daily attention: check the Search Terms report every morning, add irrelevant queries as negatives, pause non-performing keywords. After the initial setup period you can drop to weekly reviews, but day-one neglect kills campaigns.

**2. Sending traffic to the homepage.**
Your homepage is for multiple audiences: investors, job seekers, existing customers, press. An ad visitor has one specific need — the solution to the problem they just searched for. Build a dedicated landing page per ad group that speaks directly to that search intent. If someone searches "automated code review for Python", your landing page headline should mention Python code review, not "automate your entire dev workflow."

**3. Optimizing for clicks, not conversions.**
A 10% CTR and a 0% conversion rate means your ad is interesting but your product or landing page isn't convincing. A 2% CTR and a 5% conversion rate means you're printing money. Optimize for signups, not clicks.

**4. Targeting keywords that are too broad.**
"Software tools" is not a keyword. "Automated pull request review tool" is a keyword. The broader the keyword, the higher the CPC, the lower the intent, and the faster you'll burn through $100 with nothing to show. Your [pricing strategy](/blog/saas-pricing-strategy) will also influence which intent levels make sense — higher-priced tools can absorb higher CPCs; lower-priced tools need cheaper, longer-tail keywords to stay profitable.

**5. Ignoring Quality Score.**
A Quality Score of 3/10 means you're paying 2–3× more per click than a competitor with a 7/10 score. Improve it by: writing ad headlines that contain your target keyword, making sure your landing page content matches the ad theme, and improving your CTR over time. Quality Score is Google's way of rewarding relevance — which is actually aligned with what you want anyway.

---

**Pre-launch checklist:**

```
[ ] Search campaign only (no Display, no Performance Max)
[ ] One ad group per keyword theme
[ ] Phrase match keywords to start
[ ] Negative keywords list added (free, tutorial, reddit, etc.)
[ ] 3 ad variants per ad group
[ ] Max CPC cap set ($3–5 for most dev tools)
[ ] Dedicated landing page per ad group (not homepage)
[ ] Conversion tracking firing on /welcome or /thank-you page
[ ] Ad schedule: Mon–Fri, business hours
[ ] Daily budget: $5 (not $100 all at once)
[ ] Calendar reminder to review Search Terms report daily for 2 weeks
```

---

Want more tactics like this? Subscribe to the CodeToCash newsletter — one direct response marketing tactic, every Tuesday, written specifically for developers who ship products.
