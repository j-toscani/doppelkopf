import { OpponentState, OrderedCard, TablePosition } from 'shared/types';

export const isTablePosition = (position: string): position is TablePosition =>
	['top', 'left', 'right', 'bottom'].includes(position);

export const checkCanPlayCards = (hand: Array<OrderedCard>, opponents: Array<OpponentState>) =>
	[hand.length, ...opponents.map(({ cardsInHand }) => cardsInHand)].every(
		(count) => count === hand.length,
	);
