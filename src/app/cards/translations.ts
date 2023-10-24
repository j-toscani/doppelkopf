import { Color, DeckTranslation, Picture } from "./types";

export const german: DeckTranslation = {
  pictures: {
    [Picture.Ace]: "Ass",
    [Picture.Jack]: "Bube",
    [Picture.King]: "König",
    [Picture.Queen]: "Königin",
    [Picture.Ten]: "Zehn",
  },
  colors: {
    [Color.Hearth]: "Herz",
    [Color.Club]: "Kreuz",
    [Color.Spade]: "Piek",
    [Color.Diamond]: "Caro",
  },
};
