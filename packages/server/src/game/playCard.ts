import { CardId, Game, OrderedCard, User } from 'shared';

export const playCard = (game: Game, player: User, cardId: CardId): Array<OrderedCard> => {
	if (game.seats[game.activeSeat] && player.name !== game.seats[game.activeSeat]?.user?.name)
		throw new Error('Only the active player is allowed to play a card.');

	const playerHand = game.seats[game.activeSeat].hand;
	if (!playerHand || !game.seats.map(({user: u}) => u?.name).filter(Boolean).includes(player.name))
		throw new Error('Player not in Game!');

	const playerCard = playerHand.find((card) => card.id === cardId);
	if (!playerCard) throw new Error('Card not in players hand!');

	game.seats[game.activeSeat].hand = playerHand.filter((card) => card.id !== cardId);
	game.rounds.at(-1)!.push({ seat: game.activeSeat, card: playerCard, from: player.name });

	return game.seats[game.activeSeat].hand;
};
