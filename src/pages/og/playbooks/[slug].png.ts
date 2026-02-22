import type { APIRoute, GetStaticPaths } from 'astro';
import { playbooksMeta } from '../../../data/playbooksMeta';
import { renderPlaybookOgImage } from '../../../utils/ogImageRenderer';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  return playbooksMeta.map((p) => ({ params: { slug: p.slug } }));
};

export const GET: APIRoute = async ({ params }) => {
  const playbook = playbooksMeta.find((p) => p.slug === params.slug);

  if (!playbook) {
    return new Response('Not found', { status: 404 });
  }

  const png = await renderPlaybookOgImage({
    title: playbook.title,
    difficulty: playbook.difficulty,
    readingTime: playbook.readingTime,
  });

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
