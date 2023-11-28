import { Context, NotFoundError } from 'elysia';
import { getPlayableCards } from '../game/getPlayableCards';
import { getGames } from '../game/games';

type Query = Record<string, string | null>;
type Params = Record<'id', string>;

const handler =
	({ games }: { games: typeof getGames }) =>
	({ params, query }: Context<{ query: Query; params: Params }>) => {
		const { id } = params;
		const { player } = query;

		const game = games().get(id);
		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);

		const hand = player ? game.hands[player] : null;
		if (!hand) throw new NotFoundError(`Player with [id] ${player} does not exist.`);

		return { hand: getPlayableCards(game.table, hand) };
	};

export default {
	handler: handler({ games: getGames }),
};
