import { Game } from "shared";
import { dealHands } from "./dealHands";
import { defaultOrder } from "./orders";
import { applyOrder, sortCards } from "./orders/utils";

const FIRST_PLAYER = 0;

export const createGame = (players: Array<string>): Game => {
	const orderedHands = dealHands().map((hand) => applyOrder(hand, defaultOrder).sort(sortCards));
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