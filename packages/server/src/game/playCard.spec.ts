import { beforeEach, describe, expect, it } from 'bun:test';
import { ADD_ONE, Game, NOT_FOUND_INDEX } from 'shared';
import { playCard } from './playCard';
import { FIRST_ARRAY_INDEX } from '../constants';
import { createGame } from '../db/createGame';

const SECOND_ARRAY_INDEX = 1;
const players = ['1', '2', '3', '4'].map((name) => ({
	name,
}));
let game: Game;

describe('Play a Card', () => {
	beforeEach(() => {
		game = createGame({ seats: players });
	});

	it('Errors if player is not active player', () => {
		const [card] = game.hands[FIRST_ARRAY_INDEX];
		const play = () => playCard(game, players[SECOND_ARRAY_INDEX], card.id);

		expect(play).toThrow();
	});

	it('Errors if player is not in the game', () => {
		const [card] = game.hands[FIRST_ARRAY_INDEX];
		game.activeSeat = FIRST_ARRAY_INDEX;

		const play = () => playCard(game, { name: 'not_in_game' }, card.id);
		expect(play).toThrow();
	});

	it('Errors if player is missing card played', () => {
		const [card] = game.hands[SECOND_ARRAY_INDEX];

		const play = () => playCard(game, game.seats[FIRST_ARRAY_INDEX], card.id);
		expect(play).toThrow();
	});

	it('Returns updated hand of cards', () => {
		const player = game.seats[game.activeSeat];
		const [card] = game.hands[game.activeSeat];
		const oldCardCount = game.hands[game.activeSeat].length;

		const play = () => playCard(game, player, card.id);

		const hand = play();
		expect(hand).toHaveLength(oldCardCount - ADD_ONE);
		expect(hand.findIndex(({ id }) => card.id === id)).toBe(NOT_FOUND_INDEX);
		expect(game.table[FIRST_ARRAY_INDEX]).toBeTruthy();
	});

	it('Trows error if card is played second time', () => {
		const player = game.seats[game.activeSeat];
		const [card] = game.hands[game.activeSeat];

		const play = () => playCard(game, player, card.id);

		play();
		expect(game.table.length).toBeTruthy();
		expect(game.table[FIRST_ARRAY_INDEX]).toBeTruthy();

		expect(play).toThrow();
	});

	it('Puts card on the table with player reference', () => {
		const player = game.seats[game.activeSeat];
		const [card] = game.hands[game.activeSeat];

		playCard(game, player, card.id);

		expect(game.table.length).toBeTruthy();
		expect(game.table[FIRST_ARRAY_INDEX]).toBeTruthy();

		const cardOnTable = game.table[FIRST_ARRAY_INDEX];

		expect(cardOnTable.card.id).toBe(card.id);
		expect(cardOnTable.from).toBe(player.name);
	});
});
