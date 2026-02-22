# CodeToCash.dev

Direct response marketing education for vibe coders and indie developers.

**Live site**: https://codetocash.dev

---

## What This Is

A static marketing education site that teaches developers DRM (Direct Response Marketing) as an engineering discipline — systematic, measurable, testable. Newsletter-first: subscribers get a free cheatsheet PDF on signup, then a 7-email welcome sequence, then weekly tactics every Tuesday.

---

## Tech Stack

- **Astro 5** — static site generator
- **Tailwind CSS v4** — styling
- **ConvertKit** — newsletter subscriptions (Form ID: `9116297`)
- **Vercel** — hosting, auto-deploys on push to `main`

---

## Getting Started

```sh
# Install dependencies
npm install

# Copy env file and fill in your ConvertKit API key
cp .env.example .env

# Start dev server at localhost:4321
npm run dev
```

### Environment Variables

| Variable | Description |
|---|---|
| `PUBLIC_CONVERTKIT_API_KEY` | ConvertKit API key — get it at convertkit.com → Account Settings → Advanced |

---

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build locally |

---

## Project Structure

```
src/
├── components/
│   ├── Navigation.astro
│   └── Footer.astro
├── content/
│   └── blog/          # Markdown blog posts
├── layouts/
│   ├── Layout.astro         # Base HTML shell
│   ├── BlogLayout.astro     # Blog article layout
│   └── PlaybookLayout.astro # Playbook layout
├── pages/
│   ├── index.astro
│   ├── drm-101.astro
│   ├── newsletter.astro
│   ├── welcome.astro
│   ├── tools.astro
│   ├── about.astro
│   ├── 404.astro
│   ├── blog/
│   │   ├── index.astro
│   │   └── [...slug].astro
│   └── playbooks/
│       ├── index.astro
│       └── *.astro          # 8 live playbooks
├── styles/
│   └── global.css           # Tailwind v4 theme tokens + animations
└── utils/
    └── categoryColors.ts    # Shared blog category color map
public/
├── drm-cheatsheet.pdf       # Free download on signup
└── og-default.png           # Default social share image
```

---

## Adding Content

**New blog post**: Create `src/content/blog/your-slug.md` with frontmatter:
```yaml
---
title: "Post Title"
description: "One-sentence description"
pubDate: 2026-01-01
author: "CodeToCash Team"
category: fundamentals  # fundamentals | copywriting | email | ads | analytics | strategy
tags: ["tag1", "tag2"]
readingTime: "5 min read"
featured: false
draft: false
---
```

**New playbook**: Create `src/pages/playbooks/your-slug.astro` using `PlaybookLayout.astro`, then update `src/pages/playbooks/index.astro` to link to it.

---

## Deployment

Vercel auto-deploys on every push to `main`. Set `PUBLIC_CONVERTKIT_API_KEY` in Vercel → Project Settings → Environment Variables.

---

## Contact

hello@codetocash.dev
