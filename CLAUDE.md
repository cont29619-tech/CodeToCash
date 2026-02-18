# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

codetocash.dev — a static marketing education site for indie developers, built with Astro 5, Tailwind CSS v4, and TypeScript (strict mode). Dark-themed, no JS framework — all interactivity is vanilla JS in `<script>` tags.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server at localhost:4321 |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview built site locally |

No test framework or linter is configured.

## Architecture

**Static Site Generation (SSG)**: All pages are statically generated. No server-side endpoints exist.

**Routing**: File-based via `src/pages/`. Dynamic blog routes use `src/pages/blog/[...slug].astro` with `getStaticPaths()`.

**Layout hierarchy**:
- `Layout.astro` — base HTML shell (SEO meta, OG tags, nav, footer, global scripts)
- `BlogLayout.astro` — extends Layout with TOC sidebar, prev/next nav, related posts, Article JSON-LD
- `PlaybookLayout.astro` — extends Layout with section nav sidebar for long-form guides

**Content Collections**: Blog posts are Markdown in `src/content/blog/`, validated by a Zod schema in `src/content.config.ts`. Categories: fundamentals, copywriting, email, ads, analytics, strategy.

**Styling**: Tailwind v4 via `@tailwindcss/vite` plugin (configured in `astro.config.mjs`, not a standalone tailwind config file). Brand tokens defined in `src/styles/global.css` using `@theme` — key colors are `coral` (#E94560), `deep-blue` (#0F3460), `navy` (#0A0A1A), `navy-light` (#111127). Fonts: Inter (sans), JetBrains Mono (mono).

**Newsletter integration**: ConvertKit API v3, called client-side from `newsletter.astro`. Form ID `9097989` is hardcoded; API key comes from `PUBLIC_CONVERTKIT_API_KEY` env var. On success, redirects to `/welcome`.

**Scroll animations**: Pages use `.section-animate` class with `IntersectionObserver` to trigger `.visible` transitions. Mobile animations are disabled for performance.

**SEO**: Each page sets its own title, description, canonical URL, OG/Twitter tags via Layout props. Blog posts include Schema.org Article JSON-LD.

## Key Files

- `astro.config.mjs` — site URL (`https://codetocash.dev`), Vite plugins, sitemap integration
- `src/content.config.ts` — blog collection schema definition
- `src/styles/global.css` — Tailwind v4 theme tokens, custom animations
- `src/components/Navigation.astro` — top nav with mobile hamburger menu
- `src/components/Footer.astro` — footer with inline newsletter form
- `.env` — `PUBLIC_CONVERTKIT_API_KEY` (required for newsletter forms)
