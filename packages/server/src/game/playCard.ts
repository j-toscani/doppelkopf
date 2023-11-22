import { CardId, Game } from 'shared';

export const playCard = (game: Game, player: string, cardId: CardId) => {
	if (player !== game.activePlayer)
		throw new Error('Only the active player is allowed to play a card.');

	const playerHand = game.hands[player];
	if (!playerHand || !(player in game.players)) throw new Error('Player not in Game!');

	const playerCard = playerHand.find((card) => card.id === cardId);
	if (!playerCard) throw new Error('Card not in players hand!');

	game.hands[player] = playerHand.filter((card) => card.id !== cardId);
	game.table.push({ from: player, card: playerCard });
};
