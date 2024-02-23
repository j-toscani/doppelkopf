import { Game, MAX_PLAYER_COUNT } from 'shared';
import { dealHands } from '../game/dealHands';
import { defaultOrder } from '../game/orders';
import { applyOrder, sortCards } from '../game/orders/utils';
import { randomUUID } from 'crypto';

export const createGame = (players: Array<string>): Game => {
	const orderedHands = dealHands().map((hand) => applyOrder(hand, defaultOrder).sort(sortCards));

	return {
		id: randomUUID(),
		hands: orderedHands,
		table: [],
		rounds: [],
		seats: Array.from(new Array(MAX_PLAYER_COUNT), (_e, i) => ({ name: players[i] })),
		activeSeat: 0,
	};
};
