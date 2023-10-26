import { cards } from "./cards";
import { shuffleCards } from "./shuffleCards";
import { Card, DealtHands } from "./types";

export const dealHands = (handsToDeal: number = 4): DealtHands => {
  const shuffled = shuffleCards(cards);
  const hands: DealtHands = [
    [], [], [], []
  ];

  shuffled.forEach((card, index) =>
    Array.isArray(hands[index % handsToDeal])
      ? hands[index % handsToDeal].push(card)
      : hands[index % handsToDeal] = [card]
  );
  return hands;
};
