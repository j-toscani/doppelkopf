export const Color = {
	Spade: 1,
	Hearth: 2,
	Club: 3,
	Diamond: 4,
} as const;

export const Picture = {
	Ten: 1,
	Jack: 2,
	Queen: 3,
	King: 4,
	Ace: 5,
} as const;

type Value<T extends {}> = T[keyof T]

type ColorV = Value<typeof Color>
type PictureV = Value<typeof Picture>

export type CardId = `${'1' | '2'}${ColorV}${PictureV}`;

export interface Card {
	picture: PictureV;
	color: ColorV;
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
