import { json } from '@sveltejs/kit';

/** @type import('./$types').RequestHandler */
export function GET() {
	return json({
		published: 'Sun Oct 23 20:26:23 +0000 2011',
		next: '128339634332774400',
		text: 'Not sure what to think of #Android tablets when #motorola #Xoom turns out to be unable to hardware decode HD videos. #fail'
	});
}
