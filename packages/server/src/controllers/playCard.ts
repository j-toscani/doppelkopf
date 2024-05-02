import { Context, NotFoundError, t } from 'elysia';
import { isCardId } from 'shared';
import { playCard } from '../game/playCard';
import { BadRequestError } from '../errors';
import { GameRepo, UserRepo } from '../db/db';

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
	({ Game, User }: { Game: typeof GameRepo; User: typeof UserRepo }) =>
	async ({ body, params }: Context<{ body: BodySchema; params: Params }>) => {
		const { id } = params;
		const [game, user] = await Promise.all([
			Game.findOne({ id }),
			User.findOne({ name: body.player }),
		]);

		if (!game) throw new NotFoundError(`Game with [id] ${id} does not exist.`);
		if (!user) throw new NotFoundError(`User with [id] ${body.player} does not exist.`);
		if (!isCardId(body.card))
			throw new BadRequestError(`String ${body.card} is not a valid [card.id].`);

		const updatedHand = playCard(game, user, body.card);

		return {
			table: game.rounds.at(-1),
			hand: updatedHand,
		};
	};

export default {
	handler: handler({ Game: GameRepo, User: UserRepo }),
	context,
};
