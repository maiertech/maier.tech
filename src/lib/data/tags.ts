import type { Tag } from '$lib/types/tag.type';

import { base } from '$app/paths';

// Valid tags, sorted by key.
// Omitting path results in tag page not being generated.
const tags: Tag[] = [
  {
    key: 'github',
    label: 'GitHub',
    title: 'Using GitHub as a platform for creation',
    description:
      'GitHub is the go to platform for developers to collaborate on code. I write about how to get the most out of GitHub.',
    path: `${base}/tags/github`,
  },
  {
    key: 'nodejs',
    label: 'Node.js',
    title: 'Node.js ecosystem',
    description:
      'Node.js drives modern web development. Occasionally I make a deep-dive into Node.js fundamentals.',
    path: `${base}/tags/nodejs`,
  },
  {
    key: 'screencasting',
    label: 'Screencasting',
    title: 'Creating screencasts',
    description:
      'Creating screencasts is harder than I thought. I share useful tips that make it easier to get started with screencasting.',
    path: `${base}/tags/screencasting`,
  },
  {
    key: 'sveltekit',
    label: 'SvelteKit',
    title: 'Creating web apps with SvelteKit',
    description:
      'SvelteKit is my favorite framework to create fast and scalable websites. I write about issues I ran into and how I solved them.',
    path: `${base}/tags/sveltekit`,
  },
  {
    key: 'seo',
    label: 'SEO',
    title: 'Growing your audience with SEO',
    description:
      'Building an audience from scratch is hard. Growing traffic with SEO provides an opportunity to convert organic traffic into an audience.',
    path: `${base}/tags/seo`,
  },
  {
    key: 'vscode',
    label: 'VS Code',
    title: 'VS Code productivity hacks',
    description:
      'I write about how I boost my productivity with Visual Studio Code.',
    path: `${base}/tags/vscode`,
  },
];

export default tags;
