import { Context, t } from 'elysia';
import { getUserByName as getUserAction } from '../db/users';
import { NotFoundError } from '../errors';
import { UserRepo } from '../db/repository';

const bodySchema = t.Object({
	name: t.String(),
});

type Body = (typeof bodySchema)['static'];

const context = { body: bodySchema };
const handler =
	({ User }: { User: typeof UserRepo }) =>
	async ({ body, set }: Context<{ body: Body }>) => {
		const user = await User.findOne({ name: body.name });
		if (!user) throw new NotFoundError(`User with name [${body.name}] does not exist.`);

		set.headers['Set-Cookie'] = `user=${user.name}; Domain=localhost`;

		return { user };
	};

export default {
	context,
	handler: handler({ getUser: getUserAction }),
};
