import { Game } from "shared";
import { getGames } from "../game/games";

export default {
    handler: () => {
        const gamesMap = getGames();

        const games: Record<string, Game> = {};

        for (const [key,value] of gamesMap.entries()) {
            games[key] = value
        }

        return { games }
    }
}