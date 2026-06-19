// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// Build a slug -> last-modified date map from blog frontmatter so the sitemap
// reports an accurate <lastmod> per post (updatedDate when present, else
// pubDate) rather than a build-time timestamp that marks everything as changed.
const blogDir = fileURLToPath(new URL('./src/content/blog', import.meta.url));
/** @type {Record<string, string>} */
const blogLastmod = {};
for (const file of readdirSync(blogDir)) {
  if (!file.endsWith('.md')) continue;
  const raw = readFileSync(`${blogDir}/${file}`, 'utf-8');
  const pub = raw.match(/^pubDate:\s*['"]?([0-9-]+)/m)?.[1];
  const upd = raw.match(/^updatedDate:\s*['"]?([0-9-]+)/m)?.[1];
  const date = upd || pub;
  if (date) blogLastmod[file.replace(/\.md$/, '')] = new Date(date).toISOString();
}

// https://astro.build/config
export default defineConfig({
  site: 'https://codetocash.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/welcome'),
      serialize(item) {
        const slug = item.url.match(/\/blog\/([^/]+)\/?$/)?.[1];
        if (slug && blogLastmod[slug]) {
          item.lastmod = blogLastmod[slug];
        }
        item.changefreq = 'weekly';
        item.priority = item.url === 'https://codetocash.dev/' ? 1.0 : 0.7;
        return item;
      },
    }),
  ],
});
