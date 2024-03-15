import { API_HOST } from '@/constants';

type Method = 'GET' | 'PUT' | 'POST' | 'DELETE';
type RequestOptions = {
	input?: unknown;
	method?: Method;
	query?: Record<string, string>;
	headers?: Record<string, string>;
};

const queryToString = (query: Record<string, string>) =>
	Object.entries(query)
		.map(([k, v]) => `${k}=${v}`)
		.join('&');

export const request = async <Result>(
	path: string,
	options: RequestOptions = {},
): Promise<Result> => {
	const { method = 'GET', input, query = {}, headers = {} } = options;
	const search = queryToString(query);
	const url = new URL(search.length ? `${path}?${search}` : path, API_HOST);

	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: input ? JSON.stringify(input) : null,
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	} else {
		return response.json();
	}
};
