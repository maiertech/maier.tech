import type { Tag } from '$models/content.model';

import { base } from '$app/paths';

// Valid tags, sorted by key.
// Omitting path results in tag page not being generated.
const tags: Tag[] = [
  {
    id: 'css',
    label: 'CSS',
    title: 'Cascading Style Sheets',
    description:
      'Web developers often frown upon CSS. Yet, many do not have a good grasp of CSS. Read my posts about CSS to learn more about the heavy lifting modern CSS can do for your website.',
    path: `${base}/tags/css`,
  },
  {
    id: 'd3',
    label: 'D3',
    title: 'D3 foundations',
    description:
      'For data visualization with Svelte and D3 you need to be proficient with certain D3 helpers.',
    path: `${base}/tags/d3`,
  },
  {
    id: 'github',
    label: 'GitHub',
    title: 'Using GitHub as a platform for creation',
    description:
      'GitHub is the go to platform for developers to collaborate on code. I write about how to get the most out of GitHub.',
    path: `${base}/tags/github`,
  },
  {
    id: 'nodejs',
    label: 'Node.js',
    title: 'Node.js ecosystem',
    description:
      'Node.js drives modern web development. Occasionally I make a deep-dive into Node.js fundamentals.',
    path: `${base}/tags/nodejs`,
  },
  {
    id: 'screencasts',
    label: 'Screencasts',
    title: 'Producing high-quality screencasts',
    description:
      'Creating high-quality screencasts is hard. I share what helped me learn it.',
    path: `${base}/tags/screencasting`,
  },
  {
    id: 'sveltekit',
    label: 'SvelteKit',
    title: 'Creating web apps with SvelteKit',
    description:
      'SvelteKit is my favorite framework to create fast and scalable websites. I write about issues I ran into and how I solved them.',
    path: `${base}/tags/sveltekit`,
  },
  {
    id: 'seo',
    label: 'SEO',
    title: 'Growing your audience with SEO',
    description:
      'Building an audience from scratch is hard. Growing traffic with SEO provides an opportunity to convert organic traffic into an audience.',
    path: `${base}/tags/seo`,
  },
  {
    id: 'svg',
    label: 'SVG',
    title: 'SVG fundamentals',
    description:
      'Data visualization requires drawing SVGs. I write about SVG fundamentals for data visualization.',
    path: `${base}/tags/sveltekit`,
  },
  {
    id: 'til',
    label: 'TIL',
    title: 'Today I Learned (TIL)',
    description:
      'Short posts that capture one lesson I learned. Learn it as well in under 5 minutes.',
    path: `${base}/tags/til`,
  },
  {
    id: 'vscode',
    label: 'VS Code',
    title: 'VS Code productivity hacks',
    description:
      'I write about how I boost my productivity with Visual Studio Code.',
    path: `${base}/tags/vscode`,
  },
];

export default tags;
