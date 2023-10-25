import { cards, copies } from "../cards";
import { CardId, Color, GameOrderEntry, OrderedCard, Picture } from "../types";

type MakeCardsInput = {
  pictures: Array<Picture>;
  colors: Array<Color>;
  trump: boolean;
};

type MakeCardsOutput = Array<{ id: CardId; trump: boolean }>;

export const makeCards = (input: MakeCardsInput): MakeCardsOutput =>
  copies.flatMap((batch) =>
    input.colors.flatMap((color) =>
      input.pictures.map((picture) => ({
        id: `${batch}${color}${picture}`,
        trump: input.trump,
      }))
    )
  );

export const applyOrder = (order: Array<GameOrderEntry>): Array<OrderedCard> =>
  cards.map((card) => ({
    ...card,
    order: order[card.id].order,
    trump: order[card.id].trump,
  }));
