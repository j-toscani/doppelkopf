import { Elysia } from 'elysia';
import { Logger } from './logger';
import { handleError } from './errors';

const PORT = 4000;

const app = new Elysia();

app.onRequest((request) => Logger.info(`${request.path} =>`));
app.onError(handleError);

app.get('/', () => 'Hello Elysia').listen(PORT);

Logger.system(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
