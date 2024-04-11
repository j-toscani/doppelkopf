import { Color, Game, OrderedCard, Picture, Table } from 'shared';
import { NATURAL_ZERO } from '../constants';
import { findRoundWinner } from './findRoundWinner';

type GroupedCards = Record<string, Array<OrderedCard>>;

const recreateHands = (game: Game) =>
	game.rounds.reduce<GroupedCards>((acc, curr) => {
		curr.forEach(({ card, from }) =>
			from in acc ? acc[from].push(card) : (acc[from] = [card]),
		);
		return acc;
	}, {});

const calculateTablePoints = (table: Table) =>
	table.reduce<number>((points, { card }) => card.points + points, NATURAL_ZERO);

const calculateGamePoints = (rounds: Array<Table>) =>
	rounds.reduce<Record<string, number>>((acc, table) => {
		const winner = findRoundWinner(table);
		if (winner in acc) {
			acc[winner] += calculateTablePoints(table);
		} else {
			acc[winner] = calculateTablePoints(table);
		}
		return acc;
	}, {});

const getParties = (groupedCards: GroupedCards) => Object.entries(groupedCards).reduce<{ re: Array<string>, fel: Array<string> }>(
	(acc, [user, cards]) => {
		const isRe = !!cards.find(
			(card) => card.picture === Picture.Queen && card.color === Color.Spade,
		);
		acc[isRe ? 're' : 'fel'].push(user)
		return acc;
	},
	{ re: [], fel: [] },
);

export const getEndOfGameStates = (game: Game) => {
	const hands = recreateHands(game);
	const parties = getParties(hands)
	const points = calculateGamePoints(game.rounds)

	return {
		points: {
			re: parties.re.reduce((acc, user) => points[user] + acc, NATURAL_ZERO),
			fel: parties.fel.reduce((acc, user) => points[user] + acc, NATURAL_ZERO)
		},
		parties
	}
};
