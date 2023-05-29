import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
export default {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),
		csrf: {
			// Set environment variable NO_CHECK_ORIGIN=1 on Gitpod or StackBlitz:
			// https://github.com/sveltejs/kit/issues/8314
			checkOrigin: process.env.NO_CHECK_ORIGIN ? false : true
		}
	},

	vitePlugin: { inspector: true }
};
