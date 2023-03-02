import { createHash } from 'crypto';
import { EO_API_KEY, EO_LIST_ID } from '$env/static/private';

const base = 'https://emailoctopus.com/api/1.6/';
const querystring = new URLSearchParams({ api_key: EO_API_KEY });

/**
 * Subscribe (add contact to list):
 * https://emailoctopus.com/api-documentation/lists/create-contact
 *
 * @param {import('zod').infer<typeof import('$lib/schemas/newsletter').SubscribeFormSchema>} data
 */
export function subscribe(data) {
	const contact = {
		email_address: data.email_address,
		fields: {
			FirstName: data.first_name
		}
	};
	const url = `${base}lists/${EO_LIST_ID}/contacts`;
	const payload = { api_key: EO_API_KEY, ...contact };
	return fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
}

/**
 * Get list info:
 * https://emailoctopus.com/api-documentation/lists/get
 */
export function getListInfo() {
	const url = `${base}lists/${EO_LIST_ID}?${querystring}`;
	return fetch(url, { method: 'GET' });
}

/**
 * Lookup subscriber:
 * https://emailoctopus.com/api-documentation/lists/get-contact
 *
 * @param {string} email_address
 */
export function getSubscriber(email_address) {
	// EO expects lower case email address to be hashed with MD5.
	const digest = createHash('md5').update(email_address.toLowerCase()).digest('hex');
	const url = `${base}lists/${EO_LIST_ID}/contacts/${digest}?${querystring}`;
	return fetch(url, { method: 'GET' });
}

/**
 * Unsubscribe (set status to UNSUBSCRIBED):
 * https://emailoctopus.com/api-documentation/lists/update-contact
 *
 * @param {string} email_address
 */
export function unsubscribe(email_address) {
	// EO expects lower case email address hashed with MD5.
	const digest = createHash('md5').update(email_address.toLowerCase()).digest('hex');
	const url = `${base}lists/${EO_LIST_ID}/contacts/${digest}`;
	const payload = { api_key: EO_API_KEY, status: 'UNSUBSCRIBED' };
	return fetch(url, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload)
	});
}