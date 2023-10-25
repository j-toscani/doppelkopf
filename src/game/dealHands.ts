import { cards } from "./cards";
import { shuffleCards } from "./shuffleCards";
import { Card } from "./types";

export const dealHands = (handsToDeal: number = 4): Array<Array<Card>> => {
  const shuffled = shuffleCards(cards);
  const hands: Array<Array<Card>> = [];

  shuffled.forEach((card, index) =>
    Array.isArray(hands[index % handsToDeal])
      ? hands[index % handsToDeal].push(card)
      : hands[index % handsToDeal] = [card]
  );
  return hands;
};
