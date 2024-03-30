import { Game, GameOrder, NOT_FOUND_INDEX, OpponentState, TablePositions } from 'shared';
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
		? game.seats.findIndex((player) => player && player.name === findRoundWinner(game.table))
		: findNextPlayerInRound(game);
};

export const getOpponentCardCount = (game: Game, userId: string): Array<OpponentState> => {
	const index = game.seats.findIndex((user) => (user ? user.name === userId : false));

	// The user is not in the game anymore
	if (index === NOT_FOUND_INDEX) {
		return [];
	}

	const firstOponentIndex = index + ADD_ONE;

	return [TablePositions.LEFT, TablePositions.TOP, TablePositions.RIGHT].map((position, i) => ({
		position,
		cardsInHand: game.hands[(firstOponentIndex + i) % MAX_PLAYER_COUNT].length,
		user: game.seats[(firstOponentIndex + i) % MAX_PLAYER_COUNT]?.name ?? null,
	}));
};
