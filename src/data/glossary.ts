export interface GlossaryTerm {
  /** URL slug, e.g. "customer-acquisition-cost" */
  slug: string;
  /** Display term, e.g. "Customer Acquisition Cost (CAC)" */
  term: string;
  /** One-line definition for the index, meta description, and cards (<=155 chars) */
  short: string;
  /** Answer-first full definition (GEO-friendly: complete, quotable) */
  definition: string;
  /** Why it matters for indie developers / vibe coders */
  whyItMatters: string;
  /** Related glossary slugs */
  related: string[];
  /** Related blog posts: [slug, label] */
  relatedPosts?: { slug: string; label: string }[];
}

export const glossary: GlossaryTerm[] = [
  {
    slug: 'direct-response-marketing',
    term: 'Direct Response Marketing (DRM)',
    short:
      'Marketing designed to trigger an immediate, measurable action — a click, signup, or purchase — rather than build long-term brand awareness.',
    definition:
      'Direct response marketing (DRM) is a marketing approach designed to prompt an immediate, measurable response from the audience — a click, a signup, or a purchase — rather than to build brand awareness over time. Every piece of DRM has one clear call to action, every result is trackable, and every element can be tested and improved.',
    whyItMatters:
      'For indie developers and small teams, DRM is almost always the right choice: every dollar and every campaign is measurable, so you can start tiny, test cheaply, and scale only what converts. It treats marketing like engineering — systematic, data-driven, and iterative.',
    related: ['conversion-rate', 'call-to-action', 'marketing-funnel', 'a-b-testing'],
    relatedPosts: [
      {
        slug: 'what-is-direct-response-marketing-for-developers',
        label: "What Is Direct Response Marketing? A Vibe Coder's Guide",
      },
      { slug: 'direct-response-vs-brand-marketing', label: 'Direct Response vs Brand Marketing' },
    ],
  },
  {
    slug: 'conversion-rate',
    term: 'Conversion Rate',
    short:
      'The percentage of people who take a desired action (signup, purchase) out of everyone who had the opportunity.',
    definition:
      'Conversion rate is the percentage of people who complete a desired action — such as signing up, starting a trial, or purchasing — out of the total number who had the opportunity. If 1,000 people visit a landing page and 30 sign up, the conversion rate is 3%.',
    whyItMatters:
      'Conversion rate is the lever that makes every other marketing effort more profitable. Doubling your conversion rate doubles your results from the same traffic — which is why optimizing it is usually cheaper than buying more visitors.',
    related: ['landing-page', 'call-to-action', 'a-b-testing', 'click-through-rate'],
    relatedPosts: [
      { slug: 'saas-landing-page-copywriting', label: 'SaaS Landing Page Copywriting' },
      {
        slug: 'sales-page-conversion-optimization',
        label: 'Sales Page Conversion Optimization',
      },
    ],
  },
  {
    slug: 'customer-acquisition-cost',
    term: 'Customer Acquisition Cost (CAC)',
    short:
      'The total cost of marketing and sales divided by the number of new customers it acquired — what it costs to win one customer.',
    definition:
      'Customer acquisition cost (CAC) is the total amount you spend on marketing and sales to acquire one new paying customer. You calculate it by dividing total acquisition spend over a period by the number of customers gained in that period. If you spend $1,000 and gain 20 customers, your CAC is $50.',
    whyItMatters:
      'CAC tells you whether your growth is sustainable. Compared against lifetime value (the LTV/CAC ratio), it reveals whether each customer earns back more than they cost — the single most important question in paid growth.',
    related: ['lifetime-value', 'monthly-recurring-revenue', 'churn-rate', 'marketing-funnel'],
    relatedPosts: [
      { slug: 'customer-acquisition-cost-saas', label: 'Customer Acquisition Cost for SaaS' },
    ],
  },
  {
    slug: 'lifetime-value',
    term: 'Lifetime Value (LTV)',
    short:
      'The total revenue you expect from an average customer over the entire time they stay with you.',
    definition:
      'Lifetime value (LTV), sometimes written CLV, is the total revenue you expect to earn from an average customer across the entire span of their relationship with your product. For a subscription, a simple estimate is average monthly revenue per customer divided by your monthly churn rate.',
    whyItMatters:
      'LTV sets the ceiling on what you can afford to spend acquiring a customer. A healthy business keeps LTV at least three times CAC, so knowing your LTV turns guesswork about ad budgets into math.',
    related: ['customer-acquisition-cost', 'churn-rate', 'monthly-recurring-revenue'],
    relatedPosts: [
      { slug: 'customer-acquisition-cost-saas', label: 'Customer Acquisition Cost for SaaS' },
      { slug: 'reduce-churn-saas-tactics', label: 'Reduce Churn: SaaS Tactics' },
    ],
  },
  {
    slug: 'churn-rate',
    term: 'Churn Rate',
    short:
      'The percentage of customers who cancel or stop paying over a given period — the rate at which you lose customers.',
    definition:
      'Churn rate is the percentage of customers (or revenue) you lose over a given period, usually a month. If you start the month with 200 customers and 10 cancel, your monthly customer churn is 5%. Revenue churn measures the same thing in dollars and accounts for downgrades and upgrades.',
    whyItMatters:
      'Churn quietly caps your growth: at 5% monthly churn, you replace your entire customer base every 20 months just to stay flat. Reducing churn compounds — it raises lifetime value and makes every acquisition dollar go further.',
    related: ['lifetime-value', 'monthly-recurring-revenue', 'customer-acquisition-cost'],
    relatedPosts: [
      { slug: 'reduce-churn-saas-tactics', label: 'Reduce Churn: SaaS Tactics' },
      { slug: 'win-back-email-sequence-saas', label: 'Win-Back Email Sequence' },
    ],
  },
  {
    slug: 'monthly-recurring-revenue',
    term: 'Monthly Recurring Revenue (MRR)',
    short:
      'The predictable subscription revenue your product generates each month, normalized to a monthly figure.',
    definition:
      'Monthly recurring revenue (MRR) is the total predictable subscription revenue your product earns in a month. Annual plans are normalized to a monthly figure (a $120/year plan contributes $10 of MRR). MRR is the heartbeat metric of any subscription business.',
    whyItMatters:
      'MRR turns a subscription business into a number you can grow deliberately. Tracking new, expansion, and churned MRR separately shows exactly where growth comes from and where it leaks.',
    related: ['churn-rate', 'lifetime-value', 'north-star-metric'],
    relatedPosts: [
      { slug: '0-to-1k-mrr-indie-developer', label: '0 to $1K MRR as an Indie Developer' },
      { slug: 'north-star-metrics-saas', label: 'North Star Metrics for SaaS' },
    ],
  },
  {
    slug: 'lead-magnet',
    term: 'Lead Magnet',
    short:
      'A free, valuable resource offered in exchange for an email address — the trade that grows your list.',
    definition:
      'A lead magnet is a free, immediately useful resource — a cheatsheet, template, checklist, mini-course, or tool — that you give away in exchange for someone’s email address. It converts anonymous visitors into subscribers you can market to over time.',
    whyItMatters:
      'For developers building a newsletter-first business, the lead magnet is the entry point to the entire funnel. A relevant, high-value magnet can lift email opt-in rates several times over a generic "subscribe" box.',
    related: ['call-to-action', 'conversion-rate', 'marketing-funnel'],
    relatedPosts: [
      { slug: 'lead-magnet-ideas-for-saas', label: 'Lead Magnet Ideas for SaaS' },
      { slug: 'developer-newsletter-growth', label: 'Developer Newsletter Growth' },
    ],
  },
  {
    slug: 'call-to-action',
    term: 'Call to Action (CTA)',
    short:
      'The specific instruction that tells the reader exactly what to do next — "Start free trial", "Get the cheatsheet".',
    definition:
      'A call to action (CTA) is the explicit instruction that tells your audience the single next step to take — for example, "Start your free trial," "Download the guide," or "Book a demo." In direct response marketing, every page and email should have one clear, primary CTA.',
    whyItMatters:
      'A vague or competing CTA is one of the most common reasons good products fail to convert. Clarity beats cleverness: the easier and more specific the action, the more people take it.',
    related: ['conversion-rate', 'landing-page', 'lead-magnet'],
    relatedPosts: [
      { slug: 'saas-landing-page-copywriting', label: 'SaaS Landing Page Copywriting' },
    ],
  },
  {
    slug: 'landing-page',
    term: 'Landing Page',
    short:
      'A standalone page built for a single goal — usually getting the visitor to take one specific action.',
    definition:
      'A landing page is a standalone web page designed around a single objective, such as capturing an email or starting a trial. Unlike a homepage, it removes distractions and navigation so the visitor focuses on one call to action.',
    whyItMatters:
      'Landing pages are where traffic becomes customers. A focused landing page routinely outconverts sending the same traffic to a general homepage, which is why they are the workhorse of direct response campaigns.',
    related: ['conversion-rate', 'call-to-action', 'value-proposition', 'a-b-testing'],
    relatedPosts: [
      { slug: 'saas-landing-page-copywriting', label: 'SaaS Landing Page Copywriting' },
      { slug: 'ab-testing-landing-page-guide', label: 'A/B Testing Your Landing Page' },
    ],
  },
  {
    slug: 'value-proposition',
    term: 'Value Proposition',
    short:
      'A clear statement of the benefit you deliver, for whom, and why you are different — in one sentence.',
    definition:
      'A value proposition is a concise statement of the specific benefit your product delivers, to whom, and why it is different from the alternatives. It answers the visitor’s first question — "what is this and why should I care?" — ideally in a single sentence.',
    whyItMatters:
      'If users cannot understand what you do and why it matters in one sentence, even a great product underperforms. The value proposition is the foundation every headline, ad, and email is built on.',
    related: ['positioning', 'copywriting', 'landing-page'],
    relatedPosts: [
      { slug: 'value-proposition-template-saas', label: 'Value Proposition Template for SaaS' },
      { slug: 'developer-product-positioning', label: 'Developer Product Positioning' },
    ],
  },
  {
    slug: 'positioning',
    term: 'Positioning',
    short:
      'The mental category and context you choose for your product so customers instantly understand what it is and why it wins.',
    definition:
      'Positioning is the deliberate choice of how customers should perceive your product relative to alternatives — the category it belongs to, the audience it serves, and the dimension on which it is best. Strong positioning makes your product the obvious choice for a specific person with a specific need.',
    whyItMatters:
      'Two products with identical features can perform completely differently based on positioning alone. For developers in crowded categories, sharp positioning is often the difference between "just another tool" and "exactly what I needed."',
    related: ['value-proposition', 'copywriting'],
    relatedPosts: [
      { slug: 'developer-product-positioning', label: 'Developer Product Positioning' },
    ],
  },
  {
    slug: 'copywriting',
    term: 'Copywriting',
    short:
      'Writing words whose job is to drive a specific action — the persuasion layer of marketing.',
    definition:
      'Copywriting is writing whose purpose is to drive a specific action, such as clicking, signing up, or buying. Unlike content meant to inform or entertain, copy is engineered to persuade, using frameworks like PAS (Problem-Agitate-Solution) and AIDA (Attention-Interest-Desire-Action).',
    whyItMatters:
      'Copy is the interface between your product and your customer’s decision. Developers who treat copywriting as fill-in-the-blank frameworks rather than mysterious art can write high-converting copy without "being a writer."',
    related: ['value-proposition', 'call-to-action', 'social-proof'],
    relatedPosts: [
      {
        slug: 'copywriting-frameworks-for-developers',
        label: 'Copywriting Frameworks for Developers',
      },
      { slug: 'pas-copywriting-framework', label: 'The PAS Copywriting Framework' },
    ],
  },
  {
    slug: 'marketing-funnel',
    term: 'Marketing Funnel',
    short:
      'The staged path a person takes from first hearing about you to becoming a paying customer.',
    definition:
      'A marketing funnel is the staged journey a person moves through from first awareness of your product to becoming a paying customer — typically awareness, interest, consideration, and conversion. It is called a funnel because fewer people remain at each successive stage.',
    whyItMatters:
      'Thinking in funnel stages shows you exactly where prospects drop off, so you fix the real bottleneck instead of guessing. It turns "we need more customers" into a specific, measurable diagnosis.',
    related: ['conversion-rate', 'lead-magnet', 'customer-acquisition-cost'],
    relatedPosts: [{ slug: 'drm-funnel-explained', label: 'The DRM Funnel Explained' }],
  },
  {
    slug: 'a-b-testing',
    term: 'A/B Testing',
    short:
      'Comparing two versions of something with live traffic to see which performs better, decided by data.',
    definition:
      'A/B testing (split testing) is the practice of showing two variants — A and B — to different segments of your audience at the same time and measuring which produces a better result, such as more signups. The winner is decided by data, ideally with enough sample size to be statistically significant.',
    whyItMatters:
      'A/B testing replaces opinions with evidence. For developers, it is the scientific method applied to marketing: form a hypothesis, run the experiment, keep what works.',
    related: ['conversion-rate', 'landing-page', 'click-through-rate'],
    relatedPosts: [
      { slug: 'ab-testing-landing-page-guide', label: 'A/B Testing Your Landing Page' },
    ],
  },
  {
    slug: 'bounce-rate',
    term: 'Bounce Rate',
    short:
      'The percentage of visitors who leave after viewing only one page without interacting further.',
    definition:
      'Bounce rate is the percentage of visitors who land on a page and leave without taking any further action or visiting another page. A high bounce rate on a landing page often signals a mismatch between what visitors expected and what they found.',
    whyItMatters:
      'Bounce rate is an early warning that your message, speed, or targeting is off. Diagnosing why people bounce — slow load, unclear value, wrong audience — is often the fastest conversion win available.',
    related: ['conversion-rate', 'landing-page', 'click-through-rate'],
    relatedPosts: [
      { slug: 'conversion-tracking-developers', label: 'Conversion Tracking for Developers' },
    ],
  },
  {
    slug: 'click-through-rate',
    term: 'Click-Through Rate (CTR)',
    short: 'The percentage of people who click a link, ad, or email out of everyone who saw it.',
    definition:
      'Click-through rate (CTR) is the percentage of people who click a specific link out of everyone who saw it. If an email reaches 1,000 people and 50 click the link, the CTR is 5%. It applies to ads, search results, emails, and any clickable element.',
    whyItMatters:
      'CTR measures how compelling your message is at the moment of decision. Small improvements to headlines, subject lines, and ad copy lift CTR — and a higher CTR feeds more qualified traffic into the rest of your funnel.',
    related: ['conversion-rate', 'email-open-rate', 'a-b-testing'],
    relatedPosts: [
      { slug: 'headline-copywriting-templates', label: 'Headline Copywriting Templates' },
    ],
  },
  {
    slug: 'email-open-rate',
    term: 'Email Open Rate',
    short: 'The percentage of recipients who open an email out of everyone it was delivered to.',
    definition:
      'Email open rate is the percentage of delivered emails that recipients open, driven primarily by the subject line, sender name, and preview text. While modern privacy features make open rates less precise than they once were, they remain a useful directional signal for subject-line performance.',
    whyItMatters:
      'No one reads an email they do not open, so open rate gates the entire value of your list. It is also the cleanest place to test copywriting, since the subject line is a tiny, high-leverage experiment.',
    related: ['click-through-rate', 'email-deliverability', 'copywriting'],
    relatedPosts: [
      { slug: 'email-subject-line-formulas', label: 'Email Subject Line Formulas' },
      { slug: 'email-deliverability-for-developers', label: 'Email Deliverability for Developers' },
    ],
  },
  {
    slug: 'email-deliverability',
    term: 'Email Deliverability',
    short:
      'Whether your emails actually reach the inbox instead of the spam folder or being blocked.',
    definition:
      'Email deliverability is the measure of whether the emails you send actually land in recipients’ inboxes rather than the spam folder or being rejected entirely. It depends on technical setup (SPF, DKIM, DMARC), sender reputation, list hygiene, and content.',
    whyItMatters:
      'The best email sequence is worthless if it never reaches the inbox. For developers, deliverability is an infrastructure problem with a checklist — get the authentication and list practices right and your reach can jump dramatically.',
    related: ['email-open-rate'],
    relatedPosts: [
      { slug: 'email-deliverability-for-developers', label: 'Email Deliverability for Developers' },
    ],
  },
  {
    slug: 'product-market-fit',
    term: 'Product-Market Fit',
    short:
      'The point where a product satisfies strong market demand — people actively want and keep using it.',
    definition:
      'Product-market fit is the stage at which your product satisfies a strong market demand: customers adopt it, keep using it, and tell others. A common signal is that at least 40% of users would be "very disappointed" if the product disappeared, alongside flattening retention and organic word of mouth.',
    whyItMatters:
      'Marketing amplifies whatever you have — including a lack of demand. Chasing growth before product-market fit wastes money; confirming it first makes every later marketing dollar far more effective.',
    related: ['churn-rate', 'value-proposition', 'north-star-metric'],
    relatedPosts: [
      {
        slug: 'customer-discovery-for-indie-developers',
        label: 'Customer Discovery for Indie Developers',
      },
      { slug: 'why-developer-products-fail-marketing', label: 'Why Developer Products Fail' },
    ],
  },
  {
    slug: 'freemium',
    term: 'Freemium',
    short:
      'A model offering a free tier forever, with paid upgrades for advanced features or higher limits.',
    definition:
      'Freemium is a pricing model that offers a permanently free tier with core functionality, while charging for advanced features, higher usage limits, or team capabilities. It differs from a free trial, which grants full access for a limited time only.',
    whyItMatters:
      'Freemium can drive massive top-of-funnel adoption, but it only works if the free tier is useful enough to attract users yet limited enough to create upgrade pressure. Getting that boundary right is the core design decision.',
    related: ['free-trial', 'conversion-rate', 'marketing-funnel'],
    relatedPosts: [
      { slug: 'freemium-vs-free-trial-vs-demo', label: 'Freemium vs Free Trial vs Demo' },
    ],
  },
  {
    slug: 'free-trial',
    term: 'Free Trial',
    short:
      'Full or near-full access to a paid product for a limited time, after which the user must pay to continue.',
    definition:
      'A free trial gives prospects full or near-full access to a paid product for a limited period — commonly 7 to 30 days — after which they must subscribe to keep using it. Trials can be opt-in (no card required) or opt-out (card required up front).',
    whyItMatters:
      'A free trial lets prospects experience real value before paying, which can dramatically increase conversion when the product delivers a clear "aha" moment quickly. Optimizing time-to-value during the trial is the key lever.',
    related: ['freemium', 'conversion-rate', 'product-market-fit'],
    relatedPosts: [
      { slug: 'saas-free-trial-optimization', label: 'SaaS Free Trial Optimization' },
      { slug: 'freemium-vs-free-trial-vs-demo', label: 'Freemium vs Free Trial vs Demo' },
    ],
  },
  {
    slug: 'social-proof',
    term: 'Social Proof',
    short:
      'Evidence that other people trust and use your product — testimonials, reviews, user counts, logos.',
    definition:
      'Social proof is evidence that other people value and trust your product, used to reduce a prospect’s perceived risk. It includes testimonials, reviews, case studies, customer logos, user counts, and ratings. The principle: people look to others’ behavior to guide their own decisions.',
    whyItMatters:
      'For unknown indie products, social proof is one of the most powerful trust-builders available. Even modest, honest proof — a few real testimonials or a genuine user count — can lift conversion meaningfully.',
    related: ['conversion-rate', 'copywriting', 'landing-page'],
    relatedPosts: [
      { slug: 'case-study-copywriting-saas', label: 'Case Study Copywriting for SaaS' },
      { slug: 'handling-objections-in-copy', label: 'Handling Objections in Copy' },
    ],
  },
  {
    slug: 'north-star-metric',
    term: 'North Star Metric',
    short:
      'The single number that best captures the core value your product delivers — the metric that guides decisions.',
    definition:
      'A North Star metric is the single number that best captures the core value your product delivers to customers, such as weekly active users or projects created. It is not the only metric you track, but it is the one that overrides the others when they conflict.',
    whyItMatters:
      'Without a North Star, teams optimize conflicting metrics and lose the plot. Choosing one creates a hierarchy that aligns every decision and tells you whether the business is genuinely getting healthier.',
    related: ['monthly-recurring-revenue', 'product-market-fit', 'cohort-analysis'],
    relatedPosts: [{ slug: 'north-star-metrics-saas', label: 'North Star Metrics for SaaS' }],
  },
  {
    slug: 'cohort-analysis',
    term: 'Cohort Analysis',
    short:
      'Grouping users by a shared start point (e.g. signup month) to track how their behavior evolves over time.',
    definition:
      'Cohort analysis groups users by a shared characteristic — most often their signup period — and tracks how each group behaves over time. It reveals patterns that aggregate metrics hide, such as whether newer cohorts retain better than older ones.',
    whyItMatters:
      'Cohort analysis separates real improvement from vanity growth. It answers questions like "is our retention actually getting better?" — which a single blended number can never honestly tell you.',
    related: ['churn-rate', 'north-star-metric'],
    relatedPosts: [
      { slug: 'cohort-analysis-for-developers', label: 'Cohort Analysis for Developers' },
    ],
  },
  {
    slug: 'search-engine-optimization',
    term: 'Search Engine Optimization (SEO)',
    short:
      'Optimizing your content and site so it ranks in search engines and earns organic traffic.',
    definition:
      'Search engine optimization (SEO) is the practice of improving your content, site structure, and authority so your pages rank higher in search engine results and earn organic traffic. It spans keyword research, on-page optimization, technical health, and backlinks.',
    whyItMatters:
      'SEO is the compounding acquisition channel: a post that ranks keeps sending visitors for years with no ongoing spend. For developers, it rewards exactly the systematic, iterative work you already do in code.',
    related: ['generative-engine-optimization', 'backlink', 'marketing-funnel'],
    relatedPosts: [
      { slug: 'seo-for-developer-blogs', label: 'SEO for Developer Blogs' },
      { slug: 'keyword-research-for-developers', label: 'Keyword Research for Developers' },
    ],
  },
  {
    slug: 'generative-engine-optimization',
    term: 'Generative Engine Optimization (GEO)',
    short:
      'Optimizing content to be cited by AI engines like ChatGPT, Perplexity, and Google AI Overviews.',
    definition:
      'Generative engine optimization (GEO) is the practice of structuring content so AI engines — ChatGPT, Claude, Perplexity, and Google AI Overviews — cite it when answering user questions. Where SEO optimizes for a ranking position, GEO optimizes for being the source an AI quotes in its synthesized answer.',
    whyItMatters:
      'With AI Overviews appearing on roughly half of Google queries, a growing share of buyer research never reaches a traditional results page. GEO is where SEO was years ago: a first-mover opportunity with a closing window.',
    related: ['search-engine-optimization', 'backlink'],
    relatedPosts: [
      {
        slug: 'generative-engine-optimization-dev-tools',
        label: 'GEO for Dev Tools',
      },
      { slug: 'get-cited-by-chatgpt', label: 'How to Get Cited by ChatGPT' },
    ],
  },
  {
    slug: 'backlink',
    term: 'Backlink',
    short:
      'A link from another website to yours — treated by search engines as a vote of confidence.',
    definition:
      'A backlink is a hyperlink from another website pointing to a page on yours. Search engines treat backlinks as votes of confidence: links from relevant, trustworthy sites signal that your content is credible, making backlinks one of the strongest ranking factors.',
    whyItMatters:
      'Backlinks are usually the reason a well-written new site stalls on page two. Earning even a handful of relevant, quality links — through free tools, guest posts, and genuine relationships — can be the push from page two to page one.',
    related: ['search-engine-optimization', 'generative-engine-optimization'],
    relatedPosts: [{ slug: 'backlinks-for-indie-hackers', label: 'Backlinks for Indie Hackers' }],
  },
];

/** Map for quick lookups by slug (used to resolve related terms). */
export const glossaryBySlug: Record<string, GlossaryTerm> = Object.fromEntries(
  glossary.map((t) => [t.slug, t])
);
