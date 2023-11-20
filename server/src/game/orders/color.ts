import { Color, GameOrder, Picture } from "shared/types";
import { createCardOrderEntries, reduceToGameOrder } from "./utils";

export const clubSolo: GameOrder = [
  ...createCardOrderEntries({
    pictures: [
      Picture.Jack,
      Picture.King,
      Picture.Queen,
      Picture.Ten,
      Picture.Ace,
    ],
    colors: [Color.Hearth, Color.Diamond, Color.Spade],
    trump: false,
  }),
  ...createCardOrderEntries({
    pictures: [
      Picture.Jack,
      Picture.King,
      Picture.Queen,
      Picture.Ten,
      Picture.Ace,
    ],
    colors: [Color.Club],
    trump: true,
  }),
].reduce(reduceToGameOrder, {} as GameOrder);

export const diamondSolo: GameOrder = [
  ...createCardOrderEntries({
    pictures: [
      Picture.Jack,
      Picture.King,
      Picture.Queen,
      Picture.Ten,
      Picture.Ace,
    ],
    colors: [Color.Hearth, Color.Spade, Color.Club],
    trump: false,
  }),
  ...createCardOrderEntries({
    pictures: [
      Picture.Jack,
      Picture.King,
      Picture.Queen,
      Picture.Ten,
      Picture.Ace,
    ],
    colors: [Color.Diamond],
    trump: true,
  }),
].reduce(reduceToGameOrder, {} as GameOrder);

export const spadesSolo: GameOrder = [
  ...createCardOrderEntries({
    pictures: [
      Picture.Jack,
      Picture.King,
      Picture.Queen,
      Picture.Ten,
      Picture.Ace,
    ],
    colors: [Color.Hearth, Color.Diamond, Color.Club],
    trump: false,
  }),
  ...createCardOrderEntries({
    pictures: [
      Picture.Jack,
      Picture.King,
      Picture.Queen,
      Picture.Ten,
      Picture.Ace,
    ],
    colors: [Color.Spade],
    trump: true,
  }),
].reduce(reduceToGameOrder, {} as GameOrder);

export const hearthSolo: GameOrder = [
  ...createCardOrderEntries({
    pictures: [
      Picture.Jack,
      Picture.King,
      Picture.Queen,
      Picture.Ten,
      Picture.Ace,
    ],
    colors: [Color.Diamond, Color.Spade, Color.Club],
    trump: false,
  }),
  ...createCardOrderEntries({
    pictures: [
      Picture.Jack,
      Picture.King,
      Picture.Queen,
      Picture.Ten,
      Picture.Ace,
    ],
    colors: [Color.Hearth],
    trump: true,
  }),
].reduce(reduceToGameOrder, {} as GameOrder);
