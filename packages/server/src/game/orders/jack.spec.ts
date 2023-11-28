import { jackSoloOrder } from '.';
import { cards } from '../cards';
import { Color, Picture } from 'shared';
import { applyOrder, sortCards } from './utils';
import { describe, it, expect } from 'bun:test';
import { FIRST_ARRAY_INDEX, LAST_ITEM_INDEX } from '../../constants';

const TRUMP_CARD_COUNT = 8;
const orderedCards = applyOrder(cards, jackSoloOrder).sort(sortCards);

describe('Jack Solo Order', () => {
	it('Sets correct highest card.', () => {
		const lastCard = orderedCards.at(LAST_ITEM_INDEX);
		expect(lastCard?.trump).toBe(true);
		expect(lastCard?.picture).toBe(Picture.Jack);
		expect(lastCard?.color).toBe(Color.Club);
	});

	it('Sets correct lowest card.', () => {
		const firstCard = orderedCards[FIRST_ARRAY_INDEX];
		expect(firstCard.picture).toBe(Picture.Queen);
		expect(firstCard.trump).toBe(false);
	});

	it('Has correct amount of trump cards', () => {
		const allTrumpCards = orderedCards.filter(({ trump }) => trump);
		expect(allTrumpCards.length).toBe(TRUMP_CARD_COUNT);
		expect(allTrumpCards.every(({ picture }) => picture === Picture.Jack));
	});
});
