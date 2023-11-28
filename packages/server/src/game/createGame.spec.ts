import { describe, expect, it } from 'bun:test';
import { createGame } from './createGame';
import { FIRST_ARRAY_INDEX } from '../constants';
import { Color, FULL_HAND_OF_CARDS_COUNT, MAX_PLAYER_COUNT, Picture } from 'shared';

const LAST_FROM_END = -1;
const players = ['1', '2', '3', '4'];
const game = createGame(players);

describe('Creating Game', () => {

	it('Always starts with four hands and four seats', () => {
		const game = createGame(['1']);
		expect(game.hands).toHaveLength(MAX_PLAYER_COUNT)
		expect(game.seats).toHaveLength(MAX_PLAYER_COUNT)
	})

	it('Sorts all hands', () => {
		Object.values(game.hands).forEach((hand) => {
			expect(hand.every((card, index, all) => card.order <= all.at(LAST_FROM_END)!.order));
		});
	});

	it('Uses default order (10 of Hearts is highest card)', () => {
		const sortedCards = Object.values(game.hands)
			.flat()
			.sort((a, b) => b.order - a.order);

		expect(sortedCards[FIRST_ARRAY_INDEX].color).toBe(Color.Hearth);
		expect(sortedCards[FIRST_ARRAY_INDEX].picture).toBe(Picture.Ten);
	});

	it('Creates a game with an empty table', () => {
		const { table } = game;

		expect(table).toBeArray();
		expect(table).toBeEmpty();
	});

	it('Passes the same number of cards to every player', () => {
		const hands = Object.values(game.hands);
		const firstHand = hands[FIRST_ARRAY_INDEX];

		expect(firstHand.length).toBe(FULL_HAND_OF_CARDS_COUNT);

		const allSameCount = hands.every((hand) => hand.length === firstHand.length);
		expect(allSameCount).toBe(true);
	});

	it('Sets the first player in argument as active player', () => {
		expect(game.seats[game.activeSeat]).toBe(players[FIRST_ARRAY_INDEX]);
	});
});
