import { Game } from "shared";

export const getHands = (g: Game) => g.seats.map(({ hand }) => hand)