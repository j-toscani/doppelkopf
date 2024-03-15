import { Game, MAX_PLAYER_COUNT } from 'shared';
import { dealHands } from '../game/dealHands';
import { defaultOrder } from '../game/orders';
import { applyOrder, sortCards } from '../game/orders/utils';
import { randomUUID } from 'crypto';
import { InternalServerError } from '../errors';

export const createGame = ({ seats }: Partial<Game> = {}): Game => {
	const orderedHands = dealHands().map((hand) => applyOrder(hand, defaultOrder).sort(sortCards));

	if (!seats || !seats.length) throw new InternalServerError('Tried to create game without creator.');
	const filledSeats = Array.from(new Array(MAX_PLAYER_COUNT), (_e, i) => seats[i] ?? null);
	
	return {
		id: randomUUID(),
		hands: orderedHands,
		table: [],
		rounds: [],
		seats: filledSeats,
		activeSeat: 0,
	};
};
