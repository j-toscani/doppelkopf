import { randomUUID } from 'crypto';
import { createGame } from '../game/createGame';
import { Context, t } from 'elysia';
import { getGames } from '../game/games';

const bodySchema = t.Object({
	player: t.Array(t.String()),
});

type BodyType = (typeof bodySchema)['static'];

const context = { body: bodySchema };
const handler =
	({ games }: { games: typeof getGames }) =>
	({ body }: Context<{ body: BodyType }>) => {
		const game = createGame(body.player);
		const uuid = randomUUID();

		games().set(uuid, game);
		return { uuid };
	};

export default {
	context,
	handler: handler({ games: getGames }),
};
