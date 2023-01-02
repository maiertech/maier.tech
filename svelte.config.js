import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import remarkCodeTitles from 'remark-code-titles';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],

	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md', '.svx'],
			layout: { status: './src/routes/status/layout.mdsvex.svelte' },
			smartypants: {
				dashes: 'oldschool'
			},
			remarkPlugins: [remarkCodeTitles],
			rehypePlugins: []
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$data: 'src/data',
			$models: 'src/models',
			$posts: 'src/routes/posts'
		},
		csrf: {
			checkOrigin: false
		}
	},

	vitePlugin: {
		experimental: {
			inspector: true
		}
	}
};

export default config;
