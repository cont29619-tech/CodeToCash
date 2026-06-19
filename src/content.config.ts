import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    // Optional ≤60-char SEO title for the <title> tag. Falls back to `title`.
    // Use when `title` is long enough to truncate in search results.
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('CodeToCash Team'),
    category: z.enum(['fundamentals', 'copywriting', 'email', 'ads', 'analytics', 'strategy']),
    tags: z.array(z.string()),
    readingTime: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { blog };
