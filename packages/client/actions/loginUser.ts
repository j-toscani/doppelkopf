'use server';

import { loginUser as loginUserRequest } from '@/requests';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const loginUser = async (
	prevState: { message: string; success: boolean },
	formData: FormData,
): Promise<{ message: string; success: boolean }> => {
	const name = formData.get('name') as string;

	try {
		const { user } = await loginUserRequest(name);
		if (!user) throw new Error('User not Found!');
		cookies().set('user', user?.name);
		redirect('/games');
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
