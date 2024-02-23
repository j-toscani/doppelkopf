import { Game, Handler } from 'shared';
import { GameRepo } from '../db/db';

type Dependencies = {
	Game: typeof GameRepo;
};

const handler: Handler<Dependencies, {}, Promise<{ games: Array<Game> }>> =
	({ Game }) =>
	async () => {
		const games = await Game.findMany({});

		return { games };
	};

export default {
	handler,
};
