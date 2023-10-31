import { copies } from "../cards";
import {
  Card,
  CardOrderTempValue,
  Color,
  GameOrder,
  OrderedCard,
  Picture,
} from "../types";

type MakeCardsInput = {
  pictures: Array<Picture>;
  colors: Array<Color>;
  trump: boolean;
};

export const createCardOrderEntries = (
  input: MakeCardsInput
): Array<CardOrderTempValue> =>
  input.colors.flatMap((color) =>
    input.pictures.flatMap((picture) =>
      copies.flatMap((batch) => ({
        id: `${batch}${color}${picture}`,
        trump: input.trump,
      }))
    )
  );

export const reduceToGameOrder = (
  acc: GameOrder,
  curr: CardOrderTempValue,
  index: number
) => {
  acc[curr.id] = { order: index + 1, trump: curr.trump };
  return acc;
};

export const applyOrder = (
  cards: Array<Card>,
  order: GameOrder
): Array<OrderedCard> =>
  cards.map((card) => ({
    ...card,
    order: order[card.id].order,
    trump: order[card.id].trump,
  }));

type SchuffleCards = <T>(cards: Array<T>) => Array<T>;

export const shuffleCards: SchuffleCards = (cards) => {
  const copy = [...cards];

  let currentIndex = copy.length - 1;

  while (currentIndex > 0) {
    const current = copy[currentIndex];
    const randomIndex = Math.floor(currentIndex * Math.random());
    const random = copy[randomIndex];

    copy[currentIndex] = random;
    copy[randomIndex] = current;
    currentIndex--;
  }

  return copy;
};
