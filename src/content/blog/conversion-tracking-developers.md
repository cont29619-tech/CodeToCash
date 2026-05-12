---
title: 'Conversion Tracking for Developers: From Zero to Full Funnel Visibility'
description: 'How to set up conversion tracking that actually works. Event instrumentation, attribution models, and funnel analytics for developers who want data they can trust.'
pubDate: 2026-05-13
author: 'CodeToCash Team'
category: 'analytics'
tags: ['conversion tracking', 'funnel analytics', 'event tracking', 'attribution', 'developer analytics']
readingTime: '11 min read'
featured: false
draft: false
faq:
  - question: 'What events should I track first?'
    answer: 'Start with four events: Page View (baseline traffic), Sign Up Started (intent), Sign Up Completed (conversion), and Subscription Created (revenue). These four events give you traffic volume, conversion rate, and revenue attribution. Add more events only after these are reliable.'
  - question: 'Should I use Google Analytics 4 or a privacy-focused alternative?'
    answer: 'For developer tools, privacy-focused analytics like Plausible or PostHog are usually better. They respect user privacy, load faster, and give you event-level data without the complexity of GA4. Use GA4 only if you need advanced remarketing integration with Google Ads.'
  - question: 'How do I track conversions from email campaigns?'
    answer: 'Append UTM parameters to every link in your emails: utm_source=newsletter, utm_medium=email, and utm_campaign=[campaign_name]. In your analytics tool, filter by these parameters to see email-driven signups and revenue. Most email platforms (ConvertKit, Buttondown) automate UTM tagging.'
  - question: 'What attribution model should I use?'
    answer: 'Start with first-touch attribution for acquisition decisions and last-touch attribution for channel optimization. First-touch tells you which channel brought the user initially. Last-touch tells you what convinced them to convert. Use both — they answer different questions.'
  - question: 'How do I track offline or word-of-mouth conversions?'
    answer: 'Add a "How did you hear about us?" dropdown during signup. Keep the options specific but not overwhelming: Search Engine, Twitter/X, Reddit, Friend/Colleague, Blog Post, Newsletter, Other. This captures word-of-mouth and dark social traffic that UTM parameters miss.'
---

You can't optimize what you don't measure. Every blog post about conversion optimization, A/B testing, or paid ads assumes you have reliable tracking in place. But most developers set up analytics as an afterthought — dropping a script on the page and calling it done. The result is data that's incomplete, untrustworthy, and ultimately useless for making decisions.

This guide gives you a developer-first approach to conversion tracking. We'll cover event instrumentation, attribution setup, funnel visualization, and the specific tracking architecture you need to answer real business questions. No marketing jargon. No vague advice. Just the exact setup that turns your analytics from a vanity dashboard into a decision-making tool.

## The Tracking Mindset

Before you write any code, understand what you're trying to learn. Tracking every possible event creates noise. Tracking the wrong events leads to wrong conclusions.

Start with one question: "What are the 3-5 actions a user takes between discovering my product and paying me money?" Map these actions in order. That's your funnel. Every event you track should map directly to a step in that funnel.

For a typical SaaS product, the funnel looks like this:

1. **Discovery:** User visits your site from a traffic source
2. **Engagement:** User reads content, explores features, or uses a tool
3. **Intent:** User clicks "Sign Up" or "Start Trial"
4. **Conversion:** User completes signup and activates
5. **Revenue:** User upgrades to a paid plan

If you track these five steps reliably, you can answer 90% of the marketing questions that matter: Which traffic source brings the most valuable users? Where do users drop off? What's my true cost per acquisition?

## Event Instrumentation: What to Track and How

Events are the atomic unit of conversion tracking. An event is any action a user takes that you want to measure. Let's build your event taxonomy from the ground up.

### Foundational Events (Track These First)

These four events are non-negotiable. Set them up before you do anything else.

**1. Page View**

Track every page load with the URL, referrer, and UTM parameters. This gives you baseline traffic data and attribution.

```javascript
// Example with Plausible
plausible('pageview', { u: window.location.href });

// Example with PostHog
posthog.capture('$pageview', {
  $current_url: window.location.href,
  $referrer: document.referrer,
  utm_source: new URLSearchParams(window.location.search).get('utm_source'),
  utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
  utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
});
```

**2. Sign Up Started**

Fire this event when a user clicks your primary signup CTA — not when they submit the form. The click indicates intent. The form submission indicates completion. You need both to measure form abandonment.

```javascript
document.querySelector('[data-event="signup-started"]').addEventListener('click', () => {
  posthog.capture('sign_up_started', {
    location: window.location.pathname,
    cta_text: event.target.innerText,
  });
});
```

**3. Sign Up Completed**

Fire this when the user successfully creates an account. Include the signup method (email, OAuth provider) and any UTM parameters from the original session.

```javascript
posthog.capture('sign_up_completed', {
  method: 'email',
  utm_source: sessionStorage.getItem('utm_source'),
  time_to_complete: Date.now() - sessionStorage.getItem('signup_start_time'),
});
```

**4. Subscription Created**

Fire this when a user successfully pays you money. Include the plan name, amount, currency, and billing interval. This is your revenue event.

```javascript
posthog.capture('subscription_created', {
  plan: 'pro',
  amount: 49,
  currency: 'USD',
  interval: 'month',
  trial_conversion: true, // if converting from trial
});
```

### Engagement Events (Track These Next)

Once your foundational events are reliable, add events that measure product engagement. These help you understand which features drive conversion.

**Feature Usage Events.** Track the core actions in your product. For a deployment tool: "first_deployment." For an API: "first_api_call." For a code formatter: "first_file_formatted." These events map to your product's aha moment.

**Upgrade Prompt Events.** Track when users see an upgrade prompt and whether they click it. This tells you if your upgrade triggers are well-timed or annoying.

**Support Events.** Track when users visit your docs, open your help widget, or contact support. High support interaction before signup often indicates confusion in your onboarding.

### Events You Should NOT Track

**Mouse movements and scroll depth.** These create massive event volumes without actionable insight. If you need scroll data, track it as a single "scrolled_to_75%" event, not a continuous stream.

**Every button click.** Track CTA clicks and conversion actions. Don't track "user clicked the footer logo." That data never changes a decision.

**Server errors as user events.** 500 errors belong in your error tracking tool (Sentry, LogRocket), not your analytics. The exception: track "payment_failed" as a conversion event because it directly impacts revenue.

## Attribution: Understanding Where Users Come From

Attribution is how you connect a conversion to the marketing channel that caused it. Get this wrong and you'll optimize for the wrong channels.

### First-Touch vs. Last-Touch Attribution

**First-touch attribution** gives credit to the channel that brought the user to your site for the first time. Use this to answer: "Which channels are best at generating awareness?"

**Last-touch attribution** gives credit to the channel the user interacted with immediately before converting. Use this to answer: "Which channels are best at closing the deal?"

Example: A user discovers your tool through a Twitter post (first touch), reads your blog via search two days later (middle touch), and clicks a link in your newsletter to sign up (last touch).

- First-touch attribution credits Twitter for the signup
- Last-touch attribution credits the newsletter for the signup

Neither is wrong. They answer different questions. First-touch tells you where to invest in awareness. Last-touch tells you where to invest in conversion.

### Setting Up UTM Parameters

UTM parameters are the standard way to tag links for attribution. Every external link you control should include them.

Use this exact structure:

- `utm_source`: The platform (twitter, google, newsletter, producthunt)
- `utm_medium`: The format (social, organic, email, cpc, referral)
- `utm_campaign`: The specific initiative (launch-week, black-friday, onboarding-email-3)
- `utm_content`: Optional — use for A/B testing (button-a, button-b)

Example URL: `https://yoursite.com/?utm_source=twitter&utm_medium=social&utm_campaign=plg-guide`

Store UTM parameters in sessionStorage when the user first lands. Pass them through to your signup event so you know which campaign drove the conversion even if the user signs up days later.

```javascript
const params = new URLSearchParams(window.location.search);
['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach(key => {
  const value = params.get(key);
  if (value) sessionStorage.setItem(key, value);
});
```

### The "How Did You Hear About Us" Field

UTM parameters miss a huge chunk of traffic: word of mouth, dark social (private Slack channels, Discord servers), and direct navigation. Capture this with a simple dropdown during signup.

Keep the options specific but limited:

- Search Engine (Google, DuckDuckGo, etc.)
- Twitter / X
- Reddit
- LinkedIn
- Friend or Colleague
- Blog Post or Newsletter
- Product Hunt
- Other

Don't make this field required — it adds friction. But make it visible and easy to select. The data quality will surprise you. Most SaaS founders discover that "Friend or Colleague" is their largest acquisition channel and they had no idea.

## Building Your Conversion Funnel

A funnel is just a sequence of events where each step is a subset of the previous step. Your analytics tool can build this automatically once your events are instrumented.

### The Standard SaaS Funnel

| Step | Event | Typical Drop-Off |
|---|---|---|
| Site Visit | pageview | — |
| Signup Started | sign_up_started | 60-70% |
| Signup Completed | sign_up_completed | 30-40% |
| Product Activated | feature_used_core | 40-50% |
| Trial Converted | subscription_created | 15-25% |

If your drop-off at any step is significantly worse than these benchmarks, that's your optimization priority.

### Funnel Analysis in Practice

**Step 1: Calculate step-by-step conversion rates.** Don't just look at overall conversion (visit → paid). Look at each transition. A low visit-to-signup rate indicates a landing page problem. A low signup-to-activation rate indicates an onboarding problem. A low activation-to-paid rate indicates a product value problem.

**Step 2: Segment by traffic source.** Your overall funnel might look healthy, but one channel could be dragging it down. Maybe Twitter traffic converts at 5% but Reddit traffic converts at 0.5%. That tells you to invest more in Twitter and either fix your Reddit landing page or stop posting there.

**Step 3: Segment by cohort.** Compare users who signed up this week vs. last month. If conversion rates are dropping, something broke — a landing page change, a pricing change, or a product bug.

**Step 4: Measure time between steps.** How long does it take from signup to activation? From activation to payment? Long delays indicate friction. If users take 14 days to activate on average, but your trial is only 7 days, you've found your problem.

## Privacy and Compliance

Conversion tracking doesn't require invasive data collection. Here's how to track responsibly.

**Don't use third-party cookies.** First-party cookies and localStorage are sufficient for session tracking and attribution. Third-party cookies create privacy risk without meaningful analytics benefit.

**Anonymize IP addresses.** Most privacy-focused analytics tools do this by default. If you're using a self-hosted solution, configure it to drop the last octet of IP addresses before storage.

**Respect Do Not Track.** Check `navigator.doNotTrack` and skip tracking entirely if the user has opted out. This is legally required in some jurisdictions and ethically required everywhere.

**Store data in the user's region.** If you serve EU users, ensure your analytics data is stored in the EU or use a tool that's GDPR-compliant by design (Plausible, Fathom).

**Be transparent in your privacy policy.** List exactly what you track, why you track it, and how long you retain it. Developer audiences particularly appreciate this transparency.

## Tools and Setup

You don't need an expensive analytics stack. Here's the minimal viable setup.

**Privacy-focused web analytics:** Plausible ($9/month) or Fathom ($14/month). Both give you pageviews, referrers, and UTM tracking without cookies or complex configuration.

**Product analytics:** PostHog (generous free tier) or Amplitude (free tier available). These handle event tracking, funnel analysis, and cohort reporting.

**Revenue tracking:** Your payment processor (Stripe, Paddle) already tracks revenue. Connect it to your product analytics via webhook or API to correlate revenue with user behavior.

**Error tracking:** Sentry (free tier) for technical errors. Don't mix error data with analytics data, but do track "payment_failed" and "signup_error" as analytics events.

### One-Day Setup Checklist

1. Install Plausible or PostHog on your site
2. Add the four foundational events (pageview, signup started, signup completed, subscription created)
3. Add UTM parameter capture to sessionStorage
4. Add the "How did you hear about us" dropdown to your signup form
5. Create a funnel report: pageview → signup started → signup completed → subscription created
6. Set up a weekly email report of top traffic sources and conversion rates

This entire setup takes less than a day and gives you more actionable data than 90% of SaaS companies have.

## Reading Your Data Correctly

Collecting data is easy. Drawing the right conclusions is hard. Here are the most common mistakes developers make when interpreting analytics.

**Correlation vs. causation.** Just because users who read your blog convert at 8% doesn't mean the blog caused the conversion. Maybe blog readers are already warmer leads. To prove causation, run an A/B test or compare cohorts with matched characteristics.

**Survivorship bias.** If you analyze only users who completed signup, you'll miss the reasons people dropped off. Study the failures, not just the successes.

**Vanity metrics.** Page views and total signups feel good but don't pay bills. Focus on revenue per visitor, trial-to-paid conversion rate, and customer lifetime value.

**Over-optimization.** A 1% improvement in conversion rate matters when you have 10,000 visitors per month. It doesn't matter when you have 100. Focus on traffic acquisition and product value before you obsess over marginal conversion gains.

Once your tracking is reliable, the [A/B testing guide](/blog/ab-testing-landing-page-guide) shows you how to run experiments that improve conversion rates with statistical confidence. If you want to understand how acquisition costs fit into your funnel economics, the [customer acquisition cost guide](/blog/customer-acquisition-cost-saas) breaks down the math. And for the complete marketing framework that ties tracking, testing, and optimization together, read the [DRM 101 guide](/drm-101).
