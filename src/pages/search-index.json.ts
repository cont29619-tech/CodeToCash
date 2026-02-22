import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { playbooksMeta } from '../data/playbooksMeta';

export const prerender = true;

export interface SearchItem {
  title: string;
  description: string;
  url: string;
  type: 'blog' | 'playbook' | 'page';
  category: string;
  tags?: string[];
}

const staticPages: SearchItem[] = [
  {
    title: 'DRM 101: The Complete Guide',
    description:
      'The complete direct response marketing guide for developers. 8 chapters covering the full DRM funnel.',
    url: '/drm-101',
    type: 'page',
    category: 'guide',
  },
  {
    title: 'Marketing Tools for Developers',
    description:
      'Curated tool reviews for landing pages, email, analytics, and ads — with recommended stacks at every budget.',
    url: '/tools',
    type: 'page',
    category: 'tools',
  },
  {
    title: 'Newsletter',
    description:
      'One marketing tactic every week, built for developers. Subscribe free and get the DRM cheatsheet.',
    url: '/newsletter',
    type: 'page',
    category: 'newsletter',
  },
  {
    title: 'Blog',
    description: 'Articles on direct response marketing for developers and indie hackers.',
    url: '/blog',
    type: 'page',
    category: 'blog',
  },
  {
    title: 'Playbooks',
    description: 'Step-by-step marketing playbooks for developers. 8 playbooks live.',
    url: '/playbooks',
    type: 'page',
    category: 'playbooks',
  },
  {
    title: 'About CodeToCash',
    description:
      'The story behind CodeToCash.dev and what we believe about marketing for developers.',
    url: '/about',
    type: 'page',
    category: 'about',
  },
];

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const blogItems: SearchItem[] = posts.map((p) => ({
    title: p.data.title,
    description: p.data.description,
    url: `/blog/${p.id}`,
    type: 'blog',
    category: p.data.category,
    tags: p.data.tags,
  }));

  const playbookItems: SearchItem[] = playbooksMeta.map((p) => ({
    title: p.title,
    description: p.description,
    url: `/playbooks/${p.slug}`,
    type: 'playbook',
    category: 'playbook',
    tags: [p.difficulty, p.readingTime],
  }));

  const index: SearchItem[] = [...blogItems, ...playbookItems, ...staticPages];

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  });
};
