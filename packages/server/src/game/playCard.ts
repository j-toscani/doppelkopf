import { CardId, Game, OrderedCard } from 'shared';

export const playCard = (game: Game, player: string, cardId: CardId): Array<OrderedCard> => {
	if (player !== game.seats[game.activeSeat])
		throw new Error('Only the active player is allowed to play a card.');

	const playerHand = game.hands[game.activeSeat];
	if (!playerHand || !game.seats.includes(player)) throw new Error('Player not in Game!');

	const playerCard = playerHand.find((card) => card.id === cardId);
	if (!playerCard) throw new Error('Card not in players hand!');

	game.hands[game.activeSeat] = playerHand.filter((card) => card.id !== cardId);
	game.table.push({ from: player, card: playerCard });

	return game.hands[game.activeSeat]
};
