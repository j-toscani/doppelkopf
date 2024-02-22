export const NOT_FOUND_INDEX = -1;
export const EMPTY_HAND_COUNT = 0;
export const NO_CARDS_PLAYED = 0;
export const HALF_CARD_WIDTH_REM = 2;
export const MAX_PLAYER_COUNT = 4;
export const ADD_ONE = 1;
export const FULL_HAND_OF_CARDS_COUNT = 10;
export const FULL_DECK_OF_CARDS_COUNT = 40;

export const TablePositions = {
	TOP: 'top',
	LEFT: 'left',
	RIGHT: 'right',
	BOTTOM: 'bottom',
};

export const opponents = [
	{ user: '1', cardsInHand: 10, position: TablePositions.LEFT },
	{ user: '2', cardsInHand: 10, position: TablePositions.TOP },
	{ user: '3', cardsInHand: 10, position: TablePositions.RIGHT },
];

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
