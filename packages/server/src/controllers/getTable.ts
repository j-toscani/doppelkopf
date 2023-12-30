import { Context, NotFoundError } from 'elysia';
import { getGames } from '../game/games';
import { Handler, Table } from 'shared';

type Depencies = { games: typeof getGames }
type CTX = Context<{params:  Record<'id', string>;}>
type Result = { table: Table }

const handler: Handler<Depencies, CTX, Result> =
	({ games }) =>
	({ params }) => {
		const { id } = params;

		const game = games().get(id);
		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);

		return { table: game.table };
	};

export default {
	handler: handler({ games: getGames }),
};
