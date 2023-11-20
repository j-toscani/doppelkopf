import { CardId, Game, GameOrder } from 'shared/types';
import { defaultOrder } from './orders';
import { dealHands } from './dealHands';
import { applyOrder } from './orders/utils';
import { MAX_PLAYER_COUNT } from 'shared/constants';

const FIRST_PLAYER = 0;

export const createGame = (players: Array<string>): Game => {
	const orderedHands = dealHands().map((hand) => applyOrder(hand, defaultOrder));
	const handTuples = players.map((player, index) => [player, orderedHands[index]] as const);
	const [first, ...rest] = players;
	const shiftedPlayers = [...rest, first];

	const linkedPlayers = Object.fromEntries(
		players.map((player, index) => [player, { current: player, next: shiftedPlayers[index] }]),
	);

	return {
		hands: Object.fromEntries(handTuples),
		table: [],
		rounds: [],
		players: linkedPlayers,
		activePlayer: players[FIRST_PLAYER],
	};
};

export const changeGameOrder = (game: Game, order: GameOrder) => {
	Object.entries(game.hands).forEach(
		([player, hand], _i) => (game.hands[player] = applyOrder(hand, order)),
	);
};

export const playCard = (game: Game, player: string, cardId: CardId) => {
	if (player !== game.activePlayer)
		throw new Error('Only the active player is allowed to play a card.');

	const playerHand = game.hands[player];
	if (!playerHand || !(player in game.players)) throw new Error('Player not in Game!');

	const playerCard = playerHand.find((card) => card.id === cardId);
	if (!playerCard) throw new Error('Card not in players hand!');

	game.hands[player] = playerHand.filter((card) => card.id !== cardId);
	game.table.push({ from: player, card: playerCard });
};

const onRoundEnd = (game: Game) => {
	const round = game.table.slice();
	game.table = [];
	game.rounds.push(round);

	return round;
};

const findRoundWinner = (round: Game['rounds'][number]): string => {
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
