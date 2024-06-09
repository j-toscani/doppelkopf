import { Context, t } from 'elysia';
import { Handler } from 'shared';
import { GameRepo, UserRepo } from '../db/db';
import { BadRequestError } from '../errors';

const bodySchema = t.Object({
	player: t.String(),
});

type BodyType = (typeof bodySchema)['static'];

type Dependencies = { Game: typeof GameRepo; User: typeof UserRepo };
type CTX = Context<{ body: BodyType }>;

const context = { body: bodySchema };
const handler: Handler<Dependencies, CTX, Promise<{ id: string }>> =
	({ Game, User }) =>
	async ({ body }) => {
		const creator = await User.findOne({ name: body.player });

		if (!creator) throw new BadRequestError('Cannot create Game without user');

		const game = Game.create({ users: [creator] });
		await Game.insertOne(game);

		return { id: game.id };
	};

export default {
	context,
	handler: handler({ Game: GameRepo, User: UserRepo }),
};
