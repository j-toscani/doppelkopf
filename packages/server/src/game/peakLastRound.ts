import { Game } from "shared";
import { LAST_ITEM_INDEX } from "../constants";

export const peakLastRound = (game: Game) => {
    return game.rounds.length ? game.rounds.at(LAST_ITEM_INDEX) : null
}