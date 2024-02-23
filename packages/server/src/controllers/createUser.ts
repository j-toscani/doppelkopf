import { Context, t } from 'elysia';
import { Handler, User } from 'shared';
import { UserRepo } from '../db/db';

const bodySchema = t.Object({
	name: t.String(),
});

type CTX = Context<{ body: (typeof bodySchema)['static'] }>;
type Adapter = {
	User: typeof UserRepo;
};
type Result = Promise<{ user: User | null }>;

const context = { body: bodySchema };
const handler: Handler<Adapter, CTX, Result> =
	({ User }) =>
	async ({ body }) => {
		User.insertOne({ name: body.name });

		return { user: await User.findOne({ name: body.name }) };
	};

export default {
	context,
	handler: handler({ User: UserRepo }),
};
