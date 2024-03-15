import { CardId, Game, OrderedCard, User } from 'shared';

export const playCard = (game: Game, player: User, cardId: CardId): Array<OrderedCard> => {
	if (game.seats[game.activeSeat] && player.name !== game.seats[game.activeSeat]?.name)
		throw new Error('Only the active player is allowed to play a card.');

	const playerHand = game.hands[game.activeSeat];
	if (!playerHand || !game.seats.map((u) => u?.name).filter(Boolean).includes(player.name))
		throw new Error('Player not in Game!');

	const playerCard = playerHand.find((card) => card.id === cardId);
	if (!playerCard) throw new Error('Card not in players hand!');

	game.hands[game.activeSeat] = playerHand.filter((card) => card.id !== cardId);
	game.table.push({ from: player.name, card: playerCard });

	return game.hands[game.activeSeat];
};
