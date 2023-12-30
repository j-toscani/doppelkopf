'use server';
import { API_HOST } from '@/constants';
import { User } from 'shared';

const createUserFetch = (name: string): Promise<{ user: User | null }> =>
	fetch(`${API_HOST}/users/new`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name }),
	})
		.then((response) => {
			if (!response.ok) throw new Error('User was not created.');
			return response.json();
		})
		.then(({ id }) => id);

export const createUser = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string; success: boolean }> => {
	const name = formData.get('name') ?? '';
	if (typeof name !== 'string') throw Error('Property has wrong type');

	try {
		await createUserFetch(name);
		return {
			message: 'User wurde angelegt',
			success: true,
		};
	} catch (error) {
		return {
			message: 'User konnte nicht angelegt werden.',
			success: false,
		};
	}
};
