import { describe, expect, it } from 'bun:test';
import { createGame } from '../db/createGame';
import { peakLastRound } from './peakLastRound';
import { Game, MAX_PLAYER_COUNT, Table } from 'shared';
import { getHands } from '../utils/getHands';

const users = [{ name: 'karl' }, { name: 'frank' }, { name: 'mary' }, { name: 'andrea' }];
const game = createGame({ users });

describe('Peak result of last round', () => {
	it('Returns cards played in the previous round', () => {
		const newGame = {
			...game,
			rounds: Array.from(
				new Array(MAX_PLAYER_COUNT),
				(e, i): Table =>
					getHands(game).map((hand) => ({
						card: hand[i],
						from: users[i].name,
						seat: i
					})),
			),
		};
		const lastRound = peakLastRound(newGame);

		expect(lastRound).toBeDefined();

		const lastElementOfRounds = newGame.rounds.pop();

		lastRound?.forEach((entry, i) => {
			expect(entry.card).toBe(lastElementOfRounds![i].card);
			expect(entry.from).toBe(lastElementOfRounds![i].from);
		});
	});
	it('Peaking multiple times does not change the result', () => {
		const newGame = {
			...game,
			rounds: Array.from(
				new Array(MAX_PLAYER_COUNT),
				(e, i): Table =>
					getHands(game).map((hand) => ({
						card: hand[i],
						from: users[i].name,
						seat: i
					})),
			),
		};

		peakLastRound(newGame);
		peakLastRound(newGame);
		const lastRound = peakLastRound(newGame);

		expect(lastRound).toBeDefined();

		const lastElementOfRounds = newGame.rounds.pop();

		lastRound?.forEach((entry, i) => {
			expect(entry.card).toBe(lastElementOfRounds![i].card);
			expect(entry.from).toBe(lastElementOfRounds![i].from);
		});
	});
});
