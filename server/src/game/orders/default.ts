import { Color, GameOrder, Picture } from "shared/types";
import { createCardOrderEntries, reduceToGameOrder } from "./utils";

export const defaultOrder: GameOrder = [
  ...createCardOrderEntries({
    pictures: [Picture.King, Picture.Ten, Picture.Ace],
    colors: [Color.Club, Color.Spade],
    trump: false,
  }),
  ...createCardOrderEntries({
    pictures: [Picture.King, Picture.Ace],
    colors: [Color.Hearth],
    trump: false,
  }),
  ...createCardOrderEntries({
    pictures: [Picture.King, Picture.Ten, Picture.Ace],
    colors: [Color.Diamond],
    trump: true,
  }),
  ...createCardOrderEntries({
    pictures: [Picture.Jack],
    colors: [Color.Diamond, Color.Hearth, Color.Spade, Color.Club],
    trump: true,
  }),
  ...createCardOrderEntries({
    pictures: [Picture.Queen],
    colors: [Color.Diamond, Color.Hearth, Color.Spade, Color.Club],
    trump: true,
  }),
  ...createCardOrderEntries({
    pictures: [Picture.Ten],
    colors: [Color.Hearth],
    trump: true,
  }),
].reduce(reduceToGameOrder, {} as GameOrder);
