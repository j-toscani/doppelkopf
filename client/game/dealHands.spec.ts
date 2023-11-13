import { FULL_HAND_OF_CARDS_COUNT, MAX_PLAYER_COUNT } from '@/constants';
import { dealHands } from './dealHands';
import { defaultOrder } from './orders';
import { applyOrder } from './orders/utils';
import { OrderedCard } from './types';

let hands: Array<Array<OrderedCard>>;

describe('Dealing Hands', () => {
	beforeEach(() => {
		hands = dealHands().map((cards) => applyOrder(cards, defaultOrder));
	});

	it('deals the same ammount of cards to everyone', () => {
		const [firstHand] = dealHands();
		expect(hands.every((h) => h.length === firstHand.length)).toBe(true);
	});

	it('Deals one hand per player', () => {
		expect(hands.length).toBe(MAX_PLAYER_COUNT);
	});

	/**
	 * This is a very bad way to verify randomness.
	 * Maybe we should just trust our shuffle
	 * implementation as it is based on a widely
	 * suggested algorithm?!
	 */
	it('does not deal the same hand twice', () => {
		const roundOne = dealHands();
		const roundTwo = dealHands();
    const HAS_SIMILARITY = 1;
    const NO_SIMILARITY = 0
		roundOne.forEach((first, handIndex) => {
			let similarities = 0;

			for (let index = 0; index < first.length; index++) {
				const [firstCard, secondCard] = [first[index], roundTwo[handIndex][index]];
				similarities += firstCard.id === secondCard.id ? HAS_SIMILARITY : NO_SIMILARITY;
			}

			expect(similarities).toBeLessThan(FULL_HAND_OF_CARDS_COUNT);
		});
	});
});
