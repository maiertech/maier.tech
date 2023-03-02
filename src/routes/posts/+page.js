import { PostsSchema } from '$lib/schemas/content';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	// Fetch all posts (set filter to {}).
	const response = await fetch('/api/posts', {
		method: 'POST',
		body: JSON.stringify({ filter: {} })
	});

	if (!response.ok) {
		throw error(500, 'Failed to fetch posts.');
	}

	// Validate posts.
	const result = PostsSchema.safeParse(await response.json());

	if (!result.success) {
		throw error(500, 'Posts failed validation.');
	}

	const posts = result.data;

	return {
		title: 'All posts',
		description: 'All posts are sorted by published date, the newest first.',
		posts
	};
}