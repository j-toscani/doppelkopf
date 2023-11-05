import { Color, DeckTranslation, Picture } from "./types";
import Heart from "../app/assets/hearts.svg";
import Club from "../app/assets/clubs.svg";
import Spade from "../app/assets/spades.svg";
import Diamond from "../app/assets/diamonds.svg";

const colorSvgs = {
  [Color.Hearth]: <Heart />,
  [Color.Club]: <Club />,
  [Color.Diamond]: <Diamond />,
  [Color.Spade]: <Spade />,
};

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
  colorSvgs,
};
