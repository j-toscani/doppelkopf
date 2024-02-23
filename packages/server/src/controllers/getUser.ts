import { Context } from 'elysia';
import { UserRepo } from '../db/db';

type Params = Record<'name', string>;

const handler =
	({ User }: { User: typeof UserRepo }) =>
	async ({ params }: Context<{ params: Params }>) => {
		return { user: await User.findOne({ name: params.name }) };
	};

export default {
	handler: handler({ User: UserRepo }),
};
