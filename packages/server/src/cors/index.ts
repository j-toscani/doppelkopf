import { Elysia, type Context } from 'elysia';
/* eslint no-magic-numbers: 0 */

interface CORSConfig {
	/**
	 * @default `true`
	 *
	 * Add `[OPTIONS] /*` handler to handle preflight request which response with `HTTP 204` and CORS hints.
	 *
	 * - `boolean` - Available if set to `true`.
	 */
	preflight?: boolean;
}

export const cors = (
	config: CORSConfig = {
		preflight: true,
	},
) => {
	const { preflight = true } = config;

	const app = new Elysia({
		name: '@elysiajs/cors',
		seed: config,
	});

	const setHeaders = (set: Context['set'], request: Request) => {
		set.headers['Vary'] = '*';
		set.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin') || '*';
		set.headers['Access-Control-Allow-Methods'] = '*';
	};

	if (preflight)
		app.options('/', ({ set, request }) => {
			setHeaders(set as any, request);

			return new Response('', {
				status: 204,
			});
		}).options('/*', ({ set, request }) => {
			setHeaders(set as any, request);

			return new Response('', {
				status: 204,
			});
		});

	return app.onRequest(({ set, request }) => {
		setHeaders(set, request);

		set.headers['Access-Control-Allow-Headers'] = '*';
		set.headers['Access-Control-Exposed-Headers'] = '*';
		set.headers['Access-Control-Allow-Credentials'] = 'true';
	});
};

export default cors;
