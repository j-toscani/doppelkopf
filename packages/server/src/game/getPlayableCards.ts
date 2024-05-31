import { CardId, ColorV, Game, OrderedCard } from 'shared';
import { FIRST_ARRAY_INDEX } from '../constants';

const filterForTrumpCards = (card: OrderedCard) => card.trump;
const filterForFehlCards = (card: OrderedCard) => !card.trump;
const filterForColor = (color: ColorV) => (card: OrderedCard) => card.color === color;
const mapForCardIds = (card: OrderedCard) => card.id;
const createMapPlayableCards =
	(playableIds: Array<CardId>) =>
	(card: OrderedCard): OrderedCard => ({
		...card,
		playable: playableIds.includes(card.id),
	});

const checkTrumpRound = (hand: Array<OrderedCard>) => {
	const hasTrumpCards = hand.some(({ trump }) => trump);
	return hasTrumpCards
		? hand.filter(filterForTrumpCards).map(mapForCardIds)
		: hand.map(mapForCardIds);
};

const checkFehlRound = (hand: Array<OrderedCard>, fehlColor: ColorV) => {
	const hasFehl = hand.some(({ color }) => fehlColor === color);

	return hasFehl
		? hand.filter(filterForFehlCards).filter(filterForColor(fehlColor)).map(mapForCardIds)
		: hand.map(mapForCardIds);
};

export const getPlayableCards = (
	table: Game['rounds'][FIRST_ARRAY_INDEX],
	hand: Array<OrderedCard>,
): Array<OrderedCard> => {
	const firstCard = table[FIRST_ARRAY_INDEX]?.card;

	if (!firstCard) return hand.map((card) => ({ ...card, playable: true}))

	const isTrumpRound = firstCard.trump;

	const playableIds = isTrumpRound
		? checkTrumpRound(hand)
		: checkFehlRound(hand, firstCard.color);

	return hand.map(createMapPlayableCards(playableIds));
};
