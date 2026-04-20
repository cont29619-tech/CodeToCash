export const categoryColors: Record<string, {
  bg: string;
  text: string;
  border: string;
  borderLeft: string;
  hoverBorder: string;
  hoverBg: string;
  hoverShadow: string;
  navActive: string;
}> = {
  fundamentals: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    borderLeft: 'border-l-blue-500/40',
    hoverBorder: 'hover:border-blue-500/30',
    hoverBg: 'hover:bg-blue-950/10',
    hoverShadow: 'hover:shadow-blue-900/20',
    navActive: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  copywriting: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/20',
    borderLeft: 'border-l-purple-500/40',
    hoverBorder: 'hover:border-purple-500/30',
    hoverBg: 'hover:bg-purple-950/10',
    hoverShadow: 'hover:shadow-purple-900/20',
    navActive: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  email: {
    bg: 'bg-green-500/10',
    text: 'text-green-400',
    border: 'border-green-500/20',
    borderLeft: 'border-l-green-500/40',
    hoverBorder: 'hover:border-green-500/30',
    hoverBg: 'hover:bg-green-950/10',
    hoverShadow: 'hover:shadow-green-900/20',
    navActive: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  ads: {
    bg: 'bg-yellow-500/10',
    text: 'text-yellow-400',
    border: 'border-yellow-500/20',
    borderLeft: 'border-l-yellow-500/40',
    hoverBorder: 'hover:border-yellow-500/30',
    hoverBg: 'hover:bg-yellow-950/10',
    hoverShadow: 'hover:shadow-yellow-900/20',
    navActive: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
  analytics: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    borderLeft: 'border-l-cyan-500/40',
    hoverBorder: 'hover:border-cyan-500/30',
    hoverBg: 'hover:bg-cyan-950/10',
    hoverShadow: 'hover:shadow-cyan-900/20',
    navActive: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  strategy: {
    bg: 'bg-coral/10',
    text: 'text-coral',
    border: 'border-coral/20',
    borderLeft: 'border-l-coral/40',
    hoverBorder: 'hover:border-coral/30',
    hoverBg: 'hover:bg-coral/5',
    hoverShadow: 'hover:shadow-coral/10',
    navActive: 'bg-coral/10 text-coral border-coral/20',
  },
};

export const categoryLabels: Record<string, string> = {
  fundamentals: 'Fundamentals',
  copywriting:  'Copywriting',
  email:        'Email',
  ads:          'Ads',
  analytics:    'Analytics',
  strategy:     'Strategy',
};
