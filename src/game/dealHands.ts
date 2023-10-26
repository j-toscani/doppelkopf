import { applyOrder } from "./orders/utils";
import { shuffleCards } from "./shuffleCards";
import { DealtHands, GameOrder, OrderedCard } from "./types";

const HANDS_TO_DEAL = 4;

export const dealHands = (order: GameOrder): DealtHands => {
  const cardsWithOrder = applyOrder(order)
  const shuffled = shuffleCards(cardsWithOrder);
  const hands: DealtHands<OrderedCard> = [
    [], [], [], []
  ];

  
  shuffled.forEach((card, index) =>
  Array.isArray(hands[index % HANDS_TO_DEAL])
  ? hands[index % HANDS_TO_DEAL].push(card)
  : hands[index % HANDS_TO_DEAL] = [card]
  )
  hands.forEach((hand) => hand.sort((a, b) => a.order - b.order));
  return hands;
};
