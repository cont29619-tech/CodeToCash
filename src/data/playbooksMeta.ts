export interface PlaybookMeta {
  slug: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: string;
}

export const playbooksMeta: PlaybookMeta[] = [
  {
    slug: 'saas-landing-page',
    title: 'How to Write a SaaS Landing Page That Converts',
    description:
      'Write a landing page that converts visitors into users. Covers headline formulas, social proof, CTAs, and pricing sections.',
    difficulty: 'Beginner',
    readingTime: '15 min read',
  },
  {
    slug: 'email-launch-sequence',
    title: 'Email Launch Sequence for Developers',
    description:
      'A proven 7-email sequence for launching your product. Includes subject lines, timing, and copy templates.',
    difficulty: 'Intermediate',
    readingTime: '20 min read',
  },
  {
    slug: 'google-ads-100-budget',
    title: 'Your First Google Ad Campaign on a $100 Budget',
    description:
      'Run your first Google Ads campaign with just $100. Keyword research, ad copy, bidding strategy, and conversion tracking.',
    difficulty: 'Beginner',
    readingTime: '18 min read',
  },
  {
    slug: 'copywriting-for-developers',
    title: 'Writing Copy When You Hate Writing Copy',
    description:
      'Simple copywriting formulas that work even if you hate writing. PAS, AIDA, and more with developer-friendly examples.',
    difficulty: 'Beginner',
    readingTime: '12 min read',
  },
  {
    slug: 'pricing-dev-product',
    title: 'Pricing Your Dev Product for Maximum Revenue',
    description:
      'How to price your SaaS, tool, or digital product for maximum revenue. Tiers, anchoring, and psychological pricing tactics.',
    difficulty: 'Intermediate',
    readingTime: '16 min read',
  },
  {
    slug: 'building-in-public',
    title: 'Building in Public as a Marketing Strategy',
    description:
      'Turn your build process into a marketing channel. How to share progress, grow an audience, and launch with built-in demand.',
    difficulty: 'Beginner',
    readingTime: '14 min read',
  },
  {
    slug: 'ab-testing-guide',
    title: "The Developer's A/B Testing Guide",
    description:
      'Run A/B tests on your landing page, emails, and ads like a scientist. Statistical significance, test design, and analysis.',
    difficulty: 'Intermediate',
    readingTime: '22 min read',
  },
  {
    slug: 'cold-email-outreach',
    title: 'Cold Email Outreach for Dev Tools',
    description:
      'Write cold emails that get replies. Personalization at scale, sequences, and follow-up strategies for developer tools.',
    difficulty: 'Advanced',
    readingTime: '25 min read',
  },
];
