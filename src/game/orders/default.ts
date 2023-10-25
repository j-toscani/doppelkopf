import { copies } from "../cards";
import { CardId, Color, GameOrderEntry, Picture } from "../types";
import { makeCards } from "./utils";

export const defaultOrder: Record<CardId, GameOrderEntry> = [
  ...makeCards({
    pictures: [Picture.King, Picture.Ten, Picture.Ace],
    colors: [Color.Club, Color.Spade],
    trump: false,
  }),
  ...makeCards({
    pictures: [Picture.King, Picture.Ace],
    colors: [Color.Hearth],
    trump: false,
  }),
  ...makeCards({
    pictures: [Picture.King, Picture.Ten, Picture.Ace],
    colors: [Color.Diamond],
    trump: true,
  }),
  ...makeCards({
    pictures: [Picture.Jack],
    colors: [Color.Diamond, Color.Hearth, Color.Club, Color.Spade],
    trump: true,
  }),
  ...makeCards({
    pictures: [Picture.Queen],
    colors: [Color.Diamond, Color.Hearth, Color.Club, Color.Spade],
    trump: true,
  }),
  ...makeCards({
    pictures: [Picture.Ten],
    colors: [Color.Hearth],
    trump: true,
  }),
].reduce((acc, curr, index) => {
  acc[curr.id] = { order: index + 1, trump: curr.trump };
  return acc;
}, {} as Record<CardId, GameOrderEntry>);
