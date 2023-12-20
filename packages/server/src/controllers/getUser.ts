import { Context, t } from 'elysia';
import { getUser as getUserAction } from '../db/users';

const bodySchema = t.Object({
	name: t.String(),
});

type BodyType = (typeof bodySchema)['static'];

const context = { body: bodySchema };
const handler =
	({ getUser }: { getUser: typeof getUserAction }) =>
	({ body }: Context<{ body: BodyType }>) => {
		return { user: getUser({ name: body.name }) };
	};

export default {
	context,
	handler: handler({ getUser: getUserAction }),
};
