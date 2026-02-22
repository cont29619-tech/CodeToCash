import type { CollectionEntry } from 'astro:content';

export function getRelatedPosts(
  currentPost: CollectionEntry<'blog'>,
  allPosts: CollectionEntry<'blog'>[],
  count = 3,
): CollectionEntry<'blog'>[] {
  const candidates = allPosts.filter(p => p.id !== currentPost.id && !p.data.draft);

  // Priority 1: same category, sorted by recency
  const sameCategory = candidates
    .filter(p => p.data.category === currentPost.data.category)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  if (sameCategory.length >= count) return sameCategory.slice(0, count);

  // Priority 2: tag matches (different category), sorted by match count then recency
  const currentTags = new Set(currentPost.data.tags);
  const tagMatches = candidates
    .filter(p => p.data.category !== currentPost.data.category)
    .map(p => ({
      post: p,
      matchCount: p.data.tags.filter(t => currentTags.has(t)).length,
    }))
    .filter(({ matchCount }) => matchCount > 0)
    .sort((a, b) =>
      b.matchCount !== a.matchCount
        ? b.matchCount - a.matchCount
        : b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf(),
    )
    .map(({ post }) => post);

  const combined = [...sameCategory, ...tagMatches];
  if (combined.length >= count) return combined.slice(0, count);

  // Priority 3: most recent fallback (anything not already included)
  const combinedIds = new Set(combined.map(p => p.id));
  const remaining = candidates
    .filter(p => !combinedIds.has(p.id))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return [...combined, ...remaining].slice(0, count);
}
