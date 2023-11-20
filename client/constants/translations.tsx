import { Color, DeckTranslation, Picture } from "shared/types";

export const german: DeckTranslation = {
  pictureLabels: {
    [Picture.Ace]: "Ass",
    [Picture.Jack]: "Bube",
    [Picture.King]: "König",
    [Picture.Queen]: "Dame",
    [Picture.Ten]: "Zehn",
  },
  pictureLetters: {
    [Picture.Ace]: "A",
    [Picture.Jack]: "B",
    [Picture.King]: "K",
    [Picture.Queen]: "D",
    [Picture.Ten]: "10",
  },
  colorNames: {
    [Color.Hearth]: "Herz",
    [Color.Club]: "Kreuz",
    [Color.Diamond]: "Karo",
    [Color.Spade]: "Piek",
  },
};
