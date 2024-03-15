import { User } from './db';
import { Color, Picture, TablePositions } from './constants';

type Value<T extends {}> = T[keyof T];

export type ColorV = Value<typeof Color>;
export type PictureV = Value<typeof Picture>;

export type CardId = `${'1' | '2'}${ColorV}${PictureV}`;

export const isCardId = (s: string): s is CardId => {
	if (s.length > 3) return false;
	const [copy, color, picture] = s;

	const correctCopyValue = ['1', '2'].includes(copy);
	const correctPictureValue = parseInt(picture, 10) > 0 && parseInt(picture, 10) < 5;
	const correctColorValue = parseInt(color, 10) > 0 && parseInt(color, 10) < 4;

	return correctColorValue && correctCopyValue && correctPictureValue;
};

export interface Card {
	picture: PictureV;
	color: ColorV;
	playable: boolean;
	points: number;
	id: CardId;
}

export interface OrderedCard extends Card {
	order: number;
	trump: boolean;
}

export type TranslatedCard = {
	picture: string;
	color: string;
	points: number;
	id: CardId;
};

type ColorNames = Record<ColorV, string>;
type PictureNames = Record<PictureV, string>;

export type DeckTranslation = {
	colorNames: ColorNames;
	pictureLetters: PictureNames;
	pictureLabels: PictureNames;
};

export type CardOrderTempValue = { id: CardId; trump: boolean };
export type GameOrderEntry = { trump: boolean; order: number };
export type GameOrder = Record<CardId, GameOrderEntry>;
export type DealtHands<C = OrderedCard> = [Array<C>, Array<C>, Array<C>, Array<C>];

export type Table = Array<{ card: OrderedCard; from: string }>;

export type TablePosition = (typeof TablePositions)[keyof typeof TablePositions];

export type OpponentState = {
	user: string;
	position: TablePosition;
	cardsInHand: number;
};
