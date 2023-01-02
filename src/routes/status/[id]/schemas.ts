import { z } from 'zod';

export const tweetSchema = z.object({
	published: z.string().min(1),
	prev: z.string().optional(),
	next: z.string().optional(),
	text: z.string().min(1)
});

export type Tweet = z.infer<typeof tweetSchema>;
