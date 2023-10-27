import { Color, GameOrder, Picture } from "../types";
import { createCardOrderEntries, reduceToGameOrder } from "./utils";

export const jackSoloOrder: GameOrder = [
  ...createCardOrderEntries({
    pictures: [Picture.King, Picture.Queen, Picture.Ten, Picture.Ace],
    colors: [Color.Hearth, Color.Diamond, Color.Spade, Color.Club],
    trump: false,
  }),
  ...createCardOrderEntries({
    pictures: [Picture.Jack],
    colors: [Color.Hearth, Color.Diamond, Color.Spade, Color.Club],
    trump: true,
  }),
].reduce(reduceToGameOrder, {} as GameOrder);
