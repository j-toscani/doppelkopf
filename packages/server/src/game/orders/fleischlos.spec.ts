import { fleischlosOrder } from '.';
import { cards } from '../cards';
import { Picture } from 'shared';
import { applyOrder, sortCards } from './utils';
import { describe, expect, it } from "bun:test" 
import { FIRST_ARRAY_INDEX, LAST_ITEM_INDEX } from '../../constants';

const TRUMP_CARD_COUNT = 0;
const orderedCards = applyOrder(cards, fleischlosOrder).sort(sortCards);

describe('Fleischlos Order', () => {
	it('Sets correct highest card.', () => {
		const lastCard = orderedCards.at(LAST_ITEM_INDEX);
		expect(lastCard?.trump).toBe(false);
		expect(lastCard?.picture).toBe(Picture.Ace);
	});

	it('Sets correct lowest card.', () => {
		const firstCard = orderedCards[FIRST_ARRAY_INDEX];
		expect(firstCard.picture).toBe(Picture.Jack);
		expect(firstCard.trump).toBe(false);
	});

	it('Has correct amount of trump and non trump cards', () => {
		const allTrumpCards = orderedCards.filter(({ trump }) => trump);
		expect(allTrumpCards.length).toBe(TRUMP_CARD_COUNT);
	});
});
