import type { CollectionEntry } from 'astro:content';

// A tag only gets its own /blog/tag/[tag] page when at least this many posts use it.
// Below the threshold the tag is rendered as plain text (no link) to avoid 404s.
export const MIN_POSTS_FOR_TAG_PAGE = 3;

/** Convert a tag label into its URL slug. Single source of truth for tag → slug. */
export function slugifyTag(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, '-');
}

/** Count how many posts use each tag. */
export function getTagCounts(posts: CollectionEntry<'blog'>[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }
  return counts;
}

/** The set of tag slugs that have a generated page (≥ MIN_POSTS_FOR_TAG_PAGE posts). */
export function getLinkableTagSlugs(posts: CollectionEntry<'blog'>[]): Set<string> {
  const counts = getTagCounts(posts);
  const linkable = new Set<string>();
  for (const [tag, count] of counts) {
    if (count >= MIN_POSTS_FOR_TAG_PAGE) linkable.add(slugifyTag(tag));
  }
  return linkable;
}
