import { Elysia, t } from 'elysia';
import { Logger } from './logger';
import { BadRequestError, NotFoundError, handleError } from './errors';
import { randomUUID } from 'crypto';
import { Game, isCardId } from 'shared/types';
import { cors } from '@elysiajs/cors';
import { createGame } from './game/createGame';
import { playCard } from './game/playCard';
import { environment } from './environment';
import { getPlayableCards } from './game/getPlayableCards';

const app = new Elysia();

const games: Map<string, Game> = new Map();

app.use(cors({ origin: environment.ORIGIN }));
app.onRequest(({ request }) => Logger.info(`${request.url} =>`));
app.onError(handleError);

app.put(
	'/game/new',
	({ body }) => {
		const game = createGame(body.player);
		const uuid = randomUUID();

		games.set(uuid, game);
		return { uuid };
	},
	{
		body: t.Object({
			player: t.Array(t.String()),
		}),
	},
);

app.put(
	'/game/:id/card',
	({ body, params }) => {
		const { id } = params;
		const game = games.get(id);

		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);
		if (!isCardId(body.card))
			throw new BadRequestError(`String ${body.card} is not a valid [card.id].`);

		playCard(game, body.player, body.card);

		return {
			table: game.table,
			hand: game.hands[body.player],
		};
	},
	{
		body: t.Object({
			card: t.String(),
			player: t.String(),
		}),
	},
);

app.get('/game/:id/hand', ({ params, query }) => {
	const { id } = params;
	const { player } = query;

	const game = games.get(id);
	if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);

	const hand = player ? game.hands[player] : null;
	if (!hand) throw new NotFoundError(`Player with [id] ${player} does not exist.`);

	return { hand: getPlayableCards(game.table, hand) };
});

app.get('/game/:id/table', ({ params }) => {
	const { id } = params;

	const game = games.get(id);
	if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);

	return { table: game.table };
});

app.listen(environment.PORT);

Logger.system(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
