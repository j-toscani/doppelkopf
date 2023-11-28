import { clubSolo, diamondSolo, hearthSolo, spadesSolo } from '.';
import { cards } from '../cards';
import { Color, ColorV, GameOrder, Picture } from "shared";
import { applyOrder, sortCards } from './utils';
import { describe, expect, it } from 'bun:test';
import { FIRST_ARRAY_INDEX, LAST_ITEM_INDEX } from '../../constants';

const TRUMP_CARD_COUNT = 10;
const orders: Record<ColorV, GameOrder> = {
	[Color.Club]: clubSolo,
	[Color.Diamond]: diamondSolo,
	[Color.Hearth]: hearthSolo,
	[Color.Spade]: spadesSolo,
};

[Color.Club, Color.Diamond, Color.Spade, Color.Hearth].forEach((color) => {
	const order = orders[color];
	const orderedCards = applyOrder(cards, order).sort(sortCards);

	describe(`${color} Color Order`, () => {
		it('Sets correct highest card.', () => {
			const lastCard = orderedCards.at(LAST_ITEM_INDEX);
			expect(lastCard?.trump).toBe(true);
			expect(lastCard?.picture).toBe(Picture.Ace);
			expect(lastCard?.color).toBe(color);
		});

		it('Sets correct lowest card.', () => {
			const firstCard = orderedCards[FIRST_ARRAY_INDEX];
			expect(firstCard.picture).toBe(Picture.Jack);
			expect(firstCard.color).not.toBe(color);
			expect(firstCard.trump).toBe(false);
		});

		it('Has correct amount of trump and non trump cards', () => {
			const allTrumpCards = orderedCards.filter(({ trump }) => trump);
			expect(allTrumpCards.length).toBe(TRUMP_CARD_COUNT);
			expect(allTrumpCards.every(({ color: cardColor }) => cardColor === color)).toBe(true);
		});
	});
});
