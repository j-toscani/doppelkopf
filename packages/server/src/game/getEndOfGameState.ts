import { Color, Game, OrderedCard, Picture, Table } from 'shared';
import {
	MAX_POINTS,
	NATURAL_ZERO,
	REVERSE_SIGN,
	WIN_THRESHOLD_30,
	WIN_THRESHOLD_60,
	WIN_THRESHOLD_90,
	WIN_THRESHOLD_BLACK,
} from '../constants';
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

const getParties = (groupedCards: GroupedCards) =>
	Object.entries(groupedCards).reduce<{ re: Array<string>; fel: Array<string> }>(
		(acc, [user, cards]) => {
			const isRe = !!cards.find(
				(card) => card.picture === Picture.Queen && card.color === Color.Spade,
			);
			acc[isRe ? 're' : 'fel'].push(user);
			return acc;
		},
		{ re: [], fel: [] },
	);

const calculateWinPoints = (points: { re: number; fel: number }): { re: number; fel: number } => {
	const winner = points.re > points.fel ? 're' : 'fel';
	const loser = winner === 'fel' ? 're' : 'fel';
	const loserPoints = points[loser];

	let winPoints = 1;

	if (loserPoints < WIN_THRESHOLD_90) {
		winPoints++;
	}
	if (loserPoints < WIN_THRESHOLD_60) {
		winPoints++;
	}
	if (loserPoints < WIN_THRESHOLD_30) {
		winPoints++;
	}
	if (loserPoints === WIN_THRESHOLD_BLACK) {
		winPoints++;
	}

	const result = {
		[loser]: winPoints * REVERSE_SIGN,
		[winner]: winPoints,
	} as { re: number; fel: number };

	return result;
};

export const getEndOfGameStates = (game: Game) => {
	const hands = recreateHands(game);
	const parties = getParties(hands);
	const pointsPerPlayer = calculateGamePoints(game.rounds);
	const gamePoints = {
		re: parties.re.reduce((acc, user) => pointsPerPlayer[user] + acc, NATURAL_ZERO),
		fel: parties.fel.reduce((acc, user) => pointsPerPlayer[user] + acc, NATURAL_ZERO),
	};
	return {
		gamePoints,
		parties,
		winPoints: calculateWinPoints(gamePoints),
	};
};
