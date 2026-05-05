---
title: 'Cohort Analysis for Developers: Track Retention Without a Data Team'
description: 'Learn cohort analysis with Google Sheets templates and SQL queries. Measure retention, identify churn patterns, and make data-driven decisions without expensive analytics tools.'
pubDate: 2026-05-06
author: 'CodeToCash Team'
category: 'analytics'
tags: ['cohort analysis', 'retention', 'churn', 'sql', 'analytics', 'google sheets']
readingTime: '12 min read'
featured: false
draft: false
faq:
  - question: "What's the difference between cohort analysis and churn rate?"
    answer: 'Churn rate is a snapshot — it tells you what percentage of users left last month. Cohort analysis is a timeline — it tells you *when* users churn relative to when they signed up. Churn rate can hide problems; cohort analysis surfaces them.'
  - question: 'How big should my cohorts be?'
    answer: "Weekly cohorts work well for products with high signup volume. Monthly cohorts are better for slower-growth products. Daily cohorts are usually too noisy unless you're a high-velocity consumer app. Start monthly, move to weekly as you grow."
  - question: 'Do I need a data warehouse for cohort analysis?'
    answer: "No. You can run cohort analysis in Google Sheets with a few hundred users, or with a single SQL query on your application's database. Data warehouses help at scale (10,000+ users), but they're not required to start."
  - question: 'What retention rate should I aim for?'
    answer: 'For SaaS products, 20-30% month-1 retention is a baseline. 40%+ is strong. 50%+ is exceptional. If your month-1 retention is under 15%, you have an activation problem, not a retention problem. Focus on onboarding first.'
  - question: 'Can I do cohort analysis for revenue, not just users?'
    answer: 'Yes — and you should. Revenue cohorts (dollar retention) often tell a different story than user cohorts. A product with 80% user retention but 120% revenue retention is expanding accounts successfully. Track both.'
---

Your signup graph is going up and to the right. Your revenue graph... isn't. You have users, but you don't know if they're staying. If you're searching for a way to do **cohort analysis for SaaS** without a $50,000 analytics stack, this guide gives you the SQL queries, Google Sheets templates, and mental models to track retention like a growth engineer.

Cohort analysis sounds like enterprise BI jargon. It's not. It's a `GROUP BY` query with a time dimension. Any developer can implement it in an afternoon. And once you see your first cohort chart, you'll never look at aggregate metrics the same way again.

[Direct Response Marketing](/drm-101) is about measuring what works. Cohort analysis is the measurement engine for retention.

---

## What Cohort Analysis Actually Tells You

Aggregate metrics lie. They smooth over problems that are obvious when you look at user behavior over time.

Example: Your monthly active users (MAU) grew from 500 to 600. Looks good. But cohort analysis reveals that users who signed up in January have a 5% month-6 retention rate, while users who signed up in March have 25%. Something changed in March — a new onboarding flow, a feature launch, a pricing change — and it mattered. MAU never would have shown you that.

Think of cohort analysis as a test suite for your retention. Each cohort is a test case. The retention curve is the assertion. If the curve drops off a cliff at month 2, your test failed. Time to debug.

---

## The SQL Query Every Developer Needs

You don't need Mixpanel or Amplitude. You need one query.

Assuming you have a `users` table and an `events` table (or `logins`, or any activity metric):

```sql
WITH cohorts AS (
  SELECT
    user_id,
    DATE_TRUNC('month', created_at) AS cohort_month
  FROM users
  WHERE created_at >= '2025-01-01'
),
activity AS (
  SELECT
    user_id,
    DATE_TRUNC('month', event_date) AS activity_month
  FROM events
  WHERE event_date >= '2025-01-01'
  GROUP BY user_id, DATE_TRUNC('month', event_date)
),
cohort_activity AS (
  SELECT
    c.cohort_month,
    c.user_id,
    a.activity_month,
    EXTRACT(YEAR FROM a.activity_month) * 12
      + EXTRACT(MONTH FROM a.activity_month)
      - (EXTRACT(YEAR FROM c.cohort_month) * 12
      + EXTRACT(MONTH FROM c.cohort_month)) AS period
  FROM cohorts c
  LEFT JOIN activity a ON c.user_id = a.user_id
)
SELECT
  cohort_month,
  COUNT(DISTINCT user_id) AS cohort_size,
  COUNT(DISTINCT CASE WHEN period = 0 THEN user_id END) * 100.0
    / COUNT(DISTINCT user_id) AS m0,
  COUNT(DISTINCT CASE WHEN period = 1 THEN user_id END) * 100.0
    / COUNT(DISTINCT user_id) AS m1,
  COUNT(DISTINCT CASE WHEN period = 2 THEN user_id END) * 100.0
    / COUNT(DISTINCT user_id) AS m2,
  COUNT(DISTINCT CASE WHEN period = 3 THEN user_id END) * 100.0
    / COUNT(DISTINCT user_id) AS m3,
  COUNT(DISTINCT CASE WHEN period = 6 THEN user_id END) * 100.0
    / COUNT(DISTINCT user_id) AS m6
FROM cohort_activity
GROUP BY cohort_month
ORDER BY cohort_month;
```

**What this outputs:** A table where each row is a signup month (cohort), and each column is the percentage of that cohort still active N months later.

**For Postgres.** For MySQL, use `DATE_FORMAT` instead of `DATE_TRUNC`. For SQLite, use `strftime('%Y-%m', created_at)`.

If you don't have an events table, use `payments` (for revenue cohorts) or `logins` (for engagement cohorts). The query structure is identical — only the table name changes.

---

## Reading the Cohort Table

Here's what the output looks like (simplified):

| Cohort  | Size | M0   | M1  | M2  | M3  | M6  |
| ------- | ---- | ---- | --- | --- | --- | --- |
| 2025-01 | 100  | 100% | 45% | 30% | 25% | 18% |
| 2025-02 | 120  | 100% | 50% | 35% | 28% | —   |
| 2025-03 | 150  | 100% | 60% | 42% | —   | —   |

**What to look for:**

**Horizontal trends (within a cohort):** How fast do users drop off? If M1 is 20% and M2 is 18%, you lose most users in the first month. That's an [onboarding problem](/blog/saas-free-trial-optimization), not a product problem.

**Vertical trends (across cohorts):** Are newer cohorts retaining better? If March cohorts retain 60% at M1 vs January's 45%, something you changed in March is working. Figure out what and double down.

**The shape of the curve:** Healthy products see a steep drop in month 1, then a flattening curve. If your curve keeps dropping linearly, users never find lasting value. If it flattens quickly, you've found product-market fit for a subset of users.

---

## Google Sheets Template (No SQL Required)

If you're not comfortable with SQL yet, use this manual approach. It takes 30 minutes once a month.

**Step 1:** Export a CSV with two columns: `user_id` and `signup_date`.

**Step 2:** Export another CSV with two columns: `user_id` and `activity_date` (any meaningful activity — login, payment, key feature usage).

**Step 3:** In Google Sheets:

- Column A: List unique signup months (cohorts)
- Column B: `COUNTIF` for cohort size
- Column C onwards: For each period (month 0, 1, 2...), count how many users from that cohort had activity in that period, divided by cohort size

**Step 4:** Format as a heat map. Select the retention percentages, go to Format → Conditional Formatting, and use a green-to-red color scale. Dark green = high retention. Red = churned.

The visual pattern will jump out immediately. No BI tool required.

---

## The Three Cohort Types Every SaaS Should Track

### 1. User Retention Cohorts

**Question:** Of users who signed up in Month X, what percentage are still logging in in Month Y?

**Tells you:** Whether your product has staying power. If users sign up, activate, then disappear, your core value proposition isn't sticky.

### 2. Revenue Retention Cohorts

**Question:** Of revenue from cohort X, how much revenue remains in Month Y?

**Tells you:** Whether you're expanding or contracting accounts. Revenue retention over 100% means your existing customers are upgrading or buying more. Under 100% means churn is outpacing expansion.

To calculate this, replace `user_id` with `revenue_amount` in the SQL query. Sum revenue by cohort and period instead of counting distinct users.

### 3. Feature Adoption Cohorts

**Question:** Of users who signed up in Month X, what percentage used Feature Y by Month Z?

**Tells you:** Which features drive long-term retention. If users who adopt your API integration in month 1 have 3x the 6-month retention of users who don't, you've found your [activation metric](/blog/saas-free-trial-optimization).

---

## Diagnosing Common Cohort Patterns

### Pattern 1: The Cliff (Steep M0→M1 Drop)

**What it looks like:** 100% → 25% → 22% → 20%

**What it means:** Users sign up, look around, don't find value quickly, and leave.

**The fix:** Shorten time-to-value. Improve onboarding. Send better [activation emails](/blog/developer-onboarding-email-sequence). Your landing page might be overpromising.

### Pattern 2: The Slow Bleed (Linear Decline)

**What it looks like:** 100% → 80% → 60% → 40% → 20%

**What it means:** Users find initial value but churn over time as the novelty wears off.

**The fix:** Build retention hooks. Weekly digest emails. In-app notifications for new data. Features that become more valuable with time (like analytics dashboards that accumulate historical data).

### Pattern 3: The Flatline (High Early, Then Stagnant)

**What it looks like:** 100% → 70% → 68% → 67% → 66%

**What it means:** You have a loyal core audience and a disengaged fringe. The 66% who stay are your real market.

**The fix:** Don't chase the 34% who churned. Double down on what the 66% love. Consider [raising prices](/blog/pricing-psychology-saas) for the loyal segment and creating a cheaper tier for the fringe.

### Pattern 4: The Improver (Later Cohorts Outperform)

**What it looks like:** Jan: 100→30%. Feb: 100→35%. Mar: 100→50%.

**What it means:** Something you changed is working. A new feature, better onboarding, pricing change, or marketing channel.

**The fix:** Isolate the variable. What changed in March? Interview users from the March cohort. If you can identify the cause, systematize it.

---

## Connecting Cohorts to Your Marketing

Cohort analysis isn't just a product metric — it's a marketing diagnostic.

**If organic search cohorts retain better than paid cohorts:** Your [SEO content](/blog/seo-for-developer-blogs) is attracting better-fit users than your [ads](/blog/google-ads-for-saas-beginners). Shift budget toward content.

**If users from Product Hunt retain worse than users from your newsletter:** Product Hunt traffic is inflated by curiosity, not intent. Don't optimize for launch-day vanity metrics.

**If users who read your [DRM 101 guide](/drm-101) before signing up retain 2x better:** Your educational content is pre-qualifying users. Write more of it.

Tag users by acquisition channel in your database. Add `utm_source` and `signup_source` columns. Include them in your cohort queries. The channel-cohort intersection is where marketing strategy lives.

---

## Tools That Make This Easier (At Scale)

You don't need these to start, but as you grow:

- **PostHog:** Open-source product analytics with built-in cohort retention
- **Amplitude:** Industry standard for cohort analysis; free tier available
- **Metabase:** Open-source BI tool that can run the SQL above and visualize it
- **Google BigQuery + Data Studio:** For when you outgrow Sheets

But honestly? That SQL query above scales to 100,000 users on any modern database. Don't over-engineer this until you have to.

---

## Your Next Step

Run the SQL query. Export the results. Color-code them in a spreadsheet. Stare at the pattern for five minutes.

The story is already in your data. Cohort analysis just makes it visible. And once you see it, you can't unsee it. Every marketing decision, every product priority, every [pricing change](/blog/saas-pricing-strategy) becomes clearer when you know which users stay and which ones leave — and when.

Start with monthly cohorts. Move to weekly when you have 500+ signups per month. And never again let aggregate metrics tell you a story that cohort analysis would have contradicted.
