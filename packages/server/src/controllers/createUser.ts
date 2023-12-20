import { Context, t } from 'elysia';
import { createUser as createUserAction, getUser as getUserAction } from '../db/users'

const bodySchema = t.Object({
	name: t.String(),
});

type BodyType = (typeof bodySchema)['static'];

const context = { body: bodySchema };
const handler =
	({ createUser, getUser }: { createUser: typeof createUserAction, getUser: typeof getUserAction }) =>
	({ body }: Context<{ body: BodyType }>) => {
		createUser({ name: body.name });

		return { user: getUser({ name: body.name })}
	};

export default {
	context,
	handler: handler({ createUser: createUserAction, getUser: getUserAction }),
};
