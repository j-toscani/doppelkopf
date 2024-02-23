import { createGame } from '../game/createGame';
import { Context, t } from 'elysia';
import { Handler } from 'shared';
import { GameRepo } from '../db/db';

const bodySchema = t.Object({
	player: t.Array(t.String()),
});

type BodyType = (typeof bodySchema)['static'];

type Dependencies = { Game: typeof GameRepo; createGame: typeof createGame };
type CTX = Context<{ body: BodyType }>;

const context = { body: bodySchema };
const handler: Handler<Dependencies, CTX, Promise<{ id: string }>> =
	({ Game, createGame }) =>
	async ({ body }) => {
		const game = createGame(body.player);
		await Game.insertOne(game);

		return { id: game.id };
	};

export default {
	context,
	handler: handler({ Game: GameRepo, createGame }),
};
