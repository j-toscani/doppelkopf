import { Game, NOT_FOUND_INDEX, OpponentState, TablePositions } from 'shared';
import { ADD_ONE, MAX_PLAYER_COUNT } from 'shared/constants';


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
