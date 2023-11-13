import { OpponentState } from './opponent';
import { OrderedCard } from './types';

export type Table = Array<OrderedCard>;

export const TablePositions = {
	TOP: 'top',
	LEFT: 'left',
	RIGHT: 'right',
	BOTTOM: 'bottom',
};

export type TablePosition = typeof TablePositions[keyof typeof TablePositions]

export const isTablePosition = (position: string): position is TablePosition =>
	['top', 'left', 'right', 'bottom'].includes(position);

export const checkCanPlayCards = (hand: Array<OrderedCard>, opponents: Array<OpponentState>) =>
	[hand.length, ...opponents.map(({ cardsInHand }) => cardsInHand)].every(
		(count) => count === hand.length,
	);
