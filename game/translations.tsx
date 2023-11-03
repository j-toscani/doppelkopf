import { Color, DeckTranslation, Picture } from "./types";
import Heart from "../assets/hearts.svg";
import Club from "../assets/clubs.svg";
import Spade from "../assets/spades.svg";
import Diamond from "../assets/diamonds.svg";

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
