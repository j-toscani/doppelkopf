import { Game, Handler } from 'shared';
import { GameRepo } from '../db/db';
import { Context } from 'elysia';
import { NotFoundError } from '../errors';

type Dependencies = {
	Game: typeof GameRepo;
};

type CTX = Context<{ params: Record<'gameId', string> }>;
type Result = { game: Game };

const handler: Handler<Dependencies, CTX, Promise<Result>> =
	({ Game }) =>
	async ({ params }) => {
		const game = await Game.findOne({ id: params.gameId });

		if (!game) throw new NotFoundError(`Game with [id] ${params.gameId} does not exist`);

		return {
			game,
		};
	};

export default {
	handler: handler({ Game: GameRepo }),
};
