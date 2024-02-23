import { Context, NotFoundError } from 'elysia';
import { getPlayableCards } from '../game/getPlayableCards';
import { getGames } from '../game/games';
import { Handler, MAX_PLAYER_COUNT, NOT_FOUND_INDEX, OrderedCard } from 'shared';

type Depencies = { games: typeof getGames };
type CTX = Context<{ query: Record<string, string | null>; params: Record<'id', string> }>;
type Result = { hand: Array<OrderedCard> };

const handler: Handler<Depencies, CTX, Result> =
	({ games }) =>
	({ params, query }) => {
		const { id } = params;
		const { player } = query;

		const game = games().get(id);
		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);

		const seatIndex = game.seats.findIndex((p) => p.name === player);

		if (seatIndex === NOT_FOUND_INDEX || seatIndex >= MAX_PLAYER_COUNT)
			throw new NotFoundError(`Player with [id] ${player} does not exist.`);

		return { hand: getPlayableCards(game.table, game.hands[seatIndex]) };
	};

export default {
	handler: handler({ games: getGames }),
};
