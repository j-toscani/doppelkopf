import { Game } from 'shared';

export const findRoundWinner = (round: Game['rounds'][number]): number => {
	const FIRST_PLAYED_INDEX = 0;
	const hasTrumpCards =
		round[FIRST_PLAYED_INDEX].card.trump || round.some(({ card }) => card.trump);

	const cardsToConsider = hasTrumpCards
		? round
		: round.filter(({ card }) => card.color === round[FIRST_PLAYED_INDEX].card.color);

	const maxOrder = Math.max(...cardsToConsider.map(({ card }) => card.order));

	// cardsToConsider is subset of round
	// as order is included in the subset, it will also be included in the bigger set
	return round.find(({ card }) => card.order === maxOrder)!.from;
};
