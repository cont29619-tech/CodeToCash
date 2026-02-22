import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

// Fetch Inter WOFF fonts once per build (module-level promises, shared across all routes)
const fontRegularPromise = fetch(
  'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.1.0/files/inter-latin-400-normal.woff'
).then((r) => r.arrayBuffer());

const fontBoldPromise = fetch(
  'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.1.0/files/inter-latin-700-normal.woff'
).then((r) => r.arrayBuffer());

const categoryHex: Record<string, string> = {
  fundamentals: '#3b82f6',
  copywriting: '#a855f7',
  email: '#22c55e',
  ads: '#eab308',
  analytics: '#06b6d4',
  strategy: '#E94560',
};

const categoryLabel: Record<string, string> = {
  fundamentals: 'Fundamentals',
  copywriting: 'Copywriting',
  email: 'Email',
  ads: 'Ads',
  analytics: 'Analytics',
  strategy: 'Strategy',
};

const difficultyHex: Record<string, string> = {
  Beginner: '#22c55e',
  Intermediate: '#eab308',
  Advanced: '#ef4444',
};

async function getFonts() {
  const [regular, bold] = await Promise.all([fontRegularPromise, fontBoldPromise]);
  return [
    { name: 'Inter', data: regular, weight: 400 as const, style: 'normal' as const },
    { name: 'Inter', data: bold, weight: 700 as const, style: 'normal' as const },
  ];
}

async function svgToPng(svg: string): Promise<Uint8Array> {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  return resvg.render().asPng();
}

export interface BlogOgData {
  title: string;
  category: string;
  author: string;
  readingTime: string;
}

export async function renderBlogOgImage(data: BlogOgData): Promise<Uint8Array> {
  const { title, category, author, readingTime } = data;
  const fonts = await getFonts();
  const catColor = categoryHex[category] ?? '#E94560';
  const catLabel = categoryLabel[category] ?? category;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0A1A',
          fontFamily: 'Inter',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          // Coral glow top-right
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: -100,
                right: -100,
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(233,69,96,0.2) 0%, transparent 70%)',
              },
            },
          },
          // Deep-blue glow bottom-left
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: -80,
                left: -80,
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(15,52,96,0.4) 0%, transparent 70%)',
              },
            },
          },
          // Content area
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                padding: '56px 72px',
                flex: 1,
              },
              children: [
                // Top branding
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 48,
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: { color: '#9ca3af', fontSize: 20, fontWeight: 400 },
                          children: 'CodeToCash',
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: { color: '#E94560', fontSize: 20, fontWeight: 700 },
                          children: '.dev',
                        },
                      },
                    ],
                  },
                },
                // Category badge
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 24,
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: {
                            backgroundColor: `${catColor}22`,
                            color: catColor,
                            border: `1px solid ${catColor}44`,
                            borderRadius: 8,
                            padding: '6px 14px',
                            fontSize: 16,
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                          },
                          children: catLabel,
                        },
                      },
                    ],
                  },
                },
                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      color: '#ffffff',
                      fontSize: 52,
                      fontWeight: 700,
                      lineHeight: 1.2,
                      marginBottom: 'auto',
                      maxWidth: 900,
                    },
                    children: title,
                  },
                },
                // Author + reading time
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginTop: 40,
                      color: '#6b7280',
                      fontSize: 22,
                    },
                    children: [
                      { type: 'span', props: { children: author } },
                      { type: 'span', props: { children: '•' } },
                      { type: 'span', props: { children: readingTime } },
                    ],
                  },
                },
              ],
            },
          },
          // Coral gradient bar at bottom
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 6,
                background: 'linear-gradient(to right, #E94560, #0F3460)',
              },
            },
          },
        ],
      },
    },
    { width: 1200, height: 630, fonts }
  );

  return svgToPng(svg);
}

export interface PlaybookOgData {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readingTime: string;
}

export async function renderPlaybookOgImage(data: PlaybookOgData): Promise<Uint8Array> {
  const { title, difficulty, readingTime } = data;
  const fonts = await getFonts();
  const diffColor = difficultyHex[difficulty] ?? '#22c55e';

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0A0A1A',
          fontFamily: 'Inter',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          // Coral glow top-right
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: -100,
                right: -100,
                width: 500,
                height: 500,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(233,69,96,0.2) 0%, transparent 70%)',
              },
            },
          },
          // Deep-blue glow bottom-left
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: -80,
                left: -80,
                width: 400,
                height: 400,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(15,52,96,0.4) 0%, transparent 70%)',
              },
            },
          },
          // Content area
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                padding: '56px 72px',
                flex: 1,
              },
              children: [
                // "// PLAYBOOK" label
                {
                  type: 'div',
                  props: {
                    style: {
                      color: '#E94560',
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: 32,
                    },
                    children: '// PLAYBOOK',
                  },
                },
                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      color: '#ffffff',
                      fontSize: 52,
                      fontWeight: 700,
                      lineHeight: 1.2,
                      marginBottom: 'auto',
                      maxWidth: 900,
                    },
                    children: title,
                  },
                },
                // Difficulty badge + reading time row
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 20,
                      marginTop: 40,
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: {
                            backgroundColor: `${diffColor}22`,
                            color: diffColor,
                            border: `1px solid ${diffColor}44`,
                            borderRadius: 8,
                            padding: '6px 14px',
                            fontSize: 16,
                            fontWeight: 700,
                          },
                          children: difficulty,
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: { color: '#6b7280', fontSize: 22 },
                          children: readingTime,
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          // Bottom: branding right-aligned
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 24,
                right: 72,
                display: 'flex',
                alignItems: 'center',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: { color: '#9ca3af', fontSize: 16, fontWeight: 400 },
                    children: 'CodeToCash',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { color: '#E94560', fontSize: 16, fontWeight: 700 },
                    children: '.dev',
                  },
                },
              ],
            },
          },
          // Coral gradient bar at bottom
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 6,
                background: 'linear-gradient(to right, #E94560, #0F3460)',
              },
            },
          },
        ],
      },
    },
    { width: 1200, height: 630, fonts }
  );

  return svgToPng(svg);
}
