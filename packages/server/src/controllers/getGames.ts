import { Game } from 'shared';
import { getGames } from '../game/games';

export default {
	handler: () => {
		const gamesMap = getGames();

		const games: Array<Game> = [];

		for (const [_, value] of gamesMap.entries()) {
			games.push(value);
		}

		return { games };
	},
};
