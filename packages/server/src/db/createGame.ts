import { Game, MAX_PLAYER_COUNT, Seat, User } from 'shared';
import { dealHands } from '../game/dealHands';
import { defaultOrder } from '../game/orders';
import { applyOrder, sortCards } from '../game/orders/utils';
import { randomUUID } from 'crypto';
import { InternalServerError } from '../errors';
import { findQueenOfSpades } from '../game/game';

export const createGame = ({ users }: { users: Array<User> }): Game => {
	const orderedHands = dealHands().map((hand) => applyOrder(hand, defaultOrder).sort(sortCards));

	if (!users || !users.length)
		throw new InternalServerError('Tried to create game without creator.');
	const filledSeats: Array<Seat> = Array.from(new Array(MAX_PLAYER_COUNT), (_e, i) => ({
		user: users[i] ?? null,
		hand: orderedHands[i],
		isRe: !!orderedHands[i].find(findQueenOfSpades),
	}));

	return {
		id: randomUUID(),
		rounds: [[]],
		seats: filledSeats,
		activeSeat: 0,
	};
};
