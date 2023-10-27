import { cards, copies } from "../cards";
import {
  CardId,
  CardOrderTempValue,
  Color,
  GameOrder,
  GameOrderEntry,
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

export const applyOrder = (order: GameOrder): Array<OrderedCard> =>
  cards.map((card) => ({
    ...card,
    order: order[card.id].order,
    trump: order[card.id].trump,
  }));
