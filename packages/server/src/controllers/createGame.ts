import { createGame } from '../game/createGame';
import { Context, t } from 'elysia';
import { getGames } from '../game/games';
import { Handler } from 'shared';

const bodySchema = t.Object({
	player: t.Array(t.String()),
});

type BodyType = (typeof bodySchema)['static'];

type Dependencies = { games: typeof getGames }
type CTX = Context<{ body: BodyType }>

const context = { body: bodySchema };
const handler: Handler<Dependencies, CTX, { id: string }> =
	({ games }) =>
	({ body }) => {
		const game = createGame(body.player);

		games().set(game.id, game);
		return { id: game.id };
	};

export default {
	context,
	handler: handler({ games: getGames }),
};
