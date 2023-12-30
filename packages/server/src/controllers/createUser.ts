import { Context, t } from 'elysia';
import { createUser as createUserAction, getUserByName as getUserAction } from '../db/users'
import { Handler, User } from 'shared';

const bodySchema = t.Object({
	name: t.String(),
});

type CTX = Context<{body: (typeof bodySchema)['static']}>
type Adapter = {
	 createUser: typeof createUserAction, getUser: typeof getUserAction 
}
type Result = { user: User | null}

const context = { body: bodySchema };
const handler: Handler<Adapter, CTX, Result> =
	({ createUser, getUser }) =>
	({ body }) => {
		createUser({ name: body.name });

		return { user: getUser({ name: body.name })}
	};

export default {
	context,
	handler: handler({ createUser: createUserAction, getUser: getUserAction }),
};
