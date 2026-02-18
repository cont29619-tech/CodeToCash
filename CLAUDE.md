# CodeToCash — Project Context

> This file is the single source of truth for AI assistants (Claude Code, Claude web, etc.) working on this codebase. Paste or upload this file to give Claude full project context.

---

## What This Project Is

**codetocash.dev** — A static marketing education site for indie developers and vibe coders. It teaches Direct Response Marketing (DRM) in developer terms: systematic, measurable, testable — like writing code.

**The core premise**: Developers can build great products but struggle to sell them. This site teaches them marketing as an engineering discipline — with frameworks, templates, and real examples.

**Audience**: Vibe coders, indie hackers, solo developers shipping SaaS, tools, or digital products.

**Business model**: Newsletter-first. The site captures email subscribers via ConvertKit and delivers a free cheatsheet PDF immediately, then a 7-email welcome sequence, then weekly DRM tactics every Tuesday.

**Live URL**: https://codetocash.dev
**Contact**: hello@codetocash.dev

---

## Tech Stack

| Technology | Version | Role |
|---|---|---|
| Astro | ^5.17.1 | Static site generator (SSG) |
| Tailwind CSS | ^4.1.18 | CSS framework |
| @tailwindcss/vite | ^4.1.18 | Tailwind v4 Vite plugin |
| @astrojs/sitemap | ^3.7.0 | Auto-generates sitemap.xml |
| TypeScript | Astro built-in | Strict mode, no separate tsconfig needed |
| Vanilla JS | — | All interactivity via `<script>` tags in Astro components |
| ConvertKit | API v3 | Newsletter subscriptions (Form ID: `9097989`) |

**No**: React, Vue, Svelte, or any JS framework. No test framework. No ESLint.

---

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview the built site locally |

---

## Environment Variables

```bash
# .env (never commit this file)
PUBLIC_CONVERTKIT_API_KEY=your_key_here
```

- Must be prefixed `PUBLIC_` so Astro exposes it client-side
- Set in Vercel dashboard: Project → Settings → Environment Variables
- Required for all newsletter subscription forms to work

---

## Architecture

### Static Site Generation (SSG)
All pages are pre-rendered at build time to `./dist/`. No server-side rendering, no API endpoints, no edge functions. The site is pure static HTML/CSS/JS.

### Routing
File-based routing via `src/pages/`. Every `.astro` file becomes a URL:
- `src/pages/index.astro` → `/`
- `src/pages/drm-101.astro` → `/drm-101`
- `src/pages/blog/[...slug].astro` → `/blog/[slug]` (dynamic, uses `getStaticPaths()`)

### Layout Hierarchy
```
Layout.astro          ← base HTML shell, used by every page
├── BlogLayout.astro  ← wraps Layout, adds TOC sidebar + blog-specific features
└── PlaybookLayout.astro ← wraps Layout, adds numbered section sidebar
```

### Content Collections
Blog posts live in `src/content/blog/` as Markdown files. Schema validated by Zod in `src/content.config.ts`. Uses Astro 5's glob loader.

### Deployment
Connected to Vercel via GitHub. Every push to `main` auto-deploys.

---

## Pages

### `/` — index.astro (Home)
Marketing landing page. Sections:
1. **HERO** — "You Can Build Anything. Now Learn to Sell It." — code decoration injected via `requestAnimationFrame` post-paint to protect LCP
2. **PROBLEM** — Three problem cards ("You Build But Nobody Buys", "Marketing Feels Sleazy", "No System, Just Hoping")
3. **SOLUTION** — DRM pipeline visualised as a code pipeline: `Traffic → Landing Page → Email Sequence → Offer → Revenue`
4. **CURRICULUM** — Six feature cards (Landing Pages, Copywriting, Email Sequences, Ads, Pricing, Analytics)
5. **SOCIAL PROOF** — Three testimonials
6. **NEWSLETTER CTA** — Email signup
7. **FINAL CTA** — Link to DRM 101 guide

Includes WebSite schema JSON-LD. Uses `IntersectionObserver` for `.section-animate` scroll animations.

---

### `/drm-101` — drm-101.astro (Long-Form Guide)
The flagship content piece. ~45 min read. The complete DRM guide.

**Structure**:
- Hero with reading time + last updated badges
- Sticky desktop TOC sidebar (8 chapters + summary)
- Collapsible mobile TOC button
- 8 chapters + summary section
- Inline cheatsheet CTAs scattered throughout (8 total)
- Final related playbooks section

**Chapters**:
1. What Is Direct Response Marketing?
2. The DRM Funnel — Your Sales Pipeline
3. Crafting an Irresistible Offer
4. Copywriting for Developers Who Hate Writing
5. Landing Pages That Convert
6. Email Marketing for Developers
7. Driving Traffic to Your Product
8. Analytics and Optimization

**Inline CTA Forms** (8 instances): All use class `drm-subscribe-form` and submit to ConvertKit via JS, redirecting to `/welcome` on success.

**JavaScript**: Mobile TOC toggle, smooth scroll for anchor links, IntersectionObserver for active section highlighting in TOC, ConvertKit subscription handler.

---

### `/newsletter` — newsletter.astro (Newsletter Signup)
Dedicated subscription page. Sections:
1. **HERO** — "One Marketing Tactic. Every Week. Built for Developers." — Large heading with ConvertKit form
2. **WHAT YOU GET** — Five benefit cards with SVG icons
3. **TESTIMONIALS** — Three developer testimonials with star ratings
4. **SAMPLE ISSUE** — Email client UI mockup showing a real newsletter example
5. **FINAL CTA** — Second signup form

Both forms use ConvertKit API, redirect to `/welcome` on success.

---

### `/welcome` — welcome.astro (Post-Subscription Thank You)
Shown after a successful subscription. Sections:
1. **SUCCESS HERO** — Green checkmark, "You're in! Welcome to CodeToCash."
2. **CHEATSHEET DOWNLOAD** — Download button → `/drm-cheatsheet.pdf`
3. **EMAIL SEQUENCE PREVIEW** — 5 emails listed (sent over 11 days)
4. **START HERE** — Two action cards: DRM 101 guide and Blog

---

### `/blog` — blog/index.astro (Blog Index)
Lists all published blog posts (draft: false). Category filter buttons. Post cards with category badge, reading time, title, description, date.

### `/blog/[slug]` — blog/[...slug].astro (Blog Post)
Renders Markdown content via `BlogLayout.astro`. Uses `getStaticPaths()` with content collections.

---

### `/playbooks` — playbooks/index.astro (Playbooks Index)
Lists 8 planned playbooks as cards. Only 1 is implemented:
- ✅ `/playbooks/saas-landing-page` — "How to Write a SaaS Landing Page That Converts"
- 🔒 7 others are listed but pages don't exist yet (coming soon state)

### `/playbooks/saas-landing-page` — playbooks/saas-landing-page.astro
Long-form playbook using `PlaybookLayout.astro`. Beginner, 15 min read.

---

### `/tools` — tools.astro (Marketing Tools)
Curated tool reviews for developers. Features:
- Category filter buttons (JS-powered)
- Tool cards with pros, cons, pricing, "best for" tags
- Three recommended stacks:
  - **The Free Stack** ($0/mo): Astro + Tailwind, Buttondown, Plausible self-hosted, PostHog
  - **The Sweet Spot** (~$30/mo): Framer, ConvertKit, Plausible, PostHog ← highlighted
  - **The Growth Stack** (~$100/mo): Next.js + Vercel, Loops, PostHog, Unbounce
- Newsletter CTA at bottom

---

### `/about` — about.astro (About Page)
Brand story and values. Sections: Hero, Story timeline, What We Believe (4 values), What We Offer (6 resource cards), Contact.

### `/404` — 404.astro (Error Page)
Themed 404 with a code snippet: `throw new Error("404: This page doesn't exist")`. Three nav buttons: Home, Blog, DRM 101.

---

## Components

### `Navigation.astro`
Fixed top nav. No props.

- **Logo**: "CodeToCash.dev" — coral color on `.dev`
- **Desktop links**: Home, DRM 101, Playbooks, Tools, Blog, Newsletter
- **Active state**: `bg-coral/10 text-coral` applied to current page link (checked via `Astro.url.pathname`)
- **Subscribe button**: Coral filled button linking to `/newsletter`
- **Mobile**: Hamburger button toggles a full-screen overlay menu. Uses `.open` class + `aria-expanded` for accessibility.

### `Footer.astro`
Site footer. No props.

- **Brand column**: Logo + tagline
- **Nav column**: Home, DRM 101, Playbooks, Blog
- **Resources column**: Tools, Newsletter, About, Contact (mailto)
- **Newsletter form**: Inline email signup form
- **Bottom bar**: Copyright

> ⚠️ Footer still uses Buttondown form — should be migrated to ConvertKit.

---

## Layouts

### `Layout.astro`
Base wrapper for all pages.

**Props**:
```typescript
{
  title?: string        // <title> tag
  description?: string  // <meta name="description">
  schema?: string       // JSON-LD string injected in <head>
}
```

Provides: charset/viewport, favicon, title, description, canonical URL, OG tags (og:type, og:url, og:title, og:description, og:image), Twitter Card tags, Google Fonts (Inter + JetBrains Mono, loaded async), Navigation, main slot, Footer, back-to-top button.

- **Canonical**: `new URL(Astro.url.pathname, Astro.site)`
- **OG Image**: `/og-default.png`
- **Back-to-top**: Appears after 400px scroll, uses `requestAnimationFrame` for scroll performance

---

### `BlogLayout.astro`
Wraps `Layout.astro` for blog posts.

**Props**:
```typescript
{
  post: CollectionEntry<'blog'>
  headings: { depth: number; slug: string; text: string }[]
  relatedPosts: CollectionEntry<'blog'>[]
  prevPost?: CollectionEntry<'blog'>
  nextPost?: CollectionEntry<'blog'>
}
```

Provides: breadcrumb nav, article header (category badge, reading time, date, author), two-column layout (article content left, sticky sidebar right), TOC (h2 only), sidebar newsletter widget, related posts links, share buttons (Twitter, LinkedIn, copy link), related articles grid, newsletter CTA box, prev/next navigation.

**Category badge colors**:
| Category | Color |
|---|---|
| fundamentals | blue #3b82f6 |
| copywriting | purple #a855f7 |
| email | green #22c55e |
| ads | yellow #eab308 |
| analytics | cyan #06b6d4 |
| strategy | coral #E94560 |

**Article prose styling**: Uses `.prose-blog` class with custom heading, paragraph, list, blockquote, code, and link styles.

> ⚠️ Sidebar newsletter widget still uses Buttondown — should be migrated to ConvertKit.

---

### `PlaybookLayout.astro`
Wraps `Layout.astro` for playbooks.

**Props**:
```typescript
{
  title: string
  metaTitle: string
  metaDescription: string
  subtitle: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  readingTime: string
  lastUpdated: string
  sections: { id: string; title: string }[]
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
  schema?: string
}
```

Provides: breadcrumb, hero with difficulty badge + reading time + last updated, two-column layout (sticky numbered TOC sidebar left, content right), newsletter CTA, prev/next playbook navigation.

**Difficulty badge colors**: Beginner=green, Intermediate=yellow, Advanced=red.

---

## Styling System

### Theme Tokens (`src/styles/global.css`)

```css
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;
  --color-coral: #E94560;       /* Primary accent — CTAs, highlights, active states */
  --color-deep-blue: #0F3460;   /* Secondary — gradient backgrounds */
  --color-navy: #0A0A1A;        /* Background base */
  --color-navy-light: #111127;  /* Slightly lighter background for section contrast */
}
```

Use these as Tailwind classes: `text-coral`, `bg-navy`, `border-deep-blue`, `bg-navy-light`, etc.

### Animations

| Class | Description |
|---|---|
| `.animate-fade-in` | 0.8s opacity fade from 0→1 |
| `.animate-fade-in-up` | 0.8s fade + translateY(20px→0) |
| `.animate-pulse-slow` | 6s slow opacity pulse (for background glows) |
| `.animation-delay-200` | 200ms animation delay |
| `.animation-delay-400` | 400ms animation delay |
| `.animation-delay-2000` | 2s animation delay |
| `.section-animate` | Scroll-triggered: hidden by default, add `.visible` to reveal |

**Mobile optimization**: `animate-fade-in` and `animate-fade-in-up` are disabled at `max-width: 767px` — animations are `none` on mobile for faster LCP.

**Reduced motion**: All animations disabled when `prefers-reduced-motion: reduce`.

### Scroll Animation Pattern
```javascript
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.section-animate').forEach(el => observer.observe(el));
```

### Common UI Patterns

**Cards**:
```html
<div class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]
            hover:border-coral/20 hover:bg-white/[0.04] transition-all duration-300">
```

**Primary Button**:
```html
<button class="px-8 py-4 bg-coral text-white font-semibold rounded-lg
               hover:bg-coral/90 hover:scale-[1.02] transition-all duration-200
               shadow-lg shadow-coral/20 cursor-pointer">
```

**Email Input**:
```html
<input type="email" class="flex-1 px-5 py-4 bg-white/5 border border-white/10 rounded-lg
                            text-white placeholder-gray-500
                            focus:outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/20
                            transition-all duration-200" />
```

**Section Label** (eyebrow text):
```html
<p class="text-sm font-mono text-coral uppercase tracking-widest mb-4">// section name</p>
```

**Background Glow**:
```html
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[800px] h-[600px] bg-coral/5 rounded-full blur-[120px] animate-pulse-slow">
```

---

## ConvertKit Integration

### Configuration
- **Form ID**: `9097989` (hardcoded everywhere)
- **API Key**: `import.meta.env.PUBLIC_CONVERTKIT_API_KEY`
- **API Endpoint**: `POST https://api.convertkit.com/v3/forms/9097989/subscribe`
- **Request body**: `{ api_key: string, email: string }`
- **Success action**: `window.location.href = '/welcome'`

### Standard Subscribe Handler Pattern
```javascript
const CONVERTKIT_FORM_ID = '9097989';
const CONVERTKIT_API_KEY = import.meta.env.PUBLIC_CONVERTKIT_API_KEY;

async function handleSubscribe(form, errorEl) {
  const email = new FormData(form).get('email');
  const button = form.querySelector('button');
  const originalText = button.textContent;

  errorEl.classList.add('hidden');
  button.disabled = true;
  button.textContent = 'Subscribing...';

  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
      }
    );
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      throw new Error(data?.message || 'Subscription failed. Please try again.');
    }
    window.location.href = '/welcome';
  } catch (err) {
    errorEl.textContent = err instanceof Error ? err.message : 'Something went wrong.';
    errorEl.classList.remove('hidden');
    button.disabled = false;
    button.textContent = originalText;
  }
}
```

### Where ConvertKit Is Used
| File | Status |
|---|---|
| `newsletter.astro` | ✅ ConvertKit (2 forms: hero + CTA) |
| `drm-101.astro` | ✅ ConvertKit (8 inline forms, class `drm-subscribe-form`) |
| `Footer.astro` | ⚠️ Still Buttondown — needs migration |
| `BlogLayout.astro` | ⚠️ Still Buttondown — needs migration |
| `PlaybookLayout.astro` | ⚠️ Still Buttondown — needs migration |
| `index.astro` | ⚠️ Needs verification |

---

## Content Collections

### Blog Schema (`src/content.config.ts`)
```typescript
z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('CodeToCash Team'),
  category: z.enum(['fundamentals', 'copywriting', 'email', 'ads', 'analytics', 'strategy']),
  tags: z.array(z.string()),
  readingTime: z.string(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
})
```

### Published Blog Posts
| Slug | Title | Category | Featured |
|---|---|---|---|
| `what-is-direct-response-marketing-for-developers` | "What Is Direct Response Marketing? A Vibe Coder's Guide" | fundamentals | ⭐ yes |
| `copywriting-frameworks-for-developers` | "5 Copywriting Frameworks Every Vibe Coder Should Know" | copywriting | no |
| `marketing-for-vibe-coders` | "Marketing for Vibe Coders: How to Sell What You Build with AI" | strategy | no |

### Playbooks Status
| Slug | Title | Status |
|---|---|---|
| `saas-landing-page` | "How to Write a SaaS Landing Page That Converts" | ✅ Live |
| `email-launch-sequence` | "Email Launch Sequence for Developers" | 🔒 Not built |
| `google-ads-100-budget` | "Your First Google Ad Campaign on a $100 Budget" | 🔒 Not built |
| `copywriting-for-developers` | "Writing Copy When You Hate Writing Copy" | 🔒 Not built |
| `pricing-dev-product` | "Pricing Your Dev Product for Maximum Revenue" | 🔒 Not built |
| `building-in-public` | "Building in Public as a Marketing Strategy" | 🔒 Not built |
| `ab-testing-guide` | "The Developer's A/B Testing Guide" | 🔒 Not built |
| `cold-email-outreach` | "Cold Email Outreach for Dev Tools" | 🔒 Not built |

---

## Key Files Reference

| File | Purpose |
|---|---|
| `astro.config.mjs` | Site URL, Vite plugins (Tailwind), sitemap integration |
| `src/content.config.ts` | Blog collection Zod schema |
| `src/styles/global.css` | Tailwind v4 import, theme tokens, all custom animations |
| `src/components/Navigation.astro` | Top nav with mobile hamburger menu |
| `src/components/Footer.astro` | Footer with nav columns and newsletter form |
| `src/layouts/Layout.astro` | Base HTML shell (SEO, fonts, nav, footer, back-to-top) |
| `src/layouts/BlogLayout.astro` | Blog article layout with TOC sidebar |
| `src/layouts/PlaybookLayout.astro` | Playbook layout with numbered section sidebar |
| `public/drm-cheatsheet.pdf` | Free cheatsheet PDF (~12KB), downloaded from `/welcome` |
| `public/og-default.png` | Default OG image for social sharing |
| `.env` | `PUBLIC_CONVERTKIT_API_KEY` — never commit, set in Vercel dashboard |

---

## Conventions & Patterns

### File Naming
- **Components**: `PascalCase.astro`
- **Pages**: `kebab-case.astro`
- **Blog posts**: `kebab-case.md` (filename = URL slug)

### Tailwind Usage
- Use theme tokens: `text-coral`, `bg-navy`, `bg-navy-light`, `text-deep-blue`
- Opacity variants for subtle tints: `bg-coral/10`, `border-white/[0.06]`
- Responsive: `sm:`, `md:`, `lg:` prefixes
- Never write custom CSS if a Tailwind class exists

### Adding a New Page
1. Create `src/pages/your-page.astro`
2. Import and use `Layout.astro` with `title`, `description` props
3. Set your own canonical URL, OG tags via Layout props
4. Add to Navigation links if it should appear in nav

### Adding a New Blog Post
1. Create `src/content/blog/your-post-slug.md`
2. Add required frontmatter (title, description, pubDate, category, tags, readingTime)
3. Write content in Markdown — it auto-renders via BlogLayout

### Adding a New Playbook
1. Create `src/pages/playbooks/your-playbook.astro`
2. Use `PlaybookLayout.astro` with all required props
3. Define `sections` array for the TOC
4. Update the playbooks index page to mark it as live

### TypeScript
- Strict mode — no `any` types
- Props interfaces defined in layout frontmatter with `interface Props {}`
- Content collection entries typed as `CollectionEntry<'blog'>`

### Accessibility Checklist
- Use semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`
- Add `aria-label` to icon-only buttons
- Add `aria-expanded` to toggles
- Add `alt` text to all images
- Ensure focus states are visible

---

## Known Issues / Tech Debt

1. **Buttondown forms still exist** in `Footer.astro`, `BlogLayout.astro`, and `PlaybookLayout.astro` — these should be migrated to ConvertKit using the standard handler pattern above
2. **7 playbooks are planned but unbuilt** — only `saas-landing-page` exists
3. **No analytics** — no Plausible or Google Analytics configured
4. **README.md is the default Astro starter template** — not updated for this project
5. **No linter or formatter** — no ESLint/Prettier configured

---

## Performance Patterns

- **LCP protection**: Code decoration elements injected via `requestAnimationFrame` after first paint
- **Font loading**: Google Fonts loaded async with `display=swap` fallback
- **Mobile animations**: `animate-fade-in` and `animate-fade-in-up` disabled below 768px
- **Back-to-top**: Scroll handler throttled with `requestAnimationFrame`
- **No JS framework**: Zero framework overhead — every page is plain HTML with minimal vanilla JS
