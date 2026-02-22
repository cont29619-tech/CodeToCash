import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { renderBlogOgImage } from '../../../utils/ogImageRenderer';

export const prerender = true;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id } }));
};

export const GET: APIRoute = async ({ params }) => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const post = posts.find((p) => p.id === params.slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const png = await renderBlogOgImage({
    title: post.data.title,
    category: post.data.category,
    author: post.data.author,
    readingTime: post.data.readingTime,
  });

  return new Response(png, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
