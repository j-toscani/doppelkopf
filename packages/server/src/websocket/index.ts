import Elysia, { t } from 'elysia';
import { Logger } from '../logger';

const app = new Elysia({ prefix: '/ws' });
app.ws('/', {
	close(_ws, _code, _message) {
		Logger.debug('Websocket connection closed!');
	},
	open(ws) {
		Logger.debug('Websocket connection opened!');
		ws.send({ type: 'ws-open', paylaod: { message: 'connected' } });
	},
	message(ws, message) {
        ws.send(message)
	},

	body: t.Object({
		type: t.String(),
		payload: t.Record(t.String(), t.Any()),
	}),
});

export default app
