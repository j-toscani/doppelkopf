import { Context, NotFoundError } from 'elysia';
import { Handler, Table } from 'shared';
import { GameRepo } from '../db/db';

type Depencies = { Game: typeof GameRepo }
type CTX = Context<{params:  Record<'id', string>;}>
type Result = Promise<{ table: Table }>

const handler: Handler<Depencies, CTX, Result> =
	({ Game }) =>
	async ({ params }) => {
		const { id } = params;

		const game = await Game.findOne({ id });
		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);

		return { table: game.rounds.at(LAST_ITEM_INDEX) ?? [] };
	};

export default {
	handler: handler({ Game: GameRepo }),
};
