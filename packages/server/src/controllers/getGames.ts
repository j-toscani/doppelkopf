import { Game, Handler } from 'shared';
import { GameRepo } from '../db/db';

type Dependencies = {
	Game: typeof GameRepo;
};

const handler: Handler<Dependencies, {}, Promise<{ games: Array<Game> }>> =
	({ Game }) =>
	async () => ({ games: await Game.findMany({}) });

export default {
	handler: handler({ Game: GameRepo }),
};
