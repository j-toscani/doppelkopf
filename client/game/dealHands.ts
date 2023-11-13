import { cards } from "./cards";
import { shuffleCards, sortCards } from "./orders/utils";
import { Card, DealtHands, OrderedCard } from "./types";

const HANDS_TO_DEAL = 4;
export const sortHand = (hand: Array<OrderedCard>) => hand.sort(sortCards);

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
