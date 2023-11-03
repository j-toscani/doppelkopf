import type React from "react";

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

type ColorSvgs = Record<Color, React.ReactElement>;
type ColorNames = Record<Color, string>;
type PictureNames = Record<Picture, string>;

export type DeckTranslation = {
    colorNames: ColorNames;
    pictureLetters: PictureNames;
    pictureLabels: PictureNames;
    colorSvgs: ColorSvgs;
}

export type CardOrderTempValue = { id: CardId; trump: boolean };
export type GameOrderEntry = { trump: boolean, order: number }
export type GameOrder = Record<CardId, GameOrderEntry>
export type DealtHands<C = OrderedCard> = [Array<C>, Array<C>, Array<C>, Array<C>]