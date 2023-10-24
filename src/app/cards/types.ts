export enum Color {
  Spade = 1,
  Hearth,
  Club,
  Diamond,
}

export enum Picture {
  Ten = 1,
  Jack,
  Queen,
  King,
  Ace,
}

export type Card = {
  picture: Picture;
  color: Color;
  points: number;
  id: number;
};

type ColorNames = Record<Color, string>;
type PictureNames = Record<Picture, string>;

export type DeckTranslation = {
    colors: ColorNames;
    pictures: PictureNames;
}