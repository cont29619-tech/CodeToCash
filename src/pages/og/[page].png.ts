import type { APIRoute, GetStaticPaths } from 'astro';
import { renderPageOgImage } from '../../utils/ogImageRenderer';

export const prerender = true;

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  start: {
    title: 'Start Here',
    subtitle: 'Your First 30 Minutes',
  },
  'drm-101': {
    title: 'DRM 101',
    subtitle: 'The Complete Guide',
  },
  tools: {
    title: 'Marketing Tools',
    subtitle: 'For Developers',
  },
  newsletter: {
    title: 'Newsletter',
    subtitle: 'One Tactic Every Week',
  },
  playbooks: {
    title: 'Playbooks',
    subtitle: 'Step-by-Step Guides',
  },
  blog: {
    title: 'Blog',
    subtitle: 'Direct Response Marketing',
  },
  about: {
    title: 'About',
    subtitle: 'CodeToCash.dev',
  },
};

export const getStaticPaths: GetStaticPaths = async () => {
  return Object.keys(pageMeta).map((page) => ({ params: { page } }));
};

export const GET: APIRoute = async ({ params }) => {
  const meta = pageMeta[params.page as string];

  if (!meta) {
    return new Response('Not found', { status: 404 });
  }

  const png = await renderPageOgImage(meta);

  return new Response(Buffer.from(png), {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
