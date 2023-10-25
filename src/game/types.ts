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

type CardId = `${1 | 2}${Color}${Picture}`

export type Card = {
  picture: Picture;
  color: Color;
  points: number;
  id: CardId;
};

export type TranslatedCard = {
  picture: string;
  color: string;
  points: number;
  id: CardId;
};

type ColorNames = Record<Color, string>;
type PictureNames = Record<Picture, string>;

export type DeckTranslation = {
    colors: ColorNames;
    pictures: PictureNames;
}