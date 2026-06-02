import type { CollectionEntry } from 'astro:content';

// The featured post is pinned as the page-1 hero. The chronological "stream" below
// excludes it, so it never appears twice across the paginated archive.
export const FIRST_PAGE_REGULAR = 11; // regular cards on page 1 (hero is shown separately → 12 total)
export const POSTS_PER_PAGE = 12;

export interface BlogPagination {
  featuredPost: CollectionEntry<'blog'>;
  stream: CollectionEntry<'blog'>[]; // all non-featured posts, newest first
  totalPages: number;
  totalPosts: number;
}

export function getBlogPagination(allPosts: CollectionEntry<'blog'>[]): BlogPagination {
  const sorted = [...allPosts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const featuredPost = sorted.find((p) => p.data.featured) ?? sorted[0];
  const stream = sorted.filter((p) => p.id !== featuredPost?.id);
  const totalPages =
    stream.length <= FIRST_PAGE_REGULAR
      ? 1
      : 1 + Math.ceil((stream.length - FIRST_PAGE_REGULAR) / POSTS_PER_PAGE);
  return { featuredPost, stream, totalPages, totalPosts: sorted.length };
}

/** Regular-grid posts for a given page (page 1 excludes the hero, shown separately). */
export function getPageStreamSlice(
  stream: CollectionEntry<'blog'>[],
  page: number
): CollectionEntry<'blog'>[] {
  if (page <= 1) return stream.slice(0, FIRST_PAGE_REGULAR);
  const start = FIRST_PAGE_REGULAR + (page - 2) * POSTS_PER_PAGE;
  return stream.slice(start, start + POSTS_PER_PAGE);
}
