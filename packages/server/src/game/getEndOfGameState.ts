import { Color, Game, OrderedCard, Picture } from 'shared';
import { NATURAL_ZERO } from '../constants';

type GroupedCards = Record<string, Array<OrderedCard>>;

const getGroupedCards = (game: Game) =>
	game.rounds.reduce<GroupedCards>((acc, curr) => {
		curr.forEach(({ card, from }) =>
			from in acc ? acc[from].push(card) : (acc[from] = [card]),
		);
		return acc;
	}, {});

const calculatePoints = (cards: Array<OrderedCard>) =>
	cards.reduce<number>((points, card) => card.points + points, NATURAL_ZERO);

const getEndOfGameState = (userId: string, cards: Array<OrderedCard>) => {
	const points = calculatePoints(cards);
	return {
		userId,
		points,
		cards,
		isRe: !!cards.find((card) => card.color === Color.Club && card.picture === Picture.Queen),
	};
};

export const getEndOfGameStates = (game: Game) =>
	Object.entries(getGroupedCards(game))
		.map(([userId, cards]) => getEndOfGameState(userId, cards))
		.sort(({ points: pointsA }, { points: pointsB }) => pointsA - pointsB);
