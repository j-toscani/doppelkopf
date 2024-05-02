import { beforeEach, describe, expect, it } from 'bun:test';
import { ADD_ONE, Game, User } from 'shared';
import { createGame } from '../db/createGame';
import { getOpponentCardCount } from './getOpponentCardCount';
import { FIRST_ARRAY_INDEX } from '../constants';
import { getHands } from '../utils/getHands';

const users: Array<User> = [{ name: 'John' }, { name: 'Ron' }, { name: 'Sophy' }, { name: 'Mary' }];

let game: Game;

const cases = [
	{ player: 'John', left: 'Ron', right: 'Mary' },
	{ player: 'Ron', left: 'Sophy', right: 'John' },
	{ player: 'Sophy', left: 'Mary', right: 'Ron' },
	{ player: 'Mary', left: 'John', right: 'Sophy' },
];



describe('Get Opponent Card Count', () => {
	beforeEach(() => {
		game = createGame({ users: users });
	});
	it('Returns the number of cards in opponents hand + userId as an array', () => {
		getHands(game).forEach((hand) => hand.pop());

		const EXPECTED_CARDS_IN_HAND = 9;
		const result = getOpponentCardCount(game, 'John');

		expect(result.every((r) => r.cardsInHand === EXPECTED_CARDS_IN_HAND)).toBe(true);
	});
	it('Retuns correct number of cards played if not all players played even amount of cards', () => {
		getHands(game).forEach((hand) => hand.pop());

		const EXPECTED_CARDS_IN_HAND = 9;
		const SECOND_PLAYER_INDEX = 1;

		getHands(game)[SECOND_PLAYER_INDEX].pop();

		const result = getOpponentCardCount(game, 'John');

		expect(result.every((r) => r.cardsInHand === EXPECTED_CARDS_IN_HAND)).toBe(false);
		expect(result[FIRST_ARRAY_INDEX].cardsInHand).toBe(EXPECTED_CARDS_IN_HAND - ADD_ONE);
	});
	cases.forEach(({ player, left, right }) => {
		describe(player, () => {
			it('First item in the array returned is the user sitting on the left from current user', () => {
				getHands(game).forEach((hand) => hand.pop());

				const [first] = getOpponentCardCount(game, player);

				expect(first.user).toBe(left);
			});
			it('Last item in the array returned is the user sitting on the right from current user', () => {
				getHands(game).forEach((hand) => hand.pop());

				const [_, __, last] = getOpponentCardCount(game, player);

				expect(last.user).toBe(right);
			});
		});
	});
	it('Returns `[]` if user is not in the game anymore', () => {
		getHands(game).forEach((hand) => hand.pop());
		game.seats[FIRST_ARRAY_INDEX].user = null;

		const result = getOpponentCardCount(game, 'John');

		expect(result).toHaveLength(FIRST_ARRAY_INDEX);
	});
});
