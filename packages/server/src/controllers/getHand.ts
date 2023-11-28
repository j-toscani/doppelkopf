import { Context, NotFoundError } from 'elysia';
import { getPlayableCards } from '../game/getPlayableCards';
import { getGames } from '../game/games';
import { MAX_PLAYER_COUNT, NOT_FOUND_INDEX } from 'shared';

type Query = Record<string, string | null>;
type Params = Record<'id', string>;

const handler =
	({ games }: { games: typeof getGames }) =>
	({ params, query }: Context<{ query: Query; params: Params }>) => {
		const { id } = params;
		const { player } = query;

		const game = games().get(id);
		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);

		const seatIndex = game.seats.findIndex((p) => p === player)

		if (seatIndex === NOT_FOUND_INDEX || seatIndex >= MAX_PLAYER_COUNT) throw new NotFoundError(`Player with [id] ${player} does not exist.`);

		return { hand: getPlayableCards(game.table, game.hands[seatIndex]) };
	};

export default {
	handler: handler({ games: getGames }),
};
