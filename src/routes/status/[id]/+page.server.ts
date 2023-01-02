import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const response = await fetch(`/status/${params.id}`);

	return {
		test: 'Test'
	};
};
