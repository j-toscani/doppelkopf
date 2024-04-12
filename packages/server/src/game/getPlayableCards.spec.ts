import { describe, expect, it } from 'bun:test';
import { Color, ColorV, Picture, PictureV, Table } from 'shared';
import { createCard } from './cards';
import { applyOrder } from './orders/utils';
import { defaultOrder } from './orders';
import { FIRST_ARRAY_INDEX } from '../constants';
import { getPlayableCards } from './getPlayableCards';

const createStartingCard = (color: ColorV, picture: PictureV) =>
	applyOrder([createCard('1', color, picture)], defaultOrder)[FIRST_ARRAY_INDEX];

const hand = [
	createCard('1', Color.Club, Picture.King),
	createCard('1', Color.Club, Picture.Jack),
	createCard('1', Color.Spade, Picture.Jack),
	createCard('1', Color.Club, Picture.Ten),
];
const orderedCards = applyOrder(hand, defaultOrder);

describe('Get Playable Cards', () => {
	it('Can play all cards, if none are on the table', () => {
		const table: Table = [];
		const playableCards = getPlayableCards(table, orderedCards);

		expect(playableCards).toBeArray();
		expect(playableCards.length).toBeTruthy();

		for (const card of playableCards) {
			expect(card.playable).toBeTrue();
		}
	});
	it('Can play all trump cards if trump round', () => {
		const definingCard = createStartingCard(Color.Spade, Picture.Queen);
		const table: Table = [
			{
				from: 0,
				card: definingCard,
			},
		];
		const playableCards = getPlayableCards(table, orderedCards);

		for (const card of playableCards) {
			expect(card.playable).toBe(card.trump);
		}
	});
	it('Can only play specific fehl cards on fehl round if has respective fehl in hand', () => {
		const definingCard = createStartingCard(Color.Club, Picture.Ace);
		const table: Table = [
			{
				from: 0,
				card: definingCard,
			},
		];
		const playableCards = getPlayableCards(table, orderedCards);

		const clubFehlCards = playableCards.filter(
			(card) => !card.trump && card.color === Color.Club,
		);
		const otherCards = playableCards.filter((card) => card.trump || card.color !== Color.Club);

		for (const card of clubFehlCards) {
			expect(card.playable).toBeTrue();
		}

		for (const card of otherCards) {
			expect(card.playable).toBeFalse();
		}
	});
	it('Can play all cards on fehl round if does not have respective fehl in hand', () => {
		const definingCard = createStartingCard(Color.Hearth, Picture.Ace);
		const table: Table = [
			{
				from: 0,
				card: definingCard,
			},
		];

		const playableCards = getPlayableCards(table, orderedCards);

		for (const card of playableCards) {
			expect(card.playable).toBeTrue();
		}
	});
	it('Can play all cards on trump round if does not have trump in hand', () => {
		const fehlOnlyHand = [
			createCard('1', Color.Club, Picture.King),
			createCard('1', Color.Club, Picture.Ten),
			createCard('1', Color.Spade, Picture.Ace),
			createCard('1', Color.Club, Picture.Ten),
		];
		const orderdFehlOnlyHand = applyOrder(fehlOnlyHand, defaultOrder);

		const definingCard = createStartingCard(Color.Hearth, Picture.Queen);
		const table: Table = [
			{
				from: 0,
				card: definingCard,
			},
		];

		const playableCards = getPlayableCards(table, orderdFehlOnlyHand);

		for (const card of playableCards) {
			expect(card.playable).toBeTrue();
		}
	});
});
