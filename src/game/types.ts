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

export type CardId = `${1 | 2}${Color}${Picture}`

export interface Card {
  picture: Picture;
  color: Color;
  points: number;
  id: CardId;
};

export interface OrderedCard extends Card {
  order: number,
  trump: boolean
} 

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

export type CardOrderTempValue = { id: CardId; trump: boolean };
export type GameOrderEntry = { trump: boolean, order: number }
export type GameOrder = Record<CardId, GameOrderEntry>
export type DealtHands<C = Card> = [Array<C>, Array<C>, Array<C>, Array<C>]