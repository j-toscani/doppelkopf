'use server';

import { API_HOST } from '@/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { User } from 'shared';

const loginUserAction = (name: string): Promise<{ user: User | null }> =>
	fetch(`${API_HOST}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name }),
	}).then((response) => {
		if (!response.ok) throw new Error('User was not created.');
		return response.json();
	});

export const loginUser = async (
	prevState: { message: string; success: boolean },
	formData: FormData,
): Promise<{ message: string; success: boolean }> => {
	const name = formData.get('name') as string;

	try {
		const {user} = await loginUserAction(name);
		if (!user) throw new Error("User not Found!")
		cookies().set('user', user?.name)
		redirect('/games')

	} catch (error) {
		return {
			message: 'User konnte nicht abgerufen werden',
			success: false,
		};
	}

	return {
		message: '',
		success: true,
	};
};
