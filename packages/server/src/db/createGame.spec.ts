import { describe, expect, it } from 'bun:test';
import { createGame } from './createGame';
import { FIRST_ARRAY_INDEX } from '../constants';
import { Color, FULL_HAND_OF_CARDS_COUNT, Game, MAX_PLAYER_COUNT, Picture } from 'shared';
import { getHands } from '../utils/getHands';

const LAST_FROM_END = LAST_ITEM_INDEX;
const players = ['1', '2', '3', '4'].map((name) => ({ name }));
const game: Game = createGame({ users: players });

describe('Creating Game', () => {
	it('Always starts with four hands and four seats', () => {
		const game = createGame({ users: [{ name: '1' }] });
		expect(getHands(game)).toHaveLength(MAX_PLAYER_COUNT);
		expect(game.seats).toHaveLength(MAX_PLAYER_COUNT);
	});

	it('Sorts all hands', () => {
		Object.values(getHands(game)).forEach((hand) => {
			expect(hand.every((card, _index, all) => card.order <= all.at(LAST_FROM_END)!.order));
		});
	});

	it('Uses default order (10 of Hearts is highest card)', () => {
		const sortedCards = Object.values(getHands(game))
			.flat()
			.sort((a, b) => b.order - a.order);

		expect(sortedCards[FIRST_ARRAY_INDEX].color).toBe(Color.Hearth);
		expect(sortedCards[FIRST_ARRAY_INDEX].picture).toBe(Picture.Ten);
	});

	it('Creates a game with an empty table', () => {
		const  table  = game.rounds.at(LAST_ITEM_INDEX);

		expect(table).toBeArray();
		expect(table).toBeEmpty();
	});

	it('Passes the same number of cards to every player', () => {
		const hands = Object.values(getHands(game));
		const firstHand = hands[FIRST_ARRAY_INDEX];

		expect(firstHand.length).toBe(FULL_HAND_OF_CARDS_COUNT);

		const allSameCount = hands.every((hand) => hand.length === firstHand.length);
		expect(allSameCount).toBe(true);
	});

	it('Sets the first player in argument as active player', () => {
		expect(game.seats[game.activeSeat].user).toBe(players[FIRST_ARRAY_INDEX]);
	});
});
