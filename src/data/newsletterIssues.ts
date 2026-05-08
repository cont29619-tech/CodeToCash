/**
 * Newsletter Issues Archive
 *
 * Add new issues here as you send them. Each issue maps to either:
 * - A blog post (link to /blog/[slug])
 * - Or a standalone newsletter issue (future: /newsletter/[slug])
 *
 * To add a new issue, append to the array following this shape:
 * {
 *   issue: number,
 *   title: string,
 *   date: string, // YYYY-MM-DD
 *   description: string,
 *   tags: string[],
 *   link?: { type: 'blog' | 'newsletter', slug: string }
 * }
 */

export interface NewsletterIssue {
  issue: number;
  title: string;
  date: string;
  description: string;
  tags: string[];
  link?: {
    type: 'blog';
    slug: string;
  };
}

export const newsletterIssues: NewsletterIssue[] = [
  {
    issue: 1,
    title: 'The One Landing Page Change That Doubled My Conversion Rate',
    date: '2026-01-07',
    description:
      'A 4.7% vs 2.1% conversion story. The psychology of visibility bias, friction reduction, and specificity in CTAs.',
    tags: ['landing pages', 'conversion', 'copywriting'],
    link: { type: 'blog', slug: 'saas-landing-page-copywriting' },
  },
  {
    issue: 2,
    title: 'Why Your SaaS Pricing Page Is Leaving Money on the Table',
    date: '2026-01-14',
    description:
      'The psychology of anchoring, decoy pricing, and why $49 beats $50. Three pricing experiments you can run this week.',
    tags: ['pricing', 'psychology', 'saas'],
    link: { type: 'blog', slug: 'pricing-psychology-saas' },
  },
  {
    issue: 3,
    title: 'The PAS Copywriting Framework in 5 Minutes',
    date: '2026-01-21',
    description:
      'Problem → Agitate → Solution. The simplest copy framework that works for headlines, emails, and landing pages.',
    tags: ['copywriting', 'frameworks', 'templates'],
    link: { type: 'blog', slug: 'pas-copywriting-framework' },
  },
  {
    issue: 4,
    title: 'Email Sequences That Sell SaaS on Autopilot',
    date: '2026-01-28',
    description:
      '7 email sequences every SaaS needs: welcome, trial nurture, onboarding, re-engagement, and more. With templates.',
    tags: ['email', 'sequences', 'automation'],
    link: { type: 'blog', slug: 'email-sequences-for-saas' },
  },
  {
    issue: 5,
    title: 'How to Run Google Ads on a $100 Budget',
    date: '2026-02-04',
    description:
      'A step-by-step campaign setup for indie devs. Keyword research, ad copy, landing page matching, and budget allocation.',
    tags: ['ads', 'google ads', 'budget marketing'],
    link: { type: 'blog', slug: 'google-ads-for-saas-beginners' },
  },
  {
    issue: 6,
    title: 'Building in Public: The Marketing Strategy That Costs $0',
    date: '2026-02-11',
    description:
      'How to document your journey and turn followers into customers. What to share, when to share, and what to keep private.',
    tags: ['building in public', 'twitter', 'organic marketing'],
    link: { type: 'blog', slug: 'building-in-public-marketing' },
  },
  {
    issue: 7,
    title: 'Marketing for Vibe Coders: Sell What You Build',
    date: '2026-02-18',
    description:
      'The marketing system every vibe coder needs from day one. Speed of building ≠ speed of selling.',
    tags: ['vibe coding', 'strategy', 'beginner'],
    link: { type: 'blog', slug: 'marketing-for-vibe-coders' },
  },
  {
    issue: 8,
    title: 'A/B Testing Landing Pages: A Developer’s Guide',
    date: '2026-02-25',
    description:
      'How to run statistically valid A/B tests without a PhD. Tools, sample sizes, and when to trust your results.',
    tags: ['a/b testing', 'analytics', 'landing pages'],
    link: { type: 'blog', slug: 'ab-testing-landing-page-guide' },
  },
];

export const newsletterTags = [
  'all',
  'landing pages',
  'conversion',
  'copywriting',
  'pricing',
  'saas',
  'frameworks',
  'templates',
  'email',
  'sequences',
  'automation',
  'ads',
  'google ads',
  'budget marketing',
  'building in public',
  'twitter',
  'organic marketing',
  'vibe coding',
  'strategy',
  'beginner',
  'a/b testing',
  'analytics',
  'psychology',
];
