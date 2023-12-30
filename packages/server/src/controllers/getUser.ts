import { Context } from 'elysia';
import { getUserByName as getUserAction } from '../db/users';

type Params = Record<'name', string>;

const handler =
	({ getUser }: { getUser: typeof getUserAction }) =>
	({ params }: Context<{ params: Params }>) => {
		return { user: getUser({ name: params.name }) };
	};

export default {
	handler: handler({ getUser: getUserAction }),
};
