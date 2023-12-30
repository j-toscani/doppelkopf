import { cards } from "./cards";
import { shuffleCards } from "./orders/utils";
import { Card, DealtHands } from "shared";

const HANDS_TO_DEAL = 4;

export const dealHands = (): DealtHands<Card> => {
  const shuffled = shuffleCards(cards);
  const hands: DealtHands<Card> = [[], [], [], []];

  shuffled.forEach((card, index) =>
    Array.isArray(hands[index % HANDS_TO_DEAL])
      ? hands[index % HANDS_TO_DEAL].push(card)
      : (hands[index % HANDS_TO_DEAL] = [card])
  );

  return hands;
};
