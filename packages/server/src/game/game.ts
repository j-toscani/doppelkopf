import { Game, GameOrder } from 'shared/types';
import { applyOrder } from './orders/utils';
import { ADD_ONE, MAX_PLAYER_COUNT } from 'shared/constants';
import { findRoundWinner } from './findRoundWinner';

export const changeGameOrder = (game: Game, order: GameOrder) => {
	game.hands.forEach((hand, i) => (game.hands[i] = applyOrder(hand, order)));
};

export const onRoundEnd = (game: Game) => {
	const round = game.table.slice();
	game.table = [];
	game.rounds.push(round);
};

const allCardsPlayed = (game: Game): boolean => game.table.length === MAX_PLAYER_COUNT;
const _findPreviousPlayerInRound = (game: Game): number =>
	(game.activeSeat - ADD_ONE) % MAX_PLAYER_COUNT;

const findNextPlayerInRound = (game: Game): number =>
	(game.activeSeat + ADD_ONE) % MAX_PLAYER_COUNT;

export const afterCardPlayed = (game: Game) => {
	game.activeSeat = allCardsPlayed(game)
		? game.seats.findIndex((player) => player === findRoundWinner(game.table))
		: findNextPlayerInRound(game);
};
