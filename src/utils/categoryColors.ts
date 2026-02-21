export const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  fundamentals: { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/20' },
  copywriting:  { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
  email:        { bg: 'bg-green-500/10',  text: 'text-green-400',  border: 'border-green-500/20' },
  ads:          { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
  analytics:    { bg: 'bg-cyan-500/10',   text: 'text-cyan-400',   border: 'border-cyan-500/20' },
  strategy:     { bg: 'bg-coral/10',      text: 'text-coral',      border: 'border-coral/20' },
};

export const categoryLabels: Record<string, string> = {
  fundamentals: 'Fundamentals',
  copywriting:  'Copywriting',
  email:        'Email',
  ads:          'Ads',
  analytics:    'Analytics',
  strategy:     'Strategy',
};
