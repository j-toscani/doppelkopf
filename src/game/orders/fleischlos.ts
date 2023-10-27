import { Color, GameOrder, Picture } from "../types";
import { createCardOrderEntries, reduceToGameOrder } from "./utils";

export const fleischlosOrder: GameOrder = [
  ...createCardOrderEntries({
    pictures: [
      Picture.Jack,
      Picture.King,
      Picture.Queen,
      Picture.Ten,
      Picture.Ace,
    ],
    colors: [Color.Hearth, Color.Diamond, Color.Spade, Color.Club],
    trump: false,
  }),
].reduce(reduceToGameOrder, {} as GameOrder);
