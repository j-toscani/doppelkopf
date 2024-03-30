import { describe, expect, it } from 'bun:test';
import { createGame } from '../db/createGame';
import { peakLastRound } from './peakLastRound';
import { MAX_PLAYER_COUNT, Table } from 'shared';
import { LAST_ITEM_INDEX } from '../constants';

const seats = [{ name: 'karl' }, { name: 'frank' }, { name: 'mary' }, { name: 'andrea' }];
const game = createGame({ seats });

describe('Peak result of last round', () => {
	it('Returns `null` if no round was finished yet', () => {
		const lastRound = peakLastRound(game);
		expect(lastRound).toBe(null);
	});
	it('Returns cards played in the previous round', () => {
		const newGame = {
			...game,
			rounds: Array.from(
				new Array(MAX_PLAYER_COUNT),
				(e, i) =>
					game.hands.map((hand) => ({
						card: hand[i],
						from: game.seats[i]?.name,
					})) as Table,
			),
		};
		const lastRound = peakLastRound(newGame);

        expect(lastRound).toBeDefined()

        const lastElementOfRounds = newGame.rounds.pop()
        
        lastRound?.forEach((entry, i) => {
            expect(entry.card).toBe(lastElementOfRounds![i].card)
            expect(entry.from).toBe(lastElementOfRounds![i].from)
        })
	});
	it('Peaking multiple times does not change the result', () => {
		const newGame = {
			...game,
			rounds: Array.from(
				new Array(MAX_PLAYER_COUNT),
				(e, i) =>
					game.hands.map((hand) => ({
						card: hand[i],
						from: game.seats[i]?.name,
					})) as Table,
			),
		};

		peakLastRound(newGame);
		peakLastRound(newGame);
		const lastRound = peakLastRound(newGame);

        expect(lastRound).toBeDefined()

        const lastElementOfRounds = newGame.rounds.pop()

        lastRound?.forEach((entry, i) => {
            expect(entry.card).toBe(lastElementOfRounds![i].card)
            expect(entry.from).toBe(lastElementOfRounds![i].from)
        })
	});
});
