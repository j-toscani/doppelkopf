import { Elysia } from 'elysia';
import { Logger } from './logger';
import { handleError } from './errors';

import { cors } from './cors';

import { environment } from './environment';
import game from './routes/games';
import users from './routes/users';
import ws from './websocket';

const app = new Elysia();

app.use(cors());
app.onRequest(({ request }) => Logger.info(`${request.url} =>`));
app.onError(handleError);

app.use(game)
app.use(users)
app.use(ws)
app.listen(environment.PORT);

Logger.system(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
