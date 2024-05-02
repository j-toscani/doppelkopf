import { describe, expect, test } from 'bun:test';
import { createCard } from './cards';
import { Color, Picture } from 'shared';
import { findRoundWinner } from './findRoundWinner';
import { applyOrder } from './orders/utils';
import { defaultOrder } from './orders';

const COPY = '1';
const players = ['1', '2', '3', '4'];

describe('Find the Round Winner', () => {
	test('Highest fehl wins in non trump round', () => {
		const cards = [
			createCard(COPY, Color.Club, Picture.Ten),
			createCard(COPY, Color.Club, Picture.Ten),
			createCard(COPY, Color.Club, Picture.Ace),
			createCard(COPY, Color.Club, Picture.King),
		];
		const orderedRound = applyOrder(cards, defaultOrder);
		const tableRound = players.map((player, index) => ({
			seat: players.findIndex((p) => p === player),
			card: orderedRound[index]!,
			from: player
		}));
		const winner = findRoundWinner(tableRound);
        const winnerIndex = 2;

		expect(winner).toBe(winnerIndex);
	});

	test('Only considers correct fehl color in fehl round', () => {
		const cards = [
			createCard(COPY, Color.Spade, Picture.Ten),
			createCard(COPY, Color.Club, Picture.Ten),
			createCard(COPY, Color.Club, Picture.Ace),
			createCard(COPY, Color.Club, Picture.King),
		];
		const orderedRound = applyOrder(cards, defaultOrder);
		const tableRound = players.map((player, index) => ({
			seat: players.findIndex((p) => p === player),
			card: orderedRound[index]!,
			from: player
		}));
		const winner = findRoundWinner(tableRound);
        const winnerIndex = 0;
		expect(winner).toBe(winnerIndex);
	});

	test('Highest trump wins in pure trump round', () => {
		const cards = [
			createCard(COPY, Color.Hearth, Picture.Jack),
			createCard(COPY, Color.Club, Picture.Jack),
			createCard(COPY, Color.Spade, Picture.Queen),
			createCard(COPY, Color.Club, Picture.Queen),
		];
		const orderedRound = applyOrder(cards, defaultOrder);
		const tableRound = players.map((player, index) => ({
			seat: players.findIndex((p) => p === player),
			card: orderedRound[index]!,
			from: player
		}));
		const winner = findRoundWinner(tableRound);
        const winnerIndex = 3;

		expect(winner).toBe(winnerIndex);
	});

	test('Highest trump wins in mixed round', () => {
		const cards = [
			createCard(COPY, Color.Hearth, Picture.Ace),
			createCard(COPY, Color.Spade, Picture.Queen),
			createCard(COPY, Color.Club, Picture.Jack),
			createCard(COPY, Color.Club, Picture.Ten),
		];
		const orderedRound = applyOrder(cards, defaultOrder);
		const tableRound = players.map((player, index) => ({
			seat: players.findIndex((p) => p === player),
			card: orderedRound[index]!,
			from: player
		}));
		const winner = findRoundWinner(tableRound);
        const winnerIndex = 1;

		expect(winner).toBe(winnerIndex);
	});
});
