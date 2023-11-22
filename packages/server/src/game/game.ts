import { Game, GameOrder } from 'shared/types';
import { applyOrder } from './orders/utils';
import { MAX_PLAYER_COUNT } from 'shared/constants';
import { findRoundWinner } from './findRoundWinner';

export const changeGameOrder = (game: Game, order: GameOrder) => {
	Object.entries(game.hands).forEach(
		([player, hand], _i) => (game.hands[player] = applyOrder(hand, order)),
	);
};

const onRoundEnd = (game: Game) => {
	const round = game.table.slice();
	game.table = [];
	game.rounds.push(round);

	return round;
};

const findNextPlayerInRound = (game: Game): string => {
	const { players, activePlayer } = game;
	return players[activePlayer].next;
};

export const afterCardPlayed = (game: Game) => {
	const allCardsPlayed = game.table.length === MAX_PLAYER_COUNT;

	if (allCardsPlayed) {
		const round = onRoundEnd(game);

		game.activePlayer = findRoundWinner(round);
	} else {
		game.activePlayer = findNextPlayerInRound(game);
	}
};
