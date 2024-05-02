import { Game, GameOrder, OrderedCard } from 'shared';
import { applyOrder } from './orders/utils';
import { ADD_ONE, MAX_PLAYER_COUNT } from 'shared/constants';
import { findRoundWinner } from './findRoundWinner';
import { Picture } from 'shared';
import { Color } from 'shared';

export const changeGameOrder = (game: Game, order: GameOrder) => {
	game.seats = game.seats.map((seat) => ({ ...seat, hand: applyOrder(seat.hand, order) }));
};

export const onRoundEnd = (game: Game) => game.rounds.push([]);

const allCardsPlayed = (game: Game): boolean => game.rounds.at(-1)?.length === MAX_PLAYER_COUNT;

const findNextPlayerInRound = (game: Game): number =>
	(game.activeSeat + ADD_ONE) % MAX_PLAYER_COUNT;

export const afterCardPlayed = (game: Game) => {
	game.activeSeat = allCardsPlayed(game)
		? findRoundWinner(game.rounds.at(-1)!)
		: findNextPlayerInRound(game);
};

export const findQueenOfSpades = (card: OrderedCard) =>
	card.picture === Picture.Queen && card.color === Color.Spade;
