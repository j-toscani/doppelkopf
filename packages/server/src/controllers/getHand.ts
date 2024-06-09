import { Context, NotFoundError } from 'elysia';
import { getPlayableCards } from '../game/getPlayableCards';
import { Handler, MAX_PLAYER_COUNT, NOT_FOUND_INDEX, OrderedCard } from 'shared';
import { GameRepo } from '../db/db';
import { LAST_ITEM_INDEX } from '../constants';

type Depencies = { Game: typeof GameRepo };
type CTX = Context<{ query: Record<string, string | null>; params: Record<'id', string> }>;
type Result = Promise<{ hand: Array<OrderedCard> }>;

const handler: Handler<Depencies, CTX, Result> =
	({ Game }) =>
	async ({ params, query }) => {
		const { id } = params;
		const { player } = query;

		const game = await Game.findOne({ id });
		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);

		const seatIndex = game.seats.findIndex(({user}) => user && user.name === player);

		if (seatIndex === NOT_FOUND_INDEX || seatIndex >= MAX_PLAYER_COUNT)
			throw new NotFoundError(`Player with [id] ${player} does not exist.`);

		return { hand: getPlayableCards(game.rounds.at(LAST_ITEM_INDEX) ?? [], game.seats[seatIndex].hand) };
	};

export default {
	handler: handler({ Game: GameRepo }),
};
