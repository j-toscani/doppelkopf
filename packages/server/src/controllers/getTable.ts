import { Context, NotFoundError } from 'elysia';
import { getGames } from '../game/games';

type Params = Record<'id', string>;

const handler =
	({ games }: { games: typeof getGames }) =>
	({ params }: Context<{ params: Params }>) => {
		const { id } = params;

		const game = games().get(id);
		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);

		return { table: game.table };
	};

export default {
	handler: handler({ games: getGames }),
};
