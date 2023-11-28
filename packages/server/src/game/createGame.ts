import { Game, MAX_PLAYER_COUNT } from "shared";
import { dealHands } from "./dealHands";
import { defaultOrder } from "./orders";
import { applyOrder, sortCards } from "./orders/utils";

export const createGame = (players: Array<string>): Game => {
	const orderedHands = dealHands().map((hand) => applyOrder(hand, defaultOrder).sort(sortCards));

	return {
		hands: orderedHands,
		table: [],
		rounds: [],
		seats: Array.from(new Array(MAX_PLAYER_COUNT), (e,i) => players[i]),
		activeSeat: 0,
	};
};