import { Context, NotFoundError, t } from 'elysia';
import { isCardId } from 'shared';
import { playCard } from '../game/playCard';
import { BadRequestError } from '../errors';
import { getGames } from '../game/games';

const bodySchema = t.Object({
	card: t.String(),
	player: t.String(),
});

type BodySchema = (typeof bodySchema)['static'];
type Params = Record<'id', string>;

const context = {
	body: bodySchema,
};

const handler =
	({ games }: { games: typeof getGames }) =>
	({ body, params }: Context<{ body: BodySchema; params: Params }>) => {
		const { id } = params;
		const game = games().get(id);

		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);
		if (!isCardId(body.card))
			throw new BadRequestError(`String ${body.card} is not a valid [card.id].`);

		const updatedHand = playCard(game, body.player, body.card);

		return {
			table: game.table,
			hand: updatedHand,
		};
	};

export default {
	handler: handler({ games: getGames }),
	context,
};
