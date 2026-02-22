export interface PlaybookMeta {
  slug: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: string;
}

export const playbooksMeta: PlaybookMeta[] = [
  {
    slug: 'saas-landing-page',
    title: 'How to Write a SaaS Landing Page That Converts',
    difficulty: 'Beginner',
    readingTime: '15 min read',
  },
  {
    slug: 'email-launch-sequence',
    title: 'Email Launch Sequence for Developers',
    difficulty: 'Intermediate',
    readingTime: '20 min read',
  },
  {
    slug: 'google-ads-100-budget',
    title: 'Your First Google Ad Campaign on a $100 Budget',
    difficulty: 'Beginner',
    readingTime: '18 min read',
  },
  {
    slug: 'copywriting-for-developers',
    title: 'Writing Copy When You Hate Writing Copy',
    difficulty: 'Beginner',
    readingTime: '12 min read',
  },
  {
    slug: 'pricing-dev-product',
    title: 'Pricing Your Dev Product for Maximum Revenue',
    difficulty: 'Intermediate',
    readingTime: '16 min read',
  },
  {
    slug: 'building-in-public',
    title: 'Building in Public as a Marketing Strategy',
    difficulty: 'Beginner',
    readingTime: '14 min read',
  },
  {
    slug: 'ab-testing-guide',
    title: "The Developer's A/B Testing Guide",
    difficulty: 'Intermediate',
    readingTime: '22 min read',
  },
  {
    slug: 'cold-email-outreach',
    title: 'Cold Email Outreach for Dev Tools',
    difficulty: 'Advanced',
    readingTime: '25 min read',
  },
];
