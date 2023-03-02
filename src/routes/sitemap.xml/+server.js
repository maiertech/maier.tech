import { ORIGIN } from '$env/static/private';
import { PostsSchema } from '$lib/schemas/content';
import { error } from '@sveltejs/kit';

/**
 * Create page string for sitemap.
 * @param {string} path
 * @param {string} [lastmod]
 */
function createEntry(path, lastmod) {
	return `
    <url>
      <loc>${new URL(path, ORIGIN).href}</loc>
      ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    </url>
  `;
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Cache-Control': 's-maxage=3600',
		'Content-Type': 'application/xml'
	});

	// Create entries for posts.
	const response = await fetch('/api/posts', {
		method: 'POST',
		body: JSON.stringify({})
	});

	if (!response.ok) {
		throw error(500, 'Failed to fetch posts.');
	}

	const result = PostsSchema.safeParse(await response.json());

	if (!result.success) {
		throw error(500, 'Posts failed validation.');
	}

	const posts = result.data.map((post) => createEntry(`/posts/${post.slug}`, post.modified));

	// Add additional entries to this array.
	const pages = [...posts];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		${pages.join('\n')}
	</urlset>
	`.trim();

	return new Response(sitemap);
}