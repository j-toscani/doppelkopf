import { Color, GameOrder, Picture } from "shared";
import { createCardOrderEntries, reduceToGameOrder } from "./utils";

export const queenSoloOrder: GameOrder = [
  ...createCardOrderEntries({
    pictures: [Picture.Jack, Picture.King, Picture.Ten, Picture.Ace],
    colors: [Color.Hearth, Color.Diamond, Color.Spade, Color.Club],
    trump: false,
  }),
  ...createCardOrderEntries({
    pictures: [Picture.Queen],
    colors: [Color.Hearth, Color.Diamond, Color.Spade, Color.Club],
    trump: true,
  }),
].reduce(reduceToGameOrder, {} as GameOrder);
